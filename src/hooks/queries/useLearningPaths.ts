import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export function useLearningPaths(params?: { page?: number; search?: string }) {
    return useQuery({
        queryKey: ['learningPaths', params],
        queryFn: () => fetchApi(`/api/learning-paths?${new URLSearchParams(Object.entries(params || {}).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString()}`, { requireAuth: false }),
        staleTime: 5 * 60 * 1000,
    });
}

export function useLearningPath(slug: string) {
    return useQuery({
        queryKey: ['learningPath', slug],
        queryFn: () => fetchApi(`/api/learning-paths/${slug}`, { requireAuth: false }),
        enabled: !!slug,
        staleTime: 10 * 60 * 1000,
    });
}
