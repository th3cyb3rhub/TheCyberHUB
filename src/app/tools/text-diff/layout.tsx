import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Text Diff | TheCyberHub',
    description: 'Compare two texts side by side and highlight the differences. Useful for comparing configurations, code, and payloads.',
}

export default function TextDiffLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
