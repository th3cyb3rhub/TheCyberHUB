import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Bookmarks | TheCyberHub',
    description: 'View and manage your saved bookmarks on TheCyberHub.',
}

export default function BookmarksLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
