"use client";

import React from 'react';

interface NotificationBadgeProps {
    count: number;
    className?: string;
}

export function NotificationBadge({ count, className = '' }: NotificationBadgeProps) {
    if (count <= 0) return null;

    const displayCount = count > 99 ? '99+' : count.toString();

    return (
        <span
            className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full ${className}`}
        >
            {displayCount}
        </span>
    );
}
