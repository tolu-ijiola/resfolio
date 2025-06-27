'use client'

import { PortfolioProvider } from "@/lib/portfolio-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// app/dashboard/layout.tsx
import { ReactNode } from "react"


export default function DashboardLayout({ children }: { children: ReactNode }) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
                  <PortfolioProvider>
            {children}
            </PortfolioProvider>
        </QueryClientProvider>
    );
}
