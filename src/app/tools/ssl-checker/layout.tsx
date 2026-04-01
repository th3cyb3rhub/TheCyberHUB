import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'SSL/TLS Checker | TheCyberHub',
    description: 'Check SSL/TLS certificate validity, expiration dates, and cipher suite configurations for any domain.',
}

export default function SSLCheckerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
