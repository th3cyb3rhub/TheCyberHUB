export const CHALLENGE_CATEGORIES = ['web', 'crypto', 'pwn', 'reverse', 'forensics', 'misc', 'osint'] as const;
export const CHALLENGE_DIFFICULTIES = ['easy', 'medium', 'hard', 'insane'] as const;
export const JOB_CATEGORIES = ['penetration-testing', 'soc-analyst', 'grc', 'devsecops', 'cloud-security', 'incident-response', 'malware-analysis', 'security-engineering', 'security-architecture', 'other'] as const;
export const EMPLOYMENT_TYPES = ['full-time', 'part-time', 'contract', 'freelance', 'internship'] as const;
export const EXPERIENCE_LEVELS = ['entry', 'mid', 'senior', 'lead', 'executive'] as const;
export const LOCATION_TYPES = ['remote', 'hybrid', 'on-site'] as const;
export const EVENT_CATEGORIES = ['ctf', 'workshop', 'webinar', 'meetup', 'conference'] as const;
export const FORUM_CATEGORIES = ['general', 'help', 'career', 'ctf', 'tools', 'news', 'projects', 'learning', 'offtopic'] as const;

export type ChallengeCategory = typeof CHALLENGE_CATEGORIES[number];
export type ChallengeDifficulty = typeof CHALLENGE_DIFFICULTIES[number];
export type JobCategory = typeof JOB_CATEGORIES[number];
export type EmploymentType = typeof EMPLOYMENT_TYPES[number];
export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number];
export type LocationType = typeof LOCATION_TYPES[number];
export type EventCategory = typeof EVENT_CATEGORIES[number];
export type ForumCategory = typeof FORUM_CATEGORIES[number];
