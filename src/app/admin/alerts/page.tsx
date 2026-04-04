'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { fetchApi } from '@/lib/api';
import {
    Loader2,
    Plus,
    Trash2,
    ShieldAlert,
    AlertTriangle,
    Info,
    CheckCircle,
    Power
} from 'lucide-react';
import Link from 'next/link';
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/ConfirmDialog';

interface SystemAlert {
    _id: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    isActive: boolean;
    expiresAt: string | null;
    createdAt: string;
    createdBy: {
        _id: string;
        username: string;
        name: string;
    };
}

export default function AdminSystemAlertsPage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const { addToast } = useToast();

    const [alerts, setAlerts] = useState<SystemAlert[]>([]);
    const [fetching, setFetching] = useState(true);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const { isOpen: confirmOpen, confirm: showConfirm, onConfirm, onCancel } = useConfirmDialog();

    // New Alert State
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'info' | 'warning' | 'error' | 'success'>('info');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (!loading && (!user || !['admin', 'superadmin', 'owner'].includes(user.role))) {
            router.push('/admin');
        }
    }, [user, loading, router]);

    const fetchAlerts = async () => {
        setFetching(true);
        try {
            const data = await fetchApi('/api/system-alerts');
            if (data?.success) {
                setAlerts(data.data);
            }
        } catch (err) {
            addToast({ variant: 'error', title: 'Error', message: err instanceof Error ? err.message : 'Failed to fetch alerts' });
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        if (user && ['admin', 'superadmin', 'owner'].includes(user.role)) {
            fetchAlerts();
        }
    }, [user]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateLoading(true);
        try {
            const data = await fetchApi('/api/system-alerts', {
                method: 'POST',
                body: JSON.stringify({ message, type, isActive })
            });
            if (data?.success) {
                addToast({ variant: 'success', title: 'Success', message: 'Alert created successfully' });
                setIsCreateModalOpen(false);
                setMessage('');
                setType('info');
                setIsActive(true);
                fetchAlerts();
            }
        } catch (err) {
            addToast({ variant: 'error', title: 'Error', message: err instanceof Error ? err.message : 'Failed to create alert' });
        } finally {
            setCreateLoading(false);
        }
    };

    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        try {
            const data = await fetchApi(`/api/system-alerts/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ isActive: !currentStatus })
            });
            if (data?.success) {
                addToast({ variant: 'success', title: 'Success', message: `Alert ${!currentStatus ? 'enabled' : 'disabled'}` });
                fetchAlerts();
            }
        } catch {
            addToast({ variant: 'error', title: 'Error', message: 'Could not toggle alert' });
        }
    };

    const handleDelete = async (id: string) => {
        const confirmed = await showConfirm();
        if (!confirmed) return;
        try {
            const data = await fetchApi(`/api/system-alerts/${id}`, {
                method: 'DELETE'
            });
            if (data?.success) {
                addToast({ variant: 'success', title: 'Success', message: 'Alert deleted' });
                fetchAlerts();
            }
        } catch {
            addToast({ variant: 'error', title: 'Error', message: 'Could not delete alert' });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user || !['admin', 'superadmin', 'owner'].includes(user.role)) return null;

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                                Admin
                            </Link>
                            <span className="text-gray-600">/</span>
                            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center">
                                <ShieldAlert className="w-4 h-4 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">System Alerts</h1>
                        </div>
                        <p className="text-gray-400">Manage platform-wide broadcast banners.</p>
                    </div>

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Create Alert
                    </button>
                </div>

                <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-white/[0.05] text-xs uppercase text-gray-300">
                                <tr>
                                    <th className="px-6 py-4">Message</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Created By</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {fetching ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center">
                                            <Loader2 className="w-6 h-6 animate-spin text-orange-500 mx-auto" />
                                        </td>
                                    </tr>
                                ) : alerts.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                            No system alerts found
                                        </td>
                                    </tr>
                                ) : (
                                    alerts.map((alert) => (
                                        <tr key={alert._id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4 font-medium text-white max-w-xs truncate">
                                                {alert.message}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    {alert.type === 'info' && <Info className="w-4 h-4 text-blue-400" />}
                                                    {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                                                    {alert.type === 'error' && <ShieldAlert className="w-4 h-4 text-red-400" />}
                                                    {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-400" />}
                                                    <span className="capitalize">{alert.type}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${alert.isActive
                                                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                                    : 'bg-gray-500/10 border-gray-500/20 text-gray-400'
                                                    }`}>
                                                    {alert.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {alert.createdBy?.name || 'Unknown'} <span className="text-xs text-gray-500">(@{alert.createdBy?.username || 'unknown'})</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {new Date(alert.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleToggleActive(alert._id, alert.isActive)}
                                                        className={`p-2 rounded-lg transition-colors ${alert.isActive
                                                            ? 'bg-gray-500/10 text-gray-400 hover:text-white hover:bg-gray-500/20'
                                                            : 'bg-green-500/10 text-green-400 hover:text-green-300 hover:bg-green-500/20'
                                                            }`}
                                                        title={alert.isActive ? "Deactivate" : "Activate"}
                                                    >
                                                        <Power className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(alert._id)}
                                                        className="p-2 bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-background)]/80 backdrop-blur-sm">
                    <div className="bg-gray-950 border border-white/10 rounded-2xl p-6 w-full max-w-md relative" role="dialog" aria-modal="true" aria-label="Create system alert">
                        <h2 className="text-xl font-bold text-white mb-6">Create System Alert</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    required
                                    maxLength={500}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 resize-none"
                                    placeholder="Enter alert message (e.g., Scheduled maintenance at 12 AM)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                                <select
                                    value={type}
                                    onChange={e => setType(e.target.value as 'info' | 'warning' | 'error' | 'success')}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500/50 outline-none"
                                >
                                    <option value="info" className="bg-gray-950 text-white">Info (Blue)</option>
                                    <option value="warning" className="bg-gray-950 text-white">Warning (Yellow)</option>
                                    <option value="error" className="bg-gray-950 text-white">Error (Red)</option>
                                    <option value="success" className="bg-gray-950 text-white">Success (Green)</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={e => setIsActive(e.target.checked)}
                                        className="w-4 h-4 rounded border-white/10 bg-white/5 text-orange-500 focus:ring-orange-500/50"
                                    />
                                    <span className="text-sm font-medium text-gray-400">Publish Immediately</span>
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-white/10 hover:bg-white/5 text-gray-300 font-medium rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createLoading || !message.trim()}
                                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    {createLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Create broadcast
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmDialog
                open={confirmOpen}
                onConfirm={onConfirm}
                onCancel={onCancel}
                title="Delete alert?"
                description="Are you sure you want to delete this alert?"
                confirmText="Delete"
                variant="danger"
            />
        </div>
    );
}
