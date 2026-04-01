import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Forgot Password | TheCyberHub',
    description: 'Reset your TheCyberHub account password. Enter your email to receive a password reset link.',
}

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
