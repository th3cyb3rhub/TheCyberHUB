// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, MessageCircle, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
    const quickLinks = [
        { name: 'Tools', href: '/tools' },
        { name: 'Cheatsheets', href: '/cheatsheets' },
        { name: 'Roadmaps', href: '/roadmaps' },
        { name: 'Blog', href: '/blog' },
    ];

    const resources = [
        { name: 'Events', href: '/events' },
        { name: 'Code Review', href: '/code-review' },
    ];

    const socials = [
        { name: 'GitHub', href: 'https://github.com/th3cyb3rhub', icon: <Github className="w-4 h-4" /> },
        { name: 'Twitter', href: 'https://twitter.com/th3cyb3rhub', icon: <Twitter className="w-4 h-4" /> },
        { name: 'Discord', href: 'https://discord.gg/d3gBSNrVKb', icon: <MessageCircle className="w-4 h-4" /> },
    ];

    return (
        <footer aria-label="Site footer" className="border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-black/50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* Main footer content */}
                <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <Image
                                width={28}
                                height={28}
                                src="/logo.png"
                                alt="TheCyberHub"
                                className="w-7 h-7 transition-transform group-hover:scale-110"
                            />
                            <span className="text-gray-900 dark:text-white font-semibold">TheCyberHub</span>
                        </Link>
                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                            Open source cybersecurity community for learning and growth.
                        </p>
                        {/* Social icons */}
                        <div className="flex items-center gap-2">
                            {socials.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-orange-500/20 flex items-center justify-center text-gray-500 hover:text-orange-500 transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href}
                                        className="text-sm text-gray-500 hover:text-orange-400 transition-colors inline-flex items-center gap-1 group"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
                        <ul className="space-y-2.5">
                            {resources.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href}
                                        className="text-sm text-gray-500 hover:text-orange-400 transition-colors inline-flex items-center gap-1"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link 
                                    href="https://github.com/th3cyb3rhub"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-500 hover:text-orange-400 transition-colors inline-flex items-center gap-1"
                                >
                                    Contribute
                                    <ExternalLink className="w-3 h-3" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Community</h4>
                        <Link
                            href="https://discord.gg/d3gBSNrVKb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-lg text-sm text-orange-400 transition-all duration-300"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Join Discord
                        </Link>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="py-6 border-t border-gray-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-600">
                        © {new Date().getFullYear()} TheCyberHub. All rights reserved.
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-current mx-1" /> by the community
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;