'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Global error handler for root layout errors.
 * This catches errors that occur in the root layout itself.
 * Must render its own html and body tags.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        Sentry.captureException(error)
        console.error('Global layout error:', error);
    }, [error]);

    return (
        <html lang="en">
            <body style={{ 
                margin: 0, 
                minHeight: '100vh', 
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
                <div style={{ 
                    maxWidth: '400px', 
                    padding: '40px 20px', 
                    textAlign: 'center' 
                }}>
                    {/* Error Icon */}
                    <div style={{
                        width: '64px',
                        height: '64px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}>
                        <AlertTriangle style={{ width: '32px', height: '32px', color: '#ef4444' }} />
                    </div>

                    {/* Title */}
                    <h1 style={{ 
                        color: '#fff', 
                        fontSize: '24px', 
                        fontWeight: 600,
                        margin: '0 0 12px' 
                    }}>
                        Critical Error
                    </h1>

                    {/* Description */}
                    <p style={{ 
                        color: '#9ca3af', 
                        fontSize: '14px',
                        lineHeight: '1.5',
                        margin: '0 0 24px' 
                    }}>
                        A critical error occurred in the application. 
                        Please try refreshing the page.
                    </p>

                    {/* Error details */}
                    {process.env.NODE_ENV === 'development' && error && (
                        <div style={{
                            padding: '12px',
                            backgroundColor: 'rgba(239, 68, 68, 0.05)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '8px',
                            marginBottom: '24px',
                            textAlign: 'left'
                        }}>
                            <code style={{ 
                                fontSize: '12px', 
                                color: '#fca5a5',
                                wordBreak: 'break-all'
                            }}>
                                {error.message}
                            </code>
                        </div>
                    )}

                    {/* Retry Button */}
                    <button
                        onClick={() => reset()}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            backgroundColor: '#f97316',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 500,
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f97316'}
                    >
                        <RefreshCw style={{ width: '16px', height: '16px' }} />
                        Refresh Page
                    </button>
                </div>
            </body>
        </html>
    );
}
