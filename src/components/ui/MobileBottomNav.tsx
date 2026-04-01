'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Flag, Newspaper, User, Briefcase } from 'lucide-react';

const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/ctf', icon: Flag, label: 'CTF' },
    { href: '/feed', icon: Newspaper, label: 'Feed' },
    { href: '/jobs', icon: Briefcase, label: 'Jobs' },
    { href: '/profile', icon: User, label: 'Profile' },
];

export default function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-t border-gray-200 dark:border-white/10"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = item.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px] transition-colors ${
                                isActive
                                    ? 'text-orange-500'
                                    : 'text-gray-500 active:text-orange-500'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
