"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    ArrowLeft,
    Briefcase,
    MapPin,
    Clock,
    DollarSign,
    Building2,
    ExternalLink,
    Share2,
    Bookmark,
    CheckCircle,
    Loader2
} from 'lucide-react';
import Footer from '@/components/Footer';
import { API_URL } from '@/lib/api';

interface Job {
    _id: string;
    title: string;
    slug: string;
    company: string;
    companyLogo?: string;
    description: string;
    requirements?: string[];
    responsibilities?: string[];
    skills?: string[];
    category: string;
    experienceLevel: string;
    locationType: string;
    location?: string;
    salary?: {
        min?: number;
        max?: number;
        currency?: string;
        period?: string;
    };
    applyUrl?: string;
    applyEmail?: string;
    isFeatured?: boolean;
    viewCount?: number;
    createdAt: string;
}

const experienceLevelNames: Record<string, string> = {
    entry: 'Entry Level',
    mid: 'Mid Level',
    senior: 'Senior',
    lead: 'Lead / Manager',
    executive: 'Executive'
};

const categoryNames: Record<string, string> = {
    pentesting: 'Penetration Testing',
    soc: 'SOC / Security Operations',
    grc: 'GRC / Compliance',
    devsecops: 'DevSecOps',
    forensics: 'Digital Forensics',
    malware: 'Malware Analysis',
    'cloud-security': 'Cloud Security',
    appsec: 'Application Security',
    other: 'Other'
};

const JobDetailPage = () => {
    const params = useParams();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`${API_URL}/api/jobs/${params.slug}`);
                if (!response.ok) throw new Error('Job not found');
                const data = await response.json();
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
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            maximumFractionDigits: 0
        });

        let range = '';
        if (salary.min && salary.max) {
            range = `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
        } else if (salary.min) {
            range = `From ${formatter.format(salary.min)}`;
        } else if (salary.max) {
            range = `Up to ${formatter.format(salary.max)}`;
        }

        if (salary.period && salary.period !== 'yearly') {
            range += ` / ${salary.period}`;
        }

        return range;
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleApply = async () => {
        if (!job) return;

        // Track application click
        try {
            await fetch(`${API_URL}/api/jobs/${job._id}/apply`, { method: 'POST' });
        } catch (e) {
            // Ignore tracking errors
        }

        // Open apply URL or email
        if (job.applyUrl) {
            window.open(job.applyUrl, '_blank');
        } else if (job.applyEmail) {
            window.location.href = `mailto:${job.applyEmail}?subject=Application for ${job.title}`;
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: job?.title,
                text: `${job?.title} at ${job?.company}`,
                url: window.location.href
            });
        } else {
            await navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
                <Briefcase className="w-12 h-12 text-gray-600 mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Job not found</h1>
                <p className="text-gray-400 mb-8">{error || 'The requested job posting does not exist.'}</p>
                <Link
                    href="/jobs"
                    className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Jobs
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
                    <Link
                        href="/jobs"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Jobs
                    </Link>

                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Company Logo */}
                        <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                            {job.companyLogo ? (
                                <img src={job.companyLogo} alt={job.company} className="w-10 h-10 object-contain" />
                            ) : (
                                <Building2 className="w-8 h-8 text-gray-500" />
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                                    {job.title}
                                </h1>
                                {job.isFeatured && (
                                    <span className="px-2 py-1 text-xs bg-orange-500/20 text-orange-400 rounded">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <p className="text-lg text-gray-400 mb-4">{job.company}</p>

                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {job.location || job.locationType}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Briefcase className="w-4 h-4" />
                                    {experienceLevelNames[job.experienceLevel] || job.experienceLevel}
                                </span>
                                {formatSalary(job.salary) && (
                                    <span className="flex items-center gap-1">
                                        <DollarSign className="w-4 h-4" />
                                        {formatSalary(job.salary)}
                                    </span>
                                )}
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    Posted {formatDate(job.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 mt-8">
                        <button
                            onClick={handleApply}
                            className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Apply Now
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-3 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white rounded-lg transition-colors"
                        >
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                        <button
                            className="flex items-center gap-2 px-4 py-3 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white rounded-lg transition-colors"
                        >
                            <Bookmark className="w-4 h-4" />
                            Save
                        </button>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                            <h2 className="text-lg font-semibold text-white mb-4">About the Role</h2>
                            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {job.description}
                            </div>
                        </div>

                        {/* Requirements */}
                        {job.requirements && job.requirements.length > 0 && (
                            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                                <h2 className="text-lg font-semibold text-white mb-4">Requirements</h2>
                                <ul className="space-y-2">
                                    {job.requirements.map((req, index) => (
                                        <li key={index} className="flex items-start gap-2 text-gray-300">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Responsibilities */}
                        {job.responsibilities && job.responsibilities.length > 0 && (
                            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                                <h2 className="text-lg font-semibold text-white mb-4">Responsibilities</h2>
                                <ul className="space-y-2">
                                    {job.responsibilities.map((resp, index) => (
                                        <li key={index} className="flex items-start gap-2 text-gray-300">
                                            <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                            {resp}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Job Details */}
                        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                                Job Details
                            </h3>
                            <dl className="space-y-4">
                                <div>
                                    <dt className="text-sm text-gray-500">Category</dt>
                                    <dd className="text-white">{categoryNames[job.category] || job.category}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Experience Level</dt>
                                    <dd className="text-white">{experienceLevelNames[job.experienceLevel] || job.experienceLevel}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Location Type</dt>
                                    <dd className="text-white capitalize">{job.locationType}</dd>
                                </div>
                                {job.location && (
                                    <div>
                                        <dt className="text-sm text-gray-500">Location</dt>
                                        <dd className="text-white">{job.location}</dd>
                                    </div>
                                )}
                                {formatSalary(job.salary) && (
                                    <div>
                                        <dt className="text-sm text-gray-500">Salary</dt>
                                        <dd className="text-white">{formatSalary(job.salary)}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        {/* Skills */}
                        {job.skills && job.skills.length > 0 && (
                            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                                    Required Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 text-sm bg-orange-500/10 text-orange-400 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Apply CTA */}
                        <div className="p-6 rounded-xl border border-orange-500/30 bg-orange-500/5">
                            <h3 className="text-lg font-semibold text-white mb-2">Interested?</h3>
                            <p className="text-sm text-gray-400 mb-4">
                                Apply now and take the next step in your cybersecurity career.
                            </p>
                            <button
                                onClick={handleApply}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Apply Now
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
