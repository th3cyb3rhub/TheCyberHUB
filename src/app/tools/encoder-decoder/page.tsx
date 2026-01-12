"use client"

import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Copy, Check, Binary } from 'lucide-react';
import ToolPageLayout from '@/components/ui/ToolPageLayout';

const EncoderDecoderTool = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [method, setMethod] = useState('base64');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [copied, setCopied] = useState(false);

    const methods = [
        { id: 'base64', name: 'Base64' },
        { id: 'url', name: 'URL Encoding' },
        { id: 'html', name: 'HTML Entities' },
        { id: 'hex', name: 'Hexadecimal' },
        { id: 'binary', name: 'Binary' },
        { id: 'rot13', name: 'ROT13' },
    ];

    const encode = (text: string, type: string): string => {
        try {
            switch (type) {
                case 'base64': return btoa(unescape(encodeURIComponent(text)));
                case 'url': return encodeURIComponent(text);
                case 'html': return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                case 'hex': return Array.from(new TextEncoder().encode(text)).map(b => b.toString(16).padStart(2, '0')).join(' ');
                case 'binary': return Array.from(new TextEncoder().encode(text)).map(b => b.toString(2).padStart(8, '0')).join(' ');
                case 'rot13': return text.replace(/[a-zA-Z]/g, c => { const code = c.charCodeAt(0) + 13; const base = c <= 'Z' ? 90 : 122; return String.fromCharCode(base >= code ? code : code - 26); });
                default: return text;
            }
        } catch { return 'Error encoding'; }
    };

    const decode = (text: string, type: string): string => {
        try {
            switch (type) {
                case 'base64': return decodeURIComponent(escape(atob(text)));
                case 'url': return decodeURIComponent(text);
                case 'html': return text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
                case 'hex': { const h = text.replace(/\s/g, '').match(/.{1,2}/g) || []; return new TextDecoder().decode(new Uint8Array(h.map(b => parseInt(b, 16)))); }
                case 'binary': { const b = text.replace(/\s/g, '').match(/.{1,8}/g) || []; return new TextDecoder().decode(new Uint8Array(b.map(x => parseInt(x, 2)))); }
                case 'rot13': return text.replace(/[a-zA-Z]/g, c => { const code = c.charCodeAt(0) + 13; const base = c <= 'Z' ? 90 : 122; return String.fromCharCode(base >= code ? code : code - 26); });
                default: return text;
            }
        } catch { return 'Error decoding'; }
    };

    useEffect(() => {
        if (!input) { setOutput(''); return; }
        setOutput(mode === 'encode' ? encode(input, method) : decode(input, method));
    }, [input, method, mode]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const swapInputOutput = () => {
        setInput(output);
        setMode(mode === 'encode' ? 'decode' : 'encode');
    };

    return (
        <ToolPageLayout
            title="Encoder / Decoder"
            description="Encode and decode text using various formats for security testing and data transformation."
            icon={Binary}
            badge="Utility Tool"
            tags={[
                { label: 'Encoding', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
                { label: 'Utility', color: 'bg-green-500/10 text-green-400 border-green-500/30' },
            ]}
        >
            {/* Controls */}
            <div className="mb-6 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm text-gray-400 mb-2">Method</label>
                        <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none">
                            {methods.map((m) => <option key={m.id} value={m.id} className="bg-neutral-900">{m.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Mode</label>
                        <div className="flex rounded-lg border border-white/10 overflow-hidden">
                            <button onClick={() => setMode('encode')} className={`px-4 py-2.5 text-sm font-medium transition-colors ${mode === 'encode' ? 'bg-orange-500 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}>Encode</button>
                            <button onClick={() => setMode('decode')} className={`px-4 py-2.5 text-sm font-medium transition-colors ${mode === 'decode' ? 'bg-orange-500 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}>Decode</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input/Output */}
            <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                    <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
                        <span className="text-sm text-gray-400">Input</span>
                        <span className="text-xs text-gray-600">{input.length} chars</span>
                    </div>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text..." className="w-full h-32 px-4 py-3 bg-transparent text-white placeholder:text-gray-600 focus:outline-none resize-none font-mono text-sm" />
                </div>
                <div className="flex justify-center">
                    <button onClick={swapInputOutput} className="p-2 rounded-lg border border-white/10 hover:border-orange-500/50 text-gray-400 hover:text-orange-500 transition-colors"><ArrowLeftRight className="w-5 h-5" /></button>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                    <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
                        <span className="text-sm text-gray-400">Output</span>
                        <button onClick={copyToClipboard} disabled={!output} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white disabled:opacity-50 transition-colors">
                            {copied ? <><Check className="w-4 h-4 text-green-500" /><span className="text-green-500">Copied</span></> : <><Copy className="w-4 h-4" /><span>Copy</span></>}
                        </button>
                    </div>
                    <div className="w-full h-32 px-4 py-3 font-mono text-sm text-orange-500 overflow-auto whitespace-pre-wrap break-all">
                        {output || <span className="text-gray-600">Output will appear here...</span>}
                    </div>
                </div>
            </div>
        </ToolPageLayout>
    );
};

export default EncoderDecoderTool;
