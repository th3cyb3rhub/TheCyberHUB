// components/HeroSection.tsx
"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal, Shield, Sparkles } from 'lucide-react';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Primary glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-500/8 rounded-full blur-[150px] animate-pulse" />
                {/* Secondary glow */}
                <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-orange-600/5 rounded-full blur-[100px] animate-float" />
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
            </div>

            <div className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {/* Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <Terminal className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-400">Open Source Cybersecurity Community</span>
                    <Sparkles className="w-3 h-3 text-orange-400/60" />
                </div>

                {/* Main heading */}
                <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    Learn. Build.
                    <span className="block gradient-text">Secure.</span>
                </h1>

                {/* Subtitle */}
                <p className={`text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    Join thousands of security enthusiasts. Access free tools, resources, and a community dedicated to cybersecurity excellence.
                </p>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <Link 
                        href="https://discord.gg/d3gBSNrVKb" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 btn-press glow-hover"
                    >
                        Join Discord
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link 
                        href="/tools" 
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-orange-500/50 text-white font-medium rounded-xl transition-all duration-300 hover:bg-white/5"
                    >
                        <Shield className="w-4 h-4 text-orange-500" />
                        Explore Tools
                    </Link>
                </div>

                {/* Stats */}
                <div className={`mt-16 pt-10 border-t border-white/10 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="grid grid-cols-3 gap-8">
                        <div className="group cursor-default">
                            <div className="text-2xl sm:text-3xl font-bold text-white group-hover:text-orange-500 transition-colors">10K+</div>
                            <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">Community Members</div>
                        </div>
                        <div className="group cursor-default">
                            <div className="text-2xl sm:text-3xl font-bold text-white group-hover:text-orange-500 transition-colors">50+</div>
                            <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">Free Tools</div>
                        </div>
                        <div className="group cursor-default">
                            <div className="text-2xl sm:text-3xl font-bold text-white group-hover:text-orange-500 transition-colors">100+</div>
                            <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">Resources</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
