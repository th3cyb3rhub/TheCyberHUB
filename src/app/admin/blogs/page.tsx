'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { fetchApi, tokenStore } from '@/lib/api';
import {
    Loader2,
    Search,
    Star,
    StarOff,
    Trash2,
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Eye,
    Calendar,
    User,
    BookOpen,
} from 'lucide-react';
import Link from 'next/link';

interface Blog {
    _id: string;
    title: string;
    slug: string;
    category: string;
    status: string;
    isFeatured: boolean;
    viewCount: number;
    createdAt: string;
    author: {
        _id: string;
        username: string;
        name: string;
        avatar?: string;
    };
}

const CATEGORIES = [
    'All',
    'Cybersecurity',
    'Web Development',
    'DevOps',
    'Cloud',
    'AI/ML',
    'Programming',
    'Networking',
    'Other',
];

export default function AdminBlogsPage() {
    const { user: currentUser, loading: authLoading } = useAuth();
    const { addToast } = useToast();

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const [category, setCategory] = useState('All');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [confirmAction, setConfirmAction] = useState<{ id: string; type: 'delete' | 'feature'; title: string } | null>(null);

    const token = tokenStore.get();

    const fetchBlogs = useCallback(async (p = 1) => {
        if (!token) return;
        setLoading(true);
        try {
            const params = new URLSearchParams({ page: String(p), limit: '15' });
            if (debouncedSearch) params.set('search', debouncedSearch);
            if (category !== 'All') params.set('category', category);

            const data = await fetchApi(`/api/blogs?${params}`);
            setBlogs(data.data);
            setTotalPages(data.pagination.pages);
            setTotal(data.pagination.total);
            setPage(p);
        } catch {
            addToast({ variant: 'error', title: 'Error', message: 'Failed to fetch blogs' });
        } finally {
            setLoading(false);
        }
    }, [token, debouncedSearch, category, addToast]);

    useEffect(() => {
        if (!authLoading && currentUser) fetchBlogs(1);
    }, [authLoading, currentUser, fetchBlogs]);

    const handleToggleFeatured = async (id: string) => {
        setActionLoading(id);
        try {
            const data = await fetchApi(`/api/blogs/${id}/feature`, {
                method: 'PUT',
            });
            setBlogs(prev => prev.map(b => b._id === id ? { ...b, isFeatured: data.data.isFeatured } : b));
            addToast({ variant: 'success', title: 'Success', message: data.message });
        } catch {
            addToast({ variant: 'error', title: 'Error', message: 'Failed to toggle featured' });
        } finally {
            setActionLoading(null);
            setConfirmAction(null);
        }
    };

    const handleDelete = async (id: string) => {
        setActionLoading(id);
        try {
            await fetchApi(`/api/blogs/${id}`, {
                method: 'DELETE',
            });
            setBlogs(prev => prev.filter(b => b._id !== id));
            setTotal(prev => prev - 1);
            addToast({ variant: 'success', title: 'Deleted', message: 'Blog deleted successfully' });
        } catch {
            addToast({ variant: 'error', title: 'Error', message: 'Failed to delete blog' });
        } finally {
            setActionLoading(null);
            setConfirmAction(null);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!currentUser || !['moderator', 'admin', 'owner'].includes(currentUser.role)) return null;

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Blog Management</h1>
                            <p className="text-sm text-gray-400">{total} total posts</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && fetchBlogs(1)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50"
                        />
                    </div>
                    <select
                        value={category}
                        onChange={(e) => { setCategory(e.target.value); }}
                        className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-orange-500/50"
                    >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                {/* Confirmation Modal */}
                {confirmAction && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setConfirmAction(null)}>
                        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4" role="dialog" aria-modal="true" aria-label="Confirm action" onClick={e => e.stopPropagation()}>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {confirmAction.type === 'delete' ? 'Delete Blog' : 'Toggle Featured'}
                            </h3>
                            <p className="text-sm text-gray-400 mb-6">
                                {confirmAction.type === 'delete'
                                    ? `Are you sure you want to permanently delete "${confirmAction.title}"? This cannot be undone.`
                                    : `Toggle featured status of "${confirmAction.title}"?`}
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setConfirmAction(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
                                <button
                                    onClick={() => confirmAction.type === 'delete' ? handleDelete(confirmAction.id) : handleToggleFeatured(confirmAction.id)}
                                    disabled={actionLoading === confirmAction.id}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${confirmAction.type === 'delete' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'}`}
                                >
                                    {actionLoading === confirmAction.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Blog List */}
                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No blogs found</div>
                ) : (
                    <div className="space-y-3">
                        {blogs.map(blog => (
                            <div key={blog._id} className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-sm font-medium text-white truncate">{blog.title}</h3>
                                        {blog.isFeatured && (
                                            <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium">
                                                <Star className="w-3 h-3" /> Featured
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1"><User className="w-3 h-3" />{blog.author?.username || 'Unknown'}</span>
                                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{blog.viewCount} views</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        {blog.category && <span className="px-1.5 py-0.5 rounded bg-white/5 text-gray-400">{blog.category}</span>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {(currentUser.role === 'admin' || currentUser.role === 'owner') && (
                                        <button
                                            onClick={() => setConfirmAction({ id: blog._id, type: 'feature', title: blog.title })}
                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-yellow-400 transition-colors"
                                            title={blog.isFeatured ? 'Unfeature' : 'Feature'}
                                        >
                                            {blog.isFeatured ? <StarOff className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setConfirmAction({ id: blog._id, type: 'delete', title: blog.title })}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button onClick={() => fetchBlogs(page - 1)} disabled={page <= 1} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 disabled:opacity-30 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
                        <button onClick={() => fetchBlogs(page + 1)} disabled={page >= totalPages} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 disabled:opacity-30 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
