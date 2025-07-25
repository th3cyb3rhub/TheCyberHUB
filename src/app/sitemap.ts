import { MetadataRoute } from 'next'

// Define your static routes
const staticRoutes = [
    {
        url: '',
        changeFrequency: 'weekly' as const,
        priority: 1,
    },
    {
        url: '/tools',
        changeFrequency: 'weekly' as const,
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
    }
]

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://thecyberhub.org'
    const currentDate = new Date()

    return staticRoutes.map(route => ({
        url: `${baseUrl}${route.url}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }))
}
