"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import {
    ChevronDown,
    Menu,
    X,
    Wrench,
    FileText,
    Map as MapIcon,
    ArrowRight,
    Terminal,
    User,
    BookOpen,
    LogOut,
    Calendar,
    Code2,
    GraduationCap
} from 'lucide-react';

const Navbar = () => {
    const { user, loading, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isMobileMenuOpen]);

    // Resources dropdown items
    const resourceLinks = [
        { title: "Cheatsheets", href: "/cheatsheets", icon: <FileText className="w-4 h-4" />, description: "Quick reference guides" },
        { title: "Roadmaps", href: "/roadmaps", icon: <MapIcon className="w-4 h-4" />, description: "Learning paths" },
        { title: "Blog", href: "/blog", icon: <BookOpen className="w-4 h-4" />, description: "Articles & tutorials" },
    ];

    // Learn dropdown items
    const learnLinks = [
        { title: "Events", href: "/events", icon: <Calendar className="w-4 h-4" />, description: "CTFs & workshops" },
        { title: "Code Review", href: "/code-review", icon: <Code2 className="w-4 h-4" />, description: "Security exercises" },
    ];

    // All nav links for mobile
    const allNavLinks = [
        { title: "Tools", href: "/tools", icon: <Wrench className="w-4 h-4" /> },
        ...learnLinks,
        ...resourceLinks,
    ];

    const DropdownMenu = ({
        id,
        label,
        items,
        icon
    }: {
        id: string;
        label: string;
        items: typeof resourceLinks;
        icon?: React.ReactNode;
    }) => (
        <div
            className="relative"
            onMouseEnter={() => setActiveDropdown(id)}
            onMouseLeave={() => setActiveDropdown(null)}
        >
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                {icon && <span className="text-orange-400">{icon}</span>}
                {label}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === id ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === id && (
                <div className="absolute top-full left-0 pt-2 w-64">
                    <div className="bg-black/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                        {items.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                            >
                                <span className="text-orange-400 group-hover:text-orange-300">{link.icon}</span>
                                <div className="flex-1">
                                    <div className="font-medium">{link.title}</div>
                                    <div className="text-xs text-gray-500 group-hover:text-gray-400">{link.description}</div>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
            }`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <Image
                                width={36}
                                height={36}
                                src="/logo.png"
                                alt="TheCyberHub"
                                className="w-9 h-9 transition-transform group-hover:scale-105"
                            />
                        </div>
                        <span className="text-lg font-semibold text-white tracking-tight">
                            TheCyberHub
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center">
                        {/* Tools - Direct link (most accessed) */}
                        <Link
                            href="/tools"
                            className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            <Wrench className="w-4 h-4 text-orange-400" />
                            Tools
                        </Link>

                        {/* Learn Dropdown */}
                        <DropdownMenu
                            id="learn"
                            label="Learn"
                            items={learnLinks}
                            icon={<GraduationCap className="w-4 h-4" />}
                        />

                        {/* Resources Dropdown */}
                        <DropdownMenu
                            id="resources"
                            label="Resources"
                            items={resourceLinks}
                        />
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {!loading && (
                            user ? (
                                // Logged in - show user menu
                                <div
                                    className="relative"
                                    onMouseEnter={() => setActiveDropdown('user')}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
                                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${activeDropdown === 'user' ? 'rotate-180' : ''}`} />
                                    </button>

                                    {activeDropdown === 'user' && (
                                        <div className="absolute top-full right-0 pt-2 w-48">
                                            <div className="bg-black/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                                                <div className="px-4 py-3 border-b border-white/10">
                                                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                </div>
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                                                >
                                                    <User className="w-4 h-4" />
                                                    Profile
                                                </Link>
                                                <button
                                                    onClick={logout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-all"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Not logged in
                                <Link
                                    href="/auth"
                                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    <User className="w-4 h-4" />
                                    Sign In
                                </Link>
                            )
                        )}
                        <Link
                            href="https://discord.gg/d3gBSNrVKb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25"
                        >
                            <Terminal className="w-4 h-4" />
                            Join Community
                        </Link>
                        <button
                            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 top-16 bg-black z-40 overflow-y-auto">
                    <div className="p-6 space-y-1">
                        {/* Tools Section */}
                        <div className="pb-3 mb-3 border-b border-white/10">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 mb-2">Tools</p>
                            <Link
                                href="/tools"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 p-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <span className="text-orange-400"><Wrench className="w-4 h-4" /></span>
                                Security Tools
                            </Link>
                        </div>

                        {/* Learn Section */}
                        <div className="pb-3 mb-3 border-b border-white/10">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 mb-2">Learn</p>
                            {learnLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 p-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <span className="text-orange-400">{link.icon}</span>
                                    <div>
                                        <div>{link.title}</div>
                                        <div className="text-xs text-gray-500">{link.description}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Resources Section */}
                        <div className="pb-3 mb-3 border-b border-white/10">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 mb-2">Resources</p>
                            {resourceLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 p-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <span className="text-orange-400">{link.icon}</span>
                                    <div>
                                        <div>{link.title}</div>
                                        <div className="text-xs text-gray-500">{link.description}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* User Section */}
                        <div className="pt-2 space-y-2">
                            {user ? (
                                <>
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 p-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                        className="w-full flex items-center gap-3 p-4 rounded-lg text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/auth"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 p-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <User className="w-4 h-4" />
                                    Sign In
                                </Link>
                            )}
                            <Link
                                href="https://discord.gg/d3gBSNrVKb"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-center gap-2 p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
                            >
                                <Terminal className="w-4 h-4" />
                                Join Community
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
