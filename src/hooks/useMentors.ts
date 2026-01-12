'use client';

import { useState, useEffect, useCallback } from 'react';
import { mentorApi } from '@/lib/mentorship/api';
import type { MentorProfile, MentorSearchParams, PaginatedResponse } from '@/lib/mentorship/types';

interface UseMentorsOptions {
    initialParams?: MentorSearchParams;
    autoFetch?: boolean;
}

interface UseMentorsReturn {
    mentors: MentorProfile[];
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    } | null;
    search: (params: MentorSearchParams) => Promise<void>;
    loadMore: () => Promise<void>;
    refresh: () => Promise<void>;
}

export function useMentors(options: UseMentorsOptions = {}): UseMentorsReturn {
    const { initialParams = {}, autoFetch = true } = options;

    const [mentors, setMentors] = useState<MentorProfile[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<UseMentorsReturn['pagination']>(null);
    const [currentParams, setCurrentParams] = useState<MentorSearchParams>(initialParams);

    const fetchMentors = useCallback(async (params: MentorSearchParams, append = false) => {
        setLoading(true);
        setError(null);

        try {
            const response: PaginatedResponse<MentorProfile> = await mentorApi.search(params);

            if (append) {
                setMentors((prev) => [...prev, ...response.data]);
            } else {
                setMentors(response.data);
            }

            setPagination(response.pagination);
            setCurrentParams(params);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch mentors';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    const search = useCallback(async (params: MentorSearchParams) => {
        await fetchMentors({ ...params, page: 1 });
    }, [fetchMentors]);

    const loadMore = useCallback(async () => {
        if (!pagination || pagination.page >= pagination.pages) return;

        await fetchMentors(
            { ...currentParams, page: pagination.page + 1 },
            true
        );
    }, [fetchMentors, currentParams, pagination]);

    const refresh = useCallback(async () => {
        await fetchMentors(currentParams);
    }, [fetchMentors, currentParams]);

    useEffect(() => {
        if (autoFetch) {
            fetchMentors(initialParams);
        }
    }, [autoFetch]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        mentors,
        loading,
        error,
        pagination,
        search,
        loadMore,
        refresh,
    };
}

interface UseMentorReturn {
    mentor: MentorProfile | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

export function useMentor(mentorId: string | null): UseMentorReturn {
    const [mentor, setMentor] = useState<MentorProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMentor = useCallback(async () => {
        if (!mentorId) return;

        setLoading(true);
        setError(null);

        try {
            const data = await mentorApi.getById(mentorId);
            setMentor(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch mentor';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [mentorId]);

    useEffect(() => {
        fetchMentor();
    }, [fetchMentor]);

    return {
        mentor,
        loading,
        error,
        refresh: fetchMentor,
    };
}

interface UseFeaturedMentorsReturn {
    mentors: MentorProfile[];
    loading: boolean;
    error: string | null;
}

export function useFeaturedMentors(limit = 6): UseFeaturedMentorsReturn {
    const [mentors, setMentors] = useState<MentorProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const data = await mentorApi.getFeatured(limit);
                setMentors(data);
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to fetch featured mentors';
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, [limit]);

    return { mentors, loading, error };
}
