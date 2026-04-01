import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Leaderboard',
    description: 'View the top cybersecurity challengers on TheCyberHub. See global rankings, points, and solve counts for CTF challenges.',
    openGraph: {
        title: 'Leaderboard | TheCyberHub',
        description: 'Global rankings for TheCyberHub security challenges. Compete and climb the leaderboard.',
        type: 'website',
    },
}

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
