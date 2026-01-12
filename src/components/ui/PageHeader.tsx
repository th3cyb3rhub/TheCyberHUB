"use client";

import React from 'react';

interface PageHeaderProps {
    badge?: {
        icon: React.ReactNode;
        text: string;
    };
    title: string;
    highlightedWord?: string;
    description?: string;
    children?: React.ReactNode;
    centered?: boolean;
}

export function PageHeader({
    badge,
    title,
    highlightedWord,
    description,
    children,
    centered = false,
}: PageHeaderProps) {
    const renderTitle = () => {
        if (!highlightedWord) {
            return <span>{title}</span>;
        }
        const parts = title.split(highlightedWord);
        if (parts.length === 1) {
            return <span>{title}</span>;
        }
        return (
            <>
                {parts[0]}
                <span className="gradient-text">{highlightedWord}</span>
                {parts[1]}
            </>
        );
    };

    return (
        <section className="relative pt-32 pb-16 px-4 sm:px-6">
            {/* Orange gradient glow background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className={`relative max-w-5xl mx-auto ${centered ? 'text-center' : ''}`}>
                {/* Badge */}
                {badge && (
                    <div className={`flex items-center gap-2 mb-6 ${centered ? 'justify-center' : ''}`}>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                            <span className="text-orange-500">{badge.icon}</span>
                            <span className="text-sm text-gray-400">{badge.text}</span>
                        </div>
                    </div>
                )}

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                    {renderTitle()}
                </h1>

                {/* Description */}
                {description && (
                    <p className={`text-lg text-gray-400 mb-8 ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
                        {description}
                    </p>
                )}

                {/* Children (CTAs, search, etc.) */}
                {children && <div className={centered ? '' : ''}>{children}</div>}
            </div>
        </section>
    );
}

export default PageHeader;
