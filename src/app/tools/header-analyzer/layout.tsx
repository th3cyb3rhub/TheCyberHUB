import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'HTTP Header Analyzer | TheCyberHub',
    description: 'Analyze HTTP response headers for security misconfigurations. Check for missing security headers like CSP, HSTS, and X-Frame-Options.',
}

export default function HeaderAnalyzerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
