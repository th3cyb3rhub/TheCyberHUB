"use client"

import React, { useState } from 'react';
import {
    Search,
    Lock,
    Loader2,
    RefreshCw,
    AlertTriangle,
    ShieldCheck,
    ShieldAlert,
    ShieldOff,
    Info,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

interface HeaderAnalysis {
    title: string;
    score: 'good' | 'warning' | 'bad';
    description: string;
}

interface OtherHeader {
    name: string;
    value: string | string[] | undefined;
}

interface ScanResult {
    targetUrl: string;
    analysis: HeaderAnalysis[];
    otherHeaders: OtherHeader[];
}

// --- Helper Components ---
const ScoreIcon = ({ score }: { score: 'good' | 'warning' | 'bad' }) => {
    switch (score) {
        case 'good':
            return <ShieldCheck className="h-6 w-6 text-green-400 flex-shrink-0" />;
        case 'warning':
            return <ShieldAlert className="h-6 w-6 text-yellow-400 flex-shrink-0" />;
        case 'bad':
            return <ShieldOff className="h-6 w-6 text-red-400 flex-shrink-0" />;
        default:
            return <Info className="h-6 w-6 text-gray-400 flex-shrink-0" />;
    }
};

const scoreColorClasses = {
    good: 'border-green-500/30 bg-green-900/20',
    warning: 'border-yellow-500/30 bg-yellow-900/20',
    bad: 'border-red-500/30 bg-red-900/20',
};

// --- Main Component ---
const HeaderAnalyzerPage = () => {
    // State management
    const [url, setUrl] = useState('');
    const [results, setResults] = useState<ScanResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showOtherHeaders, setShowOtherHeaders] = useState(false);

    // API endpoint for the httpHeaderAnalyzer Lambda function - using environment variable for security
    const LAMBDA_URL = process.env.NEXT_PUBLIC_HEADER_ANALYZER_API_URL || '';

    const handleScan = async () => {
        if (!url.trim()) {
            setError('Please enter a URL to analyze.');
            return;
        }
        // A simple regex to validate it looks like a domain/URL
        const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)*$/i;
        if (!urlRegex.test(url.trim())) {
            setError('Please enter a valid URL or domain name.');
            return;
        }

        setLoading(true);
        setError('');
        setResults(null);

        try {
            const response = await fetch(LAMBDA_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url.trim() }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || errData.details || `Request failed with status ${response.status}`);
            }

            const data: ScanResult = await response.json();
            setResults(data);

        } catch (err) {
            console.error('Scan error:', err);
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : 'An unexpected error occurred. The service might be down or the URL is unreachable.';

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setUrl('');
        setResults(null);
        setError('');
        setShowOtherHeaders(false);
    };

    return (
        <div className="min-h-screen bg-black text-slate-300">
            <main className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Hero Section */}
                    <section className="text-center mb-16">
                        <div className="flex items-center justify-center space-x-4 mb-5">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10">
                                <Lock className="h-8 w-8 text-blue-400" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                                HTTP Security Header Analyzer
                            </h1>
                        </div>
                        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                            Analyze a website&#39;s HTTP response headers to identify potential security misconfigurations.
                        </p>
                    </section>

                    {/* Scan Input Section */}
                    <section className="max-w-4xl mx-auto mb-16">
                        <div className="bg-gray-950/60 border border-gray-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/20 backdrop-blur-sm">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                                    placeholder="Enter target URL, e.g., https://google.com"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-gray-700/60 rounded-xl text-slate-100 placeholder:text-gray-500 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 outline-none text-base backdrop-blur-sm"
                                    disabled={loading}
                                />
                            </div>

                            {error && (
                                <div className="flex items-center space-x-3 text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-4 mt-6 backdrop-blur-sm">
                                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                                    <span className="text-sm font-medium">{error}</span>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                <button onClick={handleScan} disabled={loading || !url.trim()} className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:shadow-none transform hover:scale-105 disabled:hover:scale-100">
                                    {loading ? (<><Loader2 className="h-5 w-5 animate-spin" /><span>Analyzing...</span></>) : (<><Search className="h-5 w-5" /><span>Analyze Headers</span></>)}
                                </button>
                                <button onClick={handleClear} className="px-6 py-4 bg-gray-800/80 hover:bg-gray-700/80 text-slate-200 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-700/50 hover:border-gray-600/50">
                                    <RefreshCw className="h-4 w-4" /><span>Clear</span>
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Results Section */}
                    {loading && (
                        <div className="p-16 text-center">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
                            <p className="text-gray-400">Fetching and analyzing headers...</p>
                        </div>
                    )}

                    {results && !loading && (
                        <section>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-100 mb-2">Analysis for: <span className="text-blue-400 font-mono">{results.targetUrl}</span></h2>
                                <p className="text-slate-400">Found {results.analysis.length} security headers and {results.otherHeaders.length} other headers.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {results.analysis.map((item, index) => (
                                    <div key={index} className={`border rounded-xl p-5 transition-all duration-300 ${scoreColorClasses[item.score]}`}>
                                        <div className="flex items-start space-x-4">
                                            <ScoreIcon score={item.score} />
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-100">{item.title}</h3>
                                                <p className="text-slate-300 mt-1 text-sm">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Other Headers Section */}
                            <div className="mt-12">
                                <button onClick={() => setShowOtherHeaders(!showOtherHeaders)} className="w-full flex justify-between items-center text-left text-xl font-bold text-slate-200 p-4 bg-gray-900/80 rounded-lg border border-gray-800/80 hover:bg-gray-800/80 transition-colors duration-200">
                                    <span>All Other Headers</span>
                                    {showOtherHeaders ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                                </button>
                                {showOtherHeaders && (
                                    <div className="mt-2 p-4 bg-gray-950/70 border border-gray-800/80 rounded-lg font-mono text-sm text-slate-400 overflow-x-auto">
                                        <pre>
                                            {results.otherHeaders.map(h => `${h.name}: ${h.value}`).join('\n')}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};

export default HeaderAnalyzerPage;
