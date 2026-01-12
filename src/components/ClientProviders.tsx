"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import Navbar from "@/components/Navbar";
import GlobalSearch from "@/components/GlobalSearch";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ToastProvider>
                <Navbar />
                <GlobalSearch />
                <main>{children}</main>
            </ToastProvider>
        </AuthProvider>
    );
}
