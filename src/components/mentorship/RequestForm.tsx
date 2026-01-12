"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExpertiseBadge } from './ExpertiseBadge';
import type { ExpertiseArea, SkillLevel, RequestFormData } from '@/lib/mentorship/types';

interface RequestFormProps {
    mentorId?: string;
    onSubmit: (data: RequestFormData) => Promise<void>;
    onClose: () => void;
}

const EXPERTISE_OPTIONS: ExpertiseArea[] = [
    'web-security', 'network-security', 'malware-analysis', 'forensics',
    'osint', 'cryptography', 'reverse-engineering', 'cloud-security',
    'mobile-security', 'career-guidance', 'ctf-training', 'pentesting'
];

const SKILL_LEVELS: { value: SkillLevel; label: string; description: string }[] = [
    { value: 'beginner', label: 'Beginner', description: 'New to cybersecurity' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience' },
    { value: 'advanced', label: 'Advanced', description: 'Looking to specialize' },
];

const MIN_GOALS_LENGTH = 100;
const MAX_GOALS_LENGTH = 500;

export function RequestForm({ mentorId, onSubmit, onClose }: RequestFormProps) {
    const [expertiseAreas, setExpertiseAreas] = useState<ExpertiseArea[]>([]);
    const [goals, setGoals] = useState('');
    const [skillLevel, setSkillLevel] = useState<SkillLevel | ''>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleExpertise = (area: ExpertiseArea) => {
        setExpertiseAreas(prev =>
            prev.includes(area)
                ? prev.filter(a => a !== area)
                : [...prev, area]
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
        if (goals.length < MIN_GOALS_LENGTH) {
            setError(`Goals must be at least ${MIN_GOALS_LENGTH} characters`);
            return;
        }
        if (goals.length > MAX_GOALS_LENGTH) {
            setError(`Goals must be no more than ${MAX_GOALS_LENGTH} characters`);
            return;
        }
        if (!skillLevel) {
            setError('Please select your skill level');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit({
                mentorId,
                expertiseAreas,
                goals: goals.trim(),
                skillLevel,
            });
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit request');
        } finally {
            setIsSubmitting(false);
        }
    };

    const goalsLength = goals.length;
    const isGoalsTooShort = goalsLength < MIN_GOALS_LENGTH;
    const isGoalsTooLong = goalsLength > MAX_GOALS_LENGTH;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-white mb-2">Request Mentorship</h3>
                <p className="text-sm text-gray-400">
                    Tell us about your learning goals and we&apos;ll match you with the right mentor.
                </p>
            </div>

            {/* Expertise Areas */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                    Areas of Interest <span className="text-red-400">*</span>
                </label>
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

            {/* Goals */}
            <div>
                <label htmlFor="goals" className="block text-sm font-medium text-gray-300 mb-2">
                    Learning Goals <span className="text-red-400">*</span>
                </label>
                <textarea
                    id="goals"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="Describe what you want to learn and achieve through this mentorship..."
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 resize-none"
                />
                <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">
                        {MIN_GOALS_LENGTH}-{MAX_GOALS_LENGTH} characters required
                    </span>
                    <span className={`text-xs ${isGoalsTooLong ? 'text-red-400' : isGoalsTooShort ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                        {goalsLength}/{MAX_GOALS_LENGTH}
                    </span>
                </div>
            </div>

            {/* Skill Level */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                    Current Skill Level <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {SKILL_LEVELS.map(level => (
                        <button
                            key={level.value}
                            type="button"
                            onClick={() => setSkillLevel(level.value)}
                            className={`p-3 rounded-xl border text-left transition-all ${skillLevel === level.value
                                    ? 'border-orange-500 bg-orange-500/10'
                                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                                }`}
                        >
                            <p className={`font-medium ${skillLevel === level.value ? 'text-orange-400' : 'text-white'}`}>
                                {level.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{level.description}</p>
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
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting || expertiseAreas.length === 0 || isGoalsTooShort || isGoalsTooLong || !skillLevel}
                    className="bg-orange-500 hover:bg-orange-600"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
            </div>
        </form>
    );
}
