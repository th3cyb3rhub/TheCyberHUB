"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_URL } from '@/lib/api';

interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar: string | null;
    role: string;
    provider?: 'local' | 'google' | 'github';
    isVerified?: boolean;
    stats?: {
        eventsAttended: number;
        challengesSolved: number;
        points: number;
    };
    bookmarks?: {
        roadmaps: string[];
        cheatsheets: string[];
        tools: string[];
    };
    progress?: {
        roadmaps: {
            roadmapId: string;
            completedSteps: string[];
            percent: number;
        }[];
    };
    createdAt?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, username?: string) => Promise<void>;
    logout: () => void;
    updateProfile: (data: { name?: string; username?: string; avatar?: string }) => Promise<void>;
    updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<string>;
    resetPassword: (token: string, password: string) => Promise<void>;
    requestVerification: () => Promise<string>;
    verifyEmail: (token: string) => Promise<void>;
    loginWithGoogle: (idToken: string) => Promise<void>;
    loginWithGithub: (code: string) => Promise<void>;
    updateBookmarks: (data: Partial<NonNullable<User['bookmarks']>>) => Promise<void>;
    updateProgress: (payload: { roadmapId: string; completedSteps: string[]; percent: number }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Load token from localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            fetchUser(savedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async (authToken: string) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.data);
            } else {
                // Token invalid, clear it
                localStorage.removeItem('token');
                setToken(null);
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.data);
    };

    const register = async (name: string, email: string, password: string, username?: string) => {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, ...(username && { username }) }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }

        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const updateProfile = async (data: { name?: string; username?: string; avatar?: string }) => {
        const response = await fetch(`${API_URL}/api/auth/me`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Update failed');
        }

        setUser(result.data);
    };

    const updatePassword = async (currentPassword: string, newPassword: string) => {
        const response = await fetch(`${API_URL}/api/auth/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Password update failed');
        }

        // Update token if returned
        if (result.token) {
            localStorage.setItem('token', result.token);
            setToken(result.token);
        }
    };

    const forgotPassword = async (email: string): Promise<string> => {
        const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Request failed');
        }

        return result.message;
    };

    const resetPassword = async (resetToken: string, password: string) => {
        const response = await fetch(`${API_URL}/api/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: resetToken, password }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Reset failed');
        }

        // Auto-login after reset
        if (result.token) {
            localStorage.setItem('token', result.token);
            setToken(result.token);
            await fetchUser(result.token);
        }
    };

    const requestVerification = async (): Promise<string> => {
        const response = await fetch(`${API_URL}/api/auth/verify/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Verification request failed');
        }

        return result.message;
    };

    const verifyEmail = async (verificationToken: string) => {
        const response = await fetch(`${API_URL}/api/auth/verify/confirm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: verificationToken }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Verification failed');
        }

        if (result.token) {
            localStorage.setItem('token', result.token);
            setToken(result.token);
        }

        if (result.data) {
            setUser(result.data);
        }
    };

    const loginWithGoogle = async (idToken: string) => {
        const response = await fetch(`${API_URL}/api/auth/oauth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Google login failed');
        }

        localStorage.setItem('token', result.token);
        setToken(result.token);
        setUser(result.data);
    };

    const loginWithGithub = async (code: string) => {
        const response = await fetch(`${API_URL}/api/auth/oauth/github`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'GitHub login failed');
        }

        localStorage.setItem('token', result.token);
        setToken(result.token);
        setUser(result.data);
    };

    const updateBookmarks = async (data: Partial<NonNullable<User['bookmarks']>>) => {
        const response = await fetch(`${API_URL}/api/auth/bookmarks`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Bookmark update failed');
        }

        if (result.data) setUser(result.data);
    };

    const updateProgress = async (payload: { roadmapId: string; completedSteps: string[]; percent: number }) => {
        const response = await fetch(`${API_URL}/api/auth/progress`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Progress update failed');
        }

        if (result.data) setUser(result.data);
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            login,
            register,
            logout,
            updateProfile,
            updatePassword,
            forgotPassword,
            resetPassword,
            requestVerification,
            verifyEmail,
            loginWithGoogle,
            loginWithGithub,
            updateBookmarks,
            updateProgress,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
