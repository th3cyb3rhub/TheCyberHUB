import { MetadataRoute } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Define your static routes
const staticRoutes = [
    {
        url: '',
        changeFrequency: 'daily' as const,
        priority: 1,
    },
    {
        url: '/challenges',
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    },
    {
        url: '/blog',
        changeFrequency: 'daily' as const,
        priority: 0.8,
    },
    {
        url: '/tools',
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    },
    {
        url: '/tools/jwt-analyzer',
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    },
    {
        url: '/tools/subfinder',
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    },
    {
        url: '/tools/ssl-scanner',
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    },
    {
        url: '/tools/port-scanner',
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    },
    {
        url: '/cheatsheets',
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    },
    {
        url: '/cheatsheets/linux-commands',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/cheatsheets/nmap',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/cheatsheets/burp-suite',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/jobs',
        changeFrequency: 'daily' as const,
        priority: 0.9,
    },
    {
        url: '/forums',
        changeFrequency: 'daily' as const,
        priority: 0.8,
    },
    {
        url: '/leaderboard',
        changeFrequency: 'daily' as const,
        priority: 0.7,
    },
    {
        url: '/roadmaps',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/ctf',
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    },
    {
        url: '/search',
        changeFrequency: 'weekly' as const,
        priority: 0.5,
    },
    {
        url: '/feed',
        changeFrequency: 'daily' as const,
        priority: 0.7,
    },
    {
        url: '/employer',
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    },
    {
        url: '/about',
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    },
    {
        url: '/contact',
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    },
    {
        url: '/privacy',
        changeFrequency: 'yearly' as const,
        priority: 0.3,
    },
    {
        url: '/terms',
        changeFrequency: 'yearly' as const,
        priority: 0.3,
    },

    // Auth
    {
        url: '/auth',
        changeFrequency: 'monthly' as const,
        priority: 0.3,
    },
    {
        url: '/forgot-password',
        changeFrequency: 'monthly' as const,
        priority: 0.3,
    },
    {
        url: '/reset-password',
        changeFrequency: 'monthly' as const,
        priority: 0.3,
    },

    // Blog
    {
        url: '/blog/write',
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    },

    // CTF
    {
        url: '/ctf/challenges',
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    },
    {
        url: '/ctf/leaderboard',
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    },

    // Events
    {
        url: '/events',
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    },
    {
        url: '/my-events',
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    },

    // Mentorship
    {
        url: '/mentorship',
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    },

    // Internships
    {
        url: '/internships',
        changeFrequency: 'weekly' as const,
        priority: 0.5,
    },

    // Learning Paths
    {
        url: '/learning-paths',
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    },

    // Labs
    {
        url: '/labs',
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    },

    // Bookmarks
    {
        url: '/bookmarks',
        changeFrequency: 'monthly' as const,
        priority: 0.3,
    },

    // Dashboard
    {
        url: '/dashboard',
        changeFrequency: 'monthly' as const,
        priority: 0.4,
    },

    // Profile
    {
        url: '/profile',
        changeFrequency: 'monthly' as const,
        priority: 0.3,
    },

    // Code Review
    {
        url: '/code-review',
        changeFrequency: 'weekly' as const,
        priority: 0.5,
    },

    // Employer
    {
        url: '/employer/dashboard',
        changeFrequency: 'weekly' as const,
        priority: 0.5,
    },
    {
        url: '/employer/post-job',
        changeFrequency: 'weekly' as const,
        priority: 0.5,
    },

    // Company
    {
        url: '/company',
        changeFrequency: 'monthly' as const,
        priority: 0.4,
    },

    // Tools (individual pages)
    {
        url: '/tools/cors-tester',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/cve-search',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/dns-lookup',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/encoder-decoder',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/exploit-db',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/google-dork',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/hash-analyzer',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/ip-lookup',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/password-generator',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/reverse-shell',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/ssl-checker',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/whois-lookup',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/header-analyzer',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/text-diff',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/markdown-editor',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/xss-payloads',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/sql-injection',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/ssrf-tester',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/tools/sub-takeover',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },

    // Cheatsheets (individual pages)
    {
        url: '/cheatsheets/xss',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/cheatsheets/web-security',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/cheatsheets/sql-injection',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/cheatsheets/osint',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/cheatsheets/reverse-shells',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/cheatsheets/networking',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
    {
        url: '/cheatsheets/privesc',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://thecyberhub.org'
    const currentDate = new Date()

    // Static pages
    const staticPages = staticRoutes.map(route => ({
        url: `${baseUrl}${route.url}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }))

    // Dynamic job pages
    let jobPages: MetadataRoute.Sitemap = []
    try {
        const res = await fetch(`${API_URL}/api/jobs?limit=50`, { next: { revalidate: 3600 } })
        if (res.ok) {
            const data = await res.json()
            const jobs = data.data || []
            jobPages = jobs.map((job: { slug?: string; _id: string; updatedAt?: string }) => ({
                url: `${baseUrl}/jobs/${job.slug || job._id}`,
                lastModified: job.updatedAt ? new Date(job.updatedAt) : currentDate,
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }))
        }
    } catch {
        // Silently fail — static pages still included
    }

    return [...staticPages, ...jobPages]
}
