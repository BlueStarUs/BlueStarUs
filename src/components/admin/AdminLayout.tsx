"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FolderOpen,
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Bell,
  Sparkles,
  Megaphone,
  Loader2,
  User,
} from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    label: "Home Hero Section",
    href: "/admin/hero",
    icon: Sparkles,
    badge: "Live",
  },
  {
    label: "Announcements",
    href: "/admin/announcements",
    icon: Megaphone,
    badge: "Live",
  },
  {
    label: "Consultation Leads",
    href: "/admin/leads",
    icon: Users,
    badge: "New",
  },
  {
    label: "Success Stories",
    href: "/admin/stories",
    icon: GraduationCap,
    badge: null,
  },
  {
    label: "Blog Posts",
    href: "/admin/blogs",
    icon: BookOpen,
    badge: null,
  },
  {
    label: "Resource Toolkits",
    href: "/admin/resources",
    icon: FolderOpen,
    badge: null,
  },
  {
    label: "Media Library",
    href: "/admin/media",
    icon: ImageIcon,
    badge: null,
  },
  {
    label: "Site Settings",
    href: "/admin/settings",
    icon: Settings,
    badge: null,
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(null);

  // Check auth session
  useEffect(() => {
    async function verifyAuth() {
      if (pathname === "/admin/login") {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const res = await fetch("/api/admin/auth/me", {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setAdminUser(data.user);
            setIsCheckingAuth(false);
            return;
          }
        }
      } catch {
        // Auth check error
      }

      // If server verification fails, clear any stale client state and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("bluestars_admin_user");
      }
      setAdminUser(null);
      router.push(`/admin/login?from=${encodeURIComponent(pathname)}`);
    }

    verifyAuth();
  }, [pathname, router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("bluestars_admin_user");
    }
    router.push("/admin/login");
  };

  // If on login page, just render children without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#F3F8FD] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-[5px] bg-brand-blue text-white flex items-center justify-center shadow-md animate-pulse mb-4">
          <BrandStar className="w-6 h-6 text-white fill-white" />
        </div>
        <div className="flex items-center gap-2 text-brand-navy font-bold font-heading text-sm">
          <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
          <span>Verifying Blue Stars Admin Credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F8FD] flex font-sans text-brand-text">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#072442]/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-72 bg-brand-navy text-white flex flex-col transition-transform duration-300 lg:translate-x-0 shadow-2xl lg:shadow-none",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <BrandStar className="w-7 h-7 text-white fill-white absolute top-0 right-0 drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]" />
              <BrandStar className="w-4 h-4 text-brand-lightBlue fill-brand-lightBlue absolute bottom-0 left-0" />
            </div>
            <div>
              <div className="text-base font-extrabold font-heading text-white tracking-tight flex items-center gap-1.5">
                <span>Blue Stars</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-[3px] bg-brand-blue text-white">
                  Admin
                </span>
              </div>
              <div className="text-[11px] text-brand-sky/70 font-sans tracking-wide">
                Admissions Console
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-[5px] text-white/70 hover:text-white hover:bg-white/10"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
          <div className="text-[11px] font-bold uppercase tracking-wider text-brand-sky/50 px-3 mb-2 font-heading">
            Management Console
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-[5px] text-xs sm:text-[13px] font-bold font-heading transition-all duration-200 group",
                  isActive
                    ? "bg-brand-blue text-white shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "w-4.5 h-4.5 transition-colors",
                      isActive ? "text-white" : "text-brand-lightBlue group-hover:text-white"
                    )}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 rounded-[3px] text-[10px] font-bold bg-[#E3F5EA] text-[#2F9E5C] uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-white/10 bg-[#07365F]/80">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-[5px] bg-gradient-to-br from-brand-blue to-brand-navy border border-white/20 flex items-center justify-center text-white shadow-2xs">
                  <User className="w-4 h-4 text-brand-sky" />
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#2F9E5C] ring-2 ring-[#07365F]"
                  title="Active Session"
                />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white font-heading truncate">
                  {adminUser?.name || "Admin Director"}
                </div>
                <div className="text-[11px] text-brand-sky/70 font-sans truncate">
                  {adminUser?.email || "Admin Session"}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Sign out of Admin"
              className="p-1.5 rounded-[5px] text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-[5px] bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-heading transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-lightBlue" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        {/* Top Navbar */}
        <header className="h-16 sm:h-20 bg-white border-b border-brand-border px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-[5px] border border-brand-border text-brand-navy hover:bg-brand-sky/50"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Title area */}
            <div className="flex items-center gap-2 text-xs font-bold font-heading text-brand-text">
              <span className="text-brand-blue uppercase tracking-wider text-[11px]">
                Blue Stars Control Panel
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-brand-text/40" />
              <span className="text-brand-navy font-extrabold capitalize">
                {pathname.replace("/admin", "").replace("/", "") || "Overview"}
              </span>
            </div>
          </div>

          {/* Quick Actions & Live Site Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-brand-sky hover:bg-brand-blue text-brand-blue hover:text-white text-xs font-bold font-heading transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

