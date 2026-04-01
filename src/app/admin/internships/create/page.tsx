'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';

export default function CreateCohortPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { addToast } = useToast();
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'internship',
        status: 'draft',
        capacity: 0,
        startDate: '',
        endDate: '',
        applicationDeadline: '',
        requirements: '',
        technologies: '',
        responsibilities: '',
        benefits: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Convert comma-separated strings to arrays
        const stringToArray = (str: string) => str.split('\n').filter(s => s.trim() !== '');
        const payload = {
            ...formData,
            capacity: Number(formData.capacity),
            requirements: stringToArray(formData.requirements),
            technologies: formData.technologies.split(',').map(s => s.trim()).filter(s => s !== ''),
            responsibilities: stringToArray(formData.responsibilities),
            benefits: stringToArray(formData.benefits)
        };

        try {
            await fetchApi('/api/admin/internships', {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            addToast({ title: 'Success', message: 'Program created successfully', variant: 'success' });
            router.push('/admin/internships');
        } catch (error) {
            console.error('Error creating program:', error);
            addToast({ title: 'Error', message: 'An error occurred', variant: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex justify-center items-center">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user || user.role === 'user') {
        router.push('/admin');
        return null;
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin/internships" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Programs
                </Link>

                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 items-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Create New Program</h1>
                    <p className="text-gray-400 mb-8">Launch a new community internship or cohort.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Program Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g., Winter 2026 Security Operations Center Internship"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Description <span className="text-red-500">*</span></label>
                                <textarea
                                    name="description"
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Brief overview of the program..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all"
                                >
                                    <option value="internship" className="bg-gray-950 text-white">Internship</option>
                                    <option value="mentorship" className="bg-gray-950 text-white">Mentorship Cohort</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Initial Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all"
                                >
                                    <option value="draft" className="bg-gray-950 text-white">Draft (Hidden)</option>
                                    <option value="open" className="bg-gray-950 text-white">Open (Accepting Apps)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Capacity (0 for Unlimited)</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    min="0"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Application Deadline <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    name="applicationDeadline"
                                    required
                                    value={formData.applicationDeadline}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Start Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    name="startDate"
                                    required
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">End Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    name="endDate"
                                    required
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (Comma separated)</label>
                                <input
                                    type="text"
                                    name="technologies"
                                    value={formData.technologies}
                                    onChange={handleChange}
                                    placeholder="React, Node.js, Splunk, WireShark"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Prerequisites/Requirements (One per line)</label>
                                <textarea
                                    name="requirements"
                                    rows={3}
                                    value={formData.requirements}
                                    onChange={handleChange}
                                    placeholder="Must know basics of networking..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all resize-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Responsibilities (One per line)</label>
                                <textarea
                                    name="responsibilities"
                                    rows={3}
                                    value={formData.responsibilities}
                                    onChange={handleChange}
                                    placeholder="Analyze PCAP files..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all resize-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Benefits/What they will learn (One per line)</label>
                                <textarea
                                    name="benefits"
                                    rows={3}
                                    value={formData.benefits}
                                    onChange={handleChange}
                                    placeholder="Certificate of completion..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all resize-none"
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 flex justify-end">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all disabled:opacity-50"
                            >
                                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Publish Program
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
