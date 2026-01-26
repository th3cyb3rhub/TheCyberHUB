/**
 * React Query Client Configuration
 * 
 * Configures the QueryClient with optimal settings for caching,
 * retries, and stale time management.
 * 
 * Requirements: 3.2, 3.6
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ============================================
// Query Client Configuration
// ============================================

/**
 * Create a new QueryClient with default options
 */
export const createQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            // Data is considered fresh for 5 minutes
            staleTime: 5 * 60 * 1000,
            // Keep unused data in cache for 30 minutes
            gcTime: 30 * 60 * 1000,
            // Retry failed requests up to 3 times
            retry: 3,
            // Exponential backoff for retries (1s, 2s, 4s)
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // Don't refetch on window focus (can be enabled per-query)
            refetchOnWindowFocus: false,
            // Don't refetch on reconnect by default
            refetchOnReconnect: 'always',
            // Network mode - always try to fetch
            networkMode: 'always',
        },
        mutations: {
            // Retry mutations once on failure
            retry: 1,
            // Network mode for mutations
            networkMode: 'always',
        },
    },
});

// ============================================
// Query Keys
// ============================================

/**
 * Centralized query keys for cache management
 */
export const queryKeys = {
    // Auth
    user: ['user'] as const,
    session: ['session'] as const,
    
    // Users
    users: {
        all: ['users'] as const,
        list: (params?: Record<string, unknown>) => ['users', 'list', params] as const,
        detail: (id: string) => ['users', 'detail', id] as const,
        profile: (username: string) => ['users', 'profile', username] as const,
    },
    
    // Challenges
    challenges: {
        all: ['challenges'] as const,
        list: (params?: Record<string, unknown>) => ['challenges', 'list', params] as const,
        detail: (id: string) => ['challenges', 'detail', id] as const,
        byCategory: (category: string) => ['challenges', 'category', category] as const,
    },
    
    // Events
    events: {
        all: ['events'] as const,
        list: (params?: Record<string, unknown>) => ['events', 'list', params] as const,
        detail: (id: string) => ['events', 'detail', id] as const,
        upcoming: ['events', 'upcoming'] as const,
    },
    
    // Mentorship
    mentors: {
        all: ['mentors'] as const,
        list: (params?: Record<string, unknown>) => ['mentors', 'list', params] as const,
        detail: (id: string) => ['mentors', 'detail', id] as const,
    },
    mentorships: {
        all: ['mentorships'] as const,
        list: (params?: Record<string, unknown>) => ['mentorships', 'list', params] as const,
        detail: (id: string) => ['mentorships', 'detail', id] as const,
        requests: ['mentorships', 'requests'] as const,
    },
    
    // Blogs
    blogs: {
        all: ['blogs'] as const,
        list: (params?: Record<string, unknown>) => ['blogs', 'list', params] as const,
        detail: (id: string) => ['blogs', 'detail', id] as const,
    },
    
    // Forums
    forums: {
        all: ['forums'] as const,
        list: (params?: Record<string, unknown>) => ['forums', 'list', params] as const,
        detail: (id: string) => ['forums', 'detail', id] as const,
        discussions: (forumId: string) => ['forums', forumId, 'discussions'] as const,
    },
    
    // Notifications
    notifications: {
        all: ['notifications'] as const,
        unread: ['notifications', 'unread'] as const,
        count: ['notifications', 'count'] as const,
    },
    
    // Search
    search: (query: string, type?: string) => ['search', query, type] as const,
};

// ============================================
// Stale Time Configurations
// ============================================

/**
 * Stale time configurations for different data types
 */
export const staleTimes = {
    // User data - relatively stable
    user: 5 * 60 * 1000, // 5 minutes
    
    // Lists - may change more frequently
    list: 2 * 60 * 1000, // 2 minutes
    
    // Detail pages - can be cached longer
    detail: 5 * 60 * 1000, // 5 minutes
    
    // Real-time data - short cache
    realtime: 30 * 1000, // 30 seconds
    
    // Static data - long cache
    static: 60 * 60 * 1000, // 1 hour
    
    // Notifications - check frequently
    notifications: 60 * 1000, // 1 minute
};

// ============================================
// Exports
// ============================================

export { QueryClientProvider };
