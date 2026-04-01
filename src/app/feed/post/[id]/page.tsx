'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, MessageCircle } from 'lucide-react';
import FeedItem from '@/components/feed/FeedItem';
import { fetchApi } from '@/lib/api';

export default function ThreadViewerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    interface ThreadPost {
        _id: string;
        content?: string;
        type: 'post' | 'event';
        author: { _id: string; name: string; username: string; avatar?: string };
        images?: string[];
        likes?: string[];
        likeCount?: number;
        commentCount: number;
        bookmarks?: string[];
        reshares?: string[];
        reshareCount?: number;
        hashtags?: string[];
        createdAt: string;
    }

    const [thread, setThread] = useState<{ root: ThreadPost; descendants: ThreadPost[] } | null>(null);

    useEffect(() => {
        const fetchThread = async () => {
            try {
                const data = await fetchApi(`/api/feed/posts/${id}/thread`, { requireAuth: false });
                if (data.success) {
                    setThread({
                        root: { ...data.root, type: data.root.type || 'post' },
                        descendants: (data.descendants || []).map((d: ThreadPost) => ({ ...d, type: d.type || 'post' } as ThreadPost)),
                    });
                }
            } catch (error) {
                console.error('Failed to load thread:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchThread();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!thread || !thread.root) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 mb-4">Thread not found or has been deleted.</p>
                <button
                    onClick={() => router.push('/feed')}
                    className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                    Back to Feed
                </button>
            </div>
        );
    }

    // Combine root and descendants into a single array for rendering
    const allPosts = [thread.root, ...thread.descendants];

    return (
        <div className="max-w-3xl mx-auto py-6 px-4">
            <div className="flex items-center gap-4 mb-6 sticky top-0 bg-black/80 backdrop-blur-md z-10 py-3 border-b border-white/10">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-white flex items-center gap-2">
                        Thread
                    </h1>
                    <p className="text-xs text-gray-500">
                        {allPosts.length} post{allPosts.length !== 1 ? 's' : ''} • Started by {thread.root.author.name}
                    </p>
                </div>
            </div>

            <div className="relative">
                {/* Connective background line for the entire thread */}
                {allPosts.length > 1 && (
                    <div className="absolute left-[39px] top-12 bottom-24 w-0.5 bg-gray-800 dark:bg-white/10 z-0 hidden sm:block"></div>
                )}

                <div className="space-y-4 relative z-10">
                    {allPosts.map((post) => (
                        <div key={post._id} className="relative">
                            <FeedItem post={post} />
                        </div>
                    ))}
                </div>

                {/* Visual cap at the end of the thread */}
                {allPosts.length > 1 && (
                    <div className="flex items-center gap-3 mt-6 justify-center">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" /> End of thread</span>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
