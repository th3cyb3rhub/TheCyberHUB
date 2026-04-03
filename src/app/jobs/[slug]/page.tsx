"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
    ArrowLeft, Briefcase, MapPin, Clock, DollarSign, Building2,
    ExternalLink, Share2, CheckCircle,
    Globe, Gift, Calendar, Sparkles, Zap, Bell, BellOff
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import Footer from '@/components/Footer';
import { fetchApi } from '@/lib/api';

interface Job {
    _id: string;
    title: string;
    slug: string;
    company: string;
    companyLogo?: string;
    companyWebsite?: string;
    companyDescription?: string;
    companyRef?: {
        name: string;
        slug: string;
        logo: string;
        location?: string;
        industry?: string;
        size?: string;
        website?: string;
    };
    description: string;
    requirements?: string[];
    responsibilities?: string[];
    skills?: string[];
    benefits?: string[];
    category: string;
    experienceLevel: string;
    employmentType: string;
    locationType: string;
    location?: string;
    salary?: { min?: number; max?: number; currency?: string; period?: string };
    applyUrl?: string;
    applyEmail?: string;
    applicationDeadline?: string;
    isFeatured?: boolean;
    viewCount?: number;
    createdAt: string;
}

const experienceLevelNames: Record<string, string> = {
    entry: 'Entry Level', mid: 'Mid Level', senior: 'Senior',
    lead: 'Lead / Manager', executive: 'Executive'
};

const categoryNames: Record<string, string> = {
    pentesting: 'Penetration Testing', soc: 'SOC / Security Operations',
    grc: 'GRC / Compliance', devsecops: 'DevSecOps',
    forensics: 'Digital Forensics', malware: 'Malware Analysis',
    'cloud-security': 'Cloud Security', appsec: 'Application Security', other: 'Other'
};

const employmentTypeColors: Record<string, string> = {
    'full-time': 'bg-green-500/10 text-green-400 border-green-500/20',
    'part-time': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'contract': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    'freelance': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'internship': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
};

const JobDetailPage = () => {
    const params = useParams();
    const { user } = useAuth();
    const { addToast } = useToast();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quickApplied, setQuickApplied] = useState(false);
    const [alertSaved, setAlertSaved] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await fetchApi(`/api/jobs/${params.slug}`, { requireAuth: false });
                setJob(data.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load job');
            } finally {
                setLoading(false);
            }
        };
        if (params.slug) fetchJob();
    }, [params.slug]);

    const formatSalary = (salary?: Job['salary']) => {
        if (!salary || (!salary.min && !salary.max)) return null;
        const currency = salary.currency || 'USD';
        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 });
        let range = '';
        if (salary.min && salary.max) range = `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
        else if (salary.min) range = `From ${formatter.format(salary.min)}`;
        else if (salary.max) range = `Up to ${formatter.format(salary.max)}`;
        if (salary.period && salary.period !== 'yearly') range += ` / ${salary.period}`;
        return range;
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const handleApply = async () => {
        if (!job) return;
        try { await fetchApi(`/api/jobs/${job._id}/apply`, { method: 'POST', requireAuth: false }); } catch { }
        if (job.applyUrl) window.open(job.applyUrl, '_blank');
        else if (job.applyEmail) window.location.href = `mailto:${job.applyEmail}?subject=Application for ${job.title}`;
    };

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({ title: job?.title, text: `${job?.title} at ${job?.company}`, url: window.location.href });
        } else {
            await navigator.clipboard.writeText(window.location.href);
            alert('Link copied!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black animate-pulse">
                <section className="relative pt-32 pb-8 px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="h-4 bg-gray-800 rounded w-24"></div>
                        <div className="flex gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gray-800 flex-shrink-0"></div>
                            <div className="flex-1 space-y-4">
                                <div className="h-8 bg-gray-800 rounded w-3/4"></div>
                                <div className="h-5 bg-gray-800 rounded w-1/4"></div>
                                <div className="flex gap-4">
                                    <div className="h-4 bg-gray-800 rounded w-20"></div>
                                    <div className="h-4 bg-gray-800 rounded w-24"></div>
                                    <div className="h-4 bg-gray-800 rounded w-32"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <div className="w-32 h-12 bg-gray-800 rounded-xl"></div>
                            <div className="w-24 h-12 bg-gray-800 rounded-xl"></div>
                        </div>
                    </div>
                </section>
                <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="h-48 bg-gray-800 rounded-2xl"></div>
                            <div className="h-64 bg-gray-800 rounded-2xl"></div>
                        </div>
                        <div className="space-y-6">
                            <div className="h-64 bg-gray-800 rounded-2xl"></div>
                            <div className="h-48 bg-gray-800 rounded-2xl"></div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
                <Briefcase className="w-12 h-12 text-gray-600 mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Job not found</h1>
                <p className="text-gray-400 mb-8">{error || 'The requested job posting does not exist.'}</p>
                <Link href="/jobs" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300">
                    <ArrowLeft className="w-4 h-4" /> Back to Jobs
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <section className="relative pt-32 pb-8 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="relative max-w-4xl mx-auto">
                    <Link href="/jobs" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Jobs
                    </Link>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {job.companyRef?.logo || job.companyLogo ? (
                                <Image src={job.companyRef?.logo || job.companyLogo || ''} alt={job.companyRef?.name || job.company || 'Company'} width={64} height={64} className="w-full h-full object-cover" unoptimized />
                            ) : (
                                <Building2 className="w-8 h-8 text-gray-500" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2 flex-wrap">
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">{job.title}</h1>
                                {job.isFeatured && (
                                    <span className="flex items-center gap-1 px-2.5 py-1 text-xs bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/20">
                                        <Sparkles className="w-3 h-3" /> Featured
                                    </span>
                                )}
                                <span className={`px-2.5 py-1 text-xs rounded-full border capitalize ${employmentTypeColors[job.employmentType] || 'bg-white/5 text-gray-400 border-white/10'}`}>
                                    {job.employmentType?.replace('-', ' ')}
                                </span>
                            </div>
                            <div className="text-lg text-gray-400 mb-4 flex items-center gap-2">
                                {job.companyRef ? (
                                    <Link href={`/company/${job.companyRef.slug}`} className="hover:text-[#00ffcc] hover:underline transition-colors flex items-center gap-1 group">
                                        {job.companyRef.name}
                                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ) : (
                                    job.company
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{job.location || job.locationType}</span>
                                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" />{experienceLevelNames[job.experienceLevel] || job.experienceLevel}</span>
                                {formatSalary(job.salary) && (
                                    <span className="flex items-center gap-1.5 text-green-400"><DollarSign className="w-4 h-4" />{formatSalary(job.salary)}</span>
                                )}
                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />Posted {formatDate(job.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-8">
                        <button onClick={handleApply}
                            className="flex items-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/20">
                            <ExternalLink className="w-4 h-4" /> Apply Now
                        </button>
                        {user && !quickApplied && (
                            <button
                                onClick={async () => {
                                    try {
                                        await fetchApi(`/api/jobs/${job._id}/apply`, { method: 'POST' });
                                        setQuickApplied(true);
                                        addToast({ message: 'Quick application submitted! The employer will be notified.', variant: 'success' });
                                    } catch {
                                        addToast({ message: 'Failed to quick apply', variant: 'error' });
                                    }
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all"
                            >
                                <Zap className="w-4 h-4" /> Quick Apply
                            </button>
                        )}
                        {quickApplied && (
                            <span className="flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-400 rounded-xl border border-green-500/30">
                                <CheckCircle className="w-4 h-4" /> Applied
                            </span>
                        )}
                        <button onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-3 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white rounded-xl transition-colors">
                            <Share2 className="w-4 h-4" /> Share
                        </button>
                        <button
                            onClick={() => {
                                setAlertSaved(!alertSaved);
                                addToast({
                                    message: alertSaved ? 'Job alert removed' : 'Job alert saved! You will be notified of similar jobs.',
                                    variant: alertSaved ? 'info' : 'success'
                                });
                            }}
                            className={`flex items-center gap-2 px-4 py-3 border rounded-xl transition-colors ${
                                alertSaved
                                    ? 'border-orange-500/30 text-orange-400 bg-orange-500/10'
                                    : 'border-white/10 hover:border-white/20 text-gray-400 hover:text-white'
                            }`}
                        >
                            {alertSaved ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                            {alertSaved ? 'Alert Saved' : 'Save Alert'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <h2 className="text-lg font-semibold text-white mb-4">About the Role</h2>
                            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{job.description}</div>
                        </div>

                        {job.requirements && job.requirements.length > 0 && (
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                <h2 className="text-lg font-semibold text-white mb-4">Requirements</h2>
                                <ul className="space-y-2.5">
                                    {job.requirements.map((req, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />{req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {job.responsibilities && job.responsibilities.length > 0 && (
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                <h2 className="text-lg font-semibold text-white mb-4">Responsibilities</h2>
                                <ul className="space-y-2.5">
                                    {job.responsibilities.map((r, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300">
                                            <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />{r}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {job.benefits && job.benefits.length > 0 && (
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                <h2 className="text-lg font-semibold text-white mb-4">Benefits & Perks</h2>
                                <div className="flex flex-wrap gap-2">
                                    {job.benefits.map((b, i) => (
                                        <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-green-500/10 text-green-400 rounded-lg border border-green-500/20">
                                            <Gift className="w-3.5 h-3.5" />{b}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Job Details</h3>
                            <dl className="space-y-4">
                                <div><dt className="text-sm text-gray-500">Category</dt><dd className="text-white">{categoryNames[job.category] || job.category}</dd></div>
                                <div><dt className="text-sm text-gray-500">Experience Level</dt><dd className="text-white">{experienceLevelNames[job.experienceLevel] || job.experienceLevel}</dd></div>
                                <div><dt className="text-sm text-gray-500">Employment Type</dt><dd className="text-white capitalize">{job.employmentType?.replace('-', ' ')}</dd></div>
                                <div><dt className="text-sm text-gray-500">Location Type</dt><dd className="text-white capitalize">{job.locationType}</dd></div>
                                {job.location && <div><dt className="text-sm text-gray-500">Location</dt><dd className="text-white">{job.location}</dd></div>}
                                {formatSalary(job.salary) && <div><dt className="text-sm text-gray-500">Salary</dt><dd className="text-green-400 font-medium">{formatSalary(job.salary)}</dd></div>}
                                {job.applicationDeadline && (
                                    <div><dt className="text-sm text-gray-500">Deadline</dt>
                                        <dd className="text-white flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-500" />{formatDate(job.applicationDeadline)}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        {job.skills && job.skills.length > 0 && (
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, i) => (
                                        <span key={i} className="px-3 py-1.5 text-sm bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/20">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Company Info */}
                        {(job.companyRef || job.companyDescription || job.companyWebsite) && (
                            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                                    About {job.companyRef?.name || job.company}
                                </h3>
                                {job.companyDescription && <p className="text-sm text-gray-300 mb-4 leading-relaxed">{job.companyDescription}</p>}

                                <div className="space-y-3">
                                    {(job.companyRef?.website || job.companyWebsite) && (
                                        <a href={job.companyRef?.website || job.companyWebsite} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-gray-300 hover:text-white transition-colors border border-white/5">
                                            <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#00ffcc]" /> Visit Website</span>
                                            <ExternalLink className="w-4 h-4 text-gray-500" />
                                        </a>
                                    )}

                                    {job.companyRef && (
                                        <Link href={`/company/${job.companyRef.slug}`}
                                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-[rgba(0,255,204,0.1)] hover:border-[#00ffcc]/30 text-sm text-gray-300 hover:text-[#00ffcc] transition-colors border border-white/5 group">
                                            <span className="flex items-center gap-2"><Building2 className="w-4 h-4 text-orange-400 group-hover:text-[#00ffcc] transition-colors" /> View Full Profile</span>
                                            <ArrowLeft className="w-4 h-4 text-gray-500 rotate-180 group-hover:text-[#00ffcc] transition-colors" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="p-6 rounded-2xl border border-orange-500/30 bg-orange-500/5">
                            <h3 className="text-lg font-semibold text-white mb-2">Interested in this role?</h3>
                            <p className="text-sm text-gray-400 mb-4">Apply now and take the next step in your cybersecurity career.</p>
                            <button onClick={handleApply}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/20">
                                <ExternalLink className="w-4 h-4" /> Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default JobDetailPage;
