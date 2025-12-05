"use client"

import React, { useState } from 'react';
import { Hash, Copy, Check, Search, AlertCircle } from 'lucide-react';

interface HashType {
    name: string;
    length: number;
    pattern: RegExp;
    description: string;
    example: string;
}

const hashTypes: HashType[] = [
    { name: 'MD5', length: 32, pattern: /^[a-f0-9]{32}$/i, description: 'Message Digest 5 - Weak, avoid for security', example: 'd41d8cd98f00b204e9800998ecf8427e' },
    { name: 'SHA-1', length: 40, pattern: /^[a-f0-9]{40}$/i, description: 'Secure Hash Algorithm 1 - Deprecated', example: 'da39a3ee5e6b4b0d3255bfef95601890afd80709' },
    { name: 'SHA-256', length: 64, pattern: /^[a-f0-9]{64}$/i, description: 'SHA-2 family - Widely used, secure', example: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { name: 'SHA-384', length: 96, pattern: /^[a-f0-9]{96}$/i, description: 'SHA-2 family - More secure than SHA-256', example: '38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b' },
    { name: 'SHA-512', length: 128, pattern: /^[a-f0-9]{128}$/i, description: 'SHA-2 family - Highest security in SHA-2', example: 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e' },
    { name: 'NTLM', length: 32, pattern: /^[a-f0-9]{32}$/i, description: 'Windows NT LAN Manager hash', example: '31d6cfe0d16ae931b73c59d7e0c089c0' },
    { name: 'MySQL 4.1+', length: 40, pattern: /^\*[A-F0-9]{40}$/i, description: 'MySQL password hash (starts with *)', example: '*2470C0C06DEE42FD1618BB99005ADCA2EC9D1E19' },
    { name: 'bcrypt', length: 60, pattern: /^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{53}$/, description: 'Adaptive hash function - Very secure', example: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' },
    { name: 'SHA-3-256', length: 64, pattern: /^[a-f0-9]{64}$/i, description: 'SHA-3 family - Latest standard', example: 'a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a' },
    { name: 'Argon2', length: 0, pattern: /^\$argon2(i|d|id)\$/, description: 'Password hashing winner - Most secure', example: '$argon2id$v=19$m=65536,t=3,p=4$...' },
];

const HashAnalyzerPage = () => {
    const [input, setInput] = useState('');
    const [copied, setCopied] = useState(false);
    const [results, setResults] = useState<HashType[]>([]);
    const [analyzed, setAnalyzed] = useState(false);

    const analyzeHash = () => {
        if (!input.trim()) {
            setResults([]);
            setAnalyzed(false);
            return;
        }

        const trimmed = input.trim();
        const matches = hashTypes.filter(hash => {
            if (hash.length === 0) {
                return hash.pattern.test(trimmed);
            }
            return trimmed.length === hash.length && hash.pattern.test(trimmed);
        });

        setResults(matches);
        setAnalyzed(true);
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getSecurityLevel = (name: string) => {
        const weak = ['MD5', 'NTLM'];
        const deprecated = ['SHA-1'];
        const strong = ['SHA-256', 'SHA-384', 'SHA-512', 'SHA-3-256'];
        const veryStrong = ['bcrypt', 'Argon2'];

        if (weak.includes(name)) return { label: 'Weak', color: 'text-red-400 bg-red-500/10 border-red-500/20' };
        if (deprecated.includes(name)) return { label: 'Deprecated', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' };
        if (veryStrong.includes(name)) return { label: 'Very Strong', color: 'text-green-400 bg-green-500/10 border-green-500/20' };
        if (strong.includes(name)) return { label: 'Strong', color: 'text-green-400 bg-green-500/10 border-green-500/20' };
        return { label: 'Unknown', color: 'text-gray-400 bg-gray-500/10 border-gray-500/20' };
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <Hash className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Security Tool</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                        Hash <span className="text-orange-500">Analyzer</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Identify hash types and analyze their security level.
                    </p>
                </div>
            </section>

            {/* Analyzer */}
            <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-20">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    {/* Input */}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-400 mb-2">Enter Hash</label>
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && analyzeHash()}
                                    placeholder="Paste your hash here..."
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                                {input && (
                                    <button
                                        onClick={copyToClipboard}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white transition-colors"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={analyzeHash}
                                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Search className="w-4 h-4" />
                                Analyze
                            </button>
                        </div>
                        {input && (
                            <p className="text-xs text-gray-500 mt-2">
                                Length: {input.trim().length} characters
                            </p>
                        )}
                    </div>

                    {/* Results */}
                    {analyzed && (
                        <div className="space-y-4">
                            <h3 className="text-sm text-gray-400">
                                {results.length > 0 
                                    ? `Possible hash types (${results.length} found)`
                                    : 'No matching hash types found'
                                }
                            </h3>

                            {results.length === 0 && (
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                                    <p className="text-sm text-yellow-200/80">
                                        The input doesn&apos;t match any known hash format. Check if it&apos;s a valid hash.
                                    </p>
                                </div>
                            )}

                            {results.map((hash, index) => {
                                const security = getSecurityLevel(hash.name);
                                return (
                                    <div 
                                        key={index}
                                        className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <h4 className="font-medium text-white">{hash.name}</h4>
                                                <span className={`text-xs px-2 py-0.5 rounded border ${security.color}`}>
                                                    {security.label}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500">{hash.length} chars</span>
                                        </div>
                                        <p className="text-sm text-gray-400">{hash.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Common Hashes Reference */}
                <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    <h3 className="font-medium text-white mb-4">Common Hash Types</h3>
                    <div className="space-y-3">
                        {hashTypes.slice(0, 6).map((hash, index) => {
                            const security = getSecurityLevel(hash.name);
                            return (
                                <div 
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-white font-medium w-20">{hash.name}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded border ${security.color}`}>
                                            {security.label}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">{hash.length} chars</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Info */}
                <div className="mt-4 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-xs text-gray-500">
                        <strong className="text-gray-400">Note:</strong> This tool identifies hash types based on format and length. 
                        Some hashes (like MD5 and NTLM) share the same format and cannot be distinguished without context.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default HashAnalyzerPage;
