import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mentorship Dashboard | TheCyberHub',
    description: 'Manage your mentorship sessions, track progress, and communicate with your mentor or mentees.',
}

export default function MentorshipDashboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
