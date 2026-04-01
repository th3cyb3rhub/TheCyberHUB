"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Shield, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';
    const { resetPassword } = useAuth();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);

        try {
            await resetPassword(token, password);
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Invalid Reset Link</h1>
                    <p className="text-gray-400 mb-6">This password reset link is invalid or has expired.</p>
                    <Link
                        href="/forgot-password"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                    >
                        Request New Link
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative w-full max-w-md">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">TheCyberHub</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-white mb-2">Set new password</h1>
                    <p className="text-gray-400 text-sm">
                        Enter your new password below
                    </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8">
                    {success ? (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <h2 className="text-xl font-semibold text-white mb-2">Password Reset!</h2>
                            <p className="text-gray-400 text-sm mb-6">
                                Your password has been successfully reset.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                            >
                                Go to Dashboard
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            minLength={8}
                                            className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            minLength={8}
                                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-lg transition-colors"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Reset Password
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
