import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'TheCyberHub - Cybersecurity Platform',
        short_name: 'TheCyberHub',
        description: 'Ultimate destination for cybersecurity enthusiasts',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#f97316',
        icons: [
            {
                src: '/favicon-16x16.png',
                sizes: '16x16',
                type: 'image/png',
            },
            {
                src: '/favicon-32x32.png',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                src: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    }
}