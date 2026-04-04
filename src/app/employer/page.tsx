/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Briefcase, Plus, Eye, Users, Edit2, Trash2,
    ToggleLeft, ToggleRight, Building2, AlertCircle, ArrowRight,
    Loader2, Clock, MapPin, CheckCircle, XCircle, Mail
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import Footer from '@/components/Footer';
import { SkeletonEmployerDashboard, SkeletonJobsGrid } from '@/components/ui/skeleton';
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/ConfirmDialog';

// Consumer domains
const BLOCKED_DOMAINS = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
    'aol.com', 'icloud.com', 'mail.com', 'protonmail.com', 'yandex.com',
    'zoho.com', 'gmx.com', 'inbox.com', 'fastmail.com', 'tutanota.com',
    'pm.me', 'proton.me', 'googlemail.com', 'yahoo.co.in', 'rediffmail.com'
];

interface Job {
    _id: string;
    title: string;
    slug: string;
    company: string;
    category: string;
    locationType: string;
    location?: string;
    employmentType: string;
    experienceLevel: string;
    isActive: boolean;
    viewCount: number;
    applicationCount: number;
    createdAt: string;
}

interface Stats {
    totalJobs: number;
    activeJobs: number;
    totalViews: number;
    totalApplications: number;
}

const EmployerDashboard = () => {
    const { user, loading: authLoading, token } = useAuth();
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [stats, setStats] = useState<Stats>({ totalJobs: 0, activeJobs: 0, totalViews: 0, totalApplications: 0 });
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const { isOpen: confirmOpen, confirm: showConfirm, onConfirm, onCancel } = useConfirmDialog();

    const isConsumerEmail = (email: string) => {
        const domain = email.split('@')[1]?.toLowerCase();
        return BLOCKED_DOMAINS.includes(domain);
    };

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth');
            return;
        }
        if (user && token) {
            fetchData();
        }
    }, [user, authLoading, token]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [jobsData, statsData] = await Promise.all([
                fetchApi('/api/jobs/employer/my-jobs'),
                fetchApi('/api/jobs/employer/stats')
            ]);
            setJobs(jobsData.data || []);
            setStats(statsData.data);
        } catch (err) {
            console.error('Failed to fetch employer data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleActive = async (jobId: string, currentStatus: boolean) => {
        try {
            await fetchApi(`/api/jobs/employer/${jobId}`, {
                method: 'PUT',
                body: JSON.stringify({ isActive: !currentStatus }),
            });
            setJobs(prev => prev.map(j => j._id === jobId ? { ...j, isActive: !currentStatus } : j));
            setStats(prev => ({
                ...prev,
                activeJobs: !currentStatus ? prev.activeJobs + 1 : prev.activeJobs - 1
            }));
        } catch (err) {
            console.error('Failed to toggle job:', err);
        }
    };

    const handleDelete = async (jobId: string) => {
        const confirmed = await showConfirm();
        if (!confirmed) return;
        try {
            setDeleting(jobId);
            await fetchApi(`/api/jobs/employer/${jobId}`, {
                method: 'DELETE',
            });
            setJobs(prev => prev.filter(j => j._id !== jobId));
            setStats(prev => ({ ...prev, totalJobs: prev.totalJobs - 1 }));
        } catch (err) {
            console.error('Failed to delete job:', err);
        } finally {
            setDeleting(null);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <SkeletonEmployerDashboard />
                </div>
            </div>
        );
    }

    // Not logged in
    if (!user) return null;

    // Consumer email gate
    if (isConsumerEmail(user.email)) {
        return (
            <div className="min-h-screen bg-black">
                <div className="max-w-2xl mx-auto px-4 pt-32 pb-20 text-center">
                    <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-8 h-8 text-red-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-3">Organization Email Required</h1>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            To post jobs on TheCyberHub, you need to be registered with your organization email address.
                            Consumer email providers like Gmail, Yahoo, Hotmail, and Outlook are not accepted.
                        </p>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Mail className="w-5 h-5 text-gray-500" />
                                <span className="text-gray-400">Your email:</span>
                                <span className="text-white font-medium">{user.email}</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-500">
                                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                <span>Consumer email domains are not accepted for employer accounts</span>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 text-left">
                            <p className="text-sm text-green-400 font-medium mb-2">✓ Accepted email examples:</p>
                            <ul className="text-sm text-gray-400 space-y-1 ml-4">
                                <li>hr@yourcompany.com</li>
                                <li>recruiter@cybersecurityfirm.io</li>
                                <li>talent@enterprise.co</li>
                            </ul>
                        </div>
                        <p className="text-sm text-gray-500 mt-6">
                            Please register a new account with your organization email to access employer features.
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <section className="relative pt-32 pb-8 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="relative max-w-6xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-white/10 bg-white/5">
                                <Building2 className="w-4 h-4 text-orange-500" />
                                <span className="text-sm text-gray-400">Employer Dashboard</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white">
                                Manage Your <span className="text-orange-500">Job Postings</span>
                            </h1>
                        </div>
                        <Link
                            href="/employer/post"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/20"
                        >
                            <Plus className="w-5 h-5" />
                            Post a Job
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-orange-500/20 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
                                <Briefcase className="w-5 h-5 text-orange-400" />
                            </div>
                            <p className="text-2xl font-bold text-white">{stats.totalJobs}</p>
                            <p className="text-sm text-gray-500">Total Jobs</p>
                        </div>
                        <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-green-500/20 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-3">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                            <p className="text-2xl font-bold text-white">{stats.activeJobs}</p>
                            <p className="text-sm text-gray-500">Active Jobs</p>
                        </div>
                        <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-blue-500/20 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                                <Eye className="w-5 h-5 text-blue-400" />
                            </div>
                            <p className="text-2xl font-bold text-white">{stats.totalViews}</p>
                            <p className="text-sm text-gray-500">Total Views</p>
                        </div>
                        <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-purple-500/20 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                                <Users className="w-5 h-5 text-purple-400" />
                            </div>
                            <p className="text-2xl font-bold text-white">{stats.totalApplications}</p>
                            <p className="text-sm text-gray-500">Applications</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Org Profile + Jobs List */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
                {/* Organization Profile Card */}
                {user.organization?.name ? (
                    <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{user.organization.name}</h3>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                        {user.organization.domain && (
                                            <span className="flex items-center gap-1">
                                                <Mail className="w-3.5 h-3.5" />
                                                @{user.organization.domain}
                                            </span>
                                        )}
                                        {user.organization.website && (
                                            <a href={user.organization.website} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors">
                                                <ArrowRight className="w-3.5 h-3.5" />
                                                Website
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <Link href="/jobs" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                                <Briefcase className="w-4 h-4" />
                                Browse All Jobs
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="p-5 rounded-xl border border-orange-500/20 bg-orange-500/5 mb-8">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Building2 className="w-5 h-5 text-orange-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium mb-1">Complete your organization profile</h3>
                                <p className="text-sm text-gray-400 mb-3">
                                    Add your company name, website, and description. This info appears on all your job postings.
                                </p>
                                <p className="text-xs text-gray-500">
                                    Your org profile will be auto-filled when you post your first job, or you can update it in your profile settings.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                <h2 className="text-xl font-semibold text-white mb-6">Your Job Postings</h2>

                {loading ? (
                    <div className="py-8">
                        <SkeletonJobsGrid />
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/[0.02]">
                        <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No job postings yet</h3>
                        <p className="text-gray-400 mb-6">Post your first job and start receiving applications.</p>
                        <Link
                            href="/employer/post"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Post Your First Job
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {jobs.map((job) => (
                            <div key={job._id} className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Link href={`/jobs/${job.slug || job._id}`} className="text-lg font-semibold text-white hover:text-orange-400 transition-colors truncate">
                                                {job.title}
                                            </Link>
                                            <span className={`px-2 py-0.5 text-xs rounded-full ${job.isActive ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                                {job.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                            <span className="px-2 py-0.5 text-xs bg-white/5 text-gray-400 rounded-full capitalize">
                                                {job.employmentType?.replace('-', ' ')}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {job.location || job.locationType}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-3.5 h-3.5" />
                                                {job.viewCount} views
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3.5 h-3.5" />
                                                {job.applicationCount} applications
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {formatDate(job.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleToggleActive(job._id, job.isActive)}
                                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                            title={job.isActive ? 'Deactivate' : 'Activate'}
                                        >
                                            {job.isActive ? <ToggleRight className="w-5 h-5 text-green-400" /> : <ToggleLeft className="w-5 h-5" />}
                                        </button>
                                        <Link
                                            href={`/employer/edit/${job._id}`}
                                            className="p-2 rounded-lg text-gray-400 hover:text-orange-400 hover:bg-white/5 transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(job._id)}
                                            disabled={deleting === job._id}
                                            className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors disabled:opacity-50"
                                            title="Delete"
                                        >
                                            {deleting === job._id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <ConfirmDialog
                open={confirmOpen}
                onConfirm={onConfirm}
                onCancel={onCancel}
                title="Delete job posting?"
                description="Are you sure you want to delete this job posting?"
                confirmText="Delete"
                variant="danger"
            />

            <Footer />
        </div>
    );
};

export default EmployerDashboard;
