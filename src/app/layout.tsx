import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import ClientProviders from "@/components/ClientProviders";

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    preload: true,
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
    ],
    authors: [{ name: 'TheCyberHub Team', url: 'https://thecyberhub.org' }],
    creator: 'TheCyberHub',
    publisher: 'TheCyberHub',
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://thecyberhub.org',
        title: 'TheCyberHub - Empowering Cybersecurity Experts',
        description: 'Join the ultimate destination for cybersecurity enthusiasts to learn, connect, and grow together.',
        siteName: 'TheCyberHub',
        images: [{ url: '/img.png', width: 1200, height: 630, alt: 'TheCyberHub' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'TheCyberHub - Empowering Cybersecurity Experts',
        description: 'Join the ultimate destination for cybersecurity enthusiasts.',
        images: ['/twitter-image.png'],
        creator: '@th3cyb3rhub',
    },
    robots: { index: true, follow: true },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <meta name="darkreader-lock" />
            </head>
            <body className={`${inter.className} cyberhub-bg`} suppressHydrationWarning>
                <ClientProviders>
                    {children}
                </ClientProviders>
                <Analytics />
            </body>
        </html>
    )
}
