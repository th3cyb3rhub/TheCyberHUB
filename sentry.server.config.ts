// sentry.server.config.ts
// DISABLED - Sentry server config temporarily disabled to debug localStorage issues

/*
import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
    Sentry.init({
        dsn: SENTRY_DSN,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        environment: process.env.NODE_ENV || 'development',
        enabled: process.env.NODE_ENV === 'production',
        ignoreErrors: [
            "ECONNREFUSED",
            "ENOTFOUND",
            "ETIMEDOUT",
            "ECONNRESET",
        ],
        beforeSend(event) {
            if (process.env.NODE_ENV !== 'production') {
                return null;
            }
            return event;
        },
    });
}
*/

export { };
