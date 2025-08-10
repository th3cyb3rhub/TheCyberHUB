// components/FeaturesSection.tsx
"use client"

import React from 'react';
import { Wrench, FileText, PenTool, Briefcase, ArrowRight } from 'lucide-react';

const FeaturesSection = () => {
    const features = [
        {
            icon: <Wrench className="w-8 h-8" />,
            title: "Security Tools",
            description: "Access powerful tools for enumeration, scanning, and analysis.",
            items: ["Subdomain Finder", "SSL Scanner", "URL Analyzer", "Port Scanner"]
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: "Knowledge Base",
            description: "Comprehensive cheatsheets, payloads, and methodologies.",
            items: ["Security Cheatsheets", "Payload Collections", "Testing Guides", "Quick References"]
        },
        {
            icon: <PenTool className="w-8 h-8" />,
            title: "Content & Writeups",
            description: "In-depth articles, tutorials, and expert security analysis.",
            items: ["Technical Blogs", "CTF Writeups", "Vulnerability Research", "Tutorials"]
        },
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: "Career Growth",
            description: "Internship opportunities and career development resources.",
            items: ["Paid Internships", "Career Guidance", "Industry Connections", "Skill Development"]
        }
    ];

    return (
        <section className="relative bg-black py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(to right, rgba(249, 115, 22, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(249, 115, 22, 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
            }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>

            <div className="relative max-w-7xl mx-auto z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        An Arsenal for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Cybersecurity Excellence</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        From powerful security tools to comprehensive learning resources, we provide everything you need to succeed.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/10 hover:border-transparent transform hover:-translate-y-2"
                             style={{'--border-angle': '0deg'} as React.CSSProperties}
                             onMouseMove={(e) => {
                                 const rect = e.currentTarget.getBoundingClientRect();
                                 const x = e.clientX - rect.left;
                                 const y = e.clientY - rect.top;
                                 const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI) + 180;
                                 e.currentTarget.style.setProperty('--border-angle', `${angle}deg`);
                             }}
                        >
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                 style={{
                                     border: '2px solid transparent',
                                     background: `conic-gradient(from var(--border-angle), transparent 25%, #f97316, transparent 75%) border-box`,
                                     WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                     WebkitMaskComposite: 'xor',
                                     maskComposite: 'exclude',
                                 }}
                            ></div>
                            <div className="relative z-10">
                                <div className="flex-shrink-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 w-16 h-16 rounded-xl flex items-center justify-center text-orange-400 mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500/20 group-hover:text-orange-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 mb-6 leading-relaxed text-base">{feature.description}</p>
                                <ul className="space-y-2">
                                    {feature.items.map((item, idx) => (
                                        <li key={idx} className="text-sm text-gray-400 flex items-center transition-colors group-hover:text-gray-300">
                                            <ArrowRight className="w-4 h-4 mr-2 text-orange-400/50 transition-colors group-hover:text-orange-400 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
