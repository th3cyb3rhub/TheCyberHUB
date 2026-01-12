'use client';

import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { groupMessagesByDate } from '@/hooks/useMessages';
import type { Message } from '@/lib/mentorship/types';

interface MessageListProps {
    messages: Message[];
    currentUserId: string;
    loading?: boolean;
    hasMore?: boolean;
    onLoadMore?: () => void;
}

export function MessageList({
    messages,
    currentUserId,
    loading = false,
    hasMore = false,
    onLoadMore,
}: MessageListProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const prevMessagesLength = useRef(messages.length);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (messages.length > prevMessagesLength.current) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        prevMessagesLength.current = messages.length;
    }, [messages.length]);

    // Handle scroll for loading more
    const handleScroll = () => {
        if (!containerRef.current || !hasMore || loading) return;

        const { scrollTop } = containerRef.current;
        if (scrollTop < 100) {
            onLoadMore?.();
        }
    };

    const groupedMessages = groupMessagesByDate(messages);

    if (messages.length === 0 && !loading) {
        return (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p className="text-sm">No messages yet</p>
                    <p className="text-xs mt-1">Start the conversation!</p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="flex-1 overflow-y-auto p-4"
            onScroll={handleScroll}
        >
            {/* Load More Indicator */}
            {loading && (
                <div className="flex justify-center py-2">
                    <svg className="w-5 h-5 animate-spin text-muted-foreground" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                </div>
            )}

            {/* Messages grouped by date */}
            {Array.from(groupedMessages.entries()).map(([date, dateMessages]) => (
                <div key={date}>
                    {/* Date Separator */}
                    <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs text-muted-foreground">{date}</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* Messages for this date */}
                    {dateMessages.map((message) => (
                        <MessageBubble
                            key={message._id}
                            message={message}
                            isOwn={message.sender._id === currentUserId}
                        />
                    ))}
                </div>
            ))}

            {/* Scroll anchor */}
            <div ref={bottomRef} />
        </div>
    );
}
