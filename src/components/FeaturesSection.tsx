// components/FeaturesSection.tsx
"use client"

import React from 'react';
import Link from 'next/link';
import { Wrench, FileText, Map, Users, ArrowUpRight } from 'lucide-react';

const FeaturesSection = () => {
    const features = [
        {
            icon: <Wrench className="w-5 h-5" />,
            title: "Security Tools",
            description: "Subdomain finder, SSL scanner, JWT analyzer, and more.",
            href: "/tools",
            gradient: "from-orange-500/20 to-orange-600/10"
        },
        {
            icon: <FileText className="w-5 h-5" />,
            title: "Cheatsheets",
            description: "Quick references for Linux, networking, and pentesting.",
            href: "/cheatsheets",
            gradient: "from-blue-500/20 to-blue-600/10"
        },
        {
            icon: <Map className="w-5 h-5" />,
            title: "Roadmaps",
            description: "Structured learning paths for your security journey.",
            href: "/roadmaps",
            gradient: "from-green-500/20 to-green-600/10"
        },
        {
            icon: <Users className="w-5 h-5" />,
            title: "Community",
            description: "Connect with security professionals and learners.",
            href: "https://discord.gg/d3gBSNrVKb",
            gradient: "from-purple-500/20 to-purple-600/10"
        }
    ];

    return (
        <section className="bg-black py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        Everything you need to <span className="gradient-text">level up</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Free resources, tools, and community support for your cybersecurity journey.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {features.map((feature, index) => (
                        <Link
                            key={index}
                            href={feature.href}
                            target={feature.href.startsWith('http') ? '_blank' : undefined}
                            rel={feature.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="group relative p-6 rounded-2xl border border-white/10 hover:border-orange-500/40 bg-white/[0.02] transition-all duration-300 card-hover overflow-hidden"
                        >
                            {/* Gradient background on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-300">
                                        {feature.icon}
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-orange-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                                </div>
                                <h3 className="text-white font-semibold mb-2 group-hover:text-orange-400 transition-colors">{feature.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">{feature.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
