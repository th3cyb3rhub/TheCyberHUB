'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Flame, Trophy, Calendar, Zap, Loader2, CheckCircle } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface ActivityEntry {
    date: string;
    actions: string[];
    xpEarned: number;
}

interface StreakData {
    currentStreak: number;
    longestStreak: number;
    totalActiveDays: number;
    lastActiveDate: string | null;
    activityLog: ActivityEntry[];
    totalXpFromEngagement: number;
    checkedInToday: boolean;
}

export default function StreakWidget() {
    const { user } = useAuth();
    const [streak, setStreak] = useState<StreakData | null>(null);
    const [loading, setLoading] = useState(true);
    const [checkingIn, setCheckingIn] = useState(false);
    const [justCheckedIn, setJustCheckedIn] = useState(false);
    const [xpAnimation, setXpAnimation] = useState<number | null>(null);

    const fetchStreak = useCallback(async () => {
        try {
            const data = await fetchApi('/api/streak/me');
            setStreak(data.data);
        } catch (err) {
            console.error('Failed to fetch streak:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) fetchStreak();
    }, [user, fetchStreak]);

    const handleCheckIn = async () => {
        if (checkingIn || streak?.checkedInToday) return;
        setCheckingIn(true);
        try {
            const data = await fetchApi('/api/streak/checkin', {
                method: 'POST',
                body: JSON.stringify({ action: 'login' }),
            });
            if (data.data.xpAwarded > 0) {
                setXpAnimation(data.data.xpAwarded);
                setTimeout(() => setXpAnimation(null), 2000);
            }
            setJustCheckedIn(true);
            fetchStreak();
        } catch (err) {
            console.error('Check-in failed:', err);
        } finally {
            setCheckingIn(false);
        }
    };

    // Generate heatmap data for last 12 weeks (84 days)
    const generateHeatmap = () => {
        const days: { date: string; level: number }[] = [];
        const activityMap = new Map<string, number>();
        streak?.activityLog.forEach((e) => {
            activityMap.set(e.date, e.actions.length);
        });

        const today = new Date();
        for (let i = 83; i >= 0; i--) {
            const d = new Date(today);
            d.setUTCDate(d.getUTCDate() - i);
            const dateStr = d.toISOString().slice(0, 10);
            const actionCount = activityMap.get(dateStr) || 0;
            const level = actionCount === 0 ? 0 : actionCount === 1 ? 1 : actionCount <= 3 ? 2 : 3;
            days.push({ date: dateStr, level });
        }
        return days;
    };

    if (!user) return null;

    if (loading) {
        return (
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex items-center justify-center h-48">
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
            </div>
        );
    }

    const heatmap = generateHeatmap();
    const checkedIn = streak?.checkedInToday || justCheckedIn;
    const currentStreak = streak?.currentStreak || 0;
    const longestStreak = streak?.longestStreak || 0;

    const heatColors = [
        'bg-white/[0.03]',      // level 0 — no activity
        'bg-orange-500/20',     // level 1 — light
        'bg-orange-500/50',     // level 2 — medium
        'bg-orange-500',        // level 3 — heavy
    ];

    return (
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            {/* XP popup animation */}
            {xpAnimation && (
                <div className="absolute top-4 right-4 text-orange-400 font-bold text-lg animate-bounce">
                    +{xpAnimation} XP
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${currentStreak > 0
                            ? 'bg-gradient-to-br from-orange-500 to-red-500'
                            : 'bg-white/5'
                        }`}>
                        <Flame className={`w-5 h-5 ${currentStreak > 0 ? 'text-white' : 'text-gray-500'}`} />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm">Daily Streak</h3>
                        <p className="text-gray-500 text-xs">Keep your streak alive!</p>
                    </div>
                </div>

                {/* Check-in button */}
                <button
                    onClick={handleCheckIn}
                    disabled={checkedIn || checkingIn}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${checkedIn
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20 cursor-default'
                            : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40'
                        }`}
                >
                    {checkingIn ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : checkedIn ? (
                        <span className="flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4" /> Done
                        </span>
                    ) : (
                        'Check In'
                    )}
                </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-orange-400">{currentStreak}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Current</div>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="text-2xl font-bold text-white">{longestStreak}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">Best</div>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span className="text-2xl font-bold text-white">{streak?.totalActiveDays || 0}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">Total Days</div>
                </div>
            </div>

            {/* Activity Heatmap */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs text-gray-500">Last 12 weeks</span>
                </div>
                <div className="grid grid-cols-12 gap-1">
                    {/* Group by weeks (columns) */}
                    {Array.from({ length: 12 }, (_, weekIdx) => (
                        <div key={weekIdx} className="flex flex-col gap-1">
                            {Array.from({ length: 7 }, (_, dayIdx) => {
                                const idx = weekIdx * 7 + dayIdx;
                                if (idx >= heatmap.length) return <div key={dayIdx} className="w-full aspect-square" />;
                                const day = heatmap[idx];
                                return (
                                    <div
                                        key={dayIdx}
                                        className={`w-full aspect-square rounded-sm ${heatColors[day.level]} transition-colors`}
                                        title={`${day.date}: ${day.level > 0 ? 'Active' : 'No activity'}`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-1.5 mt-2 justify-end">
                    <span className="text-[10px] text-gray-600">Less</span>
                    {heatColors.map((c, i) => (
                        <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
                    ))}
                    <span className="text-[10px] text-gray-600">More</span>
                </div>
            </div>
        </div>
    );
}
