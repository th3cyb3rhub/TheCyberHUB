"use client"

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
    Menu,
    X,
    Wrench,
    FileText,
    Map as MapIcon,
    BookOpen,
    Calendar,
    Code2,
    GraduationCap,
    Search,
    Command,
    Users,
    MessagesSquare,
    Trophy,
    Sun,
    Moon,
    Rss,
    Briefcase,
    MessageCircle,
    Shield,
    Terminal,
    ChevronRight,
    Zap,
    FlaskConical,
} from 'lucide-react';
import { useNotificationSocket } from '@/context/NotificationProvider';
import { NavDropdownItem } from '@/components/navbar/MobileMenu';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NotificationDropdown } from '@/components/navbar/NotificationDropdown';
import { UserDropdown } from '@/components/navbar/UserDropdown';
import { MobileMenu } from '@/components/navbar/MobileMenu';

const Navbar = () => {
    const { user, loading, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationSocket();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const openSearch = useCallback(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }));
    }, []);

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    const learnLinks: NavDropdownItem[] = [
        { title: "Roadmaps", href: "/roadmaps", icon: <MapIcon className="w-4 h-4" />, description: "Career paths from beginner to expert" },
        { title: "Cheatsheets", href: "/cheatsheets", icon: <FileText className="w-4 h-4" />, description: "Linux, Nmap, XSS & more" },
        { title: "Code Review", href: "/code-review", icon: <Code2 className="w-4 h-4" />, description: "Find vulnerabilities in code" },
        { title: "Learning Paths", href: "/learning-paths", icon: <GraduationCap className="w-4 h-4" />, description: "Guided courses for every level" },
    ];

    const communityLinks: NavDropdownItem[] = [
        { title: "Forums", href: "/forums", icon: <MessagesSquare className="w-4 h-4" />, description: "Ask questions & share knowledge" },
        { title: "Feed", href: "/feed", icon: <Rss className="w-4 h-4" />, description: "Community activity & posts" },
        { title: "Events", href: "/events", icon: <Calendar className="w-4 h-4" />, description: "CTFs, workshops & meetups" },
        { title: "Mentorship", href: "/mentorship", icon: <Users className="w-4 h-4" />, description: "Connect with professionals" },
    ];

    const resourceLinks: NavDropdownItem[] = [
        { title: "Security Tools", href: "/tools", icon: <Wrench className="w-4 h-4" />, description: "22+ pentesting & recon tools" },
        { title: "Jobs", href: "/jobs", icon: <Briefcase className="w-4 h-4" />, description: "Cybersecurity careers" },
        { title: "Blog", href: "/blog", icon: <BookOpen className="w-4 h-4" />, description: "Tutorials & writeups" },
        { title: "Labs", href: "/labs", icon: <FlaskConical className="w-4 h-4" />, description: "Hands-on practice environments" },
    ];

    // --- Hacker/Cyberpunk nav link with animated underline ---
    const navLink = (href: string, icon: React.ReactNode, label: string) => (
        <NavigationMenuItem>
            <Link href={href} className="group/navlink relative inline-flex items-center gap-1.5 h-10 px-3 text-[13px] font-medium tracking-wide uppercase transition-all duration-200">
                <span className={isActive(href) ? 'text-orange-400' : 'text-gray-500 group-hover/navlink:text-orange-400 transition-colors duration-200'}>{icon}</span>
                <span className={isActive(href) ? 'text-white' : 'text-gray-400 group-hover/navlink:text-white transition-colors duration-200'}>{label}</span>
                {/* Animated underline */}
                <span className={`absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-300 ${isActive(href) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover/navlink:opacity-100 group-hover/navlink:scale-x-100'}`} />
                {/* Active glow */}
                {isActive(href) && <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-orange-500 blur-sm" />}
            </Link>
        </NavigationMenuItem>
    );

    // --- Hacker dropdown trigger ---
    const dropdownTrigger = (label: string, icon: React.ReactNode, hrefs: string[]) => {
        const active = hrefs.some(h => isActive(h));
        return (
            <NavigationMenuTrigger className={`group relative bg-transparent !px-3 h-10 text-[13px] font-medium tracking-wide uppercase transition-all duration-200 ${active ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                <span className={`mr-1.5 ${active ? 'text-orange-400' : 'text-gray-500 group-hover:text-orange-400 transition-colors'}`}>{icon}</span>
                {label}
                {active && <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-orange-500 to-orange-400 rounded-full" />}
                {active && <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-orange-500 blur-sm" />}
            </NavigationMenuTrigger>
        );
    };

    // --- Hacker-style dropdown panel ---
    const renderDropdown = (links: NavDropdownItem[], featured?: { label: string; href: string; desc: string }) => (
        <div className={`w-[460px] ${theme === 'dark'
            ? 'bg-[#0d1117] border border-white/[0.08] text-white'
            : 'bg-white border border-gray-200 text-gray-900'
        } rounded-xl shadow-2xl shadow-black/40`}>

            {/* Terminal-style header */}
            <div className={`flex items-center gap-2 px-4 py-2 border-b ${theme === 'dark' ? 'border-white/[0.06] bg-white/[0.02]' : 'border-gray-100 bg-gray-50'}`}>
                <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className={`text-[11px] font-mono ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>~/thecyberhub</span>
            </div>

            {/* Featured CTA */}
            {featured && (
                <Link href={featured.href} className={`flex items-center justify-between mx-3 mt-3 px-3 py-2.5 rounded-lg group transition-all duration-200 ${theme === 'dark'
                    ? 'bg-orange-500/[0.08] border border-orange-500/20 hover:bg-orange-500/[0.12] hover:border-orange-500/30'
                    : 'bg-orange-50 border border-orange-200 hover:bg-orange-100'
                }`}>
                    <div className="flex items-center gap-2.5">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <div>
                            <div className="text-[13px] font-semibold text-orange-500">{featured.label}</div>
                            <div className={`text-[11px] ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{featured.desc}</div>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-orange-500/50 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
            )}

            {/* Links list */}
            <div className="p-2 space-y-0.5">
                {links.map((link) => {
                    const active = isActive(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`group/item flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-150 ${
                                active
                                    ? theme === 'dark' ? 'bg-orange-500/10' : 'bg-orange-50'
                                    : theme === 'dark' ? 'hover:bg-white/[0.04]' : 'hover:bg-gray-50'
                            }`}
                        >
                            <div className={`p-2 rounded-lg shrink-0 transition-colors duration-200 ${
                                active
                                    ? 'bg-orange-500/20 text-orange-400'
                                    : theme === 'dark'
                                        ? 'bg-white/[0.04] text-gray-500 group-hover/item:text-orange-400 group-hover/item:bg-orange-500/10'
                                        : 'bg-gray-100 text-gray-500 group-hover/item:text-orange-500 group-hover/item:bg-orange-50'
                            }`}>
                                {link.icon}
                            </div>
                            <div className="flex-1">
                                <div className={`text-[13px] font-semibold transition-colors ${active ? 'text-orange-400' : theme === 'dark' ? 'text-gray-200 group-hover/item:text-white' : 'text-gray-800'}`}>
                                    {link.title}
                                </div>
                                <p className={`text-[11px] mt-0.5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                                    {link.description}
                                </p>
                            </div>
                            <ChevronRight className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover/item:opacity-100 transition-all ${active ? 'text-orange-400 opacity-100' : 'text-gray-600'}`} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'pt-2 px-2 sm:px-4' : ''}`}>
            <nav aria-label="Main navigation" className={`mx-auto max-w-7xl transition-all duration-500 ${isScrolled
                ? theme === 'dark'
                    ? 'bg-[#0d1117]/90 backdrop-blur-xl border border-white/[0.06] shadow-2xl shadow-black/30 rounded-2xl'
                    : 'bg-white/95 backdrop-blur-xl border border-gray-200/60 shadow-xl rounded-2xl'
                : 'bg-transparent'
            }`}>
                <div className="px-3 sm:px-6">
                    <div className="flex items-center justify-between h-14">

                        {/* ===== LOGO ===== */}
                        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                            <div className="relative">
                                <Image width={30} height={30} src="/logo.png" alt="TheCyberHub" className="w-[30px] h-[30px] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                                {/* Neon glow on hover */}
                                <div className="absolute inset-0 rounded-full bg-orange-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="flex items-baseline gap-0">
                                <span className="text-[15px] font-bold text-gray-200 dark:text-gray-200 tracking-tight font-mono">
                                    <span className="text-orange-500">$</span> TheCyber
                                </span>
                                <span className="text-[15px] font-bold text-orange-500 tracking-tight font-mono">Hub</span>
                                {/* Blinking cursor */}
                                <span className="ml-0.5 w-[2px] h-4 bg-orange-500 animate-pulse inline-block" />
                            </div>
                        </Link>

                        {/* ===== DESKTOP NAV ===== */}
                        <div className="hidden md:flex items-center">
                            <NavigationMenu viewport={false}>
                                <NavigationMenuList className="gap-0">
                                    {navLink('/ctf', <Shield className="w-3.5 h-3.5" />, 'CTF')}
                                    {navLink('/leaderboard', <Trophy className="w-3.5 h-3.5" />, 'Rankings')}

                                    <NavigationMenuItem>
                                        {dropdownTrigger('Learn', <GraduationCap className="w-3.5 h-3.5" />, learnLinks.map(l => l.href))}
                                        <NavigationMenuContent>
                                            {renderDropdown(learnLinks, { label: "Start Learning", desc: "New to security? Begin here", href: "/roadmaps" })}
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        {dropdownTrigger('Community', <Users className="w-3.5 h-3.5" />, communityLinks.map(l => l.href))}
                                        <NavigationMenuContent>
                                            {renderDropdown(communityLinks, { label: "Join 10K+ Hackers", desc: "Discord community, active 24/7", href: "https://discord.gg/d3gBSNrVKb" })}
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        {dropdownTrigger('Resources', <Terminal className="w-3.5 h-3.5" />, resourceLinks.map(l => l.href))}
                                        <NavigationMenuContent>
                                            {renderDropdown(resourceLinks)}
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        {/* ===== RIGHT SIDE ===== */}
                        <div className="flex items-center gap-1">

                            {/* Search */}
                            <button
                                onClick={openSearch}
                                className={`flex items-center gap-2 px-2.5 py-1.5 text-[12px] rounded-lg border transition-all duration-200 ${theme === 'dark'
                                    ? 'text-gray-500 hover:text-orange-400 bg-white/[0.03] border-white/[0.06] hover:border-orange-500/30 hover:bg-orange-500/5'
                                    : 'text-gray-500 hover:text-orange-500 bg-gray-50 border-gray-200 hover:border-orange-300'
                                }`}
                                aria-label="Search"
                            >
                                <Search className="w-3.5 h-3.5" />
                                <span className="hidden lg:inline font-mono">search</span>
                                <kbd className={`hidden md:flex items-center gap-0.5 px-1 py-0.5 text-[10px] font-mono rounded ${theme === 'dark' ? 'bg-white/[0.04] border border-white/[0.06]' : 'bg-gray-100 border border-gray-200'}`}>
                                    <Command className="w-2.5 h-2.5" />K
                                </kbd>
                            </button>

                            {/* Discord badge */}
                            <Link
                                href="https://discord.gg/d3gBSNrVKb"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-mono text-indigo-400 bg-indigo-500/[0.08] border border-indigo-500/20 rounded-lg hover:bg-indigo-500/15 hover:border-indigo-500/30 transition-all duration-200"
                                aria-label="Join Discord"
                            >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span className="hidden xl:inline">discord</span>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                </span>
                            </Link>

                            {/* Separator */}
                            <div className={`hidden sm:block w-px h-5 mx-1 ${theme === 'dark' ? 'bg-white/[0.06]' : 'bg-gray-200'}`} />

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition-all duration-300 ${theme === 'dark'
                                    ? 'text-gray-500 hover:text-yellow-400 hover:bg-yellow-500/10'
                                    : 'text-gray-400 hover:text-orange-500 hover:bg-orange-500/10'
                                }`}
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-[18px] h-[18px] transition-transform duration-500 hover:rotate-180" />
                                ) : (
                                    <Moon className="w-[18px] h-[18px] transition-transform duration-500 hover:-rotate-12" />
                                )}
                            </button>

                            {/* Notifications */}
                            {!loading && user && (
                                <NotificationDropdown
                                    notifications={notifications}
                                    unreadCount={unreadCount}
                                    markAsRead={markAsRead}
                                    markAllAsRead={markAllAsRead}
                                    theme={theme}
                                />
                            )}

                            {/* User / Sign In */}
                            {!loading && (
                                user ? (
                                    <UserDropdown user={user} logout={logout} theme={theme} />
                                ) : (
                                    <Link
                                        href="/auth"
                                        className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 text-[13px] font-semibold font-mono uppercase tracking-wider text-black bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <Zap className="w-3.5 h-3.5" /> Sign In
                                    </Link>
                                )
                            )}

                            {/* Mobile hamburger */}
                            <button
                                className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 hover:text-orange-400 rounded-lg hover:bg-white/5 transition-colors"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isMobileMenuOpen}
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <MobileMenu
                    isOpen={isMobileMenuOpen}
                    close={() => setIsMobileMenuOpen(false)}
                    user={user}
                    logout={logout}
                    learnLinks={learnLinks}
                    communityLinks={communityLinks}
                    resourceLinks={resourceLinks}
                    theme={theme}
                />
            </nav>
        </div>
    );
};

export default Navbar;
