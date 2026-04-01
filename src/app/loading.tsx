import { SkeletonPageHeader, SkeletonListItem, SkeletonStatsCard } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto space-y-8">
                <SkeletonPageHeader />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <SkeletonStatsCard key={i} />
                    ))}
                </div>
                <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <SkeletonListItem key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
