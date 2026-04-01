import type { Metadata } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params

    try {
        const response = await fetch(`${API_URL}/api/events/${slug}`, { next: { revalidate: 60 } })
        if (response.ok) {
            const result = await response.json()
            const event = result.data || result

            if (event?.title) {
                const description = event.description
                    ? event.description.replace(/<[^>]*>/g, '').substring(0, 160)
                    : `Details about the ${event.title} cybersecurity event on TheCyberHub.`

                return {
                    title: `${event.title} | TheCyberHub`,
                    description,
                    openGraph: {
                        title: `${event.title} | TheCyberHub Events`,
                        description,
                        type: 'website',
                        ...(event.coverImage && { images: [{ url: event.coverImage }] }),
                    },
                }
            }
        }
    } catch (error) {
        console.error('Event metadata fetch error:', error)
    }

    return {
        title: 'Event Details | TheCyberHub',
        description: 'View details about this cybersecurity event on TheCyberHub.',
    }
}

export default function EventDetailLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
