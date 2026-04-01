// app/tools/subtaker/page.tsx
"use client"

import React, { useState } from 'react';
import {
    Search,
    Globe,
    Copy,
    ExternalLink,
    AlertTriangle,
    Loader2,
    RefreshCw,
    ShieldCheck,
    ShieldAlert
} from 'lucide-react';

// --- Type Definitions for API Response ---
interface Finding {
    subdomain: string;
    vulnerable: boolean;
    service: string;
    cname_record: string;
    reason: string;
}

interface ScanResult {
    target: string;
    scan_mode: string;
    subdomains_checked: number;
    findings: Finding[];
    message?: string;
}

// --- Main Component ---
const SubtakerPage = () => {
    // State management
    const [scanMode, setScanMode] = useState<'discover' | 'manual' | 'single'>('discover');
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState<ScanResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // API endpoint - using environment variable for security
    const LAMBDA_URL = process.env.NEXT_PUBLIC_SUB_TAKEOVER_API_URL || '';

    const handleScan = async () => {
        if (!inputValue.trim()) {
            setError('Please provide an input value.');
            return;
        }

        setLoading(true);
        setError('');
        setResults(null);

        let payload = {};
        const trimmedInput = inputValue.trim();

        // Construct payload based on the selected scan mode
        switch (scanMode) {
            case 'discover':
                payload = { domain: trimmedInput };
                break;
            case 'single':
                payload = { subdomain: trimmedInput };
                break;
            case 'manual':
                const subdomains = trimmedInput.split('\n').map(s => s.trim()).filter(Boolean);
                if (subdomains.length === 0) {
                    setError('Please enter at least one subdomain in the list.');
                    setLoading(false);
                    return;
                }
                // A domain is needed for context in manual mode, we can infer it
                const inferredDomain = subdomains[0].substring(subdomains[0].indexOf('.') + 1);
                payload = { domain: inferredDomain, subdomains: subdomains };
                break;
        }

        try {
            const response = await fetch(LAMBDA_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || `Request failed with status ${response.status}`);
            }

            const data: ScanResult = await response.json();
            setResults(data);

        } catch (err: unknown) {
            console.error('Scan error:', err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred. The service might be down.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setInputValue('');
        setResults(null);
        setError('');
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here for better UX
    };

    // Render helper for the input placeholder text
    const getPlaceholder = () => {
        switch (scanMode) {
            case 'discover': return 'Enter target domain, e.g., tesla.com';
            case 'single': return 'Enter a single subdomain, e.g., shop.tesla.com';
            case 'manual': return 'Enter one subdomain per line...\nir.tesla.com\nengage.tesla.com';
        }
    };

    return (
        <div className="min-h-screen bg-black text-slate-300">
            <main className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Hero Section */}
                    <section className="text-center mb-16">
                        <div className="flex items-center justify-center space-x-4 mb-5">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/10">
                                <ShieldAlert className="h-8 w-8 text-red-400" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                                Subdomain Takeover Scanner
                            </h1>
                        </div>
                        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                            Scan for vulnerable subdomains pointing to de-provisioned cloud services.
                        </p>
                    </section>

                    {/* Scan Input Section */}
                    <section className="max-w-4xl mx-auto mb-16">
                        <div className="bg-gray-950/60 border border-gray-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/20 backdrop-blur-sm">

                            {/* Scan Mode Tabs */}
                            <div className="flex justify-center mb-6 border-b border-gray-800">
                                <button onClick={() => setScanMode('discover')} className={`px-4 py-3 font-semibold transition-colors duration-200 ${scanMode === 'discover' ? 'text-red-400 border-b-2 border-red-400' : 'text-gray-500 hover:text-gray-300'}`}>Domain Discovery</button>
                                <button onClick={() => setScanMode('manual')} className={`px-4 py-3 font-semibold transition-colors duration-200 ${scanMode === 'manual' ? 'text-red-400 border-b-2 border-red-400' : 'text-gray-500 hover:text-gray-300'}`}>Manual List</button>
                                <button onClick={() => setScanMode('single')} className={`px-4 py-3 font-semibold transition-colors duration-200 ${scanMode === 'single' ? 'text-red-400 border-b-2 border-red-400' : 'text-gray-500 hover:text-gray-300'}`}>Single Subdomain</button>
                            </div>

                            {/* Input Area */}
                            <div className="relative">
                                {scanMode === 'manual' ? (
                                    <textarea
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={getPlaceholder()}
                                        className="w-full p-4 bg-gray-900/80 border border-gray-700/60 rounded-xl text-slate-100 placeholder:text-gray-500 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 outline-none text-base backdrop-blur-sm h-32 resize-none"
                                        disabled={loading}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                                        placeholder={getPlaceholder()}
                                        className="w-full pl-4 pr-4 py-4 bg-gray-900/80 border border-gray-700/60 rounded-xl text-slate-100 placeholder:text-gray-500 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 outline-none text-base backdrop-blur-sm"
                                        disabled={loading}
                                    />
                                )}
                            </div>

                            {error && (
                                <div className="flex items-center space-x-3 text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-4 mt-6 backdrop-blur-sm">
                                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                                    <span className="text-sm font-medium">{error}</span>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                <button onClick={handleScan} disabled={loading || !inputValue.trim()} className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 disabled:shadow-none transform hover:scale-105 disabled:hover:scale-100">
                                    {loading ? (<><Loader2 className="h-5 w-5 animate-spin" /><span>Scanning...</span></>) : (<><Search className="h-5 w-5" /><span>Start Scan</span></>)}
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
                            <Loader2 className="h-8 w-8 animate-spin text-red-400 mx-auto mb-4" />
                            <p className="text-gray-400">Contacting scanner... This may take a minute for large domains.</p>
                        </div>
                    )}

                    {results && !loading && (
                        <section>
                            {/* Results Header */}
                            <div className="mb-6 p-6 bg-gray-950/70 border border-gray-800/80 rounded-xl backdrop-blur-sm">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex items-center space-x-3">
                                        {results.findings.length > 0 ? (
                                            <AlertTriangle className="h-7 w-7 text-red-400" />
                                        ) : (
                                            <ShieldCheck className="h-7 w-7 text-green-400" />
                                        )}
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-100">Scan Complete</h2>
                                            <p className="text-sm text-gray-400">{results.scan_mode}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-slate-200 font-semibold">{results.findings.length} Vulnerable</p>
                                        <p className="text-sm text-gray-400">out of {results.subdomains_checked} checked</p>
                                    </div>
                                </div>
                            </div>

                            {/* Findings List */}
                            {results.findings.length > 0 ? (
                                <div className="space-y-4">
                                    {results.findings.map((finding, index) => (
                                        <div key={index} className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 transition-all duration-300 hover:bg-red-900/30">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex-1 mb-3 sm:mb-0">
                                                    <div className="flex items-center space-x-3">
                                                        <Globe className="h-5 w-5 text-red-400" />
                                                        <span className="font-mono text-lg text-red-300">{finding.subdomain}</span>
                                                    </div>
                                                    <p className="text-sm text-red-400/80 mt-1 ml-8">Vulnerable via <span className="font-semibold">{finding.service}</span></p>
                                                </div>
                                                <div className="flex items-center space-x-2 ml-8 sm:ml-0">
                                                    <button onClick={() => copyToClipboard(finding.subdomain)} title="Copy subdomain" aria-label="Copy subdomain" className="p-2 text-gray-400 hover:text-red-300 hover:bg-gray-800/60 rounded-md transition-all duration-200"><Copy className="h-4 w-4" /></button>
                                                    <a href={`http://${finding.subdomain}`} target="_blank" rel="noopener noreferrer" title="Visit subdomain (HTTP)" className="p-2 text-gray-400 hover:text-red-300 hover:bg-gray-800/60 rounded-md transition-all duration-200"><ExternalLink className="h-4 w-4" /></a>
                                                </div>
                                            </div>
                                            <div className="mt-3 ml-8 p-3 bg-black/30 rounded-md">
                                                <p className="text-xs text-gray-400 font-semibold">REASON</p>
                                                <p className="text-sm font-mono text-gray-300 mt-1">{finding.reason}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center p-10 bg-gray-950/70 border border-gray-800/80 rounded-xl">
                                    <ShieldCheck className="h-12 w-12 text-green-500 mx-auto mb-4"/>
                                    <h3 className="text-xl font-bold text-slate-100">No Vulnerabilities Found</h3>
                                    <p className="text-gray-400 mt-2">The scanner checked {results.subdomains_checked} subdomains and found no signs of potential takeover.</p>
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SubtakerPage;
