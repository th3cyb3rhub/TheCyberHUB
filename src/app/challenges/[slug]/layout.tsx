import type { Metadata } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params

    try {
        const response = await fetch(`${API_URL}/api/challenges/${slug}`, { next: { revalidate: 60 } })
        if (response.ok) {
            const data = await response.json()
            const challenge = Array.isArray(data) ? data[0] : (data.data || data)

            if (challenge?.title) {
                const description = challenge.description
                    ? challenge.description.substring(0, 160)
                    : `Solve the ${challenge.title} security challenge on TheCyberHub.`

                return {
                    title: `${challenge.title} - ${challenge.difficulty || ''} Challenge`,
                    description,
                    openGraph: {
                        title: `${challenge.title} | TheCyberHub Challenges`,
                        description,
                        type: 'website',
                    },
                }
            }
        }
    } catch (error) {
        console.error('Challenge metadata fetch error:', error)
    }

    return {
        title: 'Security Challenge',
        description: 'Solve cybersecurity challenges and sharpen your hacking skills on TheCyberHub.',
    }
}

export default function ChallengeLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
