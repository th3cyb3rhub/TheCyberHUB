'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Image from 'next/image';
import { Rss, Loader2, X, Repeat2, Search, TrendingUp, Hash, Flame, MousePointerClick } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/context/ToastContext';
import { Skeleton } from '@/components/ui/skeleton';
import FeedItem from '@/components/feed/FeedItem';
import CreatePost from '@/components/feed/CreatePost';
import { fetchApi, tokenStore } from '@/lib/api';

interface FeedPost {
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
    totalReactionCount?: number;
    commentCount: number;
    reshareCount?: number;
    originalPost?: FeedPost | null;
    reshareComment?: string;
    hashtags?: string[];
    createdAt: string;
}

interface TrendingTag { tag: string; count: number; }

const DRAFT_KEY = 'tch:feed:draft';

export default function FeedPage() {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [posts, setPosts] = useState<FeedPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [cursor, setCursor] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'post' | 'event' | 'bookmarks'>('all');
    const [hashtag, setHashtag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [reshareTarget, setReshareTarget] = useState<FeedPost | null>(null);
    const [reshareComment, setReshareComment] = useState('');
    const [reshareImageUrl, setReshareImageUrl] = useState('');
    const [reshareLoading, setReshareLoading] = useState(false);
    const [trendingTags, setTrendingTags] = useState<TrendingTag[]>([]);
    const [trendingLoading, setTrendingLoading] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchApi('/api/feed/trending', { requireAuth: false, cache: 'no-cache' }).catch(() => null);
                if (data) { setTrendingTags(data.data || []); }
            } catch { } finally { setTrendingLoading(false); }
        })();
    }, []);

    const fetchFeed = useCallback(async (append = false) => {
        if (append) setLoadingMore(true); else setLoading(true);
        try {
            const p = new URLSearchParams();
            p.set('limit', '20');
            if (append && cursor) p.set('cursor', cursor);
            if (filter !== 'all') p.set('type', filter);
            if (hashtag) p.set('hashtag', hashtag);
            const token = tokenStore.get();
            const endpoint = filter === 'bookmarks' ? '/api/feed/bookmarks' : '/api/feed';

            // Remove 'type' parameter if we're hitting the bookmarks endpoint to avoid backend confusion
            if (filter === 'bookmarks') {
                p.delete('type');
            }

            const data = await fetchApi(`${endpoint}?${p}`, { requireAuth: !!token }).catch(() => null);
            if (data) {
                if (append) setPosts(prev => [...prev, ...data.data]);
                else setPosts(data.data);
                setHasMore(data.pagination.hasMore);
                setCursor(data.pagination.nextCursor);
            }
        } catch { addToast({ message: 'Failed to load feed', variant: 'error' }); }
        finally { setLoading(false); setLoadingMore(false); }
    }, [cursor, filter, hashtag]);

    useEffect(() => { setCursor(null); setHasMore(true); fetchFeed(false); }, [filter, hashtag]);

    useEffect(() => {
        if (!hasMore || loadingMore) return;
        const sentinel = sentinelRef.current;
        if (!sentinel) return;
        const observer = new IntersectionObserver(
            entries => { if (entries[0].isIntersecting && hasMore && !loadingMore) fetchFeed(true); },
            { threshold: 0.5 }
        );
        observer.observe(sentinel);
        observerRef.current = observer;
        return () => {
            observer.unobserve(sentinel);
            observer.disconnect();
        };
    }, [hasMore, loadingMore, fetchFeed]);

    const handlePostCreated = (post: unknown) => {
        setPosts(prev => [post as FeedPost, ...prev]);
        // Clear draft on successful post
        try { localStorage.removeItem(DRAFT_KEY); } catch {}
    };
    const handleDelete = (id: string) => setPosts(prev => prev.filter(p => p._id !== id));

    // Handle hashtag click from feed items
    const handleHashtagClick = useCallback((tag: string) => {
        // Strip leading # if present
        const cleanTag = tag.startsWith('#') ? tag.slice(1) : tag;
        setHashtag(cleanTag);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleReshare = async () => {
        if (!reshareTarget || reshareLoading) return;
        setReshareLoading(true);
        try {
            const payload: { comment: string; images?: string[] } = { comment: reshareComment };
            if (reshareImageUrl.trim()) payload.images = [reshareImageUrl.trim()];

            const data = await fetchApi(`/api/feed/posts/${reshareTarget._id}/reshare`, {
                method: 'POST',
                body: JSON.stringify(payload),
            }).catch(() => null);

            if (data) {
                setPosts(prev => [data.data, ...prev]);
                setReshareTarget(null); setReshareComment(''); setReshareImageUrl('');
            }
        } catch { addToast({ message: 'Failed to reshare post', variant: 'error' }); }
        finally { setReshareLoading(false); }
    };

    const filteredPosts = debouncedSearch.trim()
        ? posts.filter(p =>
            p.content?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.author.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.author.username.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.hashtags?.some(h => h.includes(debouncedSearch.toLowerCase()))
        ) : posts;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-200">
            <div className="fixed top-0 left-1/3 w-96 h-72 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed top-40 right-1/4 w-80 h-56 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-orange-500 dark:text-orange-400/60 mb-1">
                            <Rss className="w-4 h-4" />
                            <span className="tracking-wide uppercase text-xs font-medium">Community Feed</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Feed</h1>
                        <p className="text-gray-600 dark:text-gray-500 text-sm">Wins, writeups, and insights from the community.</p>
                    </div>

                    {/* Mobile Trending Tags -- visible on small screens */}
                    <div className="lg:hidden mb-6">
                        {trendingLoading ? (
                            <div className="flex justify-center py-2">
                                <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                            </div>
                        ) : trendingTags.length > 0 ? (
                            <div className="overflow-x-auto scrollbar-none">
                                <div className="flex items-center gap-2 pb-2 min-w-max">
                                    <TrendingUp className="w-4 h-4 text-orange-500 shrink-0" />
                                    <span className="text-xs font-semibold text-gray-400 shrink-0">Trending:</span>
                                    {trendingTags.slice(0, 8).map((t) => (
                                        <button
                                            key={t.tag}
                                            onClick={() => setHashtag(t.tag)}
                                            className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                                                hashtag === t.tag
                                                    ? 'bg-orange-500/20 text-orange-400'
                                                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                                            }`}
                                        >
                                            #{t.tag}
                                            <span className="ml-1 text-gray-600">{t.count}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>

                    {/* Two-column layout via CSS flexbox */}
                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center max-w-screen-xl mx-auto">

                        {/* Main Feed Column */}
                        <div className="w-full lg:w-[600px] shrink-0 flex-1">
                            {user && (
                                <div className="mb-5">
                                    <CreatePost onPostCreated={handlePostCreated} />
                                </div>
                            )}

                            {/* Filter bar */}
                            <div className="flex items-center gap-3 mb-5">
                                {hashtag && (
                                    <button
                                        onClick={() => setHashtag(null)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 dark:text-orange-400 rounded-lg text-xs font-medium"
                                    >
                                        <Hash className="w-3 h-3" />
                                        {hashtag}
                                        <X className="w-3 h-3 ml-1 opacity-60" />
                                    </button>
                                )}
                                <div className="flex items-center gap-0.5 ml-auto bg-gray-950 border border-white/5 rounded-lg p-0.5">
                                    {(['all', 'post', 'event', 'bookmarks'] as const).map(f => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f)}
                                            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${filter === f
                                                ? 'bg-white dark:bg-orange-500 text-gray-900 border border-gray-200 dark:border-none dark:text-white shadow-sm dark:shadow-orange-500/25'
                                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                                }`}
                                        >
                                            {f === 'all' ? 'All' : f === 'post' ? 'Posts' : f === 'event' ? 'Activity' : 'Bookmarks'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Posts */}
                            {loading ? (
                                <div className="space-y-4">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Skeleton className="w-10 h-10 rounded-full" />
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-32" />
                                                    <Skeleton className="h-3 w-20" />
                                                </div>
                                            </div>
                                            <Skeleton className="h-4 w-full mb-2" />
                                            <Skeleton className="h-4 w-3/4 mb-4" />
                                            <div className="flex gap-4">
                                                <Skeleton className="h-4 w-16" />
                                                <Skeleton className="h-4 w-16" />
                                                <Skeleton className="h-4 w-16" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : filteredPosts.length === 0 ? (
                                <EmptyState
                                    icon={Rss}
                                    title={searchQuery ? 'No matching posts' : 'No posts yet'}
                                    description={searchQuery ? 'Try a different search term' : 'Share your first win or insight with the community!'}
                                />
                            ) : (
                                <div className="space-y-4">
                                    {filteredPosts.map(post => (
                                        <FeedItem key={post._id} post={post} onDelete={handleDelete} onReshare={p => setReshareTarget(p)} onHashtagClick={handleHashtagClick} />
                                    ))}
                                </div>
                            )}

                            {hasMore && !loading && (
                                <div ref={sentinelRef} className="flex items-center justify-center py-8">
                                    {loadingMore && <Loader2 className="w-5 h-5 animate-spin text-gray-600" />}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="hidden lg:block w-[320px] shrink-0 sticky top-28 self-start space-y-6">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search posts..."
                                    className="w-full bg-gray-950 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-orange-500/30 transition-colors"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white">
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            {/* Trending Tags */}
                            <div className="bg-black border border-white/5 rounded-2xl overflow-hidden">
                                <div className="flex items-center gap-2 px-4 pt-4 pb-3">
                                    <TrendingUp className="w-4 h-4 text-orange-500" />
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Trending</h3>
                                </div>
                                {trendingLoading ? (
                                    <div className="px-4 pb-4">
                                        <Loader2 className="w-4 h-4 animate-spin text-gray-400 dark:text-gray-600 mx-auto" />
                                    </div>
                                ) : trendingTags.length === 0 ? (
                                    <div className="px-4 pb-5 text-center">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mx-auto mb-2">
                                            <MousePointerClick className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium">No trending tags yet</p>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-0.5">Use #hashtags in your posts!</p>
                                    </div>
                                ) : (
                                    <div className="pb-2">
                                        {trendingTags.slice(0, 8).map((t, i) => (
                                            <button
                                                key={t.tag}
                                                onClick={() => setHashtag(t.tag)}
                                                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.03] transition-colors group ${hashtag === t.tag ? 'bg-orange-500/5' : ''
                                                    }`}
                                            >
                                                <span className="text-[10px] text-gray-700 font-mono w-4 text-right">{i + 1}</span>
                                                <div className="flex-1 text-left">
                                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">#{t.tag}</span>
                                                    <p className="text-[10px] text-gray-600 mt-0.5">{t.count} {t.count === 1 ? 'post' : 'posts'}</p>
                                                </div>
                                                {i < 3 && <Flame className="w-3 h-3 text-orange-500/40" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Quick stats */}
                            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-white">{posts.filter(p => p.type === 'post').length}</p>
                                        <p className="text-[10px] text-gray-600 uppercase tracking-wider">Posts</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-white">{posts.filter(p => p.type === 'event').length}</p>
                                        <p className="text-[10px] text-gray-600 uppercase tracking-wider">Events</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[10px] text-gray-700 text-center px-4">
                                Use <span className="text-gray-500">**bold**</span> · <span className="text-gray-500">`code`</span> · <span className="text-gray-500">#tags</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reshare Modal */}
            {reshareTarget && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setReshareTarget(null); setReshareComment(''); setReshareImageUrl(''); }}>
                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative" role="dialog" aria-modal="true" aria-label="Reshare post" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                    <Repeat2 className="w-4 h-4 text-orange-400" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Reshare</h3>
                            </div>
                            <button onClick={() => { setReshareTarget(null); setReshareComment(''); setReshareImageUrl(''); }} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 transition-colors" aria-label="Close">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <textarea
                            value={reshareComment}
                            onChange={e => setReshareComment(e.target.value)}
                            placeholder="Add your thoughts (optional)..."
                            className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 rounded-xl p-3.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 resize-none outline-none focus:border-orange-500/30 transition-colors mb-3"
                            rows={3}
                            maxLength={500}
                        />
                        <input
                            type="text"
                            value={reshareImageUrl}
                            onChange={e => setReshareImageUrl(e.target.value)}
                            placeholder="Add an image URL (optional)..."
                            className="w-full bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:border-orange-500/30 transition-colors mb-4"
                        />
                        <div className="border border-gray-100 dark:border-white/5 rounded-xl p-4 bg-gray-50 dark:bg-white/[0.01] mb-5">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white text-[10px] font-bold">
                                    {reshareTarget.author.avatar ? <Image src={reshareTarget.author.avatar} alt={reshareTarget.author.name} width={24} height={24} className="w-6 h-6 rounded-full object-cover" unoptimized /> : reshareTarget.author.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-xs text-gray-900 dark:text-gray-300 font-semibold">{reshareTarget.author.name}</span>
                                <span className="text-xs text-gray-500">@{reshareTarget.author.username}</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-3">
                                {reshareTarget.content?.slice(0, 200)}{(reshareTarget.content?.length || 0) > 200 && '...'}
                            </p>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => { setReshareTarget(null); setReshareComment(''); setReshareImageUrl(''); }} className="px-4 py-2 text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg font-medium">Cancel</button>
                            <button
                                onClick={handleReshare}
                                disabled={reshareLoading}
                                className="flex items-center gap-1.5 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50"
                            >
                                {reshareLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Repeat2 className="w-3.5 h-3.5" />Reshare</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
