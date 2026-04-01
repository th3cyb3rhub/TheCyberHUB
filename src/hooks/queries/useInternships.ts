import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export function useInternships(params?: { page?: number; search?: string }) {
    return useQuery({
        queryKey: ['internships', params],
        queryFn: () => fetchApi(`/api/internships?${new URLSearchParams(Object.entries(params || {}).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString()}`, { requireAuth: false }),
        staleTime: 5 * 60 * 1000,
    });
}

export function useInternship(id: string) {
    return useQuery({
        queryKey: ['internship', id],
        queryFn: () => fetchApi(`/api/internships/${id}`, { requireAuth: false }),
        enabled: !!id,
        staleTime: 10 * 60 * 1000,
    });
}

export function useApplyToInternship() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => fetchApi(`/api/internships/${id}/apply`, { method: 'POST', body: JSON.stringify(data) }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['internships'] }),
    });
}
