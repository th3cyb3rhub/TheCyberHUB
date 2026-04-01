"use client";

import { useState, lazy, Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { NotificationProvider } from "@/context/NotificationProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
const GlobalSearch = lazy(() => import("@/components/GlobalSearch"));
import { SystemAlertNotice } from "@/components/ui/SystemAlertNotice";
import MobileBottomNav from "@/components/ui/MobileBottomNav";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    // Create QueryClient once per component instance (prevents SSR issues)
    const [queryClient] = useState(() => createQueryClient());

    return (
        <ErrorBoundary>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <ToastProvider>
                            <NotificationProvider>
                                <SystemAlertNotice />
                                <Navbar />
                                <Suspense fallback={null}>
                                    <GlobalSearch />
                                </Suspense>
                                <main className="pb-20 md:pb-0">{children}</main>
                                <MobileBottomNav />
                            </NotificationProvider>
                        </ToastProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}
