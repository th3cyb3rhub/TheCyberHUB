'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, Users, Calendar, ArrowLeft, Loader2, Sparkles, CheckCircle2, AlertCircle, AlertTriangle, GraduationCap } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';

interface SyllabusWeek {
    week: number;
    title: string;
    description: string;
    topics: string[];
    deliverables: string[];
}

interface Cohort {
    _id: string;
    title: string;
    description: string;
    type: 'internship' | 'mentorship';
    status: 'open' | 'in-progress' | 'completed';
    capacity: number;
    startDate: string;
    endDate: string;
    applicationDeadline: string;
    requirements: string[];
    technologies: string[];
    responsibilities: string[];
    benefits: string[];
    syllabus?: SyllabusWeek[];
}

export default function CohortDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const { addToast } = useToast();

    const [cohort, setCohort] = useState<Cohort | null>(null);
    const [hasApplied, setHasApplied] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCohort = async () => {
            try {
                const data = await fetchApi(`/api/internships/${params.id}`);
                setCohort(data.data);
                if (data.userApplication) {
                    setHasApplied(true);
                    setApplicationStatus(data.userApplication.status);
                }
            } catch (error) {
                console.error('Failed to fetch cohort details', error);
                addToast({ title: 'Error', message: 'Error loading details', variant: 'error' });
            } finally {
                setLoading(false);
            }
        };

        if (params.id) fetchCohort();
    }, [params.id, router]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex justify-center items-center">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!cohort) return null;

    const isDeadlinePassed = new Date() > new Date(cohort.applicationDeadline);
    const canApply = cohort.status === 'open' && !isDeadlinePassed && !hasApplied;

    // Deadline warning
    const deadlineDiff = new Date(cohort.applicationDeadline).getTime() - Date.now();
    const daysUntilDeadline = Math.ceil(deadlineDiff / (1000 * 60 * 60 * 24));
    const hoursUntilDeadline = Math.ceil(deadlineDiff / (1000 * 60 * 60));
    const isDeadlineUrgent = !isDeadlinePassed && daysUntilDeadline <= 7;

    // Application status step mapping
    const statusSteps = ['pending', 'reviewing', 'accepted'];
    const currentStepIndex = applicationStatus ? statusSteps.indexOf(applicationStatus) : -1;

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <Link href="/internships" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Programs
                </Link>

                {/* Header Section */}
                <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 mb-8">
                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20 capitalize">
                            <Sparkles className="w-4 h-4" />
                            {cohort.type}
                        </span>
                        {cohort.status === 'open' ? (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                Accepting Applications
                            </span>
                        ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {cohort.status.replace('-', ' ')}
                            </span>
                        )}
                        {hasApplied && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" />
                                Applied ({applicationStatus})
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {cohort.title}
                    </h1>

                    <p className="text-lg text-gray-300 mb-8 whitespace-pre-wrap">
                        {cohort.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <Calendar className="w-5 h-5 text-gray-400 mb-2" />
                            <div className="text-sm font-medium text-white">{formatDate(cohort.startDate)}</div>
                            <div className="text-xs text-gray-500">Start Date</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <Calendar className="w-5 h-5 text-gray-400 mb-2" />
                            <div className="text-sm font-medium text-white">{formatDate(cohort.endDate)}</div>
                            <div className="text-xs text-gray-500">End Date</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <BookOpen className="w-5 h-5 text-gray-400 mb-2" />
                            <div className="text-sm font-medium text-white">{formatDate(cohort.applicationDeadline)}</div>
                            <div className="text-xs text-gray-500">Deadline</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <Users className="w-5 h-5 text-gray-400 mb-2" />
                            <div className="text-sm font-medium text-white">
                                {cohort.capacity > 0 ? `${cohort.capacity} Spots` : 'Unlimited'}
                            </div>
                            <div className="text-xs text-gray-500">Capacity</div>
                        </div>
                    </div>

                    {/* Deadline Warning Banner */}
                    {isDeadlineUrgent && cohort.status === 'open' && (
                        <div className={`p-4 rounded-xl flex items-center gap-3 mb-6 ${
                            daysUntilDeadline <= 3
                                ? 'bg-red-500/10 border border-red-500/20'
                                : 'bg-yellow-500/10 border border-yellow-500/20'
                        }`}>
                            <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${daysUntilDeadline <= 3 ? 'text-red-400' : 'text-yellow-400'}`} />
                            <div>
                                <p className={`font-medium ${daysUntilDeadline <= 3 ? 'text-red-400' : 'text-yellow-400'}`}>
                                    {daysUntilDeadline <= 0
                                        ? `Only ${hoursUntilDeadline} hours left to apply!`
                                        : `${daysUntilDeadline} day${daysUntilDeadline !== 1 ? 's' : ''} until the application deadline`
                                    }
                                </p>
                                <p className="text-sm text-gray-400">
                                    Deadline: {formatDate(cohort.applicationDeadline)}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Application Status Tracker */}
                    {hasApplied && applicationStatus && applicationStatus !== 'rejected' && (
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 mb-6">
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Application Progress</h3>
                            <div className="flex items-center gap-2">
                                {statusSteps.map((step, i) => (
                                    <div key={step} className="flex items-center gap-2 flex-1">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                                            i <= currentStepIndex
                                                ? 'bg-green-500/20 border-green-500 text-green-400'
                                                : 'bg-white/5 border-white/10 text-gray-500'
                                        }`}>
                                            {i <= currentStepIndex ? (
                                                <CheckCircle2 className="w-4 h-4" />
                                            ) : (
                                                i + 1
                                            )}
                                        </div>
                                        <span className={`text-sm capitalize ${i <= currentStepIndex ? 'text-white' : 'text-gray-500'}`}>
                                            {step}
                                        </span>
                                        {i < statusSteps.length - 1 && (
                                            <div className={`flex-1 h-0.5 ${i < currentStepIndex ? 'bg-green-500' : 'bg-white/10'}`} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {hasApplied && applicationStatus === 'rejected' && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-6 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <div>
                                <p className="text-red-400 font-medium">Application not accepted</p>
                                <p className="text-sm text-gray-400">We encourage you to apply for future cohorts.</p>
                            </div>
                        </div>
                    )}

                    {/* Action Block */}
                    <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-1">
                                {hasApplied ? 'Application Submitted' : 'Ready to join this cohort?'}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {hasApplied
                                    ? `Your application is currently: ${applicationStatus}`
                                    : isDeadlinePassed
                                        ? 'The deadline for this cohort has passed.'
                                        : 'Submit your application before the deadline.'}
                            </p>
                        </div>

                        {!user ? (
                            <Link href="/auth?redirect=/internships" className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap">
                                Sign in to Apply
                            </Link>
                        ) : canApply ? (
                            <Link href={`/internships/${cohort._id}/apply`} className="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap">
                                Apply Now
                            </Link>
                        ) : hasApplied ? (
                            <button disabled className="px-6 py-3 rounded-xl bg-white/10 text-gray-400 font-semibold cursor-not-allowed whitespace-nowrap flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" /> Applied
                            </button>
                        ) : null}
                    </div>
                </div>

                {/* Syllabus / Curriculum */}
                {cohort.syllabus && cohort.syllabus.length > 0 && (
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <GraduationCap className="w-6 h-6 text-orange-400" />
                            Curriculum
                        </h2>
                        <div className="space-y-4">
                            {cohort.syllabus.sort((a, b) => a.week - b.week).map((week, i) => (
                                <div key={i} className="relative pl-8 pb-6 last:pb-0">
                                    {/* Timeline line */}
                                    {i < cohort.syllabus!.length - 1 && (
                                        <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-white/10" />
                                    )}
                                    {/* Timeline dot */}
                                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-orange-400">{week.week}</span>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <h3 className="font-semibold text-white mb-1">
                                            Week {week.week}: {week.title}
                                        </h3>
                                        {week.description && (
                                            <p className="text-sm text-gray-400 mb-3">{week.description}</p>
                                        )}
                                        {week.topics.length > 0 && (
                                            <div className="mb-2">
                                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Topics</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {week.topics.map((topic, j) => (
                                                        <span key={j} className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded">
                                                            {topic}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {week.deliverables.length > 0 && (
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Deliverables</p>
                                                <ul className="space-y-1">
                                                    {week.deliverables.map((d, j) => (
                                                        <li key={j} className="flex items-center gap-2 text-xs text-gray-300">
                                                            <CheckCircle2 className="w-3 h-3 text-green-400 flex-shrink-0" />
                                                            {d}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Details Section */}
                <div className="grid md:grid-cols-2 gap-8">
                    {cohort.technologies && cohort.technologies.length > 0 && (
                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Core Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {cohort.technologies.map((tech, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 text-sm border border-white/10">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {cohort.requirements && cohort.requirements.length > 0 && (
                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Prerequisites</h3>
                            <ul className="space-y-3">
                                {cohort.requirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {cohort.responsibilities && cohort.responsibilities.length > 0 && (
                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">What You&apos;ll Do</h3>
                            <ul className="space-y-3">
                                {cohort.responsibilities.map((resp, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                        <span>{resp}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {cohort.benefits && cohort.benefits.length > 0 && (
                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">What You&apos;ll Gain</h3>
                            <ul className="space-y-3">
                                {cohort.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <Sparkles className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
