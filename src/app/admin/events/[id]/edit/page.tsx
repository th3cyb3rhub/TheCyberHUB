'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { renderMarkdownToHtml } from '@/lib/renderMarkdown';
import {
    ArrowLeft,
    Save,
    Eye,
    EyeOff,
    Image as ImageIcon,
    Bold,
    Italic,
    List,
    ListOrdered,
    Link as LinkIcon,
    Code,
    Heading1,
    Heading2,
    Quote,
    Loader2,
    X,
    Plus,
    CheckCircle,
    AlertCircle,
    Trash2,
    GripVertical,
    Calendar,
    Clock,
    MapPin,
    Globe
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

// Interfaces
interface Speaker {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
}

interface EventFormData {
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    image: string;
    bannerImage: string;
    startDate: string;
    endDate: string;
    timezone: string;
    locationType: 'online' | 'in-person' | 'hybrid';
    location: string;
    venue: string;
    eventLink: string;
    registrationLink: string;
    category: string;
    tags: string[];
    organizer: string;
    organizerLogo: string;
    status: 'upcoming' | 'live' | 'ended' | 'cancelled';
    isFeatured: boolean;
    maxParticipants: number | null;
    speakers: Speaker[];
}

interface ValidationErrors {
    [key: string]: string;
}

// Common timezones
const commonTimezones = [
    { value: 'Asia/Kolkata', label: 'India (IST)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'London (GMT/BST)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan (JST)' },
    { value: 'Asia/Shanghai', label: 'China (CST)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT)' },
    { value: 'UTC', label: 'UTC' },
];

const categories = [
    { value: 'ctf', label: 'CTF' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'meetup', label: 'Meetup' },
    { value: 'conference', label: 'Conference' },
    { value: 'hackathon', label: 'Hackathon' },
];

const statusOptions = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'live', label: 'Live' },
    { value: 'ended', label: 'Ended' },
    { value: 'cancelled', label: 'Cancelled' },
];

const locationTypes = [
    { value: 'online', label: 'Online' },
    { value: 'in-person', label: 'In-Person' },
    { value: 'hybrid', label: 'Hybrid' },
];

// Default placeholder image for speakers
const DEFAULT_SPEAKER_IMAGE = 'https://via.placeholder.com/150?text=Speaker';

// Utility functions
const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
};

const isValidUrl = (url: string): boolean => {
    if (!url) return true; // Empty URLs are valid (optional fields)
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

const renderMarkdown = renderMarkdownToHtml;

const formatDateForInput = (dateString: string, timezone?: string): string => {
    if (!dateString) return '';
    try {
        if (timezone) {
            // Convert UTC date to the event's timezone for the input
            const date = new Date(dateString);
            const formatter = new Intl.DateTimeFormat('sv-SE', {
                timeZone: timezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });
            const parts = formatter.formatToParts(date);
            const get = (type: string) => parts.find(p => p.type === type)?.value || '';
            return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}`;
        }
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    } catch {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    }
};

const formatDateForDisplay = (dateString: string, timezone?: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    if (timezone) {
        options.timeZone = timezone;
        options.timeZoneName = 'short';
    }
    return date.toLocaleDateString('en-US', options);
};

export default function AdminEventEditPage() {
    const router = useRouter();
    const params = useParams();
    const { user, loading: authLoading } = useAuth();
    const { addToast } = useToast();
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    // Form state
    const [formData, setFormData] = useState<EventFormData>({
        title: '',
        slug: '',
        shortDescription: '',
        description: '',
        image: '',
        bannerImage: '',
        startDate: '',
        endDate: '',
        timezone: 'Asia/Kolkata',
        locationType: 'online',
        location: '',
        venue: '',
        eventLink: '',
        registrationLink: '',
        category: 'ctf',
        tags: [],
        organizer: '',
        organizerLogo: '',
        status: 'upcoming',
        isFeatured: false,
        maxParticipants: null,
        speakers: [],
    });

    // UI state
    const [isPreview, setIsPreview] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    // Check admin access
    useEffect(() => {
        if (!authLoading && (!user || user.role !== 'admin')) {
            const redirectUrl = `${window.location.pathname}${window.location.search}`;
            router.push(`/auth?redirect=${encodeURIComponent(redirectUrl)}`);
        }
    }, [user, authLoading, router]);

    // Fetch event data
    useEffect(() => {
        const fetchEvent = async () => {
            if (!params.id) return;

            try {
                const data = await fetchApi(`/api/events/${params.id}`, { requireAuth: false });
                const event = data.data || data;

                setFormData({
                    title: event.title || '',
                    slug: event.slug || '',
                    shortDescription: event.shortDescription || '',
                    description: event.description || '',
                    image: event.image || '',
                    bannerImage: event.bannerImage || '',
                    startDate: formatDateForInput(event.startDate, event.timezone || 'Asia/Kolkata'),
                    endDate: formatDateForInput(event.endDate, event.timezone || 'Asia/Kolkata'),
                    timezone: event.timezone || 'Asia/Kolkata',
                    locationType: event.locationType || 'online',
                    location: event.location || '',
                    venue: event.venue || '',
                    eventLink: event.eventLink || '',
                    registrationLink: event.registrationLink || '',
                    category: event.category || 'ctf',
                    tags: event.tags || [],
                    organizer: event.organizer || '',
                    organizerLogo: event.organizerLogo || '',
                    status: event.status || 'upcoming',
                    isFeatured: event.isFeatured || false,
                    maxParticipants: event.maxParticipants || null,
                    speakers: event.speakers || [],
                });

                setSlugManuallyEdited(true); // Existing event has a slug
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load event');
                addToast({
                    variant: 'error',
                    title: 'Error',
                    message: 'Failed to load event for editing.',
                });
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading && user?.role === 'admin') {
            fetchEvent();
        }
    }, [authLoading, user, params.id, addToast]);

    // Auto-generate slug from title
    useEffect(() => {
        if (!slugManuallyEdited && formData.title) {
            setFormData(prev => ({
                ...prev,
                slug: generateSlug(formData.title)
            }));
        }
    }, [formData.title, slugManuallyEdited]);

    // Auto-save functionality
    useEffect(() => {
        const AUTO_SAVE_KEY = `event-edit-autosave-${params.id}`;
        const AUTO_SAVE_DELAY = 2000;

        const timer = setTimeout(() => {
            if (formData.title) {
                setAutoSaveStatus('saving');
                try {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify({
                            formData,
                            timestamp: Date.now()
                        }));
                    }
                } catch {
                    // localStorage may be unavailable
                }
                setAutoSaveStatus('saved');
                setTimeout(() => setAutoSaveStatus('idle'), 2000);
            }
        }, AUTO_SAVE_DELAY);

        return () => clearTimeout(timer);
    }, [formData, params.id]);

    // Validation
    const validateForm = (): boolean => {
        const errors: ValidationErrors = {};

        if (!formData.title.trim()) {
            errors.title = 'Title is required';
        }

        if (!formData.shortDescription.trim()) {
            errors.shortDescription = 'Short description is required';
        } else if (formData.shortDescription.length > 150) {
            errors.shortDescription = 'Short description must be 150 characters or less';
        }

        if (!formData.startDate) {
            errors.startDate = 'Start date is required';
        }

        if (formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
            errors.endDate = 'End date must be after start date';
        }

        const urlFields = ['image', 'bannerImage', 'eventLink', 'registrationLink', 'organizerLogo'];
        urlFields.forEach(field => {
            const value = formData[field as keyof EventFormData] as string;
            if (value && !isValidUrl(value)) {
                errors[field] = 'Please enter a valid URL';
            }
        });

        formData.speakers.forEach((speaker, index) => {
            if (!speaker.name.trim()) {
                errors[`speaker-${index}-name`] = 'Speaker name is required';
            }
            if (speaker.image && !isValidUrl(speaker.image)) {
                errors[`speaker-${index}-image`] = 'Please enter a valid image URL';
            }
        });

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Markdown toolbar
    const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
        const textarea = descriptionRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = formData.description.substring(start, end) || placeholder;

        const newContent =
            formData.description.substring(0, start) +
            before + selectedText + after +
            formData.description.substring(end);

        setFormData(prev => ({ ...prev, description: newContent }));

        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + before.length + selectedText.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const toolbarButtons = [
        { icon: Bold, action: () => insertMarkdown('**', '**', 'bold text'), title: 'Bold' },
        { icon: Italic, action: () => insertMarkdown('*', '*', 'italic text'), title: 'Italic' },
        { icon: Heading1, action: () => insertMarkdown('# ', '', 'Heading'), title: 'Heading 1' },
        { icon: Heading2, action: () => insertMarkdown('## ', '', 'Heading'), title: 'Heading 2' },
        { icon: List, action: () => insertMarkdown('- ', '', 'List item'), title: 'Bullet List' },
        { icon: ListOrdered, action: () => insertMarkdown('1. ', '', 'List item'), title: 'Numbered List' },
        { icon: Quote, action: () => insertMarkdown('> ', '', 'Quote'), title: 'Quote' },
        { icon: Code, action: () => insertMarkdown('`', '`', 'code'), title: 'Inline Code' },
        { icon: LinkIcon, action: () => insertMarkdown('[', '](url)', 'link text'), title: 'Link' },
        { icon: ImageIcon, action: () => insertMarkdown('![', '](image-url)', 'alt text'), title: 'Image' },
    ];

    // Speaker management
    const addSpeaker = () => {
        if (formData.speakers.length >= 10) {
            addToast({
                variant: 'error',
                title: 'Maximum speakers reached',
                message: 'You can add up to 10 speakers per event.',
            });
            return;
        }

        const newSpeaker: Speaker = {
            id: `speaker-${Date.now()}`,
            name: '',
            role: '',
            bio: '',
            image: DEFAULT_SPEAKER_IMAGE,
        };

        setFormData(prev => ({
            ...prev,
            speakers: [...prev.speakers, newSpeaker]
        }));
    };

    const updateSpeaker = (id: string, field: keyof Speaker, value: string) => {
        setFormData(prev => ({
            ...prev,
            speakers: prev.speakers.map(speaker =>
                speaker.id === id ? { ...speaker, [field]: value } : speaker
            )
        }));
    };

    const removeSpeaker = (id: string) => {
        setFormData(prev => ({
            ...prev,
            speakers: prev.speakers.filter(speaker => speaker.id !== id)
        }));
    };

    // Tag management
    const addTag = () => {
        const tag = tagInput.trim().toLowerCase();
        if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tag]
            }));
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tagToRemove)
        }));
    };

    // Form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setError('Please fix the validation errors before submitting');
            return;
        }

        setSaving(true);
        setError(null);

        try {
            await fetchApi(`/api/events/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...formData,
                    startDate: new Date(formData.startDate).toISOString(),
                    endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
                    tags: formData.tags.filter(t => t.trim()),
                    speakers: formData.speakers.map(s => ({
                        name: s.name.trim(),
                        role: s.role.trim(),
                        bio: s.bio.trim(),
                        image: s.image.trim() || DEFAULT_SPEAKER_IMAGE
                    })),
                })
            });

            // Clear auto-save
            try {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem(`event-edit-autosave-${params.id}`);
                }
            } catch {
                // localStorage may be unavailable
            }

            setSuccess(true);
            addToast({
                variant: 'success',
                title: 'Event updated',
                message: 'Your event has been updated successfully.',
            });

            setTimeout(() => {
                router.push('/admin/events');
            }, 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update event');
            addToast({
                variant: 'error',
                title: 'Update failed',
                message: err instanceof Error ? err.message : 'Failed to update event.',
            });
        } finally {
            setSaving(false);
        }
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
        <div className="min-h-screen bg-[var(--color-background)]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link
                            href="/admin/events"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-2 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Events
                        </Link>
                        <h1 className="text-2xl font-bold text-white">Edit Event</h1>
                        {autoSaveStatus === 'saved' && (
                            <p className="text-xs text-green-400 mt-1">Auto-saved</p>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsPreview(!isPreview)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
                        >
                            {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {isPreview ? 'Edit' : 'Preview'}
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={saving || !formData.title.trim()}
                            className="flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-lg transition-all"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Update Event
                        </button>
                    </div>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <p className="text-green-400">Event updated successfully! Redirecting...</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {isPreview ? (
                    /* Preview Mode */
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                        {/* Banner Image */}
                        {formData.bannerImage && (
                            <Image
                                src={formData.bannerImage}
                                alt="Banner"
                                width={1200}
                                height={514}
                                className="w-full aspect-[21/9] object-cover rounded-xl mb-6"
                                unoptimized
                            />
                        )}

                        {/* Event Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm font-medium capitalize">
                                    {formData.category}
                                </span>
                                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium capitalize">
                                    {formData.status}
                                </span>
                                {formData.isFeatured && (
                                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-sm font-medium">
                                        Featured
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl font-bold text-white mb-4">
                                {formData.title || 'Untitled Event'}
                            </h1>

                            <p className="text-xl text-gray-400 mb-6">
                                {formData.shortDescription || 'No description provided'}
                            </p>

                            {/* Event Meta */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-orange-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Start Date</p>
                                        <p>{formData.startDate ? formatDateForDisplay(formData.startDate, formData.timezone) : 'Not set'}</p>
                                    </div>
                                </div>
                                {formData.endDate && (
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-orange-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">End Date</p>
                                            <p>{formatDateForDisplay(formData.endDate, formData.timezone)}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-orange-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="capitalize">{formData.locationType} - {formData.location || 'Not specified'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-orange-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Organizer</p>
                                        <p>{formData.organizer || 'Not specified'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cover Image */}
                        {formData.image && (
                            <Image
                                src={formData.image}
                                alt="Cover"
                                width={800}
                                height={450}
                                className="w-full aspect-video object-cover rounded-xl mb-6"
                                unoptimized
                            />
                        )}

                        {/* Tags */}
                        {formData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {formData.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
                            <div
                                className="prose prose-invert max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(`<p class="text-gray-300 mb-4">${renderMarkdown(formData.description) || '<span class="text-gray-500">No description yet...</span>'}</p>`)
                                }}
                            />
                        </div>

                        {/* Speakers */}
                        {formData.speakers.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-white mb-4">Speakers</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {formData.speakers.map(speaker => (
                                        <div key={speaker.id} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                            <Image
                                                src={speaker.image || DEFAULT_SPEAKER_IMAGE}
                                                alt={speaker.name}
                                                width={80}
                                                height={80}
                                                className="w-20 h-20 rounded-full object-cover"
                                                unoptimized
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-white">{speaker.name || 'Unnamed Speaker'}</h3>
                                                <p className="text-sm text-orange-400 mb-2">{speaker.role || 'Speaker'}</p>
                                                <p className="text-sm text-gray-400">{speaker.bio || 'No bio provided'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Links */}
                        <div className="flex flex-wrap gap-4">
                            {formData.eventLink && (
                                <a
                                    href={formData.eventLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
                                >
                                    Event Website
                                </a>
                            )}
                            {formData.registrationLink && (
                                <a
                                    href={formData.registrationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                                >
                                    Register Now
                                </a>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Edit Mode */
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>

                            {/* Title */}
                            <div className="mb-6">
                                <label className="block text-sm text-gray-400 mb-2">
                                    Event Title <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className={`w-full px-4 py-3 bg-white/5 border ${validationErrors.title ? 'border-red-500' : 'border-white/10'} rounded-xl text-white text-xl font-semibold placeholder:text-gray-600 placeholder:font-normal focus:border-orange-500/50 focus:outline-none transition-colors`}
                                    placeholder="Enter event title..."
                                    required
                                />
                                {validationErrors.title && (
                                    <p className="text-red-400 text-sm mt-1">{validationErrors.title}</p>
                                )}
                            </div>

                            {/* Slug */}
                            <div className="mb-6">
                                <label className="block text-sm text-gray-400 mb-2">
                                    URL Slug
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => {
                                        setFormData(prev => ({ ...prev, slug: e.target.value }));
                                        setSlugManuallyEdited(true);
                                    }}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors font-mono text-sm"
                                    placeholder="event-slug"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    URL: /events/{formData.slug || 'event-slug'}
                                </p>
                            </div>

                            {/* Short Description */}
                            <div className="mb-6">
                                <label className="block text-sm text-gray-400 mb-2">
                                    Short Description <span className="text-red-400">*</span>
                                    <span className="text-gray-500 ml-2">
                                        ({formData.shortDescription.length}/150)
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.shortDescription}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 150) {
                                            setFormData(prev => ({ ...prev, shortDescription: e.target.value }));
                                        }
                                    }}
                                    className={`w-full px-4 py-3 bg-white/5 border ${validationErrors.shortDescription ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors`}
                                    placeholder="Brief description for event cards..."
                                    maxLength={150}
                                    required
                                />
                                {validationErrors.shortDescription && (
                                    <p className="text-red-400 text-sm mt-1">{validationErrors.shortDescription}</p>
                                )}
                            </div>

                            {/* Category & Status */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500/50 focus:outline-none transition-colors"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as EventFormData['status'] }))}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500/50 focus:outline-none transition-colors"
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status.value} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Organizer */}
                            <div className="mb-6">
                                <label className="block text-sm text-gray-400 mb-2">Organizer</label>
                                <input
                                    type="text"
                                    value={formData.organizer}
                                    onChange={(e) => setFormData(prev => ({ ...prev, organizer: e.target.value }))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors"
                                    placeholder="Organization or person organizing the event"
                                />
                            </div>

                            {/* Organizer Logo */}
                            <div className="mb-6">
                                <label className="block text-sm text-gray-400 mb-2">Organizer Logo URL</label>
                                <input
                                    type="url"
                                    value={formData.organizerLogo}
                                    onChange={(e) => setFormData(prev => ({ ...prev, organizerLogo: e.target.value }))}
                                    className={`w-full px-4 py-3 bg-white/5 border ${validationErrors.organizerLogo ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors`}
                                    placeholder="https://example.com/logo.png"
                                />
                                {validationErrors.organizerLogo && (
                                    <p className="text-red-400 text-sm mt-1">{validationErrors.organizerLogo}</p>
                                )}
                            </div>

                            {/* Featured Toggle */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={formData.isFeatured}
                                    onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-orange-500 focus:ring-orange-500"
                                />
                                <label htmlFor="featured" className="text-sm text-gray-300">
                                    Feature this event (display prominently on events page)
                                </label>
                            </div>
                        </div>

                        {/* Description with Markdown */}
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Event Description</h2>

                            <label className="block text-sm text-gray-400 mb-2">
                                Description (Markdown supported)
                            </label>

                            {/* Markdown Toolbar */}
                            <div className="flex flex-wrap gap-1 p-2 bg-white/5 border border-white/10 border-b-0 rounded-t-xl">
                                {toolbarButtons.map((btn, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={btn.action}
                                        title={btn.title}
                                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        <btn.icon className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>

                            {/* Textarea */}
                            <textarea
                                ref={descriptionRef}
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Write your event description here... (Markdown supported)"
                                rows={15}
                                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-b-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors font-mono text-sm resize-none"
                            />

                            {/* Markdown Tips */}
                            <div className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <p className="text-blue-400 text-sm font-medium mb-2">Markdown Tips:</p>
                                <ul className="text-blue-400/80 text-sm space-y-1">
                                    <li>• Use **text** for bold and *text* for italic</li>
                                    <li>• Use # for headings (## for smaller)</li>
                                    <li>• Use `code` for inline code and ``` for code blocks</li>
                                    <li>• Use [text](url) for links and ![alt](url) for images</li>
                                </ul>
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Date & Time</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Start Date & Time <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                                        className={`w-full px-4 py-3 bg-white/5 border ${validationErrors.startDate ? 'border-red-500' : 'border-white/10'} rounded-xl text-white focus:border-orange-500/50 focus:outline-none transition-colors`}
                                        required
                                    />
                                    {validationErrors.startDate && (
                                        <p className="text-red-400 text-sm mt-1">{validationErrors.startDate}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">End Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                                        className={`w-full px-4 py-3 bg-white/5 border ${validationErrors.endDate ? 'border-red-500' : 'border-white/10'} rounded-xl text-white focus:border-orange-500/50 focus:outline-none transition-colors`}
                                    />
                                    {validationErrors.endDate && (
                                        <p className="text-red-400 text-sm mt-1">{validationErrors.endDate}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Timezone</label>
                                    <select
                                        value={formData.timezone}
                                        onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500/50 focus:outline-none transition-colors"
                                    >
                                        {commonTimezones.map(tz => (
                                            <option key={tz.value} value={tz.value}>{tz.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Max Participants</label>
                                    <input
                                        type="number"
                                        value={formData.maxParticipants || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: e.target.value ? parseInt(e.target.value) : null }))}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors"
                                        placeholder="Unlimited"
                                        min="1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Location</h2>

                            <div className="mb-6">
                                <label className="block text-sm text-gray-400 mb-2">Location Type</label>
                                <select
                                    value={formData.locationType}
                                    onChange={(e) => setFormData(prev => ({ ...prev, locationType: e.target.value as EventFormData['locationType'] }))}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500/50 focus:outline-none transition-colors"
                                >
                                    {locationTypes.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors"
                                        placeholder="City, Country or Online"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Venue</label>
                                    <input
                                        type="text"
                                        value={formData.venue}
                                        onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors"
                                        placeholder="Venue name or platform"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Links</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Event Website</label>
                                    <input
                                        type="url"
                                        value={formData.eventLink}
                                        onChange={(e) => setFormData(prev => ({ ...prev, eventLink: e.target.value }))}
                                        className={`w-full px-4 py-3 bg-white/5 border ${validationErrors.eventLink ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors`}
                                        placeholder="https://event-website.com"
                                    />
                                    {validationErrors.eventLink && (
                                        <p className="text-red-400 text-sm mt-1">{validationErrors.eventLink}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Registration Link</label>
                                    <input
                                        type="url"
                                        value={formData.registrationLink}
                                        onChange={(e) => setFormData(prev => ({ ...prev, registrationLink: e.target.value }))}
                                        className={`w-full px-4 py-3 bg-white/5 border ${validationErrors.registrationLink ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors`}
                                        placeholder="https://register.com"
                                    />
                                    {validationErrors.registrationLink && (
                                        <p className="text-red-400 text-sm mt-1">{validationErrors.registrationLink}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Images */}
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Images</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Cover Image URL</label>
                                    <input
                                        type="url"
                                        value={formData.image}
                                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                        className={`w-full px-4 py-3 bg-white/5 border ${validationErrors.image ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors`}
                                        placeholder="https://example.com/cover.jpg"
                                    />
                                    {validationErrors.image && (
                                        <p className="text-red-400 text-sm mt-1">{validationErrors.image}</p>
                                    )}
                                    {formData.image && (
                                        <Image src={formData.image} alt="Cover preview" width={800} height={450} className="mt-2 w-full max-w-md aspect-video object-cover rounded-lg" unoptimized />
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Banner Image URL</label>
                                    <input
                                        type="url"
                                        value={formData.bannerImage}
                                        onChange={(e) => setFormData(prev => ({ ...prev, bannerImage: e.target.value }))}
                                        className={`w-full px-4 py-3 bg-white/5 border ${validationErrors.bannerImage ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors`}
                                        placeholder="https://example.com/banner.jpg"
                                    />
                                    {validationErrors.bannerImage && (
                                        <p className="text-red-400 text-sm mt-1">{validationErrors.bannerImage}</p>
                                    )}
                                    {formData.bannerImage && (
                                        <Image src={formData.bannerImage} alt="Banner preview" width={1200} height={514} className="mt-2 w-full max-w-2xl aspect-[21/9] object-cover rounded-lg" unoptimized />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Speakers */}
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Speakers</h2>
                                <button
                                    type="button"
                                    onClick={addSpeaker}
                                    disabled={formData.speakers.length >= 10}
                                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white rounded-lg transition-colors text-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Speaker
                                </button>
                            </div>

                            {formData.speakers.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No speakers added yet. Click &quot;Add Speaker&quot; to add one.</p>
                            ) : (
                                <div className="space-y-4">
                                    {formData.speakers.map((speaker, index) => (
                                        <div key={speaker.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <GripVertical className="w-5 h-5 text-gray-500" />
                                                    <span className="text-sm text-gray-400">Speaker {index + 1}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeSpeaker(speaker.id)}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm text-gray-400 mb-2">
                                                        Name <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={speaker.name}
                                                        onChange={(e) => updateSpeaker(speaker.id, 'name', e.target.value)}
                                                        className={`w-full px-4 py-2 bg-white/5 border ${validationErrors[`speaker-${index}-name`] ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors`}
                                                        placeholder="Speaker name"
                                                    />
                                                    {validationErrors[`speaker-${index}-name`] && (
                                                        <p className="text-red-400 text-sm mt-1">{validationErrors[`speaker-${index}-name`]}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-400 mb-2">Role</label>
                                                    <input
                                                        type="text"
                                                        value={speaker.role}
                                                        onChange={(e) => updateSpeaker(speaker.id, 'role', e.target.value)}
                                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors"
                                                        placeholder="Title or role"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm text-gray-400 mb-2">Bio</label>
                                                    <textarea
                                                        value={speaker.bio}
                                                        onChange={(e) => updateSpeaker(speaker.id, 'bio', e.target.value)}
                                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors resize-none"
                                                        placeholder="Brief bio..."
                                                        rows={3}
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                                                    <input
                                                        type="url"
                                                        value={speaker.image}
                                                        onChange={(e) => updateSpeaker(speaker.id, 'image', e.target.value)}
                                                        className={`w-full px-4 py-2 bg-white/5 border ${validationErrors[`speaker-${index}-image`] ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors`}
                                                        placeholder="https://example.com/speaker.jpg"
                                                    />
                                                    {validationErrors[`speaker-${index}-image`] && (
                                                        <p className="text-red-400 text-sm mt-1">{validationErrors[`speaker-${index}-image`]}</p>
                                                    )}
                                                    {speaker.image && speaker.image !== DEFAULT_SPEAKER_IMAGE && (
                                                        <Image src={speaker.image} alt={speaker.name} width={80} height={80} className="mt-2 w-20 h-20 rounded-full object-cover" unoptimized />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Tags</h2>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {formData.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="flex items-center gap-1 px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="hover:text-orange-300"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>

                            {formData.tags.length < 10 && (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                        placeholder="Add a tag..."
                                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={addTag}
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/20 transition-all"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
