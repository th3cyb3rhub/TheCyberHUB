'use client';

import { Highlight, themes } from 'prism-react-renderer';

interface CodeHighlightProps {
    code: string;
    language: string;
    vulnerableLines?: number[];
    showHighlight?: boolean;
    maxLineWidth: number;
}

export default function CodeHighlight({
    code,
    language,
    vulnerableLines = [],
    showHighlight = false,
    maxLineWidth,
}: CodeHighlightProps) {
    return (
        <Highlight
            theme={themes.nightOwl}
            code={code}
            language={language}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} p-4 text-sm leading-relaxed`} style={{ ...style, background: 'transparent' }}>
                    {tokens.map((line, i) => {
                        const lineNum = i + 1;
                        const isHighlighted = showHighlight && vulnerableLines?.includes(lineNum);

                        return (
                            <div
                                key={i}
                                {...getLineProps({ line })}
                                className={`flex ${isHighlighted ? 'bg-red-500/15 -mx-4 px-4 border-l-2 border-red-500' : ''}`}
                            >
                                <span
                                    className={`inline-block text-right mr-4 select-none font-mono ${isHighlighted ? 'text-red-400' : 'text-gray-600'}`}
                                    style={{ minWidth: `${maxLineWidth + 0.5}ch` }}
                                >
                                    {lineNum}
                                </span>
                                <span className="whitespace-pre-wrap break-all">
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token })} />
                                    ))}
                                </span>
                            </div>
                        );
                    })}
                </pre>
            )}
        </Highlight>
    );
}
