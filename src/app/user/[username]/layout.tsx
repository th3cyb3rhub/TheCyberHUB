import type { Metadata } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
    const { username } = await params

    try {
        const response = await fetch(`${API_URL}/api/users/${username}/public`, { next: { revalidate: 60 } })
        if (response.ok) {
            const result = await response.json()
            const user = result.data || result

            if (user?.username) {
                const displayName = user.name || user.username
                const description = user.bio
                    ? user.bio.substring(0, 160)
                    : `${displayName}'s cybersecurity profile on TheCyberHub.`

                return {
                    title: `${displayName} (@${user.username})`,
                    description,
                    openGraph: {
                        title: `${displayName} | TheCyberHub`,
                        description,
                        type: 'profile',
                    },
                }
            }
        }
    } catch (error) {
        console.error('User metadata fetch error:', error)
    }

    return {
        title: `${username} | TheCyberHub`,
        description: `View ${username}'s cybersecurity profile on TheCyberHub.`,
    }
}

export default function UserProfileLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
