// sentry.client.config.ts
// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

// Only initialize if DSN is provided
if (SENTRY_DSN) {
    Sentry.init({
        dsn: SENTRY_DSN,

        // Performance Monitoring
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

        // Session Replay
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,

        // Environment
        environment: process.env.NODE_ENV || 'development',

        // Only enable in production
        enabled: process.env.NODE_ENV === 'production',

        // Integrations
        integrations: [
            Sentry.replayIntegration({
                maskAllText: false,
                blockAllMedia: false,
            }),
            Sentry.browserTracingIntegration(),
        ],

        // Filter out common noise
        ignoreErrors: [
            // Random plugins/extensions
            "top.GLOBALS",
            // Chrome extensions
            /extensions\//i,
            /^chrome:\/\//i,
            // Facebook borked
            /fb_xd_fragment/,
            // Common network errors
            "Network Error",
            "NetworkError",
            "Load failed",
            "Failed to fetch",
            // Cancelled requests
            "AbortError",
            "cancelled",
        ],

        // Before sending event
        beforeSend(event) {
            // Filter out development errors
            if (process.env.NODE_ENV !== 'production') {
                return null;
            }

            // Log what we're sending (helpful for debugging)
            console.debug('Sentry event:', event.event_id);

            return event;
        },
    });
}
