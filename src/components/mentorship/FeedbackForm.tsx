"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RatingStars } from './RatingStars';
import type { FeedbackFormData, FeedbackType } from '@/lib/mentorship/types';

interface FeedbackFormProps {
    mentorshipId: string;
    sessionId?: string;
    type: FeedbackType;
    onSubmit: (data: FeedbackFormData) => Promise<void>;
    onClose?: () => void;
}

const MAX_COMMENT_LENGTH = 500;

export function FeedbackForm({ mentorshipId, sessionId, type, onSubmit, onClose }: FeedbackFormProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit({
                mentorshipId,
                sessionId,
                type,
                rating,
                comment: comment.trim() || undefined,
            });
            onClose?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit feedback');
        } finally {
            setIsSubmitting(false);
        }
    };

    const remainingChars = MAX_COMMENT_LENGTH - comment.length;
    const isOverLimit = remainingChars < 0;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                    {type === 'session' ? 'Session Feedback' : 'Final Feedback'}
                </h3>
                <p className="text-sm text-gray-400">
                    {type === 'session'
                        ? 'How was your session? Your feedback helps improve the mentorship experience.'
                        : 'Share your overall experience with this mentorship.'}
                </p>
            </div>

            {/* Rating */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                    Rating <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center gap-2">
                    <RatingStars
                        rating={rating}
                        interactive
                        size="lg"
                        onChange={setRating}
                    />
                    <span className="text-sm text-gray-400 ml-2">
                        {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select rating'}
                    </span>
                </div>
            </div>

            {/* Comment */}
            <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
                    Comment (optional)
                </label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 resize-none"
                />
                <div className="flex justify-end mt-1">
                    <span className={`text-xs ${isOverLimit ? 'text-red-400' : remainingChars < 50 ? 'text-yellow-400' : 'text-gray-500'}`}>
                        {remainingChars} characters remaining
                    </span>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 justify-end">
                {onClose && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    type="submit"
                    disabled={isSubmitting || rating === 0 || isOverLimit}
                    className="bg-orange-500 hover:bg-orange-600"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
            </div>
        </form>
    );
}
