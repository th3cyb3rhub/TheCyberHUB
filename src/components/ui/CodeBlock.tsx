"use client"

import React, { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
    code: string;
    language?: string;
    description?: string;
    className?: string;
    showLineNumbers?: boolean;
}

/**
 * Reusable code block with copy-to-clipboard and syntax highlighting.
 * Highlights shell commands, SQL keywords, HTML tags, and JS keywords.
 */
const CodeBlock: React.FC<CodeBlockProps> = ({
    code,
    language,
    description,
    className = '',
    showLineNumbers = false,
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [code]);

    const highlightSyntax = (text: string, lang?: string): React.ReactNode => {
        const detectedLang = lang || detectLanguage(text);

        switch (detectedLang) {
            case 'sql':
                return highlightSQL(text);
            case 'html':
            case 'xml':
                return highlightHTML(text);
            case 'bash':
            case 'shell':
            case 'sh':
                return highlightShell(text);
            case 'javascript':
            case 'js':
                return highlightJS(text);
            case 'python':
            case 'py':
                return highlightPython(text);
            default:
                return text;
        }
    };

    const lines = code.split('\n');

    return (
        <div className={`group relative rounded-lg bg-black/50 border border-white/10 overflow-hidden ${className}`}>
            {/* Header with language badge and copy button */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    {language && (
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                            {language}
                        </span>
                    )}
                    {description && (
                        <span className="text-xs text-gray-400">{description}</span>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-white rounded transition-all opacity-0 group-hover:opacity-100"
                    title="Copy to clipboard"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-green-400">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code content */}
            <pre className="p-3 overflow-x-auto text-sm font-mono leading-relaxed">
                <code>
                    {showLineNumbers ? (
                        lines.map((line, i) => (
                            <div key={i} className="flex">
                                <span className="inline-block w-8 text-right mr-4 text-gray-600 select-none shrink-0">
                                    {i + 1}
                                </span>
                                <span className="text-orange-400">{highlightSyntax(line, language)}</span>
                            </div>
                        ))
                    ) : (
                        <span className="text-orange-400">{highlightSyntax(code, language)}</span>
                    )}
                </code>
            </pre>
        </div>
    );
};

// Language detection heuristic
function detectLanguage(text: string): string {
    const lower = text.toLowerCase();
    if (/^(select|insert|update|delete|create|drop|alter)\b/i.test(lower)) return 'sql';
    if (/<\/?[a-z][\s>]/i.test(text)) return 'html';
    if (/^(\$|#|sudo |apt |yum |dnf |brew |curl |wget |nmap |chmod )/m.test(text)) return 'bash';
    if (/\b(import|from|def|class|print)\b/.test(text) && /:\s*$/m.test(text)) return 'python';
    if (/\b(const|let|var|function|=>|console\.)\b/.test(text)) return 'javascript';
    return 'text';
}

// SQL syntax highlighting
function highlightSQL(text: string): React.ReactNode {
    const keywords = /\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|AND|OR|NOT|IN|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP BY|ORDER BY|HAVING|LIMIT|UNION|CREATE|DROP|ALTER|TABLE|INDEX|INTO|VALUES|SET|NULL|AS|LIKE|BETWEEN|EXISTS|CASE|WHEN|THEN|ELSE|END|COUNT|SUM|AVG|MAX|MIN|DISTINCT|TOP)\b/gi;
    const parts = text.split(keywords);

    return parts.map((part, i) => {
        if (keywords.test(part)) {
            return <span key={i} className="text-blue-400 font-semibold">{part}</span>;
        }
        // String literals
        if (/^'[^']*'$/.test(part)) {
            return <span key={i} className="text-green-400">{part}</span>;
        }
        return <span key={i} className="text-orange-400">{part}</span>;
    });
}

// HTML syntax highlighting
function highlightHTML(text: string): React.ReactNode {
    const parts = text.split(/(<\/?[a-z][^>]*>)/gi);

    return parts.map((part, i) => {
        if (/^<\/?[a-z]/i.test(part)) {
            return <span key={i} className="text-red-400">{part}</span>;
        }
        return <span key={i} className="text-orange-400">{part}</span>;
    });
}

// Shell/bash syntax highlighting
function highlightShell(text: string): React.ReactNode {
    // Highlight comments
    if (text.trimStart().startsWith('#')) {
        return <span className="text-gray-500 italic">{text}</span>;
    }

    const parts = text.split(/(\s+)/);
    return parts.map((part, i) => {
        if (i === 0 || (i > 0 && parts.slice(0, i).every(p => /^\s*$/.test(p)))) {
            // Command name
            if (/^(sudo|nmap|curl|wget|grep|find|chmod|chown|cat|ls|cd|mkdir|rm|cp|mv|echo|export|ssh|scp|nc|tcpdump|iptables|systemctl|docker|git|npm|python|pip|apt|yum|dnf|brew|awk|sed|sort|uniq|wc|head|tail|tee|xargs)$/.test(part)) {
                return <span key={i} className="text-green-400 font-semibold">{part}</span>;
            }
        }
        // Flags
        if (/^-{1,2}[a-zA-Z]/.test(part)) {
            return <span key={i} className="text-yellow-400">{part}</span>;
        }
        // Pipes and redirects
        if (/^[|>&<]+$/.test(part)) {
            return <span key={i} className="text-purple-400">{part}</span>;
        }
        return <span key={i} className="text-orange-400">{part}</span>;
    });
}

// JavaScript syntax highlighting
function highlightJS(text: string): React.ReactNode {
    const keywords = /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|void|delete|yield)\b/g;
    const parts = text.split(keywords);

    return parts.map((part, i) => {
        if (keywords.test(part)) {
            return <span key={i} className="text-purple-400 font-semibold">{part}</span>;
        }
        return <span key={i} className="text-orange-400">{part}</span>;
    });
}

// Python syntax highlighting
function highlightPython(text: string): React.ReactNode {
    const keywords = /\b(def|class|import|from|return|if|elif|else|for|while|with|as|try|except|finally|raise|pass|break|continue|and|or|not|in|is|lambda|yield|global|nonlocal|assert|del|True|False|None|print|self)\b/g;
    const parts = text.split(keywords);

    return parts.map((part, i) => {
        if (keywords.test(part)) {
            return <span key={i} className="text-purple-400 font-semibold">{part}</span>;
        }
        return <span key={i} className="text-orange-400">{part}</span>;
    });
}

export default CodeBlock;
