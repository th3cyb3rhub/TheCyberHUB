import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export function useLeaderboard(params?: { page?: number; limit?: number }) {
    return useQuery({
        queryKey: ['leaderboard', params],
        queryFn: () => fetchApi(`/api/leaderboard?${new URLSearchParams(Object.entries(params || {}).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString()}`, { requireAuth: false }),
        staleTime: 5 * 60 * 1000,
    });
}
