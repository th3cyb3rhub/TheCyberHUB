// Monitoring utilities for error tracking and performance
// This is a lightweight wrapper that logs to console in development
// For production error tracking, configure Sentry separately via sentry.client.config.ts

/**
 * Capture an exception and log it
 */
export function captureException(error: Error, context?: Record<string, unknown>): void {
    if (process.env.NODE_ENV === 'development') {
        console.error('[Monitoring] Exception:', error, context);
    }
}

/**
 * Capture a message/event
 */
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info'): void {
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Monitoring] ${level.toUpperCase()}: ${message}`);
    }
}

/**
 * Set user context for error tracking
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setUser(_user: { id: string; email?: string; username?: string } | null): void {
    // No-op - Sentry handles this via sentry.client.config.ts
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(breadcrumb: {
    category?: string;
    message: string;
    level?: 'debug' | 'info' | 'warning' | 'error';
    data?: Record<string, unknown>;
}): void {
    if (process.env.NODE_ENV === 'development') {
        console.debug(`[Breadcrumb] ${breadcrumb.category}: ${breadcrumb.message}`, breadcrumb.data);
    }
}

/**
 * Start a performance transaction
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function startTransaction(_name: string, _op: string): { finish: () => void } {
    return { finish: () => { } };
}

/**
 * Wrap an async function with error tracking
 */
export async function withErrorTracking<T>(
    fn: () => Promise<T>,
    context?: string
): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        captureException(error as Error, { context });
        throw error;
    }
}

/**
 * Track a specific user action
 */
export function trackAction(action: string, data?: Record<string, unknown>): void {
    addBreadcrumb({
        category: 'user-action',
        message: action,
        level: 'info',
        data,
    });
}

/**
 * Track API call performance
 */
export function trackApiCall(endpoint: string, method: string, duration: number, status: number): void {
    addBreadcrumb({
        category: 'api',
        message: `${method} ${endpoint}`,
        level: status >= 400 ? 'error' : 'info',
        data: { duration, status },
    });
}

const monitoring = {
    captureException,
    captureMessage,
    setUser,
    addBreadcrumb,
    startTransaction,
    withErrorTracking,
    trackAction,
    trackApiCall,
};

export default monitoring;
