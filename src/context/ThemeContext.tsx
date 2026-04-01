'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
            if (typeof window !== 'undefined') {
                const stored = localStorage.getItem('tch-theme') as Theme;
                if (stored && (stored === 'dark' || stored === 'light')) {
                    setThemeState(stored);
                    applyTheme(stored);
                    return;
                }
            }
        } catch {
            // localStorage may be unavailable (e.g. private browsing)
        }
        // Respect system preference
        if (typeof window !== 'undefined') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initial = prefersDark ? 'dark' : 'light';
            setThemeState(initial);
            applyTheme(initial);
        }
    }, []);

    const applyTheme = (t: Theme) => {
        const root = document.documentElement;
        if (t === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
            root.removeAttribute('data-theme');
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
            root.setAttribute('data-theme', 'light');
        }
    };

    const setTheme = (t: Theme) => {
        setThemeState(t);
        try {
            localStorage.setItem('tch-theme', t);
        } catch {
            // localStorage may be unavailable
        }
        applyTheme(t);
    };

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
    };

    // Sync theme across browser tabs
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'tch-theme' && e.newValue) {
                const newTheme = e.newValue as Theme;
                if (newTheme === 'dark' || newTheme === 'light') {
                    setThemeState(newTheme);
                    applyTheme(newTheme);
                }
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Prevent flash of wrong theme
    if (!mounted) return null;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
