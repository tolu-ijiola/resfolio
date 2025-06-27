import type { Metadata } from "next";
import { Geist, Geist_Mono, Ubuntu } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/global/header";
import Footer from "@/components/global/footer";
import { AuthProvider } from "@/lib/auth-context";

const ubuntu = Ubuntu({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resfolio",
  description: "Resfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} antialiased`}>
      <AuthProvider>
      <TooltipProvider>
          <Toaster position="top-center" />
          <Header />
            {children}
            <Footer />
            </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
