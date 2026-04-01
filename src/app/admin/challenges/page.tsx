// app/admin/challenges/page.tsx
"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Play, Square, BarChart3, Settings, Plus, Loader2, AlertCircle } from 'lucide-react';
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/ConfirmDialog';
import { fetchApi } from '@/lib/api';

interface Solve {
    user: string;
    solvedAt: string;
}

interface Challenge {
    _id: string;
    title: string;
    status: 'active' | 'draft' | 'archived';
    basePoints: number;
    solves: Solve[];
    category: string;
    difficulty: string;
}

const statusColor = (status: string) => {
    switch (status) {
        case 'active': return 'text-green-400 bg-green-500/10 border-green-500/30';
        case 'draft': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
        case 'archived': return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
        default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
};

export default function AdminChallenges() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const { isOpen: confirmOpen, confirm: showConfirm, onConfirm, onCancel } = useConfirmDialog();

    useEffect(() => {
        fetchChallenges();
    }, []);

    const fetchChallenges = async () => {
        try {
            setLoading(true);
            const data = await fetchApi('/api/challenges?status=all&limit=100');

            if (data.success) {
                setChallenges(data.data);
            } else {
                setError(data.error?.message || 'Failed to load challenges');
            }
        } catch (err) {
            console.error('Error fetching challenges:', err);
            setError('Failed to connect to API');
        } finally {
            setLoading(false);
        }
    };

    const updateChallengeStatus = async (id: string, status: 'active' | 'draft' | 'archived') => {
        setActionLoading(id);
        try {
            const data = await fetchApi(`/api/challenges/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ status }),
            });

            if (data.success) {
                setChallenges(prev =>
                    prev.map(c => c._id === id ? { ...c, status } : c)
                );
            } else {
                alert('Failed to update challenge status');
            }
        } catch (err) {
            console.error('Error updating challenge:', err);
            alert('Failed to update challenge status');
        } finally {
            setActionLoading(null);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleteChallenge = async (id: string) => {
        const confirmed = await showConfirm();
        if (!confirmed) return;

        setActionLoading(id);
        try {
            const data = await fetchApi(`/api/challenges/${id}`, {
                method: 'DELETE',
            });

            if (data.success) {
                setChallenges(prev => prev.filter(c => c._id !== id));
            } else {
                alert('Failed to delete challenge');
            }
        } catch (err) {
            console.error('Error deleting challenge:', err);
            alert('Failed to delete challenge');
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 pt-28 pb-16 flex items-center justify-center">
                <div className="flex items-center gap-2 text-gray-400">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading challenges...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 pt-28 pb-16 flex items-center justify-center">
                <div className="flex items-center gap-2 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 pt-28 pb-16">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-sm text-gray-500">Admin</p>
                        <h1 className="text-3xl font-bold text-white">Challenges</h1>
                        <p className="text-sm text-gray-400 mt-1">{challenges.length} total challenges</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/challenges/new"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium"
                        >
                            <Plus className="w-4 h-4" /> New Challenge
                        </Link>
                        <Link
                            href="/ctf"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-200 hover:text-white hover:bg-white/10"
                        >
                            <Shield className="w-4 h-4" /> View CTF
                        </Link>
                    </div>
                </div>

                {challenges.length === 0 ? (
                    <div className="text-center py-16">
                        <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg text-gray-400 mb-2">No challenges yet</h3>
                        <p className="text-sm text-gray-500 mb-6">Create your first CTF challenge to get started</p>
                        <Link
                            href="/admin/challenges/new"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium"
                        >
                            <Plus className="w-4 h-4" /> Create Challenge
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {challenges.map((c) => (
                            <div key={c._id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1 flex-1">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="text-lg text-white font-semibold">{c.title}</h3>
                                            <span className={`px-2 py-1 text-xs rounded-md border ${statusColor(c.status)}`}>
                                                {c.status}
                                            </span>
                                            <span className="px-2 py-1 text-xs rounded-md text-blue-400 bg-blue-500/10 border border-blue-500/30">
                                                {c.category}
                                            </span>
                                            <span className="px-2 py-1 text-xs rounded-md text-purple-400 bg-purple-500/10 border border-purple-500/30">
                                                {c.difficulty}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            Points: {c.basePoints} · Solves: {c.solves?.length || 0}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        {actionLoading === c._id ? (
                                            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                        ) : (
                                            <>
                                                {c.status !== 'active' && (
                                                    <button
                                                        onClick={() => updateChallengeStatus(c._id, 'active')}
                                                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-1"
                                                    >
                                                        <Play className="w-4 h-4" /> Activate
                                                    </button>
                                                )}
                                                {c.status !== 'archived' && (
                                                    <button
                                                        onClick={() => updateChallengeStatus(c._id, 'archived')}
                                                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-1"
                                                    >
                                                        <Square className="w-4 h-4" /> Archive
                                                    </button>
                                                )}
                                                <Link
                                                    href={`/ctf/challenges/${c._id}`}
                                                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-1"
                                                >
                                                    <BarChart3 className="w-4 h-4" /> Stats
                                                </Link>
                                                <Link
                                                    href={`/admin/challenges/${c._id}/edit`}
                                                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-1"
                                                >
                                                    <Settings className="w-4 h-4" /> Edit
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={confirmOpen}
                onConfirm={onConfirm}
                onCancel={onCancel}
                title="Delete challenge?"
                description="Are you sure you want to delete this challenge?"
                confirmText="Delete"
                variant="danger"
            />
        </div>
    );
}
