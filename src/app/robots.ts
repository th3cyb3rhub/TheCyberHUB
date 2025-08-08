import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            }
        ],
        sitemap: 'https://thecyberhub.org/sitemap.xml',
        host: 'https://thecyberhub.org',
    }
}
