'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, MessageSquare, MoreHorizontal, Pencil, Trash2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Reply } from '@/types/forum';
import { ROLE_BADGES } from '@/types/forum';
import VoteButtons from './VoteButtons';
import MarkdownContent from './MarkdownContent';
import ReplyForm from './ReplyForm';

interface ReplyThreadProps {
    reply: Reply;
    discussionId: string;
    discussionAuthorId: string;
    currentUserId?: string;
    userRole?: string;
    depth?: number;
    onVote: (replyId: string, value: 1 | -1) => Promise<void>;
    onAccept: (replyId: string) => Promise<void>;
    onReply: (parentId: string, content: string) => Promise<void>;
    onEdit?: (replyId: string, content: string) => Promise<void>;
    onDelete?: (replyId: string) => Promise<void>;
}

function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function ReplyThread({
    reply,
    discussionId,
    discussionAuthorId,
    currentUserId,
    userRole,
    depth = 0,
    onVote,
    onAccept,
    onReply,
    onEdit,
    onDelete,
}: ReplyThreadProps) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(reply.content);

    const isAuthor = currentUserId === reply.author._id;
    const isDiscussionAuthor = currentUserId === discussionAuthorId;
    const isModerator = userRole === 'admin' || userRole === 'moderator';
    const canEdit = isAuthor || isModerator;
    const canDelete = isAuthor || isModerator;
    const canAccept = isDiscussionAuthor && !reply.isAccepted;
    const canReply = depth < 3 && currentUserId;

    const handleSaveEdit = async () => {
        if (onEdit && editContent.trim()) {
            await onEdit(reply._id, editContent);
            setIsEditing(false);
        }
    };

    const handleDelete = async () => {
        if (onDelete && confirm('Are you sure you want to delete this reply?')) {
            await onDelete(reply._id);
        }
    };

    return (
        <div className={cn('relative', depth > 0 && 'ml-8 pl-4 border-l border-white/10')}>
            <div
                className={cn(
                    'rounded-lg p-4',
                    reply.isAccepted
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-black/40 backdrop-blur-sm border border-white/10'
                )}
            >
                {/* Accepted badge */}
                {reply.isAccepted && (
                    <div className="flex items-center gap-2 mb-3 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Accepted Answer</span>
                    </div>
                )}

                <div className="flex gap-4">
                    {/* Vote buttons */}
                    <VoteButtons
                        upvotes={reply.upvotes}
                        downvotes={reply.downvotes}
                        userVote={reply.userVote}
                        onVote={(value) => onVote(reply._id, value)}
                        disabled={!currentUserId || isAuthor}
                        size="sm"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Author info */}
                        <div className="flex items-center gap-2 mb-3">
                            <Link
                                href={`/profile/${reply.author.username}`}
                                className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                            >
                                {reply.author.avatar ? (
                                    <img
                                        src={reply.author.avatar}
                                        alt={reply.author.username}
                                        className="w-6 h-6 rounded-full"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-sm text-white font-medium">
                                        {reply.author.username[0].toUpperCase()}
                                    </div>
                                )}
                                <span className="text-sm font-medium text-white">
                                    {reply.author.username}
                                </span>
                                {reply.author.role && reply.author.role !== 'user' && ROLE_BADGES[reply.author.role] && (
                                    <span className={`text-xs px-1.5 py-0.5 rounded ${ROLE_BADGES[reply.author.role].bgColor} ${ROLE_BADGES[reply.author.role].color} ${ROLE_BADGES[reply.author.role].borderColor} border`}>
                                        {ROLE_BADGES[reply.author.role].label}
                                    </span>
                                )}
                            </Link>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTimeAgo(reply.createdAt)}
                            </span>
                            {reply.isEdited && (
                                <span className="text-xs text-gray-500">(edited)</span>
                            )}
                        </div>

                        {/* Content or edit form */}
                        {isEditing ? (
                            <div className="space-y-3">
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm resize-none focus:outline-none focus:border-orange-500/50"
                                    rows={4}
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSaveEdit}
                                        className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded transition-colors"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditContent(reply.content);
                                        }}
                                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <MarkdownContent content={reply.content} />
                        )}

                        {/* Actions */}
                        {!isEditing && (
                            <div className="flex items-center gap-4 mt-4">
                                {canReply && (
                                    <button
                                        onClick={() => setShowReplyForm(!showReplyForm)}
                                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                                    >
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        Reply
                                    </button>
                                )}

                                {canAccept && (
                                    <button
                                        onClick={() => onAccept(reply._id)}
                                        className="flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 transition-colors"
                                    >
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        Accept Answer
                                    </button>
                                )}

                                {(canEdit || canDelete) && (
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowMenu(!showMenu)}
                                            className="p-1 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>

                                        {showMenu && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-10"
                                                    onClick={() => setShowMenu(false)}
                                                />
                                                <div className="absolute right-0 top-full mt-1 w-32 bg-neutral-800 border border-white/10 rounded-lg shadow-xl z-20 overflow-hidden">
                                                    {canEdit && (
                                                        <button
                                                            onClick={() => {
                                                                setIsEditing(true);
                                                                setShowMenu(false);
                                                            }}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                                                        >
                                                            <Pencil className="w-3.5 h-3.5" />
                                                            Edit
                                                        </button>
                                                    )}
                                                    {canDelete && (
                                                        <button
                                                            onClick={() => {
                                                                handleDelete();
                                                                setShowMenu(false);
                                                            }}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Reply form */}
            {showReplyForm && (
                <div className="mt-4 ml-8">
                    <ReplyForm
                        onSubmit={async (content) => {
                            await onReply(reply._id, content);
                            setShowReplyForm(false);
                        }}
                        onCancel={() => setShowReplyForm(false)}
                        placeholder={`Reply to ${reply.author.username}...`}
                    />
                </div>
            )}

            {/* Nested replies */}
            {reply.children && reply.children.length > 0 && (
                <div className="mt-4 space-y-4">
                    {reply.children.map((child) => (
                        <ReplyThread
                            key={child._id}
                            reply={child}
                            discussionId={discussionId}
                            discussionAuthorId={discussionAuthorId}
                            currentUserId={currentUserId}
                            userRole={userRole}
                            depth={depth + 1}
                            onVote={onVote}
                            onAccept={onAccept}
                            onReply={onReply}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
