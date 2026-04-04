/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, User, Clock, BookOpen, PenLine, FileText, X } from 'lucide-react';
import Footer from '@/components/Footer';
import { SkeletonBlogGrid } from '@/components/ui/skeleton';
import { fetchApi } from '@/lib/api';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/context/ToastContext';

interface Blog {
    _id: string;
    title: string;
    content: string;
    coverImage?: string;
    tags?: string[];
    author?: {
        username: string;
        name?: string;
    };
    createdAt: string;
    views?: number;
}

const BlogPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedTag, setSelectedTag] = useState<string | null>(searchParams.get('tag') || null);
    const { addToast } = useToast();

    const updateFilters = useCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === '' || value === 'all') {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, [searchParams, router, pathname]);

    const hasActiveFilters = searchQuery !== '' || selectedTag !== null;

    const clearAllFilters = useCallback(() => {
        setSearchQuery('');
        setSelectedTag(null);
        router.replace(pathname, { scroll: false });
    }, [router, pathname]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const result = await fetchApi('/api/blogs', { requireAuth: false });
                // API returns { success, data, pagination }
                setBlogs(result.data || []);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
                addToast({ message: 'Failed to load blog posts', variant: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const allTags = Array.from(new Set((blogs || []).flatMap(b => b.tags || [])));

    const filteredBlogs = (blogs || []).filter(blog => {
        const matchesSearch = blog.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            blog.content?.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesTag = !selectedTag || (blog.tags && blog.tags.includes(selectedTag));
        return matchesSearch && matchesTag;
    });

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getReadTime = (content: string) => {
        const words = content.split(/\s+/).length;
        return Math.ceil(words / 200);
    };

    const getExcerpt = (content: string, maxLength = 150) => {
        const stripped = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
        return stripped.length > maxLength ? stripped.substring(0, maxLength) + '...' : stripped;
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <BookOpen className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Community Articles</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                        Community <span className="gradient-text">Blog</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
                        Security insights, tutorials, and write-ups from the community.
                    </p>

                    {/* Write CTA */}
                    <Link
                        href="/blog/write"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-xl text-sm text-orange-400 font-medium transition-all"
                    >
                        <PenLine className="w-4 h-4" />
                        Write an Article
                    </Link>
                </div>
            </section>

            {/* Search & Filter */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); updateFilters('search', e.target.value); }}
                            placeholder="Search articles..."
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                    {allTags.length > 0 && (
                        <>
                        <button
                            onClick={() => { setSelectedTag(null); updateFilters('tag', ''); }}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                !selectedTag
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white/5 text-gray-400 hover:text-white'
                            }`}
                        >
                            All
                        </button>
                        {allTags.slice(0, 10).map(tag => (
                            <button
                                key={tag}
                                onClick={() => { setSelectedTag(tag); updateFilters('tag', tag); }}
                                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                    selectedTag === tag
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white/5 text-gray-400 hover:text-white'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                        </>
                    )}
                    {hasActiveFilters && (
                        <button
                            onClick={clearAllFilters}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all ml-auto"
                        >
                            <X className="w-3.5 h-3.5" /> Clear Filters
                        </button>
                    )}
                </div>
            </section>

            {/* Blog Grid */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
                {loading ? (
                    <SkeletonBlogGrid />
                ) : filteredBlogs.length === 0 ? (
                    <EmptyState
                        icon={FileText}
                        title={blogs.length === 0 ? 'No blog posts yet' : 'No posts found'}
                        description={blogs.length === 0
                            ? 'Be the first to write one!'
                            : 'No posts found matching your search.'}
                        actionLabel="Write an Article"
                        actionHref="/blog/write"
                    />
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredBlogs.map((blog, index) => (
                            <Link
                                key={blog._id}
                                href={`/blog/${blog._id}`}
                                className={`group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-orange-500/30 transition-all duration-300 card-hover animate-fade-in-up animate-stagger-${index % 6 + 1}`}
                                style={{ animationFillMode: 'forwards' }}
                            >
                                {/* Cover Image */}
                                {blog.coverImage && (
                                    <div className="aspect-video bg-white/5 overflow-hidden">
                                        <Image
                                            src={blog.coverImage}
                                            alt={blog.title}
                                            width={800}
                                            height={400}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            unoptimized
                                        />
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Tags */}
                                    {blog.tags && blog.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {blog.tags.slice(0, 3).map(tag => (
                                                <span 
                                                    key={tag}
                                                    className="text-xs px-2 py-0.5 bg-orange-500/10 text-orange-400 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                        {getExcerpt(blog.content)}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {blog.author?.username || 'Anonymous'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(blog.createdAt)}
                                            </span>
                                        </div>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {getReadTime(blog.content)} min read
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default BlogPage;
