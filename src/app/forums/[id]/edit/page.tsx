'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Category, CATEGORY_INFO, Discussion } from '@/types/forum';
import { getDiscussion, updateDiscussion } from '@/lib/api/forum';
import { useAuth } from '@/context/AuthContext';
import MarkdownEditor from '@/components/forums/MarkdownEditor';
import TagInput from '@/components/forums/TagInput';
import Footer from '@/components/Footer';

const CATEGORIES = Object.keys(CATEGORY_INFO) as Category[];

export default function EditDiscussionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [discussion, setDiscussion] = useState<Discussion | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState<Category | ''>('');
    const [tags, setTags] = useState<string[]>([]);

    const [errors, setErrors] = useState<{
        title?: string;
        content?: string;
        category?: string;
    }>({});

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            router.push(`/auth?redirect=/forums/${id}/edit`);
        }
    }, [authLoading, user, router, id]);

    useEffect(() => {
        const fetchDiscussion = async () => {
            try {
                const result = await getDiscussion(id);
                if (result.data) {
                    setDiscussion(result.data);
                    setTitle(result.data.title);
                    setContent(result.data.content);
                    setCategory(result.data.category);
                    setTags(result.data.tags);
                } else {
                    setError('Discussion not found');
                }
            } catch {
                setError('Failed to load discussion');
            } finally {
                setLoading(false);
            }
        };
        fetchDiscussion();
    }, [id]);

    const validate = (): boolean => {
        const newErrors: typeof errors = {};

        if (title.trim().length < 10) {
            newErrors.title = 'Title must be at least 10 characters';
        } else if (title.trim().length > 200) {
            newErrors.title = 'Title cannot exceed 200 characters';
        }

        if (content.trim().length < 30) {
            newErrors.content = 'Content must be at least 30 characters';
        } else if (content.trim().length > 10000) {
            newErrors.content = 'Content cannot exceed 10000 characters';
        }

        if (!category) {
            newErrors.category = 'Please select a category';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await updateDiscussion(id, {
                title: title.trim(),
                content: content.trim(),
                category: category as Category,
                tags: tags.length > 0 ? tags : undefined,
            });
            router.push(`/forums/${id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update discussion');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!discussion) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
                <AlertCircle className="w-12 h-12 text-red-500" />
                <h1 className="text-xl font-medium text-white">{error || 'Discussion not found'}</h1>
                <Link
                    href="/forums"
                    className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                    Back to Forums
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-16">
            {/* Header */}
            <div className="border-b border-white/5">
                <div className="max-w-3xl mx-auto px-4 py-4">
                    <Link
                        href={`/forums/${id}`}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Discussion
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-white mb-2">Edit Discussion</h1>
                <p className="text-gray-400 mb-8">
                    Update your discussion. Changes will be marked as edited.
                </p>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Title <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What's your question or topic?"
                            className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors ${errors.title ? 'border-red-500/50' : 'border-white/10'
                                }`}
                            maxLength={200}
                        />
                        <div className="flex items-center justify-between mt-1.5">
                            {errors.title ? (
                                <span className="text-xs text-red-400">{errors.title}</span>
                            ) : (
                                <span className="text-xs text-gray-500">
                                    Be specific and descriptive
                                </span>
                            )}
                            <span className="text-xs text-gray-500">{title.length}/200</span>
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Category <span className="text-red-400">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {CATEGORIES.map((cat) => {
                                const info = CATEGORY_INFO[cat];
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setCategory(cat)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${category === cat
                                            ? `${info.bgColor} ${info.color} ${info.borderColor}`
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        {info.label}
                                    </button>
                                );
                            })}
                        </div>
                        {errors.category && (
                            <span className="text-xs text-red-400 mt-1.5 block">{errors.category}</span>
                        )}
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Content <span className="text-red-400">*</span>
                        </label>
                        <MarkdownEditor
                            value={content}
                            onChange={setContent}
                            placeholder="Describe your question or topic in detail."
                            minHeight={250}
                            maxLength={10000}
                            error={errors.content}
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Tags <span className="text-gray-500">(optional)</span>
                        </label>
                        <TagInput
                            tags={tags}
                            onChange={setTags}
                            maxTags={5}
                            maxTagLength={30}
                            placeholder="Add relevant tags..."
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-end gap-4 pt-4">
                        <Link
                            href={`/forums/${id}`}
                            className="px-6 py-2.5 text-gray-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
}
