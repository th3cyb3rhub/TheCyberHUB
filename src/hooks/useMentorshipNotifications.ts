"use client";

import { useState } from 'react';

/**
 * Mentorship Notifications Hook (In-Memory Stub)
 *
 * The legacy /api/mentorship/notifications/counts endpoint no longer exists.
 * This hook returns default zero counts in-memory so existing consumers
 * don't break. Once mentorship notifications are re-implemented through
 * the main /api/notifications system, this hook can be updated.
 */

interface NotificationCounts {
    pendingRequests: number;
    unreadMessages: number;
    pendingFeedback: number;
}

const DEFAULT_COUNTS: NotificationCounts = {
    pendingRequests: 0,
    unreadMessages: 0,
    pendingFeedback: 0,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useMentorshipNotifications(_pollInterval = 60000) {
    const [counts] = useState<NotificationCounts>(DEFAULT_COUNTS);

    return {
        counts,
        totalCount: 0,
        loading: false,
        error: null,
        refresh: () => Promise.resolve(),
    };
}
