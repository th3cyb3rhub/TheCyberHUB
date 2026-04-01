'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import {
    Calendar,
    MapPin,
    Clock,
    Flag,
    Video,
    Wrench,
    Users,
    Building,
    Code,
    Loader2,
    CalendarDays,
    ArrowRight,
    ExternalLink,
    Ticket
} from 'lucide-react';
import Footer from '@/components/Footer';
import { fetchApi } from '@/lib/api';

interface Event {
    _id: string;
    title: string;
    slug: string;
    shortDescription: string;
    image: string;
    startDate: string;
    endDate?: string;
    locationType: string;
    location: string;
    venue?: string;
    category: string;
    status: string;
    registrationLink?: string;
    eventLink?: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
    ctf: <Flag className="w-4 h-4" />,
    webinar: <Video className="w-4 h-4" />,
    workshop: <Wrench className="w-4 h-4" />,
    meetup: <Users className="w-4 h-4" />,
    conference: <Building className="w-4 h-4" />,
    hackathon: <Code className="w-4 h-4" />,
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    ctf: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    webinar: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    workshop: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    meetup: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
    conference: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
    hackathon: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
};

const statusColors: Record<string, string> = {
    upcoming: 'bg-blue-500/20 text-blue-400',
    live: 'bg-green-500/20 text-green-400 animate-pulse',
    ended: 'bg-gray-500/20 text-gray-400',
    cancelled: 'bg-red-500/20 text-red-400',
};

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
}

function formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}

function EventCard({ event, onUnregister }: { event: Event; onUnregister: (id: string) => void }) {
    const colors = categoryColors[event.category] || categoryColors.workshop;
    const [unregistering, setUnregistering] = useState(false);

    const handleUnregister = async () => {
        setUnregistering(true);
        await onUnregister(event._id);
        setUnregistering(false);
    };

    return (
        <div className="group relative bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all">
            <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative sm:w-48 h-40 sm:h-auto overflow-hidden shrink-0">
                    <Image
                        src={event.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800'}
                        alt={event.title}
                        width={192}
                        height={160}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/80 hidden sm:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent sm:hidden" />
                    
                    {/* Status Badge */}
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[event.status]}`}>
                        {event.status === 'live' ? '🔴 LIVE' : event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border} mb-2`}>
                                {categoryIcons[event.category]}
                                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                            </span>
                            <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                                <Link href={`/events/${event.slug}`}>{event.title}</Link>
                            </h3>
                        </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{event.shortDescription}</p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            {formatDate(event.startDate)}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-orange-500" />
                            {formatTime(event.startDate)}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-orange-500" />
                            {event.locationType === 'online' ? 'Online' : event.venue || event.location}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/events/${event.slug}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm rounded-xl transition-colors"
                        >
                            View Details
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        {event.eventLink && event.status !== 'ended' && (
                            <a
                                href={event.eventLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-xl transition-colors"
                            >
                                Join Event
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                        <button
                            onClick={handleUnregister}
                            disabled={unregistering}
                            className="ml-auto text-sm text-gray-500 hover:text-red-400 transition-colors"
                        >
                            {unregistering ? 'Cancelling...' : 'Cancel Registration'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MyEventsPage() {
    const router = useRouter();
    const { user, loading: authLoading, token } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            const redirectUrl = `${window.location.pathname}${window.location.search}`;
            router.push(`/auth?redirect=${encodeURIComponent(redirectUrl)}`);
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        const fetchMyEvents = async () => {
            if (!token) return;

            try {
                const data = await fetchApi('/api/events/my-registrations');
                setEvents(data.data || []);
            } catch (err) {
                console.error('Failed to fetch events:', err);
            } finally {
                setLoading(false);
            }
        };

        if (user && token) {
            fetchMyEvents();
        }
    }, [user, token]);

    const handleUnregister = async (eventId: string) => {
        if (!token) return;

        try {
            await fetchApi(`/api/events/${eventId}/register`, {
                method: 'DELETE',
            });
            setEvents(events.filter(e => e._id !== eventId));
        } catch (err) {
            console.error('Failed to unregister:', err);
        }
    };

    const upcomingEvents = events.filter(e => e.status === 'upcoming' || e.status === 'live');
    const pastEvents = events.filter(e => e.status === 'ended');

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <section className="relative pt-32 pb-12 px-4 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5">
                        <Ticket className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">My Registrations</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        My <span className="gradient-text">Events</span>
                    </h1>
                    <p className="text-gray-400 max-w-xl">
                        View and manage your event registrations. Don&apos;t miss out on upcoming workshops, CTFs, and meetups!
                    </p>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 py-10">
                {events.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <CalendarDays className="w-10 h-10 text-gray-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-3">No registered events</h2>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            You haven&apos;t registered for any events yet. Browse our upcoming events and join the community!
                        </p>
                        <Link
                            href="/events"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
                        >
                            Browse Events
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Upcoming Events */}
                        {upcomingEvents.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Upcoming Events ({upcomingEvents.length})
                                </h2>
                                <div className="space-y-4">
                                    {upcomingEvents.map((event) => (
                                        <EventCard key={event._id} event={event} onUnregister={handleUnregister} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Past Events */}
                        {pastEvents.length > 0 && (
                            <section>
                                <h2 className="text-xl font-semibold text-gray-400 mb-6">
                                    Past Events ({pastEvents.length})
                                </h2>
                                <div className="space-y-4 opacity-60">
                                    {pastEvents.map((event) => (
                                        <EventCard key={event._id} event={event} onUnregister={handleUnregister} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
}
