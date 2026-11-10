"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Megaphone,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  Sliders,
  Sparkles,
  ArrowRight,
  X,
  Radio,
  Award,
  BellRing,
} from "lucide-react";
import { Announcement, AnnouncementType } from "@/types";
import { cn } from "@/lib/utils";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [tickerSpeed, setTickerSpeed] = useState<number>(28);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingSpeed, setIsSavingSpeed] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Announcement>>({
    title: "",
    badge: "LIMITED SPOTS",
    linkText: "Schedule Free Consultation",
    linkUrl: "https://meetings-na2.hubspot.com/bluestars/initial-consultation",
    type: "banner",
    isActive: true,
    priority: 10,
  });

  // Preview Mode: 'desktop' | 'mobile'
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  const loadAnnouncements = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/announcements");
      if (res.ok) {
        const data = await res.json();
        setAnnouncements(data.announcements || []);
        if (data.stats) setStats(data.stats);
        if (data.tickerSpeed) setTickerSpeed(Number(data.tickerSpeed));
      }
    } catch {
      setStatusMessage({ type: "error", text: "Failed to load announcements from server." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      badge: "LIMITED SPOTS",
      linkText: "Schedule Free Consultation",
      linkUrl: "/contact",
      type: "banner",
      isActive: true,
      priority: 10,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Announcement) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      showNotification("Please provide an announcement title.", "error");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ announcement: formData }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        showNotification("Announcement saved and updated automatically in Supabase!");
        loadAnnouncements();
      } else {
        showNotification(data.message || "Failed to save announcement.", "error");
      }
    } catch {
      showNotification("Failed to save announcement.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSpeed = async (newSpeed: number) => {
    const clamped = Math.max(10, Math.min(90, newSpeed));
    setTickerSpeed(clamped);
    setIsSavingSpeed(true);
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "set_speed", speed: clamped }),
      });

      if (res.ok) {
        showNotification(`Ticker scroll speed set to ${clamped}s (auto-saved to Supabase)`);
      }
    } catch {
      showNotification("Failed to save speed.", "error");
    } finally {
      setIsSavingSpeed(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "toggle" }),
      });

      if (res.ok) {
        showNotification("Announcement status updated successfully.");
        loadAnnouncements();
      }
    } catch {
      showNotification("Failed to toggle status.", "error");
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/announcements?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showNotification("Announcement deleted successfully.");
        loadAnnouncements();
      }
    } catch {
      showNotification("Failed to delete announcement.", "error");
    }
  };

  // Active items for preview
  const activeItems = announcements.filter((a) => a.isActive);

  const getTypeIcon = (type?: AnnouncementType) => {
    switch (type) {
      case "webinar":
        return <Radio className="w-3.5 h-3.5 text-[#38bdf8]" />;
      case "success":
        return <Award className="w-3.5 h-3.5 text-[#4ade80]" />;
      case "urgent":
        return <AlertCircle className="w-3.5 h-3.5 text-[#f87171]" />;
      case "alert":
        return <BellRing className="w-3.5 h-3.5 text-[#fbbf24]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Status Toast */}
      {statusMessage && (
        <div
          className={cn(
            "fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2.5 text-sm font-medium animate-in slide-in-from-top-2",
            statusMessage.type === "success"
              ? "bg-[#2F9E5C] text-white"
              : "bg-red-600 text-white"
          )}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#e2eef9]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
            <span className="text-xs font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
              WEBSITE ANNOUNCEMENT ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-heading tracking-tight">
            Top Banner &amp; Announcements
          </h1>
          <p className="text-[14.5px] text-brand-text font-sans mt-1">
            Manage high-converting top announcements shown across all pages. Auto-saves directly to Supabase.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={loadAnnouncements}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[5px] text-xs font-semibold bg-white border border-[#dce8f5] text-brand-navy hover:bg-brand-sky transition-colors shadow-xs"
            title="Refresh announcements list"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", isLoading && "animate-spin text-brand-blue")} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[5px] text-xs sm:text-[13px] font-bold bg-brand-blue hover:bg-brand-navy text-white transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Announcement</span>
          </button>
        </div>
      </div>

      {/* KPI Stats & Integrated Speed Option in 1 Main View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Total */}
        <div className="p-4 sm:p-5 rounded-[6px] bg-white border border-[#e2eef9] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-text font-heading">
              Total Announcements
            </span>
            <Megaphone className="w-4 h-4 text-brand-blue" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-heading mt-2">
            {stats.total}
          </div>
          <p className="text-[12px] text-brand-text/80 mt-1">Stored automatically in Supabase</p>
        </div>

        {/* Card 2: Active */}
        <div className="p-4 sm:p-5 rounded-[6px] bg-white border border-[#e2eef9] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-text font-heading">
              Active &amp; Live Banners
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-heading mt-2">
            {stats.active}
          </div>
          <p className="text-[12px] text-emerald-700 mt-1">Showing to visitors right now</p>
        </div>

        {/* Card 3: Continuous Marquee Speed Control (Main View & Responsive) */}
        <div className="p-4 sm:p-5 rounded-[6px] bg-white border border-[#e2eef9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-text font-heading flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-brand-blue" />
              Ticker Scroll Speed
            </span>
            <span className="px-2 py-0.5 rounded-[4px] bg-brand-sky text-brand-blue text-xs font-extrabold font-heading">
              {tickerSpeed}s / cycle
            </span>
          </div>

          <div className="my-2 space-y-2">
            <input
              type="range"
              min={12}
              max={60}
              step={2}
              value={tickerSpeed}
              onChange={(e) => setTickerSpeed(parseInt(e.target.value) || 28)}
              onMouseUp={() => handleSaveSpeed(tickerSpeed)}
              onTouchEnd={() => handleSaveSpeed(tickerSpeed)}
              aria-label="Ticker scroll speed slider"
              className="w-full accent-brand-blue cursor-pointer h-1.5 bg-[#e2eef9] rounded-lg"
            />

            <div className="flex items-center justify-between gap-1.5">
              <button
                type="button"
                onClick={() => handleSaveSpeed(16)}
                className={cn(
                  "px-2 py-1 rounded-[4px] text-[11px] font-bold transition-all flex-1 text-center",
                  tickerSpeed <= 18
                    ? "bg-brand-blue text-white shadow-xs"
                    : "bg-[#f0f6fc] text-brand-navy hover:bg-[#e2eef9]"
                )}
              >
                ⚡ Fast (16s)
              </button>
              <button
                type="button"
                onClick={() => handleSaveSpeed(28)}
                className={cn(
                  "px-2 py-1 rounded-[4px] text-[11px] font-bold transition-all flex-1 text-center",
                  tickerSpeed > 18 && tickerSpeed <= 34
                    ? "bg-brand-blue text-white shadow-xs"
                    : "bg-[#f0f6fc] text-brand-navy hover:bg-[#e2eef9]"
                )}
              >
                🎯 Normal (28s)
              </button>
              <button
                type="button"
                onClick={() => handleSaveSpeed(44)}
                className={cn(
                  "px-2 py-1 rounded-[4px] text-[11px] font-bold transition-all flex-1 text-center",
                  tickerSpeed > 34
                    ? "bg-brand-blue text-white shadow-xs"
                    : "bg-[#f0f6fc] text-brand-navy hover:bg-[#e2eef9]"
                )}
              >
                🐢 Slow (44s)
              </button>
            </div>
          </div>

          <p className="text-[11px] text-brand-text/75 font-sans">
            Auto-saves to Supabase. Drag slider or tap presets.
          </p>
        </div>
      </div>

      {/* Interactive Live Preview Box */}
      <div className="p-5 sm:p-6 rounded-[8px] bg-white border border-[#dce8f5] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-brand-blue" />
            <h2 className="text-sm sm:text-base font-bold text-brand-navy font-heading">
              Live Continuous Ticker Preview
            </h2>
            <span className="text-xs text-brand-text font-sans">
              (Speed: {tickerSpeed}s • Continuous right-to-left)
            </span>
          </div>

          <div className="inline-flex items-center rounded-[5px] bg-[#f0f6fc] p-0.5 border border-[#dce8f5]">
            <button
              type="button"
              onClick={() => setPreviewMode("desktop")}
              className={cn(
                "px-3 py-1 rounded-[4px] text-xs font-semibold transition-all",
                previewMode === "desktop"
                  ? "bg-white text-brand-navy shadow-xs font-bold"
                  : "text-brand-text hover:text-brand-navy"
              )}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode("mobile")}
              className={cn(
                "px-3 py-1 rounded-[4px] text-xs font-semibold transition-all",
                previewMode === "mobile"
                  ? "bg-white text-brand-navy shadow-xs font-bold"
                  : "text-brand-text hover:text-brand-navy"
              )}
            >
              Mobile View
            </button>
          </div>
        </div>

        {/* The Rendered Preview Banner */}
        <div
          className={cn(
            "rounded-[6px] overflow-hidden border border-[#dce8f5] transition-all mx-auto",
            previewMode === "mobile" ? "max-w-[400px] shadow-md" : "w-full shadow-xs"
          )}
        >
          <div className="bg-gradient-to-r from-[#063354] via-[#094c79] to-[#0b63b5] text-white h-[38px] sm:h-[42px] flex items-center relative overflow-hidden select-none">
            {/* Left/Right Edge Fade Masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#063354] to-transparent z-10" />
            <div className="pointer-events-none absolute right-9 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0b63b5] to-transparent z-10" />

            <div className="flex-1 overflow-hidden h-full flex items-center">
              <div
                className="animate-marquee-scroll flex items-center whitespace-nowrap"
                style={{ animationDuration: `${tickerSpeed}s` }}
              >
                {(activeItems.length > 0
                  ? [...activeItems, ...activeItems, ...activeItems]
                  : [formData, formData, formData]
                ).map((item, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 flex-shrink-0"
                  >
                    <span className="flex-shrink-0">{getTypeIcon(item.type)}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-[4px] bg-white/15 border border-white/25 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-sky-200 shadow-xs flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-xs sm:text-[13px] font-bold text-white tracking-tight flex-shrink-0">
                      {item.title}
                    </span>
                    {item.linkText && (
                      <span className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-bold text-white underline underline-offset-2 decoration-[#38bdf8] flex-shrink-0">
                        <span>{item.linkText}</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                    <span className="text-[#38bdf8]/60 text-xs sm:text-sm pl-2 sm:pl-3" aria-hidden="true">
                      ✦
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-20 flex-shrink-0 pr-3 pl-1 bg-gradient-to-l from-[#0b63b5] via-[#0b63b5] to-transparent h-full flex items-center">
              <span className="p-1 rounded text-white/70 hover:text-white cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="bg-white rounded-[8px] border border-[#e2eef9] shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#e2eef9] flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-brand-navy font-heading">
              Configured Announcements ({announcements.length})
            </h2>
            <p className="text-xs sm:text-[13px] text-brand-text font-sans mt-0.5">
              Toggle live visibility or adjust priority order.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-brand-text font-sans">
            <RefreshCw className="w-6 h-6 animate-spin text-brand-blue mx-auto mb-2" />
            <span>Loading announcements from Supabase...</span>
          </div>
        ) : announcements.length === 0 ? (
          <div className="p-12 text-center text-brand-text font-sans">
            <Megaphone className="w-8 h-8 text-brand-blue/40 mx-auto mb-2" />
            <p className="font-semibold text-brand-navy">No announcements found</p>
            <p className="text-xs text-brand-text mt-1">Create your first website banner announcement above.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#e2eef9]">
            {announcements.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-4 sm:p-5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4",
                  item.isActive ? "bg-white" : "bg-[#f8fbfe]/60 opacity-80"
                )}
              >
                {/* Left Info: Title, Badge, Type, CTA */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {getTypeIcon(item.type)}

                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#eef6fc] border border-[#d2e4f5] text-[10.5px] font-bold text-brand-blue uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}

                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Priority: {item.priority}
                    </span>

                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider inline-flex items-center gap-1",
                        item.isActive
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      )}
                    >
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          item.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                        )}
                      />
                      {item.isActive ? "Live" : "Paused"}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-brand-navy font-heading">
                    {item.title}
                  </h3>

                  {item.linkText && (
                    <div className="flex items-center gap-1 text-xs font-semibold text-brand-blue pt-0.5">
                      <span>CTA:</span>
                      <span className="underline">{item.linkText}</span>
                      {item.linkUrl && <span className="text-brand-text">({item.linkUrl})</span>}
                    </div>
                  )}
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#e2eef9]">
                  {/* Toggle Live */}
                  <button
                    type="button"
                    onClick={() => handleToggleActive(item.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-[5px] text-xs font-bold transition-all border",
                      item.isActive
                        ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    )}
                  >
                    {item.isActive ? "Pause" : "Make Live"}
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(item)}
                    className="p-2 rounded-[5px] bg-[#f0f6fc] hover:bg-[#e2eef9] text-brand-navy transition-colors border border-[#dce8f5]"
                    title="Edit announcement"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDeleteAnnouncement(item.id)}
                    className="p-2 rounded-[5px] bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-200"
                    title="Delete announcement"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Modal (Clean - No Description Field) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[8px] max-w-xl w-full p-6 shadow-2xl border border-[#dce8f5] max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-4 border-b border-[#e2eef9] mb-5">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-brand-blue" />
                <h3 className="text-lg font-bold text-brand-navy font-heading">
                  {editingId ? "Edit Announcement" : "Create New Announcement"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-navy font-heading mb-1">
                  Announcement Title (Header Text) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Class of 2026 Admissions Cohort"
                  className="w-full px-3.5 py-2 text-sm rounded-[5px] border border-[#dce8f5] focus:outline-none focus:ring-2 focus:ring-brand-blue/30 text-brand-navy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy font-heading mb-1">
                    Badge Text (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ""}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. LIMITED SPOTS, FREE WEBINAR"
                    className="w-full px-3.5 py-2 text-sm rounded-[5px] border border-[#dce8f5] focus:outline-none focus:ring-2 focus:ring-brand-blue/30 text-brand-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy font-heading mb-1">
                    Announcement Type
                  </label>
                  <select
                    value={formData.type || "banner"}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as AnnouncementType })}
                    className="w-full px-3.5 py-2 text-sm rounded-[5px] border border-[#dce8f5] focus:outline-none focus:ring-2 focus:ring-brand-blue/30 text-brand-navy bg-white"
                  >
                    <option value="banner">Standard Banner (Sparkles)</option>
                    <option value="webinar">Live Webinar (Radio)</option>
                    <option value="success">Success Story / Milestone (Award)</option>
                    <option value="alert">Notice (Bell)</option>
                    <option value="urgent">Urgent / Deadline (Alert)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy font-heading mb-1">
                    Call To Action Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.linkText || ""}
                    onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                    placeholder="e.g. Schedule Free Consultation"
                    className="w-full px-3.5 py-2 text-sm rounded-[5px] border border-[#dce8f5] focus:outline-none focus:ring-2 focus:ring-brand-blue/30 text-brand-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy font-heading mb-1">
                    Destination URL
                  </label>
                  <input
                    type="text"
                    value={formData.linkUrl || ""}
                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                    placeholder="e.g. /contact or /resources/webinars"
                    className="w-full px-3.5 py-2 text-sm rounded-[5px] border border-[#dce8f5] focus:outline-none focus:ring-2 focus:ring-brand-blue/30 text-brand-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-brand-navy font-heading mb-1">
                    Priority (Higher shows first)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={formData.priority || 10}
                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2 text-sm rounded-[5px] border border-[#dce8f5] focus:outline-none focus:ring-2 focus:ring-brand-blue/30 text-brand-navy"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={Boolean(formData.isActive)}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-brand-blue rounded border-[#dce8f5] focus:ring-brand-blue"
                    />
                    <span className="text-xs font-bold text-brand-navy font-heading">
                      Set as Live on Website
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-5 border-t border-[#e2eef9]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-[5px] text-xs font-semibold text-brand-text hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-[5px] text-xs font-bold bg-brand-blue hover:bg-brand-navy text-white transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>{editingId ? "Update & Save" : "Publish Announcement"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
