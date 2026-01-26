/**
 * Base API Hooks
 * 
 * Provides reusable hooks for API data fetching and mutations
 * using React Query with proper typing and error handling.
 * 
 * Requirements: 3.2, 3.3
 */

'use client';

import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryOptions,
    UseMutationOptions,
    QueryKey,
} from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { API_URL } from '@/lib/api';

// ============================================
// Types
// ============================================

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    requestId?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: ApiError;
    timestamp?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// ============================================
// API Fetcher
// ============================================

/**
 * Generic API fetcher with authentication
 */
export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string | null
): Promise<T> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.error?.message || 'API request failed') as Error & {
            code?: string;
            status?: number;
        };
        error.code = data.error?.code || 'UNKNOWN_ERROR';
        error.status = response.status;
        throw error;
    }

    return data;
}

// ============================================
// Query Hook
// ============================================

/**
 * Generic query hook for GET requests
 */
export function useApiQuery<T>(
    queryKey: QueryKey,
    endpoint: string,
    options?: Omit<UseQueryOptions<ApiResponse<T>, Error>, 'queryKey' | 'queryFn'>
) {
    const { token } = useAuth();

    return useQuery<ApiResponse<T>, Error>({
        queryKey,
        queryFn: () => apiFetch<ApiResponse<T>>(endpoint, {}, token),
        ...options,
    });
}

/**
 * Query hook that returns just the data (unwrapped)
 */
export function useApiData<T>(
    queryKey: QueryKey,
    endpoint: string,
    options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>
) {
    const { token } = useAuth();

    return useQuery<T, Error>({
        queryKey,
        queryFn: async () => {
            const response = await apiFetch<ApiResponse<T>>(endpoint, {}, token);
            if (!response.success || !response.data) {
                throw new Error('Failed to fetch data');
            }
            return response.data;
        },
        ...options,
    });
}

/**
 * Query hook for paginated data
 */
export function usePaginatedQuery<T>(
    queryKey: QueryKey,
    endpoint: string,
    options?: Omit<UseQueryOptions<PaginatedResponse<T>, Error>, 'queryKey' | 'queryFn'>
) {
    const { token } = useAuth();

    return useQuery<PaginatedResponse<T>, Error>({
        queryKey,
        queryFn: () => apiFetch<PaginatedResponse<T>>(endpoint, {}, token),
        ...options,
    });
}

// ============================================
// Mutation Hook
// ============================================

/**
 * Generic mutation hook for POST/PUT/DELETE requests
 */
export function useApiMutation<TData, TVariables>(
    mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
    options?: Omit<UseMutationOptions<ApiResponse<TData>, Error, TVariables>, 'mutationFn'>
) {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<TData>, Error, TVariables>({
        mutationFn,
        ...options,
        onSuccess: (data, variables, context) => {
            options?.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            options?.onError?.(error, variables, context);
        },
    });
}

/**
 * Mutation hook with automatic cache invalidation
 */
export function useApiMutationWithInvalidation<TData, TVariables>(
    mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
    invalidateKeys: QueryKey[],
    options?: Omit<UseMutationOptions<ApiResponse<TData>, Error, TVariables>, 'mutationFn'>
) {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<TData>, Error, TVariables>({
        mutationFn,
        ...options,
        onSuccess: (data, variables, context) => {
            // Invalidate specified query keys
            invalidateKeys.forEach((key) => {
                queryClient.invalidateQueries({ queryKey: key });
            });
            options?.onSuccess?.(data, variables, context);
        },
    });
}

// ============================================
// Convenience Hooks
// ============================================

/**
 * Hook for POST requests
 */
export function usePost<TData, TBody = Record<string, unknown>>(
    endpoint: string,
    invalidateKeys?: QueryKey[],
    options?: Omit<UseMutationOptions<ApiResponse<TData>, Error, TBody>, 'mutationFn'>
) {
    const { token } = useAuth();
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<TData>, Error, TBody>({
        mutationFn: (body) =>
            apiFetch<ApiResponse<TData>>(endpoint, {
                method: 'POST',
                body: JSON.stringify(body),
            }, token),
        ...options,
        onSuccess: (data, variables, context) => {
            if (invalidateKeys) {
                invalidateKeys.forEach((key) => {
                    queryClient.invalidateQueries({ queryKey: key });
                });
            }
            options?.onSuccess?.(data, variables, context);
        },
    });
}

/**
 * Hook for PUT requests
 */
export function usePut<TData, TBody = Record<string, unknown>>(
    endpoint: string,
    invalidateKeys?: QueryKey[],
    options?: Omit<UseMutationOptions<ApiResponse<TData>, Error, TBody>, 'mutationFn'>
) {
    const { token } = useAuth();
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<TData>, Error, TBody>({
        mutationFn: (body) =>
            apiFetch<ApiResponse<TData>>(endpoint, {
                method: 'PUT',
                body: JSON.stringify(body),
            }, token),
        ...options,
        onSuccess: (data, variables, context) => {
            if (invalidateKeys) {
                invalidateKeys.forEach((key) => {
                    queryClient.invalidateQueries({ queryKey: key });
                });
            }
            options?.onSuccess?.(data, variables, context);
        },
    });
}

/**
 * Hook for DELETE requests
 */
export function useDelete<TData>(
    endpoint: string,
    invalidateKeys?: QueryKey[],
    options?: Omit<UseMutationOptions<ApiResponse<TData>, Error, void>, 'mutationFn'>
) {
    const { token } = useAuth();
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<TData>, Error, void>({
        mutationFn: () =>
            apiFetch<ApiResponse<TData>>(endpoint, {
                method: 'DELETE',
            }, token),
        ...options,
        onSuccess: (data, variables, context) => {
            if (invalidateKeys) {
                invalidateKeys.forEach((key) => {
                    queryClient.invalidateQueries({ queryKey: key });
                });
            }
            options?.onSuccess?.(data, variables, context);
        },
    });
}

// ============================================
// Exports
// ============================================

export { useQueryClient };
