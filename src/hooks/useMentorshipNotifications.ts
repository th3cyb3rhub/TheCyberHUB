"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { notificationApi } from '@/lib/mentorship/api';
import type { NotificationCounts } from '@/lib/mentorship/types';

const DEFAULT_COUNTS: NotificationCounts = {
    pendingRequests: 0,
    unreadMessages: 0,
    pendingFeedback: 0,
};

export function useMentorshipNotifications(pollInterval = 60000) {
    const { user, token } = useAuth();
    const [counts, setCounts] = useState<NotificationCounts>(DEFAULT_COUNTS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCounts = useCallback(async () => {
        if (!user || !token) {
            setCounts(DEFAULT_COUNTS);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await notificationApi.getCounts(token);
            setCounts(data);
        } catch (err) {
            console.error('Failed to fetch notification counts:', err);
            setError('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    }, [user, token]);

    useEffect(() => {
        fetchCounts();

        // Poll for updates
        if (user && pollInterval > 0) {
            const interval = setInterval(fetchCounts, pollInterval);
            return () => clearInterval(interval);
        }
    }, [fetchCounts, user, pollInterval]);

    const totalCount = counts.pendingRequests + counts.unreadMessages + counts.pendingFeedback;

    return {
        counts,
        totalCount,
        loading,
        error,
        refresh: fetchCounts,
    };
}
