'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import type { Mentorship } from '@/lib/mentorship/types';

interface MentorshipCardProps {
    mentorship: Mentorship;
    role: 'mentor' | 'mentee';
    onAction?: (action: 'message' | 'schedule' | 'view') => void;
}

export function MentorshipCard({ mentorship, role, onAction }: MentorshipCardProps) {
    const partner = role === 'mentor' ? mentorship.mentee : mentorship.mentor;
    const isActive = mentorship.status === 'active';

    // Calculate days remaining
    const endDate = new Date(mentorship.expectedEndDate);
    const now = new Date();
    const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    // Format start date
    const startDate = new Date(mentorship.startDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <Card
            className="hover:shadow-md transition-shadow"
            role="article"
            aria-label={`Mentorship with ${partner.name}`}
        >
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                        {partner.avatar ? (
                            <Image
                                src={partner.avatar}
                                alt={`${partner.name}'s avatar`}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                                unoptimized
                            />
                        ) : (
                            <span className="text-sm font-semibold text-muted-foreground" aria-hidden="true">
                                {partner.name.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm truncate">{partner.name}</h3>
                            <StatusBadge status={mentorship.status} size="sm" />
                        </div>

                        <p className="text-xs text-muted-foreground mb-2">
                            {role === 'mentor' ? 'Mentee' : 'Mentor'} • Started {startDate}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span aria-label={`${mentorship.sessionsCompleted} sessions completed`}>
                                {mentorship.sessionsCompleted} session{mentorship.sessionsCompleted !== 1 ? 's' : ''}
                            </span>
                            <span aria-label={`${mentorship.totalHours} total hours`}>
                                {mentorship.totalHours}h total
                            </span>
                            {isActive && (
                                <span
                                    className={daysRemaining <= 7 ? 'text-yellow-600' : ''}
                                    aria-label={`${daysRemaining} days remaining`}
                                >
                                    {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left
                                </span>
                            )}
                        </div>

                        {/* Pause reason if paused */}
                        {mentorship.status === 'paused' && mentorship.pauseReason && (
                            <p className="text-xs text-yellow-600 mt-2 italic">
                                Paused: {mentorship.pauseReason}
                            </p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                {isActive && (
                    <div className="flex gap-2 mt-4 pt-3 border-t" role="group" aria-label="Mentorship actions">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => onAction?.('message')}
                            aria-label={`Send message to ${partner.name}`}
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Message
                        </Button>
                        {role === 'mentor' && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => onAction?.('schedule')}
                                aria-label="Schedule a session"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Schedule
                            </Button>
                        )}
                        <Link href={`/mentorship/${mentorship._id}`}>
                            <Button variant="default" size="sm" aria-label={`View mentorship details with ${partner.name}`}>
                                View
                            </Button>
                        </Link>
                    </div>
                )}

                {!isActive && (
                    <div className="mt-4 pt-3 border-t">
                        <Link href={`/mentorship/${mentorship._id}`}>
                            <Button variant="outline" size="sm" className="w-full" aria-label={`View mentorship details with ${partner.name}`}>
                                View Details
                            </Button>
                        </Link>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
