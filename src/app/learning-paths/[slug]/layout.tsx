import type { Metadata } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params

    try {
        const response = await fetch(`${API_URL}/api/learning-paths/${slug}`, { next: { revalidate: 60 } })
        if (response.ok) {
            const result = await response.json()
            const path = result.data || result

            if (path?.title) {
                const description = path.description
                    ? path.description.substring(0, 160)
                    : `Follow the ${path.title} learning path on TheCyberHub.`

                return {
                    title: `${path.title} | TheCyberHub`,
                    description,
                    openGraph: {
                        title: `${path.title} | TheCyberHub Learning Paths`,
                        description,
                        type: 'website',
                    },
                }
            }
        }
    } catch (error) {
        console.error('Learning path metadata fetch error:', error)
    }

    return {
        title: 'Learning Path | TheCyberHub',
        description: 'Follow this structured cybersecurity learning path on TheCyberHub.',
    }
}

export default function LearningPathDetailLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
