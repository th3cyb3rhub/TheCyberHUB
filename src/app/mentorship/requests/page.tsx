"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Inbox, X, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RequestCard } from '@/components/mentorship/RequestCard';
import { useAuth } from '@/context/AuthContext';
import { requestApi } from '@/lib/mentorship/api';
import type { MentorshipRequest } from '@/lib/mentorship/types';

export default function RequestsPage() {
    const router = useRouter();
    const { user, token, loading: authLoading } = useAuth();
    const [myRequests, setMyRequests] = useState<MentorshipRequest[]>([]);
    const [incomingRequests, setIncomingRequests] = useState<MentorshipRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth?redirect=/mentorship/requests');
        }
    }, [authLoading, user, router]);

    useEffect(() => {
        const fetchRequests = async () => {
            if (!token) return;
            setLoading(true);
            try {
                const [myData, incomingData] = await Promise.all([
                    requestApi.getMyRequests(),
                    requestApi.getIncoming().catch(() => []),
                ]);
                setMyRequests(myData);
                setIncomingRequests(incomingData);
            } catch (err) {
                setError('Failed to load requests');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchRequests();
    }, [token]);

    const handleCancel = async (requestId: string) => {
        if (!token) return;
        try {
            await requestApi.cancel(requestId);
            setMyRequests(prev => prev.filter(r => r._id !== requestId));
        } catch (err) {
            console.error('Failed to cancel request:', err);
        }
    };

    const handleAccept = async (requestId: string) => {
        if (!token) return;
        try {
            await requestApi.accept(requestId);
            setIncomingRequests(prev => prev.filter(r => r._id !== requestId));
        } catch (err) {
            console.error('Failed to accept request:', err);
        }
    };

    const handleDecline = async (requestId: string) => {
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
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 w-48 bg-white/10 rounded" />
                        <div className="h-32 bg-white/5 rounded-xl" />
                        <div className="h-32 bg-white/5 rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    const pendingRequests = myRequests.filter(r => r.status === 'pending' || r.status === 'matched');
    const pastRequests = myRequests.filter(r => r.status !== 'pending' && r.status !== 'matched');

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/8 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/mentorship/dashboard"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    <h1 className="text-2xl font-bold text-white mb-8">Mentorship Requests</h1>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-32 bg-white/5 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-red-400">{error}</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Incoming Requests (as Mentor) */}
                            {incomingRequests.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Inbox className="w-5 h-5 text-purple-500" />
                                        Incoming Requests
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded-full">
                                            {incomingRequests.length}
                                        </span>
                                    </h2>
                                    <div className="space-y-4">
                                        {incomingRequests.map(request => (
                                            <RequestCard
                                                key={request._id}
                                                request={request}
                                                variant="incoming"
                                                onAccept={() => handleAccept(request._id)}
                                                onDecline={() => handleDecline(request._id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* My Pending Requests (as Mentee) */}
                            {pendingRequests.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-yellow-500" />
                                        My Pending Requests
                                    </h2>
                                    <div className="space-y-4">
                                        {pendingRequests.map(request => (
                                            <div key={request._id} className="relative">
                                                <RequestCard request={request} variant="outgoing" />
                                                <button
                                                    onClick={() => handleCancel(request._id)}
                                                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-400 transition-colors"
                                                    title="Cancel request"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Past Requests */}
                            {pastRequests.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-gray-500" />
                                        Past Requests
                                    </h2>
                                    <div className="space-y-4">
                                        {pastRequests.map(request => (
                                            <RequestCard
                                                key={request._id}
                                                request={request}
                                                variant="outgoing"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Empty State */}
                            {incomingRequests.length === 0 && myRequests.length === 0 && (
                                <div className="text-center py-12">
                                    <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-white mb-2">No requests</h3>
                                    <p className="text-gray-400 mb-4">
                                        You don&apos;t have any mentorship requests yet.
                                    </p>
                                    <Link href="/mentorship">
                                        <Button className="bg-orange-500 hover:bg-orange-600">
                                            Find a Mentor
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
