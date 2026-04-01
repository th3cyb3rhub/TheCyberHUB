'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import { isUpcomingSoon } from '@/hooks/useSessions';
import type { Session } from '@/lib/mentorship/types';

interface SessionCardProps {
    session: Session;
    onComplete?: () => void;
    onCancel?: () => void;
    onReschedule?: () => void;
    onAddNotes?: () => void;
    onFeedback?: () => void;
    showActions?: boolean;
    isMentor?: boolean;
}

export function SessionCard({
    session,
    onComplete,
    onCancel,
    onReschedule,
    onAddNotes,
    showActions = true,
    isMentor = false,
}: SessionCardProps) {
    const scheduledAt = new Date(session.scheduledAt);
    const isUpcoming = session.status === 'scheduled' && scheduledAt > new Date();
    const upcomingSoon = isUpcomingSoon(session);

    // Format date and time
    const dateStr = scheduledAt.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
    const timeStr = scheduledAt.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    });

    // Format duration
    const hours = Math.floor(session.duration / 60);
    const minutes = session.duration % 60;
    const durationStr = hours > 0
        ? `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`
        : `${minutes}m`;

    return (
        <Card
            className={`hover:shadow-md transition-shadow ${upcomingSoon ? 'border-yellow-500/50 bg-yellow-500/5' : ''}`}
            role="article"
            aria-label={`Session: ${session.title}`}
        >
            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        {/* Title and Status */}
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm truncate">{session.title}</h3>
                            <StatusBadge status={session.status} size="sm" />
                            {upcomingSoon && (
                                <span
                                    className="text-xs bg-yellow-500/20 text-yellow-600 px-1.5 py-0.5 rounded"
                                    aria-label="Session starting soon"
                                >
                                    Soon
                                </span>
                            )}
                        </div>

                        {/* Date, Time, Duration */}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                            <span className="flex items-center gap-1" aria-label={`Date: ${dateStr}`}>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {dateStr}
                            </span>
                            <span className="flex items-center gap-1" aria-label={`Time: ${timeStr}`}>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {timeStr}
                            </span>
                            <span aria-label={`Duration: ${durationStr}`}>{durationStr}</span>
                        </div>

                        {/* Description */}
                        {session.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {session.description}
                            </p>
                        )}

                        {/* Notes (for completed sessions) */}
                        {session.status === 'completed' && session.notes && (
                            <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                                <span className="font-medium">Notes: </span>
                                <span className="text-muted-foreground">{session.notes}</span>
                            </div>
                        )}

                        {/* Cancel reason */}
                        {session.status === 'cancelled' && session.cancelReason && (
                            <p className="text-xs text-red-600 mt-2" role="alert">
                                Cancelled: {session.cancelReason}
                            </p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                {showActions && isUpcoming && (
                    <div className="flex gap-2 mt-4 pt-3 border-t" role="group" aria-label="Session actions">
                        {isMentor && (
                            <Button
                                variant="default"
                                size="sm"
                                onClick={onComplete}
                                aria-label="Mark session as complete"
                            >
                                Complete
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onReschedule}
                            aria-label="Reschedule this session"
                        >
                            Reschedule
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onCancel}
                            aria-label="Cancel this session"
                        >
                            Cancel
                        </Button>
                    </div>
                )}

                {showActions && session.status === 'completed' && isMentor && !session.notes && (
                    <div className="mt-4 pt-3 border-t">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={onAddNotes}
                            aria-label="Add notes to this session"
                        >
                            Add Notes
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
