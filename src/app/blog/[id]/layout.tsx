import type { Metadata } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params

    try {
        const response = await fetch(`${API_URL}/api/blogs/${id}`, { next: { revalidate: 60 } })
        if (response.ok) {
            const result = await response.json()
            const blog = result.data || result

            if (blog?.title) {
                const description = blog.content
                    ? blog.content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '').substring(0, 160)
                    : 'Read this cybersecurity article on TheCyberHub.'

                return {
                    title: blog.title,
                    description,
                    openGraph: {
                        title: `${blog.title} | TheCyberHub Blog`,
                        description,
                        type: 'article',
                        ...(blog.coverImage && { images: [{ url: blog.coverImage }] }),
                    },
                    twitter: {
                        card: 'summary_large_image',
                        title: blog.title,
                        description,
                    },
                }
            }
        }
    } catch (error) {
        console.error('Blog metadata fetch error:', error)
    }

    return {
        title: 'Blog Post',
        description: 'Read cybersecurity articles and tutorials on TheCyberHub.',
    }
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
