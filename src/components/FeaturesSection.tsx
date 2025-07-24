// components/FeaturesSection.tsx
import React from 'react';
import { Wrench, FileText, PenTool, Briefcase, ChevronRight } from 'lucide-react';

const FeaturesSection = () => {
    const features = [
        {
            icon: <Wrench className="w-8 h-8" />,
            title: "Security Tools",
            description: "Access powerful tools for subdomain enumeration, SSL scanning, URL analysis, and more.",
            items: ["Subdomain Finder", "SSL Scanner", "URL Analyzer", "Port Scanner"]
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: "Knowledge Base",
            description: "Comprehensive resources including cheatsheets, payloads, and methodologies.",
            items: ["Security Cheatsheets", "Payload Collections", "Testing Methodologies", "Quick References"]
        },
        {
            icon: <PenTool className="w-8 h-8" />,
            title: "Content & Writeups",
            description: "In-depth articles, tutorials, and detailed security analysis from experts.",
            items: ["Technical Blogs", "CTF Writeups", "Vulnerability Analysis", "Security Tutorials"]
        },
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: "Career Growth",
            description: "Internship opportunities and career development in cybersecurity.",
            items: ["Paid Internships", "Career Guidance", "Industry Connections", "Skill Development"]
        }
    ];

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Everything You Need for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Cybersecurity Excellence</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        From powerful security tools to comprehensive learning resources, we provide everything you need to succeed in cybersecurity.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group bg-gray-900/50 border border-gray-800 hover:border-orange-400/50 rounded-xl p-6 transition-all duration-300">
                            <div className="text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 mb-4 leading-relaxed">{feature.description}</p>
                            <ul className="space-y-1">
                                {feature.items.map((item, idx) => (
                                    <li key={idx} className="text-sm text-gray-500 flex items-center">
                                        <ChevronRight className="w-3 h-3 mr-1 text-orange-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;