'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useCallback } from 'react';
import { Zap, Clock, CheckCircle, XCircle, Loader2, Brain, ArrowRight, Flame, TrendingUp, History, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

interface ChallengeData {
    _id: string;
    date: string;
    question: string;
    options: string[];
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    xpReward: number;
    totalAttempts: number;
    successRate: number | null;
    hasSubmitted: boolean;
    correctIndex?: number;
    explanation?: string;
    userSubmission?: {
        selectedIndex: number;
        isCorrect: boolean;
        xpEarned: number;
    };
    streak?: number;
    difficultyProgression?: {
        currentLevel: string;
        nextLevel: string;
        challengesUntilNext: number;
    };
}

interface ChallengeHistoryItem {
    _id: string;
    date: string;
    question: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    isCorrect: boolean;
    xpEarned: number;
}

const difficultyColors = {
    easy: 'text-green-400 bg-green-500/10 border-green-500/20',
    medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    hard: 'text-red-400 bg-red-500/10 border-red-500/20',
};

const difficultyOrder = ['easy', 'medium', 'hard'] as const;

const categoryLabels: Record<string, string> = {
    web: '🌐 Web',
    network: '🔌 Network',
    crypto: '🔐 Crypto',
    forensics: '🔍 Forensics',
    general: '📚 General',
    linux: '🐧 Linux',
    cloud: '☁️ Cloud',
    malware: '🦠 Malware',
};

export default function DailyChallenge() {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [challenge, setChallenge] = useState<ChallengeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<{ isCorrect: boolean; explanation: string; xpEarned: number; correctIndex: number } | null>(null);
    const [timeUntilNext, setTimeUntilNext] = useState('');
    const [showHistory, setShowHistory] = useState(false);
    const [history, setHistory] = useState<ChallengeHistoryItem[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    const fetchChallenge = useCallback(async () => {
        try {
            const data = await fetchApi('/api/daily-challenge/today');
            setChallenge(data.data);
            if (data.data?.hasSubmitted && data.data?.userSubmission) {
                setResult({
                    isCorrect: data.data.userSubmission.isCorrect,
                    explanation: data.data.explanation || '',
                    xpEarned: data.data.userSubmission.xpEarned,
                    correctIndex: data.data.correctIndex,
                });
                setSelectedOption(data.data.userSubmission.selectedIndex);
            }
        } catch (err) {
            console.error('Failed to fetch daily challenge:', err);
            addToast({ message: 'Failed to load daily challenge', variant: 'error' });
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchHistory = useCallback(async () => {
        if (historyLoading) return;
        setHistoryLoading(true);
        try {
            const data = await fetchApi('/api/daily-challenge/history?limit=7');
            setHistory(data.data || []);
        } catch {
            // History endpoint may not exist yet -- silently ignore
        } finally {
            setHistoryLoading(false);
        }
    }, [historyLoading]);

    useEffect(() => {
        if (user) fetchChallenge();
    }, [user, fetchChallenge]);

    // Countdown timer to next challenge (midnight UTC)
    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
            const diff = Math.max(0, tomorrow.getTime() - now.getTime());
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            setTimeUntilNext(`${hours}h ${minutes}m ${seconds}s`);
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async () => {
        if (selectedOption === null || submitting || result) return;
        setSubmitting(true);
        try {
            const data = await fetchApi('/api/daily-challenge/submit', {
                method: 'POST',
                body: JSON.stringify({ selectedIndex: selectedOption }),
            });
            setResult(data.data);
            // Update streak from response if available
            if (data.data?.streak !== undefined && challenge) {
                setChallenge({ ...challenge, streak: data.data.streak });
            }
        } catch (err) {
            console.error('Submit failed:', err);
            addToast({ message: 'Failed to submit answer', variant: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggleHistory = () => {
        if (!showHistory && history.length === 0) {
            fetchHistory();
        }
        setShowHistory(!showHistory);
    };

    if (!user) return null;

    if (loading) {
        return (
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex items-center justify-center h-48">
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!challenge) {
        return (
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                        <Brain className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm">Daily Challenge</h3>
                        <p className="text-gray-500 text-xs">No challenge available today</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Next challenge in {timeUntilNext}</span>
                </div>
            </div>
        );
    }

    const streak = challenge.streak ?? 0;
    const progression = challenge.difficultyProgression;
    const currentDifficultyIdx = difficultyOrder.indexOf(challenge.difficulty);

    return (
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm">Daily Challenge</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${difficultyColors[challenge.difficulty]}`}>
                                {challenge.difficulty}
                            </span>
                            <span className="text-[10px] text-gray-500">
                                {categoryLabels[challenge.category] || challenge.category}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* Streak display */}
                    {streak > 0 && (
                        <div className="flex items-center gap-1 text-orange-400" title={`${streak} day streak`}>
                            <Flame className="w-4 h-4" />
                            <span className="text-xs font-bold">{streak}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5 text-orange-400">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm font-semibold">+{challenge.xpReward} XP</span>
                    </div>
                </div>
            </div>

            {/* Difficulty Progression */}
            {progression && (
                <div className="mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-xs text-gray-400 font-medium">Difficulty Progression</span>
                    </div>
                    <div className="flex items-center gap-1">
                        {difficultyOrder.map((level, idx) => (
                            <div key={level} className="flex-1 flex flex-col items-center gap-1">
                                <div
                                    className={`h-1.5 w-full rounded-full ${
                                        idx <= currentDifficultyIdx
                                            ? idx === 0 ? 'bg-green-500' : idx === 1 ? 'bg-yellow-500' : 'bg-red-500'
                                            : 'bg-white/10'
                                    }`}
                                />
                                <span className={`text-[9px] ${idx === currentDifficultyIdx ? 'text-white font-medium' : 'text-gray-600'}`}>
                                    {level}
                                </span>
                            </div>
                        ))}
                    </div>
                    {progression.challengesUntilNext > 0 && (
                        <p className="text-[10px] text-gray-500 mt-1.5">
                            {progression.challengesUntilNext} more correct to unlock {progression.nextLevel}
                        </p>
                    )}
                </div>
            )}

            {/* Question */}
            <p className="text-white text-sm font-medium mb-4 leading-relaxed">{challenge.question}</p>

            {/* Options */}
            <div className="space-y-2 mb-4">
                {challenge.options.map((option, idx) => {
                    let optionStyle = 'border-white/10 hover:border-white/20 hover:bg-white/[0.03]';

                    if (result) {
                        if (idx === result.correctIndex) {
                            optionStyle = 'border-green-500/40 bg-green-500/10';
                        } else if (idx === selectedOption && !result.isCorrect) {
                            optionStyle = 'border-red-500/40 bg-red-500/10';
                        } else {
                            optionStyle = 'border-white/5 opacity-50';
                        }
                    } else if (idx === selectedOption) {
                        optionStyle = 'border-orange-500/50 bg-orange-500/10';
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => !result && setSelectedOption(idx)}
                            disabled={!!result}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${optionStyle}`}
                        >
                            <span className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-xs font-medium text-gray-400 shrink-0">
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                <span className={`${result && idx === result.correctIndex ? 'text-green-400' : result && idx === selectedOption && !result.isCorrect ? 'text-red-400' : 'text-gray-300'}`}>
                                    {option}
                                </span>
                                {result && idx === result.correctIndex && (
                                    <CheckCircle className="w-4 h-4 text-green-400 ml-auto shrink-0" />
                                )}
                                {result && idx === selectedOption && !result.isCorrect && (
                                    <XCircle className="w-4 h-4 text-red-400 ml-auto shrink-0" />
                                )}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Result / Submit */}
            {result ? (
                <div className={`rounded-xl p-4 border ${result.isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                    <div className="flex items-center gap-2 mb-2">
                        {result.isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                            <XCircle className="w-5 h-5 text-red-400" />
                        )}
                        <span className={`font-semibold text-sm ${result.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                            {result.isCorrect ? `Correct! +${result.xpEarned} XP` : 'Incorrect'}
                        </span>
                        {result.isCorrect && streak > 1 && (
                            <span className="ml-auto flex items-center gap-1 text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">
                                <Flame className="w-3 h-3" />
                                {streak} day streak!
                            </span>
                        )}
                    </div>
                    {/* Show explanation for both correct and incorrect answers */}
                    {result.explanation && (
                        <p className="text-xs text-gray-400 leading-relaxed">{result.explanation}</p>
                    )}
                    {!result.isCorrect && !result.explanation && (
                        <p className="text-xs text-gray-400 leading-relaxed">
                            The correct answer was <strong className="text-green-400">{challenge.options[result.correctIndex]}</strong>.
                        </p>
                    )}
                </div>
            ) : (
                <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null || submitting}
                    className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${selectedOption !== null
                            ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20'
                            : 'bg-white/5 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            Submit Answer
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            )}

            {/* Timer & History Toggle */}
            <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
                <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    Next challenge in {timeUntilNext}
                </span>
                <div className="flex items-center gap-3">
                    {challenge.successRate !== null && (
                        <span>{challenge.successRate}% success rate</span>
                    )}
                    <button
                        onClick={handleToggleHistory}
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                        <History className="w-3 h-3" />
                        History
                        {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                </div>
            </div>

            {/* Challenge History */}
            {showHistory && (
                <div className="mt-4 pt-4 border-t border-white/5">
                    <h4 className="text-xs font-medium text-gray-400 mb-3">Recent Challenges</h4>
                    {historyLoading ? (
                        <div className="flex justify-center py-4">
                            <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                        </div>
                    ) : history.length === 0 ? (
                        <p className="text-xs text-gray-600 text-center py-3">No challenge history yet</p>
                    ) : (
                        <div className="space-y-2">
                            {history.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5"
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        {item.isCorrect ? (
                                            <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                                        ) : (
                                            <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                                        )}
                                        <span className="text-xs text-gray-400 truncate">{item.question}</span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 ml-2">
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${difficultyColors[item.difficulty]}`}>
                                            {item.difficulty}
                                        </span>
                                        {item.xpEarned > 0 && (
                                            <span className="text-[10px] text-orange-400">+{item.xpEarned}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
