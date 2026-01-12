"use client";

import React from 'react';
import { Search } from 'lucide-react';

interface FilterOption {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

interface SearchFilterProps {
    searchPlaceholder?: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
    filters?: FilterOption[];
    activeFilter: string;
    onFilterChange: (id: string) => void;
    className?: string;
}

export function SearchFilter({
    searchPlaceholder = "Search...",
    searchValue,
    onSearchChange,
    filters,
    activeFilter,
    onFilterChange,
    className = "",
}: SearchFilterProps) {
    return (
        <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
            {/* Search Input */}
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-all"
                />
            </div>

            {/* Filter Buttons */}
            {filters && filters.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => onFilterChange(filter.id)}
                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${activeFilter === filter.id
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
                                }`}
                        >
                            {filter.icon}
                            {filter.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchFilter;
