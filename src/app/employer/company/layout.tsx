import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Company Profile | TheCyberHub',
    description: 'Manage your company profile on TheCyberHub. Showcase your organization to cybersecurity professionals.',
}

export default function CompanyProfileLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
