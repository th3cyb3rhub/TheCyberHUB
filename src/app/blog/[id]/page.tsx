"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, User, Clock, Eye, Loader2, Edit, Trash2, Twitter, Linkedin, Link2, Check } from 'lucide-react';
import DOMPurify from 'dompurify';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import CommentSection from '@/components/blog/CommentSection';
import BlogActions from '@/components/blog/BlogActions';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/ConfirmDialog';

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

interface TocHeading {
    id: string;
    text: string;
    level: number;
}

function TableOfContents({ content }: { content: string }) {
    const headings: TocHeading[] = [];

    // Parse headings from HTML content
    const htmlHeadingRegex = /<h([1-3])[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h[1-3]>/gi;
    let match;
    while ((match = htmlHeadingRegex.exec(content)) !== null) {
        const level = parseInt(match[1]);
        const text = match[3].replace(/<[^>]*>/g, '').trim();
        const id = match[2] || text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        if (text) headings.push({ id, text, level });
    }

    // Also parse markdown-style headings
    const lines = content.split('\n');
    for (const line of lines) {
        const mdMatch = line.match(/^(#{1,3})\s+(.+)/);
        if (mdMatch) {
            const level = mdMatch[1].length;
            const text = mdMatch[2].replace(/[*`]/g, '').trim();
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            if (text && !headings.some(h => h.text === text)) {
                headings.push({ id, text, level });
            }
        }
    }

    if (headings.length < 3) return null;

    return (
        <nav className="hidden lg:block w-56 flex-shrink-0 sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Table of Contents
            </h4>
            <ul className="space-y-1.5 border-l border-white/10">
                {headings.map((heading, i) => (
                    <li key={i}>
                        <a
                            href={`#${heading.id}`}
                            className={`block text-sm text-gray-400 hover:text-orange-400 transition-colors py-0.5 ${
                                heading.level === 1 ? 'pl-3 font-medium' : heading.level === 2 ? 'pl-5' : 'pl-7 text-xs'
                            }`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

interface RelatedBlog {
    _id: string;
    title: string;
    tags?: string[];
    coverImage?: string;
    createdAt: string;
    author?: { username: string };
}

function RelatedPosts({ currentBlogId, tags }: { currentBlogId: string; tags?: string[] }) {
    const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const data = await fetchApi('/api/blogs?limit=10', { requireAuth: false });
                const allBlogs: RelatedBlog[] = data.data || [];
                // Filter out current blog, then score by shared tags
                const scored = allBlogs
                    .filter(b => b._id !== currentBlogId)
                    .map(b => {
                        const sharedTags = tags ? (b.tags || []).filter(t => tags.includes(t)).length : 0;
                        return { blog: b, score: sharedTags };
                    })
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 3);
                setRelatedBlogs(scored.map(s => s.blog));
            } catch {
                // Related posts are optional
            }
        };
        fetchRelated();
    }, [currentBlogId, tags]);

    if (relatedBlogs.length === 0) return null;

    return (
        <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white mb-6">Related Posts</h3>
            <div className="grid sm:grid-cols-3 gap-4">
                {relatedBlogs.map(post => (
                    <Link
                        key={post._id}
                        href={`/blog/${post._id}`}
                        className="group p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-orange-500/30 transition-all"
                    >
                        <h4 className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors line-clamp-2 mb-2">
                            {post.title}
                        </h4>
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                                {post.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-orange-500/10 text-orange-400 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <p className="text-xs text-gray-500">
                            {post.author?.username || 'Anonymous'} · {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function SocialShareButtons({ title }: { title: string }) {
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleTwitterShare = () => {
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
            '_blank',
            'width=550,height=420'
        );
    };

    const handleLinkedInShare = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            '_blank',
            'width=550,height=420'
        );
    };

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-1">
            <button
                onClick={handleTwitterShare}
                className="p-2 text-gray-400 hover:text-sky-400 hover:bg-white/5 rounded-lg transition-colors"
                title="Share on Twitter"
            >
                <Twitter className="w-4 h-4" />
            </button>
            <button
                onClick={handleLinkedInShare}
                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-colors"
                title="Share on LinkedIn"
            >
                <Linkedin className="w-4 h-4" />
            </button>
            <button
                onClick={handleCopyLink}
                className="p-2 text-gray-400 hover:text-orange-400 hover:bg-white/5 rounded-lg transition-colors"
                title="Copy link"
            >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Link2 className="w-4 h-4" />}
            </button>
        </div>
    );
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
    const { isOpen: confirmOpen, confirm: showConfirm, onConfirm, onCancel } = useConfirmDialog();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await fetchApi(`/api/blogs/${params.id}`, { requireAuth: false });
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

        const confirmed = await showConfirm();

        if (!confirmed) return;

        setDeleting(true);

        try {
            await fetchApi(`/api/blogs/${blog._id}`, {
                method: 'DELETE',
            });

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
                    <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: blog.title }]} />

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
                        <div className="flex items-center gap-4">
                            <BlogActions
                                blogId={blog._id}
                                initialLikeCount={blog.likeCount || 0}
                                initialIsLiked={!!isLiked}
                                initialIsBookmarked={!!isBookmarked}
                            />
                            <SocialShareButtons title={blog.title} />
                        </div>

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
                        <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            width={800}
                            height={400}
                            className="w-full h-auto"
                            unoptimized
                        />
                    </div>
                </section>
            )}

            {/* Content with TOC */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                <div className="flex gap-8">
                    {/* TOC Sidebar (desktop) */}
                    <TableOfContents content={blog.content} />

                    <div className="flex-1 min-w-0 max-w-3xl">
                        <article className="prose prose-invert prose-orange max-w-none">
                            <div
                                className="text-gray-300 leading-relaxed whitespace-pre-wrap blog-content"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
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

                        {/* Related Posts */}
                        <RelatedPosts currentBlogId={blog._id} tags={blog.tags} />

                        {/* Comments Section */}
                        <CommentSection blogId={blog._id} />
                    </div>
                </div>
            </section>

            <ConfirmDialog
                open={confirmOpen}
                onConfirm={onConfirm}
                onCancel={onCancel}
                title="Delete blog post?"
                description="Are you sure you want to delete this blog post? This action cannot be undone."
                confirmText="Delete"
                variant="danger"
            />
        </div>
    );
};

export default BlogPostPage;
