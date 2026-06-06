"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Mail, ArrowLeft, Loader2, CheckCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ForgotPasswordPage = () => {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => {
        if (resendCooldown <= 0) return;
        const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [resendCooldown]);

    const submit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!email) return;
        setLoading(true);
        setError(null);
        try {
            await forgotPassword(email);
            setSuccess(true);
            setResendCooldown(60);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendCooldown > 0) return;
        setLoading(true);
        setError(null);
        try {
            await forgotPassword(email);
            setResendCooldown(60);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to resend');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-500/8 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-orange-600/5 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">TheCyberHub</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-3">Reset your password</h1>
                    <p className="text-gray-400">
                        Enter your email and we&apos;ll send you a reset link
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 shadow-2xl">
                    {success ? (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                                <CheckCircle className="w-8 h-8 text-green-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-white mb-2">Check your email</h2>
                            <p className="text-gray-400 text-sm mb-2">
                                We sent a reset link to
                            </p>
                            <p className="text-white font-medium mb-1">{email}</p>
                            <p className="text-gray-500 text-xs mb-6">
                                The link expires in 30 minutes. Check your spam folder if you don&apos;t see it.
                            </p>

                            {error && (
                                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleResend}
                                disabled={resendCooldown > 0 || loading}
                                className="w-full flex items-center justify-center gap-2 py-3 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-50 rounded-xl text-sm font-medium transition-colors mb-4"
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <RefreshCw className="w-4 h-4" />
                                )}
                                {resendCooldown > 0
                                    ? `Resend in ${resendCooldown}s`
                                    : 'Resend reset link'}
                            </button>

                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => { setSuccess(false); setEmail(''); setError(null); }}
                                    className="text-sm text-gray-500 hover:text-white transition-colors"
                                >
                                    Use a different email
                                </button>
                                <Link
                                    href="/auth"
                                    className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 text-sm"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to login
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Email address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); setError(null); }}
                                            placeholder="you@example.com"
                                            required
                                            autoFocus
                                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !email}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/40 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <Link
                                    href="/auth"
                                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to login
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
