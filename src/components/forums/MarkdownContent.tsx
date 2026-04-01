'use client';

import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import CodeBlock from './CodeBlock';

interface MarkdownContentProps {
    content: string;
    className?: string;
}

// Simple markdown parser for forums
export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
    const rendered = useMemo(() => {
        return parseMarkdown(content);
    }, [content]);

    return (
        <div
            className={`prose prose-invert prose-sm max-w-none ${className}`}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rendered) }}
        />
    );
}

// Parse markdown to HTML with code block handling
function parseMarkdown(text: string): string {
    // Extract code blocks first to protect them
    const codeBlocks: { placeholder: string; html: string }[] = [];
    let blockIndex = 0;

    // Handle fenced code blocks ```language\ncode\n```
    text = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        const placeholder = `__CODE_BLOCK_${blockIndex}__`;
        const language = lang || 'text';
        const escapedCode = escapeHtml(code.trim());

        codeBlocks.push({
            placeholder,
            html: `<div class="code-block-wrapper my-4" data-language="${language}" data-code="${encodeURIComponent(escapedCode)}"></div>`,
        });
        blockIndex++;
        return placeholder;
    });

    // Handle inline code `code`
    text = text.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-white/10 rounded text-orange-400 text-sm font-mono">$1</code>');

    // Handle headers
    text = text.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-white mt-6 mb-2">$1</h3>');
    text = text.replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-white mt-6 mb-3">$1</h2>');
    text = text.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-6 mb-4">$1</h1>');

    // Handle bold and italic
    text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    text = text.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');
    text = text.replace(/__(.+?)__/g, '<strong class="text-white">$1</strong>');
    text = text.replace(/_(.+?)_/g, '<em>$1</em>');

    // Handle strikethrough
    text = text.replace(/~~(.+?)~~/g, '<del class="text-gray-500">$1</del>');

    // Handle links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-orange-400 hover:text-orange-300 underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // Handle images
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-4" />');

    // Handle blockquotes
    text = text.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-orange-500/50 pl-4 py-1 my-4 text-gray-400 italic">$1</blockquote>');

    // Handle unordered lists
    text = text.replace(/^[\*\-] (.+)$/gm, '<li class="ml-4 list-disc text-gray-300">$1</li>');
    text = text.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="my-4 space-y-1">$&</ul>');

    // Handle ordered lists
    text = text.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-gray-300">$1</li>');

    // Handle horizontal rules
    text = text.replace(/^---$/gm, '<hr class="border-white/10 my-6" />');

    // Handle paragraphs (double newlines)
    text = text.replace(/\n\n/g, '</p><p class="text-gray-300 leading-relaxed mb-4">');
    text = '<p class="text-gray-300 leading-relaxed mb-4">' + text + '</p>';

    // Clean up empty paragraphs
    text = text.replace(/<p[^>]*>\s*<\/p>/g, '');

    // Handle single newlines as line breaks within paragraphs
    text = text.replace(/\n/g, '<br />');

    // Restore code blocks
    codeBlocks.forEach(({ placeholder, html }) => {
        text = text.replace(placeholder, html);
    });

    return text;
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Component to render code blocks from the parsed HTML
export function CodeBlockRenderer({ content }: { content: string }) {
    const parts = useMemo(() => {
        const result: Array<{ type: 'html' | 'code'; content: string; language?: string }> = [];
        const regex = /<div class="code-block-wrapper[^"]*" data-language="([^"]*)" data-code="([^"]*)"><\/div>/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(content)) !== null) {
            // Add HTML before this code block
            if (match.index > lastIndex) {
                result.push({ type: 'html', content: content.slice(lastIndex, match.index) });
            }
            // Add code block
            result.push({
                type: 'code',
                content: decodeURIComponent(match[2]),
                language: match[1],
            });
            lastIndex = match.index + match[0].length;
        }

        // Add remaining HTML
        if (lastIndex < content.length) {
            result.push({ type: 'html', content: content.slice(lastIndex) });
        }

        return result;
    }, [content]);

    return (
        <>
            {parts.map((part, i) =>
                part.type === 'code' ? (
                    <CodeBlock key={i} code={part.content} language={part.language} />
                ) : (
                    <div key={i} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(part.content) }} />
                )
            )}
        </>
    );
}
