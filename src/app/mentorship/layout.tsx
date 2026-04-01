import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mentorship | TheCyberHub',
    description: 'Connect with experienced cybersecurity mentors. Get guided mentorship to accelerate your career in information security.',
    openGraph: {
        title: 'Cybersecurity Mentorship | TheCyberHub',
        description: 'Connect with cybersecurity mentors and accelerate your infosec career.',
        type: 'website',
    },
}

export default function MentorshipLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
