import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'CTF Leaderboard | TheCyberHub',
    description: 'View the Capture The Flag competition leaderboard. See top performers and rankings in TheCyberHub CTF challenges.',
}

export default function CTFLeaderboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
