// components/ContentSection.tsx
import React from 'react';
import { ArrowRight, Star, Calendar, Globe, Search, Layers } from 'lucide-react';

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
            title: "Building a Custom OSINT Tool",
            author: "Marcus Dev",
            time: "3 days ago",
            type: "Tutorial",
            category: "Development"
        },
        {
            title: "CVE-2024-1234 Analysis",
            author: "Research Team",
            time: "5 days ago",
            type: "Analysis",
            category: "Vulnerability"
        },
        {
            title: "Docker Security Best Practices",
            author: "DevOps Hub",
            time: "1 week ago",
            type: "Guide",
            category: "DevSecOps"
        }
    ];

    const learningPaths = [
        {
            title: "Web Application Security",
            description: "Master web app pentesting from basics to advanced techniques",
            modules: 12,
            duration: "6-8 weeks",
            level: "Beginner to Advanced",
            students: "15,420",
            icon: <Globe className="w-8 h-8" />
        },
        {
            title: "Network Penetration Testing",
            description: "Learn network security assessment and exploitation",
            modules: 15,
            duration: "8-10 weeks",
            level: "Intermediate",
            students: "12,350",
            icon: <Layers className="w-8 h-8" />
        },
        {
            title: "Digital Forensics",
            description: "Investigate and analyze digital evidence",
            modules: 10,
            duration: "5-7 weeks",
            level: "Beginner",
            students: "8,920",
            icon: <Search className="w-8 h-8" />
        }
    ];

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Security Analyst at Microsoft",
            content: "TheCyberHub's tools and resources helped me transition from web development to cybersecurity. The community support and practical tools are incredible!",
            rating: 5,
            avatar: "S"
        },
        {
            name: "Marcus Rodriguez",
            role: "Senior Penetration Tester",
            content: "The hands-on tools and real-world writeups gave me the practical experience I needed to advance my penetration testing skills significantly.",
            rating: 5,
            avatar: "M"
        },
        {
            name: "Aisha Patel",
            role: "Cybersecurity Student",
            content: "Amazing community! The learning paths and mentorship program connected me with industry professionals who guided my entire learning journey.",
            rating: 5,
            avatar: "A"
        },
        {
            name: "David Kim",
            role: "Security Researcher",
            content: "The tool collection is outstanding. I use the subdomain finder and SSL scanner daily in my security research. Saves me hours of work!",
            rating: 5,
            avatar: "D"
        },
        {
            name: "Elena Vasquez",
            role: "SOC Analyst",
            content: "The methodology guides and cheatsheets are my go-to resources. They've helped me become more efficient and confident in my security analysis.",
            rating: 5,
            avatar: "E"
        },
        {
            name: "James Wilson",
            role: "Freelance Security Consultant",
            content: "Being part of this community opened up internship and job opportunities I never knew existed. The industry connections are invaluable.",
            rating: 5,
            avatar: "J"
        }
    ];

    return (
        <>
            {/* Latest Content & Writeups */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Content & Writeups</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Stay updated with the latest security insights, tutorials, and detailed analysis from our community experts.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Featured Blog Post */}
                        <div className="lg:col-span-2">
                            <div className="bg-gray-900/50 border border-gray-800 hover:border-orange-400/50 rounded-xl overflow-hidden transition-all duration-300 group">
                                <div className="p-8">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm px-3 py-1 rounded-full">Featured</span>
                                        <span className="text-gray-400 text-sm">2 days ago</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                                        Advanced Web Application Penetration Testing: A Complete Methodology
                                    </h3>
                                    <p className="text-gray-300 mb-6 leading-relaxed">
                                        A comprehensive guide covering modern web application security testing techniques, from reconnaissance to exploitation. Learn advanced methodologies used by professional penetration testers.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                                                <span className="text-black font-bold text-sm">A</span>
                                            </div>
                                            <div>
                                                <div className="text-white font-medium">Alex Security</div>
                                                <div className="text-gray-400 text-sm">Senior Penetration Tester</div>
                                            </div>
                                        </div>
                                        <button className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors">
                                            <span>Read More</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Posts */}
                        <div className="space-y-6">
                            {recentPosts.map((post, index) => (
                                <div key={index} className="bg-gray-800/50 border border-gray-700 hover:border-orange-400/50 rounded-lg p-4 transition-all duration-300 group cursor-pointer">
                                    <div className="flex items-start justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                        post.type === 'Writeup' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            post.type === 'Tutorial' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                post.type === 'Analysis' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                    'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    }`}>
                      {post.type}
                    </span>
                                        <span className="text-gray-400 text-xs">{post.time}</span>
                                    </div>
                                    <h4 className="text-white font-medium mb-2 group-hover:text-orange-400 transition-colors">{post.title}</h4>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 text-sm">{post.author}</span>
                                        <span className="text-gray-500 text-xs">{post.category}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                                View All Posts
                            </button>
                            <button className="border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                                Submit Writeup
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Learning Paths Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Structured <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Learning Paths</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Follow our expertly crafted learning paths to master specific cybersecurity domains.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {learningPaths.map((path, index) => (
                            <div key={index} className="bg-gray-800/50 border border-gray-700 hover:border-orange-400/50 rounded-xl p-6 transition-all duration-300 group">
                                <div className="text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                                    {path.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors">{path.title}</h3>
                                <p className="text-gray-400 mb-4 leading-relaxed">{path.description}</p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">Modules:</span>
                                        <span className="text-orange-400">{path.modules}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">Duration:</span>
                                        <span className="text-orange-400">{path.duration}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">Level:</span>
                                        <span className="text-orange-400">{path.level}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">Students:</span>
                                        <span className="text-orange-400">{path.students}</span>
                                    </div>
                                </div>
                                <button className="w-full bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500 hover:text-black font-semibold py-3 rounded-lg transition-all duration-300">
                                    Start Learning
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Community Testimonials */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Community Says</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Hear from cybersecurity professionals who have grown their careers with TheCyberHub.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-900/50 border border-gray-800 hover:border-orange-400/50 rounded-xl p-6 transition-all duration-300 group">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                                        <span className="text-black font-bold">{testimonial.avatar}</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">{testimonial.name}</div>
                                        <div className="text-orange-400 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-4 leading-relaxed">"{testimonial.content}"</p>
                                <div className="flex space-x-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-orange-400 fill-current" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events & Opportunities */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Events & Opportunities</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Join our events, workshops, and discover career opportunities in cybersecurity.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Events */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <Calendar className="w-6 h-6 mr-2 text-orange-400" />
                                Upcoming Events
                            </h3>
                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Advanced Web Security Workshop",
                                        date: "Jan 28, 2025",
                                        time: "2:00 PM EST",
                                        type: "Workshop",
                                        attendees: "245 registered"
                                    },
                                    {
                                        title: "Career Fair: Cybersecurity Jobs",
                                        date: "Feb 5, 2025",
                                        time: "10:00 AM EST",
                                        type: "Career Event",
                                        attendees: "500+ companies"
                                    },
                                    {
                                        title: "CTF Competition: Winter Challenge",
                                        date: "Feb 12, 2025",
                                        time: "All Day",
                                        type: "Competition",
                                        attendees: "1,200 participants"
                                    }
                                ].map((event, index) => (
                                    <div key={index} className="bg-gray-800/50 border border-gray-700 hover:border-orange-400/50 rounded-lg p-4 transition-all duration-300 group">
                                        <div className="flex items-start justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                          event.type === 'Workshop' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                              event.type === 'Career Event' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                  'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}>
                        {event.type}
                      </span>
                                            <button className="text-orange-400 hover:text-orange-300 text-sm">Register</button>
                                        </div>
                                        <h4 className="text-white font-medium mb-2 group-hover:text-orange-400 transition-colors">{event.title}</h4>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">{event.date} • {event.time}</span>
                                            <span className="text-gray-500">{event.attendees}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Opportunities */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <Calendar className="w-6 h-6 mr-2 text-orange-400" />
                                Career Opportunities
                            </h3>
                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Security Engineer Internship",
                                        company: "Tech Corp",
                                        location: "Remote",
                                        type: "Paid Internship",
                                        salary: "$25/hour"
                                    },
                                    {
                                        title: "Junior Penetration Tester",
                                        company: "CyberSec Solutions",
                                        location: "New York, NY",
                                        type: "Full-time",
                                        salary: "$75K - $90K"
                                    },
                                    {
                                        title: "SOC Analyst Position",
                                        company: "Security First",
                                        location: "San Francisco, CA",
                                        type: "Full-time",
                                        salary: "$65K - $80K"
                                    },
                                    {
                                        title: "Cybersecurity Researcher",
                                        company: "Research Lab",
                                        location: "Boston, MA",
                                        type: "Contract",
                                        salary: "$80K - $100K"
                                    }
                                ].map((job, index) => (
                                    <div key={index} className="bg-gray-800/50 border border-gray-700 hover:border-orange-400/50 rounded-lg p-4 transition-all duration-300 group">
                                        <div className="flex items-start justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                          job.type === 'Paid Internship' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                              job.type === 'Full-time' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                  'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}>
                        {job.type}
                      </span>
                                            <button className="text-orange-400 hover:text-orange-300 text-sm">Apply</button>
                                        </div>
                                        <h4 className="text-white font-medium mb-1 group-hover:text-orange-400 transition-colors">{job.title}</h4>
                                        <div className="text-sm text-gray-400 mb-2">{job.company} • {job.location}</div>
                                        <div className="text-sm text-orange-400">{job.salary}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                                View All Events
                            </button>
                            <button className="border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                                Browse Job Board
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500/10 to-orange-600/5">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-8 text-center">
                        <div className="mb-6">
                            <h3 className="text-3xl font-bold text-white mb-3">Stay Updated with TheCyberHub</h3>
                            <p className="text-gray-300 text-lg">
                                Get the latest security tools, writeups, job opportunities, and event notifications delivered to your inbox.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
                            <input
                                placeholder="Enter your email address"
                                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                            />
                            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 whitespace-nowrap">
                                Subscribe Now
                            </button>
                        </div>
                        <p className="text-xs text-gray-400">
                            Join 50,000+ subscribers. No spam, unsubscribe anytime. We respect your privacy.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContentSection;