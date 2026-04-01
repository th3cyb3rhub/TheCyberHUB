"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, ArrowLeft, Plus, X, Upload, Loader2, Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fetchApi, uploadFile } from '@/lib/api';

const categories = ['web', 'crypto', 'pwn', 'reverse', 'forensics', 'misc', 'osint'];
const difficulties = ['easy', 'medium', 'hard', 'insane'];
export default function EditChallengePage() {
    const router = useRouter();
    const params = useParams();
    const challengeId = params.id as string;
    useAuth();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        title: '',
        description: '',
        shortDescription: '',
        category: 'web',
        difficulty: 'easy',
        tags: [] as string[],
        basePoints: 100,
        dynamicScoring: false,
        flag: '',
        flagFormat: 'flag{...}',
        isCaseSensitive: true,
        hints: [] as { text: string; pointsDeduction: number }[],
        files: [] as { filename: string; url: string; size: number }[],
        instanceUrl: '',
        instanceType: 'static',
        status: 'draft',
        isFeatured: false,
        solveLimit: '',
    });

    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        if (!challengeId) return;

        const fetchChallenge = async () => {
            try {
                const data = await fetchApi(`/api/challenges/${challengeId}`, { requireAuth: false });

                if (data.success && data.data) {
                    const c = data.data;
                    setForm({
                        title: c.title || '',
                        description: c.description || '',
                        shortDescription: c.shortDescription || '',
                        category: c.category || 'web',
                        difficulty: c.difficulty || 'easy',
                        tags: c.tags || [],
                        basePoints: c.basePoints || 100,
                        dynamicScoring: c.dynamicScoring || false,
                        flag: c.flag || '',
                        flagFormat: c.flagFormat || 'flag{...}',
                        isCaseSensitive: c.isCaseSensitive ?? true,
                        hints: c.hints || [],
                        files: c.files || [],
                        instanceUrl: c.instanceUrl || '',
                        instanceType: c.instanceType || 'static',
                        status: c.status || 'draft',
                        isFeatured: c.isFeatured || false,
                        solveLimit: c.solveLimit ? c.solveLimit.toString() : '',
                    });
                } else {
                    setError('Failed to load challenge details');
                }
            } catch (err: unknown) {
                console.error("Error fetching challenge", err);
                const message = err instanceof Error ? err.message : 'An error occurred';
                setError('Failed to fetch challenge: ' + message);
            } finally {
                setLoading(false);
            }
        };

        fetchChallenge();
    }, [challengeId]);

    const addTag = () => {
        if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
            setForm(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
    };

    const addHint = () => {
        setForm(prev => ({ ...prev, hints: [...prev.hints, { text: '', pointsDeduction: 0 }] }));
    };

    const updateHint = (index: number, field: string, value: string | number) => {
        setForm(prev => {
            const newHints = [...prev.hints];
            newHints[index] = { ...newHints[index], [field]: value };
            return { ...prev, hints: newHints };
        });
    };

    const removeHint = (index: number) => {
        setForm(prev => ({ ...prev, hints: prev.hints.filter((_, i) => i !== index) }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files.length) return;
        const file = e.target.files[0];

        try {
            const url = await uploadFile(file, 'challenges');
            setForm(prev => ({
                ...prev,
                files: [...prev.files, { filename: file.name, url, size: file.size }]
            }));
        } catch (err) {
            console.error(err);
            alert("Failed to upload file");
        }
    };

    const removeFile = (index: number) => {
        setForm(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const payload = {
                ...form,
                solveLimit: form.solveLimit ? parseInt(form.solveLimit) : undefined
            };

            const data = await fetchApi(`/api/challenges/${challengeId}`, {
                method: 'PUT',
                body: JSON.stringify(payload),
            });

            if (data.success) {
                router.push('/admin/challenges');
            } else {
                throw new Error(data.message || data.error?.message || 'Failed to update challenge');
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An error occurred';
            setError(message);
        } finally {
            setSubmitting(false);
        }
    };

    const InputLabel = ({ title, desc, required }: { title: string, desc?: string, required?: boolean }) => (
        <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
                {title} {required && <span className="text-red-400">*</span>}
            </label>
            {desc && <p className="text-xs text-gray-500 mt-0.5">{desc}</p>}
        </div>
    );

    const inputClass = "w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors";
    const selectClass = "w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none";

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 pt-28 pb-16 flex items-center justify-center">
                <div className="flex items-center gap-2 text-gray-400">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading challenge data...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 pt-28 pb-16">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin/challenges" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
                    <ArrowLeft className="w-4 h-4" /> Back to Challenges
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-orange-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Edit Challenge</h1>
                </div>

                {error && (
                    <div className="p-4 mb-8 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6">
                        <h2 className="text-lg font-semibold text-white">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <InputLabel title="Title" required />
                                <input type="text" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="e.g. SQL Injection 101" />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel title="Short Description" desc="Appears on the challenge card" />
                                <input type="text" value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} className={inputClass} maxLength={200} />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel title="Full Description" required desc="Markdown supported in frontend" />
                                <textarea required rows={6} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputClass} />
                            </div>

                            <div>
                                <InputLabel title="Category" required />
                                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={selectClass}>
                                    {categories.map(c => <option key={c} value={c} className="bg-gray-900 capitalize">{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <InputLabel title="Difficulty" required />
                                <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })} className={selectClass}>
                                    {difficulties.map(d => <option key={d} value={d} className="bg-gray-900 capitalize">{d}</option>)}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel title="Tags" />
                                <div className="flex gap-2 mb-2">
                                    <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} className={inputClass} placeholder="Add tag and press Enter" />
                                    <button type="button" onClick={addTag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10">Add</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {form.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-white/10 rounded-md text-xs flex items-center gap-1">
                                            {tag} <X className="w-3 h-3 cursor-pointer hover:text-red-400" onClick={() => removeTag(tag)} />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scoring & Flag */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6">
                        <h2 className="text-lg font-semibold text-white">Scoring & Flag</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel title="Base Points" required />
                                <input type="number" min="10" required value={form.basePoints} onChange={e => setForm({ ...form, basePoints: parseInt(e.target.value) || 0 })} className={inputClass} />
                            </div>

                            <div className="flex items-center mt-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={form.dynamicScoring} onChange={e => setForm({ ...form, dynamicScoring: e.target.checked })} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-900" />
                                    <span className="text-sm font-medium text-gray-300">Enable Dynamic Scoring</span>
                                </label>
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel title="Flag" required desc="The actual secret string users need to submit" />
                                <input type="text" required value={form.flag} onChange={e => setForm({ ...form, flag: e.target.value })} className={`${inputClass} font-mono`} placeholder="flag{super_secret_string}" />
                            </div>

                            <div>
                                <InputLabel title="Flag Format" desc="Hint for the user on what format to expect" />
                                <input type="text" value={form.flagFormat} onChange={e => setForm({ ...form, flagFormat: e.target.value })} className={`${inputClass} font-mono`} />
                            </div>

                            <div className="flex items-center mt-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={form.isCaseSensitive} onChange={e => setForm({ ...form, isCaseSensitive: e.target.checked })} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-orange-500" />
                                    <span className="text-sm font-medium text-gray-300">Case Sensitive Flag Validation</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Instance Hosting */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6">
                        <h2 className="text-lg font-semibold text-white">Instance & Connections</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel title="Instance Type" desc="What kind of target is this?" />
                                <select value={form.instanceType} onChange={e => setForm({ ...form, instanceType: e.target.value })} className={selectClass}>
                                    <option value="static" className="bg-gray-900">Static (Files only)</option>
                                    <option value="web" className="bg-gray-900">Web App (Browser link)</option>
                                    <option value="network" className="bg-gray-900">Network (IP / Netcat)</option>
                                    <option value="fargate" className="bg-gray-900">Dynamic (AWS Fargate)</option>
                                    <option value="ova" className="bg-gray-900">Dynamic (AWS EC2/OVA)</option>
                                </select>
                            </div>

                            <div>
                                <InputLabel title="Instance URL / Connection String" desc="e.g. http://104.248.1.1:8080 or ami-12345" />
                                <input type="text" value={form.instanceUrl} onChange={e => setForm({ ...form, instanceUrl: e.target.value })} className={inputClass} placeholder="URL or AMI ID..." disabled={form.instanceType === 'static'} />
                            </div>
                        </div>
                    </div>

                    {/* Hints & Files */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Hints */}
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-white">Hints</h2>
                                <button type="button" onClick={addHint} className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1">
                                    <Plus className="w-3 h-3" /> Add Hint
                                </button>
                            </div>

                            {form.hints.map((hint, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3 relative">
                                    <button type="button" onClick={() => removeHint(i)} className="absolute top-2 right-2 text-gray-500 hover:text-red-400">
                                        <X className="w-4 h-4" />
                                    </button>
                                    <InputLabel title={`Hint ${i + 1}`} />
                                    <textarea value={hint.text} onChange={e => updateHint(i, 'text', e.target.value)} className={inputClass} rows={2} required />
                                    <div>
                                        <InputLabel title="Points Penalty" />
                                        <input type="number" min="0" value={hint.pointsDeduction} onChange={e => updateHint(i, 'pointsDeduction', parseInt(e.target.value) || 0)} className={inputClass} />
                                    </div>
                                </div>
                            ))}
                            {form.hints.length === 0 && <p className="text-sm text-gray-500 italic">No hints added.</p>}
                        </div>

                        {/* Files */}
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
                            <h2 className="text-lg font-semibold text-white">Attached Files</h2>

                            <label className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-orange-500/50 hover:bg-orange-500/5 transition-all text-sm text-gray-400">
                                <Upload className="w-4 h-4" /> Upload File to S3
                                <input type="file" className="hidden" onChange={handleFileUpload} />
                            </label>

                            <div className="space-y-2">
                                {form.files.map((file, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 text-sm">
                                        <span className="truncate flex-1 text-white">{file.filename} <span className="text-gray-500 text-xs ml-2">({(file.size / 1024).toFixed(1)} KB)</span></span>
                                        <button type="button" onClick={() => removeFile(i)} className="text-gray-500 hover:text-red-400 ml-3">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Publishing */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="flex-1">
                                <InputLabel title="Status" />
                                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={selectClass}>
                                    <option value="draft" className="bg-gray-900">Draft (Hidden)</option>
                                    <option value="active" className="bg-gray-900">Active (Public)</option>
                                    <option value="archived" className="bg-gray-900">Archived (Read-only)</option>
                                </select>
                            </div>
                            <div className="flex flex-col items-center mt-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-900" />
                                    <span className="text-sm font-medium text-gray-300">Featured Challenge</span>
                                </label>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                            <Link href="/admin/challenges" className="px-6 py-2 border border-white/10 text-white rounded-lg hover:bg-white/5">Cancel</Link>
                            <button type="submit" disabled={submitting} className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg disabled:opacity-50 transition-colors">
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {submitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
