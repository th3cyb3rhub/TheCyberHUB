import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export function useDailyChallenge() {
    return useQuery({
        queryKey: ['dailyChallenge'],
        queryFn: () => fetchApi('/api/daily-challenges/today'),
        staleTime: 10 * 60 * 1000,
    });
}

export function useSubmitDailyChallenge() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: Record<string, unknown>) => fetchApi('/api/daily-challenges/submit', { method: 'POST', body: JSON.stringify(data) }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['dailyChallenge'] });
            qc.invalidateQueries({ queryKey: ['streak'] });
        },
    });
}
