// app/tools/subfinder/page.tsx
"use client"

import React, { useState } from 'react';
import {
    Search,
    Globe,
    Download,
    Copy,
    ExternalLink,
    Shield,
    AlertCircle,
    CheckCircle,
    Loader2,
    RefreshCw,
    Filter,
    Eye,
    Clock
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface SubdomainResult {
    name_value: string;
    min_cert_id?: number;
    id?: number;
    min_entry_timestamp: string;
    not_before: string;
    not_after: string;
    ca_name?: string;
}

interface ProcessedSubdomain {
    subdomain: string;
    firstSeen: string;
    lastSeen: string;
    certificateId: number;
    issuer: string;
}

const SubfinderPage = () => {
    const [domain, setDomain] = useState('');
    const [results, setResults] = useState<ProcessedSubdomain[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [totalResults, setTotalResults] = useState(0);
    const [searchTime, setSearchTime] = useState(0);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState<'subdomain' | 'firstSeen' | 'lastSeen'>('subdomain');

    const validateDomain = (domain: string): boolean => {
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/;
        return domainRegex.test(domain);
    };

    const searchSubdomains = async () => {
        if (!domain.trim()) {
            setError('Please enter a domain name');
            return;
        }

        if (!validateDomain(domain.trim())) {
            setError('Please enter a valid domain name');
            return;
        }

        setLoading(true);
        setError('');
        setResults([]);

        const startTime = Date.now();

        try {
            const response = await fetch(`https://crt.sh/?q=${encodeURIComponent(domain.trim())}&output=json`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: SubdomainResult[] = await response.json();

            if (!Array.isArray(data) || data.length === 0) {
                setError('No subdomains found for this domain');
                setLoading(false);
                return;
            }

            // Process and deduplicate results
            const subdomainMap = new Map<string, ProcessedSubdomain>();

            data.forEach((cert) => {
                const subdomains = cert.name_value.split('\n');

                subdomains.forEach((sub) => {
                    const cleanSub = sub.trim().toLowerCase();
                    if (cleanSub && !cleanSub.startsWith('*')) {
                        const existing = subdomainMap.get(cleanSub);
                        const currentDate = new Date(cert.not_before);

                        // Use the certificate ID from the API response
                        const certificateId = cert.min_cert_id || cert.id || 0;

                        if (!existing || new Date(existing.firstSeen) > currentDate) {
                            subdomainMap.set(cleanSub, {
                                subdomain: cleanSub,
                                firstSeen: cert.not_before,
                                lastSeen: cert.not_after,
                                certificateId: certificateId,
                                issuer: cert.ca_name || 'Unknown CA'
                            });
                        }
                    }
                });
            });

            const processedResults = Array.from(subdomainMap.values()).sort((a, b) =>
                a.subdomain.localeCompare(b.subdomain)
            );

            setResults(processedResults);
            setTotalResults(processedResults.length);
            setSearchTime(Date.now() - startTime);

        } catch (err) {
            console.error('Error fetching subdomains:', err);
            setError('Failed to fetch subdomains. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            searchSubdomains();
        }
    };

    const filteredResults = results.filter(result =>
        result.subdomain.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedResults = [...filteredResults].sort((a, b) => {
        switch (sortBy) {
            case 'firstSeen':
                return new Date(b.firstSeen).getTime() - new Date(a.firstSeen).getTime();
            case 'lastSeen':
                return new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime();
            default:
                return a.subdomain.localeCompare(b.subdomain);
        }
    });

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const copyAllSubdomains = () => {
        const subdomainList = sortedResults.map(r => r.subdomain).join('\n');
        copyToClipboard(subdomainList);
    };

    const downloadResults = () => {
        const csvContent = [
            'Subdomain,First Seen,Last Seen,Certificate ID,Issuer',
            ...sortedResults.map(r =>
                `${r.subdomain},${r.firstSeen},${r.lastSeen},${r.certificateId},"${r.issuer}"`
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${domain}_subdomains.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="relative overflow-hidden mb-16">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>

                        <div className="relative text-center py-16">
                            <div className="flex items-center justify-center space-x-4 mb-6">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                                        <Globe className="h-8 w-8 text-black" />
                                    </div>
                                    <div className="absolute inset-0 bg-orange-500/20 rounded-xl blur-md -z-10"></div>
                                </div>
                                <div>
                                    <h1 className="text-5xl md:text-6xl font-bold text-white">Subdomain Finder</h1>
                                    <div className="flex items-center justify-center space-x-2 mt-2">
                                        <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm px-3 py-1 rounded-full">Certificate Transparency</span>
                                        <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-sm px-3 py-1 rounded-full">Real-time</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                                Discover hidden subdomains using Certificate Transparency logs. Leverage public SSL/TLS certificate records
                                to expand your attack surface analysis and security assessments.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
                                <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-4">
                                    <div className="text-orange-400 font-bold text-2xl mb-1">150M+</div>
                                    <div className="text-gray-400 text-sm">Certificates Indexed</div>
                                </div>
                                <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-4">
                                    <div className="text-orange-400 font-bold text-2xl mb-1">Real-time</div>
                                    <div className="text-gray-400 text-sm">CT Log Updates</div>
                                </div>
                                <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-4">
                                    <div className="text-orange-400 font-bold text-2xl mb-1">100%</div>
                                    <div className="text-gray-400 text-sm">Free & Open Source</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Search Section */}
                    <div className="max-w-5xl mx-auto mb-16">
                        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">Start Your Reconnaissance</h2>
                                <p className="text-gray-400">Enter a target domain to discover its subdomain infrastructure</p>
                            </div>

                            <div className="space-y-6">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                                    <div className="relative">
                                        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-hover:text-orange-400 transition-colors" />
                                        <input
                                            type="text"
                                            value={domain}
                                            onChange={(e) => setDomain(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Enter target domain (e.g., example.com, google.com, github.com)"
                                            className="w-full pl-14 pr-6 py-5 bg-gray-800/90 border border-gray-600 rounded-xl text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 outline-none text-lg font-mono"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="flex items-center space-x-3 text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl p-4 backdrop-blur-sm">
                                        <AlertCircle className="h-6 w-6 flex-shrink-0" />
                                        <span className="font-medium">{error}</span>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={searchSubdomains}
                                        disabled={loading || !domain.trim()}
                                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center space-x-3 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-6 w-6 animate-spin" />
                                                <span className="text-lg">Scanning Certificate Logs...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Search className="h-6 w-6" />
                                                <span className="text-lg">Launch Subdomain Scan</span>
                                            </>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => { setDomain(''); setResults([]); setError(''); }}
                                        className="px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <RefreshCw className="h-5 w-5" />
                                        <span>Clear</span>
                                    </button>
                                </div>

                                <div className="text-center">
                                    <div className="text-sm text-gray-500 mb-2">Popular targets to try:</div>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {['google.com', 'github.com', 'microsoft.com', 'amazon.com'].map((example) => (
                                            <button
                                                key={example}
                                                onClick={() => setDomain(example)}
                                                className="px-3 py-1.5 bg-gray-800/50 hover:bg-orange-500/20 border border-gray-700 hover:border-orange-500/50 text-gray-400 hover:text-orange-400 rounded-lg text-sm transition-all duration-200 font-mono"
                                            >
                                                {example}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    {(results.length > 0 || loading) && (
                        <div className="max-w-7xl mx-auto">
                            {/* Results Header */}
                            {results.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                                            <div className="flex items-center space-x-2">
                                                <CheckCircle className="h-5 w-5 text-green-400" />
                                                <span className="text-lg font-semibold text-white">
                          Found {totalResults} subdomains
                        </span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <Clock className="h-4 w-4" />
                                                <span className="text-sm">{searchTime}ms</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={copyAllSubdomains}
                                                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200"
                                            >
                                                <Copy className="h-4 w-4" />
                                                <span>Copy All</span>
                                            </button>
                                            <button
                                                onClick={downloadResults}
                                                className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-all duration-200"
                                            >
                                                <Download className="h-4 w-4" />
                                                <span>Download CSV</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Filters */}
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                                        <div className="relative flex-1 max-w-md">
                                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <input
                                                type="text"
                                                value={filter}
                                                onChange={(e) => setFilter(e.target.value)}
                                                placeholder="Filter subdomains..."
                                                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                            />
                                        </div>

                                        <select
                                            value={sortBy}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
                                            className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                        >
                                            <option value="subdomain">Sort by Subdomain</option>
                                            <option value="firstSeen">Sort by First Seen</option>
                                            <option value="lastSeen">Sort by Last Seen</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Results Table */}
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
                                {loading ? (
                                    <div className="p-12 text-center">
                                        <Loader2 className="h-8 w-8 animate-spin text-orange-400 mx-auto mb-4" />
                                        <p className="text-gray-300">Searching for subdomains...</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-800/50">
                                            <tr>
                                                <th className="text-left py-4 px-6 text-orange-400 font-semibold">Subdomain</th>
                                                <th className="text-left py-4 px-6 text-orange-400 font-semibold">First Seen</th>
                                                <th className="text-left py-4 px-6 text-orange-400 font-semibold">Last Seen</th>
                                                <th className="text-left py-4 px-6 text-orange-400 font-semibold">Certificate ID</th>
                                                <th className="text-left py-4 px-6 text-orange-400 font-semibold">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {sortedResults.map((result, index) => (
                                                <tr key={index} className="border-t border-gray-800 hover:bg-gray-800/30 transition-colors">
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center space-x-2">
                                                            <Globe className="h-4 w-4 text-orange-400" />
                                                            <span className="text-white font-mono">{result.subdomain}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-300">{formatDate(result.firstSeen)}</td>
                                                    <td className="py-4 px-6 text-gray-300">{formatDate(result.lastSeen)}</td>
                                                    <td className="py-4 px-6">
                                                        {result.certificateId > 0 ? (
                                                            <span className="text-orange-400 font-mono">{result.certificateId}</span>
                                                        ) : (
                                                            <span className="text-gray-500 font-mono">N/A</span>
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => copyToClipboard(result.subdomain)}
                                                                className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                                                                title="Copy subdomain"
                                                            >
                                                                <Copy className="h-4 w-4" />
                                                            </button>
                                                            <a
                                                                href={`https://${result.subdomain}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-orange-400 transition-colors"
                                                                title="Visit subdomain"
                                                            >
                                                                <ExternalLink className="h-4 w-4" />
                                                            </a>
                                                            {result.certificateId > 0 ? (
                                                                <a
                                                                    href={`https://crt.sh/?id=${result.certificateId}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-orange-400 transition-colors"
                                                                    title="View certificate"
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </a>
                                                            ) : (
                                                                <button
                                                                    disabled
                                                                    className="p-1 rounded text-gray-600 cursor-not-allowed"
                                                                    title="Certificate ID not available"
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            {/* Results Summary */}
                            {sortedResults.length > 0 && (
                                <div className="mt-6 text-center text-gray-400">
                                    <p>
                                        Showing {sortedResults.length} of {totalResults} subdomains
                                        {filter && ` (filtered by "${filter}")`}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Enhanced Information & Documentation Section */}
                    <div className="max-w-7xl mx-auto mt-20 space-y-8">
                        {/* Main Info Card */}
                        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm">
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center space-x-3 mb-4">
                                    <Shield className="h-8 w-8 text-orange-400" />
                                    <h3 className="text-3xl font-bold text-white">Professional Subdomain Intelligence</h3>
                                </div>
                                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                                    Leverage Certificate Transparency for comprehensive subdomain discovery and security reconnaissance
                                </p>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* How It Works */}
                                <div className="space-y-6">
                                    <h4 className="text-xl font-semibold text-orange-400 flex items-center">
                                        <Globe className="h-5 w-5 mr-2" />
                                        How Certificate Transparency Works
                                    </h4>
                                    <div className="space-y-4 text-gray-300">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm mt-0.5">1</div>
                                            <div>
                                                <div className="font-medium text-white">Certificate Issuance</div>
                                                <div className="text-sm">When SSL certificates are issued, they&apos;re logged in public CT logs</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm mt-0.5">2</div>
                                            <div>
                                                <div className="font-medium text-white">Data Aggregation</div>
                                                <div className="text-sm">CT logs are monitored and indexed by services like crt.sh</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm mt-0.5">3</div>
                                            <div>
                                                <div className="font-medium text-white">Subdomain Discovery</div>
                                                <div className="text-sm">Certificate Subject Alternative Names reveal subdomains</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm mt-0.5">4</div>
                                            <div>
                                                <div className="font-medium text-white">Real-time Results</div>
                                                <div className="text-sm">Our tool queries these logs to provide instant subdomain intelligence</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Features & Capabilities */}
                                <div className="space-y-6">
                                    <h4 className="text-xl font-semibold text-orange-400 flex items-center">
                                        <CheckCircle className="h-5 w-5 mr-2" />
                                        Advanced Features & Capabilities
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <RefreshCw className="h-4 w-4 text-orange-400" />
                                                <span className="font-medium text-white text-sm">Real-time Scanning</span>
                                            </div>
                                            <p className="text-xs text-gray-400">Live CT log monitoring with instant results</p>
                                        </div>
                                        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Download className="h-4 w-4 text-orange-400" />
                                                <span className="font-medium text-white text-sm">Data Export</span>
                                            </div>
                                            <p className="text-xs text-gray-400">CSV export with comprehensive metadata</p>
                                        </div>
                                        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Filter className="h-4 w-4 text-orange-400" />
                                                <span className="font-medium text-white text-sm">Smart Filtering</span>
                                            </div>
                                            <p className="text-xs text-gray-400">Advanced search and sorting capabilities</p>
                                        </div>
                                        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Eye className="h-4 w-4 text-orange-400" />
                                                <span className="font-medium text-white text-sm">Certificate Details</span>
                                            </div>
                                            <p className="text-xs text-gray-400">Direct links to certificate information</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Use Cases & Applications */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 group">
                                <div className="text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                                    <Shield className="h-8 w-8" />
                                </div>
                                <h4 className="text-lg font-semibold text-white mb-3">Security Assessment</h4>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                    Discover attack surface and potential entry points during security assessments and penetration testing engagements.
                                </p>
                                <ul className="text-xs text-gray-500 space-y-1">
                                    <li>• Asset discovery and enumeration</li>
                                    <li>• Attack surface mapping</li>
                                    <li>• Security posture evaluation</li>
                                </ul>
                            </div>

                            <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 group">
                                <div className="text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                                    <Globe className="h-8 w-8" />
                                </div>
                                <h4 className="text-lg font-semibold text-white mb-3">Infrastructure Mapping</h4>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                    Map organizational infrastructure and understand the digital footprint of target domains.
                                </p>
                                <ul className="text-xs text-gray-500 space-y-1">
                                    <li>• Digital asset inventory</li>
                                    <li>• Infrastructure reconnaissance</li>
                                    <li>• Technology stack analysis</li>
                                </ul>
                            </div>

                            <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 group">
                                <div className="text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                                    <Eye className="h-8 w-8" />
                                </div>
                                <h4 className="text-lg font-semibold text-white mb-3">Threat Intelligence</h4>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                    Monitor domain changes and certificate issuance patterns for threat intelligence and brand protection.
                                </p>
                                <ul className="text-xs text-gray-500 space-y-1">
                                    <li>• Brand monitoring</li>
                                    <li>• Threat hunting</li>
                                    <li>• Domain intelligence</li>
                                </ul>
                            </div>
                        </div>

                        {/* Technical Details & Limitations */}
                        <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-8">
                            <div className="grid lg:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                        <AlertCircle className="h-5 w-5 text-orange-400 mr-2" />
                                        Important Considerations
                                    </h4>
                                    <div className="space-y-3 text-sm text-gray-300">
                                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                                            <div className="font-medium text-amber-400 mb-1">Certificate Dependency</div>
                                            <div className="text-amber-200">Only discovers subdomains with SSL/TLS certificates. Some subdomains may not appear.</div>
                                        </div>
                                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                                            <div className="font-medium text-blue-400 mb-1">Historical Data</div>
                                            <div className="text-blue-200">Results include both active and inactive subdomains from certificate history.</div>
                                        </div>
                                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                                            <div className="font-medium text-purple-400 mb-1">Rate Limiting</div>
                                            <div className="text-purple-200">CT log queries may be rate-limited during high-traffic periods.</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                        <Globe className="h-5 w-5 text-orange-400 mr-2" />
                                        Data Sources & API
                                    </h4>
                                    <div className="space-y-4 text-sm text-gray-300">
                                        <div>
                                            <div className="font-medium text-white mb-2">Certificate Transparency Logs</div>
                                            <div className="text-gray-400">Powered by crt.sh, which monitors major CT logs including Google, Cloudflare, and DigiCert logs.</div>
                                        </div>
                                        <div>
                                            <div className="font-medium text-white mb-2">Update Frequency</div>
                                            <div className="text-gray-400">CT logs are updated in real-time as new certificates are issued and logged.</div>
                                        </div>
                                        <div>
                                            <div className="font-medium text-white mb-2">Coverage</div>
                                            <div className="text-gray-400">Includes certificates from all major Certificate Authorities and public CT logs.</div>
                                        </div>
                                        <div className="pt-4 border-t border-gray-700">
                                            <a
                                                href="https://crt.sh"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors"
                                            >
                                                <span>Learn more about crt.sh</span>
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer CTA */}
                        <div className="text-center bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-8">
                            <h4 className="text-2xl font-bold text-white mb-4">Ready to explore more security tools?</h4>
                            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                                Discover our complete suite of cybersecurity tools for comprehensive security assessment and reconnaissance.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/tools"
                                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    Explore All Tools
                                </a>
                                <a
                                    href="/tools/ssl-scan"
                                    className="border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                                >
                                    Try SSL Scanner
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubfinderPage;