import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'JWT Analyzer | TheCyberHub',
    description: 'Decode, verify, and analyze JSON Web Tokens (JWT). Inspect headers, payloads, and signatures for security testing.',
}

export default function JWTAnalyzerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
