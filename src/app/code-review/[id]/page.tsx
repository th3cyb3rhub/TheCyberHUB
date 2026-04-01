"use client"

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const CodeHighlight = dynamic(() => import('@/components/code/CodeHighlight'), { ssr: false });
import {
    ArrowLeft,
    Code,
    Shield,
    AlertTriangle,
    ChevronDown,
    ChevronUp,
    Lightbulb,
    Copy,
    Check,
    Columns,
    Rows,
    ExternalLink,
    Eye,
    EyeOff,
    Skull,
    Zap,
    Syringe,
    Target,
    FileWarning,
    BookOpen
} from 'lucide-react';
import { codeSnippets } from '@/data/codeSnippets';

const severityColors = {
    low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const languageMap: Record<string, string> = {
    javascript: 'jsx',
    python: 'python',
    php: 'php',
    java: 'java',
    sql: 'sql',
    go: 'go',
};

const CodeReviewDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const router = useRouter();
    const snippet = codeSnippets.find(s => s.id === id);

    const [activeTab, setActiveTab] = useState<'vulnerable' | 'secure'>('vulnerable');
    const [viewMode, setViewMode] = useState<'tabs' | 'side-by-side'>('tabs');
    const [hintsExpanded, setHintsExpanded] = useState(false);
    const [exploitExpanded, setExploitExpanded] = useState(true);
    const [showVulnerableLines, setShowVulnerableLines] = useState(false);
    const [showPayload, setShowPayload] = useState(false);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    if (!snippet) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Snippet not found</h1>
                    <Link href="/code-review" className="text-orange-400 hover:text-orange-300">
                        ← Back to Code Review
                    </Link>
                </div>
            </div>
        );
    }

    const copyCode = async (code: string, type: string) => {
        await navigator.clipboard.writeText(code);
        setCopiedCode(type);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const getCodeToShow = (type: 'vulnerable' | 'secure') => {
        if (showPayload) {
            return type === 'vulnerable' ? snippet.exploitedCode : snippet.secureExploitedCode;
        }
        return type === 'vulnerable' ? snippet.vulnerableCode : snippet.secureCode;
    };

    // Calculate max line numbers for proper alignment
    const getMaxLineWidth = (code: string) => {
        const lines = code.split('\n').length;
        return Math.max(2, String(lines).length);
    };

    const CodeBlock = ({ type }: { type: 'vulnerable' | 'secure' }) => {
        const code = getCodeToShow(type);
        const isVulnerable = type === 'vulnerable';
        const showHighlight = isVulnerable && showVulnerableLines && !showPayload;
        const maxLineWidth = getMaxLineWidth(code);

        return (
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-gray-950">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-white/5 to-transparent border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${isVulnerable ? (showPayload ? 'bg-red-500/20' : 'bg-orange-500/20') : 'bg-green-500/20'}`}>
                            {isVulnerable ? (
                                showPayload ? <Skull className="w-4 h-4 text-red-400" /> : <AlertTriangle className="w-4 h-4 text-orange-400" />
                            ) : (
                                <Shield className="w-4 h-4 text-green-400" />
                            )}
                        </div>
                        <div>
                            <span className={`font-medium ${isVulnerable ? (showPayload ? 'text-red-400' : 'text-orange-400') : 'text-green-400'}`}>
                                {isVulnerable ? (showPayload ? 'With Payload' : 'Vulnerable Code') : (showPayload ? 'Payload Handled' : 'Secure Code')}
                            </span>
                            <span className="text-xs text-gray-500 ml-2 px-2 py-0.5 bg-white/5 rounded">{snippet.language}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1">
                        {isVulnerable && !showPayload && snippet.vulnerableLines.length > 0 && (
                            <button
                                onClick={() => setShowVulnerableLines(!showVulnerableLines)}
                                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${showVulnerableLines
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                {showVulnerableLines ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                <span>{showVulnerableLines ? 'Hide Issue' : 'Show Issue'}</span>
                            </button>
                        )}

                        <button
                            onClick={() => setShowPayload(!showPayload)}
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${showPayload
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            <Syringe className="w-3.5 h-3.5" />
                            <span>{showPayload ? 'Remove Payload' : 'Inject Payload'}</span>
                        </button>

                        <button
                            onClick={() => copyCode(code, type)}
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all border border-transparent"
                        >
                            {copiedCode === type ? (
                                <><Check className="w-3.5 h-3.5 text-green-400" /> <span className="text-green-400">Copied!</span></>
                            ) : (
                                <><Copy className="w-3.5 h-3.5" /> <span>Copy</span></>
                            )}
                        </button>
                    </div>
                </div>

                {/* Code with Syntax Highlighting */}
                <div className="overflow-x-auto">
                    <CodeHighlight
                        code={code}
                        language={languageMap[snippet.language] || 'javascript'}
                        vulnerableLines={snippet.vulnerableLines}
                        showHighlight={showHighlight}
                        maxLineWidth={maxLineWidth}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black pt-20 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <span className="text-gray-600">/</span>
                    <Link href="/code-review" className="text-gray-400 hover:text-white">
                        Code Review
                    </Link>
                    <span className="text-gray-600">/</span>
                    <span className="text-orange-400">{snippet.title}</span>
                </div>

                {/* Header Card */}
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-6 mb-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">{snippet.title}</h1>
                            </div>
                            <p className="text-gray-400 max-w-2xl">{snippet.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className={`text-xs px-3 py-1.5 rounded-full border font-medium ${severityColors[snippet.severity]}`}>
                                {snippet.severity.toUpperCase()}
                            </span>
                            <span className={`text-xs px-3 py-1.5 rounded-full border font-medium ${difficultyColors[snippet.difficulty]}`}>
                                {snippet.difficulty.charAt(0).toUpperCase() + snippet.difficulty.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={`grid gap-6 ${viewMode === 'side-by-side' ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}>
                    {/* Code Section */}
                    <div className={viewMode === 'side-by-side' ? 'lg:col-span-1' : 'lg:col-span-2'}>
                        {/* Controls */}
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                            {viewMode === 'tabs' && (
                                <div className="flex gap-1 p-1 bg-white/5 rounded-xl">
                                    <button
                                        onClick={() => setActiveTab('vulnerable')}
                                        className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg font-medium transition-all ${activeTab === 'vulnerable'
                                            ? 'bg-orange-500/20 text-orange-400 shadow-lg shadow-orange-500/10'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <AlertTriangle className="w-4 h-4" />
                                        Vulnerable
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('secure')}
                                        className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg font-medium transition-all ${activeTab === 'secure'
                                            ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/10'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <Shield className="w-4 h-4" />
                                        Secure
                                    </button>
                                </div>
                            )}

                            {viewMode === 'side-by-side' && <div />}

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode('tabs')}
                                    className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg border transition-all ${viewMode === 'tabs'
                                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                                        : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                                        }`}
                                >
                                    <Rows className="w-3.5 h-3.5" />
                                    Tabs
                                </button>
                                <button
                                    onClick={() => setViewMode('side-by-side')}
                                    className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg border transition-all ${viewMode === 'side-by-side'
                                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                                        : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                                        }`}
                                >
                                    <Columns className="w-3.5 h-3.5" />
                                    Compare
                                </button>
                            </div>
                        </div>

                        {/* Code Display */}
                        {viewMode === 'tabs' ? (
                            <CodeBlock type={activeTab} />
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <CodeBlock type="vulnerable" />
                                <CodeBlock type="secure" />
                            </div>
                        )}
                    </div>

                    {/* Info Panel */}
                    <div className="space-y-4">
                        {/* Understanding Section */}
                        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden">
                            <div className="p-5 border-b border-white/5">
                                <h3 className="flex items-center gap-2 font-semibold text-white">
                                    <div className="p-1.5 rounded-lg bg-blue-500/20">
                                        <BookOpen className="w-4 h-4 text-blue-400" />
                                    </div>
                                    Understanding the Issue
                                </h3>
                            </div>
                            <div className="p-5">
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {snippet.explanation}
                                </p>
                            </div>
                        </div>

                        {/* Attack Scenario */}
                        {snippet.exploitExample && (
                            <div className="rounded-xl border border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent overflow-hidden">
                                <button
                                    onClick={() => setExploitExpanded(!exploitExpanded)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-red-500/5 transition-colors"
                                >
                                    <h3 className="flex items-center gap-2 font-semibold text-red-400">
                                        <div className="p-1.5 rounded-lg bg-red-500/20">
                                            <Target className="w-4 h-4 text-red-400" />
                                        </div>
                                        How Attackers Exploit This
                                    </h3>
                                    {exploitExpanded ? (
                                        <ChevronUp className="w-5 h-5 text-red-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-red-400" />
                                    )}
                                </button>
                                {exploitExpanded && (
                                    <div className="px-5 pb-5 space-y-4">
                                        <div className="p-4 rounded-lg bg-black/30 border border-red-500/10">
                                            <h4 className="text-sm font-medium text-white flex items-center gap-2 mb-2">
                                                <Zap className="w-4 h-4 text-yellow-500" />
                                                {snippet.exploitExample.title}
                                            </h4>
                                            <p className="text-xs text-gray-400">
                                                {snippet.exploitExample.description}
                                            </p>
                                        </div>

                                        <div>
                                            <div className="text-xs text-red-400 mb-2 flex items-center gap-1.5 font-medium">
                                                <FileWarning className="w-3.5 h-3.5" />
                                                Malicious Input
                                            </div>
                                            <pre className="p-3 bg-black/50 rounded-lg text-xs text-red-300 overflow-x-auto border border-red-500/20 font-mono">
                                                <code>{snippet.exploitExample.payload}</code>
                                            </pre>
                                        </div>

                                        <div>
                                            <div className="text-xs text-gray-400 mb-2 font-medium">Impact</div>
                                            <pre className="p-3 bg-black/50 rounded-lg text-xs text-gray-300 overflow-x-auto border border-white/10 whitespace-pre-wrap font-mono">
                                                <code>{snippet.exploitExample.result}</code>
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Hints */}
                        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden">
                            <button
                                onClick={() => setHintsExpanded(!hintsExpanded)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                            >
                                <h3 className="flex items-center gap-2 font-semibold text-white">
                                    <div className="p-1.5 rounded-lg bg-yellow-500/20">
                                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                                    </div>
                                    Finding the Vulnerability
                                    <span className="text-xs text-gray-500 font-normal ml-1">({snippet.hints.length} hints)</span>
                                </h3>
                                {hintsExpanded ? (
                                    <ChevronUp className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                            {hintsExpanded && (
                                <div className="px-5 pb-5">
                                    <ul className="space-y-3">
                                        {snippet.hints.map((hint, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                                <span className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-xs font-medium shrink-0">
                                                    {i + 1}
                                                </span>
                                                <span className="pt-0.5">{hint}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Technical Details */}
                        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden">
                            <div className="p-5 border-b border-white/5">
                                <h3 className="flex items-center gap-2 font-semibold text-white">
                                    <div className="p-1.5 rounded-lg bg-purple-500/20">
                                        <Code className="w-4 h-4 text-purple-400" />
                                    </div>
                                    Technical Details
                                </h3>
                            </div>
                            <div className="p-5">
                                <dl className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                                        <dt className="text-gray-500">Vulnerability Type</dt>
                                        <dd className="text-white font-medium">{snippet.vulnerabilityType}</dd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                                        <dt className="text-gray-500">Severity</dt>
                                        <dd className={`px-2.5 py-1 rounded-full text-xs font-medium ${severityColors[snippet.severity]}`}>
                                            {snippet.severity.toUpperCase()}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                                        <dt className="text-gray-500">Language</dt>
                                        <dd className="text-white">{snippet.language.charAt(0).toUpperCase() + snippet.language.slice(1)}</dd>
                                    </div>
                                    {snippet.cwe && (
                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                            <dt className="text-gray-500">CWE</dt>
                                            <dd>
                                                <a
                                                    href={`https://cwe.mitre.org/data/definitions/${snippet.cwe.split('-')[1]}.html`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1.5 font-medium"
                                                >
                                                    {snippet.cwe}
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </dd>
                                        </div>
                                    )}
                                    {snippet.owasp && (
                                        <div className="flex justify-between items-center py-2">
                                            <dt className="text-gray-500">OWASP</dt>
                                            <dd className="text-white text-right text-xs">{snippet.owasp}</dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeReviewDetailPage;
