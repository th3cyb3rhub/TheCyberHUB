import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Active Sessions | TheCyberHub',
    description: 'View and manage your active login sessions on TheCyberHub.',
}

export default function SessionsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
