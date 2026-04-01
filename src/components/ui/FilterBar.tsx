import React from "react";
import { Search } from "lucide-react";

interface FilterOption {
    label: string;
    value: string;
}

interface FilterConfig {
    label: string;
    value: string;
    options: FilterOption[];
}

interface FilterBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    filters?: FilterConfig[];
    onFilterChange?: (filterName: string, value: string) => void;
    activeFilters?: Record<string, string>;
    resultCount?: number;
    onSubmit?: (e: React.FormEvent) => void;
    children?: React.ReactNode;
}

const FilterBar: React.FC<FilterBarProps> = ({
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search...",
    filters,
    onFilterChange,
    activeFilters = {},
    resultCount,
    onSubmit,
    children,
}) => {
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <div className="flex flex-col sm:flex-row flex-wrap items-start gap-3">
            {/* Search input */}
            <form
                onSubmit={handleFormSubmit}
                className="relative flex-1 min-w-[200px]"
            >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full pl-11 pr-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-all"
                />
            </form>

            {/* Select-based filters */}
            {filters &&
                filters.map((filter) => (
                    <select
                        key={filter.value}
                        value={activeFilters[filter.value] ?? "all"}
                        onChange={(e) =>
                            onFilterChange?.(filter.value, e.target.value)
                        }
                        className="px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm focus:border-orange-500/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                        {filter.options.map((opt) => (
                            <option
                                key={opt.value}
                                value={opt.value}
                                className="bg-white dark:bg-zinc-900"
                            >
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ))}

            {/* Extra slot for custom buttons / toggles */}
            {children}

            {/* Result count */}
            {resultCount !== undefined && (
                <div className="ml-auto flex items-center py-3 text-sm text-gray-500">
                    {resultCount} {resultCount === 1 ? "result" : "results"}
                </div>
            )}
        </div>
    );
};

export default FilterBar;
