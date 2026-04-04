/**
 * Error Boundary Component
 * 
 * Catches unhandled errors in React component tree and displays
 * a user-friendly error page with recovery options.
 * 
 * Requirements: 4.1, 4.2, 4.3
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

// ============================================
// Types
// ============================================

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    showDetails?: boolean;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

// ============================================
// Error Boundary Component
// ============================================

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

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('ErrorBoundary caught an error:', error);
            console.error('Component stack:', errorInfo.componentStack);
        }

        // Store error info for display
        this.setState({ errorInfo });

        // Call custom error handler if provided
        this.props.onError?.(error, errorInfo);

        // Log to Sentry in production (if available)
        if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
            // @ts-expect-error - Sentry may not be defined
            if (window.Sentry) {
                // @ts-expect-error - Sentry may not be defined
                window.Sentry.captureException(error, {
                    extra: {
                        componentStack: errorInfo.componentStack,
                    },
                });
            }
        }
    }

    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    handleReload = (): void => {
        window.location.reload();
    };

    handleGoHome = (): void => {
        window.location.href = '/';
    };

    render(): ReactNode {
        if (this.state.hasError) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI
            return (
                <div className="min-h-[400px] flex items-center justify-center p-8">
                    <div className="max-w-md w-full text-center">
                        {/* Error Icon */}
                        <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                        </div>

                        {/* Error Message */}
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Something went wrong
                        </h2>
                        <p className="text-gray-400 mb-6">
                            We encountered an unexpected error. Please try again or return to the home page.
                        </p>

                        {/* Error Details (Development Only) */}
                        {(this.props.showDetails || process.env.NODE_ENV === 'development') && this.state.error && (
                            <div className="mb-6 p-4 bg-gray-800/50 rounded-lg text-left">
                                <div className="flex items-center gap-2 text-red-400 mb-2">
                                    <Bug className="w-4 h-4" />
                                    <span className="font-mono text-sm">Error Details</span>
                                </div>
                                <p className="text-sm text-gray-300 font-mono break-all">
                                    {this.state.error.message}
                                </p>
                                {this.state.errorInfo?.componentStack && (
                                    <details className="mt-2">
                                        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                                            Component Stack
                                        </summary>
                                        <pre className="mt-2 text-xs text-gray-500 overflow-auto max-h-32">
                                            {this.state.errorInfo.componentStack}
                                        </pre>
                                    </details>
                                )}
                            </div>
                        )}

                        {/* Recovery Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={this.handleReset}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// ============================================
// Functional Wrapper (for hooks support)
// ============================================

interface ErrorBoundaryWrapperProps extends ErrorBoundaryProps {
    resetKey?: string | number;
}

export function ErrorBoundaryWrapper({
    children,
    resetKey,
    ...props
}: ErrorBoundaryWrapperProps): React.JSX.Element {
    return (
        <ErrorBoundary key={resetKey} {...props}>
            {children}
        </ErrorBoundary>
    );
}

// ============================================
// Page Error Boundary
// ============================================

interface PageErrorBoundaryProps {
    children: ReactNode;
}

export function PageErrorBoundary({ children }: PageErrorBoundaryProps): React.JSX.Element {
    return (
        <ErrorBoundary
            onError={(error) => {
                // Log page-level errors
                console.error('[Page Error]', error.message);
            }}
        >
            {children}
        </ErrorBoundary>
    );
}

// ============================================
// Default Export
// ============================================

export default ErrorBoundary;
