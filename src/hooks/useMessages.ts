'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { messageApi } from '@/lib/mentorship/api';
import type { Message, MessageContentType } from '@/lib/mentorship/types';

// ============ useMessages Hook ============

interface UseMessagesOptions {
    pollInterval?: number; // milliseconds, 0 to disable
}

interface UseMessagesReturn {
    messages: Message[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    unreadCount: number;
    refresh: () => Promise<void>;
    loadMore: () => Promise<void>;
    send: (content: string, contentType?: MessageContentType, codeLanguage?: string) => Promise<Message>;
    sendFile: (file: File) => Promise<Message>;
    markAsRead: () => Promise<void>;
}

export function useMessages(
    mentorshipId: string | null,
    options: UseMessagesOptions = {}
): UseMessagesReturn {
    const { pollInterval = 5000 } = options;
    const { token } = useAuth();

    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);

    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const fetchMessages = useCallback(async (pageNum = 1, append = false) => {
        if (!token || !mentorshipId) {
            setLoading(false);
            return;
        }

        if (pageNum === 1) {
            setLoading(true);
        }
        setError(null);

        try {
            const response = await messageApi.getMessages(mentorshipId, pageNum, 50);

            if (append) {
                setMessages((prev) => [...response.data, ...prev]);
            } else {
                setMessages(response.data);
            }

            setHasMore(response.pagination.page < response.pagination.pages);
            setPage(pageNum);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch messages';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [token, mentorshipId]);

    const fetchUnreadCount = useCallback(async () => {
        if (!token || !mentorshipId) return;

        try {
            const count = await messageApi.getUnreadCount(mentorshipId);
            setUnreadCount(count);
        } catch {
            // Silently fail for unread count
        }
    }, [token, mentorshipId]);

    // Initial fetch
    useEffect(() => {
        fetchMessages(1);
        fetchUnreadCount();
    }, [fetchMessages, fetchUnreadCount]);

    // Polling for new messages
    useEffect(() => {
        if (pollInterval <= 0 || !token || !mentorshipId) return;

        pollIntervalRef.current = setInterval(() => {
            fetchMessages(1);
            fetchUnreadCount();
        }, pollInterval);

        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        };
    }, [pollInterval, token, mentorshipId, fetchMessages, fetchUnreadCount]);

    const loadMore = useCallback(async () => {
        if (!hasMore || loading) return;
        await fetchMessages(page + 1, true);
    }, [fetchMessages, page, hasMore, loading]);

    const send = useCallback(async (
        content: string,
        contentType: MessageContentType = 'text',
        codeLanguage?: string
    ): Promise<Message> => {
        if (!token || !mentorshipId) throw new Error('Not authenticated');

        const message = await messageApi.send(mentorshipId, content, contentType, codeLanguage);
        setMessages((prev) => [...prev, message]);
        return message;
    }, [token, mentorshipId]);

    const sendFile = useCallback(async (file: File): Promise<Message> => {
        if (!token || !mentorshipId) throw new Error('Not authenticated');

        // Validate file size (10MB limit)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new Error('File size exceeds 10MB limit');
        }

        const message = await messageApi.sendFile(mentorshipId, file);
        setMessages((prev) => [...prev, message]);
        return message;
    }, [token, mentorshipId]);

    const markAsRead = useCallback(async () => {
        if (!token || !mentorshipId) return;

        await messageApi.markAsRead(mentorshipId);
        setUnreadCount(0);
        setMessages((prev) =>
            prev.map((m) => (m.isRead ? m : { ...m, isRead: true, readAt: new Date().toISOString() }))
        );
    }, [token, mentorshipId]);

    const refresh = useCallback(async () => {
        await fetchMessages(1);
        await fetchUnreadCount();
    }, [fetchMessages, fetchUnreadCount]);

    return {
        messages,
        loading,
        error,
        hasMore,
        unreadCount,
        refresh,
        loadMore,
        send,
        sendFile,
        markAsRead,
    };
}

// ============ Helper: Format message timestamp ============

export function formatMessageTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
}

// ============ Helper: Group messages by date ============

export function groupMessagesByDate(messages: Message[]): Map<string, Message[]> {
    const groups = new Map<string, Message[]>();

    messages.forEach((message) => {
        const date = new Date(message.createdAt).toLocaleDateString();
        const existing = groups.get(date) || [];
        groups.set(date, [...existing, message]);
    });

    return groups;
}
