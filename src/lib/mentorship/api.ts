import { API_URL } from '@/lib/api';
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

// ============ Helper Functions ============

const authHeaders = (token: string) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
});

const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw error;
    }
    return response.json();
};

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

        const response = await fetch(`${API_URL}/api/mentors?${searchParams}`);
        return handleResponse(response);
    },

    getById: async (id: string): Promise<MentorProfile> => {
        const response = await fetch(`${API_URL}/api/mentors/${id}`);
        return handleResponse(response);
    },

    getFeatured: async (limit = 6): Promise<MentorProfile[]> => {
        const response = await fetch(`${API_URL}/api/mentors/featured?limit=${limit}`);
        return handleResponse(response);
    },

    getMyProfile: async (token: string): Promise<MentorProfile> => {
        const response = await fetch(`${API_URL}/api/mentors/me`, {
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    register: async (data: MentorRegistrationData, token: string): Promise<MentorProfile> => {
        const response = await fetch(`${API_URL}/api/mentors/register`, {
            method: 'POST',
            headers: authHeaders(token),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    updateProfile: async (data: Partial<MentorRegistrationData>, token: string): Promise<MentorProfile> => {
        const response = await fetch(`${API_URL}/api/mentors/me`, {
            method: 'PATCH',
            headers: authHeaders(token),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    pause: async (token: string): Promise<MentorProfile> => {
        const response = await fetch(`${API_URL}/api/mentors/me/pause`, {
            method: 'POST',
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    resume: async (token: string): Promise<MentorProfile> => {
        const response = await fetch(`${API_URL}/api/mentors/me/resume`, {
            method: 'POST',
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },
};


// ============ Request API ============

export const requestApi = {
    create: async (data: RequestFormData, token: string): Promise<MentorshipRequest> => {
        const response = await fetch(`${API_URL}/api/mentorship-requests`, {
            method: 'POST',
            headers: authHeaders(token),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    getMyRequests: async (token: string): Promise<MentorshipRequest[]> => {
        const response = await fetch(`${API_URL}/api/mentorship-requests/me`, {
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    getById: async (id: string, token: string): Promise<MentorshipRequest> => {
        const response = await fetch(`${API_URL}/api/mentorship-requests/${id}`, {
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    getMatches: async (id: string, token: string): Promise<MentorProfile[]> => {
        const response = await fetch(`${API_URL}/api/mentorship-requests/${id}/matches`, {
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    selectMentor: async (requestId: string, mentorId: string, token: string): Promise<MentorshipRequest> => {
        const response = await fetch(`${API_URL}/api/mentorship-requests/${requestId}/select/${mentorId}`, {
            method: 'POST',
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    cancel: async (id: string, token: string): Promise<void> => {
        const response = await fetch(`${API_URL}/api/mentorship-requests/${id}`, {
            method: 'DELETE',
            headers: authHeaders(token),
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Request failed' }));
            throw error;
        }
    },

    getIncoming: async (token: string): Promise<MentorshipRequest[]> => {
        const response = await fetch(`${API_URL}/api/mentors/me/requests`, {
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    accept: async (requestId: string, token: string): Promise<Mentorship> => {
        const response = await fetch(`${API_URL}/api/mentors/me/requests/${requestId}/accept`, {
            method: 'POST',
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    decline: async (requestId: string, token: string): Promise<void> => {
        const response = await fetch(`${API_URL}/api/mentors/me/requests/${requestId}/decline`, {
            method: 'POST',
            headers: authHeaders(token),
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Request failed' }));
            throw error;
        }
    },
};

// ============ Mentorship API ============

export const mentorshipApi = {
    getMyMentorships: async (token: string): Promise<Mentorship[]> => {
        const response = await fetch(`${API_URL}/api/mentorships`, {
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    getById: async (id: string, token: string): Promise<Mentorship> => {
        const response = await fetch(`${API_URL}/api/mentorships/${id}`, {
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    pause: async (id: string, reason: string, token: string): Promise<Mentorship> => {
        const response = await fetch(`${API_URL}/api/mentorships/${id}/pause`, {
            method: 'POST',
            headers: authHeaders(token),
            body: JSON.stringify({ reason }),
        });
        return handleResponse(response);
    },

    resume: async (id: string, token: string): Promise<Mentorship> => {
        const response = await fetch(`${API_URL}/api/mentorships/${id}/resume`, {
            method: 'POST',
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    complete: async (id: string, token: string): Promise<Mentorship> => {
        const response = await fetch(`${API_URL}/api/mentorships/${id}/complete`, {
            method: 'POST',
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    extend: async (id: string, months: number, token: string): Promise<Mentorship> => {
        const response = await fetch(`${API_URL}/api/mentorships/${id}/extend`, {
            method: 'POST',
            headers: authHeaders(token),
            body: JSON.stringify({ months }),
        });
        return handleResponse(response);
    },

    submitFinalFeedback: async (
        id: string,
        rating: number,
        comment: string,
        token: string
    ): Promise<Mentorship> => {
        const response = await fetch(`${API_URL}/api/mentorships/${id}/feedback`, {
            method: 'POST',
            headers: authHeaders(token),
            body: JSON.stringify({ rating, comment }),
        });
        return handleResponse(response);
    },

    getDashboard: async (token: string): Promise<MentorshipDashboardData> => {
        const [mentorships, pendingRequests, incomingRequests] = await Promise.all([
            mentorshipApi.getMyMentorships(token),
            requestApi.getMyRequests(token),
            requestApi.getIncoming(token).catch(() => []),
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
    getByMentorship: async (mentorshipId: string, token: string): Promise<Session[]> => {
        const response = await fetch(`${API_URL}/api/mentorships/${mentorshipId}/sessions`, {
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    getUpcoming: async (token: string): Promise<Session[]> => {
        const response = await fetch(`${API_URL}/api/sessions/upcoming`, {
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    getById: async (id: string, token: string): Promise<Session> => {
        const response = await fetch(`${API_URL}/api/sessions/${id}`, {
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    create: async (data: SessionFormData, token: string): Promise<Session> => {
        const response = await fetch(`${API_URL}/api/mentorships/${data.mentorshipId}/sessions`, {
            method: 'POST',
            headers: authHeaders(token),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    reschedule: async (id: string, scheduledAt: string, token: string): Promise<Session> => {
        const response = await fetch(`${API_URL}/api/sessions/${id}`, {
            method: 'PATCH',
            headers: authHeaders(token),
            body: JSON.stringify({ scheduledAt }),
        });
        return handleResponse(response);
    },

    cancel: async (id: string, reason: string, token: string): Promise<Session> => {
        const response = await fetch(`${API_URL}/api/sessions/${id}`, {
            method: 'DELETE',
            headers: authHeaders(token),
            body: JSON.stringify({ reason }),
        });
        return handleResponse(response);
    },

    complete: async (id: string, notes: string, actualDuration?: number, token?: string): Promise<Session> => {
        const response = await fetch(`${API_URL}/api/sessions/${id}/complete`, {
            method: 'POST',
            headers: authHeaders(token || ''),
            body: JSON.stringify({ notes, actualDuration }),
        });
        return handleResponse(response);
    },

    addNotes: async (id: string, notes: string, token: string): Promise<Session> => {
        const response = await fetch(`${API_URL}/api/sessions/${id}/notes`, {
            method: 'POST',
            headers: authHeaders(token),
            body: JSON.stringify({ notes }),
        });
        return handleResponse(response);
    },
};

// ============ Message API ============

export const messageApi = {
    getMessages: async (
        mentorshipId: string,
        page = 1,
        limit = 50,
        token: string
    ): Promise<PaginatedResponse<Message>> => {
        const response = await fetch(
            `${API_URL}/api/mentorships/${mentorshipId}/messages?page=${page}&limit=${limit}`,
            { headers: authHeaders(token) }
        );
        return handleResponse(response);
    },

    send: async (
        mentorshipId: string,
        content: string,
        contentType: string,
        codeLanguage: string | undefined,
        token: string
    ): Promise<Message> => {
        const response = await fetch(`${API_URL}/api/mentorships/${mentorshipId}/messages`, {
            method: 'POST',
            headers: authHeaders(token),
            body: JSON.stringify({ content, contentType, codeLanguage }),
        });
        return handleResponse(response);
    },

    sendFile: async (mentorshipId: string, file: File, token: string): Promise<Message> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_URL}/api/mentorships/${mentorshipId}/messages/file`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        return handleResponse(response);
    },

    markAsRead: async (mentorshipId: string, token: string): Promise<void> => {
        const response = await fetch(`${API_URL}/api/mentorships/${mentorshipId}/messages/read`, {
            method: 'POST',
            headers: authHeaders(token),
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Request failed' }));
            throw error;
        }
    },

    getUnreadCount: async (mentorshipId: string, token: string): Promise<number> => {
        const response = await fetch(`${API_URL}/api/mentorships/${mentorshipId}/messages/unread`, {
            headers: authHeaders(token),
        });
        const data = await handleResponse<{ count: number }>(response);
        return data.count;
    },
};

// ============ Feedback API ============

export const feedbackApi = {
    submit: async (data: FeedbackFormData, token: string): Promise<Feedback> => {
        const response = await fetch(`${API_URL}/api/sessions/${data.sessionId}/feedback`, {
            method: 'POST',
            headers: authHeaders(token),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    getByMentorship: async (mentorshipId: string, token: string): Promise<Feedback[]> => {
        const response = await fetch(`${API_URL}/api/mentorships/${mentorshipId}/feedback`, {
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },

    getPending: async (token: string): Promise<Session[]> => {
        const response = await fetch(`${API_URL}/api/feedback/pending`, {
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },
};

// ============ Notification API ============

export const notificationApi = {
    getCounts: async (token: string): Promise<NotificationCounts> => {
        const response = await fetch(`${API_URL}/api/mentorship/notifications/counts`, {
            headers: authHeaders(token),
        });
        return handleResponse(response);
    },
};
