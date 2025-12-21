"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
    MessageSquare,
    Heart,
    Share2,
    MoreHorizontal,
    Send,
    Image as ImageIcon,
    Loader2,
    Clock,
    TrendingUp,
    Users,
    Sparkles
} from 'lucide-react';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/Skeleton';
import { API_URL } from '@/lib/api';

interface FeedPost {
    _id: string;
    content: string;
    images?: string[];
    author: {
        _id: string;
        username: string;
        name?: string;
        avatar?: string;
    };
    likes: string[];
    comments: Comment[];
    createdAt: string;
}

interface Comment {
    _id: string;
    content: string;
    author: {
        username: string;
        name?: string;
    };
    createdAt: string;
}

// Skeleton for feed posts
const FeedSkeleton = () => (
    <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-start gap-3 mb-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
                <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                </div>
            </div>
        ))}
    </div>
);

const FeedsPage = () => {
    const { user, token } = useAuth();
    const router = useRouter();
    const [posts, setPosts] = useState<FeedPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState('');
    const [posting, setPosting] = useState(false);
    const [filter, setFilter] = useState<'latest' | 'trending' | 'following'>('latest');
    const { addToast } = useToast();

    // Fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${API_URL}/api/feeds`);
                if (response.ok) {
                    const data = await response.json();
                    setPosts(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Create new post
    const handlePost = async () => {
        if (!newPost.trim()) return;
        if (!token) {
            addToast({
                variant: 'error',
                title: 'Sign in required',
                message: 'You need to sign in to create a post.',
            });
            const redirectUrl = `${window.location.pathname}${window.location.search}`;
            router.push(`/auth?redirect=${encodeURIComponent(redirectUrl)}`);
            return;
        }

        setPosting(true);
        try {
            const response = await fetch(`${API_URL}/api/feeds`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: newPost.trim() })
            });

            if (response.ok) {
                const post = await response.json();
                setPosts([post, ...posts]);
                setNewPost('');
                addToast({
                    variant: 'success',
                    title: 'Posted',
                    message: 'Your update has been shared with the community.',
                });
            } else {
                const data = await response.json();
                addToast({
                    variant: 'error',
                    title: 'Post failed',
                    message: data.error || 'Could not create post.',
                });
            }
        } catch (error) {
            console.error('Failed to create post:', error);
            addToast({
                variant: 'error',
                title: 'Post failed',
                message: 'Something went wrong while creating your post.',
            });
        } finally {
            setPosting(false);
        }
    };

    // Like post
    const handleLike = async (postId: string) => {
        if (!token) return;

        try {
            const response = await fetch(`${API_URL}/api/feeds/${postId}/like`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const updatedPost = await response.json();
                setPosts(posts.map(p => p._id === postId ? updatedPost : p));
            }
        } catch (error) {
            console.error('Failed to like post:', error);
        }
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <section className="relative pt-32 pb-8 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5">
                        <MessageSquare className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Community Feed</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                        What&apos;s <span className="gradient-text">Happening</span>
                    </h1>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Share your thoughts, discoveries, and connect with the cybersecurity community.
                    </p>
                </div>
            </section>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-20">
                {/* Create Post */}
                {user ? (
                    <div className="mb-8 p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-sm font-medium text-white flex-shrink-0">
                                {user.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1">
                                <textarea
                                    value={newPost}
                                    onChange={(e) => setNewPost(e.target.value)}
                                    placeholder="What's on your mind? Share a discovery, ask a question..."
                                    rows={3}
                                    className="w-full bg-transparent text-white placeholder:text-gray-500 focus:outline-none resize-none"
                                />
                                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                                            <ImageIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={handlePost}
                                        disabled={!newPost.trim() || posting}
                                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white text-sm font-medium rounded-lg transition-all"
                                    >
                                        {posting ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Send className="w-4 h-4" />
                                        )}
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mb-8 p-5 rounded-2xl border border-white/10 bg-white/[0.02] text-center">
                        <p className="text-gray-400 mb-3">Join the conversation</p>
                        <Link
                            href="/auth"
                            className="inline-flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all"
                        >
                            Sign in to post
                        </Link>
                    </div>
                )}

                {/* Filters */}
                <div className="flex items-center gap-2 mb-6">
                    <button
                        onClick={() => setFilter('latest')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            filter === 'latest'
                                ? 'bg-orange-500 text-white'
                                : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                        }`}
                    >
                        <Sparkles className="w-4 h-4" />
                        Latest
                    </button>
                    <button
                        onClick={() => setFilter('trending')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            filter === 'trending'
                                ? 'bg-orange-500 text-white'
                                : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                        }`}
                    >
                        <TrendingUp className="w-4 h-4" />
                        Trending
                    </button>
                    {user && (
                        <button
                            onClick={() => setFilter('following')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                filter === 'following'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                            }`}
                        >
                            <Users className="w-4 h-4" />
                            Following
                        </button>
                    )}
                </div>

                {/* Posts */}
                {loading ? (
                    <FeedSkeleton />
                ) : posts.length === 0 ? (
                    <div className="text-center py-16">
                        <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 mb-2">No posts yet</p>
                        <p className="text-sm text-gray-600">Be the first to share something!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <article 
                                key={post._id}
                                className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all"
                            >
                                {/* Author */}
                                <div className="flex items-start justify-between mb-4">
                                    <Link 
                                        href={`/user/${post.author.username}`}
                                        className="flex items-center gap-3 group"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
                                            {post.author.name?.charAt(0).toUpperCase() || post.author.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium group-hover:text-orange-400 transition-colors">
                                                {post.author.name || post.author.username}
                                            </p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                @{post.author.username}
                                                <span>•</span>
                                                <Clock className="w-3 h-3" />
                                                {formatTime(post.createdAt)}
                                            </p>
                                        </div>
                                    </Link>
                                    <button className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Content */}
                                <p className="text-gray-300 whitespace-pre-wrap mb-4">
                                    {post.content}
                                </p>

                                {/* Images */}
                                {post.images && post.images.length > 0 && (
                                    <div className="mb-4 rounded-xl overflow-hidden">
                                        <img 
                                            src={post.images[0]} 
                                            alt="" 
                                            className="w-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-1 pt-4 border-t border-white/10">
                                    <button
                                        onClick={() => handleLike(post._id)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                                            user && post.likes.includes(user.id)
                                                ? 'text-red-400 bg-red-500/10'
                                                : 'text-gray-500 hover:text-red-400 hover:bg-white/5'
                                        }`}
                                    >
                                        <Heart className={`w-4 h-4 ${user && post.likes.includes(user.id) ? 'fill-current' : ''}`} />
                                        {post.likes.length > 0 && post.likes.length}
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-blue-400 hover:bg-white/5 transition-all">
                                        <MessageSquare className="w-4 h-4" />
                                        {post.comments.length > 0 && post.comments.length}
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-green-400 hover:bg-white/5 transition-all">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default FeedsPage;
