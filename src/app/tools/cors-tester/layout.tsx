import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'CORS Tester | TheCyberHub',
    description: 'Test Cross-Origin Resource Sharing (CORS) configurations. Check if a target URL has misconfigured CORS headers.',
}

export default function CORSTesterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
