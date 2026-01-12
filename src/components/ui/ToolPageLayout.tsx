"use client"

import React from 'react';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ToolPageLayoutProps {
    title: string;
    description: string;
    icon: LucideIcon;
    badge?: string;
    tags?: { label: string; color: string }[];
    children: React.ReactNode;
}

const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({
    title,
    description,
    icon: Icon,
    badge = "Security Tool",
    tags,
    children
}) => {
    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative pt-32 pb-12 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/tools"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Tools
                    </Link>

                    <div className="text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5">
                            <Icon className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-400">{badge}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                            {title}
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
                            {description}
                        </p>

                        {/* Tags */}
                        {tags && tags.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-2">
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className={`px-3 py-1 text-sm rounded-full border ${tag.color}`}
                                    >
                                        {tag.label}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                {children}
            </section>
        </div>
    );
};

export default ToolPageLayout;
