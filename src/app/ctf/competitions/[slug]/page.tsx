"use client"

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { fetchApi } from '@/lib/api';
import Image from 'next/image';
import {
    Trophy,
    Flag,
    Calendar,
    Clock,
    Users,
    Lock,
    Unlock,
    Loader2,
    AlertCircle,
    CheckCircle,
    Send,
    Medal,
    ArrowLeft,
    Copy,
    LogOut,
    Crown,
    UserX,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface Competition {
    _id: string;
    title: string;
    slug: string;
    description: string;
    startDate: string;
    endDate: string;
    status: 'draft' | 'upcoming' | 'live' | 'ended' | 'cancelled';
    teamsEnabled: boolean;
    maxTeamSize: number;
    prizes: string;
    registrationOpen: boolean;
}

interface Challenge {
    _id: string;
    title: string;
    category: string;
    difficulty: string;
    basePoints: number;
    currentPoints?: number;
    solved: boolean;
}

interface LeaderboardEntry {
    rank: number;
    username?: string;
    teamName?: string;
    avatar?: string;
    points: number;
    solves: number;
}

const DIFF_COLORS: Record<string, string> = {
    easy: 'text-green-400 border-green-500/30 bg-green-500/10',
    medium: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    hard: 'text-red-400 border-red-500/30 bg-red-500/10',
    insane: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
};

function formatDate(d: string) {
    return new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function CompetitionDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { user } = useAuth();
    const { addToast } = useToast();

    const [activeTab, setActiveTab] = useState<'challenges' | 'leaderboard' | 'teams'>('challenges');
    const [flags, setFlags] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState<string | null>(null);

    const { data: competition, isLoading: compLoading, isError: compError } = useQuery({
        queryKey: ['ctf-comp', slug],
        queryFn: async () => {
            const res = await fetchApi(`/api/ctf-competitions/${slug}`, { requireAuth: false });
            return res.data as Competition;
        },
    });

    const { data: challenges, refetch: refetchChallenges } = useQuery({
        queryKey: ['ctf-comp-challenges', slug],
        queryFn: async () => {
            const res = await fetchApi(`/api/ctf-competitions/${slug}/challenges`, { requireAuth: false });
            return res.data as Challenge[];
        },
        enabled: !!competition && ['live', 'ended'].includes(competition.status),
    });

    const { data: leaderboard } = useQuery({
        queryKey: ['ctf-comp-lb', slug],
        queryFn: async () => {
            const res = await fetchApi(`/api/ctf-competitions/${slug}/leaderboard`, { requireAuth: false });
            return res.data as LeaderboardEntry[];
        },
        enabled: !!competition && competition.status !== 'draft',
        refetchInterval: competition?.status === 'live' ? 30000 : false,
    });

    const { data: myTeam } = useQuery({
        queryKey: ['ctf-comp-team', slug],
        queryFn: async () => {
            const res = await fetchApi(`/api/ctf-competitions/${slug}/team`);
            return res.data;
        },
        enabled: !!competition?.teamsEnabled && !!user,
    });

    const handleFlagSubmit = async (challengeId: string) => {
        const flag = flags[challengeId]?.trim();
        if (!flag) return;
        setSubmitting(challengeId);
        try {
            const res = await fetchApi(`/api/ctf-competitions/${slug}/challenges/${challengeId}/submit`, {
                method: 'POST',
                body: JSON.stringify({ flag }),
            });
            if (res.success) {
                addToast({ variant: 'success', title: 'Correct!', message: `+${res.pointsEarned} points` });
                refetchChallenges();
            } else {
                addToast({ variant: 'error', title: 'Wrong flag', message: 'Try again.' });
            }
        } catch (err) {
            addToast({ variant: 'error', title: 'Error', message: err instanceof Error ? err.message : 'Submit failed' });
        } finally {
            setSubmitting(null);
        }
    };

    if (compLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (compError || !competition) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <p className="text-gray-400 mb-4">Competition not found</p>
                <Link href="/ctf/competitions" className="text-orange-400 hover:text-orange-300">
                    ← Back to Competitions
                </Link>
            </div>
        );
    }

    const isLive = competition.status === 'live';
    const isEnded = competition.status === 'ended';
    const isUpcoming = competition.status === 'upcoming';

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative pt-28 pb-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <Breadcrumbs items={[
                        { label: 'CTF', href: '/ctf' },
                        { label: 'Competitions', href: '/ctf/competitions' },
                        { label: competition.title },
                    ]} />

                    {/* Header */}
                    <div className="mt-8 mb-8 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    {isLive && (
                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                            Live Now
                                        </span>
                                    )}
                                    {isUpcoming && (
                                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-sm">
                                            Upcoming
                                        </span>
                                    )}
                                    {isEnded && (
                                        <span className="px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30 text-sm">
                                            Ended
                                        </span>
                                    )}
                                    {competition.teamsEnabled && (
                                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm">
                                            <Users className="w-3.5 h-3.5" />
                                            Team Competition
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl font-bold text-white">{competition.title}</h1>
                            </div>
                        </div>

                        {competition.description && (
                            <p className="text-gray-400 mb-6 leading-relaxed">{competition.description}</p>
                        )}

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Starts: {formatDate(competition.startDate)}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Ends: {formatDate(competition.endDate)}
                            </span>
                        </div>

                        {competition.prizes && (
                            <div className="mt-6 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                                <p className="text-sm text-yellow-400 font-medium mb-1 flex items-center gap-2">
                                    <Medal className="w-4 h-4" />
                                    Prizes
                                </p>
                                <p className="text-sm text-gray-300">{competition.prizes}</p>
                            </div>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mb-6 border-b border-white/10">
                        {(['challenges', 'leaderboard', ...(competition.teamsEnabled ? ['teams'] : [])] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as typeof activeTab)}
                                className={`px-5 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                                    activeTab === tab
                                        ? 'border-orange-500 text-white'
                                        : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Challenges Tab */}
                    {activeTab === 'challenges' && (
                        <>
                            {isUpcoming ? (
                                <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/[0.02]">
                                    <Lock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-white mb-2">Challenges hidden until start</h3>
                                    <p className="text-gray-400">Challenges will be revealed when the competition goes live.</p>
                                </div>
                            ) : !challenges ? (
                                <div className="flex justify-center py-10">
                                    <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                                </div>
                            ) : challenges.length === 0 ? (
                                <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/[0.02]">
                                    <Flag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400">No challenges added yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {challenges.map(ch => (
                                        <div
                                            key={ch._id}
                                            className={`p-5 rounded-xl border transition-colors ${
                                                ch.solved
                                                    ? 'border-green-500/30 bg-green-500/5'
                                                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        {ch.solved && <CheckCircle className="w-4 h-4 text-green-400" />}
                                                        <h3 className="font-semibold text-white">{ch.title}</h3>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs text-gray-500 uppercase">{ch.category}</span>
                                                        <span className={`text-xs px-2 py-0.5 rounded border ${DIFF_COLORS[ch.difficulty] || DIFF_COLORS.medium}`}>
                                                            {ch.difficulty}
                                                        </span>
                                                        <span className="text-xs text-orange-400 font-medium">
                                                            {ch.currentPoints || ch.basePoints} pts
                                                        </span>
                                                    </div>
                                                </div>

                                                {isLive && !ch.solved && user && (
                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                        <input
                                                            type="text"
                                                            value={flags[ch._id] || ''}
                                                            onChange={e => setFlags(prev => ({ ...prev, [ch._id]: e.target.value }))}
                                                            onKeyDown={e => e.key === 'Enter' && handleFlagSubmit(ch._id)}
                                                            placeholder="TCH{...}"
                                                            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none w-44"
                                                        />
                                                        <button
                                                            onClick={() => handleFlagSubmit(ch._id)}
                                                            disabled={submitting === ch._id}
                                                            className="p-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white rounded-lg transition-colors"
                                                        >
                                                            {submitting === ch._id ? (
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                            ) : (
                                                                <Send className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                )}

                                                {isLive && !ch.solved && !user && (
                                                    <Link href="/auth" className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1">
                                                        <Unlock className="w-3.5 h-3.5" />
                                                        Login to solve
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* Leaderboard Tab */}
                    {activeTab === 'leaderboard' && (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                            {!leaderboard ? (
                                <div className="flex justify-center py-10">
                                    <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                                </div>
                            ) : leaderboard.length === 0 ? (
                                <div className="text-center py-16">
                                    <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400">No solves yet. Be the first!</p>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10 text-left text-xs text-gray-500 uppercase">
                                            <th className="px-6 py-3">Rank</th>
                                            <th className="px-6 py-3">{competition.teamsEnabled ? 'Team' : 'User'}</th>
                                            <th className="px-6 py-3 text-right">Solves</th>
                                            <th className="px-6 py-3 text-right">Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaderboard.map(entry => (
                                            <tr key={entry.rank} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className={`text-sm font-bold ${
                                                        entry.rank === 1 ? 'text-yellow-400' :
                                                        entry.rank === 2 ? 'text-gray-300' :
                                                        entry.rank === 3 ? 'text-orange-400' :
                                                        'text-gray-500'
                                                    }`}>
                                                        #{entry.rank}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-white">
                                                        {entry.teamName || entry.username}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="text-sm text-gray-400">{entry.solves}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="text-sm font-semibold text-orange-400">{entry.points}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}

                    {/* Teams Tab */}
                    {activeTab === 'teams' && competition.teamsEnabled && (
                        <div className="space-y-4">
                            {myTeam ? (
                                <TeamPanel
                                    team={myTeam}
                                    maxSize={competition.maxTeamSize}
                                    slug={slug}
                                    currentUserId={user?.id}
                                />
                            ) : user && (isLive || isUpcoming) ? (
                                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                    <h3 className="font-semibold text-white mb-4">Join or Create a Team</h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-400 mb-2">Create a new team</p>
                                            <TeamCreateForm slug={slug} maxSize={competition.maxTeamSize} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 mb-2">Join with invite code</p>
                                            <TeamJoinForm slug={slug} />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-10 rounded-2xl border border-white/10 bg-white/[0.02]">
                                    <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                                    <p className="text-gray-400">
                                        {!user ? 'Log in to join or create a team.' : 'This competition has ended.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-8">
                        <Link href="/ctf/competitions" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Competitions
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface TeamMember {
    _id: string;
    username: string;
    avatar?: string;
}

interface TeamData {
    _id: string;
    name: string;
    inviteCode: string;
    captain: TeamMember;
    members: TeamMember[];
    points: number;
}

function TeamPanel({ team, maxSize, slug, currentUserId }: { team: TeamData; maxSize: number; slug: string; currentUserId?: string }) {
    const { addToast } = useToast();
    const [leaving, setLeaving] = useState(false);
    const [kicking, setKicking] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const isCaptain = team.captain._id === currentUserId || (typeof team.captain === 'string' && team.captain === currentUserId);

    const copyCode = () => {
        navigator.clipboard.writeText(team.inviteCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleLeave = async () => {
        if (!confirm('Are you sure you want to leave this team?')) return;
        setLeaving(true);
        try {
            await fetchApi(`/api/ctf-competitions/${slug}/team/leave`, { method: 'DELETE' });
            addToast({ variant: 'success', title: 'Left team', message: 'You have left the team.' });
            window.location.reload();
        } catch (err) {
            addToast({ variant: 'error', title: 'Error', message: err instanceof Error ? err.message : 'Failed to leave team' });
        } finally {
            setLeaving(false);
        }
    };

    const handleKick = async (memberId: string, memberName: string) => {
        if (!confirm(`Remove @${memberName} from the team?`)) return;
        setKicking(memberId);
        try {
            await fetchApi(`/api/ctf-competitions/${slug}/team/kick`, {
                method: 'POST',
                body: JSON.stringify({ memberId }),
            });
            addToast({ variant: 'success', title: 'Member removed', message: `@${memberName} was removed from the team.` });
            window.location.reload();
        } catch (err) {
            addToast({ variant: 'error', title: 'Error', message: err instanceof Error ? err.message : 'Failed to remove member' });
        } finally {
            setKicking(null);
        }
    };

    return (
        <div className="rounded-2xl border border-green-500/20 bg-green-500/[0.03] overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-green-500/10">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <h3 className="font-semibold text-white text-lg">{team.name}</h3>
                            {isCaptain && (
                                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                                    <Crown className="w-3 h-3" />
                                    Captain
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">{team.members.length} / {maxSize} members · {team.points} pts</p>
                    </div>
                    <button
                        onClick={handleLeave}
                        disabled={leaving}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs rounded-lg transition-colors"
                    >
                        {leaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
                        Leave Team
                    </button>
                </div>

                {/* Invite code */}
                <div className="mt-4 flex items-center gap-3 p-3 bg-black/40 rounded-lg border border-white/5">
                    <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Invite code</p>
                        <code className="text-sm font-mono text-orange-400 tracking-widest">{team.inviteCode}</code>
                    </div>
                    <button
                        onClick={copyCode}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs rounded-lg transition-colors"
                    >
                        <Copy className="w-3.5 h-3.5" />
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>

            {/* Member list */}
            <div className="p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3 px-2">Members</p>
                <div className="space-y-2">
                    {team.members.map(member => {
                        const isThisCaptain = member._id === team.captain._id || member._id === (team.captain as unknown as string);
                        const isMe = member._id === currentUserId;
                        return (
                            <div key={member._id} className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    {member.avatar ? (
                                        <Image src={member.avatar} alt={member.username} width={32} height={32} className="w-8 h-8 rounded-full object-cover" unoptimized />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-xs font-bold">
                                            {member.username[0].toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm text-white font-medium">
                                            @{member.username}
                                            {isMe && <span className="text-xs text-gray-500 ml-1">(you)</span>}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {isThisCaptain && (
                                        <span className="flex items-center gap-1 text-xs text-yellow-400">
                                            <Crown className="w-3 h-3" />
                                            Captain
                                        </span>
                                    )}
                                    {isCaptain && !isMe && !isThisCaptain && (
                                        <button
                                            onClick={() => handleKick(member._id, member.username)}
                                            disabled={kicking === member._id}
                                            className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Remove from team"
                                        >
                                            {kicking === member._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserX className="w-3.5 h-3.5" />}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// Inline team forms
function TeamCreateForm({ slug }: { slug: string; maxSize: number }) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();

    const handleCreate = async () => {
        if (!name.trim()) return;
        setLoading(true);
        try {
            await fetchApi(`/api/ctf-competitions/${slug}/team`, {
                method: 'POST',
                body: JSON.stringify({ name }),
            });
            addToast({ variant: 'success', title: 'Team created!', message: 'Share your invite code with teammates.' });
            window.location.reload();
        } catch (err) {
            addToast({ variant: 'error', title: 'Error', message: err instanceof Error ? err.message : 'Failed to create team' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-2">
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Team name"
                maxLength={50}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none"
            />
            <button
                onClick={handleCreate}
                disabled={loading || !name.trim()}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/40 text-white text-sm rounded-lg transition-colors"
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create'}
            </button>
        </div>
    );
}

function TeamJoinForm({ slug }: { slug: string }) {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();

    const handleJoin = async () => {
        if (!code.trim()) return;
        setLoading(true);
        try {
            await fetchApi(`/api/ctf-competitions/${slug}/team/join`, {
                method: 'POST',
                body: JSON.stringify({ inviteCode: code.toUpperCase() }),
            });
            addToast({ variant: 'success', title: 'Joined team!', message: "You're now part of the team." });
            window.location.reload();
        } catch (err) {
            addToast({ variant: 'error', title: 'Error', message: err instanceof Error ? err.message : 'Invalid invite code' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-2">
            <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                placeholder="XXXXXXXX"
                maxLength={8}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none"
            />
            <button
                onClick={handleJoin}
                disabled={loading || !code.trim()}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/40 text-white text-sm rounded-lg transition-colors"
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Join'}
            </button>
        </div>
    );
}
