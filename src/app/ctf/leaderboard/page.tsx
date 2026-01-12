// app/ctf/leaderboard/page.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Crown, ArrowLeft, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { API_URL } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface LeaderboardEntry {
    rank: number;
    username: string;
    solves: number;
    points: number;
    lastSolveAt?: string; // For tie-breaking display
}

const ITEMS_PER_PAGE = 20;

const LeaderboardPage = () => {
    const { user } = useAuth();
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch(`${API_URL}/api/challenges/leaderboard`);
            const result = await response.json();

            if (result.success) {
                setLeaderboard(result.data);
            }
        } catch (error) {
            console.error('Failed to fetch leaderboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Crown className="w-6 h-6 text-yellow-400" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-400" />;
            case 3:
                return <Award className="w-6 h-6 text-amber-600" />;
            default:
                return <span className="text-gray-500 font-semibold">#{rank}</span>;
        }
    };

    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1:
                return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
            case 2:
                return 'bg-gradient-to-r from-gray-400/20 to-gray-600/20 border-gray-400/30';
            case 3:
                return 'bg-gradient-to-r from-amber-600/20 to-amber-800/20 border-amber-600/30';
            default:
                return 'bg-white/5 border-white/10';
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto">
                    <Link
                        href="/ctf"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Challenges
                    </Link>

                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                            <Trophy className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-400">Global Rankings</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            <span className="gradient-text">Leaderboard</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Top hackers ranked by points earned from solving CTF challenges
                        </p>
                    </div>
                </div>
            </section>

            {/* Leaderboard */}
            <section className="px-4 sm:px-6 pb-20">
                <div className="max-w-4xl mx-auto">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : leaderboard.length === 0 ? (
                        <div className="text-center py-20">
                            <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No rankings yet. Be the first to solve challenges!</p>
                        </div>
                    ) : (
                        <>
                            {/* Top 3 Podium */}
                            {leaderboard.length >= 3 && (
                                <div className="flex items-end justify-center gap-4 mb-12">
                                    {/* 2nd Place */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-b from-gray-400 to-gray-600 flex items-center justify-center mb-2">
                                            <span className="text-2xl font-bold text-white">2</span>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-semibold text-white mb-1">{leaderboard[1].username}</div>
                                            <div className="text-orange-500 font-bold">{leaderboard[1].points} pts</div>
                                            <div className="text-xs text-gray-500">{leaderboard[1].solves} solves</div>
                                        </div>
                                    </div>

                                    {/* 1st Place */}
                                    <div className="flex flex-col items-center -mt-8">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500 flex items-center justify-center mb-2 ring-4 ring-yellow-500/20">
                                            <Crown className="w-10 h-10 text-white" />
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-white text-lg mb-1">{leaderboard[0].username}</div>
                                            <div className="text-orange-500 font-bold text-xl">{leaderboard[0].points} pts</div>
                                            <div className="text-sm text-gray-400">{leaderboard[0].solves} solves</div>
                                        </div>
                                    </div>

                                    {/* 3rd Place */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-600 to-amber-800 flex items-center justify-center mb-2">
                                            <span className="text-2xl font-bold text-white">3</span>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-semibold text-white mb-1">{leaderboard[2].username}</div>
                                            <div className="text-orange-500 font-bold">{leaderboard[2].points} pts</div>
                                            <div className="text-xs text-gray-500">{leaderboard[2].solves} solves</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Full Rankings */}
                            <div className="space-y-2">
                                {leaderboard
                                    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                                    .map((entry) => {
                                        const isCurrentUser = user && (user as { username?: string }).username === entry.username;

                                        return (
                                            <div
                                                key={entry.rank}
                                                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${isCurrentUser
                                                        ? 'bg-orange-500/10 border-orange-500/30 ring-1 ring-orange-500/20'
                                                        : getRankColor(entry.rank)
                                                    }`}
                                            >
                                                <div className="flex items-center justify-center w-12 shrink-0">
                                                    {getRankIcon(entry.rank)}
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-white">{entry.username}</span>
                                                        {isCurrentUser && (
                                                            <span className="text-xs px-1.5 py-0.5 bg-orange-500/20 text-orange-400 rounded">You</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                                        <span>{entry.solves} challenges solved</span>
                                                        {entry.lastSolveAt && (
                                                            <span className="flex items-center gap-1 text-xs text-gray-500">
                                                                <Clock className="w-3 h-3" />
                                                                {new Date(entry.lastSolveAt).toLocaleDateString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-orange-500">{entry.points}</div>
                                                    <div className="text-xs text-gray-500">points</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>

                            {/* Pagination */}
                            {leaderboard.length > ITEMS_PER_PAGE && (
                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                                    <span className="text-sm text-gray-500">
                                        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, leaderboard.length)} of {leaderboard.length}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Prev
                                        </button>
                                        <span className="text-sm text-gray-400">
                                            Page {currentPage} of {Math.ceil(leaderboard.length / ITEMS_PER_PAGE)}
                                        </span>
                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(Math.ceil(leaderboard.length / ITEMS_PER_PAGE), p + 1))}
                                            disabled={currentPage >= Math.ceil(leaderboard.length / ITEMS_PER_PAGE)}
                                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LeaderboardPage;
