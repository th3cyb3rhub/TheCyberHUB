"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, Briefcase,
    Plus, X, Loader2, CheckCircle, Send
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

const BLOCKED_DOMAINS = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
    'aol.com', 'icloud.com', 'mail.com', 'protonmail.com', 'yandex.com',
    'zoho.com', 'gmx.com', 'inbox.com', 'fastmail.com', 'tutanota.com',
    'pm.me', 'proton.me', 'googlemail.com', 'yahoo.co.in', 'rediffmail.com'
];

const isConsumerEmail = (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase();
    return BLOCKED_DOMAINS.includes(domain);
};

const PostJobPage = () => {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
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
        applicationDeadline: ''
    });

    const updateField = (field: string, value: string | string[]) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth');
        }
    }, [user, authLoading, router]);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black animate-pulse">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">
                    <div className="h-4 w-32 bg-gray-800 rounded mb-8"></div>
                    <div className="flex gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gray-800"></div>
                        <div className="space-y-2 py-1">
                            <div className="h-6 w-48 bg-gray-800 rounded"></div>
                            <div className="h-4 w-64 bg-gray-800 rounded"></div>
                        </div>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full w-full mb-8"></div>
                    <div className="space-y-6">
                        <div className="space-y-2"><div className="h-4 w-24 bg-gray-800 rounded"></div><div className="h-14 bg-gray-800 rounded-xl w-full"></div></div>
                        <div className="space-y-2"><div className="h-4 w-32 bg-gray-800 rounded"></div><div className="h-40 bg-gray-800 rounded-xl w-full"></div></div>
                    </div>
                </div>
            </div>
        );
    }
    if (!user) return null;
    if (isConsumerEmail(user.email)) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="max-w-md text-center p-8 rounded-2xl border border-red-500/20 bg-red-500/5">
                    <h2 className="text-xl font-bold text-white mb-3">Organization Email Required</h2>
                    <p className="text-gray-400 text-sm mb-4">Consumer emails (Gmail, Yahoo, etc.) cannot post jobs. Please use your organization email.</p>
                    <Link href="/employer" className="text-orange-400 hover:text-orange-300 text-sm">← Back to Dashboard</Link>
                </div>
            </div>
        );
    }

    const addListItem = (field: 'requirements' | 'responsibilities' | 'skills') => {
        setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const updateListItem = (field: 'requirements' | 'responsibilities' | 'skills', index: number, value: string) => {
        setForm(prev => ({
            ...prev,
            [field]: prev[field].map((item: string, i: number) => i === index ? value : item)
        }));
    };

    const removeListItem = (field: 'requirements' | 'responsibilities' | 'skills', index: number) => {
        setForm(prev => ({
            ...prev,
            [field]: prev[field].filter((_: string, i: number) => i !== index)
        }));
    };

    const toggleBenefit = (benefit: string) => {
        setForm(prev => ({
            ...prev,
            benefits: prev.benefits.includes(benefit)
                ? prev.benefits.filter(b => b !== benefit)
                : [...prev.benefits, benefit]
        }));
    };

    const handleSubmit = async () => {
        if (!form.title.trim() || form.title.trim().length < 5) {
            setError('Job title must be at least 5 characters');
            return;
        }
        if (!form.description.trim() || form.description.trim().length < 50) {
            setError('Job description must be at least 50 characters');
            return;
        }

        try {
            setSubmitting(true);
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
                applicationDeadline: form.applicationDeadline || undefined
            };

            await fetchApi('/api/jobs/employer', {
                method: 'POST',
                body: JSON.stringify(body),
            });

            router.push('/employer');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to post job');
        } finally {
            setSubmitting(false);
        }
    };

    const InputLabel = ({ label, required }: { label: string; required?: boolean }) => (
        <label className="block text-sm font-medium text-gray-300 mb-2">
            {label} {required && <span className="text-red-400">*</span>}
        </label>
    );

    const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors";
    const selectClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-orange-500/50 focus:outline-none";

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">
                {/* Header */}
                <Link href="/employer" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Post a New Job</h1>
                        <p className="text-sm text-gray-400">Fill in the details to create a job listing</p>
                    </div>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center gap-2 mb-8">
                    {[1, 2, 3].map((s) => (
                        <button
                            key={s}
                            onClick={() => setStep(s)}
                            className={`flex-1 h-1.5 rounded-full transition-colors ${s <= step ? 'bg-orange-500' : 'bg-white/10'}`}
                        />
                    ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-8 -mt-6">
                    <span className={step >= 1 ? 'text-orange-400' : ''}>Job Details</span>
                    <span className={step >= 2 ? 'text-orange-400' : ''}>Requirements & Skills</span>
                    <span className={step >= 3 ? 'text-orange-400' : ''}>Application & Benefits</span>
                </div>

                {error && (
                    <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* Step 1: Job Details */}
                {step === 1 && (
                    <div className="space-y-6">
                        <div>
                            <InputLabel label="Job Title" required />
                            <input type="text" value={form.title} onChange={e => updateField('title', e.target.value)}
                                placeholder="e.g. Senior Penetration Tester" className={inputClass} maxLength={200} />
                            <div className="flex justify-between mt-1.5">
                                <span className={`text-xs ${form.title.trim().length > 0 && form.title.trim().length < 5 ? 'text-red-400' : 'text-gray-600'}`}>
                                    {form.title.trim().length > 0 && form.title.trim().length < 5 ? 'Minimum 5 characters' : ''}
                                </span>
                                <span className="text-xs text-gray-600">{form.title.length}/200</span>
                            </div>
                        </div>

                        <div>
                            <InputLabel label="Job Description" required />
                            <textarea value={form.description} onChange={e => updateField('description', e.target.value)}
                                placeholder="Describe the role, team, and what the candidate will work on..."
                                rows={8} className={inputClass + " resize-y"} />
                            <div className="flex justify-between mt-1.5">
                                <span className={`text-xs ${form.description.trim().length > 0 && form.description.trim().length < 50 ? 'text-red-400' : 'text-gray-600'}`}>
                                    {form.description.trim().length > 0 && form.description.trim().length < 50
                                        ? `${50 - form.description.trim().length} more characters needed`
                                        : ''}
                                </span>
                                <span className="text-xs text-gray-600">{form.description.trim().length} chars</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <InputLabel label="Category" />
                                <select value={form.category} onChange={e => updateField('category', e.target.value)} className={selectClass}>
                                    {categories.map(c => <option key={c.id} value={c.id} className="bg-gray-900">{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <InputLabel label="Experience Level" />
                                <select value={form.experienceLevel} onChange={e => updateField('experienceLevel', e.target.value)} className={selectClass}>
                                    {experienceLevels.map(l => <option key={l.id} value={l.id} className="bg-gray-900">{l.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <InputLabel label="Employment Type" />
                                <select value={form.employmentType} onChange={e => updateField('employmentType', e.target.value)} className={selectClass}>
                                    {employmentTypes.map(t => <option key={t.id} value={t.id} className="bg-gray-900">{t.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <InputLabel label="Location Type" />
                                <select value={form.locationType} onChange={e => updateField('locationType', e.target.value)} className={selectClass}>
                                    {locationTypes.map(l => <option key={l.id} value={l.id} className="bg-gray-900">{l.name}</option>)}
                                </select>
                            </div>
                        </div>

                        {form.locationType !== 'remote' && (
                            <div>
                                <InputLabel label="Location" />
                                <input type="text" value={form.location} onChange={e => updateField('location', e.target.value)}
                                    placeholder="e.g. San Francisco, CA" className={inputClass} />
                            </div>
                        )}

                        <div>
                            <InputLabel label="Salary Range (optional)" />
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <input type="number" value={form.salaryMin} onChange={e => updateField('salaryMin', e.target.value)}
                                    placeholder="Min" className={inputClass} />
                                <input type="number" value={form.salaryMax} onChange={e => updateField('salaryMax', e.target.value)}
                                    placeholder="Max" className={inputClass} />
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

                        <div className="flex justify-end">
                            <button onClick={() => setStep(2)}
                                disabled={form.title.trim().length < 5 || form.description.trim().length < 50}
                                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors">
                                Next Step →
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Requirements & Skills */}
                {step === 2 && (
                    <div className="space-y-8">
                        {(['requirements', 'responsibilities'] as const).map((field) => (
                            <div key={field}>
                                <InputLabel label={field === 'requirements' ? 'Requirements' : 'Responsibilities'} />
                                <div className="space-y-3">
                                    {form[field].map((item: string, index: number) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text" value={item}
                                                onChange={e => updateListItem(field, index, e.target.value)}
                                                placeholder={field === 'requirements' ? 'e.g. 3+ years pentesting experience' : 'e.g. Conduct vulnerability assessments'}
                                                className={inputClass}
                                            />
                                            {form[field].length > 1 && (
                                                <button onClick={() => removeListItem(field, index)} className="p-3 text-gray-500 hover:text-red-400 transition-colors">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button onClick={() => addListItem(field)} className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors">
                                        <Plus className="w-4 h-4" /> Add {field === 'requirements' ? 'requirement' : 'responsibility'}
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div>
                            <InputLabel label="Skills / Tags" />
                            <div className="space-y-3">
                                {form.skills.map((skill, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input type="text" value={skill}
                                            onChange={e => updateListItem('skills', index, e.target.value)}
                                            placeholder="e.g. Burp Suite, Nmap, Python" className={inputClass} />
                                        {form.skills.length > 1 && (
                                            <button onClick={() => removeListItem('skills', index)} className="p-3 text-gray-500 hover:text-red-400 transition-colors">
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button onClick={() => addListItem('skills')} className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors">
                                    <Plus className="w-4 h-4" /> Add skill
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button onClick={() => setStep(1)} className="px-6 py-3 border border-white/10 text-gray-400 hover:text-white rounded-xl transition-colors">
                                ← Previous
                            </button>
                            <button onClick={() => setStep(3)} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors">
                                Next Step →
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Application & Benefits */}
                {step === 3 && (
                    <div className="space-y-8">
                        <div>
                            <InputLabel label="Application URL" />
                            <input type="url" value={form.applyUrl} onChange={e => updateField('applyUrl', e.target.value)}
                                placeholder="https://careers.yourcompany.com/apply/..." className={inputClass} />
                        </div>

                        <div>
                            <InputLabel label="Application Email (fallback)" />
                            <input type="email" value={form.applyEmail} onChange={e => updateField('applyEmail', e.target.value)}
                                placeholder="hr@yourcompany.com" className={inputClass} />
                        </div>

                        <div>
                            <InputLabel label="Application Deadline" />
                            <input type="date" value={form.applicationDeadline} onChange={e => updateField('applicationDeadline', e.target.value)}
                                className={inputClass} />
                        </div>

                        <div>
                            <InputLabel label="Benefits & Perks" />
                            <div className="flex flex-wrap gap-2">
                                {commonBenefits.map(benefit => (
                                    <button
                                        key={benefit}
                                        onClick={() => toggleBenefit(benefit)}
                                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors border ${form.benefits.includes(benefit)
                                            ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                                            : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        {form.benefits.includes(benefit) && <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" />}
                                        {benefit}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button onClick={() => setStep(2)} className="px-6 py-3 border border-white/10 text-gray-400 hover:text-white rounded-xl transition-colors">
                                ← Previous
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting || !form.title || !form.description}
                                    className="flex items-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
                                >
                                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    {submitting ? 'Posting...' : 'Post Job'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PostJobPage;
