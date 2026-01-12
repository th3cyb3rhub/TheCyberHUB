"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Briefcase,
    Search,
    MapPin,
    Clock,
    DollarSign,
    Building2,
    Filter,
    ChevronDown,
    ExternalLink,
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
    skills?: string[];
    isFeatured?: boolean;
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

const JobsPage = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

    useEffect(() => {
        fetchJobs();
    }, [selectedCategory, selectedLevel, selectedLocation]);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();

            if (selectedCategory !== 'all') params.append('category', selectedCategory);
            if (selectedLevel !== 'all') params.append('experienceLevel', selectedLevel);
            if (selectedLocation !== 'all') params.append('locationType', selectedLocation);
            if (searchQuery) params.append('search', searchQuery);

            const response = await fetch(`${API_URL}/api/jobs?${params.toString()}`);

            if (response.ok) {
                const data = await response.json();
                setJobs(data.data || []);
                setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
            } else {
                setJobs([]);
            }
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
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
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            maximumFractionDigits: 0
        });

        if (salary.min && salary.max) {
            return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
        }
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
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getCategoryName = (id: string) => {
        return categories.find(c => c.id === id)?.name || id;
    };

    const getLevelName = (id: string) => {
        return experienceLevels.find(l => l.id === id)?.name || id;
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative pt-32 pb-12 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5">
                        <Briefcase className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Cybersecurity Careers</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                        Find Your Next
                        <span className="text-orange-500"> Security Role</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                        Browse cybersecurity job opportunities from top companies. Remote, hybrid, and on-site positions available.
                    </p>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search jobs, companies, or skills..."
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Filters */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/20 transition-colors md:hidden"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                        <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>

                    <div className={`w-full md:w-auto flex flex-wrap gap-3 ${showFilters ? 'block' : 'hidden md:flex'}`}>
                        {/* Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none"
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id} className="bg-gray-900">
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        {/* Experience Level Filter */}
                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none"
                        >
                            {experienceLevels.map(level => (
                                <option key={level.id} value={level.id} className="bg-gray-900">
                                    {level.name}
                                </option>
                            ))}
                        </select>

                        {/* Location Type Filter */}
                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none"
                        >
                            {locationTypes.map(loc => (
                                <option key={loc.id} value={loc.id} className="bg-gray-900">
                                    {loc.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="ml-auto text-sm text-gray-500">
                        {pagination.total} jobs found
                    </div>
                </div>
            </section>

            {/* Job Listings */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20">
                        <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
                        <p className="text-gray-400">Try adjusting your filters or search query.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {jobs.map((job) => (
                            <Link
                                key={job._id}
                                href={`/jobs/${job.slug || job._id}`}
                                className="block p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-orange-500/30 transition-all group"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                    {/* Company Logo */}
                                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                        {job.companyLogo ? (
                                            <img src={job.companyLogo} alt={job.company} className="w-8 h-8 object-contain" />
                                        ) : (
                                            <Building2 className="w-6 h-6 text-gray-500" />
                                        )}
                                    </div>

                                    {/* Job Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                                                        {job.title}
                                                    </h3>
                                                    {job.isFeatured && (
                                                        <span className="px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded">
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-400">{job.company}</p>
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors flex-shrink-0" />
                                        </div>

                                        {/* Meta */}
                                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {job.location || job.locationType}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="w-4 h-4" />
                                                {getLevelName(job.experienceLevel)}
                                            </span>
                                            {formatSalary(job.salary) && (
                                                <span className="flex items-center gap-1">
                                                    <DollarSign className="w-4 h-4" />
                                                    {formatSalary(job.salary)}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {formatDate(job.createdAt)}
                                            </span>
                                        </div>

                                        {/* Skills */}
                                        {job.skills && job.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {job.skills.slice(0, 5).map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 text-xs bg-white/5 text-gray-400 rounded"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {job.skills.length > 5 && (
                                                    <span className="px-2 py-1 text-xs text-gray-500">
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
