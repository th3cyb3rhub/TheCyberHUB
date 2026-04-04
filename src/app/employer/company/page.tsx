/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { fetchApi, uploadFile } from '@/lib/api';
import { Briefcase, Building, MapPin, Globe, Loader2, Save, Upload, Twitter, Linkedin, Users } from 'lucide-react';
import Image from 'next/image';

interface CompanyProfile {
    _id?: string;
    name: string;
    slug?: string;
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
    isVerified?: boolean;
}

export default function EmployerCompanyPage() {
    const { user, token } = useAuth();
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Initial state matching the schema
    const [company, setCompany] = useState<CompanyProfile>({
        name: user?.organization?.name || '',
        logo: '',
        website: '',
        description: '',
        industry: '',
        size: '',
        location: '',
        socialLinks: {
            linkedin: '',
            twitter: ''
        }
    });

    useEffect(() => {
        const fetchCompanyData = async () => {
            if (!token) return;
            try {
                const response = await fetchApi('/companies/my/profile');
                if (response.success && response.data) {
                    setCompany({
                        ...company,
                        ...response.data,
                        // Ensure socialLinks exists even if missing in DB
                        socialLinks: response.data.socialLinks || { linkedin: '', twitter: '' }
                    });
                }
            } catch (error: unknown) {
                console.error('Error fetching company profile:', error);
                // Don't show toast for 404/not found as they might just be a new employer
                const message = error instanceof Error ? error.message : 'An error occurred';
                if (message !== 'Company not found') {
                    addToast({ message: 'Failed to load company profile', variant: 'error' });
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompanyData();
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('social_')) {
            const network = name.split('_')[1];
            setCompany(prev => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [network]: value
                }
            }));
        } else {
            setCompany(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            addToast({ message: 'Please upload an image file', variant: 'error' });
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            addToast({ message: 'Image must be less than 2MB', variant: 'error' });
            return;
        }

        setIsUploading(true);
        try {
            // Upload to S3 using the new generic endpoint
            const url = await uploadFile(file, 'company-logos');
            setCompany(prev => ({ ...prev, logo: url }));
            addToast({ message: 'Logo uploaded successfully', variant: 'success' });
        } catch (error) {
            console.error('Upload error:', error);
            addToast({ message: 'Failed to upload logo', variant: 'error' });
        } finally {
            setIsUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!company.name.trim() || !company.description.trim()) {
            addToast({ message: 'Company name and description are required', variant: 'error' });
            return;
        }

        setIsSaving(true);
        try {
            const response = await fetchApi('/companies/my/profile', {
                method: 'POST',
                body: JSON.stringify(company),
            });

            if (response.success) {
                addToast({ message: 'Company profile saved successfully!', variant: 'success' });
                setCompany({
                    ...company,
                    ...response.data
                });
            } else {
                addToast({ message: response.error?.message || 'Failed to save profile', variant: 'error' });
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to save profile';
            addToast({ message, variant: 'error' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
                <div className="mb-8 border-b border-gray-800 pb-5">
                    <div className="h-10 bg-gray-800 w-64 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-800 w-96 rounded-lg"></div>
                </div>
                <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 sm:p-8 space-y-8">
                    <div className="flex gap-6 pb-8 border-b border-gray-800">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-gray-800" />
                        <div className="flex-1 max-w-sm space-y-3 pt-4">
                            <div className="h-6 bg-gray-800 rounded w-1/3" />
                            <div className="h-4 bg-gray-800 rounded w-full" />
                            <div className="h-10 bg-gray-800 rounded-lg w-32" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <div className="h-4 bg-gray-800 rounded w-1/4" />
                            <div className="h-12 bg-gray-800 rounded-lg w-full" />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <div className="h-4 bg-gray-800 rounded w-1/4" />
                            <div className="h-32 bg-gray-800 rounded-lg w-full" />
                        </div>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="space-y-2">
                                <div className="h-4 bg-gray-800 rounded w-1/3" />
                                <div className="h-12 bg-gray-800 rounded-lg w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 border-b border-gray-800 pb-5">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Building className="w-8 h-8 text-[#00ffcc]" />
                    Company Profile
                </h1>
                <p className="mt-2 text-gray-400">
                    Manage your organization&apos;s public profile. This information will be displayed on all your job postings.
                </p>
                {company.slug && (
                    <div className="mt-4">
                        <a
                            href={`/company/${company.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-[#00ffcc] hover:text-white transition-colors gap-1"
                        >
                            View Public Profile <Globe className="w-4 h-4" />
                        </a>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-gray-950 border border-gray-800 rounded-xl p-6 sm:p-8">

                {/* Logo Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-gray-800">
                    <div className="relative group w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-900 border border-gray-700 flex items-center justify-center shrink-0">
                        {company.logo ? (
                            <Image
                                src={company.logo}
                                alt={`${company.name} logo`}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <Building className="w-12 h-12 sm:w-16 sm:h-16 text-gray-700" />
                        )}

                        <label className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity ${isUploading ? 'opacity-100' : ''}`}>
                            {isUploading ? (
                                <Loader2 className="w-6 h-6 animate-spin text-[#00ffcc]" />
                            ) : (
                                <>
                                    <Upload className="w-6 h-6 mb-1 text-[#00ffcc]" />
                                    <span className="text-xs font-medium">Upload Logo</span>
                                </>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                disabled={isUploading}
                            />
                        </label>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-white mb-1">Company Logo</h3>
                        <p className="text-sm text-gray-400 mb-3 max-w-md">
                            Upload a high-resolution logo. Recommended size is 256x256px. Max size 2MB.
                        </p>
                        <label className="inline-flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors disabled:opacity-50">
                            {isUploading ? 'Uploading...' : 'Choose File'}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                disabled={isUploading}
                            />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Company Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Building className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={company.name}
                                onChange={handleChange}
                                className="block w-full pl-10 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-[#00ffcc] focus:border-[#00ffcc] sm:text-sm p-3 placeholder-gray-500 transition-colors"
                                placeholder="Acme Security Inc."
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                            About Company <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            required
                            rows={5}
                            value={company.description}
                            onChange={handleChange}
                            className="block w-full bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-[#00ffcc] focus:border-[#00ffcc] sm:text-sm p-3 placeholder-gray-500 transition-colors"
                            placeholder="Tell candidates what your company does, your mission, and your culture..."
                        />
                    </div>

                    {/* Website */}
                    <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                            Website
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Globe className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="url"
                                name="website"
                                id="website"
                                value={company.website}
                                onChange={handleChange}
                                className="block w-full pl-10 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-[#00ffcc] focus:border-[#00ffcc] sm:text-sm p-3 placeholder-gray-500 transition-colors"
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                            Headquarters Location
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                name="location"
                                id="location"
                                value={company.location}
                                onChange={handleChange}
                                className="block w-full pl-10 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-[#00ffcc] focus:border-[#00ffcc] sm:text-sm p-3 placeholder-gray-500 transition-colors"
                                placeholder="New York, NY"
                            />
                        </div>
                    </div>

                    {/* Industry */}
                    <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
                            Industry
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Briefcase className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                name="industry"
                                id="industry"
                                value={company.industry}
                                onChange={handleChange}
                                className="block w-full pl-10 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-[#00ffcc] focus:border-[#00ffcc] sm:text-sm p-3 placeholder-gray-500 transition-colors"
                                placeholder="Cybersecurity, Fintech, etc."
                            />
                        </div>
                    </div>

                    {/* Size */}
                    <div>
                        <label htmlFor="size" className="block text-sm font-medium text-gray-300 mb-2">
                            Company Size
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Users className="h-5 w-5 text-gray-500" />
                            </div>
                            <select
                                name="size"
                                id="size"
                                value={company.size}
                                onChange={handleChange}
                                className="block w-full pl-10 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-[#00ffcc] focus:border-[#00ffcc] sm:text-sm p-3 transition-colors appearance-none"
                            >
                                <option value="" disabled>Select company size...</option>
                                <option value="1-10">1-10 employees</option>
                                <option value="11-50">11-50 employees</option>
                                <option value="51-200">51-200 employees</option>
                                <option value="201-500">201-500 employees</option>
                                <option value="501-1000">501-1000 employees</option>
                                <option value="1000+">1000+ employees</option>
                            </select>
                        </div>
                    </div>

                    {/* Socials Divider */}
                    <div className="col-span-1 md:col-span-2 pt-6 pb-2">
                        <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-2">Social Profiles</h3>
                    </div>

                    {/* LinkedIn */}
                    <div>
                        <label htmlFor="social_linkedin" className="block text-sm font-medium text-gray-300 mb-2">
                            LinkedIn
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Linkedin className="h-4 w-4 text-gray-500" />
                            </div>
                            <input
                                type="url"
                                name="social_linkedin"
                                id="social_linkedin"
                                value={company.socialLinks?.linkedin || ''}
                                onChange={handleChange}
                                className="block w-full pl-10 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-[#00ffcc] focus:border-[#00ffcc] sm:text-sm p-3 placeholder-gray-500 transition-colors"
                                placeholder="https://linkedin.com/company/your-company"
                            />
                        </div>
                    </div>

                    {/* Twitter */}
                    <div>
                        <label htmlFor="social_twitter" className="block text-sm font-medium text-gray-300 mb-2">
                            Twitter Profile URL
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Twitter className="h-4 w-4 text-gray-500" />
                            </div>
                            <input
                                type="url"
                                name="social_twitter"
                                id="social_twitter"
                                value={company.socialLinks?.twitter || ''}
                                onChange={handleChange}
                                className="block w-full pl-10 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-[#00ffcc] focus:border-[#00ffcc] sm:text-sm p-3 placeholder-gray-500 transition-colors"
                                placeholder="https://twitter.com/your-company"
                            />
                        </div>
                    </div>

                </div>

                <div className="pt-6 flex justify-end gap-4 border-t border-gray-800 mt-8">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-6 py-3 border border-gray-600 rounded-lg text-white font-medium hover:bg-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-8 py-3 bg-[#00ffcc] text-black font-bold rounded-lg hover:bg-[#00e6b8] transition-colors flex items-center disabled:opacity-75"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5 mr-2" />
                                Save Profile
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
