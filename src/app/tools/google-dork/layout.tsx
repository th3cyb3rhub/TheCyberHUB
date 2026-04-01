import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Google Dork Generator | TheCyberHub',
    description: 'Generate Google dorking queries for OSINT and security reconnaissance. Build advanced search operators to find exposed data.',
}

export default function GoogleDorkLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
