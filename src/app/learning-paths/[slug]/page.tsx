/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    ArrowLeft,
    BookOpen,
    GraduationCap,
    Clock,
    Users,
    CheckCircle,
    Circle,
    Loader2,
    Play,
    ExternalLink,
    Trophy
} from 'lucide-react';
import Footer from '@/components/Footer';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface Module {
    _id: string;
    title: string;
    description?: string;
    order: number;
    duration?: string;
    resources?: {
        title: string;
        url?: string;
        type: string;
    }[];
}

interface LearningPath {
    _id: string;
    title: string;
    slug: string;
    description: string;
    icon: string;
    category: string;
    difficulty: string;
    estimatedDuration?: string;
    modules: Module[];
    skills?: string[];
    enrollmentCount: number;
    completionCount: number;
    prerequisites?: { _id: string; title: string; slug: string }[];
}

interface UserProgress {
    pathId: string;
    progress: number;
    status: string;
    completedModules: string[];
    enrolledAt: string;
    completedAt?: string;
}

const difficultyColors: Record<string, string> = {
    beginner: 'text-green-400 bg-green-500/10',
    intermediate: 'text-yellow-400 bg-yellow-500/10',
    advanced: 'text-red-400 bg-red-500/10'
};

const resourceTypeIcons: Record<string, string> = {
    video: '🎥',
    article: '📄',
    exercise: '💻',
    quiz: '❓',
    project: '🚀'
};

const LearningPathDetailPage = () => {
    const params = useParams();
    const { user, token } = useAuth();
    const [path, setPath] = useState<LearningPath | null>(null);
    const [progress, setProgress] = useState<UserProgress | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [enrolling, setEnrolling] = useState(false);
    const [completingModule, setCompletingModule] = useState<string | null>(null);

    useEffect(() => {
        fetchPath();
    }, [params.slug]);

    useEffect(() => {
        if (user && token && path) {
            fetchProgress();
        }
    }, [user, token, path]);

    const fetchPath = async () => {
        try {
            const data = await fetchApi(`/api/learning-paths/${params.slug}`, { requireAuth: false });
            setPath(data.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load');
        } finally {
            setLoading(false);
        }
    };

    const fetchProgress = async () => {
        try {
            const data = await fetchApi(`/api/learning-paths/${path?._id}/progress`);
            setProgress(data.data);
        } catch {
            // Not enrolled yet
        }
    };

    const handleEnroll = async () => {
        if (!user || !token) {
            window.location.href = `/auth?redirect=/learning-paths/${params.slug}`;
            return;
        }

        setEnrolling(true);
        try {
            await fetchApi(`/api/learning-paths/${path?._id}/enroll`, {
                method: 'POST',
            });
            await fetchProgress();
        } catch (error) {
            console.error('Failed to enroll:', error);
        } finally {
            setEnrolling(false);
        }
    };

    const handleCompleteModule = async (moduleId: string) => {
        if (!user || !token || !path) return;

        setCompletingModule(moduleId);
        try {
            const data = await fetchApi(
                `/api/learning-paths/${path._id}/modules/${moduleId}/complete`,
                { method: 'POST' }
            );
            setProgress(data.data);
        } catch (error) {
            console.error('Failed to complete module:', error);
        } finally {
            setCompletingModule(null);
        }
    };

    const isModuleCompleted = (moduleId: string) => {
        return progress?.completedModules?.includes(moduleId) || false;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
        );
    }

    if (error || !path) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
                <GraduationCap className="w-12 h-12 text-gray-600 mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Learning path not found</h1>
                <p className="text-gray-400 mb-8">{error}</p>
                <Link href="/learning-paths" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Learning Paths
                </Link>
            </div>
        );
    }

    const sortedModules = [...(path.modules || [])].sort((a, b) => a.order - b.order);

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <section className="relative pt-32 pb-8 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto">
                    <Link
                        href="/learning-paths"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Learning Paths
                    </Link>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="w-16 h-16 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                            <GraduationCap className="w-8 h-8" />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                                    {path.title}
                                </h1>
                                <span className={`px-2 py-1 text-xs rounded capitalize ${difficultyColors[path.difficulty] || 'text-gray-400 bg-white/5'}`}>
                                    {path.difficulty}
                                </span>
                            </div>

                            <p className="text-gray-400 mb-4">{path.description}</p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    {path.modules?.length || 0} modules
                                </span>
                                {path.estimatedDuration && (
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {path.estimatedDuration}
                                    </span>
                                )}
                                <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {path.enrollmentCount} enrolled
                                </span>
                                <span className="flex items-center gap-1">
                                    <Trophy className="w-4 h-4" />
                                    {path.completionCount} completed
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Progress & Actions */}
                    <div className="mt-8 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                        {progress ? (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-white font-medium">Your Progress</span>
                                    <span className="text-orange-400 font-semibold">{progress.progress}%</span>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-4">
                                    <div
                                        className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all"
                                        style={{ width: `${progress.progress}%` }}
                                    />
                                </div>
                                {progress.status === 'completed' ? (
                                    <div className="flex items-center gap-2 text-green-400">
                                        <CheckCircle className="w-5 h-5" />
                                        <span>Completed!</span>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        {progress.completedModules?.length || 0} of {path.modules?.length || 0} modules completed
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-white font-medium mb-1">Ready to start learning?</h3>
                                    <p className="text-sm text-gray-400">Enroll now to track your progress</p>
                                </div>
                                <button
                                    onClick={handleEnroll}
                                    disabled={enrolling}
                                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
                                >
                                    {enrolling ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Play className="w-4 h-4" />
                                            Start Learning
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Modules */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                <h2 className="text-xl font-semibold text-white mb-6">Course Modules</h2>

                <div className="space-y-4">
                    {sortedModules.map((module, index) => {
                        const completed = isModuleCompleted(module._id);
                        const isCompleting = completingModule === module._id;

                        return (
                            <div
                                key={module._id}
                                className={`p-6 rounded-xl border transition-all ${completed
                                        ? 'border-green-500/30 bg-green-500/5'
                                        : 'border-white/10 bg-white/[0.02]'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Module Number / Status */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${completed
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-white/5 text-gray-400'
                                        }`}>
                                        {completed ? (
                                            <CheckCircle className="w-5 h-5" />
                                        ) : (
                                            <span className="font-semibold">{index + 1}</span>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className={`font-semibold mb-1 ${completed ? 'text-green-400' : 'text-white'}`}>
                                                    {module.title}
                                                </h3>
                                                {module.description && (
                                                    <p className="text-sm text-gray-400 mb-3">{module.description}</p>
                                                )}
                                                {module.duration && (
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {module.duration}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Complete Button */}
                                            {progress && !completed && (
                                                <button
                                                    onClick={() => handleCompleteModule(module._id)}
                                                    disabled={isCompleting}
                                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg transition-colors flex-shrink-0"
                                                >
                                                    {isCompleting ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <>
                                                            <Circle className="w-4 h-4" />
                                                            Mark Complete
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>

                                        {/* Resources */}
                                        {module.resources && module.resources.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-white/5">
                                                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Resources</h4>
                                                <div className="space-y-2">
                                                    {module.resources.map((resource, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-sm">
                                                            <span>{resourceTypeIcons[resource.type] || '📎'}</span>
                                                            {resource.url ? (
                                                                <a
                                                                    href={resource.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-orange-400 hover:text-orange-300 flex items-center gap-1"
                                                                >
                                                                    {resource.title}
                                                                    <ExternalLink className="w-3 h-3" />
                                                                </a>
                                                            ) : (
                                                                <span className="text-gray-400">{resource.title}</span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Skills */}
                {path.skills && path.skills.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-xl font-semibold text-white mb-4">Skills You&apos;ll Learn</h2>
                        <div className="flex flex-wrap gap-2">
                            {path.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 bg-orange-500/10 text-orange-400 rounded-lg text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Prerequisites */}
                {path.prerequisites && path.prerequisites.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-xl font-semibold text-white mb-4">Prerequisites</h2>
                        <div className="space-y-2">
                            {path.prerequisites.map((prereq) => (
                                <Link
                                    key={prereq._id}
                                    href={`/learning-paths/${prereq.slug}`}
                                    className="flex items-center gap-2 p-4 rounded-lg border border-white/10 bg-white/[0.02] hover:border-orange-500/30 transition-colors"
                                >
                                    <GraduationCap className="w-5 h-5 text-orange-400" />
                                    <span className="text-white">{prereq.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default LearningPathDetailPage;
