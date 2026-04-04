/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';
import Image from 'next/image';
import {
    Briefcase, Search, MapPin, Clock, DollarSign, Building2,
    Filter, ChevronDown, ExternalLink, Plus,
    ArrowRight, Sparkles, X
} from 'lucide-react';
import Footer from '@/components/Footer';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { SkeletonJobsGrid } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/context/ToastContext';

interface Job {
    _id: string;
    title: string;
    slug: string;
    company: string;
    companyLogo?: string;
    description: string;
    category: string;
    experienceLevel: string;
    employmentType: string;
    locationType: string;
    location?: string;
    salary?: { min?: number; max?: number; currency?: string; period?: string };
    skills?: string[];
    benefits?: string[];
    isFeatured?: boolean;
    viewCount?: number;
    applicationCount?: number;
    createdAt: string;
}

const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'pentesting', name: 'Penetration Testing' },
    { id: 'soc', name: 'SOC / Security Operations' },
    { id: 'grc', name: 'GRC / Compliance' },
    { id: 'devsecops', name: 'DevSecOps' },
    { id: 'forensics', name: 'Digital Forensics' },
    { id: 'malware', name: 'Malware Analysis' },
    { id: 'cloud-security', name: 'Cloud Security' },
    { id: 'appsec', name: 'Application Security' },
    { id: 'other', name: 'Other' }
];

const experienceLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'entry', name: 'Entry Level' },
    { id: 'mid', name: 'Mid Level' },
    { id: 'senior', name: 'Senior' },
    { id: 'lead', name: 'Lead / Manager' },
    { id: 'executive', name: 'Executive' }
];

const locationTypes = [
    { id: 'all', name: 'All Locations' },
    { id: 'remote', name: 'Remote' },
    { id: 'hybrid', name: 'Hybrid' },
    { id: 'onsite', name: 'On-site' }
];

const employmentTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'full-time', name: 'Full-time' },
    { id: 'part-time', name: 'Part-time' },
    { id: 'contract', name: 'Contract' },
    { id: 'freelance', name: 'Freelance' },
    { id: 'internship', name: 'Internship' }
];

const experienceLevelNames: Record<string, string> = {
    entry: 'Entry Level', mid: 'Mid Level', senior: 'Senior',
    lead: 'Lead / Manager', executive: 'Executive'
};

const JobsPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    useAuth();
    const { addToast } = useToast();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
    const [selectedLevel, setSelectedLevel] = useState(searchParams.get('experience') || 'all');
    const [selectedLocation, setSelectedLocation] = useState(searchParams.get('locationType') || 'all');
    const [selectedType, setSelectedType] = useState(searchParams.get('employmentType') || 'all');
    const [showFilters, setShowFilters] = useState(false);
    const [salaryMin, setSalaryMin] = useState(searchParams.get('salaryMin') || '');
    const [salaryMax, setSalaryMax] = useState(searchParams.get('salaryMax') || '');
    const debouncedSalaryMin = useDebounce(salaryMin, 500);
    const debouncedSalaryMax = useDebounce(salaryMax, 500);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

    const updateFilters = useCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'all' || value === '') {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, [searchParams, router, pathname]);

    const hasActiveFilters = selectedCategory !== 'all' || selectedLevel !== 'all' || selectedLocation !== 'all' || selectedType !== 'all' || searchQuery !== '' || salaryMin !== '' || salaryMax !== '';

    const clearAllFilters = useCallback(() => {
        setSelectedCategory('all');
        setSelectedLevel('all');
        setSelectedLocation('all');
        setSelectedType('all');
        setSearchQuery('');
        setSalaryMin('');
        setSalaryMax('');
        router.replace(pathname, { scroll: false });
    }, [router, pathname]);

    useEffect(() => {
        fetchJobs();
    }, [selectedCategory, selectedLevel, selectedLocation, selectedType, debouncedSearch, debouncedSalaryMin, debouncedSalaryMax]);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (selectedCategory !== 'all') params.append('category', selectedCategory);
            if (selectedLevel !== 'all') params.append('experienceLevel', selectedLevel);
            if (selectedLocation !== 'all') params.append('locationType', selectedLocation);
            if (selectedType !== 'all') params.append('employmentType', selectedType);
            if (debouncedSearch) params.append('search', debouncedSearch);
            if (debouncedSalaryMin) params.append('salaryMin', debouncedSalaryMin);
            if (debouncedSalaryMax) params.append('salaryMax', debouncedSalaryMax);
            params.append('limit', '20');

            const data = await fetchApi(`/api/jobs?${params.toString()}`, { requireAuth: false });
            setJobs(data.data || []);
            setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
            addToast({ message: 'Failed to load jobs', variant: 'error' });
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchJobs();
    };

    const formatSalary = (salary?: Job['salary']) => {
        if (!salary || (!salary.min && !salary.max)) return null;
        const currency = salary.currency || 'USD';
        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 });
        if (salary.min && salary.max) return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
        if (salary.min) return `From ${formatter.format(salary.min)}`;
        if (salary.max) return `Up to ${formatter.format(salary.max)}`;
        return null;
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const employmentTypeColors: Record<string, string> = {
        'full-time': 'bg-green-500/10 text-green-400 border-green-500/20',
        'part-time': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'contract': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        'freelance': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        'internship': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
    };

    const selectClass = "px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none cursor-pointer";

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative pt-32 pb-12 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/8 rounded-full blur-[150px] pointer-events-none" />

                <div className="relative max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-orange-500/20 bg-orange-500/10">
                        <Briefcase className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-orange-400 font-medium">Cybersecurity Job Board</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
                        Find Your Next
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"> Security Role</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                        Browse cybersecurity jobs from top companies. Remote, hybrid, and on-site positions across penetration testing, SOC, GRC, DevSecOps, and more.
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); updateFilters('search', e.target.value); }}
                                placeholder="Search jobs, companies, or skills..."
                                className="w-full pl-12 pr-32 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/20">
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Employer CTA */}
                    <div className="flex items-center justify-center gap-4">
                        <Link
                            href="/employer/post"
                            className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Post a Job
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Filters Bar */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-colors lg:hidden"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                        <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>

                    <div className={`w-full lg:w-auto flex flex-wrap gap-3 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
                        <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); updateFilters('category', e.target.value); }} className={selectClass}>
                            {categories.map(c => <option key={c.id} value={c.id} className="bg-gray-900">{c.name}</option>)}
                        </select>
                        <select value={selectedLevel} onChange={(e) => { setSelectedLevel(e.target.value); updateFilters('experience', e.target.value); }} className={selectClass}>
                            {experienceLevels.map(l => <option key={l.id} value={l.id} className="bg-gray-900">{l.name}</option>)}
                        </select>
                        <select value={selectedLocation} onChange={(e) => { setSelectedLocation(e.target.value); updateFilters('locationType', e.target.value); }} className={selectClass}>
                            {locationTypes.map(l => <option key={l.id} value={l.id} className="bg-gray-900">{l.name}</option>)}
                        </select>
                        <select value={selectedType} onChange={(e) => { setSelectedType(e.target.value); updateFilters('employmentType', e.target.value); }} className={selectClass}>
                            {employmentTypes.map(t => <option key={t.id} value={t.id} className="bg-gray-900">{t.name}</option>)}
                        </select>

                        {/* Salary Range Inputs */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                                <input
                                    type="number"
                                    placeholder="Min salary"
                                    value={salaryMin}
                                    onChange={(e) => { setSalaryMin(e.target.value); updateFilters('salaryMin', e.target.value); }}
                                    className="w-28 pl-8 pr-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:border-orange-500/50 focus:outline-none"
                                    min="0"
                                />
                            </div>
                            <span className="text-gray-500 text-sm">-</span>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                                <input
                                    type="number"
                                    placeholder="Max salary"
                                    value={salaryMax}
                                    onChange={(e) => { setSalaryMax(e.target.value); updateFilters('salaryMax', e.target.value); }}
                                    className="w-28 pl-8 pr-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:border-orange-500/50 focus:outline-none"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                            >
                                <X className="w-3.5 h-3.5" /> Clear Filters
                            </button>
                        )}
                        <span className="text-sm text-gray-500">
                            {pagination.total} {pagination.total === 1 ? 'job' : 'jobs'} found
                        </span>
                    </div>
                </div>
            </section>

            {/* Job Listings */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
                {loading ? (
                    <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6">
                        <div className="max-w-4xl mx-auto">
                            <SkeletonJobsGrid />
                        </div>
                    </div>
                ) : jobs.length === 0 ? (
                    <EmptyState
                        icon={Briefcase}
                        title="No jobs found"
                        description="Try adjusting your filters or search query."
                        actionLabel="Clear all filters"
                        onAction={() => { setSelectedCategory('all'); setSelectedLevel('all'); setSelectedLocation('all'); setSelectedType('all'); setSearchQuery(''); }}
                    />
                ) : (
                    <div className="space-y-4">
                        {jobs.map((job, index) => (
                            <Link
                                key={job._id}
                                href={`/jobs/${job.slug || job._id}`}
                                className={`block p-6 rounded-2xl border transition-all group card-hover animate-fade-in-up animate-stagger-${index % 6 + 1} ${job.isFeatured
                                    ? 'border-orange-500/30 bg-orange-500/[0.03] hover:border-orange-500/50'
                                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                                    }`}
                                style={{ animationFillMode: 'forwards' }}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                    {/* Company Logo */}
                                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                        {job.companyLogo ? (
                                            <Image src={job.companyLogo} alt={job.company} width={36} height={36} className="w-9 h-9 object-contain" unoptimized />
                                        ) : (
                                            <Building2 className="w-7 h-7 text-gray-500" />
                                        )}
                                    </div>

                                    {/* Job Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                                                        {job.title}
                                                    </h3>
                                                    {job.isFeatured && (
                                                        <span className="flex items-center gap-1 px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/20">
                                                            <Sparkles className="w-3 h-3" /> Featured
                                                        </span>
                                                    )}
                                                    <span className={`px-2 py-0.5 text-xs rounded-full border capitalize ${employmentTypeColors[job.employmentType] || 'bg-white/5 text-gray-400 border-white/10'}`}>
                                                        {job.employmentType?.replace('-', ' ')}
                                                    </span>
                                                </div>
                                                <p className="text-gray-400">{job.company}</p>
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-orange-400 transition-colors flex-shrink-0 mt-1" />
                                        </div>

                                        {/* Meta */}
                                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-sm text-gray-500">
                                            <span className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                {job.location || job.locationType}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Briefcase className="w-4 h-4" />
                                                {experienceLevelNames[job.experienceLevel] || job.experienceLevel}
                                            </span>
                                            {formatSalary(job.salary) && (
                                                <span className="flex items-center gap-1.5 text-green-400">
                                                    <DollarSign className="w-4 h-4" />
                                                    {formatSalary(job.salary)}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" />
                                                {formatDate(job.createdAt)}
                                            </span>
                                        </div>

                                        {/* Skills */}
                                        {job.skills && job.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {job.skills.slice(0, 5).map((skill, index) => (
                                                    <span key={index} className="px-2.5 py-1 text-xs bg-white/5 text-gray-400 rounded-lg border border-white/5">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {job.skills.length > 5 && (
                                                    <span className="px-2.5 py-1 text-xs text-gray-500">
                                                        +{job.skills.length - 5} more
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default JobsPage;
