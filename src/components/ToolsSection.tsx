// components/ToolsSection.tsx
import React from 'react';
import { ExternalLink } from 'lucide-react';

const ToolsSection = () => {
    const popularTools = [
        {
            name: "Subdomain Finder",
            description: "Powerful subdomain enumeration tool",
            category: "Reconnaissance",
            users: "25K+"
        },
        {
            name: "SSL Scanner",
            description: "Comprehensive SSL/TLS certificate analyzer",
            category: "Security",
            users: "18K+"
        },
        {
            name: "URL Analyzer",
            description: "Deep URL and website security analysis",
            category: "Analysis",
            users: "22K+"
        }
    ];

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Security Tools</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover our most-used security tools built for professionals by professionals.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularTools.map((tool, index) => (
                        <div key={index} className="bg-gray-800/50 border border-gray-700 hover:border-orange-400/50 rounded-xl p-6 transition-all duration-300 group cursor-pointer">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">{tool.name}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{tool.description}</p>
                                </div>
                                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-orange-400 bg-orange-400/10 border border-orange-400/20 px-3 py-1 rounded-full">{tool.category}</span>
                                <span className="text-sm text-gray-400">{tool.users} users</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                        Explore All Tools
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ToolsSection;