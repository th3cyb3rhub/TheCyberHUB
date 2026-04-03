"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    BookOpen,
    GraduationCap,
    Shield,
    Cloud,
    FileCheck,
    Briefcase,
    ChevronRight,
    Clock,
    Users,
    CheckCircle,
    Loader2,
    Play
} from 'lucide-react';
import Footer from '@/components/Footer';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';

interface LearningPath {
    _id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription?: string;
    icon: string;
    category: string;
    difficulty: string;
    estimatedDuration?: string;
    modules: { _id: string; title: string }[];
    skills?: string[];
    enrollmentCount: number;
    completionCount: number;
    isFeatured?: boolean;
}

interface UserProgress {
    pathId: string;
    progress: number;
    status: string;
    completedModules: string[];
}

const categoryIcons: Record<string, React.ReactNode> = {
    beginner: <BookOpen className="w-6 h-6" />,
    offensive: <Shield className="w-6 h-6" />,
    defensive: <Shield className="w-6 h-6" />,
    cloud: <Cloud className="w-6 h-6" />,
    compliance: <FileCheck className="w-6 h-6" />,
    career: <Briefcase className="w-6 h-6" />
};

const categoryNames: Record<string, string> = {
    beginner: 'Getting Started',
    offensive: 'Offensive Security',
    defensive: 'Defensive Security',
    cloud: 'Cloud Security',
    compliance: 'Compliance & GRC',
    career: 'Career Development'
};

const difficultyColors: Record<string, string> = {
    beginner: 'text-green-400 bg-green-500/10',
    intermediate: 'text-yellow-400 bg-yellow-500/10',
    advanced: 'text-red-400 bg-red-500/10'
};

const LearningPathsPage = () => {
    const { user, token } = useAuth();
    const { addToast } = useToast();
    const [paths, setPaths] = useState<LearningPath[]>([]);
    const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [enrollingPath, setEnrollingPath] = useState<string | null>(null);

    useEffect(() => {
        fetchPaths();
        if (user && token) {
            fetchUserProgress();
        }
    }, [user, token]);

    const fetchPaths = async () => {
        try {
            const data = await fetchApi('/api/learning-paths', { requireAuth: false });
            setPaths(data.data || []);
        } catch (error) {
            console.error('Failed to fetch learning paths:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserProgress = async () => {
        try {
            const data = await fetchApi('/api/learning-paths/user/progress');
            setUserProgress(data.data || []);
        } catch (error) {
            console.error('Failed to fetch user progress:', error);
        }
    };

    const handleEnroll = async (pathId: string) => {
        if (!user || !token) {
            window.location.href = '/auth?redirect=/learning-paths';
            return;
        }

        setEnrollingPath(pathId);
        try {
            const result = await fetchApi(`/api/learning-paths/${pathId}/enroll`, {
                method: 'POST',
            });
            if (result.success) {
                addToast({ message: 'Successfully enrolled in learning path!', variant: 'success' });
            }
            await fetchUserProgress();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to enroll';
            addToast({
                title: 'Enrollment failed',
                message: message.includes('Already enrolled') ? 'You are already enrolled in this path.' : message,
                variant: 'error',
            });
        } finally {
            setEnrollingPath(null);
        }
    };

    const getProgressForPath = (pathId: string) => {
        return userProgress.find(p => p.pathId === pathId);
    };

    const filteredPaths = selectedCategory === 'all'
        ? paths
        : paths.filter(p => p.category === selectedCategory);

    const categories = ['all', ...Array.from(new Set(paths.map(p => p.category)))];

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative pt-32 pb-12 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5">
                        <GraduationCap className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Structured Learning</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                        Learning
                        <span className="text-orange-500"> Paths</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Follow structured learning paths to build your cybersecurity skills from beginner to expert.
                        Track your progress and earn recognition.
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {cat === 'all' ? 'All Paths' : categoryNames[cat] || cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Learning Paths Grid */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                                <div className="flex items-start justify-between mb-4">
                                    <Skeleton className="w-12 h-12 rounded-lg" />
                                    <Skeleton className="w-20 h-6 rounded" />
                                </div>
                                <Skeleton className="h-5 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-full mb-1" />
                                <Skeleton className="h-4 w-2/3 mb-4" />
                                <div className="flex gap-4 mb-4">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-4 w-12" />
                                </div>
                                <Skeleton className="h-10 w-full rounded-lg" />
                            </div>
                        ))}
                    </div>
                ) : filteredPaths.length === 0 ? (
                    <EmptyState
                        icon={GraduationCap}
                        title="No learning paths available"
                        description="Check back soon for new content."
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPaths.map((path) => {
                            const progress = getProgressForPath(path._id);
                            const isEnrolled = !!progress;

                            return (
                                <div
                                    key={path._id}
                                    className="group relative p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-orange-500/30 transition-all"
                                >
                                    {path.isFeatured && (
                                        <div className="absolute -top-3 left-4 px-3 py-1 text-xs bg-orange-500 text-white rounded-full">
                                            Featured
                                        </div>
                                    )}

                                    {/* Icon & Category */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                                            {categoryIcons[path.category] || <BookOpen className="w-6 h-6" />}
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded capitalize ${difficultyColors[path.difficulty] || 'text-gray-400 bg-white/5'}`}>
                                            {path.difficulty}
                                        </span>
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                        {path.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                        {path.shortDescription || path.description}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="w-3.5 h-3.5" />
                                            {path.modules?.length || 0} modules
                                        </span>
                                        {path.estimatedDuration && (
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {path.estimatedDuration}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Users className="w-3.5 h-3.5" />
                                            {path.enrollmentCount}
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        {isEnrolled ? (
                                            <>
                                                <div className="flex items-center justify-between text-xs mb-1">
                                                    <span className="text-gray-400">Progress</span>
                                                    <span className="text-orange-400">{progress.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-orange-500 rounded-full transition-all"
                                                        style={{ width: `${progress.progress}%` }}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex items-center justify-between text-xs mb-1">
                                                    <span className="text-gray-500">{path.modules?.length || 0} modules</span>
                                                    <span className="text-gray-500">Enroll to track</span>
                                                </div>
                                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-white/10 rounded-full" style={{ width: '0%' }} />
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Skills */}
                                    {path.skills && path.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {path.skills.slice(0, 3).map((skill, i) => (
                                                <span key={i} className="px-2 py-0.5 text-xs bg-white/5 text-gray-400 rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                            {path.skills.length > 3 && (
                                                <span className="px-2 py-0.5 text-xs text-gray-500">
                                                    +{path.skills.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    {isEnrolled ? (
                                        <Link
                                            href={`/learning-paths/${path.slug || path._id}`}
                                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
                                        >
                                            {progress.status === 'completed' ? (
                                                <>
                                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                                    Completed
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="w-4 h-4" />
                                                    Continue
                                                </>
                                            )}
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handleEnroll(path._id)}
                                            disabled={enrollingPath === path._id}
                                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg transition-colors"
                                        >
                                            {enrollingPath === path._id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <>
                                                    Start Learning
                                                    <ChevronRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default LearningPathsPage;
