import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Code Review Details | TheCyberHub',
    description: 'Review code for security vulnerabilities and get feedback from the TheCyberHub community.',
}

export default function CodeReviewDetailLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
