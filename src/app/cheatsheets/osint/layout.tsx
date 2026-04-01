import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'OSINT Cheatsheet | TheCyberHub',
    description: 'Open Source Intelligence (OSINT) cheatsheet with tools, techniques, and resources for information gathering and reconnaissance.',
}

export default function OSINTCheatsheetLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
