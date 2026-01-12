"use client";

import React from 'react';

export function MentorCardSkeleton() {
    return (
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] animate-pulse">
            {/* Avatar */}
            <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-white/10" />
                <div className="flex-1">
                    <div className="h-4 w-24 bg-white/10 rounded mb-2" />
                    <div className="h-3 w-16 bg-white/10 rounded" />
                </div>
            </div>

            {/* Expertise badges */}
            <div className="flex gap-2 mb-3">
                <div className="h-6 w-20 bg-white/10 rounded-full" />
                <div className="h-6 w-16 bg-white/10 rounded-full" />
                <div className="h-6 w-12 bg-white/10 rounded-full" />
            </div>

            {/* Bio */}
            <div className="space-y-2 mb-4">
                <div className="h-3 w-full bg-white/10 rounded" />
                <div className="h-3 w-3/4 bg-white/10 rounded" />
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="h-4 w-16 bg-white/10 rounded" />
                <div className="h-4 w-20 bg-white/10 rounded" />
            </div>
        </div>
    );
}
