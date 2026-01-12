"use client";

import React from 'react';

export function SessionCardSkeleton() {
    return (
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] animate-pulse">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div>
                    <div className="h-4 w-40 bg-white/10 rounded mb-2" />
                    <div className="h-3 w-24 bg-white/10 rounded" />
                </div>
                <div className="h-6 w-20 bg-white/10 rounded-full" />
            </div>

            {/* Time info */}
            <div className="flex items-center gap-4 mb-3">
                <div className="h-3 w-28 bg-white/10 rounded" />
                <div className="h-3 w-16 bg-white/10 rounded" />
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-white/10">
                <div className="h-8 w-24 bg-white/10 rounded" />
                <div className="h-8 w-20 bg-white/10 rounded" />
            </div>
        </div>
    );
}
