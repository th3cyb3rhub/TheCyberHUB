import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Feed | TheCyberHub',
    description: 'Browse the latest posts, discussions, and updates from the TheCyberHub cybersecurity community.',
    openGraph: {
        title: 'Community Feed | TheCyberHub',
        description: 'Latest posts and discussions from the TheCyberHub cybersecurity community.',
        type: 'website',
    },
}

export default function FeedLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
