"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Pause, Play, Eye, Users, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MentorRegistrationForm } from '@/components/mentorship/MentorRegistrationForm';
import { ExpertiseBadge } from '@/components/mentorship/ExpertiseBadge';
import { RatingStars } from '@/components/mentorship/RatingStars';
import { useAuth } from '@/context/AuthContext';
import { mentorApi } from '@/lib/mentorship/api';
import type { MentorProfile, MentorRegistrationData } from '@/lib/mentorship/types';

export default function MyMentorProfilePage() {
    const router = useRouter();
    const { user, token, loading: authLoading } = useAuth();
    const [profile, setProfile] = useState<MentorProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth?redirect=/mentorship/my-profile');
        }
    }, [authLoading, user, router]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;
            try {
                const data = await mentorApi.getMyProfile();
                setProfile(data);
            } catch {
                setError('You are not registered as a mentor');
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchProfile();
    }, [token]);

    const handleUpdate = async (data: MentorRegistrationData) => {
        if (!token) return;
        const updated = await mentorApi.updateProfile(data);
        setProfile(updated);
        setIsEditing(false);
    };

    const handlePause = async () => {
        if (!token) return;
        try {
            const updated = await mentorApi.pause();
            setProfile(updated);
        } catch (err) {
            console.error('Failed to pause:', err);
        }
    };

    const handleResume = async () => {
        if (!token) return;
        try {
            const updated = await mentorApi.resume();
            setProfile(updated);
        } catch (err) {
            console.error('Failed to resume:', err);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 w-48 bg-white/10 rounded" />
                        <div className="h-64 bg-white/5 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-gray-400 mb-4">{error || 'Profile not found'}</p>
                    <Link href="/mentorship/become-mentor">
                        <Button className="bg-orange-500 hover:bg-orange-600">
                            Become a Mentor
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (isEditing) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Cancel Editing
                    </button>

                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                        <MentorRegistrationForm
                            onSubmit={handleUpdate}
                            onCancel={() => setIsEditing(false)}
                            initialData={{
                                expertiseAreas: profile.expertiseAreas,
                                bio: profile.bio,
                                availability: profile.availability,
                                maxMentees: profile.maxMentees,
                            }}
                            isEditing
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/8 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    <Link
                        href="/mentorship/dashboard"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-white">My Mentor Profile</h1>
                        <div className="flex gap-2">
                            <Link href={`/mentorship/mentor/${profile._id}`}>
                                <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Public
                                </Button>
                            </Link>
                            <Button onClick={() => setIsEditing(true)} size="sm">
                                Edit Profile
                            </Button>
                        </div>
                    </div>

                    {/* Status Banner */}
                    {profile.isPaused && (
                        <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Pause className="w-5 h-5 text-yellow-400" />
                                <span className="text-yellow-400">You&apos;re not accepting new mentees</span>
                            </div>
                            <Button onClick={handleResume} size="sm" className="bg-orange-500 hover:bg-orange-600">
                                <Play className="w-4 h-4 mr-2" />
                                Resume
                            </Button>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                            <Users className="w-5 h-5 text-blue-400 mb-2" />
                            <p className="text-2xl font-bold text-white">{profile.currentMenteeCount}</p>
                            <p className="text-sm text-gray-500">Current Mentees</p>
                        </div>
                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                            <Star className="w-5 h-5 text-yellow-400 mb-2" />
                            <div className="flex items-center gap-2">
                                <RatingStars rating={profile.rating} size="sm" />
                            </div>
                            <p className="text-sm text-gray-500">{profile.totalRatings} reviews</p>
                        </div>
                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                            <Users className="w-5 h-5 text-green-400 mb-2" />
                            <p className="text-2xl font-bold text-white">{profile.completedMentorships}</p>
                            <p className="text-sm text-gray-500">Completed</p>
                        </div>
                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                            <Calendar className="w-5 h-5 text-purple-400 mb-2" />
                            <p className="text-2xl font-bold text-white">{profile.totalSessionsCompleted}</p>
                            <p className="text-sm text-gray-500">Sessions</p>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <h2 className="text-lg font-semibold text-white mb-4">Expertise Areas</h2>
                            <div className="flex flex-wrap gap-2">
                                {profile.expertiseAreas.map(area => (
                                    <ExpertiseBadge key={area} area={area} />
                                ))}
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <h2 className="text-lg font-semibold text-white mb-4">Bio</h2>
                            <p className="text-gray-300 whitespace-pre-wrap">{profile.bio}</p>
                        </div>

                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <h2 className="text-lg font-semibold text-white mb-4">Availability</h2>
                            <div className="space-y-2 text-gray-300">
                                <p>{profile.availability.hoursPerWeek} hours per week</p>
                                <p>Max {profile.maxMentees} mentees</p>
                                <p className="text-sm text-gray-500">Timezone: {profile.availability.timezone}</p>
                            </div>
                        </div>

                        {/* Pause/Resume */}
                        {!profile.isPaused && (
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                <h2 className="text-lg font-semibold text-white mb-2">Accepting Mentees</h2>
                                <p className="text-gray-400 text-sm mb-4">
                                    You can pause accepting new mentees if you need a break.
                                </p>
                                <Button onClick={handlePause} variant="outline">
                                    <Pause className="w-4 h-4 mr-2" />
                                    Pause Accepting Mentees
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
