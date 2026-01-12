'use client';

import { Badge } from '@/components/ui/badge';
import type { MentorshipStatus, RequestStatus, SessionStatus } from '@/lib/mentorship/types';

type StatusType = MentorshipStatus | RequestStatus | SessionStatus;

interface StatusBadgeProps {
    status: StatusType;
    size?: 'sm' | 'md';
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
    // Mentorship statuses
    active: { label: 'Active', className: 'bg-green-500/10 text-green-600 border-green-500/20' },
    paused: { label: 'Paused', className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
    completed: { label: 'Completed', className: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    terminated: { label: 'Terminated', className: 'bg-red-500/10 text-red-600 border-red-500/20' },

    // Request statuses
    pending: { label: 'Pending', className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
    matched: { label: 'Matched', className: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    accepted: { label: 'Accepted', className: 'bg-green-500/10 text-green-600 border-green-500/20' },
    expired: { label: 'Expired', className: 'bg-gray-500/10 text-gray-600 border-gray-500/20' },
    cancelled: { label: 'Cancelled', className: 'bg-red-500/10 text-red-600 border-red-500/20' },

    // Session statuses
    scheduled: { label: 'Scheduled', className: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    'no-show': { label: 'No Show', className: 'bg-red-500/10 text-red-600 border-red-500/20' },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
    const config = statusConfig[status] || { label: status, className: '' };

    return (
        <Badge
            variant="outline"
            className={`${config.className} ${size === 'sm' ? 'text-xs px-1.5 py-0' : 'text-xs px-2 py-0.5'}`}
        >
            {config.label}
        </Badge>
    );
}
