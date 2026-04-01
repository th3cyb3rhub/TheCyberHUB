"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users, UserCheck, Clock, ChevronRight, Plus, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MentorshipCard } from '@/components/mentorship/MentorshipCard';
import { RequestCard } from '@/components/mentorship/RequestCard';
import { useAuth } from '@/context/AuthContext';
import { mentorshipApi, requestApi } from '@/lib/mentorship/api';
import type { Mentorship, MentorshipRequest } from '@/lib/mentorship/types';

type TabType = 'mentee' | 'mentor';

export default function MentorshipDashboardPage() {
    const router = useRouter();
    const { user, token, loading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>('mentee');
    const [mentorships, setMentorships] = useState<Mentorship[]>([]);
    const [pendingRequests, setPendingRequests] = useState<MentorshipRequest[]>([]);
    const [incomingRequests, setIncomingRequests] = useState<MentorshipRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth?redirect=/mentorship/dashboard');
        }
    }, [authLoading, user, router]);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            setLoading(true);
            try {
                const [mentorshipsData, pendingData, incomingData] = await Promise.all([
                    mentorshipApi.getMyMentorships(),
                    requestApi.getMyRequests(),
                    requestApi.getIncoming().catch(() => []),
                ]);
                setMentorships(mentorshipsData);
                setPendingRequests(pendingData.filter(r => r.status === 'pending' || r.status === 'matched'));
                setIncomingRequests(incomingData);
            } catch (err) {
                setError('Failed to load dashboard data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchData();
    }, [token]);

    const handleAcceptRequest = async (requestId: string) => {
        if (!token) return;
        try {
            await requestApi.accept(requestId);
            setIncomingRequests(prev => prev.filter(r => r._id !== requestId));
            const updated = await mentorshipApi.getMyMentorships();
            setMentorships(updated);
        } catch (err) {
            console.error('Failed to accept request:', err);
        }
    };

    const handleDeclineRequest = async (requestId: string) => {
        if (!token) return;
        try {
            await requestApi.decline(requestId);
            setIncomingRequests(prev => prev.filter(r => r._id !== requestId));
        } catch (err) {
            console.error('Failed to decline request:', err);
        }
    };

    if (authLoading || !user) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 w-48 bg-white/10 rounded" />
                        <div className="h-12 bg-white/5 rounded-xl" />
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-48 bg-white/5 rounded-xl" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const asMentee = mentorships.filter(m => m.mentee._id === user.id);
    const asMentor = mentorships.filter(m => m.mentor._id === user.id);
    const activeMenteeships = asMentee.filter(m => m.status === 'active');
    const activeMentorships = asMentor.filter(m => m.status === 'active');

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/8 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <Users className="w-4 h-4" />
                            <span>Mentorship</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                    My <span className="gradient-text">Mentorships</span>
                                </h1>
                                <p className="text-gray-400">
                                    Manage your mentorship relationships
                                </p>
                            </div>
                            <Link href="/mentorship">
                                <Button className="bg-orange-500 hover:bg-orange-600">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Find a Mentor
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <UserCheck className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">{activeMenteeships.length}</p>
                                    <p className="text-sm text-gray-500">As Mentee</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">{activeMentorships.length}</p>
                                    <p className="text-sm text-gray-500">As Mentor</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-yellow-400" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">{pendingRequests.length}</p>
                                    <p className="text-sm text-gray-500">Pending</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                    <Inbox className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">{incomingRequests.length}</p>
                                    <p className="text-sm text-gray-500">Incoming</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl w-fit">
                        <button
                            onClick={() => setActiveTab('mentee')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'mentee'
                                ? 'bg-orange-500 text-white'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            As Mentee ({asMentee.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('mentor')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'mentor'
                                ? 'bg-orange-500 text-white'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            As Mentor ({asMentor.length})
                        </button>
                    </div>

                    {loading ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-48 bg-white/5 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-red-400">{error}</p>
                        </div>
                    ) : (
                        <>
                            {/* Mentee Tab */}
                            {activeTab === 'mentee' && (
                                <div className="space-y-6">
                                    {/* Pending Requests */}
                                    {pendingRequests.length > 0 && (
                                        <div>
                                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-yellow-500" />
                                                Pending Requests
                                            </h2>
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {pendingRequests.map(request => (
                                                    <RequestCard
                                                        key={request._id}
                                                        request={request}
                                                        variant="outgoing"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Active Mentorships */}
                                    {asMentee.length > 0 ? (
                                        <div>
                                            <h2 className="text-lg font-semibold text-white mb-4">
                                                My Mentors
                                            </h2>
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {asMentee.map(mentorship => (
                                                    <MentorshipCard
                                                        key={mentorship._id}
                                                        mentorship={mentorship}
                                                        role="mentee"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ) : pendingRequests.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-white mb-2">
                                                No mentorships yet
                                            </h3>
                                            <p className="text-gray-400 mb-4">
                                                Find a mentor to start your learning journey
                                            </p>
                                            <Link href="/mentorship">
                                                <Button className="bg-orange-500 hover:bg-orange-600">
                                                    Browse Mentors
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : null}
                                </div>
                            )}

                            {/* Mentor Tab */}
                            {activeTab === 'mentor' && (
                                <div className="space-y-6">
                                    {/* Incoming Requests */}
                                    {incomingRequests.length > 0 && (
                                        <div>
                                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                                <Inbox className="w-5 h-5 text-purple-500" />
                                                Incoming Requests
                                            </h2>
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {incomingRequests.map(request => (
                                                    <RequestCard
                                                        key={request._id}
                                                        request={request}
                                                        variant="incoming"
                                                        onAccept={() => handleAcceptRequest(request._id)}
                                                        onDecline={() => handleDeclineRequest(request._id)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Active Mentorships */}
                                    {asMentor.length > 0 ? (
                                        <div>
                                            <h2 className="text-lg font-semibold text-white mb-4">
                                                My Mentees
                                            </h2>
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {asMentor.map(mentorship => (
                                                    <MentorshipCard
                                                        key={mentorship._id}
                                                        mentorship={mentorship}
                                                        role="mentor"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ) : incomingRequests.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-white mb-2">
                                                No mentees yet
                                            </h3>
                                            <p className="text-gray-400 mb-4">
                                                Become a mentor to help others grow
                                            </p>
                                            <Link href="/mentorship/become-mentor">
                                                <Button className="bg-orange-500 hover:bg-orange-600">
                                                    Become a Mentor
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </>
                    )}

                    {/* Quick Links */}
                    <div className="mt-10 grid sm:grid-cols-2 gap-4">
                        <Link
                            href="/mentorship/requests"
                            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-orange-500/40 transition-all flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-orange-500" />
                                <span className="text-white">Manage Requests</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                        </Link>
                        <Link
                            href="/mentorship/my-profile"
                            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-orange-500/40 transition-all flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <UserCheck className="w-5 h-5 text-orange-500" />
                                <span className="text-white">Mentor Profile</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
