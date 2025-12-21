'use client'

import { useEffect } from 'react';
import Link from 'next/link';
import { CalendarX, RefreshCw, Home, ArrowLeft } from 'lucide-react';

export default function EventsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Events error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-black pt-20">
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                {/* Error Icon */}
                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20">
                    <CalendarX className="w-10 h-10 text-red-500" />
                </div>

                <h1 className="text-2xl font-bold text-white mb-4">
                    Events Unavailable
                </h1>

                <p className="text-gray-400 mb-8">
                    We couldn&apos;t load the events. Please check your connection 
                    and try again.
                </p>

                {process.env.NODE_ENV === 'development' && error && (
                    <div className="mb-8 p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-left">
                        <code className="text-xs text-red-300 break-all">
                            {error.message}
                        </code>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Retry
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </Link>
                </div>

                <Link
                    href="/events/calendar"
                    className="inline-flex items-center gap-2 mt-8 text-gray-500 hover:text-gray-400 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Try Calendar View
                </Link>
            </div>
        </div>
    );
}
