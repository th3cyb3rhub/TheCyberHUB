import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Cheatsheets | TheCyberHub',
    description: 'Quick-reference cybersecurity cheatsheets for penetration testing, networking, privilege escalation, reverse shells, XSS, SQL injection, and more.',
    openGraph: {
        title: 'Cybersecurity Cheatsheets | TheCyberHub',
        description: 'Quick-reference cheatsheets for penetration testing and security research.',
        type: 'website',
    },
}

export default function CheatsheetsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
