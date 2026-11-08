"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("bluestars_admin_user", JSON.stringify(data.user));
          const params = new URLSearchParams(window.location.search);
          const from = params.get("from");
          const destination = from && from.startsWith("/admin") ? from : "/admin";
          router.push(destination);
        } else {
          router.push("/admin");
        }
        router.refresh();
      } else {
        setErrorMsg(data.message || "Invalid credentials. Please verify email and password.");
      }
    } catch {
      setErrorMsg("An unexpected connection error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#052C4E] via-[#073D6B] to-[#0A4D85] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2A8FD6]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00b4d8]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative Brand Stars in background */}
      <div
        className="absolute top-12 left-12 w-28 h-28 text-white/5 pointer-events-none"
        aria-hidden="true"
      >
        <BrandStar className="w-full h-full fill-current" />
      </div>
      <div
        className="absolute bottom-12 right-12 w-36 h-36 text-white/5 pointer-events-none"
        aria-hidden="true"
      >
        <BrandStar className="w-full h-full fill-current" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Card Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="relative w-12 h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <BrandStar className="w-9 h-9 text-brand-sky fill-brand-sky absolute top-0 right-0 drop-shadow-[0_2px_12px_rgba(232,243,252,0.4)]" />
              <BrandStar className="w-5 h-5 text-brand-lightBlue fill-brand-lightBlue absolute bottom-0 left-0" />
            </div>
            <div className="text-left">
              <div className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight">
                Blue Stars
              </div>
              <div className="text-xs uppercase tracking-widest text-brand-sky/80 font-heading">
                Admissions Consulting
              </div>
            </div>
          </Link>

          <div className="flex items-center justify-center gap-2">
            <span className="w-10 h-[2px] bg-brand-lightBlue rounded-full" />
            <h1 className="text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase text-brand-sky font-heading">
              SECURE ADMIN CONSOLE
            </h1>
            <span className="w-10 h-[2px] bg-brand-lightBlue rounded-full" />
          </div>
        </div>

        {/* Login Box */}
        <div className="bg-white rounded-[5px] border border-white/20 shadow-[0_25px_60px_rgba(5,44,78,0.35)] p-6 sm:p-8 backdrop-blur-md">
          <div className="mb-6 text-center">
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
              Sign In to Management
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mt-1">
              Access consultation leads, success stories, blogs, and media assets.
            </p>
          </div>


          {/* Error Alert */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-[5px] bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-brand-navy font-heading uppercase tracking-wider mb-1.5"
              >
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-text/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-sm text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-brand-navy font-heading uppercase tracking-wider mb-1.5"
              >
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-text/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-sm text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-text/50 hover:text-brand-navy p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full mt-2 py-3 px-5 rounded-[5px] font-bold text-xs sm:text-[14px] font-heading text-white transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer",
                isLoading
                  ? "bg-brand-blue/70 cursor-wait"
                  : "bg-brand-blue hover:bg-brand-navy hover:shadow-md active:scale-[0.99]"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-brand-border/60 text-center">
            <Link
              href="/"
              className="text-xs text-brand-text hover:text-brand-blue font-sans font-medium transition-colors"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

