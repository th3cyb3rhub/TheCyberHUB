// app/cheatsheets/page.tsx
"use client"

import React, { useState } from 'react';
import {
    Search,
    Download,
    Copy,
    FileText,
    Terminal,
    Database,
    Star,
    BookOpen,
    Grid,
    List,
    Zap,
    Bug,
    Network,
    X,
    ChevronRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface CheatSheet {
    id: string;
    title: string;
    description: string;
    category: string;
    subcategory: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    commands: number;
    downloads: string;
    lastUpdated: string;
    tags: string[];
    icon: React.ReactNode;
    featured: boolean;
    content: CheatSheetSection[];
}

interface CheatSheetSection {
    title: string;
    items: CheatSheetItem[];
}

interface CheatSheetItem {
    command: string;
    description: string;
    example?: string;
}

const CheatsheetsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [expandedSheet, setExpandedSheet] = useState<string | null>(null);

    // Sample cheatsheet data
    const cheatsheets: CheatSheet[] = [
        {
            id: 'linux-commands',
            title: 'Linux Commands for Pentesting',
            description: 'Essential Linux commands every penetration tester should know',
            category: 'Operating Systems',
            subcategory: 'Linux',
            difficulty: 'Beginner',
            commands: 45,
            downloads: '25.4K',
            lastUpdated: '2025-01-15',
            tags: ['linux', 'terminal', 'pentesting', 'commands'],
            icon: <Terminal className="w-6 h-6" />,
            featured: true,
            content: [
                {
                    title: 'System Information',
                    items: [
                        { command: 'uname -a', description: 'Display system information' },
                        { command: 'whoami', description: 'Show current user' },
                        { command: 'id', description: 'Display user and group IDs' },
                        { command: 'ps aux', description: 'List running processes' }
                    ]
                },
                {
                    title: 'Network Discovery',
                    items: [
                        { command: 'netstat -tulpn', description: 'Show network connections' },
                        { command: 'ss -tulpn', description: 'Modern netstat alternative' },
                        { command: 'arp -a', description: 'Display ARP table' }
                    ]
                }
            ]
        },
        {
            id: 'nmap-scanning',
            title: 'Nmap Scanning Techniques',
            description: 'Comprehensive guide to network scanning with Nmap',
            category: 'Network Security',
            subcategory: 'Reconnaissance',
            difficulty: 'Intermediate',
            commands: 32,
            downloads: '18.7K',
            lastUpdated: '2025-01-12',
            tags: ['nmap', 'scanning', 'network', 'reconnaissance'],
            icon: <Network className="w-6 h-6" />,
            featured: true,
            content: [
                {
                    title: 'Basic Scans',
                    items: [
                        { command: 'nmap -sS target', description: 'TCP SYN scan (stealth scan)' },
                        { command: 'nmap -sU target', description: 'UDP scan' },
                        { command: 'nmap -sA target', description: 'TCP ACK scan' }
                    ]
                },
                {
                    title: 'Advanced Techniques',
                    items: [
                        { command: 'nmap -sC -sV target', description: 'Script scan with version detection' },
                        { command: 'nmap --script vuln target', description: 'Vulnerability scanning' }
                    ]
                }
            ]
        },
        {
            id: 'sql-injection',
            title: 'SQL Injection Cheatsheet',
            description: 'Common SQL injection payloads and techniques',
            category: 'Web Security',
            subcategory: 'Injection Attacks',
            difficulty: 'Advanced',
            commands: 28,
            downloads: '22.1K',
            lastUpdated: '2025-01-10',
            tags: ['sql', 'injection', 'web', 'database'],
            icon: <Database className="w-6 h-6" />,
            featured: false,
            content: [
                {
                    title: 'Detection',
                    items: [
                        { command: "' OR '1'='1", description: 'Basic boolean injection' },
                        { command: "'; WAITFOR DELAY '00:00:05'--", description: 'Time-based blind injection' }
                    ]
                }
            ]
        },
        {
            id: 'burp-suite',
            title: 'Burp Suite Shortcuts',
            description: 'Essential keyboard shortcuts and workflows for Burp Suite',
            category: 'Tools',
            subcategory: 'Web Testing',
            difficulty: 'Beginner',
            commands: 20,
            downloads: '15.3K',
            lastUpdated: '2025-01-08',
            tags: ['burp', 'shortcuts', 'web', 'proxy'],
            icon: <Bug className="w-6 h-6" />,
            featured: false,
            content: []
        },
        {
            id: 'metasploit',
            title: 'Metasploit Framework',
            description: 'Common Metasploit commands and exploitation techniques',
            category: 'Exploitation',
            subcategory: 'Frameworks',
            difficulty: 'Advanced',
            commands: 35,
            downloads: '19.8K',
            lastUpdated: '2025-01-05',
            tags: ['metasploit', 'exploitation', 'framework'],
            icon: <Zap className="w-6 h-6" />,
            featured: true,
            content: []
        },
        {
            id: 'powershell',
            title: 'PowerShell for Security',
            description: 'PowerShell commands for security testing and administration',
            category: 'Operating Systems',
            subcategory: 'Windows',
            difficulty: 'Intermediate',
            commands: 25,
            downloads: '12.5K',
            lastUpdated: '2025-01-03',
            tags: ['powershell', 'windows', 'scripting'],
            icon: <Terminal className="w-6 h-6" />,
            featured: false,
            content: []
        }
    ];

    const categories = [
        { id: 'all', name: 'All Categories', count: cheatsheets.length },
        { id: 'web-security', name: 'Web Security', count: cheatsheets.filter(c => c.category === 'Web Security').length },
        { id: 'network-security', name: 'Network Security', count: cheatsheets.filter(c => c.category === 'Network Security').length },
        { id: 'operating-systems', name: 'Operating Systems', count: cheatsheets.filter(c => c.category === 'Operating Systems').length },
        { id: 'tools', name: 'Tools', count: cheatsheets.filter(c => c.category === 'Tools').length },
        { id: 'exploitation', name: 'Exploitation', count: cheatsheets.filter(c => c.category === 'Exploitation').length }
    ];

    const filteredCheatsheets = cheatsheets.filter(sheet => {
        const matchesSearch = sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sheet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sheet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' ||
            sheet.category.toLowerCase().replace(' ', '-') === selectedCategory;

        const matchesDifficulty = selectedDifficulty === 'all' ||
            sheet.difficulty.toLowerCase() === selectedDifficulty;

        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    const featuredCheatsheets = filteredCheatsheets.filter(sheet => sheet.featured);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const downloadCheatsheet = (sheet: CheatSheet) => {
        // Generate content for download
        const content = [
            `# ${sheet.title}`,
            `${sheet.description}`,
            '',
            `Category: ${sheet.category}`,
            `Difficulty: ${sheet.difficulty}`,
            `Last Updated: ${sheet.lastUpdated}`,
            '',
            ...sheet.content.flatMap(section => [
                `## ${section.title}`,
                '',
                ...section.items.flatMap(item => [
                    `**${item.command}**`,
                    `${item.description}`,
                    item.example ? `Example: ${item.example}` : '',
                    ''
                ])
            ])
        ].join('\n');

        const blob = new Blob([content], { type: 'text/markdown' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${sheet.title.toLowerCase().replace(/\s+/g, '-')}-cheatsheet.md`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="relative overflow-hidden mb-16">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>

                        <div className="relative text-center py-16">
                            <div className="flex items-center justify-center space-x-4 mb-6">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                                        <FileText className="h-8 w-8 text-black" />
                                    </div>
                                    <div className="absolute inset-0 bg-orange-500/20 rounded-xl blur-md -z-10"></div>
                                </div>
                                <div>
                                    <h1 className="text-5xl md:text-6xl font-bold text-white">Security Cheatsheets</h1>
                                    <div className="flex items-center justify-center space-x-2 mt-2">
                                        <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm px-3 py-1 rounded-full">Quick Reference</span>
                                        <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-sm px-3 py-1 rounded-full">Always Updated</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                                Comprehensive collection of cybersecurity cheatsheets, commands, and quick references.
                                From penetration testing to incident response - everything you need at your fingertips.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
                                <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-4">
                                    <div className="text-orange-400 font-bold text-2xl mb-1">{cheatsheets.length}+</div>
                                    <div className="text-gray-400 text-sm">Cheatsheets Available</div>
                                </div>
                                <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-4">
                                    <div className="text-orange-400 font-bold text-2xl mb-1">100K+</div>
                                    <div className="text-gray-400 text-sm">Total Downloads</div>
                                </div>
                                <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-4">
                                    <div className="text-orange-400 font-bold text-2xl mb-1">Weekly</div>
                                    <div className="text-gray-400 text-sm">Content Updates</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-12">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                            <div className="grid lg:grid-cols-4 gap-4">
                                {/* Search */}
                                <div className="lg:col-span-2 relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search cheatsheets, commands, or tags..."
                                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                    />
                                </div>

                                {/* Category Filter */}
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                >
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name} ({category.count})
                                        </option>
                                    ))}
                                </select>

                                {/* Difficulty Filter */}
                                <select
                                    value={selectedDifficulty}
                                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                                    className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                >
                                    <option value="all">All Levels</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
                                <div className="text-gray-300">
                                    Showing {filteredCheatsheets.length} of {cheatsheets.length} cheatsheets
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg transition-all duration-200 ${
                                            viewMode === 'grid' ? 'bg-orange-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        <Grid className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg transition-all duration-200 ${
                                            viewMode === 'list' ? 'bg-orange-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        <List className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Featured Cheatsheets */}
                    {featuredCheatsheets.length > 0 && searchQuery === '' && selectedCategory === 'all' && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <Star className="h-6 w-6 text-orange-400 mr-2" />
                                Featured Cheatsheets
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredCheatsheets.slice(0, 3).map((sheet) => (
                                    <div key={sheet.id} className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-6 hover:border-orange-400/40 transition-all duration-300 group">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="text-orange-400 group-hover:scale-110 transition-transform">
                                                {sheet.icon}
                                            </div>
                                            <Star className="h-5 w-5 text-orange-400 fill-current" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                            <a href={`/cheatsheets/${sheet.id}`} className="hover:text-orange-400 transition-colors">
                                                {sheet.title}
                                            </a>
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{sheet.description}</p>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(sheet.difficulty)}`}>
                                                {sheet.difficulty}
                                            </span>
                                            <div className="text-xs text-gray-500">
                                                {sheet.commands} commands • {sheet.downloads} downloads
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <a
                                                href={`/cheatsheets/${sheet.id}`}
                                                className="flex-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium text-center"
                                            >
                                                View Commands
                                            </a>
                                            <button
                                                onClick={() => downloadCheatsheet(sheet)}
                                                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                                title="Download"
                                            >
                                                <Download className="h-4 w-4 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Cheatsheets Grid/List */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <BookOpen className="h-6 w-6 text-orange-400 mr-2" />
                            All Cheatsheets
                        </h2>

                        {viewMode === 'grid' ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCheatsheets.map((sheet) => (
                                    <div key={sheet.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300 group">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="text-orange-400 group-hover:scale-110 transition-transform">
                                                {sheet.icon}
                                            </div>
                                            {sheet.featured && <Star className="h-4 w-4 text-orange-400 fill-current" />}
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                            <a href={`/cheatsheets/${sheet.id}`} className="hover:text-orange-400 transition-colors">
                                                {sheet.title}
                                            </a>
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{sheet.description}</p>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">Category:</span>
                                                <span className="text-xs text-orange-400">{sheet.category}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">Commands:</span>
                                                <span className="text-xs text-white">{sheet.commands}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">Downloads:</span>
                                                <span className="text-xs text-white">{sheet.downloads}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(sheet.difficulty)}`}>
                                                {sheet.difficulty}
                                            </span>
                                            <span className="text-xs text-gray-500">Updated {sheet.lastUpdated}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <a
                                                href={`/cheatsheets/${sheet.id}`}
                                                className="flex-1 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium border border-orange-500/30 text-center"
                                            >
                                                View Commands
                                            </a>
                                            <button
                                                onClick={() => downloadCheatsheet(sheet)}
                                                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                                title="Download"
                                            >
                                                <Download className="h-4 w-4 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredCheatsheets.map((sheet) => (
                                    <div key={sheet.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4 flex-1">
                                                <div className="text-orange-400">
                                                    {sheet.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <h3 className="text-lg font-semibold text-white hover:text-orange-400 transition-colors">
                                                            <a href={`/cheatsheets/${sheet.id}`}>
                                                                {sheet.title}
                                                            </a>
                                                        </h3>
                                                        {sheet.featured && <Star className="h-4 w-4 text-orange-400 fill-current" />}
                                                        <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(sheet.difficulty)}`}>
                                                            {sheet.difficulty}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-400 text-sm mb-2">{sheet.description}</p>
                                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                        <span>{sheet.category}</span>
                                                        <span>•</span>
                                                        <span>{sheet.commands} commands</span>
                                                        <span>•</span>
                                                        <span>{sheet.downloads} downloads</span>
                                                        <span>•</span>
                                                        <span>Updated {sheet.lastUpdated}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 ml-4">
                                                <a
                                                    href={`/cheatsheets/${sheet.id}`}
                                                    className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium border border-orange-500/30"
                                                >
                                                    View
                                                </a>
                                                <button
                                                    onClick={() => downloadCheatsheet(sheet)}
                                                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                                    title="Download"
                                                >
                                                    <Download className="h-4 w-4 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* No Results */}
                    {filteredCheatsheets.length === 0 && (
                        <div className="text-center py-12">
                            <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">No cheatsheets found</h3>
                            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                    setSelectedDifficulty('all');
                                }}
                                className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="text-center bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Want to contribute?</h3>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                            Help us expand our cheatsheet collection! Submit your own cheatsheets or suggest improvements to existing ones.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                                Submit Cheatsheet
                            </button>
                            <button className="border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                                Request Topic
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheatsheetsPage;