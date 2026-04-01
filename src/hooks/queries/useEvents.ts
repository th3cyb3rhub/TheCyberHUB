import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export function useEvents(params?: { page?: number; category?: string; search?: string }) {
    return useQuery({
        queryKey: ['events', params],
        queryFn: () => fetchApi(`/api/events?${new URLSearchParams(Object.entries(params || {}).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString()}`, { requireAuth: false }),
        staleTime: 5 * 60 * 1000,
    });
}

export function useEvent(slug: string) {
    return useQuery({
        queryKey: ['event', slug],
        queryFn: () => fetchApi(`/api/events/${slug}`, { requireAuth: false }),
        enabled: !!slug,
        staleTime: 10 * 60 * 1000,
    });
}

export function useUpcomingEvents() {
    return useQuery({
        queryKey: ['events', 'upcoming'],
        queryFn: () => fetchApi('/api/events/upcoming', { requireAuth: false }),
        staleTime: 5 * 60 * 1000,
    });
}

export function useRegisterForEvent() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => fetchApi(`/api/events/${id}/register`, { method: 'POST' }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
    });
}
