"use client";

import React from 'react';

interface CardSkeletonProps {
    showIcon?: boolean;
    showMeta?: boolean;
    className?: string;
}

export function CardSkeleton({
    showIcon = true,
    showMeta = true,
    className = "",
}: CardSkeletonProps) {
    return (
        <div className={`p-5 rounded-2xl border border-white/10 bg-white/[0.02] ${className}`}>
            {/* Icon */}
            {showIcon && (
                <div className="w-12 h-12 rounded-xl bg-white/5 animate-pulse mb-4" />
            )}

            {/* Title */}
            <div className="h-5 w-3/4 bg-white/5 animate-pulse rounded mb-3" />

            {/* Description */}
            <div className="space-y-2 mb-3">
                <div className="h-3 w-full bg-white/5 animate-pulse rounded" />
                <div className="h-3 w-2/3 bg-white/5 animate-pulse rounded" />
            </div>

            {/* Meta */}
            {showMeta && (
                <div className="h-4 w-1/3 bg-white/5 animate-pulse rounded" />
            )}
        </div>
    );
}

export default CardSkeleton;
