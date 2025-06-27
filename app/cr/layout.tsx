'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ResumeProvider } from "./components/ResumeContext";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <div>
      <ResumeProvider>
        {children}
        
        </ResumeProvider>
    </div>
  );
}
