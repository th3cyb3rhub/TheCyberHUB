import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'IP Lookup | TheCyberHub',
    description: 'Look up IP address information including geolocation, ISP, ASN, and organization details for security investigations.',
}

export default function IPLookupLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
