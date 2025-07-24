// components/Footer.tsx
import React from 'react';
import { Shield, Github, Twitter, Linkedin, Mail, ChevronRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-orange-500/25">
                                <Shield className="h-6 w-6 text-black" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-white">TheCyberHUB</span>
                                <span className="text-sm text-orange-400 -mt-1">Security Community</span>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                            Empowering the next generation of cybersecurity professionals through tools, resources, and community.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: Github, href: "https://github.com/thecyberhub" },
                                { icon: Twitter, href: "https://twitter.com/thecyberhub" },
                                { icon: Linkedin, href: "https://linkedin.com/company/thecyberhub" },
                                { icon: Mail, href: "mailto:contact@thecyberhub.org" }
                            ].map(({ icon: Icon, href }, index) => (
                                <a key={index} href={href} className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 group">
                                    <Icon className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors duration-300" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Tools Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 text-lg">Tools</h4>
                        <ul className="space-y-3">
                            {["Subdomain Finder", "SSL Scanner", "URL Analyzer", "Port Scanner", "All Tools"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group">
                                        <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 text-lg">Resources</h4>
                        <ul className="space-y-3">
                            {["Cheatsheets", "Payloads", "Methodology", "Learning Paths", "Documentation"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group">
                                        <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 text-lg">Community</h4>
                        <ul className="space-y-3">
                            {["Blog Posts", "Writeups", "Events", "Internships", "Discord"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group">
                                        <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 mb-4 md:mb-0">
                            &copy; 2025 TheCyberHUB. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            {["Privacy Policy", "Terms of Service", "Code of Conduct"].map((item) => (
                                <a key={item} href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm">
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;