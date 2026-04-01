import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Subdomain Finder | TheCyberHub',
    description: 'Discover subdomains for any domain. Enumerate subdomains using multiple sources for security reconnaissance.',
}

export default function SubfinderLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
