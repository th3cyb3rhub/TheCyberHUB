'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import type { MessageContentType } from '@/lib/mentorship/types';

interface MessageInputProps {
    onSend: (content: string, contentType: MessageContentType, codeLanguage?: string) => Promise<void>;
    onSendFile: (file: File) => Promise<void>;
    disabled?: boolean;
}

const CODE_LANGUAGES = [
    'javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'csharp',
    'go', 'rust', 'php', 'ruby', 'swift', 'kotlin', 'sql', 'bash', 'powershell',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function MessageInput({ onSend, onSendFile, disabled = false }: MessageInputProps) {
    const [content, setContent] = useState('');
    const [mode, setMode] = useState<'text' | 'code'>('text');
    const [codeLanguage, setCodeLanguage] = useState('javascript');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || sending || disabled) return;

        setError(null);
        setSending(true);

        try {
            await onSend(content.trim(), mode, mode === 'code' ? codeLanguage : undefined);
            setContent('');
            setMode('text');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send message');
        } finally {
            setSending(false);
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset input
        e.target.value = '';

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            setError('File size exceeds 10MB limit');
            return;
        }

        setError(null);
        setSending(true);

        try {
            await onSendFile(file);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to upload file');
        } finally {
            setSending(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && mode === 'text') {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="border-t p-3">
            {error && (
                <div className="mb-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-600">
                    {error}
                </div>
            )}

            {/* Mode Toggle */}
            <div className="flex items-center gap-2 mb-2">
                <Button
                    type="button"
                    variant={mode === 'text' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setMode('text')}
                >
                    Text
                </Button>
                <Button
                    type="button"
                    variant={mode === 'code' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setMode('code')}
                >
                    Code
                </Button>
                {mode === 'code' && (
                    <select
                        value={codeLanguage}
                        onChange={(e) => setCodeLanguage(e.target.value)}
                        className="text-xs px-2 py-1 border rounded bg-background"
                    >
                        {CODE_LANGUAGES.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                    {mode === 'text' ? (
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                            rows={1}
                            disabled={disabled || sending}
                            className="w-full px-3 py-2 border rounded-md bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring min-h-[40px] max-h-[120px]"
                            style={{ height: 'auto' }}
                        />
                    ) : (
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Paste your code here..."
                            rows={4}
                            disabled={disabled || sending}
                            className="w-full px-3 py-2 border rounded-md bg-background text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    )}
                </div>

                {/* File Upload */}
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx,.txt,.md"
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled || sending}
                    title="Attach file (max 10MB)"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                </Button>

                {/* Send Button */}
                <Button type="submit" disabled={!content.trim() || disabled || sending}>
                    {sending ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    )}
                </Button>
            </form>
        </div>
    );
}
