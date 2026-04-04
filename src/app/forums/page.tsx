'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
    MessageSquare,
    Search,
    Eye,
    Clock,
    Pin,
    Lock,
    CheckCircle,
    Plus,
    HelpCircle,
    Tag,
    Flame,
    Clock3,
    Trophy,
} from 'lucide-react';
import { Discussion, Category, CategoryStats, PopularTag, SortOption, CATEGORY_INFO } from '@/types/forum';
import { getDiscussions, getCategoryStats, getPopularTags } from '@/lib/api/forum';
import Footer from '@/components/Footer';
import { SkeletonForumList } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/context/ToastContext';

function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function DiscussionCard({ discussion }: { discussion: Discussion }) {
    const categoryInfo = CATEGORY_INFO[discussion.category];

    return (
        <Link href={`/forums/${discussion._id}`} className="block group">
            <div className={`relative rounded-xl border bg-black/40 backdrop-blur-md p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${discussion.isPinned
                ? 'border-orange-500/40 bg-orange-500/10 shadow-orange-500/10'
                : 'border-white/10 hover:border-orange-500/40 hover:bg-white/[0.04] hover:shadow-orange-500/20'
                }`}>
                {/* Pinned/Locked indicators */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    {discussion.isPinned && (
                        <span className="text-orange-500" title="Pinned">
                            <Pin className="w-4 h-4" />
                        </span>
                    )}
                    {discussion.isLocked && (
                        <span className="text-gray-500" title="Locked">
                            <Lock className="w-4 h-4" />
                        </span>
                    )}
                    {discussion.hasAcceptedAnswer && (
                        <span className="text-green-500" title="Solved">
                            <CheckCircle className="w-4 h-4" />
                        </span>
                    )}
                </div>

                <div className="flex gap-4">
                    {/* Vote count */}
                    <div className="flex flex-col items-center text-center min-w-[50px]">
                        <div className={`text-lg font-semibold ${discussion.netVotes > 0 ? 'text-green-400' :
                            discussion.netVotes < 0 ? 'text-red-400' : 'text-gray-500'
                            }`}>
                            {discussion.netVotes}
                        </div>
                        <div className="text-xs text-gray-500">votes</div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Category badge */}
                        {categoryInfo && (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${categoryInfo.bgColor} ${categoryInfo.color} ${categoryInfo.borderColor} border mb-2`}>
                                {categoryInfo.label}
                            </span>
                        )}

                        {/* Title */}
                        <h3 className="text-white font-medium mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                            {discussion.title}
                        </h3>

                        {/* Tags */}
                        {discussion.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {discussion.tags.slice(0, 4).map((tag) => (
                                    <span key={tag} className="text-xs px-2 py-0.5 bg-white/5 text-gray-400 rounded">
                                        {tag}
                                    </span>
                                ))}
                                {discussion.tags.length > 4 && (
                                    <span className="text-xs text-gray-500">+{discussion.tags.length - 4}</span>
                                )}
                            </div>
                        )}

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                                <MessageSquare className="w-3.5 h-3.5" />
                                {discussion.replyCount} {discussion.replyCount === 1 ? 'reply' : 'replies'}
                            </span>
                            <span className="flex items-center gap-1">
                                <Eye className="w-3.5 h-3.5" />
                                {discussion.viewCount} views
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {formatTimeAgo(discussion.lastActivityAt)}
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-xs text-white font-medium">
                                    {discussion.author.username[0].toUpperCase()}
                                </div>
                                <span className="text-gray-400 hover:text-orange-400 transition-colors">{discussion.author.username}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function CategorySidebar({
    stats,
    selectedCategory,
    onSelectCategory
}: {
    stats: CategoryStats[];
    selectedCategory: Category | null;
    onSelectCategory: (category: Category | null) => void;
}) {
    const totalCount = stats.reduce((sum, s) => sum + s.count, 0);

    return (
        <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Categories</h3>
            <div className="space-y-1">
                <button
                    onClick={() => onSelectCategory(null)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === null
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <span>All Discussions</span>
                    <span className="text-xs">{totalCount}</span>
                </button>
                {stats.map((stat) => {
                    const info = CATEGORY_INFO[stat.category];
                    if (!info) return null;
                    return (
                        <button
                            key={stat.category}
                            onClick={() => onSelectCategory(stat.category)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === stat.category
                                ? `${info.bgColor} ${info.color}`
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span>{info.label}</span>
                            <span className="text-xs">{stat.count}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function PopularTagsSection({
    tags,
    selectedTag,
    onSelectTag,
}: {
    tags: PopularTag[];
    selectedTag: string | null;
    onSelectTag: (tag: string | null) => void;
}) {
    if (tags.length === 0) return null;

    return (
        <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm p-4 mt-4">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-orange-500" />
                Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
                {tags.slice(0, 15).map((t) => (
                    <button
                        key={t.tag}
                        onClick={() => onSelectTag(selectedTag === t.tag ? null : t.tag)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors ${selectedTag === t.tag
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {t.tag}
                        <span className="ml-1 text-gray-600">{t.count}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

const SORT_OPTIONS: { value: SortOption; label: string; icon: React.ElementType }[] = [
    { value: 'hot', label: 'Hot', icon: Flame },
    { value: 'new', label: 'New', icon: Clock3 },
    { value: 'top', label: 'Top', icon: Trophy },
    { value: 'unanswered', label: 'Unanswered', icon: HelpCircle },
];

export default function ForumsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [discussions, setDiscussions] = useState<Discussion[]>([]);
    const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
    const [popularTags, setPopularTags] = useState<PopularTag[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const { addToast } = useToast();

    // Get filters from URL
    const selectedCategory = (searchParams.get('category') as Category) || null;
    const selectedTag = searchParams.get('tag') || null;
    const sortBy = (searchParams.get('sort') as SortOption) || 'hot';
    const searchQuery = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');

    // Update URL params
    const updateParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        // Reset page when filters change
        if (!updates.page) {
            params.delete('page');
        }
        router.push(`/forums?${params.toString()}`);
    };

    // Fetch category stats and popular tags
    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const [statsRes, tagsRes] = await Promise.all([
                    getCategoryStats(),
                    getPopularTags(20),
                ]);
                setCategoryStats(statsRes.data || []);
                setPopularTags(tagsRes.data || []);
            } catch (err) {
                console.error('Failed to fetch meta:', err);
                addToast({ message: 'Failed to load forum data', variant: 'error' });
            }
        };
        fetchMeta();
    }, []);

    // Fetch discussions
    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                setLoading(true);
                const result = await getDiscussions({
                    page,
                    limit: 20,
                    category: selectedCategory || undefined,
                    tag: selectedTag || undefined,
                    sort: sortBy,
                    search: searchQuery || undefined,
                });
                setDiscussions(result.data || []);
                setTotalPages(result.pagination?.totalPages || 1);
            } catch (err) {
                console.error('Failed to fetch discussions:', err);
                addToast({ message: 'Failed to load discussions', variant: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchDiscussions();
    }, [page, selectedCategory, selectedTag, sortBy, searchQuery]);

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <section className="relative pt-32 pb-12 px-4 sm:px-6 border-b border-white/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5">
                        <MessageSquare className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Community Forums</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Ask, Share & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 animate-pulse-slow drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">Learn</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                        Get help with CTF challenges, discuss career paths, share your projects,
                        and connect with the cybersecurity community.
                    </p>

                    <Link
                        href="/forums/new"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        New Discussion
                    </Link>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Mobile Category Tabs */}
                <div className="lg:hidden mb-6 overflow-x-auto scrollbar-none">
                    <div className="flex items-center gap-2 pb-2 min-w-max">
                        <button
                            onClick={() => updateParams({ category: null })}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                selectedCategory === null
                                    ? 'bg-orange-500/20 text-orange-400'
                                    : 'bg-white/5 text-gray-400 hover:text-white'
                            }`}
                        >
                            All
                        </button>
                        {categoryStats.map((stat) => {
                            const info = CATEGORY_INFO[stat.category];
                            if (!info) return null;
                            return (
                                <button
                                    key={stat.category}
                                    onClick={() => updateParams({ category: stat.category })}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                        selectedCategory === stat.category
                                            ? `${info.bgColor} ${info.color}`
                                            : 'bg-white/5 text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {info.label} <span className="text-xs opacity-60">({stat.count})</span>
                                </button>
                            );
                        })}
                    </div>
                    {/* Mobile Popular Tags */}
                    {popularTags.length > 0 && (
                        <div className="flex items-center gap-2 mt-2 min-w-max">
                            <Tag className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                            {popularTags.slice(0, 8).map((t) => (
                                <button
                                    key={t.tag}
                                    onClick={() => updateParams({ tag: selectedTag === t.tag ? null : t.tag })}
                                    className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                                        selectedTag === t.tag
                                            ? 'bg-orange-500/20 text-orange-400'
                                            : 'bg-white/5 text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {t.tag}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - desktop only */}
                    <aside className="hidden lg:block lg:w-64 shrink-0">
                        <CategorySidebar
                            stats={categoryStats}
                            selectedCategory={selectedCategory}
                            onSelectCategory={(cat) => updateParams({ category: cat })}
                        />
                        <PopularTagsSection
                            tags={popularTags}
                            selectedTag={selectedTag}
                            onSelectTag={(tag) => updateParams({ tag })}
                        />
                    </aside>

                    {/* Main */}
                    <main className="flex-1 min-w-0">
                        {/* Filters Bar */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search discussions..."
                                    defaultValue={searchQuery}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            updateParams({ q: (e.target as HTMLInputElement).value || null });
                                        }
                                    }}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                                />
                            </div>

                            {/* Sort tabs */}
                            <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg">
                                {SORT_OPTIONS.map(({ value, label, icon: Icon }) => (
                                    <button
                                        key={value}
                                        onClick={() => updateParams({ sort: value })}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${sortBy === value
                                            ? 'bg-orange-500/20 text-orange-400'
                                            : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="hidden sm:inline">{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active filters */}
                        {(selectedCategory || selectedTag || searchQuery) && (
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="text-xs text-gray-500">Filters:</span>
                                {selectedCategory && (
                                    <button
                                        onClick={() => updateParams({ category: null })}
                                        className="flex items-center gap-1 px-2 py-1 bg-white/5 text-gray-300 text-xs rounded hover:bg-white/10"
                                    >
                                        {CATEGORY_INFO[selectedCategory]?.label}
                                        <span className="text-gray-500">×</span>
                                    </button>
                                )}
                                {selectedTag && (
                                    <button
                                        onClick={() => updateParams({ tag: null })}
                                        className="flex items-center gap-1 px-2 py-1 bg-white/5 text-gray-300 text-xs rounded hover:bg-white/10"
                                    >
                                        #{selectedTag}
                                        <span className="text-gray-500">×</span>
                                    </button>
                                )}
                                {searchQuery && (
                                    <button
                                        onClick={() => updateParams({ q: null })}
                                        className="flex items-center gap-1 px-2 py-1 bg-white/5 text-gray-300 text-xs rounded hover:bg-white/10"
                                    >
                                        &quot;{searchQuery}&quot;
                                        <span className="text-gray-500">×</span>
                                    </button>
                                )}
                                <button
                                    onClick={() => router.push('/forums')}
                                    className="text-xs text-orange-400 hover:text-orange-300"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}

                        {/* Discussion List */}
                        {loading ? (
                            <SkeletonForumList />
                        ) : discussions.length > 0 ? (
                            <div className="space-y-4">
                                {discussions.map((discussion) => (
                                    <DiscussionCard key={discussion._id} discussion={discussion} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                icon={MessageSquare}
                                title="No discussions found"
                                description={searchQuery || selectedCategory || selectedTag
                                    ? 'Try adjusting your filters or search query.'
                                    : 'Be the first to start a discussion!'}
                                actionLabel="Start a Discussion"
                                actionHref="/forums/new"
                            />
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                <button
                                    onClick={() => updateParams({ page: String(Math.max(1, page - 1)) })}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="text-sm text-gray-400">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => updateParams({ page: String(Math.min(totalPages, page + 1)) })}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
}
