import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privilege Escalation Cheatsheet | TheCyberHub',
    description: 'Privilege escalation cheatsheet for Linux and Windows. Techniques, commands, and tools for escalating privileges during penetration tests.',
}

export default function PrivescCheatsheetLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
