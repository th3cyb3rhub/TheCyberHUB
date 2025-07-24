// components/HeroSection.tsx
import React from 'react';
import { Shield, Users, Wrench, Globe, ShieldCheck, FileText } from 'lucide-react';

const HeroSection = () => {
    const stats = [
        { number: "150K+", label: "Community Members" },
        { number: "500+", label: "Security Tools" },
        { number: "1K+", label: "Writeups & Blogs" },
        { number: "50+", label: "Industry Partners" }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/5"></div>
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div className="space-y-8">
                            <div className="flex items-center space-x-2">
                                <Shield className="h-6 w-6 text-orange-400" />
                                <span className="border border-orange-500/30 text-orange-400 bg-orange-500/10 text-sm px-3 py-1 rounded-full">
                  Security Community
                </span>
                            </div>

                            <div className="space-y-6">
                                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                                    Empowering the Next Generation of
                                    <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"> Cybersecurity Experts</span>
                                </h1>
                                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                                    Join TheCyberHub&apos;s community of 150,000+ security professionals. Access powerful tools, comprehensive resources, and expert knowledge to advance your cybersecurity career.
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold px-8 py-4 rounded-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                                    <Users className="w-5 h-5" />
                                    <span>Join Community</span>
                                </button>
                                <button className="group border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                                    <Wrench className="w-5 h-5" />
                                    <span>Explore Tools</span>
                                </button>
                            </div>
                        </div>

                        {/* Visual Element */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative">
                                <div className="w-96 h-96 rounded-full bg-gradient-to-br from-orange-500/10 to-orange-600/20 border-2 border-orange-400/40 shadow-2xl shadow-orange-500/20 flex items-center justify-center relative overflow-hidden">
                                    <div className="w-72 h-72 rounded-full bg-gradient-to-br from-orange-500/5 to-orange-600/10 border-2 border-orange-400/60 flex items-center justify-center">
                                        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 shadow-lg shadow-orange-500/30 flex items-center justify-center">
                                            <Shield className="h-24 w-24 text-orange-400 drop-shadow-lg" />
                                        </div>
                                    </div>

                                    {/* Floating Elements */}
                                    {[
                                        { icon: Wrench, position: "top-8 right-8", rotation: "rotate-12" },
                                        { icon: FileText, position: "bottom-12 left-8", rotation: "-rotate-12" },
                                        { icon: Globe, position: "top-1/2 right-4", rotation: "rotate-6" },
                                        { icon: ShieldCheck, position: "top-1/3 left-4", rotation: "-rotate-6" }
                                    ].map(({ icon: Icon, position, rotation }, index) => (
                                        <div key={index} className={`absolute ${position} w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center border border-orange-400 shadow-lg transform ${rotation} animate-pulse`}>
                                            <Icon className="h-6 w-6 text-black" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2 group-hover:scale-110 transition-transform">
                                    {stat.number}
                                </div>
                                <div className="text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSection;