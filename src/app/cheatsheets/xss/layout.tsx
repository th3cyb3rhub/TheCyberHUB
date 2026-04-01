import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'XSS Cheatsheet | TheCyberHub',
    description: 'Cross-Site Scripting (XSS) cheatsheet with payloads, filter bypass techniques, and context-specific attack vectors.',
}

export default function XSSCheatsheetLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
