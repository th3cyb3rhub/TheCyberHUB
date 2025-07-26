"use client"

import React, { useState } from 'react';
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
    Youtube
} from 'lucide-react';

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
    icon: React.ReactNode;
    featured: boolean;
}

const SimpleRoadmapsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const roadmaps: Roadmap[] = [
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
            icon: <Shield className="w-6 h-6" />,
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
            icon: <Target className="w-6 h-6" />,
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
            icon: <Shield className="w-6 h-6" />,
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

    const filteredRoadmaps = roadmaps.filter(roadmap => {
        const matchesSearch = roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            roadmap.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' ||
            (selectedCategory === 'complete' && roadmap.category === 'Complete Path') ||
            (selectedCategory === 'specialized' && roadmap.category === 'Specialized');
        return matchesSearch && matchesCategory;
    });

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

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="pt-20 pb-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                                <Map className="h-8 w-8 text-black" />
                            </div>
                            <div>
                                <h1 className="text-5xl md:text-6xl font-bold text-white">Learning Roadmaps</h1>
                                <p className="text-orange-400 text-lg mt-2">Your Step-by-Step Cybersecurity Journey</p>
                            </div>
                        </div>

                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                            Follow structured learning paths curated from the best free resources on the internet.
                            Learn at your own pace with YouTube videos, articles, and hands-on practice.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                                <div className="text-orange-400 font-bold text-2xl mb-1">{roadmaps.length}</div>
                                <div className="text-gray-400 text-sm">Learning Paths</div>
                            </div>
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                                <div className="text-orange-400 font-bold text-2xl mb-1">100%</div>
                                <div className="text-gray-400 text-sm">Free Resources</div>
                            </div>
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                                <div className="text-orange-400 font-bold text-2xl mb-1">56K+</div>
                                <div className="text-gray-400 text-sm">Followers</div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="mb-12">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search learning paths..."
                                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                    />
                                </div>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                >
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Roadmaps Grid */}
                    <div className="space-y-8">
                        {filteredRoadmaps.map((roadmap) => (
                            <div key={roadmap.id} className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-orange-400/50 transition-all duration-300">
                                {/* Roadmap Header */}
                                <div className="p-6 border-b border-gray-800">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-12 h-12 bg-gradient-to-br ${roadmap.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                                {roadmap.icon}
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h2 className="text-2xl font-bold text-white">{roadmap.title}</h2>
                                                    {roadmap.featured && <Star className="h-5 w-5 text-orange-400 fill-current" />}
                                                    <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(roadmap.difficulty)}`}>
                                                        {roadmap.difficulty}
                                                    </span>
                                                </div>
                                                <p className="text-gray-400 text-lg mb-3">{roadmap.description}</p>
                                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                    <div className="flex items-center space-x-1">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{roadmap.totalTime}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <Users className="w-4 h-4" />
                                                        <span>{roadmap.followers} followers</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="w-4 h-4 fill-current" />
                                                        <span>{roadmap.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Learning Steps */}
                                <div className="p-6">
                                    <div className="space-y-6">
                                        {roadmap.steps.map((step, index) => (
                                            <div key={step.id} className="bg-gray-800/30 rounded-lg p-4 hover:bg-gray-800/50 transition-colors">
                                                <div className="flex items-start space-x-4">
                                                    <div className={`w-8 h-8 bg-gradient-to-br ${roadmap.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0`}>
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                                                            <div className="flex items-center space-x-2">
                                                                <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(step.difficulty)}`}>
                                                                    {step.difficulty}
                                                                </span>
                                                                <span className="text-xs text-gray-500">{step.estimated_time}</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-400 mb-3">{step.description}</p>

                                                        {/* Skills */}
                                                        <div className="mb-4">
                                                            <div className="text-sm text-gray-500 mb-2">You&#39;ll learn:</div>
                                                            <div className="flex flex-wrap gap-1">
                                                                {step.skills.map((skill, skillIndex) => (
                                                                    <span key={skillIndex} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded">
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Resources */}
                                                        <div>
                                                            <div className="text-sm text-gray-500 mb-2">Recommended resources:</div>
                                                            <div className="grid gap-2">
                                                                {step.resources.map((resource, resourceIndex) => (
                                                                    <a
                                                                        key={resourceIndex}
                                                                        href={resource.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center justify-between p-3 bg-gray-900/50 hover:bg-gray-900/80 rounded-lg border border-gray-700/50 hover:border-orange-500/30 transition-all duration-200 group"
                                                                    >
                                                                        <div className="flex items-center space-x-3">
                                                                            {getResourceIcon(resource.type)}
                                                                            <div>
                                                                                <div className="text-white font-medium group-hover:text-orange-400 transition-colors">
                                                                                    {resource.title}
                                                                                </div>
                                                                                <div className="text-xs text-gray-500">
                                                                                    {resource.platform}
                                                                                    {resource.duration && ` • ${resource.duration}`}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center space-x-2">
                                                                            {resource.free && (
                                                                                <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded">
                                                                                    Free
                                                                                </span>
                                                                            )}
                                                                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-400 transition-colors" />
                                                                        </div>
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="mt-16 text-center bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Learning?</h3>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                            Pick a roadmap that matches your goals and start building your cybersecurity skills today.
                            All resources are carefully curated and mostly free!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                                Join Community
                            </button>
                            <button className="border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                                Suggest Roadmap
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimpleRoadmapsPage;