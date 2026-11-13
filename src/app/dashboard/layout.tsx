import React from "react";
import { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Student Portal & Dashboard",
  description: "Manage your college list, track application deadlines, and view mentor feedback.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-brand-bg">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-brand-border px-6 flex items-center justify-between">
          <div className="font-heading font-bold text-sm text-brand-navy">
            Student Admissions Dashboard
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-brand-text">Welcome, Student</span>
            <div className="w-8 h-8 rounded-full bg-brand-blue text-white grid place-items-center font-bold text-xs">
              S
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

