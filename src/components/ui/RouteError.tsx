'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Log to Sentry if available
        if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
            import('@sentry/nextjs').then(Sentry => Sentry.captureException(error)).catch(() => {});
        }
    }, [error]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                    {process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred.'}
                </p>
                <div className="flex gap-3 justify-center">
                    <button onClick={reset} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
                        <RefreshCw className="w-4 h-4" /> Try Again
                    </button>
                    <Link href="/" className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg flex items-center gap-2 text-sm border border-white/10 transition-colors">
                        <Home className="w-4 h-4" /> Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
