/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MessageSquare, ThumbsUp, Reply, Trash2, Loader2, Send, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/ConfirmDialog';

interface Comment {
    _id: string;
    content: string;
    author: { _id: string; username: string; name?: string; avatar?: string };
    likes: string[];
    likeCount: number;
    isEdited: boolean;
    createdAt: string;
    replies?: Comment[];
}

interface CommentSectionProps {
    blogId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ blogId }) => {
    const { user, token } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [, setDeletingCommentId] = useState<string | null>(null);
    const { isOpen: confirmOpen, confirm: showConfirm, onConfirm, onCancel } = useConfirmDialog();

    useEffect(() => {
        fetchComments();
    }, [blogId]);

    const fetchComments = async () => {
        try {
            const data = await fetchApi(`/api/comments/blog/${blogId}`, { requireAuth: false });
            if (data.success) setComments(data.data);
        } catch (err) {
            console.error('Failed to fetch comments:', err);
        } finally {
            setLoading(false);
        }
    };

    const submitComment = async (parentId?: string) => {
        const content = parentId ? replyContent : newComment;
        if (!content.trim() || !token) return;

        setSubmitting(true);
        try {
            const data = await fetchApi(`/api/comments/blog/${blogId}`, {
                method: 'POST',
                body: JSON.stringify({ content, parentComment: parentId }),
            });
            if (data.success) {
                if (parentId) {
                    setComments(prev => prev.map(c =>
                        c._id === parentId ? { ...c, replies: [...(c.replies || []), data.data] } : c
                    ));
                    setReplyTo(null);
                    setReplyContent('');
                } else {
                    setComments(prev => [data.data, ...prev]);
                    setNewComment('');
                }
            }
        } catch (err) {
            console.error('Failed to submit comment:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const toggleLike = async (commentId: string) => {
        if (!token) return;
        try {
            const data = await fetchApi(`/api/comments/${commentId}/like`, {
                method: 'POST',
            });
            if (data.success) {
                const updateLikes = (comments: Comment[]): Comment[] =>
                    comments.map(c => {
                        if (c._id === commentId) {
                            const likes = data.liked
                                ? [...c.likes, user!.id]
                                : c.likes.filter(id => id !== user!.id);
                            return { ...c, likes, likeCount: data.likeCount };
                        }
                        if (c.replies) return { ...c, replies: updateLikes(c.replies) };
                        return c;
                    });
                setComments(updateLikes);
            }
        } catch (err) {
            console.error('Failed to toggle like:', err);
        }
    };

    const deleteComment = async (commentId: string) => {
        if (!token) return;
        setDeletingCommentId(commentId);
        const confirmed = await showConfirm();
        setDeletingCommentId(null);
        if (!confirmed) return;
        try {
            await fetchApi(`/api/comments/${commentId}`, {
                method: 'DELETE',
            });
            setComments(prev => prev.filter(c => c._id !== commentId));
        } catch (err) {
            console.error('Failed to delete comment:', err);
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply }) => (
        <div className={`${isReply ? 'ml-12 mt-3' : 'border-b border-white/5 pb-4'}`}>
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                    {comment.author.avatar ? (
                        <Image src={comment.author.avatar} alt={comment.author.name || comment.author.username} width={32} height={32} className="w-8 h-8 rounded-full" unoptimized />
                    ) : (
                        <User className="w-4 h-4 text-orange-500" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">{comment.author.name || comment.author.username}</span>
                        <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                        {comment.isEdited && <span className="text-xs text-gray-600">(edited)</span>}
                    </div>
                    <p className="text-gray-300 text-sm whitespace-pre-wrap">{comment.content}</p>
                    <div className="flex items-center gap-4 mt-2">
                        <button onClick={() => toggleLike(comment._id)} className={`flex items-center gap-1 text-xs ${user && comment.likes.includes(user.id) ? 'text-orange-400' : 'text-gray-500 hover:text-gray-300'}`}>
                            <ThumbsUp className="w-3.5 h-3.5" /> {comment.likeCount || 0}
                        </button>
                        {!isReply && user && (
                            <button onClick={() => setReplyTo(replyTo === comment._id ? null : comment._id)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300">
                                <Reply className="w-3.5 h-3.5" /> Reply
                            </button>
                        )}
                        {user && (user.id === comment.author._id || user.role === 'admin') && (
                            <button onClick={() => deleteComment(comment._id)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400" aria-label="Delete comment">
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                    {replyTo === comment._id && (
                        <div className="mt-3 flex gap-2">
                            <input value={replyContent} onChange={e => setReplyContent(e.target.value)} placeholder="Write a reply..." className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/50" />
                            <button onClick={() => submitComment(comment._id)} disabled={submitting || !replyContent.trim()} className="px-3 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg" aria-label="Submit reply">
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            </button>
                        </div>
                    )}
                    {comment.replies?.map(reply => <CommentItem key={reply._id} comment={reply} isReply />)}
                </div>
            </div>
        </div>
    );

    return (
        <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-orange-500" />
                Comments ({comments.length})
            </h3>

            {user ? (
                <div className="mb-8">
                    <textarea
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        rows={3}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/50 resize-none"
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            onClick={() => submitComment()}
                            disabled={submitting || !newComment.trim()}
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-medium rounded-lg flex items-center gap-2"
                        >
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            Post Comment
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-gray-400">
                        <a href="/auth" className="text-orange-400 hover:text-orange-300">Sign in</a> to leave a comment
                    </p>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
                </div>
            ) : comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {comments.map(comment => <CommentItem key={comment._id} comment={comment} />)}
                </div>
            )}

            <ConfirmDialog
                open={confirmOpen}
                onConfirm={onConfirm}
                onCancel={onCancel}
                title="Delete comment?"
                description="Are you sure you want to delete this comment?"
                confirmText="Delete"
                variant="danger"
            />
        </div>
    );
};

export default CommentSection;
