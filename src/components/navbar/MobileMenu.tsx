"use client"

import React from 'react';
import Link from 'next/link';
import {
    User,
    LogOut,
    Shield,
    Building2,
    Trophy,
    MessageCircle,
} from 'lucide-react';
export interface NavDropdownItem {
    title: string;
    href: string;
    icon: React.ReactNode;
    description: string;
    badge?: number;
}
interface MobileMenuProps {
    isOpen: boolean;
    close: () => void;
    user: { name: string; email: string; role: string } | null;
    logout: () => void;
    learnLinks: NavDropdownItem[];
    communityLinks: NavDropdownItem[];
    resourceLinks: NavDropdownItem[];
    theme: string;
}

export const MobileMenu = ({
    isOpen,
    close,
    user,
    logout,
    learnLinks,
    communityLinks,
    resourceLinks,
    theme,
}: MobileMenuProps) => {
    if (!isOpen) return null;

    return (
        <div className={`md:hidden fixed inset-0 top-16 ${theme === 'dark' ? 'bg-black' : 'bg-white'} z-40 overflow-y-auto`}>
            <div className="p-6 space-y-1">
                {/* Play Section */}
                <div className="pb-3 mb-3 border-b border-white/10">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 mb-2">Play</p>
                    <Link href="/ctf" onClick={close} className="flex items-center gap-3 p-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                        <span className="text-orange-400"><Shield className="w-4 h-4" /></span>
                        <div><div>CTF Challenges</div><div className="text-xs text-gray-500">Hack and capture flags</div></div>
                    </Link>
                    <Link href="/leaderboard" onClick={close} className="flex items-center gap-3 p-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                        <span className="text-yellow-400"><Trophy className="w-4 h-4" /></span>
                        <div><div>Leaderboard</div><div className="text-xs text-gray-500">Global rankings</div></div>
                    </Link>
                </div>

                {/* Learn Section */}
                <div className="pb-3 mb-3 border-b border-white/10">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 mb-2">Learn</p>
                    {learnLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={close} className="flex items-center gap-3 p-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                            <span className="text-orange-400">{link.icon}</span>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    {link.title}
                                    {link.badge && link.badge > 0 && (
                                        <span className="min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full">
                                            {link.badge > 99 ? '99+' : link.badge}
                                        </span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500">{link.description}</div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Resources Section */}
                <div className="pb-3 mb-3 border-b border-white/10">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 mb-2">Resources</p>
                    {resourceLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={close} className="flex items-center gap-3 p-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                            <span className="text-orange-400">{link.icon}</span>
                            <div>
                                <div>{link.title}</div>
                                <div className="text-xs text-gray-500">{link.description}</div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Community Section */}
                <div className="pb-3 mb-3 border-b border-white/10">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 mb-2">Community</p>
                    {communityLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={close} className="flex items-center gap-3 p-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                            <span className="text-orange-400">{link.icon}</span>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    {link.title}
                                    {link.badge && link.badge > 0 && (
                                        <span className="min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full">
                                            {link.badge > 99 ? '99+' : link.badge}
                                        </span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500">{link.description}</div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* User Section */}
                <div className="pt-2 space-y-2">
                    {user ? (
                        <>
                            <Link href="/profile" onClick={close} className="flex items-center gap-3 p-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                Profile
                            </Link>

                            {(user.role === 'admin' || user.role === 'owner' || user.role === 'moderator') && (
                                <Link href="/admin" onClick={close} className="flex items-center gap-3 p-4 rounded-lg text-orange-400 hover:text-orange-300 hover:bg-white/5 transition-colors">
                                    <Shield className="w-4 h-4" /> Admin Panel
                                </Link>
                            )}

                            {(user?.role === 'employer' || user?.role === 'admin' || user?.role === 'owner') && (
                                <>
                                    <Link href="/employer" onClick={close} className="flex items-center gap-3 p-4 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-white/5 transition-colors">
                                        <Building2 className="w-4 h-4" /> Employer Dashboard
                                    </Link>
                                </>
                            )}

                            <button onClick={() => { logout(); close(); }} className="w-full flex items-center gap-3 p-4 rounded-lg text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors">
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </>
                    ) : (
                        <Link href="/auth" onClick={close} className="flex items-center gap-3 p-4 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                            <User className="w-4 h-4" /> Sign In
                        </Link>
                    )}
                    <Link href="https://discord.gg/d3gBSNrVKb" target="_blank" rel="noopener noreferrer" onClick={close}
                        className="flex items-center justify-center gap-2 p-4 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 rounded-lg transition-colors font-medium">
                        <MessageCircle className="w-4 h-4" /> Join Discord
                    </Link>
                </div>
            </div>
        </div>
    );
};
