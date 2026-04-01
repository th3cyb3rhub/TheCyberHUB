import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'WHOIS Lookup | TheCyberHub',
    description: 'Perform WHOIS lookups to find domain registration details, registrar info, nameservers, and expiration dates.',
}

export default function WhoisLookupLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
