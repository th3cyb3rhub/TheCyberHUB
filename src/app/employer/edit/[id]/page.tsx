/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, Briefcase, Save, Loader2, Plus, X, CheckCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import Footer from '@/components/Footer';

const categories = [
    { id: 'pentesting', name: 'Penetration Testing' },
    { id: 'soc', name: 'SOC / Security Operations' },
    { id: 'grc', name: 'GRC / Compliance' },
    { id: 'devsecops', name: 'DevSecOps' },
    { id: 'forensics', name: 'Digital Forensics' },
    { id: 'malware', name: 'Malware Analysis' },
    { id: 'cloud-security', name: 'Cloud Security' },
    { id: 'appsec', name: 'Application Security' },
    { id: 'other', name: 'Other' }
];

const experienceLevels = [
    { id: 'entry', name: 'Entry Level' },
    { id: 'mid', name: 'Mid Level' },
    { id: 'senior', name: 'Senior' },
    { id: 'lead', name: 'Lead / Manager' },
    { id: 'executive', name: 'Executive' }
];

const employmentTypes = [
    { id: 'full-time', name: 'Full-time' },
    { id: 'part-time', name: 'Part-time' },
    { id: 'contract', name: 'Contract' },
    { id: 'freelance', name: 'Freelance' },
    { id: 'internship', name: 'Internship' }
];

const locationTypes = [
    { id: 'remote', name: 'Remote' },
    { id: 'hybrid', name: 'Hybrid' },
    { id: 'onsite', name: 'On-site' }
];

const commonBenefits = [
    'Health Insurance', 'Dental Insurance', 'Vision Insurance', '401(k)',
    'Remote Work', 'Flexible Hours', 'Unlimited PTO', 'Stock Options',
    'Professional Development', 'Conference Budget', 'Home Office Stipend',
    'Gym Membership', 'Mental Health Support', 'Parental Leave'
];

const EditJobPage = () => {
    const { user, token, loading: authLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const jobId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        title: '',
        description: '',
        category: 'other',
        experienceLevel: 'mid',
        employmentType: 'full-time',
        locationType: 'remote',
        location: '',
        salaryMin: '',
        salaryMax: '',
        salaryCurrency: 'USD',
        salaryPeriod: 'yearly',
        requirements: [''],
        responsibilities: [''],
        skills: [''],
        benefits: [] as string[],
        applyUrl: '',
        applyEmail: '',
        applicationDeadline: '',
        isActive: true
    });

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth');
            return;
        }
        if (token && jobId) fetchJob();
    }, [token, jobId, user, authLoading, router]);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
        );
    }
    if (!user) return null;

    const fetchJob = async () => {
        try {
            const data = await fetchApi(`/api/jobs/${jobId}`);
            const job = data.data;
            setForm({
                title: job.title || '',
                description: job.description || '',
                category: job.category || 'other',
                experienceLevel: job.experienceLevel || 'mid',
                employmentType: job.employmentType || 'full-time',
                locationType: job.locationType || 'remote',
                location: job.location || '',
                salaryMin: job.salary?.min?.toString() || '',
                salaryMax: job.salary?.max?.toString() || '',
                salaryCurrency: job.salary?.currency || 'USD',
                salaryPeriod: job.salary?.period || 'yearly',
                requirements: job.requirements?.length ? job.requirements : [''],
                responsibilities: job.responsibilities?.length ? job.responsibilities : [''],
                skills: job.skills?.length ? job.skills : [''],
                benefits: job.benefits || [],
                applyUrl: job.applyUrl || '',
                applyEmail: job.applyEmail || '',
                applicationDeadline: job.applicationDeadline ? new Date(job.applicationDeadline).toISOString().split('T')[0] : '',
                isActive: job.isActive ?? true
            });
        } catch {
            setError('Failed to load job');
        } finally {
            setLoading(false);
        }
    };

    const updateField = (field: string, value: string | string[] | boolean) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const addListItem = (field: 'requirements' | 'responsibilities' | 'skills') => {
        setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const updateListItem = (field: 'requirements' | 'responsibilities' | 'skills', index: number, value: string) => {
        setForm(prev => ({ ...prev, [field]: prev[field].map((item: string, i: number) => i === index ? value : item) }));
    };

    const removeListItem = (field: 'requirements' | 'responsibilities' | 'skills', index: number) => {
        setForm(prev => ({ ...prev, [field]: prev[field].filter((_: string, i: number) => i !== index) }));
    };

    const toggleBenefit = (benefit: string) => {
        setForm(prev => ({
            ...prev,
            benefits: prev.benefits.includes(benefit)
                ? prev.benefits.filter(b => b !== benefit)
                : [...prev.benefits, benefit]
        }));
    };

    const handleSave = async () => {
        if (!form.title.trim() || form.title.trim().length < 5) {
            setError('Job title must be at least 5 characters');
            return;
        }
        if (!form.description.trim() || form.description.trim().length < 50) {
            setError('Job description must be at least 50 characters');
            return;
        }
        try {
            setSaving(true);
            setError('');

            const body = {
                title: form.title,
                description: form.description,
                category: form.category,
                experienceLevel: form.experienceLevel,
                employmentType: form.employmentType,
                locationType: form.locationType,
                location: form.location || undefined,
                salary: (form.salaryMin || form.salaryMax) ? {
                    min: form.salaryMin ? parseInt(form.salaryMin) : undefined,
                    max: form.salaryMax ? parseInt(form.salaryMax) : undefined,
                    currency: form.salaryCurrency,
                    period: form.salaryPeriod
                } : undefined,
                requirements: form.requirements.filter(r => r.trim()),
                responsibilities: form.responsibilities.filter(r => r.trim()),
                skills: form.skills.filter(s => s.trim()),
                benefits: form.benefits,
                applyUrl: form.applyUrl || undefined,
                applyEmail: form.applyEmail || undefined,
                applicationDeadline: form.applicationDeadline || undefined,
                isActive: form.isActive
            };

            await fetchApi(`/api/jobs/employer/${jobId}`, {
                method: 'PUT',
                body: JSON.stringify(body),
            });

            router.push('/employer');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update job');
        } finally {
            setSaving(false);
        }
    };

    const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors";
    const selectClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500/50 focus:outline-none";

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">
                <Link href="/employer" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Edit Job</h1>
                            <p className="text-sm text-gray-400">Update your job listing details</p>
                        </div>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <span className="text-sm text-gray-400">Active</span>
                        <button
                            onClick={() => updateField('isActive', !form.isActive)}
                            className={`w-12 h-6 rounded-full transition-colors ${form.isActive ? 'bg-green-500' : 'bg-white/10'} relative`}
                        >
                            <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${form.isActive ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button>
                    </label>
                </div>

                {error && (
                    <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
                )}

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Job Title *</label>
                        <input type="text" value={form.title} onChange={e => updateField('title', e.target.value)} className={inputClass} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                        <textarea value={form.description} onChange={e => updateField('description', e.target.value)} rows={8} className={inputClass + " resize-y"} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                            <select value={form.category} onChange={e => updateField('category', e.target.value)} className={selectClass}>
                                {categories.map(c => <option key={c.id} value={c.id} className="bg-gray-900">{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
                            <select value={form.experienceLevel} onChange={e => updateField('experienceLevel', e.target.value)} className={selectClass}>
                                {experienceLevels.map(l => <option key={l.id} value={l.id} className="bg-gray-900">{l.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Employment Type</label>
                            <select value={form.employmentType} onChange={e => updateField('employmentType', e.target.value)} className={selectClass}>
                                {employmentTypes.map(t => <option key={t.id} value={t.id} className="bg-gray-900">{t.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Location Type</label>
                            <select value={form.locationType} onChange={e => updateField('locationType', e.target.value)} className={selectClass}>
                                {locationTypes.map(l => <option key={l.id} value={l.id} className="bg-gray-900">{l.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {form.locationType !== 'remote' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                            <input type="text" value={form.location} onChange={e => updateField('location', e.target.value)} className={inputClass} />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Salary Range</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <input type="number" value={form.salaryMin} onChange={e => updateField('salaryMin', e.target.value)} placeholder="Min" className={inputClass} />
                            <input type="number" value={form.salaryMax} onChange={e => updateField('salaryMax', e.target.value)} placeholder="Max" className={inputClass} />
                            <select value={form.salaryCurrency} onChange={e => updateField('salaryCurrency', e.target.value)} className={selectClass}>
                                <option value="USD" className="bg-gray-900">USD</option>
                                <option value="EUR" className="bg-gray-900">EUR</option>
                                <option value="GBP" className="bg-gray-900">GBP</option>
                                <option value="INR" className="bg-gray-900">INR</option>
                            </select>
                            <select value={form.salaryPeriod} onChange={e => updateField('salaryPeriod', e.target.value)} className={selectClass}>
                                <option value="yearly" className="bg-gray-900">Yearly</option>
                                <option value="monthly" className="bg-gray-900">Monthly</option>
                                <option value="hourly" className="bg-gray-900">Hourly</option>
                            </select>
                        </div>
                    </div>

                    {/* Requirements, Responsibilities, Skills */}
                    {(['requirements', 'responsibilities', 'skills'] as const).map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">{field}</label>
                            <div className="space-y-2">
                                {form[field].map((item: string, idx: number) => (
                                    <div key={idx} className="flex gap-2">
                                        <input type="text" value={item} onChange={e => updateListItem(field, idx, e.target.value)} className={inputClass} />
                                        {form[field].length > 1 && (
                                            <button onClick={() => removeListItem(field, idx)} className="p-3 text-gray-500 hover:text-red-400" aria-label={`Remove ${field} item`}><X className="w-4 h-4" /></button>
                                        )}
                                    </div>
                                ))}
                                <button onClick={() => addListItem(field)} className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300">
                                    <Plus className="w-4 h-4" /> Add
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Benefits */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Benefits</label>
                        <div className="flex flex-wrap gap-2">
                            {commonBenefits.map(b => (
                                <button key={b} onClick={() => toggleBenefit(b)}
                                    className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${form.benefits.includes(b) ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}>
                                    {form.benefits.includes(b) && <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" />}{b}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Apply URL</label>
                            <input type="url" value={form.applyUrl} onChange={e => updateField('applyUrl', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Apply Email</label>
                            <input type="email" value={form.applyEmail} onChange={e => updateField('applyEmail', e.target.value)} className={inputClass} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Application Deadline</label>
                        <input type="date" value={form.applicationDeadline} onChange={e => updateField('applicationDeadline', e.target.value)} className={inputClass} />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button onClick={handleSave} disabled={saving}
                            className="flex items-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium rounded-xl transition-colors">
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditJobPage;
