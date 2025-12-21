// Monitoring utilities for error tracking and performance
// Works with Sentry when installed and DSN is configured, otherwise no-ops safely
// To enable: npm install @sentry/nextjs && set NEXT_PUBLIC_SENTRY_DSN

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const isEnabled = !!dsn && process.env.NODE_ENV === 'production';

// Lazy-load Sentry to avoid errors when not installed
let Sentry: typeof import('@sentry/nextjs') | null = null;
if (isEnabled) {
    try {
        // Dynamic import for optional dependency
        Sentry = require('@sentry/nextjs');
    } catch {
        console.warn('[Monitoring] @sentry/nextjs not installed, error tracking disabled');
    }
}

/**
 * Capture an exception and send to Sentry
 */
export function captureException(error: Error, context?: Record<string, unknown>): void {
    if (isEnabled && Sentry) {
        Sentry.captureException(error, { extra: context });
    } else {
        console.error('[Monitoring] Exception:', error, context);
    }
}

/**
 * Capture a message/event
 */
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info'): void {
    if (isEnabled && Sentry) {
        Sentry.captureMessage(message, level);
    } else {
        console.log(`[Monitoring] ${level.toUpperCase()}: ${message}`);
    }
}

/**
 * Set user context for error tracking
 */
export function setUser(user: { id: string; email?: string; username?: string } | null): void {
    if (isEnabled && Sentry) {
        Sentry.setUser(user);
    }
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
    if (isEnabled && Sentry) {
        Sentry.addBreadcrumb(breadcrumb);
    }
}

/**
 * Start a performance transaction
 */
export function startTransaction(name: string, op: string): { finish: () => void } {
    if (isEnabled && Sentry) {
        const transaction = Sentry.startInactiveSpan({
            name,
            op,
        });
        return {
            finish: () => transaction?.end(),
        };
    }
    return { finish: () => {} };
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

export default {
    captureException,
    captureMessage,
    setUser,
    addBreadcrumb,
    startTransaction,
    withErrorTracking,
    trackAction,
    trackApiCall,
};
