import { API_URL } from '@/lib/api';
import type {
    Discussion,
    Reply,
    Category,
    SortOption,
    CategoryStats,
    PopularTag,
    CreateDiscussionData,
    CreateReplyData,
    PaginatedResponse,
} from '@/types/forum';

// Helper to get auth headers
function getAuthHeaders(): HeadersInit {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

// Discussions
export async function getDiscussions(params: {
    page?: number;
    limit?: number;
    category?: Category;
    tag?: string;
    sort?: SortOption;
    search?: string;
}): Promise<PaginatedResponse<Discussion>> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.category) searchParams.set('category', params.category);
    if (params.tag) searchParams.set('tag', params.tag);
    if (params.sort) searchParams.set('sortBy', params.sort);
    if (params.search) searchParams.set('search', params.search);

    try {
        const response = await fetch(`${API_URL}/api/forum/discussions?${searchParams}`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch discussions');
        }

        return response.json();
    } catch (error) {
        // Return empty result on network error
        console.error('Failed to fetch discussions:', error);
        return {
            success: false,
            data: [],
            pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
        };
    }
}

export async function getDiscussion(id: string): Promise<{ success: boolean; data: Discussion | null }> {
    try {
        const response = await fetch(`${API_URL}/api/forum/discussions/${id}`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch discussion');
        }

        return response.json();
    } catch (error) {
        console.error('Failed to fetch discussion:', error);
        throw error;
    }
}

export async function createDiscussion(data: CreateDiscussionData): Promise<{ success: boolean; data: Discussion }> {
    const response = await fetch(`${API_URL}/api/forum/discussions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to create discussion');
    }

    return response.json();
}

export async function updateDiscussion(
    id: string,
    data: Partial<CreateDiscussionData>
): Promise<{ success: boolean; data: Discussion }> {
    const response = await fetch(`${API_URL}/api/forum/discussions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to update discussion');
    }

    return response.json();
}

export async function deleteDiscussion(id: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_URL}/api/forum/discussions/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to delete discussion');
    }

    return response.json();
}

// Replies
export async function getReplies(
    discussionId: string,
    params?: { threaded?: boolean; page?: number; limit?: number }
): Promise<{ success: boolean; data: Reply[] }> {
    try {
        const searchParams = new URLSearchParams();
        if (params?.threaded) searchParams.set('threaded', 'true');
        if (params?.page) searchParams.set('page', params.page.toString());
        if (params?.limit) searchParams.set('limit', params.limit.toString());

        const response = await fetch(
            `${API_URL}/api/forum/discussions/${discussionId}/replies?${searchParams}`,
            { headers: getAuthHeaders() }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch replies');
        }

        return response.json();
    } catch (error) {
        console.error('Failed to fetch replies:', error);
        return { success: false, data: [] };
    }
}

export async function createReply(
    discussionId: string,
    data: CreateReplyData
): Promise<{ success: boolean; data: Reply }> {
    const response = await fetch(`${API_URL}/api/forum/discussions/${discussionId}/replies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to create reply');
    }

    return response.json();
}

export async function updateReply(
    replyId: string,
    content: string
): Promise<{ success: boolean; data: Reply }> {
    const response = await fetch(`${API_URL}/api/forum/replies/${replyId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify({ content }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to update reply');
    }

    return response.json();
}

export async function deleteReply(replyId: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_URL}/api/forum/replies/${replyId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to delete reply');
    }

    return response.json();
}

// Voting
export async function voteDiscussion(
    discussionId: string,
    value: 1 | -1
): Promise<{ success: boolean; data: { upvotes: number; downvotes: number } }> {
    const response = await fetch(`${API_URL}/api/forum/discussions/${discussionId}/vote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify({ value }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to vote');
    }

    return response.json();
}

export async function voteReply(
    replyId: string,
    value: 1 | -1
): Promise<{ success: boolean; data: { upvotes: number; downvotes: number } }> {
    const response = await fetch(`${API_URL}/api/forum/replies/${replyId}/vote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify({ value }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to vote');
    }

    return response.json();
}

// Accept Answer
export async function acceptAnswer(
    discussionId: string,
    replyId: string
): Promise<{ success: boolean }> {
    const response = await fetch(
        `${API_URL}/api/forum/discussions/${discussionId}/accept/${replyId}`,
        {
            method: 'PATCH',
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to accept answer');
    }

    return response.json();
}

export async function unacceptAnswer(discussionId: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_URL}/api/forum/discussions/${discussionId}/accept`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to unaccept answer');
    }

    return response.json();
}

// Moderation
export async function togglePin(discussionId: string): Promise<{ success: boolean; data: { isPinned: boolean } }> {
    const response = await fetch(`${API_URL}/api/forum/discussions/${discussionId}/pin`, {
        method: 'POST',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to toggle pin');
    }

    return response.json();
}

export async function toggleLock(discussionId: string): Promise<{ success: boolean; data: { isLocked: boolean } }> {
    const response = await fetch(`${API_URL}/api/forum/discussions/${discussionId}/lock`, {
        method: 'POST',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to toggle lock');
    }

    return response.json();
}

// Categories and Tags
export async function getCategoryStats(): Promise<{ success: boolean; data: CategoryStats[] }> {
    try {
        const response = await fetch(`${API_URL}/api/forum/categories/stats`);

        if (!response.ok) {
            throw new Error('Failed to fetch category stats');
        }

        return response.json();
    } catch (error) {
        console.error('Failed to fetch category stats:', error);
        return { success: false, data: [] };
    }
}

export async function getPopularTags(limit = 20): Promise<{ success: boolean; data: PopularTag[] }> {
    try {
        const response = await fetch(`${API_URL}/api/forum/tags/popular?limit=${limit}`);

        if (!response.ok) {
            throw new Error('Failed to fetch popular tags');
        }

        return response.json();
    } catch (error) {
        console.error('Failed to fetch popular tags:', error);
        return { success: false, data: [] };
    }
}

// View count
export async function incrementViews(discussionId: string): Promise<void> {
    await fetch(`${API_URL}/api/forum/discussions/${discussionId}/view`, {
        method: 'POST',
    });
}

// User forum activity
export interface UserForumStats {
    discussionCount: number;
    replyCount: number;
    totalUpvotes: number;
    totalDownvotes: number;
    netVotes: number;
}

export async function getUserForumStats(userId: string): Promise<{ success: boolean; data: UserForumStats }> {
    const response = await fetch(`${API_URL}/api/forum/users/${userId}/stats`);

    if (!response.ok) {
        throw new Error('Failed to fetch user forum stats');
    }

    return response.json();
}

export async function getUserDiscussions(
    userId: string,
    limit = 10
): Promise<{ success: boolean; data: Discussion[] }> {
    const response = await fetch(`${API_URL}/api/forum/users/${userId}/discussions?limit=${limit}`);

    if (!response.ok) {
        throw new Error('Failed to fetch user discussions');
    }

    return response.json();
}

export async function getUserReplies(
    userId: string,
    limit = 10
): Promise<{ success: boolean; data: Reply[] }> {
    const response = await fetch(`${API_URL}/api/forum/users/${userId}/replies?limit=${limit}`);

    if (!response.ok) {
        throw new Error('Failed to fetch user replies');
    }

    return response.json();
}
