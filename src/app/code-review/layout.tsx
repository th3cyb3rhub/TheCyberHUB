import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Code Review | TheCyberHub',
    description: 'Submit and review code for security vulnerabilities. Get feedback from the TheCyberHub community on your code security.',
    openGraph: {
        title: 'Code Review | TheCyberHub',
        description: 'Submit and review code for security vulnerabilities with the TheCyberHub community.',
        type: 'website',
    },
}

export default function CodeReviewLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
