'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import MarkdownEditor from './MarkdownEditor';

interface ReplyFormProps {
    onSubmit: (content: string) => Promise<void>;
    onCancel?: () => void;
    placeholder?: string;
    submitLabel?: string;
}

export default function ReplyForm({
    onSubmit,
    onCancel,
    placeholder = 'Write your reply...',
    submitLabel = 'Post Reply',
}: ReplyFormProps) {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const trimmed = content.trim();
        if (trimmed.length < 10) {
            setError('Reply must be at least 10 characters');
            return;
        }
        if (trimmed.length > 5000) {
            setError('Reply cannot exceed 5000 characters');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(trimmed);
            setContent('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to post reply');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <MarkdownEditor
                value={content}
                onChange={setContent}
                placeholder={placeholder}
                minHeight={120}
                maxLength={5000}
                error={error}
            />

            <div className="flex items-center justify-end gap-3">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting || content.trim().length < 10}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Posting...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            {submitLabel}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
