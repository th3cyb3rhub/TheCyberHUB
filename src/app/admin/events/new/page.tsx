'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    ArrowLeft,
    Loader2,
    Save,
    Calendar,
    MapPin,
    Link as LinkIcon,
    Image as ImageIcon,
    AlertCircle,
    CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';

const categories = [
    { id: 'ctf', name: 'CTF' },
    { id: 'webinar', name: 'Webinar' },
    { id: 'workshop', name: 'Workshop' },
    { id: 'meetup', name: 'Meetup' },
    { id: 'conference', name: 'Conference' },
    { id: 'hackathon', name: 'Hackathon' },
];

const locationTypes = [
    { id: 'online', name: 'Online' },
    { id: 'in-person', name: 'In-Person' },
    { id: 'hybrid', name: 'Hybrid' },
];

interface EventFormData {
    title: string;
    shortDescription: string;
    description: string;
    image: string;
    bannerImage: string;
    startDate: string;
    endDate: string;
    timezone: string;
    locationType: string;
    location: string;
    venue: string;
    eventLink: string;
    registrationLink: string;
    category: string;
    tags: string;
    organizer: string;
    isFeatured: boolean;
    maxParticipants: string;
}

export default function NewEventPage() {
    const router = useRouter();
    const { user, loading: authLoading, token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState<EventFormData>({
        title: '',
        shortDescription: '',
        description: '',
        image: '',
        bannerImage: '',
        startDate: '',
        endDate: '',
        timezone: 'Asia/Kolkata',
        locationType: 'online',
        location: 'Online',
        venue: '',
        eventLink: '',
        registrationLink: '',
        category: 'workshop',
        tags: '',
        organizer: 'TheCyberHub',
        isFeatured: false,
        maxParticipants: '',
    });

    // Check if user is admin
    useEffect(() => {
        if (!authLoading && (!user || user.role !== 'admin')) {
            const redirectUrl = `${window.location.pathname}${window.location.search}`;
            router.push(`/auth?redirect=${encodeURIComponent(redirectUrl)}`);
        }
    }, [user, authLoading, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        setLoading(true);
        setError(null);

        try {
            const eventData = {
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
            };

            await fetchApi('/api/events', {
                method: 'POST',
                body: JSON.stringify(eventData),
            });
            setSuccess(true);
            setTimeout(() => {
                router.push('/admin/events');
            }, 1500);
        } catch {
            setError('Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
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
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin/events"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Events
                    </Link>
                    <h1 className="text-2xl font-bold text-white">Create New Event</h1>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 shrink-0" />
                            Event created successfully! Redirecting...
                        </div>
                    )}

                    {/* Basic Info */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                        <h2 className="text-lg font-semibold text-white mb-6">Basic Information</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Web Security Workshop"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Short Description *</label>
                                <input
                                    type="text"
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleChange}
                                    required
                                    maxLength={150}
                                    placeholder="Brief description (max 150 chars)"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Full Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={6}
                                    placeholder="Detailed description (supports markdown)"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Category *</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500/50 focus:outline-none transition-colors"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id} className="bg-gray-900">{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Organizer</label>
                                    <input
                                        type="text"
                                        name="organizer"
                                        value={formData.organizer}
                                        onChange={handleChange}
                                        placeholder="TheCyberHub"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    placeholder="e.g., beginner-friendly, web-security, hands-on"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-orange-500" />
                            Date & Time
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Start Date & Time *</label>
                                <input
                                    type="datetime-local"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">End Date & Time</label>
                                <input
                                    type="datetime-local"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Timezone</label>
                                <input
                                    type="text"
                                    name="timezone"
                                    value={formData.timezone}
                                    onChange={handleChange}
                                    placeholder="Asia/Kolkata"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Max Participants</label>
                                <input
                                    type="number"
                                    name="maxParticipants"
                                    value={formData.maxParticipants}
                                    onChange={handleChange}
                                    placeholder="Leave empty for unlimited"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-orange-500" />
                            Location
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Location Type *</label>
                                <div className="flex gap-3">
                                    {locationTypes.map(type => (
                                        <button
                                            key={type.id}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, locationType: type.id }))}
                                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${formData.locationType === type.id
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                                                }`}
                                        >
                                            {type.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g., Online or City Name"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Venue</label>
                                    <input
                                        type="text"
                                        name="venue"
                                        value={formData.venue}
                                        onChange={handleChange}
                                        placeholder="e.g., Discord Server, Conference Hall"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <LinkIcon className="w-5 h-5 text-orange-500" />
                            Links
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Event Link</label>
                                <input
                                    type="url"
                                    name="eventLink"
                                    value={formData.eventLink}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Registration Link</label>
                                <input
                                    type="url"
                                    name="registrationLink"
                                    value={formData.registrationLink}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-orange-500" />
                            Images
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Cover Image URL</label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Banner Image URL</label>
                                <input
                                    type="url"
                                    name="bannerImage"
                                    value={formData.bannerImage}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                        <h2 className="text-lg font-semibold text-white mb-6">Settings</h2>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-white/20 bg-white/5 text-orange-500 focus:ring-orange-500/50"
                            />
                            <span className="text-white">Feature this event</span>
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4">
                        <Link
                            href="/admin/events"
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-xl transition-colors"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Create Event
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
