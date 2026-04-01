import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign In | TheCyberHub',
    description: 'Sign in or create an account on TheCyberHub. Join the cybersecurity community to access challenges, tools, blogs, and more.',
    openGraph: {
        title: 'Sign In | TheCyberHub',
        description: 'Join the TheCyberHub cybersecurity community.',
        type: 'website',
    },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
