'use client';

import { useState, useRef } from 'react';
import { Bold, Italic, Code, Link, List, Quote, Eye, Edit3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import MarkdownContent from './MarkdownContent';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: number;
    maxLength?: number;
    error?: string;
}

export default function MarkdownEditor({
    value,
    onChange,
    placeholder = 'Write your content here...',
    minHeight = 200,
    maxLength,
    error,
}: MarkdownEditorProps) {
    const [isPreview, setIsPreview] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end) || placeholder;
        const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

        onChange(newText);

        // Set cursor position after insertion
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + before.length + selectedText.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const toolbarButtons = [
        { icon: Bold, label: 'Bold', action: () => insertMarkdown('**', '**', 'bold text') },
        { icon: Italic, label: 'Italic', action: () => insertMarkdown('*', '*', 'italic text') },
        { icon: Code, label: 'Code', action: () => insertMarkdown('```\n', '\n```', 'code here') },
        { icon: Link, label: 'Link', action: () => insertMarkdown('[', '](url)', 'link text') },
        { icon: List, label: 'List', action: () => insertMarkdown('- ', '', 'list item') },
        { icon: Quote, label: 'Quote', action: () => insertMarkdown('> ', '', 'quote') },
    ];

    return (
        <div className={cn('rounded-lg border', error ? 'border-red-500/50' : 'border-white/10')}>
            {/* Toolbar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-1">
                    {toolbarButtons.map(({ icon: Icon, label, action }) => (
                        <button
                            key={label}
                            type="button"
                            onClick={action}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                            title={label}
                            aria-label={label}
                        >
                            <Icon className="w-4 h-4" />
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {maxLength && (
                        <span className={cn(
                            'text-xs',
                            value.length > maxLength ? 'text-red-400' : 'text-gray-500'
                        )}>
                            {value.length}/{maxLength}
                        </span>
                    )}
                    <button
                        type="button"
                        onClick={() => setIsPreview(!isPreview)}
                        className={cn(
                            'flex items-center gap-1.5 px-2 py-1 text-xs rounded transition-colors',
                            isPreview
                                ? 'bg-orange-500/20 text-orange-400'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                        )}
                    >
                        {isPreview ? (
                            <>
                                <Edit3 className="w-3.5 h-3.5" />
                                Edit
                            </>
                        ) : (
                            <>
                                <Eye className="w-3.5 h-3.5" />
                                Preview
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Editor / Preview */}
            {isPreview ? (
                <div
                    className="p-4 overflow-auto"
                    style={{ minHeight }}
                >
                    {value ? (
                        <MarkdownContent content={value} />
                    ) : (
                        <p className="text-gray-500 italic">Nothing to preview</p>
                    )}
                </div>
            ) : (
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full p-4 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none font-mono text-sm"
                    style={{ minHeight }}
                    maxLength={maxLength}
                />
            )}

            {/* Error message */}
            {error && (
                <div className="px-3 py-2 text-xs text-red-400 border-t border-red-500/20 bg-red-500/5">
                    {error}
                </div>
            )}
        </div>
    );
}
