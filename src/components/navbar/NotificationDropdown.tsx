"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Bell,
    Check,
} from 'lucide-react';
import { NotificationData } from '@/context/NotificationProvider';

interface NotificationDropdownProps {
    notifications: NotificationData[];
    unreadCount: number;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    theme: string;
}

export const NotificationDropdown = ({
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    theme,
}: NotificationDropdownProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all relative" aria-label="Notifications" aria-expanded={isOpen}>
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1.5 min-w-[16px] h-[16px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-black">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 pt-2 w-80 z-50">
                    <div className={`${theme === 'dark' ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-xl rounded-xl border ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'} shadow-2xl overflow-hidden`}>
                        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-white">Notifications</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); markAllAsRead(); }}
                                    className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
                                >
                                    <Check className="w-3 h-3" /> Mark all read
                                </button>
                            )}
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="px-4 py-8 text-center text-sm text-gray-500">
                                    No notifications yet
                                </div>
                            ) : (
                                notifications.slice(0, 10).map((notif: NotificationData) => (
                                    <Link
                                        key={notif._id}
                                        href={notif.link || '#'}
                                        onClick={() => { if (!notif.read) markAsRead(notif._id); setIsOpen(false); }}
                                        className={`block px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${!notif.read ? 'bg-orange-500/10' : ''}`}
                                    >
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex-shrink-0 flex items-center justify-center text-white font-medium text-xs overflow-hidden">
                                                {notif.actor?.avatar ? (
                                                    <Image src={notif.actor.avatar} alt={notif.actor?.name || 'User avatar'} width={32} height={32} className="w-full h-full object-cover" unoptimized />
                                                ) : (
                                                    notif.actor?.name?.charAt(0).toUpperCase() || <Bell className="w-3.5 h-3.5" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-300">
                                                    <span className="font-medium text-white mr-1">{notif.actor?.name}</span>
                                                    {notif.title === 'New Follower' ? 'started following you' : notif.message}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {new Date(notif.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
