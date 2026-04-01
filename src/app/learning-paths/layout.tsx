import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Learning Paths | TheCyberHub',
    description: 'Structured cybersecurity learning paths for beginners to advanced. Follow guided tracks to build your skills in penetration testing, SOC analysis, and more.',
    openGraph: {
        title: 'Learning Paths | TheCyberHub',
        description: 'Structured cybersecurity learning paths from beginner to advanced.',
        type: 'website',
    },
}

export default function LearningPathsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
