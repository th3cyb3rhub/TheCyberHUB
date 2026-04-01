"use client";

import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    actionHref,
    onAction,
}: EmptyStateProps) {
    return (
        <div className="text-center py-16">
            {/* Icon Container */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 dark:bg-white/5 flex items-center justify-center">
                <Icon className="w-12 h-12 text-gray-400 dark:text-gray-400" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>

            {/* Description */}
            {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">{description}</p>
            )}

            {/* Action */}
            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                >
                    {actionLabel}
                </Link>
            )}
            {actionLabel && onAction && !actionHref && (
                <button
                    onClick={onAction}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}

export default EmptyState;
