"use client"

import React, { useState } from 'react';
import { Flag, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { fetchApi } from '@/lib/api';

type ContentType = 'blog' | 'discussion' | 'feedPost' | 'reply' | 'comment';

interface ReportContentButtonProps {
    contentType: ContentType;
    contentId: string;
    className?: string;
}

const REASONS = [
    { value: 'spam', label: 'Spam' },
    { value: 'harassment', label: 'Harassment or bullying' },
    { value: 'hate_speech', label: 'Hate speech' },
    { value: 'misinformation', label: 'Misinformation' },
    { value: 'inappropriate', label: 'Inappropriate content' },
    { value: 'copyright', label: 'Copyright violation' },
    { value: 'other', label: 'Other' },
];

export function ReportContentButton({ contentType, contentId, className = '' }: ReportContentButtonProps) {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState('');
    const [details, setDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    if (!user) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reason) return;
        setLoading(true);
        try {
            await fetchApi('/api/moderation/flag', {
                method: 'POST',
                body: JSON.stringify({ contentType, contentId, reason, details: details || undefined }),
            });
            setDone(true);
            addToast({ variant: 'success', title: 'Report submitted', message: 'Thank you. Our team will review it.' });
            setTimeout(() => { setOpen(false); setDone(false); setReason(''); setDetails(''); }, 1500);
        } catch (err) {
            addToast({ variant: 'error', title: 'Error', message: err instanceof Error ? err.message : 'Failed to submit report' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={`inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors ${className}`}
                title="Report this content"
            >
                <Flag className="w-3.5 h-3.5" />
                Report
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4" onClick={() => setOpen(false)}>
                    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111] p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                        {done ? (
                            <div className="text-center py-4">
                                <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
                                <p className="text-white font-medium">Report submitted</p>
                                <p className="text-gray-400 text-sm mt-1">Thank you for helping keep the community safe.</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                                        <Flag className="w-4 h-4 text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Report content</h3>
                                        <p className="text-xs text-gray-500">This will be reviewed by our moderation team.</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Reason *</label>
                                        <div className="space-y-2">
                                            {REASONS.map(r => (
                                                <label key={r.value} className="flex items-center gap-3 cursor-pointer group">
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                                                        reason === r.value
                                                            ? 'border-orange-500 bg-orange-500'
                                                            : 'border-white/20 group-hover:border-white/40'
                                                    }`}>
                                                        {reason === r.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name="reason"
                                                        value={r.value}
                                                        checked={reason === r.value}
                                                        onChange={() => setReason(r.value)}
                                                        className="sr-only"
                                                    />
                                                    <span className={`text-sm transition-colors ${reason === r.value ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                                        {r.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Additional details (optional)</label>
                                        <textarea
                                            value={details}
                                            onChange={e => setDetails(e.target.value)}
                                            placeholder="Provide any additional context..."
                                            rows={3}
                                            maxLength={500}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none resize-none"
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-1">
                                        <button
                                            type="button"
                                            onClick={() => setOpen(false)}
                                            className="flex-1 py-2.5 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={!reason || loading}
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm bg-red-500 hover:bg-red-600 disabled:bg-red-500/40 text-white font-medium rounded-xl transition-colors"
                                        >
                                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Flag className="w-4 h-4" />}
                                            Submit Report
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
