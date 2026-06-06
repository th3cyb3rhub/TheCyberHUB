"use client"

import React, { useState } from 'react';
import { Mail, X, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

const HIDDEN_PATHS = ['/auth', '/verify-email', '/reset-password', '/forgot-password'];

export function EmailVerificationBanner() {
    const { user, requestVerification } = useAuth();
    const pathname = usePathname();
    const [dismissed, setDismissed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    if (!user || user.isVerified || dismissed) return null;
    if (user.provider && user.provider !== 'local') return null;
    if (HIDDEN_PATHS.some(p => pathname.startsWith(p))) return null;

    const handleResend = async () => {
        setLoading(true);
        try {
            await requestVerification();
            setSent(true);
        } catch {
            // silently fail — user can try again
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative z-40 w-full bg-yellow-500/10 border-b border-yellow-500/20">
            <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    {sent ? (
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    ) : (
                        <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    )}
                    <p className="text-sm text-yellow-200 truncate">
                        {sent
                            ? 'Verification email sent — check your inbox.'
                            : <>Please verify your email address to unlock all features.</>
                        }
                    </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                    {!sent && (
                        <button
                            onClick={handleResend}
                            disabled={loading}
                            className="text-xs font-medium text-yellow-300 hover:text-white underline underline-offset-2 transition-colors disabled:opacity-60 flex items-center gap-1"
                        >
                            {loading && <Loader2 className="w-3 h-3 animate-spin" />}
                            Resend email
                        </button>
                    )}
                    <button
                        onClick={() => setDismissed(true)}
                        className="text-yellow-400/60 hover:text-yellow-200 transition-colors"
                        aria-label="Dismiss"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
