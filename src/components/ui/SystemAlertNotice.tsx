'use client';

import React, { useEffect, useState } from 'react';
import { AlertCircle, Info, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface SystemAlert {
    _id: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
}

export function SystemAlertNotice() {
    const [alerts, setAlerts] = useState<SystemAlert[]>([]);
    const [dismissed, setDismissed] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const data = await fetchApi('/api/system-alerts/active', { requireAuth: false });
                if (data?.success) {
                    setAlerts(data.data);
                }
            } catch (_error) {
                // Silently ignore connection errors
            }
        };

        fetchAlerts();

        // Poll every 5 minutes
        const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const dismissAlert = (id: string) => {
        setDismissed(prev => {
            const next = new Set(prev);
            next.add(id);
            return next;
        });
    };

    const activeAlerts = alerts.filter(a => !dismissed.has(a._id));

    if (activeAlerts.length === 0) return null;

    return (
        <div className="flex flex-col w-full z-50 fixed top-0 left-0 right-0">
            {activeAlerts.map(alert => {
                const colors = {
                    info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
                    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
                    error: 'bg-red-500/10 border-red-500/20 text-red-400',
                    success: 'bg-green-500/10 border-green-500/20 text-green-400'
                };

                const icons = {
                    info: <Info className="w-4 h-4" />,
                    warning: <AlertTriangle className="w-4 h-4" />,
                    error: <AlertCircle className="w-4 h-4" />,
                    success: <CheckCircle className="w-4 h-4" />
                };

                return (
                    <div
                        key={alert._id}
                        className={`w-full relative px-4 py-2 border-b flex items-center justify-center gap-3 text-sm font-medium backdrop-blur-md ${colors[alert.type]}`}
                    >
                        {icons[alert.type]}
                        <span className="text-center">{alert.message}</span>
                        <button
                            onClick={() => dismissAlert(alert._id)}
                            className="absolute right-4 p-1 hover:bg-black/10 rounded-md transition-colors text-white/50 hover:text-white"
                            aria-label="Dismiss alert"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
