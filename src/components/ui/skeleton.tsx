import React from 'react';

interface SkeletonProps {
    className?: string;
}

// Base skeleton with shimmer animation
export const Skeleton = ({ className = '' }: SkeletonProps) => (
    <div
        className={`animate-pulse bg-white/5 rounded skeleton-shimmer ${className}`}
    />
);

// Text line skeleton
export const SkeletonText = ({ lines = 1, className = '' }: { lines?: number; className?: string }) => (
    <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
                key={i}
                className={`h-4 ${i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'}`}
            />
        ))}
    </div>
);

// Avatar skeleton
export const SkeletonAvatar = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-16 h-16'
    };
    return <Skeleton className={`${sizes[size]} rounded-full`} />;
};

// Card skeleton for tools/blog posts
export const SkeletonCard = () => (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4">
            <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    </div>
);

// Tool card skeleton
export const SkeletonToolCard = () => (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start justify-between mb-4">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <Skeleton className="w-4 h-4 rounded" />
        </div>
        <Skeleton className="h-5 w-2/3 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-1" />
    </div>
);

// Blog card skeleton
export const SkeletonBlogCard = () => (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <Skeleton className="aspect-video w-full" />
        <div className="p-6 space-y-3">
            <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded" />
                <Skeleton className="h-5 w-20 rounded" />
            </div>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between pt-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
            </div>
        </div>
    </div>
);

// Stats card skeleton
export const SkeletonStatsCard = () => (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-3">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="w-4 h-4 rounded" />
        </div>
        <Skeleton className="h-8 w-16 mb-1" />
        <Skeleton className="h-4 w-24" />
    </div>
);

// Table row skeleton
export const SkeletonTableRow = () => (
    <div className="flex items-center gap-4 p-4 border-b border-white/5">
        <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
    </div>
);

// List item skeleton
export const SkeletonListItem = () => (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="w-4 h-4 rounded" />
    </div>
);

// Page header skeleton
export const SkeletonPageHeader = () => (
    <div className="space-y-4 mb-8">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-96 max-w-full" />
    </div>
);

// Dashboard skeleton
export const SkeletonDashboard = () => (
    <div className="space-y-8">
        <SkeletonPageHeader />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonStatsCard key={i} />
            ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonListItem key={i} />
                ))}
            </div>
            <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonListItem key={i} />
                ))}
            </div>
        </div>
    </div>
);

// Tools grid skeleton
export const SkeletonToolsGrid = () => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonToolCard key={i} />
        ))}
    </div>
);

// Blog grid skeleton
export const SkeletonBlogGrid = () => (
    <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlogCard key={i} />
        ))}
    </div>
);

// Job card skeleton
export const SkeletonJobCard = () => (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4 mb-4">
            <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
    </div>
);

// Jobs grid skeleton
export const SkeletonJobsGrid = () => (
    <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonJobCard key={i} />
        ))}
    </div>
);

// Employer dashboard skeleton
export const SkeletonEmployerDashboard = () => (
    <div className="space-y-8">
        <SkeletonPageHeader />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonStatsCard key={i} />
            ))}
        </div>
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonJobCard key={i} />
            ))}
        </div>
    </div>
);

// Forum list skeleton
export const SkeletonForumList = () => (
    <div className="space-y-4">
        <div className="flex gap-2 mb-6">
            <Skeleton className="h-10 w-24 rounded-xl" />
            <Skeleton className="h-10 w-28 rounded-xl" />
            <Skeleton className="h-10 w-20 rounded-xl" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-start gap-3">
                    <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-4/5" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/5" />
                        <div className="flex gap-4 pt-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-14" />
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// Leaderboard skeleton
export const SkeletonLeaderboard = () => (
    <div className="space-y-6">
        <SkeletonPageHeader />
        <div className="grid grid-cols-3 gap-4 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] text-center">
                    <Skeleton className="w-16 h-16 rounded-full mx-auto mb-3" />
                    <Skeleton className="h-5 w-24 mx-auto mb-2" />
                    <Skeleton className="h-4 w-16 mx-auto" />
                </div>
            ))}
        </div>
        <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonTableRow key={i} />
            ))}
        </div>
    </div>
);

// Profile page skeleton
export const SkeletonProfilePage = () => (
    <div className="space-y-8">
        <div className="flex items-center gap-6">
            <Skeleton className="w-24 h-24 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-3">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-64" />
            </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonStatsCard key={i} />
            ))}
        </div>
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonListItem key={i} />
            ))}
        </div>
    </div>
);

// Internship list skeleton
export const SkeletonInternshipList = () => (
    <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-start justify-between mb-3">
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex gap-3 mt-4">
                    <Skeleton className="h-8 w-24 rounded-lg" />
                    <Skeleton className="h-8 w-28 rounded-lg" />
                </div>
            </div>
        ))}
    </div>
);

export default Skeleton;
