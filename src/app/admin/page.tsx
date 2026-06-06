'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
    Calendar,
    BookOpen,
    ClipboardList,
    Users,
    Settings,
    Loader2,
    ArrowRight,
    Shield,
    ShieldCheck,
    ShieldAlert,
    Crown,
    Flag,
    TrendingUp,
    MessageSquare,
    Clock,
    Target,
    BarChart3,
    HardDrive
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

type MinRole = 'moderator' | 'admin' | 'owner';

const ROLE_LEVEL: Record<string, number> = {
    user: 0,
    moderator: 1,
    admin: 2,
    owner: 3,
};

const adminSections = [
    {
        title: 'Users',
        description: 'View users, ban/unban, and manage roles',
        icon: Users,
        href: '/admin/users',
        color: 'from-green-500 to-emerald-500',
        minRole: 'moderator' as MinRole,
    },
    {
        title: 'Blog Posts',
        description: 'Moderate and manage blog articles',
        icon: BookOpen,
        href: '/admin/blogs',
        color: 'from-blue-500 to-cyan-500',
        minRole: 'moderator' as MinRole,
    },
    {
        title: 'Forum',
        description: 'Pin, lock, and moderate discussions',
        icon: MessageSquare,
        href: '/admin/forum',
        color: 'from-purple-500 to-pink-500',
        minRole: 'moderator' as MinRole,
    },
    {
        title: 'Events',
        description: 'Create and manage community events',
        icon: Calendar,
        href: '/admin/events',
        color: 'from-orange-500 to-red-500',
        minRole: 'admin' as MinRole,
    },
    {
        title: 'CTF Challenges',
        description: 'Manage CTF challenges, flags, and scoring',
        icon: Flag,
        href: '/admin/challenges',
        color: 'from-yellow-500 to-amber-500',
        minRole: 'admin' as MinRole,
    },
    {
        title: 'OVA Manager',
        description: 'Direct-to-S3 massive file uploads and AWS VM imports',
        icon: HardDrive,
        href: '/admin/ova-manager',
        color: 'from-cyan-500 to-blue-600',
        minRole: 'admin' as MinRole,
    },
    {
        title: 'Analytics',
        description: 'User growth, challenge stats, and leaderboards',
        icon: TrendingUp,
        href: '/admin/analytics',
        color: 'from-emerald-500 to-teal-600',
        minRole: 'admin' as MinRole,
    },
    {
        title: 'Audit Logs',
        description: 'View system activity and security events',
        icon: ClipboardList,
        href: '/admin/audit-logs',
        color: 'from-indigo-500 to-purple-600',
        minRole: 'admin' as MinRole,
    },
    {
        title: 'Internships',
        description: 'Manage community cohorts and applications',
        icon: Users,
        href: '/admin/internships',
        color: 'from-orange-500 to-amber-500',
        minRole: 'moderator' as MinRole,
    },
    {
        title: 'Moderation',
        description: 'Review flagged content and community reports',
        icon: Flag,
        href: '/admin/moderation',
        color: 'from-red-500 to-rose-600',
        minRole: 'moderator' as MinRole,
    },
    {
        title: 'Settings',
        description: 'Platform configuration and system settings',
        icon: Settings,
        href: '/admin/settings',
        color: 'from-gray-500 to-gray-600',
        minRole: 'owner' as MinRole,
    },
    {
        title: 'System Alerts',
        description: 'Publish platform-wide alert banners',
        icon: ShieldAlert,
        href: '/admin/alerts',
        color: 'from-orange-600 to-red-600',
        minRole: 'admin' as MinRole,
    },
];

const ROLE_BADGE: Record<string, { label: string; icon: typeof Shield; color: string }> = {
    owner: { label: 'Owner Panel', icon: Crown, color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
    admin: { label: 'Admin Panel', icon: ShieldAlert, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    moderator: { label: 'Moderator Panel', icon: ShieldCheck, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
};

interface AdminStats {
    totalUsers: number;
    recentUsers: number;
    totalChallenges: number;
    activeChallenges: number;
    totalEvents: number;
    upcomingEvents: number;
    totalSolves: number;
}

export default function AdminDashboard() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);

    const userRole = user?.role || 'user';
    const userLevel = ROLE_LEVEL[userRole] ?? 0;

    useEffect(() => {
        if (!loading && (!user || userLevel < ROLE_LEVEL.moderator)) {
            const redirectUrl = `${window.location.pathname}${window.location.search}`;
            router.push(`/auth?redirect=${encodeURIComponent(redirectUrl)}`);
        }
    }, [user, loading, router, userLevel]);

    useEffect(() => {
        const fetchStats = async () => {
            if (!user || userLevel < ROLE_LEVEL.moderator) return;
            try {
                const data = await fetchApi('/api/admin/stats');
                setStats(data.data);
            } catch (error) {
                console.error('Failed to fetch admin stats:', error);
            } finally {
                setStatsLoading(false);
            }
        };
        fetchStats();
    }, [user, userLevel]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user || userLevel < ROLE_LEVEL.moderator) {
        return null;
    }

    const visibleSections = adminSections.filter(
        (s) => userLevel >= ROLE_LEVEL[s.minRole]
    );

    const badge = ROLE_BADGE[userRole] || ROLE_BADGE.moderator;
    const BadgeIcon = badge.icon;

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${badge.color}`}>
                            <BadgeIcon className="w-3.5 h-3.5" />
                            {badge.label}
                        </span>
                    </div>
                    <p className="text-gray-400">Manage your platform content and settings</p>
                </div>

                {/* Admin Sections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visibleSections.map((section) => (
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

                {/* Stats Overview Visuals */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Users Stat */}
                    <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-sm font-medium text-gray-400">Total Users</span>
                            </div>
                            {stats?.recentUsers !== undefined && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                    <TrendingUp className="w-3 h-3" /> +{stats.recentUsers} this week
                                </span>
                            )}
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">
                            {statsLoading ? <Loader2 className="w-6 h-6 animate-spin text-green-500" /> : (stats?.totalUsers?.toLocaleString() ?? 0)}
                        </p>
                    </div>

                    {/* Challenges Stat */}
                    <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                    <Target className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-sm font-medium text-gray-400">Active Challenges</span>
                            </div>
                            <div className="flex items-end justify-between mb-2">
                                <p className="text-3xl font-bold text-white">
                                    {statsLoading ? <Loader2 className="w-6 h-6 animate-spin text-yellow-500" /> : (stats?.activeChallenges ?? 0)}
                                </p>
                                <span className="text-xs text-gray-500 mb-1">of {stats?.totalChallenges ?? 0} total</span>
                            </div>
                            {/* Progress bar */}
                            {!statsLoading && stats?.totalChallenges ? (
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-500 rounded-full"
                                        style={{ width: `${(stats.activeChallenges / stats.totalChallenges) * 100}%` }}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* Solves Stat */}
                    <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <BarChart3 className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-sm font-medium text-gray-400">Total Solves</span>
                        </div>
                        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            {statsLoading ? <Loader2 className="w-6 h-6 animate-spin text-blue-500" /> : (stats?.totalSolves?.toLocaleString() ?? 0)}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Platform wide success rate</p>
                    </div>

                    {/* Events Stat */}
                    <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-sm font-medium text-gray-400">Events</span>
                            </div>
                            {stats?.upcomingEvents ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                    <Clock className="w-3 h-3" /> {stats.upcomingEvents} upcoming
                                </span>
                            ) : null}
                        </div>
                        <div className="flex items-end gap-2">
                            <p className="text-3xl font-bold text-white">
                                {statsLoading ? <Loader2 className="w-6 h-6 animate-spin text-purple-500" /> : (stats?.totalEvents ?? 0)}
                            </p>
                            <span className="text-sm text-gray-500 mb-1">Total Hosted</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions — role-filtered */}
                <div className="mt-6 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-3">
                        {userLevel >= ROLE_LEVEL.admin && (
                            <Link
                                href="/admin/events/new"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-xl text-sm text-orange-400 font-medium transition-all"
                            >
                                <Calendar className="w-4 h-4" />
                                Create Event
                            </Link>
                        )}
                        <Link
                            href="/admin/users"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-xl text-sm text-green-400 font-medium transition-all"
                        >
                            <Users className="w-4 h-4" />
                            Manage Users
                        </Link>
                        {userLevel >= ROLE_LEVEL.owner && (
                            <Link
                                href="/admin/settings"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-gray-400 font-medium transition-all"
                            >
                                <Settings className="w-4 h-4" />
                                Settings
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
