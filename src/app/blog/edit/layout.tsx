import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Edit Blog Post | TheCyberHub',
    description: 'Edit your cybersecurity blog post on TheCyberHub.',
}

export default function BlogEditLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
