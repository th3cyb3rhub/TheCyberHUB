"use client"

import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Search, Terminal, Database, ArrowRight, Network, FileText, Code } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface Cheatsheet {
    id: string;
    title: string;
    description: string;
    category: string;
    commandCount: number;
    href: string;
    icon: React.ReactNode;
    color: string;
}

const CheatsheetsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const cheatsheets: Cheatsheet[] = [
        {
            id: 'linux-commands',
            title: 'Linux Commands',
            description: 'Essential Linux commands for pentesting and system administration',
            category: 'Operating Systems',
            commandCount: 45,
            href: '/cheatsheets/linux-commands',
            icon: <Terminal className="w-5 h-5" />,
            color: 'from-green-500/20 to-green-600/10'
        },
        {
            id: 'networking',
            title: 'Networking',
            description: 'Essential networking commands for Linux administration',
            category: 'Network',
            commandCount: 50,
            href: '/cheatsheets/networking',
            icon: <Network className="w-5 h-5" />,
            color: 'from-blue-500/20 to-blue-600/10'
        },
        {
            id: 'sql-injection',
            title: 'SQL Injection',
            description: 'Common SQL injection payloads and bypass techniques',
            category: 'Web Security',
            commandCount: 28,
            href: '/cheatsheets/sql-injection',
            icon: <Database className="w-5 h-5" />,
            color: 'from-red-500/20 to-red-600/10'
        },
        {
            id: 'xss',
            title: 'XSS Payloads',
            description: 'Cross-site scripting payloads and filter bypasses',
            category: 'Web Security',
            commandCount: 35,
            href: '/cheatsheets/xss',
            icon: <Code className="w-5 h-5" />,
            color: 'from-yellow-500/20 to-yellow-600/10'
        },
        {
            id: 'reverse-shells',
            title: 'Reverse Shells',
            description: 'One-liners for various reverse shell connections',
            category: 'Exploitation',
            commandCount: 20,
            href: '/cheatsheets/reverse-shells',
            icon: <Terminal className="w-5 h-5" />,
            color: 'from-purple-500/20 to-purple-600/10'
        },
        {
            id: 'privilege-escalation',
            title: 'Privilege Escalation',
            description: 'Linux and Windows privilege escalation techniques',
            category: 'Post-Exploitation',
            commandCount: 40,
            href: '/cheatsheets/privesc',
            icon: <Terminal className="w-5 h-5" />,
            color: 'from-orange-500/20 to-orange-600/10'
        },
        {
            id: 'web-security',
            title: 'Web Security',
            description: 'Web application vulnerabilities and attack vectors',
            category: 'Web Security',
            commandCount: 50,
            href: '/cheatsheets/web-security',
            icon: <Code className="w-5 h-5" />,
            color: 'from-indigo-500/20 to-indigo-600/10'
        },
        {
            id: 'osint',
            title: 'OSINT',
            description: 'Open-source intelligence gathering techniques',
            category: 'Reconnaissance',
            commandCount: 45,
            href: '/cheatsheets/osint',
            icon: <FileText className="w-5 h-5" />,
            color: 'from-teal-500/20 to-teal-600/10'
        },
    ];

    const categories = ['all', ...Array.from(new Set(cheatsheets.map(s => s.category)))];

    const filteredCheatsheets = cheatsheets.filter(sheet => {
        const matchesSearch = sheet.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            sheet.description.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || sheet.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const groupedCheatsheets = filteredCheatsheets.reduce((acc, sheet) => {
        if (!acc[sheet.category]) acc[sheet.category] = [];
        acc[sheet.category].push(sheet);
        return acc;
    }, {} as Record<string, typeof cheatsheets>);

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                {/* Background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative max-w-5xl mx-auto">
                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                            <FileText className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-400">{cheatsheets.length} Cheatsheets</span>
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Security <span className="gradient-text">Cheatsheets</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mb-8">
                        Quick reference guides for common security tools, commands, and techniques.
                    </p>

                    {/* Search */}
                    <div className="relative max-w-md mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search cheatsheets..."
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-all"
                        />
                    </div>

                    {/* Category filters */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    selectedCategory === category
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
                                }`}
                            >
                                {category === 'all' ? 'All' : category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cheatsheets Grid */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
                {selectedCategory === 'all' ? (
                    // Grouped by category
                    Object.entries(groupedCheatsheets).map(([category, sheets]) => (
                        <div key={category} className="mb-12">
                            <h2 className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="w-8 h-px bg-orange-500/30" />
                                {category}
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {sheets.map((sheet, index) => (
                                    <Link
                                        key={sheet.id}
                                        href={sheet.href}
                                        className="group relative p-5 rounded-2xl border border-white/10 hover:border-orange-500/40 bg-white/[0.02] transition-all duration-300 card-hover overflow-hidden"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        {/* Gradient background on hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${sheet.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                        
                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-300">
                                                    {sheet.icon}
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                                            </div>
                                            <h3 className="text-white font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                                                {sheet.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 leading-relaxed mb-3 group-hover:text-gray-400 transition-colors">
                                                {sheet.description}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs px-2 py-1 bg-white/5 text-gray-500 rounded-md group-hover:bg-white/10 transition-colors">
                                                    {sheet.commandCount} commands
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    // Flat grid for single category
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCheatsheets.map((sheet, index) => (
                            <Link
                                key={sheet.id}
                                href={sheet.href}
                                className="group relative p-5 rounded-2xl border border-white/10 hover:border-orange-500/40 bg-white/[0.02] transition-all duration-300 card-hover overflow-hidden"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Gradient background on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${sheet.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-300">
                                            {sheet.icon}
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                                        {sheet.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-3 group-hover:text-gray-400 transition-colors">
                                        {sheet.description}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs px-2 py-1 bg-white/5 text-gray-500 rounded-md group-hover:bg-white/10 transition-colors">
                                            {sheet.commandCount} commands
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* No results */}
                {filteredCheatsheets.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                            <Search className="w-8 h-8 text-gray-600" />
                        </div>
                        <p className="text-gray-400 mb-2">No cheatsheets found</p>
                        <p className="text-sm text-gray-600">Try adjusting your search or filter</p>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default CheatsheetsPage;