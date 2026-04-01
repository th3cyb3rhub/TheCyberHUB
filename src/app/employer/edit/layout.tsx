import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Edit Job Listing | TheCyberHub',
    description: 'Edit your cybersecurity job listing on TheCyberHub.',
}

export default function EditJobLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
