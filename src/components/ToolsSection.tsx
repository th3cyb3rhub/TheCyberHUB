// components/ToolsSection.tsx
"use client"

import React from 'react';
import { ArrowRight, ShieldCheck, Globe, Link as LinkIcon } from 'lucide-react';

const ToolsSection = () => {
    const popularTools = [
        {
            name: "Subdomain Finder",
            description: "Powerful subdomain enumeration and discovery.",
            category: "Reconnaissance",
            users: "25K+",
            icon: <Globe className="w-8 h-8" />
        },
        {
            name: "SSL Scanner",
            description: "Comprehensive SSL/TLS certificate analysis.",
            category: "Security",
            users: "18K+",
            icon: <ShieldCheck className="w-8 h-8" />
        },
        {
            name: "URL Analyzer",
            description: "Deep URL and website security inspection.",
            category: "Analysis",
            users: "22K+",
            icon: <LinkIcon className="w-8 h-8" />
        }
    ];

    return (
        <section className="relative bg-black py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-30" style={{
                backgroundImage: 'linear-gradient(to right, rgba(249, 115, 22, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(249, 115, 22, 0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent 70%)'
            }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-0"></div>

            <div className="relative max-w-7xl mx-auto z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Community-Favorite <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Security Tools</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Discover our most-used security tools, built by and for the cybersecurity community.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularTools.map((tool, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                            style={{'--mouse-x': '50%', '--mouse-y': '50%'} as React.CSSProperties}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                e.currentTarget.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
                                e.currentTarget.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
                            }}
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                                background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(249, 115, 22, 0.15), transparent 80%)'
                            }}></div>
                            <div className="relative z-10">
                                <div className="absolute top-0 right-0 m-6 text-gray-600 group-hover:text-orange-400 transition-colors duration-300">
                                    <ArrowRight className="w-6 h-6 transform -rotate-45 group-hover:rotate-0 transition-transform" />
                                </div>
                                <div className="flex-shrink-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 w-16 h-16 rounded-xl flex items-center justify-center text-orange-400 mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500/20 group-hover:shadow-lg group-hover:shadow-orange-500/10">
                                    {tool.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{tool.name}</h3>
                                    <p className="text-gray-400 mb-6">{tool.description}</p>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                    <span className="text-sm text-orange-400 bg-orange-400/10 border border-orange-400/20 px-3 py-1 rounded-full font-medium">{tool.category}</span>
                                    <span className="text-sm text-gray-500">{tool.users} users</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto group">
                        <span>Explore All Tools</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1"/>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ToolsSection;
