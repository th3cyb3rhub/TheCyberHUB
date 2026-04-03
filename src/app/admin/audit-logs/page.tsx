'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuth } from '@/context/AuthContext';
import { fetchApi, tokenStore } from '@/lib/api';
import {
    Loader2,
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    ClipboardList,
    Info,
    AlertTriangle,
    XCircle,
    ShieldAlert,
    User,
    Settings,
    Shield,
    Key,
    Search,
    Download,
} from 'lucide-react';
import Link from 'next/link';

interface AuditLogEntry {
    _id: string;
    action: string;
    severity: string;
    description?: string;
    actor: {
        userId?: string;
        username?: string;
        email?: string;
        role?: string;
        isSystem?: boolean;
    };
    target?: {
        type?: string;
        id?: string;
        name?: string;
    };
    metadata?: Record<string, unknown>;
    changes?: {
        before?: unknown;
        after?: unknown;
        fields?: string[];
    };
    result?: {
        success?: boolean;
        errorCode?: string;
        errorMessage?: string;
    };
    request?: {
        ip?: string;
        userAgent?: string;
        method?: string;
        path?: string;
    };
    timestamp: string;
}

const SEVERITY_CONFIG: Record<string, { icon: typeof Info; color: string; bg: string }> = {
    info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    warning: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    error: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
    critical: { icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-500/20' },
};

const ACTION_ICON: Record<string, typeof Shield> = {
    'auth': Key,
    'user': User,
    'admin': Shield,
    'security': ShieldAlert,
    'challenge': ClipboardList,
    'event': ClipboardList,
    'data': Settings,
};

const SEVERITIES = ['all', 'info', 'warning', 'error', 'critical'];

function formatAction(action: string): string {
    return action
        .split('.')
        .map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/_/g, ' '))
        .join(' → ');
}

function timeAgo(date: string): string {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function AdminAuditLogsPage() {
    const { user: currentUser, loading: authLoading } = useAuth();
    const [logs, setLogs] = useState<AuditLogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [severity, setSeverity] = useState('all');
    const [searchAction, setSearchAction] = useState('');
    const debouncedSearch = useDebounce(searchAction, 300);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const token = tokenStore.get();

    const fetchLogs = useCallback(async (p = 1) => {
        if (!token) return;
        setLoading(true);
        try {
            const params = new URLSearchParams({ page: String(p), limit: '30' });
            if (severity !== 'all') params.set('severity', severity);
            if (debouncedSearch) params.set('action', debouncedSearch);

            const data = await fetchApi(`/api/admin/audit-logs?${params}`);
            setLogs(data.data);
            setTotalPages(data.pagination.pages);
            setTotal(data.pagination.total);
            setPage(p);
        } catch {
            console.error('Failed to fetch audit logs');
        } finally {
            setLoading(false);
        }
    }, [token, severity, debouncedSearch]);

    useEffect(() => {
        if (!authLoading && currentUser) fetchLogs(1);
    }, [authLoading, currentUser, fetchLogs]);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!currentUser || !['admin', 'owner'].includes(currentUser.role)) return null;

    const exportAuditLogsCSV = () => {
        const header = ['Timestamp', 'Action', 'Severity', 'Actor', 'Target', 'IP'];
        const rows = logs.map(log => [
            new Date(log.timestamp).toLocaleString(),
            log.action,
            log.severity,
            log.actor?.username || 'System',
            log.target?.name || '-',
            log.request?.ip || '-',
        ]);
        const csv = [header, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <ClipboardList className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Audit Logs</h1>
                                <p className="text-sm text-gray-400">{total} entries (auto-expires after 90 days)</p>
                            </div>
                        </div>
                        <button
                            onClick={exportAuditLogsCSV}
                            disabled={logs.length === 0}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                        >
                            <Download className="w-3.5 h-3.5" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Filter by action (e.g. user.role_change)..."
                            value={searchAction}
                            onChange={(e) => setSearchAction(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && fetchLogs(1)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50"
                        />
                    </div>
                    <div className="flex gap-2">
                        {SEVERITIES.map(s => (
                            <button
                                key={s}
                                onClick={() => { setSeverity(s); }}
                                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors capitalize ${severity === s
                                    ? 'border-orange-500/50 bg-orange-500/10 text-orange-400'
                                    : 'border-white/10 bg-white/5 text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Logs */}
                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>
                ) : logs.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No audit logs found</div>
                ) : (
                    <div className="space-y-2">
                        {logs.map(log => {
                            const sev = SEVERITY_CONFIG[log.severity] || SEVERITY_CONFIG.info;
                            const SevIcon = sev.icon;
                            const actionPrefix = log.action.split('.')[0];
                            const ActIcon = ACTION_ICON[actionPrefix] || ClipboardList;
                            const expanded = expandedId === log._id;

                            return (
                                <div key={log._id} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                                    <button
                                        onClick={() => setExpandedId(expanded ? null : log._id)}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
                                    >
                                        <div className={`w-8 h-8 rounded-lg ${sev.bg} flex items-center justify-center flex-shrink-0`}>
                                            <SevIcon className={`w-4 h-4 ${sev.color}`} />
                                        </div>
                                        <ActIcon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <span className="text-sm text-white font-medium">{formatAction(log.action)}</span>
                                            {log.actor?.username && (
                                                <span className="text-xs text-gray-500 ml-2">by {log.actor.username}</span>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-600 flex-shrink-0">{timeAgo(log.timestamp)}</span>
                                    </button>
                                    {expanded && (
                                        <div className="px-4 pb-4 pt-1 border-t border-white/5">
                                            <div className="grid grid-cols-2 gap-3 text-xs">
                                                {log.actor?.username && (
                                                    <div>
                                                        <span className="text-gray-600">Actor</span>
                                                        <p className="text-gray-300">{log.actor.username} ({log.actor.role})</p>
                                                    </div>
                                                )}
                                                {log.target?.name && (
                                                    <div>
                                                        <span className="text-gray-600">Target</span>
                                                        <p className="text-gray-300">{log.target.name} ({log.target.type})</p>
                                                    </div>
                                                )}
                                                {log.request?.ip && (
                                                    <div>
                                                        <span className="text-gray-600">IP</span>
                                                        <p className="text-gray-300">{log.request.ip}</p>
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="text-gray-600">Timestamp</span>
                                                    <p className="text-gray-300">{new Date(log.timestamp).toLocaleString()}</p>
                                                </div>
                                                {log.result && (
                                                    <div>
                                                        <span className="text-gray-600">Result</span>
                                                        <p className={log.result.success ? 'text-green-400' : 'text-red-400'}>{log.result.success ? 'Success' : 'Failed'}</p>
                                                    </div>
                                                )}
                                            </div>
                                            {log.metadata && Object.keys(log.metadata).length > 0 && (
                                                <div className="mt-3">
                                                    <span className="text-xs text-gray-600">Metadata</span>
                                                    <pre className="mt-1 p-2 rounded-lg bg-black/50 text-xs text-gray-400 overflow-x-auto">{JSON.stringify(log.metadata, null, 2)}</pre>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button onClick={() => fetchLogs(page - 1)} disabled={page <= 1} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 disabled:opacity-30 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
                        <button onClick={() => fetchLogs(page + 1)} disabled={page >= totalPages} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 disabled:opacity-30 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
