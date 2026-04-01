import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mentorship Requests | TheCyberHub',
    description: 'View and manage your mentorship requests on TheCyberHub.',
}

export default function MentorshipRequestsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
