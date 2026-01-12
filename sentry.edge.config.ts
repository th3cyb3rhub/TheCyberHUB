// sentry.edge.config.ts
// DISABLED - Sentry edge config temporarily disabled to debug localStorage issues

/*
import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
    Sentry.init({
        dsn: SENTRY_DSN,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        environment: process.env.NODE_ENV || 'development',
        enabled: process.env.NODE_ENV === 'production',
    });
}
*/

export { };
