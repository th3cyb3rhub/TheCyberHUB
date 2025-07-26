// app/tools/page.tsx
"use client"

import React, { useState } from 'react';
import {
    Search,
    Filter,
    Key,
    Globe,
    Shield,
    Network,
    Database,
    Terminal,
    Lock,
    Eye,
    Zap,
    AlertTriangle,
    ExternalLink,
    Star,
    Clock,
    Users,
    TrendingUp
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

interface Tool {
    id: string;
    name: string;
    description: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    status: 'Available' | 'Coming Soon' | 'Beta';
    popularity: number;
    usageCount: string;
    lastUpdated: string;
    icon: React.ReactNode;
    href: string;
    tags: string[];
    features: string[];
    featured: boolean;
}

const ToolsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [sortBy, setSortBy] = useState<'name' | 'popularity' | 'updated'>('popularity');

    const tools: Tool[] = [
        {
            id: 'jwt-analyzer',
            name: 'JWT Security Scanner',
            description: 'Comprehensive JWT token security analysis, weak secret detection, and signature verification for authentication testing.',
            category: 'Authentication',
            difficulty: 'Intermediate',
            status: 'Available',
            popularity: 95,
            usageCount: '25.4K',
            lastUpdated: '2025-01-20',
            icon: <Key className="w-6 h-6" />,
            href: '/tools/jwt-analyzer',
            tags: ['jwt', 'authentication', 'security', 'tokens', 'analysis'],
            features: ['Token Decoding', 'Security Analysis', 'Weak Secret Detection', 'Signature Verification'],
            featured: true
        },
        {
            id: 'subdomain-finder',
            name: 'Subdomain Finder',
            description: 'Discover hidden subdomains using Certificate Transparency logs to expand your attack surface analysis and security assessments.',
            category: 'Reconnaissance',
            difficulty: 'Beginner',
            status: 'Available',
            popularity: 92,
            usageCount: '18.7K',
            lastUpdated: '2025-01-18',
            icon: <Globe className="w-6 h-6" />,
            href: '/tools/subfinder',
            tags: ['subdomain', 'reconnaissance', 'certificate', 'enumeration'],
            features: ['Certificate Transparency', 'Real-time Scanning', 'Export Results', 'Domain Validation'],
            featured: true
        },
        {
            id: 'ssl-scanner',
            name: 'SSL/TLS Scanner',
            description: 'Comprehensive SSL/TLS certificate analyzer to identify vulnerabilities, misconfigurations, and security issues.',
            category: 'Network Security',
            difficulty: 'Intermediate',
            status: 'Coming Soon',
            popularity: 88,
            usageCount: '0',
            lastUpdated: '2025-01-15',
            icon: <Shield className="w-6 h-6" />,
            href: '/tools/ssl-scanner',
            tags: ['ssl', 'tls', 'certificates', 'encryption', 'security'],
            features: ['Certificate Analysis', 'Vulnerability Detection', 'Protocol Testing', 'Configuration Review'],
            featured: false
        },
        {
            id: 'port-scanner',
            name: 'Port Scanner',
            description: 'Advanced network port scanner for service discovery and security assessment with stealth scanning capabilities.',
            category: 'Network Security',
            difficulty: 'Advanced',
            status: 'Beta',
            popularity: 85,
            usageCount: '12.3K',
            lastUpdated: '2025-01-12',
            icon: <Network className="w-6 h-6" />,
            href: '/tools/port-scanner',
            tags: ['port', 'network', 'scanning', 'services', 'discovery'],
            features: ['TCP/UDP Scanning', 'Service Detection', 'Stealth Mode', 'Custom Payloads'],
            featured: false
        },
        {
            id: 'hash-analyzer',
            name: 'Hash Analyzer',
            description: 'Identify and analyze various hash types including MD5, SHA, bcrypt, and custom algorithms for password security testing.',
            category: 'Cryptography',
            difficulty: 'Beginner',
            status: 'Coming Soon',
            popularity: 78,
            usageCount: '0',
            lastUpdated: '2025-01-10',
            icon: <Lock className="w-6 h-6" />,
            href: '/tools/hash-analyzer',
            tags: ['hash', 'cryptography', 'passwords', 'analysis'],
            features: ['Hash Identification', 'Strength Analysis', 'Dictionary Attacks', 'Custom Wordlists'],
            featured: false
        },
        {
            id: 'sql-injection-tester',
            name: 'SQL Injection Tester',
            description: 'Automated SQL injection vulnerability scanner with payload generation and exploitation testing capabilities.',
            category: 'Web Security',
            difficulty: 'Advanced',
            status: 'Coming Soon',
            popularity: 90,
            usageCount: '0',
            lastUpdated: '2025-01-08',
            icon: <Database className="w-6 h-6" />,
            href: '/tools/sql-injection-tester',
            tags: ['sql', 'injection', 'web', 'database', 'vulnerability'],
            features: ['Automated Testing', 'Payload Generation', 'Blind SQL Detection', 'Database Fingerprinting'],
            featured: true
        },
        {
            id: 'xss-scanner',
            name: 'XSS Scanner',
            description: 'Cross-Site Scripting vulnerability scanner with advanced payload testing and DOM-based XSS detection.',
            category: 'Web Security',
            difficulty: 'Intermediate',
            status: 'Coming Soon',
            popularity: 87,
            usageCount: '0',
            lastUpdated: '2025-01-05',
            icon: <AlertTriangle className="w-6 h-6" />,
            href: '/tools/xss-scanner',
            tags: ['xss', 'web', 'vulnerability', 'javascript', 'dom'],
            features: ['Reflected XSS', 'Stored XSS', 'DOM XSS', 'Payload Obfuscation'],
            featured: false
        },
        {
            id: 'api-security-tester',
            name: 'API Security Tester',
            description: 'REST API security testing tool with authentication bypass, parameter pollution, and rate limiting tests.',
            category: 'API Security',
            difficulty: 'Advanced',
            status: 'Coming Soon',
            popularity: 83,
            usageCount: '0',
            lastUpdated: '2025-01-03',
            icon: <Terminal className="w-6 h-6" />,
            href: '/tools/api-security-tester',
            tags: ['api', 'rest', 'security', 'authentication', 'testing'],
            features: ['Auth Testing', 'Rate Limiting', 'Parameter Pollution', 'CORS Analysis'],
            featured: false
        },
        {
            id: 'payload-encoder',
            name: 'Payload Encoder/Decoder',
            description: 'Multi-format payload encoder and decoder supporting URL, Base64, HTML, Unicode, and custom encoding schemes.',
            category: 'Utilities',
            difficulty: 'Beginner',
            status: 'Coming Soon',
            popularity: 75,
            usageCount: '0',
            lastUpdated: '2025-01-01',
            icon: <Zap className="w-6 h-6" />,
            href: '/tools/payload-encoder',
            tags: ['encoding', 'decoding', 'payloads', 'utilities'],
            features: ['Multiple Formats', 'Batch Processing', 'Custom Schemes', 'URL Safe Encoding'],
            featured: false
        }
    ];

    const categories = [
        { id: 'all', name: 'All Categories', count: tools.length },
        { id: 'authentication', name: 'Authentication', count: tools.filter(t => t.category === 'Authentication').length },
        { id: 'reconnaissance', name: 'Reconnaissance', count: tools.filter(t => t.category === 'Reconnaissance').length },
        { id: 'network-security', name: 'Network Security', count: tools.filter(t => t.category === 'Network Security').length },
        { id: 'web-security', name: 'Web Security', count: tools.filter(t => t.category === 'Web Security').length },
        { id: 'cryptography', name: 'Cryptography', count: tools.filter(t => t.category === 'Cryptography').length },
        { id: 'api-security', name: 'API Security', count: tools.filter(t => t.category === 'API Security').length },
        { id: 'utilities', name: 'Utilities', count: tools.filter(t => t.category === 'Utilities').length }
    ];

    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' ||
            tool.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;

        const matchesDifficulty = selectedDifficulty === 'all' ||
            tool.difficulty.toLowerCase() === selectedDifficulty;

        const matchesStatus = selectedStatus === 'all' ||
            tool.status.toLowerCase().replace(/\s+/g, '-') === selectedStatus;

        return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
    });

    const sortedTools = [...filteredTools].sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'popularity':
                return b.popularity - a.popularity;
            case 'updated':
                return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
            default:
                return 0;
        }
    });

    const featuredTools = tools.filter(tool => tool.featured);
    const availableTools = tools.filter(tool => tool.status === 'Available');

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'available': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'beta': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'coming soon': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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
                                        <Terminal className="h-8 w-8 text-black" />
                                    </div>
                                    <div className="absolute inset-0 bg-orange-500/20 rounded-xl blur-md -z-10"></div>
                                </div>
                                <div>
                                    <h1 className="text-5xl md:text-6xl font-bold text-white">Security Tools</h1>
                                    <div className="flex items-center justify-center space-x-2 mt-2">
                                        <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm px-3 py-1 rounded-full">Professional Grade</span>
                                        <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-sm px-3 py-1 rounded-full">Free to Use</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                                Comprehensive collection of security testing tools built by professionals for professionals.
                                From authentication testing to vulnerability scanning - everything you need for security assessments.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
                                <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-4">
                                    <div className="text-orange-400 font-bold text-2xl mb-1">{tools.length}</div>
                                    <div className="text-gray-400 text-sm">Security Tools</div>
                                </div>
                                <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-4">
                                    <div className="text-orange-400 font-bold text-2xl mb-1">{availableTools.length}</div>
                                    <div className="text-gray-400 text-sm">Available Now</div>
                                </div>
                                <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-4">
                                    <div className="text-orange-400 font-bold text-2xl mb-1">56K+</div>
                                    <div className="text-gray-400 text-sm">Total Usage</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Featured Tools */}
                    {featuredTools.length > 0 && (
                        <div className="mb-16">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <Star className="h-6 w-6 text-orange-400 mr-2" />
                                Featured Tools
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredTools.map((tool) => (
                                    <div key={tool.id} className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-6 hover:border-orange-400/40 transition-all duration-300 group">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="text-orange-400 group-hover:scale-110 transition-transform">
                                                {tool.icon}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Star className="h-4 w-4 text-orange-400 fill-current" />
                                                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(tool.status)}`}>
                                                    {tool.status}
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                            {tool.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{tool.description}</p>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(tool.difficulty)}`}>
                                                {tool.difficulty}
                                            </span>
                                            <div className="text-xs text-gray-500">
                                                {tool.usageCount !== '0' ? `${tool.usageCount} uses` : 'New'}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {tool.status === 'Available' ? (
                                                <Link
                                                    href={tool.href}
                                                    className="flex-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium text-center"
                                                >
                                                    Use Tool
                                                </Link>
                                            ) : (
                                                <div className="flex-1 bg-gray-600/20 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium text-center cursor-not-allowed">
                                                    {tool.status}
                                                </div>
                                            )}
                                            <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200">
                                                <Eye className="h-4 w-4 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Search and Filters */}
                    <div className="mb-12">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                            <div className="grid lg:grid-cols-5 gap-4">
                                {/* Search */}
                                <div className="lg:col-span-2 relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search tools, descriptions, or tags..."
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

                                {/* Status Filter */}
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                >
                                    <option value="all">All Status</option>
                                    <option value="available">Available</option>
                                    <option value="beta">Beta</option>
                                    <option value="coming-soon">Coming Soon</option>
                                </select>
                            </div>

                            {/* Sort and Results Count */}
                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
                                <div className="text-gray-300">
                                    Showing {sortedTools.length} of {tools.length} tools
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-400 text-sm">Sort by:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as 'name' | 'popularity' | 'updated')}
                                        className="px-3 py-1.5 bg-gray-800/50 border border-gray-700 rounded text-white focus:border-orange-500 outline-none text-sm"
                                    >
                                        <option value="popularity">Popularity</option>
                                        <option value="name">Name</option>
                                        <option value="updated">Last Updated</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {sortedTools.map((tool) => (
                            <div key={tool.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-orange-400 group-hover:scale-110 transition-transform">
                                        {tool.icon}
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        {tool.featured && <Star className="h-4 w-4 text-orange-400 fill-current" />}
                                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(tool.status)}`}>
                                            {tool.status}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                    {tool.name}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">{tool.description}</p>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Category:</span>
                                        <span className="text-orange-400">{tool.category}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Usage:</span>
                                        <span className="text-white">{tool.usageCount !== '0' ? tool.usageCount : 'New'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Updated:</span>
                                        <span className="text-white">{formatDate(tool.lastUpdated)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(tool.difficulty)}`}>
                                        {tool.difficulty}
                                    </span>
                                    <div className="flex items-center space-x-1">
                                        <TrendingUp className="h-3 w-3 text-orange-400" />
                                        <span className="text-xs text-orange-400">{tool.popularity}%</span>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="mb-4">
                                    <div className="text-xs text-gray-500 mb-2">Key Features:</div>
                                    <div className="flex flex-wrap gap-1">
                                        {tool.features.slice(0, 3).map((feature, index) => (
                                            <span key={index} className="text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded border border-gray-700">
                                                {feature}
                                            </span>
                                        ))}
                                        {tool.features.length > 3 && (
                                            <span className="text-xs text-gray-500">+{tool.features.length - 3} more</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    {tool.status === 'Available' ? (
                                        <Link
                                            href={tool.href}
                                            className="flex-1 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium border border-orange-500/30 text-center flex items-center justify-center space-x-2"
                                        >
                                            <span>Use Tool</span>
                                            <ExternalLink className="h-3 w-3" />
                                        </Link>
                                    ) : (
                                        <div className="flex-1 bg-gray-600/10 border border-gray-600/30 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium text-center cursor-not-allowed">
                                            {tool.status}
                                        </div>
                                    )}
                                    <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200" title="View Details">
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {sortedTools.length === 0 && (
                        <div className="text-center py-12">
                            <Terminal className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
                            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                    setSelectedDifficulty('all');
                                    setSelectedStatus('all');
                                }}
                                className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="text-center bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Tool?</h3>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                            Can't find what you're looking for? Request a custom security tool or suggest new features for existing ones.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                                Request Tool
                            </button>
                            <button className="border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                                Suggest Feature
                            </button>
                        </div>
                    </div>

                    {/* Development Roadmap */}
                    <div className="mt-16 bg-gray-900/30 border border-gray-800 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <Clock className="w-6 h-6 text-orange-400 mr-2" />
                            Development Roadmap
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    quarter: "Q1 2025",
                                    tools: ["SSL/TLS Scanner", "Hash Analyzer"],
                                    status: "In Development"
                                },
                                {
                                    quarter: "Q2 2025",
                                    tools: ["SQL Injection Tester", "XSS Scanner"],
                                    status: "Planned"
                                },
                                {
                                    quarter: "Q3 2025",
                                    tools: ["API Security Tester", "CSRF Tester"],
                                    status: "Research"
                                },
                                {
                                    quarter: "Q4 2025",
                                    tools: ["Mobile App Scanner", "IoT Security Tools"],
                                    status: "Roadmap"
                                }
                            ].map((roadmap, index) => (
                                <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-orange-400 font-semibold">{roadmap.quarter}</h4>
                                        <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded">
                                            {roadmap.status}
                                        </span>
                                    </div>
                                    <ul className="space-y-1">
                                        {roadmap.tools.map((tool, toolIndex) => (
                                            <li key={toolIndex} className="text-sm text-gray-300 flex items-center">
                                                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></div>
                                                {tool}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-gray-400 text-sm">
                                Follow our progress on GitHub and join the discussion in our Discord community.
                            </p>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: <Users className="w-6 h-6 text-orange-400" />,
                                label: "Active Users",
                                value: "15,420",
                                change: "+12% this month"
                            },
                            {
                                icon: <Terminal className="w-6 h-6 text-green-400" />,
                                label: "Tools Executed",
                                value: "156K+",
                                change: "+24% this month"
                            },
                            {
                                icon: <Shield className="w-6 h-6 text-blue-400" />,
                                label: "Vulnerabilities Found",
                                value: "8,932",
                                change: "+18% this month"
                            },
                            {
                                icon: <Clock className="w-6 h-6 text-purple-400" />,
                                label: "Avg Response Time",
                                value: "1.2s",
                                change: "-5% improvement"
                            }
                        ].map((stat, index) => (
                            <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
                                <div className="flex justify-center mb-3">
                                    {stat.icon}
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
                                <div className="text-xs text-green-400">{stat.change}</div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Info */}
                    <div className="mt-12 text-center text-gray-500 text-sm">
                        <p>
                            All tools are maintained by the TheCyberHub security team.
                            Open source and free to use •
                            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors"> Report bugs</a> •
                            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors"> Contribute</a> •
                            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors"> API Access</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolsPage;