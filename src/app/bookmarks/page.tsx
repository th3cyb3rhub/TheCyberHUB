'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Bookmark, Plus, Folder, FileText, MessageSquare, Calendar, Briefcase, Trash2, Edit2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface BookmarkItem {
    _id: string;
    contentType: 'blog' | 'discussion' | 'event' | 'job' | 'challenge';
    contentId: string;
    content?: {
        _id: string;
        title?: string;
        name?: string;
        slug?: string;
        description?: string;
    };
    createdAt: string;
}

interface Collection {
    _id: string;
    name: string;
    description?: string;
    isDefault: boolean;
    bookmarkCount: number;
    createdAt: string;
}

const contentTypeIcons: Record<string, React.ReactNode> = {
    blog: <FileText className="w-4 h-4" />,
    discussion: <MessageSquare className="w-4 h-4" />,
    event: <Calendar className="w-4 h-4" />,
    job: <Briefcase className="w-4 h-4" />,
    challenge: <Bookmark className="w-4 h-4" />,
};

const contentTypeLabels: Record<string, string> = {
    blog: 'Blog',
    discussion: 'Discussion',
    event: 'Event',
    job: 'Job',
    challenge: 'Challenge',
};

const contentTypeColors: Record<string, string> = {
    blog: 'bg-blue-500/20 text-blue-400',
    discussion: 'bg-green-500/20 text-green-400',
    event: 'bg-purple-500/20 text-purple-400',
    job: 'bg-yellow-500/20 text-yellow-400',
    challenge: 'bg-orange-500/20 text-orange-400',
};


export default function BookmarksPage() {
    const { user, token } = useAuth();
    const [collections, setCollections] = useState<Collection[]>([]);
    const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
    const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showNewCollection, setShowNewCollection] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [editingCollection, setEditingCollection] = useState<string | null>(null);
    const [editName, setEditName] = useState('');

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const fetchCollections = useCallback(async () => {
        if (!token) return;
        try {
            const res = await fetch(`${API_URL}/api/bookmarks/collections`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setCollections(data.collections || []);
                if (data.collections?.length > 0 && !selectedCollection) {
                    setSelectedCollection(data.collections[0]._id);
                }
            }
        } catch (error) {
            console.error('Error fetching collections:', error);
        }
    }, [API_URL, token, selectedCollection]);

    const fetchBookmarks = useCallback(async (collectionId: string) => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/bookmarks/collections/${collectionId}/bookmarks`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setBookmarks(data.bookmarks || []);
            }
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
        } finally {
            setLoading(false);
        }
    }, [API_URL, token]);

    useEffect(() => {
        fetchCollections();
    }, [fetchCollections]);

    useEffect(() => {
        if (selectedCollection) {
            fetchBookmarks(selectedCollection);
        }
    }, [selectedCollection, fetchBookmarks]);

    const createCollection = async () => {
        if (!token || !newCollectionName.trim()) return;
        try {
            const res = await fetch(`${API_URL}/api/bookmarks/collections`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: newCollectionName }),
            });
            if (res.ok) {
                setNewCollectionName('');
                setShowNewCollection(false);
                fetchCollections();
            }
        } catch (error) {
            console.error('Error creating collection:', error);
        }
    };

    const updateCollection = async (collectionId: string) => {
        if (!token || !editName.trim()) return;
        try {
            const res = await fetch(`${API_URL}/api/bookmarks/collections/${collectionId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: editName }),
            });
            if (res.ok) {
                setEditingCollection(null);
                setEditName('');
                fetchCollections();
            }
        } catch (error) {
            console.error('Error updating collection:', error);
        }
    };

    const deleteCollection = async (collectionId: string) => {
        if (!token) return;
        if (!confirm('Are you sure you want to delete this collection?')) return;
        try {
            const res = await fetch(`${API_URL}/api/bookmarks/collections/${collectionId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                fetchCollections();
                if (selectedCollection === collectionId) {
                    setSelectedCollection(null);
                    setBookmarks([]);
                }
            }
        } catch (error) {
            console.error('Error deleting collection:', error);
        }
    };

    const removeBookmark = async (contentType: string, contentId: string) => {
        if (!token) return;
        try {
            const res = await fetch(`${API_URL}/api/bookmarks/${contentType}/${contentId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok && selectedCollection) {
                fetchBookmarks(selectedCollection);
                fetchCollections();
            }
        } catch (error) {
            console.error('Error removing bookmark:', error);
        }
    };

    const getBookmarkLink = (bookmark: BookmarkItem): string => {
        const slug = bookmark.content?.slug || bookmark.contentId;
        switch (bookmark.contentType) {
            case 'blog': return `/blog/${slug}`;
            case 'discussion': return `/forums/${bookmark.contentId}`;
            case 'event': return `/events/${slug}`;
            case 'job': return `/jobs/${slug}`;
            case 'challenge': return `/challenges/${slug}`;
            default: return '#';
        }
    };


    if (!user) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto text-center py-16">
                    <Bookmark className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">Sign in to view bookmarks</h1>
                    <p className="text-gray-400 mb-6">Save your favorite content and organize it into collections</p>
                    <Link href="/auth">
                        <Button>Sign In</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Bookmarks</h1>
                        <p className="text-gray-400">Your saved content organized in collections</p>
                    </div>
                    <Button onClick={() => setShowNewCollection(true)} className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Collection
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Collections Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                            <h2 className="text-sm font-medium text-gray-400 mb-4">Collections</h2>

                            {/* New Collection Form */}
                            {showNewCollection && (
                                <div className="mb-4 p-3 bg-white/5 rounded-lg">
                                    <input
                                        type="text"
                                        value={newCollectionName}
                                        onChange={(e) => setNewCollectionName(e.target.value)}
                                        placeholder="Collection name"
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 mb-2"
                                        autoFocus
                                    />
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={createCollection}>
                                            <Check className="w-3 h-3" />
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => setShowNewCollection(false)}>
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Collection List */}
                            <div className="space-y-2">
                                {collections.map((collection) => (
                                    <div
                                        key={collection._id}
                                        className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${selectedCollection === collection._id
                                            ? 'bg-orange-500/20 border border-orange-500/50'
                                            : 'bg-white/5 border border-transparent hover:bg-white/10'
                                            }`}
                                        onClick={() => setSelectedCollection(collection._id)}
                                    >
                                        {editingCollection === collection._id ? (
                                            <div className="flex-1 flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className="flex-1 px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm"
                                                    onClick={(e) => e.stopPropagation()}
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); updateCollection(collection._id); }}
                                                    className="text-green-400 hover:text-green-300"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setEditingCollection(null); }}
                                                    className="text-gray-400 hover:text-gray-300"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-3">
                                                    <Folder className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <p className="text-white text-sm font-medium">{collection.name}</p>
                                                        <p className="text-gray-500 text-xs">{collection.bookmarkCount} items</p>
                                                    </div>
                                                </div>
                                                {!collection.isDefault && (
                                                    <div className="hidden group-hover:flex items-center gap-1">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setEditingCollection(collection._id);
                                                                setEditName(collection.name);
                                                            }}
                                                            className="p-1 text-gray-400 hover:text-white"
                                                        >
                                                            <Edit2 className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); deleteCollection(collection._id); }}
                                                            className="p-1 text-gray-400 hover:text-red-400"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}

                                {collections.length === 0 && (
                                    <p className="text-gray-500 text-sm text-center py-4">No collections yet</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bookmarks Content */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="p-4 bg-white/[0.02] border border-white/10 rounded-xl animate-pulse">
                                        <div className="h-4 bg-white/10 rounded w-1/3 mb-2" />
                                        <div className="h-3 bg-white/5 rounded w-2/3" />
                                    </div>
                                ))}
                            </div>
                        ) : bookmarks.length > 0 ? (
                            <div className="space-y-4">
                                {bookmarks.map((bookmark) => (
                                    <div
                                        key={bookmark._id}
                                        className="group flex items-center justify-between p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.05] transition-all"
                                    >
                                        <Link href={getBookmarkLink(bookmark)} className="flex items-center gap-4 flex-1">
                                            <div className={`p-2 rounded-lg ${contentTypeColors[bookmark.contentType]}`}>
                                                {contentTypeIcons[bookmark.contentType]}
                                            </div>
                                            <div>
                                                <span className={`text-xs px-2 py-0.5 rounded ${contentTypeColors[bookmark.contentType]} mb-1 inline-block`}>
                                                    {contentTypeLabels[bookmark.contentType]}
                                                </span>
                                                <h3 className="text-white font-medium">
                                                    {bookmark.content?.title || bookmark.content?.name || 'Untitled'}
                                                </h3>
                                                <p className="text-gray-500 text-xs">
                                                    Saved {new Date(bookmark.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </Link>
                                        <button
                                            onClick={() => removeBookmark(bookmark.contentType, bookmark.contentId)}
                                            className="p-2 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Remove bookmark"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : selectedCollection ? (
                            <div className="text-center py-16">
                                <Bookmark className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">No bookmarks in this collection</p>
                                <p className="text-gray-500 text-sm mt-2">Save content from blogs, forums, events, and more</p>
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <Folder className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">Select a collection to view bookmarks</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
