import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Read cybersecurity articles, tutorials, CTF write-ups, and security research from the TheCyberHub community. Stay updated with the latest in infosec.',
    openGraph: {
        title: 'Community Blog | TheCyberHub',
        description: 'Cybersecurity articles, tutorials, and write-ups from the TheCyberHub community.',
        type: 'website',
    },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
