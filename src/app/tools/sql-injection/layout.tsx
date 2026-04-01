import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'SQL Injection Payloads | TheCyberHub',
    description: 'Browse SQL injection payloads and techniques for penetration testing. Reference guide for testing SQL injection vulnerabilities.',
}

export default function SQLInjectionLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
