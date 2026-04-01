import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Capture The Flag',
    description: 'Compete in real-world cybersecurity CTF challenges on TheCyberHub. Web exploitation, cryptography, forensics, reverse engineering, and more.',
    openGraph: {
        title: 'Capture The Flag | TheCyberHub',
        description: 'Compete in real-world cybersecurity CTF challenges. Sharpen your hacking skills and climb the leaderboard.',
        type: 'website',
    },
}

export default function CTFLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
