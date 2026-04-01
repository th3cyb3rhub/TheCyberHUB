import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Port Scanner | TheCyberHub',
    description: 'Scan target hosts for open ports and running services. Identify exposed network services for security assessments.',
}

export default function PortScannerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
