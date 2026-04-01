import { fetchApi } from '@/lib/api';
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
        return await fetchApi(`/api/forum/discussions?${searchParams}`, { requireAuth: false });
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
        return await fetchApi(`/api/forum/discussions/${id}`, { requireAuth: false });
    } catch (error) {
        console.error('Failed to fetch discussion:', error);
        throw error;
    }
}

export async function createDiscussion(data: CreateDiscussionData): Promise<{ success: boolean; data: Discussion }> {
    return fetchApi('/api/forum/discussions', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updateDiscussion(
    id: string,
    data: Partial<CreateDiscussionData>
): Promise<{ success: boolean; data: Discussion }> {
    return fetchApi(`/api/forum/discussions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deleteDiscussion(id: string): Promise<{ success: boolean }> {
    return fetchApi(`/api/forum/discussions/${id}`, {
        method: 'DELETE',
    });
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

        return await fetchApi(
            `/api/forum/discussions/${discussionId}/replies?${searchParams}`,
            { requireAuth: false }
        );
    } catch (error) {
        console.error('Failed to fetch replies:', error);
        return { success: false, data: [] };
    }
}

export async function createReply(
    discussionId: string,
    data: CreateReplyData
): Promise<{ success: boolean; data: Reply }> {
    return fetchApi(`/api/forum/discussions/${discussionId}/replies`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updateReply(
    replyId: string,
    content: string
): Promise<{ success: boolean; data: Reply }> {
    return fetchApi(`/api/forum/replies/${replyId}`, {
        method: 'PUT',
        body: JSON.stringify({ content }),
    });
}

export async function deleteReply(replyId: string): Promise<{ success: boolean }> {
    return fetchApi(`/api/forum/replies/${replyId}`, {
        method: 'DELETE',
    });
}

// Voting
export async function voteDiscussion(
    discussionId: string,
    value: 1 | -1
): Promise<{ success: boolean; data: { upvotes: number; downvotes: number } }> {
    return fetchApi(`/api/forum/discussions/${discussionId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ value }),
    });
}

export async function voteReply(
    replyId: string,
    value: 1 | -1
): Promise<{ success: boolean; data: { upvotes: number; downvotes: number } }> {
    return fetchApi(`/api/forum/replies/${replyId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ value }),
    });
}

// Accept Answer
export async function acceptAnswer(
    discussionId: string,
    replyId: string
): Promise<{ success: boolean }> {
    return fetchApi(
        `/api/forum/discussions/${discussionId}/accept/${replyId}`,
        { method: 'PATCH' }
    );
}

export async function unacceptAnswer(discussionId: string): Promise<{ success: boolean }> {
    return fetchApi(`/api/forum/discussions/${discussionId}/accept`, {
        method: 'DELETE',
    });
}

// Moderation
export async function togglePin(discussionId: string): Promise<{ success: boolean; data: { isPinned: boolean } }> {
    return fetchApi(`/api/forum/discussions/${discussionId}/pin`, {
        method: 'POST',
    });
}

export async function toggleLock(discussionId: string): Promise<{ success: boolean; data: { isLocked: boolean } }> {
    return fetchApi(`/api/forum/discussions/${discussionId}/lock`, {
        method: 'POST',
    });
}

// Categories and Tags
export async function getCategoryStats(): Promise<{ success: boolean; data: CategoryStats[] }> {
    try {
        return await fetchApi('/api/forum/categories/stats', { requireAuth: false });
    } catch (error) {
        console.error('Failed to fetch category stats:', error);
        return { success: false, data: [] };
    }
}

export async function getPopularTags(limit = 20): Promise<{ success: boolean; data: PopularTag[] }> {
    try {
        return await fetchApi(`/api/forum/tags/popular?limit=${limit}`, { requireAuth: false });
    } catch (error) {
        console.error('Failed to fetch popular tags:', error);
        return { success: false, data: [] };
    }
}

// View count
export async function incrementViews(discussionId: string): Promise<void> {
    await fetchApi(`/api/forum/discussions/${discussionId}/view`, {
        method: 'POST',
        requireAuth: false,
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
    return fetchApi(`/api/forum/users/${userId}/stats`, { requireAuth: false });
}

export async function getUserDiscussions(
    userId: string,
    limit = 10
): Promise<{ success: boolean; data: Discussion[] }> {
    return fetchApi(`/api/forum/users/${userId}/discussions?limit=${limit}`, { requireAuth: false });
}

export async function getUserReplies(
    userId: string,
    limit = 10
): Promise<{ success: boolean; data: Reply[] }> {
    return fetchApi(`/api/forum/users/${userId}/replies?limit=${limit}`, { requireAuth: false });
}
