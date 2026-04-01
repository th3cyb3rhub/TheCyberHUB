"use client"

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import dynamic from 'next/dynamic';

const ProfileChart = dynamic(() => import('@/components/charts/ProfileChart'), { ssr: false });
import {
    User,
    Mail,
    Calendar,
    Shield,
    LogOut,
    Lock,
    Save,
    Loader2,
    CheckCircle,
    AlertCircle,
    ExternalLink,
    BadgeCheck,
    Clock3,
    Camera,
    Flag,
    Star,
    Trophy,
    Eye,
    EyeOff,
    BarChart3,
    Award
} from 'lucide-react';
import { API_URL, fetchApi, tokenStore } from '@/lib/api';
const ProfilePage = () => {
    const router = useRouter();
    const { user, loading, logout, updateProfile, updatePassword, requestVerification } = useAuth();
    const [activeTab, setActiveTab] = useState<'stats' | 'profile' | 'security' | 'privacy'>('stats');
    const avatarInputRef = useRef<HTMLInputElement>(null);

    // User stats
    interface UserStats {
        ctfSolves: number;
        ctfPoints: number;
        rank: number;
        eventsAttended: number;
        blogPosts: number;
    }
    const [stats, setStats] = useState<UserStats | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);

    // Avatar upload
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [avatarLoading, setAvatarLoading] = useState(false);

    // Avatar upload handler
    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
            addToast({ variant: 'error', title: 'Invalid file', message: 'Please upload a JPEG, PNG, GIF, or WebP image.' });
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            addToast({ variant: 'error', title: 'File too large', message: 'Maximum file size is 5MB.' });
            return;
        }

        setAvatarLoading(true);
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch(`${API_URL}/api/upload/avatar`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${tokenStore.get()}` },
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                setAvatarUrl(data.data.url);
                addToast({ variant: 'success', title: 'Avatar updated', message: 'Your profile picture has been updated.' });
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (err) {
            addToast({ variant: 'error', title: 'Upload failed', message: err instanceof Error ? err.message : 'Could not upload avatar.' });
        } finally {
            setAvatarLoading(false);
        }
    };

    // Privacy settings
    const [isProfilePublic, setIsProfilePublic] = useState(true);
    const [privacyLoading, setPrivacyLoading] = useState(false);

    // Profile form
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState(false);
    const [profileError, setProfileError] = useState<string | null>(null);

    // Password form
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    // Verification
    const [verificationLoading, setVerificationLoading] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState<string | null>(null);
    const [verificationError, setVerificationError] = useState<string | null>(null);
    const { addToast } = useToast();

    // 2FA Management
    const [is2FAEnabled, setIs2FAEnabled] = useState(user?.twoFactorAuth?.enabled || false);
    const [twoFactorLoading, setTwoFactorLoading] = useState(false);
    const [qrCodeData, setQrCodeData] = useState<{ secret: string, qr: string } | null>(null);
    const [setupCode, setSetupCode] = useState('');
    const [disableCode, setDisableCode] = useState('');
    const [disablePassword, setDisablePassword] = useState('');
    const [setupStep, setSetupStep] = useState<'initial' | 'generate' | 'verify'>('initial');
    const [disableStep, setDisableStep] = useState<'initial' | 'verify'>('initial');

    // Fetch user stats
    useEffect(() => {
        const fetchStats = async () => {
            if (!user) return;
            try {
                const data = await fetchApi(`/api/users/${user.username}/stats`, { requireAuth: false, credentials: 'include' });
                setStats(data.data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setStatsLoading(false);
            }
        };
        fetchStats();
    }, [user]);

    // Generate mock performance curve based on actual points
    const getPerformanceData = (totalPoints: number) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonth = new Date().getMonth();
        const data = [];

        for (let i = 5; i >= 0; i--) {
            let monthIndex = currentMonth - i;
            if (monthIndex < 0) monthIndex += 12;
            data.push({ name: months[monthIndex], points: 0 });
        }

        if (totalPoints > 0) {
            data[0].points = Math.max(0, Math.floor(totalPoints * 0.2));
            data[1].points = Math.floor(totalPoints * 0.35);
            data[2].points = Math.floor(totalPoints * 0.5);
            data[3].points = Math.floor(totalPoints * 0.7);
            data[4].points = Math.floor(totalPoints * 0.85);
            data[5].points = totalPoints;
        }
        return data;
    };

    // Initialize form when user loads
    React.useEffect(() => {
        if (user) {
            setName(user.name);
            setUsername(user.username);
        }
    }, [user]);

    // Redirect if not logged in
    React.useEffect(() => {
        if (!loading && !user) {
            router.push('/auth');
        }
    }, [loading, user, router]);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileLoading(true);
        setProfileError(null);
        setProfileSuccess(false);

        try {
            await updateProfile({ name, username });
            setProfileSuccess(true);
            addToast({
                variant: 'success',
                title: 'Profile updated',
                message: 'Your profile information has been saved.',
            });
            setTimeout(() => setProfileSuccess(false), 3000);
        } catch (err) {
            setProfileError(err instanceof Error ? err.message : 'Update failed');
            addToast({
                variant: 'error',
                title: 'Update failed',
                message: err instanceof Error ? err.message : 'Could not update profile.',
            });
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError(null);
        setPasswordSuccess(false);

        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return;
        }

        setPasswordLoading(true);

        try {
            await updatePassword(currentPassword, newPassword);
            setPasswordSuccess(true);
            addToast({
                variant: 'success',
                title: 'Password updated',
                message: 'Your password has been changed successfully.',
            });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => setPasswordSuccess(false), 3000);
        } catch (err) {
            setPasswordError(err instanceof Error ? err.message : 'Update failed');
            addToast({
                variant: 'error',
                title: 'Password update failed',
                message: err instanceof Error ? err.message : 'Could not update password.',
            });
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleGenerate2FA = async () => {
        setTwoFactorLoading(true);
        try {
            const data = await fetchApi('/api/auth/2fa/generate', {
                method: 'GET',
            });
            if (data.success) {
                setQrCodeData({ secret: data.secret, qr: data.qrCodeUrl });
                setSetupStep('verify');
            } else {
                throw new Error(data.message || 'Failed to generate 2FA');
            }
        } catch (err) {
            addToast({ variant: 'error', title: 'Error', message: err instanceof Error ? err.message : 'Failed to generate 2FA' });
        } finally {
            setTwoFactorLoading(false);
        }
    };

    const handleEnable2FA = async () => {
        if (setupCode.length !== 6) return;
        setTwoFactorLoading(true);
        try {
            const data = await fetchApi('/api/auth/2fa/enable', {
                method: 'POST',
                body: JSON.stringify({ token: setupCode }),
            });
            if (data.success) {
                setIs2FAEnabled(true);
                setSetupStep('initial');
                setQrCodeData(null);
                setSetupCode('');
                addToast({ variant: 'success', title: '2FA Enabled', message: 'Two-factor authentication is now enabled.' });
            } else {
                throw new Error(data.error?.message || data.message || 'Invalid code');
            }
        } catch (err) {
            addToast({ variant: 'error', title: 'Error', message: err instanceof Error ? err.message : 'Invalid code' });
        } finally {
            setTwoFactorLoading(false);
        }
    };

    const handleDisable2FA = async () => {
        if (disableCode.length !== 6) return;
        setTwoFactorLoading(true);
        try {
            const data = await fetchApi('/api/auth/2fa/disable', {
                method: 'POST',
                body: JSON.stringify({ token: disableCode, password: disablePassword }),
            });
            if (data.success) {
                setIs2FAEnabled(false);
                setDisableStep('initial');
                setDisableCode('');
                setDisablePassword('');
                addToast({ variant: 'success', title: '2FA Disabled', message: 'Two-factor authentication has been disabled.' });
            } else {
                throw new Error(data.error?.message || data.message || 'Failed to disable 2FA');
            }
        } catch (err) {
            addToast({ variant: 'error', title: 'Error', message: err instanceof Error ? err.message : 'Failed to disable 2FA' });
        } finally {
            setTwoFactorLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        addToast({
            variant: 'info',
            title: 'Signed out',
            message: 'You have been logged out.',
        });
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative pt-28 pb-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
                        <div className="flex items-center gap-5">
                            <div className="relative group">
                                {user.avatar || avatarUrl ? (
                                    <Image
                                        src={avatarUrl || user.avatar || ''}
                                        alt={user.name}
                                        width={80}
                                        height={80}
                                        className="w-20 h-20 rounded-2xl object-cover shadow-lg shadow-orange-500/20"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-orange-500/20">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <button
                                    onClick={() => avatarInputRef.current?.click()}
                                    disabled={avatarLoading}
                                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    {avatarLoading ? (
                                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                                    ) : (
                                        <Camera className="w-6 h-6 text-white" />
                                    )}
                                </button>
                                <input
                                    ref={avatarInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/gif,image/webp"
                                    onChange={handleAvatarUpload}
                                    className="hidden"
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
                                <Link
                                    href={`/user/${user.username}`}
                                    className="text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors text-sm"
                                >
                                    @{user.username}
                                    <ExternalLink className="w-3 h-3" />
                                </Link>
                                <p className="text-gray-500 text-sm mt-0.5">{user.email}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs px-2 py-1 rounded border border-white/10 text-gray-400">
                                        {user.provider ? `${user.provider} account` : 'local account'}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded border ${user.isVerified ? 'border-green-500/40 text-green-400 bg-green-500/10' : 'border-yellow-500/40 text-yellow-400 bg-yellow-500/10'}`}>
                                        {user.isVerified ? 'Verified' : 'Not verified'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 sm:gap-4 mb-8 border-b border-white/10 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('stats')}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'stats'
                                ? 'border-orange-500 text-white'
                                : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            <BarChart3 className="w-4 h-4" />
                            Stats
                        </button>
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'profile'
                                ? 'border-orange-500 text-white'
                                : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            <User className="w-4 h-4" />
                            Profile
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'security'
                                ? 'border-orange-500 text-white'
                                : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            <Shield className="w-4 h-4" />
                            Security
                        </button>
                        <button
                            onClick={() => setActiveTab('privacy')}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'privacy'
                                ? 'border-orange-500 text-white'
                                : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            <Eye className="w-4 h-4" />
                            Privacy
                        </button>
                    </div>

                    {/* Stats Tab */}
                    {activeTab === 'stats' && (
                        <div className="space-y-6">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] group hover:border-orange-500/30 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Flag className="w-4 h-4 text-green-400" />
                                        <p className="text-sm text-gray-500">CTF Solves</p>
                                    </div>
                                    <p className="text-2xl font-bold text-white">
                                        {statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (stats?.ctfSolves || 0)}
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] group hover:border-orange-500/30 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Star className="w-4 h-4 text-yellow-400" />
                                        <p className="text-sm text-gray-500">CTF Points</p>
                                    </div>
                                    <p className="text-2xl font-bold text-white">
                                        {statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (stats?.ctfPoints || 0)}
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] group hover:border-orange-500/30 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Trophy className="w-4 h-4 text-orange-400" />
                                        <p className="text-sm text-gray-500">Rank</p>
                                    </div>
                                    <p className="text-2xl font-bold text-white">
                                        {statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (stats?.rank ? `#${stats.rank}` : 'N/A')}
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] group hover:border-orange-500/30 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-4 h-4 text-purple-400" />
                                        <p className="text-sm text-gray-500">Events</p>
                                    </div>
                                    <p className="text-2xl font-bold text-white">
                                        {statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (stats?.eventsAttended || 0)}
                                    </p>
                                </div>
                            </div>

                            {/* Points Growth Chart */}
                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <BarChart3 className="w-5 h-5 text-orange-400" />
                                    <h3 className="text-lg font-semibold text-white">Points Growth</h3>
                                </div>
                                <div className="h-[300px] w-full">
                                    {statsLoading ? (
                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                            <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-4" />
                                            <p className="text-gray-500 text-sm">Loading activity data...</p>
                                        </div>
                                    ) : (
                                        <ProfileChart data={getPerformanceData(stats?.ctfPoints || 0)} />
                                    )}
                                </div>
                            </div>

                            {/* Achievements Section */}
                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Award className="w-5 h-5 text-orange-400" />
                                    <h3 className="text-lg font-semibold text-white">Achievements</h3>
                                </div>
                                <div className="text-center py-8">
                                    <Award className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                    <p className="text-gray-400">Complete challenges to earn badges!</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Achievements will be displayed here as you progress.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                            <h2 className="text-lg font-semibold text-white mb-6">Profile Information</h2>

                            {profileError && (
                                <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {profileError}
                                </div>
                            )}

                            {profileSuccess && (
                                <div className="mb-6 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Profile updated successfully
                                </div>
                            )}

                            <form onSubmit={handleProfileUpdate} className="space-y-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Username</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                                            placeholder="username"
                                            minLength={3}
                                            maxLength={30}
                                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Letters, numbers, and underscores only</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="email"
                                            value={user.email}
                                            disabled
                                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                        Email cannot be changed
                                        {!user.isVerified && user.provider === 'local' && (
                                            <span className="inline-flex items-center gap-1 text-yellow-400">
                                                <Clock3 className="w-3 h-3" />
                                                Verify to unlock all features
                                            </span>
                                        )}
                                    </p>

                                    {!user.isVerified && user.provider === 'local' && (
                                        <div className="mt-4 flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    setVerificationError(null);
                                                    setVerificationMessage(null);
                                                    setVerificationLoading(true);
                                                    try {
                                                        const message = await requestVerification();
                                                        setVerificationMessage(message);
                                                        addToast({
                                                            variant: 'success',
                                                            title: 'Verification email sent',
                                                            message,
                                                        });
                                                    } catch (err) {
                                                        const message = err instanceof Error ? err.message : 'Failed to send verification';
                                                        setVerificationError(message);
                                                        addToast({
                                                            variant: 'error',
                                                            title: 'Verification failed',
                                                            message,
                                                        });
                                                    } finally {
                                                        setVerificationLoading(false);
                                                    }
                                                }}
                                                disabled={verificationLoading}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white hover:border-orange-500/40 hover:bg-orange-500/10 transition-all"
                                            >
                                                {verificationLoading ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <BadgeCheck className="w-4 h-4" />
                                                )}
                                                Send verification email
                                            </button>
                                            {verificationMessage && (
                                                <span className="text-sm text-green-400">{verificationMessage}</span>
                                            )}
                                            {verificationError && (
                                                <span className="text-sm text-red-400">{verificationError}</span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Member Since</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="text"
                                            value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            disabled
                                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={profileLoading}
                                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 btn-press"
                                >
                                    {profileLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-white">Change Password</h2>
                                {user.provider !== 'local' && (
                                    <span className="text-xs px-2 py-1 rounded border border-white/10 text-gray-400">
                                        Password not available for {user.provider}
                                    </span>
                                )}
                            </div>

                            {passwordError && (
                                <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {passwordError}
                                </div>
                            )}

                            {passwordSuccess && (
                                <div className="mb-6 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Password updated successfully
                                </div>
                            )}

                            <form onSubmit={handlePasswordUpdate} className="space-y-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            disabled={user.provider !== 'local'}
                                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            disabled={user.provider !== 'local'}
                                            minLength={8}
                                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            disabled={user.provider !== 'local'}
                                            minLength={8}
                                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={passwordLoading || user.provider !== 'local'}
                                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 btn-press"
                                >
                                    {passwordLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Lock className="w-4 h-4" />
                                    )}
                                    Update Password
                                </button>
                            </form>

                            {/* Two-Factor Authentication */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Two-Factor Authentication</h3>
                                        <p className="text-sm text-gray-400">Add an extra layer of security to your account.</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs px-2 py-1 rounded border ${is2FAEnabled ? 'border-green-500/40 text-green-400 bg-green-500/10' : 'border-gray-500/40 text-gray-400 bg-gray-500/10'}`}>
                                            {is2FAEnabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                        {!is2FAEnabled ? (
                                            setupStep === 'initial' && (
                                                <button
                                                    onClick={handleGenerate2FA}
                                                    disabled={twoFactorLoading}
                                                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
                                                >
                                                    Enable 2FA
                                                </button>
                                            )
                                        ) : (
                                            disableStep === 'initial' && (
                                                <button
                                                    onClick={() => setDisableStep('verify')}
                                                    className="px-4 py-2 border border-white/10 text-red-400 hover:bg-white/5 text-sm font-medium rounded-lg transition-colors"
                                                >
                                                    Disable 2FA
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* 2FA Setup Flow */}
                                {!is2FAEnabled && setupStep === 'verify' && qrCodeData && (
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-4">
                                        <h4 className="text-white font-medium mb-4">Set up Authenticator App</h4>
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            <div className="bg-white p-2 rounded-xl w-32 h-32 flex-shrink-0">
                                                <Image src={qrCodeData.qr} alt="2FA QR Code" width={128} height={128} className="w-full h-full" unoptimized />
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div>
                                                    <p className="text-sm text-gray-400 mb-2">1. Scan this QR code with your authenticator app (like Google Authenticator or Authy).</p>
                                                    <p className="text-sm text-gray-500">Alternatively, manually enter this code: <span className="text-orange-400 font-mono tracking-wider ml-1">{qrCodeData.secret}</span></p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-400 mb-2">2. Enter the 6-digit code generated by your app below.</p>
                                                    <div className="flex gap-3">
                                                        <input
                                                            type="text"
                                                            value={setupCode}
                                                            onChange={(e) => setSetupCode(e.target.value.replace(/\D/g, ''))}
                                                            placeholder="123456"
                                                            maxLength={6}
                                                            className="w-32 px-4 py-2 bg-black border border-white/10 rounded-lg text-white font-mono tracking-[0.2em] text-center focus:border-orange-500/50 focus:outline-none"
                                                        />
                                                        <button
                                                            onClick={handleEnable2FA}
                                                            disabled={setupCode.length !== 6 || twoFactorLoading}
                                                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white text-sm font-medium rounded-lg transition-colors"
                                                        >
                                                            {twoFactorLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify'}
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSetupStep('initial');
                                                                setQrCodeData(null);
                                                                setSetupCode('');
                                                            }}
                                                            className="px-4 py-2 border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 text-sm font-medium rounded-lg transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 2FA Disable Flow */}
                                {is2FAEnabled && disableStep === 'verify' && (
                                    <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 mt-4">
                                        <h4 className="text-red-400 font-medium mb-4 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            Disable Two-Factor Authentication
                                        </h4>
                                        <div className="space-y-4">
                                            <p className="text-sm text-gray-400">
                                                Are you sure you want to disable 2FA? This will make your account less secure.
                                                To confirm, please enter a valid code from your authenticator app{user.provider === 'local' ? ' and your current password' : ''}.
                                            </p>

                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Authenticator Code</label>
                                                    <input
                                                        type="text"
                                                        value={disableCode}
                                                        onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, ''))}
                                                        placeholder="123456"
                                                        maxLength={6}
                                                        className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white font-mono tracking-[0.2em] focus:border-red-500/50 focus:outline-none"
                                                    />
                                                </div>
                                                {user.provider === 'local' && (
                                                    <div>
                                                        <label className="block text-xs text-gray-500 mb-1">Password</label>
                                                        <input
                                                            type="password"
                                                            value={disablePassword}
                                                            onChange={(e) => setDisablePassword(e.target.value)}
                                                            placeholder="••••••••"
                                                            className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:border-red-500/50 focus:outline-none"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex gap-3 pt-2">
                                                <button
                                                    onClick={handleDisable2FA}
                                                    disabled={disableCode.length !== 6 || (user.provider === 'local' && disablePassword.length === 0) || twoFactorLoading}
                                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                    {twoFactorLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                                    Confirm Disable
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setDisableStep('initial');
                                                        setDisableCode('');
                                                        setDisablePassword('');
                                                    }}
                                                    className="px-4 py-2 border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 text-sm font-medium rounded-lg transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Active Sessions */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Active Sessions</h3>
                                        <p className="text-sm text-gray-400">Manage your logged-in devices</p>
                                    </div>
                                    <button
                                        disabled
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-500 cursor-not-allowed opacity-50"
                                    >
                                        <Shield className="w-4 h-4" />
                                        Manage Sessions (Coming Soon)
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Privacy Tab */}
                    {activeTab === 'privacy' && (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                            <h2 className="text-lg font-semibold text-white mb-6">Privacy Settings</h2>

                            <div className="space-y-6">
                                {/* Profile Visibility Toggle */}
                                <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            {isProfilePublic ? (
                                                <Eye className="w-4 h-4 text-green-400" />
                                            ) : (
                                                <EyeOff className="w-4 h-4 text-gray-400" />
                                            )}
                                            <p className="font-medium text-white">Public Profile</p>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            When enabled, your profile will be visible to everyone.
                                            Others can view your stats, achievements, and activity.
                                        </p>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            setPrivacyLoading(true);
                                            try {
                                                const newValue = !isProfilePublic;
                                                await fetchApi('/api/users/profile', {
                                                    method: 'PUT',
                                                    body: JSON.stringify({ isPublic: newValue }),
                                                });
                                                setIsProfilePublic(newValue);
                                                addToast({
                                                    variant: 'success',
                                                    title: 'Privacy updated',
                                                    message: `Your profile is now ${newValue ? 'public' : 'private'}.`,
                                                });
                                            } catch (_error) {
                                                addToast({
                                                    variant: 'error',
                                                    title: 'Update failed',
                                                    message: 'Could not update privacy settings.',
                                                });
                                            } finally {
                                                setPrivacyLoading(false);
                                            }
                                        }}
                                        disabled={privacyLoading}
                                        className={`relative w-14 h-7 rounded-full transition-colors ${isProfilePublic ? 'bg-orange-500' : 'bg-white/10'
                                            }`}
                                    >
                                        {privacyLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
                                        ) : (
                                            <span
                                                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${isProfilePublic ? 'left-8' : 'left-1'
                                                    }`}
                                            />
                                        )}
                                    </button>
                                </div>

                                {/* Future privacy options placeholder */}
                                <div className="text-center py-8 border-t border-white/10 mt-6">
                                    <Shield className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                    <p className="text-gray-400">More privacy options coming soon</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Control who can see your activity, message you, and more.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
