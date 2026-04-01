import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Write Blog Post | TheCyberHub',
    description: 'Write and publish cybersecurity articles, tutorials, and CTF write-ups on TheCyberHub.',
}

export default function BlogWriteLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
