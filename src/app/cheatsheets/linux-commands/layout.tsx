import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Linux Commands Cheatsheet | TheCyberHub',
    description: 'Quick-reference cheatsheet for essential Linux commands used in penetration testing, system administration, and security operations.',
}

export default function LinuxCommandsCheatsheetLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
