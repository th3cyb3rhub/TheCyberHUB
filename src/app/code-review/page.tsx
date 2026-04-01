"use client"

import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';
import {
    Code,
    Search,
    Filter,
    Database,
    Globe,
    Key,
    Lock,
    Shield,
    Terminal,
    ChevronRight,
    AlertTriangle
} from 'lucide-react';
import Footer from '@/components/Footer';
import { codeSnippets, categories, difficulties } from '@/data/codeSnippets';

const severityColors = {
    low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const categoryIcons: Record<string, React.ReactNode> = {
    sqli: <Database className="w-4 h-4" />,
    xss: <Code className="w-4 h-4" />,
    ssrf: <Globe className="w-4 h-4" />,
    idor: <Key className="w-4 h-4" />,
    auth: <Lock className="w-4 h-4" />,
    crypto: <Shield className="w-4 h-4" />,
    injection: <Terminal className="w-4 h-4" />,
};

const CodeReviewPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

    const filteredSnippets = codeSnippets.filter(snippet => {
        const matchesSearch = snippet.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            snippet.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            snippet.vulnerabilityType.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesCategory = !selectedCategory || snippet.category === selectedCategory;
        const matchesDifficulty = !selectedDifficulty || snippet.difficulty === selectedDifficulty;
        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <Code className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Learn to spot vulnerabilities</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                        Code <span className="gradient-text">Review</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                        Analyze vulnerable code snippets, understand the flaws, and learn how to write secure code.
                    </p>

                    {/* Search */}
                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search vulnerabilities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                        />
                    </div>
                </div>
            </section>

            {/* Filters & Content */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mr-4">
                        <Filter className="w-4 h-4" />
                        Filters:
                    </div>

                    {/* Category Filters */}
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${!selectedCategory
                            ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                            : 'border-white/10 text-gray-400 hover:border-white/20'
                            }`}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border transition-colors ${selectedCategory === cat.id
                                ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                                : 'border-white/10 text-gray-400 hover:border-white/20'
                                }`}
                        >
                            {categoryIcons[cat.id]}
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Difficulty Filters */}
                <div className="flex gap-2 mb-8">
                    {difficulties.map(diff => (
                        <button
                            key={diff.id}
                            onClick={() => setSelectedDifficulty(selectedDifficulty === diff.id ? null : diff.id)}
                            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${selectedDifficulty === diff.id
                                ? difficultyColors[diff.id as keyof typeof difficultyColors]
                                : 'border-white/10 text-gray-400 hover:border-white/20'
                                }`}
                        >
                            {diff.name}
                        </button>
                    ))}
                </div>

                {/* Results Count */}
                <p className="text-sm text-gray-500 mb-6">
                    Showing {filteredSnippets.length} of {codeSnippets.length} snippets
                </p>

                {/* Snippet Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredSnippets.map(snippet => (
                        <Link
                            key={snippet.id}
                            href={`/code-review/${snippet.id}`}
                            className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-orange-500/30 hover:bg-white/[0.04] transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-orange-500">
                                        {categoryIcons[snippet.category]}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                                            {snippet.title}
                                        </h3>
                                        <p className="text-xs text-gray-500">{snippet.language}</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                            </div>

                            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                {snippet.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {/* Severity */}
                                <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded border ${severityColors[snippet.severity]}`}>
                                    <AlertTriangle className="w-3 h-3" />
                                    {snippet.severity}
                                </span>

                                {/* Difficulty */}
                                <span className={`text-xs px-2 py-1 rounded border ${difficultyColors[snippet.difficulty]}`}>
                                    {snippet.difficulty}
                                </span>

                                {/* Vulnerability Type */}
                                <span className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded">
                                    {snippet.vulnerabilityType}
                                </span>

                                {/* CWE/OWASP */}
                                {snippet.cwe && (
                                    <span className="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded">
                                        {snippet.cwe}
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredSnippets.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                            <Code className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">No snippets found</h3>
                        <p className="text-gray-400">Try adjusting your filters or search query</p>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default CodeReviewPage;
