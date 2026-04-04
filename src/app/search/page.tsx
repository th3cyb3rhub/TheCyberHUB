'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, FileText, MessageSquare, Calendar, User, BookOpen, Briefcase, Clock, TrendingUp, X, History, CalendarRange, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchApi } from '@/lib/api';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchResult {
    _id: string;
    type: 'blog' | 'discussion' | 'event' | 'challenge' | 'resource' | 'job' | 'user';
    title?: string;
    name?: string;
    username?: string;
    content?: string;
    description?: string;
    slug?: string;
    category?: string;
    createdAt?: string;
    author?: { username: string };
}

interface SearchResponse {
    results: SearchResult[];
    total: number;
    page: number;
    pages: number;
}

const typeIcons: Record<string, React.ReactNode> = {
    blog: <FileText className="w-4 h-4" />,
    discussion: <MessageSquare className="w-4 h-4" />,
    event: <Calendar className="w-4 h-4" />,
    challenge: <BookOpen className="w-4 h-4" />,
    resource: <BookOpen className="w-4 h-4" />,
    job: <Briefcase className="w-4 h-4" />,
    user: <User className="w-4 h-4" />,
};

const typeLabels: Record<string, string> = {
    blog: 'Blog',
    discussion: 'Forum',
    event: 'Event',
    challenge: 'Challenge',
    resource: 'Resource',
    job: 'Job',
    user: 'User',
};

const typeColors: Record<string, string> = {
    blog: 'bg-blue-500/20 text-blue-400',
    discussion: 'bg-green-500/20 text-green-400',
    event: 'bg-purple-500/20 text-purple-400',
    challenge: 'bg-orange-500/20 text-orange-400',
    resource: 'bg-orange-500/20 text-orange-400',
    job: 'bg-yellow-500/20 text-yellow-400',
    user: 'bg-pink-500/20 text-pink-400',
};


// Highlight matching terms in text
function highlightText(text: string, searchQuery: string): React.ReactNode {
    if (!searchQuery.trim() || !text) return text;
    const terms = searchQuery.trim().split(/\s+/).filter(t => t.length > 1);
    if (terms.length === 0) return text;
    const regex = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
        regex.test(part) ? <mark key={i} className="bg-orange-500/30 text-orange-300 rounded px-0.5">{part}</mark> : part
    );
}

// Search history helpers
const SEARCH_HISTORY_KEY = 'search_history';
const MAX_HISTORY = 10;

function getSearchHistory(): string[] {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]');
    } catch { return []; }
}

function addToSearchHistory(term: string) {
    if (typeof window === 'undefined' || !term.trim()) return;
    const history = getSearchHistory().filter(h => h !== term);
    history.unshift(term);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
}

function clearSearchHistory() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SEARCH_HISTORY_KEY);
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQuery = searchParams.get('q') || '';
    const initialType = searchParams.get('type') || '';

    const [query, setQuery] = useState(initialQuery);
    const [searchType, setSearchType] = useState(initialType);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [popularSearches, setPopularSearches] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    // Autocomplete
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debouncedQuery = useDebounce(query, 300);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Search history
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    // Advanced filters
    const [showFilters, setShowFilters] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');

    // Load search history on mount
    useEffect(() => {
        setSearchHistory(getSearchHistory());
    }, []);

    // Autocomplete suggestions
    useEffect(() => {
        if (debouncedQuery.length < 2 || debouncedQuery === initialQuery) {
            setSuggestions([]);
            return;
        }
        const fetchSuggestions = async () => {
            try {
                const data = await fetchApi(`/api/search?q=${encodeURIComponent(debouncedQuery)}&limit=5`, { requireAuth: false });
                const titles = (data.results || [])
                    .map((r: SearchResult) => r.title || r.name || r.username || '')
                    .filter((t: string) => t)
                    .slice(0, 5);
                setSuggestions(titles);
            } catch {
                setSuggestions([]);
            }
        };
        fetchSuggestions();
    }, [debouncedQuery, initialQuery]);

    const fetchResults = useCallback(async (searchQuery: string, type: string, pageNum: number) => {
        if (!searchQuery.trim()) {
            setResults([]);
            setTotal(0);
            return;
        }

        setLoading(true);
        try {
            const params = new URLSearchParams({
                q: searchQuery,
                page: pageNum.toString(),
                limit: '20',
            });
            if (type) params.append('type', type);

            const data: SearchResponse = await fetchApi(`/api/search?${params}`, { requireAuth: false });
            setResults(data.results || []);
            setTotal(data.total || 0);
            setPages(data.pages || 1);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPopularSearches = useCallback(async () => {
        try {
            const data = await fetchApi('/api/search/popular', { requireAuth: false });
            setPopularSearches(data.searches || []);
        } catch (error) {
            console.error('Popular searches error:', error);
        }
    }, []);

    useEffect(() => {
        fetchPopularSearches();
    }, [fetchPopularSearches]);

    useEffect(() => {
        if (initialQuery) {
            fetchResults(initialQuery, initialType, 1);
        }
    }, [initialQuery, initialType, fetchResults]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            addToSearchHistory(query.trim());
            setSearchHistory(getSearchHistory());
        }
        setShowSuggestions(false);
        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (searchType) params.append('type', searchType);
        if (dateFrom) params.append('from', dateFrom);
        if (dateTo) params.append('to', dateTo);
        if (authorFilter) params.append('author', authorFilter);
        router.push(`/search?${params.toString()}`);
        fetchResults(query, searchType, 1);
        setPage(1);
    };

    const selectSuggestion = (suggestion: string) => {
        setQuery(suggestion);
        setShowSuggestions(false);
        addToSearchHistory(suggestion);
        setSearchHistory(getSearchHistory());
        router.push(`/search?q=${encodeURIComponent(suggestion)}`);
        fetchResults(suggestion, searchType, 1);
        setPage(1);
    };

    const selectHistoryItem = (term: string) => {
        setQuery(term);
        router.push(`/search?q=${encodeURIComponent(term)}`);
        fetchResults(term, searchType, 1);
        setPage(1);
    };

    const handleTypeFilter = (type: string) => {
        const newType = searchType === type ? '' : type;
        setSearchType(newType);
        if (query) {
            const params = new URLSearchParams();
            params.append('q', query);
            if (newType) params.append('type', newType);
            router.push(`/search?${params.toString()}`);
            fetchResults(query, newType, 1);
            setPage(1);
        }
    };

    const handlePopularSearch = (term: string) => {
        setQuery(term);
        router.push(`/search?q=${encodeURIComponent(term)}`);
        fetchResults(term, searchType, 1);
        setPage(1);
    };

    const getResultLink = (result: SearchResult): string => {
        switch (result.type) {
            case 'blog': return `/blog/${result.slug || result._id}`;
            case 'discussion': return `/forums/${result._id}`;
            case 'event': return `/events/${result.slug || result._id}`;
            case 'challenge': return `/challenges/${result.slug || result._id}`;
            case 'resource': return `/roadmaps`;
            case 'job': return `/jobs/${result.slug || result._id}`;
            case 'user': return `/user/${result.username}`;
            default: return '#';
        }
    };

    const getResultTitle = (result: SearchResult): string => {
        return result.title || result.name || result.username || 'Untitled';
    };

    const getResultDescription = (result: SearchResult): string => {
        const text = result.content || result.description || '';
        return text.length > 150 ? text.substring(0, 150) + '...' : text;
    };


    return (
        <div className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Search</h1>
                    <p className="text-gray-400">Find blogs, discussions, events, challenges, and more</p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            placeholder="Search for anything..."
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50"
                        />
                        <Button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            disabled={loading}
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </Button>

                        {/* Autocomplete / Search History Dropdown */}
                        {showSuggestions && (suggestions.length > 0 || (searchHistory.length > 0 && !query)) && (
                            <div className="absolute top-full left-0 right-0 mt-2 z-20 bg-gray-900 border border-white/10 rounded-xl overflow-hidden shadow-xl">
                                {query && suggestions.length > 0 && (
                                    <div>
                                        {suggestions.map((s, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onMouseDown={() => selectSuggestion(s)}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors text-left"
                                            >
                                                <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                                <span className="truncate">{s}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {!query && searchHistory.length > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <History className="w-3 h-3" /> Recent Searches
                                            </span>
                                            <button
                                                type="button"
                                                onMouseDown={() => { clearSearchHistory(); setSearchHistory([]); }}
                                                className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                        {searchHistory.map((h, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onMouseDown={() => selectHistoryItem(h)}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors text-left"
                                            >
                                                <History className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                                <span className="truncate">{h}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </form>

                {/* Advanced Filters Toggle */}
                <div className="flex items-center gap-3 mb-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${showFilters ? 'border-orange-500/50 bg-orange-500/10 text-orange-400' : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'}`}
                    >
                        <Filter className="w-3 h-3" />
                        Advanced Filters
                    </button>
                    {(dateFrom || dateTo || authorFilter) && (
                        <button
                            onClick={() => { setDateFrom(''); setDateTo(''); setAuthorFilter(''); }}
                            className="text-xs text-gray-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                        >
                            <X className="w-3 h-3" /> Clear Filters
                        </button>
                    )}
                </div>

                {/* Advanced Filters Panel */}
                {showFilters && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">
                                <CalendarRange className="w-3 h-3 inline mr-1" /> From Date
                            </label>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500/50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">
                                <CalendarRange className="w-3 h-3 inline mr-1" /> To Date
                            </label>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500/50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">
                                <User className="w-3 h-3 inline mr-1" /> Author
                            </label>
                            <input
                                type="text"
                                value={authorFilter}
                                onChange={(e) => setAuthorFilter(e.target.value)}
                                placeholder="Filter by author..."
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                            />
                        </div>
                    </div>
                )}

                {/* Type Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {Object.keys(typeLabels).map((type) => (
                        <button
                            key={type}
                            onClick={() => handleTypeFilter(type)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${searchType === type
                                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                }`}
                        >
                            {typeIcons[type]}
                            {typeLabels[type]}
                        </button>
                    ))}
                </div>

                {/* Popular Searches (when no query) */}
                {!query && popularSearches.length > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-gray-400 mb-4">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-medium">Popular Searches</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {popularSearches.map((term, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePopularSearch(term)}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-sm hover:bg-white/10 transition-colors"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Results */}
                {query && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-400 text-sm">
                                {loading ? 'Searching...' : `${total} results found`}
                            </p>
                        </div>

                        {results.length > 0 ? (
                            <div className="space-y-4">
                                {results
                                    .filter(result => {
                                        // Client-side advanced filters
                                        if (dateFrom && result.createdAt && new Date(result.createdAt) < new Date(dateFrom)) return false;
                                        if (dateTo && result.createdAt && new Date(result.createdAt) > new Date(dateTo + 'T23:59:59')) return false;
                                        if (authorFilter && result.author && !result.author.username.toLowerCase().includes(authorFilter.toLowerCase())) return false;
                                        return true;
                                    })
                                    .map((result) => (
                                    <Link
                                        key={`${result.type}-${result._id}`}
                                        href={getResultLink(result)}
                                        className="block p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.05] hover:border-white/20 transition-all"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-2 rounded-lg ${typeColors[result.type]}`}>
                                                {typeIcons[result.type]}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-xs px-2 py-0.5 rounded ${typeColors[result.type]}`}>
                                                        {typeLabels[result.type]}
                                                    </span>
                                                    {result.category && (
                                                        <span className="text-xs text-gray-500">{result.category}</span>
                                                    )}
                                                </div>
                                                <h3 className="text-white font-medium mb-1 truncate">
                                                    {highlightText(getResultTitle(result), query)}
                                                </h3>
                                                {getResultDescription(result) && (
                                                    <p className="text-gray-400 text-sm line-clamp-2">
                                                        {highlightText(getResultDescription(result), query)}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                    {result.author && (
                                                        <span>by {result.author.username}</span>
                                                    )}
                                                    {result.createdAt && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {new Date(result.createdAt).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : !loading && (
                            <div className="text-center py-12">
                                <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">No results found for &quot;{query}&quot;</p>
                                <p className="text-gray-500 text-sm mt-2">Try different keywords or filters</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {pages > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        const newPage = Math.max(1, page - 1);
                                        setPage(newPage);
                                        fetchResults(query, searchType, newPage);
                                    }}
                                    disabled={page === 1}
                                >
                                    Previous
                                </Button>
                                <span className="flex items-center px-4 text-gray-400">
                                    Page {page} of {pages}
                                </span>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        const newPage = Math.min(pages, page + 1);
                                        setPage(newPage);
                                        fetchResults(query, searchType, newPage);
                                    }}
                                    disabled={page === pages}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
