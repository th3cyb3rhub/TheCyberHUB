"use client"

import React, { useState, useCallback } from 'react';
import { Key, Copy, Check, RefreshCw, Shield, AlertTriangle } from 'lucide-react';

const PasswordGeneratorPage = () => {
    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });

    const generatePassword = useCallback(() => {
        let chars = '';
        if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (options.numbers) chars += '0123456789';
        if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (!chars) {
            setPassword('Select at least one option');
            return;
        }

        let result = '';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        
        for (let i = 0; i < length; i++) {
            result += chars[array[i] % chars.length];
        }
        
        setPassword(result);
        setCopied(false);
    }, [length, options]);

    const copyToClipboard = async () => {
        if (!password || password === 'Select at least one option') return;
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getStrength = () => {
        if (!password || password === 'Select at least one option') return { label: 'None', color: 'bg-gray-500', width: '0%' };
        
        let score = 0;
        if (password.length >= 12) score++;
        if (password.length >= 16) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: '25%' };
        if (score <= 4) return { label: 'Medium', color: 'bg-yellow-500', width: '50%' };
        if (score <= 5) return { label: 'Strong', color: 'bg-green-500', width: '75%' };
        return { label: 'Very Strong', color: 'bg-green-400', width: '100%' };
    };

    const strength = getStrength();

    // Generate on mount
    React.useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <Key className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Security Tool</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                        Password <span className="text-orange-500">Generator</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Generate cryptographically secure passwords with customizable options.
                    </p>
                </div>
            </section>

            {/* Generator */}
            <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-20">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    {/* Password Display */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                            <input
                                type="text"
                                value={password}
                                readOnly
                                className="flex-1 bg-transparent text-white font-mono text-lg outline-none"
                            />
                            <button
                                onClick={generatePassword}
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                                title="Generate new"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                            <button
                                onClick={copyToClipboard}
                                className="p-2 text-gray-400 hover:text-orange-400 transition-colors"
                                title="Copy"
                            >
                                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Strength Indicator */}
                        <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-500">Strength</span>
                                <span className={`${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${strength.color} transition-all duration-300`}
                                    style={{ width: strength.width }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Length Slider */}
                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm text-gray-400">Length</label>
                            <span className="text-sm text-white font-medium">{length}</span>
                        </div>
                        <input
                            type="range"
                            min="8"
                            max="64"
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>8</span>
                            <span>64</span>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 mb-6">
                        <label className="text-sm text-gray-400 block mb-3">Include</label>
                        
                        {[
                            { key: 'uppercase', label: 'Uppercase (A-Z)', example: 'ABCDEFGH' },
                            { key: 'lowercase', label: 'Lowercase (a-z)', example: 'abcdefgh' },
                            { key: 'numbers', label: 'Numbers (0-9)', example: '01234567' },
                            { key: 'symbols', label: 'Symbols (!@#$)', example: '!@#$%^&*' },
                        ].map((opt) => (
                            <label 
                                key={opt.key}
                                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 cursor-pointer transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={options[opt.key as keyof typeof options]}
                                        onChange={(e) => setOptions(prev => ({ ...prev, [opt.key]: e.target.checked }))}
                                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
                                    />
                                    <span className="text-white text-sm">{opt.label}</span>
                                </div>
                                <span className="text-xs text-gray-500 font-mono">{opt.example}</span>
                            </label>
                        ))}
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={generatePassword}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Generate Password
                    </button>
                </div>

                {/* Tips */}
                <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-medium text-white mb-2">Password Security Tips</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500">•</span>
                                    Use at least 16 characters for important accounts
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500">•</span>
                                    Never reuse passwords across different sites
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500">•</span>
                                    Use a password manager to store passwords securely
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500">•</span>
                                    Enable two-factor authentication when available
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Warning */}
                <div className="mt-4 flex items-start gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <p className="text-sm text-yellow-200/80">
                        Passwords are generated locally in your browser and are never sent to any server.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default PasswordGeneratorPage;
