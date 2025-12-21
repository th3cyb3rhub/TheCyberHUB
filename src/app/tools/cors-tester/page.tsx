"use client"

import React, { useState } from 'react';
import { ArrowLeft, Play, Loader2, CheckCircle, XCircle, AlertTriangle, Info, Copy, Check } from 'lucide-react';
import Link from 'next/link';

interface CORSResult {
    url: string;
    origin: string;
    headers: Record<string, string>;
    vulnerable: boolean;
    issues: string[];
    recommendations: string[];
}

const CORSTesterPage = () => {
    const [url, setUrl] = useState('');
    const [customOrigin, setCustomOrigin] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<CORSResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const testOrigins = [
        { label: 'Null Origin', value: 'null' },
        { label: 'Evil Site', value: 'https://evil.com' },
        { label: 'Subdomain', value: '' }, // Will be generated from URL
        { label: 'Custom', value: 'custom' },
    ];

    const analyzeHeaders = (headers: Record<string, string>, origin: string): { vulnerable: boolean; issues: string[]; recommendations: string[] } => {
        const issues: string[] = [];
        const recommendations: string[] = [];
        let vulnerable = false;

        const acao = headers['access-control-allow-origin'];
        const acac = headers['access-control-allow-credentials'];
        const _acam = headers['access-control-allow-methods'];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _acah = headers['access-control-allow-headers'];

        // Check for wildcard
        if (acao === '*') {
            issues.push('Wildcard (*) origin is allowed');
            recommendations.push('Restrict to specific trusted origins');
            vulnerable = true;
        }

        // Check if origin is reflected
        if (acao === origin && origin !== 'null') {
            issues.push('Origin is reflected back without validation');
            recommendations.push('Implement a whitelist of allowed origins');
            vulnerable = true;
        }

        // Check null origin
        if (acao === 'null') {
            issues.push('Null origin is allowed (can be exploited via sandboxed iframes)');
            recommendations.push('Do not allow null origin');
            vulnerable = true;
        }

        // Check credentials with wildcard
        if (acao === '*' && acac === 'true') {
            issues.push('Credentials allowed with wildcard origin - Critical vulnerability!');
            recommendations.push('Never allow credentials with wildcard origin');
            vulnerable = true;
        }

        // Check credentials with reflected origin
        if (acao === origin && acac === 'true') {
            issues.push('Credentials allowed with reflected origin - High risk!');
            recommendations.push('Validate origins strictly when credentials are enabled');
            vulnerable = true;
        }

        // Check for dangerous methods
        if (_acam && (_acam.includes('PUT') || _acam.includes('DELETE') || _acam.includes('PATCH'))) {
            issues.push('Dangerous HTTP methods are allowed');
            recommendations.push('Only allow necessary HTTP methods');
        }

        // If no CORS headers
        if (!acao) {
            issues.push('No CORS headers present - Cross-origin requests may be blocked');
            recommendations.push('Configure CORS headers if cross-origin access is needed');
        }

        // Good practices
        if (issues.length === 0 && acao) {
            issues.push('No obvious CORS misconfigurations detected');
        }

        return { vulnerable, issues, recommendations };
    };

    const testCORS = async () => {
        if (!url) {
            setError('Please enter a URL');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Determine origin to test
            const testOrigin = customOrigin || 'https://evil.com';
            
            // For demo purposes, we'll simulate the CORS check
            // In production, this would need a backend proxy
            const response = await fetch(url, {
                method: 'OPTIONS',
                mode: 'cors',
                headers: {
                    'Origin': testOrigin,
                    'Access-Control-Request-Method': 'GET',
                }
            }).catch(() => null);

            // Simulated response for demo (real implementation needs backend)
            const simulatedHeaders: Record<string, string> = {};
            
            if (response) {
                response.headers.forEach((value, key) => {
                    if (key.toLowerCase().startsWith('access-control')) {
                        simulatedHeaders[key.toLowerCase()] = value;
                    }
                });
            }

            const analysis = analyzeHeaders(simulatedHeaders, testOrigin);

            setResult({
                url,
                origin: testOrigin,
                headers: simulatedHeaders,
                ...analysis
            });
        } catch {
            // Due to CORS, we can't actually test from browser
            // Show educational info instead
            setError('Browser CORS restrictions prevent direct testing. Use the curl commands below or a backend proxy.');
            
            // Still show example result for educational purposes
            setResult({
                url,
                origin: customOrigin || 'https://evil.com',
                headers: {},
                vulnerable: false,
                issues: ['Unable to test from browser due to CORS restrictions'],
                recommendations: ['Use curl commands or a backend service to test CORS']
            });
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const curlCommand = `curl -I -X OPTIONS \\
  -H "Origin: ${customOrigin || 'https://evil.com'}" \\
  -H "Access-Control-Request-Method: GET" \\
  "${url || 'https://example.com/api'}"`;

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
                        CORS Tester
                    </h1>
                    <p className="text-gray-400">
                        Test Cross-Origin Resource Sharing (CORS) configurations for security issues.
                    </p>
                </div>

                {/* Info Box */}
                <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-blue-400 font-medium text-sm">About CORS Vulnerabilities</p>
                            <p className="text-blue-500/80 text-sm mt-1">
                                CORS misconfigurations can allow attackers to steal sensitive data from authenticated users. 
                                Common issues include wildcard origins, null origin acceptance, and reflected origins with credentials.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Test Form */}
                <div className="mb-8 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h2 className="text-white font-medium mb-4">Test Configuration</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Target URL</label>
                            <input
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://api.example.com/endpoint"
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Test Origin</label>
                            <input
                                type="text"
                                value={customOrigin}
                                onChange={(e) => setCustomOrigin(e.target.value)}
                                placeholder="https://evil.com"
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors"
                            />
                            <p className="text-xs text-gray-600 mt-1">The origin to test against (attacker&apos;s domain)</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {testOrigins.slice(0, 3).map((origin) => (
                                <button
                                    key={origin.label}
                                    onClick={() => setCustomOrigin(origin.value)}
                                    className="px-3 py-1.5 rounded-lg text-sm bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
                                >
                                    {origin.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={testCORS}
                            disabled={loading || !url}
                            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-xl transition-all"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Play className="w-4 h-4" />
                            )}
                            Test CORS
                        </button>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <p className="text-yellow-400 text-sm">{error}</p>
                        </div>
                    </div>
                )}

                {/* Results */}
                {result && (
                    <div className="space-y-4">
                        {/* Status */}
                        <div className={`p-5 rounded-xl border ${result.vulnerable ? 'border-red-500/30 bg-red-500/5' : 'border-green-500/30 bg-green-500/5'}`}>
                            <div className="flex items-center gap-3 mb-3">
                                {result.vulnerable ? (
                                    <XCircle className="w-6 h-6 text-red-500" />
                                ) : (
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                )}
                                <h3 className={`text-lg font-semibold ${result.vulnerable ? 'text-red-400' : 'text-green-400'}`}>
                                    {result.vulnerable ? 'Potential CORS Vulnerability Detected' : 'No Obvious CORS Issues'}
                                </h3>
                            </div>
                            <p className="text-sm text-gray-400">
                                Tested: <code className="text-orange-400">{result.url}</code> with origin <code className="text-orange-400">{result.origin}</code>
                            </p>
                        </div>

                        {/* Headers */}
                        {Object.keys(result.headers).length > 0 && (
                            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                                <h3 className="text-white font-medium mb-3">CORS Headers</h3>
                                <div className="space-y-2">
                                    {Object.entries(result.headers).map(([key, value]) => (
                                        <div key={key} className="flex items-start gap-2 text-sm">
                                            <code className="text-gray-400">{key}:</code>
                                            <code className="text-orange-400">{value}</code>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Issues */}
                        <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                            <h3 className="text-white font-medium mb-3">Findings</h3>
                            <ul className="space-y-2">
                                {result.issues.map((issue, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                        <span className="text-orange-500 mt-1">•</span>
                                        {issue}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Recommendations */}
                        {result.recommendations.length > 0 && (
                            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                                <h3 className="text-white font-medium mb-3">Recommendations</h3>
                                <ul className="space-y-2">
                                    {result.recommendations.map((rec, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            {rec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Curl Command */}
                <div className="mt-8 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-medium">Test with cURL</h3>
                        <button
                            onClick={() => copyToClipboard('curl', curlCommand)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm transition-colors"
                        >
                            {copiedId === 'curl' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            Copy
                        </button>
                    </div>
                    <pre className="p-4 rounded-lg bg-black/50 border border-white/5 overflow-x-auto">
                        <code className="text-sm text-orange-400">{curlCommand}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default CORSTesterPage;
