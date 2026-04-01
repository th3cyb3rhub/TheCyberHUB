'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Save, Shield, Globe, Mail, Database } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { fetchApi } from '@/lib/api';

export default function AdminSettingsPage() {
    const { user, loading } = useAuth();
    const { addToast } = useToast();
    const [saving, setSaving] = useState(false);
    const [loadingSettings, setLoadingSettings] = useState(true);

    const [settings, setSettings] = useState({
        siteName: '',
        maintenanceMode: false,
        allowRegistration: true,
        emailSender: '',
        maxUploadSize: 50,
    });

    // Fetch settings on mount
    useEffect(() => {
        const fetchSettings = async () => {
            if (!user || user.role !== 'owner') return;
            try {
                const data = await fetchApi('/api/admin/settings');
                if (data?.data) {
                    setSettings(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error);
                addToast({
                    variant: 'error',
                    title: 'Error',
                    message: 'Failed to load platform settings.'
                });
            } finally {
                setLoadingSettings(false);
            }
        };

        if (!loading) {
            fetchSettings();
        }
    }, [user, loading, addToast]);

    if (loading || loadingSettings) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user || user.role !== 'owner') {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center text-white">
                Access Denied
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const data = await fetchApi('/api/admin/settings', {
                method: 'PUT',
                body: JSON.stringify(settings)
            });

            if (data?.data) {
                setSettings(data.data);
            }

            addToast({
                variant: 'success',
                title: 'Settings saved',
                message: 'Platform settings have been updated successfully.'
            });
        } catch (error) {
            console.error('Failed to save settings:', error);
            addToast({
                variant: 'error',
                title: 'Error',
                message: error instanceof Error ? error.message : 'Failed to save settings. Please try again.'
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                        <Shield className="w-5 h-5 text-orange-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Platform Settings</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* General Settings */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-blue-400" />
                            General
                        </h2>
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Site Name</label>
                                <input
                                    type="text"
                                    name="siteName"
                                    value={settings.siteName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="maintenanceMode"
                                    checked={settings.maintenanceMode}
                                    onChange={handleChange}
                                    id="maintenanceMode"
                                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-orange-500 focus:ring-orange-500/50"
                                />
                                <label htmlFor="maintenanceMode" className="text-sm text-gray-300">Maintenance Mode</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="allowRegistration"
                                    checked={settings.allowRegistration}
                                    onChange={handleChange}
                                    id="allowRegistration"
                                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-orange-500 focus:ring-orange-500/50"
                                />
                                <label htmlFor="allowRegistration" className="text-sm text-gray-300">Allow New Registrations</label>
                            </div>
                        </div>
                    </div>

                    {/* Email Settings */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-green-400" />
                            Email Configuration
                        </h2>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Sender Email</label>
                            <input
                                type="email"
                                name="emailSender"
                                value={settings.emailSender}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* System Settings */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Database className="w-5 h-5 text-purple-400" />
                            System Limits
                        </h2>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Max Upload Size (MB)</label>
                            <input
                                type="number"
                                name="maxUploadSize"
                                value={settings.maxUploadSize}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
