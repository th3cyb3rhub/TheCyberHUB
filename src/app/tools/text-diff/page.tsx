"use client";
import React, { useState, useMemo } from 'react';
import {
    Copy,
    Download,
    RefreshCw,
    FileText,
    Columns,
    Rows,
    Binary,
    Type,
    Check,
    X,
    Plus,
    Minus,
    ArrowRight,
    Info,
    Code
} from 'lucide-react';

const TextDiffTool = () => {
    const [leftText, setLeftText] = useState('');
    const [rightText, setRightText] = useState('');
    const [viewMode, setViewMode] = useState('side-by-side');
    const [diffMode, setDiffMode] = useState('lines');
    const [syntaxMode, setSyntaxMode] = useState('javascript');
    const [showWhitespace, setShowWhitespace] = useState(false);
    const [showLineNumbers, setShowLineNumbers] = useState(true);
    const [ignoreCase, setIgnoreCase] = useState(false);
    const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
    const [copiedSide, setCopiedSide] = useState('');
    const [showInputs, setShowInputs] = useState(true);

    // Sample texts for demonstration
    const sampleTexts = {
        left: `{
  "name": "old-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "17.0.2",
    "lodash": "4.17.21"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}`,
        right: `{
  "name": "new-app",
  "version": "2.0.0",
  "dependencies": {
    "react": "18.2.0",
    "lodash": "4.17.21",
    "axios": "1.6.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  },
  "author": "Developer"
}`
    };

    // Enhanced syntax highlighting for multiple languages
    const highlightSyntax = (text: string, language = syntaxMode) => {
        if (language === 'none' || !text) return text;

        let highlighted = text;

        switch (language) {
            case 'javascript':
                // Keywords
                highlighted = highlighted.replace(
                    /\b(function|const|let|var|if|else|return|await|async|for|while|try|catch|finally|class|extends|import|export|default|true|false|null|undefined|this|new|typeof|instanceof)\b/g,
                    '<span class="text-purple-400 font-medium">$1</span>'
                );
                // Strings
                highlighted = highlighted.replace(
                    /(["'`])(?:(?=(\\?))\2.)*?\1/g,
                    '<span class="text-green-400">$&</span>'
                );
                // Numbers
                highlighted = highlighted.replace(
                    /\b\d+\.?\d*\b/g,
                    '<span class="text-blue-400">$&</span>'
                );
                // Comments
                highlighted = highlighted.replace(
                    /\/\/.*$/gm,
                    '<span class="text-gray-500 italic">$&</span>'
                );
                highlighted = highlighted.replace(
                    /\/\*[\s\S]*?\*\//g,
                    '<span class="text-gray-500 italic">$&</span>'
                );
                break;

            case 'json':
                // Property names
                highlighted = highlighted.replace(
                    /"([^"]+)"(?=\s*:)/g,
                    '<span class="text-blue-300">"$1"</span>'
                );
                // String values
                highlighted = highlighted.replace(
                    /:\s*"([^"]*)"/g,
                    ': <span class="text-green-400">"$1"</span>'
                );
                // Numbers
                highlighted = highlighted.replace(
                    /:\s*(\d+\.?\d*)/g,
                    ': <span class="text-orange-400">$1</span>'
                );
                // Booleans and null
                highlighted = highlighted.replace(
                    /\b(true|false|null)\b/g,
                    '<span class="text-purple-400">$1</span>'
                );
                // Brackets and braces
                highlighted = highlighted.replace(
                    /[{}[\]]/g,
                    '<span class="text-yellow-400 font-bold">$&</span>'
                );
                break;

            case 'html':
                // Escape HTML first
                highlighted = highlighted.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                // HTML tags
                highlighted = highlighted.replace(
                    /&lt;(\/?[a-zA-Z][^&gt;]*)&gt;/g,
                    '<span class="text-red-400">&lt;$1&gt;</span>'
                );
                // Attributes
                highlighted = highlighted.replace(
                    /(\w+)=("[^"]*")/g,
                    '<span class="text-blue-400">$1</span>=<span class="text-green-400">$2</span>'
                );
                break;

            case 'css':
                // Selectors
                highlighted = highlighted.replace(
                    /^([.#]?[a-zA-Z][a-zA-Z0-9-_]*)\s*{/gm,
                    '<span class="text-yellow-400">$1</span> {'
                );
                // Properties
                highlighted = highlighted.replace(
                    /([a-zA-Z-]+):/g,
                    '<span class="text-blue-400">$1</span>:'
                );
                // Values
                highlighted = highlighted.replace(
                    /:\s*([^;]+);/g,
                    ': <span class="text-green-400">$1</span>;'
                );
                break;

            case 'python':
                // Keywords
                highlighted = highlighted.replace(
                    /\b(def|class|if|elif|else|for|while|try|except|finally|import|from|as|return|yield|lambda|pass|break|continue|with|True|False|None)\b/g,
                    '<span class="text-purple-400 font-medium">$1</span>'
                );
                // Strings
                highlighted = highlighted.replace(
                    /(["'])(?:(?=(\\?))\2.)*?\1/g,
                    '<span class="text-green-400">$&</span>'
                );
                // Comments
                highlighted = highlighted.replace(
                    /#.*$/gm,
                    '<span class="text-gray-500 italic">$&</span>'
                );
                break;

            case 'sql':
                // Keywords
                highlighted = highlighted.replace(
                    /\b(SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|ON|GROUP|BY|ORDER|HAVING|INSERT|UPDATE|DELETE|CREATE|TABLE|INDEX|DROP|ALTER|UNION|DISTINCT|AS|AND|OR|NOT|IN|EXISTS|LIKE|BETWEEN|NULL|IS|PRIMARY|KEY|FOREIGN|REFERENCES)\b/gi,
                    '<span class="text-purple-400 font-medium">$&</span>'
                );
                // Strings
                highlighted = highlighted.replace(
                    /'([^']*)'/g,
                    '<span class="text-green-400">\'$1\'</span>'
                );
                break;
        }

        return highlighted;
    };

    // Compute differences between texts
    const computeDiff = useMemo(() => {
        let left = leftText;
        let right = rightText;

        if (ignoreCase) {
            left = left.toLowerCase();
            right = right.toLowerCase();
        }

        if (ignoreWhitespace) {
            left = left.replace(/\s+/g, ' ').trim();
            right = right.replace(/\s+/g, ' ').trim();
        }

        const leftLines = left.split('\n');
        const rightLines = right.split('\n');

        const diff = [];
        const maxLines = Math.max(leftLines.length, rightLines.length);

        for (let i = 0; i < maxLines; i++) {
            const leftLine = leftLines[i] || '';
            const rightLine = rightLines[i] || '';

            if (leftLine === rightLine) {
                diff.push({
                    type: 'unchanged',
                    leftLine: leftLine,
                    rightLine: rightLine,
                    leftLineNum: i + 1,
                    rightLineNum: i + 1
                });
            } else if (leftLines[i] === undefined) {
                diff.push({
                    type: 'added',
                    leftLine: '',
                    rightLine: rightLine,
                    leftLineNum: null,
                    rightLineNum: i + 1
                });
            } else if (rightLines[i] === undefined) {
                diff.push({
                    type: 'removed',
                    leftLine: leftLine,
                    rightLine: '',
                    leftLineNum: i + 1,
                    rightLineNum: null
                });
            } else {
                diff.push({
                    type: 'modified',
                    leftLine: leftLine,
                    rightLine: rightLine,
                    leftLineNum: i + 1,
                    rightLineNum: i + 1
                });
            }
        }

        return diff;
    }, [leftText, rightText, ignoreCase, ignoreWhitespace]);

    // Statistics
    const stats = useMemo(() => {
        const added = computeDiff.filter(d => d.type === 'added').length;
        const removed = computeDiff.filter(d => d.type === 'removed').length;
        const modified = computeDiff.filter(d => d.type === 'modified').length;
        const unchanged = computeDiff.filter(d => d.type === 'unchanged').length;

        return {
            added,
            removed,
            modified,
            unchanged,
            total: computeDiff.length,
            leftLines: leftText.split('\n').length,
            rightLines: rightText.split('\n').length,
            leftChars: leftText.length,
            rightChars: rightText.length,
            leftBytes: new Blob([leftText]).size,
            rightBytes: new Blob([rightText]).size
        };
    }, [computeDiff, leftText, rightText]);

    const copyToClipboard = (text: string, side: React.SetStateAction<string>) => {
        navigator.clipboard.writeText(text);
        setCopiedSide(side);
        setTimeout(() => setCopiedSide(''), 2000);
    };

    const downloadDiff = () => {
        const diffContent = computeDiff.map((line) => {
            let prefix = '  ';
            if (line.type === 'added') prefix = '+ ';
            if (line.type === 'removed') prefix = '- ';
            if (line.type === 'modified') prefix = '~ ';

            if (viewMode === 'side-by-side') {
                return `${prefix}[L${line.leftLineNum || '-'}] ${line.leftLine}\t|\t[R${line.rightLineNum || '-'}] ${line.rightLine}`;
            }
            return `${prefix}${line.type === 'removed' ? line.leftLine : line.rightLine}`;
        }).join('\n');

        const blob = new Blob([diffContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'text-diff-comparison.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const loadSampleData = () => {
        setLeftText(sampleTexts.left);
        setRightText(sampleTexts.right);
        setSyntaxMode('json');
        setShowInputs(false);
    };

    const clearAll = () => {
        setLeftText('');
        setRightText('');
        setShowInputs(true);
    };

    const swapTexts = () => {
        const temp = leftText;
        setLeftText(rightText);
        setRightText(temp);
    };

    const getLineBackground = (type: string) => {
        switch (type) {
            case 'added': return 'bg-green-500/10 border-l-4 border-green-500';
            case 'removed': return 'bg-red-500/10 border-l-4 border-red-500';
            case 'modified': return 'bg-yellow-500/10 border-l-4 border-yellow-500';
            default: return '';
        }
    };

    const getLineIcon = (type: string) => {
        switch (type) {
            case 'added': return <Plus className="w-4 h-4 text-green-400" />;
            case 'removed': return <Minus className="w-4 h-4 text-red-400" />;
            case 'modified': return <ArrowRight className="w-4 h-4 text-yellow-400" />;
            default: return null;
        }
    };

    const renderWhitespace = (text: string) => {
        if (!showWhitespace) return text;
        return text
            .replace(/ /g, '·')
            .replace(/\t/g, '→');
    };

    const convertToBytes = (text: string) => {
        if (!text) return '';
        const bytes = new TextEncoder().encode(text);
        return Array.from(bytes).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
    };

    const hasContent = leftText || rightText;

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="border-b border-gray-800 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                                <FileText className="h-5 w-5 text-black" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Text Difference Tool</h1>
                                <p className="text-xs text-gray-400">Advanced text comparison with syntax highlighting</p>
                            </div>
                        </div>

                        {/* View Mode Tabs */}
                        <div className="flex items-center space-x-4">
                            <div className="flex bg-gray-800 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('side-by-side')}
                                    className={`px-3 py-1.5 rounded flex items-center space-x-2 text-sm transition-all ${
                                        viewMode === 'side-by-side'
                                            ? 'bg-orange-500 text-black'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    <Columns className="w-4 h-4" />
                                    <span>Side by Side</span>
                                </button>
                                <button
                                    onClick={() => setViewMode('unified')}
                                    className={`px-3 py-1.5 rounded flex items-center space-x-2 text-sm transition-all ${
                                        viewMode === 'unified'
                                            ? 'bg-orange-500 text-black'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    <Rows className="w-4 h-4" />
                                    <span>Unified</span>
                                </button>
                                <button
                                    onClick={() => setViewMode('inline')}
                                    className={`px-3 py-1.5 rounded flex items-center space-x-2 text-sm transition-all ${
                                        viewMode === 'inline'
                                            ? 'bg-orange-500 text-black'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    <Type className="w-4 h-4" />
                                    <span>Inline</span>
                                </button>
                            </div>

                            {/* Diff Mode */}
                            <div className="flex bg-gray-800 rounded-lg p-1">
                                <button
                                    onClick={() => setDiffMode('lines')}
                                    className={`px-3 py-1.5 rounded text-sm transition-all ${
                                        diffMode === 'lines'
                                            ? 'bg-blue-500 text-black'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    Lines
                                </button>
                                <button
                                    onClick={() => setDiffMode('bytes')}
                                    className={`px-3 py-1.5 rounded flex items-center text-sm transition-all ${
                                        diffMode === 'bytes'
                                            ? 'bg-blue-500 text-black'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    <Binary className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="border-b border-gray-800 bg-gray-900/30">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {/* Syntax Highlighting Selector */}
                            <select
                                value={syntaxMode}
                                onChange={(e) => setSyntaxMode(e.target.value)}
                                className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
                            >
                                <option value="none">No Highlighting</option>
                                <option value="javascript">JavaScript</option>
                                <option value="json">JSON</option>
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                                <option value="python">Python</option>
                                <option value="sql">SQL</option>
                            </select>

                            <label className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showLineNumbers}
                                    onChange={(e) => setShowLineNumbers(e.target.checked)}
                                    className="rounded border-gray-600 bg-gray-800 text-orange-500 focus:ring-orange-500"
                                />
                                <span>Line Numbers</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showWhitespace}
                                    onChange={(e) => setShowWhitespace(e.target.checked)}
                                    className="rounded border-gray-600 bg-gray-800 text-orange-500 focus:ring-orange-500"
                                />
                                <span>Whitespace</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={ignoreCase}
                                    onChange={(e) => setIgnoreCase(e.target.checked)}
                                    className="rounded border-gray-600 bg-gray-800 text-orange-500 focus:ring-orange-500"
                                />
                                <span>Ignore Case</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={ignoreWhitespace}
                                    onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                                    className="rounded border-gray-600 bg-gray-800 text-orange-500 focus:ring-orange-500"
                                />
                                <span>Ignore Whitespace</span>
                            </label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={loadSampleData}
                                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm transition-all flex items-center space-x-2"
                            >
                                <Code className="w-4 h-4" />
                                <span>Sample</span>
                            </button>
                            {hasContent && (
                                <button
                                    onClick={() => setShowInputs(!showInputs)}
                                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm transition-all flex items-center space-x-2"
                                >
                                    <Type className="w-4 h-4" />
                                    <span>{showInputs ? 'Hide' : 'Show'} Inputs</span>
                                </button>
                            )}
                            <button
                                onClick={swapTexts}
                                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm transition-all flex items-center space-x-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Swap</span>
                            </button>
                            <button
                                onClick={clearAll}
                                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm transition-all flex items-center space-x-2"
                            >
                                <X className="w-4 h-4" />
                                <span>Clear</span>
                            </button>
                            {hasContent && (
                                <button
                                    onClick={downloadDiff}
                                    className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg text-sm transition-all flex items-center space-x-2"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Export</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Bar */}
            {hasContent && (
                <div className="border-b border-gray-800 bg-gray-950/50">
                    <div className="max-w-7xl mx-auto px-4 py-2">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                    <Plus className="w-3 h-3 text-green-400" />
                                    <span className="text-green-400">{stats.added} added</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Minus className="w-3 h-3 text-red-400" />
                                    <span className="text-red-400">{stats.removed} removed</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ArrowRight className="w-3 h-3 text-yellow-400" />
                                    <span className="text-yellow-400">{stats.modified} modified</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Check className="w-3 h-3 text-gray-400" />
                                    <span className="text-gray-400">{stats.unchanged} unchanged</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 text-gray-400">
                                <span>L: {stats.leftLines}L • {stats.leftChars}C • {stats.leftBytes}B</span>
                                <span>R: {stats.rightLines}L • {stats.rightChars}C • {stats.rightBytes}B</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1">
                {/* Input Mode or Always Show if toggled */}
                {(!hasContent || showInputs) && (
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/80">
                                    <h3 className="font-semibold text-white">Original Text</h3>
                                    <button
                                        onClick={() => copyToClipboard(leftText, 'left')}
                                        className="p-2 hover:bg-gray-800 rounded-lg transition-all relative"
                                    >
                                        <Copy className="w-4 h-4 text-gray-400" />
                                        {copiedSide === 'left' && (
                                            <div className="absolute -top-8 right-0 bg-green-500 text-black text-xs px-2 py-1 rounded">
                                                Copied!
                                            </div>
                                        )}
                                    </button>
                                </div>
                                <textarea
                                    value={leftText}
                                    onChange={(e) => setLeftText(e.target.value)}
                                    placeholder="Paste or type your original text here..."
                                    className="w-full h-96 p-4 bg-gray-950/50 text-white placeholder:text-gray-500 focus:outline-none resize-none font-mono text-sm"
                                />
                            </div>

                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/80">
                                    <h3 className="font-semibold text-white">Modified Text</h3>
                                    <button
                                        onClick={() => copyToClipboard(rightText, 'right')}
                                        className="p-2 hover:bg-gray-800 rounded-lg transition-all relative"
                                    >
                                        <Copy className="w-4 h-4 text-gray-400" />
                                        {copiedSide === 'right' && (
                                            <div className="absolute -top-8 right-0 bg-green-500 text-black text-xs px-2 py-1 rounded">
                                                Copied!
                                            </div>
                                        )}
                                    </button>
                                </div>
                                <textarea
                                    value={rightText}
                                    onChange={(e) => setRightText(e.target.value)}
                                    placeholder="Paste or type your modified text here..."
                                    className="w-full h-96 p-4 bg-gray-950/50 text-white placeholder:text-gray-500 focus:outline-none resize-none font-mono text-sm"
                                />
                            </div>
                        </div>

                        {!hasContent && (
                            <div className="mt-8 text-center">
                                <p className="text-gray-400 mb-4">
                                    Paste your texts above to see the differences, or
                                </p>
                                <button
                                    onClick={loadSampleData}
                                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold px-6 py-3 rounded-lg transition-all"
                                >
                                    Load Sample Code
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Diff View */}
                {hasContent && !showInputs && (
                    <div className="max-w-7xl mx-auto">
                        {viewMode === 'side-by-side' && (
                            <div className="grid lg:grid-cols-2 divide-x divide-gray-800 min-h-[600px]">
                                {/* Left Panel - Original */}
                                <div className="overflow-auto bg-gray-950/30">
                                    <div className="sticky top-0 z-10 p-3 bg-gray-900/95 border-b border-gray-800 backdrop-blur-sm">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-white">Original</h3>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs text-gray-400">{stats.leftLines} lines</span>
                                                <button
                                                    onClick={() => copyToClipboard(leftText, 'left')}
                                                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-orange-400 transition-all"
                                                    title="Copy original text"
                                                >
                                                    <Copy className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        {computeDiff.map((line, index) => (
                                            <div
                                                key={`left-${index}`}
                                                className={`font-mono text-sm whitespace-pre-wrap min-h-[20px] ${
                                                    line.type === 'added' ? 'opacity-30' : getLineBackground(line.type)
                                                }`}
                                            >
                                                <div className="flex">
                                                    {showLineNumbers && (
                                                        <span className="w-12 text-gray-500 text-right pr-4 select-none flex-shrink-0">
                                                            {line.leftLineNum || ''}
                                                        </span>
                                                    )}
                                                    <div className="flex-1 px-2">
                                                        {line.type !== 'added' && line.leftLine && (
                                                            syntaxMode !== 'none'
                                                                ? <span dangerouslySetInnerHTML={{ __html: highlightSyntax(renderWhitespace(line.leftLine)) }} />
                                                                : <span>{renderWhitespace(line.leftLine)}</span>
                                                        )}
                                                        {line.type === 'added' && (
                                                            <span className="text-gray-600">---</span>
                                                        )}
                                                        {!line.leftLine && line.type !== 'added' && (
                                                            <span className="text-transparent">.</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Panel - Modified */}
                                <div className="overflow-auto bg-gray-950/30">
                                    <div className="sticky top-0 z-10 p-3 bg-gray-900/95 border-b border-gray-800 backdrop-blur-sm">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-white">Modified</h3>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs text-gray-400">{stats.rightLines} lines</span>
                                                <button
                                                    onClick={() => copyToClipboard(rightText, 'right')}
                                                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-orange-400 transition-all"
                                                    title="Copy modified text"
                                                >
                                                    <Copy className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        {computeDiff.map((line, index) => (
                                            <div
                                                key={`right-${index}`}
                                                className={`font-mono text-sm whitespace-pre-wrap min-h-[20px] ${
                                                    line.type === 'removed' ? 'opacity-30' : getLineBackground(line.type)
                                                }`}
                                            >
                                                <div className="flex">
                                                    {showLineNumbers && (
                                                        <span className="w-12 text-gray-500 text-right pr-4 select-none flex-shrink-0">
                                                            {line.rightLineNum || ''}
                                                        </span>
                                                    )}
                                                    <div className="flex-1 px-2">
                                                        {line.type !== 'removed' && line.rightLine && (
                                                            syntaxMode !== 'none'
                                                                ? <span dangerouslySetInnerHTML={{ __html: highlightSyntax(renderWhitespace(line.rightLine)) }} />
                                                                : <span>{renderWhitespace(line.rightLine)}</span>
                                                        )}
                                                        {line.type === 'removed' && (
                                                            <span className="text-gray-600">---</span>
                                                        )}
                                                        {!line.rightLine && line.type !== 'removed' && (
                                                            <span className="text-transparent">.</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {viewMode === 'unified' && (
                            <div className="p-4">
                                {computeDiff.map((line, index) => (
                                    <div
                                        key={`unified-${index}`}
                                        className={`font-mono text-sm whitespace-pre-wrap min-h-[20px] ${getLineBackground(line.type)}`}
                                    >
                                        <div className="flex items-start">
                                            <div className="w-6 flex justify-center">
                                                {getLineIcon(line.type)}
                                            </div>
                                            {showLineNumbers && (
                                                <>
                                                    <span className="w-12 text-gray-500 text-right pr-2 select-none">
                                                        {line.leftLineNum || '-'}
                                                    </span>
                                                    <span className="w-12 text-gray-500 text-right pr-4 select-none">
                                                        {line.rightLineNum || '-'}
                                                    </span>
                                                </>
                                            )}
                                            <div className="flex-1 px-2">
                                                {syntaxMode !== 'none'
                                                    ? <span dangerouslySetInnerHTML={{ __html: highlightSyntax(renderWhitespace(line.type === 'removed' ? line.leftLine : line.rightLine)) }} />
                                                    : <span>{renderWhitespace(line.type === 'removed' ? line.leftLine : line.rightLine)}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {viewMode === 'inline' && (
                            <div className="p-4">
                                {diffMode === 'bytes' ? (
                                    <div className="grid lg:grid-cols-2 gap-4">
                                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-3">Original (Hex)</h4>
                                            <div className="font-mono text-xs text-orange-400 break-all max-h-96 overflow-auto">
                                                {convertToBytes(leftText)}
                                            </div>
                                        </div>
                                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-3">Modified (Hex)</h4>
                                            <div className="font-mono text-xs text-orange-400 break-all max-h-96 overflow-auto">
                                                {convertToBytes(rightText)}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-400 py-12">
                                        <Info className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                                        <p className="text-lg mb-2">Inline view is available in bytes mode</p>
                                        <p className="text-sm mb-6">Switch to bytes mode to see hexadecimal representation</p>
                                        <button
                                            onClick={() => setDiffMode('bytes')}
                                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-all"
                                        >
                                            Switch to Bytes Mode
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Help Section */}
                {!hasContent && (
                    <div className="max-w-4xl mx-auto px-4 py-8">
                        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-8">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                                <Info className="w-5 h-5 text-orange-400 mr-2" />
                                How to Use Text Diff Tool
                            </h3>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start">
                                            <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>Side-by-side, unified, and inline comparison modes</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>Syntax highlighting for JavaScript, JSON, HTML, CSS, Python, SQL</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>Whitespace visualization and case-insensitive comparison</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>Byte-level comparison with hexadecimal view</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>Export diff results and copy to clipboard</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>Real-time statistics and line numbering</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-4">Quick Start</h4>
                                    <div className="space-y-3 text-gray-300">
                                        <div className="flex items-start">
                                            <span className="bg-orange-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                                            <span>Paste your original text in the left panel</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="bg-orange-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                                            <span>Paste your modified text in the right panel</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="bg-orange-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                                            <span>Select appropriate syntax highlighting language</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="bg-orange-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                                            <span>Choose your preferred view mode and options</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="bg-orange-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">5</span>
                                            <span>Analyze differences and export results if needed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-700">
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <div className="w-4 h-4 bg-green-500/20 border-l-4 border-green-500"></div>
                                        <span>Added lines</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <div className="w-4 h-4 bg-red-500/20 border-l-4 border-red-500"></div>
                                        <span>Removed lines</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <div className="w-4 h-4 bg-yellow-500/20 border-l-4 border-yellow-500"></div>
                                        <span>Modified lines</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <div className="w-4 h-4 bg-gray-500/20"></div>
                                        <span>Unchanged lines</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Advanced Options Panel (shown when content exists) */}
                {hasContent && (
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">Advanced Options</h3>
                                <div className="text-sm text-gray-400">
                                    Total changes: {stats.added + stats.removed + stats.modified} lines
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-orange-400 mb-3">View Options</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={showLineNumbers}
                                                onChange={(e) => setShowLineNumbers(e.target.checked)}
                                                className="rounded border-gray-600 bg-gray-800 text-orange-500 focus:ring-orange-500"
                                            />
                                            <span>Show line numbers</span>
                                        </label>
                                        <label className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={showWhitespace}
                                                onChange={(e) => setShowWhitespace(e.target.checked)}
                                                className="rounded border-gray-600 bg-gray-800 text-orange-500 focus:ring-orange-500"
                                            />
                                            <span>Visualize whitespace (· for space, → for tab)</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-orange-400 mb-3">Comparison Options</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={ignoreCase}
                                                onChange={(e) => setIgnoreCase(e.target.checked)}
                                                className="rounded border-gray-600 bg-gray-800 text-orange-500 focus:ring-orange-500"
                                            />
                                            <span>Ignore case differences</span>
                                        </label>
                                        <label className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={ignoreWhitespace}
                                                onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                                                className="rounded border-gray-600 bg-gray-800 text-orange-500 focus:ring-orange-500"
                                            />
                                            <span>Ignore whitespace differences</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-orange-400 mb-3">Export & Actions</h4>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => copyToClipboard(leftText, 'left')}
                                            className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm transition-all flex items-center space-x-2"
                                        >
                                            <Copy className="w-4 h-4" />
                                            <span>Copy original text</span>
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(rightText, 'right')}
                                            className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm transition-all flex items-center space-x-2"
                                        >
                                            <Copy className="w-4 h-4" />
                                            <span>Copy modified text</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextDiffTool;