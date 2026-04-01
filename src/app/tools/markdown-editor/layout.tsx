import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Markdown Editor | TheCyberHub',
    description: 'Write and preview Markdown with live rendering. A simple online Markdown editor for documentation and notes.',
}

export default function MarkdownEditorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
