'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, Users, Calendar, ArrowLeft, Loader2, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';

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
