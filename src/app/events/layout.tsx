import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Events | TheCyberHub',
    description: 'Discover cybersecurity events, workshops, webinars, and meetups. Stay connected with the infosec community through upcoming events.',
    openGraph: {
        title: 'Cybersecurity Events | TheCyberHub',
        description: 'Discover cybersecurity events, workshops, webinars, and meetups hosted by the TheCyberHub community.',
        type: 'website',
    },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
