"use client";

import React, { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/api';
import { Building, MapPin, Globe, Users, Briefcase, Linkedin, Twitter, ExternalLink, DollarSign } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CompanyProfile {
    _id: string;
    name: string;
    slug: string;
    logo: string;
    website: string;
    description: string;
    industry: string;
    size: string;
    location: string;
    socialLinks: {
        linkedin: string;
        twitter: string;
    };
    isVerified: boolean;
}

interface JobData {
    _id: string;
    slug: string;
    title: string;
    locationType: string;
    location: string;
    employmentType: string;
    experienceLevel: string;
    salary?: { min: number; max: number; currency: string; period: string };
    createdAt: string;
}

export default function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);
    const [company, setCompany] = useState<CompanyProfile | null>(null);
    const [jobs, setJobs] = useState<JobData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isJobsLoading, setIsJobsLoading] = useState(true);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await fetchApi(`/companies/${slug}`);
                if (response.success && response.data) {
                    setCompany(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch company", error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchJobs = async () => {
            try {
                const response = await fetchApi(`/companies/${slug}/jobs`);
                if (response.success && response.data) {
                    setJobs(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch jobs", error);
            } finally {
                setIsJobsLoading(false);
            }
        };

        fetchCompany();
        fetchJobs();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
                <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-8 h-48"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sm:p-8 h-48"></div>
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sm:p-8 h-64"></div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-64"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!company) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <Building className="w-16 h-16 text-gray-600 mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Company Not Found</h1>
                <p className="text-gray-400 mb-6">The company profile you are looking for doesn&apos;t exist.</p>
                <Link href="/jobs" className="px-6 py-3 bg-[#00ffcc] text-black font-semibold rounded-lg hover:bg-[#00e6b8] transition-colors">
                    Browse Jobs
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden mb-8 relative">
                {/* Cover Banner could go here if added later */}
                <div className="h-32 bg-gray-900 border-b border-gray-800"></div>

                <div className="px-6 sm:px-8 pb-8 relative">
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-12 sm:-mt-16 mb-4">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-900 border-4 border-gray-950 rounded-xl overflow-hidden shrink-0 flex items-center justify-center relative">
                            {company.logo ? (
                                <Image src={company.logo} alt={company.name} fill className="object-contain p-2 bg-white" />
                            ) : (
                                <Building className="w-12 h-12 text-gray-500" />
                            )}
                        </div>
                        <div className="flex-1 pb-2">
                            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                                {company.name}
                                {company.isVerified && (
                                    <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs ml-1" title="Verified Employer">✓</span>
                                )}
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-gray-400">
                                {company.industry && (
                                    <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                                        <Briefcase className="w-4 h-4 text-[#00ffcc]" /> {company.industry}
                                    </div>
                                )}
                                {company.location && (
                                    <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                                        <MapPin className="w-4 h-4 text-orange-400" /> {company.location}
                                    </div>
                                )}
                                {company.size && (
                                    <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                                        <Users className="w-4 h-4 text-cyan-400" /> {company.size} employees
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0 pb-2">
                            {company.website && (
                                <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-medium rounded-lg transition-colors">
                                    <Globe className="w-4 h-4" /> Website
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Socials & Small links */}
                    {(company.socialLinks?.linkedin || company.socialLinks?.twitter) && (
                        <div className="flex gap-4 mt-6 pt-6 border-t border-gray-800">
                            {company.socialLinks.linkedin && (
                                <a href={company.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            {company.socialLinks.twitter && (
                                <a href={company.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* About Section */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 sm:p-8">
                        <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-3 flex items-center gap-2">
                            <span className="w-8 h-1 bg-[#00ffcc] rounded-full inline-block"></span>
                            About {company.name}
                        </h2>

                        <div className="prose prose-invert max-w-none text-gray-300">
                            {company.description ? (
                                <p className="whitespace-pre-wrap leading-relaxed">{company.description}</p>
                            ) : (
                                <p className="text-gray-500 italic">No description provided.</p>
                            )}
                        </div>
                    </div>

                    {/* Open Jobs List */}
                    <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 sm:p-8">
                        <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-3 flex items-center gap-2">
                            <span className="w-8 h-1 bg-orange-400 rounded-full inline-block"></span>
                            Open Roles ({jobs.length})
                        </h2>

                        {isJobsLoading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="animate-pulse bg-gray-900 border border-gray-800 rounded-lg p-5 w-full h-32"></div>
                                ))}
                            </div>
                        ) : jobs.length > 0 ? (
                            <div className="space-y-4">
                                {jobs.map((job) => (
                                    <Link key={job._id} href={`/jobs/${job.slug}`} className="block group">
                                        <div className="bg-gray-900 border border-gray-800 p-5 rounded-lg group-hover:border-gray-600 transition-colors">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white group-hover:text-[#00ffcc] transition-colors line-clamp-1">{job.title}</h3>
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-gray-400">
                                                        <div className="flex items-center gap-1.5">
                                                            <Briefcase className="w-4 h-4" />
                                                            <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>
                                                        </div>
                                                        {(job.locationType || job.location) && (
                                                            <div className="flex items-center gap-1.5">
                                                                <MapPin className="w-4 h-4" />
                                                                <span className="capitalize">{job.locationType}{job.location ? ` • ${job.location}` : ''}</span>
                                                            </div>
                                                        )}
                                                        {job.salary?.min && (
                                                            <div className="flex items-center gap-1.5 text-green-400">
                                                                <DollarSign className="w-4 h-4" />
                                                                {job.salary.currency} {job.salary.min.toLocaleString()}{job.salary.max ? ` - ${job.salary.max.toLocaleString()}` : '+'} /{job.salary.period === 'yearly' ? 'yr' : 'mo'}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="hidden sm:block text-gray-500 group-hover:text-white transition-colors">
                                                    <ExternalLink className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                <p className="text-gray-400 font-medium">No open positions right now.</p>
                                <p className="text-sm text-gray-500 mt-1">Check back later for new opportunities.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2">At a Glance</h3>
                        <ul className="space-y-4">
                            {company.industry && (
                                <li>
                                    <p className="text-xs text-gray-500 font-medium mb-1">Industry</p>
                                    <p className="text-sm text-white">{company.industry}</p>
                                </li>
                            )}
                            {company.size && (
                                <li>
                                    <p className="text-xs text-gray-500 font-medium mb-1">Company Size</p>
                                    <p className="text-sm text-white">{company.size} employees</p>
                                </li>
                            )}
                            {company.location && (
                                <li>
                                    <p className="text-xs text-gray-500 font-medium mb-1">Headquarters</p>
                                    <p className="text-sm text-white">{company.location}</p>
                                </li>
                            )}
                            {company.website && (
                                <li>
                                    <p className="text-xs text-gray-500 font-medium mb-1">Website</p>
                                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#00ffcc] hover:underline flex items-center gap-1">
                                        Visit Website <ExternalLink className="w-3 h-3" />
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
