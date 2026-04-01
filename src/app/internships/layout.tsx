import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Internships | TheCyberHub',
    description: 'Find cybersecurity internships and gain hands-on experience. Apply to internship programs offered through the TheCyberHub community.',
    openGraph: {
        title: 'Cybersecurity Internships | TheCyberHub',
        description: 'Find and apply for cybersecurity internships through TheCyberHub.',
        type: 'website',
    },
}

export default function InternshipsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
