"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
    User,
    Calendar,
    Shield,
    Github,
    Twitter,
    Globe,
    MapPin,
    Flag,
    Star,
    BookOpen,
    Trophy
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchApi } from '@/lib/api';

interface PublicUser {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
    role: string;
    createdAt: string;
    isPublic: boolean;
    bio?: string;
    location?: string;
    website?: string;
    github?: string;
    twitter?: string;
    stats?: {
        blogs: number;
        ctfSolves: number;
        ctfPoints: number;
        contributions: number;
    };
}

const PublicProfilePage = () => {
    const params = useParams();
    const username = params.username as string;

    const [user, setUser] = useState<PublicUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await fetchApi(`/api/users/${username}`, { requireAuth: false });
                setUser(data.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUser();
        }
    }, [username]);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black">
                <div className="h-48 bg-gradient-to-br from-orange-500/20 to-orange-600/10" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-20 pb-20">
                    <Skeleton className="w-32 h-32 rounded-full border-4 border-black" />
                    <div className="mt-4 space-y-3">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-96 max-w-full" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-20 rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <User className="w-10 h-10 text-gray-600" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">User not found</h1>
                <p className="text-gray-400 mb-8">The user @{username} doesn&apos;t exist.</p>
                <Link
                    href="/"
                    className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                    Go back home
                </Link>
            </div>
        );
    }

    if (!user.isPublic) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-2xl backdrop-blur-md">
                    <Shield className="w-10 h-10 text-orange-500" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Private Profile</h1>
                <p className="text-gray-400 text-center max-w-sm mb-8">
                    @{user.username} has chosen to keep their portfolio private.
                </p>
                <Link
                    href="/leaderboard"
                    className="text-orange-400 hover:text-orange-300 transition-colors font-medium hover:underline"
                >
                    Return to Leaderboard
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Background */}
            <div className="h-48 bg-gradient-to-br from-orange-500/20 to-orange-600/10 relative">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            {/* Profile Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-20 pb-20">
                {/* Profile Header */}
                <div className="relative">
                    {/* Avatar */}
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-4xl font-bold text-white border-4 border-black shadow-xl">
                        {user.avatar ? (
                            <Image
                                src={user.avatar}
                                alt={user.name}
                                width={128}
                                height={128}
                                className="w-full h-full rounded-full object-cover"
                                unoptimized
                            />
                        ) : (
                            user.name.charAt(0).toUpperCase()
                        )}
                    </div>

                    {/* User Info */}
                    <div className="mt-4">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">{user.name}</h1>
                            {user.role === 'admin' && (
                                <span className="px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">
                                    Admin
                                </span>
                            )}
                        </div>
                        <p className="text-orange-400 text-lg">@{user.username}</p>
                    </div>

                    {/* Bio */}
                    {user.bio && (
                        <p className="mt-4 text-gray-300 max-w-2xl">{user.bio}</p>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
                        {user.location && (
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                {user.location}
                            </span>
                        )}
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            Joined {formatDate(user.createdAt)}
                        </span>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3 mt-4">
                        {user.website && (
                            <a
                                href={user.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <Globe className="w-5 h-5" />
                            </a>
                        )}
                        {user.github && (
                            <a
                                href={`https://github.com/${user.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        )}
                        {user.twitter && (
                            <a
                                href={`https://twitter.com/${user.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] group hover:border-orange-500/30 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-4 h-4 text-blue-400" />
                            <p className="text-sm text-gray-500">Blog Posts</p>
                        </div>
                        <p className="text-2xl font-bold text-white">{user.stats?.blogs || 0}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] group hover:border-orange-500/30 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <Flag className="w-4 h-4 text-green-400" />
                            <p className="text-sm text-gray-500">CTF Solves</p>
                        </div>
                        <p className="text-2xl font-bold text-white">{user.stats?.ctfSolves || 0}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] group hover:border-orange-500/30 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <p className="text-sm text-gray-500">CTF Points</p>
                        </div>
                        <p className="text-2xl font-bold text-white">{user.stats?.ctfPoints || 0}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] group hover:border-orange-500/30 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-4 h-4 text-orange-400" />
                            <p className="text-sm text-gray-500">Contributions</p>
                        </div>
                        <p className="text-2xl font-bold text-white">{user.stats?.contributions || 0}</p>
                    </div>
                </div>

                {/* Activity Section */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center">
                        <Shield className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400">No public activity yet</p>
                        <p className="text-sm text-gray-500 mt-1">
                            When {user.name} publishes content, it will appear here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfilePage;
