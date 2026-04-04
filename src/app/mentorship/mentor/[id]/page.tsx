"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Users, Award, MessageSquare, CheckCircle, XCircle, Star, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExpertiseBadge } from '@/components/mentorship/ExpertiseBadge';
import { RatingStars } from '@/components/mentorship/RatingStars';
import { RequestForm } from '@/components/mentorship/RequestForm';
import { mentorApi, requestApi } from '@/lib/mentorship/api';
import { useAuth } from '@/context/AuthContext';
import type { MentorProfile, RequestFormData } from '@/lib/mentorship/types';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function MentorProfilePage({ params }: PageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { user, token } = useAuth();
    const [mentor, setMentor] = useState<MentorProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [, setRequestSubmitting] = useState(false);

    useEffect(() => {
        const fetchMentor = async () => {
            try {
                const data = await mentorApi.getById(id);
                setMentor(data);
            } catch (err) {
                setError('Failed to load mentor profile');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMentor();
    }, [id]);

    const handleRequestSubmit = async (data: RequestFormData) => {
        if (!token) {
            router.push('/auth?redirect=/mentorship/mentor/' + id);
            return;
        }
        setRequestSubmitting(true);
        try {
            await requestApi.create({ ...data, mentorId: id });
            setShowRequestForm(false);
            router.push('/mentorship/requests');
        } catch (err) {
            throw err;
        } finally {
            setRequestSubmitting(false);
        }
    };

    const isAvailable = mentor && !mentor.isPaused && mentor.currentMenteeCount < mentor.maxMentees;
    const isOwnProfile = user && mentor && user.id === mentor.user._id;

    if (loading) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 w-32 bg-white/10 rounded" />
                        <div className="h-48 bg-white/5 rounded-2xl" />
                        <div className="h-64 bg-white/5 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !mentor) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-red-400 mb-4">{error || 'Mentor not found'}</p>
                    <Link href="/mentorship">
                        <Button variant="outline">Back to Directory</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const getDayName = (day: number) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[day];
    };

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/8 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/mentorship"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Directory
                    </Link>

                    {/* Profile Header */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                {mentor.user.avatar ? (
                                    <Image
                                        src={mentor.user.avatar}
                                        alt={mentor.user.name}
                                        width={96}
                                        height={96}
                                        className="w-24 h-24 rounded-2xl object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                                        <span className="text-3xl font-bold text-white">
                                            {mentor.user.name.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h1 className="text-2xl font-bold text-white mb-1">
                                            {mentor.user.name}
                                        </h1>
                                        <p className="text-gray-400 mb-3">@{mentor.user.username}</p>
                                        <div className="flex items-center gap-4 mb-4">
                                            <RatingStars rating={mentor.rating} />
                                            <span className="text-sm text-gray-500">
                                                ({mentor.totalRatings} reviews)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${isAvailable
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                                        : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                                        }`}>
                                        {isAvailable ? (
                                            <span className="flex items-center gap-1.5">
                                                <CheckCircle className="w-4 h-4" />
                                                Available
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5">
                                                <XCircle className="w-4 h-4" />
                                                {mentor.isPaused ? 'Paused' : 'At Capacity'}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Expertise */}
                                <div className="flex flex-wrap gap-2">
                                    {mentor.expertiseAreas.map(area => (
                                        <ExpertiseBadge key={area} area={area} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Bio */}
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                <h2 className="text-lg font-semibold text-white mb-4">About</h2>
                                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                    {mentor.bio}
                                </p>
                            </div>

                            {/* Video Introduction */}
                            {mentor.videoIntroUrl && (
                                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <PlayCircle className="w-5 h-5 text-orange-500" />
                                        Video Introduction
                                    </h2>
                                    <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
                                        <video
                                            src={mentor.videoIntroUrl}
                                            controls
                                            className="w-full h-full object-cover"
                                            preload="metadata"
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            )}

                            {/* Availability */}
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-orange-500" />
                                    Availability
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <span>{mentor.availability.hoursPerWeek} hours per week</span>
                                    </div>
                                    {mentor.availability.preferredTimes.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-500 mb-2">Preferred times:</p>
                                            <div className="space-y-2">
                                                {mentor.availability.preferredTimes.map((time, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                                        <span className="w-24">{getDayName(time.dayOfWeek)}</span>
                                                        <span className="text-gray-500">
                                                            {time.startHour.toString().padStart(2, '0')}:00 - {time.endHour.toString().padStart(2, '0')}:00
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-500 mt-2">
                                        Timezone: {mentor.availability.timezone}
                                    </p>
                                </div>
                            </div>

                            {/* Reviews */}
                            {mentor.reviews && mentor.reviews.length > 0 && (
                                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Star className="w-5 h-5 text-yellow-400" />
                                        Reviews ({mentor.totalRatings})
                                    </h2>
                                    <div className="space-y-4">
                                        {mentor.reviews.map((review, i) => (
                                            <div key={i} className="p-4 bg-white/5 rounded-xl">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-white">
                                                        {review.mentee.name}
                                                    </span>
                                                    <div className="flex items-center gap-1">
                                                        {Array.from({ length: 5 }).map((_, j) => (
                                                            <Star
                                                                key={j}
                                                                className={`w-3.5 h-3.5 ${j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                {review.comment && (
                                                    <p className="text-sm text-gray-400">{review.comment}</p>
                                                )}
                                                <p className="text-xs text-gray-600 mt-2">
                                                    {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Stats */}
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                <h2 className="text-lg font-semibold text-white mb-4">Stats</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            Mentorships
                                        </span>
                                        <span className="text-white font-medium">
                                            {mentor.completedMentorships}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4" />
                                            Sessions
                                        </span>
                                        <span className="text-white font-medium">
                                            {mentor.totalSessionsCompleted}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 flex items-center gap-2">
                                            <Award className="w-4 h-4" />
                                            Current Mentees
                                        </span>
                                        <span className="text-white font-medium">
                                            {mentor.currentMenteeCount}/{mentor.maxMentees}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Request Button */}
                            {!isOwnProfile && (
                                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                    {isAvailable ? (
                                        <>
                                            <Button
                                                onClick={() => setShowRequestForm(true)}
                                                className="w-full bg-orange-500 hover:bg-orange-600"
                                            >
                                                Request Mentorship
                                            </Button>
                                            <p className="text-xs text-gray-500 text-center mt-3">
                                                {mentor.maxMentees - mentor.currentMenteeCount} spot{mentor.maxMentees - mentor.currentMenteeCount !== 1 ? 's' : ''} available
                                            </p>
                                        </>
                                    ) : (
                                        <div className="text-center">
                                            <p className="text-gray-400 mb-2">
                                                This mentor is not currently accepting new mentees
                                            </p>
                                            <Link href="/mentorship">
                                                <Button variant="outline" className="w-full">
                                                    Browse Other Mentors
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}

                            {isOwnProfile && (
                                <div className="p-6 rounded-2xl border border-orange-500/30 bg-orange-500/5">
                                    <p className="text-orange-400 text-sm mb-3">This is your mentor profile</p>
                                    <Link href="/mentorship/my-profile">
                                        <Button variant="outline" className="w-full">
                                            Edit Profile
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Request Form Modal */}
            {showRequestForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                    <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-2xl border border-white/10 bg-black" role="dialog" aria-modal="true" aria-label="Request mentorship">
                        <RequestForm
                            mentorId={id}
                            onSubmit={handleRequestSubmit}
                            onClose={() => setShowRequestForm(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
