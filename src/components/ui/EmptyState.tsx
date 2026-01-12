"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from './button';

interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        href?: string;
        onClick?: () => void;
    };
}

export function EmptyState({
    icon,
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <div className="text-center py-16">
            {/* Icon Container */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                <span className="text-gray-600">{icon}</span>
            </div>

            {/* Title */}
            <p className="text-gray-400 mb-2">{title}</p>

            {/* Description */}
            {description && (
                <p className="text-sm text-gray-600 mb-4">{description}</p>
            )}

            {/* Action */}
            {action && (
                action.href ? (
                    <Link href={action.href}>
                        <Button variant="outline">{action.label}</Button>
                    </Link>
                ) : action.onClick ? (
                    <Button variant="outline" onClick={action.onClick}>
                        {action.label}
                    </Button>
                ) : null
            )}
        </div>
    );
}

export default EmptyState;
