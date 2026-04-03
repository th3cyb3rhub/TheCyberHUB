// app/tools/page.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Search, Key, Globe, Terminal, ArrowRight, ArrowLeftRight, Hash, Wifi, Server, Wrench, Sparkles, Code, Database, Shield, Lock, Radio } from 'lucide-react';
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
    comingSoon?: boolean;
}

const ToolsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Keyboard shortcut: Ctrl+K to focus search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const input = document.querySelector<HTMLInputElement>('[data-tools-search]');
                input?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

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
            id: 'reverse-shell',
            name: 'Reverse Shell Generator',
            description: 'Generate reverse shell payloads for pentesting',
            status: 'available',
            href: '/tools/reverse-shell',
            icon: <Terminal className="w-5 h-5" />,
            popular: true
        },
        {
            id: 'xss-payloads',
            name: 'XSS Payloads',
            description: 'Collection of XSS payloads with encoder',
            status: 'available',
            href: '/tools/xss-payloads',
            icon: <Code className="w-5 h-5" />,
            popular: true
        },
        {
            id: 'sql-injection',
            name: 'SQL Injection Payloads',
            description: 'SQLi payloads for different databases',
            status: 'available',
            href: '/tools/sql-injection',
            icon: <Database className="w-5 h-5" />
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
            id: 'header-analyzer',
            name: 'Header Analyzer',
            description: 'Analyze HTTP security headers for misconfigurations',
            status: 'available',
            href: '/tools/header-analyzer',
            icon: <Terminal className="w-5 h-5" />
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
        {
            id: 'cors-tester',
            name: 'CORS Tester',
            description: 'Test CORS misconfigurations on web applications',
            status: 'available',
            href: '/tools/cors-tester',
            icon: <Globe className="w-5 h-5" />
        },
        {
            id: 'ssl-checker',
            name: 'SSL/TLS Checker',
            description: 'Analyze SSL certificate security configuration',
            status: 'available',
            href: '/tools/ssl-checker',
            icon: <Lock className="w-5 h-5" />
        },
        {
            id: 'port-scanner',
            name: 'Port Scanner',
            description: 'Info about port scanning tools and techniques',
            status: 'available',
            href: '/tools/port-scanner',
            icon: <Radio className="w-5 h-5" />
        },
        {
            id: 'cve-search',
            name: 'CVE Search',
            description: 'Search the CVE vulnerability database',
            status: 'available',
            href: '/tools/cve-search',
            icon: <Shield className="w-5 h-5" />
        },
        {
            id: 'exploit-db',
            name: 'Exploit-DB Search',
            description: 'Search exploits and proof-of-concept code',
            status: 'available',
            href: '/tools/exploit-db',
            icon: <Database className="w-5 h-5" />
        },
        {
            id: 'sub-takeover',
            name: 'Subdomain Takeover',
            description: 'Check for subdomain takeover vulnerabilities',
            status: 'available',
            href: '/tools/sub-takeover',
            icon: <Globe className="w-5 h-5" />
        },
        {
            id: 'ssrf-tester',
            name: 'SSRF Tester',
            description: 'Test for server-side request forgery vulnerabilities',
            status: 'available',
            href: '/tools/ssrf-tester',
            icon: <Shield className="w-5 h-5" />
        },
    ];

    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            tool.description.toLowerCase().includes(debouncedSearch.toLowerCase());
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
                            <span className="text-sm text-gray-400">{tools.filter(t => t.status === 'available').length} Free Tools</span>
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 animate-pulse-slow drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">Tools</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mb-8">
                        Free, open-source security tools for penetration testing and security research. No signup required.
                    </p>

                    {/* Search & Filter */}
                    <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                data-tools-search
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search tools... (Ctrl+K)"
                                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${selectedCategory === 'all'
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setSelectedCategory('popular')}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${selectedCategory === 'popular'
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTools.map((tool, index) => (
                        tool.status === 'coming-soon' ? (
                        <div
                            key={tool.id}
                            className={`group relative p-5 rounded-2xl border border-white/10 backdrop-blur-md bg-white/[0.02] cursor-not-allowed animate-fade-in-up animate-stagger-${index % 6 + 1}`}
                            style={{ opacity: 0, animationFillMode: 'forwards', filter: 'brightness(0.5)' }}
                        >
                            <div className="absolute -top-2 -right-2 z-10">
                                <div className="px-2.5 py-0.5 bg-gray-500/20 border border-gray-500/30 rounded-full">
                                    <span className="text-xs text-gray-400 font-medium">Coming Soon</span>
                                </div>
                            </div>
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-500">
                                    {tool.icon}
                                </div>
                            </div>
                            <h3 className="text-gray-400 font-semibold mb-2">
                                {tool.name}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {tool.description}
                            </p>
                        </div>
                        ) : (
                        <Link
                            key={tool.id}
                            href={tool.href}
                            className={`group relative p-5 rounded-2xl border border-white/10 backdrop-blur-md hover:border-orange-500/40 bg-white/[0.02] hover:bg-gradient-to-b hover:from-orange-500/10 hover:to-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20 card-hover animate-fade-in-up animate-stagger-${index % 6 + 1}`}
                            style={{ opacity: 0, animationFillMode: 'forwards' }}
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
                        )
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
