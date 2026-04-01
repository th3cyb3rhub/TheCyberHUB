import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'DNS Lookup | TheCyberHub',
    description: 'Perform DNS lookups to query A, AAAA, MX, TXT, NS, and other DNS records for any domain.',
}

export default function DNSLookupLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
