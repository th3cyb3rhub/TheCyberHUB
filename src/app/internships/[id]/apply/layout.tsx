import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Apply for Internship | TheCyberHub',
    description: 'Submit your application for this cybersecurity internship on TheCyberHub.',
}

export default function InternshipApplyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
