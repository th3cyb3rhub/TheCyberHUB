'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';
import Image from 'next/image';
import {
    Calendar,
    MapPin,
    Clock,
    X,
    Users,
    Flag,
    Video,
    Wrench,
    Building,
    Code,
    Search,
    CalendarDays,
    Sparkles,
    ArrowRight,
    Globe,
    Timer
} from 'lucide-react';
import { sampleEvents, eventCategories, Event } from '@/data/events';
import Footer from '@/components/Footer';
import { fetchApi } from '@/lib/api';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/context/ToastContext';
import { Skeleton } from '@/components/ui/skeleton';

const categoryIcons: Record<string, React.ReactNode> = {
    ctf: <Flag className="w-4 h-4" />,
    webinar: <Video className="w-4 h-4" />,
    workshop: <Wrench className="w-4 h-4" />,
    meetup: <Users className="w-4 h-4" />,
    conference: <Building className="w-4 h-4" />,
    hackathon: <Code className="w-4 h-4" />,
};

const categoryColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    ctf: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', gradient: 'from-red-500/20 to-red-900/20' },
    webinar: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', gradient: 'from-blue-500/20 to-blue-900/20' },
    workshop: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', gradient: 'from-emerald-500/20 to-emerald-900/20' },
    meetup: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', gradient: 'from-purple-500/20 to-purple-900/20' },
    conference: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', gradient: 'from-orange-500/20 to-orange-900/20' },
    hackathon: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', gradient: 'from-yellow-500/20 to-yellow-900/20' },
};

function formatDate(dateString: string): { day: string; month: string; year: string; full: string } {
    const date = new Date(dateString);
    return {
        day: date.getDate().toString(),
        month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
        year: date.getFullYear().toString(),
        full: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    };
}

function formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}

function formatTimeWithTimezone(dateString: string, timezone: string): string {
    const date = new Date(dateString);
    try {
        const eventTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: timezone,
        });
        const tzAbbr = new Intl.DateTimeFormat('en-US', { timeZone: timezone, timeZoneName: 'short' })
            .formatToParts(date)
            .find(p => p.type === 'timeZoneName')?.value || timezone;
        return `${eventTime} ${tzAbbr}`;
    } catch {
        return formatTime(dateString);
    }
}

function getTimeUntil(dateString: string): { value: string; label: string; isLive: boolean } {
    const now = new Date();
    const eventDate = new Date(dateString);
    const diff = eventDate.getTime() - now.getTime();

    if (diff < 0) return { value: 'Live', label: 'Now', isLive: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 30) return { value: `${Math.floor(days / 30)}`, label: 'months', isLive: false };
    if (days > 0) return { value: `${days}`, label: days === 1 ? 'day' : 'days', isLive: false };
    if (hours > 0) return { value: `${hours}`, label: hours === 1 ? 'hour' : 'hours', isLive: false };
    return { value: 'Starting', label: 'soon', isLive: false };
}

// Featured Event Card (Large)
function FeaturedEventCard({ event }: { event: Event }) {
    const colors = categoryColors[event.category];
    const date = formatDate(event.startDate);
    const countdown = getTimeUntil(event.startDate);

    return (
        <Link href={`/events/${event.slug}`} className="block group">
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.gradient} border ${colors.border}`}>
                <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="relative lg:w-2/5 h-56 lg:h-auto overflow-hidden">
                        <Image
                            src={event.image}
                            alt={event.title}
                            width={600}
                            height={224}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-950/90 hidden lg:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 to-transparent lg:hidden" />

                        {/* Date Badge */}
                        <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-3 text-center min-w-[70px]">
                            <div className="text-2xl font-bold text-white">{date.day}</div>
                            <div className="text-xs font-medium text-orange-400">{date.month}</div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 lg:p-8">
                        {/* Category & Countdown */}
                        <div className="flex items-center justify-between mb-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
                                {categoryIcons[event.category]}
                                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                            </span>

                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${countdown.isLive ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-400'}`}>
                                <Timer className="w-3.5 h-3.5" />
                                <span className="text-sm font-medium">{countdown.value} {countdown.label}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                            {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 mb-6 line-clamp-2 lg:line-clamp-3">
                            {event.shortDescription}
                        </p>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-500" />
                                {formatTimeWithTimezone(event.startDate, event.timezone)}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-orange-500" />
                                {event.locationType === 'online' ? 'Online' : event.location}
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-orange-500" />
                                {event.organizer}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-orange-400 font-medium group-hover:gap-3 transition-all">
                            View Details
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Regular Event Card
function EventCard({ event }: { event: Event }) {
    const colors = categoryColors[event.category];
    const date = formatDate(event.startDate);
    const countdown = getTimeUntil(event.startDate);

    return (
        <Link href={`/events/${event.slug}`} className="block group">
            <div className="relative bg-gray-900/50 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 h-full">
                {/* Image Container */}
                <div className="relative h-44 overflow-hidden">
                    <Image
                        src={event.image}
                        alt={event.title}
                        width={400}
                        height={176}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />

                    {/* Date Badge */}
                    <div className="absolute top-3 left-3 bg-gray-900/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-center">
                        <div className="text-lg font-bold text-white leading-none">{date.day}</div>
                        <div className="text-[10px] font-medium text-orange-400">{date.month}</div>
                    </div>

                    {/* Category Badge */}
                    <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${colors.bg} ${colors.text}`}>
                        {categoryIcons[event.category]}
                    </div>

                    {/* Countdown */}
                    <div className="absolute bottom-3 right-3">
                        <div className={`px-2.5 py-1 rounded-md text-xs font-medium ${countdown.isLive ? 'bg-green-500/90 text-white animate-pulse' : 'bg-black/70 backdrop-blur-sm text-white'}`}>
                            {countdown.isLive ? '🔴 LIVE' : `${countdown.value} ${countdown.label}`}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                        {event.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {event.shortDescription}
                    </p>

                    {/* Meta Row */}
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {formatTimeWithTimezone(event.startDate, event.timezone)}
                        </div>
                        <div className="flex items-center gap-1 truncate">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{event.locationType === 'online' ? 'Online' : event.venue || event.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function EventsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [events, setEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [showPastEvents, setShowPastEvents] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_error, _setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const { addToast } = useToast();

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

    const hasActiveFilters = selectedCategory !== 'all' || searchQuery !== '';

    const clearAllFilters = useCallback(() => {
        setSelectedCategory('all');
        setSearchQuery('');
        router.replace(pathname, { scroll: false });
    }, [router, pathname]);

    const transformEvent = (event: Record<string, string | boolean | string[] | undefined> & { _id: string; title: string; startDate: string }): Event => ({
        id: event._id,
        title: event.title,
        slug: event.slug as string,
        description: (event.description || '') as string,
        shortDescription: (event.shortDescription || '') as string,
        image: (event.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800') as string,
        bannerImage: event.bannerImage as string | undefined,
        startDate: event.startDate,
        endDate: event.endDate as string | undefined,
        timezone: (event.timezone || 'Asia/Kolkata') as string,
        locationType: (event.locationType || 'online') as Event['locationType'],
        location: (event.location || 'Online') as string,
        venue: event.venue as string | undefined,
        eventLink: event.eventLink as string | undefined,
        registrationLink: event.registrationLink as string | undefined,
        category: event.category as Event['category'],
        tags: (event.tags || []) as string[],
        organizer: (event.organizer || 'TheCyberHub') as string,
        organizerLogo: event.organizerLogo as string | undefined,
        speakers: (event.speakers || []) as unknown as Event['speakers'],
        status: (event.status || 'upcoming') as Event['status'],
        isFeatured: (event.isFeatured || false) as boolean,
        recordingLink: event.recordingLink as string | undefined,
        slidesLink: event.slidesLink as string | undefined,
        summaryNotes: event.summaryNotes as string | undefined,
    });

    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const data = await fetchApi('/api/events', { requireAuth: false });
                const apiEvents = data.data?.map(transformEvent) || [];

                if (apiEvents.length > 0) {
                    setEvents(apiEvents);
                } else {
                    setEvents(sampleEvents);
                    addToast({ message: 'Showing sample events — no live events available', variant: 'info' });
                }

                // Fetch past events
                try {
                    const pastData = await fetchApi('/api/events/archives', { requireAuth: false });
                    setPastEvents(pastData.data?.map(transformEvent) || []);
                } catch {
                    // Past events are optional
                }
            } catch (err) {
                console.error('Failed to fetch events:', err);
                addToast({ message: 'Failed to load events — showing sample data', variant: 'error' });
                setEvents(sampleEvents);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
            const matchesSearch = event.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                event.shortDescription.toLowerCase().includes(debouncedSearch.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [events, selectedCategory, debouncedSearch]);

    const featuredEvents = filteredEvents.filter(e => e.isFeatured);
    const regularEvents = filteredEvents.filter(e => !e.isFeatured);

    if (loading) {
        return (
            <div className="min-h-screen bg-black pt-32 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-4 mb-8 text-center">
                        <Skeleton className="h-10 w-64 mx-auto" />
                        <Skeleton className="h-5 w-96 mx-auto max-w-full" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                                <Skeleton className="h-44 w-full" />
                                <div className="p-4 space-y-3">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <div className="flex gap-3">
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6 border-b border-white/5 overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <CalendarDays className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Upcoming Events</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Learn, Compete & <span className="gradient-text">Connect</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
                        Join CTF competitions, workshops, webinars, and meetups.
                        Connect with the cybersecurity community and level up your skills.
                    </p>

                    <Link
                        href="/events/calendar"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                    >
                        <Calendar className="w-4 h-4" />
                        View Calendar
                    </Link>
                </div>
            </section>

            {/* Filters Bar */}
            <div className="sticky top-16 z-20 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); updateFilters('search', e.target.value); }}
                                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                            />
                        </div>

                        {/* Category Pills */}
                        <div className="flex items-center gap-2 overflow-x-auto snap-x snap-mandatory pb-1 md:pb-0 scrollbar-hide">
                            <button
                                onClick={() => { setSelectedCategory('all'); updateFilters('category', 'all'); }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shrink-0 snap-start transition-all ${selectedCategory === 'all'
                                    ? 'bg-white text-gray-900'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                All Events
                            </button>
                            {eventCategories.map((cat) => {
                                const colors = categoryColors[cat.id];
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => { setSelectedCategory(cat.id); updateFilters('category', cat.id); }}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shrink-0 snap-start transition-all ${selectedCategory === cat.id
                                            ? `${colors.bg} ${colors.text} border ${colors.border}`
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-transparent'
                                            }`}
                                    >
                                        {categoryIcons[cat.id]}
                                        {cat.name}
                                    </button>
                                );
                            })}
                            {hasActiveFilters && (
                                <button
                                    onClick={clearAllFilters}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all shrink-0 snap-start"
                                >
                                    <X className="w-3.5 h-3.5" /> Clear Filters
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Featured Events */}
                {featuredEvents.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                            <h2 className="text-xl font-semibold text-white">Featured Events</h2>
                        </div>
                        <div className="space-y-6">
                            {featuredEvents.map((event) => (
                                <FeaturedEventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </section>
                )}

                {/* All Events Grid */}
                {regularEvents.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-6">
                            {featuredEvents.length > 0 ? 'More Events' : 'All Events'}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {regularEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {filteredEvents.length === 0 && (
                    <EmptyState
                        icon={Calendar}
                        title="No events found"
                        description="Try adjusting your filters or check back later for new events."
                    />
                )}

                {/* Past Events Archive */}
                {pastEvents.length > 0 && (
                    <section className="mt-16 pt-10 border-t border-white/5">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                <Clock className="w-5 h-5 text-gray-500" />
                                Past Events
                            </h2>
                            <button
                                onClick={() => setShowPastEvents(!showPastEvents)}
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                {showPastEvents ? 'Hide' : `Show All (${pastEvents.length})`}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {(showPastEvents ? pastEvents : pastEvents.slice(0, 4)).map((event) => (
                                <div key={event.id} className="relative">
                                    <EventCard event={event} />
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="px-2 py-1 text-[10px] font-medium bg-gray-700/90 text-gray-300 rounded-md">
                                            Ended
                                        </span>
                                    </div>
                                    {(event.recordingLink || event.slidesLink) && (
                                        <div className="absolute bottom-3 right-3 flex gap-1.5">
                                            {event.recordingLink && (
                                                <span className="px-2 py-1 text-[10px] font-medium bg-blue-500/20 text-blue-400 rounded-md">
                                                    Recording
                                                </span>
                                            )}
                                            {event.slidesLink && (
                                                <span className="px-2 py-1 text-[10px] font-medium bg-purple-500/20 text-purple-400 rounded-md">
                                                    Slides
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <Footer />
        </div>
    );
}
