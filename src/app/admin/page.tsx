'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
    Calendar,
    BookOpen,
    FileCode,
    Users,
    Settings,
    Loader2,
    ArrowRight,
    Shield,
    Flag,
    TrendingUp,
    Activity
} from 'lucide-react';
import { API_URL } from '@/lib/api';

const adminSections = [
    {
        title: 'Events',
        description: 'Manage community events, workshops, and CTFs',
        icon: Calendar,
        href: '/admin/events',
        color: 'from-orange-500 to-red-500',
    },
    {
        title: 'Blog Posts',
        description: 'Moderate and manage blog articles',
        icon: BookOpen,
        href: '/admin/blogs',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        title: 'Code Snippets',
        description: 'Manage code review challenges',
        icon: FileCode,
        href: '/admin/code-review',
        color: 'from-purple-500 to-pink-500',
    },
    {
        title: 'Users',
        description: 'Manage user accounts and roles',
        icon: Users,
        href: '/admin/users',
        color: 'from-green-500 to-emerald-500',
    },
    {
        title: 'CTF Challenges',
        description: 'Manage CTF challenges, flags, and scoring',
        icon: Flag,
        href: '/admin/challenges',
        color: 'from-yellow-500 to-amber-500',
    },
];

interface AdminStats {
    totalUsers: number;
    totalChallenges: number;
    activeChallenges: number;
    totalEvents: number;
    totalSolves: number;
}

export default function AdminDashboard() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            const redirectUrl = `${window.location.pathname}${window.location.search}`;
            router.push(`/auth?redirect=${encodeURIComponent(redirectUrl)}`);
        }
    }, [user, loading, router]);

    // Fetch admin stats
    useEffect(() => {
        const fetchStats = async () => {
            if (!user || user.role !== 'admin') return;
            try {
                const response = await fetch(`${API_URL}/api/admin/stats`, {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setStats(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch admin stats:', error);
            } finally {
                setStatsLoading(false);
            }
        };
        fetchStats();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return null;
    }

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                    </div>
                    <p className="text-gray-400">Manage your platform content and settings</p>
                </div>

                {/* Admin Sections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {adminSections.map((section) => (
                        <Link
                            key={section.title}
                            href={section.href}
                            className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-orange-500/30 transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shrink-0`}>
                                    <section.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
                                        {section.title}
                                    </h2>
                                    <p className="text-sm text-gray-400">{section.description}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Stats Overview */}
                <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-gray-500">Total Users</span>
                        </div>
                        <p className="text-2xl font-bold text-white">
                            {statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (stats?.totalUsers ?? 0)}
                        </p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <div className="flex items-center gap-2 mb-2">
                            <Flag className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-500">Active Challenges</span>
                        </div>
                        <p className="text-2xl font-bold text-white">
                            {statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (stats?.activeChallenges ?? 0)}
                        </p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-gray-500">Total Solves</span>
                        </div>
                        <p className="text-2xl font-bold text-white">
                            {statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (stats?.totalSolves ?? 0)}
                        </p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-gray-500">Total Events</span>
                        </div>
                        <p className="text-2xl font-bold text-white">
                            {statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (stats?.totalEvents ?? 0)}
                        </p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/admin/events/new"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-xl text-sm text-orange-400 font-medium transition-all"
                        >
                            <Calendar className="w-4 h-4" />
                            Create Event
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-gray-400 font-medium transition-all"
                        >
                            <Settings className="w-4 h-4" />
                            Settings
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
