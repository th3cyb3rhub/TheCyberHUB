"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
    ArrowLeft,
    Flag,
    Star,
    Users,
    Lightbulb,
    Send,
    CheckCircle,
    XCircle,
    Lock,
    Unlock,
    Loader2,
    Trophy,
    ExternalLink
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchApi } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface Hint {
    content?: string;
    cost: number;
    unlocked: boolean;
}

interface Challenge {
    _id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'insane';
    points: number;
    basePoints?: number; // Original points before dynamic scoring
    solves: number;
    author?: {
        username: string;
        name?: string;
    };
    tags?: string[];
    hints?: Hint[];
    hintsUsed?: number; // Number of hints unlocked
    solved?: boolean;
    files?: { name: string; url: string }[];
    createdAt: string;
}

const difficultyConfig = {
    easy: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', label: 'Easy' },
    medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', label: 'Medium' },
    hard: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', label: 'Hard' },
    insane: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'Insane' }
};

const ChallengePage = () => {
    const params = useParams();
    const router = useRouter();
    const { user, token } = useAuth();
    const slug = params.slug as string;

    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
    const [unlockingHint, setUnlockingHint] = useState<number | null>(null);
    const { addToast } = useToast();

    // Fetch challenge
    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const data = await fetchApi(`/api/challenges/${slug}`);
                setChallenge(data);
            } catch (error) {
                console.error('Failed to fetch challenge:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchChallenge();
    }, [slug, token, router]);

    // Submit flag
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!flag.trim() || !token || !challenge) return;

        setSubmitting(true);
        setResult(null);

        try {
            const data = await fetchApi(`/api/challenges/${challenge._id}/submit`, {
                method: 'POST',
                body: JSON.stringify({ flag: flag.trim() }),
            });

            if (data.correct) {
                setResult({ success: true, message: 'Correct! Flag captured! 🎉' });
                addToast({
                    variant: 'success',
                    title: 'Flag accepted',
                    message: data.message || 'You have earned points for this challenge.',
                });
                setChallenge(prev => prev ? { ...prev, solved: true, solves: prev.solves + 1 } : null);
                setFlag('');
            } else {
                const message = data.message || 'Incorrect flag. Try again!';
                setResult({ success: false, message });
                addToast({
                    variant: 'error',
                    title: 'Incorrect flag',
                    message,
                });
            }
        } catch {
            const message = 'Failed to submit flag';
            setResult({ success: false, message });
            addToast({
                variant: 'error',
                title: 'Submission error',
                message,
            });
        } finally {
            setSubmitting(false);
        }
    };

    // Unlock hint
    const handleUnlockHint = async (hintIndex: number) => {
        if (!token || !challenge) return;

        setUnlockingHint(hintIndex);

        try {
            const data = await fetchApi(`/api/challenges/${challenge._id}/hints/${hintIndex}`, {
                method: 'POST',
            });
            setChallenge(prev => {
                if (!prev || !prev.hints) return prev;
                const newHints = [...prev.hints];
                newHints[hintIndex] = { ...newHints[hintIndex], unlocked: true, content: data.hint };
                return { ...prev, hints: newHints };
            });
            addToast({
                variant: 'success',
                title: 'Hint unlocked',
                message: 'A hint has been revealed for this challenge.',
            });
        } catch (error) {
            console.error('Failed to unlock hint:', error);
            addToast({
                variant: 'error',
                title: 'Hint error',
                message: 'Something went wrong while unlocking the hint.',
            });
        } finally {
            setUnlockingHint(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    <Skeleton className="h-4 w-32 mb-6" />
                    <Skeleton className="h-10 w-2/3 mb-4" />
                    <div className="flex gap-3 mb-6">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-40 w-full rounded-2xl mb-6" />
                    <Skeleton className="h-14 w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (!challenge) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Flag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Challenge not found</p>
                    <Link href="/challenges" className="text-orange-400 hover:text-orange-300 mt-2 inline-block">
                        Back to challenges
                    </Link>
                </div>
            </div>
        );
    }

    const difficulty = difficultyConfig[challenge.difficulty];

    return (
        <div className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
                <Breadcrumbs items={[{ label: 'Challenges', href: '/challenges' }, { label: challenge.title }]} />

                {/* Back link */}
                <Link
                    href="/challenges"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Challenges
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-start justify-between mb-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">
                            {challenge.title}
                        </h1>
                        {challenge.solved && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-sm text-green-400 font-medium">Solved</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficulty.bg} ${difficulty.color} ${difficulty.border} border`}>
                            {difficulty.label}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm bg-white/5 text-gray-400 border border-white/10 capitalize">
                            {challenge.category}
                        </span>

                        {/* Dynamic scoring display */}
                        <span className="flex items-center gap-1.5 text-sm text-gray-400">
                            <Star className="w-4 h-4 text-yellow-400" />
                            {challenge.basePoints && challenge.basePoints !== challenge.points ? (
                                <span className="flex items-center gap-1">
                                    <span className="line-through text-gray-600">{challenge.basePoints}</span>
                                    <span className="text-yellow-400 font-medium">{challenge.points}</span>
                                    <span className="text-xs text-gray-500">pts</span>
                                </span>
                            ) : (
                                <span>{challenge.points} points</span>
                            )}
                        </span>

                        <span className="flex items-center gap-1.5 text-sm text-gray-400">
                            <Users className="w-4 h-4" />
                            {challenge.solves} solves
                        </span>
                    </div>

                    {/* Dynamic scoring note */}
                    {challenge.solves > 0 && challenge.basePoints && challenge.basePoints !== challenge.points && (
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 px-3 py-2 bg-yellow-500/5 border border-yellow-500/10 rounded-lg">
                            <Star className="w-3.5 h-3.5 text-yellow-500/70" />
                            <span>Points decrease as more people solve. Original: {challenge.basePoints} pts</span>
                        </div>
                    )}

                    {challenge.tags && challenge.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {challenge.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 text-xs bg-orange-500/10 text-orange-400 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Description */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
                    <h2 className="text-lg font-semibold text-white mb-3">Description</h2>
                    <div className="text-gray-300 whitespace-pre-wrap">
                        {challenge.description}
                    </div>
                </div>

                {/* Files */}
                {challenge.files && challenge.files.length > 0 && (
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
                        <h2 className="text-lg font-semibold text-white mb-3">Files</h2>
                        <div className="space-y-2">
                            {challenge.files.map((file, i) => (
                                <a
                                    key={i}
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    {file.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Hints */}
                {challenge.hints && challenge.hints.length > 0 && (
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
                        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-yellow-400" />
                            Hints
                        </h2>
                        <div className="space-y-3">
                            {challenge.hints.map((hint, index) => (
                                <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    {hint.unlocked ? (
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Hint {index + 1}</p>
                                            <p className="text-gray-300">{hint.content}</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Lock className="w-4 h-4" />
                                                <span>Hint {index + 1}</span>
                                                <span className="text-xs text-gray-600">(-{hint.cost} pts)</span>
                                            </div>
                                            {user ? (
                                                <button
                                                    onClick={() => handleUnlockHint(index)}
                                                    disabled={unlockingHint === index}
                                                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded-lg transition-colors"
                                                >
                                                    {unlockingHint === index ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Unlock className="w-4 h-4" />
                                                    )}
                                                    Unlock
                                                </button>
                                            ) : (
                                                <Link
                                                    href="/auth"
                                                    className="text-sm text-orange-400 hover:text-orange-300"
                                                >
                                                    Sign in to unlock
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Flag Submission */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Flag className="w-5 h-5 text-orange-400" />
                        Submit Flag
                    </h2>

                    {challenge.solved ? (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                            <Trophy className="w-6 h-6 text-green-400" />
                            <div>
                                <p className="text-green-400 font-medium">Challenge Completed!</p>
                                <p className="text-sm text-green-400/70">You&apos;ve already captured this flag.</p>
                            </div>
                        </div>
                    ) : user ? (
                        <form onSubmit={handleSubmit}>
                            {result && (
                                <div className={`flex items-center gap-3 p-4 rounded-xl mb-4 ${result.success
                                    ? 'bg-green-500/10 border border-green-500/20'
                                    : 'bg-red-500/10 border border-red-500/20'
                                    }`}>
                                    {result.success ? (
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-400" />
                                    )}
                                    <p className={result.success ? 'text-green-400' : 'text-red-400'}>
                                        {result.message}
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={flag}
                                    onChange={(e) => setFlag(e.target.value)}
                                    placeholder="TCH{...}"
                                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors font-mono"
                                />
                                <button
                                    type="submit"
                                    disabled={!flag.trim() || submitting}
                                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-xl transition-all"
                                >
                                    {submitting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                    Submit
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-gray-400 mb-3">Sign in to submit flags</p>
                            <Link
                                href={`/auth?redirect=/challenges/${slug}`}
                                className="inline-flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all"
                            >
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>

                {/* Author */}
                {challenge.author && (
                    <div className="mt-6 text-center text-sm text-gray-500">
                        Challenge by{' '}
                        <Link
                            href={`/user/${challenge.author.username}`}
                            className="text-orange-400 hover:text-orange-300"
                        >
                            {challenge.author.name || challenge.author.username}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengePage;
