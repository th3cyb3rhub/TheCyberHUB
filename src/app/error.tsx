'use client'

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { captureException } from '@/lib/monitoring';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Global error:', error);
        
        // Send to monitoring service (Sentry)
        captureException(error, { digest: error.digest });
    }, [error]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-orange-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-lg w-full text-center">
                {/* Error Icon */}
                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>

                {/* Error Code */}
                <div className="text-6xl font-bold text-white/10 mb-4">500</div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Something went <span className="text-red-500">wrong</span>
                </h1>

                {/* Description */}
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    An unexpected error occurred while processing your request. 
                    Our team has been notified and is working on a fix.
                </p>

                {/* Error details in development */}
                {process.env.NODE_ENV === 'development' && error && (
                    <div className="mb-8 p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-left">
                        <div className="text-sm font-medium text-red-400 mb-2">Error Details:</div>
                        <code className="text-xs text-red-300 break-all block">
                            {error.message}
                        </code>
                        {error.digest && (
                            <div className="mt-2 text-xs text-gray-500">
                                Error ID: {error.digest}
                            </div>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </Link>
                </div>

                {/* Back link */}
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center gap-2 mt-8 text-gray-500 hover:text-gray-400 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go back to previous page
                </button>
            </div>
        </div>
    );
}
