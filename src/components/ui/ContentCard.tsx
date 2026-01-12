"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ContentCardProps {
    href?: string;
    icon?: React.ReactNode;
    title: string;
    description?: string;
    meta?: React.ReactNode;
    badge?: React.ReactNode;
    gradient?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

export function ContentCard({
    href,
    icon,
    title,
    description,
    meta,
    badge,
    gradient,
    children,
    onClick,
}: ContentCardProps) {
    const cardContent = (
        <>
            {/* Gradient background on hover */}
            {gradient && (
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            )}

            <div className="relative z-10">
                {/* Badge */}
                {badge && (
                    <div className="absolute -top-2 -right-2">
                        {badge}
                    </div>
                )}

                {/* Icon and Arrow */}
                <div className="flex items-start justify-between mb-4">
                    {icon && (
                        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-300">
                            {icon}
                        </div>
                    )}
                    {href && (
                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                    )}
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                    {title}
                </h3>

                {/* Description */}
                {description && (
                    <p className="text-sm text-gray-500 leading-relaxed mb-3 group-hover:text-gray-400 transition-colors">
                        {description}
                    </p>
                )}

                {/* Meta */}
                {meta && <div className="mt-auto">{meta}</div>}

                {/* Children */}
                {children}
            </div>
        </>
    );

    const baseClasses = "group relative p-5 rounded-2xl border border-white/10 hover:border-orange-500/40 bg-white/[0.02] transition-all duration-300 card-hover overflow-hidden";

    if (href) {
        return (
            <Link href={href} className={`block ${baseClasses}`}>
                {cardContent}
            </Link>
        );
    }

    if (onClick) {
        return (
            <button onClick={onClick} className={`text-left w-full ${baseClasses}`}>
                {cardContent}
            </button>
        );
    }

    return (
        <div className={baseClasses}>
            {cardContent}
        </div>
    );
}

export default ContentCard;
