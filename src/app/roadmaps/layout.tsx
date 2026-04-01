import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Learning Roadmaps',
    description: 'Follow structured cybersecurity learning paths from beginner to expert. Free curated resources, hands-on practice, and clear progression for penetration testing, blue team, and more.',
    openGraph: {
        title: 'Learning Roadmaps | TheCyberHub',
        description: 'Structured cybersecurity learning paths with free resources and hands-on practice.',
        type: 'website',
    },
}

export default function RoadmapsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
