/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect } from 'react';
import {
    Key,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Copy,
    Download,
    Eye,
    EyeOff,
    Clock,
    RefreshCw,
    Search,
    Target,
    Shield,
    Info
} from 'lucide-react';

interface DecodedJWT {
    header: Record<string, unknown>;
    payload: Record<string, unknown>;
    signature: string;
    isValid: boolean;
    algorithm: string;
    expiry: Date | null;
    isExpired: boolean;
}

interface SecurityCheck {
    type: 'critical' | 'high' | 'medium' | 'low' | 'info';
    title: string;
    description: string;
    recommendation: string;
    passed: boolean;
}

const JWTAnalyzerPage = () => {
    const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    const [decodedToken, setDecodedToken] = useState<DecodedJWT | null>(null);
    const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([]);
    const [secretKey, setSecretKey] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
    const [showSignature, setShowSignature] = useState(false);
    const [analysisTime, setAnalysisTime] = useState(0);
    const [error, setError] = useState('');

    // Common weak secrets for testing
    const commonSecrets = [
        'secret', 'password', 'test', 'key', 'jwt', 'token', 'admin', 'user',
        '123456', 'qwerty', 'abc123', 'password123', 'secret123', 'mysecret',
        'jwt-secret', 'your-256-bit-secret', 'secretkey', 'mykey'
    ];

    const base64UrlDecode = (str: string): string => {
        try {
            str = str.replace(/-/g, '+').replace(/_/g, '/');
            while (str.length % 4) {
                str += '=';
            }
            return atob(str);
        } catch {
            throw new Error('Invalid base64url encoding');
        }
    };

    const base64UrlEncode = (str: string): string => {
        return btoa(str)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    };

    const analyzeJWT = async (inputToken: string) => {
        if (!inputToken.trim()) {
            setError('Please enter a JWT token');
            return;
        }

        const startTime = Date.now();
        setError('');
        setDecodedToken(null);
        setSecurityChecks([]);
        setVerificationResult(null);

        try {
            const parts = inputToken.trim().split('.');

            if (parts.length !== 3) {
                throw new Error('Invalid JWT format. Token must have exactly 3 parts separated by dots.');
            }

            const headerDecoded = JSON.parse(base64UrlDecode(parts[0])) as Record<string, unknown>;
            const payloadDecoded = JSON.parse(base64UrlDecode(parts[1])) as Record<string, unknown>;
            const signature = parts[2];

            let expiry: Date | null = null;
            let isExpired = false;

            if (payloadDecoded.exp && typeof payloadDecoded.exp === 'number') {
                expiry = new Date(payloadDecoded.exp * 1000);
                isExpired = expiry < new Date();
            }

            const decoded: DecodedJWT = {
                header: headerDecoded,
                payload: payloadDecoded,
                signature,
                isValid: true,
                algorithm: (headerDecoded.alg as string) || 'Unknown',
                expiry,
                isExpired
            };

            setDecodedToken(decoded);

            const checks = performSecurityAnalysis(decoded, inputToken);
            setSecurityChecks(checks);

            setAnalysisTime(Date.now() - startTime);

        } catch (err) {
            const error = err as Error;
            setError(error.message || 'Failed to analyze JWT token');
        }
    };

    const performSecurityAnalysis = (token: DecodedJWT, rawToken: string): SecurityCheck[] => {
        const checks: SecurityCheck[] = [];

        if (token.algorithm === 'none') {
            checks.push({
                type: 'critical',
                title: 'No Algorithm (none)',
                description: 'Token uses "none" algorithm, meaning no signature verification',
                recommendation: 'Never accept tokens with "none" algorithm in production',
                passed: false
            });
        } else if (token.algorithm.startsWith('HS')) {
            checks.push({
                type: 'medium',
                title: 'HMAC Algorithm Detected',
                description: `Token uses ${token.algorithm} (symmetric key algorithm)`,
                recommendation: 'Consider using RS256 (asymmetric) for better security in distributed systems',
                passed: true
            });
        } else if (token.algorithm.startsWith('RS') || token.algorithm.startsWith('ES')) {
            checks.push({
                type: 'info',
                title: 'Asymmetric Algorithm',
                description: `Token uses ${token.algorithm} (asymmetric key algorithm)`,
                recommendation: 'Good choice for distributed systems and microservices',
                passed: true
            });
        }

        if (!token.payload.exp) {
            checks.push({
                type: 'high',
                title: 'No Expiration Time',
                description: 'Token does not have an expiration time (exp claim)',
                recommendation: 'Always set an expiration time to limit token lifetime',
                passed: false
            });
        } else if (token.isExpired) {
            checks.push({
                type: 'medium',
                title: 'Token Expired',
                description: `Token expired on ${token.expiry?.toLocaleString()}`,
                recommendation: 'Expired tokens should be rejected by the application',
                passed: false
            });
        } else {
            const timeToExpiry = token.expiry!.getTime() - Date.now();
            const hoursToExpiry = timeToExpiry / (1000 * 60 * 60);

            if (hoursToExpiry > 24 * 7) {
                checks.push({
                    type: 'medium',
                    title: 'Long Token Lifetime',
                    description: `Token expires in ${Math.round(hoursToExpiry / 24)} days`,
                    recommendation: 'Consider shorter token lifetimes for better security',
                    passed: false
                });
            } else {
                checks.push({
                    type: 'info',
                    title: 'Valid Expiration',
                    description: `Token expires in ${Math.round(hoursToExpiry)} hours`,
                    recommendation: 'Good token lifetime management',
                    passed: true
                });
            }
        }

        const sensitiveFields = ['password', 'secret', 'key', 'token', 'credit_card', 'ssn'];
        const payloadString = JSON.stringify(token.payload).toLowerCase();

        for (const field of sensitiveFields) {
            if (payloadString.includes(field)) {
                checks.push({
                    type: 'high',
                    title: 'Potential Sensitive Data',
                    description: `Payload may contain sensitive information (detected: ${field})`,
                    recommendation: 'Avoid storing sensitive data in JWT payload as it\'s only base64 encoded',
                    passed: false
                });
                break;
            }
        }

        if (!token.payload.iss) {
            checks.push({
                type: 'low',
                title: 'Missing Issuer Claim',
                description: 'Token does not specify an issuer (iss claim)',
                recommendation: 'Include issuer claim to identify token source',
                passed: false
            });
        }

        if (!token.payload.aud) {
            checks.push({
                type: 'low',
                title: 'Missing Audience Claim',
                description: 'Token does not specify an audience (aud claim)',
                recommendation: 'Include audience claim to specify intended recipients',
                passed: false
            });
        }

        if (rawToken.includes('eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0')) {
            checks.push({
                type: 'critical',
                title: 'Unsigned Token Detected',
                description: 'This appears to be an unsigned JWT token',
                recommendation: 'Unsigned tokens can be easily manipulated and should never be trusted',
                passed: false
            });
        }

        return checks;
    };

    const verifySignature = async () => {
        if (!decodedToken || !secretKey) return;

        setIsVerifying(true);

        try {
            if (decodedToken.algorithm.startsWith('HS')) {
                await verifyHMACSignature();
            } else {
                setVerificationResult(null);
                setError('Signature verification for this algorithm is not supported in browser environment');
            }
        } catch (err) {
            const error = err as Error;
            setError(error.message);
            setVerificationResult(false);
        } finally {
            setIsVerifying(false);
        }
    };

    const verifyHMACSignature = async () => {
        const [header, payload] = token.split('.');
        const data = `${header}.${payload}`;

        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            'raw',
            encoder.encode(secretKey),
            { name: 'HMAC', hash: decodedToken!.algorithm === 'HS256' ? 'SHA-256' : 'SHA-512' },
            false,
            ['sign']
        );

        const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
        const signatureString = new Uint8Array(signature).reduce((str, byte) => str + String.fromCharCode(byte), '');
        const signatureBase64 = base64UrlEncode(signatureString);

        setVerificationResult(signatureBase64 === decodedToken!.signature);
    };

    const bruteForceWeakSecret = async () => {
        if (!decodedToken || !decodedToken.algorithm.startsWith('HS')) return;

        setIsVerifying(true);

        for (const secret of commonSecrets) {
            try {
                const [header, payload] = token.split('.');
                const data = `${header}.${payload}`;

                const encoder = new TextEncoder();
                const key = await crypto.subtle.importKey(
                    'raw',
                    encoder.encode(secret),
                    { name: 'HMAC', hash: decodedToken.algorithm === 'HS256' ? 'SHA-256' : 'SHA-512' },
                    false,
                    ['sign']
                );

                const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
                const signatureString = new Uint8Array(signature).reduce((str, byte) => str + String.fromCharCode(byte), '');
                const signatureBase64 = base64UrlEncode(signatureString);

                if (signatureBase64 === decodedToken.signature) {
                    setSecretKey(secret);
                    setVerificationResult(true);

                    setSecurityChecks(prev => [{
                        type: 'critical',
                        title: 'Weak Secret Detected',
                        description: `Token signed with weak/common secret: "${secret}"`,
                        recommendation: 'Use a strong, randomly generated secret key',
                        passed: false
                    }, ...prev]);

                    setIsVerifying(false);
                    return;
                }
            } catch {
                continue;
            }
        }

        setIsVerifying(false);
        setVerificationResult(false);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const downloadReport = () => {
        if (!decodedToken) return;

        const report = {
            analysis_timestamp: new Date().toISOString(),
            token_info: {
                algorithm: decodedToken.algorithm,
                expiry: decodedToken.expiry?.toISOString(),
                is_expired: decodedToken.isExpired,
                header: decodedToken.header,
                payload: decodedToken.payload
            },
            security_checks: securityChecks,
            verification_result: verificationResult,
            secret_used: secretKey || null
        };

        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jwt_security_analysis.json';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const getSeverityColor = (type: SecurityCheck['type']) => {
        switch (type) {
            case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
            case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
            case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
            case 'low': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
            case 'info': return 'text-green-400 bg-green-400/10 border-green-400/30';
        }
    };

    const getSeverityIcon = (type: SecurityCheck['type']) => {
        switch (type) {
            case 'critical': return <XCircle className="h-5 w-5" />;
            case 'high': return <AlertTriangle className="h-5 w-5" />;
            case 'medium': return <AlertTriangle className="h-5 w-5" />;
            case 'low': return <Info className="h-5 w-5" />;
            case 'info': return <CheckCircle className="h-5 w-5" />;
        }
    };

    const formatJSON = (obj: Record<string, unknown>) => JSON.stringify(obj, null, 2);

    const sampleTokens = [
        {
            name: 'None Algorithm (Critical)',
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.'
        },
        {
            name: 'Weak Secret Example',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        }
    ];

    // Auto-analyze default token on component mount
    useEffect(() => {
        const analyzeDefaultToken = () => {
            if (token) {
                analyzeJWT(token);
            }
        };

        analyzeDefaultToken();
    }, []);

    return (
        <div className="min-h-screen bg-black text-slate-300">
            <main className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Hero Section */}
                    <section className="text-center mb-20">
                        <div className="flex items-center justify-center space-x-4 mb-5">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/10">
                                <Key className="h-8 w-8 text-orange-400" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                                JWT Security Scanner
                            </h1>
                        </div>
                        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                            Comprehensive JWT security analysis, weak secret detection, and signature verification for authentication testing.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 text-sm">
                            <span className="bg-orange-500/10 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full">Token Analysis</span>
                            <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded-full">Security Testing</span>
                            <span className="bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1 rounded-full">Client-side</span>
                        </div>
                    </section>

                    {/* Input Section */}
                    <section className="max-w-5xl mx-auto mb-16">
                        <div className="bg-gray-950/60 border border-gray-800/80 rounded-2xl p-8 shadow-2xl shadow-black/20 backdrop-blur-sm">
                            <div className="space-y-6">
                                <div className="relative">
                                    <textarea
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                                        className="w-full h-32 px-6 py-4 bg-gray-900/80 border border-gray-700/60 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 outline-none resize-none font-mono text-sm backdrop-blur-sm"
                                        rows={4}
                                    />
                                </div>

                                {error && (
                                    <div className="flex items-center space-x-3 text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl p-4 backdrop-blur-sm">
                                        <XCircle className="h-6 w-6 flex-shrink-0" />
                                        <span className="font-medium">{error}</span>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => analyzeJWT(token)}
                                        disabled={!token.trim()}
                                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 text-black disabled:text-gray-400 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center space-x-3 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 disabled:shadow-none"
                                    >
                                        <Search className="h-6 w-6" />
                                        <span className="text-lg">Analyze JWT Token</span>
                                    </button>

                                    <button
                                        onClick={() => { setToken(''); setDecodedToken(null); setSecurityChecks([]); setError(''); setVerificationResult(null); setSecretKey(''); }}
                                        className="px-6 py-4 bg-gray-800/80 hover:bg-gray-700/80 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-700/50 hover:border-gray-600/50"
                                    >
                                        <RefreshCw className="h-5 w-5" />
                                        <span>Clear</span>
                                    </button>
                                </div>

                                <div className="text-center">
                                    <div className="text-sm text-gray-500 mb-2">Try sample tokens:</div>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {sampleTokens.map((sample, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setToken(sample.token)}
                                                className="px-3 py-1.5 bg-gray-800/50 hover:bg-orange-500/20 border border-gray-700 hover:border-orange-500/50 text-gray-400 hover:text-orange-400 rounded-lg text-sm transition-all duration-200 font-mono"
                                            >
                                                {sample.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Results Section */}
                    {decodedToken && (
                        <div className="max-w-7xl mx-auto space-y-8">
                            {/* Analysis Summary */}
                            <div className="bg-gray-950/70 border border-gray-800/80 rounded-xl p-6 backdrop-blur-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                    <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                                        <CheckCircle className="h-6 w-6 text-green-400" />
                                        <h3 className="text-xl font-bold text-white">Token Analysis Complete</h3>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2 text-gray-400">
                                            <Clock className="h-4 w-4" />
                                            <span className="text-sm">{analysisTime}ms</span>
                                        </div>
                                        <button
                                            onClick={downloadReport}
                                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:scale-105"
                                        >
                                            <Download className="h-4 w-4" />
                                            <span>Export Report</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-4 gap-4">
                                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                                        <div className="text-orange-400 font-semibold mb-1">Algorithm</div>
                                        <div className="text-white font-mono">{decodedToken.algorithm}</div>
                                    </div>
                                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                                        <div className="text-orange-400 font-semibold mb-1">Status</div>
                                        <div className={`font-semibold ${decodedToken.isExpired ? 'text-red-400' : 'text-green-400'}`}>
                                            {decodedToken.isExpired ? 'Expired' : 'Valid'}
                                        </div>
                                    </div>
                                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                                        <div className="text-orange-400 font-semibold mb-1">Expires</div>
                                        <div className="text-white text-sm">
                                            {decodedToken.expiry ? decodedToken.expiry.toLocaleString() : 'No expiry'}
                                        </div>
                                    </div>
                                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                                        <div className="text-orange-400 font-semibold mb-1">Security Issues</div>
                                        <div className="text-red-400 font-semibold">
                                            {securityChecks.filter(c => !c.passed).length}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Checks */}
                            <div className="bg-gray-950/70 border border-gray-800/80 rounded-xl overflow-hidden backdrop-blur-sm">
                                <div className="p-6 border-b border-gray-800">
                                    <h3 className="text-xl font-bold text-white flex items-center">
                                        <Shield className="h-5 w-5 text-orange-400 mr-2" />
                                        Security Analysis
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {securityChecks.map((check, index) => (
                                            <div key={index} className={`border rounded-lg p-4 ${getSeverityColor(check.type)}`}>
                                                <div className="flex items-start space-x-3">
                                                    <div className="flex-shrink-0 mt-0.5">
                                                        {getSeverityIcon(check.type)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="font-semibold">{check.title}</div>
                                                            <span className="text-xs uppercase px-2 py-1 rounded border font-medium">
                                                                {check.type}
                                                            </span>
                                                        </div>
                                                        <div className="text-sm mb-2 opacity-90">{check.description}</div>
                                                        <div className="text-xs italic opacity-75">
                                                            💡 {check.recommendation}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Signature Verification */}
                            {decodedToken.algorithm !== 'none' && (
                                <div className="bg-gray-950/70 border border-gray-800/80 rounded-xl p-6 backdrop-blur-sm">
                                    <div className="flex items-center space-x-2 mb-6">
                                        <Key className="h-5 w-5 text-orange-400" />
                                        <h3 className="text-xl font-bold text-white">Signature Verification</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <div className="flex-1">
                                                <input
                                                    type="password"
                                                    value={secretKey}
                                                    onChange={(e) => setSecretKey(e.target.value)}
                                                    placeholder="Enter secret key for HMAC verification"
                                                    className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/60 rounded-lg text-white placeholder:text-gray-400 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/30 transition-all duration-200 outline-none font-mono"
                                                />
                                            </div>
                                            <button
                                                onClick={verifySignature}
                                                disabled={!secretKey || isVerifying}
                                                className="px-6 py-3 bg-blue-500/80 hover:bg-blue-600/80 disabled:bg-gray-600/80 text-white font-semibold rounded-lg transition-all duration-200 flex items-center space-x-2 border border-blue-500/30 hover:border-blue-400/30"
                                            >
                                                {isVerifying ? (
                                                    <>
                                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                                        <span>Verifying...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Key className="h-4 w-4" />
                                                        <span>Verify</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={bruteForceWeakSecret}
                                                disabled={isVerifying || !decodedToken.algorithm.startsWith('HS')}
                                                className="flex items-center space-x-2 px-4 py-2 bg-red-500/80 hover:bg-red-600/80 disabled:bg-gray-600/80 text-white font-semibold rounded-lg transition-all duration-200 border border-red-500/30 hover:border-red-400/30"
                                            >
                                                {isVerifying ? (
                                                    <>
                                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                                        <span>Testing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Target className="h-4 w-4" />
                                                        <span>Test Common Secrets</span>
                                                    </>
                                                )}
                                            </button>

                                            {!decodedToken.algorithm.startsWith('HS') && (
                                                <div className="text-sm text-gray-400">
                                                    * Signature verification only supported for HMAC algorithms in browser
                                                </div>
                                            )}
                                        </div>

                                        {verificationResult !== null && (
                                            <div className={`flex items-center space-x-3 p-4 rounded-lg border ${
                                                verificationResult
                                                    ? 'bg-green-400/10 border-green-400/30 text-green-400'
                                                    : 'bg-red-400/10 border-red-400/30 text-red-400'
                                            }`}>
                                                {verificationResult ? (
                                                    <>
                                                        <CheckCircle className="h-5 w-5" />
                                                        <span className="font-semibold">Signature Valid</span>
                                                        <span>- The token signature is correct for the provided secret</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle className="h-5 w-5" />
                                                        <span className="font-semibold">Signature Invalid</span>
                                                        <span>- The signature does not match the provided secret</span>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Token Details */}
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Header */}
                                <div className="bg-gray-950/70 border border-gray-800/80 rounded-xl overflow-hidden backdrop-blur-sm">
                                    <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-white flex items-center">
                                            <Shield className="h-5 w-5 text-orange-400 mr-2" />
                                            Header
                                        </h3>
                                        <button
                                            onClick={() => copyToClipboard(formatJSON(decodedToken.header))}
                                            className="p-2 hover:bg-gray-700/80 rounded text-gray-400 hover:text-orange-400 transition-all duration-200"
                                            title="Copy header"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <pre className="text-sm text-gray-300 bg-gray-900/50 rounded-lg p-4 overflow-x-auto font-mono border border-gray-800/50">
                                            {formatJSON(decodedToken.header)}
                                        </pre>
                                    </div>
                                </div>

                                {/* Payload */}
                                <div className="bg-gray-950/70 border border-gray-800/80 rounded-xl overflow-hidden backdrop-blur-sm">
                                    <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-white flex items-center">
                                            <Info className="h-5 w-5 text-orange-400 mr-2" />
                                            Payload
                                        </h3>
                                        <button
                                            onClick={() => copyToClipboard(formatJSON(decodedToken.payload))}
                                            className="p-2 hover:bg-gray-700/80 rounded text-gray-400 hover:text-orange-400 transition-all duration-200"
                                            title="Copy payload"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <pre className="text-sm text-gray-300 bg-gray-900/50 rounded-lg p-4 overflow-x-auto font-mono border border-gray-800/50">
                                            {formatJSON(decodedToken.payload)}
                                        </pre>
                                    </div>
                                </div>

                                {/* Signature */}
                                <div className="lg:col-span-2 bg-gray-950/70 border border-gray-800/80 rounded-xl overflow-hidden backdrop-blur-sm">
                                    <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-white flex items-center">
                                            <Key className="h-5 w-5 text-orange-400 mr-2" />
                                            Signature
                                        </h3>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setShowSignature(!showSignature)}
                                                className="p-2 hover:bg-gray-700/80 rounded text-gray-400 hover:text-orange-400 transition-all duration-200"
                                                title={showSignature ? "Hide signature" : "Show signature"}
                                            >
                                                {showSignature ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                            <button
                                                onClick={() => copyToClipboard(decodedToken.signature)}
                                                className="p-2 hover:bg-gray-700/80 rounded text-gray-400 hover:text-orange-400 transition-all duration-200"
                                                title="Copy signature"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="text-sm text-gray-300 bg-gray-900/50 rounded-lg p-4 font-mono break-all border border-gray-800/50">
                                            {showSignature ? decodedToken.signature : '•'.repeat(decodedToken.signature.length)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default JWTAnalyzerPage;