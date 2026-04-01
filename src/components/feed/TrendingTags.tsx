'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Hash, Loader2 } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface TrendingTag {
    tag: string;
    count: number;
}

export default function TrendingTags({ onTagClick }: { onTagClick?: (tag: string) => void }) {
    const [tags, setTags] = useState<TrendingTag[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const data = await fetchApi('/api/feed/trending', { requireAuth: false, cache: 'no-cache' });
                if (data) {
                    setTags(data.data || []);
                }
            } catch (err) {
                console.error('Failed to load trending:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    if (loading) {
        return (
            <div className="bg-black border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <h3 className="text-sm font-semibold text-white">Trending</h3>
                </div>
                <Loader2 className="w-4 h-4 animate-spin text-gray-500 mx-auto" />
            </div>
        );
    }

    if (tags.length === 0) return null;

    return (
        <div className="bg-black border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-semibold text-white">Trending</h3>
            </div>
            <div className="space-y-2">
                {tags.slice(0, 10).map((t) => (
                    <button
                        key={t.tag}
                        onClick={() => onTagClick?.(t.tag)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                        <span className="flex items-center gap-2">
                            <Hash className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                            <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                                {t.tag}
                            </span>
                        </span>
                        <span className="text-xs text-gray-600">{t.count} posts</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
