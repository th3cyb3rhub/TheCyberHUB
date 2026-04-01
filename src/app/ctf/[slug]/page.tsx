"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, Flag, Trophy, Users, Clock, Target, Download,
    Globe, Terminal, FileText, Eye, EyeOff, Lightbulb, CheckCircle,
    XCircle, Loader2, Copy, Check, ExternalLink, Sparkles
} from 'lucide-react';
import Footer from '@/components/Footer';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface Hint {
    text: string;
    pointsDeduction: number;
    unlocked: string[];
}

interface ChallengeFile {
    filename: string;
    url: string;
    size: number;
}

interface Solve {
    user: { _id: string; username: string; avatar?: string };
    solvedAt: string;
    pointsEarned: number;
}

interface ActiveInstance {
    _id: string;
    status: string;
    instanceUrl: string | null;
    expiresAt: string;
}

interface Challenge {
    _id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription?: string;
    category: string;
    difficulty: string;
    tags: string[];
    basePoints: number;
    currentPoints: number;
    dynamicScoring: boolean;
    flagFormat: string;
    hints: Hint[];
    files: ChallengeFile[];
    instanceUrl?: string;
    instanceType?: string;
    containerImage?: string;
    containerPort?: number;
    status: string;
    isFeatured: boolean;
    solveCount: number;
    firstBlood?: { _id: string; username: string };
    solves: Solve[];
    author?: string;
    authorName?: string;
    isSolved?: boolean;
    createdAt: string;
}

const difficultyConfig: Record<string, { color: string; bg: string; border: string }> = {
    easy: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
    medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
    hard: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
    insane: { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
};

const categoryConfig: Record<string, { color: string; icon: React.ReactNode }> = {
    web: { color: 'text-blue-400', icon: <Globe className="w-4 h-4" /> },
    crypto: { color: 'text-orange-400', icon: <Target className="w-4 h-4" /> },
    pwn: { color: 'text-red-400', icon: <Flag className="w-4 h-4" /> },
    reverse: { color: 'text-purple-400', icon: <Terminal className="w-4 h-4" /> },
    forensics: { color: 'text-green-400', icon: <FileText className="w-4 h-4" /> },
    misc: { color: 'text-gray-400', icon: <Sparkles className="w-4 h-4" /> },
    osint: { color: 'text-cyan-400', icon: <Eye className="w-4 h-4" /> },
};

export default function ChallengeDetailPage() {
    const params = useParams();
    const { user, token } = useAuth();
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Flag submission
    const [flagInput, setFlagInput] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

    // Instance launch (Static & Dynamic)
    const [instanceRevealed, setInstanceRevealed] = useState(false);
    const [copied, setCopied] = useState(false);

    // Phase 2 Dynamic Instances
    const [activeInstance, setActiveInstance] = useState<ActiveInstance | null>(null);
    const [spawning, setSpawning] = useState(false);
    const [terminating, setTerminating] = useState(false);
    const [timeLeft, setTimeLeft] = useState<string>('');

    // Hints
    const [unlockedHints, setUnlockedHints] = useState<Set<number>>(new Set());
    const [unlockingHint, setUnlockingHint] = useState<number | null>(null);

    // Recent solves toggle
    const [showSolves, setShowSolves] = useState(false);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const data = await fetchApi(`/api/challenges/${params.slug}`);

                if (data.success) {
                    setChallenge(data.data);
                    setActiveInstance(data.activeInstance || null);
                    // track which hints user has already unlocked
                    if (user && data.data.hints) {
                        const unlocked = new Set<number>();
                        data.data.hints.forEach((hint: Hint, i: number) => {
                            if (hint.unlocked?.includes(user.id)) unlocked.add(i);
                        });
                        setUnlockedHints(unlocked);
                    }
                } else {
                    throw new Error('Challenge not found');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load challenge');
            } finally {
                setLoading(false);
            }
        };

        if (params.slug) fetchChallenge();
    }, [params.slug, token, user]);

    const handleSubmitFlag = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!flagInput.trim() || !challenge || !token) return;

        setSubmitting(true);
        setSubmitResult(null);

        try {
            const data = await fetchApi(`/api/challenges/${challenge._id}/submit`, {
                method: 'POST',
                body: JSON.stringify({ flag: flagInput.trim() }),
            });

            if (data.success) {
                setSubmitResult({ success: true, message: data.message || 'Correct flag! Challenge solved! 🎉' });
                setChallenge(prev => prev ? { ...prev, isSolved: true, solveCount: prev.solveCount + 1 } : prev);
            } else {
                setSubmitResult({ success: false, message: data.message || 'Incorrect flag. Try again.' });
            }
        } catch {
            setSubmitResult({ success: false, message: 'Submission failed. Check your connection.' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleUnlockHint = async (index: number) => {
        if (!challenge || !token || unlockedHints.has(index)) return;

        setUnlockingHint(index);
        try {
            const data = await fetchApi(`/api/challenges/${challenge._id}/hints/${index}`, {
                method: 'POST',
            });
            if (data.success) {
                setUnlockedHints(prev => new Set(prev).add(index));
            }
        } catch {
            console.error('Failed to unlock hint');
        } finally {
            setUnlockingHint(null);
        }
    };

    const handleSpawnInstance = async () => {
        if (!challenge || !token) return;
        setSpawning(true);
        try {
            const data = await fetchApi(`/api/challenges/${challenge._id}/spawn`, {
                method: 'POST',
            });
            if (data.success) {
                setActiveInstance(data.instance);
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSpawning(false);
        }
    };

    const handleTerminateInstance = async () => {
        if (!challenge || !token || !activeInstance) return;
        setTerminating(true);
        try {
            const data = await fetchApi(`/api/challenges/${challenge._id}/terminate`, {
                method: 'POST',
            });
            if (data.success) {
                setActiveInstance(null);
                setInstanceRevealed(false);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setTerminating(false);
        }
    };

    // Countdown timer for active instance
    useEffect(() => {
        if (!activeInstance?.expiresAt) return;
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(activeInstance.expiresAt).getTime() - now;
            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft('EXPIRED');
                setActiveInstance(null);
                setInstanceRevealed(false);
                return;
            }
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }, 1000);
        return () => clearInterval(interval);
    }, [activeInstance]);

    const handleCopyStaticInstance = async () => {
        if (!challenge?.instanceUrl) return;
        await navigator.clipboard.writeText(challenge.instanceUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    // --- Loading Skeleton ---
    if (loading) {
        return (
            <div className="min-h-screen bg-black animate-pulse">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20 space-y-8">
                    <div className="h-4 bg-gray-800 rounded w-24"></div>
                    <div className="space-y-4">
                        <div className="h-10 bg-gray-800 rounded w-3/4"></div>
                        <div className="flex gap-3">
                            <div className="h-6 bg-gray-800 rounded-full w-16"></div>
                            <div className="h-6 bg-gray-800 rounded-full w-20"></div>
                            <div className="h-6 bg-gray-800 rounded-full w-24"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="h-48 bg-gray-800 rounded-2xl"></div>
                            <div className="h-32 bg-gray-800 rounded-2xl"></div>
                        </div>
                        <div className="space-y-6">
                            <div className="h-48 bg-gray-800 rounded-2xl"></div>
                            <div className="h-32 bg-gray-800 rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Error / Not Found ---
    if (error || !challenge) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
                <Target className="w-12 h-12 text-gray-600 mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Challenge not found</h1>
                <p className="text-gray-400 mb-8">{error || 'The requested challenge does not exist.'}</p>
                <Link href="/ctf" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300">
                    <ArrowLeft className="w-4 h-4" /> Back to Challenges
                </Link>
            </div>
        );
    }

    const diff = difficultyConfig[challenge.difficulty] || difficultyConfig.easy;
    const cat = categoryConfig[challenge.category] || categoryConfig.misc;

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <section className="relative pt-32 pb-8 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="relative max-w-4xl mx-auto">
                    <Link href="/ctf" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Challenges
                    </Link>

                    <div className="flex items-start gap-4 mb-4">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white flex-1">{challenge.title}</h1>
                        {challenge.isFeatured && (
                            <span className="flex items-center gap-1 px-2.5 py-1 text-xs bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/20 shrink-0">
                                <Sparkles className="w-3 h-3" /> Featured
                            </span>
                        )}
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${diff.bg} ${diff.color} ${diff.border}`}>
                            {challenge.difficulty}
                        </span>
                        <span className={`flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full bg-white/5 border border-white/10 ${cat.color}`}>
                            {cat.icon} {challenge.category}
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 text-sm text-gray-400 rounded-full bg-white/5 border border-white/10">
                            <Trophy className="w-3.5 h-3.5 text-orange-400" /> {challenge.currentPoints} pts
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 text-sm text-gray-400 rounded-full bg-white/5 border border-white/10">
                            <Users className="w-3.5 h-3.5" /> {challenge.solveCount} solves
                        </span>
                    </div>

                    {/* Tags */}
                    {challenge.tags && challenge.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {challenge.tags.map((tag, i) => (
                                <span key={i} className="px-2.5 py-1 text-xs bg-white/5 text-gray-400 rounded-lg border border-white/5">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Content */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Solved Banner */}
                        {challenge.isSolved && (
                            <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-green-400 shrink-0" />
                                <div>
                                    <p className="text-green-400 font-semibold">Challenge Solved!</p>
                                    <p className="text-sm text-green-400/70">You&apos;ve already captured this flag.</p>
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <h2 className="text-lg font-semibold text-white mb-4">Challenge Description</h2>
                            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{challenge.description}</div>
                        </div>

                        {/* Instance Launch (Dynamic or Static) */}
                        {(challenge.instanceUrl || challenge.containerImage) && (
                            <div className="p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        {challenge.instanceType === 'web' ? (
                                            <Globe className="w-5 h-5 text-orange-400" />
                                        ) : challenge.instanceType === 'network' ? (
                                            <Terminal className="w-5 h-5 text-orange-400" />
                                        ) : (
                                            <Target className="w-5 h-5 text-orange-400" />
                                        )}
                                        <h3 className="text-lg font-semibold text-white">
                                            {challenge.instanceType === 'web' ? 'Web Instance' : challenge.instanceType === 'network' ? 'Network Target' : 'Target Instance'}
                                        </h3>
                                    </div>
                                    {activeInstance && activeInstance.status !== 'TERMINATED' && (
                                        <div className="flex items-center gap-2">
                                            <span className="flex items-center gap-1.5 px-2 py-1 bg-black/40 border border-white/10 rounded-md text-xs font-mono text-orange-300">
                                                <Clock className="w-3 h-3 text-orange-500" /> {timeLeft}
                                            </span>
                                            <button
                                                onClick={handleTerminateInstance} disabled={terminating}
                                                className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium rounded-md border border-red-500/20 transition-colors disabled:opacity-50 flex items-center gap-1">
                                                {terminating ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />} Terminate
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* IF DYNAMIC INSTANCE (Has containerImage) */}
                                {challenge.containerImage && !challenge.instanceUrl ? (
                                    <>
                                        {!activeInstance || activeInstance.status === 'TERMINATED' ? (
                                            <button
                                                onClick={handleSpawnInstance} disabled={spawning || !token}
                                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all shadow-lg shadow-orange-500/20"
                                            >
                                                {spawning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Eye className="w-5 h-5" />}
                                                {spawning ? 'Provisioning Container...' : 'Spawn Dedicated Instance'}
                                            </button>
                                        ) : activeInstance.status === 'PROVISIONING' ? (
                                            <div className="p-4 bg-black/30 rounded-xl border border-white/10 text-center animate-pulse">
                                                <Loader2 className="w-6 h-6 text-orange-400 animate-spin mx-auto mb-2" />
                                                <p className="text-sm font-medium text-white">Spinning up container...</p>
                                                <p className="text-xs text-gray-500 mt-1">AWS Fargate is allocating resources (30-60s)</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 p-3 bg-black/30 rounded-xl border border-green-500/30">
                                                    <code className="flex-1 text-green-400 text-sm font-mono break-all">
                                                        {activeInstance.instanceUrl || 'IP Pending from AWS...'}
                                                    </code>
                                                    {activeInstance.instanceUrl && (
                                                        <button onClick={async () => { await navigator.clipboard.writeText(activeInstance.instanceUrl!); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0">
                                                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                                                        </button>
                                                    )}
                                                </div>
                                                {challenge.instanceType === 'web' && activeInstance.instanceUrl && (
                                                    <a href={activeInstance.instanceUrl} target="_blank" rel="noopener noreferrer"
                                                        className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 font-medium rounded-xl transition-colors">
                                                        <ExternalLink className="w-4 h-4" /> Open Dedicated Target
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                        {!token && !activeInstance && <p className="text-center text-xs text-red-400 mt-3">You must be logged in to spawn a dynamic container.</p>}
                                    </>
                                ) : (
                                    /* ELSE STATIC/SHARED INSTANCE */
                                    <>
                                        {!instanceRevealed ? (
                                            <button
                                                onClick={() => setInstanceRevealed(true)}
                                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500 hover:text-white text-orange-400 font-medium rounded-xl transition-all"
                                            >
                                                <Eye className="w-5 h-5" /> Reveal Deployment Details
                                            </button>
                                        ) : (
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 p-3 bg-black/30 rounded-xl border border-white/10">
                                                    <code className="flex-1 text-orange-300 text-sm font-mono break-all">{challenge.instanceUrl}</code>
                                                    <button onClick={handleCopyStaticInstance} className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0">
                                                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                                                    </button>
                                                </div>
                                                {challenge.instanceType === 'web' && (
                                                    <a href={challenge.instanceUrl} target="_blank" rel="noopener noreferrer"
                                                        className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-colors">
                                                        <ExternalLink className="w-4 h-4" /> Open Shared Target
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        {/* Files */}
                        {challenge.files && challenge.files.length > 0 && (
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Download className="w-5 h-5 text-orange-400" /> Challenge Files
                                </h3>
                                <div className="space-y-2">
                                    {challenge.files.map((file, i) => (
                                        <a key={i} href={file.url} download
                                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
                                            <span className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                                                <span className="text-white text-sm">{file.filename}</span>
                                            </span>
                                            <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Hints */}
                        {challenge.hints && challenge.hints.length > 0 && (
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-400" /> Hints
                                </h3>
                                <div className="space-y-3">
                                    {challenge.hints.map((hint, i) => (
                                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                                            {unlockedHints.has(i) ? (
                                                <div>
                                                    <p className="text-sm text-yellow-400/70 mb-1">Hint {i + 1} {hint.pointsDeduction > 0 && `(-${hint.pointsDeduction} pts)`}</p>
                                                    <p className="text-gray-300 text-sm">{hint.text}</p>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-400">
                                                        <EyeOff className="w-4 h-4 inline mr-2" />
                                                        Hint {i + 1} {hint.pointsDeduction > 0 && `(-${hint.pointsDeduction} pts penalty)`}
                                                    </span>
                                                    <button
                                                        onClick={() => handleUnlockHint(i)}
                                                        disabled={!token || unlockingHint === i}
                                                        className="px-3 py-1.5 text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition-colors disabled:opacity-50"
                                                    >
                                                        {unlockingHint === i ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Unlock'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Flag Submission */}
                        <div className="p-6 rounded-2xl border border-orange-500/30 bg-orange-500/5">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Flag className="w-5 h-5 text-orange-400" /> Submit Flag
                            </h3>

                            {!token ? (
                                <div className="text-center py-4">
                                    <p className="text-gray-400 text-sm mb-3">Login to submit flags</p>
                                    <Link href="/auth" className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                                        Sign In →
                                    </Link>
                                </div>
                            ) : challenge.isSolved ? (
                                <div className="text-center py-4">
                                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                    <p className="text-green-400 font-medium">Already Solved</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmitFlag}>
                                    <p className="text-xs text-gray-500 mb-3">Format: <code className="text-orange-400/70">{challenge.flagFormat}</code></p>
                                    <input
                                        type="text"
                                        value={flagInput}
                                        onChange={(e) => setFlagInput(e.target.value)}
                                        placeholder="flag{...}"
                                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white font-mono text-sm placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none mb-3 transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        disabled={submitting || !flagInput.trim()}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all"
                                    >
                                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Flag className="w-4 h-4" />}
                                        {submitting ? 'Checking...' : 'Submit Flag'}
                                    </button>

                                    {submitResult && (
                                        <div className={`mt-3 p-3 rounded-xl text-sm flex items-center gap-2 ${submitResult.success
                                            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                            : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                            }`}>
                                            {submitResult.success ? <CheckCircle className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                                            {submitResult.message}
                                        </div>
                                    )}
                                </form>
                            )}
                        </div>

                        {/* Challenge Info */}
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Challenge Info</h3>
                            <dl className="space-y-4">
                                <div>
                                    <dt className="text-sm text-gray-500">Points</dt>
                                    <dd className="text-white font-semibold">{challenge.currentPoints}
                                        {challenge.dynamicScoring && <span className="text-xs text-gray-500 ml-1">(dynamic)</span>}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Solves</dt>
                                    <dd className="text-white">{challenge.solveCount}</dd>
                                </div>
                                {challenge.firstBlood && (
                                    <div>
                                        <dt className="text-sm text-gray-500">First Blood 🩸</dt>
                                        <dd className="text-orange-400 font-medium">{challenge.firstBlood.username}</dd>
                                    </div>
                                )}
                                {challenge.authorName && (
                                    <div>
                                        <dt className="text-sm text-gray-500">Author</dt>
                                        <dd className="text-white">{challenge.authorName}</dd>
                                    </div>
                                )}
                                <div>
                                    <dt className="text-sm text-gray-500">Published</dt>
                                    <dd className="text-white flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-500" /> {formatDate(challenge.createdAt)}</dd>
                                </div>
                            </dl>
                        </div>

                        {/* Recent Solves */}
                        {challenge.solves && challenge.solves.length > 0 && (
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                <button onClick={() => setShowSolves(!showSolves)} className="flex items-center justify-between w-full text-left">
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Recent Solves</h3>
                                    <span className="text-xs text-gray-500">{showSolves ? 'Hide' : 'Show'}</span>
                                </button>
                                {showSolves && (
                                    <div className="mt-4 space-y-2">
                                        {challenge.solves.slice(0, 10).map((solve, i) => (
                                            <div key={i} className="flex items-center justify-between text-sm">
                                                <span className="text-white">{solve.user?.username || 'Unknown'}</span>
                                                <span className="text-gray-500 text-xs">{formatDate(solve.solvedAt)}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
