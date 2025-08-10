// components/Navbar.tsx
// Note: This is a Navbar component. You may want to save it in a file like `components/Navbar.tsx`.
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ChevronDown, Menu, X, Search, FileText, Globe, Key, Wrench,
    Edit, Zap, ArrowUpRight, Target, ArrowLeftRight, Users
} from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);

    // --- Effects ---
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeDropdown && !(event.target as Element).closest('.nav-item-container')) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeDropdown]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isMobileMenuOpen]);


    // --- Handlers ---
    const toggleDropdown = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setMobileSubMenu(null); // Reset submenus when closing
    };

    const toggleMobileSubMenu = (menu: string) => {
        setMobileSubMenu(mobileSubMenu === menu ? null : menu);
    };

    // --- Data ---
    const navItems = {
        resources: {
            title: "Resources",
            items: [
                { icon: <Target />, title: "Roadmaps", description: "Career guidance & learning paths", href: "/roadmaps" },
                { icon: <FileText />, title: "Cheatsheets", description: "Quick reference guides", href: "/cheatsheets" },
            ]
        },
        tools: {
            title: "Tools",
            items: [
                { icon: <Search />, title: "Google Dork", description: "Advanced Google search", href: "/tools/google-dork" },
                { icon: <ArrowLeftRight />, title: "Encoder/Decoder", description: "Multi-format encoding", href: "/tools/encoder-decoder" },
                { icon: <ArrowLeftRight />, title: "Text Diff", description: "Compare text differences", href: "/tools/text-text-diff" },
                { icon: <Globe />, title: "Subdomain Finder", description: "Discover subdomains", href: "/tools/subfinder" },
                { icon: <Key />, title: "JWT Analyzer", description: "Analyze JWT tokens", href: "/tools/jwt-analyzer" },
                { icon: <Edit />, title: "Markdown Editor", description: "Real-time markdown editor", href: "/tools/markdown-editor" },
                { icon: <Zap />, title: "SSRF Tester", description: "Test for SSRF flaws", href: "/tools/ssrf-tester" },
                { icon: <ArrowUpRight />, title: "Subdomain Takeover", description: "Check takeover risks", href: "/tools/sub-takeover" },
            ]
        },
    };

    // --- Render ---
    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
        }`}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        <Image width={40} height={40} src="/logo.png" alt="TheCyberHub Logo" className="h-10 w-10 object-contain transition-transform duration-300 hover:rotate-12" />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white tracking-tight">TheCyberHub</span>
                            <span className="text-xs text-orange-400 font-medium -mt-1">Security Community</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {Object.entries(navItems).map(([key, section]) => (
                            <div key={key} className="relative nav-item-container">
                                <button onClick={() => toggleDropdown(key)} className="flex items-center space-x-1 px-4 py-2 text-gray-300 hover:text-orange-400 transition-colors duration-200">
                                    <span>{section.title}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 transition-all duration-300 ease-in-out ${activeDropdown === key ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                    <div className={`bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/40 ${key === 'tools' ? 'w-[34rem]' : 'w-80'}`}>
                                        <div className={`grid p-3 gap-2 ${key === 'tools' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                            {section.items.map((item, index) => (
                                                <Link key={index} href={item.href} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 group" onClick={() => setActiveDropdown(null)}>
                                                    <div className="text-orange-400 mt-1">{React.cloneElement(item.icon, { className: 'w-5 h-5' })}</div>
                                                    <div>
                                                        <div className="font-semibold text-white">{item.title}</div>
                                                        <div className="text-sm text-gray-400">{item.description}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        {key === 'tools' && (
                                            <div className="border-t border-white/10 m-3 pt-3">
                                                <Link href="/tools" className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 group" onClick={() => setActiveDropdown(null)}>
                                                    <div className="flex items-center space-x-3">
                                                        <Wrench className="w-5 h-5 text-orange-400" />
                                                        <span className="font-semibold text-white">Browse All Tools</span>
                                                    </div>
                                                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-all" />
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        <Link href="https://discord.gg/d3gBSNrVKb" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105">
                            <Users className="w-5 h-5" />
                            <span>Join</span>
                        </Link>
                        <button className="lg:hidden p-2 text-gray-300 hover:text-orange-400" onClick={toggleMobileMenu}>
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMobileMenu}></div>
            <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gray-900 z-50 transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <span className="font-bold text-lg text-white">Menu</span>
                    <button onClick={toggleMobileMenu} className="p-2 text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
                    {Object.entries(navItems).map(([key, section]) => (
                        <div key={key} className="py-2 border-b border-white/10">
                            <button onClick={() => toggleMobileSubMenu(key)} className="flex items-center justify-between w-full py-2">
                                <span className="text-lg font-semibold text-orange-400">{section.title}</span>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${mobileSubMenu === key ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileSubMenu === key ? 'max-h-screen' : 'max-h-0'}`}>
                                <div className="pt-2 space-y-1">
                                    {section.items.map((item, index) => (
                                        <Link key={index} href={item.href} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5" onClick={toggleMobileMenu}>
                                            <div className="text-orange-400">{React.cloneElement(item.icon, { className: 'w-5 h-5' })}</div>
                                            <span className="text-gray-200">{item.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10">
                    <Link href="https://discord.gg/d3gBSNrVKb" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg">
                        <Users className="w-5 h-5" />
                        <span>Join Community</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
