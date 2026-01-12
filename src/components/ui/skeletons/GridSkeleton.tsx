"use client";

import React from 'react';
import { CardSkeleton } from './CardSkeleton';

interface GridSkeletonProps {
    count?: number;
    columns?: 2 | 3 | 4;
    showIcon?: boolean;
    showMeta?: boolean;
}

export function GridSkeleton({
    count = 6,
    columns = 3,
    showIcon = true,
    showMeta = true,
}: GridSkeletonProps) {
    const gridClasses = {
        2: 'grid sm:grid-cols-2 gap-4',
        3: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4',
        4: 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
    };

    return (
        <div className={gridClasses[columns]}>
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} showIcon={showIcon} showMeta={showMeta} />
            ))}
        </div>
    );
}

export default GridSkeleton;
