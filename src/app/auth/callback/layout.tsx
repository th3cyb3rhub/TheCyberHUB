import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Authenticating... | TheCyberHub',
    description: 'Completing authentication with TheCyberHub.',
}

export default function AuthCallbackLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
