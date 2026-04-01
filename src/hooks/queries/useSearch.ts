import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export function useSearch(params: { q: string; type?: string; page?: number }) {
    return useQuery({
        queryKey: ['search', params],
        queryFn: () => fetchApi(`/api/search?${new URLSearchParams(Object.entries(params).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString()}`, { requireAuth: false }),
        enabled: !!params.q && params.q.length >= 2,
        staleTime: 5 * 60 * 1000,
    });
}
