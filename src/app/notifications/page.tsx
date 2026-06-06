"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Bell, CheckCheck, Loader2, Flag, MessageSquare, Trophy, Star, Users, Calendar, Briefcase, Shield, Zap, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNotificationSocket, type NotificationData } from '@/context/NotificationProvider';

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const s = Math.floor(diff / 1000);
    if (s < 60) return 'just now';
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d < 30) return `${d}d ago`;
    const mo = Math.floor(d / 30);
    return `${mo}mo ago`;
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
    challenge_solved:   <Trophy className="w-4 h-4 text-yellow-400" />,
    badge_earned:       <Star className="w-4 h-4 text-orange-400" />,
    follow:             <Users className="w-4 h-4 text-blue-400" />,
    comment:            <MessageSquare className="w-4 h-4 text-green-400" />,
    reply:              <MessageSquare className="w-4 h-4 text-green-400" />,
    mention:            <MessageSquare className="w-4 h-4 text-purple-400" />,
    flag_submitted:     <Flag className="w-4 h-4 text-orange-400" />,
    event_reminder:     <Calendar className="w-4 h-4 text-blue-400" />,
    job_application:    <Briefcase className="w-4 h-4 text-yellow-400" />,
    mentorship:         <Users className="w-4 h-4 text-purple-400" />,
    security:           <Shield className="w-4 h-4 text-red-400" />,
    streak:             <Zap className="w-4 h-4 text-orange-400" />,
    blog:               <BookOpen className="w-4 h-4 text-blue-400" />,
    system:             <Bell className="w-4 h-4 text-gray-400" />,
};

function getIcon(type: string) {
    return TYPE_ICONS[type] ?? TYPE_ICONS.system;
}

function NotificationItem({ n, onRead }: { n: NotificationData; onRead: (id: string) => void }) {
    const ago = timeAgo(n.createdAt);

    const inner = (
        <div
            className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-white/5 cursor-pointer group ${!n.read ? 'bg-orange-500/[0.03]' : ''}`}
            onClick={() => !n.read && onRead(n._id)}
        >
            {/* Icon */}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${!n.read ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-white/5 border border-white/5'}`}>
                {n.actor?.avatar ? (
                    <Image src={n.actor.avatar} alt={n.actor.username} width={36} height={36} className="w-9 h-9 rounded-full object-cover" unoptimized />
                ) : (
                    getIcon(n.type)
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className={`text-sm leading-snug ${n.read ? 'text-gray-400' : 'text-white'}`}>
                    {n.actor && (
                        <span className="font-medium text-white">@{n.actor.username} </span>
                    )}
                    {n.message}
                </p>
                <p className="text-xs text-gray-600 mt-1">{ago}</p>
            </div>

            {/* Unread dot */}
            {!n.read && (
                <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
            )}
        </div>
    );

    if (n.link) {
        return (
            <Link href={n.link} onClick={() => !n.read && onRead(n._id)} className="block">
                {inner}
            </Link>
        );
    }
    return inner;
}

export default function NotificationsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationSocket();
    const [filter, setFilter] = useState<'all' | 'unread'>('all');
    const [markingAll, setMarkingAll] = useState(false);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user) {
        router.push('/auth?redirect=/notifications');
        return null;
    }

    const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

    const handleMarkAll = async () => {
        setMarkingAll(true);
        await markAllAsRead();
        setMarkingAll(false);
    };

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/8 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative max-w-2xl mx-auto px-4 pt-28 pb-20">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Notifications</h1>
                        {unreadCount > 0 && (
                            <p className="text-sm text-gray-400 mt-0.5">{unreadCount} unread</p>
                        )}
                    </div>
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAll}
                            disabled={markingAll}
                            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                        >
                            {markingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCheck className="w-4 h-4" />}
                            Mark all read
                        </button>
                    )}
                </div>

                {/* Filter tabs */}
                <div className="flex gap-1 mb-4 border-b border-white/10">
                    {(['all', 'unread'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                                filter === tab
                                    ? 'border-orange-500 text-white'
                                    : 'border-transparent text-gray-400 hover:text-white'
                            }`}
                        >
                            {tab}
                            {tab === 'unread' && unreadCount > 0 && (
                                <span className="ml-2 px-1.5 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden divide-y divide-white/5">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <Bell className="w-7 h-7 text-gray-600" />
                            </div>
                            <p className="text-gray-400 font-medium">
                                {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                                {filter === 'unread'
                                    ? "You're all caught up!"
                                    : 'Activity from the community will appear here.'}
                            </p>
                        </div>
                    ) : (
                        filtered.map(n => (
                            <NotificationItem key={n._id} n={n} onRead={markAsRead} />
                        ))
                    )}
                </div>

                {filtered.length > 0 && notifications.length >= 20 && (
                    <p className="text-center text-xs text-gray-600 mt-4">
                        Showing the most recent 20 notifications
                    </p>
                )}
            </div>
        </div>
    );
}
