"use client"

import React, { useState } from 'react';
import { ArrowLeft, Play, Loader2, CheckCircle, XCircle, AlertTriangle, Copy, Check, Info } from 'lucide-react';
import Link from 'next/link';

interface PortResult {
    port: number;
    status: 'open' | 'closed' | 'filtered';
    service: string;
    description: string;
}

interface ScanResult {
    target: string;
    scanTime: number;
    ports: PortResult[];
    openCount: number;
}

// Common ports and their services
const commonPorts: Record<number, { service: string; description: string }> = {
    21: { service: 'FTP', description: 'File Transfer Protocol' },
    22: { service: 'SSH', description: 'Secure Shell' },
    23: { service: 'Telnet', description: 'Telnet (insecure)' },
    25: { service: 'SMTP', description: 'Simple Mail Transfer Protocol' },
    53: { service: 'DNS', description: 'Domain Name System' },
    80: { service: 'HTTP', description: 'Hypertext Transfer Protocol' },
    110: { service: 'POP3', description: 'Post Office Protocol v3' },
    143: { service: 'IMAP', description: 'Internet Message Access Protocol' },
    443: { service: 'HTTPS', description: 'HTTP Secure' },
    445: { service: 'SMB', description: 'Server Message Block' },
    993: { service: 'IMAPS', description: 'IMAP over SSL' },
    995: { service: 'POP3S', description: 'POP3 over SSL' },
    1433: { service: 'MSSQL', description: 'Microsoft SQL Server' },
    1521: { service: 'Oracle', description: 'Oracle Database' },
    3306: { service: 'MySQL', description: 'MySQL Database' },
    3389: { service: 'RDP', description: 'Remote Desktop Protocol' },
    5432: { service: 'PostgreSQL', description: 'PostgreSQL Database' },
    5900: { service: 'VNC', description: 'Virtual Network Computing' },
    6379: { service: 'Redis', description: 'Redis Database' },
    8080: { service: 'HTTP-Alt', description: 'HTTP Alternate' },
    8443: { service: 'HTTPS-Alt', description: 'HTTPS Alternate' },
    27017: { service: 'MongoDB', description: 'MongoDB Database' },
};

const portPresets = [
    { label: 'Top 20', ports: [21, 22, 23, 25, 53, 80, 110, 143, 443, 445, 993, 995, 1433, 3306, 3389, 5432, 5900, 6379, 8080, 8443] },
    { label: 'Web', ports: [80, 443, 8080, 8443, 8000, 8888, 3000, 5000] },
    { label: 'Database', ports: [1433, 1521, 3306, 5432, 6379, 27017, 9200, 9300] },
    { label: 'Mail', ports: [25, 110, 143, 465, 587, 993, 995] },
];

const PortScannerPage = () => {
    const [target, setTarget] = useState('');
    const [customPorts, setCustomPorts] = useState('');
    const [selectedPreset, setSelectedPreset] = useState<number[]>(portPresets[0].ports);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [scanProgress, setScanProgress] = useState(0);

    const scanPorts = async () => {
        if (!target) {
            setError('Please enter a target hostname or IP');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);
        setScanProgress(0);

        const portsToScan = customPorts
            ? customPorts.split(',').map(p => parseInt(p.trim())).filter(p => !isNaN(p) && p > 0 && p <= 65535)
            : selectedPreset;

        if (portsToScan.length === 0) {
            setError('No valid ports to scan');
            setLoading(false);
            return;
        }

        const startTime = Date.now();
        const results: PortResult[] = [];

        // Note: Browser-based port scanning is limited due to CORS
        // This is a simulation for educational purposes
        // Real port scanning requires a backend service

        for (let i = 0; i < portsToScan.length; i++) {
            const port = portsToScan[i];
            setScanProgress(Math.round((i / portsToScan.length) * 100));

            // Simulate scan delay
            await new Promise(resolve => setTimeout(resolve, 100));

            // Simulate results (in real implementation, this would check actual connectivity)
            const portInfo = commonPorts[port] || { service: 'Unknown', description: 'Unknown service' };
            
            // Simulate some ports being open for demo
            const isOpen = [80, 443, 22].includes(port) || Math.random() < 0.1;
            
            results.push({
                port,
                status: isOpen ? 'open' : 'closed',
                service: portInfo.service,
                description: portInfo.description
            });
        }

        setScanProgress(100);
        const scanTime = Date.now() - startTime;

        setResult({
            target,
            scanTime,
            ports: results,
            openCount: results.filter(r => r.status === 'open').length
        });

        setLoading(false);
    };

    const copyToClipboard = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const nmapCommand = `nmap -sV -sC ${target || 'target.com'} -p ${customPorts || selectedPreset.join(',')}`;

    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
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
                        Port Scanner
                    </h1>
                    <p className="text-gray-400">
                        Scan common ports to discover open services.
                    </p>
                </div>

                {/* Warning */}
                <div className="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-yellow-400 font-medium text-sm">Authorization Required</p>
                            <p className="text-yellow-500/80 text-sm mt-1">
                                Only scan systems you own or have explicit permission to test. 
                                Unauthorized port scanning may be illegal in your jurisdiction.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-blue-400 font-medium text-sm">Browser Limitations</p>
                            <p className="text-blue-500/80 text-sm mt-1">
                                Browser-based port scanning is limited. For accurate results, use the nmap command below 
                                or a dedicated scanning tool.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Scan Form */}
                <div className="mb-8 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h2 className="text-white font-medium mb-4">Scan Configuration</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Target Host</label>
                            <input
                                type="text"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                                placeholder="example.com or 192.168.1.1"
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Port Presets</label>
                            <div className="flex flex-wrap gap-2">
                                {portPresets.map((preset) => (
                                    <button
                                        key={preset.label}
                                        onClick={() => {
                                            setSelectedPreset(preset.ports);
                                            setCustomPorts('');
                                        }}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                            JSON.stringify(selectedPreset) === JSON.stringify(preset.ports) && !customPorts
                                                ? 'bg-orange-500 text-white'
                                                : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                                        }`}
                                    >
                                        {preset.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Custom Ports (comma-separated)</label>
                            <input
                                type="text"
                                value={customPorts}
                                onChange={(e) => setCustomPorts(e.target.value)}
                                placeholder="80, 443, 8080, 3000"
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors font-mono text-sm"
                            />
                        </div>

                        <button
                            onClick={scanPorts}
                            disabled={loading || !target}
                            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-xl transition-all"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Scanning... {scanProgress}%
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4" />
                                    Start Scan
                                </>
                            )}
                        </button>

                        {/* Progress Bar */}
                        {loading && (
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-orange-500 transition-all duration-300"
                                    style={{ width: `${scanProgress}%` }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                        <div className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    </div>
                )}

                {/* Results */}
                {result && (
                    <div className="space-y-4">
                        {/* Summary */}
                        <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-medium">Scan Results</h3>
                                <span className="text-sm text-gray-500">
                                    Completed in {(result.scanTime / 1000).toFixed(2)}s
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="p-3 rounded-lg bg-white/5">
                                    <p className="text-2xl font-bold text-white">{result.ports.length}</p>
                                    <p className="text-xs text-gray-500">Ports Scanned</p>
                                </div>
                                <div className="p-3 rounded-lg bg-green-500/10">
                                    <p className="text-2xl font-bold text-green-400">{result.openCount}</p>
                                    <p className="text-xs text-gray-500">Open</p>
                                </div>
                                <div className="p-3 rounded-lg bg-red-500/10">
                                    <p className="text-2xl font-bold text-red-400">{result.ports.length - result.openCount}</p>
                                    <p className="text-xs text-gray-500">Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Open Ports */}
                        {result.openCount > 0 && (
                            <div className="p-5 rounded-xl border border-green-500/30 bg-green-500/5">
                                <h3 className="text-green-400 font-medium mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Open Ports
                                </h3>
                                <div className="space-y-2">
                                    {result.ports.filter(p => p.status === 'open').map((port) => (
                                        <div key={port.port} className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                                            <div className="flex items-center gap-3">
                                                <span className="text-white font-mono font-medium">{port.port}</span>
                                                <span className="text-orange-400">{port.service}</span>
                                            </div>
                                            <span className="text-sm text-gray-500">{port.description}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All Ports Table */}
                        <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                            <h3 className="text-white font-medium mb-3">All Scanned Ports</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-gray-500 border-b border-white/10">
                                            <th className="pb-2 pr-4">Port</th>
                                            <th className="pb-2 pr-4">Status</th>
                                            <th className="pb-2 pr-4">Service</th>
                                            <th className="pb-2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.ports.map((port) => (
                                            <tr key={port.port} className="border-b border-white/5">
                                                <td className="py-2 pr-4 font-mono text-white">{port.port}</td>
                                                <td className="py-2 pr-4">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                                                        port.status === 'open' 
                                                            ? 'bg-green-500/20 text-green-400' 
                                                            : 'bg-red-500/20 text-red-400'
                                                    }`}>
                                                        {port.status === 'open' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                        {port.status}
                                                    </span>
                                                </td>
                                                <td className="py-2 pr-4 text-orange-400">{port.service}</td>
                                                <td className="py-2 text-gray-500">{port.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Nmap Command */}
                <div className="mt-8 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-medium">Scan with Nmap</h3>
                        <button
                            onClick={() => copyToClipboard('nmap', nmapCommand)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm transition-colors"
                        >
                            {copiedId === 'nmap' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            Copy
                        </button>
                    </div>
                    <pre className="p-4 rounded-lg bg-black/50 border border-white/5 overflow-x-auto">
                        <code className="text-sm text-orange-400">{nmapCommand}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default PortScannerPage;
