export interface Discussion {
    _id: string;
    title: string;
    content: string;
    author: {
        _id: string;
        username: string;
        avatar?: string;
    };
    category: Category;
    tags: string[];
    upvotes: number;
    downvotes: number;
    replyCount: number;
    viewCount: number;
    acceptedAnswer?: string;
    isPinned: boolean;
    isLocked: boolean;
    isEdited: boolean;
    editedAt?: string;
    lastActivityAt: string;
    createdAt: string;
    updatedAt: string;
    netVotes: number;
    hasAcceptedAnswer: boolean;
    userVote?: number;
}

export interface Reply {
    _id: string;
    discussion: string;
    parent?: string;
    content: string;
    author: {
        _id: string;
        username: string;
        avatar?: string;
    };
    upvotes: number;
    downvotes: number;
    isAccepted: boolean;
    mentions: string[];
    depth: number;
    isEdited: boolean;
    editedAt?: string;
    createdAt: string;
    updatedAt: string;
    netVotes: number;
    children?: Reply[];
    userVote?: number;
}

export type Category =
    | 'ctf-help'
    | 'pentesting'
    | 'bug-bounty'
    | 'malware'
    | 'career'
    | 'tools'
    | 'news'
    | 'general';

export type SortOption = 'hot' | 'new' | 'top' | 'unanswered';

export interface CategoryStats {
    category: Category;
    count: number;
}

export interface PopularTag {
    tag: string;
    count: number;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface CreateDiscussionData {
    title: string;
    content: string;
    category: Category;
    tags?: string[];
}

export interface CreateReplyData {
    content: string;
    parentId?: string;
}

export const CATEGORY_INFO: Record<Category, { label: string; color: string; bgColor: string; borderColor: string; description: string }> = {
    'ctf-help': {
        label: 'CTF Help',
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        description: 'Get help with CTF challenges',
    },
    'pentesting': {
        label: 'Pentesting',
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/30',
        description: 'Real-world penetration testing techniques',
    },
    'bug-bounty': {
        label: 'Bug Bounty',
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30',
        description: 'Vulnerability hunting and reports',
    },
    'malware': {
        label: 'Malware Analysis',
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/30',
        description: 'Reverse engineering and malware research',
    },
    'career': {
        label: 'Career & Certs',
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
        description: 'OSCP, jobs, and career advice',
    },
    'tools': {
        label: 'Tools & Scripts',
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/30',
        description: 'Custom tools and automation',
    },
    'news': {
        label: 'News & Research',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30',
        description: 'CVEs, papers, and security news',
    },
    'general': {
        label: 'General',
        color: 'text-gray-400',
        bgColor: 'bg-gray-500/10',
        borderColor: 'border-gray-500/30',
        description: 'Off-topic and general discussion',
    },
};
