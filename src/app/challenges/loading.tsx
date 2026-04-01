import { Skeleton } from '@/components/ui/skeleton';

export default function ChallengesLoading() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-16 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header skeleton */}
                <div className="text-center mb-8 space-y-4">
                    <div className="h-8 w-32 bg-white/5 rounded-full mx-auto animate-pulse" />
                    <div className="h-12 w-64 bg-white/5 rounded mx-auto animate-pulse" />
                    <div className="h-5 w-80 max-w-full bg-white/5 rounded mx-auto animate-pulse" />
                </div>

                {/* Tabs skeleton */}
                <div className="flex justify-center gap-2 mb-8">
                    <Skeleton className="h-10 w-32 rounded-xl" />
                    <Skeleton className="h-10 w-32 rounded-xl" />
                </div>

                {/* Filters skeleton */}
                <div className="flex gap-3 mb-6">
                    <Skeleton className="flex-1 h-12 rounded-xl" />
                    <Skeleton className="h-12 w-36 rounded-xl" />
                    <Skeleton className="h-12 w-36 rounded-xl" />
                </div>

                {/* Grid skeleton */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <div className="flex items-start justify-between mb-3">
                                <Skeleton className="w-10 h-10 rounded-xl" />
                                <Skeleton className="w-16 h-6 rounded-full" />
                            </div>
                            <Skeleton className="h-5 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-4 w-2/3 mb-4" />
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
