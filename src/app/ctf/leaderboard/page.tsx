"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Crown, Medal, ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { fetchApi } from '@/lib/api';

interface LeaderboardEntry {
    _id: string;
    username: string;
    avatar?: string;
    totalPoints: number;
    solveCount: number;
}

export default function CTFLeaderboardPage() {
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await fetchApi('/api/challenges/leaderboard', { requireAuth: false });
                if (data.success) {
                    setEntries(data.data || []);
                }
            } catch (error) {
                console.error('Failed to fetch leaderboard:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    const getRankIcon = (index: number) => {
        if (index === 0) return <Crown className="w-6 h-6 text-yellow-400" />;
        if (index === 1) return <Medal className="w-6 h-6 text-gray-300" />;
        if (index === 2) return <Medal className="w-6 h-6 text-orange-500" />;
        return null;
    };

    const podiumColors = [
        'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30',
        'from-gray-400/20 to-gray-400/5 border-gray-400/30',
        'from-orange-600/20 to-orange-600/5 border-orange-600/30',
    ];

    // Loading Skeleton
    if (loading) {
        return (
            <div className="min-h-screen bg-black animate-pulse">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20 space-y-8">
                    <div className="h-4 bg-gray-800 rounded w-32"></div>
                    <div className="text-center space-y-4">
                        <div className="h-12 bg-gray-800 rounded w-64 mx-auto"></div>
                        <div className="h-5 bg-gray-800 rounded w-96 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-48 bg-gray-800 rounded-2xl"></div>
                        ))}
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5, 6, 7].map(i => (
                            <div key={i} className="h-16 bg-gray-800 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const top3 = entries.slice(0, 3);
    const rest = entries.slice(3);

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <section className="relative pt-32 pb-12 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="relative max-w-4xl mx-auto">
                    <Link href="/ctf" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Challenges
                    </Link>

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-yellow-500/20 bg-yellow-500/10">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-yellow-400 font-medium">CTF Leaderboard</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Hackers</span>
                        </h1>
                        <p className="text-gray-400 max-w-lg mx-auto">
                            The best cybersecurity minds competing on TheCyberHub CTF challenges.
                        </p>
                    </div>

                    {/* Podium */}
                    {top3.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
                            {/* Reorder: 2nd, 1st, 3rd for visual podium */}
                            {[top3[1], top3[0], top3[2]].filter(Boolean).map((entry, displayIdx) => {
                                const actualRank = displayIdx === 0 ? 1 : displayIdx === 1 ? 0 : 2;
                                const isFirst = actualRank === 0;
                                return (
                                    <div key={entry._id}
                                        className={`relative p-6 rounded-2xl border bg-gradient-to-b text-center ${podiumColors[actualRank]} ${isFirst ? 'transform -translate-y-4' : ''}`}
                                    >
                                        <div className="mb-3 flex justify-center">
                                            {getRankIcon(actualRank)}
                                        </div>
                                        <div className={`w-16 h-16 mx-auto rounded-full bg-white/10 border-2 flex items-center justify-center text-2xl font-bold mb-3 ${isFirst ? 'border-yellow-500 text-yellow-400' : actualRank === 1 ? 'border-gray-400 text-gray-300' : 'border-orange-500 text-orange-400'}`}>
                                            {entry.avatar ? (
                                                <Image src={entry.avatar} alt={entry.username} width={64} height={64} className="w-full h-full object-cover rounded-full" unoptimized />
                                            ) : (
                                                entry.username[0].toUpperCase()
                                            )}
                                        </div>
                                        <p className="text-white font-semibold text-sm truncate">{entry.username}</p>
                                        <p className={`text-lg font-bold mt-1 ${isFirst ? 'text-yellow-400' : actualRank === 1 ? 'text-gray-300' : 'text-orange-400'}`}>
                                            {entry.totalPoints} pts
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{entry.solveCount} solves</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Rankings Table */}
                    {rest.length > 0 && (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                            <div className="grid grid-cols-[60px_1fr_100px_100px] gap-4 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-white/5">
                                <span>Rank</span>
                                <span>Player</span>
                                <span className="text-right">Points</span>
                                <span className="text-right">Solves</span>
                            </div>
                            <div className="divide-y divide-white/5">
                                {rest.map((entry, i) => (
                                    <div key={entry._id} className="grid grid-cols-[60px_1fr_100px_100px] gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">
                                        <span className="text-gray-500 font-mono text-sm">#{i + 4}</span>
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm text-gray-400 shrink-0">
                                                {entry.avatar ? (
                                                    <Image src={entry.avatar} alt={entry.username} width={32} height={32} className="w-full h-full object-cover rounded-full" unoptimized />
                                                ) : (
                                                    entry.username[0].toUpperCase()
                                                )}
                                            </div>
                                            <span className="text-white text-sm truncate">{entry.username}</span>
                                        </div>
                                        <span className="text-orange-400 font-semibold text-sm text-right">{entry.totalPoints}</span>
                                        <span className="text-gray-400 text-sm text-right">{entry.solveCount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {entries.length === 0 && (
                        <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">No solves yet</h3>
                            <p className="text-gray-400 mb-6">Be the first to solve a challenge and claim the top spot!</p>
                            <Link href="/ctf" className="text-orange-400 hover:text-orange-300 text-sm">
                                Browse Challenges →
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
