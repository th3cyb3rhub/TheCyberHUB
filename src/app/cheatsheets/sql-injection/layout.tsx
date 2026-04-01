import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'SQL Injection Cheatsheet | TheCyberHub',
    description: 'SQL injection cheatsheet with payloads, techniques, and bypass methods for MySQL, PostgreSQL, MSSQL, and Oracle databases.',
}

export default function SQLInjectionCheatsheetLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
