// Mentorship Program TypeScript Interfaces

// ============ Enums & Constants ============

export type ExpertiseArea =
    | 'web-security'
    | 'network-security'
    | 'malware-analysis'
    | 'forensics'
    | 'osint'
    | 'cryptography'
    | 'reverse-engineering'
    | 'cloud-security'
    | 'mobile-security'
    | 'career-guidance'
    | 'ctf-training'
    | 'pentesting';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export type MentorshipStatus = 'active' | 'paused' | 'completed' | 'terminated';

export type RequestStatus = 'pending' | 'matched' | 'accepted' | 'expired' | 'cancelled';

export type SessionStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';

export type MessageContentType = 'text' | 'code' | 'file';

export type FeedbackType = 'session' | 'final';

export type MentorSortOption = 'relevance' | 'rating' | 'experience';

// ============ User Types ============

export interface UserSummary {
    _id: string;
    name: string;
    username: string;
    avatar: string | null;
}

// ============ Mentor Types ============

export interface PreferredTime {
    dayOfWeek: number; // 0-6 (Sunday-Saturday)
    startHour: number; // 0-23
    endHour: number; // 0-23
}

export interface MentorAvailability {
    hoursPerWeek: number;
    preferredTimes: PreferredTime[];
    timezone: string;
}

export interface MentorReview {
    mentee: UserSummary;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface MentorProfile {
    _id: string;
    user: UserSummary;
    expertiseAreas: ExpertiseArea[];
    bio: string;
    videoIntroUrl?: string;
    availability: MentorAvailability;
    maxMentees: number;
    currentMenteeCount: number;
    isPaused: boolean;
    rating: number;
    totalRatings: number;
    completedMentorships: number;
    totalSessionsCompleted: number;
    isVerified: boolean;
    isFeatured: boolean;
    reviews?: MentorReview[];
    createdAt: string;
    updatedAt?: string;
}


// ============ Mentorship Request Types ============

export interface MatchedMentor {
    mentor: MentorProfile;
    matchScore: number;
    respondedAt?: string;
    response: 'pending' | 'accepted' | 'declined';
}

export interface MentorshipRequest {
    _id: string;
    mentee: UserSummary;
    expertiseAreas: ExpertiseArea[];
    goals: string;
    skillLevel: SkillLevel;
    status: RequestStatus;
    matchedMentors: MatchedMentor[];
    selectedMentor?: string;
    expiresAt: string;
    createdAt: string;
    updatedAt?: string;
}

// ============ Mentorship Types ============

export interface Extension {
    extendedAt: string;
    extendedBy: number; // months
    newEndDate: string;
}

export interface FinalFeedback {
    mentorRating?: number;
    mentorComment?: string;
    menteeRating?: number;
    menteeComment?: string;
}

export interface Mentorship {
    _id: string;
    mentor: UserSummary;
    mentee: UserSummary;
    mentorProfile: MentorProfile;
    request?: string;
    status: MentorshipStatus;
    pauseReason?: string;
    pausedBy?: string;
    pausedAt?: string;
    channel: string;
    startDate: string;
    expectedEndDate: string;
    actualEndDate?: string;
    extensions: Extension[];
    totalHours: number;
    sessionsCompleted: number;
    finalFeedback?: FinalFeedback;
    createdAt: string;
    updatedAt?: string;
}

// ============ Session Types ============

export interface Session {
    _id: string;
    mentorship: string;
    title: string;
    description?: string;
    agenda?: string;
    scheduledAt: string;
    duration: number; // minutes
    status: SessionStatus;
    cancelledBy?: string;
    cancelReason?: string;
    notes?: string;
    actualDuration?: number;
    createdBy: string;
    createdAt: string;
    updatedAt?: string;
}

// ============ Message Types ============

export interface FileAttachment {
    filename: string;
    url: string;
    size: number;
    mimeType: string;
}

export interface Message {
    _id: string;
    channel: string;
    sender: UserSummary;
    content: string;
    contentType: MessageContentType;
    codeLanguage?: string;
    attachment?: FileAttachment;
    isRead: boolean;
    readAt?: string;
    createdAt: string;
}

export interface MessageChannel {
    _id: string;
    mentorship: string;
    participants: string[];
    lastMessageAt?: string;
    messageCount: number;
    createdAt: string;
}

// ============ Feedback Types ============

export interface Feedback {
    _id: string;
    mentorship: string;
    session?: string;
    fromUser: string;
    toUser: string;
    type: FeedbackType;
    rating: number;
    comment?: string;
    isAnonymous: boolean;
    feedbackDeadline?: string;
    createdAt: string;
}

// ============ API Response Types ============

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: PaginationInfo;
}

export interface ApiError {
    error: string;
    code?: number;
    details?: Record<string, string>;
}

// ============ Search & Filter Types ============

export interface MentorSearchParams {
    expertise?: ExpertiseArea[];
    minRating?: number;
    available?: boolean;
    search?: string;
    sort?: MentorSortOption;
    page?: number;
    limit?: number;
}

// ============ Form Data Types ============

export interface MentorRegistrationData {
    expertiseAreas: ExpertiseArea[];
    bio: string;
    availability: MentorAvailability;
    maxMentees: number;
}

export interface RequestFormData {
    mentorId?: string;
    expertiseAreas: ExpertiseArea[];
    goals: string;
    skillLevel: SkillLevel;
}

export interface SessionFormData {
    mentorshipId: string;
    title: string;
    description?: string;
    agenda?: string;
    scheduledAt: string;
    duration: number;
}

export interface FeedbackFormData {
    mentorshipId: string;
    sessionId?: string;
    type: FeedbackType;
    rating: number;
    comment?: string;
}

export interface MessageFormData {
    content: string;
    contentType: MessageContentType;
    codeLanguage?: string;
}

// ============ Dashboard Types ============

export interface MentorshipDashboardData {
    asMentor: Mentorship[];
    asMentee: Mentorship[];
    pendingRequests: MentorshipRequest[];
    incomingRequests: MentorshipRequest[];
}

export interface NotificationCounts {
    pendingRequests: number;
    unreadMessages: number;
    pendingFeedback: number;
}
