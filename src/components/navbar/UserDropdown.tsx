"use client"

import React from 'react';
import Link from 'next/link';
import {
    ChevronDown,
    User,
    LogOut,
    LayoutDashboard,
    Shield,
    Ticket,
    Building2,
} from 'lucide-react';

interface UserDropdownProps {
    user: { name: string; email: string; role: string };
    logout: () => void;
    theme: string;
}

export const UserDropdown = ({
    user,
    logout,
    theme,
}: UserDropdownProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors" aria-label="User menu" aria-expanded={isOpen}>
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 pt-2 w-48 z-50">
                    <div className={`${theme === 'dark' ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-xl rounded-xl border ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'} shadow-2xl overflow-hidden`}>
                        <div className="px-4 py-3 border-b border-white/10">
                            <p className="text-sm font-medium text-white truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                            <User className="w-4 h-4" /> Profile
                        </Link>
                        {(user.role === 'admin' || user.role === 'owner' || user.role === 'moderator') && (
                            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm text-orange-400 hover:text-orange-300 hover:bg-white/5 transition-all">
                                <Shield className="w-4 h-4" /> Admin Panel
                            </Link>
                        )}
                        <Link href="/my-events" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                            <Ticket className="w-4 h-4" /> My Events
                        </Link>
                        {(user.role === 'employer' || user.role === 'admin' || user.role === 'owner') && (
                            <>
                                <Link href="/employer" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                                    <Building2 className="w-4 h-4" /> Employer Dashboard
                                </Link>
                                <Link href="/employer/company" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                                    <Building2 className="w-4 h-4" /> Company Profile
                                </Link>
                            </>
                        )}
                        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-all">
                            <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
