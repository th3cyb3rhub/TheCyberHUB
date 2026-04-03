"use client"

import React, { useState } from 'react';
import { Server, Search, Copy, Check, Loader2 } from 'lucide-react';

interface DNSRecord {
    type: string;
    value: string;
    ttl?: number;
    priority?: number;
}

const DNSLookupPage = () => {
    const [domain, setDomain] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [records, setRecords] = useState<DNSRecord[]>([]);
    const [copied, setCopied] = useState<string | null>(null);

    const isValidDomain = (d: string): boolean => {
        const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
        return domainRegex.test(d);
    };

    const lookupDNS = async () => {
        const cleanDomain = domain.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];

        if (!cleanDomain) {
            setError('Please enter a domain name');
            return;
        }

        if (!isValidDomain(cleanDomain)) {
            setError('Invalid domain format. Use a valid domain like example.com');
            return;
        }

        setLoading(true);
        setError(null);
        setRecords([]);

        try {
            // Using Google DNS-over-HTTPS API
            const types = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME'];
            const results: DNSRecord[] = [];

            for (const type of types) {
                try {
                    const response = await fetch(
                        `https://dns.google/resolve?name=${cleanDomain}&type=${type}`
                    );
                    const data = await response.json();
                    
                    if (data.Answer) {
                        data.Answer.forEach((record: { type: number; data: string; TTL: number }) => {
                            const typeMap: { [key: number]: string } = {
                                1: 'A', 2: 'NS', 5: 'CNAME', 15: 'MX', 16: 'TXT', 28: 'AAAA'
                            };
                            results.push({
                                type: typeMap[record.type] || type,
                                value: record.data.replace(/"/g, ''),
                                ttl: record.TTL
                            });
                        });
                    }
                } catch {
                    // Skip failed record types
                }
            }

            if (results.length === 0) {
                setError('No DNS records found for this domain');
            } else {
                setRecords(results);
            }
        } catch {
            setError('Failed to lookup DNS records');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    const getRecordColor = (type: string) => {
        const colors: { [key: string]: string } = {
            'A': 'text-green-400 bg-green-500/10 border-green-500/20',
            'AAAA': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
            'MX': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
            'NS': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
            'TXT': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
            'CNAME': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
        };
        return colors[type] || 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    };

    const groupedRecords = records.reduce((acc, record) => {
        if (!acc[record.type]) acc[record.type] = [];
        acc[record.type].push(record);
        return acc;
    }, {} as { [key: string]: DNSRecord[] });

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <Server className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Network Tool</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                        DNS <span className="text-orange-500">Lookup</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Query DNS records for any domain - A, AAAA, MX, NS, TXT, CNAME.
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
                                onKeyDown={(e) => e.key === 'Enter' && lookupDNS()}
                                placeholder="example.com"
                                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                            />
                            <button
                                onClick={lookupDNS}
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
                        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Results */}
                    {Object.keys(groupedRecords).length > 0 && (
                        <div className="space-y-4">
                            {/* Copy All */}
                            <button
                                onClick={() => {
                                    const text = records.map(r => `${r.type}\t${r.value}${r.ttl ? `\tTTL:${r.ttl}` : ''}`).join('\n');
                                    copyToClipboard(text);
                                }}
                                className="w-full p-3 text-center rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white hover:border-orange-500/30 transition-colors flex items-center justify-center gap-2"
                            >
                                <Copy className="w-4 h-4" />
                                Copy All Records
                            </button>
                            {Object.entries(groupedRecords).map(([type, typeRecords]) => (
                                <div key={type} className="rounded-lg bg-white/[0.02] border border-white/5 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
                                        <span className={`text-xs px-2 py-1 rounded border font-medium ${getRecordColor(type)}`}>
                                            {type}
                                        </span>
                                        <span className="text-xs text-gray-500">{typeRecords.length} record(s)</span>
                                    </div>
                                    <div className="divide-y divide-white/5">
                                        {typeRecords.map((record, index) => (
                                            <div 
                                                key={index}
                                                className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors group"
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <code className="text-sm text-white font-mono break-all">
                                                        {record.value}
                                                    </code>
                                                    {record.ttl && (
                                                        <p className="text-xs text-gray-500 mt-1">TTL: {record.ttl}s</p>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(record.value)}
                                                    className="p-2 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all ml-2"
                                                >
                                                    {copied === record.value 
                                                        ? <Check className="w-4 h-4 text-green-400" />
                                                        : <Copy className="w-4 h-4" />
                                                    }
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Lookup */}
                <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    <h3 className="font-medium text-white mb-4">Quick Lookup</h3>
                    <div className="flex flex-wrap gap-2">
                        {['google.com', 'cloudflare.com', 'github.com'].map((d) => (
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

                {/* Record Types Info */}
                <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    <h3 className="font-medium text-white mb-4">DNS Record Types</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                            { type: 'A', desc: 'IPv4 address' },
                            { type: 'AAAA', desc: 'IPv6 address' },
                            { type: 'MX', desc: 'Mail server' },
                            { type: 'NS', desc: 'Name server' },
                            { type: 'TXT', desc: 'Text record' },
                            { type: 'CNAME', desc: 'Alias' },
                        ].map(({ type, desc }) => (
                            <div key={type} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                <span className={`text-xs px-2 py-0.5 rounded border ${getRecordColor(type)}`}>{type}</span>
                                <p className="text-xs text-gray-500 mt-2">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="mt-4 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-xs text-gray-500">
                        <strong className="text-gray-400">Note:</strong> DNS lookups are performed using Google Public DNS (8.8.8.8).
                    </p>
                </div>
            </section>
        </div>
    );
};

export default DNSLookupPage;
