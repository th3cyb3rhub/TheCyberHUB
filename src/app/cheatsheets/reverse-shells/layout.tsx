import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Reverse Shells Cheatsheet | TheCyberHub',
    description: 'Reverse shell cheatsheet with one-liners for Bash, Python, PHP, PowerShell, and more. Quick reference for penetration testing.',
}

export default function ReverseShellsCheatsheetLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
