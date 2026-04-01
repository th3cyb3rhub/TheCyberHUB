import { fetchApi } from '@/lib/api';
import type {
    MentorProfile,
    MentorSearchParams,
    MentorRegistrationData,
    MentorshipRequest,
    RequestFormData,
    Mentorship,
    Session,
    SessionFormData,
    Message,
    Feedback,
    FeedbackFormData,
    PaginatedResponse,
    MentorshipDashboardData,
    NotificationCounts,
} from './types';

// ============ Mentor API ============

export const mentorApi = {
    search: async (params: MentorSearchParams): Promise<PaginatedResponse<MentorProfile>> => {
        const searchParams = new URLSearchParams();
        if (params.expertise?.length) searchParams.set('expertise', params.expertise.join(','));
        if (params.minRating) searchParams.set('minRating', params.minRating.toString());
        if (params.available !== undefined) searchParams.set('available', params.available.toString());
        if (params.search) searchParams.set('search', params.search);
        if (params.sort) searchParams.set('sort', params.sort);
        if (params.page) searchParams.set('page', params.page.toString());
        if (params.limit) searchParams.set('limit', params.limit.toString());

        return fetchApi(`/api/mentors?${searchParams}`, { requireAuth: false });
    },

    getById: async (id: string): Promise<MentorProfile> => {
        return fetchApi(`/api/mentors/${id}`, { requireAuth: false });
    },

    getFeatured: async (limit = 6): Promise<MentorProfile[]> => {
        return fetchApi(`/api/mentors/featured?limit=${limit}`, { requireAuth: false });
    },

    getMyProfile: async (): Promise<MentorProfile> => {
        return fetchApi('/api/mentors/me');
    },

    register: async (data: MentorRegistrationData): Promise<MentorProfile> => {
        return fetchApi('/api/mentors/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    updateProfile: async (data: Partial<MentorRegistrationData>): Promise<MentorProfile> => {
        return fetchApi('/api/mentors/me', {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    },

    pause: async (): Promise<MentorProfile> => {
        return fetchApi('/api/mentors/me/pause', { method: 'POST' });
    },

    resume: async (): Promise<MentorProfile> => {
        return fetchApi('/api/mentors/me/resume', { method: 'POST' });
    },
};


// ============ Request API ============

export const requestApi = {
    create: async (data: RequestFormData): Promise<MentorshipRequest> => {
        return fetchApi('/api/mentorship-requests', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    getMyRequests: async (): Promise<MentorshipRequest[]> => {
        return fetchApi('/api/mentorship-requests/me');
    },

    getById: async (id: string): Promise<MentorshipRequest> => {
        return fetchApi(`/api/mentorship-requests/${id}`);
    },

    getMatches: async (id: string): Promise<MentorProfile[]> => {
        return fetchApi(`/api/mentorship-requests/${id}/matches`);
    },

    selectMentor: async (requestId: string, mentorId: string): Promise<MentorshipRequest> => {
        return fetchApi(`/api/mentorship-requests/${requestId}/select/${mentorId}`, {
            method: 'POST',
        });
    },

    cancel: async (id: string): Promise<void> => {
        await fetchApi(`/api/mentorship-requests/${id}`, {
            method: 'DELETE',
        });
    },

    getIncoming: async (): Promise<MentorshipRequest[]> => {
        return fetchApi('/api/mentors/me/requests');
    },

    accept: async (requestId: string): Promise<Mentorship> => {
        return fetchApi(`/api/mentors/me/requests/${requestId}/accept`, {
            method: 'POST',
        });
    },

    decline: async (requestId: string): Promise<void> => {
        await fetchApi(`/api/mentors/me/requests/${requestId}/decline`, {
            method: 'POST',
        });
    },
};

// ============ Mentorship API ============

export const mentorshipApi = {
    getMyMentorships: async (): Promise<Mentorship[]> => {
        return fetchApi('/api/mentorships');
    },

    getById: async (id: string): Promise<Mentorship> => {
        return fetchApi(`/api/mentorships/${id}`);
    },

    pause: async (id: string, reason: string): Promise<Mentorship> => {
        return fetchApi(`/api/mentorships/${id}/pause`, {
            method: 'POST',
            body: JSON.stringify({ reason }),
        });
    },

    resume: async (id: string): Promise<Mentorship> => {
        return fetchApi(`/api/mentorships/${id}/resume`, { method: 'POST' });
    },

    complete: async (id: string): Promise<Mentorship> => {
        return fetchApi(`/api/mentorships/${id}/complete`, { method: 'POST' });
    },

    extend: async (id: string, months: number): Promise<Mentorship> => {
        return fetchApi(`/api/mentorships/${id}/extend`, {
            method: 'POST',
            body: JSON.stringify({ months }),
        });
    },

    submitFinalFeedback: async (
        id: string,
        rating: number,
        comment: string
    ): Promise<Mentorship> => {
        return fetchApi(`/api/mentorships/${id}/feedback`, {
            method: 'POST',
            body: JSON.stringify({ rating, comment }),
        });
    },

    getDashboard: async (): Promise<MentorshipDashboardData> => {
        const [mentorships, pendingRequests, incomingRequests] = await Promise.all([
            mentorshipApi.getMyMentorships(),
            requestApi.getMyRequests(),
            requestApi.getIncoming().catch(() => []),
        ]);

        return {
            asMentor: mentorships.filter((m) => m.mentor._id === 'currentUser'),
            asMentee: mentorships.filter((m) => m.mentee._id === 'currentUser'),
            pendingRequests: pendingRequests.filter((r) => r.status === 'pending'),
            incomingRequests,
        };
    },
};


// ============ Session API ============

export const sessionApi = {
    getByMentorship: async (mentorshipId: string): Promise<Session[]> => {
        return fetchApi(`/api/mentorships/${mentorshipId}/sessions`);
    },

    getUpcoming: async (): Promise<Session[]> => {
        return fetchApi('/api/sessions/upcoming');
    },

    getById: async (id: string): Promise<Session> => {
        return fetchApi(`/api/sessions/${id}`);
    },

    create: async (data: SessionFormData): Promise<Session> => {
        return fetchApi(`/api/mentorships/${data.mentorshipId}/sessions`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    reschedule: async (id: string, scheduledAt: string): Promise<Session> => {
        return fetchApi(`/api/sessions/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ scheduledAt }),
        });
    },

    cancel: async (id: string, reason: string): Promise<Session> => {
        return fetchApi(`/api/sessions/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({ reason }),
        });
    },

    complete: async (id: string, notes: string, actualDuration?: number): Promise<Session> => {
        return fetchApi(`/api/sessions/${id}/complete`, {
            method: 'POST',
            body: JSON.stringify({ notes, actualDuration }),
        });
    },

    addNotes: async (id: string, notes: string): Promise<Session> => {
        return fetchApi(`/api/sessions/${id}/notes`, {
            method: 'POST',
            body: JSON.stringify({ notes }),
        });
    },
};

// ============ Message API ============

export const messageApi = {
    getMessages: async (
        mentorshipId: string,
        page = 1,
        limit = 50
    ): Promise<PaginatedResponse<Message>> => {
        return fetchApi(
            `/api/mentorships/${mentorshipId}/messages?page=${page}&limit=${limit}`
        );
    },

    send: async (
        mentorshipId: string,
        content: string,
        contentType: string,
        codeLanguage: string | undefined
    ): Promise<Message> => {
        return fetchApi(`/api/mentorships/${mentorshipId}/messages`, {
            method: 'POST',
            body: JSON.stringify({ content, contentType, codeLanguage }),
        });
    },

    sendFile: async (mentorshipId: string, file: File): Promise<Message> => {
        // 1. Upload file to S3 first
        const { uploadFile } = await import('@/lib/api');
        const fileUrl = await uploadFile(file, 'mentorship');

        // 2. Send the message payload
        return fetchApi(`/api/mentorships/${mentorshipId}/messages/file`, {
            method: 'POST',
            body: JSON.stringify({
                filename: file.name,
                url: fileUrl,
                size: file.size,
                mimeType: file.type || 'application/octet-stream',
            }),
        });
    },

    markAsRead: async (mentorshipId: string): Promise<void> => {
        await fetchApi(`/api/mentorships/${mentorshipId}/messages/read`, {
            method: 'POST',
        });
    },

    getUnreadCount: async (mentorshipId: string): Promise<number> => {
        const data = await fetchApi(`/api/mentorships/${mentorshipId}/messages/unread`);
        return data.count;
    },
};

// ============ Feedback API ============

export const feedbackApi = {
    submit: async (data: FeedbackFormData): Promise<Feedback> => {
        return fetchApi(`/api/sessions/${data.sessionId}/feedback`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    getByMentorship: async (mentorshipId: string): Promise<Feedback[]> => {
        return fetchApi(`/api/mentorships/${mentorshipId}/feedback`);
    },

    getPending: async (): Promise<Session[]> => {
        return fetchApi('/api/feedback/pending');
    },
};

// ============ Notification API ============

export const notificationApi = {
    getCounts: async (): Promise<NotificationCounts> => {
        return fetchApi('/api/mentorship/notifications/counts');
    },
};
