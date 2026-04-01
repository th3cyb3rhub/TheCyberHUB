import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Hash Analyzer | TheCyberHub',
    description: 'Identify and analyze hash types. Detect MD5, SHA-1, SHA-256, bcrypt, and other hash formats used in security.',
}

export default function HashAnalyzerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
