import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto space-y-6">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-5 w-96" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
