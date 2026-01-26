// app/ctf/page.tsx
"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { Flag, Trophy, Target, Users, Star, ChevronRight, Lock, Search, Filter, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { API_URL } from '@/lib/api';

interface Challenge {
    _id: string;
    title: string;
    slug: string;
    category: string;
    difficulty: string;
    basePoints: number;
    currentPoints: number;
    solveCount: number;
    shortDescription: string;
    status: string;
}

const CTFPage = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [totalChallenges, setTotalChallenges] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filterLoading, setFilterLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');

    const categories = [
        { id: 'all', name: 'All Categories', icon: <Target className="w-4 h-4" /> },
        { id: 'web', name: 'Web', icon: <Target className="w-4 h-4" /> },
        { id: 'crypto', name: 'Crypto', icon: <Lock className="w-4 h-4" /> },
        { id: 'pwn', name: 'Pwn', icon: <Flag className="w-4 h-4" /> },
        { id: 'reverse', name: 'Reverse', icon: <ChevronRight className="w-4 h-4" /> },
        { id: 'forensics', name: 'Forensics', icon: <Search className="w-4 h-4" /> },
        { id: 'misc', name: 'Misc', icon: <Star className="w-4 h-4" /> },
    ];

    const difficulties = [
        { id: 'all', name: 'All', color: 'gray' },
        { id: 'easy', name: 'Easy', color: 'green' },
        { id: 'medium', name: 'Medium', color: 'yellow' },
        { id: 'hard', name: 'Hard', color: 'red' },
        { id: 'insane', name: 'Insane', color: 'purple' },
    ];

    useEffect(() => {
        const fetchChallenges = async () => {
            // Only show filter loading if initial load is complete
            if (!loading) setFilterLoading(true);

            try {
                let url = `${API_URL}/api/challenges?status=active`;
                if (selectedCategory !== 'all') url += `&category=${selectedCategory}`;
                if (selectedDifficulty !== 'all') url += `&difficulty=${selectedDifficulty}`;

                const response = await fetch(url);
                const result = await response.json();

                if (result.success) {
                    setChallenges(result.data);
                    // Set total on first load
                    if (selectedCategory === 'all' && selectedDifficulty === 'all') {
                        setTotalChallenges(result.data.length);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch challenges:', error);
            } finally {
                setLoading(false);
                setFilterLoading(false);
            }
        };

        fetchChallenges();
    }, [selectedCategory, selectedDifficulty, loading]);

    // Check if any filters are active
    const hasActiveFilters = selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery !== '';

    // Clear all filters
    const clearFilters = useCallback(() => {
        setSelectedCategory('all');
        setSelectedDifficulty('all');
        setSearchQuery('');
    }, []);

    const filteredChallenges = challenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getDifficultyColor = (difficulty: string) => {
        const colors: Record<string, string> = {
            easy: 'text-green-400 bg-green-500/10 border-green-500/30',
            medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
            hard: 'text-red-400 bg-red-500/10 border-red-500/30',
            insane: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
        };
        return colors[difficulty] || 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            web: 'text-blue-400',
            crypto: 'text-orange-400',
            pwn: 'text-red-400',
            reverse: 'text-purple-400',
            forensics: 'text-green-400',
            misc: 'text-gray-400',
            osint: 'text-orange-400',
        };
        return colors[category] || 'text-gray-400';
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6 border-b border-white/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <Flag className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">CTF Challenges</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Capture The <span className="gradient-text">Flag</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                        Test your skills with real-world cybersecurity challenges. From web exploitation to cryptography, sharpen your hacking abilities.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/ctf/leaderboard"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
                        >
                            <Trophy className="w-4 h-4" />
                            Leaderboard
                        </Link>
                        <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-lg">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-500">{challenges.length}</div>
                                <div className="text-xs text-gray-400">Challenges</div>
                            </div>
                            <div className="w-px h-8 bg-white/10"></div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">{challenges.reduce((sum, c) => sum + c.solveCount, 0)}</div>
                                <div className="text-xs text-gray-400">Solves</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-16 z-20 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <div className="flex flex-col gap-4">
                        {/* Search with results count */}
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search challenges..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all"
                                />
                            </div>

                            {/* Results count and clear filters */}
                            <div className="flex items-center gap-3 shrink-0">
                                {filterLoading && (
                                    <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                                )}
                                <span className="text-sm text-gray-400">
                                    {filteredChallenges.length}{totalChallenges > 0 ? ` of ${totalChallenges}` : ''} challenges
                                </span>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                            <Filter className="w-4 h-4 text-gray-500 shrink-0" />
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat.id
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {cat.icon}
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Difficulty Filter */}
                        <div className="flex items-center gap-2">
                            {difficulties.map((diff) => (
                                <button
                                    key={diff.id}
                                    onClick={() => setSelectedDifficulty(diff.id)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedDifficulty === diff.id
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {diff.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenges Grid */}
            <section className="px-4 sm:px-6 py-12">
                <div className="max-w-5xl mx-auto">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : filteredChallenges.length === 0 ? (
                        <div className="text-center py-20">
                            <Target className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No challenges found</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {filteredChallenges.map((challenge) => (
                                <Link
                                    key={challenge._id}
                                    href={`/ctf/${challenge.slug}`}
                                    className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 rounded-xl p-6 transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-white group-hover:text-orange-500 transition-colors">
                                                    {challenge.title}
                                                </h3>
                                                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
                                                    {challenge.difficulty}
                                                </span>
                                                <span className={`text-sm font-medium ${getCategoryColor(challenge.category)}`}>
                                                    {challenge.category}
                                                </span>
                                            </div>

                                            {challenge.shortDescription && (
                                                <p className="text-sm text-gray-400 mb-3">
                                                    {challenge.shortDescription}
                                                </p>
                                            )}

                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Trophy className="w-4 h-4" />
                                                    {challenge.currentPoints} pts
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    {challenge.solveCount} solves
                                                </div>
                                            </div>
                                        </div>

                                        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors shrink-0" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CTFPage;
