import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Networking Cheatsheet | TheCyberHub',
    description: 'Quick-reference networking cheatsheet covering protocols, ports, subnetting, and common networking commands for security professionals.',
}

export default function NetworkingCheatsheetLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
