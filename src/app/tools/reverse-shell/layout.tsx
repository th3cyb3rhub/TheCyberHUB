import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Reverse Shell Generator | TheCyberHub',
    description: 'Generate reverse shell payloads for penetration testing. Supports Bash, Python, PHP, PowerShell, and other languages.',
}

export default function ReverseShellLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
