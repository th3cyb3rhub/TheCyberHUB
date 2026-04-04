"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Briefcase, MapPin, ArrowRight, Clock,
    Building2, Sparkles
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface Job {
    _id: string;
    title: string;
    slug: string;
    company: string;
    companyLogo?: string;
    locationType: string;
    location?: string;
    employmentType: string;
    experienceLevel: string;
    salary?: { min?: number; max?: number; currency?: string; period?: string };
    isFeatured?: boolean;
    createdAt: string;
}

const JobsSection = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await fetchApi('/api/jobs?limit=4&sortBy=createdAt&sortOrder=desc', { requireAuth: false });
                setJobs(data.data || []);
            } catch (err) {
                console.error('Failed to fetch jobs:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const formatSalary = (salary?: Job['salary']) => {
        if (!salary || (!salary.min && !salary.max)) return null;
        const currency = salary.currency || 'USD';
        const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 });
        if (salary.min && salary.max) return `${fmt.format(salary.min)} - ${fmt.format(salary.max)}`;
        if (salary.min) return `From ${fmt.format(salary.min)}`;
        return `Up to ${fmt.format(salary.max!)}`;
    };

    const formatDate = (dateStr: string) => {
        const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days}d ago`;
        return `${Math.floor(days / 7)}w ago`;
    };

    const typeColors: Record<string, string> = {
        'full-time': 'text-green-400', 'part-time': 'text-blue-400',
        'contract': 'text-yellow-400', 'freelance': 'text-purple-400',
        'internship': 'text-cyan-400'
    };

    // Don't render if no jobs and not loading
    if (!loading && jobs.length === 0) return null;

    return (
        <section className="py-24 px-4 sm:px-6 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-orange-500/20 bg-orange-500/10">
                        <Briefcase className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-orange-400 font-medium">Cybersecurity Careers</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Job Openings</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        Find your next cybersecurity role from top companies worldwide
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] animate-pulse">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5" />
                                    <div className="flex-1 space-y-3">
                                        <div className="h-5 bg-gray-100 dark:bg-white/5 rounded w-3/4" />
                                        <div className="h-4 bg-gray-100 dark:bg-white/5 rounded w-1/2" />
                                        <div className="h-3 bg-gray-100 dark:bg-white/5 rounded w-2/3" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {jobs.map((job) => (
                            <Link
                                key={job._id}
                                href={`/jobs/${job.slug || job._id}`}
                                className={`group p-5 rounded-xl border transition-all ${job.isFeatured
                                        ? 'border-orange-500/30 bg-orange-500/[0.03] hover:border-orange-500/50'
                                        : 'border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/20'
                                    }`}
                            >
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center flex-shrink-0">
                                        {job.companyLogo ? (
                                            <Image src={job.companyLogo} alt="Company logo" width={28} height={28} className="w-7 h-7 object-contain" unoptimized />
                                        ) : (
                                            <Building2 className="w-6 h-6 text-gray-500" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-400 transition-colors truncate">{job.title}</h3>
                                            {job.isFeatured && <Sparkles className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />}
                                        </div>
                                        <p className="text-sm text-gray-400 mb-2">{job.company}</p>
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location || job.locationType}</span>
                                            <span className={`capitalize ${typeColors[job.employmentType] || 'text-gray-400'}`}>{job.employmentType?.replace('-', ' ')}</span>
                                            {formatSalary(job.salary) && <span className="text-green-400">{formatSalary(job.salary)}</span>}
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(job.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-center gap-6 mt-10">
                    <Link href="/jobs" className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-900 dark:text-white font-medium rounded-xl transition-all">
                        View All Jobs
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <Link href="/employer/post" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/20">
                        Post a Job
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default JobsSection;
