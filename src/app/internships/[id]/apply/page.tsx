'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Loader2, Sparkles, Send } from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';

interface Cohort {
    _id: string;
    title: string;
    description: string;
    type: string;
    applicationDeadline: string;
    status: string;
}

export default function ApplyPage() {
    const params = useParams();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { addToast } = useToast();

    const [cohort, setCohort] = useState<Cohort | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        coverLetter: '',
        githubUrl: '',
        linkedinUrl: '',
        portfolioUrl: '',
        resumeUrl: ''
    });

    useEffect(() => {
        if (!authLoading && !user) {
            router.push(`/auth?redirect=/internships/${params.id}`);
            return;
        }

        const fetchCohort = async () => {
            try {
                const data = await fetchApi(`/api/internships/${params.id}`);

                if (data.userApplication) {
                    addToast({ title: 'Error', message: 'You have already applied to this program.', variant: 'error' });
                    router.push(`/internships/${params.id}`);
                    return;
                }

                if (data.data.status !== 'open' || new Date() > new Date(data.data.applicationDeadline)) {
                    addToast({ title: 'Error', message: 'This program is no longer accepting applications.', variant: 'error' });
                    router.push(`/internships/${params.id}`);
                    return;
                }

                setCohort(data.data);
            } catch (error) {
                console.error('Failed to fetch details:', error);
                addToast({ title: 'Error', message: 'Failed to load application', variant: 'error' });
            } finally {
                setLoading(false);
            }
        };

        if (params.id && user) fetchCohort();
    }, [params.id, router, authLoading, user]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await fetchApi(`/api/internships/${params.id}/apply`, {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            addToast({ title: 'Success', message: 'Application submitted successfully!', variant: 'success' });
            router.push(`/internships/${params.id}`);
        } catch (error) {
            console.error('Submission error:', error);
            addToast({ title: 'Error', message: 'Something went wrong during submission.', variant: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-black flex justify-center items-center">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!cohort) return null;

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4">
            <div className="max-w-2xl mx-auto">
                <Link href={`/internships/${cohort._id}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to {cohort.title}
                </Link>

                <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5 text-orange-400" />
                            <h1 className="text-2xl font-bold text-white">Apply to Program</h1>
                        </div>
                        <p className="text-gray-400">
                            You are applying to <strong className="text-white">{cohort.title}</strong>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Why do you want to join this program? (Cover Letter) <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="coverLetter"
                                required
                                value={formData.coverLetter}
                                onChange={handleChange}
                                rows={6}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none transition-all"
                                placeholder="Tell us about yourself, your goals, and why you're a good fit..."
                            />
                            <p className="text-xs text-gray-500 mt-2">Maximum 3000 characters.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">GitHub Profile URL</label>
                                <input
                                    type="url"
                                    name="githubUrl"
                                    value={formData.githubUrl}
                                    onChange={handleChange}
                                    placeholder="https://github.com/username"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn Profile URL</label>
                                <input
                                    type="url"
                                    name="linkedinUrl"
                                    value={formData.linkedinUrl}
                                    onChange={handleChange}
                                    placeholder="https://linkedin.com/in/username"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio / Personal Website</label>
                            <input
                                type="url"
                                name="portfolioUrl"
                                value={formData.portfolioUrl}
                                onChange={handleChange}
                                placeholder="https://yourwebsite.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Resume URL (Google Drive, Dropbox, etc.)</label>
                            <input
                                type="url"
                                name="resumeUrl"
                                value={formData.resumeUrl}
                                onChange={handleChange}
                                placeholder="https://drive.google.com/..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-2">Make sure the link is publicly accessible.</p>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full flex justify-center items-center gap-2 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                {submitting ? 'Submitting Application...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
