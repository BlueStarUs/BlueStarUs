"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Settings,
  Save,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function AdminSettingsPage() {
  const [siteConfig, setSiteConfig] = useState(SITE_CONFIG);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Load latest settings from server (Supabase & fallback)
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            setSiteConfig((prev) => ({ ...prev, ...data.settings }));
          }
        }
      } catch (err) {
        console.warn("Notice: Loaded default settings", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: siteConfig }),
      });

      if (res.ok) {
        setIsSaved(true);
        setSaveMessage("Site settings updated successfully in Supabase!");
        setTimeout(() => setIsSaved(false), 3500);
      } else {
        setSaveMessage("Failed to update site settings.");
      }
    } catch {
      setSaveMessage("Failed to update site settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-5 h-[2px] bg-brand-lightBlue rounded-full" />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-brand-blue font-heading">
              SITE CONFIGURATION
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
            Site General Settings
          </h1>
          <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mt-0.5">
            Manage organization details, primary contact email, telephone, and official office locations.
          </p>
        </div>

        <Link
          href="/admin/hero"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[5px] bg-brand-sky/70 hover:bg-brand-sky border border-brand-blue/20 text-brand-navy text-xs font-bold font-heading transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
          <span>Home Hero Section →</span>
        </Link>
      </div>

      {/* Global Success / Alert Banner */}
      {isSaved && (
        <div className="p-3.5 rounded-[5px] bg-[#E3F5EA] border border-[#2F9E5C]/30 text-[#1F7A46] text-xs font-bold font-heading flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#2F9E5C]" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Quick Hero Banner Notice */}
      <div className="p-4 rounded-[5px] bg-gradient-to-r from-brand-sky/60 via-white to-brand-sky/30 border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[5px] bg-white border border-brand-blue/20 flex items-center justify-center flex-shrink-0 text-brand-blue shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-extrabold text-brand-navy font-heading">
              Looking to customize the Home Hero Section?
            </div>
            <div className="text-xs text-brand-text font-sans mt-0.5">
              The Home Hero customizer is now located directly in the Management Console navigation for faster access.
            </div>
          </div>
        </div>

        <Link
          href="/admin/hero"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-brand-blue hover:bg-brand-navy text-white text-xs font-bold font-heading transition-colors flex-shrink-0 self-start sm:self-auto shadow-2xs"
        >
          <span>Open Hero Section</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* General Settings Form */}
      <div className="bg-white rounded-[5px] border border-brand-border p-5 sm:p-6 shadow-xs max-w-3xl">
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-brand-border">
          <div>
            <h2 className="text-base font-extrabold text-brand-navy font-heading">
              General Admissions Consulting Information
            </h2>
            <p className="text-xs text-brand-text font-sans mt-0.5">
              Updates will persist to the cloud database and synchronize across headers, footers, and consultation emails.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveGeneral} className="space-y-4 text-xs font-sans">
          <div>
            <label className="font-bold text-brand-navy font-heading block mb-1">
              Consultancy Organization Name
            </label>
            <input
              type="text"
              value={siteConfig.name}
              onChange={(e) => setSiteConfig({ ...siteConfig, name: e.target.value })}
              className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy font-heading text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-brand-navy font-heading block mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-blue" />
                <span>Primary Contact Email</span>
              </label>
              <input
                type="email"
                value={siteConfig.contact.email}
                onChange={(e) =>
                  setSiteConfig({
                    ...siteConfig,
                    contact: { ...siteConfig.contact, email: e.target.value },
                  })
                }
                className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-brand-navy font-heading block mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-blue" />
                <span>Inquiries Phone Number</span>
              </label>
              <input
                type="text"
                value={siteConfig.contact.phone}
                onChange={(e) =>
                  setSiteConfig({
                    ...siteConfig,
                    contact: { ...siteConfig.contact, phone: e.target.value },
                  })
                }
                className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy text-xs"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-brand-navy font-heading block mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-blue" />
              <span>Official Head Office Location</span>
            </label>
            <input
              type="text"
              value={siteConfig.contact.address}
              onChange={(e) =>
                setSiteConfig({
                  ...siteConfig,
                  contact: { ...siteConfig.contact, address: e.target.value },
                })
              }
              className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy text-xs"
            />
          </div>

          <div className="pt-4 border-t border-brand-border flex items-center justify-between">
            <span className="text-xs text-brand-text">
              Securely connected with cloud persistence.
            </span>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-brand-blue hover:bg-brand-navy text-white text-xs font-bold font-heading shadow-xs transition-colors cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save General Settings</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
