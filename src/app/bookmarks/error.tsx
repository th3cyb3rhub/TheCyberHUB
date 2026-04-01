'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-8">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
                <p className="text-white/60 max-w-md">
                    {error.message || 'An unexpected error occurred. Please try again.'}
                </p>
            </div>
            <button
                onClick={reset}
                className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
            >
                Try again
            </button>
        </div>
    )
}
