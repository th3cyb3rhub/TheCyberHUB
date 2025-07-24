// app/page.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ToolsSection from '@/components/ToolsSection';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer';

const Homepage = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <ToolsSection />
            <ContentSection />
            <Footer />
        </div>
    );
};

export default Homepage;