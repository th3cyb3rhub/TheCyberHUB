import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mentorship Session | TheCyberHub',
    description: 'View your mentorship session details and progress on TheCyberHub.',
}

export default function MentorshipSessionLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
