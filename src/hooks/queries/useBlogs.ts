import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export function useBlogs(params?: { page?: number; tag?: string; search?: string }) {
    return useQuery({
        queryKey: ['blogs', params],
        queryFn: () => fetchApi(`/api/blogs?${new URLSearchParams(Object.entries(params || {}).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString()}`, { requireAuth: false }),
        staleTime: 5 * 60 * 1000,
    });
}

export function useBlog(idOrSlug: string) {
    return useQuery({
        queryKey: ['blog', idOrSlug],
        queryFn: () => fetchApi(`/api/blogs/${idOrSlug}`, { requireAuth: false }),
        enabled: !!idOrSlug,
        staleTime: 10 * 60 * 1000,
    });
}

export function useCreateBlog() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: Record<string, unknown>) => fetchApi('/api/blogs', { method: 'POST', body: JSON.stringify(data) }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
    });
}

export function useUpdateBlog() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...data }: Record<string, unknown> & { id: string }) => fetchApi(`/api/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
        onSuccess: (_data, variables) => {
            qc.invalidateQueries({ queryKey: ['blogs'] });
            qc.invalidateQueries({ queryKey: ['blog', variables.id] });
        },
    });
}

export function useDeleteBlog() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => fetchApi(`/api/blogs/${id}`, { method: 'DELETE' }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
    });
}
