"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Calendar,
  Settings,
  HelpCircle,
  Home,
} from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "College List", href: "/dashboard#colleges", icon: GraduationCap },
  { label: "Applications", href: "/dashboard#applications", icon: FileText },
  { label: "Deadlines", href: "/dashboard#deadlines", icon: Calendar },
  { label: "Settings", href: "/dashboard#settings", icon: Settings },
  { label: "Help & Support", href: "/dashboard#help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-brand-border min-h-screen flex flex-col p-4">
      {/* Brand */}
      <div className="px-3 py-4 border-b border-brand-border/60">
        <Link href="/#home" className="flex items-center gap-2 group">
          <div className="w-7 h-7 text-brand-blue flex-shrink-0">
            <BrandStar className="w-full h-full text-brand-blue" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-lg text-brand-navy leading-none">
              {SITE_CONFIG.shortName}
            </div>
            <div className="font-heading text-[6.5px] font-bold tracking-widest text-brand-navy mt-0.5">
              STUDENT PORTAL
            </div>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-6 space-y-1.5 font-heading">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors",
                isActive
                  ? "bg-brand-sky text-brand-blue"
                  : "text-brand-text hover:bg-brand-bg hover:text-brand-navy"
              )}
            >
              <Icon className="w-4 h-4 text-brand-blue flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Return home link */}
      <div className="pt-4 border-t border-brand-border">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-brand-navy hover:text-brand-blue transition-colors font-heading"
        >
          <Home className="w-4 h-4" />
          <span>Back to Main Site</span>
        </Link>
      </div>
    </aside>
  );
}

