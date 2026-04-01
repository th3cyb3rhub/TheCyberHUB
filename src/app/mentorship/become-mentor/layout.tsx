import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Become a Mentor | TheCyberHub',
    description: 'Apply to become a cybersecurity mentor on TheCyberHub. Share your expertise and help others grow in information security.',
}

export default function BecomeMentorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
