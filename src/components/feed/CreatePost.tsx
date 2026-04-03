'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Send, Loader2, Bold, Code, Link2, Hash, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface CreatePostProps {
    onPostCreated: (post: unknown) => void;
}

const DRAFT_KEY = 'tch:feed:draft';

export default function CreatePost({ onPostCreated }: CreatePostProps) {
    const { user } = useAuth();
    const [contents, setContents] = useState<string[]>(() => {
        // Restore draft from localStorage
        try {
            const draft = localStorage.getItem(DRAFT_KEY);
            if (draft) {
                const parsed = JSON.parse(draft);
                if (Array.isArray(parsed.contents) && parsed.contents.some((c: string) => c.trim())) {
                    return parsed.contents;
                }
            }
        } catch {}
        return [''];
    });
    const [images, setImages] = useState<string[][]>([[]]);
    const [loading, setLoading] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [showDraftBanner, setShowDraftBanner] = useState(() => {
        try {
            const draft = localStorage.getItem(DRAFT_KEY);
            if (draft) {
                const parsed = JSON.parse(draft);
                return Array.isArray(parsed.contents) && parsed.contents.some((c: string) => c.trim());
            }
        } catch {}
        return false;
    });
    // refs for each textarea
    const textareaRefs = React.useRef<(HTMLTextAreaElement | null)[]>([]);

    // Auto-save draft to localStorage
    React.useEffect(() => {
        const hasContent = contents.some(c => c.trim());
        if (hasContent) {
            try {
                localStorage.setItem(DRAFT_KEY, JSON.stringify({ contents, savedAt: Date.now() }));
            } catch {}
        } else {
            try { localStorage.removeItem(DRAFT_KEY); } catch {}
        }
    }, [contents]);

    if (!user) return null;

    const isThread = contents.length > 1;
    const isFocused = focusedIndex !== null;

    const handleSubmit = async () => {
        // filter out completely empty trailing thread links
        const validContents = contents.map(c => c.trim()).filter(c => c.length > 0);
        if (validContents.length === 0 || loading) return;

        setLoading(true);
        try {
            const data = await fetchApi('/api/feed/posts', {
                method: 'POST',
                body: JSON.stringify({
                    content: isThread ? validContents : validContents[0],
                    images: isThread ? images : images[0],
                    isThread,
                }),
            });
            onPostCreated(data.data);
            // Reset to single post
            setContents(['']);
            setImages([[]]);
            setFocusedIndex(null);
            setShowDraftBanner(false);
            try { localStorage.removeItem(DRAFT_KEY); } catch {}
        } catch (err) {
            console.error('Create post failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleContentChange = (index: number, value: string) => {
        const newContents = [...contents];
        newContents[index] = value;
        setContents(newContents);
    };

    const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            const { uploadFile } = await import('@/lib/api');
            const url = await uploadFile(file, 'feed');

            const newImages = [...images];
            newImages[index] = [...(newImages[index] || []), url];
            setImages(newImages);
        } catch (err) {
            console.error('Image upload failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const removeImage = (postIndex: number, imgIndex: number) => {
        const newImages = [...images];
        newImages[postIndex].splice(imgIndex, 1);
        setImages(newImages);
    };

    const addThreadPost = () => {
        setContents([...contents, '']);
        setFocusedIndex(contents.length);
    };

    const removeThreadPost = (index: number) => {
        const newContents = contents.filter((_, i) => i !== index);
        setContents(newContents.length ? newContents : ['']);
        setFocusedIndex(newContents.length - 1 >= 0 ? newContents.length - 1 : 0);
    };

    // Insert markdown at cursor for currently focused textarea
    const insertMarkdown = (prefix: string, suffix: string = '', placeholder: string = '') => {
        if (focusedIndex === null) return;
        const textarea = textareaRefs.current[focusedIndex];
        if (!textarea) return;

        const currentContent = contents[focusedIndex] || '';
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = currentContent.slice(start, end) || placeholder;
        const before = currentContent.slice(0, start);
        const after = currentContent.slice(end);

        const newContent = `${before}${prefix}${selectedText}${suffix}${after}`;
        handleContentChange(focusedIndex, newContent);

        setTimeout(() => {
            const cursorPos = start + prefix.length + selectedText.length;
            textarea.setSelectionRange(cursorPos, cursorPos);
            textarea.focus();
        }, 0);
    };

    const maxChars = 2000;

    const discardDraft = () => {
        setContents(['']);
        setImages([[]]);
        setFocusedIndex(null);
        setShowDraftBanner(false);
        try { localStorage.removeItem(DRAFT_KEY); } catch {}
    };

    return (
        <div className={`bg-black border border-white/10 rounded-2xl p-5 shadow-sm transition-all ${isFocused ? 'ring-1 ring-orange-500/50' : ''}`}>
            {/* Draft resume banner */}
            {showDraftBanner && !isFocused && contents.some(c => c.trim()) && (
                <div className="flex items-center justify-between mb-3 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <span className="text-xs text-orange-400 font-medium">You have an unsaved draft</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => { setFocusedIndex(0); setShowDraftBanner(false); }}
                            className="text-xs text-orange-400 hover:text-orange-300 font-medium"
                        >
                            Resume
                        </button>
                        <button
                            onClick={discardDraft}
                            className="text-xs text-gray-500 hover:text-gray-300"
                        >
                            Discard
                        </button>
                    </div>
                </div>
            )}
            {contents.map((content, index) => {
                const charCount = content.length;
                const isOverLimit = charCount > maxChars;
                const charPercent = Math.min((charCount / maxChars) * 100, 100);
                const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
                const readTime = wordCount > 0 ? Math.max(1, Math.ceil(wordCount / 200)) : 0;

                const isLastInThread = index === contents.length - 1;
                const isCurrentlyFocused = focusedIndex === index;

                return (
                    <div key={index} className="relative flex items-start gap-3 mb-3">
                        {/* Dynamic Avatar & Thread Connector Line container */}
                        <div className="flex flex-col items-center shrink-0">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-inner z-10">
                                {user.avatar ? (
                                    <Image src={user.avatar} alt="Your avatar" width={40} height={40} className="w-10 h-10 rounded-full object-cover" unoptimized />
                                ) : (
                                    user.name?.charAt(0)?.toUpperCase() || 'U'
                                )}
                            </div>
                            {/* Vertical Line connecting threads */}
                            {!isLastInThread && (
                                <div className="w-0.5 bg-gray-200 dark:bg-white/10 mt-1 absolute top-10 bottom-[-24px]"></div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col pt-1">
                            <div className="flex justify-between items-start gap-2">
                                <textarea
                                    ref={el => { textareaRefs.current[index] = el; }}
                                    value={content}
                                    onChange={(e) => handleContentChange(index, e.target.value)}
                                    onFocus={() => setFocusedIndex(index)}
                                    placeholder={index === 0 ? "Share a win, a writeup, or drop some knowledge..." : "Add another post to your thread..."}
                                    className="w-full bg-transparent text-sm text-white placeholder-gray-500 resize-none outline-none min-h-[44px] leading-relaxed pb-2"
                                    rows={isCurrentlyFocused ? (isThread ? 4 : 5) : 1}
                                    maxLength={2200}
                                />
                                {isThread && index > 0 && (
                                    <button
                                        onClick={() => removeThreadPost(index)}
                                        className="text-gray-500 hover:text-red-400 p-1.5 transition-colors absolute right-0 top-0"
                                        title="Remove from thread"
                                        aria-label="Remove from thread"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Image Previews */}
                            {images[index]?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3 mb-2">
                                    {images[index].map((url, i) => (
                                        <div key={i} className="relative group rounded-lg overflow-hidden border border-white/10">
                                            <Image src={url} alt="Upload preview" width={80} height={80} className="h-20 w-auto object-cover" unoptimized />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index, i)}
                                                className="absolute top-1 right-1 p-1 bg-black/70 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                aria-label="Remove image"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {isCurrentlyFocused && (
                                <div className="mt-2 pt-3 border-t border-gray-100 dark:border-white/5 space-y-3 mb-2">
                                    <div className="flex items-center gap-1">
                                        <button type="button" onClick={() => insertMarkdown('**', '**', 'bold text')} title="Bold (**text**)" aria-label="Bold" className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                            <Bold className="w-4 h-4" />
                                        </button>
                                        <button type="button" onClick={() => insertMarkdown('`', '`', 'code')} title="Inline code (`code`)" aria-label="Inline code" className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                            <Code className="w-4 h-4" />
                                        </button>
                                        <button type="button" onClick={() => insertMarkdown('[', '](url)', 'link text')} title="Link ([text](url))" aria-label="Insert link" className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                            <Link2 className="w-4 h-4" />
                                        </button>
                                        <button type="button" onClick={() => insertMarkdown('#', '', 'topic')} title="Hashtag (#topic)" aria-label="Add hashtag" className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                            <Hash className="w-4 h-4" />
                                        </button>

                                        <label className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer" title="Add Image" aria-label="Add image">
                                            <ImageIcon className="w-4 h-4" />
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(index, e)}
                                                disabled={loading}
                                            />
                                        </label>

                                        <div className="ml-auto flex items-center gap-3">
                                            {wordCount > 0 && <span className="text-[10px] text-gray-600">~{readTime} min read</span>}
                                            <div className="relative w-6 h-6">
                                                <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="10" fill="none" className="stroke-gray-200 dark:stroke-white/5" strokeWidth="2" />
                                                    <circle cx="12" cy="12" r="10" fill="none"
                                                        stroke={isOverLimit ? '#ef4444' : charPercent > 80 ? '#eab308' : '#f97316'}
                                                        strokeWidth="2" strokeDasharray={`${charPercent * 0.628} 62.8`} strokeLinecap="round" />
                                                </svg>
                                                {charCount > 1800 && (
                                                    <span className={`absolute inset-0 flex items-center justify-center text-[8px] font-medium ${isOverLimit ? 'text-red-400' : 'text-gray-400'}`}>
                                                        {maxChars - charCount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}

            {/* Global Actions Bar at the bottom of the entire component */}
            {isFocused && (
                <div className="flex items-center justify-between mt-3 pt-3 gap-2 border-t border-white/5">
                    <button
                        onClick={addThreadPost}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-blue-500 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 transition-all ml-1"
                    >
                        <Plus className="w-4 h-4" />
                        Add to thread
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={discardDraft}
                            className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-xl"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={contents.every(c => !c.trim()) || contents.some(c => c.length > maxChars) || loading}
                            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-medium transition-all ${contents.some(c => c.trim()) && !contents.some(c => c.length > maxChars)
                                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20'
                                : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-transparent cursor-not-allowed'
                                }`}
                        >
                            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Send className="w-3.5 h-3.5" />{isThread ? 'Post Thread' : 'Post'}</>}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
