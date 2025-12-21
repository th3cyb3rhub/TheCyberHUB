"use client"

import React, { Component, ReactNode } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { captureException, addBreadcrumb } from '@/lib/monitoring';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

/**
 * Error Boundary component for catching and handling React errors gracefully.
 * Prevents the entire app from crashing when a component throws an error.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({ errorInfo });
        
        // Call custom error handler if provided
        this.props.onError?.(error, errorInfo);
        
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }
        
        // Send to monitoring service (Sentry)
        captureException(error, { 
            componentStack: errorInfo.componentStack 
        });
        
        addBreadcrumb({
            category: 'error-boundary',
            message: `Error caught: ${error.message}`,
            level: 'error',
        });
    }

    handleRetry = (): void => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render(): ReactNode {
        if (this.state.hasError) {
            // Custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI
            return (
                <div className="min-h-[400px] flex items-center justify-center p-8">
                    <div className="max-w-md w-full text-center">
                        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                        </div>
                        
                        <h2 className="text-xl font-semibold text-white mb-3">
                            Something went wrong
                        </h2>
                        
                        <p className="text-gray-400 mb-6">
                            An unexpected error occurred. Please try again or contact support if the problem persists.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-left">
                                <div className="flex items-center gap-2 mb-2">
                                    <Bug className="w-4 h-4 text-red-400" />
                                    <span className="text-sm font-medium text-red-400">Error Details</span>
                                </div>
                                <code className="text-xs text-red-300 break-all block">
                                    {this.state.error.message}
                                </code>
                                {this.state.errorInfo?.componentStack && (
                                    <details className="mt-2">
                                        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                                            Component Stack
                                        </summary>
                                        <pre className="text-xs text-gray-600 mt-2 overflow-auto max-h-32">
                                            {this.state.errorInfo.componentStack}
                                        </pre>
                                    </details>
                                )}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={this.handleRetry}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </button>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * Lightweight error fallback for smaller components
 */
interface ErrorFallbackProps {
    error?: Error;
    resetError?: () => void;
    compact?: boolean;
}

export function ErrorFallback({ error, resetError, compact = false }: ErrorFallbackProps) {
    if (compact) {
        return (
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-red-400">Failed to load content</p>
                        {error && (
                            <p className="text-xs text-red-500/70 truncate">{error.message}</p>
                        )}
                    </div>
                    {resetError && (
                        <button
                            onClick={resetError}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                            title="Retry"
                        >
                            <RefreshCw className="w-4 h-4 text-gray-400" />
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl text-center">
            <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-white mb-2">Error Loading Content</h3>
            <p className="text-sm text-gray-400 mb-4">
                {error?.message || 'Something went wrong while loading this content.'}
            </p>
            {resetError && (
                <button
                    onClick={resetError}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                </button>
            )}
        </div>
    );
}

/**
 * Async error boundary wrapper for client components with data fetching
 */
interface AsyncBoundaryProps {
    children: ReactNode;
    loading?: ReactNode;
    error?: ReactNode;
}

export function AsyncBoundary({ children, loading, error }: AsyncBoundaryProps) {
    return (
        <ErrorBoundary fallback={error}>
            <React.Suspense fallback={loading || <DefaultLoadingFallback />}>
                {children}
            </React.Suspense>
        </ErrorBoundary>
    );
}

function DefaultLoadingFallback() {
    return (
        <div className="min-h-[200px] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );
}

export default ErrorBoundary;
