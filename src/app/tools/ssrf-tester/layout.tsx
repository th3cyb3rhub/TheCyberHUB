import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'SSRF Tester | TheCyberHub',
    description: 'Test for Server-Side Request Forgery (SSRF) vulnerabilities. Generate and test SSRF payloads for security assessments.',
}

export default function SSRFTesterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
