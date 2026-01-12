// sentry.client.config.ts
// DISABLED - Sentry client config temporarily disabled to debug localStorage issues
// This file configures the initialization of Sentry on the client.

// Commenting out all Sentry initialization
/*
import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
    Sentry.init({
        dsn: SENTRY_DSN,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        environment: process.env.NODE_ENV || 'development',
        enabled: process.env.NODE_ENV === 'production',
        integrations: [
            Sentry.replayIntegration({
                maskAllText: false,
                blockAllMedia: false,
            }),
            Sentry.browserTracingIntegration(),
        ],
        ignoreErrors: [
            "top.GLOBALS",
            /extensions\//i,
            /^chrome:\/\//i,
            /fb_xd_fragment/,
            "Network Error",
            "NetworkError",
            "Load failed",
            "Failed to fetch",
            "AbortError",
            "cancelled",
        ],
        beforeSend(event) {
            if (process.env.NODE_ENV !== 'production') {
                return null;
            }
            console.debug('Sentry event:', event.event_id);
            return event;
        },
    });
}
*/

export { };
