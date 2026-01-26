/**
 * API Response Type Definitions
 * 
 * Centralized type definitions for all API responses.
 * 
 * Requirements: 8.2
 */

// ============================================
// Base Types
// ============================================

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: ApiError;
    timestamp?: string;
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    requestId?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: PaginationMeta;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore?: boolean;
    nextCursor?: string;
}

// ============================================
// User Types
// ============================================

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar: string | null;
    role: 'user' | 'admin';
    provider?: 'local' | 'google' | 'github';
    isVerified?: boolean;
    isPublic?: boolean;
    stats?: UserStats;
    bookmarks?: UserBookmarks;
    progress?: UserProgress;
    contributionStats?: ContributionStats;
    mentorshipStats?: MentorshipStats;
    isMentor?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserStats {
    eventsAttended: number;
    challengesSolved: number;
    points: number;
}

export interface UserBookmarks {
    roadmaps: string[];
    cheatsheets: string[];
    tools: string[];
}

export interface UserProgress {
    roadmaps: RoadmapProgress[];
}

export interface RoadmapProgress {
    roadmapId: string;
    completedSteps: string[];
    percent: number;
}

export interface ContributionStats {
    resourcesSubmitted: number;
    resourcesApproved: number;
    discussionsCreated: number;
    repliesPosted: number;
    helpfulVotes: number;
}

export interface MentorshipStats {
    asMentor: MentorStats;
    asMentee: MenteeStats;
}

export interface MentorStats {
    totalMentorships: number;
    activeMentorships: number;
    completedMentorships: number;
    totalSessionsCompleted: number;
    totalHoursMentored: number;
    averageRating: number;
}

export interface MenteeStats {
    totalMentorships: number;
    activeMentorships: number;
    completedMentorships: number;
    totalSessionsAttended: number;
    totalHoursLearned: number;
}

// ============================================
// Auth Types
// ============================================

export interface AuthResponse {
    success: boolean;
    data: User;
    token: string;
    refreshToken?: string;
    expiresIn?: number;
    requiresVerification?: boolean;
}

export interface TokenRefreshResponse {
    success: boolean;
    token: string;
    refreshToken: string;
    expiresIn: number;
}

// ============================================
// Challenge Types
// ============================================

export interface Challenge {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: ChallengeCategory;
    difficulty: ChallengeDifficulty;
    basePoints: number;
    currentPoints?: number;
    solves: number;
    firstBlood?: string;
    hints?: ChallengeHint[];
    files?: ChallengeFile[];
    status: 'draft' | 'active' | 'archived';
    author?: Pick<User, 'id' | 'username' | 'avatar'>;
    createdAt: string;
    updatedAt: string;
}

export type ChallengeCategory = 
    | 'web' 
    | 'crypto' 
    | 'forensics' 
    | 'pwn' 
    | 'reverse' 
    | 'misc' 
    | 'osint';

export type ChallengeDifficulty = 
    | 'easy' 
    | 'medium' 
    | 'hard' 
    | 'insane';

export interface ChallengeHint {
    id: string;
    text: string;
    pointsDeduction: number;
    unlocked?: boolean;
}

export interface ChallengeFile {
    filename: string;
    url: string;
    size?: number;
}

export interface FlagSubmissionResponse {
    success: boolean;
    correct: boolean;
    message: string;
    pointsAwarded?: number;
    newTotal?: number;
}

// ============================================
// Event Types
// ============================================

export interface Event {
    id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription?: string;
    image?: string;
    startDate: string;
    endDate: string;
    location?: string;
    isVirtual: boolean;
    virtualLink?: string;
    category: EventCategory;
    maxAttendees?: number;
    currentAttendees: number;
    requiresApproval: boolean;
    status: 'draft' | 'published' | 'cancelled';
    organizer?: string;
    speakers?: EventSpeaker[];
    createdAt: string;
    updatedAt: string;
}

export type EventCategory = 
    | 'ctf' 
    | 'workshop' 
    | 'meetup' 
    | 'webinar' 
    | 'conference' 
    | 'hackathon' 
    | 'other';

export interface EventSpeaker {
    name: string;
    title?: string;
    bio?: string;
    avatar?: string;
}

// ============================================
// Mentorship Types
// ============================================

export interface MentorProfile {
    id: string;
    user: Pick<User, 'id' | 'username' | 'avatar' | 'name'>;
    expertiseAreas: string[];
    bio: string;
    availability: string;
    maxMentees: number;
    currentMentees: number;
    rating: number;
    totalReviews: number;
    completedMentorships: number;
    isVerified: boolean;
    isFeatured: boolean;
    isPaused: boolean;
    createdAt: string;
}

export interface Mentorship {
    id: string;
    mentor: Pick<User, 'id' | 'username' | 'avatar' | 'name'>;
    mentee: Pick<User, 'id' | 'username' | 'avatar' | 'name'>;
    mentorProfile: Pick<MentorProfile, 'id' | 'expertiseAreas' | 'rating'>;
    status: MentorshipStatus;
    startDate: string;
    expectedEndDate: string;
    actualEndDate?: string;
    totalHours: number;
    sessionsCompleted: number;
    pauseReason?: string;
    createdAt: string;
}

export type MentorshipStatus = 
    | 'active' 
    | 'paused' 
    | 'completed' 
    | 'terminated';

export interface MentorshipRequest {
    id: string;
    mentor: Pick<User, 'id' | 'username' | 'avatar'>;
    mentee: Pick<User, 'id' | 'username' | 'avatar'>;
    message: string;
    goals: string[];
    status: 'pending' | 'accepted' | 'declined' | 'cancelled';
    createdAt: string;
}

export interface Session {
    id: string;
    mentorship: string;
    scheduledAt: string;
    duration: number;
    status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
    notes?: string;
    feedback?: SessionFeedback;
}

export interface SessionFeedback {
    rating: number;
    comment?: string;
}

// ============================================
// Blog Types
// ============================================

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    coverImage?: string;
    author: Pick<User, 'id' | 'username' | 'avatar' | 'name'>;
    tags: string[];
    category?: string;
    status: 'draft' | 'published' | 'archived';
    views: number;
    likes: number;
    commentsCount: number;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
}

// ============================================
// Forum Types
// ============================================

export interface Discussion {
    id: string;
    title: string;
    content: string;
    author: Pick<User, 'id' | 'username' | 'avatar'>;
    category: string;
    tags: string[];
    views: number;
    repliesCount: number;
    upvotes: number;
    downvotes: number;
    isPinned: boolean;
    isLocked: boolean;
    acceptedAnswer?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Reply {
    id: string;
    content: string;
    author: Pick<User, 'id' | 'username' | 'avatar'>;
    upvotes: number;
    downvotes: number;
    isAccepted: boolean;
    createdAt: string;
    updatedAt: string;
}

// ============================================
// Notification Types
// ============================================

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    link?: string;
    read: boolean;
    createdAt: string;
}

export type NotificationType = 
    | 'system'
    | 'achievement'
    | 'mention'
    | 'reply'
    | 'follow'
    | 'mentorship'
    | 'event'
    | 'challenge';

// ============================================
// Health Check Types
// ============================================

export interface HealthCheckResponse {
    status: 'healthy' | 'degraded' | 'unhealthy';
    timestamp: string;
    version: string;
    uptime: number;
    environment: string;
    dependencies: {
        database: DependencyStatus;
        redis: DependencyStatus;
    };
}

export interface DependencyStatus {
    status: 'up' | 'down';
    responseTime: number;
    error?: string;
}
