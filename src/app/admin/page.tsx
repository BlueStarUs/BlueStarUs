"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  BookOpen,
  FolderOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Megaphone,
  ExternalLink,
  PlusCircle,
  Database,
  CloudUpload,
  Phone,
  Mail,
  Search,
} from "lucide-react";
import { ConsultationLead, SuccessStory, BlogPost } from "@/types";
import { BrandStar } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<ConsultationLead[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [leadsRes, storiesRes, blogsRes] = await Promise.all([
          fetch("/api/admin/leads").then((r) => r.json()),
          fetch("/api/admin/stories").then((r) => r.json()),
          fetch("/api/admin/blogs").then((r) => r.json()),
        ]);

        if (leadsRes.success) setLeads(leadsRes.leads);
        if (storiesRes.success) setStories(storiesRes.stories);
        if (blogsRes.success) setBlogs(blogsRes.blogs);
      } catch (err) {
        console.error("Error loading dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const newLeadsCount = leads.filter((l) => l.status === "new").length;
  const enrolledCount = leads.filter((l) => l.status === "enrolled").length;

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
      {/* Top Banner / Welcome */}
      <div className="p-4 sm:p-6 rounded-[5px] bg-gradient-to-r from-brand-navy via-[#084877] to-brand-blue text-white shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-bl-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
            <span className="w-5 h-[2px] bg-brand-lightBlue rounded-full" />
            <span className="text-[10.5px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-brand-sky font-heading">
              BLUESTARS ADMISSIONS DIRECTOR PORTAL
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading tracking-tight leading-tight mb-2 text-white">
            Welcome to the Blue Stars Admin Console
          </h1>

          <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-sky/85 font-sans mb-4">
            Manage incoming student consultation requests, publish verified acceptance stories, update application guides, and upload high-resolution media directly via ImageKit &amp; Supabase.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[5px] bg-white text-brand-navy hover:bg-brand-sky font-bold text-xs sm:text-[12.5px] font-heading transition-colors shadow-xs"
            >
              <Users className="w-4 h-4 text-brand-blue" />
              <span>Review {newLeadsCount} New Leads</span>
            </Link>

            <Link
              href="/admin/hero"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[5px] bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-[12.5px] font-heading transition-colors"
            >
              <Sparkles className="w-4 h-4 text-brand-lightBlue" />
              <span>Customize Home Hero</span>
            </Link>

            <Link
              href="/admin/stories"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[5px] bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-[12.5px] font-heading transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-brand-lightBlue" />
              <span>Manage Stories ({stories.length})</span>
            </Link>

            <Link
              href="/admin/media"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[5px] bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-[12.5px] font-heading transition-colors"
            >
              <CloudUpload className="w-4 h-4 text-brand-lightBlue" />
              <span>Upload Media</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid - Compact & Responsive 3-Column Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Card 1: Leads */}
        <Link
          href="/admin/leads"
          className="bg-white rounded-[5px] p-3.5 sm:p-4 border border-brand-border shadow-xs flex flex-col justify-between group hover:border-brand-blue/60 hover:shadow-xs transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold font-heading text-brand-text/85 uppercase tracking-wider">
              Consultation Leads
            </span>
            <div className="w-8 h-8 rounded-[4px] bg-brand-sky text-brand-blue flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading leading-tight">
              {leads.length}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-brand-text font-sans mt-0.5 truncate">
              <span className="font-bold text-[#2F9E5C]">{newLeadsCount} Pending Review</span>
              <span className="text-brand-text/40">•</span>
              <span>{enrolledCount} Enrolled</span>
            </div>
          </div>
        </Link>

        {/* Card 2: Stories */}
        <Link
          href="/admin/stories"
          className="bg-white rounded-[5px] p-3.5 sm:p-4 border border-brand-border shadow-xs flex flex-col justify-between group hover:border-brand-blue/60 hover:shadow-xs transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold font-heading text-brand-text/85 uppercase tracking-wider">
              Success Stories
            </span>
            <div className="w-8 h-8 rounded-[4px] bg-[#E3F5EA] text-[#2F9E5C] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading leading-tight">
              {stories.length}
            </div>
            <div className="text-[11px] sm:text-xs text-brand-text font-sans mt-0.5 truncate">
              Verified Ivy League, Stanford, RISD acceptances
            </div>
          </div>
        </Link>

        {/* Card 3: Blogs */}
        <Link
          href="/admin/blogs"
          className="bg-white rounded-[5px] p-3.5 sm:p-4 border border-brand-border shadow-xs flex flex-col justify-between group hover:border-brand-blue/60 hover:shadow-xs transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold font-heading text-brand-text/85 uppercase tracking-wider">
              Published Blogs
            </span>
            <div className="w-8 h-8 rounded-[4px] bg-brand-sky text-brand-blue flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading leading-tight">
              {blogs.length}
            </div>
            <div className="text-[11px] sm:text-xs text-brand-text font-sans mt-0.5 truncate">
              Admissions strategy &amp; essay guides
            </div>
          </div>
        </Link>
      </div>

      {/* Main Two-Column Layout: Latest Leads (Left ~60%) & Quick Operations (Right ~40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Inquiries */}
        <div className="lg:col-span-8 bg-white rounded-[5px] border border-brand-border p-6 shadow-xs">
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-brand-border">
            <div>
              <h2 className="text-lg font-extrabold text-brand-navy font-heading tracking-tight">
                Recent Consultation Requests
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mt-0.5">
                Families who submitted inquiry and strategic consultation requests.
              </p>
            </div>

            <Link
              href="/admin/leads"
              className="text-xs font-bold text-brand-blue hover:text-brand-navy font-heading flex items-center gap-1 transition-colors"
            >
              <span>View All Leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-10 text-brand-text text-xs">
              No inquiries yet. Submissions from the website will automatically appear here.
            </div>
          ) : (
            <div className="divide-y divide-brand-border/60">
              {leads.slice(0, 5).map((lead) => (
                <div
                  key={lead.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F8FBFE] px-2 -mx-2 rounded-[5px] transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-brand-navy font-heading">
                        {lead.fullName}
                      </span>
                      {lead.studentGrade && (
                        <span className="text-[11px] px-2 py-0.5 rounded-[3px] bg-brand-sky text-brand-blue font-bold font-heading">
                          {lead.studentGrade}
                        </span>
                      )}
                      <span
                        className={cn(
                          "text-[10px] px-2 py-0.5 rounded-[3px] font-bold uppercase tracking-wider font-heading",
                          lead.status === "new"
                            ? "bg-amber-100 text-amber-800"
                            : lead.status === "contacted"
                            ? "bg-blue-100 text-blue-800"
                            : lead.status === "enrolled"
                            ? "bg-[#E3F5EA] text-[#2F9E5C]"
                            : "bg-gray-100 text-gray-700"
                        )}
                      >
                        {lead.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-brand-text font-sans mt-1">
                      <span>{lead.email}</span>
                      {lead.phone && <span>• {lead.phone}</span>}
                    </div>

                    {lead.targetColleges && (
                      <div className="text-[11.5px] text-brand-navy/80 font-sans mt-1 truncate">
                        Target: <span className="font-semibold">{lead.targetColleges}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/admin/leads?id=${lead.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-[#F8FBFE] hover:bg-brand-blue text-brand-blue hover:text-white border border-brand-border hover:border-brand-blue text-xs font-bold font-heading transition-colors flex-shrink-0 self-start sm:self-center shadow-2xs"
                  >
                    <span>Review Lead</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Quick Management Shortcuts & Integrations */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions Panel */}
          <div className="bg-white rounded-[5px] border border-brand-border p-5 shadow-xs">
            <h3 className="text-sm font-extrabold text-brand-navy font-heading mb-4 pb-2 border-b border-brand-border">
              Quick Management Shortcuts
            </h3>

            <div className="space-y-2">
              <Link
                href="/admin/hero"
                className="w-full flex items-center justify-between p-3 rounded-[5px] bg-[#F8FBFE] hover:bg-brand-sky border border-brand-border/80 text-xs font-bold text-brand-navy hover:text-brand-blue font-heading transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-brand-blue" />
                  <span>Customize Home Hero Section</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-blue" />
              </Link>

              <Link
                href="/admin/announcements"
                className="w-full flex items-center justify-between p-3 rounded-[5px] bg-[#F8FBFE] hover:bg-brand-sky border border-brand-border/80 text-xs font-bold text-brand-navy hover:text-brand-blue font-heading transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Megaphone className="w-4 h-4 text-brand-blue" />
                  <span>Manage Website Announcements</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-blue" />
              </Link>

              <Link
                href="/admin/stories"
                className="w-full flex items-center justify-between p-3 rounded-[5px] bg-[#F8FBFE] hover:bg-brand-sky border border-brand-border/80 text-xs font-bold text-brand-navy hover:text-brand-blue font-heading transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-brand-blue" />
                  <span>Add New Success Story</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-blue" />
              </Link>

              <Link
                href="/admin/blogs"
                className="w-full flex items-center justify-between p-3 rounded-[5px] bg-[#F8FBFE] hover:bg-brand-sky border border-brand-border/80 text-xs font-bold text-brand-navy hover:text-brand-blue font-heading transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-brand-blue" />
                  <span>Create New Blog Post</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-blue" />
              </Link>

              <Link
                href="/admin/resources"
                className="w-full flex items-center justify-between p-3 rounded-[5px] bg-[#F8FBFE] hover:bg-brand-sky border border-brand-border/80 text-xs font-bold text-brand-navy hover:text-brand-blue font-heading transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FolderOpen className="w-4 h-4 text-brand-blue" />
                  <span>Manage Application Toolkits</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-blue" />
              </Link>

              <Link
                href="/admin/media"
                className="w-full flex items-center justify-between p-3 rounded-[5px] bg-[#F8FBFE] hover:bg-brand-sky border border-brand-border/80 text-xs font-bold text-brand-navy hover:text-brand-blue font-heading transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <CloudUpload className="w-4 h-4 text-brand-blue" />
                  <span> Media Uploader </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-blue" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

