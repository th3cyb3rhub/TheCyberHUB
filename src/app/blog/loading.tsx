import { SkeletonBlogGrid } from '@/components/ui/skeleton';

export default function BlogLoading() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-16 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header skeleton */}
                <div className="text-center mb-12 space-y-4">
                    <div className="h-8 w-40 bg-white/5 rounded-full mx-auto animate-pulse" />
                    <div className="h-12 w-64 bg-white/5 rounded mx-auto animate-pulse" />
                    <div className="h-5 w-80 max-w-full bg-white/5 rounded mx-auto animate-pulse" />
                </div>

                {/* Search skeleton */}
                <div className="mb-8">
                    <div className="h-12 w-full max-w-md bg-white/5 rounded-xl animate-pulse" />
                </div>

                <SkeletonBlogGrid />
            </div>
        </div>
    );
}
