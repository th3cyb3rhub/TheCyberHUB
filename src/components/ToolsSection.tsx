// components/ToolsSection.tsx
"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Shield, Key, Terminal, FileCode, Hash, Sparkles } from 'lucide-react';

const ToolsSection = () => {
    const tools = [
        { name: "Subdomain Finder", icon: <Globe className="w-4 h-4" />, href: "/tools/subfinder", hot: true },
        { name: "JWT Analyzer", icon: <Key className="w-4 h-4" />, href: "/tools/jwt-analyzer", hot: true },
        { name: "Encoder/Decoder", icon: <Terminal className="w-4 h-4" />, href: "/tools/encoder-decoder", hot: false },
        { name: "Hash Analyzer", icon: <Hash className="w-4 h-4" />, href: "/tools/hash-analyzer", hot: false },
        { name: "Header Analyzer", icon: <Shield className="w-4 h-4" />, href: "/tools/header-analyzer", hot: false },
        { name: "Password Gen", icon: <FileCode className="w-4 h-4" />, href: "/tools/password-generator", hot: false },
    ];

    return (
        <section className="bg-black py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold text-white">Popular Tools</h2>
                        <span className="px-2 py-0.5 text-xs font-medium bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/20">
                            {tools.length}+ tools
                        </span>
                    </div>
                    <Link 
                        href="/tools" 
                        className="group text-sm text-gray-400 hover:text-orange-500 flex items-center gap-1.5 transition-colors"
                    >
                        View all 
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {tools.map((tool, index) => (
                        <Link
                            key={index}
                            href={tool.href}
                            className="group relative flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 hover:border-orange-500/40 bg-white/[0.02] hover:bg-gradient-to-b hover:from-orange-500/5 hover:to-transparent transition-all duration-300"
                        >
                            {tool.hot && (
                                <div className="absolute -top-1.5 -right-1.5">
                                    <Sparkles className="w-3 h-3 text-orange-400" />
                                </div>
                            )}
                            <div className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-orange-500/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                <span className="text-gray-400 group-hover:text-orange-500 transition-colors">
                                    {tool.icon}
                                </span>
                            </div>
                            <span className="text-xs text-gray-400 group-hover:text-white transition-colors text-center leading-tight">
                                {tool.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ToolsSection;
