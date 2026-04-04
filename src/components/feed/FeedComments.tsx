'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Send, Loader2, CornerDownRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface Comment {
    _id: string;
    author: { _id: string; name: string; username: string; avatar?: string };
    content: string;
    createdAt: string;
    parentComment?: string;
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function FeedComments({
    postId,
    onCountChange,
}: {
    postId: string;
    onCountChange?: (count: number) => void;
}) {
    const { user } = useAuth();
    const userId = user ? user.id : null;
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [total, setTotal] = useState(0);
    const [parentCommentId, setParentCommentId] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleReplyClick = (commentId: string, username: string) => {
        setParentCommentId(commentId);
        setNewComment(`@${username} `);
        inputRef.current?.focus();
    };

    const fetchComments = useCallback(async () => {
        try {
            const data = await fetchApi(`/api/feed/posts/${postId}/comments?limit=50`);
            setComments(data.data || []);
            setTotal(data.pagination?.total || 0);
        } catch (err) {
            console.error('Failed to load comments:', err);
        } finally {
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleSubmit = async () => {
        if (!newComment.trim() || submitting || !user) return;
        setSubmitting(true);
        try {
            const data = await fetchApi(`/api/feed/posts/${postId}/comments`, {
                method: 'POST',
                body: JSON.stringify({
                    content: newComment.trim(),
                    parentComment: parentCommentId
                }),
            });
            setComments((prev) => [...prev, data.data]);
            setNewComment('');
            setParentCommentId(null);
            setTotal((prev) => prev + 1);
            onCountChange?.(total + 1);
        } catch (err) {
            console.error('Failed to add comment:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (commentId: string) => {
        try {
            await fetchApi(`/api/feed/comments/${commentId}`, {
                method: 'DELETE',
            });
            setComments((prev) => prev.filter((c) => c._id !== commentId));
            setTotal((prev) => Math.max(0, prev - 1));
            onCountChange?.(Math.max(0, total - 1));
        } catch (err) {
            console.error('Failed to delete comment:', err);
        }
    };

    return (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
            {/* Comment list */}
            {loading ? (
                <div className="flex justify-center py-3">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400 dark:text-gray-500" />
                </div>
            ) : comments.length > 0 ? (
                <div className="space-y-4 mb-3 max-h-[300px] overflow-y-auto pr-1">
                    {(() => {
                        const rendered = new Set<string>();
                        const elements: React.ReactNode[] = [];

                        comments.forEach(comment => {
                            if (rendered.has(comment._id)) return;

                            // Render parent
                            rendered.add(comment._id);

                            // Check if this comment is technically a reply that got orphaned (shouldn't happen often but defensive)
                            const isReply = !!comment.parentComment || comment.content.trim().startsWith('@');

                            elements.push(
                                <div key={comment._id} className="space-y-3">
                                    <div className={`flex gap-2.5 group relative ${isReply ? 'ml-8 sm:ml-12' : ''}`}>
                                        {isReply && (
                                            <div className="absolute -left-5 top-3 w-4 h-4 border-l-2 border-b-2 border-gray-200 dark:border-white/10 rounded-bl-lg pointer-events-none" />
                                        )}
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white text-[10px] font-bold shrink-0 z-10">
                                            {comment.author.avatar ? (
                                                <Image src={comment.author.avatar} alt={comment.author.name} width={28} height={28} className="w-7 h-7 rounded-full object-cover" unoptimized />
                                            ) : (
                                                comment.author.name.charAt(0).toUpperCase()
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent rounded-xl px-3 py-2">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <Link
                                                        href={`/profile/${comment.author.username}`}
                                                        className="text-xs font-semibold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                                                    >
                                                        {comment.author.name}
                                                    </Link>
                                                    <span className="text-[10px] text-gray-500 dark:text-gray-600">{timeAgo(comment.createdAt)}</span>
                                                </div>
                                                <p className="text-xs text-gray-800 dark:text-gray-300 leading-relaxed">
                                                    {isReply ? (
                                                        <>
                                                            <span className="text-orange-500 dark:text-orange-400 font-medium">{comment.content.split(' ')[0]}</span>
                                                            {' ' + comment.content.split(' ').slice(1).join(' ')}
                                                        </>
                                                    ) : (
                                                        comment.content
                                                    )}
                                                </p>
                                            </div>
                                            {/* Actions */}
                                            <div className="flex items-center gap-4 mt-1.5 ml-1">
                                                <button
                                                    onClick={() => handleReplyClick(comment._id, comment.author.username)}
                                                    className="flex items-center gap-1 text-[11px] text-gray-500 font-medium hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                                                >
                                                    <CornerDownRight className="w-3 h-3" />
                                                    Reply
                                                </button>
                                                {userId && comment.author._id === userId && (
                                                    <button
                                                        onClick={() => handleDelete(comment._id)}
                                                        className="text-[11px] text-gray-500 font-medium hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Find and render immediate replies to this specific comment */}
                                    {comments.filter(c =>
                                        !rendered.has(c._id) &&
                                        (
                                            (c.parentComment === comment._id) ||
                                            // Fallback for old comments without parentComment
                                            (!c.parentComment && c.content.trim().startsWith(`@${comment.author.username} `) && new Date(c.createdAt) >= new Date(comment.createdAt))
                                        )
                                    ).map(reply => {
                                        rendered.add(reply._id);
                                        return (
                                            <div key={reply._id} className="flex gap-2.5 group relative ml-8 sm:ml-12 mt-3">
                                                <div className="absolute -left-5 top-3 w-4 h-4 border-l-2 border-b-2 border-gray-200 dark:border-white/10 rounded-bl-lg pointer-events-none" />
                                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white text-[10px] font-bold shrink-0 z-10">
                                                    {reply.author.avatar ? (
                                                        <Image src={reply.author.avatar} alt={reply.author.name} width={28} height={28} className="w-7 h-7 rounded-full object-cover" unoptimized />
                                                    ) : (
                                                        reply.author.name.charAt(0).toUpperCase()
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent rounded-xl px-3 py-2">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <Link
                                                                href={`/profile/${reply.author.username}`}
                                                                className="text-xs font-semibold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                                                            >
                                                                {reply.author.name}
                                                            </Link>
                                                            <span className="text-[10px] text-gray-500 dark:text-gray-600">{timeAgo(reply.createdAt)}</span>
                                                        </div>
                                                        <p className="text-xs text-gray-800 dark:text-gray-300 leading-relaxed">
                                                            <span className="text-orange-500 dark:text-orange-400 font-medium">@{comment.author.username}</span>
                                                            {' ' + reply.content.substring(comment.author.username.length + 2)}
                                                        </p>
                                                    </div>
                                                    {/* Actions */}
                                                    <div className="flex items-center gap-4 mt-1.5 ml-1">
                                                        <button
                                                            onClick={() => handleReplyClick(reply._id, reply.author.username)}
                                                            className="flex items-center gap-1 text-[11px] text-gray-500 font-medium hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                                                        >
                                                            <CornerDownRight className="w-3 h-3" />
                                                            Reply
                                                        </button>
                                                        {userId && reply.author._id === userId && (
                                                            <button
                                                                onClick={() => handleDelete(reply._id)}
                                                                className="text-[11px] text-gray-500 font-medium hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        });

                        return elements;
                    })()}
                </div>
            ) : null}

            {/* Add comment */}
            {user && (
                <div className="flex gap-2 items-start">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        {user.avatar ? (
                            <Image src={user.avatar} alt="Your avatar" width={28} height={28} className="w-7 h-7 rounded-full object-cover" unoptimized />
                        ) : (
                            user.name?.charAt(0)?.toUpperCase() || 'U'
                        )}
                    </div>
                    <div className="flex-1 flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
                            placeholder="Write a comment..."
                            className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-orange-500/30 transition-colors"
                            maxLength={500}
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={!newComment.trim() || submitting}
                            className={`p-2 rounded-xl transition-all border ${newComment.trim()
                                ? 'bg-orange-500 hover:bg-orange-600 border-orange-500 text-white shadow-sm'
                                : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-500 cursor-not-allowed'
                                }`}
                            aria-label="Submit comment"
                        >
                            {submitting ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <Send className="w-3.5 h-3.5" />
                            )}
                        </button>
                    </div>
                </div>
            )
            }
        </div >
    );
}
