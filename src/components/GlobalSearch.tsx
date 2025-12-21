"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    Search,
    Wrench,
    BookOpen,
    Map,
    FileText,
    Calendar,
    Code2,
    Command,
    Hash,
    Globe,
    Key,
    Terminal,
    Database,
    Lock,
    Radio,
    Shield,
    CornerDownLeft,
    Flag
} from 'lucide-react';

interface SearchItem {
    id: string;
    title: string;
    description: string;
    href: string;
    category: 'tool' | 'resource' | 'page';
    icon: React.ReactNode;
    keywords?: string[];
}

// All searchable items
const searchItems: SearchItem[] = [
    // Tools
    { id: 'google-dork', title: 'Google Dork', description: 'Advanced Google search operators', href: '/tools/google-dork', category: 'tool', icon: <Search className="w-4 h-4" />, keywords: ['search', 'recon', 'osint'] },
    { id: 'jwt-analyzer', title: 'JWT Analyzer', description: 'Decode and analyze JWT tokens', href: '/tools/jwt-analyzer', category: 'tool', icon: <Key className="w-4 h-4" />, keywords: ['token', 'auth', 'decode'] },
    { id: 'subfinder', title: 'Subdomain Finder', description: 'Discover subdomains via CT logs', href: '/tools/subfinder', category: 'tool', icon: <Globe className="w-4 h-4" />, keywords: ['subdomain', 'recon', 'enumeration'] },
    { id: 'encoder-decoder', title: 'Encoder/Decoder', description: 'Base64, URL, HTML encoding', href: '/tools/encoder-decoder', category: 'tool', icon: <Terminal className="w-4 h-4" />, keywords: ['encode', 'decode', 'base64', 'url'] },
    { id: 'hash-analyzer', title: 'Hash Analyzer', description: 'Identify and analyze hash types', href: '/tools/hash-analyzer', category: 'tool', icon: <Hash className="w-4 h-4" />, keywords: ['hash', 'md5', 'sha', 'crack'] },
    { id: 'password-generator', title: 'Password Generator', description: 'Generate secure passwords', href: '/tools/password-generator', category: 'tool', icon: <Key className="w-4 h-4" />, keywords: ['password', 'secure', 'random'] },
    { id: 'ip-lookup', title: 'IP Lookup', description: 'Get IP geolocation info', href: '/tools/ip-lookup', category: 'tool', icon: <Globe className="w-4 h-4" />, keywords: ['ip', 'geolocation', 'network'] },
    { id: 'whois-lookup', title: 'WHOIS Lookup', description: 'Domain registration info', href: '/tools/whois-lookup', category: 'tool', icon: <Globe className="w-4 h-4" />, keywords: ['whois', 'domain', 'registration'] },
    { id: 'dns-lookup', title: 'DNS Lookup', description: 'Query DNS records', href: '/tools/dns-lookup', category: 'tool', icon: <Globe className="w-4 h-4" />, keywords: ['dns', 'records', 'mx', 'txt'] },
    { id: 'header-analyzer', title: 'Header Analyzer', description: 'Analyze HTTP security headers', href: '/tools/header-analyzer', category: 'tool', icon: <Shield className="w-4 h-4" />, keywords: ['headers', 'http', 'security'] },
    { id: 'text-diff', title: 'Text Diff', description: 'Compare two texts', href: '/tools/text-diff', category: 'tool', icon: <FileText className="w-4 h-4" />, keywords: ['diff', 'compare', 'text'] },
    { id: 'reverse-shell', title: 'Reverse Shell Generator', description: 'Generate reverse shell payloads', href: '/tools/reverse-shell', category: 'tool', icon: <Terminal className="w-4 h-4" />, keywords: ['shell', 'payload', 'pentest'] },
    { id: 'xss-payloads', title: 'XSS Payloads', description: 'XSS payload collection', href: '/tools/xss-payloads', category: 'tool', icon: <Code2 className="w-4 h-4" />, keywords: ['xss', 'payload', 'injection'] },
    { id: 'sql-injection', title: 'SQL Injection Payloads', description: 'SQLi payloads for testing', href: '/tools/sql-injection', category: 'tool', icon: <Database className="w-4 h-4" />, keywords: ['sql', 'sqli', 'injection', 'database'] },
    { id: 'cors-tester', title: 'CORS Tester', description: 'Test CORS configurations', href: '/tools/cors-tester', category: 'tool', icon: <Globe className="w-4 h-4" />, keywords: ['cors', 'cross-origin', 'headers'] },
    { id: 'ssl-checker', title: 'SSL/TLS Checker', description: 'Analyze SSL certificates', href: '/tools/ssl-checker', category: 'tool', icon: <Lock className="w-4 h-4" />, keywords: ['ssl', 'tls', 'certificate', 'https'] },
    { id: 'port-scanner', title: 'Port Scanner', description: 'Scan for open ports', href: '/tools/port-scanner', category: 'tool', icon: <Radio className="w-4 h-4" />, keywords: ['port', 'scan', 'nmap', 'network'] },
    
    // Resources
    { id: 'cheatsheets', title: 'Cheatsheets', description: 'Quick reference guides', href: '/cheatsheets', category: 'resource', icon: <BookOpen className="w-4 h-4" />, keywords: ['cheat', 'reference', 'guide'] },
    { id: 'linux-commands', title: 'Linux Commands', description: 'Linux command cheatsheet', href: '/cheatsheets/linux-commands', category: 'resource', icon: <Terminal className="w-4 h-4" />, keywords: ['linux', 'bash', 'commands'] },
    { id: 'networking', title: 'Networking', description: 'Networking cheatsheet', href: '/cheatsheets/networking', category: 'resource', icon: <Globe className="w-4 h-4" />, keywords: ['network', 'tcp', 'ip'] },
    { id: 'sql-injection-cs', title: 'SQL Injection', description: 'SQLi cheatsheet', href: '/cheatsheets/sql-injection', category: 'resource', icon: <Database className="w-4 h-4" />, keywords: ['sql', 'injection'] },
    { id: 'xss-cs', title: 'XSS', description: 'Cross-site scripting cheatsheet', href: '/cheatsheets/xss', category: 'resource', icon: <Code2 className="w-4 h-4" />, keywords: ['xss', 'scripting'] },
    { id: 'reverse-shells-cs', title: 'Reverse Shells', description: 'Reverse shell cheatsheet', href: '/cheatsheets/reverse-shells', category: 'resource', icon: <Terminal className="w-4 h-4" />, keywords: ['shell', 'reverse'] },
    { id: 'roadmaps', title: 'Roadmaps', description: 'Learning paths', href: '/roadmaps', category: 'resource', icon: <Map className="w-4 h-4" />, keywords: ['learn', 'path', 'career'] },
    { id: 'blog', title: 'Blog', description: 'Community articles', href: '/blog', category: 'resource', icon: <FileText className="w-4 h-4" />, keywords: ['articles', 'posts', 'write'] },
    
    // Pages
    { id: 'tools', title: 'All Tools', description: 'Browse all security tools', href: '/tools', category: 'page', icon: <Wrench className="w-4 h-4" />, keywords: ['tools', 'security'] },
    { id: 'challenges', title: 'CTF Challenges', description: 'Capture the flag challenges', href: '/challenges', category: 'page', icon: <Flag className="w-4 h-4" />, keywords: ['ctf', 'challenge', 'flag', 'capture'] },
    { id: 'labs', title: 'Labs', description: 'Hands-on practice labs (coming soon)', href: '/labs', category: 'page', icon: <Shield className="w-4 h-4" />, keywords: ['labs', 'practice', 'hands-on'] },
    { id: 'events', title: 'Events', description: 'CTFs and workshops', href: '/events', category: 'page', icon: <Calendar className="w-4 h-4" />, keywords: ['ctf', 'workshop', 'event'] },
    { id: 'code-review', title: 'Code Review', description: 'Security code exercises', href: '/code-review', category: 'page', icon: <Code2 className="w-4 h-4" />, keywords: ['code', 'review', 'exercise'] },
    { id: 'dashboard', title: 'Dashboard', description: 'Your workspace', href: '/dashboard', category: 'page', icon: <Wrench className="w-4 h-4" />, keywords: ['dashboard', 'home'] },
    { id: 'profile', title: 'Profile', description: 'Your profile settings', href: '/profile', category: 'page', icon: <Wrench className="w-4 h-4" />, keywords: ['profile', 'settings', 'account'] },
];

const categoryLabels = {
    tool: 'Tools',
    resource: 'Resources',
    page: 'Pages'
};

const categoryColors = {
    tool: 'text-orange-400',
    resource: 'text-blue-400',
    page: 'text-green-400'
};

const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const lower = text.toLowerCase();
    const q = query.toLowerCase();
    const index = lower.indexOf(q);
    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + q.length);
    const after = text.slice(index + q.length);

    return (
        <>
            {before}
            <span className="text-orange-400">{match}</span>
            {after}
        </>
    );
};

export const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Filter results based on query
    const trimmedQuery = query.trim();
    const results = trimmedQuery
        ? searchItems.filter(item => {
            const searchStr = `${item.title} ${item.description} ${item.keywords?.join(' ') || ''}`.toLowerCase();
            return searchStr.includes(trimmedQuery.toLowerCase());
        })
        : searchItems.slice(0, 8); // Show popular items when no query

    // Group results by category
    const groupedResults = results.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, SearchItem[]>);

    // Keyboard shortcut to open (Cmd+K or Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && results[selectedIndex]) {
            e.preventDefault();
            router.push(results[selectedIndex].href);
            setIsOpen(false);
        }
    }, [results, selectedIndex, router]);

    // Reset selection when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999]">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/90 backdrop-blur-md"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-start justify-center pt-[12vh] px-4 pointer-events-none">
                <div className="w-full max-w-xl bg-zinc-900/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto" style={{ animation: 'fadeInScale 0.15s ease-out' }}>
                    {/* Search Input */}
                    <div className="flex items-center gap-3 px-4 border-b border-white/10">
                        <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search tools, resources, pages..."
                            className="flex-1 py-4 bg-transparent text-white placeholder:text-gray-500 focus:outline-none text-lg"
                        />
                        <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-gray-500 bg-white/5 rounded border border-white/10">
                            ESC
                        </kbd>
                    </div>

                    {/* Results */}
                    <div className="max-h-[60vh] overflow-y-auto p-2">
                        {trimmedQuery === '' && (
                            <div className="px-3 pb-2 text-xs text-gray-500">
                                Start typing to search tools, resources, and pages. Try &quot;google dork&quot;, &quot;challenges&quot;, or &quot;feeds&quot;.
                            </div>
                        )}
                        {results.length === 0 ? (
                            <div className="py-12 text-center">
                                <Search className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                <p className="text-gray-400">No results for &quot;{trimmedQuery}&quot;</p>
                                <p className="text-sm text-gray-600">Check your spelling or try a more general term.</p>
                            </div>
                        ) : (
                            Object.entries(groupedResults).map(([category, items]) => (
                                <div key={category} className="mb-2">
                                    <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {categoryLabels[category as keyof typeof categoryLabels]}
                                    </div>
                                    {items.map((item) => {
                                        const globalIndex = results.findIndex(r => r.id === item.id);
                                        const isSelected = globalIndex === selectedIndex;
                                        
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    router.push(item.href);
                                                    setIsOpen(false);
                                                }}
                                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors ${
                                                    isSelected 
                                                        ? 'bg-orange-500/10 border border-orange-500/20' 
                                                        : 'hover:bg-white/5 border border-transparent'
                                                }`}
                                            >
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                    isSelected ? 'bg-orange-500/20' : 'bg-white/5'
                                                } ${categoryColors[item.category as keyof typeof categoryColors]}`}>
                                                    {item.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`font-medium truncate ${isSelected ? 'text-orange-400' : 'text-white'}`}>
                                                        {highlightText(item.title, trimmedQuery)}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {highlightText(item.description, trimmedQuery)}
                                                    </p>
                                                </div>
                                                {isSelected && (
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <CornerDownLeft className="w-3 h-3" />
                                                        Enter
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↑</kbd>
                                <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↓</kbd>
                                Navigate
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↵</kbd>
                                Open
                            </span>
                        </div>
                        <span className="flex items-center gap-1">
                            <Command className="w-3 h-3" />K to search
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Search trigger button for navbar
export const SearchTrigger = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [, _setForceUpdate] = useState(0);

    const openSearch = () => {
        // Dispatch keyboard event to open search
        const event = new KeyboardEvent('keydown', {
            key: 'k',
            metaKey: true,
            bubbles: true
        });
        document.dispatchEvent(event);
    };

    return (
        <button
            onClick={openSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
        >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-white/5 rounded border border-white/10">
                <Command className="w-3 h-3" />K
            </kbd>
        </button>
    );
};

export default GlobalSearch;
