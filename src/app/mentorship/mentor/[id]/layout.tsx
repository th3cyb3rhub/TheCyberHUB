import type { Metadata } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params

    try {
        const response = await fetch(`${API_URL}/api/mentors/${id}`, { next: { revalidate: 60 } })
        if (response.ok) {
            const result = await response.json()
            const mentor = result.data || result

            if (mentor?.name || mentor?.username) {
                const name = mentor.name || mentor.username
                return {
                    title: `${name} - Mentor | TheCyberHub`,
                    description: `View ${name}'s mentor profile on TheCyberHub. Connect for cybersecurity mentorship.`,
                    openGraph: {
                        title: `${name} - Mentor | TheCyberHub`,
                        description: `Connect with ${name} for cybersecurity mentorship on TheCyberHub.`,
                        type: 'profile',
                    },
                }
            }
        }
    } catch (error) {
        console.error('Mentor metadata fetch error:', error)
    }

    return {
        title: 'Mentor Profile | TheCyberHub',
        description: 'View this mentor\'s profile and connect for cybersecurity mentorship on TheCyberHub.',
    }
}

export default function MentorProfileLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
