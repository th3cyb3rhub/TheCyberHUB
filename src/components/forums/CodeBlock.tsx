'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useMemo } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    className?: string;
}

// Language display names
const LANGUAGE_NAMES: Record<string, string> = {
    javascript: 'JavaScript',
    js: 'JavaScript',
    typescript: 'TypeScript',
    ts: 'TypeScript',
    python: 'Python',
    py: 'Python',
    bash: 'Bash',
    sh: 'Shell',
    shell: 'Shell',
    c: 'C',
    cpp: 'C++',
    'c++': 'C++',
    sql: 'SQL',
    php: 'PHP',
    ruby: 'Ruby',
    rb: 'Ruby',
    go: 'Go',
    rust: 'Rust',
    rs: 'Rust',
    java: 'Java',
    json: 'JSON',
    yaml: 'YAML',
    yml: 'YAML',
    html: 'HTML',
    css: 'CSS',
    markdown: 'Markdown',
    md: 'Markdown',
    text: 'Text',
    plaintext: 'Text',
};

// Basic syntax highlighting by language
const KEYWORDS: Record<string, string[]> = {
    javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'this', 'class', 'extends', 'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'throw', 'finally', 'typeof', 'instanceof', 'in', 'of', 'null', 'undefined', 'true', 'false', 'yield'],
    typescript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'this', 'class', 'extends', 'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'throw', 'finally', 'typeof', 'instanceof', 'in', 'of', 'null', 'undefined', 'true', 'false', 'interface', 'type', 'enum', 'as', 'implements', 'private', 'public', 'protected', 'readonly'],
    python: ['def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'break', 'continue', 'import', 'from', 'as', 'try', 'except', 'finally', 'raise', 'with', 'lambda', 'yield', 'pass', 'None', 'True', 'False', 'and', 'or', 'not', 'in', 'is', 'global', 'nonlocal', 'async', 'await', 'self'],
    bash: ['if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done', 'case', 'esac', 'function', 'return', 'exit', 'echo', 'export', 'source', 'local', 'readonly', 'set', 'unset', 'shift', 'cd', 'pwd', 'ls', 'cat', 'grep', 'sed', 'awk', 'find', 'chmod', 'chown', 'sudo', 'apt', 'yum', 'curl', 'wget'],
    sql: ['SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER', 'TABLE', 'INDEX', 'VIEW', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'BETWEEN', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'AS', 'NULL', 'SET', 'VALUES', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'UNION', 'EXISTS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'],
    go: ['func', 'package', 'import', 'return', 'if', 'else', 'for', 'range', 'switch', 'case', 'break', 'continue', 'default', 'defer', 'go', 'chan', 'select', 'type', 'struct', 'interface', 'map', 'make', 'new', 'var', 'const', 'true', 'false', 'nil', 'error'],
    rust: ['fn', 'let', 'mut', 'const', 'struct', 'enum', 'impl', 'trait', 'pub', 'use', 'mod', 'crate', 'self', 'super', 'if', 'else', 'for', 'while', 'loop', 'match', 'return', 'break', 'continue', 'as', 'in', 'ref', 'move', 'async', 'await', 'true', 'false', 'Some', 'None', 'Ok', 'Err', 'where', 'type', 'unsafe'],
    java: ['public', 'private', 'protected', 'static', 'final', 'abstract', 'class', 'interface', 'extends', 'implements', 'new', 'this', 'super', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'throw', 'throws', 'finally', 'import', 'package', 'void', 'int', 'long', 'double', 'float', 'boolean', 'char', 'String', 'null', 'true', 'false'],
};

// Alias map
const LANG_ALIAS: Record<string, string> = {
    js: 'javascript', ts: 'typescript', py: 'python', sh: 'bash', shell: 'bash',
    rb: 'ruby', rs: 'rust', 'c++': 'cpp', yml: 'yaml',
};

interface TokenSpan {
    text: string;
    className: string;
}

function tokenizeLine(line: string, lang: string): TokenSpan[] {
    const normalizedLang = LANG_ALIAS[lang] || lang;
    const keywords = KEYWORDS[normalizedLang] || [];
    if (keywords.length === 0 || lang === 'text' || lang === 'plaintext') {
        return [{ text: line, className: 'text-gray-300' }];
    }

    const tokens: TokenSpan[] = [];
    // Regex: strings, comments, numbers, keywords, rest
    const pattern = /(\/\/.*$|#.*$|--.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b\d+\.?\d*\b|\b\w+\b|[^\s\w]+|\s+)/gm;
    let match;

    while ((match = pattern.exec(line)) !== null) {
        const token = match[0];

        // Comments
        if (token.startsWith('//') || (token.startsWith('#') && (normalizedLang === 'python' || normalizedLang === 'bash')) || token.startsWith('--')) {
            tokens.push({ text: token, className: 'text-gray-500 italic' });
        }
        // Strings
        else if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'")) || (token.startsWith('`') && token.endsWith('`'))) {
            tokens.push({ text: token, className: 'text-green-400' });
        }
        // Numbers
        else if (/^\d+\.?\d*$/.test(token)) {
            tokens.push({ text: token, className: 'text-purple-400' });
        }
        // Keywords (case-sensitive for SQL we check both)
        else if (keywords.includes(token) || (normalizedLang === 'sql' && keywords.includes(token.toUpperCase()))) {
            tokens.push({ text: token, className: 'text-blue-400 font-medium' });
        }
        // Function calls pattern: word followed by (
        else if (/^\w+$/.test(token)) {
            // Check if next char after this token would be a paren (peek ahead)
            const nextCharIdx = (match.index || 0) + token.length;
            if (nextCharIdx < line.length && line[nextCharIdx] === '(') {
                tokens.push({ text: token, className: 'text-yellow-300' });
            } else {
                tokens.push({ text: token, className: 'text-gray-300' });
            }
        }
        // Operators and punctuation
        else if (/^[^\s\w]+$/.test(token)) {
            tokens.push({ text: token, className: 'text-orange-300' });
        }
        // Whitespace and other
        else {
            tokens.push({ text: token, className: '' });
        }
    }

    return tokens.length > 0 ? tokens : [{ text: line, className: 'text-gray-300' }];
}

export default function CodeBlock({
    code,
    language = 'text',
    showLineNumbers = true,
    className,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.split('\n');
    const displayLanguage = LANGUAGE_NAMES[language.toLowerCase()] || language;

    const tokenizedLines = useMemo(() => {
        return lines.map(line => tokenizeLine(line, language.toLowerCase()));
    }, [code, language]);

    return (
        <div className={cn('relative group rounded-lg overflow-hidden', className)}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-800 border-b border-white/10">
                <span className="text-xs text-gray-400 font-mono">{displayLanguage}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-400 hover:text-white rounded transition-colors"
                    aria-label="Copy code"
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

            {/* Code */}
            <div className="overflow-x-auto bg-neutral-900">
                <pre className="p-4 text-sm font-mono">
                    <code>
                        {tokenizedLines.map((tokens, i) => (
                            <div key={i} className="flex">
                                {showLineNumbers && (
                                    <span className="select-none text-gray-600 text-right pr-4 min-w-[3ch]">
                                        {i + 1}
                                    </span>
                                )}
                                <span className="whitespace-pre">
                                    {tokens.map((token, j) => (
                                        <span key={j} className={token.className}>{token.text}</span>
                                    ))}
                                    {tokens.length === 0 && ' '}
                                </span>
                            </div>
                        ))}
                    </code>
                </pre>
            </div>
        </div>
    );
}
