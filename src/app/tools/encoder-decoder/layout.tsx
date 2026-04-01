import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Encoder / Decoder | TheCyberHub',
    description: 'Encode and decode text using Base64, URL encoding, HTML entities, hex, and other common formats used in security testing.',
}

export default function EncoderDecoderLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
