"use client"

import Link from 'next/link';
import { Home, ArrowLeft, Search, Wrench, BookOpen, Map, Flag, LayoutDashboard, Command } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-red-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative text-center max-w-lg">
                {/* 404 Number */}
                <div className="relative mb-8">
                    <h1 className="text-[150px] sm:text-[200px] font-bold text-white/5 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-2xl shadow-orange-500/20 animate-pulse">
                            <Search className="w-12 h-12 text-white" />
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back on track.
                </p>

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-xl transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>

                {/* Quick Links */}
                <div className="pt-8 border-t border-white/10">
                    <p className="text-sm text-gray-500 mb-4">Or explore these popular sections:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/tools"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm transition-all"
                        >
                            <Wrench className="w-4 h-4 text-orange-400" />
                            Security Tools
                        </Link>
                        <Link
                            href="/cheatsheets"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm transition-all"
                        >
                            <BookOpen className="w-4 h-4 text-blue-400" />
                            Cheatsheets
                        </Link>
                        <Link
                            href="/roadmaps"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm transition-all"
                        >
                            <Map className="w-4 h-4 text-green-400" />
                            Roadmaps
                        </Link>
                        <Link
                            href="/challenges"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm transition-all"
                        >
                            <Flag className="w-4 h-4 text-green-400" />
                            CTF Challenges
                        </Link>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm transition-all"
                        >
                            <LayoutDashboard className="w-4 h-4 text-orange-300" />
                            Dashboard
                        </Link>
                    </div>

                    <button
                        onClick={() => {
                            const event = new KeyboardEvent('keydown', {
                                key: 'k',
                                metaKey: true,
                                bubbles: true,
                            });
                            document.dispatchEvent(event);
                        }}
                        className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-all"
                    >
                        <Search className="w-4 h-4" />
                        <span>Search the site</span>
                        <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 text-[10px] bg-white/5 rounded border border-white/10">
                            <Command className="w-3 h-3" />K
                        </kbd>
                    </button>
                </div>

                {/* Fun Message */}
                <p className="mt-10 text-xs text-gray-600">
                    Error 404 • This isn&apos;t the vulnerability you&apos;re looking for 🔍
                </p>
            </div>
        </div>
    );
}
