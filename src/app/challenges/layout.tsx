import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Security Challenges',
    description: 'Test your cybersecurity skills with hands-on CTF challenges. Solve puzzles in web exploitation, cryptography, forensics, reverse engineering, and more on TheCyberHub.',
    openGraph: {
        title: 'Security Challenges | TheCyberHub',
        description: 'Test your cybersecurity skills with hands-on CTF challenges. Solve puzzles, capture flags, and climb the leaderboard.',
        type: 'website',
    },
}

export default function ChallengesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
