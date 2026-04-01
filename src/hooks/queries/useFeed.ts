import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export function useFeed(params?: { page?: number }) {
    return useQuery({
        queryKey: ['feed', params],
        queryFn: () => fetchApi(`/api/feed?${new URLSearchParams(Object.entries(params || {}).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString()}`),
        staleTime: 5 * 60 * 1000,
    });
}

export function useFeedInfinite() {
    return useInfiniteQuery({
        queryKey: ['feed', 'infinite'],
        queryFn: ({ pageParam = 1 }) => fetchApi(`/api/feed?page=${pageParam}`),
        getNextPageParam: (lastPage: { nextPage?: number }) => lastPage.nextPage ?? undefined,
        initialPageParam: 1,
        staleTime: 5 * 60 * 1000,
    });
}

export function useFeedPost(id: string) {
    return useQuery({
        queryKey: ['feedPost', id],
        queryFn: () => fetchApi(`/api/feed/${id}`),
        enabled: !!id,
        staleTime: 10 * 60 * 1000,
    });
}

export function useCreateFeedPost() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: Record<string, unknown>) => fetchApi('/api/feed', { method: 'POST', body: JSON.stringify(data) }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['feed'] }),
    });
}

export function useLikeFeedPost() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => fetchApi(`/api/feed/${id}/like`, { method: 'POST' }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['feed'] }),
    });
}

export function useCommentOnFeedPost() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => fetchApi(`/api/feed/${id}/comments`, { method: 'POST', body: JSON.stringify(data) }),
        onSuccess: (_data, variables) => {
            qc.invalidateQueries({ queryKey: ['feed'] });
            qc.invalidateQueries({ queryKey: ['feedPost', variables.id] });
        },
    });
}
