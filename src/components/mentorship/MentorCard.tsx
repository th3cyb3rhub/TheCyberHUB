'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RatingStars } from './RatingStars';
import { ExpertiseBadge } from './ExpertiseBadge';
import type { MentorProfile } from '@/lib/mentorship/types';

interface MentorCardProps {
    mentor: MentorProfile;
    onClick?: () => void;
    featured?: boolean;
}

export function MentorCard({ mentor, onClick, featured }: MentorCardProps) {
    const isAvailable = !mentor.isPaused && mentor.currentMenteeCount < mentor.maxMentees;
    const displayedExpertise = mentor.expertiseAreas.slice(0, 3);
    const remainingCount = mentor.expertiseAreas.length - 3;

    const content = (
        <Card
            className={`group cursor-pointer hover:shadow-md transition-shadow h-full ${featured ? 'ring-2 ring-orange-500/30' : ''}`}
            role="article"
            aria-label={`Mentor profile: ${mentor.user.name}`}
        >
            <CardContent className="p-4">
                {/* Header with Avatar and Status */}
                <div className="flex items-start gap-3 mb-3">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                            {mentor.user.avatar ? (
                                <Image
                                    src={mentor.user.avatar}
                                    alt={`${mentor.user.name}'s avatar`}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                            ) : (
                                <span className="text-lg font-semibold text-muted-foreground" aria-hidden="true">
                                    {mentor.user.name.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                        {mentor.isVerified && (
                            <div
                                className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                                title="Verified mentor"
                                aria-label="Verified mentor"
                            >
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                            {mentor.user.name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">@{mentor.user.username}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span
                            className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}
                            aria-hidden="true"
                        />
                        <Badge
                            variant={isAvailable ? 'default' : 'secondary'}
                            className="text-xs"
                            aria-label={isAvailable ? 'Mentor is available' : 'Mentor is unavailable'}
                        >
                            {isAvailable ? 'Available' : 'Unavailable'}
                        </Badge>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <RatingStars rating={mentor.rating} size="sm" />
                    <span className="text-xs text-muted-foreground">
                        ({mentor.totalRatings} review{mentor.totalRatings !== 1 ? 's' : ''})
                    </span>
                </div>

                {/* Expertise Areas */}
                <div className="flex flex-wrap gap-1 mb-3" role="list" aria-label="Expertise areas">
                    {displayedExpertise.map((area) => (
                        <ExpertiseBadge key={area} area={area} size="sm" />
                    ))}
                    {remainingCount > 0 && (
                        <Badge variant="outline" className="text-xs" aria-label={`${remainingCount} more expertise areas`}>
                            +{remainingCount} more
                        </Badge>
                    )}
                </div>

                {/* Video Intro indicator */}
                {mentor.videoIntroUrl && (
                    <div className="flex items-center gap-1.5 text-xs text-blue-400 mb-2">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        Video Intro
                    </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span aria-label={`${mentor.completedMentorships} completed mentorships`}>
                        {mentor.completedMentorships} mentorship{mentor.completedMentorships !== 1 ? 's' : ''}
                    </span>
                    <span aria-label={`${mentor.availability.hoursPerWeek} hours available per week`}>
                        {mentor.availability.hoursPerWeek}h/week
                    </span>
                </div>
            </CardContent>
        </Card>
    );

    if (onClick) {
        return (
            <button
                onClick={onClick}
                className="w-full text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                aria-label={`View ${mentor.user.name}'s profile`}
            >
                {content}
            </button>
        );
    }

    return (
        <Link
            href={`/mentorship/mentor/${mentor._id}`}
            className="block focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
            aria-label={`View ${mentor.user.name}'s profile`}
        >
            {content}
        </Link>
    );
}
