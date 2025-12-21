import { Skeleton } from '@/components/ui/Skeleton';

export default function FeedsLoading() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-16 px-4 sm:px-6">
            <div className="max-w-2xl mx-auto">
                {/* Header skeleton */}
                <div className="text-center mb-8 space-y-4">
                    <div className="h-8 w-36 bg-white/5 rounded-full mx-auto animate-pulse" />
                    <div className="h-10 w-56 bg-white/5 rounded mx-auto animate-pulse" />
                    <div className="h-5 w-72 max-w-full bg-white/5 rounded mx-auto animate-pulse" />
                </div>

                {/* Create post skeleton */}
                <div className="mb-8 p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-start gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="flex-1 space-y-3">
                            <Skeleton className="h-16 w-full rounded" />
                            <div className="flex justify-between pt-3 border-t border-white/10">
                                <Skeleton className="h-8 w-8 rounded-lg" />
                                <Skeleton className="h-9 w-20 rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter tabs skeleton */}
                <div className="flex gap-2 mb-6">
                    <Skeleton className="h-10 w-24 rounded-lg" />
                    <Skeleton className="h-10 w-28 rounded-lg" />
                    <Skeleton className="h-10 w-28 rounded-lg" />
                </div>

                {/* Posts skeleton */}
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <div className="flex items-start gap-3 mb-4">
                                <Skeleton className="w-10 h-10 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                            <div className="space-y-2 mb-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-8 w-16" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
