'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Clock,
    Eye,
    MessageSquare,
    Pin,
    Lock,
    CheckCircle,
    Pencil,
    Trash2,
    Loader2,
    AlertCircle,
    Share2,
    Link as LinkIcon,
} from 'lucide-react';
import { Discussion, Reply, CATEGORY_INFO, ROLE_BADGES } from '@/types/forum';
import {
    getDiscussion,
    getReplies,
    voteDiscussion,
    voteReply,
    acceptAnswer,
    createReply,
    updateReply,
    deleteReply,
    deleteDiscussion,
    togglePin,
    toggleLock,
} from '@/lib/api/forum';
import { useAuth } from '@/context/AuthContext';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/ConfirmDialog';
import VoteButtons from '@/components/forums/VoteButtons';
import MarkdownContent from '@/components/forums/MarkdownContent';
import ReplyThread from '@/components/forums/ReplyThread';
import ReplyForm from '@/components/forums/ReplyForm';
import Footer from '@/components/Footer';
import { ReportContentButton } from '@/components/ui/ReportContentButton';

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
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function DiscussionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [discussion, setDiscussion] = useState<Discussion | null>(null);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isOpen: confirmOpen, confirm: showConfirm, onConfirm, onCancel } = useConfirmDialog();

    // Map auth user to currentUser format
    const currentUser = user ? { _id: user.id, role: user.role } : null;

    // Fetch discussion and replies
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError('');
                const [discussionRes, repliesRes] = await Promise.all([
                    getDiscussion(id),
                    getReplies(id, { threaded: true }),
                ]);
                if (discussionRes.data) {
                    setDiscussion(discussionRes.data);
                    setReplies(repliesRes.data || []);
                } else {
                    setError('Discussion not found');
                }
            } catch (err) {
                setError('Failed to load discussion. Make sure the backend is running.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const isAuthor = currentUser?._id === discussion?.author._id;
    const isModerator = currentUser?.role === 'admin' || currentUser?.role === 'moderator';
    const canEdit = isAuthor || isModerator;
    const canDelete = isAuthor || isModerator;
    const canModerate = isModerator;

    const handleVoteDiscussion = async (value: 1 | -1) => {
        if (!discussion) return;
        const result = await voteDiscussion(discussion._id, value);
        setDiscussion({
            ...discussion,
            upvotes: result.data.upvotes,
            downvotes: result.data.downvotes,
        });
    };

    const handleVoteReply = async (replyId: string, value: 1 | -1) => {
        await voteReply(replyId, value);
        // Refresh replies
        const repliesRes = await getReplies(id, { threaded: true });
        setReplies(repliesRes.data);
    };

    const handleAcceptAnswer = async (replyId: string) => {
        if (!discussion) return;
        await acceptAnswer(discussion._id, replyId);
        // Refresh data
        const [discussionRes, repliesRes] = await Promise.all([
            getDiscussion(id),
            getReplies(id, { threaded: true }),
        ]);
        setDiscussion(discussionRes.data);
        setReplies(repliesRes.data);
    };

    const handleCreateReply = async (content: string, parentId?: string) => {
        await createReply(id, { content, parentId });
        // Refresh replies
        const repliesRes = await getReplies(id, { threaded: true });
        setReplies(repliesRes.data);
        // Update reply count
        if (discussion) {
            setDiscussion({ ...discussion, replyCount: discussion.replyCount + 1 });
        }
    };

    const handleEditReply = async (replyId: string, content: string) => {
        await updateReply(replyId, content);
        const repliesRes = await getReplies(id, { threaded: true });
        setReplies(repliesRes.data);
    };

    const handleDeleteReply = async (replyId: string) => {
        await deleteReply(replyId);
        const repliesRes = await getReplies(id, { threaded: true });
        setReplies(repliesRes.data);
        if (discussion) {
            setDiscussion({ ...discussion, replyCount: Math.max(0, discussion.replyCount - 1) });
        }
    };

    const handleDeleteDiscussion = async () => {
        const confirmed = await showConfirm();
        if (!confirmed) return;
        await deleteDiscussion(id);
        router.push('/forums');
    };

    const handleTogglePin = async () => {
        if (!discussion) return;
        const result = await togglePin(discussion._id);
        setDiscussion({ ...discussion, isPinned: result.data.isPinned });
    };

    const handleToggleLock = async () => {
        if (!discussion) return;
        const result = await toggleLock(discussion._id);
        setDiscussion({ ...discussion, isLocked: result.data.isLocked });
    };

    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (error || !discussion) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
                <AlertCircle className="w-12 h-12 text-red-500" />
                <h1 className="text-xl font-medium text-white">{error || 'Discussion not found'}</h1>
                <Link
                    href="/forums"
                    className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                    Back to Forums
                </Link>
            </div>
        );
    }

    const categoryInfo = CATEGORY_INFO[discussion.category];

    // Sort replies: accepted first, then by votes
    const sortedReplies = [...replies].sort((a, b) => {
        if (a.isAccepted && !b.isAccepted) return -1;
        if (!a.isAccepted && b.isAccepted) return 1;
        return b.netVotes - a.netVotes;
    });

    return (
        <div className="min-h-screen bg-black pt-16">
            {/* Header */}
            <div className="border-b border-white/5">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <Breadcrumbs items={[{ label: 'Forums', href: '/forums' }, { label: discussion.title }]} />
                    <Link
                        href="/forums"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Forums
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Discussion */}
                <article className="mb-8">
                    {/* Status badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${categoryInfo.bgColor} ${categoryInfo.color} ${categoryInfo.borderColor} border`}>
                            {categoryInfo.label}
                        </span>
                        {discussion.isPinned && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/30">
                                <Pin className="w-3 h-3" />
                                Pinned
                            </span>
                        )}
                        {discussion.isLocked && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/30">
                                <Lock className="w-3 h-3" />
                                Locked
                            </span>
                        )}
                        {discussion.hasAcceptedAnswer && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/30">
                                <CheckCircle className="w-3 h-3" />
                                Solved
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {discussion.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                        <Link
                            href={`/profile/${discussion.author.username}`}
                            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                        >
                            {discussion.author.avatar ? (
                                <Image
                                    src={discussion.author.avatar}
                                    alt={discussion.author.username}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 rounded-full ring-2 ring-orange-500/30"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-sm text-white font-medium">
                                    {discussion.author.username[0].toUpperCase()}
                                </div>
                            )}
                            <span>{discussion.author.username}</span>
                            {discussion.author.role && discussion.author.role !== 'user' && ROLE_BADGES[discussion.author.role] && (
                                <span className={`text-xs px-1.5 py-0.5 rounded ${ROLE_BADGES[discussion.author.role].bgColor} ${ROLE_BADGES[discussion.author.role].color} ${ROLE_BADGES[discussion.author.role].borderColor} border`}>
                                    {ROLE_BADGES[discussion.author.role].label}
                                </span>
                            )}
                        </Link>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTimeAgo(discussion.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {discussion.viewCount} views
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {discussion.replyCount} replies
                        </span>
                        {discussion.isEdited && (
                            <span className="text-gray-500">(edited)</span>
                        )}
                    </div>

                    {/* Content with votes */}
                    <div className="flex gap-6">
                        <VoteButtons
                            upvotes={discussion.upvotes}
                            downvotes={discussion.downvotes}
                            userVote={discussion.userVote}
                            onVote={handleVoteDiscussion}
                            disabled={!currentUser || isAuthor}
                        />

                        <div className="flex-1 min-w-0">
                            <div className="prose prose-invert max-w-none">
                                <MarkdownContent content={discussion.content} />
                            </div>

                            {/* Tags */}
                            {discussion.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
                                    {discussion.tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/forums?tag=${tag}`}
                                            className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm rounded transition-colors"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Share button */}
                            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                    }}
                                    className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm rounded-lg transition-colors"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                    }}
                                    className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm rounded-lg transition-colors"
                                >
                                    <LinkIcon className="w-4 h-4" />
                                    Copy Link
                                </button>
                                <ReportContentButton contentType="discussion" contentId={discussion._id} />
                            </div>

                            {/* Actions */}
                            {(canEdit || canDelete || canModerate) && (
                                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                                    {canEdit && (
                                        <Link
                                            href={`/forums/${discussion._id}/edit`}
                                            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                                        >
                                            <Pencil className="w-4 h-4" />
                                            Edit
                                        </Link>
                                    )}

                                    {canModerate && (
                                        <>
                                            <button
                                                onClick={handleTogglePin}
                                                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-400 transition-colors"
                                            >
                                                <Pin className="w-4 h-4" />
                                                {discussion.isPinned ? 'Unpin' : 'Pin'}
                                            </button>
                                            <button
                                                onClick={handleToggleLock}
                                                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-yellow-400 transition-colors"
                                            >
                                                <Lock className="w-4 h-4" />
                                                {discussion.isLocked ? 'Unlock' : 'Lock'}
                                            </button>
                                        </>
                                    )}

                                    {canDelete && (
                                        <button
                                            onClick={handleDeleteDiscussion}
                                            className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </article>

                {/* Replies Section */}
                <section>
                    <h2 className="text-lg font-semibold text-white mb-6">
                        {discussion.replyCount} {discussion.replyCount === 1 ? 'Reply' : 'Replies'}
                    </h2>

                    {/* Reply form */}
                    {currentUser && !discussion.isLocked ? (
                        <div className="mb-8">
                            <ReplyForm
                                onSubmit={(content) => handleCreateReply(content)}
                                submitLabel="Post Reply"
                            />
                        </div>
                    ) : discussion.isLocked ? (
                        <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
                            <Lock className="w-4 h-4 inline mr-2" />
                            This discussion is locked. No new replies can be added.
                        </div>
                    ) : (
                        <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-sm">
                            <Link href="/auth" className="text-orange-400 hover:text-orange-300">
                                Sign in
                            </Link>{' '}
                            to reply to this discussion.
                        </div>
                    )}

                    {/* Replies list */}
                    <div className="space-y-6">
                        {sortedReplies.map((reply) => (
                            <ReplyThread
                                key={reply._id}
                                reply={reply}
                                discussionId={discussion._id}
                                discussionAuthorId={discussion.author._id}
                                currentUserId={currentUser?._id}
                                userRole={currentUser?.role}
                                onVote={handleVoteReply}
                                onAccept={handleAcceptAnswer}
                                onReply={(parentId, content) => handleCreateReply(content, parentId)}
                                onEdit={handleEditReply}
                                onDelete={handleDeleteReply}
                            />
                        ))}
                    </div>

                    {sortedReplies.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No replies yet. Be the first to respond!
                        </div>
                    )}
                </section>
            </div>

            <ConfirmDialog
                open={confirmOpen}
                onConfirm={onConfirm}
                onCancel={onCancel}
                title="Delete discussion?"
                description="Are you sure you want to delete this discussion? This cannot be undone."
                confirmText="Delete"
                variant="danger"
            />

            <Footer />
        </div>
    );
}
