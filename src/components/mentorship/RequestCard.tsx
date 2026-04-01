'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from './StatusBadge';
import { ExpertiseBadge } from './ExpertiseBadge';
import type { MentorshipRequest } from '@/lib/mentorship/types';

interface RequestCardProps {
    request: MentorshipRequest;
    variant: 'outgoing' | 'incoming';
    onAccept?: () => void;
    onDecline?: () => void;
    onCancel?: () => void;
    loading?: boolean;
}

export function RequestCard({
    request,
    variant,
    onAccept,
    onDecline,
    onCancel,
    loading = false,
}: RequestCardProps) {
    const user = request.mentee;

    // Calculate days until expiry
    const expiresAt = new Date(request.expiresAt);
    const now = new Date();
    const daysUntilExpiry = Math.max(0, Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    // Format created date
    const createdDate = new Date(request.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });

    const skillLevelLabels = {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                        {user.avatar ? (
                            <Image src={user.avatar} alt={user.name} width={40} height={40} className="w-full h-full object-cover" unoptimized />
                        ) : (
                            <span className="text-sm font-semibold text-muted-foreground">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                            <StatusBadge status={request.status} size="sm" />
                        </div>

                        <p className="text-xs text-muted-foreground mb-2">
                            @{user.username} • {createdDate}
                        </p>

                        {/* Skill Level */}
                        <Badge variant="outline" className="text-xs mb-2">
                            {skillLevelLabels[request.skillLevel]}
                        </Badge>

                        {/* Expertise Areas */}
                        <div className="flex flex-wrap gap-1 mb-2">
                            {request.expertiseAreas.slice(0, 3).map((area) => (
                                <ExpertiseBadge key={area} area={area} size="sm" showIcon={false} />
                            ))}
                            {request.expertiseAreas.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{request.expertiseAreas.length - 3}
                                </Badge>
                            )}
                        </div>

                        {/* Goals Preview */}
                        <p className="text-xs text-muted-foreground line-clamp-2">
                            {request.goals}
                        </p>

                        {/* Expiry Warning */}
                        {request.status === 'pending' && daysUntilExpiry <= 3 && (
                            <p className="text-xs text-yellow-600 mt-2">
                                ⚠️ Expires in {daysUntilExpiry} day{daysUntilExpiry !== 1 ? 's' : ''}
                            </p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                {request.status === 'pending' && (
                    <div className="flex gap-2 mt-4 pt-3 border-t">
                        {variant === 'incoming' ? (
                            <>
                                <Button
                                    variant="default"
                                    size="sm"
                                    className="flex-1"
                                    onClick={onAccept}
                                    disabled={loading}
                                >
                                    Accept
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={onDecline}
                                    disabled={loading}
                                >
                                    Decline
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-full"
                                onClick={onCancel}
                                disabled={loading}
                            >
                                Cancel Request
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
