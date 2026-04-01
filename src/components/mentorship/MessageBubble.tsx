'use client';

import Image from 'next/image';
import { formatMessageTime } from '@/hooks/useMessages';
import type { Message } from '@/lib/mentorship/types';

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
    const timeStr = formatMessageTime(message.createdAt);

    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`flex gap-2 max-w-[80%] ${isOwn ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                {!isOwn && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                        {message.sender.avatar ? (
                            <Image src={message.sender.avatar} alt={message.sender.name} width={32} height={32} className="w-full h-full object-cover" unoptimized />
                        ) : (
                            <span className="text-xs font-semibold text-muted-foreground">
                                {message.sender.name.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>
                )}

                {/* Message Content */}
                <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                    {!isOwn && (
                        <span className="text-xs text-muted-foreground mb-1">{message.sender.name}</span>
                    )}

                    <div
                        className={`rounded-lg px-3 py-2 ${isOwn
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                    >
                        {/* Text Message */}
                        {message.contentType === 'text' && (
                            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                        )}

                        {/* Code Block */}
                        {message.contentType === 'code' && (
                            <div className="font-mono text-xs">
                                {message.codeLanguage && (
                                    <div className="text-xs opacity-70 mb-1">{message.codeLanguage}</div>
                                )}
                                <pre className="bg-black/20 rounded p-2 overflow-x-auto">
                                    <code>{message.content}</code>
                                </pre>
                            </div>
                        )}

                        {/* File Attachment */}
                        {message.contentType === 'file' && message.attachment && (
                            <a
                                href={message.attachment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:opacity-80"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                <div>
                                    <p className="text-sm font-medium">{message.attachment.filename}</p>
                                    <p className="text-xs opacity-70">
                                        {formatFileSize(message.attachment.size)}
                                    </p>
                                </div>
                            </a>
                        )}
                    </div>

                    <span className="text-xs text-muted-foreground mt-1">{timeStr}</span>
                </div>
            </div>
        </div>
    );
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
