"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    title?: string;
    variant: ToastVariant;
}

interface ToastContextValue {
    addToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return ctx;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        setToasts(prev => [...prev, { ...toast, id }]);

        setTimeout(() => {
            removeToast(id);
        }, 4000);
    }, [removeToast]);

    const getIcon = (variant: ToastVariant) => {
        switch (variant) {
            case 'success':
                return <CheckCircle2 className="w-4 h-4 text-green-400" />;
            case 'error':
                return <AlertTriangle className="w-4 h-4 text-red-400" />;
            default:
                return <Info className="w-4 h-4 text-blue-400" />;
        }
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div aria-live="polite" className="fixed top-4 right-4 z-[10000] space-y-2 w-full max-w-sm pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="pointer-events-auto flex items-start gap-3 rounded-xl border border-white/10 bg-zinc-900/95 px-4 py-3 shadow-xl shadow-black/40 animate-in fade-in slide-in-from-top-2"
                    >
                        <div className="mt-0.5">
                            {getIcon(toast.variant)}
                        </div>
                        <div className="flex-1 min-w-0">
                            {toast.title && (
                                <p className="text-sm font-medium text-white mb-0.5">{toast.title}</p>
                            )}
                            <p className="text-sm text-gray-300 truncate">{toast.message}</p>
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-2 text-xs text-gray-500 hover:text-white"
                            aria-label="Dismiss notification"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
