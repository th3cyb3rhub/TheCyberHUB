import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard | TheCyberHub',
    description: 'Your personal TheCyberHub dashboard. Track your progress, challenges, and activity.',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
