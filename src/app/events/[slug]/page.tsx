'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    Flag,
    Video,
    Wrench,
    Building,
    Code,
    ExternalLink,
    ArrowLeft,
    CalendarPlus,
    Share2,
    Linkedin,
    ChevronDown,
    Timer,
    Ticket,
    Check,
    Loader2
} from 'lucide-react';
import { sampleEvents, Event } from '@/data/events';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { API_URL } from '@/lib/api';

// Registration Button Component
function RegistrationButton({ eventId, registrationLink }: { eventId: string; registrationLink?: string }) {
    const { user, token } = useAuth();
    const router = useRouter();
    const { addToast } = useToast();
    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const [registeredCount, setRegisteredCount] = useState(0);

    useEffect(() => {
        const checkRegistration = async () => {
            if (!user || !token) {
                setCheckingStatus(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/events/${eventId}/registration`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setIsRegistered(data.data?.isRegistered || false);
                    setRegisteredCount(data.data?.registeredCount || 0);
                }
            } catch (err) {
                console.error('Failed to check registration:', err);
            } finally {
                setCheckingStatus(false);
            }
        };

        checkRegistration();
    }, [eventId, user, token]);

    const handleRegister = async () => {
        if (!user || !token) {
            const redirectUrl = `${window.location.pathname}${window.location.search}`;
            addToast({
                variant: 'info',
                title: 'Sign in required',
                message: 'Create an account or sign in to register for this event.',
            });
            router.push(`/auth?redirect=${encodeURIComponent(redirectUrl)}`);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/events/${eventId}/register`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
                setIsRegistered(true);
                setRegisteredCount(prev => prev + 1);
            }
        } catch (err) {
            console.error('Failed to register:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUnregister = async () => {
        if (!token) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/events/${eventId}/register`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
                setIsRegistered(false);
                setRegisteredCount(prev => Math.max(0, prev - 1));
            }
        } catch (err) {
            console.error('Failed to unregister:', err);
        } finally {
            setLoading(false);
        }
    };

    if (checkingStatus) {
        return (
            <div className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading...</span>
            </div>
        );
    }

    if (isRegistered) {
        return (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-400 rounded-xl border border-green-500/30">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Registered</span>
                </div>
                <button
                    onClick={handleUnregister}
                    disabled={loading}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                    {loading ? 'Cancelling...' : 'Cancel Registration'}
                </button>
                {registeredCount > 0 && (
                    <span className="text-sm text-gray-500">
                        {registeredCount} registered
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
                onClick={handleRegister}
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/25 disabled:opacity-50"
            >
                {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <Ticket className="w-5 h-5" />
                )}
                {user ? 'Register Now' : 'Sign in to Register'}
            </button>
            {registrationLink && (
                <a
                    href={registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    External Registration
                    <ExternalLink className="w-4 h-4" />
                </a>
            )}
            {registeredCount > 0 && (
                <span className="text-sm text-gray-500">
                    {registeredCount} registered
                </span>
            )}
        </div>
    );
}

const categoryIcons: Record<string, React.ReactNode> = {
    ctf: <Flag className="w-5 h-5" />,
    webinar: <Video className="w-5 h-5" />,
    workshop: <Wrench className="w-5 h-5" />,
    meetup: <Users className="w-5 h-5" />,
    conference: <Building className="w-5 h-5" />,
    hackathon: <Code className="w-5 h-5" />,
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    ctf: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    webinar: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    workshop: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    meetup: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
    conference: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
    hackathon: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
};

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

function formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}

function getCountdown(dateString: string): { days: number; hours: number; minutes: number } {
    const now = new Date();
    const eventDate = new Date(dateString);
    const diff = Math.max(0, eventDate.getTime() - now.getTime());

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    };
}

function generateICS(event: Event): string {
    const formatICSDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };

    const start = new Date(event.startDate);
    const end = event.endDate ? new Date(event.endDate) : new Date(start.getTime() + 2 * 60 * 60 * 1000);

    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${event.title}
DESCRIPTION:${event.shortDescription}
LOCATION:${event.location}
URL:${event.eventLink || ''}
END:VEVENT
END:VCALENDAR`;
}

function AddToCalendarDropdown({ event }: { event: Event }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleGoogleCalendar = () => {
        const start = new Date(event.startDate);
        const end = event.endDate ? new Date(event.endDate) : new Date(start.getTime() + 2 * 60 * 60 * 1000);
        const formatGoogleDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatGoogleDate(start)}/${formatGoogleDate(end)}&details=${encodeURIComponent(event.shortDescription)}&location=${encodeURIComponent(event.location)}`;
        window.open(url, '_blank');
        setIsOpen(false);
    };

    const handleICS = () => {
        const ics = generateICS(event);
        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${event.slug}.ics`;
        link.click();
        URL.revokeObjectURL(url);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all"
            >
                <CalendarPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Add to Calendar</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20">
                        <button
                            onClick={handleGoogleCalendar}
                            className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                        >
                            <span className="text-lg">📅</span>
                            Google Calendar
                        </button>
                        <button
                            onClick={handleICS}
                            className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/5 transition-colors border-t border-white/5 flex items-center gap-2"
                        >
                            <span className="text-lg">📱</span>
                            Apple / Outlook
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ShareButton({ event: _event }: { event: Event }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all"
        >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
        </button>
    );
}

function CountdownTimer({ dateString }: { dateString: string }) {
    const countdown = getCountdown(dateString);

    if (countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0) {
        return (
            <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-medium">Event is Live!</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <Timer className="w-5 h-5 text-orange-400" />
            <div className="flex gap-3">
                <div className="text-center">
                    <div className="text-2xl font-bold text-white">{countdown.days}</div>
                    <div className="text-xs text-gray-500 uppercase">Days</div>
                </div>
                <div className="text-2xl font-light text-gray-600">:</div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-white">{countdown.hours}</div>
                    <div className="text-xs text-gray-500 uppercase">Hours</div>
                </div>
                <div className="text-2xl font-light text-gray-600">:</div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-white">{countdown.minutes}</div>
                    <div className="text-xs text-gray-500 uppercase">Mins</div>
                </div>
            </div>
        </div>
    );
}

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`${API_URL}/api/events/${slug}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.data) {
                        const e = data.data;
                        setEvent({
                            id: e._id,
                            title: e.title,
                            slug: e.slug,
                            description: e.description || '',
                            shortDescription: e.shortDescription || '',
                            image: e.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
                            bannerImage: e.bannerImage,
                            startDate: e.startDate,
                            endDate: e.endDate,
                            timezone: e.timezone || 'Asia/Kolkata',
                            locationType: e.locationType || 'online',
                            location: e.location || 'Online',
                            venue: e.venue,
                            eventLink: e.eventLink,
                            registrationLink: e.registrationLink,
                            category: e.category,
                            tags: e.tags || [],
                            organizer: e.organizer || 'TheCyberHub',
                            organizerLogo: e.organizerLogo,
                            speakers: e.speakers || [],
                            status: e.status || 'upcoming',
                            isFeatured: e.isFeatured || false,
                        });
                    } else {
                        // Fallback to sample data
                        const sampleEvent = sampleEvents.find(e => e.slug === slug);
                        setEvent(sampleEvent || null);
                    }
                } else {
                    // Fallback to sample data
                    const sampleEvent = sampleEvents.find(e => e.slug === slug);
                    setEvent(sampleEvent || null);
                }
            } catch (err) {
                console.error('Failed to fetch event:', err);
                // Fallback to sample data
                const sampleEvent = sampleEvents.find(e => e.slug === slug);
                setEvent(sampleEvent || null);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!event) {
        notFound();
    }

    const colors = categoryColors[event.category];

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <div className="relative">
                {/* Background Image */}
                <div className="absolute inset-0 h-[400px]">
                    <img
                        src={event.bannerImage || event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
                </div>

                {/* Nav */}
                <div className="relative max-w-6xl mx-auto px-4 pt-6">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Events
                    </Link>
                </div>

                {/* Header Content */}
                <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
                            {categoryIcons[event.category]}
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </span>
                        <span className="px-3 py-1.5 bg-white/10 text-white rounded-lg text-sm capitalize">
                            {event.locationType}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        {event.title}
                    </h1>

                    <p className="text-lg text-gray-300 max-w-3xl mb-6">
                        {event.shortDescription}
                    </p>

                    {/* Countdown */}
                    <div className="mb-6">
                        <CountdownTimer dateString={event.startDate} />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                        <RegistrationButton eventId={event.id} registrationLink={event.registrationLink} />
                        <AddToCalendarDropdown event={event} />
                        <ShareButton event={event} />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About */}
                        <section className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
                            <h2 className="text-xl font-semibold text-white mb-6">About This Event</h2>
                            <div className="prose prose-invert prose-gray max-w-none">
                                {event.description.split('\n').map((line, i) => {
                                    if (line.startsWith('## ')) {
                                        return <h3 key={i} className="text-lg font-semibold mt-8 mb-4 text-orange-400 first:mt-0">{line.replace('## ', '')}</h3>;
                                    }
                                    if (line.startsWith('- ')) {
                                        return (
                                            <div key={i} className="flex gap-3 my-2">
                                                <span className="text-orange-500 mt-0.5">•</span>
                                                <span className="text-gray-300">{line.replace('- ', '')}</span>
                                            </div>
                                        );
                                    }
                                    if (line.startsWith('**') && line.endsWith('**')) {
                                        return <p key={i} className="text-white font-medium my-3">{line.replace(/\*\*/g, '')}</p>;
                                    }
                                    if (line.trim() === '') return <div key={i} className="h-2" />;
                                    return <p key={i} className="text-gray-400 my-2 leading-relaxed">{line}</p>;
                                })}
                            </div>
                        </section>

                        {/* Speakers */}
                        {event.speakers && event.speakers.length > 0 && (
                            <section className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
                                <h2 className="text-xl font-semibold text-white mb-6">Speakers</h2>
                                <div className="grid gap-4">
                                    {event.speakers.map((speaker, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                                                {speaker.name.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-white">{speaker.name}</p>
                                                <p className="text-sm text-gray-400">{speaker.title}</p>
                                            </div>
                                            {speaker.linkedin && (
                                                <a
                                                    href={speaker.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                                >
                                                    <Linkedin className="w-5 h-5 text-gray-400 hover:text-orange-400" />
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column - Info Cards */}
                    <div className="space-y-6">
                        {/* Date & Time */}
                        <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Date & Time</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-orange-500/10 rounded-lg">
                                        <Calendar className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{formatDate(event.startDate)}</p>
                                        {event.endDate && formatDate(event.endDate) !== formatDate(event.startDate) && (
                                            <p className="text-sm text-gray-500">to {formatDate(event.endDate)}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-orange-500/10 rounded-lg">
                                        <Clock className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{formatTime(event.startDate)}</p>
                                        {event.endDate && (
                                            <p className="text-sm text-gray-500">to {formatTime(event.endDate)}</p>
                                        )}
                                        <p className="text-sm text-gray-500">{event.timezone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Location</h3>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-orange-500/10 rounded-lg">
                                    <MapPin className="w-5 h-5 text-orange-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">{event.location}</p>
                                    {event.venue && <p className="text-sm text-gray-500">{event.venue}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Organizer */}
                        <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Organized By</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold">
                                    {event.organizer.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-white">{event.organizer}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {event.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1.5 bg-white/5 text-gray-300 text-sm rounded-lg"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
