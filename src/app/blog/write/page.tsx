"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { renderMarkdownToHtml } from '@/lib/renderMarkdown';
import {
    ArrowLeft,
    Save,
    Eye,
    EyeOff,
    Image as ImageIcon,
    Bold,
    Italic,
    List,
    ListOrdered,
    Link as LinkIcon,
    Code,
    Heading1,
    Heading2,
    Quote,
    Loader2,
    X,
    Plus,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

const BlogWritePage = () => {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [isPreview, setIsPreview] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [draftSaved, setDraftSaved] = useState(false);
    const [showDraftRestore, setShowDraftRestore] = useState(false);
    const { addToast } = useToast();

    const DRAFT_KEY = 'blog-draft';

    // Load draft on mount
    useEffect(() => {
        const saved = localStorage.getItem(DRAFT_KEY);
        if (saved) {
            try {
                const draft = JSON.parse(saved);
                if (draft.title || draft.content) {
                    setShowDraftRestore(true);
                }
            } catch { /* ignore parse errors */ }
        }
    }, []);

    const restoreDraft = () => {
        const saved = localStorage.getItem(DRAFT_KEY);
        if (saved) {
            try {
                const draft = JSON.parse(saved);
                if (draft.title) setTitle(draft.title);
                if (draft.content) setContent(draft.content);
                if (draft.tags) setTags(draft.tags);
                if (draft.coverImage) setCoverImage(draft.coverImage);
                addToast({ variant: 'success', title: 'Draft restored', message: 'Your previous draft has been restored.' });
            } catch { /* ignore */ }
        }
        setShowDraftRestore(false);
    };

    const dismissDraft = () => {
        localStorage.removeItem(DRAFT_KEY);
        setShowDraftRestore(false);
    };

    // Auto-save every 30 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            if (title || content) {
                localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, content, tags, coverImage, savedAt: Date.now() }));
                setDraftSaved(true);
                setTimeout(() => setDraftSaved(false), 2000);
            }
        }, 30000);
        return () => clearInterval(timer);
    }, [title, content, tags, coverImage]);

    // Redirect if not logged in
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth?redirect=/blog/write');
        }
    }, [authLoading, user, router]);

    // Insert markdown at cursor
    const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end) || placeholder;

        const newContent =
            content.substring(0, start) +
            before + selectedText + after +
            content.substring(end);

        setContent(newContent);

        // Set cursor position after insertion
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + before.length + selectedText.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const toolbarButtons = [
        { icon: Bold, action: () => insertMarkdown('**', '**', 'bold text'), title: 'Bold' },
        { icon: Italic, action: () => insertMarkdown('*', '*', 'italic text'), title: 'Italic' },
        { icon: Heading1, action: () => insertMarkdown('# ', '', 'Heading'), title: 'Heading 1' },
        { icon: Heading2, action: () => insertMarkdown('## ', '', 'Heading'), title: 'Heading 2' },
        { icon: List, action: () => insertMarkdown('- ', '', 'List item'), title: 'Bullet List' },
        { icon: ListOrdered, action: () => insertMarkdown('1. ', '', 'List item'), title: 'Numbered List' },
        { icon: Quote, action: () => insertMarkdown('> ', '', 'Quote'), title: 'Quote' },
        { icon: Code, action: () => insertMarkdown('`', '`', 'code'), title: 'Inline Code' },
        { icon: LinkIcon, action: () => insertMarkdown('[', '](url)', 'link text'), title: 'Link' },
        { icon: ImageIcon, action: () => insertMarkdown('![', '](image-url)', 'alt text'), title: 'Image' },
    ];

    const addTag = () => {
        const tag = tagInput.trim().toLowerCase();
        if (tag && !tags.includes(tag) && tags.length < 5) {
            setTags([...tags, tag]);
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Please enter a title');
            return;
        }
        if (!content.trim()) {
            setError('Please write some content');
            return;
        }

        setSaving(true);
        setError(null);

        try {
            const data = await fetchApi('/api/blogs', {
                method: 'POST',
                body: JSON.stringify({
                    title: title.trim(),
                    content: content.trim(),
                    tags,
                    coverImage: coverImage.trim() || undefined
                }),
            });

            localStorage.removeItem(DRAFT_KEY);
            setSuccess(true);
            addToast({
                variant: 'success',
                title: 'Article published',
                message: 'Your article has been published successfully.',
            });
            setTimeout(() => {
                router.push(`/blog/${data._id || data.id}`);
            }, 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to publish');
            addToast({
                variant: 'error',
                title: 'Publish failed',
                message: err instanceof Error ? err.message : 'Failed to publish article.',
            });
        } finally {
            setSaving(false);
        }
    };

    // Simple markdown to HTML converter for preview
    const renderMarkdown = renderMarkdownToHtml;

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-2 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-white">Write Article</h1>
                            {draftSaved && <span className="text-xs text-green-400 animate-fade-in">Draft saved</span>}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsPreview(!isPreview)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
                        >
                            {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {isPreview ? 'Edit' : 'Preview'}
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={saving || !title.trim() || !content.trim()}
                            className="flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-lg transition-all"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Publish
                        </button>
                    </div>
                </div>

                {/* Draft Restore Prompt */}
                {showDraftRestore && !title && !content && (
                    <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Save className="w-5 h-5 text-blue-400" />
                            <p className="text-blue-400 text-sm">You have an unsaved draft. Would you like to restore it?</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={restoreDraft} className="px-3 py-1.5 text-sm bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                                Restore
                            </button>
                            <button onClick={dismissDraft} className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-300 rounded-lg transition-colors">
                                Dismiss
                            </button>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <p className="text-green-400">Article published successfully! Redirecting...</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {isPreview ? (
                    /* Preview Mode */
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                        {coverImage && (
                            <Image
                                src={coverImage}
                                alt="Cover"
                                width={800}
                                height={450}
                                className="w-full aspect-video object-cover rounded-xl mb-6"
                                unoptimized
                            />
                        )}
                        <h1 className="text-3xl font-bold text-white mb-4">
                            {title || 'Untitled Article'}
                        </h1>
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div
                            className="prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(`<p class="text-gray-300 mb-4">${renderMarkdown(content) || '<span class="text-gray-500">No content yet...</span>'}</p>`)
                            }}
                        />
                    </div>
                ) : (
                    /* Edit Mode */
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Cover Image Upload */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Cover Image (optional)</label>

                            {coverImage ? (
                                <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video mb-3">
                                    <Image src={coverImage} alt="Cover Preview" width={800} height={450} className="w-full h-full object-cover" unoptimized />
                                    <button
                                        type="button"
                                        onClick={() => setCoverImage('')}
                                        className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 hover:border-orange-500/50 transition-all">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
                                            <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                                            <p className="mb-1 text-sm font-semibold">Click to upload cover image</p>
                                            <p className="text-xs opacity-70">PNG, JPG, or WebP (Max 5MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                try {
                                                    setSaving(true);
                                                    const { uploadFile } = await import('@/lib/api');
                                                    const url = await uploadFile(file, 'blogs');
                                                    setCoverImage(url);
                                                    addToast({ variant: 'success', title: 'Image uploaded', message: 'Cover image uploaded successfully.' });
                                                } catch (err) {
                                                    addToast({ variant: 'error', title: 'Upload failed', message: err instanceof Error ? err.message : 'Error uploading image' });
                                                } finally {
                                                    setSaving(false);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter your article title..."
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xl font-semibold placeholder:text-gray-600 placeholder:font-normal focus:border-orange-500/50 focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Tags (up to 5)</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="flex items-center gap-1 px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="hover:text-orange-300"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            {tags.length < 5 && (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                        placeholder="Add a tag..."
                                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={addTag}
                                        className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/20 transition-all"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Content Editor */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Content (Markdown supported)</label>

                            {/* Toolbar */}
                            <div className="flex flex-wrap gap-1 p-2 bg-white/5 border border-white/10 border-b-0 rounded-t-xl">
                                {toolbarButtons.map((btn, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={btn.action}
                                        title={btn.title}
                                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        <btn.icon className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>

                            {/* Textarea */}
                            <textarea
                                ref={textareaRef}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your article content here... (Markdown supported)"
                                rows={20}
                                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-b-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors font-mono text-sm resize-none"
                                required
                            />
                        </div>

                        {/* Tips */}
                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <p className="text-blue-400 text-sm font-medium mb-2">Markdown Tips:</p>
                            <ul className="text-blue-400/80 text-sm space-y-1">
                                <li>• Use **text** for <strong>bold</strong> and *text* for <em>italic</em></li>
                                <li>• Use # for headings (## for smaller)</li>
                                <li>• Use `code` for inline code and ``` for code blocks</li>
                                <li>• Use [text](url) for links and ![alt](url) for images</li>
                            </ul>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BlogWritePage;
