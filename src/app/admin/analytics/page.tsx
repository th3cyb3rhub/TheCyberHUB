'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchApi, tokenStore } from '@/lib/api';
import {
    Loader2,
    ArrowLeft,
    TrendingUp,
    Users,
    Trophy,
    BarChart3,
    Activity,
    Calendar,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const AnalyticsChart = dynamic(() => import('@/components/charts/AnalyticsChart'), { ssr: false });

interface UserGrowth {
    _id: string; // date string YYYY-MM-DD
    count: number;
}

interface CategoryStat {
    _id: string;
    count: number;
    solves: number;
}

interface DifficultyStat {
    _id: string;
    count: number;
}

interface TopSolver {
    _id: string;
    username: string;
    name: string;
    stats: {
        challengesSolved: number;
        points: number;
    };
}

interface AnalyticsData {
    userGrowth: UserGrowth[];
    challengesByCategory: CategoryStat[];
    challengesByDifficulty: DifficultyStat[];
    topSolvers: TopSolver[];
    recentActivity: Array<{
        _id: string;
        action: string;
        actor?: { username?: string };
        timestamp: string;
    }>;
    timeframe: string;
}

const TIMEFRAMES = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
];

const DIFFICULTY_COLORS: Record<string, string> = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-orange-500',
    expert: 'bg-red-500',
    insane: 'bg-purple-500',
};

function formatAction(action: string): string {
    return action.split('.').map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/_/g, ' ')).join(' → ');
}

function timeAgo(date: string): string {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

export default function AdminAnalyticsPage() {
    const { user: currentUser, loading: authLoading } = useAuth();
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [timeframe, setTimeframe] = useState('30d');

    const token = tokenStore.get();

    const fetchAnalytics = useCallback(async (tf: string) => {
        if (!token) return;
        setLoading(true);
        try {
            const json = await fetchApi(`/api/admin/analytics?timeframe=${tf}`);
            setData(json.data);
        } catch {
            console.error('Failed to fetch analytics');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (!authLoading && currentUser) fetchAnalytics(timeframe);
    }, [authLoading, currentUser, timeframe, fetchAnalytics]);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!currentUser || !['admin', 'owner'].includes(currentUser.role)) return null;

    const totalNewUsers = data?.userGrowth.reduce((sum, d) => sum + d.count, 0) || 0;

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Analytics</h1>
                        </div>
                        <div className="flex gap-2">
                            {TIMEFRAMES.map(tf => (
                                <button
                                    key={tf.value}
                                    onClick={() => setTimeframe(tf.value)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${timeframe === tf.value
                                        ? 'border-orange-500/50 bg-orange-500/10 text-orange-400'
                                        : 'border-white/10 bg-white/5 text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    {tf.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>
                ) : data ? (
                    <div className="space-y-8">
                        {/* User Growth Chart */}
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-green-400" />
                                    <h2 className="text-lg font-semibold text-white">User Growth</h2>
                                </div>
                                <span className="text-sm text-green-400 font-medium">+{totalNewUsers} new users</span>
                            </div>
                            {data.userGrowth.length > 0 ? (
                                <AnalyticsChart data={data.userGrowth} />
                            ) : (
                                <div className="text-center py-10 text-gray-600">No user registrations in this period</div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Challenges by Category */}
                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <BarChart3 className="w-5 h-5 text-blue-400" />
                                    <h2 className="text-lg font-semibold text-white">Challenges by Category</h2>
                                </div>
                                {data.challengesByCategory.length > 0 ? (
                                    <div className="space-y-3">
                                        {data.challengesByCategory.map(cat => {
                                            const maxCount = Math.max(...data.challengesByCategory.map(c => c.count), 1);
                                            return (
                                                <div key={cat._id}>
                                                    <div className="flex items-center justify-between text-sm mb-1">
                                                        <span className="text-gray-300 capitalize">{cat._id || 'Uncategorized'}</span>
                                                        <span className="text-gray-500">{cat.count} challenges · {cat.solves} solves</span>
                                                    </div>
                                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: `${(cat.count / maxCount) * 100}%` }} />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-600">No challenge data</div>
                                )}
                            </div>

                            {/* Challenges by Difficulty */}
                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Activity className="w-5 h-5 text-purple-400" />
                                    <h2 className="text-lg font-semibold text-white">Difficulty Distribution</h2>
                                </div>
                                {data.challengesByDifficulty.length > 0 ? (
                                    <div className="space-y-3">
                                        {data.challengesByDifficulty.map(diff => (
                                            <div key={diff._id} className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${DIFFICULTY_COLORS[diff._id?.toLowerCase()] || 'bg-gray-500'}`} />
                                                <span className="text-sm text-gray-300 capitalize flex-1">{diff._id || 'Unknown'}</span>
                                                <span className="text-sm text-gray-500 font-medium">{diff.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-600">No difficulty data</div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Top Solvers */}
                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Trophy className="w-5 h-5 text-yellow-400" />
                                    <h2 className="text-lg font-semibold text-white">Top Solvers</h2>
                                </div>
                                {data.topSolvers.length > 0 ? (
                                    <div className="space-y-2">
                                        {data.topSolvers.map((solver, i) => (
                                            <div key={solver._id} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                                    i === 1 ? 'bg-gray-400/20 text-gray-400' :
                                                        i === 2 ? 'bg-orange-700/20 text-orange-400' :
                                                            'bg-white/5 text-gray-600'
                                                    }`}>{i + 1}</span>
                                                <span className="text-sm text-white flex-1">{solver.username}</span>
                                                <span className="text-xs text-gray-500">{solver.stats.challengesSolved} solved</span>
                                                <span className="text-xs text-orange-400 font-medium">{solver.stats.points} pts</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-600">No solvers yet</div>
                                )}
                            </div>

                            {/* Recent Activity */}
                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Calendar className="w-5 h-5 text-indigo-400" />
                                    <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                                </div>
                                {data.recentActivity.length > 0 ? (
                                    <div className="space-y-2">
                                        {data.recentActivity.map(act => (
                                            <div key={act._id} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                                                <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
                                                <span className="text-sm text-gray-300 flex-1 truncate">{formatAction(act.action)}</span>
                                                {act.actor?.username && <span className="text-xs text-gray-600">{act.actor.username}</span>}
                                                <span className="text-xs text-gray-600 flex-shrink-0">{timeAgo(act.timestamp)}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-600">No recent activity</div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">Failed to load analytics</div>
                )}
            </div>
        </div>
    );
}
