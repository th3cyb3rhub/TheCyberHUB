// sentry.edge.config.ts
// This file configures the initialization of Sentry for edge features (middleware, edge routes).
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

// Only initialize if DSN is provided
if (SENTRY_DSN) {
    Sentry.init({
        dsn: SENTRY_DSN,

        // Performance Monitoring
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

        // Environment
        environment: process.env.NODE_ENV || 'development',

        // Only enable in production
        enabled: process.env.NODE_ENV === 'production',
    });
}
