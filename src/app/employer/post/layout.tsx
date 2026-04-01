import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Post a Job | TheCyberHub',
    description: 'Post a cybersecurity job listing on TheCyberHub. Reach talented security professionals looking for new opportunities.',
}

export default function PostJobLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
