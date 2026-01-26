'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function ToolError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Tool error:', error)
    }, [error])

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Error Icon */}
                <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>

                {/* Error Message */}
                <h2 className="text-2xl font-bold text-white mb-3">
                    Tool Error
                </h2>
                <p className="text-gray-400 mb-8">
                    {error.message || 'Something went wrong with this tool. Please try again.'}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                    <Link
                        href="/tools"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Back to Tools
                    </Link>
                </div>

                {/* Debug Info (only in development) */}
                {process.env.NODE_ENV === 'development' && error.digest && (
                    <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-lg text-left">
                        <p className="text-xs text-gray-500 font-mono">
                            Error ID: {error.digest}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
