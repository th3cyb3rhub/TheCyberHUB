import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'TheCyberHub - Empowering Cybersecurity Experts',
    description: 'Join the ultimate destination for cybersecurity enthusiasts to learn, connect, and grow together.',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
        <body className={`${inter.className} cyberhub-bg`}>{children}</body>
        </html>
    )
}