'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { fetchApi } from '@/lib/api';
import {
    Flag,
    ArrowLeft,
    Loader2,
    CheckCircle,
    XCircle,
    Eye,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    Filter,
} from 'lucide-react';

interface FlagItem {
    _id: string;
    contentType: 'blog' | 'discussion' | 'feedPost' | 'reply' | 'comment';
    contentId: string;
    reason: string;
    details?: string;
    status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
    createdAt: string;
    reviewedAt?: string;
    reviewNote?: string;
    reporter?: { username: string; avatar?: string };
    reviewedBy?: { username: string };
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const REASON_LABELS: Record<string, string> = {
    spam: 'Spam',
    harassment: 'Harassment',
    hate_speech: 'Hate Speech',
    misinformation: 'Misinformation',
    inappropriate: 'Inappropriate',
    copyright: 'Copyright',
    other: 'Other',
};

const CONTENT_TYPE_LABELS: Record<string, string> = {
    blog: 'Blog Post',
    discussion: 'Discussion',
    feedPost: 'Feed Post',
    reply: 'Reply',
    comment: 'Comment',
};

const CONTENT_LINKS: Record<string, (id: string) => string> = {
    blog: (id) => `/blog/${id}`,
    discussion: (id) => `/forums/${id}`,
    feedPost: (id) => `/feed`,
    reply: (id) => `/forums`,
    comment: (id) => `/feed`,
};

const STATUS_STYLES: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    reviewed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    resolved: 'bg-green-500/10 text-green-400 border-green-500/20',
    dismissed: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export default function AdminModerationPage() {
    const { user, loading: authLoading } = useAuth();
    const { addToast } = useToast();
    const router = useRouter();

    const [flags, setFlags] = useState<FlagItem[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 1 });
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('pending');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [reviewing, setReviewing] = useState<string | null>(null);
    const [noteModal, setNoteModal] = useState<{ flagId: string; action: string } | null>(null);
    const [reviewNote, setReviewNote] = useState('');

    const fetchFlags = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ status: statusFilter, page: String(page), limit: '20' });
            if (typeFilter) params.set('contentType', typeFilter);
            const res = await fetchApi(`/api/moderation/queue?${params}`);
            setFlags(res.data || []);
            setPagination(res.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 });
        } catch {
            addToast({ variant: 'error', title: 'Error', message: 'Failed to load moderation queue' });
        } finally {
            setLoading(false);
        }
    }, [statusFilter, typeFilter, addToast]);

    useEffect(() => {
        if (!authLoading && !user) { router.push('/auth'); return; }
        if (!authLoading && user && !['moderator', 'admin', 'owner'].includes(user.role)) {
            router.push('/admin');
            return;
        }
        if (!authLoading && user) fetchFlags(1);
    }, [authLoading, user, fetchFlags, router]);

    const handleReview = async (flagId: string, status: 'resolved' | 'dismissed', note?: string) => {
        setReviewing(flagId);
        try {
            await fetchApi(`/api/moderation/flags/${flagId}`, {
                method: 'PATCH',
                body: JSON.stringify({ status, reviewNote: note || undefined }),
            });
            setFlags(prev => prev.filter(f => f._id !== flagId));
            setPagination(prev => ({ ...prev, total: prev.total - 1 }));
            addToast({
                variant: 'success',
                title: status === 'resolved' ? 'Content removed' : 'Flag dismissed',
                message: status === 'resolved' ? 'Content has been marked as resolved.' : 'Flag has been dismissed.',
            });
        } catch (err) {
            addToast({ variant: 'error', title: 'Error', message: err instanceof Error ? err.message : 'Failed to review flag' });
        } finally {
            setReviewing(null);
            setNoteModal(null);
            setReviewNote('');
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20">
                <Link href="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Admin
                </Link>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                <Flag className="w-5 h-5 text-red-400" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Moderation Queue</h1>
                        </div>
                        <p className="text-gray-400 text-sm ml-[52px]">
                            {pagination.total} {statusFilter} report{pagination.total !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Status:</span>
                    </div>
                    {['pending', 'reviewed', 'resolved', 'dismissed'].map(s => (
                        <button
                            key={s}
                            onClick={() => { setStatusFilter(s); fetchFlags(1); }}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-colors ${
                                statusFilter === s
                                    ? STATUS_STYLES[s]
                                    : 'border-white/10 text-gray-400 hover:border-white/20'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                    <div className="h-5 w-px bg-white/10 self-center" />
                    <select
                        value={typeFilter}
                        onChange={e => { setTypeFilter(e.target.value); fetchFlags(1); }}
                        className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:border-orange-500/50"
                    >
                        <option value="" className="bg-gray-900">All types</option>
                        {Object.entries(CONTENT_TYPE_LABELS).map(([k, v]) => (
                            <option key={k} value={k} className="bg-gray-900">{v}</option>
                        ))}
                    </select>
                </div>

                {/* Queue */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                    </div>
                ) : flags.length === 0 ? (
                    <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/[0.02]">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-1">Queue is clear</h3>
                        <p className="text-gray-400 text-sm">No {statusFilter} reports to review.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {flags.map(flag => (
                            <div key={flag._id} className={`rounded-xl border bg-white/[0.02] p-5 ${flag.status === 'pending' ? 'border-yellow-500/20' : 'border-white/10'}`}>
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        {/* Top row */}
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className={`text-xs px-2 py-0.5 rounded border ${STATUS_STYLES[flag.status]}`}>
                                                {flag.status}
                                            </span>
                                            <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                                                {CONTENT_TYPE_LABELS[flag.contentType] || flag.contentType}
                                            </span>
                                            <span className="text-xs px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400">
                                                {REASON_LABELS[flag.reason] || flag.reason}
                                            </span>
                                        </div>

                                        {/* Content ID + link */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <code className="text-xs text-gray-600 font-mono">{flag.contentId}</code>
                                            <a
                                                href={CONTENT_LINKS[flag.contentType]?.(flag.contentId) || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300"
                                            >
                                                <ExternalLink className="w-3 h-3" /> View content
                                            </a>
                                        </div>

                                        {flag.details && (
                                            <p className="text-sm text-gray-400 mb-2 bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                                                &ldquo;{flag.details}&rdquo;
                                            </p>
                                        )}

                                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                                            {flag.reporter && (
                                                <span>Reported by <span className="text-gray-400">@{flag.reporter.username}</span></span>
                                            )}
                                            <span>{new Date(flag.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                            {flag.reviewedBy && (
                                                <span>Reviewed by <span className="text-gray-400">@{flag.reviewedBy.username}</span></span>
                                            )}
                                            {flag.reviewNote && (
                                                <span className="text-blue-400">Note: {flag.reviewNote}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    {flag.status === 'pending' && (
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => setNoteModal({ flagId: flag._id, action: 'resolved' })}
                                                disabled={reviewing === flag._id}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                {reviewing === flag._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                                                Resolve
                                            </button>
                                            <button
                                                onClick={() => handleReview(flag._id, 'dismissed')}
                                                disabled={reviewing === flag._id}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                {reviewing === flag._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                                                Dismiss
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-8">
                        <p className="text-sm text-gray-500">
                            Page {pagination.page} of {pagination.totalPages} · {pagination.total} total
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => fetchFlags(pagination.page - 1)}
                                disabled={pagination.page <= 1 || loading}
                                className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-40 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => fetchFlags(pagination.page + 1)}
                                disabled={pagination.page >= pagination.totalPages || loading}
                                className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-40 transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Review note modal */}
            {noteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
                    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111] p-6 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <h3 className="text-white font-semibold">Resolve & remove content</h3>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                            This will mark the flag as resolved. Optionally add a moderator note.
                        </p>
                        <textarea
                            value={reviewNote}
                            onChange={e => setReviewNote(e.target.value)}
                            placeholder="Reason for action (optional)..."
                            rows={3}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none resize-none mb-4"
                        />
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => { setNoteModal(null); setReviewNote(''); }}
                                className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleReview(noteModal.flagId, 'resolved', reviewNote)}
                                disabled={reviewing === noteModal.flagId}
                                className="flex items-center gap-2 px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
                            >
                                {reviewing === noteModal.flagId && <Loader2 className="w-4 h-4 animate-spin" />}
                                Confirm Resolve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
