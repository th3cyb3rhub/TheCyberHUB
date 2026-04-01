import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export function useBookmarks(params?: { page?: number; collection?: string }) {
    return useQuery({
        queryKey: ['bookmarks', params],
        queryFn: () => fetchApi(`/api/bookmarks?${new URLSearchParams(Object.entries(params || {}).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString()}`),
        staleTime: 5 * 60 * 1000,
    });
}

export function useBookmarkCollections() {
    return useQuery({
        queryKey: ['bookmarks', 'collections'],
        queryFn: () => fetchApi('/api/bookmarks/collections'),
        staleTime: 5 * 60 * 1000,
    });
}

export function useCreateBookmark() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: Record<string, unknown>) => fetchApi('/api/bookmarks', { method: 'POST', body: JSON.stringify(data) }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['bookmarks'] }),
    });
}

export function useDeleteBookmark() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => fetchApi(`/api/bookmarks/${id}`, { method: 'DELETE' }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['bookmarks'] }),
    });
}
