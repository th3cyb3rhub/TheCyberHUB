import type { Metadata } from 'next'

interface SEOProps {
    title: string
    description: string
    keywords?: string[]
    canonical?: string
    ogImage?: string
    twitterImage?: string
    noIndex?: boolean
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
    section?: string
    tags?: string[]
}

export function generateSEO({
                                title,
                                description,
                                keywords = [],
                                canonical,
                                ogImage = '/og-default.png',
                                twitterImage = '/twitter-default.png',
                                noIndex = false,
                                publishedTime,
                                modifiedTime,
                                authors = [],
                                section,
                                tags = []
                            }: SEOProps): Metadata {

    // Ensure title is not too long for SEO
    const seoTitle = title.length > 60 ? `${title.substring(0, 57)}...` : title

    // Ensure description is optimal length for SEO
    const seoDescription = description.length > 160 ? `${description.substring(0, 157)}...` : description

    const metadata: Metadata = {
        title: seoTitle,
        description: seoDescription,
        keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            url: canonical,
            type: section ? 'article' : 'website',
            publishedTime,
            modifiedTime,
            authors: authors.length > 0 ? authors : undefined,
            section,
            tags,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                    type: 'image/png',
                }
            ],
            siteName: 'TheCyberHub',
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: seoDescription,
            images: [twitterImage],
            creator: '@th3cyb3rhub',
            site: '@th3cyb3rhub',
        },
        alternates: canonical ? {
            canonical,
        } : undefined,
        robots: noIndex ? {
            index: false,
            follow: false,
            noarchive: true,
            nosnippet: true,
            noimageindex: true,
        } : {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    }

    return metadata
}

export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    }
}

export function generateToolSchema(tool: {
    name: string,
    description: string,
    url: string,
    applicationCategory: string,
    operatingSystem: string,
    offers?: {
        price: string,
        priceCurrency: string
    }
}) {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "description": tool.description,
        "url": tool.url,
        "applicationCategory": tool.applicationCategory,
        "operatingSystem": tool.operatingSystem,
        "offers": tool.offers ? {
            "@type": "Offer",
            "price": tool.offers.price,
            "priceCurrency": tool.offers.priceCurrency
        } : {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "publisher": {
            "@type": "Organization",
            "name": "TheCyberHub"
        }
    }
}