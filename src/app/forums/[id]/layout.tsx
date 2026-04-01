import type { Metadata } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params

    try {
        const response = await fetch(`${API_URL}/api/discussions/${id}`, { next: { revalidate: 60 } })
        if (response.ok) {
            const result = await response.json()
            const discussion = result.data || result

            if (discussion?.title) {
                const description = discussion.content
                    ? discussion.content.replace(/<[^>]*>/g, '').substring(0, 160)
                    : `Join the discussion on TheCyberHub forums.`

                return {
                    title: discussion.title,
                    description,
                    openGraph: {
                        title: `${discussion.title} | TheCyberHub Forums`,
                        description,
                        type: 'article',
                    },
                }
            }
        }
    } catch (error) {
        console.error('Forum metadata fetch error:', error)
    }

    return {
        title: 'Forum Discussion',
        description: 'Join cybersecurity discussions on TheCyberHub community forums.',
    }
}

export default function ForumPostLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
