"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';
import { Users, Search, Filter, ChevronRight, UserPlus } from 'lucide-react';
import { MentorCard } from '@/components/mentorship/MentorCard';
import { MentorFilters } from '@/components/mentorship/MentorFilters';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { mentorApi } from '@/lib/mentorship/api';
import type { MentorProfile, ExpertiseArea, MentorSortOption } from '@/lib/mentorship/types';

export default function MentorDirectoryPage() {
    const [mentors, setMentors] = useState<MentorProfile[]>([]);
    const [featuredMentors, setFeaturedMentors] = useState<MentorProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    // Filter state
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedExpertise, setSelectedExpertise] = useState<ExpertiseArea[]>([]);
    const [minRating, setMinRating] = useState(0);
    const [availableOnly, setAvailableOnly] = useState(false);
    const [sortBy, setSortBy] = useState<MentorSortOption>('relevance');

    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 12;

    const fetchMentors = useCallback(async (signal?: AbortSignal) => {
        setLoading(true);
        setError(null);
        try {
            const response = await mentorApi.search({
                search: debouncedSearch || undefined,
                expertise: selectedExpertise.length > 0 ? selectedExpertise : undefined,
                minRating: minRating > 0 ? minRating : undefined,
                available: availableOnly || undefined,
                sort: sortBy,
                page,
                limit,
            });
            if (signal?.aborted) return;
            setMentors(response.data);
            setTotalPages(response.pagination.pages);
        } catch (err) {
            if (signal?.aborted) return;
            setError('Failed to load mentors');
            console.error(err);
        } finally {
            if (!signal?.aborted) {
                setLoading(false);
            }
        }
    }, [debouncedSearch, selectedExpertise, minRating, availableOnly, sortBy, page]);

    const fetchFeatured = useCallback(async () => {
        try {
            const featured = await mentorApi.getFeatured(4);
            setFeaturedMentors(featured);
        } catch (err) {
            console.error('Failed to load featured mentors:', err);
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        fetchMentors(controller.signal);
        return () => controller.abort();
    }, [fetchMentors]);

    useEffect(() => {
        fetchFeatured();
    }, [fetchFeatured]);

    const handleFilterChange = () => {
        setPage(1);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedExpertise([]);
        setMinRating(0);
        setAvailableOnly(false);
        setSortBy('relevance');
        setPage(1);
    };

    const hasActiveFilters = searchQuery || selectedExpertise.length > 0 || minRating > 0 || availableOnly;

    return (
        <div className="min-h-screen bg-black">
            {/* Background effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/8 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <Users className="w-4 h-4" />
                            <span>Mentorship Program</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                    Find a <span className="gradient-text">Mentor</span>
                                </h1>
                                <p className="text-gray-400">
                                    Connect with experienced cybersecurity professionals
                                </p>
                            </div>
                            <Link href="/mentorship/become-mentor">
                                <Button className="bg-orange-500 hover:bg-orange-600">
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Become a Mentor
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Featured Mentors */}
                    {featuredMentors.length > 0 && (
                        <div className="mb-10">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                ⭐ Featured Mentors
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {featuredMentors.map(mentor => (
                                    <MentorCard key={mentor._id} mentor={mentor} featured />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Search and Filters */}
                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search mentors by name or expertise..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        handleFilterChange();
                                    }}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                                />
                            </div>

                            {/* Filter Toggle */}
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className={showFilters ? 'border-orange-500 text-orange-400' : ''}
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Filters
                                {hasActiveFilters && (
                                    <span className="ml-2 w-2 h-2 bg-orange-500 rounded-full" />
                                )}
                            </Button>
                        </div>

                        {/* Filters Panel */}
                        {showFilters && (
                            <div className="mt-4 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                                <MentorFilters
                                    onFilterChange={(params) => {
                                        if (params.search !== undefined) setSearchQuery(params.search || '');
                                        if (params.expertise !== undefined) setSelectedExpertise(params.expertise || []);
                                        if (params.minRating !== undefined) setMinRating(params.minRating || 0);
                                        if (params.available !== undefined) setAvailableOnly(params.available || false);
                                        if (params.sort !== undefined) setSortBy(params.sort || 'relevance');
                                        handleFilterChange();
                                    }}
                                    initialParams={{
                                        search: searchQuery,
                                        expertise: selectedExpertise,
                                        minRating,
                                        available: availableOnly,
                                        sort: sortBy,
                                    }}
                                />
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="mt-4 text-sm text-orange-400 hover:text-orange-300"
                                    >
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Results */}
                    {loading ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Skeleton className="w-14 h-14 rounded-full" />
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-3 w-1/2" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-2/3 mb-4" />
                                    <div className="flex gap-2 mb-4">
                                        <Skeleton className="h-6 w-16 rounded-full" />
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                        <Skeleton className="h-6 w-14 rounded-full" />
                                    </div>
                                    <Skeleton className="h-9 w-full rounded-lg" />
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-red-400 mb-4">{error}</p>
                            <Button onClick={() => fetchMentors()} variant="outline">
                                Try Again
                            </Button>
                        </div>
                    ) : mentors.length === 0 ? (
                        <EmptyState
                            icon={Users}
                            title="No mentors found"
                            description={hasActiveFilters
                                ? 'Try adjusting your filters'
                                : 'Be the first to become a mentor!'}
                            actionLabel={hasActiveFilters ? 'Clear Filters' : 'Become a Mentor'}
                            onAction={hasActiveFilters ? clearFilters : undefined}
                            actionHref={hasActiveFilters ? undefined : '/mentorship/become-mentor'}
                        />
                    ) : (
                        <>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {mentors.map(mentor => (
                                    <MentorCard key={mentor._id} mentor={mentor} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-8">
                                    <Button
                                        variant="outline"
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                    >
                                        Previous
                                    </Button>
                                    <span className="text-gray-400 px-4">
                                        Page {page} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </>
                    )}

                    {/* CTA */}
                    <div className="mt-12 p-6 rounded-2xl border border-white/10 bg-gradient-to-r from-orange-500/5 to-transparent">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">
                                    Want to share your expertise?
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Help others grow in cybersecurity by becoming a mentor
                                </p>
                            </div>
                            <Link href="/mentorship/become-mentor">
                                <Button className="bg-orange-500 hover:bg-orange-600">
                                    Become a Mentor
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
