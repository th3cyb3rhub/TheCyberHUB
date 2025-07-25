// components/Navbar.tsx
"use client"

import React, { useState, useEffect } from 'react';
import {
    /* Shield,*/
    ChevronDown,
    Menu,
    X,
    Search,
    Bell,
    User,
    Briefcase,
    FileText,
    Database,
    BookOpen,
    Terminal,
    Globe,
    ExternalLink,
    ShieldCheck,
    Wrench,
    PenTool,
    Calendar,
    Users,
    Key
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
                { icon: <FileText className="w-4 h-4" />, title: "Cheatsheets", description: "Quick reference guides", href: "/cheatsheets" },
       /*         { icon: <Database className="w-4 h-4" />, title: "Payloads", description: "Security testing payloads", href: "/payloads" },
                { icon: <BookOpen className="w-4 h-4" />, title: "Methodology", description: "Step-by-step guides", href: "/methodology" },
                { icon: <Terminal className="w-4 h-4" />, title: "Learning Paths", description: "Structured curricula", href: "/paths" }*/
            ]
        },
        tools: {
            title: "Tools",
            items: [
                { icon: <Globe className="w-4 h-4" />, title: "Subdomain Finder", description: "Discover hidden subdomains", href: "/tools/subfinder" },
                { icon: <Key className="w-4 h-4" />, title: "JWT Analyzer", description: "Analyze JWT tokens & security", href: "/tools/jwt-analyzer" },
           /*     { icon: <ShieldCheck className="w-4 h-4" />, title: "SSL Scanner", description: "SSL certificate analysis", href: "/tools/ssl-scan" },
                { icon: <Wrench className="w-4 h-4" />, title: "All Tools", description: "Browse all security tools", href: "/tools" }
        */    ]
        },
     /*   content: {
            title: "Content",
            items: [
                { icon: <PenTool className="w-4 h-4" />, title: "Blog Posts", description: "Latest security insights", href: "/blog" },
                { icon: <FileText className="w-4 h-4" />, title: "Writeups", description: "Detailed analysis & tutorials", href: "/writeups" },
                { icon: <Calendar className="w-4 h-4" />, title: "Events", description: "Webinars & workshops", href: "/events" },
                { icon: <Users className="w-4 h-4" />, title: "Community", description: "Join discussions", href: "/community" }
            ]
        }*/
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
                            src="/tch_title.png"
                            alt="TheCyberHUB Logo"
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
                                            <a
                                                key={index}
                                                href={item.href}
                                                className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-800/50 hover:text-orange-400 transition-all duration-200 group"
                                            >
                                                <div className="text-orange-400 mt-0.5 group-hover:scale-110 transition-transform">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-white group-hover:text-orange-400">{item.title}</div>
                                                    <div className="text-sm text-gray-400">{item.description}</div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/*<a href="/internships" className="flex items-center space-x-1 px-4 py-2 text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 rounded-md transition-all duration-200">
                        <Briefcase className="w-4 h-4" />
                        <span>Internships</span>
                        <span className="ml-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs px-2 py-0.5 rounded-full">New</span>
                    </a>*/}
                </div>

                {/* Search Bar */}
                {/*                <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            placeholder="Search tools, writeups, resources..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                        />
                    </div>
                </div>*/}

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
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-400"
                            />
                        </div>

                        {/*{Object.entries(navItems).map(([key, section]) => (*/}
                        {/*    <div key={key} className="space-y-2">*/}
                        {/*        <div className="text-orange-400 font-semibold text-sm uppercase tracking-wide">{section.title}</div>*/}
                        {/*        {section.items.map((item, index) => (*/}
                        {/*            <a key={index} href={item.href} className="flex items-center space-x-3 py-2 px-3 text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 rounded-md transition-all duration-200">*/}
                        {/*                {item.icon}*/}
                        {/*                <span>{item.title}</span>*/}
                        {/*            </a>*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*))}*/}

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