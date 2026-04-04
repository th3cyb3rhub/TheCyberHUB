'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, CheckCircle, XCircle, Eye, Download, MessageSquare } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';

interface AppUser { _id: string; name: string; username: string; avatar?: string; }
interface Application { _id: string; user?: AppUser; status: string; coverLetter?: string; resume?: string; portfolio?: string; resumeUrl?: string; githubUrl?: string; linkedinUrl?: string; portfolioUrl?: string; createdAt: string; updatedAt?: string; [key: string]: unknown; }
interface Cohort { _id: string; title: string; [key: string]: unknown; }

export default function CohortApplicationsPage() {
    const params = useParams();
    const { addToast } = useToast();
    const [applications, setApplications] = useState<Application[]>([]);
    const [cohort, setCohort] = useState<Cohort | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const [appData, cohortData] = await Promise.all([
                    fetchApi(`/api/admin/internships/${params.id}/applications`),
                    fetchApi(`/api/internships/${params.id}`)
                ]);

                if (appData?.data && cohortData?.data) {
                    setApplications(appData.data);
                    setCohort(cohortData.data);
                }
            } catch (error) {
                console.error('Failed to fetch applications', error);
                addToast({ title: 'Error', message: 'Failed to load applications', variant: 'error' });
            } finally {
                setLoading(false);
            }
        };

        if (params.id) fetchApplications();
    }, [params.id]);

    const handleStatusChange = async (appId: string, newStatus: string) => {
        setActionLoading(appId);
        try {
            const data = await fetchApi(`/api/admin/internships/applications/${appId}/status`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus })
            });

            if (data?.success || data?.data) {
                setApplications(apps => apps.map(app =>
                    app._id === appId ? { ...app, status: newStatus } : app
                ));
                addToast({ title: 'Success', message: `Application marked as ${newStatus}`, variant: 'success' });
            }
        } catch (error) {
            console.error('Failed to update status', error);
            addToast({ title: 'Error', message: error instanceof Error ? error.message : 'An error occurred', variant: 'error' });
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'accepted': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'reviewing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'withdrawn': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
            default: return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        }
    };

    const filteredApps = filter === 'all'
        ? applications
        : applications.filter(a => a.status === filter);

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex justify-center items-center">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                <Link href="/admin/internships" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Programs
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Review Applications</h1>
                        <p className="text-gray-400">{cohort?.title || 'Loading Program...'}</p>
                    </div>

                    <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
                        {['all', 'pending', 'reviewing', 'accepted', 'rejected'].map(s => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${filter === s ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredApps.length === 0 ? (
                        <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <p className="text-gray-400">No applications found in this category.</p>
                        </div>
                    ) : (
                        filteredApps.map((app) => (
                            <div key={app._id} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 transition-colors hover:border-white/20">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center justify-between md:justify-start gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold cursor-pointer" title={app.user?.username}>
                                                    {app.user?.name?.[0]?.toUpperCase() || '?'}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">{app.user?.name || 'Unknown User'}</h3>
                                                    <p className="text-sm text-gray-400">@{app.user?.username}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusStyle(app.status)}`}>
                                                {app.status}
                                            </span>
                                        </div>

                                        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                            <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                                <MessageSquare className="w-4 h-4 text-orange-400" />
                                                Cover Letter / Application Reason
                                            </h4>
                                            <p className="text-sm text-gray-400 whitespace-pre-wrap">
                                                {app.coverLetter}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            {app.resumeUrl && (
                                                <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-medium transition-colors">
                                                    <Download className="w-3.5 h-3.5" /> Resume
                                                </a>
                                            )}
                                            {app.githubUrl && (
                                                <a href={app.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-500/10 text-gray-400 hover:bg-gray-500/20 text-xs font-medium transition-colors">
                                                    GitHub
                                                </a>
                                            )}
                                            {app.linkedinUrl && (
                                                <a href={app.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-medium transition-colors">
                                                    LinkedIn
                                                </a>
                                            )}
                                            {app.portfolioUrl && (
                                                <a href={app.portfolioUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 text-xs font-medium transition-colors">
                                                    Portfolio
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-row md:flex-col gap-2 min-w-[140px]">
                                        <button
                                            onClick={() => handleStatusChange(app._id, 'reviewing')}
                                            disabled={actionLoading === app._id || app.status === 'reviewing'}
                                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${app.status === 'reviewing'
                                                ? 'bg-blue-500/20 text-blue-400 cursor-default opacity-50'
                                                : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
                                                }`}
                                        >
                                            {actionLoading === app._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
                                            Reviewing
                                        </button>

                                        <button
                                            onClick={() => handleStatusChange(app._id, 'accepted')}
                                            disabled={actionLoading === app._id || app.status === 'accepted'}
                                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${app.status === 'accepted'
                                                ? 'bg-green-500/20 text-green-400 cursor-default opacity-50'
                                                : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                                                }`}
                                        >
                                            {actionLoading === app._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                            Accept
                                        </button>

                                        <button
                                            onClick={() => handleStatusChange(app._id, 'rejected')}
                                            disabled={actionLoading === app._id || app.status === 'rejected'}
                                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${app.status === 'rejected'
                                                ? 'bg-red-500/20 text-red-400 cursor-default opacity-50'
                                                : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                                }`}
                                        >
                                            {actionLoading === app._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
