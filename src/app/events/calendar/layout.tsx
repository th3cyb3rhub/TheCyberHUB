import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Events Calendar | TheCyberHub',
    description: 'View the cybersecurity events calendar. See upcoming workshops, webinars, CTFs, and community meetups.',
}

export default function EventsCalendarLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
