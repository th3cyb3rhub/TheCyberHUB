import type { Metadata } from 'next'
import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ToolsSection from '@/components/ToolsSection';
import CheatsheetsSection from '@/components/CheatsheetsSection';
import ContentSection from '@/components/ContentSection';
import JobsSection from '@/components/JobsSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'TheCyberHub - Learn, Practice, Master Cybersecurity',
    description: 'Your all-in-one cybersecurity platform. Access 22+ security tools, 100+ CTF challenges, cheatsheets, internships, and join a thriving community of 10K+ security enthusiasts.',
    keywords: ['cybersecurity', 'security tools', 'CTF', 'hacking', 'penetration testing', 'cheatsheets', 'internships'],
    openGraph: {
        title: 'TheCyberHub - Learn, Practice, Master Cybersecurity',
        description: 'Your all-in-one cybersecurity platform. Access 22+ security tools, 100+ CTF challenges, cheatsheets, internships, and join a thriving community of 10K+ security enthusiasts.',
        type: 'website',
    },
}

const Homepage = () => {
    return (
        <div className="min-h-screen bg-surface-primary text-content-primary">
            <HeroSection />
            <FeaturesSection />
            <ToolsSection />
            <CheatsheetsSection />
            <ContentSection />
            <JobsSection />
            <Footer />
        </div>
    );
};

export default Homepage;
