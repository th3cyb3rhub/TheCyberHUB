import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'New Forum Post | TheCyberHub',
    description: 'Create a new discussion thread in the TheCyberHub cybersecurity forums.',
}

export default function NewForumPostLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
