"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Shield, CheckCircle, XCircle, Loader2, ArrowRight, Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';
    const { verifyEmail, user, requestVerification } = useAuth();

    const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'resent'>('verifying');
    const [errorMessage, setErrorMessage] = useState('');
    const [resendLoading, setResendLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setErrorMessage('No verification token found in the URL.');
            return;
        }
        verifyEmail(token)
            .then(() => setStatus('success'))
            .catch(err => {
                setStatus('error');
                setErrorMessage(err instanceof Error ? err.message : 'Verification failed. The link may have expired.');
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleResend = async () => {
        setResendLoading(true);
        try {
            await requestVerification();
            setStatus('resent');
        } catch {
            // already handled
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-500/8 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-orange-600/5 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
            </div>

            <div className="relative w-full max-w-md text-center">
                <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white">TheCyberHub</span>
                </Link>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-10 shadow-2xl">
                    {status === 'verifying' && (
                        <>
                            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-5" />
                            <h1 className="text-xl font-semibold text-white mb-2">Verifying your email...</h1>
                            <p className="text-gray-400 text-sm">Just a moment.</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                                <CheckCircle className="w-8 h-8 text-green-400" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Email verified!</h1>
                            <p className="text-gray-400 text-sm mb-8">
                                Your email address has been verified. Your account is now fully active.
                            </p>
                            <Link
                                href={user ? '/profile' : '/auth'}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/25"
                            >
                                {user ? 'Go to Profile' : 'Sign In'}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                                <XCircle className="w-8 h-8 text-red-400" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Link expired or invalid</h1>
                            <p className="text-gray-400 text-sm mb-6">{errorMessage}</p>

                            {user && !user.isVerified ? (
                                <button
                                    onClick={handleResend}
                                    disabled={resendLoading}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-xl transition-all"
                                >
                                    {resendLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                                    Resend Verification Email
                                </button>
                            ) : (
                                <Link
                                    href="/auth"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all"
                                >
                                    Back to Login
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            )}
                        </>
                    )}

                    {status === 'resent' && (
                        <>
                            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                                <Mail className="w-8 h-8 text-blue-400" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">New link sent!</h1>
                            <p className="text-gray-400 text-sm mb-6">
                                We&apos;ve sent a new verification email to your address. Check your inbox and spam folder.
                            </p>
                            <Link href="/profile" className="text-orange-400 hover:text-orange-300 text-sm">
                                Go to Profile →
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
