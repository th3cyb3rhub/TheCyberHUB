'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { sessionApi } from '@/lib/mentorship/api';
import type { Session, SessionFormData } from '@/lib/mentorship/types';

// ============ useSessions Hook ============

interface UseSessionsReturn {
    sessions: Session[];
    upcoming: Session[];
    past: Session[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    create: (data: SessionFormData) => Promise<Session>;
    reschedule: (sessionId: string, scheduledAt: string) => Promise<void>;
    cancel: (sessionId: string, reason: string) => Promise<void>;
    complete: (sessionId: string, notes: string, actualDuration?: number) => Promise<void>;
}

export function useSessions(mentorshipId: string | null): UseSessionsReturn {
    const { token } = useAuth();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSessions = useCallback(async () => {
        if (!token || !mentorshipId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await sessionApi.getByMentorship(mentorshipId);
            setSessions(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch sessions';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [token, mentorshipId]);

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    const now = new Date();
    const upcoming = sessions.filter(
        (s) => s.status === 'scheduled' && new Date(s.scheduledAt) > now
    );
    const past = sessions.filter(
        (s) => s.status !== 'scheduled' || new Date(s.scheduledAt) <= now
    );

    const create = useCallback(async (data: SessionFormData): Promise<Session> => {
        if (!token) throw new Error('Not authenticated');
        const session = await sessionApi.create(data);
        setSessions((prev) => [...prev, session]);
        return session;
    }, [token]);

    const reschedule = useCallback(async (sessionId: string, scheduledAt: string) => {
        if (!token) return;
        const updated = await sessionApi.reschedule(sessionId, scheduledAt);
        setSessions((prev) => prev.map((s) => (s._id === sessionId ? updated : s)));
    }, [token]);

    const cancel = useCallback(async (sessionId: string, reason: string) => {
        if (!token) return;
        const updated = await sessionApi.cancel(sessionId, reason);
        setSessions((prev) => prev.map((s) => (s._id === sessionId ? updated : s)));
    }, [token]);

    const complete = useCallback(async (sessionId: string, notes: string, actualDuration?: number) => {
        if (!token) return;
        const updated = await sessionApi.complete(sessionId, notes, actualDuration);
        setSessions((prev) => prev.map((s) => (s._id === sessionId ? updated : s)));
    }, [token]);

    return {
        sessions,
        upcoming,
        past,
        loading,
        error,
        refresh: fetchSessions,
        create,
        reschedule,
        cancel,
        complete,
    };
}

// ============ useUpcomingSessions Hook ============

interface UseUpcomingSessionsReturn {
    sessions: Session[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

export function useUpcomingSessions(): UseUpcomingSessionsReturn {
    const { token } = useAuth();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSessions = useCallback(async () => {
        if (!token) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await sessionApi.getUpcoming();
            setSessions(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch upcoming sessions';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    return {
        sessions,
        loading,
        error,
        refresh: fetchSessions,
    };
}

// ============ useSession Hook ============

interface UseSessionReturn {
    session: Session | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    addNotes: (notes: string) => Promise<void>;
}

export function useSession(sessionId: string | null): UseSessionReturn {
    const { token } = useAuth();
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSession = useCallback(async () => {
        if (!token || !sessionId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await sessionApi.getById(sessionId);
            setSession(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch session';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [token, sessionId]);

    useEffect(() => {
        fetchSession();
    }, [fetchSession]);

    const addNotes = useCallback(async (notes: string) => {
        if (!token || !sessionId) return;
        const updated = await sessionApi.addNotes(sessionId, notes);
        setSession(updated);
    }, [token, sessionId]);

    return {
        session,
        loading,
        error,
        refresh: fetchSession,
        addNotes,
    };
}

// ============ Helper: Check if session is upcoming soon (within 24 hours) ============

export function isUpcomingSoon(session: Session): boolean {
    const scheduledAt = new Date(session.scheduledAt);
    const now = new Date();
    const hoursUntil = (scheduledAt.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntil > 0 && hoursUntil <= 24;
}
