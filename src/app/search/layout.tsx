import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Search',
    description: 'Search across TheCyberHub for blogs, forum discussions, CTF challenges, tools, events, and cybersecurity resources.',
    openGraph: {
        title: 'Search | TheCyberHub',
        description: 'Find blogs, discussions, challenges, tools, and more on TheCyberHub.',
        type: 'website',
    },
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
