"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { ExternalLink, Flag, Loader2, Shield } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface Lab {
    _id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
    tags: string[];
    labUrl?: string;
}

const DIFFICULTY_COLORS: Record<string, string> = {
    easy: 'text-green-400 bg-green-400/10 border-green-400/20',
    medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    hard: 'text-red-400 bg-red-400/10 border-red-400/20',
};

const LabsPage = () => {
    const { user } = useAuth();
    const { addToast } = useToast();
    const router = useRouter();
    const [labs, setLabs] = useState<Lab[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApi('/api/labs')
            .then((data) => {
                if (data?.success) setLabs(data.data ?? []);
            })
            .catch(() => {
                // Silently fail — page still renders with empty state
            })
            .finally(() => setLoading(false));
    }, []);

    const handleLaunch = (lab: Lab) => {
        if (!user) {
            addToast({
                variant: 'error',
                title: 'Sign in required',
                message: 'You must be signed in to launch a lab.',
            });
            const redirectUrl = `${window.location.pathname}${window.location.search}`;
            router.push(`/auth?redirect=${encodeURIComponent(redirectUrl)}`);
            return;
        }

        if (!lab.labUrl) {
            addToast({
                variant: 'info',
                title: 'Coming soon',
                message: 'This lab environment is not yet available.',
            });
            return;
        }

        window.open(lab.labUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <Flag className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Hands-on Practice</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Security <span className="gradient-text">Labs</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Dedicated, isolated environments for practicing real-world attacks and defenses.
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                    </div>
                ) : labs.length === 0 ? (
                    <div className="text-center py-20">
                        <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg font-medium mb-2">Labs coming soon</p>
                        <p className="text-gray-600 text-sm">
                            Isolated lab environments are being prepared. Check back shortly.
                        </p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                        {labs.map((lab) => (
                            <div
                                key={lab._id}
                                className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col gap-3"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <p className="text-sm font-semibold text-white leading-snug">{lab.title}</p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full border capitalize shrink-0 ${DIFFICULTY_COLORS[lab.difficulty] ?? 'text-gray-400'}`}>
                                        {lab.difficulty}
                                    </span>
                                </div>

                                <p className="text-xs text-gray-500 line-clamp-2">{lab.description}</p>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs text-gray-600 capitalize">
                                        {lab.category.replace(/-/g, ' ')} · {lab.points} pts
                                    </span>
                                    <button
                                        onClick={() => handleLaunch(lab)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 text-xs font-medium transition-colors"
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                        {lab.labUrl ? 'Launch' : 'Coming soon'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LabsPage;
