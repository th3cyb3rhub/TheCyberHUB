'use client';

import { useState } from 'react';
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

    return (
        <div className={cn('relative group rounded-lg overflow-hidden', className)}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-800 border-b border-white/10">
                <span className="text-xs text-gray-400 font-mono">{displayLanguage}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-400 hover:text-white rounded transition-colors"
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
                        {lines.map((line, i) => (
                            <div key={i} className="flex">
                                {showLineNumbers && (
                                    <span className="select-none text-gray-600 text-right pr-4 min-w-[3ch]">
                                        {i + 1}
                                    </span>
                                )}
                                <span className="text-gray-300 whitespace-pre">{line || ' '}</span>
                            </div>
                        ))}
                    </code>
                </pre>
            </div>
        </div>
    );
}
