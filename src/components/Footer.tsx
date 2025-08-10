// components/Footer.tsx
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Linkedin, Mail, Send, Shield, ArrowRight } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setTimeout(() => setIsSubscribed(false), 3000);
            setEmail('');
        }
    };

    const footerLinks = {
        tools: [
            { name: "Subdomain Finder", href: "/tools/subfinder" },
            { name: "JWT Analyzer", href: "/tools/jwt-analyzer" },
            { name: "SSL Scanner", href: "/tools/ssl-scanner" },
            { name: "Port Scanner", href: "/tools/port-scanner" },
            { name: "All Tools", href: "/tools" }
        ],
        resources: [
            { name: "Cheatsheets", href: "/cheatsheets" },
            { name: "Methodologies", href: "/methodology" },
            { name: "Documentation", href: "/docs" },
            { name: "API Reference", href: "/api" }
        ],
        community: [
            { name: "Blog", href: "/blog" },
            { name: "Writeups", href: "/writeups" },
            { name: "Events", href: "/events" },
            { name: "Discord", href: "https://discord.gg/d3gBSNrVKb" }
        ],
        company: [
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" }
        ]
    };

    const socialLinks = [
        { icon: Github, href: "https://github.com/thecyberhub", name: "GitHub" },
        { icon: Twitter, href: "https://twitter.com/thecyberhub", name: "Twitter" },
        { icon: Linkedin, href: "https://linkedin.com/company/thecyberhub", name: "LinkedIn" },
        { icon: Mail, href: "mailto:contact@thecyberhub.org", name: "Email" }
    ];

    return (
        <footer className="bg-black border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Newsletter Section */}
                <div className="py-12 border-b border-gray-800">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
                            <p className="text-gray-400">
                                Get the latest security tools, research, and community updates delivered to your inbox.
                            </p>
                        </div>
                        <form onSubmit={handleSubscribe} className="flex gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your.email@company.com"
                                required
                                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                            />
                            <button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2"
                            >
                                {isSubscribed ? (
                                    <>
                                        <Shield className="w-4 h-4" />
                                        <span>Done!</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>Subscribe</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="py-12">
                    <div className="grid md:grid-cols-6 gap-8">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <div className="flex items-center mb-4">
                                <Image
                                    src="/logo.png"
                                    alt="TheCyberHub Logo"
                                    width={32}
                                    height={32}
                                    className="h-8 w-8 mr-3"
                                />
                                <span className="text-xl font-bold text-white">TheCyberHub</span>
                            </div>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Empowering cybersecurity professionals with tools, resources, and community.
                            </p>
                            <div className="flex space-x-4">
                                {socialLinks.map(({ icon: Icon, href, name }, index) => (
                                    <a
                                        key={index}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-all duration-200 group"
                                    >
                                        <Icon className="h-4 w-4 text-gray-400 group-hover:text-black transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h4 className="text-white font-semibold mb-4 capitalize">{category}</h4>
                                <ul className="space-y-2">
                                    {links.map((link: any) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                target={link.href.startsWith('http') ? '_blank' : '_self'}
                                                rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                                                className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm flex items-center group"
                                            >
                                                <span>{link.name}</span>
                                                <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-1 group-hover:translate-x-0" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <p className="text-gray-500 text-sm">
                                &copy; {new Date().getFullYear()} TheCyberHub. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-1 text-green-400 text-xs">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>All systems operational</span>
                            </div>
                        </div>

                        <div className="flex space-x-6 text-sm">
                            <Link href="/privacy" className="text-gray-500 hover:text-orange-400 transition-colors">
                                Privacy
                            </Link>
                            <Link href="/terms" className="text-gray-500 hover:text-orange-400 transition-colors">
                                Terms
                            </Link>
                            <Link href="/security" className="text-gray-500 hover:text-orange-400 transition-colors">
                                Security
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;