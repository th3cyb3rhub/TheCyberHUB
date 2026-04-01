'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    Plus,
    Pencil,
    Trash2,
    Calendar,
    MapPin,
    Users,
    Flag,
    Video,
    Wrench,
    Building,
    Code,
    Loader2,
    Search,
    ArrowLeft,
    Eye,
    Star,
    StarOff
} from 'lucide-react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';

interface Event {
    _id: string;
    title: string;
    slug: string;
    shortDescription: string;
    startDate: string;
    category: string;
    status: string;
    isFeatured: boolean;
    locationType: string;
    location: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
    ctf: <Flag className="w-4 h-4" />,
    webinar: <Video className="w-4 h-4" />,
    workshop: <Wrench className="w-4 h-4" />,
    meetup: <Users className="w-4 h-4" />,
    conference: <Building className="w-4 h-4" />,
    hackathon: <Code className="w-4 h-4" />,
};

const statusColors: Record<string, string> = {
    upcoming: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    live: 'bg-green-500/20 text-green-400 border-green-500/30',
    ended: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function AdminEventsPage() {
    const router = useRouter();
    const { user, loading: authLoading, token } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Check if user is admin
    useEffect(() => {
        if (!authLoading && (!user || user.role !== 'admin')) {
            const redirectUrl = `${window.location.pathname}${window.location.search}`;
            router.push(`/auth?redirect=${encodeURIComponent(redirectUrl)}`);
        }
    }, [user, authLoading, router]);

    // Fetch events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await fetchApi('/api/events?limit=100', { requireAuth: false });
                setEvents(data.data || []);
            } catch (err) {
                console.error('Failed to fetch events:', err);
            } finally {
                setLoading(false);
            }
        };

        if (user?.role === 'admin') {
            fetchEvents();
        }
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!token) return;

        try {
            await fetchApi(`/api/events/${id}`, {
                method: 'DELETE',
            });
            setEvents(events.filter(e => e._id !== id));
        } catch (err) {
            console.error('Failed to delete event:', err);
        } finally {
            setDeleteId(null);
        }
    };

    const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
        if (!token) return;

        try {
            await fetchApi(`/api/events/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ isFeatured: !currentFeatured }),
            });
            setEvents(events.map(e =>
                e._id === id ? { ...e, isFeatured: !currentFeatured } : e
            ));
        } catch (err) {
            console.error('Failed to toggle featured:', err);
        }
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        event.category.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return null;
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <Link
                            href="/admin"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-2 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Admin
                        </Link>
                        <h1 className="text-2xl font-bold text-white">Manage Events</h1>
                        <p className="text-gray-400 text-sm mt-1">{events.length} total events</p>
                    </div>
                    <Link
                        href="/admin/events/new"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Event
                    </Link>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search events..."
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                    />
                </div>

                {/* Events Table */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Event</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Category</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Date</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Status</th>
                                    <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEvents.map((event) => (
                                    <tr key={event._id} className="border-b border-white/5 hover:bg-white/[0.02]">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-orange-500">
                                                    {categoryIcons[event.category] || <Calendar className="w-4 h-4" />}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{event.title}</p>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {event.locationType === 'online' ? 'Online' : event.location}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="capitalize text-gray-300">{event.category}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-300">{formatDate(event.startDate)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-lg border ${statusColors[event.status] || statusColors.upcoming}`}>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleToggleFeatured(event._id, event.isFeatured)}
                                                    className={`p-2 rounded-lg transition-colors ${event.isFeatured ? 'text-yellow-400 hover:bg-yellow-500/10' : 'text-gray-500 hover:bg-white/5'}`}
                                                    title={event.isFeatured ? 'Remove from featured' : 'Add to featured'}
                                                >
                                                    {event.isFeatured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                                                </button>
                                                <Link
                                                    href={`/events/${event.slug}`}
                                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/events/${event._id}/edit`}
                                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteId(event._id)}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredEvents.length === 0 && (
                        <div className="text-center py-12">
                            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No events found</p>
                        </div>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {deleteId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-md w-full" role="dialog" aria-modal="true" aria-label="Delete event confirmation">
                            <h3 className="text-lg font-semibold text-white mb-2">Delete Event</h3>
                            <p className="text-gray-400 mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteId)}
                                    className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
