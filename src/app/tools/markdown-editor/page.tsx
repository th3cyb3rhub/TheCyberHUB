/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import {
    FileText,
    Download,
    Copy,
    Eye,
    EyeOff,
    RotateCcw,
    Save,
    Upload,
    Maximize2,
    Minimize2,
    Bold,
    Italic,
    Link,
    List,
    ListOrdered,
    Quote,
    Code,
    Heading1,
    Heading2,
    Table
} from 'lucide-react';

const MarkdownEditorPage = () => {
    const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

This is a **simple** and *elegant* markdown editor built for professionals.

## Features

- Live preview
- Clean interface
- Export options
- Professional design

### Code Example

\`\`\`bash
nmap -sS -sV target.com
\`\`\`

### Checklist

- [x] Input validation
- [x] Clean interface
- [ ] Advanced features
- [ ] Plugin support

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

[Learn more about TheCyberHub](https://thecyberhub.org)
`);

    const [preview, setPreview] = useState('');
    const [showPreview, setShowPreview] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [, setSecurityWarnings] = useState<string[]>([]);

    // HTML entity escaping function
    const escapeHtml = (text: string): string => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    // URL validation function
    const isValidUrl = (url: string): boolean => {
        try {
            const urlObj = new URL(url);
            // Only allow http, https, and mailto protocols
            return ['http:', 'https:', 'mailto:'].includes(urlObj.protocol);
        } catch {
            return false;
        }
    };

    // Silent security scanning function (no user warnings)
    const scanForSecurityIssues = (content: string): string[] => {
        // Still scan for security issues but don't display warnings to user
        // This is for internal logging/monitoring only
        const warnings: string[] = [];
        const dangerousPatterns = [
            /<script/i, /javascript:/i, /on\w+\s*=/i, /<iframe/i,
            /<object/i, /<embed/i, /<form/i, /data:/i, /vbscript:/i
        ];

        dangerousPatterns.forEach((pattern) => {
            if (pattern.test(content)) {
                warnings.push('potentially unsafe content detected');
            }
        });

        return warnings; // Used internally, not shown to user
    };

    // Secure markdown to HTML converter
    const convertMarkdownToHTML = (md: string): string => {
        // Silently scan for security issues (for internal monitoring)
        const warnings = scanForSecurityIssues(md);
        setSecurityWarnings(warnings);

        // Escape HTML entities first to prevent XSS
        let html = escapeHtml(md);

        // Process tables first (before other replacements)
        html = processMarkdownTables(html);

        // Process lists properly (before other replacements)
        html = processMarkdownLists(html);

        // Now safely convert markdown syntax
        html = html
            // Headers (after escaping, so &lt; becomes safe)
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-white mb-2 mt-4">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-white mb-3 mt-6">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-white mb-4 mt-6">$1</h1>')

            // Bold and Italic (safe after escaping)
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic text-gray-300">$1</em>')

            // Safe Links - validate URLs silently
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
                const decodedUrl = url.replace(/&amp;/g, '&');
                if (isValidUrl(decodedUrl)) {
                    return `<a href="${escapeHtml(decodedUrl)}" class="text-orange-400 hover:text-orange-300 underline" target="_blank" rel="noopener noreferrer">${text}</a>`;
                } else {
                    // Just show as plain text without indicating it's blocked
                    return `<span class="text-gray-300">${text}</span>`;
                }
            })

            // Code blocks (safe)
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 border border-gray-700 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-green-400 text-sm font-mono">$2</code></pre>')
            .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-orange-400 px-2 py-1 rounded text-sm font-mono">$1</code>')

            // Checkboxes (safe)
            .replace(/^\- \[x\] (.*$)/gim, '<li class="text-gray-300 mb-1 flex items-center"><span class="text-green-400 mr-2">✓</span>$1</li>')
            .replace(/^\- \[ \] (.*$)/gim, '<li class="text-gray-300 mb-1 flex items-center"><span class="text-gray-500 mr-2">☐</span>$1</li>')

            // Blockquotes (safe)
            .replace(/^&gt; (.*$)/gim, '<blockquote class="border-l-4 border-orange-500 pl-4 my-4 text-gray-300 italic">$1</blockquote>')

            // Horizontal rules (safe)
            .replace(/^---\s*$/gm, '<hr class="border-gray-700 my-6">')
            .replace(/^\*\*\*\s*$/gm, '<hr class="border-gray-700 my-6">')
            .replace(/^___\s*$/gm, '<hr class="border-gray-700 my-6">')

            // Clean up multiple line breaks and convert to proper spacing
            .replace(/\n\s*\n/g, '\n\n') // Clean up multiple newlines
            .replace(/\n\n/g, '</p><p class="mb-4">') // Paragraph breaks
            .replace(/\n/g, ' '); // Single newlines become spaces

        // Wrap content in paragraphs
        html = '<p class="mb-4">' + html + '</p>';

        // Clean up empty paragraphs
        html = html.replace(/<p class="mb-4"><\/p>/g, '');
        html = html.replace(/<p class="mb-4">\s*<\/p>/g, '');

        return html;
    };

    // Process markdown tables properly
    const processMarkdownTables = (text: string): string => {
        const lines = text.split('\n');
        const result = [];
        let i = 0;

        while (i < lines.length) {
            const line = lines[i];

            // Check if this line starts a table
            if (line.includes('|') && line.trim().startsWith('|') && line.trim().endsWith('|')) {
                // Found start of table, collect all table rows
                const tableRows = [];
                let isFirstRow = true;

                while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
                    const currentLine = lines[i].trim();

                    // Skip separator rows (like |---|---|)
                    if (currentLine.match(/^\|[\s\-:]+\|$/)) {
                        i++;
                        continue;
                    }

                    // Parse table row
                    const cells = currentLine.slice(1, -1).split('|').map(cell => cell.trim());
                    const cellTag = isFirstRow ? 'th' : 'td';
                    const cellClass = isFirstRow
                        ? 'px-4 py-3 text-orange-400 font-semibold border-b-2 border-orange-500 bg-gray-800'
                        : 'px-4 py-2 text-gray-300 border-b border-gray-700';

                    const cellElements = cells.map(cell => `<${cellTag} class="${cellClass}">${cell}</${cellTag}>`).join('');
                    tableRows.push(`<tr>${cellElements}</tr>`);

                    isFirstRow = false;
                    i++;
                }

                // Create complete table
                if (tableRows.length > 0) {
                    const tableHtml = `<table class="w-full border-collapse border border-gray-700 my-6 bg-gray-900/50 rounded-lg overflow-hidden">
                        ${tableRows.join('')}
                    </table>`;
                    result.push(tableHtml);
                }
            } else {
                result.push(line);
                i++;
            }
        }

        return result.join('\n');
    };

    // Process markdown lists properly
    const processMarkdownLists = (text: string): string => {
        const lines = text.split('\n');
        const result = [];
        let i = 0;

        while (i < lines.length) {
            const line = lines[i];

            // Check if this line starts a list
            if (line.match(/^[\s]*[\-\*\+]\s/) || line.match(/^[\s]*\d+\.\s/)) {
                // Found start of list, collect all list items
                const listItems = [];

                while (i < lines.length) {
                    const currentLine = lines[i];

                    // Check if it's a list item
                    const listMatch = currentLine.match(/^(\s*)([\-\*\+]|\d+\.)\s+(.+)/);
                    if (listMatch) {
                        const [, indent, marker, content] = listMatch;
                        const level = Math.floor(indent.length / 2);
                        const isNumbered = marker.includes('.');

                        listItems.push({
                            content: content.trim(),
                            level,
                            isNumbered,
                            indent: indent.length
                        });
                        i++;
                    } else if (currentLine.trim() === '') {
                        // Empty line, continue looking for more list items
                        i++;
                        // If next line is not a list item, break
                        if (i < lines.length && !lines[i].match(/^[\s]*[\-\*\+\d]/)) {
                            break;
                        }
                    } else {
                        // Not a list item, break
                        break;
                    }
                }

                // Convert list items to HTML
                if (listItems.length > 0) {
                    let listHtml = '<ul class="space-y-2 my-4">';

                    for (const item of listItems) {
                        const marginClass = item.level > 0 ? `ml-${item.level * 4}` : '';
                        listHtml += `<li class="text-gray-300 ${marginClass}">• ${item.content}</li>`;
                    }

                    listHtml += '</ul>';
                    result.push(listHtml);
                }
            } else {
                result.push(line);
                i++;
            }
        }

        return result.join('\n');
    };

    useEffect(() => {
        const html = convertMarkdownToHTML(markdown);
        setPreview(html);

        const words = markdown.trim().split(/\s+/).filter(word => word.length > 0).length;
        setWordCount(words);
        setCharCount(markdown.length);
    }, [markdown]);

    const insertText = (before: string, after: string = '') => {
        const textarea = document.getElementById('markdown-input') as HTMLTextAreaElement;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = markdown.substring(start, end);
        const newText = markdown.substring(0, start) + before + selectedText + after + markdown.substring(end);
        setMarkdown(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
        }, 0);
    };

    const toolbarActions = [
        { icon: Heading1, action: () => insertText('# '), title: 'Heading 1' },
        { icon: Heading2, action: () => insertText('## '), title: 'Heading 2' },
        { icon: Bold, action: () => insertText('**', '**'), title: 'Bold' },
        { icon: Italic, action: () => insertText('*', '*'), title: 'Italic' },
        { icon: Link, action: () => insertText('[', '](https://example.com)'), title: 'Link' },
        { icon: Code, action: () => insertText('`', '`'), title: 'Inline Code' },
        { icon: Quote, action: () => insertText('> '), title: 'Quote' },
        { icon: List, action: () => insertText('- '), title: 'Bullet List' },
        { icon: ListOrdered, action: () => insertText('1. '), title: 'Numbered List' },
        { icon: Table, action: () => insertText('| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n'), title: 'Table' }
    ];

    const downloadMarkdown = () => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.md';
        a.click();
        URL.revokeObjectURL(url);
    };

    const downloadHTML = () => {
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Document</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
            background: #f9f9f9;
        }
        h1, h2, h3 { color: #2c3e50; margin-top: 2rem; }
        code { 
            background: #f4f4f4; 
            padding: 2px 4px; 
            border-radius: 4px; 
            font-family: 'Courier New', monospace;
        }
        pre { 
            background: #f4f4f4; 
            padding: 16px; 
            border-radius: 8px; 
            overflow-x: auto; 
            border: 1px solid #ddd;
        }
        blockquote { 
            border-left: 4px solid #3498db; 
            padding-left: 16px; 
            margin: 16px 0; 
            font-style: italic; 
            background: #f8f9fa;
            padding: 12px 16px;
        }
        a { color: #3498db; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    ${preview.replace(/<br>/g, '').replace(/class="[^"]*"/g, '')}
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.html';
        a.click();
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(markdown);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && (file.type === 'text/markdown' || file.name.endsWith('.md'))) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setMarkdown(content);
            };
            reader.readAsText(file);
        }
    };

    const clearEditor = () => {
        setMarkdown('');
        setSecurityWarnings([]);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <main className="pt-20 pb-8">
                <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isFullscreen ? 'max-w-none' : 'max-w-7xl'}`}>

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                                    <FileText className="h-6 w-6 text-black" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">Markdown Editor</h1>
                                    <p className="text-gray-400">Simple, fast, and reliable markdown editing</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                    title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                                >
                                    {isFullscreen ? <Minimize2 className="h-4 w-4 text-gray-400" /> : <Maximize2 className="h-4 w-4 text-gray-400" />}
                                </button>
                            </div>
                        </div>

                        {/* Toolbar */}
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                            <div className="flex flex-wrap items-center gap-2">
                                {/* File Actions */}
                                <div className="flex items-center space-x-1 mr-4">
                                    <label className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 cursor-pointer" title="Upload file">
                                        <Upload className="h-4 w-4 text-gray-400" />
                                        <input type="file" accept=".md,.markdown" onChange={handleFileUpload} className="hidden" />
                                    </label>
                                    <button onClick={downloadMarkdown} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200" title="Download Markdown">
                                        <Download className="h-4 w-4 text-gray-400" />
                                    </button>
                                    <button onClick={copyToClipboard} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200" title="Copy to clipboard">
                                        <Copy className="h-4 w-4 text-gray-400" />
                                    </button>
                                    <button onClick={clearEditor} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200" title="Clear editor">
                                        <RotateCcw className="h-4 w-4 text-gray-400" />
                                    </button>
                                </div>

                                {/* Separator */}
                                <div className="w-px h-6 bg-gray-700 mr-4"></div>

                                {/* Format Actions */}
                                <div className="flex items-center space-x-1 mr-4">
                                    {toolbarActions.map((action, index) => (
                                        <button
                                            key={index}
                                            onClick={action.action}
                                            className="p-2 bg-gray-800 hover:bg-orange-500/20 hover:text-orange-400 rounded-lg transition-all duration-200"
                                            title={action.title}
                                        >
                                            <action.icon className="h-4 w-4 text-gray-400 hover:text-orange-400" />
                                        </button>
                                    ))}
                                </div>

                                {/* Separator */}
                                <div className="w-px h-6 bg-gray-700 mr-4"></div>

                                {/* View Actions */}
                                <div className="flex items-center space-x-1">
                                    <button
                                        onClick={() => setShowPreview(!showPreview)}
                                        className={`p-2 rounded-lg transition-all duration-200 ${showPreview ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                                        title={showPreview ? "Hide preview" : "Show preview"}
                                    >
                                        {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                    <button onClick={downloadHTML} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200" title="Export as HTML">
                                        <Save className="h-4 w-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                                <div className="flex items-center space-x-6 text-sm text-gray-400">
                                    <span>{wordCount} words</span>
                                    <span>{charCount} characters</span>
                                    <span>{markdown.split('\n').length} lines</span>
                                </div>
                                <div className="text-sm text-gray-400">
                                    {showPreview ? 'Split View' : 'Editor Only'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
                        {/* Markdown Input */}
                        <div className="bg-gray-950/60 border border-gray-800 rounded-xl overflow-hidden">
                            <div className="p-4 border-b border-gray-800 bg-gray-900/50">
                                <h3 className="text-white font-semibold flex items-center">
                                    <FileText className="h-4 w-4 mr-2 text-orange-400" />
                                    Editor
                                </h3>
                            </div>
                            <textarea
                                id="markdown-input"
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                placeholder="Start writing your markdown here..."
                                className="w-full h-96 lg:h-[600px] p-6 bg-transparent text-white font-mono text-sm leading-relaxed resize-none outline-none placeholder:text-gray-500"
                                spellCheck={false}
                            />
                        </div>

                        {/* Preview */}
                        {showPreview && (
                            <div className="bg-gray-950/60 border border-gray-800 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-gray-800 bg-gray-900/50">
                                    <h3 className="text-white font-semibold flex items-center">
                                        <Eye className="h-4 w-4 mr-2 text-orange-400" />
                                        Preview
                                    </h3>
                                </div>
                                <div
                                    className="p-6 h-96 lg:h-[600px] overflow-y-auto prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(preview) }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Quick Help */}
                    <div className="mt-8 bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                        <h3 className="text-white font-semibold mb-4">Quick Reference</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                                <h4 className="text-orange-400 font-medium mb-2">Headers</h4>
                                <div className="space-y-1 text-gray-400 font-mono">
                                    <div># Heading 1</div>
                                    <div>## Heading 2</div>
                                    <div>### Heading 3</div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-orange-400 font-medium mb-2">Emphasis</h4>
                                <div className="space-y-1 text-gray-400 font-mono">
                                    <div>**bold text**</div>
                                    <div>*italic text*</div>
                                    <div>`inline code`</div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-orange-400 font-medium mb-2">Lists</h4>
                                <div className="space-y-1 text-gray-400 font-mono">
                                    <div>- Bullet point</div>
                                    <div>1. Numbered list</div>
                                    <div>- [x] Checkbox</div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-orange-400 font-medium mb-2">Links & Code</h4>
                                <div className="space-y-1 text-gray-400 font-mono">
                                    <div>[Link](url)</div>
                                    <div>```code block```</div>
                                    <div>&gt; Blockquote</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MarkdownEditorPage;