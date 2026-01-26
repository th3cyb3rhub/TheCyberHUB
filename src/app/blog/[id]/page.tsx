"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, User, Clock, Eye, Loader2, Edit, Trash2 } from 'lucide-react';
import { API_URL } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import CommentSection from '@/components/blog/CommentSection';
import BlogActions from '@/components/blog/BlogActions';

interface Blog {
    _id: string;
    title: string;
    content: string;
    coverImage?: string;
    tags?: string[];
    author?: {
        _id: string;
        username: string;
        name?: string;
    };
    createdAt: string;
    views?: number;
    likeCount?: number;
    likes?: string[];
}

const BlogPostPage = () => {
    const params = useParams();
    const router = useRouter();
    const { user, token } = useAuth();
    const { addToast } = useToast();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${API_URL}/api/blogs/${params.id}`);
                if (!response.ok) throw new Error('Blog not found');
                const data = await response.json();
                setBlog(data.data || data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load blog');
            } finally {
                setLoading(false);
            }
        };
        if (params.id) fetchBlog();
    }, [params.id]);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getReadTime = (content: string) => {
        const words = content.split(/\s+/).length;
        return Math.ceil(words / 200);
    };

    // Check if user is owner or admin
    const isOwner = user && blog?.author?._id && user.id === blog.author._id;
    const isAdmin = user?.role === 'admin';
    const canEdit = isOwner || isAdmin;
    const canDelete = isOwner || isAdmin;

    // Check if user has liked/bookmarked
    const isLiked = user && blog?.likes?.includes(user.id);
    const isBookmarked = user?.bookmarks?.roadmaps?.includes(blog?._id || '');

    const handleEdit = () => {
        router.push(`/blog/edit/${blog?._id}`);
    };

    const handleDelete = async () => {
        if (!blog || !token) return;

        const confirmed = window.confirm(
            'Are you sure you want to delete this blog post? This action cannot be undone.'
        );

        if (!confirmed) return;

        setDeleting(true);

        try {
            const response = await fetch(`${API_URL}/api/blogs/${blog._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error?.message || 'Failed to delete blog');
            }

            addToast({
                variant: 'success',
                title: 'Blog deleted',
                message: 'Your blog post has been deleted successfully.',
            });

            router.push('/blog');
        } catch (err) {
            addToast({
                variant: 'error',
                title: 'Delete failed',
                message: err instanceof Error ? err.message : 'Failed to delete blog post.',
            });
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
                <h1 className="text-2xl font-bold text-white mb-4">Blog not found</h1>
                <p className="text-gray-400 mb-8">{error || 'The requested blog post does not exist.'}</p>
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <section className="relative pt-32 pb-8 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-3xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-1 bg-orange-500/10 text-orange-400 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        {blog.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8">
                        <span className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {blog.author?.username || 'Anonymous'}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(blog.createdAt)}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {getReadTime(blog.content)} min read
                        </span>
                        {blog.views && (
                            <span className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                {blog.views} views
                            </span>
                        )}
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center justify-between mb-8">
                        <BlogActions
                            blogId={blog._id}
                            initialLikeCount={blog.likeCount || 0}
                            initialIsLiked={!!isLiked}
                            initialIsBookmarked={!!isBookmarked}
                        />

                        {/* Edit/Delete Buttons (Owner or Admin only) */}
                        {(canEdit || canDelete) && (
                            <div className="flex items-center gap-2">
                                {canEdit && (
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-blue-400 hover:text-blue-300 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                )}
                                {canDelete && (
                                    <button
                                        onClick={handleDelete}
                                        disabled={deleting}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {deleting ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                        Delete
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Cover Image */}
            {blog.coverImage && (
                <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
                    <div className="rounded-xl overflow-hidden">
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-auto"
                        />
                    </div>
                </section>
            )}

            {/* Content */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
                <article className="prose prose-invert prose-orange max-w-none">
                    <div
                        className="text-gray-300 leading-relaxed whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </article>

                {/* Author Card */}
                <div className="mt-12 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <User className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Written by</p>
                            <p className="font-medium text-white">{blog.author?.name || blog.author?.username || 'Anonymous'}</p>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <CommentSection blogId={blog._id} />
            </section>
        </div>
    );
};

export default BlogPostPage;
