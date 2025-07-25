// app/tools/subfinder/page.tsx
"use client"

import React, { useState } from 'react';
import {
    Search,
    Globe,
    Download,
    Copy,
    ExternalLink,
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
            setError('Please enter a domain name.');
            return;
        }

        if (!validateDomain(domain.trim())) {
            setError('The domain name entered is not valid. Please try again.');
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
                setError('No subdomains found. This may be due to no public certificates being issued for this domain.');
                setLoading(false);
                return;
            }

            const subdomainMap = new Map<string, ProcessedSubdomain>();
            data.forEach((cert) => {
                const subdomains = cert.name_value.split('\n');
                subdomains.forEach((sub) => {
                    const cleanSub = sub.trim().toLowerCase();
                    if (cleanSub && !cleanSub.startsWith('*.')) {
                        const existing = subdomainMap.get(cleanSub);
                        const currentDate = new Date(cert.not_before);
                        const certificateId = cert.min_cert_id || cert.id || 0;

                        if (!existing || new Date(existing.firstSeen) > currentDate) {
                            subdomainMap.set(cleanSub, {
                                subdomain: cleanSub,
                                firstSeen: cert.not_before,
                                lastSeen: cert.not_after,
                                certificateId: certificateId,
                                issuer: cert.ca_name || 'N/A'
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
            setError('An unexpected error occurred while fetching subdomains. The service might be temporarily unavailable.');
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
        if (sortBy === 'firstSeen') return new Date(b.firstSeen).getTime() - new Date(a.firstSeen).getTime();
        if (sortBy === 'lastSeen') return new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime();
        return a.subdomain.localeCompare(b.subdomain);
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

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${domain}_subdomains.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    type SortByType = 'subdomain' | 'firstSeen' | 'lastSeen';

    // Main component return
    return (
        <div className="min-h-screen bg-black text-slate-300">
            <Navbar />

            <main className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Hero Section */}
                    <section className="text-center mb-20">
                        <div className="flex items-center justify-center space-x-4 mb-5">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/10">
                                <Globe className="h-8 w-8 text-orange-400" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                                Subdomain Finder
                            </h1>
                        </div>
                        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                            Discover hidden subdomains using Certificate Transparency logs to expand your attack surface analysis and security assessments.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 text-sm">
                            <span className="bg-orange-500/10 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full">Certificate Transparency</span>
                            <span className="bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1 rounded-full">Real-time Data</span>
                            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full">Free & Open Source</span>
                        </div>
                    </section>

                    {/* Search Section */}
                    <section className="max-w-4xl mx-auto mb-16">
                        <div className="bg-gray-950/60 border border-gray-800/80 rounded-2xl p-8 shadow-2xl shadow-black/20 backdrop-blur-sm">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter target domain, e.g., google.com"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-gray-700/60 rounded-xl text-slate-100 placeholder:text-gray-500 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 outline-none text-base backdrop-blur-sm"
                                    disabled={loading}
                                />
                            </div>

                            {error && (
                                <div className="flex items-center space-x-3 text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-4 mt-6 backdrop-blur-sm">
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    <span className="text-sm font-medium">{error}</span>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                <button
                                    onClick={searchSubdomains}
                                    disabled={loading || !domain.trim()}
                                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 text-black disabled:text-gray-400 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 disabled:shadow-none transform hover:scale-105 disabled:hover:scale-100"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            <span>Scanning...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Search className="h-5 w-5" />
                                            <span>Find Subdomains</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => { setDomain(''); setResults([]); setError(''); }}
                                    className="px-6 py-4 bg-gray-800/80 hover:bg-gray-700/80 text-slate-200 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-700/50 hover:border-gray-600/50"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                    <span>Clear</span>
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Results Section */}
                    {(results.length > 0 || loading) && (
                        <section>
                            {/* Results Header */}
                            {results.length > 0 && !loading && (
                                <div className="mb-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex items-center space-x-3">
                                            <CheckCircle className="h-6 w-6 text-green-400" />
                                            <span className="text-lg font-semibold text-slate-100">
                                                {totalResults} {totalResults === 1 ? 'subdomain' : 'subdomains'} found
                                            </span>
                                            <div className="flex items-center space-x-1.5 text-gray-500">
                                                <Clock className="h-4 w-4" />
                                                <span className="text-sm">{(searchTime / 1000).toFixed(2)}s</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={copyAllSubdomains}
                                                className="flex items-center space-x-2 px-4 py-2 bg-gray-800/80 hover:bg-gray-700/80 text-slate-200 rounded-lg transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50"
                                            >
                                                <Copy className="h-4 w-4" />
                                                <span>Copy List</span>
                                            </button>
                                            <button
                                                onClick={downloadResults}
                                                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:scale-105"
                                            >
                                                <Download className="h-4 w-4" />
                                                <span>Download CSV</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Filters */}
                                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                                        <div className="relative w-full sm:max-w-xs">
                                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                            <input
                                                type="text"
                                                value={filter}
                                                onChange={(e) => setFilter(e.target.value)}
                                                placeholder="Filter results..."
                                                className="w-full pl-9 pr-4 py-2 bg-gray-900/80 border border-gray-700/60 rounded-lg text-slate-200 placeholder:text-gray-500 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all duration-200"
                                            />
                                        </div>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as SortByType)}
                                            className="w-full sm:w-auto px-4 py-2 bg-gray-900/80 border border-gray-700/60 rounded-lg text-slate-200 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all duration-200"
                                        >
                                            <option value="subdomain">Sort by Name</option>
                                            <option value="firstSeen">Sort by First Seen</option>
                                            <option value="lastSeen">Sort by Last Seen</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Results Table */}
                            <div className="bg-gray-950/70 border border-gray-800/80 rounded-xl overflow-hidden backdrop-blur-sm shadow-xl">
                                {loading ? (
                                    <div className="p-16 text-center">
                                        <Loader2 className="h-8 w-8 animate-spin text-orange-400 mx-auto mb-4" />
                                        <p className="text-gray-400">Querying Certificate Transparency Logs...</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead className="bg-black/50">
                                            <tr>
                                                {['Subdomain', 'First Seen', 'Last Seen', 'Certificate ID', 'Actions'].map(h => (
                                                    <th key={h} className="text-left py-4 px-4 text-orange-400 font-semibold tracking-wide border-b border-gray-800/80">{h}</th>
                                                ))}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {sortedResults.map((result, index) => (
                                                <tr key={index} className="border-b border-gray-900/50 hover:bg-gray-900/30 transition-all duration-200">
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center space-x-2.5">
                                                            <Globe className="h-4 w-4 text-orange-400 flex-shrink-0" />
                                                            <span className="font-mono text-slate-200">{result.subdomain}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{formatDate(result.firstSeen)}</td>
                                                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{formatDate(result.lastSeen)}</td>
                                                    <td className="py-3 px-4 font-mono text-slate-400">
                                                        {result.certificateId > 0 ? result.certificateId : <span className="text-gray-600">N/A</span>}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center space-x-1">
                                                            <button
                                                                onClick={() => copyToClipboard(result.subdomain)}
                                                                title="Copy subdomain"
                                                                className="p-2 text-gray-400 hover:text-orange-400 hover:bg-gray-800/60 rounded-md transition-all duration-200"
                                                            >
                                                                <Copy className="h-4 w-4" />
                                                            </button>
                                                            <a
                                                                href={`https://${result.subdomain}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title="Visit subdomain"
                                                                className="p-2 text-gray-400 hover:text-orange-400 hover:bg-gray-800/60 rounded-md transition-all duration-200"
                                                            >
                                                                <ExternalLink className="h-4 w-4" />
                                                            </a>
                                                            {result.certificateId > 0 ? (
                                                                <a
                                                                    href={`https://crt.sh/?id=${result.certificateId}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    title="View certificate on crt.sh"
                                                                    className="p-2 text-gray-400 hover:text-orange-400 hover:bg-gray-800/60 rounded-md transition-all duration-200"
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </a>
                                                            ) : (
                                                                <button
                                                                    disabled
                                                                    title="Certificate ID not available"
                                                                    className="p-2 text-gray-700 cursor-not-allowed"
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
                            {sortedResults.length > 0 && (
                                <div className="mt-4 text-center text-gray-500 text-sm">
                                    <p>Showing {sortedResults.length} of {totalResults} subdomains {filter && `(filtered)`}</p>
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SubfinderPage;