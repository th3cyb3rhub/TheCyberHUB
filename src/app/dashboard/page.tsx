"use client"

import React, { useState, useEffect, lazy, Suspense } from 'react';
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
    Award,
    Sparkles,
    Target,
    PartyPopper,
} from 'lucide-react';
import { SkeletonDashboard } from '@/components/ui/skeleton';
import { fetchApi } from '@/lib/api';
import StreakWidget from '@/components/StreakWidget';
const DailyChallenge = lazy(() => import('@/components/DailyChallenge'));

interface ChallengeSummary {
    _id: string;
    title: string;
    slug: string;
    difficulty?: string;
    points: number;
}

// Quick access tools data
const quickTools = [
    { id: 'google-dork', name: 'Google Dork', href: '/tools', icon: Search, color: 'from-blue-500 to-blue-600' },
    { id: 'jwt-decoder', name: 'JWT Decoder', href: '/tools', icon: Key, color: 'from-purple-500 to-purple-600' },
    { id: 'base64', name: 'Base64 Tool', href: '/tools', icon: Terminal, color: 'from-orange-500 to-orange-600' },
    { id: 'hash-generator', name: 'Hash Generator', href: '/tools', icon: Hash, color: 'from-pink-500 to-pink-600' },
    { id: 'password-generator', name: 'Password Gen', href: '/tools', icon: Key, color: 'from-teal-500 to-teal-600' },
    { id: 'url-encoder', name: 'URL Encoder', href: '/tools', icon: Globe, color: 'from-green-500 to-green-600' },
];

// Learning resources
const learningResources = [
    { title: 'Cybersecurity Roadmap', href: '/roadmaps', icon: Map, description: 'Start your security journey' },
    { title: 'Cheatsheets', href: '/cheatsheets', icon: BookOpen, description: 'Quick reference guides' },
    { title: 'Security Tools', href: '/tools', icon: Wrench, description: 'Explore all 9+ tools' },
    { title: 'Practice Labs', href: '/labs', icon: Shield, description: 'Coming soon - Hands-on environments' },
];

// Stats cards
const statsConfig = [
    { label: 'Challenges Solved', icon: Flag, color: 'text-green-400' },
    { label: 'CTF Points', icon: Star, color: 'text-yellow-400' },
    { label: 'Days Active', icon: Calendar, color: 'text-blue-500' },
    { label: 'Events Attended', icon: Calendar, color: 'text-purple-400' },
];

// Milestone definitions
const MILESTONES = [
    { key: 'first_challenge', threshold: 1, field: 'challengesSolved', label: 'First Challenge Solved!', description: 'You completed your first security challenge!' },
    { key: 'challenges_10', threshold: 10, field: 'challengesSolved', label: '10 Challenges!', description: 'You have solved 10 challenges. Keep going!' },
    { key: 'points_100', threshold: 100, field: 'points', label: '100 Points!', description: 'You have earned 100 CTF points!' },
    { key: 'points_500', threshold: 500, field: 'points', label: '500 Points!', description: 'Half a thousand points. Impressive!' },
    { key: 'first_event', threshold: 1, field: 'eventsAttended', label: 'Event Goer!', description: 'You attended your first event!' },
];

const DashboardPage = () => {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [greeting, setGreeting] = useState('');
    const [recentChallenges, setRecentChallenges] = useState<ChallengeSummary[]>([]);
    const [activityLoading, setActivityLoading] = useState(true);
    const [showMilestone, setShowMilestone] = useState<{ label: string; description: string } | null>(null);

    // Fix: Use Intl.DateTimeFormat to get user's local timezone hour
    useEffect(() => {
        try {
            const formatter = new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                hour12: false,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });
            const hour = parseInt(formatter.format(new Date()), 10);
            if (hour < 12) setGreeting('Good morning');
            else if (hour < 18) setGreeting('Good afternoon');
            else setGreeting('Good evening');
        } catch {
            // Fallback
            const hour = new Date().getHours();
            if (hour < 12) setGreeting('Good morning');
            else if (hour < 18) setGreeting('Good afternoon');
            else setGreeting('Good evening');
        }
    }, []);

    // Milestone celebration check
    useEffect(() => {
        if (!user?.stats) return;
        const dismissed = JSON.parse(localStorage.getItem('dismissed_milestones') || '[]');
        for (const m of MILESTONES) {
            const value = user.stats[m.field as keyof typeof user.stats] ?? 0;
            if (typeof value === 'number' && value >= m.threshold && !dismissed.includes(m.key)) {
                setShowMilestone({ label: m.label, description: m.description });
                const updated = [...dismissed, m.key];
                localStorage.setItem('dismissed_milestones', JSON.stringify(updated));
                // Auto-dismiss after 5 seconds
                setTimeout(() => setShowMilestone(null), 5000);
                break;
            }
        }
    }, [user]);

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
                const json = await fetchApi('/api/challenges?limit=3', { requireAuth: false });
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

    // Personalized recommendations based on user activity
    const getRecommendations = () => {
        const recs = [];
        if (challengesSolved === 0) {
            recs.push({ title: 'Try Your First Challenge', description: 'Start with a beginner challenge to get your feet wet', href: '/challenges', icon: Flag });
        }
        if (challengesSolved > 0 && challengesSolved < 10) {
            recs.push({ title: 'Keep Solving Challenges', description: `${10 - challengesSolved} more to earn the Problem Solver badge`, href: '/challenges', icon: Target });
        }
        if (eventsAttended === 0) {
            recs.push({ title: 'Attend an Event', description: 'Join a CTF, workshop, or webinar', href: '/events', icon: Calendar });
        }
        recs.push({ title: 'Explore Learning Paths', description: 'Follow structured cybersecurity roadmaps', href: '/roadmaps', icon: Map });
        if (ctfPoints < 100) {
            recs.push({ title: 'Earn More Points', description: 'Reach 100 points to earn Rising Star badge', href: '/challenges', icon: Star });
        }
        return recs.slice(0, 3);
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Milestone Celebration */}
            {showMilestone && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-gray-900 border border-orange-500/50 rounded-2xl p-8 max-w-sm mx-4 text-center shadow-xl shadow-orange-500/20">
                        <PartyPopper className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">{showMilestone.label}</h3>
                        <p className="text-gray-400 text-sm mb-6">{showMilestone.description}</p>
                        <button
                            onClick={() => setShowMilestone(null)}
                            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
                        >
                            Awesome!
                        </button>
                    </div>
                </div>
            )}

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

                    {/* Engagement Section — Streak + Daily Challenge */}
                    <div className="grid lg:grid-cols-2 gap-6 mb-10">
                        <StreakWidget />
                        <Suspense fallback={
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] animate-pulse h-48" />
                        }>
                            <DailyChallenge />
                        </Suspense>
                    </div>

                    {/* Achievements & Recommendations */}
                    <div className="grid lg:grid-cols-2 gap-6 mb-10">
                        {/* Recent Achievements */}
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                                <Award className="w-5 h-5 text-yellow-400" />
                                Achievements
                            </h2>
                            {challengesSolved > 0 || ctfPoints > 0 || eventsAttended > 0 ? (
                                <div className="space-y-3">
                                    {challengesSolved >= 1 && (
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                                            <Flag className="w-5 h-5 text-green-400" />
                                            <div>
                                                <p className="text-sm font-medium text-white">First Blood</p>
                                                <p className="text-xs text-gray-500">Solved your first challenge</p>
                                            </div>
                                        </div>
                                    )}
                                    {ctfPoints >= 100 && (
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                                            <Star className="w-5 h-5 text-yellow-400" />
                                            <div>
                                                <p className="text-sm font-medium text-white">Rising Star</p>
                                                <p className="text-xs text-gray-500">Earned 100+ CTF points</p>
                                            </div>
                                        </div>
                                    )}
                                    {challengesSolved >= 10 && (
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/5 border border-purple-500/10">
                                            <Award className="w-5 h-5 text-purple-400" />
                                            <div>
                                                <p className="text-sm font-medium text-white">Problem Solver</p>
                                                <p className="text-xs text-gray-500">Solved 10+ challenges</p>
                                            </div>
                                        </div>
                                    )}
                                    {eventsAttended >= 1 && (
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                                            <Calendar className="w-5 h-5 text-blue-400" />
                                            <div>
                                                <p className="text-sm font-medium text-white">Event Goer</p>
                                                <p className="text-xs text-gray-500">Attended your first event</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <Award className="w-10 h-10 text-gray-600 mx-auto mb-2" />
                                    <p className="text-gray-500 text-sm">Complete challenges and attend events to earn badges</p>
                                </div>
                            )}
                        </div>

                        {/* Personalized Recommendations */}
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                                <Sparkles className="w-5 h-5 text-orange-400" />
                                Recommended For You
                            </h2>
                            <div className="space-y-3">
                                {getRecommendations().map((rec, i) => (
                                    <Link
                                        key={i}
                                        href={rec.href}
                                        className="group flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                            <rec.icon className="w-4 h-4 text-orange-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors">{rec.title}</p>
                                            <p className="text-xs text-gray-500">{rec.description}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-orange-500 transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
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
        className={`group p-4 rounded-xl border transition-all ${completed
            ? 'border-green-500/30 bg-green-500/5'
            : 'border-white/10 bg-white/[0.02] hover:border-orange-500/40'
            }`}
    >
        <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${completed ? 'bg-green-500/20' : 'bg-white/5 group-hover:bg-orange-500/10'
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
