"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Award, Users, Star, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MentorRegistrationForm } from '@/components/mentorship/MentorRegistrationForm';
import { useAuth } from '@/context/AuthContext';
import { mentorApi } from '@/lib/mentorship/api';
import type { MentorRegistrationData } from '@/lib/mentorship/types';

const REQUIRED_POINTS = 500;

export default function BecomeMentorPage() {
    const router = useRouter();
    const { user, token, loading: authLoading } = useAuth();
    const [isAlreadyMentor, setIsAlreadyMentor] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth?redirect=/mentorship/become-mentor');
        }
    }, [authLoading, user, router]);

    useEffect(() => {
        const checkMentorStatus = async () => {
            if (!token) return;
            try {
                await mentorApi.getMyProfile();
                setIsAlreadyMentor(true);
            } catch {
                setIsAlreadyMentor(false);
            } finally {
                setCheckingStatus(false);
            }
        };
        if (token) checkMentorStatus();
    }, [token]);

    const handleSubmit = async (data: MentorRegistrationData) => {
        if (!token) return;
        await mentorApi.register(data);
        router.push('/mentorship/my-profile');
    };

    if (authLoading || checkingStatus) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-2xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 w-48 bg-white/10 rounded" />
                        <div className="h-64 bg-white/5 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!user) return null;

    const userPoints = user.stats?.points ?? 0;
    const isEligible = userPoints >= REQUIRED_POINTS;
    const pointsNeeded = REQUIRED_POINTS - userPoints;

    if (isAlreadyMentor) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-2xl mx-auto">
                    <Link
                        href="/mentorship"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Mentorship
                    </Link>

                    <div className="p-8 rounded-2xl border border-green-500/30 bg-green-500/5 text-center">
                        <Award className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-white mb-2">You&apos;re Already a Mentor!</h1>
                        <p className="text-gray-400 mb-6">
                            You&apos;ve already registered as a mentor. Manage your profile to update your settings.
                        </p>
                        <Link href="/mentorship/my-profile">
                            <Button className="bg-orange-500 hover:bg-orange-600">
                                Manage Profile
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/8 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-2xl mx-auto">
                    <Link
                        href="/mentorship"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Mentorship
                    </Link>

                    {!isEligible ? (
                        <div className="p-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/5">
                            <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                            <h1 className="text-2xl font-bold text-white text-center mb-2">
                                Not Eligible Yet
                            </h1>
                            <p className="text-gray-400 text-center mb-6">
                                You need at least {REQUIRED_POINTS} points to become a mentor.
                                You currently have {userPoints} points.
                            </p>
                            <div className="mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">Progress</span>
                                    <span className="text-gray-400">{userPoints}/{REQUIRED_POINTS}</span>
                                </div>
                                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all"
                                        style={{ width: `${(userPoints / REQUIRED_POINTS) * 100}%` }}
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-2 text-center">
                                    {pointsNeeded} more points needed
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-400 mb-4">
                                    Earn points by solving challenges, participating in CTFs, and contributing to the community.
                                </p>
                                <Link href="/challenges">
                                    <Button className="bg-orange-500 hover:bg-orange-600">
                                        Solve Challenges
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Benefits */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-white mb-4">
                                    Become a <span className="gradient-text">Mentor</span>
                                </h1>
                                <p className="text-gray-400 mb-6">
                                    Share your expertise and help others grow in cybersecurity.
                                </p>
                                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                                        <Users className="w-8 h-8 text-blue-400 mb-3" />
                                        <h3 className="font-medium text-white mb-1">Help Others</h3>
                                        <p className="text-sm text-gray-500">Guide beginners on their journey</p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                                        <Star className="w-8 h-8 text-yellow-400 mb-3" />
                                        <h3 className="font-medium text-white mb-1">Earn Points</h3>
                                        <p className="text-sm text-gray-500">Get rewarded for your time</p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                                        <Award className="w-8 h-8 text-purple-400 mb-3" />
                                        <h3 className="font-medium text-white mb-1">Get Recognized</h3>
                                        <p className="text-sm text-gray-500">Earn badges and reputation</p>
                                    </div>
                                </div>
                            </div>

                            {/* Registration Form */}
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                <MentorRegistrationForm
                                    onSubmit={handleSubmit}
                                    onCancel={() => router.push('/mentorship')}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
