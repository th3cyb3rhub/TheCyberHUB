import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Subdomain Takeover Checker | TheCyberHub',
    description: 'Check for subdomain takeover vulnerabilities. Identify dangling DNS records that could be exploited by attackers.',
}

export default function SubTakeoverLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
