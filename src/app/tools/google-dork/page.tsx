"use client"

import React, { useState } from 'react';
import {
    Search,
    ExternalLink,
    Copy,
    Download,
    Shield,
    Database,
    FileText,
    Server,
    Bug,
    Camera,
    Globe,
    ArrowLeft,
    Filter,
    Eye,
    AlertTriangle,
    Info,
    RefreshCw
} from 'lucide-react';

interface GoogleDork {
    id: string;
    query: string;
    description: string;
    risk: 'low' | 'medium' | 'high';
    example?: string;
}

interface DorkCategory {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    description: string;
    dorks: GoogleDork[];
}

const GoogleDorkTool = () => {
    const [targetDomain, setTargetDomain] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchFilter, setSearchFilter] = useState('');
    const [viewMode, setViewMode] = useState<'category' | 'all'>('category');
    const [copiedDork, setCopiedDork] = useState('');

    const dorkCategories: DorkCategory[] = [
        {
            id: 'sensitive',
            name: 'Sensitive Information',
            icon: <Shield className="w-6 h-6" />,
            color: 'red',
            description: 'Find exposed sensitive data and confidential information',
            dorks: [
                {
                    id: 'passwords',
                    query: 'site:{domain} intext:"password" OR intext:"passwd" OR intext:"pwd"',
                    description: 'Search for exposed passwords',
                    risk: 'high',
                    example: 'site:example.com intext:"password"'
                },
                {
                    id: 'api-keys',
                    query: 'site:{domain} "api_key" OR "apikey" OR "api-key"',
                    description: 'Find exposed API keys',
                    risk: 'high',
                    example: 'site:example.com "api_key"'
                },
                {
                    id: 'credentials',
                    query: 'site:{domain} "username" "password" filetype:txt',
                    description: 'Search for credential files',
                    risk: 'high',
                    example: 'site:example.com "username" "password" filetype:txt'
                },
                {
                    id: 'ssh-keys',
                    query: 'site:{domain} "BEGIN RSA PRIVATE KEY" OR "BEGIN OPENSSH PRIVATE KEY"',
                    description: 'Find exposed SSH private keys',
                    risk: 'high',
                    example: 'site:example.com "BEGIN RSA PRIVATE KEY"'
                },
                {
                    id: 'env-files',
                    query: 'site:{domain} filetype:env "DB_PASSWORD" OR "API_KEY"',
                    description: 'Search for environment configuration files',
                    risk: 'high',
                    example: 'site:example.com filetype:env "DB_PASSWORD"'
                }
            ]
        },
        {
            id: 'database',
            name: 'Database Exposure',
            icon: <Database className="w-6 h-6" />,
            color: 'purple',
            description: 'Discover exposed databases and SQL-related files',
            dorks: [
                {
                    id: 'sql-dumps',
                    query: 'site:{domain} filetype:sql "INSERT INTO" OR "CREATE TABLE"',
                    description: 'Find SQL dump files',
                    risk: 'high',
                    example: 'site:example.com filetype:sql "INSERT INTO"'
                },
                {
                    id: 'db-backups',
                    query: 'site:{domain} filetype:bak OR filetype:backup "database"',
                    description: 'Search for database backup files',
                    risk: 'high',
                    example: 'site:example.com filetype:bak "database"'
                },
                {
                    id: 'phpinfo',
                    query: 'site:{domain} "phpinfo()" "PHP Version"',
                    description: 'Find phpinfo() pages with server info',
                    risk: 'medium',
                    example: 'site:example.com "phpinfo()" "PHP Version"'
                },
                {
                    id: 'db-errors',
                    query: 'site:{domain} "mysql_fetch_array()" OR "ORA-00921" OR "Microsoft OLE DB"',
                    description: 'Search for database error messages',
                    risk: 'medium',
                    example: 'site:example.com "mysql_fetch_array()"'
                }
            ]
        },
        {
            id: 'files',
            name: 'File Discovery',
            icon: <FileText className="w-6 h-6" />,
            color: 'blue',
            description: 'Find exposed documents and configuration files',
            dorks: [
                {
                    id: 'config-files',
                    query: 'site:{domain} filetype:conf OR filetype:config OR filetype:cfg',
                    description: 'Search for configuration files',
                    risk: 'medium',
                    example: 'site:example.com filetype:conf'
                },
                {
                    id: 'log-files',
                    query: 'site:{domain} filetype:log "error" OR "failed" OR "exception"',
                    description: 'Find log files with errors',
                    risk: 'medium',
                    example: 'site:example.com filetype:log "error"'
                },
                {
                    id: 'excel-docs',
                    query: 'site:{domain} filetype:xls OR filetype:xlsx "confidential" OR "internal"',
                    description: 'Search for Excel documents',
                    risk: 'medium',
                    example: 'site:example.com filetype:xls "confidential"'
                },
                {
                    id: 'pdf-docs',
                    query: 'site:{domain} filetype:pdf "internal" OR "confidential" OR "restricted"',
                    description: 'Find PDF documents with sensitive content',
                    risk: 'medium',
                    example: 'site:example.com filetype:pdf "internal"'
                },
                {
                    id: 'git-files',
                    query: 'site:{domain} ".git" OR "/.git/" OR filetype:gitignore',
                    description: 'Search for exposed Git repositories',
                    risk: 'high',
                    example: 'site:example.com ".git"'
                }
            ]
        },
        {
            id: 'servers',
            name: 'Server Information',
            icon: <Server className="w-6 h-6" />,
            color: 'green',
            description: 'Discover server configurations and admin panels',
            dorks: [
                {
                    id: 'admin-panels',
                    query: 'site:{domain} "admin" OR "administrator" OR "login" inurl:admin',
                    description: 'Find admin login panels',
                    risk: 'medium',
                    example: 'site:example.com "admin" inurl:admin'
                },
                {
                    id: 'server-status',
                    query: 'site:{domain} "server-status" OR "server-info" apache',
                    description: 'Search for Apache server status pages',
                    risk: 'medium',
                    example: 'site:example.com "server-status"'
                },
                {
                    id: 'directory-listing',
                    query: 'site:{domain} "Index of /" OR "Directory Listing For"',
                    description: 'Find directory listing pages',
                    risk: 'medium',
                    example: 'site:example.com "Index of /"'
                },
                {
                    id: 'backup-files',
                    query: 'site:{domain} filetype:bak OR filetype:backup OR filetype:old',
                    description: 'Search for backup files',
                    risk: 'medium',
                    example: 'site:example.com filetype:bak'
                }
            ]
        },
        {
            id: 'vulnerable',
            name: 'Vulnerabilities',
            icon: <Bug className="w-6 h-6" />,
            color: 'orange',
            description: 'Identify potential security vulnerabilities',
            dorks: [
                {
                    id: 'sql-injection',
                    query: 'site:{domain} "mysql_fetch_array()" OR "mysql_num_rows()" OR "mysql_error()"',
                    description: 'Find potential SQL injection points',
                    risk: 'high',
                    example: 'site:example.com "mysql_fetch_array()"'
                },
                {
                    id: 'php-errors',
                    query: 'site:{domain} "Warning:" "include(" OR "require(" "failed to open stream"',
                    description: 'Search for PHP error messages',
                    risk: 'medium',
                    example: 'site:example.com "Warning:" "include("'
                },
                {
                    id: 'asp-errors',
                    query: 'site:{domain} "Microsoft OLE DB Provider" OR "ADODB.Connection" error',
                    description: 'Find ASP/ASP.NET error pages',
                    risk: 'medium',
                    example: 'site:example.com "Microsoft OLE DB Provider"'
                },
                {
                    id: 'stack-traces',
                    query: 'site:{domain} "at java.lang" OR "at org.apache" OR "Exception in thread"',
                    description: 'Search for Java stack traces',
                    risk: 'medium',
                    example: 'site:example.com "at java.lang"'
                }
            ]
        },
        {
            id: 'cameras',
            name: 'Exposed Cameras',
            icon: <Camera className="w-6 h-6" />,
            color: 'indigo',
            description: 'Find exposed security cameras and webcams',
            dorks: [
                {
                    id: 'ip-cameras',
                    query: 'site:{domain} "Network Camera" OR "IP Camera" OR "Web Camera"',
                    description: 'Search for network cameras',
                    risk: 'medium',
                    example: 'site:example.com "Network Camera"'
                },
                {
                    id: 'axis-cameras',
                    query: 'site:{domain} "AXIS Video Server" OR "Live View / - AXIS"',
                    description: 'Find AXIS brand cameras',
                    risk: 'medium',
                    example: 'site:example.com "AXIS Video Server"'
                },
                {
                    id: 'webcam-streams',
                    query: 'site:{domain} "webcam" OR "camera" "live" "stream"',
                    description: 'Search for live webcam streams',
                    risk: 'low',
                    example: 'site:example.com "webcam" "live"'
                }
            ]
        }
    ];

    const validateDomain = (domain: string): boolean => {
        if (!domain) return true; // Allow empty domain
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/;
        return domainRegex.test(domain);
    };

    const buildQuery = (dork: GoogleDork): string => {
        if (targetDomain && validateDomain(targetDomain)) {
            return dork.query.replace('{domain}', targetDomain);
        }
        return dork.query.replace('site:{domain} ', '').replace('site:{domain}', '');
    };

    const searchGoogle = (dork: GoogleDork) => {
        const query = buildQuery(dork);
        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(googleUrl, '_blank');
    };

    const copyDork = (dork: GoogleDork) => {
        const query = buildQuery(dork);
        navigator.clipboard.writeText(query);
        setCopiedDork(dork.id);
        setTimeout(() => setCopiedDork(''), 2000);
    };

    const downloadDorks = () => {
        const allDorks = dorkCategories.flatMap(cat =>
            cat.dorks.map(dork => ({
                category: cat.name,
                description: dork.description,
                query: buildQuery(dork),
                risk: dork.risk
            }))
        );

        const csvContent = [
            'Category,Description,Query,Risk Level',
            ...allDorks.map(dork =>
                `"${dork.category}","${dork.description}","${dork.query}","${dork.risk}"`
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `google-dorks-${targetDomain || 'general'}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const filteredCategories = dorkCategories.map(category => ({
        ...category,
        dorks: category.dorks.filter(dork =>
            dork.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
            dork.query.toLowerCase().includes(searchFilter.toLowerCase())
        )
    })).filter(category =>
        selectedCategory === 'all' ||
        category.id === selectedCategory ||
        category.dorks.length > 0
    );

    const allDorks = dorkCategories.flatMap(cat =>
        cat.dorks.map(dork => ({ ...dork, category: cat.name, categoryColor: cat.color }))
    ).filter(dork =>
        dork.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
        dork.query.toLowerCase().includes(searchFilter.toLowerCase())
    );

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getRiskIcon = (risk: string) => {
        switch (risk) {
            case 'high': return <AlertTriangle className="w-4 h-4" />;
            case 'medium': return <Eye className="w-4 h-4" />;
            case 'low': return <Info className="w-4 h-4" />;
            default: return <Info className="w-4 h-4" />;
        }
    };

    const getCategoryColor = (color: string) => {
        const colors = {
            red: 'from-red-500/20 to-red-600/10 border-red-500/30',
            purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
            blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
            green: 'from-green-500/20 to-green-600/10 border-green-500/30',
            orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
            indigo: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30'
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-4 mb-6">
                            <a
                                href="/tools"
                                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 group"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            </a>
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                                    <Search className="h-6 w-6 text-black" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">Google Dork Tool</h1>
                                    <p className="text-gray-400">Advanced Google search operators for security testing</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Target Domain Input */}
                    <div className="mb-8">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <Globe className="w-5 h-5 text-orange-400" />
                                <h3 className="text-lg font-semibold text-white">Target Domain (Optional)</h3>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={targetDomain}
                                        onChange={(e) => setTargetDomain(e.target.value)}
                                        placeholder="example.com (leave empty for general dorks)"
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                    />
                                    {targetDomain && !validateDomain(targetDomain) && (
                                        <p className="text-red-400 text-sm mt-2">Please enter a valid domain name</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => setTargetDomain('')}
                                    className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 flex items-center space-x-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    <span>Clear</span>
                                </button>
                            </div>
                            <p className="text-gray-500 text-sm mt-3">
                                Enter a target domain to automatically include it in all dorks, or leave empty for general-purpose queries.
                            </p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="mb-8">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                                    {/* Search Filter */}
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchFilter}
                                            onChange={(e) => setSearchFilter(e.target.value)}
                                            placeholder="Filter dorks..."
                                            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                        />
                                    </div>

                                    {/* Category Filter */}
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                    >
                                        <option value="all">All Categories</option>
                                        {dorkCategories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* View Mode & Actions */}
                                <div className="flex items-center space-x-3">
                                    <div className="flex rounded-lg bg-gray-800/50 border border-gray-700 p-1">
                                        <button
                                            onClick={() => setViewMode('category')}
                                            className={`px-3 py-1 rounded text-sm transition-all duration-200 ${
                                                viewMode === 'category'
                                                    ? 'bg-orange-500 text-black'
                                                    : 'text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            By Category
                                        </button>
                                        <button
                                            onClick={() => setViewMode('all')}
                                            className={`px-3 py-1 rounded text-sm transition-all duration-200 ${
                                                viewMode === 'all'
                                                    ? 'bg-orange-500 text-black'
                                                    : 'text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            View All
                                        </button>
                                    </div>

                                    <button
                                        onClick={downloadDorks}
                                        className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Export CSV</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dorks Display */}
                    {viewMode === 'category' ? (
                        /* Category View */
                        <div className="space-y-8">
                            {filteredCategories.map((category) => (
                                category.dorks.length > 0 && (
                                    <div key={category.id} className={`bg-gradient-to-br ${getCategoryColor(category.color)} border rounded-xl p-6`}>
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="text-orange-400">
                                                {category.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                                                <p className="text-gray-300 text-sm">{category.description}</p>
                                            </div>
                                            <div className="ml-auto">
                                                <span className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm">
                                                    {category.dorks.length} dorks
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid gap-4">
                                            {category.dorks.map((dork) => (
                                                <div key={dork.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-orange-400/50 transition-all duration-300">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-3 mb-2">
                                                                <h4 className="text-white font-medium">{dork.description}</h4>
                                                                <span className={`text-xs px-2 py-1 rounded-full border flex items-center space-x-1 ${getRiskColor(dork.risk)}`}>
                                                                    {getRiskIcon(dork.risk)}
                                                                    <span>{dork.risk.toUpperCase()}</span>
                                                                </span>
                                                            </div>
                                                            <div className="bg-gray-950 border border-gray-700 rounded-lg p-3 font-mono text-sm">
                                                                <code className="text-orange-400 break-all">
                                                                    {buildQuery(dork)}
                                                                </code>
                                                            </div>
                                                            {dork.example && (
                                                                <div className="mt-2 text-gray-400 text-xs">
                                                                    Example: <code className="text-gray-300">{dork.example}</code>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center space-x-2 ml-4">
                                                            <button
                                                                onClick={() => copyDork(dork)}
                                                                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 relative"
                                                                title="Copy dork"
                                                            >
                                                                <Copy className="w-4 h-4 text-gray-400" />
                                                                {copiedDork === dork.id && (
                                                                    <div className="absolute -top-8 right-0 bg-green-500 text-black text-xs px-2 py-1 rounded">
                                                                        Copied!
                                                                    </div>
                                                                )}
                                                            </button>
                                                            <button
                                                                onClick={() => searchGoogle(dork)}
                                                                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-all duration-200"
                                                                title="Search in Google"
                                                            >
                                                                <ExternalLink className="w-4 h-4" />
                                                                <span className="text-sm">Search</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    ) : (
                        /* All View */
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
                            <div className="p-6 border-b border-gray-800">
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <Filter className="w-5 h-5 text-orange-400 mr-2" />
                                    All Google Dorks ({allDorks.length})
                                </h3>
                            </div>
                            <div className="divide-y divide-gray-800">
                                {allDorks.map((dork) => (
                                    <div key={`${dork.category}-${dork.id}`} className="p-4 hover:bg-gray-800/30 transition-all duration-200">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h4 className="text-white font-medium">{dork.description}</h4>
                                                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                                        {dork.category}
                                                    </span>
                                                    <span className={`text-xs px-2 py-1 rounded-full border flex items-center space-x-1 ${getRiskColor(dork.risk)}`}>
                                                        {getRiskIcon(dork.risk)}
                                                        <span>{dork.risk.toUpperCase()}</span>
                                                    </span>
                                                </div>
                                                <div className="bg-gray-950 border border-gray-700 rounded-lg p-3 font-mono text-sm">
                                                    <code className="text-orange-400 break-all">
                                                        {buildQuery(dork)}
                                                    </code>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 ml-4">
                                                <button
                                                    onClick={() => copyDork(dork)}
                                                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 relative"
                                                >
                                                    <Copy className="w-4 h-4 text-gray-400" />
                                                    {copiedDork === dork.id && (
                                                        <div className="absolute -top-8 right-0 bg-green-500 text-black text-xs px-2 py-1 rounded">
                                                            Copied!
                                                        </div>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => searchGoogle(dork)}
                                                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-all duration-200"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    <span className="text-sm">Search</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Results */}
                    {((viewMode === 'category' && filteredCategories.every(cat => cat.dorks.length === 0)) ||
                        (viewMode === 'all' && allDorks.length === 0)) && (
                        <div className="text-center py-12">
                            <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">No dorks found</h3>
                            <p className="text-gray-400 mb-6">Try adjusting your search filter or category selection</p>
                            <button
                                onClick={() => {
                                    setSearchFilter('');
                                    setSelectedCategory('all');
                                }}
                                className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* Security Notice */}
                    <div className="mt-12 bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-lg font-semibold text-red-400 mb-3">Security & Legal Notice</h3>
                                <div className="text-gray-300 space-y-2 text-sm leading-relaxed">
                                    <p>
                                        <strong>Ethical Use Only:</strong> These Google dorks are intended for security testing on systems you own or have explicit permission to test.
                                        Unauthorized scanning or access to systems you don&#39;t own may be illegal.
                                    </p>
                                    <p>
                                        <strong>Responsible Disclosure:</strong> If you discover vulnerabilities using these dorks, follow responsible disclosure practices
                                        and report findings to the appropriate parties.
                                    </p>
                                    <p>
                                        <strong>Rate Limiting:</strong> Google may rate limit or block excessive automated queries. Use these dorks responsibly
                                        and consider Google&#39;s terms of service.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Tips */}
                    <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                            <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-lg font-semibold text-blue-400 mb-3">Pro Tips</h3>
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                                    <div>
                                        <h4 className="font-medium text-white mb-2">Search Operators</h4>
                                        <ul className="space-y-1 text-gray-400">
                                            <li>• <code className="text-orange-400">site:</code> - Limit to specific domain</li>
                                            <li>• <code className="text-orange-400">filetype:</code> - Search specific file types</li>
                                            <li>• <code className="text-orange-400">intext:</code> - Find text within pages</li>
                                            <li>• <code className="text-orange-400">inurl:</code> - Search within URLs</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white mb-2">Best Practices</h4>
                                        <ul className="space-y-1 text-gray-400">
                                            <li>• Start with low-risk dorks first</li>
                                            <li>• Combine multiple operators for precision</li>
                                            <li>• Use quotes for exact phrase matching</li>
                                            <li>• Document findings for reporting</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="mt-8 grid md:grid-cols-4 gap-4">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                            <div className="text-orange-400 font-bold text-2xl mb-1">
                                {dorkCategories.reduce((total, cat) => total + cat.dorks.length, 0)}
                            </div>
                            <div className="text-gray-400 text-sm">Total Dorks</div>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                            <div className="text-orange-400 font-bold text-2xl mb-1">{dorkCategories.length}</div>
                            <div className="text-gray-400 text-sm">Categories</div>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                            <div className="text-red-400 font-bold text-2xl mb-1">
                                {dorkCategories.reduce((total, cat) =>
                                    total + cat.dorks.filter(d => d.risk === 'high').length, 0
                                )}
                            </div>
                            <div className="text-gray-400 text-sm">High Risk</div>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                            <div className="text-green-400 font-bold text-2xl mb-1">
                                {targetDomain ? 'Targeted' : 'General'}
                            </div>
                            <div className="text-gray-400 text-sm">Search Mode</div>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-12 text-center text-gray-500 text-sm">
                        <p>
                            Google Dork Tool by TheCyberHub •
                            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors ml-1">Suggest New Dorks</a> •
                            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors ml-1">Report Issues</a>
                        </p>
                        <p className="mt-2">
                            Always ensure you have proper authorization before testing systems with these dorks.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoogleDorkTool;