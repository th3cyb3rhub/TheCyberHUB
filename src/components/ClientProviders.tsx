"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Navbar from "@/components/Navbar";
import GlobalSearch from "@/components/GlobalSearch";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    // Create QueryClient once per component instance (prevents SSR issues)
    const [queryClient] = useState(() => createQueryClient());

    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ToastProvider>
                        <Navbar />
                        <GlobalSearch />
                        <main>{children}</main>
                    </ToastProvider>
                </AuthProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}
