"use client"

import React, { useState } from 'react';
import { Search, Globe, Calendar, User, Server, Shield, Loader2, Copy, Check, ExternalLink } from 'lucide-react';

interface WhoisData {
    domain: string;
    registrar?: string;
    createdDate?: string;
    expiryDate?: string;
    updatedDate?: string;
    status?: string[];
    nameServers?: string[];
    registrant?: {
        organization?: string;
        country?: string;
    };
}

const WhoisLookupPage = () => {
    const [domain, setDomain] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<WhoisData | null>(null);
    const [copied, setCopied] = useState(false);

    const lookupWhois = async () => {
        const cleanDomain = domain.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
        
        if (!cleanDomain) {
            setError('Please enter a domain name');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Using a free WHOIS API
            const response = await fetch(`https://api.api-ninjas.com/v1/whois?domain=${cleanDomain}`, {
                headers: {
                    'X-Api-Key': 'demo' // Note: In production, use a real API key
                }
            });

            if (!response.ok) {
                // Fallback: show basic info
                setResult({
                    domain: cleanDomain,
                    registrar: 'Unable to fetch (API limit)',
                });
                return;
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            setResult({
                domain: cleanDomain,
                registrar: data.registrar,
                createdDate: data.creation_date,
                expiryDate: data.expiration_date,
                updatedDate: data.updated_date,
                nameServers: data.name_servers,
            });
        } catch {
            // Show domain with external link option
            setResult({
                domain: cleanDomain,
            });
            setError('Limited data available. Use external lookup for full details.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return 'Unknown';
        try {
            return new Date(dateStr).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <Globe className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Domain Tool</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                        WHOIS <span className="text-orange-500">Lookup</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Get domain registration information and ownership details.
                    </p>
                </div>
            </section>

            {/* Lookup */}
            <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-20">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    {/* Input */}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-400 mb-2">Domain Name</label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && lookupWhois()}
                                placeholder="example.com"
                                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                            />
                            <button
                                onClick={lookupWhois}
                                disabled={loading}
                                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                Lookup
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Results */}
                    {result && (
                        <div className="space-y-4">
                            {/* Domain Header */}
                            <div className="flex items-center justify-between p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-orange-400" />
                                    <span className="font-mono text-lg text-white">{result.domain}</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(result.domain)}
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Registrar */}
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 text-gray-400 mb-3">
                                        <User className="w-4 h-4" />
                                        <span className="text-sm">Registrar</span>
                                    </div>
                                    <p className="text-white font-medium text-sm">
                                        {result.registrar || 'Unknown'}
                                    </p>
                                </div>

                                {/* Created */}
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 text-gray-400 mb-3">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm">Created</span>
                                    </div>
                                    <p className="text-white font-medium text-sm">
                                        {formatDate(result.createdDate)}
                                    </p>
                                </div>

                                {/* Expires */}
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 text-gray-400 mb-3">
                                        <Shield className="w-4 h-4" />
                                        <span className="text-sm">Expires</span>
                                    </div>
                                    <p className="text-white font-medium text-sm">
                                        {formatDate(result.expiryDate)}
                                    </p>
                                </div>

                                {/* Updated */}
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 text-gray-400 mb-3">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm">Last Updated</span>
                                    </div>
                                    <p className="text-white font-medium text-sm">
                                        {formatDate(result.updatedDate)}
                                    </p>
                                </div>
                            </div>

                            {/* Name Servers */}
                            {result.nameServers && result.nameServers.length > 0 && (
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 text-gray-400 mb-3">
                                        <Server className="w-4 h-4" />
                                        <span className="text-sm">Name Servers</span>
                                    </div>
                                    <div className="space-y-1">
                                        {result.nameServers.map((ns, i) => (
                                            <p key={i} className="text-white font-mono text-sm">{ns}</p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* External Links */}
                            <div className="flex flex-wrap gap-2">
                                <a
                                    href={`https://who.is/whois/${result.domain}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-orange-500/30 rounded-lg transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    who.is
                                </a>
                                <a
                                    href={`https://www.whois.com/whois/${result.domain}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-orange-500/30 rounded-lg transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    whois.com
                                </a>
                                <a
                                    href={`https://lookup.icann.org/lookup?q=${result.domain}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-orange-500/30 rounded-lg transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    ICANN
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Lookup */}
                <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    <h3 className="font-medium text-white mb-4">Popular Domains</h3>
                    <div className="flex flex-wrap gap-2">
                        {['google.com', 'github.com', 'cloudflare.com', 'amazon.com'].map((d) => (
                            <button
                                key={d}
                                onClick={() => {
                                    setDomain(d);
                                }}
                                className="px-3 py-1.5 text-sm text-gray-400 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="mt-4 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-xs text-gray-500">
                        <strong className="text-gray-400">Note:</strong> WHOIS data may be limited due to privacy protection services. 
                        Use external lookup links for complete information.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default WhoisLookupPage;
