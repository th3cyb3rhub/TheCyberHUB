"use client"

import React, { useState } from 'react';
import { Copy, ExternalLink, Check, Search } from 'lucide-react';
import ToolPageLayout from '@/components/ui/ToolPageLayout';

interface Dork {
    id: string;
    name: string;
    query: string;
    description: string;
}

const GoogleDorkTool = () => {
    const [domain, setDomain] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const dorks: Dork[] = [
        { id: '1', name: 'Exposed Passwords', query: 'site:{domain} intext:"password" filetype:txt', description: 'Find exposed password files' },
        { id: '2', name: 'API Keys', query: 'site:{domain} "api_key" OR "apikey"', description: 'Search for exposed API keys' },
        { id: '3', name: 'SQL Files', query: 'site:{domain} filetype:sql', description: 'Find SQL dump files' },
        { id: '4', name: 'Config Files', query: 'site:{domain} filetype:env OR filetype:config', description: 'Search for configuration files' },
        { id: '5', name: 'Admin Panels', query: 'site:{domain} inurl:admin OR inurl:login', description: 'Find admin login pages' },
        { id: '6', name: 'Directory Listing', query: 'site:{domain} "Index of /"', description: 'Find open directory listings' },
        { id: '7', name: 'Git Exposure', query: 'site:{domain} ".git" OR "/.git/"', description: 'Search for exposed Git repositories' },
        { id: '8', name: 'Backup Files', query: 'site:{domain} filetype:bak OR filetype:backup', description: 'Find backup files' },
        { id: '9', name: 'Log Files', query: 'site:{domain} filetype:log', description: 'Search for log files' },
        { id: '10', name: 'PHP Errors', query: 'site:{domain} "Warning:" "PHP"', description: 'Find PHP error messages' },
    ];

    const buildQuery = (query: string) => {
        if (domain) {
            return query.replace('{domain}', domain);
        }
        return query.replace('site:{domain} ', '');
    };

    const copyToClipboard = (dork: Dork) => {
        navigator.clipboard.writeText(buildQuery(dork.query));
        setCopiedId(dork.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const searchGoogle = (dork: Dork) => {
        const url = `https://www.google.com/search?q=${encodeURIComponent(buildQuery(dork.query))}`;
        window.open(url, '_blank');
    };

    return (
        <ToolPageLayout
            title="Google Dork Tool"
            description="Advanced Google search operators for security reconnaissance and OSINT."
            icon={Search}
            badge="OSINT Tool"
            tags={[
                { label: 'Reconnaissance', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
                { label: 'OSINT', color: 'bg-green-500/10 text-green-400 border-green-500/30' },
            ]}
        >
            {/* Domain Input */}
            <div className="mb-8 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <label className="block text-sm text-gray-400 mb-2">
                    Target Domain (optional)
                </label>
                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-600 mt-2">
                    Leave empty for general-purpose dorks
                </p>
            </div>

            {/* Dorks List */}
            <div className="space-y-3">
                {dorks.map((dork) => (
                    <div
                        key={dork.id}
                        className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-medium mb-1">{dork.name}</h3>
                                <p className="text-sm text-gray-500 mb-3">{dork.description}</p>
                                <code className="block text-sm text-orange-500 bg-black/50 px-3 py-2 rounded-lg overflow-x-auto">
                                    {buildQuery(dork.query)}
                                </code>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={() => copyToClipboard(dork)}
                                    className="p-2 rounded-lg border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-colors"
                                    title="Copy"
                                >
                                    {copiedId === dork.id ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                                <button
                                    onClick={() => searchGoogle(dork)}
                                    className="p-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                                    title="Search"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ToolPageLayout>
    );
};

export default GoogleDorkTool;