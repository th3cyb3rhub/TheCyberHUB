import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Forums',
    description: 'Ask questions, share knowledge, and discuss cybersecurity topics with the TheCyberHub community. Get help with CTF challenges, career advice, and security projects.',
    openGraph: {
        title: 'Community Forums | TheCyberHub',
        description: 'Discuss cybersecurity topics, get help with challenges, and connect with the community.',
        type: 'website',
    },
}

export default function ForumsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
