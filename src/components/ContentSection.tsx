// components/ContentSection.tsx
"use client"

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, MessageCircle, ArrowRight, Zap, Users, BookOpen } from 'lucide-react';

const ContentSection = () => {
    const benefits = [
        { icon: <Users className="w-5 h-5" />, text: "10K+ Members" },
        { icon: <Zap className="w-5 h-5" />, text: "Active 24/7" },
        { icon: <BookOpen className="w-5 h-5" />, text: "Free Resources" },
    ];

    return (
        <section className="bg-surface-primary py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-white/5">
            <div className="max-w-5xl mx-auto">
                {/* CTA Section */}
                <div className="relative text-center py-16 px-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-gradient-to-b from-orange-500/5 to-transparent overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-orange-500/10 rounded-full blur-[100px]" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-orange-500/20 bg-orange-500/10">
                            <MessageCircle className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-orange-400 font-medium">Join the Community</span>
                        </div>
                        
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Ready to level up your <span className="gradient-text">security skills</span>?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                            Connect with fellow security enthusiasts, get help from experts, and stay updated with the latest in cybersecurity.
                        </p>
                        
                        {/* Benefits */}
                        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <span className="text-orange-500/70">{benefit.icon}</span>
                                    <span className="text-sm">{benefit.text}</span>
                                </div>
                            ))}
                        </div>
                        
                        <Link 
                            href="https://discord.gg/d3gBSNrVKb" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 btn-press"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Join Discord Community
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-12 flex items-center justify-center gap-4">
                    <Link 
                        href="https://github.com/th3cyb3rhub" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-white dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-all duration-300"
                    >
                        <Github className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">GitHub</span>
                    </Link>
                    <Link 
                        href="https://twitter.com/th3cyb3rhub" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-white dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-all duration-300"
                    >
                        <Twitter className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-sky-400 transition-colors" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Twitter</span>
                    </Link>
                    <Link 
                        href="https://discord.gg/d3gBSNrVKb" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-white dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-all duration-300"
                    >
                        <MessageCircle className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-400 transition-colors" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Discord</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ContentSection;
