import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Web Security Cheatsheet | TheCyberHub',
    description: 'Web application security cheatsheet covering OWASP Top 10 vulnerabilities, common attack vectors, and defensive techniques.',
}

export default function WebSecurityCheatsheetLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
