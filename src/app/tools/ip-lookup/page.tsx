"use client"

import React, { useState } from 'react';
import { Globe, Search, MapPin, Building, Wifi, Shield, Loader2, Copy, Check } from 'lucide-react';

interface IPInfo {
    ip: string;
    city?: string;
    region?: string;
    country?: string;
    country_name?: string;
    postal?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    org?: string;
    asn?: string;
}

const IPLookupPage = () => {
    const [ip, setIp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<IPInfo | null>(null);
    const [copied, setCopied] = useState(false);
    const [myIp, setMyIp] = useState<string | null>(null);

    const isValidIP = (addr: string): boolean => {
        // IPv4
        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (ipv4Regex.test(addr)) {
            return addr.split('.').every(part => {
                const num = parseInt(part, 10);
                return num >= 0 && num <= 255;
            });
        }
        // IPv6 (simplified check)
        const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
        return ipv6Regex.test(addr);
    };

    const lookupIP = async (ipAddress?: string) => {
        const target = ipAddress || ip.trim();
        if (!target && !ipAddress) {
            setError('Please enter an IP address');
            return;
        }
        if (target && !isValidIP(target)) {
            setError('Invalid IP address format. Use IPv4 (e.g., 8.8.8.8) or IPv6.');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch(`https://ipapi.co/${target}/json/`);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.reason || 'Invalid IP address');
            }

            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to lookup IP');
        } finally {
            setLoading(false);
        }
    };

    const getMyIP = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            setMyIp(data.ip);
            setIp(data.ip);
            setResult(data);
        } catch {
            setError('Failed to get your IP');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <Globe className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Network Tool</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                        IP <span className="text-orange-500">Lookup</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Get geolocation and network information for any IP address.
                    </p>
                </div>
            </section>

            {/* Lookup */}
            <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-20">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    {/* Input */}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-400 mb-2">IP Address</label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={ip}
                                onChange={(e) => setIp(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && lookupIP()}
                                placeholder="Enter IP address (e.g., 8.8.8.8)"
                                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                            />
                            <button
                                onClick={() => lookupIP()}
                                disabled={loading}
                                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                Lookup
                            </button>
                        </div>
                        <button
                            onClick={getMyIP}
                            className="mt-3 text-sm text-orange-400 hover:text-orange-300 transition-colors"
                        >
                            {myIp ? `Your IP: ${myIp}` : 'What\'s my IP?'}
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Results */}
                    {result && (
                        <div className="space-y-4">
                            {/* IP Header */}
                            <div className="flex items-center justify-between p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                                <div className="flex items-center gap-3">
                                    <Wifi className="w-5 h-5 text-orange-400" />
                                    <span className="font-mono text-lg text-white">{result.ip}</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(result.ip)}
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Location */}
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 text-gray-400 mb-3">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-sm">Location</span>
                                    </div>
                                    <p className="text-white font-medium">
                                        {[result.city, result.region, result.country_name].filter(Boolean).join(', ') || 'Unknown'}
                                    </p>
                                    {result.postal && (
                                        <p className="text-sm text-gray-500 mt-1">Postal: {result.postal}</p>
                                    )}
                                </div>

                                {/* Coordinates */}
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 text-gray-400 mb-3">
                                        <Globe className="w-4 h-4" />
                                        <span className="text-sm">Coordinates</span>
                                    </div>
                                    <p className="text-white font-medium font-mono">
                                        {result.latitude && result.longitude 
                                            ? `${result.latitude}, ${result.longitude}`
                                            : 'Unknown'
                                        }
                                    </p>
                                    {result.timezone && (
                                        <p className="text-sm text-gray-500 mt-1">TZ: {result.timezone}</p>
                                    )}
                                </div>

                                {/* Organization */}
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 text-gray-400 mb-3">
                                        <Building className="w-4 h-4" />
                                        <span className="text-sm">Organization</span>
                                    </div>
                                    <p className="text-white font-medium">
                                        {result.org || 'Unknown'}
                                    </p>
                                </div>

                                {/* ASN */}
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 text-gray-400 mb-3">
                                        <Shield className="w-4 h-4" />
                                        <span className="text-sm">ASN</span>
                                    </div>
                                    <p className="text-white font-medium font-mono">
                                        {result.asn || 'Unknown'}
                                    </p>
                                </div>
                            </div>

                            {/* Copy All Results */}
                            <button
                                onClick={() => {
                                    const text = [
                                        `IP: ${result.ip}`,
                                        `Location: ${[result.city, result.region, result.country_name].filter(Boolean).join(', ')}`,
                                        result.postal ? `Postal: ${result.postal}` : '',
                                        result.latitude ? `Coordinates: ${result.latitude}, ${result.longitude}` : '',
                                        result.timezone ? `Timezone: ${result.timezone}` : '',
                                        result.org ? `Organization: ${result.org}` : '',
                                        result.asn ? `ASN: ${result.asn}` : '',
                                    ].filter(Boolean).join('\n');
                                    copyToClipboard(text);
                                }}
                                className="w-full p-3 text-center rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white hover:border-orange-500/30 transition-colors flex items-center justify-center gap-2"
                            >
                                <Copy className="w-4 h-4" />
                                Copy All Results
                            </button>

                            {/* Map Link */}
                            {result.latitude && result.longitude && (
                                <a
                                    href={`https://www.google.com/maps?q=${result.latitude},${result.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full p-4 text-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-orange-500/30 transition-colors"
                                >
                                    View on Google Maps →
                                </a>
                            )}
                        </div>
                    )}
                </div>

                {/* Common IPs */}
                <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    <h3 className="font-medium text-white mb-4">Quick Lookup</h3>
                    <div className="flex flex-wrap gap-2">
                        {['8.8.8.8', '1.1.1.1', '208.67.222.222', '9.9.9.9'].map((quickIp) => (
                            <button
                                key={quickIp}
                                onClick={() => {
                                    setIp(quickIp);
                                    lookupIP(quickIp);
                                }}
                                className="px-3 py-1.5 text-sm font-mono text-gray-400 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                            >
                                {quickIp}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                        Popular DNS servers for quick testing
                    </p>
                </div>

                {/* Info */}
                <div className="mt-4 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-xs text-gray-500">
                        <strong className="text-gray-400">Note:</strong> IP geolocation data is approximate and may not reflect the exact physical location. 
                        Data provided by ipapi.co.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default IPLookupPage;
