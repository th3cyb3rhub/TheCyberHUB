"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    LayoutDashboard,
    Wrench,
    BookOpen,
    Map,
    Calendar,
    Clock,
    ArrowRight,
    Search,
    Key,
    Globe,
    Terminal,
    Hash,
    Shield,
    Code,
    TrendingUp,
    Star,
    ChevronRight,
    Flag,
} from 'lucide-react';
import { SkeletonDashboard } from '@/components/ui/Skeleton';
import { API_URL } from '@/lib/api';

interface ChallengeSummary {
    _id: string;
    title: string;
    slug: string;
    difficulty?: string;
    points: number;
}

// Quick access tools data
const quickTools = [
    { id: 'google-dork', name: 'Google Dork', href: '/tools/google-dork', icon: Search, color: 'from-blue-500 to-blue-600' },
    { id: 'jwt-analyzer', name: 'JWT Analyzer', href: '/tools/jwt-analyzer', icon: Key, color: 'from-purple-500 to-purple-600' },
    { id: 'subfinder', name: 'Subfinder', href: '/tools/subfinder', icon: Globe, color: 'from-green-500 to-green-600' },
    { id: 'encoder-decoder', name: 'Encoder/Decoder', href: '/tools/encoder-decoder', icon: Terminal, color: 'from-orange-500 to-orange-600' },
    { id: 'hash-analyzer', name: 'Hash Analyzer', href: '/tools/hash-analyzer', icon: Hash, color: 'from-pink-500 to-pink-600' },
    { id: 'password-generator', name: 'Password Gen', href: '/tools/password-generator', icon: Key, color: 'from-cyan-500 to-cyan-600' },
];

// Learning resources
const learningResources = [
    { title: 'Cybersecurity Roadmap', href: '/roadmaps', icon: Map, description: 'Start your security journey' },
    { title: 'Cheatsheets', href: '/cheatsheets', icon: BookOpen, description: 'Quick reference guides' },
    { title: 'Security Tools', href: '/tools', icon: Wrench, description: 'Explore all 15+ tools' },
    { title: 'Labs (Coming Soon)', href: '/labs', icon: Shield, description: 'Hands-on practice environments' },
];

// Stats cards
const statsConfig = [
    { label: 'Challenges Solved', icon: Flag, color: 'text-green-400' },
    { label: 'CTF Points', icon: Star, color: 'text-yellow-400' },
    { label: 'Days Active', icon: Calendar, color: 'text-blue-500' },
    { label: 'Events Attended', icon: Calendar, color: 'text-purple-400' },
];

const DashboardPage = () => {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [greeting, setGreeting] = useState('');
    const [recentChallenges, setRecentChallenges] = useState<ChallengeSummary[]>([]);
    const [activityLoading, setActivityLoading] = useState(true);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
    }, []);

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth');
        }
    }, [loading, user, router]);

    // Load recent challenges
    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const challengesRes = await fetch(`${API_URL}/api/challenges?limit=3`);

                if (challengesRes.ok) {
                    const json = await challengesRes.json();
                    const rawChallenges = Array.isArray(json)
                        ? json
                        : Array.isArray(json.data)
                            ? json.data
                            : [];

                    const mapped: ChallengeSummary[] = rawChallenges
                        .slice(0, 3)
                        .map((c: { _id: string; title: string; slug: string; difficulty: string; currentPoints?: number; basePoints?: number; points?: number }) => ({
                            _id: c._id,
                            title: c.title,
                            slug: c.slug,
                            difficulty: c.difficulty,
                            points: c.currentPoints ?? c.basePoints ?? c.points ?? 0,
                        }));

                    setRecentChallenges(mapped);
                }
            } catch (error) {
                console.error('Failed to load dashboard activity:', error);
            } finally {
                setActivityLoading(false);
            }
        };

        fetchActivity();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <SkeletonDashboard />
                </div>
            </div>
        );
    }

    if (!user) return null;

    // Calculate days since account creation
    const daysSinceCreation = user.createdAt
        ? Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) + 1
        : 1;

    const challengesSolved = user.stats?.challengesSolved ?? 0;
    const ctfPoints = user.stats?.points ?? 0;
    const eventsAttended = user.stats?.eventsAttended ?? 0;

    const stats = [
        { ...statsConfig[0], value: challengesSolved.toString() },
        { ...statsConfig[1], value: ctfPoints.toString() },
        { ...statsConfig[2], value: daysSinceCreation.toString() },
        { ...statsConfig[3], value: eventsAttended.toString() },
    ];

    return (
        <div className="min-h-screen bg-black">
            {/* Background effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/8 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                            {greeting}, <span className="gradient-text">{user.name.split(' ')[0]}</span>
                        </h1>
                        <p className="text-gray-400">
                            Welcome to your security workspace. Pick up where you left off.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                    <TrendingUp className="w-4 h-4 text-gray-600" />
                                </div>
                                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Quick Access Tools */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Wrench className="w-5 h-5 text-orange-500" />
                                    Quick Access Tools
                                </h2>
                                <Link
                                    href="/tools"
                                    className="text-sm text-gray-400 hover:text-orange-400 flex items-center gap-1 transition-colors"
                                >
                                    View all
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {quickTools.map((tool) => (
                                    <Link
                                        key={tool.id}
                                        href={tool.href}
                                        className="group p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-orange-500/40 hover:bg-gradient-to-b hover:from-orange-500/5 hover:to-transparent transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg`}>
                                                <tool.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-medium truncate group-hover:text-orange-400 transition-colors">
                                                    {tool.name}
                                                </p>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Learning Resources */}
                        <div>
                            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                                <BookOpen className="w-5 h-5 text-blue-500" />
                                Continue Learning
                            </h2>
                            <div className="space-y-3">
                                {learningResources.map((resource, i) => (
                                    <Link
                                        key={i}
                                        href={resource.href}
                                        className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-orange-500/10 transition-colors">
                                            <resource.icon className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-medium group-hover:text-orange-400 transition-colors">
                                                {resource.title}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {resource.description}
                                            </p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-orange-500 transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity / Getting Started */}
                    <div className="mt-10">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                            <Clock className="w-5 h-5 text-green-500" />
                            Getting Started
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <GettingStartedCard
                                title="Complete your profile"
                                description="Add more details to your profile"
                                href="/profile"
                                icon={Shield}
                                completed={!!user.name && !!user.username}
                            />
                            <GettingStartedCard
                                title="Try a security tool"
                                description="Explore our free security tools"
                                href="/tools"
                                icon={Wrench}
                                completed={false}
                            />
                            <GettingStartedCard
                                title="View a roadmap"
                                description="Start your learning journey"
                                href="/roadmaps"
                                icon={Map}
                                completed={false}
                            />
                            <GettingStartedCard
                                title="Check cheatsheets"
                                description="Quick reference guides"
                                href="/cheatsheets"
                                icon={Code}
                                completed={false}
                            />
                        </div>
                    </div>

                    {/* Challenges */}
                    <div className="mt-10">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Flag className="w-5 h-5 text-green-400" />
                                    Active Challenges
                                </h2>
                                <Link
                                    href="/challenges"
                                    className="text-sm text-gray-400 hover:text-orange-400 flex items-center gap-1 transition-colors"
                                >
                                    View all
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {activityLoading ? (
                                <p className="text-sm text-gray-500">Loading challenges...</p>
                            ) : recentChallenges.length === 0 ? (
                                <p className="text-sm text-gray-500">No challenges available yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentChallenges.map((challenge) => (
                                        <Link
                                            key={challenge._id}
                                            href={`/challenges/${challenge.slug}`}
                                            className="group flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-orange-500/40 hover:bg-orange-500/5 transition-all"
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center">
                                                <Flag className="w-4 h-4 text-green-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate group-hover:text-orange-400 transition-colors">
                                                    {challenge.title}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {challenge.difficulty ? challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1) : 'Challenge'}
                                                    {' • '}
                                                    {challenge.points} pts
                                                </p>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-orange-500 transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-10 p-6 rounded-2xl border border-white/10 bg-gradient-to-r from-orange-500/5 to-transparent">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">
                                    Need help getting started?
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Check out our cybersecurity roadmap for beginners
                                </p>
                            </div>
                            <Link
                                href="/roadmaps"
                                className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                            >
                                View Roadmaps
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Getting Started Card Component
const GettingStartedCard = ({
    title,
    description,
    href,
    icon: Icon,
    completed,
}: {
    title: string;
    description: string;
    href: string;
    icon: React.ElementType;
    completed: boolean;
}) => (
    <Link
        href={href}
        className={`group p-4 rounded-xl border transition-all ${
            completed
                ? 'border-green-500/30 bg-green-500/5'
                : 'border-white/10 bg-white/[0.02] hover:border-orange-500/40'
        }`}
    >
        <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                completed ? 'bg-green-500/20' : 'bg-white/5 group-hover:bg-orange-500/10'
            } transition-colors`}>
                {completed ? (
                    <Star className="w-4 h-4 text-green-500" />
                ) : (
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className={`font-medium mb-0.5 ${completed ? 'text-green-400' : 'text-white group-hover:text-orange-400'} transition-colors`}>
                    {title}
                </p>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
        </div>
    </Link>
);

export default DashboardPage;
