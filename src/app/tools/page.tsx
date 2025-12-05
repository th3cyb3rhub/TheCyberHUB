// app/tools/page.tsx
"use client"

import React, { useState } from 'react';
import { Search, Key, Globe, Terminal, ArrowRight, ArrowLeftRight, Hash, Wifi, Server, Wrench, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface Tool {
    id: string;
    name: string;
    description: string;
    status: 'available' | 'coming-soon';
    href: string;
    icon: React.ReactNode;
    popular?: boolean;
}

const ToolsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const tools: Tool[] = [
        {
            id: 'google-dork',
            name: 'Google Dork',
            description: 'Advanced Google search operators for security testing',
            status: 'available',
            href: '/tools/google-dork',
            icon: <Search className="w-5 h-5" />,
            popular: true
        },
        {
            id: 'jwt-analyzer',
            name: 'JWT Analyzer',
            description: 'Decode and analyze JWT tokens for security issues',
            status: 'available',
            href: '/tools/jwt-analyzer',
            icon: <Key className="w-5 h-5" />,
            popular: true
        },
        {
            id: 'subfinder',
            name: 'Subdomain Finder',
            description: 'Discover subdomains using Certificate Transparency',
            status: 'available',
            href: '/tools/subfinder',
            icon: <Globe className="w-5 h-5" />,
            popular: true
        },
        {
            id: 'encoder-decoder',
            name: 'Encoder/Decoder',
            description: 'Base64, URL, HTML encoding and decoding',
            status: 'available',
            href: '/tools/encoder-decoder',
            icon: <ArrowLeftRight className="w-5 h-5" />
        },
        {
            id: 'text-diff',
            name: 'Text Diff',
            description: 'Compare two texts and find differences',
            status: 'available',
            href: '/tools/text-diff',
            icon: <Terminal className="w-5 h-5" />
        },
        {
            id: 'header-analyzer',
            name: 'Header Analyzer',
            description: 'Analyze HTTP security headers',
            status: 'available',
            href: '/tools/header-analyzer',
            icon: <Terminal className="w-5 h-5" />
        },
        {
            id: 'password-generator',
            name: 'Password Generator',
            description: 'Generate cryptographically secure passwords',
            status: 'available',
            href: '/tools/password-generator',
            icon: <Key className="w-5 h-5" />
        },
        {
            id: 'hash-analyzer',
            name: 'Hash Analyzer',
            description: 'Identify hash types and analyze security',
            status: 'available',
            href: '/tools/hash-analyzer',
            icon: <Hash className="w-5 h-5" />
        },
        {
            id: 'ip-lookup',
            name: 'IP Lookup',
            description: 'Get geolocation and network info for any IP',
            status: 'available',
            href: '/tools/ip-lookup',
            icon: <Wifi className="w-5 h-5" />
        },
        {
            id: 'whois-lookup',
            name: 'WHOIS Lookup',
            description: 'Get domain registration and ownership info',
            status: 'available',
            href: '/tools/whois-lookup',
            icon: <Globe className="w-5 h-5" />
        },
        {
            id: 'dns-lookup',
            name: 'DNS Lookup',
            description: 'Query DNS records - A, AAAA, MX, NS, TXT',
            status: 'available',
            href: '/tools/dns-lookup',
            icon: <Server className="w-5 h-5" />
        },
    ];

    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || 
            (selectedCategory === 'popular' && tool.popular);
        return matchesSearch && matchesCategory;
    });

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
                            <Wrench className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-400">{tools.length} Free Tools</span>
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Security <span className="gradient-text">Tools</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mb-8">
                        Free, open-source security tools for penetration testing and security research. No signup required.
                    </p>

                    {/* Search & Filter */}
                    <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search tools..."
                                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                    selectedCategory === 'all' 
                                        ? 'bg-orange-500 text-white' 
                                        : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                                }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setSelectedCategory('popular')}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                                    selectedCategory === 'popular' 
                                        ? 'bg-orange-500 text-white' 
                                        : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                                }`}
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                Popular
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTools.map((tool, index) => (
                        <Link
                            key={tool.id}
                            href={tool.href}
                            className="group relative p-5 rounded-2xl border border-white/10 hover:border-orange-500/40 bg-white/[0.02] hover:bg-gradient-to-b hover:from-orange-500/5 hover:to-transparent transition-all duration-300 card-hover"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {tool.popular && (
                                <div className="absolute -top-2 -right-2">
                                    <div className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 rounded-full">
                                        <Sparkles className="w-3 h-3 text-orange-400" />
                                    </div>
                                </div>
                            )}
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-300">
                                    {tool.icon}
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                            </div>
                            <h3 className="text-white font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                                {tool.name}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                                {tool.description}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* No results */}
                {filteredTools.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                            <Search className="w-8 h-8 text-gray-600" />
                        </div>
                        <p className="text-gray-400 mb-2">No tools found</p>
                        <p className="text-sm text-gray-600">Try adjusting your search or filter</p>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default ToolsPage;