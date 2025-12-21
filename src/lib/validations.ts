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

// ============================================
// Authentication Schemas
// ============================================

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
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

// ============================================
// Profile Schemas
// ============================================

export const profileSchema = z.object({
    username: usernameSchema,
    name: z.string().max(100, 'Name must be less than 100 characters').optional(),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    location: z.string().max(100, 'Location must be less than 100 characters').optional(),
    website: urlSchema,
    github: z.string().max(50, 'GitHub username must be less than 50 characters').optional(),
    twitter: z.string().max(50, 'Twitter handle must be less than 50 characters').optional(),
    linkedin: urlSchema,
});

// ============================================
// Event Schemas
// ============================================

export const eventSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title must be less than 200 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
    description: z.string().min(20, 'Description must be at least 20 characters').max(5000, 'Description must be less than 5000 characters'),
    shortDescription: z.string().max(300, 'Short description must be less than 300 characters').optional(),
    image: urlSchema,
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    location: z.string().max(200, 'Location must be less than 200 characters').optional(),
    isVirtual: z.boolean().optional(),
    virtualLink: urlSchema,
    category: z.enum(['ctf', 'workshop', 'meetup', 'webinar', 'conference', 'hackathon', 'other']),
    maxAttendees: z.number().int().positive().optional(),
    requiresApproval: z.boolean().optional(),
    status: z.enum(['draft', 'published', 'cancelled']).optional(),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: 'End date must be after start date',
    path: ['endDate'],
});

// ============================================
// Challenge Schemas
// ============================================

export const challengeSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title must be less than 200 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    category: z.enum(['web', 'crypto', 'forensics', 'pwn', 'reverse', 'misc', 'osint']),
    difficulty: z.enum(['easy', 'medium', 'hard', 'insane']),
    flag: z.string().min(1, 'Flag is required'),
    basePoints: z.number().int().min(10, 'Points must be at least 10').max(1000, 'Points must be less than 1000'),
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

// ============================================
// Blog/Post Schemas
// ============================================

export const blogPostSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title must be less than 200 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
    content: z.string().min(100, 'Content must be at least 100 characters'),
    excerpt: z.string().max(500, 'Excerpt must be less than 500 characters').optional(),
    coverImage: urlSchema,
    tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').optional(),
    category: z.string().optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
});

export const feedPostSchema = z.object({
    content: z.string().min(1, 'Post content is required').max(2000, 'Post must be less than 2000 characters'),
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
// Type Exports
// ============================================

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type EventFormData = z.infer<typeof eventSchema>;
export type ChallengeFormData = z.infer<typeof challengeSchema>;
export type FlagSubmissionFormData = z.infer<typeof flagSubmissionSchema>;
export type BlogPostFormData = z.infer<typeof blogPostSchema>;
export type FeedPostFormData = z.infer<typeof feedPostSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type FeedbackFormData = z.infer<typeof feedbackSchema>;
