'use client';

import React, { useState } from 'react';
import {
    MessageCircle, MoreHorizontal, Trash2,
    Flag, Trophy, Flame, PenLine, MessageSquare, Calendar,
    UserPlus, Brain, Zap, Heart, Repeat2,
    ChevronDown, ChevronUp
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import FeedComments from './FeedComments';

// Simple markdown-to-HTML (bold, italic, code, links)
function renderMarkdown(text: string): React.ReactNode[] {
    if (!text) return [];
    const parts: React.ReactNode[] = [];
    // Split on markdown patterns
    const regex = /(\*\*.*?\*\*|`[^`]+`|\[([^\]]+)\]\(([^)]+)\)|#\w+)/g;
    let lastIndex = 0;
    let match;
    let i = 0;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        const m = match[0];
        if (m.startsWith('**') && m.endsWith('**')) {
            parts.push(<strong key={i} className="font-semibold text-gray-900 dark:text-white">{m.slice(2, -2)}</strong>);
        } else if (m.startsWith('`') && m.endsWith('`')) {
            parts.push(
                <code key={i} className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-orange-600 dark:text-orange-300 text-xs font-mono">
                    {m.slice(1, -1)}
                </code>
            );
        } else if (m.startsWith('[')) {
            const linkText = match[2];
            const url = match[3];
            parts.push(
                <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                    className="text-blue-400 hover:underline">{linkText}</a>
            );
        } else if (m.startsWith('#')) {
            parts.push(
                <span key={i} className="text-orange-400 hover:underline cursor-pointer">{m}</span>
            );
        }
        lastIndex = match.index + m.length;
        i++;
    }
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }
    return parts;
}

interface FeedPostData {
    _id: string;
    type: 'post' | 'event';
    author: { _id: string; name: string; username: string; avatar?: string };
    content?: string;
    images?: string[];
    eventType?: string;
    eventData?: {
        title?: string; description?: string; targetSlug?: string;
        targetType?: string; value?: number; icon?: string; color?: string;
    };
    likes?: string[];
    likeCount?: number;
    commentCount: number;
    reshareCount?: number;
    originalPost?: FeedPostData | null;
    reshareComment?: string;
    hashtags?: string[];
    createdAt: string;
}

// Simple Like mapping removed, using raw Heart icon

const eventIcons: Record<string, React.ElementType> = {
    challenge_solved: Flag, badge_earned: Trophy, streak_milestone: Flame,
    blog_published: PenLine, forum_post: MessageSquare, event_joined: Calendar,
    user_joined: UserPlus, daily_challenge_completed: Brain,
};

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

export default function FeedCard({
    post,
    onDelete,
}: {
    post: FeedPostData;
    onDelete?: (id: string) => void;
}) {
    const { user } = useAuth();
    const userId = user ? user.id : null;

    const [isLiked, setIsLiked] = useState(() => {
        if (!userId || !post.likes) return false;
        return post.likes.includes(userId);
    });

    const [likeCount, setLikeCount] = useState(post.likeCount || 0);
    const [showMenu, setShowMenu] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentCount, setCommentCount] = useState(post.commentCount);

    const isOwner = userId && post.author._id === userId;
    const isLongPost = (post.content?.length || 0) > 400;

    const handleLike = async () => {
        if (!user) return;
        try {
            const data = await fetchApi(`/api/feed/posts/${post._id}/like`, {
                method: 'POST',
            });
            setIsLiked(data.data.liked);
            setLikeCount(data.data.likeCount);
        } catch (err) {
            console.error('Like failed:', err);
        }
    };

    const handleDelete = async () => {
        try {
            await fetchApi(`/api/feed/posts/${post._id}`, {
                method: 'DELETE',
            });
            onDelete?.(post._id);
        } catch (err) { console.error('Delete failed:', err); }
        setShowMenu(false);
    };



    // System event card
    if (post.type === 'event' && post.eventType && post.eventData) {
        const Icon = eventIcons[post.eventType] || Zap;
        const color = post.eventData.color || '#f97316';

        return (
            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-2xl p-5 hover:border-gray-300 dark:hover:border-white/15 transition-all shadow-sm dark:shadow-none">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${color}15` }}>
                        <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <Link href={`/profile/${post.author.username}`}
                                className="text-sm font-semibold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                                {post.author.name}
                            </Link>
                            <span className="text-xs text-gray-500 dark:text-gray-600">• {timeAgo(post.createdAt)}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{post.eventData.description}</p>
                        {post.eventData.value != null && (
                            <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                                <Zap className="w-3 h-3 text-orange-500 dark:text-orange-400" />
                                +{post.eventData.value} {post.eventType === 'streak_milestone' ? 'days' : 'XP'}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Reshared post
    const renderOriginal = () => {
        if (!post.originalPost) return null;
        const op = post.originalPost;
        return (
            <div className="mt-3 border border-gray-200 dark:border-white/10 rounded-xl p-4 bg-gray-50 dark:bg-white/[0.01]">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-[10px] font-bold">
                        {op.author?.avatar ? (
                            <Image src={op.author.avatar} alt={op.author?.name || 'User avatar'} width={24} height={24} className="w-6 h-6 rounded-full object-cover" unoptimized />
                        ) : (op.author?.name?.charAt(0) || '?')}
                    </div>
                    <span className="text-xs text-gray-700 dark:text-gray-400">{op.author?.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-600">• {timeAgo(op.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-300 line-clamp-4 whitespace-pre-wrap">
                    {renderMarkdown(op.content || '')}
                </p>
            </div>
        );
    };

    // User post card
    return (
        <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-2xl p-5 hover:border-gray-300 dark:hover:border-white/15 transition-all shadow-sm dark:shadow-none">
            {/* Reshare banner */}
            {post.originalPost && (
                <div className="flex items-center gap-1.5 mb-3 text-xs text-gray-500">
                    <Repeat2 className="w-3.5 h-3.5" />
                    <Link href={`/profile/${post.author.username}`} className="hover:text-gray-900 dark:hover:text-white">
                        {post.author.name}
                    </Link>
                    <span>reshared</span>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                        {post.author.avatar ? (
                            <Image src={post.author.avatar} alt={post.author.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" unoptimized />
                        ) : post.author.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <Link href={`/profile/${post.author.username}`}
                            className="text-sm font-semibold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                            {post.author.name}
                        </Link>
                        <p className="text-xs text-gray-500">
                            @{post.author.username} • {timeAgo(post.createdAt)}
                        </p>
                    </div>
                </div>
                {isOwner && (
                    <div className="relative">
                        <button onClick={() => setShowMenu(!showMenu)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" aria-label="Post options" aria-expanded={showMenu}>
                            <MoreHorizontal className="w-4 h-4 text-gray-500" />
                        </button>
                        {showMenu && (
                            <div className="absolute right-0 top-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl py-1 min-w-[140px] z-10 shadow-xl">
                                <button onClick={handleDelete}
                                    className="w-full px-4 py-2 text-left text-sm text-red-500 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                                    <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Reshare comment */}
            {post.reshareComment && (
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed mb-3 whitespace-pre-wrap">
                    {renderMarkdown(post.reshareComment)}
                </p>
            )}

            {/* Content (with expand/collapse for long posts) */}
            {post.content && (
                <div className="mb-3">
                    <div className={`text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap ${isLongPost && !expanded ? 'line-clamp-6' : ''}`}>
                        {renderMarkdown(post.content)}
                    </div>
                    {isLongPost && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="flex items-center gap-1 mt-2 text-xs text-orange-400 hover:text-orange-300 transition-colors"
                        >
                            {expanded ? (
                                <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
                            ) : (
                                <><ChevronDown className="w-3.5 h-3.5" /> Read more</>
                            )}
                        </button>
                    )}
                </div>
            )}

            {/* Original post (reshare) */}
            {renderOriginal()}

            {/* Images */}
            {post.images && post.images.length > 0 && (
                <div className={`grid gap-2 mb-3 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {post.images.map((img, i) => (
                        <Image key={i} src={img} alt="Post image" width={600} height={192} className="rounded-xl w-full h-48 object-cover" unoptimized />
                    ))}
                </div>
            )}

            {/* Reaction summary bar */}
            {likeCount > 0 && (
                <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-gray-100 dark:border-white/5">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    <span className="text-xs text-gray-500">{likeCount}</span>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-1">
                {/* Like button */}
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all ${isLiked
                        ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                        }`}
                >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    Like
                </button>

                <button
                    onClick={() => setShowComments(!showComments)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all ${showComments
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                        }`}
                >
                    <MessageCircle className="w-4 h-4" />
                    {commentCount > 0 && commentCount}
                    <span className="hidden sm:inline">Comment</span>
                </button>
            </div>

            {/* Comments section */}
            {showComments && (
                <FeedComments
                    postId={post._id}
                    onCountChange={(count) => setCommentCount(count)}
                />
            )}
        </div>
    );
}
