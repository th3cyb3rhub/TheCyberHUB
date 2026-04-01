import type { Metadata } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params

    try {
        const response = await fetch(`${API_URL}/api/internships/${id}`, { next: { revalidate: 60 } })
        if (response.ok) {
            const result = await response.json()
            const internship = result.data || result

            if (internship?.title) {
                const description = internship.description
                    ? internship.description.replace(/<[^>]*>/g, '').substring(0, 160)
                    : `Apply for the ${internship.title} internship on TheCyberHub.`

                return {
                    title: `${internship.title} | TheCyberHub`,
                    description,
                    openGraph: {
                        title: `${internship.title} | TheCyberHub Internships`,
                        description,
                        type: 'website',
                    },
                }
            }
        }
    } catch (error) {
        console.error('Internship metadata fetch error:', error)
    }

    return {
        title: 'Internship Details | TheCyberHub',
        description: 'View details about this cybersecurity internship opportunity on TheCyberHub.',
    }
}

export default function InternshipDetailLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
