/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
    Flag,
    Trophy,
    Target,
    Users,
    Star,
    Search,
    ChevronRight,
    Lock,
    CheckCircle,
    Zap,
    Shield,
    Code,
    Globe,
    Database,
    Terminal,
    Cpu,
    X
} from 'lucide-react';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';

interface Challenge {
    _id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'insane';
    points: number;
    solves: number;
    author?: {
        username: string;
        name?: string;
    };
    tags?: string[];
    hints?: { cost: number; unlocked?: boolean }[];
    solved?: boolean;
    createdAt: string;
}

interface LeaderboardEntry {
    _id: string;
    username: string;
    name?: string;
    score: number;
    solves: number;
    rank: number;
}

const difficultyConfig = {
    easy: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', label: 'Easy' },
    medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', label: 'Medium' },
    hard: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', label: 'Hard' },
    insane: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'Insane' }
};

const categoryIcons: Record<string, React.ReactNode> = {
    web: <Globe className="w-5 h-5" />,
    crypto: <Lock className="w-5 h-5" />,
    forensics: <Search className="w-5 h-5" />,
    pwn: <Terminal className="w-5 h-5" />,
    reverse: <Cpu className="w-5 h-5" />,
    misc: <Zap className="w-5 h-5" />,
    osint: <Target className="w-5 h-5" />,
    steganography: <Shield className="w-5 h-5" />,
    programming: <Code className="w-5 h-5" />,
    sql: <Database className="w-5 h-5" />,
};

// Skeleton for challenges
const ChallengeSkeleton = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-start justify-between mb-3">
                    <Skeleton className="w-10 h-10 rounded-xl" />
                    <Skeleton className="w-16 h-6 rounded-full" />
                </div>
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </div>
        ))}
    </div>
);

const ChallengesPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { user, token } = useAuth();
    const { addToast } = useToast();
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>(searchParams.get('difficulty') || 'all');
    const [solvedFilter, setSolvedFilter] = useState<'all' | 'unsolved' | 'solved'>((searchParams.get('solved') as 'all' | 'unsolved' | 'solved') || 'all');
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const updateFilters = useCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'all' || value === '') {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, [searchParams, router, pathname]);

    const clearAllFilters = useCallback(() => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedDifficulty('all');
        setSolvedFilter('all');
        router.replace(pathname, { scroll: false });
    }, [router, pathname]);

    const hasActiveFilters = selectedCategory !== 'all' || selectedDifficulty !== 'all' || solvedFilter !== 'all' || searchQuery !== '';

    // Fetch challenges
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [challengesData, leaderboardData] = await Promise.all([
                    fetchApi('/api/challenges'),
                    fetchApi('/api/challenges/leaderboard', { requireAuth: false })
                ]);
                setChallenges(Array.isArray(challengesData) ? challengesData : challengesData.challenges || []);
                setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData.slice(0, 10) : []);
            } catch (error) {
                console.error('Failed to fetch challenges:', error);
                addToast({ message: 'Failed to load challenges', variant: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    // Get unique categories
    const categories = ['all', ...Array.from(new Set(challenges.map(c => c.category)))];

    // Filter challenges
    const filteredChallenges = challenges.filter(challenge => {
        const matchesSearch = challenge.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            challenge.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            challenge.tags?.some(t => t.toLowerCase().includes(debouncedSearch.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
        const isSolved = !!challenge.solved;
        const matchesSolved =
            solvedFilter === 'all' ||
            (solvedFilter === 'solved' ? isSolved : !isSolved);
        return matchesSearch && matchesCategory && matchesDifficulty && matchesSolved;
    });

    // Stats
    const totalSolved = challenges.filter(c => c.solved).length;
    const totalPoints = challenges.filter(c => c.solved).reduce((acc, c) => acc + c.points, 0);
    const currentUserEntry = user
        ? leaderboard.find(entry => entry.username === user.username)
        : undefined;

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <section className="relative pt-32 pb-12 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-5xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5">
                            <Flag className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-400">Capture The Flag</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                            Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 animate-pulse-slow drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">Challenges</span>
                        </h1>
                        <p className="text-gray-400 max-w-lg mx-auto">
                            Test your skills with hands-on security challenges. Solve puzzles, capture flags, and climb the leaderboard.
                        </p>
                    </div>

                    {/* User Stats */}
                    {user && (
                        <div className="flex items-center justify-center gap-6 mb-8">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-white font-medium">{totalSolved}</span>
                                <span className="text-gray-500 text-sm">Solved</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span className="text-white font-medium">{totalPoints}</span>
                                <span className="text-gray-500 text-sm">Points</span>
                            </div>
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <button
                            onClick={() => setShowLeaderboard(false)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${!showLeaderboard
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                                }`}
                        >
                            <Target className="w-4 h-4" />
                            Challenges
                        </button>
                        <button
                            onClick={() => setShowLeaderboard(true)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${showLeaderboard
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                                }`}
                        >
                            <Trophy className="w-4 h-4" />
                            Leaderboard
                        </button>
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
                {showLeaderboard ? (
                    /* Leaderboard */
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                        <div className="p-5 border-b border-white/10">
                            <div className="flex items-center justify-between gap-4">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-yellow-400" />
                                    Top Players
                                </h2>
                                {user && (
                                    <div className="text-xs text-gray-400 text-right">
                                        {currentUserEntry ? (
                                            <span>
                                                Your rank: #{
                                                    currentUserEntry.rank ??
                                                    (leaderboard.findIndex(e => e._id === currentUserEntry._id) + 1)
                                                }
                                                {' '}
                                                {currentUserEntry.score} pts
                                            </span>
                                        ) : (
                                            <span>Solve challenges to enter the leaderboard</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="divide-y divide-white/5">
                            {leaderboard.map((entry, index) => {
                                const isCurrentUser = !!user && entry.username === user.username;
                                return (
                                    <div
                                        key={entry._id}
                                        className={`flex items-center gap-4 p-4 hover:bg-white/5 transition-colors ${index < 3 ? 'bg-white/[0.02]' : ''
                                            } ${isCurrentUser ? 'border border-orange-500/40 bg-orange-500/10' : ''}`}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${index === 0
                                                    ? 'bg-yellow-500/20 text-yellow-400'
                                                    : index === 1
                                                        ? 'bg-gray-400/20 text-gray-300'
                                                        : index === 2
                                                            ? 'bg-orange-600/20 text-orange-400'
                                                            : 'bg-white/5 text-gray-500'
                                                }`}
                                        >
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <Link
                                                href={`/user/${entry.username}`}
                                                className="text-white font-medium hover:text-orange-400 transition-colors"
                                            >
                                                {entry.name || entry.username}
                                            </Link>
                                            <p className="text-xs text-gray-500">@{entry.username}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-semibold">{entry.score} pts</p>
                                            <p className="text-xs text-gray-500">{entry.solves} solves</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Filters */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); updateFilters('search', e.target.value); }}
                                    placeholder="Search challenges..."
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => { setSelectedCategory(e.target.value); updateFilters('category', e.target.value); }}
                                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="bg-zinc-900">
                                        {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => { setSelectedDifficulty(e.target.value); updateFilters('difficulty', e.target.value); }}
                                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                            >
                                <option value="all" className="bg-zinc-900">All Difficulties</option>
                                <option value="easy" className="bg-zinc-900">Easy</option>
                                <option value="medium" className="bg-zinc-900">Medium</option>
                                <option value="hard" className="bg-zinc-900">Hard</option>
                                <option value="insane" className="bg-zinc-900">Insane</option>
                            </select>
                            <select
                                value={solvedFilter}
                                onChange={(e) => { setSolvedFilter(e.target.value as 'all' | 'unsolved' | 'solved'); updateFilters('solved', e.target.value); }}
                                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                            >
                                <option value="all" className="bg-zinc-900">All Statuses</option>
                                <option value="unsolved" className="bg-zinc-900">Unsolved only</option>
                                <option value="solved" className="bg-zinc-900">Solved only</option>
                            </select>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearAllFilters}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                                >
                                    <X className="w-3.5 h-3.5" /> Clear Filters
                                </button>
                            )}
                        </div>

                        {/* Challenges Grid */}
                        {loading ? (
                            <ChallengeSkeleton />
                        ) : filteredChallenges.length === 0 ? (
                            <EmptyState
                                icon={Flag}
                                title="No challenges found"
                                description="Try adjusting your filters or search query."
                            />
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredChallenges.map((challenge, index) => {
                                    const difficulty = difficultyConfig[challenge.difficulty];
                                    const categoryIcon = categoryIcons[challenge.category] || <Flag className="w-5 h-5" />;

                                    return (
                                        <Link
                                            key={challenge._id}
                                            href={`/challenges/${challenge.slug}`}
                                            className={`group p-5 rounded-2xl border bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl card-hover animate-fade-in-up animate-stagger-${index % 6 + 1} ${challenge.solved
                                                    ? 'border-green-500/30 hover:border-green-500/50 hover:shadow-green-500/20'
                                                    : 'border-white/10 hover:border-orange-500/40 hover:shadow-orange-500/20'
                                                }`}
                                            style={{ opacity: 0, animationFillMode: 'forwards' }}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${challenge.solved ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-orange-400'
                                                    }`}>
                                                    {challenge.solved ? <CheckCircle className="w-5 h-5" /> : categoryIcon}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${difficulty.bg} ${difficulty.color} ${difficulty.border} border`}>
                                                        {difficulty.label}
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 className="text-white font-semibold mb-1 group-hover:text-orange-400 transition-colors">
                                                {challenge.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                                {challenge.description}
                                            </p>

                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1">
                                                        <Star className="w-3.5 h-3.5 text-yellow-400" />
                                                        {challenge.points} pts
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-3.5 h-3.5" />
                                                        {challenge.solves} solves
                                                    </span>
                                                </div>
                                                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange-400" />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default ChallengesPage;
