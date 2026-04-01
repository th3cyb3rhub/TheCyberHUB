"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal, Globe, Database, Code, Shield, Network, Key, Bug } from 'lucide-react';

const CheatsheetsSection = () => {
    const cheatsheets = [
        { name: "Linux Commands", icon: <Terminal className="w-5 h-5" />, href: "/cheatsheets/linux-commands", color: "text-green-400" },
        { name: "Networking", icon: <Network className="w-5 h-5" />, href: "/cheatsheets/networking", color: "text-blue-400" },
        { name: "SQL Injection", icon: <Database className="w-5 h-5" />, href: "/cheatsheets/sql-injection", color: "text-red-400" },
        { name: "XSS Attacks", icon: <Code className="w-5 h-5" />, href: "/cheatsheets/xss", color: "text-yellow-400" },
        { name: "Web Security", icon: <Globe className="w-5 h-5" />, href: "/cheatsheets/web-security", color: "text-purple-400" },
        { name: "Privilege Escalation", icon: <Key className="w-5 h-5" />, href: "/cheatsheets/privesc", color: "text-orange-400" },
        { name: "Reverse Shells", icon: <Shield className="w-5 h-5" />, href: "/cheatsheets/reverse-shells", color: "text-cyan-400" },
        { name: "OSINT", icon: <Bug className="w-5 h-5" />, href: "/cheatsheets/osint", color: "text-pink-400" },
    ];

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cheatsheets</h2>
                        <span className="px-2.5 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                            Quick reference
                        </span>
                    </div>
                    <Link
                        href="/cheatsheets"
                        className="group text-sm text-gray-500 dark:text-gray-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors"
                    >
                        View all
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                    {cheatsheets.map((sheet, index) => (
                        <Link
                            key={index}
                            href={sheet.href}
                            className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-white dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-all duration-300"
                        >
                            <span className={`${sheet.color} group-hover:scale-110 transition-transform`}>
                                {sheet.icon}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors text-center leading-tight">
                                {sheet.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CheatsheetsSection;
