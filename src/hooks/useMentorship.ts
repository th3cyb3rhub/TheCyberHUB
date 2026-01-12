'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { mentorshipApi, requestApi } from '@/lib/mentorship/api';
import type {
    Mentorship,
    MentorshipRequest,
    MentorshipDashboardData,
} from '@/lib/mentorship/types';

// ============ useMentorships Hook ============

interface UseMentorshipsReturn {
    mentorships: Mentorship[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

export function useMentorships(): UseMentorshipsReturn {
    const { token } = useAuth();
    const [mentorships, setMentorships] = useState<Mentorship[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMentorships = useCallback(async () => {
        if (!token) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await mentorshipApi.getMyMentorships(token);
            setMentorships(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch mentorships';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchMentorships();
    }, [fetchMentorships]);

    return {
        mentorships,
        loading,
        error,
        refresh: fetchMentorships,
    };
}

// ============ useMentorship Hook ============

interface UseMentorshipReturn {
    mentorship: Mentorship | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    pause: (reason: string) => Promise<void>;
    resume: () => Promise<void>;
    complete: () => Promise<void>;
    extend: (months: number) => Promise<void>;
}

export function useMentorship(mentorshipId: string | null): UseMentorshipReturn {
    const { token } = useAuth();
    const [mentorship, setMentorship] = useState<Mentorship | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMentorship = useCallback(async () => {
        if (!token || !mentorshipId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await mentorshipApi.getById(mentorshipId, token);
            setMentorship(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch mentorship';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [token, mentorshipId]);

    useEffect(() => {
        fetchMentorship();
    }, [fetchMentorship]);

    const pause = useCallback(async (reason: string) => {
        if (!token || !mentorshipId) return;
        const updated = await mentorshipApi.pause(mentorshipId, reason, token);
        setMentorship(updated);
    }, [token, mentorshipId]);

    const resume = useCallback(async () => {
        if (!token || !mentorshipId) return;
        const updated = await mentorshipApi.resume(mentorshipId, token);
        setMentorship(updated);
    }, [token, mentorshipId]);

    const complete = useCallback(async () => {
        if (!token || !mentorshipId) return;
        const updated = await mentorshipApi.complete(mentorshipId, token);
        setMentorship(updated);
    }, [token, mentorshipId]);

    const extend = useCallback(async (months: number) => {
        if (!token || !mentorshipId) return;
        const updated = await mentorshipApi.extend(mentorshipId, months, token);
        setMentorship(updated);
    }, [token, mentorshipId]);

    return {
        mentorship,
        loading,
        error,
        refresh: fetchMentorship,
        pause,
        resume,
        complete,
        extend,
    };
}

// ============ useMentorshipRequests Hook ============

interface UseMentorshipRequestsReturn {
    requests: MentorshipRequest[];
    incomingRequests: MentorshipRequest[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    cancel: (requestId: string) => Promise<void>;
    accept: (requestId: string) => Promise<Mentorship>;
    decline: (requestId: string) => Promise<void>;
}

export function useMentorshipRequests(): UseMentorshipRequestsReturn {
    const { token } = useAuth();
    const [requests, setRequests] = useState<MentorshipRequest[]>([]);
    const [incomingRequests, setIncomingRequests] = useState<MentorshipRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRequests = useCallback(async () => {
        if (!token) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const [myRequests, incoming] = await Promise.all([
                requestApi.getMyRequests(token),
                requestApi.getIncoming(token).catch(() => []),
            ]);
            setRequests(myRequests);
            setIncomingRequests(incoming);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch requests';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const cancel = useCallback(async (requestId: string) => {
        if (!token) return;
        await requestApi.cancel(requestId, token);
        setRequests((prev) => prev.filter((r) => r._id !== requestId));
    }, [token]);

    const accept = useCallback(async (requestId: string): Promise<Mentorship> => {
        if (!token) throw new Error('Not authenticated');
        const mentorship = await requestApi.accept(requestId, token);
        setIncomingRequests((prev) => prev.filter((r) => r._id !== requestId));
        return mentorship;
    }, [token]);

    const decline = useCallback(async (requestId: string) => {
        if (!token) return;
        await requestApi.decline(requestId, token);
        setIncomingRequests((prev) => prev.filter((r) => r._id !== requestId));
    }, [token]);

    return {
        requests,
        incomingRequests,
        loading,
        error,
        refresh: fetchRequests,
        cancel,
        accept,
        decline,
    };
}

// ============ useMentorshipDashboard Hook ============

interface UseMentorshipDashboardReturn {
    data: MentorshipDashboardData | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

export function useMentorshipDashboard(): UseMentorshipDashboardReturn {
    const { token, user } = useAuth();
    const [data, setData] = useState<MentorshipDashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboard = useCallback(async () => {
        if (!token || !user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const [mentorships, myRequests, incoming] = await Promise.all([
                mentorshipApi.getMyMentorships(token),
                requestApi.getMyRequests(token),
                requestApi.getIncoming(token).catch(() => []),
            ]);

            setData({
                asMentor: mentorships.filter((m) => m.mentor._id === user.id),
                asMentee: mentorships.filter((m) => m.mentee._id === user.id),
                pendingRequests: myRequests.filter((r) => r.status === 'pending'),
                incomingRequests: incoming,
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch dashboard';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [token, user]);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    return {
        data,
        loading,
        error,
        refresh: fetchDashboard,
    };
}
