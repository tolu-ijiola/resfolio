"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { LockIcon, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import Lottie from "lottie-react";

export default function AuthPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");
  const { signIn } = useAuth();
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success('Successfully signed in!');
      router.replace(returnUrl || '/px/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      toast.success('Password reset instructions sent to your email');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset instructions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full">
      {/* Left Panel: Form Section */}
      <section className="flex w-full max-w-2xl flex-col justify-center px-8 py-8 sm:px-12 lg:px-16">
        {/* Logo / Branding */}
        <div className="mb-8">
          <Link href="/" className="flex justify-center items-center">
            <Image
              src="/logo.svg"
              alt="Resfolio Logo"
              width={120}
              height={32}
              priority
            />
          </Link>
        </div>

        {/* Authentication Tabs */}
        <Card className="border-none shadow-none">
          <CardHeader className="p-0 px-8 mb-4">
            <CardTitle className="text-2xl text-center font-semibold">
              Welcome Back
            </CardTitle>
            <CardDescription className="mb-6 text-center text-gray-500">
              Please enter your details.
            </CardDescription>
            <div className="w-full mb-4 bg-slate-100 shadow flex justify-between gap-2 items-center rounded-xl p-1.5">
              <Button asChild size={'lg'} className="flex-1 ">
                <Link href="/login" className="text-center text-sm font-medium block rounded-xl p-2">Sign In</Link>
              </Button>
              <Button asChild size={'lg'} variant={'ghost'} className="flex-1">
                <Link href="/signup" className="text-center text-sm font-medium block rounded-xl p-2">Sign Up</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 px-8 space-y-4">
            <form onSubmit={handleSignIn}>
              <div className="mb-4 border border-gray-200 rounded-xl p-2 px-4 flex gap-2 items-center">
                <Mail />
                <Separator orientation="vertical" className="h-full w-1 bg-slate-200" />
                <div className="flex-1">
                  <Label htmlFor="signin-email" className="mb-1 block text-xs font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="signin-email"
                    placeholder="lilareem@gmail.com"
                    type="email"
                    className="border-none shadow-none px-0 h-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4 border border-gray-200 rounded-xl p-2 px-4 flex gap-2 items-center">
                <LockIcon />
                <Separator orientation="vertical" className="h-full w-1 bg-slate-200" />
                <div className="flex-1">
                  <Label htmlFor="signin-password" className="mb-1 block text-xs font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="signin-password"
                    placeholder="********"
                    type="password"
                    className="border-none shadow-none px-0 h-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-teal-800 hover:text-teal-700"
                >
                  Forgot Password?
                </button>
              </div>

              <Button 
                type="submit"
                className="mb-4 w-full  h-12 "
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Continue'}
              </Button>
            </form>

            <div className="flex justify-center mx-auto items-center gap-2">
              <Separator className="w-[20px] h-1 bg-slate-200" />
              <p className="text-xs text-gray-600 uppercase">OR</p>
              <Separator className="w-[20px] h-1 bg-slate-200" />
            </div>

            {/* Social Logins */}
            <div className="my-4 flex items-center justify-center space-x-6">
              <Button
                size={'icon'}
                variant={'outline'}
                className="bg-white rounded-full border-gray-200 h-12 w-12"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <Image 
                  src="/icon/google.png" 
                  alt="Google Sign In" 
                  width={20} 
                  height={20}
                  priority 
                />
              </Button>
            </div>

            <p className="text-xs max-w-sm mx-auto text-center text-gray-400">
              Join the hundreds of developers to create their portfolio. Log in to access your
              dashboard, track your analytics, and share with potential employers and clients.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Right Panel: Illustration / Image */}
      <section className="hidden flex-1 bg-white md:flex items-center justify-center relative">
  {/* your full‑section white background */}
  <div className="absolute inset-0 bg-white" />

  {/* this wrapper is just to keep z‑index */}
  <div className="relative z-10">
    <Lottie
      animationData={require('@/public/animations/auth.json')}
      loop
      className="fixed top-1/2 w-full max-w-xs 
                 transform -translate-x-1/2 -translate-y-1/2"
    />
  </div>
</section>

    </main>
  );
}
