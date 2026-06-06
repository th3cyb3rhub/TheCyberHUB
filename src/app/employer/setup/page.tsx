"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { fetchApi } from '@/lib/api';
import {
    Building2,
    Globe,
    MapPin,
    FileText,
    Briefcase,
    Users,
    Loader2,
    CheckCircle,
    ArrowRight,
} from 'lucide-react';

const COMPANY_SIZES = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];

const INDUSTRIES = [
    'Cybersecurity', 'Information Technology', 'Software Development',
    'Cloud Computing', 'Consulting', 'Financial Services', 'Healthcare IT',
    'Defense & Government', 'Telecommunications', 'Education', 'Other',
];

export default function EmployerSetupPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { addToast } = useToast();

    const [step, setStep] = useState<1 | 2>(1);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        name: '',
        website: '',
        description: '',
        industry: '',
        size: '',
        location: '',
        socialLinks: { linkedin: '', twitter: '' },
    });

    const set = (field: string, value: string) =>
        setForm(prev => ({ ...prev, [field]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        setSaving(true);
        try {
            const payload = {
                ...form,
                website: form.website || undefined,
                socialLinks: {
                    linkedin: form.socialLinks.linkedin || undefined,
                    twitter: form.socialLinks.twitter || undefined,
                },
            };
            await fetchApi('/api/companies/become-employer', {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            addToast({
                variant: 'success',
                title: 'Employer account created!',
                message: 'You can now post jobs and manage your company profile.',
            });
            // Reload so AuthContext picks up the new role
            window.location.href = '/employer';
        } catch (err) {
            addToast({
                variant: 'error',
                title: 'Setup failed',
                message: err instanceof Error ? err.message : 'Please try again.',
            });
        } finally {
            setSaving(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user) {
        router.push('/auth');
        return null;
    }

    if (['employer', 'admin', 'owner'].includes(user.role)) {
        router.push('/employer');
        return null;
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative max-w-2xl mx-auto px-4 pt-28 pb-20">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
                        <Building2 className="w-8 h-8 text-orange-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Set up your employer account</h1>
                    <p className="text-gray-400">Create your company profile and start hiring cybersecurity talent.</p>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-8">
                    <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-orange-500' : 'bg-white/10'}`} />
                    <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-orange-500' : 'bg-white/10'}`} />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                    {step === 1 && (
                        <>
                            <h2 className="text-lg font-semibold text-white mb-4">Company basics</h2>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Company Name *</label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={e => set('name', e.target.value)}
                                        placeholder="Acme Cybersecurity Inc."
                                        required
                                        maxLength={100}
                                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Website</label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="url"
                                        value={form.website}
                                        onChange={e => set('website', e.target.value)}
                                        placeholder="https://yourcompany.com"
                                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Industry</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                    <select
                                        value={form.industry}
                                        onChange={e => set('industry', e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none transition-colors appearance-none"
                                    >
                                        <option value="" className="bg-gray-900">Select industry</option>
                                        {INDUSTRIES.map(i => (
                                            <option key={i} value={i} className="bg-gray-900">{i}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-400 mb-2">Company Size</label>
                                    <div className="relative">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                        <select
                                            value={form.size}
                                            onChange={e => set('size', e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500/50 focus:outline-none transition-colors appearance-none"
                                        >
                                            <option value="" className="bg-gray-900">Select size</option>
                                            {COMPANY_SIZES.map(s => (
                                                <option key={s} value={s} className="bg-gray-900">{s} employees</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <label className="block text-sm text-gray-400 mb-2">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="text"
                                            value={form.location}
                                            onChange={e => set('location', e.target.value)}
                                            placeholder="San Francisco, CA"
                                            maxLength={150}
                                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!form.name.trim()) return;
                                        setStep(2);
                                    }}
                                    disabled={!form.name.trim()}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/40 text-white font-medium rounded-xl transition-all"
                                >
                                    Next
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2 className="text-lg font-semibold text-white mb-4">Company description</h2>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">About your company</label>
                                <div className="relative">
                                    <FileText className="absolute left-4 top-3 w-4 h-4 text-gray-500" />
                                    <textarea
                                        value={form.description}
                                        onChange={e => set('description', e.target.value)}
                                        placeholder="Tell candidates about your company, culture, and mission..."
                                        rows={5}
                                        maxLength={5000}
                                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors resize-none"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{form.description.length}/5000</p>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-3">Social links (optional)</label>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        value={form.socialLinks.linkedin}
                                        onChange={e => setForm(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, linkedin: e.target.value } }))}
                                        placeholder="LinkedIn company URL"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                    />
                                    <input
                                        type="text"
                                        value={form.socialLinks.twitter}
                                        onChange={e => setForm(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, twitter: e.target.value } }))}
                                        placeholder="Twitter/X handle or URL"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="flex-1 px-6 py-3 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 rounded-xl transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-xl transition-all"
                                >
                                    {saving ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <CheckCircle className="w-4 h-4" />
                                    )}
                                    Create Employer Account
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
