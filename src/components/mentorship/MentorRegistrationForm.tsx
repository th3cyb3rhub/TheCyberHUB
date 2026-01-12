"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExpertiseBadge } from './ExpertiseBadge';
import type { ExpertiseArea, MentorRegistrationData, PreferredTime } from '@/lib/mentorship/types';

interface MentorRegistrationFormProps {
    onSubmit: (data: MentorRegistrationData) => Promise<void>;
    onCancel?: () => void;
    initialData?: Partial<MentorRegistrationData>;
    isEditing?: boolean;
}

const EXPERTISE_OPTIONS: ExpertiseArea[] = [
    'web-security', 'network-security', 'malware-analysis', 'forensics',
    'osint', 'cryptography', 'reverse-engineering', 'cloud-security',
    'mobile-security', 'career-guidance', 'ctf-training', 'pentesting'
];

const DAYS_OF_WEEK = [
    { value: 0, label: 'Sun' },
    { value: 1, label: 'Mon' },
    { value: 2, label: 'Tue' },
    { value: 3, label: 'Wed' },
    { value: 4, label: 'Thu' },
    { value: 5, label: 'Fri' },
    { value: 6, label: 'Sat' },
];

const MIN_BIO_LENGTH = 100;
const MAX_BIO_LENGTH = 1000;

export function MentorRegistrationForm({
    onSubmit,
    onCancel,
    initialData,
    isEditing = false
}: MentorRegistrationFormProps) {
    const [expertiseAreas, setExpertiseAreas] = useState<ExpertiseArea[]>(
        initialData?.expertiseAreas || []
    );
    const [bio, setBio] = useState(initialData?.bio || '');
    const [hoursPerWeek, setHoursPerWeek] = useState(
        initialData?.availability?.hoursPerWeek || 5
    );
    const [preferredTimes, setPreferredTimes] = useState<PreferredTime[]>(
        initialData?.availability?.preferredTimes || []
    );
    const [timezone, setTimezone] = useState(
        initialData?.availability?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const [maxMentees, setMaxMentees] = useState(initialData?.maxMentees || 3);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleExpertise = (area: ExpertiseArea) => {
        setExpertiseAreas(prev =>
            prev.includes(area)
                ? prev.filter(a => a !== area)
                : [...prev, area]
        );
    };

    const togglePreferredDay = (dayOfWeek: number) => {
        setPreferredTimes(prev => {
            const existing = prev.find(t => t.dayOfWeek === dayOfWeek);
            if (existing) {
                return prev.filter(t => t.dayOfWeek !== dayOfWeek);
            }
            return [...prev, { dayOfWeek, startHour: 9, endHour: 17 }];
        });
    };

    const updatePreferredTime = (dayOfWeek: number, field: 'startHour' | 'endHour', value: number) => {
        setPreferredTimes(prev =>
            prev.map(t =>
                t.dayOfWeek === dayOfWeek ? { ...t, [field]: value } : t
            )
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (expertiseAreas.length === 0) {
            setError('Please select at least one expertise area');
            return;
        }
        if (bio.length < MIN_BIO_LENGTH) {
            setError(`Bio must be at least ${MIN_BIO_LENGTH} characters`);
            return;
        }
        if (bio.length > MAX_BIO_LENGTH) {
            setError(`Bio must be no more than ${MAX_BIO_LENGTH} characters`);
            return;
        }
        if (hoursPerWeek < 1 || hoursPerWeek > 20) {
            setError('Hours per week must be between 1 and 20');
            return;
        }
        if (maxMentees < 1 || maxMentees > 5) {
            setError('Max mentees must be between 1 and 5');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit({
                expertiseAreas,
                bio: bio.trim(),
                availability: {
                    hoursPerWeek,
                    preferredTimes,
                    timezone,
                },
                maxMentees,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit');
        } finally {
            setIsSubmitting(false);
        }
    };

    const bioLength = bio.length;
    const isBioTooShort = bioLength < MIN_BIO_LENGTH;
    const isBioTooLong = bioLength > MAX_BIO_LENGTH;

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                    {isEditing ? 'Update Mentor Profile' : 'Become a Mentor'}
                </h3>
                <p className="text-sm text-gray-400">
                    Share your expertise with the community and help others grow in cybersecurity.
                </p>
            </div>

            {/* Expertise Areas */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                    Areas of Expertise <span className="text-red-400">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-3">
                    Select the areas where you can provide mentorship
                </p>
                <div className="flex flex-wrap gap-2">
                    {EXPERTISE_OPTIONS.map(area => (
                        <button
                            key={area}
                            type="button"
                            onClick={() => toggleExpertise(area)}
                            className={`transition-all ${expertiseAreas.includes(area)
                                ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-black rounded-full'
                                : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            <ExpertiseBadge area={area} />
                        </button>
                    ))}
                </div>
                {expertiseAreas.length > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                        {expertiseAreas.length} area{expertiseAreas.length !== 1 ? 's' : ''} selected
                    </p>
                )}
            </div>


            {/* Bio */}
            <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                    Bio <span className="text-red-400">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                    Describe your experience and what you can offer as a mentor
                </p>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Share your background, experience, and what makes you a great mentor..."
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 resize-none"
                />
                <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">
                        {MIN_BIO_LENGTH}-{MAX_BIO_LENGTH} characters required
                    </span>
                    <span className={`text-xs ${isBioTooLong ? 'text-red-400' : isBioTooShort ? 'text-yellow-400' : 'text-green-400'}`}>
                        {bioLength}/{MAX_BIO_LENGTH}
                    </span>
                </div>
            </div>

            {/* Hours Per Week */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hours Available Per Week
                </label>
                <p className="text-xs text-gray-500 mb-3">
                    How many hours can you dedicate to mentoring each week?
                </p>
                <div className="flex items-center gap-4">
                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                        className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <span className="text-white font-medium w-16 text-center">
                        {hoursPerWeek} hr{hoursPerWeek !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Preferred Times */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Days
                </label>
                <p className="text-xs text-gray-500 mb-3">
                    Select the days you&apos;re typically available for sessions
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {DAYS_OF_WEEK.map(day => {
                        const isSelected = preferredTimes.some(t => t.dayOfWeek === day.value);
                        return (
                            <button
                                key={day.value}
                                type="button"
                                onClick={() => togglePreferredDay(day.value)}
                                className={`px-4 py-2 rounded-lg border transition-all ${isSelected
                                    ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                                    : 'border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20'
                                    }`}
                            >
                                {day.label}
                            </button>
                        );
                    })}
                </div>

                {/* Time slots for selected days */}
                {preferredTimes.length > 0 && (
                    <div className="space-y-3 p-4 bg-white/[0.02] rounded-xl border border-white/10">
                        <p className="text-xs text-gray-500">Set your available hours for each day</p>
                        {preferredTimes
                            .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                            .map(time => (
                                <div key={time.dayOfWeek} className="flex items-center gap-3">
                                    <span className="text-sm text-gray-300 w-12">
                                        {DAYS_OF_WEEK.find(d => d.value === time.dayOfWeek)?.label}
                                    </span>
                                    <select
                                        value={time.startHour}
                                        onChange={(e) => updatePreferredTime(time.dayOfWeek, 'startHour', Number(e.target.value))}
                                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500/50"
                                    >
                                        {Array.from({ length: 24 }, (_, i) => (
                                            <option key={i} value={i}>
                                                {i.toString().padStart(2, '0')}:00
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-gray-500">to</span>
                                    <select
                                        value={time.endHour}
                                        onChange={(e) => updatePreferredTime(time.dayOfWeek, 'endHour', Number(e.target.value))}
                                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500/50"
                                    >
                                        {Array.from({ length: 24 }, (_, i) => (
                                            <option key={i} value={i}>
                                                {i.toString().padStart(2, '0')}:00
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                    </div>
                )}
            </div>


            {/* Timezone */}
            <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-2">
                    Timezone
                </label>
                <input
                    id="timezone"
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Auto-detected from your browser
                </p>
            </div>

            {/* Max Mentees */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Maximum Mentees
                </label>
                <p className="text-xs text-gray-500 mb-3">
                    How many mentees can you work with at the same time? (1-5)
                </p>
                <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map(num => (
                        <button
                            key={num}
                            type="button"
                            onClick={() => setMaxMentees(num)}
                            className={`w-12 h-12 rounded-xl border text-lg font-medium transition-all ${maxMentees === num
                                ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                                : 'border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20'
                                }`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-2">
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    type="submit"
                    disabled={isSubmitting || expertiseAreas.length === 0 || isBioTooShort || isBioTooLong}
                    className="bg-orange-500 hover:bg-orange-600"
                >
                    {isSubmitting
                        ? (isEditing ? 'Updating...' : 'Registering...')
                        : (isEditing ? 'Update Profile' : 'Become a Mentor')
                    }
                </Button>
            </div>
        </form>
    );
}
