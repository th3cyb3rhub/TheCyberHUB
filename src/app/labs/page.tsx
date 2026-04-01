"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Flag, Loader2, Shield, AlertTriangle } from 'lucide-react';
import { fetchApi } from '@/lib/api';

const stubLabs = [
    { id: 'web-101', name: 'Web Security Lab 101', level: 'Beginner', focus: 'OWASP Top 10' },
    { id: 'net-recon', name: 'Network Recon Lab', level: 'Intermediate', focus: 'Scanning & Enumeration' },
    { id: 'cloud-intro', name: 'Cloud Security Lab', level: 'Advanced', focus: 'Misconfigurations' },
];

const LabsPage = () => {
    const { user, token } = useAuth();
    const { addToast } = useToast();
    const router = useRouter();
    const [pendingLabId, setPendingLabId] = useState<string | null>(null);

    const isAdmin = user?.role === 'admin';

    const callLabEndpoint = async (labId: string, action: 'start' | 'stop') => {
        if (!token) {
            addToast({
                variant: 'error',
                title: 'Sign in required',
                message: 'You must be signed in as admin to control labs.',
            });
            const redirectUrl = `${window.location.pathname}${window.location.search}`;
            router.push(`/auth?redirect=${encodeURIComponent(redirectUrl)}`);
            return;
        }

        setPendingLabId(`${labId}:${action}`);
        try {
            const data = await fetchApi(`/api/labs/${labId}/${action}`, {
                method: 'POST',
            });

            if (!data.success) {
                throw new Error(data.error || 'Request failed');
            }

            addToast({
                variant: 'success',
                title: `Lab ${action} requested`,
                message: data.message || `Lab ${labId} ${action} requested (stub).`,
            });
        } catch (err) {
            addToast({
                variant: 'error',
                title: 'Lab control failed',
                message: err instanceof Error ? err.message : 'Could not send lab control request.',
            });
        } finally {
            setPendingLabId(null);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                {/* Background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <Flag className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Coming Soon</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Hands-on <span className="gradient-text">Labs</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Dedicated, isolated environments for practicing real-world attacks and defenses.
                        Infrastructure is being prepared — labs will roll out gradually.
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">

                {/* Planned labs */}
                <div className="mb-10">
                    <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-400" />
                        Planned Lab Tracks
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {stubLabs.map((lab) => (
                            <div
                                key={lab.id}
                                className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]"
                            >
                                <p className="text-sm font-medium text-white mb-1">{lab.name}</p>
                                <p className="text-xs text-gray-500 mb-3">
                                    {lab.level} • {lab.focus}
                                </p>
                                <p className="text-xs text-gray-500">
                                    This lab will be available once our container infrastructure is live.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Admin stub controls */}
                <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-5 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-300 mb-1">Infra not ready yet</p>
                        <p className="text-xs text-yellow-200/80 mb-3">
                            Lab APIs are currently stubs. They accept requests but don&apos;t start real
                            containers yet. Use the controls below only for integration testing.
                        </p>

                        {isAdmin ? (
                            <div className="space-y-2">
                                {stubLabs.map((lab) => {
                                    const startKey = `${lab.id}:start`;
                                    const stopKey = `${lab.id}:stop`;
                                    return (
                                        <div key={lab.id} className="flex items-center justify-between text-xs text-gray-300">
                                            <span className="text-gray-200">{lab.name}</span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => callLabEndpoint(lab.id, 'start')}
                                                    disabled={pendingLabId === startKey}
                                                    className="px-3 py-1 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-300 disabled:opacity-60 flex items-center gap-1"
                                                >
                                                    {pendingLabId === startKey ? (
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                    ) : null}
                                                    <span>Start</span>
                                                </button>
                                                <button
                                                    onClick={() => callLabEndpoint(lab.id, 'stop')}
                                                    disabled={pendingLabId === stopKey}
                                                    className="px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 disabled:opacity-60 flex items-center gap-1"
                                                >
                                                    {pendingLabId === stopKey ? (
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                    ) : null}
                                                    <span>Stop</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-xs text-yellow-200/80">
                                Lab controls are currently visible to admins only. You&apos;ll get access to
                                labs once they are fully deployed.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LabsPage;
