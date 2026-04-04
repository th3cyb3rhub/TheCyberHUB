'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, ArrowRight, Sparkles, GraduationCap, AlertTriangle, ExternalLink, Trophy } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { SkeletonInternshipList } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

interface ShowcaseProject {
    title: string;
    description: string;
    teamMembers: string[];
    demoLink?: string;
    repoLink?: string;
    image?: string;
}

interface Cohort {
    _id: string;
    title: string;
    description: string;
    type: 'internship' | 'mentorship';
    status: 'open' | 'in-progress' | 'completed';
    startDate: string;
    endDate?: string;
    applicationDeadline: string;
    technologies: string[];
    showcaseProjects?: ShowcaseProject[];
}

export default function InternshipsPage() {
    const [cohorts, setCohorts] = useState<Cohort[]>([]);
    const [pastCohorts, setPastCohorts] = useState<Cohort[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCohorts = async () => {
            try {
                const data = await fetchApi('/api/internships', { requireAuth: false });
                setCohorts(data.data);

                // Fetch past cohorts
                try {
                    const pastData = await fetchApi('/api/internships/past', { requireAuth: false });
                    setPastCohorts(pastData.data || []);
                } catch {
                    // Past cohorts are optional
                }
            } catch (error) {
                console.error('Failed to fetch cohorts', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCohorts();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getDeadlineWarning = (deadline: string) => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const diff = deadlineDate.getTime() - now.getTime();
        const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

        if (daysLeft < 0) return { text: 'Deadline passed', color: 'text-red-400', urgent: false };
        if (daysLeft === 0) return { text: 'Deadline today!', color: 'text-red-400', urgent: true };
        if (daysLeft <= 3) return { text: `${daysLeft} day${daysLeft > 1 ? 's' : ''} left!`, color: 'text-red-400', urgent: true };
        if (daysLeft <= 7) return { text: `${daysLeft} days left`, color: 'text-yellow-400', urgent: true };
        return null;
    };

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Internships</span> & Cohorts
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Join our free, structured programs designed to level up your cybersecurity skills through hands-on experience and community guidance.
                    </p>
                </div>

                {loading ? (
                    <SkeletonInternshipList />
                ) : cohorts.length === 0 ? (
                    <EmptyState
                        icon={GraduationCap}
                        title="No Open Cohorts"
                        description="We don't have any open programs right now. Check back later!"
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cohorts.map((cohort) => (
                            <div key={cohort._id} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all group flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20 capitalize">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        {cohort.type}
                                    </span>
                                    {cohort.status === 'open' ? (
                                        <span className="px-2.5 py-1 rounded text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                            Accepting Applications
                                        </span>
                                    ) : (
                                        <span className="px-2.5 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                            In Progress
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                    {cohort.title}
                                </h3>

                                <p className="text-sm text-gray-400 mb-6 flex-grow line-clamp-3">
                                    {cohort.description}
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <span>Starts {formatDate(cohort.startDate)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <BookOpen className="w-4 h-4 text-gray-500" />
                                        <span>Deadline: {formatDate(cohort.applicationDeadline)}</span>
                                    </div>
                                    {/* Deadline Warning */}
                                    {cohort.status === 'open' && (() => {
                                        const warning = getDeadlineWarning(cohort.applicationDeadline);
                                        if (!warning) return null;
                                        return (
                                            <div className={`flex items-center gap-2 text-sm ${warning.color} ${warning.urgent ? 'animate-pulse' : ''}`}>
                                                <AlertTriangle className="w-4 h-4" />
                                                <span className="font-medium">{warning.text}</span>
                                            </div>
                                        );
                                    })()}
                                </div>

                                {cohort.technologies && cohort.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {cohort.technologies.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">
                                                {tech}
                                            </span>
                                        ))}
                                        {cohort.technologies.length > 3 && (
                                            <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-500">
                                                +{cohort.technologies.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                )}

                                <Link
                                    href={`/internships/${cohort._id}`}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-orange-500 text-white font-medium transition-colors"
                                >
                                    View Details <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {/* Past Cohort Showcases */}
                {pastCohorts.length > 0 && (
                    <div className="mt-20">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                                <Trophy className="w-7 h-7 text-yellow-400" />
                                Past Cohort Showcases
                            </h2>
                            <p className="text-gray-400 max-w-xl mx-auto">
                                Check out the projects and achievements from our previous cohorts.
                            </p>
                        </div>
                        <div className="space-y-8">
                            {pastCohorts.map((cohort) => (
                                <div key={cohort._id} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{cohort.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {formatDate(cohort.startDate)} - {cohort.endDate ? formatDate(cohort.endDate) : 'Completed'}
                                            </p>
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
                                            Completed
                                        </span>
                                    </div>

                                    {cohort.technologies && cohort.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {cohort.technologies.map((tech, i) => (
                                                <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {cohort.showcaseProjects && cohort.showcaseProjects.length > 0 && (
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                            {cohort.showcaseProjects.map((project, i) => (
                                                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5">
                                                    <h4 className="font-medium text-white mb-1">{project.title}</h4>
                                                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{project.description}</p>
                                                    {project.teamMembers.length > 0 && (
                                                        <p className="text-xs text-gray-500 mb-2">Team: {project.teamMembers.join(', ')}</p>
                                                    )}
                                                    <div className="flex gap-3">
                                                        {project.demoLink && (
                                                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                                                                className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1">
                                                                <ExternalLink className="w-3 h-3" /> Demo
                                                            </a>
                                                        )}
                                                        {project.repoLink && (
                                                            <a href={project.repoLink} target="_blank" rel="noopener noreferrer"
                                                                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                                                                <ExternalLink className="w-3 h-3" /> Code
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
