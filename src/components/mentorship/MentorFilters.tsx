'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { EXPERTISE_OPTIONS } from './ExpertiseBadge';
import type { ExpertiseArea, MentorSearchParams, MentorSortOption } from '@/lib/mentorship/types';

interface MentorFiltersProps {
    onFilterChange: (params: MentorSearchParams) => void;
    initialParams?: MentorSearchParams;
}

export function MentorFilters({ onFilterChange, initialParams = {} }: MentorFiltersProps) {
    const [search, setSearch] = useState(initialParams.search || '');
    const [selectedExpertise, setSelectedExpertise] = useState<ExpertiseArea[]>(initialParams.expertise || []);
    const [minRating, setMinRating] = useState(initialParams.minRating || 0);
    const [availableOnly, setAvailableOnly] = useState(initialParams.available ?? true);
    const [sort, setSort] = useState<MentorSortOption>(initialParams.sort || 'relevance');

    const handleExpertiseToggle = (area: ExpertiseArea) => {
        const newSelection = selectedExpertise.includes(area)
            ? selectedExpertise.filter((e) => e !== area)
            : [...selectedExpertise, area];
        setSelectedExpertise(newSelection);
        applyFilters({ expertise: newSelection });
    };

    const applyFilters = (overrides: Partial<MentorSearchParams> = {}) => {
        onFilterChange({
            search,
            expertise: selectedExpertise,
            minRating: minRating > 0 ? minRating : undefined,
            available: availableOnly,
            sort,
            ...overrides,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedExpertise([]);
        setMinRating(0);
        setAvailableOnly(true);
        setSort('relevance');
        onFilterChange({});
    };

    const hasActiveFilters = search || selectedExpertise.length > 0 || minRating > 0 || !availableOnly;

    return (
        <div className="space-y-4">
            {/* Search */}
            <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search mentors..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pr-10"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </form>

            {/* Expertise Filter */}
            <div>
                <h4 className="text-sm font-medium mb-2">Expertise Areas</h4>
                <div className="flex flex-wrap gap-1.5">
                    {EXPERTISE_OPTIONS.map(({ value, label }) => (
                        <Badge
                            key={value}
                            variant={selectedExpertise.includes(value) ? 'default' : 'outline'}
                            className="cursor-pointer text-xs"
                            onClick={() => handleExpertiseToggle(value)}
                        >
                            {label}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Rating Filter */}
            <div>
                <h4 className="text-sm font-medium mb-2">Minimum Rating</h4>
                <div className="flex items-center gap-2">
                    {[0, 3, 3.5, 4, 4.5].map((rating) => (
                        <Button
                            key={rating}
                            variant={minRating === rating ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                                setMinRating(rating);
                                applyFilters({ minRating: rating > 0 ? rating : undefined });
                            }}
                        >
                            {rating === 0 ? 'Any' : `${rating}+`}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Available Only</span>
                <button
                    type="button"
                    role="switch"
                    aria-checked={availableOnly}
                    onClick={() => {
                        setAvailableOnly(!availableOnly);
                        applyFilters({ available: !availableOnly });
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${availableOnly ? 'bg-primary' : 'bg-muted'
                        }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${availableOnly ? 'translate-x-6' : 'translate-x-1'
                            }`}
                    />
                </button>
            </div>

            {/* Sort */}
            <div>
                <h4 className="text-sm font-medium mb-2">Sort By</h4>
                <div className="flex gap-2">
                    {(['relevance', 'rating', 'experience'] as MentorSortOption[]).map((option) => (
                        <Button
                            key={option}
                            variant={sort === option ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => {
                                setSort(option);
                                applyFilters({ sort: option });
                            }}
                        >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
                    Clear All Filters
                </Button>
            )}
        </div>
    );
}
