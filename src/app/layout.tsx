import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    preload: true, // Added for better performance
})

export const metadata: Metadata = {
    metadataBase: new URL('https://thecyberhub.org'),
    title: {
        default: 'TheCyberHub - Empowering Cybersecurity Experts',
        template: '%s | TheCyberHub'
    },
    description: 'Join the ultimate destination for cybersecurity enthusiasts to learn, connect, and grow together. Access security tools, cheatsheets, and expert resources.',
    keywords: [
        'cybersecurity',
        'penetration testing',
        'security tools',
        'JWT analyzer',
        'subdomain finder',
        'linux commands',
        'security cheatsheets',
        'ethical hacking',
        'vulnerability assessment',
        'security community',
        'cybersecurity platform',
        'penetration testing tools',
        'security assessment',
        'bug bounty tools'
    ],
    authors: [{ name: 'TheCyberHub Team', url: 'https://thecyberhub.org' }],
    creator: 'TheCyberHub',
    publisher: 'TheCyberHub',
    applicationName: 'TheCyberHub',
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    colorScheme: 'dark',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://thecyberhub.org',
        title: 'TheCyberHub - Empowering Cybersecurity Experts',
        description: 'Join the ultimate destination for cybersecurity enthusiasts to learn, connect, and grow together.',
        siteName: 'TheCyberHub',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'TheCyberHub - Cybersecurity Platform',
                type: 'image/png',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'TheCyberHub - Empowering Cybersecurity Experts',
        description: 'Join the ultimate destination for cybersecurity enthusiasts to learn, connect, and grow together.',
        images: ['/twitter-image.png'],
        creator: '@th3cyb3rhub',
        site: '@th3cyb3rhub',
    },
    robots: {
        index: true,
        follow: true,
        noarchive: false,
        nosnippet: false,
        noimageindex: false,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
        yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
        other: {
            'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
        }
    },
    alternates: {
        canonical: 'https://thecyberhub.org',
        languages: {
            'en-US': 'https://thecyberhub.org',
        },
    },
    category: 'technology',
    classification: 'Cybersecurity Platform',
    // Added app-specific metadata
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'TheCyberHub',
    },
    // Added for better mobile experience
    other: {
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
    }
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
    colorScheme: 'dark light',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
        <head>
            {/* Favicon and Icons - Improved */}
            <link rel="icon" href="/favicon.ico" sizes="32x32" />
            <link rel="icon" href="/icon.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
            <link rel="manifest" href="/manifest.json" />

            {/* Preconnect to external domains - Performance optimization */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
            <link rel="dns-prefetch" href="https://crt.sh" />

            {/* Enhanced Security headers */}
            <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
            <meta httpEquiv="X-Frame-Options" content="DENY" />
            <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
            <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
            <meta httpEquiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()" />

            {/* Enhanced Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "TheCyberHub",
                        "alternateName": "The Cyber Hub",
                        "url": "https://thecyberhub.org",
                        "description": "Ultimate destination for cybersecurity enthusiasts to learn, connect, and grow together.",
                        "keywords": "cybersecurity, penetration testing, security tools, ethical hacking",
                        "inLanguage": "en-US",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": {
                                "@type": "EntryPoint",
                                "urlTemplate": "https://thecyberhub.org/search?q={search_term_string}"
                            },
                            "query-input": "required name=search_term_string"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "TheCyberHub",
                            "url": "https://thecyberhub.org",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://thecyberhub.org/logo.png"
                            }
                        }
                    })
                }}
            />
        </head>
        <body className={`${inter.className} cyberhub-bg`} suppressHydrationWarning>
        {children}
        </body>
        </html>
    )
}