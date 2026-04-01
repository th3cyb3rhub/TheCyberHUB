import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'XSS Payloads | TheCyberHub',
    description: 'Browse Cross-Site Scripting (XSS) payloads for penetration testing. Reference guide for testing XSS vulnerabilities.',
}

export default function XSSPayloadsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
