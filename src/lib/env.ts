/**
 * Typed, validated environment variables.
 * All NEXT_PUBLIC_* access should go through this module instead of
 * reading process.env directly — gives compile-time types and a
 * single place to add validation or defaults.
 */

const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] ?? defaultValue;
    if (value === undefined) {
        // Only throw on the server side where we can fail fast at startup.
        // On the client, Next.js bakes the values in at build time, so a
        // missing var means it was never set — warn but don't crash the UI.
        if (typeof window === 'undefined') {
            throw new Error(`Missing required environment variable: ${key}`);
        }
        console.warn(`[env] Missing environment variable: ${key}`);
        return '';
    }
    return value;
};

export const env = {
    // Core API URL — required; defaults to localhost for local dev
    apiUrl: getEnv('NEXT_PUBLIC_API_URL', 'http://localhost:5000'),

    // App base URL — used for canonical links, SEO, and OAuth redirects
    appUrl: getEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),

    // OAuth client IDs — optional (OAuth login disabled if not set)
    googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
    githubClientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? '',

    // Error tracking — optional (Sentry disabled if not set)
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',

    // Security tools API endpoints — optional (features disabled if not set)
    headerAnalyzerApiUrl: process.env.NEXT_PUBLIC_HEADER_ANALYZER_API_URL ?? '',
    subfinderApiUrl: process.env.NEXT_PUBLIC_SUBFINDER_API_URL ?? '',
    subTakeoverApiUrl: process.env.NEXT_PUBLIC_SUB_TAKEOVER_API_URL ?? '',
} as const;
