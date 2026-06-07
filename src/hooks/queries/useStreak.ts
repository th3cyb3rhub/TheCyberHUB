import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export function useStreak() {
    return useQuery({
        queryKey: ['streak'],
        queryFn: () => fetchApi('/api/streak/me'),
        staleTime: 10 * 60 * 1000,
    });
}

export function useCheckin() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: () => fetchApi('/api/streak/checkin', { method: 'POST' }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['streak'] }),
    });
}
