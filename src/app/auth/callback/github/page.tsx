"use client"

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const GitHubCallbackPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { loginWithGithub } = useAuth();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const code = searchParams.get('code');
        const errorParam = searchParams.get('error');

        if (errorParam) {
            setStatus('error');
            setError(errorParam === 'access_denied' ? 'Access denied by user' : errorParam);
            return;
        }

        if (!code) {
            setStatus('error');
            setError('No authorization code received');
            return;
        }

        const handleCallback = async () => {
            try {
                await loginWithGithub(code);
                setStatus('success');
                setTimeout(() => router.push('/profile'), 1500);
            } catch (err) {
                setStatus('error');
                setError(err instanceof Error ? err.message : 'Authentication failed');
            }
        };

        handleCallback();
    }, [searchParams, loginWithGithub, router]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="text-center">
                {status === 'loading' && (
                    <>
                        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
                        <h1 className="text-xl font-semibold text-white mb-2">Signing in with GitHub...</h1>
                        <p className="text-gray-400">Please wait while we complete your authentication.</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h1 className="text-xl font-semibold text-white mb-2">Success!</h1>
                        <p className="text-gray-400">Redirecting to your profile...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h1 className="text-xl font-semibold text-white mb-2">Authentication Failed</h1>
                        <p className="text-red-400 mb-6">{error}</p>
                        <button
                            onClick={() => router.push('/auth')}
                            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default GitHubCallbackPage;
