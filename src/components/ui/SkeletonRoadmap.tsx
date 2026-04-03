import React from 'react';
import { Skeleton } from './skeleton';

// Roadmap card skeleton
export const SkeletonRoadmapCard = () => (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4 mb-4">
            <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
        <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
    </div>
);

// Roadmaps grid skeleton
export const SkeletonRoadmapsGrid = () => (
    <div className="space-y-8">
        {/* Featured section */}
        <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <div className="grid md:grid-cols-2 gap-6">
                <SkeletonRoadmapCard />
                <SkeletonRoadmapCard />
            </div>
        </div>
        
        {/* All roadmaps */}
        <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonRoadmapCard key={i} />
                ))}
            </div>
        </div>
    </div>
);

export default SkeletonRoadmapsGrid;
