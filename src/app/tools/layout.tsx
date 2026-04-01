import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Security Tools',
    description: 'Free, open-source cybersecurity tools for penetration testing and security research. JWT analyzer, reverse shell generator, XSS payloads, SQL injection payloads, and more.',
    openGraph: {
        title: 'Security Tools | TheCyberHub',
        description: 'Free, open-source cybersecurity tools for penetration testing and security research. No signup required.',
        type: 'website',
    },
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
