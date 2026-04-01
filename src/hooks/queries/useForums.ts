import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export function useDiscussions(params?: { page?: number; category?: string; search?: string }) {
    return useQuery({
        queryKey: ['discussions', params],
        queryFn: () => fetchApi(`/api/forums/discussions?${new URLSearchParams(Object.entries(params || {}).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString()}`, { requireAuth: false }),
        staleTime: 5 * 60 * 1000,
    });
}

export function useDiscussion(id: string) {
    return useQuery({
        queryKey: ['discussion', id],
        queryFn: () => fetchApi(`/api/forums/discussions/${id}`, { requireAuth: false }),
        enabled: !!id,
        staleTime: 10 * 60 * 1000,
    });
}

export function useCreateDiscussion() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: Record<string, unknown>) => fetchApi('/api/forums/discussions', { method: 'POST', body: JSON.stringify(data) }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['discussions'] }),
    });
}

export function usePostReply() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ discussionId, data }: { discussionId: string; data: Record<string, unknown> }) => fetchApi(`/api/forums/discussions/${discussionId}/replies`, { method: 'POST', body: JSON.stringify(data) }),
        onSuccess: (_data, variables) => qc.invalidateQueries({ queryKey: ['discussion', variables.discussionId] }),
    });
}
