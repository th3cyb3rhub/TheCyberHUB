import type { Metadata } from 'next'
import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ToolsSection from '@/components/ToolsSection';
import CheatsheetsSection from '@/components/CheatsheetsSection';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'TheCyberHub - Learn, Practice, Master Cybersecurity',
    description: 'Your all-in-one cybersecurity platform. Access 22+ security tools, 100+ CTF challenges, cheatsheets, mentorship, and join a thriving community of 10K+ security enthusiasts.',
    keywords: ['cybersecurity', 'security tools', 'CTF', 'hacking', 'penetration testing', 'cheatsheets', 'mentorship'],
}

const Homepage = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <HeroSection />
            <FeaturesSection />
            <ToolsSection />
            <CheatsheetsSection />
            <ContentSection />
            <Footer />
        </div>
    );
};

export default Homepage;
