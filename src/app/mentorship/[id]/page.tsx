"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MessageSquare, Calendar, Star, BarChart3, Pause, Play, CheckCircle, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/mentorship/StatusBadge';
import { MessageList } from '@/components/mentorship/MessageList';
import { MessageInput } from '@/components/mentorship/MessageInput';
import { SessionCard } from '@/components/mentorship/SessionCard';
import { SessionForm } from '@/components/mentorship/SessionForm';
import { FeedbackCard } from '@/components/mentorship/FeedbackCard';
import { FeedbackForm } from '@/components/mentorship/FeedbackForm';
import { useAuth } from '@/context/AuthContext';
import { mentorshipApi, sessionApi, messageApi, feedbackApi } from '@/lib/mentorship/api';
import type { Mentorship, Session, Message, Feedback, SessionFormData, FeedbackFormData } from '@/lib/mentorship/types';

type TabType = 'overview' | 'messages' | 'sessions' | 'feedback';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function MentorshipDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { user, token, loading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [mentorship, setMentorship] = useState<Mentorship | null>(null);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showSessionForm, setShowSessionForm] = useState(false);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth?redirect=/mentorship/' + id);
        }
    }, [authLoading, user, router, id]);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            setLoading(true);
            try {
                const mentorshipData = await mentorshipApi.getById(id);
                setMentorship(mentorshipData);

                const [sessionsData, feedbackData] = await Promise.all([
                    sessionApi.getByMentorship(id),
                    feedbackApi.getByMentorship(id),
                ]);
                setSessions(sessionsData);
                setFeedback(feedbackData);
            } catch (err) {
                setError('Failed to load mentorship');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchData();
    }, [id, token]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!token || activeTab !== 'messages') return;
            try {
                const response = await messageApi.getMessages(id, 1, 100);
                setMessages(response.data);
            } catch (err) {
                console.error('Failed to load messages:', err);
            }
        };
        fetchMessages();
    }, [id, token, activeTab]);

    const handleSendMessage = async (content: string, contentType: string, codeLanguage?: string) => {
        if (!token) return;
        try {
            const newMessage = await messageApi.send(id, content, contentType, codeLanguage);
            setMessages(prev => [...prev, newMessage]);
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    const handleSendFile = async (file: File) => {
        if (!token) return;
        try {
            const newMessage = await messageApi.sendFile(id, file);
            setMessages(prev => [...prev, newMessage]);
        } catch (err) {
            console.error('Failed to send file:', err);
        }
    };

    const handleCreateSession = async (data: SessionFormData) => {
        if (!token) return;
        const newSession = await sessionApi.create({ ...data, mentorshipId: id });
        setSessions(prev => [...prev, newSession]);
        setShowSessionForm(false);
    };

    const handleSubmitFeedback = async (data: FeedbackFormData) => {
        if (!token) return;
        const newFeedback = await feedbackApi.submit({ ...data, mentorshipId: id });
        setFeedback(prev => [...prev, newFeedback]);
        setShowFeedbackForm(false);
        setSelectedSession(null);
    };

    const handlePause = async () => {
        if (!token || !mentorship) return;
        try {
            const updated = await mentorshipApi.pause(id, 'Taking a break');
            setMentorship(updated);
        } catch (err) {
            console.error('Failed to pause:', err);
        }
    };

    const handleResume = async () => {
        if (!token || !mentorship) return;
        try {
            const updated = await mentorshipApi.resume(id);
            setMentorship(updated);
        } catch (err) {
            console.error('Failed to resume:', err);
        }
    };

    const handleComplete = async () => {
        if (!token || !mentorship) return;
        try {
            const updated = await mentorshipApi.complete(id);
            setMentorship(updated);
        } catch (err) {
            console.error('Failed to complete:', err);
        }
    };

    const handleExtend = async () => {
        if (!token || !mentorship) return;
        try {
            const updated = await mentorshipApi.extend(id, 1);
            setMentorship(updated);
        } catch (err) {
            console.error('Failed to extend:', err);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 w-32 bg-white/10 rounded" />
                        <div className="h-32 bg-white/5 rounded-2xl" />
                        <div className="h-64 bg-white/5 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !mentorship || !user) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-red-400 mb-4">{error || 'Mentorship not found'}</p>
                    <Link href="/mentorship/dashboard">
                        <Button variant="outline">Back to Dashboard</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const isMentor = mentorship.mentor._id === user.id;
    const partner = isMentor ? mentorship.mentee : mentorship.mentor;
    const upcomingSessions = sessions.filter(s => s.status === 'scheduled' && new Date(s.scheduledAt) > new Date());
    const pastSessions = sessions.filter(s => s.status === 'completed' || new Date(s.scheduledAt) <= new Date());
    const daysRemaining = Math.max(0, Math.ceil((new Date(mentorship.expectedEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
    const totalDays = Math.ceil((new Date(mentorship.expectedEndDate).getTime() - new Date(mentorship.startDate).getTime()) / (1000 * 60 * 60 * 24));
    const progress = Math.min(100, ((totalDays - daysRemaining) / totalDays) * 100);
    const canExtend = mentorship.extensions.length < 3;

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/8 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/mentorship/dashboard"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    {/* Header */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="flex items-center gap-4">
                                {partner.avatar ? (
                                    <Image src={partner.avatar} alt={partner.name} width={56} height={56} className="w-14 h-14 rounded-xl object-cover" unoptimized />
                                ) : (
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                                        <span className="text-xl font-bold text-white">{partner.name.charAt(0)}</span>
                                    </div>
                                )}
                                <div>
                                    <h1 className="text-xl font-bold text-white">{partner.name}</h1>
                                    <p className="text-gray-400 text-sm">
                                        {isMentor ? 'Your Mentee' : 'Your Mentor'}
                                    </p>
                                </div>
                            </div>
                            <StatusBadge status={mentorship.status} />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mb-6 p-1 bg-white/5 rounded-xl overflow-x-auto">
                        {[
                            { id: 'overview', label: 'Overview', icon: BarChart3 },
                            { id: 'messages', label: 'Messages', icon: MessageSquare },
                            { id: 'sessions', label: 'Sessions', icon: Calendar },
                            { id: 'feedback', label: 'Feedback', icon: Star },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-orange-500 text-white'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Progress */}
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                <h2 className="text-lg font-semibold text-white mb-4">Progress</h2>
                                <div className="grid sm:grid-cols-3 gap-6 mb-6">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Total Hours</p>
                                        <p className="text-2xl font-bold text-white">{mentorship.totalHours}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Sessions</p>
                                        <p className="text-2xl font-bold text-white">{mentorship.sessionsCompleted}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Days Remaining</p>
                                        <p className="text-2xl font-bold text-white">{daysRemaining}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Time Progress</span>
                                        <span className="text-gray-400">{Math.round(progress)}%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            {mentorship.status === 'active' && (
                                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                    <h2 className="text-lg font-semibold text-white mb-4">Actions</h2>
                                    <div className="flex flex-wrap gap-3">
                                        <Button onClick={handlePause} variant="outline">
                                            <Pause className="w-4 h-4 mr-2" />
                                            Pause
                                        </Button>
                                        {canExtend && (
                                            <Button onClick={handleExtend} variant="outline">
                                                <Clock className="w-4 h-4 mr-2" />
                                                Extend 1 Month
                                            </Button>
                                        )}
                                        <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Complete
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {mentorship.status === 'paused' && (
                                <div className="p-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/5">
                                    <p className="text-yellow-400 mb-3">This mentorship is paused</p>
                                    <Button onClick={handleResume} className="bg-orange-500 hover:bg-orange-600">
                                        <Play className="w-4 h-4 mr-2" />
                                        Resume
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                            <div className="h-[500px] flex flex-col">
                                <div className="flex-1 overflow-hidden">
                                    <MessageList messages={messages} currentUserId={user.id} />
                                </div>
                                <div className="border-t border-white/10 p-4">
                                    <MessageInput
                                        onSend={handleSendMessage}
                                        onSendFile={handleSendFile}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'sessions' && (
                        <div className="space-y-6">
                            {isMentor && mentorship.status === 'active' && (
                                <Button
                                    onClick={() => setShowSessionForm(true)}
                                    className="bg-orange-500 hover:bg-orange-600"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Schedule Session
                                </Button>
                            )}

                            {upcomingSessions.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-white mb-4">Upcoming Sessions</h2>
                                    <div className="space-y-3">
                                        {upcomingSessions.map(session => (
                                            <SessionCard key={session._id} session={session} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {pastSessions.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-white mb-4">Past Sessions</h2>
                                    <div className="space-y-3">
                                        {pastSessions.map(session => (
                                            <SessionCard
                                                key={session._id}
                                                session={session}
                                                onFeedback={() => {
                                                    setSelectedSession(session);
                                                    setShowFeedbackForm(true);
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {sessions.length === 0 && (
                                <div className="text-center py-12">
                                    <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-white mb-2">No sessions yet</h3>
                                    <p className="text-gray-400">
                                        {isMentor ? 'Schedule your first session' : 'Your mentor will schedule sessions'}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'feedback' && (
                        <div className="space-y-6">
                            {feedback.length > 0 ? (
                                <div className="space-y-4">
                                    {feedback.map(fb => (
                                        <FeedbackCard key={fb._id} feedback={fb} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-white mb-2">No feedback yet</h3>
                                    <p className="text-gray-400">
                                        Feedback will appear here after sessions
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Session Form Modal */}
            {showSessionForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                    <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-2xl border border-white/10 bg-black" role="dialog" aria-modal="true" aria-label="Schedule session">
                        <SessionForm
                            mentorshipId={id}
                            onSubmit={handleCreateSession}
                            onClose={() => setShowSessionForm(false)}
                        />
                    </div>
                </div>
            )}

            {/* Feedback Form Modal */}
            {showFeedbackForm && selectedSession && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                    <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-2xl border border-white/10 bg-black" role="dialog" aria-modal="true" aria-label="Submit feedback">
                        <FeedbackForm
                            mentorshipId={id}
                            sessionId={selectedSession._id}
                            type="session"
                            onSubmit={handleSubmitFeedback}
                            onClose={() => {
                                setShowFeedbackForm(false);
                                setSelectedSession(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
