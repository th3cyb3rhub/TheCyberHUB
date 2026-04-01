"use client"

import React, { useState } from 'react';
import { Heart, Bookmark, Share2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';

interface BlogActionsProps {
    blogId: string;
    initialLikeCount: number;
    initialIsLiked: boolean;
    initialIsBookmarked: boolean;
}

const BlogActions: React.FC<BlogActionsProps> = ({
    blogId,
    initialLikeCount,
    initialIsLiked,
    initialIsBookmarked
}) => {
    const { user, updateBookmarks } = useAuth();
    const { addToast } = useToast();
    const router = useRouter();

    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
    const [isLiking, setIsLiking] = useState(false);
    const [isBookmarking, setIsBookmarking] = useState(false);

    const handleLike = async () => {
        if (!user) {
            addToast({
                variant: 'info',
                title: 'Sign in required',
                message: 'Create an account or sign in to like posts.',
            });
            router.push(`/auth?redirect=${encodeURIComponent(window.location.pathname)}`);
            return;
        }

        if (isLiking) return;
        setIsLiking(true);

        // Optimistic update
        const wasLiked = isLiked;
        setIsLiked(!wasLiked);
        setLikeCount(prev => wasLiked ? prev - 1 : prev + 1);

        try {
            const data = await fetchApi(`/api/blogs/${blogId}/like`, {
                method: 'POST',
            });
            setIsLiked(data.data.isLiked);
            setLikeCount(data.data.likeCount);
        } catch (_error) {
            // Revert on error
            setIsLiked(wasLiked);
            setLikeCount(prev => wasLiked ? prev + 1 : prev - 1);
            addToast({
                variant: 'error',
                title: 'Error',
                message: 'Failed to update like. Please try again.',
            });
        } finally {
            setIsLiking(false);
        }
    };

    const handleBookmark = async () => {
        if (!user) {
            addToast({
                variant: 'info',
                title: 'Sign in required',
                message: 'Create an account or sign in to bookmark posts.',
            });
            router.push(`/auth?redirect=${encodeURIComponent(window.location.pathname)}`);
            return;
        }

        if (isBookmarking) return;
        setIsBookmarking(true);

        // Optimistic update
        const wasBookmarked = isBookmarked;
        setIsBookmarked(!wasBookmarked);

        try {
            // Get current bookmarks and update
            const currentBlogs = user.bookmarks?.roadmaps || [];
            // Note: We're using a simple approach - in production you might want a dedicated blogs bookmark array
            const newBookmarks = wasBookmarked
                ? currentBlogs.filter(id => id !== blogId)
                : [...currentBlogs, blogId];

            await updateBookmarks({ roadmaps: newBookmarks });

            addToast({
                variant: 'success',
                title: wasBookmarked ? 'Bookmark removed' : 'Post bookmarked',
                message: wasBookmarked
                    ? 'This post was removed from your bookmarks.'
                    : 'You can find this post in your saved items.',
            });
        } catch (_error) {
            // Revert on error
            setIsBookmarked(wasBookmarked);
            addToast({
                variant: 'error',
                title: 'Error',
                message: 'Failed to update bookmark. Please try again.',
            });
        } finally {
            setIsBookmarking(false);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    url: window.location.href
                });
            } catch (err) {
                // User cancelled or error
                if ((err as Error).name !== 'AbortError') {
                    await copyToClipboard();
                }
            }
        } else {
            await copyToClipboard();
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            addToast({
                variant: 'success',
                title: 'Link copied',
                message: 'Post link copied to clipboard.',
            });
        } catch {
            addToast({
                variant: 'error',
                title: 'Error',
                message: 'Failed to copy link.',
            });
        }
    };

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={handleLike}
                disabled={isLiking}
                className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-colors ${isLiked
                        ? 'bg-red-500/10 border-red-500/50 text-red-400'
                        : 'text-gray-400 hover:text-white border-white/10 hover:border-white/20'
                    }`}
                aria-label={isLiked ? 'Unlike' : 'Like'}
            >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                {likeCount > 0 && <span>{likeCount}</span>}
            </button>

            <button
                onClick={handleBookmark}
                disabled={isBookmarking}
                className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-colors ${isBookmarked
                        ? 'bg-orange-500/10 border-orange-500/50 text-orange-400'
                        : 'text-gray-400 hover:text-white border-white/10 hover:border-white/20'
                    }`}
            >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                Save
            </button>

            <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
            >
                <Share2 className="w-4 h-4" />
                Share
            </button>
        </div>
    );
};

export default BlogActions;
