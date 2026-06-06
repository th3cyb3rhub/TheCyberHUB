"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';
import {
    Trophy,
    Flag,
    Calendar,
    Users,
    Clock,
    Lock,
    Loader2,
    AlertCircle,
    RefreshCw,
    ArrowRight,
    Zap,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface Competition {
    _id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription: string;
    image: string | null;
    startDate: string;
    endDate: string;
    status: 'draft' | 'upcoming' | 'live' | 'ended' | 'cancelled';
    teamsEnabled: boolean;
    maxTeamSize: number;
    scoringMode: string;
    registrationOpen: boolean;
    isFeatured: boolean;
}

const STATUS_STYLES: Record<string, { label: string; class: string }> = {
    live: { label: 'Live Now', class: 'bg-green-500/20 text-green-400 border-green-500/30' },
    upcoming: { label: 'Upcoming', class: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    ended: { label: 'Ended', class: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
    cancelled: { label: 'Cancelled', class: 'bg-red-500/20 text-red-400 border-red-500/30' },
    draft: { label: 'Draft', class: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
};

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDuration(start: string, end: string) {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.round(diff / 3600000);
    if (hours < 24) return `${hours}h`;
    const days = Math.round(diff / 86400000);
    return `${days}d`;
}

function timeUntil(startDate: string) {
    const diff = new Date(startDate).getTime() - Date.now();
    if (diff <= 0) return null;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    if (days > 0) return `Starts in ${days}d ${hours}h`;
    return `Starts in ${hours}h`;
}

export default function CompetitionsPage() {
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['ctf-competitions', statusFilter],
        queryFn: async () => {
            const params = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
            const res = await fetchApi(`/api/ctf-competitions${params}`, { requireAuth: false });
            return res.data as Competition[];
        },
        staleTime: 60 * 1000,
    });

    const competitions = data || [];

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative pt-28 pb-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <Breadcrumbs items={[{ label: 'CTF', href: '/ctf' }, { label: 'Competitions' }]} />

                    <div className="mt-8 mb-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                <Trophy className="w-6 h-6 text-orange-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-white">CTF Competitions</h1>
                        </div>
                        <p className="text-gray-400 ml-14">
                            Timed competitions with per-event leaderboards. Solo or team play.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 mb-8 flex-wrap">
                        {['all', 'live', 'upcoming', 'ended'].map(s => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                className={`px-4 py-2 rounded-lg text-sm border transition-colors capitalize ${
                                    statusFilter === s
                                        ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                                }`}
                            >
                                {s === 'all' ? 'All' : STATUS_STYLES[s]?.label || s}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                        </div>
                    ) : isError ? (
                        <div className="text-center py-20">
                            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                            <p className="text-gray-400 mb-4">Failed to load competitions</p>
                            <button
                                onClick={() => refetch()}
                                className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors mx-auto"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Retry
                            </button>
                        </div>
                    ) : competitions.length === 0 ? (
                        <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">No competitions yet</h3>
                            <p className="text-gray-400">Check back soon — competitions will be announced here.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2">
                            {competitions.map(comp => {
                                const s = STATUS_STYLES[comp.status] || STATUS_STYLES.ended;
                                const countdown = comp.status === 'upcoming' ? timeUntil(comp.startDate) : null;
                                return (
                                    <Link
                                        key={comp._id}
                                        href={`/ctf/competitions/${comp.slug}`}
                                        className="group block rounded-2xl border border-white/10 bg-white/[0.02] hover:border-orange-500/30 hover:bg-orange-500/5 transition-all p-6"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <span className={`px-2.5 py-1 text-xs rounded-full border ${s.class}`}>
                                                {comp.status === 'live' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse" />}
                                                {s.label}
                                            </span>
                                            {comp.isFeatured && (
                                                <span className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                                    <Zap className="w-3 h-3" />
                                                    Featured
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors mb-2">
                                            {comp.title}
                                        </h2>

                                        {comp.shortDescription && (
                                            <p className="text-sm text-gray-400 line-clamp-2 mb-4">{comp.shortDescription}</p>
                                        )}

                                        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(comp.startDate)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {formatDuration(comp.startDate, comp.endDate)}
                                            </span>
                                            {comp.teamsEnabled && (
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-3.5 h-3.5" />
                                                    Teams (max {comp.maxTeamSize})
                                                </span>
                                            )}
                                            {!comp.teamsEnabled && (
                                                <span className="flex items-center gap-1">
                                                    <Flag className="w-3.5 h-3.5" />
                                                    Solo
                                                </span>
                                            )}
                                        </div>

                                        {countdown && (
                                            <p className="text-xs text-blue-400 mb-3 flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {countdown}
                                            </p>
                                        )}

                                        {!comp.registrationOpen && comp.status !== 'ended' && (
                                            <p className="text-xs text-yellow-400 flex items-center gap-1 mb-3">
                                                <Lock className="w-3.5 h-3.5" />
                                                Registration closed
                                            </p>
                                        )}

                                        <div className="flex items-center justify-end">
                                            <span className="text-xs text-orange-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                                                View details <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
