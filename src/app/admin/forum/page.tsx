'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { fetchApi, tokenStore } from '@/lib/api';
import {
    Loader2,
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    MessageSquare,
    Pin,
    PinOff,
    Lock,
    Unlock,
    Trash2,
    Search,
    Eye,
    MessageCircle,
    Calendar,
    User,
    Flag,
    CheckCircle,
    AlertTriangle,
    Download,
} from 'lucide-react';
import Link from 'next/link';

interface Discussion {
    _id: string;
    title: string;
    category: string;
    isPinned: boolean;
    isLocked: boolean;
    viewCount: number;
    replyCount: number;
    createdAt: string;
    author: {
        _id: string;
        username: string;
        name?: string;
    };
}

const CATEGORIES = [
    'All',
    'General',
    'Help',
    'Cybersecurity',
    'Programming',
    'Networking',
    'Career',
    'Off-Topic',
];

export default function AdminForumPage() {
    const { user: currentUser, loading: authLoading } = useAuth();
    const { addToast } = useToast();

    const [discussions, setDiscussions] = useState<Discussion[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const [category, setCategory] = useState('All');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [confirmAction, setConfirmAction] = useState<{ id: string; type: 'delete' | 'pin' | 'lock' | 'delete-reply'; title: string; current?: boolean } | null>(null);

    // Reply moderation
    interface FlaggedReply {
        _id: string;
        content: string;
        author: { _id: string; username: string };
        discussionId: string;
        discussionTitle: string;
        createdAt: string;
        reportCount: number;
    }
    const [flaggedReplies, setFlaggedReplies] = useState<FlaggedReply[]>([]);
    const [showReplies, setShowReplies] = useState(false);
    const [repliesLoading, setRepliesLoading] = useState(false);

    const fetchFlaggedReplies = useCallback(async () => {
        setRepliesLoading(true);
        try {
            // Attempt to fetch flagged/reported replies
            const data = await fetchApi('/api/forum/replies/reported');
            setFlaggedReplies(data.data || []);
        } catch {
            // Endpoint may not exist yet - gracefully handle
            setFlaggedReplies([]);
        } finally {
            setRepliesLoading(false);
        }
    }, []);

    const handleDeleteReply = async (replyId: string) => {
        setActionLoading(replyId);
        try {
            await fetchApi(`/api/forum/replies/${replyId}`, { method: 'DELETE' });
            setFlaggedReplies(prev => prev.filter(r => r._id !== replyId));
            addToast({ variant: 'success', title: 'Deleted', message: 'Reply deleted' });
        } catch {
            addToast({ variant: 'error', title: 'Error', message: 'Failed to delete reply' });
        } finally {
            setActionLoading(null);
            setConfirmAction(null);
        }
    };

    const handleApproveReply = async (replyId: string) => {
        setActionLoading(replyId);
        try {
            await fetchApi(`/api/forum/replies/${replyId}/approve`, { method: 'POST' });
            setFlaggedReplies(prev => prev.filter(r => r._id !== replyId));
            addToast({ variant: 'success', title: 'Approved', message: 'Reply approved and unflagged' });
        } catch {
            addToast({ variant: 'error', title: 'Error', message: 'Failed to approve reply' });
        } finally {
            setActionLoading(null);
        }
    };

    // CSV export for discussions
    const exportDiscussionsCSV = () => {
        const header = ['Title', 'Author', 'Category', 'Views', 'Replies', 'Pinned', 'Locked', 'Created'];
        const rows = discussions.map(d => [
            d.title,
            d.author?.username || 'Unknown',
            d.category || '-',
            d.viewCount,
            d.replyCount,
            d.isPinned ? 'Yes' : 'No',
            d.isLocked ? 'Yes' : 'No',
            new Date(d.createdAt).toLocaleDateString(),
        ]);
        const csv = [header, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `forum-discussions-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const token = tokenStore.get();

    const fetchDiscussions = useCallback(async (p = 1) => {
        if (!token) return;
        setLoading(true);
        try {
            const params = new URLSearchParams({ page: String(p), limit: '20' });
            if (debouncedSearch) params.set('search', debouncedSearch);
            if (category !== 'All') params.set('category', category.toLowerCase());

            const data = await fetchApi(`/api/forum/discussions?${params}`);
            setDiscussions(data.data);
            setTotalPages(data.pagination?.pages || 1);
            setTotal(data.pagination?.total || data.data.length);
            setPage(p);
        } catch {
            addToast({ variant: 'error', title: 'Error', message: 'Failed to fetch discussions' });
        } finally {
            setLoading(false);
        }
    }, [token, debouncedSearch, category, addToast]);

    useEffect(() => {
        if (!authLoading && currentUser) fetchDiscussions(1);
    }, [authLoading, currentUser, fetchDiscussions]);

    const handleTogglePin = async (id: string) => {
        setActionLoading(id);
        try {
            const data = await fetchApi(`/api/forum/discussions/${id}/pin`, {
                method: 'POST',
            });
            setDiscussions(prev => prev.map(d => d._id === id ? { ...d, isPinned: data.data.isPinned } : d));
            addToast({ variant: 'success', title: 'Success', message: data.message });
        } catch {
            addToast({ variant: 'error', title: 'Error', message: 'Failed to toggle pin' });
        } finally {
            setActionLoading(null);
            setConfirmAction(null);
        }
    };

    const handleToggleLock = async (id: string) => {
        setActionLoading(id);
        try {
            const data = await fetchApi(`/api/forum/discussions/${id}/lock`, {
                method: 'POST',
            });
            setDiscussions(prev => prev.map(d => d._id === id ? { ...d, isLocked: data.data.isLocked } : d));
            addToast({ variant: 'success', title: 'Success', message: data.message });
        } catch {
            addToast({ variant: 'error', title: 'Error', message: 'Failed to toggle lock' });
        } finally {
            setActionLoading(null);
            setConfirmAction(null);
        }
    };

    const handleDelete = async (id: string) => {
        setActionLoading(id);
        try {
            await fetchApi(`/api/forum/discussions/${id}`, {
                method: 'DELETE',
            });
            setDiscussions(prev => prev.filter(d => d._id !== id));
            setTotal(prev => prev - 1);
            addToast({ variant: 'success', title: 'Deleted', message: 'Discussion deleted' });
        } catch {
            addToast({ variant: 'error', title: 'Error', message: 'Failed to delete' });
        } finally {
            setActionLoading(null);
            setConfirmAction(null);
        }
    };

    const executeConfirmAction = () => {
        if (!confirmAction) return;
        switch (confirmAction.type) {
            case 'pin': handleTogglePin(confirmAction.id); break;
            case 'lock': handleToggleLock(confirmAction.id); break;
            case 'delete': handleDelete(confirmAction.id); break;
            case 'delete-reply': handleDeleteReply(confirmAction.id); break;
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
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Forum Moderation</h1>
                                <p className="text-sm text-gray-400">{total} discussions</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => { setShowReplies(!showReplies); if (!showReplies) fetchFlaggedReplies(); }}
                                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${showReplies ? 'border-orange-500/50 bg-orange-500/10 text-orange-400' : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'}`}
                            >
                                <Flag className="w-3.5 h-3.5" />
                                Flagged Replies
                            </button>
                            <button
                                onClick={exportDiscussionsCSV}
                                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors"
                            >
                                <Download className="w-3.5 h-3.5" />
                                Export CSV
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search discussions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && fetchDiscussions(1)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50"
                        />
                    </div>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
                                {confirmAction.type === 'delete' ? 'Delete Discussion' :
                                    confirmAction.type === 'pin' ? (confirmAction.current ? 'Unpin' : 'Pin') + ' Discussion' :
                                        (confirmAction.current ? 'Unlock' : 'Lock') + ' Discussion'}
                            </h3>
                            <p className="text-sm text-gray-400 mb-6">
                                {confirmAction.type === 'delete'
                                    ? `Permanently delete "${confirmAction.title}"? This cannot be undone.`
                                    : `${confirmAction.type === 'pin' ? (confirmAction.current ? 'Unpin' : 'Pin') : (confirmAction.current ? 'Unlock' : 'Lock')} "${confirmAction.title}"?`}
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setConfirmAction(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
                                <button
                                    onClick={executeConfirmAction}
                                    disabled={actionLoading === confirmAction.id}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${confirmAction.type === 'delete' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
                                        }`}
                                >
                                    {actionLoading === confirmAction.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Flagged Replies Section */}
                {showReplies && (
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            <h2 className="text-lg font-semibold text-white">Flagged / Reported Replies</h2>
                        </div>
                        {repliesLoading ? (
                            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-orange-500" /></div>
                        ) : flaggedReplies.length === 0 ? (
                            <div className="text-center py-8 border border-white/10 rounded-xl bg-white/[0.02]">
                                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                <p className="text-gray-400 text-sm">No flagged replies to review</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {flaggedReplies.map(reply => (
                                    <div key={reply._id} className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{reply.author?.username}</span>
                                                    <span>in &quot;{reply.discussionTitle}&quot;</span>
                                                    <span className="flex items-center gap-1"><Flag className="w-3 h-3 text-red-400" />{reply.reportCount} reports</span>
                                                </div>
                                                <p className="text-sm text-gray-300 line-clamp-3">{reply.content}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                <button
                                                    onClick={() => handleApproveReply(reply._id)}
                                                    disabled={actionLoading === reply._id}
                                                    className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors"
                                                    title="Approve"
                                                >
                                                    {actionLoading === reply._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => setConfirmAction({ id: reply._id, type: 'delete-reply', title: 'Reply' })}
                                                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Discussion List */}
                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>
                ) : discussions.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No discussions found</div>
                ) : (
                    <div className="space-y-3">
                        {discussions.map(disc => (
                            <div key={disc._id} className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h3 className="text-sm font-medium text-white truncate max-w-lg">{disc.title}</h3>
                                        {disc.isPinned && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">
                                                <Pin className="w-3 h-3" /> Pinned
                                            </span>
                                        )}
                                        {disc.isLocked && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                                                <Lock className="w-3 h-3" /> Locked
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1"><User className="w-3 h-3" />{disc.author?.username || 'Unknown'}</span>
                                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{disc.viewCount}</span>
                                        <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{disc.replyCount}</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(disc.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                        {disc.category && <span className="px-1.5 py-0.5 rounded bg-white/5 text-gray-400">{disc.category}</span>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => setConfirmAction({ id: disc._id, type: 'pin', title: disc.title, current: disc.isPinned })}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-colors"
                                        title={disc.isPinned ? 'Unpin' : 'Pin'}
                                    >
                                        {disc.isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => setConfirmAction({ id: disc._id, type: 'lock', title: disc.title, current: disc.isLocked })}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-yellow-500/20 text-gray-400 hover:text-yellow-400 transition-colors"
                                        title={disc.isLocked ? 'Unlock' : 'Lock'}
                                    >
                                        {disc.isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                    </button>
                                    {(currentUser.role === 'admin' || currentUser.role === 'owner') && (
                                        <button
                                            onClick={() => setConfirmAction({ id: disc._id, type: 'delete', title: disc.title })}
                                            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button onClick={() => fetchDiscussions(page - 1)} disabled={page <= 1} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 disabled:opacity-30 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
                        <button onClick={() => fetchDiscussions(page + 1)} disabled={page >= totalPages} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 disabled:opacity-30 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
