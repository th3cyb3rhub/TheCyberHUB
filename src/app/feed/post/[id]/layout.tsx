import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Post | TheCyberHub',
    description: 'View this community post and discussion on TheCyberHub.',
}

export default function FeedPostLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
