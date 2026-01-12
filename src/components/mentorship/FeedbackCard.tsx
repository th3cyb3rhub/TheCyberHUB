"use client";

import React from 'react';
import { RatingStars } from './RatingStars';
import { AlertCircle, Clock } from 'lucide-react';
import type { Feedback } from '@/lib/mentorship/types';

interface FeedbackCardProps {
    feedback: Feedback;
    isPending?: boolean;
    deadlineApproaching?: boolean;
    onSubmitFeedback?: () => void;
}

export function FeedbackCard({ feedback, isPending, deadlineApproaching, onSubmitFeedback }: FeedbackCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    if (isPending) {
        return (
            <div
                onClick={onSubmitFeedback}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${deadlineApproaching
                        ? 'border-yellow-500/30 bg-yellow-500/5 hover:border-yellow-500/50'
                        : 'border-white/10 bg-white/[0.02] hover:border-orange-500/40'
                    }`}
            >
                <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${deadlineApproaching ? 'bg-yellow-500/20' : 'bg-orange-500/20'
                        }`}>
                        {deadlineApproaching ? (
                            <AlertCircle className="w-5 h-5 text-yellow-400" />
                        ) : (
                            <Clock className="w-5 h-5 text-orange-400" />
                        )}
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-white">
                            {feedback.type === 'session' ? 'Session Feedback Pending' : 'Final Feedback Pending'}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            {deadlineApproaching
                                ? 'Deadline approaching! Please submit your feedback soon.'
                                : 'Click to submit your feedback'}
                        </p>
                        {feedback.feedbackDeadline && (
                            <p className="text-xs text-gray-500 mt-2">
                                Due by {formatDate(feedback.feedbackDeadline)}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {feedback.type === 'session' ? 'Session Feedback' : 'Final Feedback'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                        {formatDate(feedback.createdAt)}
                    </p>
                </div>
                <RatingStars rating={feedback.rating} size="sm" />
            </div>
            {feedback.comment && (
                <p className="text-sm text-gray-300 leading-relaxed">
                    {feedback.comment}
                </p>
            )}
            {!feedback.comment && (
                <p className="text-sm text-gray-500 italic">No comment provided</p>
            )}
        </div>
    );
}
