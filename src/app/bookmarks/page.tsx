'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Bookmark, Plus, Folder, FileText, MessageSquare, Calendar, Briefcase, Trash2, Edit2, X, Check, Search, ArrowUpDown, CheckSquare, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/ConfirmDialog';
import { fetchApi } from '@/lib/api';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/context/ToastContext';
import { useDebounce } from '@/hooks/useDebounce';

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
    const { isOpen: confirmOpen, confirm: showConfirm, onConfirm, onCancel } = useConfirmDialog();
    const { addToast } = useToast();

    // Search
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);

    // Sort
    const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // Bulk operations
    const [selectedBookmarks, setSelectedBookmarks] = useState<Set<string>>(new Set());
    const [bulkMode, setBulkMode] = useState(false);
    const [bulkLoading, setBulkLoading] = useState(false);

    // Prevent race condition: track in-flight delete
    const [deletingBookmarks, setDeletingBookmarks] = useState<Set<string>>(new Set());

    // Filtered and sorted bookmarks
    const filteredBookmarks = useMemo(() => {
        let filtered = [...bookmarks];

        // Filter by search query
        if (debouncedSearch) {
            const query = debouncedSearch.toLowerCase();
            filtered = filtered.filter(b =>
                (b.content?.title || b.content?.name || '').toLowerCase().includes(query) ||
                b.contentType.toLowerCase().includes(query)
            );
        }

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === 'name') {
                const nameA = (a.content?.title || a.content?.name || '').toLowerCase();
                const nameB = (b.content?.title || b.content?.name || '').toLowerCase();
                return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            } else {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            }
        });

        return filtered;
    }, [bookmarks, debouncedSearch, sortBy, sortOrder]);

    const toggleBookmarkSelection = (id: string) => {
        setSelectedBookmarks(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const selectAll = () => {
        if (selectedBookmarks.size === filteredBookmarks.length) {
            setSelectedBookmarks(new Set());
        } else {
            setSelectedBookmarks(new Set(filteredBookmarks.map(b => b._id)));
        }
    };

    const handleBulkDelete = async () => {
        if (selectedBookmarks.size === 0) return;
        const confirmed = await showConfirm();
        if (!confirmed) return;
        setBulkLoading(true);
        try {
            const promises = Array.from(selectedBookmarks).map(id => {
                const bm = bookmarks.find(b => b._id === id);
                if (bm) return fetchApi(`/api/bookmarks/${bm.contentType}/${bm.contentId}`, { method: 'DELETE' });
                return Promise.resolve();
            });
            await Promise.all(promises);
            setSelectedBookmarks(new Set());
            setBulkMode(false);
            if (selectedCollection) {
                await Promise.all([fetchBookmarks(selectedCollection), fetchCollections()]);
            }
            addToast({ message: 'Bookmarks removed', variant: 'success' });
        } catch {
            addToast({ message: 'Failed to remove some bookmarks', variant: 'error' });
        } finally {
            setBulkLoading(false);
        }
    };


    const fetchCollections = useCallback(async () => {
        if (!token) return;
        try {
            const data = await fetchApi('/api/bookmarks/collections');
            setCollections(data.collections || []);
            if (data.collections?.length > 0 && !selectedCollection) {
                setSelectedCollection(data.collections[0]._id);
            }
        } catch (error) {
            console.error('Error fetching collections:', error);
            addToast({ message: 'Failed to load collections', variant: 'error' });
        }
    }, [token, selectedCollection, addToast]);

    const fetchBookmarks = useCallback(async (collectionId: string) => {
        if (!token) return;
        setLoading(true);
        try {
            const data = await fetchApi(`/api/bookmarks/collections/${collectionId}/bookmarks`);
            setBookmarks(data.bookmarks || []);
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
            addToast({ message: 'Failed to load bookmarks', variant: 'error' });
        } finally {
            setLoading(false);
        }
    }, [token]);

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
            await fetchApi('/api/bookmarks/collections', {
                method: 'POST',
                body: JSON.stringify({ name: newCollectionName }),
            });
            setNewCollectionName('');
            setShowNewCollection(false);
            fetchCollections();
        } catch (error) {
            console.error('Error creating collection:', error);
            addToast({ message: 'Failed to create collection', variant: 'error' });
        }
    };

    const updateCollection = async (collectionId: string) => {
        if (!token || !editName.trim()) return;
        try {
            await fetchApi(`/api/bookmarks/collections/${collectionId}`, {
                method: 'PATCH',
                body: JSON.stringify({ name: editName }),
            });
            setEditingCollection(null);
            setEditName('');
            fetchCollections();
        } catch (error) {
            console.error('Error updating collection:', error);
            addToast({ message: 'Failed to update collection', variant: 'error' });
        }
    };

    const deleteCollection = async (collectionId: string) => {
        if (!token) return;
        const confirmed = await showConfirm();
        if (!confirmed) return;
        try {
            await fetchApi(`/api/bookmarks/collections/${collectionId}`, {
                method: 'DELETE',
            });
            if (selectedCollection === collectionId) {
                setSelectedCollection(null);
                setBookmarks([]);
            }
            await fetchCollections();
        } catch (error) {
            console.error('Error deleting collection:', error);
            addToast({ message: 'Failed to delete collection', variant: 'error' });
        }
    };

    const removeBookmark = async (bookmarkId: string, contentType: string, contentId: string) => {
        if (!token || deletingBookmarks.has(bookmarkId)) return;
        setDeletingBookmarks(prev => new Set(prev).add(bookmarkId));
        // Optimistic UI: remove immediately
        setBookmarks(prev => prev.filter(b => b._id !== bookmarkId));
        try {
            await fetchApi(`/api/bookmarks/${contentType}/${contentId}`, {
                method: 'DELETE',
            });
            if (selectedCollection) {
                // Both fetches run in parallel after delete
                await Promise.all([fetchBookmarks(selectedCollection), fetchCollections()]);
            }
        } catch (error) {
            console.error('Error removing bookmark:', error);
            addToast({ message: 'Failed to remove bookmark', variant: 'error' });
            // Rollback: refetch
            if (selectedCollection) fetchBookmarks(selectedCollection);
        } finally {
            setDeletingBookmarks(prev => {
                const next = new Set(prev);
                next.delete(bookmarkId);
                return next;
            });
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
                                                            className="p-2.5 text-gray-400 hover:text-white"
                                                        >
                                                            <Edit2 className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); deleteCollection(collection._id); }}
                                                            className="p-2.5 text-gray-400 hover:text-red-400"
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
                        {/* Search and Sort Bar */}
                        {selectedCollection && bookmarks.length > 0 && (
                            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search bookmarks..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            if (sortBy === 'date') {
                                                setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
                                            } else {
                                                setSortBy('date');
                                                setSortOrder('desc');
                                            }
                                        }}
                                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${sortBy === 'date' ? 'border-orange-500/50 bg-orange-500/10 text-orange-400' : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'}`}
                                    >
                                        <Calendar className="w-3 h-3" />
                                        Date {sortBy === 'date' && (sortOrder === 'desc' ? '(newest)' : '(oldest)')}
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (sortBy === 'name') {
                                                setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
                                            } else {
                                                setSortBy('name');
                                                setSortOrder('asc');
                                            }
                                        }}
                                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${sortBy === 'name' ? 'border-orange-500/50 bg-orange-500/10 text-orange-400' : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'}`}
                                    >
                                        <ArrowUpDown className="w-3 h-3" />
                                        Name {sortBy === 'name' && (sortOrder === 'asc' ? '(A-Z)' : '(Z-A)')}
                                    </button>
                                    <button
                                        onClick={() => { setBulkMode(!bulkMode); setSelectedBookmarks(new Set()); }}
                                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${bulkMode ? 'border-orange-500/50 bg-orange-500/10 text-orange-400' : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'}`}
                                    >
                                        <CheckSquare className="w-3 h-3" />
                                        Select
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Bulk Action Bar */}
                        {bulkMode && selectedBookmarks.size > 0 && (
                            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                <button onClick={selectAll} className="text-xs text-orange-400 hover:text-orange-300">
                                    {selectedBookmarks.size === filteredBookmarks.length ? 'Deselect All' : 'Select All'}
                                </button>
                                <span className="text-xs text-gray-400">{selectedBookmarks.size} selected</span>
                                <div className="flex-1" />
                                <Button size="sm" variant="outline" onClick={handleBulkDelete} disabled={bulkLoading}>
                                    {bulkLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                                    <span className="ml-1">Delete</span>
                                </Button>
                            </div>
                        )}

                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="p-4 bg-white/[0.02] border border-white/10 rounded-xl animate-pulse">
                                        <div className="h-4 bg-white/10 rounded w-1/3 mb-2" />
                                        <div className="h-3 bg-white/5 rounded w-2/3" />
                                    </div>
                                ))}
                            </div>
                        ) : filteredBookmarks.length > 0 ? (
                            <div className="space-y-4">
                                {filteredBookmarks.map((bookmark) => (
                                    <div
                                        key={bookmark._id}
                                        className="group flex items-center justify-between p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.05] transition-all"
                                    >
                                        {bulkMode && (
                                            <button
                                                onClick={() => toggleBookmarkSelection(bookmark._id)}
                                                className="mr-3 text-gray-400 hover:text-orange-400 transition-colors"
                                            >
                                                {selectedBookmarks.has(bookmark._id) ? (
                                                    <CheckSquare className="w-5 h-5 text-orange-400" />
                                                ) : (
                                                    <Square className="w-5 h-5" />
                                                )}
                                            </button>
                                        )}
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
                                            onClick={() => removeBookmark(bookmark._id, bookmark.contentType, bookmark.contentId)}
                                            disabled={deletingBookmarks.has(bookmark._id)}
                                            className="p-2 text-gray-400 hover:text-red-400 disabled:opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Remove bookmark"
                                        >
                                            {deletingBookmarks.has(bookmark._id) ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : selectedCollection && bookmarks.length > 0 && debouncedSearch ? (
                            <EmptyState
                                icon={Search}
                                title={`No bookmarks matching "${debouncedSearch}"`}
                                description="Try different keywords."
                            />
                        ) : selectedCollection ? (
                            <EmptyState
                                icon={Bookmark}
                                title="No bookmarks in this collection"
                                description="Save content from blogs, forums, events, and more."
                            />
                        ) : (
                            <EmptyState
                                icon={Folder}
                                title="Select a collection to view bookmarks"
                            />
                        )}
                    </div>
                </div>
            </div>

            <ConfirmDialog
                open={confirmOpen}
                onConfirm={onConfirm}
                onCancel={onCancel}
                title="Delete collection?"
                description="Are you sure you want to delete this collection?"
                confirmText="Delete"
                variant="danger"
            />
        </div>
    );
}
