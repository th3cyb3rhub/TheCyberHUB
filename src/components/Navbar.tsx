// components/Navbar.tsx
"use client"

import React, { useState, useEffect } from 'react';
import {
    ChevronDown,
    Menu,
    X,
    Search,
    Bell,
    User,
    FileText,
    Globe,
    Key,
    Wrench,
    Shield,
    Edit,
    Zap,
    ArrowUpRight,
    Target,
    ArrowLeftRight
} from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDropdown = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    // Navigation Data
    const navItems = {
        resources: {
            title: "Resources",
            items: [
                {
                    icon: <Target className="w-4 h-4" />,
                    title: "Roadmaps",
                    description: "Career guidance & learning paths",
                    href: "/roadmaps"
                },
                {
                    icon: <FileText className="w-4 h-4" />,
                    title: "Cheatsheets",
                    description: "Quick reference guides",
                    href: "/cheatsheets"
                },
            ]
        },
        tools: {
            title: "Tools",
            items: [
                {
                    icon: <Search className="w-4 h-4" />,
                    title: "Google Dork",
                    description: "Advanced Google search operators",
                    href: "/tools/google-dork"
                },
                {
                    icon: <ArrowLeftRight className="w-4 h-4" />,
                    title: "Encoder/Decoder",
                    description: "Multi-format encoding & decoding",
                    href: "/tools/encoder-decoder"
                },
                {
                    icon: <Globe className="w-4 h-4" />,
                    title: "Subdomain Finder",
                    description: "Discover hidden subdomains",
                    href: "/tools/subfinder"
                },
                {
                    icon: <Key className="w-4 h-4" />,
                    title: "JWT Analyzer",
                    description: "Analyze JWT tokens & security",
                    href: "/tools/jwt-analyzer"
                },
                {
                    icon: <Edit className="w-4 h-4" />,
                    title: "Markdown Editor",
                    description: "Real-time markdown editor",
                    href: "/tools/markdown-editor"
                },
                {
                    icon: <Zap className="w-4 h-4" />,
                    title: "SSRF Tester",
                    description: "Server-Side Request Forgery testing",
                    href: "/tools/ssrf-tester"
                },
                {
                    icon: <ArrowUpRight className="w-4 h-4" />,
                    title: "Subdomain Takeover",
                    description: "Check for subdomain takeover risks",
                    href: "/tools/sub-takeover"
                },
                {
                    icon: <Wrench className="w-4 h-4" />,
                    title: "All Tools",
                    description: "Browse complete tool collection",
                    href: "/tools"
                }
            ]
        },
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-orange-500/5' : 'bg-black/90 backdrop-blur-sm'
        }`}>
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3">
                    <div className="relative group">
                        <Image
                            width={40}
                            height={40}
                            src="/logo.png"
                            alt="TheCyberHub Logo"
                            className="h-10 w-10 object-contain"
                        />
                        <div className="absolute inset-0 bg-orange-500/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300 -z-10"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-white tracking-tight">TheCyberHub</span>
                        <span className="text-xs text-orange-400 font-medium -mt-1">Security Community</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-1">
                    {Object.entries(navItems).map(([key, section]) => (
                        <div key={key} className="relative">
                            <button
                                onClick={() => toggleDropdown(key)}
                                className="flex items-center space-x-1 px-4 py-2 text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 rounded-md transition-all duration-200"
                            >
                                <span>{section.title}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} />
                            </button>

                            {activeDropdown === key && (
                                <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-lg shadow-xl p-2 z-50">
                                    <div className="grid gap-1">
                                        {section.items.map((item, index) => (
                                            <Link
                                                key={index}
                                                href={item.href}
                                                className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-800/50 hover:text-orange-400 transition-all duration-200 group"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                <div className="text-orange-400 mt-0.5 group-hover:scale-110 transition-transform">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-white group-hover:text-orange-400">{item.title}</div>
                                                    <div className="text-sm text-gray-400">{item.description}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Tools Section Footer */}
                                    {key === 'tools' && (
                                        <div className="border-t border-gray-800 mt-2 pt-2">
                                            <Link
                                                href="/tools"
                                                className="flex items-center justify-between p-3 rounded-md hover:bg-orange-500/10 hover:text-orange-400 transition-all duration-200 group"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <Shield className="w-4 h-4 text-orange-400" />
                                                    <span className="font-medium text-orange-400">Browse All Security Tools</span>
                                                </div>
                                                <ArrowUpRight className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-3">
                    <button className="relative p-2 text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 rounded-lg transition-all duration-200">
                        <Bell className="h-5 w-5" />
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-orange-500 rounded-full animate-pulse"></div>
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('user')}
                            className="p-2 text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                        >
                            <User className="h-5 w-5" />
                        </button>

                        {activeDropdown === 'user' && (
                            <div className="absolute top-full right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-lg shadow-xl p-1 z-50">
                                <div className="px-3 py-2 border-b border-gray-800">
                                    <div className="text-white font-medium">My Account</div>
                                </div>
                                {['Profile', 'Dashboard', 'My Tools', 'Settings', 'Sign out'].map((item) => (
                                    <a key={item} href="#" className="block px-3 py-2 text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 rounded-md transition-all duration-200">
                                        {item}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold px-4 py-2 rounded-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105">
                        Dashboard
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                placeholder="Search tools, resources..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-400"
                            />
                        </div>

                        {/* Mobile Navigation Items */}
                        {Object.entries(navItems).map(([key, section]) => (
                            <div key={key} className="space-y-2">
                                <div className="text-orange-400 font-semibold text-sm uppercase tracking-wide">{section.title}</div>
                                {section.items.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="flex items-center space-x-3 py-2 px-3 text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 rounded-md transition-all duration-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.icon}
                                        <div>
                                            <div className="font-medium">{item.title}</div>
                                            <div className="text-xs text-gray-500">{item.description}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ))}

                        <div className="pt-4 border-t border-gray-800">
                            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold py-2 rounded-lg">
                                Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;