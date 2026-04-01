"use client"

import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Shield, Copy, Check, Search, Eye, Globe, Info, ChevronRight, Database, Image as ImageIcon, Users } from 'lucide-react';
import Footer from '@/components/Footer';

type CategoryType = 'all' | 'search-engines' | 'social-media' | 'domains' | 'images' | 'people' | 'data-breaches' | 'tools';

interface CommandSection {
    title: string;
    description: string;
    icon: React.ReactNode;
    commands: Array<{
        name: string;
        command: string;
        description: string;
        category: 'search-engines' | 'social-media' | 'domains' | 'images' | 'people' | 'data-breaches' | 'tools';
    }>;
}

const OSINTCheatsheet = () => {
    const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'search-engines' | 'social-media' | 'domains' | 'images' | 'people' | 'data-breaches' | 'tools'>('all');

    const sections: CommandSection[] = [
        {
            title: 'Google Dorks',
            description: 'Advanced Google search operators for information gathering',
            icon: <Globe className="w-5 h-5" />,
            commands: [
                {
                    name: 'Site-specific Search',
                    command: 'site:example.com',
                    description: 'Search only within specific domain',
                    category: 'search-engines'
                },
                {
                    name: 'File Type Search',
                    command: 'filetype:pdf "confidential"',
                    description: 'Find specific file types',
                    category: 'search-engines'
                },
                {
                    name: 'Intitle Search',
                    command: 'intitle:"index of" password',
                    description: 'Search in page titles',
                    category: 'search-engines'
                },
                {
                    name: 'Inurl Search',
                    command: 'inurl:admin site:example.com',
                    description: 'Search in URLs',
                    category: 'search-engines'
                },
                {
                    name: 'Cache Search',
                    command: 'cache:example.com',
                    description: 'View Google\'s cached version',
                    category: 'search-engines'
                },
                {
                    name: 'Exclude Results',
                    command: 'cybersecurity -jobs',
                    description: 'Exclude specific terms',
                    category: 'search-engines'
                },
                {
                    name: 'Related Sites',
                    command: 'related:example.com',
                    description: 'Find similar websites',
                    category: 'search-engines'
                },
                {
                    name: 'Exposed Passwords',
                    command: 'filetype:sql "password" OR "passwd" OR "pwd"',
                    description: 'Find exposed password files',
                    category: 'search-engines'
                },
                {
                    name: 'Config Files',
                    command: 'filetype:env "DB_PASSWORD"',
                    description: 'Find configuration files',
                    category: 'search-engines'
                },
                {
                    name: 'Backup Files',
                    command: 'filetype:bak OR filetype:backup',
                    description: 'Find backup files',
                    category: 'search-engines'
                }
            ]
        },
        {
            title: 'Social Media OSINT',
            description: 'Gather intelligence from social platforms',
            icon: <Users className="w-5 h-5" />,
            commands: [
                {
                    name: 'Twitter Advanced',
                    command: 'from:username since:2024-01-01 until:2024-12-31',
                    description: 'Search tweets from specific user and date range',
                    category: 'social-media'
                },
                {
                    name: 'Twitter Location',
                    command: 'near:"New York" within:15mi',
                    description: 'Search tweets by location',
                    category: 'social-media'
                },
                {
                    name: 'LinkedIn X-Ray',
                    command: 'site:linkedin.com/in/ "security engineer" "New York"',
                    description: 'Find LinkedIn profiles via Google',
                    category: 'social-media'
                },
                {
                    name: 'Facebook Graph',
                    command: 'site:facebook.com "John Doe" "New York"',
                    description: 'Search Facebook profiles',
                    category: 'social-media'
                },
                {
                    name: 'Instagram Posts',
                    command: 'site:instagram.com "location:NYC"',
                    description: 'Find Instagram posts by location',
                    category: 'social-media'
                },
                {
                    name: 'Reddit Search',
                    command: 'site:reddit.com "data breach" cybersecurity',
                    description: 'Search Reddit discussions',
                    category: 'social-media'
                },
                {
                    name: 'GitHub Code',
                    command: 'site:github.com "api_key" OR "password"',
                    description: 'Find exposed credentials on GitHub',
                    category: 'social-media'
                }
            ]
        },
        {
            title: 'Domain & IP Intelligence',
            description: 'Investigate domains, subdomains, and IP addresses',
            icon: <Globe className="w-5 h-5" />,
            commands: [
                {
                    name: 'Whois Lookup',
                    command: 'whois example.com',
                    description: 'Get domain registration info',
                    category: 'domains'
                },
                {
                    name: 'DNS Records',
                    command: 'dig example.com ANY\nnslookup -type=any example.com',
                    description: 'Query all DNS records',
                    category: 'domains'
                },
                {
                    name: 'Subdomain Enumeration',
                    command: 'subfinder -d example.com\namass enum -d example.com',
                    description: 'Find subdomains',
                    category: 'domains'
                },
                {
                    name: 'Reverse IP Lookup',
                    command: 'curl "https://api.hackertarget.com/reverseiplookup/?q=1.2.3.4"',
                    description: 'Find domains on same IP',
                    category: 'domains'
                },
                {
                    name: 'SSL/TLS Certificate',
                    command: 'curl "https://crt.sh/?q=%.example.com&output=json"',
                    description: 'Find domains via certificate transparency',
                    category: 'domains'
                },
                {
                    name: 'ASN Lookup',
                    command: 'whois -h whois.cymru.com " -v 1.2.3.4"',
                    description: 'Find ASN for IP address',
                    category: 'domains'
                },
                {
                    name: 'Historical DNS',
                    command: 'curl "https://securitytrails.com/domain/example.com/history/a"',
                    description: 'View historical DNS records',
                    category: 'domains'
                }
            ]
        },
        {
            title: 'Image & Metadata OSINT',
            description: 'Extract intelligence from images',
            icon: <ImageIcon className="w-5 h-5" />,
            commands: [
                {
                    name: 'Reverse Image Search',
                    command: 'Google Images: images.google.com\nTinEye: tineye.com',
                    description: 'Find image sources and usage',
                    category: 'images'
                },
                {
                    name: 'EXIF Data',
                    command: 'exiftool image.jpg',
                    description: 'Extract image metadata',
                    category: 'images'
                },
                {
                    name: 'GPS Coordinates',
                    command: 'exiftool -gps* image.jpg',
                    description: 'Extract GPS data from images',
                    category: 'images'
                },
                {
                    name: 'Geolocation',
                    command: 'curl "https://maps.googleapis.com/maps/api/geocode/json?latlng=40.7128,-74.0060"',
                    description: 'Convert GPS to address',
                    category: 'images'
                },
                {
                    name: 'Facial Recognition',
                    command: 'PimEyes: pimeyes.com\nFaceCheck: facecheck.id',
                    description: 'Find other images of same person',
                    category: 'images'
                }
            ]
        },
        {
            title: 'People & Username OSINT',
            description: 'Investigate individuals and usernames',
            icon: <Users className="w-5 h-5" />,
            commands: [
                {
                    name: 'Username Search',
                    command: 'https://namechk.com\nhttps://knowem.com',
                    description: 'Check username across platforms',
                    category: 'people'
                },
                {
                    name: 'Email Search',
                    command: 'https://hunter.io\nhttps://phonebook.cz',
                    description: 'Find email addresses',
                    category: 'people'
                },
                {
                    name: 'Phone Number Lookup',
                    command: 'https://truecaller.com\nhttps://phoneinfoga.com',
                    description: 'Investigate phone numbers',
                    category: 'people'
                },
                {
                    name: 'Voter Records',
                    command: 'site:voterrecords.com "John Doe"',
                    description: 'Search public voter records',
                    category: 'people'
                },
                {
                    name: 'Court Records',
                    command: 'site:*.gov "court records" "John Doe"',
                    description: 'Find court documents',
                    category: 'people'
                },
                {
                    name: 'LinkedIn Scraping',
                    command: 'linkedin-scraper -u "John Doe" -c "Company Name"',
                    description: 'Scrape LinkedIn profiles',
                    category: 'people'
                }
            ]
        },
        {
            title: 'Data Breach Intelligence',
            description: 'Check for compromised credentials',
            icon: <Database className="w-5 h-5" />,
            commands: [
                {
                    name: 'HaveIBeenPwned',
                    command: 'curl "https://haveibeenpwned.com/api/v3/breachedaccount/email@example.com"',
                    description: 'Check email in breaches',
                    category: 'data-breaches'
                },
                {
                    name: 'DeHashed',
                    command: 'https://dehashed.com',
                    description: 'Search breach database',
                    category: 'data-breaches'
                },
                {
                    name: 'LeakCheck',
                    command: 'https://leakcheck.io',
                    description: 'Check for leaked data',
                    category: 'data-breaches'
                },
                {
                    name: 'Breach Directory',
                    command: 'https://breachdirectory.org',
                    description: 'Search multiple breach databases',
                    category: 'data-breaches'
                },
                {
                    name: 'IntelX',
                    command: 'https://intelx.io',
                    description: 'Search dark web and pastes',
                    category: 'data-breaches'
                }
            ]
        },
        {
            title: 'OSINT Tools & Frameworks',
            description: 'Essential OSINT tools and commands',
            icon: <Shield className="w-5 h-5" />,
            commands: [
                {
                    name: 'theHarvester',
                    command: 'theHarvester -d example.com -b all',
                    description: 'Email and subdomain harvesting',
                    category: 'tools'
                },
                {
                    name: 'Recon-ng',
                    command: 'recon-ng\nworkspace create example\nmodules load recon/domains-hosts/hackertarget',
                    description: 'Automated reconnaissance framework',
                    category: 'tools'
                },
                {
                    name: 'Maltego',
                    command: 'maltego',
                    description: 'Link analysis and data mining',
                    category: 'tools'
                },
                {
                    name: 'SpiderFoot',
                    command: 'spiderfoot -s example.com',
                    description: 'Automated OSINT collection',
                    category: 'tools'
                },
                {
                    name: 'Shodan',
                    command: 'shodan search "apache" country:"US"',
                    description: 'Search internet-connected devices',
                    category: 'tools'
                },
                {
                    name: 'Censys',
                    command: 'censys search "example.com"',
                    description: 'Internet-wide scanning',
                    category: 'tools'
                },
                {
                    name: 'FOCA',
                    command: 'foca',
                    description: 'Metadata extraction and analysis',
                    category: 'tools'
                },
                {
                    name: 'Metagoofil',
                    command: 'metagoofil -d example.com -t pdf,doc -l 200',
                    description: 'Extract metadata from public documents',
                    category: 'tools'
                }
            ]
        }
    ];

    const copyToClipboard = async (command: string) => {
        await navigator.clipboard.writeText(command);
        setCopiedCommand(command);
        setTimeout(() => setCopiedCommand(null), 2000);
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'search-engines': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
            case 'social-media': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
            case 'domains': return 'text-green-400 bg-green-500/10 border-green-500/20';
            case 'images': return 'text-pink-400 bg-pink-500/10 border-pink-500/20';
            case 'people': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
            case 'data-breaches': return 'text-red-400 bg-red-500/10 border-red-500/20';
            case 'tools': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
        }
    };

    const categories = [
        { value: 'all', label: 'All' },
        { value: 'search-engines', label: 'Search' },
        { value: 'social-media', label: 'Social' },
        { value: 'domains', label: 'Domains' },
        { value: 'images', label: 'Images' },
        { value: 'people', label: 'People' },
        { value: 'data-breaches', label: 'Breaches' },
        { value: 'tools', label: 'Tools' }
    ];

    const filteredSections = sections
        .map(section => ({
            ...section,
            commands: section.commands.filter(cmd => {
                const matchesSearch = cmd.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                    cmd.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                    cmd.command.toLowerCase().includes(debouncedSearch.toLowerCase());
                const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
                return matchesSearch && matchesCategory;
            })
        }))
        .filter(section => section.commands.length > 0);

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5">
                            <Eye className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-400">OSINT</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            OSINT <span className="text-orange-500">Cheatsheet</span>
                        </h1>

                        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                            Open-Source Intelligence gathering techniques and tools for reconnaissance
                        </p>

                        {/* Category Filter */}
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => setSelectedCategory(cat.value as CategoryType)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                        selectedCategory === cat.value
                                            ? 'bg-orange-500 text-white'
                                            : 'border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search techniques..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="space-y-8">
                        {filteredSections.map((section, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                                <div className="flex items-start gap-3 mb-6">
                                    <div className="text-orange-500 shrink-0 mt-1">{section.icon}</div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white mb-2">{section.title}</h2>
                                        <p className="text-sm text-gray-400">{section.description}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {section.commands.map((cmd, cmdIdx) => (
                                        <div
                                            key={cmdIdx}
                                            className="group rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-orange-500/30 transition-all p-4"
                                        >
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="font-medium text-white">{cmd.name}</h3>
                                                        <span className={`text-xs px-2 py-0.5 rounded border ${getCategoryColor(cmd.category)}`}>
                                                            {cmd.category.replace('-', ' ')}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-400">{cmd.description}</p>
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(cmd.command)}
                                                    className="shrink-0 p-2 rounded-lg border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all"
                                                    title="Copy to clipboard"
                                                >
                                                    {copiedCommand === cmd.command ? (
                                                        <Check className="w-4 h-4 text-green-400" />
                                                    ) : (
                                                        <Copy className="w-4 h-4 text-gray-400 group-hover:text-orange-400" />
                                                    )}
                                                </button>
                                            </div>

                                            <div className="relative">
                                                <pre className="text-sm text-gray-300 bg-black/40 border border-white/10 rounded-lg p-3 overflow-x-auto">
                                                    <code>{cmd.command}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Legal Notice */}
                    <div className="mt-12 p-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-yellow-400 font-medium mb-2">Legal & Ethical Notice</p>
                                <p className="text-sm text-gray-400 mb-3">
                                    Always respect privacy laws and obtain proper authorization before conducting OSINT investigations. 
                                    Only use these techniques for legal purposes such as security research, penetration testing, 
                                    threat intelligence, or authorized investigations.
                                </p>
                                <ul className="text-sm text-gray-400 space-y-1">
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-3 h-3" />
                                        <a href="https://osintframework.com/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">
                                            OSINT Framework - Comprehensive tool directory
                                        </a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-3 h-3" />
                                        <a href="https://inteltechniques.com/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">
                                            IntelTechniques - OSINT methodology
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default OSINTCheatsheet;
