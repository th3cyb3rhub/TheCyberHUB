import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Profile | TheCyberHub',
    description: 'Manage your TheCyberHub profile settings, preferences, and account details.',
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
