import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export function useChallenges(params?: { page?: number; category?: string; difficulty?: string; search?: string }) {
    return useQuery({
        queryKey: ['challenges', params],
        queryFn: () => fetchApi(`/api/challenges?${new URLSearchParams(Object.entries(params || {}).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString()}`, { requireAuth: false }),
        staleTime: 5 * 60 * 1000,
    });
}

export function useChallenge(slug: string) {
    return useQuery({
        queryKey: ['challenge', slug],
        queryFn: () => fetchApi(`/api/challenges/${slug}`, { requireAuth: false }),
        enabled: !!slug,
        staleTime: 10 * 60 * 1000,
    });
}

export function useSubmitFlag() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, flag }: { id: string; flag: string }) => fetchApi(`/api/challenges/${id}/submit`, { method: 'POST', body: JSON.stringify({ flag }) }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['challenges'] });
            qc.invalidateQueries({ queryKey: ['leaderboard'] });
        },
    });
}

export function useUnlockHint() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => fetchApi(`/api/challenges/${id}/hint`, { method: 'POST' }),
        onSuccess: (_data, id) => qc.invalidateQueries({ queryKey: ['challenge', id] }),
    });
}
