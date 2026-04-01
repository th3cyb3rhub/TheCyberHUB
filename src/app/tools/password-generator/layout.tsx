import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Password Generator | TheCyberHub',
    description: 'Generate strong, random passwords with customizable length and character sets. Create secure passwords for your accounts.',
}

export default function PasswordGeneratorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
