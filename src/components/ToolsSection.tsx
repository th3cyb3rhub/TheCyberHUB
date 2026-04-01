"use client"

import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Globe,
    Key,
    Terminal,
    Hash,
    Shield,
    FileCode,
    Search,
    Lock,
    Wifi,
    Bug,
    Database,
    Sparkles
} from 'lucide-react';

const ToolsSection = () => {
    const tools = [
        { name: "Subdomain Finder", icon: <Globe className="w-4 h-4" />, href: "/tools/subfinder", hot: true },
        { name: "JWT Analyzer", icon: <Key className="w-4 h-4" />, href: "/tools/jwt-analyzer", hot: true },
        { name: "Encoder/Decoder", icon: <Terminal className="w-4 h-4" />, href: "/tools/encoder-decoder" },
        { name: "Hash Analyzer", icon: <Hash className="w-4 h-4" />, href: "/tools/hash-analyzer" },
        { name: "Header Analyzer", icon: <Shield className="w-4 h-4" />, href: "/tools/header-analyzer" },
        { name: "Password Gen", icon: <Lock className="w-4 h-4" />, href: "/tools/password-generator" },
        { name: "DNS Lookup", icon: <Wifi className="w-4 h-4" />, href: "/tools/dns-lookup" },
        { name: "CVE Search", icon: <Bug className="w-4 h-4" />, href: "/tools/cve-search", hot: true },
        { name: "SQL Injection", icon: <Database className="w-4 h-4" />, href: "/tools/sql-injection" },
        { name: "XSS Payloads", icon: <FileCode className="w-4 h-4" />, href: "/tools/xss-payloads" },
        { name: "WHOIS Lookup", icon: <Search className="w-4 h-4" />, href: "/tools/whois-lookup" },
        { name: "SSL Checker", icon: <Shield className="w-4 h-4" />, href: "/tools/ssl-checker" },
    ];

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Popular Tools</h2>
                        <span className="px-2.5 py-1 text-xs font-medium bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/20">
                            22+ tools
                        </span>
                    </div>
                    <Link
                        href="/tools"
                        className="group text-sm text-gray-500 dark:text-gray-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors"
                    >
                        View all
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {tools.map((tool, index) => (
                        <Link
                            key={index}
                            href={tool.href}
                            className="group relative flex flex-col items-center gap-2.5 p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-orange-500/40 bg-white dark:bg-white/[0.02] hover:bg-gradient-to-b hover:from-orange-500/5 hover:to-transparent transition-all duration-300"
                        >
                            {tool.hot && (
                                <div className="absolute -top-1.5 -right-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                                </div>
                            )}
                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 group-hover:bg-orange-500/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                <span className="text-gray-500 dark:text-gray-400 group-hover:text-orange-400 transition-colors">
                                    {tool.icon}
                                </span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors text-center leading-tight">
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
