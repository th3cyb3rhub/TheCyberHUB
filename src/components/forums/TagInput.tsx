'use client';

import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
    maxTags?: number;
    maxTagLength?: number;
    placeholder?: string;
    error?: string;
}

export default function TagInput({
    tags,
    onChange,
    maxTags = 5,
    maxTagLength = 30,
    placeholder = 'Add tags...',
    error,
}: TagInputProps) {
    const [input, setInput] = useState('');

    const addTag = (tag: string) => {
        const trimmed = tag.trim().toLowerCase();
        if (!trimmed) return;
        if (trimmed.length > maxTagLength) return;
        if (tags.length >= maxTags) return;
        if (tags.includes(trimmed)) return;

        onChange([...tags, trimmed]);
        setInput('');
    };

    const removeTag = (tagToRemove: string) => {
        onChange(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(input);
        } else if (e.key === 'Backspace' && !input && tags.length > 0) {
            removeTag(tags[tags.length - 1]);
        }
    };

    return (
        <div>
            <div
                className={cn(
                    'flex flex-wrap items-center gap-2 p-3 rounded-lg border bg-white/5 focus-within:border-orange-500/50 transition-colors',
                    error ? 'border-red-500/50' : 'border-white/10'
                )}
            >
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-sm"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-orange-300 transition-colors"
                            aria-label={`Remove tag ${tag}`}
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </span>
                ))}

                {tags.length < maxTags && (
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={() => addTag(input)}
                        placeholder={tags.length === 0 ? placeholder : ''}
                        className="flex-1 min-w-[100px] bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none"
                        maxLength={maxTagLength}
                    />
                )}
            </div>

            <div className="flex items-center justify-between mt-1.5">
                {error ? (
                    <span className="text-xs text-red-400">{error}</span>
                ) : (
                    <span className="text-xs text-gray-500">
                        Press Enter or comma to add. Max {maxTags} tags.
                    </span>
                )}
                <span className="text-xs text-gray-500">
                    {tags.length}/{maxTags}
                </span>
            </div>
        </div>
    );
}
