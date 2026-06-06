"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { fetchApi } from '@/lib/api';
import {
    Calendar,
    MapPin,
    Globe,
    FileText,
    Tag,
    Loader2,
    CheckCircle,
    ArrowLeft,
    AlertCircle,
    Clock,
} from 'lucide-react';

const CATEGORIES = ['ctf', 'webinar', 'workshop', 'meetup', 'conference', 'hackathon'];
const LOCATION_TYPES = ['online', 'in-person', 'hybrid'];

export default function SubmitEventPage() {
    const { user, loading: authLoading } = useAuth();
    const { addToast } = useToast();
    const [saving, setSaving] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        title: '',
        description: '',
        shortDescription: '',
        category: 'webinar',
        startDate: '',
        endDate: '',
        locationType: 'online',
        location: 'Online',
        eventLink: '',
        registrationLink: '',
        organizer: '',
        tags: '',
    });

    const set = (field: string, value: string) =>
        setForm(prev => ({ ...prev, [field]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.startDate || !form.category) return;

        setSaving(true);
        try {
            const payload = {
                ...form,
                tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
                endDate: form.endDate || undefined,
                eventLink: form.eventLink || undefined,
                registrationLink: form.registrationLink || undefined,
                organizer: form.organizer || user?.name || user?.username,
            };

            await fetchApi('/api/events', {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            setSubmitted(true);
            addToast({
                variant: 'success',
                title: 'Event submitted!',
                message: 'Your event is under review and will appear once approved.',
            });
        } catch (err) {
            addToast({
                variant: 'error',
                title: 'Submission failed',
                message: err instanceof Error ? err.message : 'Please try again.',
            });
        } finally {
            setSaving(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
                <AlertCircle className="w-12 h-12 text-orange-400 mb-4" />
                <h1 className="text-2xl font-bold text-white mb-3">Sign in required</h1>
                <p className="text-gray-400 mb-6 text-center">You need to be logged in to submit a community event.</p>
                <Link
                    href="/auth"
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
                >
                    Sign in
                </Link>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
                <div className="max-w-md text-center">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-3">Event submitted for review!</h1>
                    <p className="text-gray-400 mb-8">
                        Thanks for contributing to the community. Our team will review your event and publish it shortly.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/events"
                            className="px-6 py-3 border border-white/10 text-gray-400 hover:text-white rounded-xl transition-colors"
                        >
                            Browse Events
                        </Link>
                        <button
                            onClick={() => { setSubmitted(false); setForm({ title: '', description: '', shortDescription: '', category: 'webinar', startDate: '', endDate: '', locationType: 'online', location: 'Online', eventLink: '', registrationLink: '', organizer: '', tags: '' }); }}
                            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
                        >
                            Submit Another
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative max-w-2xl mx-auto px-4 pt-28 pb-20">
                {/* Back link */}
                <Link
                    href="/events"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Events
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Submit a Community Event</h1>
                    <p className="text-gray-400">
                        Share cybersecurity events with the community. Events are reviewed before publishing.
                    </p>
                </div>

                {/* Review notice */}
                <div className="mb-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 flex gap-3">
                    <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-blue-400 font-medium">Under review</p>
                        <p className="text-xs text-gray-400 mt-1">
                            Submitted events are reviewed by our team within 24-48 hours before appearing publicly.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-8">

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Event Title *</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={e => set('title', e.target.value)}
                            placeholder="e.g. Intro to Bug Bounty Hunting"
                            required
                            maxLength={100}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Short Description</label>
                        <input
                            type="text"
                            value={form.shortDescription}
                            onChange={e => set('shortDescription', e.target.value)}
                            placeholder="One-line summary"
                            maxLength={150}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Description</label>
                        <textarea
                            value={form.description}
                            onChange={e => set('description', e.target.value)}
                            placeholder="Full details about the event, agenda, speakers, requirements..."
                            rows={5}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Category *</label>
                            <select
                                value={form.category}
                                onChange={e => set('category', e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none transition-colors appearance-none capitalize"
                            >
                                {CATEGORIES.map(c => (
                                    <option key={c} value={c} className="bg-gray-900 capitalize">{c}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Format</label>
                            <select
                                value={form.locationType}
                                onChange={e => set('locationType', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none transition-colors appearance-none capitalize"
                            >
                                {LOCATION_TYPES.map(t => (
                                    <option key={t} value={t} className="bg-gray-900 capitalize">{t}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" />
                                Start Date & Time *
                            </label>
                            <input
                                type="datetime-local"
                                value={form.startDate}
                                onChange={e => set('startDate', e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5" />
                                End Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                value={form.endDate}
                                onChange={e => set('endDate', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5" />
                            Location / Platform
                        </label>
                        <input
                            type="text"
                            value={form.location}
                            onChange={e => set('location', e.target.value)}
                            placeholder="e.g. Zoom, CTFd, New Delhi, etc."
                            maxLength={200}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                            <Globe className="w-3.5 h-3.5" />
                            Event Link
                        </label>
                        <input
                            type="url"
                            value={form.eventLink}
                            onChange={e => set('eventLink', e.target.value)}
                            placeholder="https://..."
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Registration Link</label>
                        <input
                            type="url"
                            value={form.registrationLink}
                            onChange={e => set('registrationLink', e.target.value)}
                            placeholder="https://... (if separate from event link)"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5" />
                            Organizer Name
                        </label>
                        <input
                            type="text"
                            value={form.organizer}
                            onChange={e => set('organizer', e.target.value)}
                            placeholder={user?.name || 'Your name or organization'}
                            maxLength={100}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                            <Tag className="w-3.5 h-3.5" />
                            Tags
                        </label>
                        <input
                            type="text"
                            value={form.tags}
                            onChange={e => set('tags', e.target.value)}
                            placeholder="e.g. beginner, ctf, web, crypto (comma separated)"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving || !form.title || !form.startDate}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/40 text-white font-medium rounded-xl transition-all"
                    >
                        {saving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <CheckCircle className="w-4 h-4" />
                        )}
                        Submit for Review
                    </button>
                </form>
            </div>
        </div>
    );
}
