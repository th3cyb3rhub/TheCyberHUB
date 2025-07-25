import type { Metadata } from 'next'
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ToolsSection from '@/components/ToolsSection';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'TheCyberHub - Empowering Cybersecurity Experts',
    description: 'Join the ultimate destination for cybersecurity enthusiasts. Access premium security tools, comprehensive cheatsheets, and connect with experts worldwide.',
    keywords: [
        'cybersecurity platform',
        'security tools',
        'penetration testing tools',
        'cybersecurity community',
        'ethical hacking resources',
        'security cheatsheets',
        'vulnerability assessment'
    ],
    openGraph: {
        title: 'TheCyberHub - Empowering Cybersecurity Experts',
        description: 'Join the ultimate destination for cybersecurity enthusiasts. Access premium security tools and connect with experts.',
        url: 'https://thecyberhub.org',
        images: [
            {
                url: '/og-homepage.png',
                width: 1200,
                height: 630,
                alt: 'TheCyberHub Homepage',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'TheCyberHub - Empowering Cybersecurity Experts',
        description: 'Join the ultimate destination for cybersecurity enthusiasts.',
        images: ['/twitter-homepage.png'],
    },
    alternates: {
        canonical: 'https://thecyberhub.org',
    },
}

const Homepage = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <ToolsSection />
            <ContentSection />
            <Footer />

            {/* Structured Data for Homepage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "TheCyberHub",
                        "url": "https://thecyberhub.org",
                        "logo": "https://thecyberhub.org/logo.png",
                        "description": "Ultimate destination for cybersecurity enthusiasts to learn, connect, and grow together.",
                        "sameAs": [
                            "https://twitter.com/th3cyb3rhub",
                            "https://linkedin.com/company/th3cyb3rhub",
                            "https://github.com/th3cyb3rhub"
                        ]
                    })
                }}
            />
        </div>
    );
};

export default Homepage;