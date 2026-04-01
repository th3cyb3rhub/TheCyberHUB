import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'My Mentor Profile | TheCyberHub',
    description: 'View and edit your mentor profile on TheCyberHub.',
}

export default function MyMentorProfileLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
