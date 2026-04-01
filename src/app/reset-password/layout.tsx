import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Reset Password | TheCyberHub',
    description: 'Set a new password for your TheCyberHub account.',
}

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
