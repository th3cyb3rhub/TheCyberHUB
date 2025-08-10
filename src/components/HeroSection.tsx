// components/HeroSection.tsx
"use client"

import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import { Users, Wrench, Globe, ShieldCheck, FileText, ArrowLeftRight, Key } from 'lucide-react';

const HeroSection = () => {
    const satelliteIcons = [
        { icon: Wrench, size: 'w-12 h-12' },
        { icon: ArrowLeftRight, size: 'w-10 h-10' },
        { icon: Globe, size: 'w-14 h-14' },
        { icon: Key, size: 'w-10 h-10' },
        { icon: FileText, size: 'w-12 h-12' },
    ];

    return (
        <>
            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }

                @keyframes grid-pan {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes pulse-glow {
                    0%, 100% {
                        box-shadow: 0 0 40px 10px rgba(249, 115, 22, 0.15), inset 0 0 10px 2px rgba(249, 115, 22, 0.1);
                    }
                    50% {
                        box-shadow: 0 0 60px 20px rgba(249, 115, 22, 0.25), inset 0 0 15px 4px rgba(249, 115, 22, 0.2);
                    }
                }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes spin-fast-reverse {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }

                @keyframes orbit-path {
                    0% { transform: rotate(0deg) translateX(200px) rotate(0deg); }
                    100% { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
                }

                .grid-background {
                    animation: grid-pan 40s linear infinite;
                    background-image:
                            radial-gradient(circle at center, rgba(249, 115, 22, 0.08) 0%, transparent 40%),
                            linear-gradient(to right, rgba(255, 165, 0, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 165, 0, 0.05) 1px, transparent 1px);
                    background-size: 100% 100%, 50px 50px, 50px 50px;
                }

                .cyber-core-ring {
                    border-style: solid;
                    border-color: transparent;
                    border-radius: 50%;
                    position: absolute;
                    inset: 0;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}</style>

            <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-900 text-white grid-background">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 -z-10"></div>

                <div className="relative max-w-screen-xl mx-auto z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* Text Content */}
                        <div className="space-y-8 text-center lg:text-left">
                            <div className="flex items-center space-x-3 justify-center lg:justify-start">
                                <ShieldCheck className="h-7 w-7 text-orange-400" />
                                <span className="border border-orange-500/20 text-orange-300 bg-orange-500/10 text-sm px-4 py-1.5 rounded-full font-medium tracking-wider">
                                    Your Hub for Cybersecurity Excellence
                                </span>
                            </div>
                            <div className="space-y-6">
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter">
                                    Empowering the Next
                                    <span className="mt-2 block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Cybersecurity Generation</span>
                                </h1>
                                <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Join TheCyberHub's thriving community. Access powerful tools, comprehensive roadmaps, and expert knowledge to accelerate your cybersecurity career.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                <Link href="https://discord.gg/d3gBSNrVKb" target="_blank" rel="noopener noreferrer" className="group relative bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                                    <Users className="w-5 h-5" />
                                    <span>Join Community</span>
                                </Link>
                                <Link href="/tools" className="group border-2 border-orange-500/50 text-orange-300 hover:bg-orange-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105">
                                    <Wrench className="w-5 h-5" />
                                    <span>Explore Tools</span>
                                </Link>
                            </div>
                        </div>

                        {/* Visual Animation: Cyber Core */}
                        <div className="hidden lg:flex items-center justify-center h-[400px]">
                            <div className="relative w-[400px] h-[400px]">
                                {/* Central Logo and Core */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="w-60 h-60 rounded-full bg-gray-800/60 border border-orange-400/20 flex items-center justify-center animate-pulse-glow">
                                        <Image
                                            width={120}
                                            height={120}
                                            src="/logo.png"
                                            alt="TheCyberHub Logo"
                                            className="object-contain drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]"
                                        />
                                    </div>
                                </div>

                                {/* Animated Rings */}
                                <div className="cyber-core-ring" style={{ borderWidth: '2px', borderColor: 'rgba(249, 115, 22, 0.1)', animationName: 'spin-slow', animationDuration: '20s' }}></div>
                                <div className="cyber-core-ring" style={{ borderWidth: '1px', borderColor: 'rgba(249, 115, 22, 0.2)', animationName: 'spin-fast-reverse', animationDuration: '15s', transform: 'scale(0.85)' }}></div>
                                <div className="cyber-core-ring" style={{ borderWidth: '1px', borderStyle: 'dashed', borderColor: 'rgba(249, 115, 22, 0.3)', animationName: 'spin-slow', animationDuration: '30s', transform: 'scale(1.15)' }}></div>
                                <div className="cyber-core-ring" style={{ borderWidth: '2px', borderTopColor: 'rgba(249, 115, 22, 0.5)', animationName: 'spin-slow', animationDuration: '12s', transform: 'scale(1.3)' }}></div>

                                {/* Orbiting Icons */}
                                {satelliteIcons.map(({ icon: Icon, size }, index) => (
                                    <div key={index} className="absolute inset-0 z-20" style={{ animation: `orbit-path 22s linear ${index * -4.4}s infinite` }}>
                                        <div className="absolute top-1/2 left-1/2">
                                            <div className={`${size} bg-gray-700/40 backdrop-blur-lg border border-orange-500/20 rounded-xl flex items-center justify-center shadow-2xl shadow-black/30`}>
                                                <Icon className="h-2/3 w-2/3 text-orange-400" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSection;
