import { Skeleton } from '@/components/ui/skeleton';

export default function CheatsheetsLoading() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-16 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header skeleton */}
                <div className="text-center mb-12 space-y-4">
                    <div className="h-8 w-36 bg-white/5 rounded-full mx-auto animate-pulse" />
                    <div className="h-12 w-72 bg-white/5 rounded mx-auto animate-pulse" />
                    <div className="h-5 w-96 max-w-full bg-white/5 rounded mx-auto animate-pulse" />
                </div>

                {/* Search skeleton */}
                <div className="mb-8">
                    <Skeleton className="h-12 w-full max-w-md mx-auto rounded-xl" />
                </div>

                {/* Grid skeleton */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <div className="flex items-start gap-4 mb-4">
                                <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-16 rounded-full" />
                                <Skeleton className="h-5 w-20 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
