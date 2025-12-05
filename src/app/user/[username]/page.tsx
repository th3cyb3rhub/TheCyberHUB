"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
    User, 
    Calendar, 
    Shield, 
    Loader2, 
    ExternalLink,
    Github,
    Twitter,
    Globe,
    MapPin
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005';

interface PublicUser {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
    role: string;
    createdAt: string;
    bio?: string;
    location?: string;
    website?: string;
    github?: string;
    twitter?: string;
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
                const response = await fetch(`${API_URL}/api/users/${username}`);
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || 'User not found');
                }
                
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
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
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
                            <img 
                                src={user.avatar} 
                                alt={user.name}
                                className="w-full h-full rounded-full object-cover"
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
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <p className="text-2xl font-bold text-white">0</p>
                        <p className="text-sm text-gray-500">Blog Posts</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <p className="text-2xl font-bold text-white">0</p>
                        <p className="text-sm text-gray-500">Roadmaps</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <p className="text-2xl font-bold text-white">0</p>
                        <p className="text-sm text-gray-500">CTF Solves</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <p className="text-2xl font-bold text-white">0</p>
                        <p className="text-sm text-gray-500">Contributions</p>
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
