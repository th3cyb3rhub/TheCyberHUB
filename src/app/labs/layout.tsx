import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Labs | TheCyberHub',
    description: 'Hands-on cybersecurity labs and virtual environments for practicing penetration testing, security analysis, and ethical hacking.',
    openGraph: {
        title: 'Cybersecurity Labs | TheCyberHub',
        description: 'Hands-on cybersecurity labs for practicing penetration testing and ethical hacking.',
        type: 'website',
    },
}

export default function LabsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
