// app/tools/encoder-decoder/page.tsx
"use client"

import React, { useState } from 'react';
import {
    ArrowLeftRight,
    Copy,
    Download,
    RefreshCw,
    ArrowLeft,
    Eye,
    Zap,
    Hash,
    Globe,
    Lock,
    Code,
    FileText,
    AlertTriangle,
    CheckCircle,
    Settings,
    Shuffle
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface MethodOption {
    key: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'checkbox';
    default: string | number | boolean;
    choices?: string[];
}

interface EncodingMethod {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: React.ReactNode;
    encode: (input: string, options?: Record<string, string | number | boolean>) => string;
    decode: (input: string, options?: Record<string, string | number | boolean>) => string;
    options?: MethodOption[];
    validation?: (input: string) => boolean;
    examples?: Array<{
        input: string;
        encoded: string;
        description: string;
    }>;
}

const EncoderDecoderTool = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('base64');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [copiedField, setCopiedField] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [methodOptions, setMethodOptions] = useState<Record<string, Record<string, string | number | boolean>>>({});
    const [batchMode, setBatchMode] = useState(false);
    const [batchInput, setBatchInput] = useState('');
    const [batchResults, setBatchResults] = useState<Array<{input: string, output: string, success: boolean}>>([]);
    const [autoDetect, setAutoDetect] = useState(false);
    const [detectedFormats, setDetectedFormats] = useState<string[]>([]);

    // Encoding Methods
    const encodingMethods: EncodingMethod[] = React.useMemo(() => [
        {
            id: 'base64',
            name: 'Base64',
            description: 'Standard Base64 encoding/decoding',
            category: 'Basic',
            icon: <Code className="w-4 h-4" />,
            encode: (input: string) => btoa(unescape(encodeURIComponent(input))),
            decode: (input: string) => {
                try {
                    return decodeURIComponent(escape(atob(input)));
                } catch {
                    throw new Error('Invalid Base64 string');
                }
            },
            validation: (input: string) => /^[A-Za-z0-9+/]*={0,2}$/.test(input),
            examples: [
                { input: 'Hello World', encoded: 'SGVsbG8gV29ybGQ=', description: 'Basic text encoding' },
                { input: 'admin:password', encoded: 'YWRtaW46cGFzc3dvcmQ=', description: 'Credentials encoding' }
            ]
        },
        {
            id: 'base64url',
            name: 'Base64 URL-Safe',
            description: 'URL-safe Base64 encoding (RFC 4648)',
            category: 'Basic',
            icon: <Globe className="w-4 h-4" />,
            encode: (input: string) => btoa(unescape(encodeURIComponent(input))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, ''),
            decode: (input: string) => {
                try {
                    let padded = input.replace(/-/g, '+').replace(/_/g, '/');
                    while (padded.length % 4) padded += '=';
                    return decodeURIComponent(escape(atob(padded)));
                } catch {
                    throw new Error('Invalid Base64 URL-safe string');
                }
            },
            validation: (input: string) => /^[A-Za-z0-9_-]*$/.test(input)
        },
        {
            id: 'url',
            name: 'URL Encoding',
            description: 'Percent-encoding for URLs',
            category: 'Web',
            icon: <Globe className="w-4 h-4" />,
            encode: (input: string) => encodeURIComponent(input),
            decode: (input: string) => {
                try {
                    return decodeURIComponent(input);
                } catch {
                    throw new Error('Invalid URL encoded string');
                }
            },
            validation: (input: string) => /^[A-Za-z0-9\-_.~%]*$/.test(input),
            examples: [
                { input: 'hello world', encoded: 'hello%20world', description: 'Space encoding' },
                { input: 'test@example.com', encoded: 'test%40example.com', description: 'Email encoding' }
            ]
        },
        {
            id: 'html',
            name: 'HTML Entities',
            description: 'HTML entity encoding/decoding',
            category: 'Web',
            icon: <Code className="w-4 h-4" />,
            encode: (input: string) => input
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;'),
            decode: (input: string) => input
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#x27;/g, "'")
                .replace(/&#39;/g, "'"),
            examples: [
                { input: '<script>alert("XSS")</script>', encoded: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;', description: 'XSS payload encoding' }
            ]
        },
        {
            id: 'unicode',
            name: 'Unicode Escape',
            description: 'Unicode escape sequences (\\uXXXX)',
            category: 'Advanced',
            icon: <Hash className="w-4 h-4" />,
            encode: (input: string) => input.split('').map(char => {
                const code = char.charCodeAt(0);
                return code > 127 ? `\\u${code.toString(16).padStart(4, '0')}` : char;
            }).join(''),
            decode: (input: string) => input.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) =>
                String.fromCharCode(parseInt(hex, 16))
            ),
            validation: (input: string) => /^[\x00-\x7F\\u[0-9a-fA-F]{4}]*$/.test(input)
        },
        {
            id: 'hex',
            name: 'Hexadecimal',
            description: 'Hexadecimal encoding/decoding',
            category: 'Basic',
            icon: <Hash className="w-4 h-4" />,
            encode: (input: string) => Array.from(new TextEncoder().encode(input))
                .map(byte => byte.toString(16).padStart(2, '0'))
                .join(''),
            decode: (input: string) => {
                try {
                    const hex = input.replace(/\s/g, '');
                    if (hex.length % 2 !== 0) throw new Error('Invalid hex length');
                    const bytes = [];
                    for (let i = 0; i < hex.length; i += 2) {
                        bytes.push(parseInt(hex.substr(i, 2), 16));
                    }
                    return new TextDecoder().decode(new Uint8Array(bytes));
                } catch {
                    throw new Error('Invalid hexadecimal string');
                }
            },
            validation: (input: string) => /^[0-9a-fA-F\s]*$/.test(input),
            options: [
                { key: 'uppercase', label: 'Uppercase', type: 'checkbox', default: false },
                { key: 'delimiter', label: 'Delimiter', type: 'select', default: 'none', choices: ['none', 'space', 'colon', '0x'] }
            ]
        },
        {
            id: 'binary',
            name: 'Binary',
            description: 'Binary encoding/decoding',
            category: 'Basic',
            icon: <Code className="w-4 h-4" />,
            encode: (input: string) => Array.from(new TextEncoder().encode(input))
                .map(byte => byte.toString(2).padStart(8, '0'))
                .join(' '),
            decode: (input: string) => {
                try {
                    const binary = input.replace(/\s/g, '');
                    if (binary.length % 8 !== 0) throw new Error('Invalid binary length');
                    const bytes = [];
                    for (let i = 0; i < binary.length; i += 8) {
                        bytes.push(parseInt(binary.substr(i, 8), 2));
                    }
                    return new TextDecoder().decode(new Uint8Array(bytes));
                } catch {
                    throw new Error('Invalid binary string');
                }
            },
            validation: (input: string) => /^[01\s]*$/.test(input)
        },
        {
            id: 'rot13',
            name: 'ROT13',
            description: 'ROT13 cipher encoding/decoding',
            category: 'Cipher',
            icon: <Shuffle className="w-4 h-4" />,
            encode: (input: string) => input.replace(/[a-zA-Z]/g, char => {
                const start = char <= 'Z' ? 65 : 97;
                return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
            }),
            decode: (input: string) => input.replace(/[a-zA-Z]/g, char => {
                const start = char <= 'Z' ? 65 : 97;
                return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
            }),
            examples: [
                { input: 'Hello World', encoded: 'Uryyb Jbeyq', description: 'Basic ROT13 encoding' }
            ]
        },
        {
            id: 'caesar',
            name: 'Caesar Cipher',
            description: 'Caesar cipher with custom shift',
            category: 'Cipher',
            icon: <Lock className="w-4 h-4" />,
            encode: (input: string, options: Record<string, string | number | boolean> = {}) => {
                const shift = (options?.shift as number) || 3;
                return input.replace(/[a-zA-Z]/g, char => {
                    const start = char <= 'Z' ? 65 : 97;
                    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
                });
            },
            decode: (input: string, options: Record<string, string | number | boolean> = {}) => {
                const shift = (options?.shift as number) || 3;
                return input.replace(/[a-zA-Z]/g, char => {
                    const start = char <= 'Z' ? 65 : 97;
                    return String.fromCharCode(((char.charCodeAt(0) - start - shift + 26) % 26) + start);
                });
            },
            options: [
                { key: 'shift', label: 'Shift Value', type: 'number', default: 3 }
            ]
        },
        {
            id: 'jwt-decode',
            name: 'JWT Decode',
            description: 'JWT token header and payload decoding',
            category: 'Security',
            icon: <Lock className="w-4 h-4" />,
            encode: () => 'JWT encoding not supported - use JWT creation tools',
            decode: (input: string) => {
                try {
                    const parts = input.split('.');
                    if (parts.length !== 3) throw new Error('Invalid JWT format');

                    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
                    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

                    return JSON.stringify({
                        header,
                        payload,
                        signature: parts[2]
                    }, null, 2);
                } catch {
                    throw new Error('Invalid JWT token');
                }
            },
            validation: (input: string) => /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(input)
        },
        {
            id: 'morse',
            name: 'Morse Code',
            description: 'Morse code encoding/decoding',
            category: 'Cipher',
            icon: <Zap className="w-4 h-4" />,
            encode: (input: string) => {
                const morseMap: Record<string, string> = {
                    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
                    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
                    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
                    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
                    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
                    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
                    '9': '----.', '0': '-----', ' ': '/'
                };
                return input.toUpperCase().split('').map(char => morseMap[char] || char).join(' ');
            },
            decode: (input: string) => {
                const morseMap: Record<string, string> = {
                    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
                    '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
                    '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
                    '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
                    '-.--': 'Y', '--..': 'Z', '.----': '1', '..---': '2', '...--': '3',
                    '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8',
                    '----.': '9', '-----': '0', '/': ' '
                };
                return input.split(' ').map(code => morseMap[code] || code).join('');
            },
            validation: (input: string) => /^[.\-\/\s]*$/.test(input)
        }
    ], []);

    const categories = [
        'All',
        'Basic',
        'Web',
        'Advanced',
        'Cipher',
        'Security'
    ];



    // Process input based on selected method and mode
    const processInput = React.useCallback(() => {
        try {
            const method = encodingMethods.find(m => m.id === selectedMethod);
            if (!method) return;

            const options = methodOptions[selectedMethod] || {};
            let result: string;

            if (mode === 'encode') {
                result = method.encode(inputText, options);
            } else {
                result = method.decode(inputText, options);
            }

            setOutputText(result);
        } catch (error) {
            setOutputText(`Error: ${(error as Error).message}`);
        }
    }, [selectedMethod, mode, inputText, methodOptions, encodingMethods]);

    // Auto-detect encoding formats
    const detectFormats = React.useCallback((input: string): string[] => {
        const detected: string[] = [];

        encodingMethods.forEach(method => {
            if (method.validation && method.validation(input)) {
                detected.push(method.id);
            }
        });

        return detected;
    }, [encodingMethods]);

    // Initialize method options
    const initializeMethodOptions = React.useCallback((methodId: string) => {
        const method = encodingMethods.find(m => m.id === methodId);
        if (method?.options) {
            const options: Record<string, string | number | boolean> = {};
            method.options.forEach(option => {
                options[option.key] = option.default;
            });
            setMethodOptions(prev => ({ ...prev, [methodId]: options }));
        }
    }, [encodingMethods]);

    // Copy to clipboard
    const copyToClipboard = React.useCallback((text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(''), 2000);
    }, []);

    // Download results
    const downloadResults = React.useCallback(() => {
        const method = encodingMethods.find(m => m.id === selectedMethod);
        const content = batchMode ?
            batchResults.map(r => `${r.input} -> ${r.output}`).join('\n') :
            `Input: ${inputText}\nOutput: ${outputText}\nMethod: ${method?.name}\nMode: ${mode}`;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `encoded-decoded-${selectedMethod}-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }, [encodingMethods, selectedMethod, batchMode, batchResults, inputText, outputText, mode]);

    // Effects
    React.useEffect(() => {
        if (inputText) {
            processInput();
            if (autoDetect) {
                setDetectedFormats(detectFormats(inputText));
            }
        } else {
            setOutputText('');
            setDetectedFormats([]);
        }
    }, [inputText, selectedMethod, mode, methodOptions, processInput, autoDetect, detectFormats]);

    React.useEffect(() => {
        initializeMethodOptions(selectedMethod);
    }, [selectedMethod, initializeMethodOptions]);

    const currentMethod = encodingMethods.find(m => m.id === selectedMethod);
    const filteredMethods = encodingMethods;

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-4 mb-6">
                            <a
                                href="/tools"
                                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 group"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            </a>
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                                    <ArrowLeftRight className="h-6 w-6 text-black" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">Encoder/Decoder Tool</h1>
                                    <p className="text-gray-400">Multi-format encoding and decoding for security testing</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                                <div className="text-orange-400 font-bold text-2xl mb-1">{encodingMethods.length}</div>
                                <div className="text-gray-400 text-sm">Encoding Methods</div>
                            </div>
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                                <div className="text-orange-400 font-bold text-2xl mb-1">{categories.length - 1}</div>
                                <div className="text-gray-400 text-sm">Categories</div>
                            </div>
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                                <div className="text-orange-400 font-bold text-2xl mb-1">{mode === 'encode' ? 'ENCODE' : 'DECODE'}</div>
                                <div className="text-gray-400 text-sm">Current Mode</div>
                            </div>
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                                <div className="text-orange-400 font-bold text-2xl mb-1">{inputText.length}</div>
                                <div className="text-gray-400 text-sm">Characters</div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="mb-8">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                            <div className="grid lg:grid-cols-4 gap-4 mb-6">
                                {/* Method Selection */}
                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Encoding Method</label>
                                    <select
                                        value={selectedMethod}
                                        onChange={(e) => setSelectedMethod(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                    >
                                        {categories.map(category => (
                                            <optgroup key={category} label={category === 'All' ? 'All Methods' : category}>
                                                {filteredMethods
                                                    .filter(method => category === 'All' || method.category === category)
                                                    .map(method => (
                                                        <option key={method.id} value={method.id}>
                                                            {method.name} - {method.description}
                                                        </option>
                                                    ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>

                                {/* Mode Toggle */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Mode</label>
                                    <div className="flex rounded-lg bg-gray-800/50 border border-gray-700 p-1">
                                        <button
                                            onClick={() => setMode('encode')}
                                            className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
                                                mode === 'encode'
                                                    ? 'bg-orange-500 text-black'
                                                    : 'text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            Encode
                                        </button>
                                        <button
                                            onClick={() => setMode('decode')}
                                            className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
                                                mode === 'decode'
                                                    ? 'bg-orange-500 text-black'
                                                    : 'text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            Decode
                                        </button>
                                    </div>
                                </div>

                                {/* Additional Options */}
                                <div className="flex flex-col space-y-3">
                                    <button
                                        onClick={() => setShowOptions(!showOptions)}
                                        className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                    >
                                        <Settings className="w-4 h-4" />
                                        <span className="text-sm">Options</span>
                                    </button>
                                    <button
                                        onClick={() => setBatchMode(!batchMode)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                                            batchMode
                                                ? 'bg-orange-500 text-black'
                                                : 'bg-gray-800 hover:bg-gray-700 text-white'
                                        }`}
                                    >
                                        <FileText className="w-4 h-4" />
                                        <span className="text-sm">Batch</span>
                                    </button>
                                </div>
                            </div>

                            {/* Method Options */}
                            {showOptions && currentMethod?.options && (
                                <div className="mb-6 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                                    <h4 className="text-white font-medium mb-3">Method Options</h4>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {currentMethod.options.map(option => (
                                            <div key={option.key}>
                                                <label className="block text-sm text-gray-300 mb-1">{option.label}</label>
                                                {option.type === 'checkbox' ? (
                                                    <input
                                                        type="checkbox"
                                                        checked={methodOptions[selectedMethod]?.[option.key] || false}
                                                        onChange={(e) => setMethodOptions(prev => ({
                                                            ...prev,
                                                            [selectedMethod]: {
                                                                ...prev[selectedMethod],
                                                                [option.key]: e.target.checked
                                                            }
                                                        }))}
                                                        className="w-4 h-4 text-orange-500 border-gray-600 rounded focus:ring-orange-500"
                                                    />
                                                ) : option.type === 'select' ? (
                                                    <select
                                                        value={methodOptions[selectedMethod]?.[option.key] || option.default}
                                                        onChange={(e) => setMethodOptions(prev => ({
                                                            ...prev,
                                                            [selectedMethod]: {
                                                                ...prev[selectedMethod],
                                                                [option.key]: e.target.value
                                                            }
                                                        }))}
                                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                                                    >
                                                        {option.choices?.map(choice => (
                                                            <option key={choice} value={choice}>{choice}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        type={option.type}
                                                        value={methodOptions[selectedMethod]?.[option.key] || option.default}
                                                        onChange={(e) => setMethodOptions(prev => ({
                                                            ...prev,
                                                            [selectedMethod]: {
                                                                ...prev[selectedMethod],
                                                                [option.key]: option.type === 'number' ? parseInt(e.target.value) : e.target.value
                                                            }
                                                        }))}
                                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Auto-detect Results */}
                            {autoDetect && detectedFormats.length > 0 && (
                                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                    <h4 className="text-blue-400 font-medium mb-2 flex items-center">
                                        <Eye className="w-4 h-4 mr-2" />
                                        Detected Formats
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {detectedFormats.map(formatId => {
                                            const method = encodingMethods.find(m => m.id === formatId);
                                            return method ? (
                                                <button
                                                    key={formatId}
                                                    onClick={() => setSelectedMethod(formatId)}
                                                    className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-sm hover:bg-blue-500/30 transition-all duration-200"
                                                >
                                                    {method.name}
                                                </button>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => setAutoDetect(!autoDetect)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                                            autoDetect
                                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                : 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                                        }`}
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span className="text-sm">Auto-detect</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setInputText('');
                                            setOutputText('');
                                            setBatchInput('');
                                            setBatchResults([]);
                                        }}
                                        className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        <span className="text-sm">Clear</span>
                                    </button>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={downloadResults}
                                        disabled={!outputText && batchResults.length === 0}
                                        className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Export</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    {!batchMode ? (
                        /* Single Mode */
                        <div className="grid lg:grid-cols-2 gap-8 mb-8">
                            {/* Input */}
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-white flex items-center">
                                        <ArrowLeftRight className="w-5 h-5 text-orange-400 mr-2" />
                                        Input ({mode === 'encode' ? 'Plain Text' : 'Encoded Text'})
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-400">{inputText.length} chars</span>
                                        <button
                                            onClick={() => copyToClipboard(inputText, 'input')}
                                            className="p-2 hover:bg-gray-700 rounded transition-all duration-200 relative"
                                        >
                                            <Copy className="w-4 h-4 text-gray-400" />
                                            {copiedField === 'input' && (
                                                <div className="absolute -top-8 right-0 bg-green-500 text-black text-xs px-2 py-1 rounded">
                                                    Copied!
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <textarea
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder={`Enter text to ${mode}...`}
                                        className="w-full h-64 bg-gray-950/50 border border-gray-700 rounded-lg p-4 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none resize-none font-mono text-sm"
                                    />
                                </div>
                            </div>

                            {/* Output */}
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-white flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                                        Output ({mode === 'encode' ? 'Encoded Text' : 'Plain Text'})
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-400">{outputText.length} chars</span>
                                        <button
                                            onClick={() => copyToClipboard(outputText, 'output')}
                                            disabled={!outputText}
                                            className="p-2 hover:bg-gray-700 rounded transition-all duration-200 relative disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Copy className="w-4 h-4 text-gray-400" />
                                            {copiedField === 'output' && (
                                                <div className="absolute -top-8 right-0 bg-green-500 text-black text-xs px-2 py-1 rounded">
                                                    Copied!
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="w-full h-64 bg-gray-950/50 border border-gray-700 rounded-lg p-4 font-mono text-sm overflow-auto">
                                        {outputText ? (
                                            <pre className={`whitespace-pre-wrap ${outputText.startsWith('Error:') ? 'text-red-400' : 'text-green-400'}`}>
                                                {outputText}
                                            </pre>
                                        ) : (
                                            <span className="text-gray-500">Output will appear here...</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Batch Mode */
                        <div className="mb-8">
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <FileText className="w-5 h-5 text-orange-400 mr-2" />
                                    Batch Processing
                                </h3>

                                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Input (one item per line)
                                        </label>
                                        <textarea
                                            value={batchInput}
                                            onChange={(e) => setBatchInput(e.target.value)}
                                            placeholder="Enter multiple lines to process..."
                                            className="w-full h-48 bg-gray-950/50 border border-gray-700 rounded-lg p-4 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none resize-none font-mono text-sm"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-300">
                                                Results
                                            </label>
                                            <button
                                                onClick={processBatch}
                                                disabled={!batchInput.trim()}
                                                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                                            >
                                                <Zap className="w-4 h-4" />
                                                <span>Process</span>
                                            </button>
                                        </div>
                                        <div className="h-48 bg-gray-950/50 border border-gray-700 rounded-lg p-4 overflow-auto">
                                            {batchResults.length > 0 ? (
                                                <div className="space-y-2">
                                                    {batchResults.map((result, index) => (
                                                        <div key={index} className={`text-sm font-mono p-2 rounded ${
                                                            result.success
                                                                ? 'bg-green-500/10 border border-green-500/30'
                                                                : 'bg-red-500/10 border border-red-500/30'
                                                        }`}>
                                                            <div className={result.success ? 'text-green-400' : 'text-red-400'}>
                                                                <span className="text-gray-400">Input:</span> {result.input}
                                                            </div>
                                                            <div className={result.success ? 'text-green-300' : 'text-red-300'}>
                                                                <span className="text-gray-400">Output:</span> {result.output}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-gray-500">Results will appear here...</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {batchResults.length > 0 && (
                                    <div className="pt-4 border-t border-gray-800">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-400">
                                                Processed {batchResults.length} items •
                                                {batchResults.filter(r => r.success).length} successful •
                                                {batchResults.filter(r => !r.success).length} failed
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const successfulResults = batchResults.filter(r => r.success);
                                                    const content = successfulResults.map(r => r.output).join('\n');
                                                    copyToClipboard(content, 'batch');
                                                }}
                                                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 relative"
                                            >
                                                <Copy className="w-4 h-4" />
                                                <span>Copy All Successful</span>
                                                {copiedField === 'batch' && (
                                                    <div className="absolute -top-8 right-0 bg-green-500 text-black text-xs px-2 py-1 rounded">
                                                        Copied!
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Method Information */}
                    {currentMethod && (
                        <div className="mb-8">
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="text-orange-400">
                                        {currentMethod.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{currentMethod.name}</h3>
                                        <p className="text-gray-400">{currentMethod.description}</p>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-sm">
                                            {currentMethod.category}
                                        </span>
                                    </div>
                                </div>

                                {currentMethod.examples && (
                                    <div>
                                        <h4 className="text-white font-medium mb-3">Examples</h4>
                                        <div className="space-y-3">
                                            {currentMethod.examples.map((example, index) => (
                                                <div key={index} className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                                                    <div className="text-sm text-gray-400 mb-2">{example.description}</div>
                                                    <div className="grid md:grid-cols-2 gap-4 font-mono text-sm">
                                                        <div>
                                                            <span className="text-gray-500">Input:</span>
                                                            <div className="text-white bg-gray-900/50 p-2 rounded mt-1">{example.input}</div>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500">Encoded:</span>
                                                            <div className="text-orange-400 bg-gray-900/50 p-2 rounded mt-1 break-all">{example.encoded}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Quick Access Panel */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {encodingMethods.slice(0, 8).map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setSelectedMethod(method.id)}
                                className={`p-4 border rounded-lg transition-all duration-200 text-left ${
                                    selectedMethod === method.id
                                        ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                                        : 'bg-gray-900/50 border-gray-800 text-gray-300 hover:border-orange-400/50'
                                }`}
                            >
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className={selectedMethod === method.id ? 'text-orange-400' : 'text-gray-400'}>
                                        {method.icon}
                                    </div>
                                    <span className="font-medium">{method.name}</span>
                                </div>
                                <p className="text-xs text-gray-500">{method.description}</p>
                            </button>
                        ))}
                    </div>

                    {/* Security Notice */}
                    <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                            <AlertTriangle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-lg font-semibold text-orange-400 mb-3">Security Notice</h3>
                                <div className="text-gray-300 space-y-2 text-sm">
                                    <p>
                                        <strong>Client-Side Processing:</strong> All encoding/decoding is performed locally in your browser.
                                        No data is sent to external servers, ensuring your sensitive information remains private.
                                    </p>
                                    <p>
                                        <strong>Security Testing:</strong> This tool is designed for legitimate security testing and educational purposes.
                                        Always ensure you have proper authorization before testing systems you don't own.
                                    </p>
                                    <p>
                                        <strong>Data Handling:</strong> Be cautious when processing sensitive data. While this tool runs locally,
                                        avoid copying sensitive outputs to unsecured locations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-12 text-center text-gray-500 text-sm">
                        <p>
                            Encoder/Decoder Tool by TheCyberHub •
                            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors ml-1">Request New Methods</a> •
                            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors ml-1">Report Issues</a>
                        </p>
                        <p className="mt-2">
                            All processing is performed client-side for maximum security and privacy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EncoderDecoderTool;