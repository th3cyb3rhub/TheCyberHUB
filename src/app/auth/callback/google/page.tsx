/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const GoogleCallbackPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { loginWithGoogle } = useAuth();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Google returns the token in the URL hash for implicit flow
        // or as a code for authorization code flow
        const hash = window.location.hash;
        const errorParam = searchParams.get('error');

        if (errorParam) {
            setStatus('error');
            setError(errorParam === 'access_denied' ? 'Access denied by user' : errorParam);
            return;
        }

        // Parse token from hash (implicit flow)
        if (hash) {
            const params = new URLSearchParams(hash.substring(1));
            const idToken = params.get('id_token') || params.get('access_token');

            if (idToken) {
                handleGoogleAuth(idToken);
                return;
            }
        }

        // Check for credential in search params (Google One Tap)
        const credential = searchParams.get('credential');
        if (credential) {
            handleGoogleAuth(credential);
            return;
        }

        setStatus('error');
        setError('No authentication token received');
    }, [searchParams]);

    const handleGoogleAuth = async (idToken: string) => {
        try {
            await loginWithGoogle(idToken);
            setStatus('success');
            setTimeout(() => router.push('/profile'), 1500);
        } catch (err) {
            setStatus('error');
            setError(err instanceof Error ? err.message : 'Authentication failed');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="text-center">
                {status === 'loading' && (
                    <>
                        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
                        <h1 className="text-xl font-semibold text-white mb-2">Signing in with Google...</h1>
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

export default GoogleCallbackPage;
