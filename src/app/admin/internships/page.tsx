'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Plus, Edit, Users, Loader2 } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';

export default function AdminInternshipsPage() {
    const { user, loading: authLoading } = useAuth();
    const { addToast } = useToast();
    interface Cohort { _id: string; title: string; type: string; status: string; applicationDeadline: string; startDate: string; endDate: string; maxParticipants?: number; applicationsCount?: number; }
    const [cohorts, setCohorts] = useState<Cohort[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCohorts = async () => {
            try {
                // Admins see all cohorts regardless of status using ?all=true
                const data = await fetchApi('/api/internships?all=true');
                setCohorts(data.data);
            } catch (error) {
                console.error('Failed to fetch admin cohorts', error);
                addToast({ title: 'Error', message: 'Failed to load cohorts', variant: 'error' });
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading && user) fetchCohorts();
    }, [authLoading, user]);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'open': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'in-progress': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'completed': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
            case 'draft': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            default: return 'bg-white/5 text-gray-400 border-white/10';
        }
    };

    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex justify-center items-center">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Internship Programs</h1>
                        <p className="text-gray-400">Manage community cohorts, internships, and applications.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/internships/create"
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
                        >
                            <Plus className="w-4 h-4" /> New Program
                        </Link>
                    </div>
                </div>

                <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5 text-sm uppercase text-gray-400">
                                    <th className="px-6 py-4 font-medium">Program Title</th>
                                    <th className="px-6 py-4 font-medium">Type</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium">Timeline</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {cohorts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                            No programs created yet.
                                        </td>
                                    </tr>
                                ) : (
                                    cohorts.map((cohort) => (
                                        <tr key={cohort._id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-white mb-1">{cohort.title}</div>
                                                <div className="text-xs text-gray-500">
                                                    Deadline: {new Date(cohort.applicationDeadline).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1 text-xs text-gray-300 capitalize bg-white/5 px-2 py-1 rounded">
                                                    {cohort.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2.5 py-1 rounded text-xs font-medium border capitalize ${getStatusStyle(cohort.status)}`}>
                                                    {cohort.status === 'in-progress' ? 'In Progress' : cohort.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400">
                                                {new Date(cohort.startDate).toLocaleDateString()} - {new Date(cohort.endDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/internships/${cohort._id}/applications`}
                                                        className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                                        title="View Applications"
                                                    >
                                                        <Users className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/internships/${cohort._id}/edit`}
                                                        className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                                        title="Edit Program"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
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
        </div>
    );
}
