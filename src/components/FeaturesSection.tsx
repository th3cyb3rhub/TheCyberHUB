"use client"

import React from 'react';
import Link from 'next/link';
import {
    Terminal,
    Flag,
    FileText,
    Users,
    Calendar,
    Code2,
    Map,
    BookOpen,
    ArrowRight,
    Sparkles
} from 'lucide-react';

const FeaturesSection = () => {
    const features = [
        {
            icon: <Terminal className="w-6 h-6" />,
            title: "Security Tools",
            description: "22+ tools including subdomain finder, JWT analyzer, hash cracker, and more.",
            href: "/tools",
            stats: "22+ tools",
            color: "orange"
        },
        {
            icon: <Flag className="w-6 h-6" />,
            title: "CTF Challenges",
            description: "Practice with real-world challenges across web, crypto, forensics, and pwn.",
            href: "/ctf",
            stats: "100+ challenges",
            color: "red"
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Cheatsheets",
            description: "Quick reference guides for Linux, networking, SQL injection, XSS, and more.",
            href: "/cheatsheets",
            stats: "8 categories",
            color: "blue"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Mentorship",
            description: "Connect with experienced security professionals to accelerate your growth.",
            href: "/mentorship",
            stats: "1-on-1 guidance",
            color: "green"
        },
        {
            icon: <Calendar className="w-6 h-6" />,
            title: "Events",
            description: "Join CTF competitions, workshops, and community meetups.",
            href: "/events",
            stats: "Live events",
            color: "purple"
        },
        {
            icon: <Code2 className="w-6 h-6" />,
            title: "Code Review",
            description: "Learn to spot vulnerabilities through secure code review exercises.",
            href: "/code-review",
            stats: "Hands-on",
            color: "yellow"
        },
        {
            icon: <Map className="w-6 h-6" />,
            title: "Roadmaps",
            description: "Structured learning paths from beginner to advanced security expert.",
            href: "/roadmaps",
            stats: "Career paths",
            color: "cyan"
        },
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: "Blog",
            description: "Articles, tutorials, and writeups from the community.",
            href: "/blog",
            stats: "Fresh content",
            color: "pink"
        }
    ];

    const colorClasses: Record<string, { bg: string; text: string; border: string; hover: string }> = {
        orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20", hover: "hover:border-orange-500/40" },
        red: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", hover: "hover:border-red-500/40" },
        blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", hover: "hover:border-blue-500/40" },
        green: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20", hover: "hover:border-green-500/40" },
        purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", hover: "hover:border-purple-500/40" },
        yellow: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20", hover: "hover:border-yellow-500/40" },
        cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", hover: "hover:border-cyan-500/40" },
        pink: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20", hover: "hover:border-pink-500/40" }
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full border border-white/10 bg-white/5">
                        <Sparkles className="w-4 h-4 text-orange-400" />
                        <span className="text-sm text-gray-400">Everything you need</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        One Platform, <span className="gradient-text">Endless Learning</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        From beginner to expert, we provide all the resources you need to master cybersecurity.
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, index) => {
                        const colors = colorClasses[feature.color];
                        return (
                            <Link
                                key={index}
                                href={feature.href}
                                className={`group p-5 rounded-xl border border-white/10 ${colors.hover} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300`}
                            >
                                <div className={`w-12 h-12 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                                    <span className={colors.text}>{feature.icon}</span>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-base font-semibold text-white group-hover:text-orange-400 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                                        {feature.stats}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {feature.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
