/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Monitor, Smartphone, Globe, Trash2, Loader2, Shield, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';

interface Session {
    id: string;
    userAgent: string;
    ipAddress: string;
    lastUsed: string;
    createdAt: string;
}

const SessionsPage = () => {
    const { token } = useAuth();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [revoking, setRevoking] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSessions();
    }, [token]);

    const fetchSessions = async () => {
        if (!token) return;
        try {
            const data = await fetchApi('/api/auth/sessions');
            if (data.success) {
                setSessions(data.data);
            }
        } catch {
            setError('Failed to load sessions');
        } finally {
            setLoading(false);
        }
    };

    const revokeSession = async (sessionId: string) => {
        if (!token) return;
        setRevoking(sessionId);
        try {
            await fetchApi(`/api/auth/sessions/${sessionId}`, {
                method: 'DELETE',
            });
            setSessions(prev => prev.filter(s => s.id !== sessionId));
        } catch {
            setError('Failed to revoke session');
        } finally {
            setRevoking(null);
        }
    };

    const getDeviceIcon = (userAgent: string) => {
        const ua = userAgent.toLowerCase();
        if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
            return <Smartphone className="w-5 h-5" />;
        }
        return <Monitor className="w-5 h-5" />;
    };

    const getDeviceName = (userAgent: string) => {
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        return 'Unknown Browser';
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4">
            <div className="max-w-2xl mx-auto">
                <Link href="/profile" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
                    <ArrowLeft className="w-4 h-4" /> Back to Profile
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Active Sessions</h1>
                        <p className="text-gray-400 text-sm">Manage your logged-in devices</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> {error}
                    </div>
                )}

                <div className="space-y-4">
                    {sessions.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No active sessions found</p>
                        </div>
                    ) : (
                        sessions.map((session, index) => (
                            <div key={session.id} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400">
                                        {getDeviceIcon(session.userAgent)}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium flex items-center gap-2">
                                            {getDeviceName(session.userAgent)}
                                            {index === 0 && <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">Current</span>}
                                        </p>
                                        <p className="text-sm text-gray-500">{session.ipAddress} • Last active {formatDate(session.lastUsed)}</p>
                                    </div>
                                </div>
                                {index !== 0 && (
                                    <button
                                        onClick={() => revokeSession(session.id)}
                                        disabled={revoking === session.id}
                                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        {revoking === session.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SessionsPage;
