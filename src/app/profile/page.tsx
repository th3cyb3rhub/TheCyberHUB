"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
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
    Clock3
} from 'lucide-react';

const ProfilePage = () => {
    const router = useRouter();
    const { user, loading, logout, updateProfile, updatePassword, requestVerification } = useAuth();
    const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

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
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-orange-500/20">
                                {user.name.charAt(0).toUpperCase()}
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
                <div className="flex gap-4 mb-8 border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${activeTab === 'profile'
                            ? 'border-orange-500 text-white'
                            : 'border-transparent text-gray-400 hover:text-white'
                            }`}
                    >
                        <User className="w-4 h-4" />
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${activeTab === 'security'
                            ? 'border-orange-500 text-white'
                            : 'border-transparent text-gray-400 hover:text-white'
                            }`}
                    >
                        <Shield className="w-4 h-4" />
                        Security
                    </button>
                </div>

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
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
