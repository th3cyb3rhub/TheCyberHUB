import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export function useJobs(params?: { page?: number; category?: string; type?: string; location?: string; search?: string }) {
    return useQuery({
        queryKey: ['jobs', params],
        queryFn: () => fetchApi(`/api/jobs?${new URLSearchParams(Object.entries(params || {}).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString()}`, { requireAuth: false }),
        staleTime: 5 * 60 * 1000,
    });
}

export function useJob(slug: string) {
    return useQuery({
        queryKey: ['job', slug],
        queryFn: () => fetchApi(`/api/jobs/${slug}`, { requireAuth: false }),
        enabled: !!slug,
        staleTime: 10 * 60 * 1000,
    });
}

export function useEmployerJobs() {
    return useQuery({
        queryKey: ['jobs', 'employer'],
        queryFn: () => fetchApi('/api/jobs/employer'),
        staleTime: 5 * 60 * 1000,
    });
}

export function useApplyToJob() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => fetchApi(`/api/jobs/${id}/apply`, { method: 'POST', body: JSON.stringify(data) }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs'] }),
    });
}

export function useCreateJob() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: Record<string, unknown>) => fetchApi('/api/jobs', { method: 'POST', body: JSON.stringify(data) }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs'] }),
    });
}
