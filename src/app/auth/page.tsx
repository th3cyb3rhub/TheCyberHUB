"use client"

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, CheckCircle2, Zap, Users, BookOpen, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchApi } from '@/lib/api';

type AuthMode = 'login' | 'register' | '2fa';

const features = [
    { icon: Zap, text: 'Access 45+ security tools' },
    { icon: BookOpen, text: 'Learning roadmaps & resources' },
    { icon: Users, text: 'Join the community' },
];

const AuthPage = () => {
    const router = useRouter();
    const { user, loading: authLoading, login, verify2faLogin, register } = useAuth();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/profile';
    const { addToast } = useToast();
    const [mode, setMode] = useState<AuthMode>('login');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [tempToken, setTempToken] = useState<string | null>(null);
    const [twoFactorCode, setTwoFactorCode] = useState('');

    // Username availability check
    const [usernameChecking, setUsernameChecking] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);

    // Login activity
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const debouncedUsername = useDebounce(formData.username, 500);

    // Username availability check
    const checkUsernameAvailability = useCallback(async (username: string) => {
        if (!username || username.length < 3) {
            setUsernameAvailable(null);
            setUsernameError(null);
            return;
        }
        setUsernameChecking(true);
        setUsernameError(null);
        try {
            const data = await fetchApi(`/api/users?q=${encodeURIComponent(username)}&limit=1`, { requireAuth: false });
            const users = data.data || data.users || [];
            const taken = users.some((u: { username: string }) => u.username.toLowerCase() === username.toLowerCase());
            setUsernameAvailable(!taken);
            if (taken) {
                setUsernameError('Username is already taken');
            }
        } catch {
            setUsernameAvailable(null);
        } finally {
            setUsernameChecking(false);
        }
    }, []);

    useEffect(() => {
        if (mode === 'register' && debouncedUsername && debouncedUsername.length >= 3) {
            checkUsernameAvailability(debouncedUsername);
        } else {
            setUsernameAvailable(null);
            setUsernameError(null);
        }
    }, [debouncedUsername, mode, checkUsernameAvailability]);

    // Reset form on mode switch
    const switchMode = (newMode: AuthMode) => {
        setFormData({ name: '', username: '', email: '', password: '', confirmPassword: '' });
        setError(null);
        setSuccess(null);
        setShowPassword(false);
        setShowConfirmPassword(false);
        setUsernameAvailable(null);
        setUsernameError(null);
        setMode(newMode);
    };

    // Password strength indicator
    const getPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const passwordStrength = getPasswordStrength(formData.password);
    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

    useEffect(() => {
        if (!authLoading && user) {
            router.push(redirect);
        }
    }, [authLoading, user, router, redirect]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === 'register') {
                if (formData.password !== formData.confirmPassword) {
                    setError('Passwords do not match');
                    setLoading(false);
                    return;
                }

                if (formData.password.length < 8) {
                    setError('Password must be at least 8 characters');
                    setLoading(false);
                    return;
                }

                // Check password complexity
                if (!/[A-Z]/.test(formData.password) ||
                    !/[a-z]/.test(formData.password) ||
                    !/[0-9]/.test(formData.password) ||
                    !/[^A-Za-z0-9]/.test(formData.password)) {
                    setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
                    setLoading(false);
                    return;
                }

                await register(formData.name, formData.email, formData.password, formData.username || undefined);
                setSuccess('Account created successfully!');
                addToast({
                    variant: 'success',
                    title: 'Account created',
                    message: 'Your account has been created successfully.',
                });
            } else if (mode === 'login') {
                const res = await login(formData.email, formData.password);
                if (res?.requires2FA) {
                    setTempToken(res.tempToken);
                    setMode('2fa');
                    setSuccess('Please enter your 2FA code.');
                    setLoading(false);
                    return; // Stop here, don't redirect yet
                }
                setSuccess('Welcome back!');
                addToast({
                    variant: 'success',
                    title: 'Signed in',
                    message: 'You have been signed in successfully.',
                });
            } else if (mode === '2fa') {
                if (!tempToken) {
                    setError('Session expired. Please log in again.');
                    setMode('login');
                    setLoading(false);
                    return;
                }
                await verify2faLogin(tempToken, twoFactorCode);
                setSuccess('Welcome back!');
                addToast({
                    variant: 'success',
                    title: 'Signed in',
                    message: '2FA verified successfully.',
                });
            }

            setTimeout(() => router.push(redirect), 500);
        } catch (err) {
            let message = 'Something went wrong';
            if (err instanceof Error) {
                message = err.message;
            }
            // Handle API error response format
            if (typeof message === 'object' && message !== null) {
                const errorObj = message as { message?: string; details?: { message: string }[] };
                message = errorObj.details?.[0]?.message || errorObj.message || 'Something went wrong';
            }
            setError(message);
            addToast({
                variant: 'error',
                title: 'Authentication failed',
                message,
            });
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-500/8 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-orange-600/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-orange-400/5 rounded-full blur-[100px]" />
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
            </div>

            <div className="relative w-full max-w-md animate-fade-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">TheCyberHub</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-3">
                        {mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Join TheCyberHub' : 'Two-Factor Auth'}
                    </h1>
                    <p className="text-gray-400">
                        {mode === 'login'
                            ? 'Sign in to access your dashboard and tools'
                            : mode === 'register' ? 'Create your account and start learning' : 'Enter the code from your Authenticator app'}
                    </p>
                    {redirect !== '/profile' && (
                        <p className="mt-1 text-xs text-gray-500 break-all">
                            You need to sign in to continue to <span className="text-gray-300">{redirect}</span>.
                        </p>
                    )}
                </div>

                {/* Features (only on register) */}
                {mode === 'register' && (
                    <div className="flex justify-center gap-6 mb-8">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                                <feature.icon className="w-4 h-4 text-orange-500" />
                                <span className="hidden sm:inline">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Auth Card */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 shadow-2xl">
                    {/* Mode Toggle */}
                    {mode !== '2fa' && (
                        <div className="flex gap-2 p-1 bg-white/5 rounded-lg mb-8">
                            <button
                                onClick={() => switchMode('login')}
                                className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${mode === 'login'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => switchMode('register')}
                                className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${mode === 'register'
                                    ? 'bg-orange-500 text-white'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Register
                            </button>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            {success}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-shake">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {mode === '2fa' && (
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Authenticator Code</label>
                                <div className="relative">
                                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        value={twoFactorCode}
                                        onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                                        placeholder="123456"
                                        required
                                        maxLength={6}
                                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors tracking-[0.2em] font-mono text-center"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMode('login');
                                        setTempToken(null);
                                        setTwoFactorCode('');
                                    }}
                                    className="text-sm text-gray-400 hover:text-white mt-4 block text-center w-full"
                                >
                                    Back to Login
                                </button>
                            </div>
                        )}

                        {/* Register-only fields */}
                        {mode === 'register' && (
                            <>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Username <span className="text-gray-600">(optional)</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username || ''}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')
                                            }))}
                                            placeholder="johndoe"
                                            minLength={3}
                                            maxLength={30}
                                            className={`w-full pl-11 pr-10 py-3 bg-white/5 border rounded-lg text-white placeholder:text-gray-500 focus:outline-none transition-colors ${
                                                formData.username && formData.username.length >= 3
                                                    ? usernameAvailable === true ? 'border-green-500/50 focus:border-green-500'
                                                    : usernameAvailable === false ? 'border-red-500/50 focus:border-red-500'
                                                    : 'border-white/10 focus:border-orange-500/50'
                                                    : 'border-white/10 focus:border-orange-500/50'
                                            }`}
                                        />
                                        {formData.username && formData.username.length >= 3 && (
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2">
                                                {usernameChecking ? (
                                                    <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                                                ) : usernameAvailable === true ? (
                                                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                                                ) : usernameAvailable === false ? (
                                                    <XCircle className="w-4 h-4 text-red-400" />
                                                ) : null}
                                            </span>
                                        )}
                                    </div>
                                    {usernameError && (
                                        <p className="text-xs text-red-400 mt-1">{usernameError}</p>
                                    )}
                                    {usernameAvailable === true && formData.username.length >= 3 && (
                                        <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> Username is available
                                        </p>
                                    )}
                                    {!usernameError && usernameAvailable === null && (
                                        <p className="text-xs text-gray-600 mt-1">Leave empty to auto-generate from email</p>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm text-gray-400">Password</label>
                                {mode === 'login' && (
                                    <Link href="/forgot-password" className="text-sm text-orange-400 hover:text-orange-300">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                    className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {/* Password Requirements Checklist */}
                            {mode === 'register' && formData.password && (
                                <div className="mt-3 space-y-1.5">
                                    <div className="flex gap-1 mb-2">
                                        {[0, 1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1 flex-1 rounded-full transition-all ${i < passwordStrength
                                                    ? strengthColors[passwordStrength - 1]
                                                    : 'bg-white/10'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className={`text-xs mb-2 ${passwordStrength > 0 ? strengthColors[passwordStrength - 1].replace('bg-', 'text-') : 'text-gray-500'}`}>
                                        {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : 'Enter a password'}
                                    </p>
                                    <div className="grid grid-cols-2 gap-1 text-xs">
                                        <div className={`flex items-center gap-1.5 ${formData.password.length >= 8 ? 'text-green-400' : 'text-gray-500'}`}>
                                            {formData.password.length >= 8 ? <CheckCircle2 className="w-3 h-3" /> : <span className="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px]">✕</span>}
                                            8+ characters
                                        </div>
                                        <div className={`flex items-center gap-1.5 ${/[A-Z]/.test(formData.password) ? 'text-green-400' : 'text-gray-500'}`}>
                                            {/[A-Z]/.test(formData.password) ? <CheckCircle2 className="w-3 h-3" /> : <span className="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px]">✕</span>}
                                            Uppercase
                                        </div>
                                        <div className={`flex items-center gap-1.5 ${/[a-z]/.test(formData.password) ? 'text-green-400' : 'text-gray-500'}`}>
                                            {/[a-z]/.test(formData.password) ? <CheckCircle2 className="w-3 h-3" /> : <span className="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px]">✕</span>}
                                            Lowercase
                                        </div>
                                        <div className={`flex items-center gap-1.5 ${/[0-9]/.test(formData.password) ? 'text-green-400' : 'text-gray-500'}`}>
                                            {/[0-9]/.test(formData.password) ? <CheckCircle2 className="w-3 h-3" /> : <span className="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px]">✕</span>}
                                            Number
                                        </div>
                                        <div className={`flex items-center gap-1.5 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-400' : 'text-gray-500'}`}>
                                            {/[^A-Za-z0-9]/.test(formData.password) ? <CheckCircle2 className="w-3 h-3" /> : <span className="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px]">✕</span>}
                                            Special char
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password (Register only) */}
                        {mode === 'register' && (
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                        className={`w-full pl-11 pr-12 py-3 bg-white/5 border rounded-lg text-white placeholder:text-gray-500 focus:outline-none transition-colors ${formData.confirmPassword
                                            ? formData.password === formData.confirmPassword
                                                ? 'border-green-500/50 focus:border-green-500'
                                                : 'border-red-500/50 focus:border-red-500'
                                            : 'border-white/10 focus:border-orange-500/50'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
                                )}
                                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                    <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Passwords match
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 btn-press"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {mode === '2fa' ? 'Verify Code' : mode === 'login' ? 'Sign In' : 'Create Account'}
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    {mode !== '2fa' && (
                        <>
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-black text-gray-500">or continue with</span>
                                </div>
                            </div>

                            {/* Social Login */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
                                        if (!clientId) {
                                            setError('GitHub login not configured');
                                            return;
                                        }
                                        const redirectUri = `${window.location.origin}/auth/callback/github`;
                                        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`;
                                    }}
                                    className="group flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
                                        if (!clientId) {
                                            setError('Google login not configured');
                                            return;
                                        }
                                        const redirectUri = `${window.location.origin}/auth/callback/google`;
                                        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=id_token&scope=openid%20email%20profile&nonce=${Date.now()}`;
                                    }}
                                    className="group flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Terms */}
                <p className="text-center text-xs text-gray-500 mt-8">
                    By continuing, you agree to our{' '}
                    <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
                </p>
            </div>
        </div >
    );
};

export default AuthPage;
