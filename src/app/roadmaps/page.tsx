/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import {
    Map,
    Clock,
    Users,
    Star,
    Search,
    Target,
    Shield,
    Code,
    ExternalLink,
    Play,
    BookOpen,
    Youtube,
    ArrowRight,
    Sparkles,
    Bookmark,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Check
} from 'lucide-react';
import Footer from '@/components/Footer';
import { SkeletonRoadmapsGrid } from '@/components/ui/SkeletonRoadmap';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { fetchApi } from '@/lib/api';

interface LearningStep {
    id: string;
    title: string;
    description: string;
    skills: string[];
    resources: Resource[];
    estimated_time: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface Resource {
    title: string;
    type: 'youtube' | 'article' | 'course' | 'practice' | 'documentation';
    url: string;
    platform: string;
    duration?: string;
    free: boolean;
}

interface Roadmap {
    id: string;
    title: string;
    description: string;
    category: string;
    totalTime: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    followers: string;
    rating: number;
    steps: LearningStep[];
    color: string;
    icon: string;
    featured: boolean;
}

const RoadmapsPage = () => {
    const { user, updateBookmarks } = useAuth();
    const router = useRouter();
    const { addToast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
    const [loading, setLoading] = useState(true);
    const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
    const [bookmarkPending, setBookmarkPending] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [completedSteps, setCompletedSteps] = useState<Record<string, Set<string>>>({});
    const [userRatings, setUserRatings] = useState<Record<string, number>>({});
    const [hoverRating, setHoverRating] = useState<{ id: string; value: number } | null>(null);

    // Load user ratings from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('roadmap-ratings');
            if (saved) {
                setUserRatings(JSON.parse(saved));
            }
        } catch {
            // Ignore
        }
    }, []);

    const rateRoadmap = (roadmapId: string, rating: number) => {
        if (!user) {
            addToast({ variant: 'info', title: 'Sign in required', message: 'Sign in to rate roadmaps.' });
            return;
        }

        setUserRatings(prev => {
            const updated = { ...prev, [roadmapId]: rating };
            try { localStorage.setItem('roadmap-ratings', JSON.stringify(updated)); } catch { /* ignore */ }
            return updated;
        });
        addToast({ variant: 'success', message: `Rated ${rating} stars` });
    };

    // Load progress from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('roadmap-progress');
            if (saved) {
                const parsed = JSON.parse(saved) as Record<string, string[]>;
                const restored: Record<string, Set<string>> = {};
                for (const [roadmapId, steps] of Object.entries(parsed)) {
                    restored[roadmapId] = new Set(steps);
                }
                setCompletedSteps(restored);
            }
        } catch {
            // Ignore localStorage errors
        }
    }, []);

    const toggleStepCompletion = (roadmapId: string, stepId: string) => {
        if (!user) {
            addToast({ variant: 'info', title: 'Sign in required', message: 'Sign in to track your progress.' });
            return;
        }

        setCompletedSteps(prev => {
            const roadmapSteps = new Set(prev[roadmapId] || []);
            if (roadmapSteps.has(stepId)) {
                roadmapSteps.delete(stepId);
            } else {
                roadmapSteps.add(stepId);
            }
            const updated = { ...prev, [roadmapId]: roadmapSteps };

            // Persist to localStorage
            try {
                const serializable: Record<string, string[]> = {};
                for (const [key, val] of Object.entries(updated)) {
                    serializable[key] = Array.from(val);
                }
                localStorage.setItem('roadmap-progress', JSON.stringify(serializable));
            } catch {
                // Ignore
            }

            return updated;
        });
    };

    const getStepProgress = (roadmapId: string, totalSteps: number): number => {
        const completed = completedSteps[roadmapId]?.size || 0;
        if (totalSteps === 0) return 0;
        return Math.round((completed / totalSteps) * 100);
    };

    // Load bookmarks from user
    useEffect(() => {
        if (user?.bookmarks?.roadmaps) {
            setBookmarkedIds(new Set(user.bookmarks.roadmaps));
        }
    }, [user]);

    const toggleBookmark = async (roadmapId: string) => {
        if (!user) {
            addToast({
                variant: 'info',
                title: 'Sign in required',
                message: 'Create an account or sign in to bookmark roadmaps.',
            });
            const redirectUrl = `${window.location.pathname}${window.location.search}`;
            router.push(`/auth?redirect=${encodeURIComponent(redirectUrl)}`);
            return;
        }

        // Prevent double-clicks while a bookmark operation is pending
        if (bookmarkPending === roadmapId) return;
        setBookmarkPending(roadmapId);

        const previousBookmarks = new Set(bookmarkedIds);
        const newBookmarks = new Set(bookmarkedIds);
        if (newBookmarks.has(roadmapId)) {
            newBookmarks.delete(roadmapId);
        } else {
            newBookmarks.add(roadmapId);
        }

        // Optimistic update
        setBookmarkedIds(newBookmarks);

        try {
            await updateBookmarks({ roadmaps: Array.from(newBookmarks) });
            addToast({
                variant: 'success',
                title: newBookmarks.has(roadmapId) ? 'Roadmap bookmarked' : 'Bookmark removed',
                message: newBookmarks.has(roadmapId)
                    ? 'You can find this roadmap in your saved items.'
                    : 'This roadmap was removed from your bookmarks.',
            });
        } catch (err) {
            console.error('Failed to update bookmarks:', err);
            // Revert on error
            setBookmarkedIds(previousBookmarks);
            addToast({
                variant: 'error',
                title: 'Failed to update bookmarks',
                message: 'Please try again in a moment.',
            });
        } finally {
            setBookmarkPending(null);
        }
    };

    // Fetch roadmaps from backend
    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                setLoading(true);
                // Fetch from /api/resources/roadmaps — supports both { success, data } and raw array formats
                const response = await fetchApi('/api/resources/roadmaps', { requireAuth: false });

                // Normalize: handle both standardized { success, data, pagination } and raw array
                const rawItems = response?.success ? (response.data || []) : (Array.isArray(response) ? response : []);

                if (rawItems.length > 0) {
                    interface RoadmapApiItem {
                        content?: {
                            id?: string;
                            _id?: string;
                            title?: string;
                            name?: string;
                            description?: string;
                            category?: string;
                            totalTime?: string;
                            total_time?: string;
                            difficulty?: string;
                            followers?: string;
                            rating?: number;
                            steps?: unknown[];
                            color?: string;
                            icon?: string;
                            featured?: boolean;
                        };
                        id?: string;
                        _id?: string;
                        title?: string;
                        name?: string;
                        description?: string;
                        category?: string;
                        totalTime?: string;
                        total_time?: string;
                        difficulty?: string;
                        followers?: string;
                        rating?: number;
                        steps?: unknown[];
                        color?: string;
                        icon?: string;
                        featured?: boolean;
                    }
                    const transformedRoadmaps = rawItems.map((item: RoadmapApiItem) => {
                        const content = item.content || item;
                        return {
                            id: content.id || content._id || String(Math.random()),
                            title: content.title || content.name || '',
                            description: content.description || '',
                            category: content.category || 'Complete Path',
                            totalTime: content.totalTime || content.total_time || '3-6 months',
                            difficulty: content.difficulty || 'Beginner',
                            followers: content.followers || '0',
                            rating: content.rating || 4.5,
                            steps: content.steps || [],
                            color: content.color || 'from-orange-500 to-orange-600',
                            icon: content.icon || 'shield',
                            featured: content.featured || false,
                        };
                    });
                    setRoadmaps(transformedRoadmaps as Roadmap[]);
                    return;
                }

                // If API returns empty, use fallback
                setRoadmaps(fallbackRoadmaps);
            } catch (err) {
                console.error('Error fetching roadmaps:', err);
                // Silently use fallback data - no error shown to user
                setRoadmaps(fallbackRoadmaps);
            } finally {
                setLoading(false);
            }
        };

        fetchRoadmaps();
    }, []);

    // Fallback roadmaps data
    const fallbackRoadmaps: Roadmap[] = [
        {
            id: 'cybersecurity-fundamentals',
            title: 'Cybersecurity Fundamentals',
            description: 'Start your cybersecurity journey from zero to job-ready',
            category: 'Complete Path',
            totalTime: '3-6 months',
            difficulty: 'Beginner',
            followers: '25.4K',
            rating: 4.9,
            featured: true,
            color: 'from-orange-500 to-orange-600',
            icon: 'shield',
            steps: [
                {
                    id: 'step-1',
                    title: 'Learn the Basics',
                    description: 'Understand fundamental security concepts and terminology',
                    skills: ['Security Principles', 'Risk Management', 'Threat Landscape', 'Compliance Basics'],
                    estimated_time: '2-3 weeks',
                    difficulty: 'Beginner',
                    resources: [
                        {
                            title: 'Cybersecurity Fundamentals',
                            type: 'youtube',
                            url: 'https://youtube.com/watch?v=example',
                            platform: 'Professor Messer',
                            duration: '12 hours',
                            free: true
                        },
                        {
                            title: 'Security+ Course',
                            type: 'course',
                            url: 'https://tryhackme.com/path/outline/security',
                            platform: 'TryHackMe',
                            duration: '20 hours',
                            free: true
                        },
                        {
                            title: 'NIST Cybersecurity Framework',
                            type: 'documentation',
                            url: 'https://nist.gov/cyberframework',
                            platform: 'NIST',
                            free: true
                        }
                    ]
                },
                {
                    id: 'step-2',
                    title: 'Master Linux Command Line',
                    description: 'Essential Linux skills every security professional needs',
                    skills: ['Command Line', 'File Permissions', 'Process Management', 'System Administration'],
                    estimated_time: '3-4 weeks',
                    difficulty: 'Beginner',
                    resources: [
                        {
                            title: 'Linux Command Line Full Course',
                            type: 'youtube',
                            url: 'https://youtube.com/watch?v=example',
                            platform: 'freeCodeCamp',
                            duration: '5 hours',
                            free: true
                        },
                        {
                            title: 'Linux Fundamentals',
                            type: 'practice',
                            url: 'https://tryhackme.com/module/linux-fundamentals',
                            platform: 'TryHackMe',
                            duration: '15 hours',
                            free: true
                        },
                        {
                            title: 'OverTheWire Bandit',
                            type: 'practice',
                            url: 'https://overthewire.org/wargames/bandit/',
                            platform: 'OverTheWire',
                            free: true
                        }
                    ]
                },
                {
                    id: 'step-3',
                    title: 'Learn Networking',
                    description: 'Understand how networks work and common protocols',
                    skills: ['TCP/IP', 'DNS', 'HTTP/HTTPS', 'Network Troubleshooting', 'Packet Analysis'],
                    estimated_time: '4-5 weeks',
                    difficulty: 'Intermediate',
                    resources: [
                        {
                            title: 'Computer Networks Course',
                            type: 'youtube',
                            url: 'https://youtube.com/watch?v=example',
                            platform: 'Gate Smashers',
                            duration: '10 hours',
                            free: true
                        },
                        {
                            title: 'Wireshark Tutorial',
                            type: 'article',
                            url: 'https://medium.com/@cybersecurity/wireshark',
                            platform: 'Medium',
                            duration: '2 hours',
                            free: true
                        },
                        {
                            title: 'Network Security Module',
                            type: 'practice',
                            url: 'https://tryhackme.com/module/network-security',
                            platform: 'TryHackMe',
                            duration: '12 hours',
                            free: true
                        }
                    ]
                },
                {
                    id: 'step-4',
                    title: 'Web Application Security',
                    description: 'Learn to secure and test web applications',
                    skills: ['OWASP Top 10', 'SQL Injection', 'XSS', 'Web Security Testing'],
                    estimated_time: '6-8 weeks',
                    difficulty: 'Intermediate',
                    resources: [
                        {
                            title: 'OWASP Top 10 Explained',
                            type: 'youtube',
                            url: 'https://youtube.com/watch?v=example',
                            platform: 'OWASP',
                            duration: '3 hours',
                            free: true
                        },
                        {
                            title: 'Web Application Security',
                            type: 'practice',
                            url: 'https://tryhackme.com/module/web-application-security',
                            platform: 'TryHackMe',
                            duration: '25 hours',
                            free: true
                        },
                        {
                            title: 'PortSwigger Web Security Academy',
                            type: 'practice',
                            url: 'https://portswigger.net/web-security',
                            platform: 'PortSwigger',
                            free: true
                        }
                    ]
                }
            ]
        },
        {
            id: 'penetration-testing',
            title: 'Penetration Testing',
            description: 'Learn ethical hacking and penetration testing skills',
            category: 'Specialized',
            totalTime: '4-6 months',
            difficulty: 'Advanced',
            followers: '18.2K',
            rating: 4.8,
            featured: true,
            color: 'from-red-500 to-red-600',
            icon: 'target',
            steps: [
                {
                    id: 'recon',
                    title: 'Reconnaissance & Information Gathering',
                    description: 'Learn to gather information about targets legally and ethically',
                    skills: ['OSINT', 'Subdomain Enumeration', 'Port Scanning', 'Service Discovery'],
                    estimated_time: '3-4 weeks',
                    difficulty: 'Intermediate',
                    resources: [
                        {
                            title: 'OSINT Fundamentals',
                            type: 'youtube',
                            url: 'https://youtube.com/watch?v=example',
                            platform: 'The Cyber Mentor',
                            duration: '4 hours',
                            free: true
                        },
                        {
                            title: 'Nmap Complete Guide',
                            type: 'article',
                            url: 'https://medium.com/@cybersecurity/nmap-guide',
                            platform: 'Medium',
                            duration: '1 hour',
                            free: true
                        },
                        {
                            title: 'Red Team Recon',
                            type: 'practice',
                            url: 'https://tryhackme.com/module/red-team-recon',
                            platform: 'TryHackMe',
                            duration: '15 hours',
                            free: true
                        }
                    ]
                },
                {
                    id: 'exploitation',
                    title: 'Vulnerability Assessment & Exploitation',
                    description: 'Learn to find and exploit vulnerabilities responsibly',
                    skills: ['Vulnerability Scanning', 'Exploit Development', 'Metasploit', 'Manual Testing'],
                    estimated_time: '6-8 weeks',
                    difficulty: 'Advanced',
                    resources: [
                        {
                            title: 'Metasploit for Beginners',
                            type: 'youtube',
                            url: 'https://youtube.com/watch?v=example',
                            platform: 'Null Byte',
                            duration: '6 hours',
                            free: true
                        },
                        {
                            title: 'Penetration Testing Path',
                            type: 'practice',
                            url: 'https://tryhackme.com/path/outline/pentesting',
                            platform: 'TryHackMe',
                            duration: '40 hours',
                            free: false
                        },
                        {
                            title: 'HackTheBox Academy',
                            type: 'practice',
                            url: 'https://academy.hackthebox.com',
                            platform: 'HackTheBox',
                            free: false
                        }
                    ]
                }
            ]
        },
        {
            id: 'blue-team-defense',
            title: 'Blue Team & Defense',
            description: 'Learn to defend and monitor systems against attacks',
            category: 'Specialized',
            totalTime: '3-5 months',
            difficulty: 'Intermediate',
            followers: '12.8K',
            rating: 4.7,
            featured: false,
            color: 'from-blue-500 to-blue-600',
            icon: 'shield',
            steps: [
                {
                    id: 'monitoring',
                    title: 'Security Monitoring & SIEM',
                    description: 'Learn to monitor and analyze security events',
                    skills: ['SIEM', 'Log Analysis', 'Threat Detection', 'Incident Response'],
                    estimated_time: '4-5 weeks',
                    difficulty: 'Intermediate',
                    resources: [
                        {
                            title: 'SIEM Fundamentals',
                            type: 'youtube',
                            url: 'https://youtube.com/watch?v=example',
                            platform: 'InfoSec Institute',
                            duration: '3 hours',
                            free: true
                        },
                        {
                            title: 'SOC Level 1 Path',
                            type: 'practice',
                            url: 'https://tryhackme.com/path/outline/soclevel1',
                            platform: 'TryHackMe',
                            duration: '30 hours',
                            free: true
                        }
                    ]
                }
            ]
        }
    ];

    const categories = [
        { id: 'all', name: 'All Paths' },
        { id: 'complete', name: 'Complete Journey' },
        { id: 'specialized', name: 'Specialized' }
    ];

    const allFilteredRoadmaps = roadmaps.filter(roadmap => {
        const matchesSearch = roadmap.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            roadmap.description.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesCategory = selectedCategory === 'all' ||
            (selectedCategory === 'complete' && roadmap.category === 'Complete Path') ||
            (selectedCategory === 'specialized' && roadmap.category === 'Specialized');
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(allFilteredRoadmaps.length / pageSize);
    const filteredRoadmaps = allFilteredRoadmaps.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, selectedCategory]);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getResourceIcon = (type: string) => {
        switch (type) {
            case 'youtube': return <Youtube className="w-4 h-4 text-red-400" />;
            case 'article': return <BookOpen className="w-4 h-4 text-blue-400" />;
            case 'course': return <Play className="w-4 h-4 text-green-400" />;
            case 'practice': return <Code className="w-4 h-4 text-purple-400" />;
            case 'documentation': return <BookOpen className="w-4 h-4 text-gray-400" />;
            default: return <ExternalLink className="w-4 h-4" />;
        }
    };

    const getRoadmapIcon = (icon: string) => {
        switch (icon) {
            case 'shield': return <Shield className="w-6 h-6" />;
            case 'target': return <Target className="w-6 h-6" />;
            case 'code': return <Code className="w-6 h-6" />;
            default: return <Shield className="w-6 h-6" />;
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-black pt-32 pb-16 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <SkeletonRoadmapsGrid />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                {/* Subtle glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <Map className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Structured Learning Paths</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                        Learning
                        <span className="gradient-text"> Roadmaps</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                        Follow curated paths from beginner to expert. Free resources, hands-on practice, and clear progression.
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center gap-12 pt-8 border-t border-white/10">
                        <div>
                            <div className="text-2xl font-bold text-white">{roadmaps.length}</div>
                            <div className="text-sm text-gray-500">Paths</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">100%</div>
                            <div className="text-sm text-gray-500">Free</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">50+</div>
                            <div className="text-sm text-gray-500">Resources</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search roadmaps..."
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat.id
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Roadmaps */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                <div className="space-y-6">
                    {filteredRoadmaps.map((roadmap, index) => (
                        <div 
                            key={roadmap.id} 
                            className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-orange-500/30 transition-all duration-300"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${roadmap.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                        {getRoadmapIcon(roadmap.icon)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h2 className="text-xl font-semibold text-white truncate">{roadmap.title}</h2>
                                            {roadmap.featured && <Star className="w-4 h-4 text-orange-500 fill-current flex-shrink-0" />}
                                        </div>
                                        <p className="text-gray-400 text-sm mb-3">{roadmap.description}</p>
                                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                            <span className={`px-2 py-1 rounded border ${getDifficultyColor(roadmap.difficulty)}`}>
                                                {roadmap.difficulty}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {roadmap.totalTime}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3.5 h-3.5" />
                                                {roadmap.followers}
                                            </span>
                                            {/* Star Rating */}
                                            <span className="flex items-center gap-0.5 ml-2">
                                                {[1, 2, 3, 4, 5].map(star => {
                                                    const currentRating = userRatings[roadmap.id] || roadmap.rating;
                                                    const isHovering = hoverRating?.id === roadmap.id;
                                                    const displayRating = isHovering ? hoverRating.value : currentRating;
                                                    const filled = star <= Math.round(displayRating);
                                                    return (
                                                        <button
                                                            key={star}
                                                            onClick={(e) => { e.stopPropagation(); rateRoadmap(roadmap.id, star); }}
                                                            onMouseEnter={() => setHoverRating({ id: roadmap.id, value: star })}
                                                            onMouseLeave={() => setHoverRating(null)}
                                                            className="p-0 transition-colors"
                                                        >
                                                            <Star className={`w-3.5 h-3.5 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                                                        </button>
                                                    );
                                                })}
                                                <span className="ml-1 text-gray-400">{(userRatings[roadmap.id] || roadmap.rating).toFixed(1)}</span>
                                            </span>
                                        </div>

                                        {/* Progress bar for this roadmap */}
                                        {user && roadmap.steps.length > 0 && (
                                            <div className="mt-3">
                                                <div className="flex items-center justify-between text-xs mb-1">
                                                    <span className="text-gray-500">Your Progress</span>
                                                    <span className="text-orange-400">{getStepProgress(roadmap.id, roadmap.steps.length)}%</span>
                                                </div>
                                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-orange-500 rounded-full transition-all duration-300"
                                                        style={{ width: `${getStepProgress(roadmap.id, roadmap.steps.length)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => toggleBookmark(roadmap.id)}
                                        disabled={bookmarkPending === roadmap.id}
                                        className={`shrink-0 p-2 rounded-lg border transition-all disabled:opacity-50 ${
                                            bookmarkedIds.has(roadmap.id)
                                                ? 'bg-orange-500/10 border-orange-500/50 text-orange-400'
                                                : 'border-white/10 text-gray-400 hover:border-orange-500/30 hover:text-orange-400'
                                        }`}
                                        title={bookmarkedIds.has(roadmap.id) ? 'Remove bookmark' : 'Bookmark roadmap'}
                                    >
                                        {bookmarkPending === roadmap.id ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <Bookmark className={`w-5 h-5 ${bookmarkedIds.has(roadmap.id) ? 'fill-current' : ''}`} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="p-6">
                                <div className="space-y-4">
                                    {roadmap.steps.map((step, index) => (
                                        <div key={step.id} className="group">
                                            <div className="flex gap-4">
                                                {/* Step number - click to toggle completion */}
                                                <div className="flex flex-col items-center">
                                                    <button
                                                        onClick={() => toggleStepCompletion(roadmap.id, step.id)}
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                                                            completedSteps[roadmap.id]?.has(step.id)
                                                                ? 'bg-green-500 text-white ring-2 ring-green-500/30'
                                                                : `bg-gradient-to-br ${roadmap.color} text-white hover:ring-2 hover:ring-white/20`
                                                        }`}
                                                        title={completedSteps[roadmap.id]?.has(step.id) ? 'Mark as incomplete' : 'Mark as completed'}
                                                    >
                                                        {completedSteps[roadmap.id]?.has(step.id) ? <Check className="w-4 h-4" /> : index + 1}
                                                    </button>
                                                    {index < roadmap.steps.length - 1 && (
                                                        <div className="w-px h-full bg-white/10 mt-2" />
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 pb-6">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="font-medium text-white">{step.title}</h3>
                                                        <span className="text-xs text-gray-500">{step.estimated_time}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-400 mb-3">{step.description}</p>

                                                    {/* Skills */}
                                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                                        {step.skills.map((skill, i) => (
                                                            <span key={i} className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Resources */}
                                                    <div className="space-y-2">
                                                        {step.resources.slice(0, 3).map((resource, i) => (
                                                            <a
                                                                key={i}
                                                                href={resource.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-orange-500/30 hover:bg-white/[0.04] transition-all group/link"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-orange-500/70">{getResourceIcon(resource.type)}</span>
                                                                    <div>
                                                                        <div className="text-sm text-white group-hover/link:text-orange-400 transition-colors">
                                                                            {resource.title}
                                                                        </div>
                                                                        <div className="text-xs text-gray-500">
                                                                            {resource.platform}{resource.duration && ` • ${resource.duration}`}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    {resource.free && (
                                                                        <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded">Free</span>
                                                                    )}
                                                                    <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover/link:text-orange-400 transition-colors" />
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredRoadmaps.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                                <Search className="w-8 h-8 text-gray-600" />
                            </div>
                            <p className="text-gray-400 mb-2">No roadmaps found</p>
                            <p className="text-sm text-gray-600">Try adjusting your search or filter</p>
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-white/5">
                            <button
                                onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                disabled={currentPage <= 1}
                                className="flex items-center gap-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Prev
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                                    <button
                                        key={pageNum}
                                        onClick={() => { setCurrentPage(pageNum); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                                            currentPage === pageNum
                                                ? 'bg-orange-500 text-white'
                                                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                disabled={currentPage >= totalPages}
                                className="flex items-center gap-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            <span className="text-sm text-gray-500 ml-2">
                                Page {currentPage} of {totalPages}
                            </span>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                <div className="relative text-center p-10 rounded-2xl border border-white/10 bg-gradient-to-b from-orange-500/5 to-transparent overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full border border-orange-500/20 bg-orange-500/10">
                            <Sparkles className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-orange-400 font-medium">Open Source</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Want to contribute?</h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">Help us improve these roadmaps or suggest new learning paths for the community.</p>
                        <a 
                            href="https://discord.gg/d3gBSNrVKb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 btn-press"
                        >
                            Join Community
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default RoadmapsPage;