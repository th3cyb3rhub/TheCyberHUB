"use client";

import React from 'react';

export function MentorshipCardSkeleton() {
    return (
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] animate-pulse">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div className="flex-1">
                    <div className="h-4 w-32 bg-white/10 rounded mb-2" />
                    <div className="h-3 w-20 bg-white/10 rounded" />
                </div>
                <div className="h-6 w-16 bg-white/10 rounded-full" />
            </div>

            {/* Progress */}
            <div className="mb-4">
                <div className="flex justify-between mb-2">
                    <div className="h-3 w-24 bg-white/10 rounded" />
                    <div className="h-3 w-16 bg-white/10 rounded" />
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full" />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <div className="h-8 flex-1 bg-white/10 rounded" />
                <div className="h-8 flex-1 bg-white/10 rounded" />
                <div className="h-8 flex-1 bg-white/10 rounded" />
            </div>
        </div>
    );
}
