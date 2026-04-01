"use client";
import React, { useState, useMemo } from 'react';
import DOMPurify from 'dompurify';
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

    // Sample texts for demonstration
    const sampleTexts = {
        left: `function authenticate(username, password) {
    const user = database.getUser(username);
    if (!user) {
        return { success: false, error: "User not found" };
    }
    
    if (user.password === password) {
        return { success: true, token: generateToken(user) };
    }
    
    return { success: false, error: "Invalid password" };
}`,
        right: `function authenticate(username, password) {
    const user = await database.getUser(username);
    if (!user) {
        return { success: false, error: "User not found", code: 404 };
    }
    
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (isValid) {
        const token = generateToken(user);
        await logLogin(user.id);
        return { success: true, token: token, userId: user.id };
    }
    
    return { success: false, error: "Invalid credentials", code: 401 };
}`
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

    /**
     * Simple syntax highlighting for a given text.
     * @param {string} text The text to highlight.
     * @returns {string} The HTML string with highlighted syntax.
     */
    const highlightSyntax = (text: string) => {
        if (syntaxMode === 'none' || !text) return text;

        // Simple syntax highlighting
        let highlighted = text;

        // Keywords
        const keywords = /\b(function|const|let|var|if|else|return|await|async|for|while|true|false|null|undefined)\b/g;
        highlighted = highlighted.replace(keywords, '<span class="text-purple-400">$1</span>');

        // Strings
        const strings = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
        highlighted = highlighted.replace(strings, '<span class="text-green-400">$&</span>');

        // Numbers
        const numbers = /\b\d+\b/g;
        highlighted = highlighted.replace(numbers, '<span class="text-blue-400">$&</span>');

        return highlighted;
    };

    /**
     * Copies text to the clipboard and shows a confirmation.
     * @param {string} text The text to copy.
     * @param {'left' | 'right'} side The side from which text is being copied.
     */
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
    };

    const clearAll = () => {
        setLeftText('');
        setRightText('');
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
            .replace(/\t/g, '→')
            .replace(/\n/g, '↵\n');
    };

    const convertToBytes = (text: string | undefined) => {
        const bytes = new TextEncoder().encode(text);
        return Array.from(bytes).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
    };

    return (
        <div className="min-h-screen bg-black text-white pt-20">
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
                            {/* FIX: Added checkbox for ignoring whitespace */}
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
                            <button
                                onClick={downloadDiff}
                                className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg text-sm transition-all flex items-center space-x-2"
                            >
                                <Download className="w-4 h-4" />
                                <span>Export</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Bar */}
            {(leftText || rightText) && (
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
                {/* Input Mode */}
                {!leftText && !rightText ? (
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
                    </div>
                ) : (
                    /* Diff View */
                    <div className="max-w-7xl mx-auto">
                        {viewMode === 'side-by-side' && (
                            <div className="grid lg:grid-cols-2 divide-x divide-gray-800">
                                <div className="overflow-auto">
                                    <div className="sticky top-0 z-10 p-3 bg-gray-900/95 border-b border-gray-800 backdrop-blur-sm">
                                        <h3 className="font-semibold text-white">Original</h3>
                                    </div>
                                    <div className="p-4">
                                        {computeDiff.map((line, index) => (
                                            <div
                                                key={index}
                                                className={`font-mono text-sm whitespace-pre-wrap ${getLineBackground(line.type === 'added' ? '' : line.type)}`}
                                            >
                                                <div className="flex">
                                                    {showLineNumbers && (
                                                        <span className="w-12 text-gray-500 text-right pr-4 select-none">
                                                            {line.leftLineNum || ''}
                                                        </span>
                                                    )}
                                                    <div className="flex-1 px-2">
                                                        {line.type !== 'added' && (
                                                            syntaxMode !== 'none'
                                                                ? <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlightSyntax(line.leftLine)) }} />
                                                                : renderWhitespace(line.leftLine)
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="overflow-auto">
                                    <div className="sticky top-0 z-10 p-3 bg-gray-900/95 border-b border-gray-800 backdrop-blur-sm">
                                        <h3 className="font-semibold text-white">Modified</h3>
                                    </div>
                                    <div className="p-4">
                                        {computeDiff.map((line, index) => (
                                            <div
                                                key={index}
                                                className={`font-mono text-sm whitespace-pre-wrap ${getLineBackground(line.type === 'removed' ? '' : line.type)}`}
                                            >
                                                <div className="flex">
                                                    {showLineNumbers && (
                                                        <span className="w-12 text-gray-500 text-right pr-4 select-none">
                                                            {line.rightLineNum || ''}
                                                        </span>
                                                    )}
                                                    <div className="flex-1 px-2">
                                                        {line.type !== 'removed' && (
                                                            syntaxMode !== 'none'
                                                                ? <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlightSyntax(line.rightLine)) }} />
                                                                : renderWhitespace(line.rightLine)
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
                                        key={index}
                                        className={`font-mono text-sm whitespace-pre-wrap ${getLineBackground(line.type)}`}
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
                                                    ? <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlightSyntax(line.type === 'removed' ? line.leftLine : line.rightLine)) }} />
                                                    : renderWhitespace(line.type === 'removed' ? line.leftLine : line.rightLine)
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
                                            <div className="font-mono text-xs text-orange-400 break-all">
                                                {convertToBytes(leftText)}
                                            </div>
                                        </div>
                                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-3">Modified (Hex)</h4>
                                            <div className="font-mono text-xs text-orange-400 break-all">
                                                {convertToBytes(rightText)}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <Info className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                                        <p>Inline view is available in bytes mode</p>
                                        <button
                                            onClick={() => setDiffMode('bytes')}
                                            className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-all"
                                        >
                                            Switch to Bytes Mode
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextDiffTool;