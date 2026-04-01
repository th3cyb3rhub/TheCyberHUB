// Form validation schemas using Zod
// Install: npm install zod react-hook-form @hookform/resolvers

import { z } from 'zod';

// ============================================
// Common Validation Patterns
// ============================================

export const emailSchema = z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address');

export const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password cannot exceed 128 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const usernameSchema = z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens');

export const urlSchema = z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal(''));

export const tagSchema = z.string().trim().max(30, 'Tag must be less than 30 characters');

export const tagsSchema = z.array(tagSchema).max(10, 'Maximum 10 tags allowed').optional();

// ============================================
// Authentication Schemas
// ============================================

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name cannot exceed 50 characters'),
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z.literal(true, {
        errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export const resetPasswordSchema = z.object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    token: z.string().min(1, 'Reset token is required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    confirmNewPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
});

export const verifyTotpSchema = z.object({
    code: z.string().length(6, 'Code must be exactly 6 digits').regex(/^\d{6}$/, 'Code must contain only digits'),
});

// ============================================
// Profile Schemas
// ============================================

export const profileSchema = z.object({
    username: usernameSchema,
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters').optional(),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    location: z.string().max(100, 'Location must be less than 100 characters').optional(),
    website: urlSchema,
    github: z.string().max(50, 'GitHub username must be less than 50 characters').optional(),
    twitter: z.string().max(50, 'Twitter handle must be less than 50 characters').optional(),
    linkedin: urlSchema,
});

// ============================================
// Blog Schemas
// ============================================

export const blogPostSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title must be less than 200 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens').optional(),
    content: z.string().min(50, 'Content must be at least 50 characters'),
    excerpt: z.string().max(300, 'Excerpt must be less than 300 characters').optional(),
    coverImage: urlSchema,
    tags: tagsSchema,
    category: z.enum([
        'cybersecurity', 'programming', 'networking', 'cloud',
        'devops', 'ai-ml', 'career', 'tools', 'tutorials', 'news', 'other',
    ]).default('other'),
    status: z.enum(['draft', 'published']).default('draft'),
});

// Alias for task compatibility
export const blogSchema = blogPostSchema;

// ============================================
// Forum / Discussion Schemas
// ============================================

export const discussionSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title cannot exceed 200 characters'),
    body: z.string().min(10, 'Body must be at least 10 characters').max(50000, 'Body cannot exceed 50000 characters'),
    category: z.enum([
        'general', 'help', 'career', 'ctf', 'tools',
        'news', 'projects', 'learning', 'offtopic',
    ], {
        errorMap: () => ({ message: 'Please select a valid category' }),
    }),
    tags: tagsSchema,
});

export const replySchema = z.object({
    body: z.string().min(1, 'Reply cannot be empty').max(5000, 'Reply cannot exceed 5000 characters'),
    parentReply: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid reply ID').optional().nullable(),
});

export const voteSchema = z.object({
    direction: z.enum(['up', 'down'], {
        errorMap: () => ({ message: 'Vote direction must be "up" or "down"' }),
    }),
});

// ============================================
// Event Schemas
// ============================================

export const eventSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title must be less than 200 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens').optional(),
    description: z.string().min(10, 'Description must be at least 10 characters').max(50000, 'Description must be less than 50000 characters'),
    shortDescription: z.string().max(300, 'Short description must be less than 300 characters').optional(),
    image: urlSchema,
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    locationType: z.enum(['online', 'in-person', 'hybrid']).optional(),
    location: z.string().max(500, 'Location must be less than 500 characters').optional(),
    virtualLink: urlSchema,
    url: urlSchema,
    category: z.enum(['ctf', 'workshop', 'meetup', 'webinar', 'conference', 'hackathon', 'other']),
    maxParticipants: z.number().int().min(1, 'Must be at least 1').max(10000, 'Cannot exceed 10000').optional(),
    maxAttendees: z.number().int().positive().optional(),
    requiresApproval: z.boolean().optional(),
    coverImage: urlSchema,
    status: z.enum(['draft', 'published', 'cancelled']).optional(),
    isVirtual: z.boolean().optional(),
}).refine((data) => {
    if (data.endDate && data.startDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
    }
    return true;
}, {
    message: 'End date must be after start date',
    path: ['endDate'],
});

// ============================================
// Challenge / CTF Schemas
// ============================================

export const challengeSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title cannot exceed 100 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens').optional(),
    description: z.string().min(10, 'Description must be at least 10 characters').max(10000, 'Description cannot exceed 10000 characters'),
    shortDescription: z.string().max(200, 'Short description cannot exceed 200 characters').optional(),
    category: z.enum(['web', 'crypto', 'forensics', 'pwn', 'reverse', 'misc', 'osint']),
    difficulty: z.enum(['easy', 'medium', 'hard', 'insane']),
    flag: z.string().min(1, 'Flag is required'),
    flagFormat: z.string().default('flag{...}').optional(),
    isCaseSensitive: z.boolean().default(true).optional(),
    basePoints: z.number().int().min(10, 'Points must be at least 10').max(1000, 'Points must be less than 1000'),
    dynamicScoring: z.boolean().default(false).optional(),
    tags: z.array(z.string().trim()).max(10, 'Maximum 10 tags').optional(),
    hints: z.array(z.object({
        content: z.string().min(1, 'Hint content is required'),
        cost: z.number().int().min(0, 'Hint cost must be positive'),
    })).optional(),
    files: z.array(z.string().url('Invalid file URL')).optional(),
    status: z.enum(['draft', 'active', 'archived']).optional(),
});

export const flagSubmissionSchema = z.object({
    flag: z.string().min(1, 'Flag is required').max(500, 'Flag is too long'),
});

// Alias for task compatibility
export const submitFlagSchema = flagSubmissionSchema;

// ============================================
// Job Schemas
// ============================================

export const jobSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(150, 'Title cannot exceed 150 characters'),
    company: z.string().min(2, 'Company name must be at least 2 characters').max(100, 'Company name cannot exceed 100 characters'),
    description: z.string().min(50, 'Description must be at least 50 characters').max(10000, 'Description cannot exceed 10000 characters'),
    requirements: z.array(z.string().max(500)).optional(),
    responsibilities: z.array(z.string().max(500)).optional(),
    skills: z.array(z.string().max(50, 'Skill cannot exceed 50 characters')).max(20, 'Maximum 20 skills').optional(),
    category: z.enum([
        'pentesting', 'soc', 'grc', 'devsecops', 'forensics',
        'malware', 'cloud-security', 'appsec', 'other',
    ]).default('other'),
    employmentType: z.enum(['full-time', 'part-time', 'contract', 'freelance', 'internship']).default('full-time'),
    experienceLevel: z.enum(['entry', 'mid', 'senior', 'lead', 'executive']).default('mid'),
    locationType: z.enum(['remote', 'hybrid', 'onsite']).default('remote'),
    location: z.string().max(100, 'Location cannot exceed 100 characters').optional(),
    salary: z.object({
        min: z.number().min(0, 'Salary must be positive').optional(),
        max: z.number().min(0, 'Salary must be positive').optional(),
        currency: z.string().max(3).default('USD'),
        period: z.enum(['hourly', 'monthly', 'yearly']).default('yearly'),
    }).refine((data) => {
        if (data.min !== undefined && data.max !== undefined) {
            return data.max >= data.min;
        }
        return true;
    }, {
        message: 'Maximum salary must be greater than or equal to minimum salary',
        path: ['max'],
    }).optional(),
    benefits: z.array(z.string().max(100)).optional(),
    companyWebsite: urlSchema,
    companyDescription: z.string().max(2000, 'Company description cannot exceed 2000 characters').optional(),
    companyLogo: urlSchema,
    applicationDeadline: z.string().optional(),
    applyUrl: urlSchema,
    applyEmail: z.string().email('Please enter a valid email').optional().or(z.literal('')),
    applicationUrl: urlSchema,
});

// ============================================
// Mentorship Schemas
// ============================================

export const mentorshipRequestSchema = z.object({
    expertiseAreas: z.array(z.enum([
        'web-security', 'network-security', 'malware-analysis', 'forensics',
        'osint', 'cryptography', 'reverse-engineering', 'cloud-security',
        'mobile-security', 'career-guidance', 'ctf-training', 'pentesting',
    ])).min(1, 'Select at least one area of expertise'),
    goals: z.string()
        .min(100, 'Describe your goals (minimum 100 characters)')
        .max(500, 'Goals cannot exceed 500 characters'),
    skillLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
        errorMap: () => ({ message: 'Please select your skill level' }),
    }),
});

export const mentorshipFeedbackSchema = z.object({
    rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
    comment: z.string().min(10, 'Feedback must be at least 10 characters').max(1000, 'Feedback cannot exceed 1000 characters'),
});

export const mentorProfileSchema = z.object({
    expertise: z.array(z.string()).min(1, 'Select at least one area of expertise'),
    bio: z.string().min(50, 'Bio must be at least 50 characters').max(2000, 'Bio cannot exceed 2000 characters'),
    yearsOfExperience: z.number().int().min(0).max(50),
    availability: z.enum(['available', 'limited', 'unavailable']),
    maxMentees: z.number().int().min(1).max(10).default(3),
});

// ============================================
// Internship Application Schemas
// ============================================

export const internshipApplicationSchema = z.object({
    coverLetter: z.string().min(100, 'Cover letter must be at least 100 characters').max(5000, 'Cover letter cannot exceed 5000 characters'),
    resume: z.string().url('Please upload your resume'),
    portfolio: urlSchema,
    expectedStartDate: z.string().optional(),
});

// ============================================
// Feed Post Schemas
// ============================================

export const feedPostSchema = z.object({
    content: z.string().min(1, 'Post content is required').max(2000, 'Post must be less than 2000 characters'),
    images: z.array(z.string().url('Invalid image URL')).max(4, 'Maximum 4 images allowed').optional(),
    hashtags: z.array(z.string().trim().max(30)).max(10).optional(),
    visibility: z.enum(['public', 'followers']).default('public').optional(),
});

export const feedCommentSchema = z.object({
    content: z.string().min(1, 'Comment cannot be empty').max(500, 'Comment cannot exceed 500 characters'),
});

export const reshareSchema = z.object({
    comment: z.string().max(500, 'Comment cannot exceed 500 characters').optional(),
});

// ============================================
// Comment Schema (generic)
// ============================================

export const commentSchema = z.object({
    content: z.string().min(1, 'Comment cannot be empty').max(5000, 'Comment too long'),
});

// ============================================
// Bookmark & Collection Schemas
// ============================================

export const bookmarkCollectionSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name cannot exceed 100 characters'),
    description: z.string().max(500, 'Description cannot exceed 500 characters').optional(),
    isPublic: z.boolean().default(false),
    color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Must be a valid hex color').optional(),
    icon: z.string().max(50).optional(),
});

export const addBookmarkSchema = z.object({
    contentType: z.enum([
        'resource', 'discussion', 'challenge', 'event',
        'roadmap', 'job', 'writeup', 'lab',
    ]),
    contentId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid content ID'),
    collectionId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid collection ID').optional(),
    notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

// ============================================
// Contact/Feedback Schemas
// ============================================

export const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
    email: emailSchema,
    subject: z.string().min(5, 'Subject must be at least 5 characters').max(200, 'Subject must be less than 200 characters'),
    message: z.string().min(20, 'Message must be at least 20 characters').max(5000, 'Message must be less than 5000 characters'),
});

export const feedbackSchema = z.object({
    type: z.enum(['bug', 'feature', 'improvement', 'other']),
    title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title must be less than 200 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters').max(5000, 'Description must be less than 5000 characters'),
    email: emailSchema.optional(),
});

// ============================================
// Search Schema
// ============================================

export const searchSchema = z.object({
    q: z.string().trim().min(1, 'Search query is required').max(100, 'Search query too long'),
    category: z.string().optional(),
    status: z.string().optional(),
    difficulty: z.string().optional(),
});

// ============================================
// Type Exports
// ============================================

export type LoginFormData = z.infer<typeof loginSchema>;
export type LoginInput = LoginFormData;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type RegisterInput = RegisterFormData;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type VerifyTotpFormData = z.infer<typeof verifyTotpSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type ProfileInput = ProfileFormData;
export type EventFormData = z.infer<typeof eventSchema>;
export type EventInput = EventFormData;
export type ChallengeFormData = z.infer<typeof challengeSchema>;
export type ChallengeInput = ChallengeFormData;
export type FlagSubmissionFormData = z.infer<typeof flagSubmissionSchema>;
export type BlogPostFormData = z.infer<typeof blogPostSchema>;
export type BlogInput = BlogPostFormData;
export type FeedPostFormData = z.infer<typeof feedPostSchema>;
export type FeedPostInput = FeedPostFormData;
export type FeedCommentFormData = z.infer<typeof feedCommentSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type FeedbackFormData = z.infer<typeof feedbackSchema>;
export type DiscussionFormData = z.infer<typeof discussionSchema>;
export type DiscussionInput = DiscussionFormData;
export type ReplyFormData = z.infer<typeof replySchema>;
export type JobFormData = z.infer<typeof jobSchema>;
export type JobInput = JobFormData;
export type MentorshipRequestFormData = z.infer<typeof mentorshipRequestSchema>;
export type MentorshipRequestInput = MentorshipRequestFormData;
export type MentorshipFeedbackFormData = z.infer<typeof mentorshipFeedbackSchema>;
export type MentorProfileFormData = z.infer<typeof mentorProfileSchema>;
export type InternshipApplicationFormData = z.infer<typeof internshipApplicationSchema>;
export type InternshipApplicationInput = InternshipApplicationFormData;
export type CommentFormData = z.infer<typeof commentSchema>;
export type BookmarkCollectionFormData = z.infer<typeof bookmarkCollectionSchema>;
export type AddBookmarkFormData = z.infer<typeof addBookmarkSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;
