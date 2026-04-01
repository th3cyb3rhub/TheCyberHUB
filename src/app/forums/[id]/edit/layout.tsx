import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Edit Forum Post | TheCyberHub',
    description: 'Edit your forum discussion thread on TheCyberHub.',
}

export default function EditForumPostLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
