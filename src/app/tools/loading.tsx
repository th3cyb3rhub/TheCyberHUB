import { SkeletonToolsGrid } from '@/components/ui/skeleton';

export default function ToolsLoading() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-16 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header skeleton */}
                <div className="mb-8 space-y-4">
                    <div className="h-6 w-32 bg-white/5 rounded animate-pulse" />
                    <div className="h-12 w-64 bg-white/5 rounded animate-pulse" />
                    <div className="h-5 w-96 max-w-full bg-white/5 rounded animate-pulse" />
                </div>
                
                {/* Search skeleton */}
                <div className="flex gap-3 mb-8">
                    <div className="flex-1 h-12 bg-white/5 rounded-xl animate-pulse" />
                    <div className="h-12 w-20 bg-white/5 rounded-xl animate-pulse" />
                    <div className="h-12 w-24 bg-white/5 rounded-xl animate-pulse" />
                </div>

                <SkeletonToolsGrid />
            </div>
        </div>
    );
}
