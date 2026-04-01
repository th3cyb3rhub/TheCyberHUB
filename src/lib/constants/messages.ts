export const MESSAGES = {
    ERROR: {
        GENERIC: 'Something went wrong. Please try again.',
        NETWORK: 'Network error. Check your connection.',
        UNAUTHORIZED: 'Please sign in to continue.',
        FORBIDDEN: 'You don\'t have permission to do that.',
        NOT_FOUND: 'The requested resource was not found.',
        VALIDATION: 'Please check your input and try again.',
        RATE_LIMIT: 'Too many requests. Please wait a moment.',
    },
    SUCCESS: {
        CREATED: 'Created successfully!',
        UPDATED: 'Updated successfully!',
        DELETED: 'Deleted successfully!',
        SAVED: 'Saved successfully!',
    },
    BLOG: {
        PUBLISHED: 'Blog post published!',
        DRAFT_SAVED: 'Draft saved',
        DELETED: 'Blog post deleted',
    },
    AUTH: {
        LOGIN_SUCCESS: 'Welcome back!',
        REGISTER_SUCCESS: 'Account created! Please verify your email.',
        LOGOUT_SUCCESS: 'Signed out successfully.',
        PASSWORD_RESET_SENT: 'Password reset email sent. Check your inbox.',
        PASSWORD_CHANGED: 'Password changed successfully.',
    },
    CHALLENGE: {
        CORRECT_FLAG: 'Correct flag! Well done!',
        WRONG_FLAG: 'Incorrect flag. Try again.',
        HINT_UNLOCKED: 'Hint unlocked!',
    },
    FORUM: {
        DISCUSSION_CREATED: 'Discussion created!',
        REPLY_POSTED: 'Reply posted!',
    },
} as const;
