// components/ContentSection.tsx
import React from 'react';
import {ArrowRight, Star, Calendar, Globe, Search, Layers, Briefcase, Mic, Users, FileText} from 'lucide-react';

const ContentSection = () => {
    const recentPosts = [
        {
            title: "SQL Injection in Modern Applications",
            author: "Sarah Chen",
            time: "1 day ago",
            type: "Writeup",
            category: "Web Security"
        },
        {
            title: "Building a Custom OSINT Tool with Python",
            author: "Marcus Dev",
            time: "3 days ago",
            type: "Tutorial",
            category: "Development"
        },
        {
            title: "Deep Dive into CVE-2024-1234",
            author: "Research Team",
            time: "5 days ago",
            type: "Analysis",
            category: "Vulnerability"
        },
    ];

    const learningPaths = [
        {
            title: "Web App Pentesting",
            description: "Master web security from basics to advanced techniques.",
            icon: <Globe className="w-6 h-6" />
        },
        {
            title: "Network Pentesting",
            description: "Learn network assessment and exploitation.",
            icon: <Layers className="w-6 h-6" />
        },
        {
            title: "Digital Forensics",
            description: "Investigate and analyze digital evidence effectively.",
            icon: <Search className="w-6 h-6" />
        }
    ];

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Security Analyst, Microsoft",
            content: "TheCyberHub's tools and resources were pivotal in my transition from web dev to cybersecurity. The community support is incredible!",
            avatar: "S"
        },
        {
            name: "Marcus Rodriguez",
            role: "Senior Penetration Tester",
            content: "The hands-on tools and real-world writeups gave me the practical experience I needed to significantly advance my pentesting skills.",
            avatar: "M"
        },
        {
            name: "Aisha Patel",
            role: "Cybersecurity Student",
            content: "Amazing community! The learning paths connected me with industry professionals who guided my entire learning journey.",
            avatar: "A"
        },
    ];

    const opportunities = [
        {
            icon: <Briefcase />,
            title: "Security Engineer Internship",
            company: "Tech Corp",
            location: "Remote",
            type: "Internship"
        },
        {
            icon: <Mic />,
            title: "Advanced Web Security Workshop",
            company: "Community Event",
            location: "Online",
            type: "Event"
        },
        {
            icon: <Users />,
            title: "Cybersecurity Career Fair",
            company: "Industry Partners",
            location: "Virtual",
            type: "Career Fair"
        }
    ];

    const getTypePill = (type: string) => {
        switch (type) {
            case 'Writeup': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
            case 'Tutorial': return 'bg-green-500/10 text-green-400 border border-green-500/20';
            case 'Analysis': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
            case 'Internship': return 'bg-green-500/10 text-green-400 border border-green-500/20';
            case 'Event': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
            case 'Career Fair': return 'bg-pink-500/10 text-pink-400 border border-pink-500/20';
            default: return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
        }
    };

    return (
        <section className="bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        The Pulse of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Community</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Explore the latest content, learning opportunities, and hear from members shaping the future of cybersecurity.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Column 1: Latest Content */}
                    <div className="lg:col-span-1 space-y-6">
                        <h3 className="text-2xl font-bold text-white flex items-center"><FileText className="w-6 h-6 mr-3 text-orange-400"/>Latest Content</h3>
                        {recentPosts.map((post, index) => (
                            <a href="#" key={index} className="block bg-white/5 border border-white/10 p-5 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-orange-400/30 transform hover:-translate-y-1 group">
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getTypePill(post.type)}`}>{post.type}</span>
                                    <span className="text-gray-500 text-xs">{post.time}</span>
                                </div>
                                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">{post.title}</h4>
                                <p className="text-sm text-gray-400">by {post.author}</p>
                            </a>
                        ))}
                        <button className="w-full text-center py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-orange-400 font-semibold transition-all flex items-center justify-center space-x-2">
                            <span>View All Posts</span>
                            <ArrowRight className="w-4 h-4"/>
                        </button>
                    </div>

                    {/* Column 2: Learning & Growth */}
                    <div className="lg:col-span-1 space-y-6">
                        <h3 className="text-2xl font-bold text-white flex items-center"><Layers className="w-6 h-6 mr-3 text-orange-400"/>Learning Paths</h3>
                        {learningPaths.map((path, index) => (
                            <a href="#" key={index} className="flex items-center space-x-4 bg-white/5 border border-white/10 p-5 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-orange-400/30 transform hover:-translate-y-1 group">
                                <div className="flex-shrink-0 bg-orange-500/10 p-3 rounded-lg text-orange-400">
                                    {path.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">{path.title}</h4>
                                    <p className="text-sm text-gray-400">{path.description}</p>
                                </div>
                            </a>
                        ))}
                        <h3 className="text-2xl font-bold text-white flex items-center pt-6"><Calendar className="w-6 h-6 mr-3 text-orange-400"/>Events & Jobs</h3>
                        {opportunities.map((op, index) => (
                            <a href="#" key={index} className="flex items-center space-x-4 bg-white/5 border border-white/10 p-5 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-orange-400/30 transform hover:-translate-y-1 group">
                                <div className={`flex-shrink-0 p-3 rounded-lg ${getTypePill(op.type)}`}>
                                    {React.cloneElement(op.icon, { className: 'w-6 h-6' })}
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">{op.title}</h4>
                                    <p className="text-sm text-gray-400">{op.company} • {op.location}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Column 3: Testimonials */}
                    <div className="lg:col-span-1 space-y-6">
                        <h3 className="text-2xl font-bold text-white flex items-center"><Star className="w-6 h-6 mr-3 text-orange-400"/>Community Voice</h3>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white/5 border border-white/10 p-5 rounded-xl">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                        <p className="text-sm text-orange-400">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 italic leading-relaxed">&quot;{testimonial.content}&quot;</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContentSection;
