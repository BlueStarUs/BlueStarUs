"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Save,
  CheckCircle2,
  ExternalLink,
  Upload,
  Loader2,
  Layout,
  RefreshCw,
  Eye,
  ArrowRight,
} from "lucide-react";
import { DEFAULT_HERO_CONFIG } from "@/lib/constants";
import { HeroConfig } from "@/types";
import { cn } from "@/lib/utils";

export default function AdminHeroPage() {
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(DEFAULT_HERO_CONFIG);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Load latest hero configuration from server
  useEffect(() => {
    async function loadHero() {
      try {
        const res = await fetch("/api/admin/hero");
        if (res.ok) {
          const data = await res.json();
          if (data.hero) {
            setHeroConfig((prev) => ({ ...prev, ...data.hero }));
          }
        }
      } catch (err) {
        console.warn("Notice: Loaded default hero config", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadHero();
  }, []);

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("");

    try {
      const res = await fetch("/api/admin/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hero: heroConfig }),
      });

      if (res.ok) {
        setIsSaved(true);
        setSaveMessage("Hero Section published and live on website!");
        setTimeout(() => setIsSaved(false), 3500);
      } else {
        setSaveMessage("Failed to update hero settings.");
      }
    } catch {
      setSaveMessage("Failed to update hero settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "/bluestars/hero");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setHeroConfig((prev) => ({ ...prev, image: data.url }));
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setIsUploadingImage(false);
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
              MANAGEMENT CONSOLE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
            Home Hero Section Management
          </h1>
          <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mt-0.5">
            Manage your Home Page Hero section content, typography, call-to-actions, and background photography.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[5px] bg-white border border-brand-border hover:bg-brand-sky text-brand-navy text-xs font-bold font-heading transition-colors shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-brand-blue" />
            <span>View Live Site</span>
            <ExternalLink className="w-3 h-3 text-brand-text/60" />
          </Link>

          <button
            type="button"
            onClick={() => setHeroConfig(DEFAULT_HERO_CONFIG)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[5px] bg-white border border-brand-border hover:bg-brand-sky text-brand-text text-xs font-bold font-heading transition-colors shadow-2xs cursor-pointer"
            title="Reset to default original copy"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Global Success / Alert Banner */}
      {isSaved && (
        <div className="p-3.5 rounded-[5px] bg-[#E3F5EA] border border-[#2F9E5C]/30 text-[#1F7A46] text-xs font-bold font-heading flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#2F9E5C]" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Form: All Hero Fields */}
        <div className="lg:col-span-8 bg-white rounded-[5px] border border-brand-border p-4 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-brand-border">
            <div>
              <h2 className="text-base font-extrabold text-brand-navy font-heading">
                Hero Content &amp; Media Configuration
              </h2>
              <p className="text-xs text-brand-text font-sans">
                Changes save directly to Supabase and publish instantly to the live landing page.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-[4px] bg-brand-sky text-brand-blue text-[11px] font-bold font-heading uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Original Layout</span>
            </span>
          </div>

          <form onSubmit={handleSaveHero} className="space-y-4 text-xs font-sans">
            {/* Kicker */}
            <div>
              <label className="font-bold text-brand-navy font-heading block mb-1">
                Top Kicker Label (Uppercase)
              </label>
              <input
                type="text"
                value={heroConfig.kicker}
                onChange={(e) => setHeroConfig({ ...heroConfig, kicker: e.target.value })}
                placeholder="EXPERT GUIDANCE. BRIGHTER OPPORTUNITIES."
                className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy font-heading"
              />
            </div>

            {/* 3-Line Heading */}
            <div>
              <label className="font-bold text-brand-navy font-heading block mb-1">
                Hero Main Heading (3 Lines)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[11px] text-brand-text block mb-1">Line 1</span>
                  <input
                    type="text"
                    value={heroConfig.headingLine1}
                    onChange={(e) =>
                      setHeroConfig({ ...heroConfig, headingLine1: e.target.value })
                    }
                    className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy font-heading font-bold"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-brand-text block mb-1">Line 2</span>
                  <input
                    type="text"
                    value={heroConfig.headingLine2}
                    onChange={(e) =>
                      setHeroConfig({ ...heroConfig, headingLine2: e.target.value })
                    }
                    className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy font-heading font-bold"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-brand-text block mb-1">Line 3</span>
                  <input
                    type="text"
                    value={heroConfig.headingLine3}
                    onChange={(e) =>
                      setHeroConfig({ ...heroConfig, headingLine3: e.target.value })
                    }
                    className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy font-heading font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="font-bold text-brand-navy font-heading block mb-1">
                Hero Paragraph Description
              </label>
              <textarea
                rows={3}
                value={heroConfig.description}
                onChange={(e) => setHeroConfig({ ...heroConfig, description: e.target.value })}
                className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy font-sans leading-relaxed"
              />
            </div>

            {/* Action Buttons */}
            <div className="p-3.5 rounded-[5px] bg-[#F8FBFE] border border-brand-border space-y-3">
              <span className="font-bold text-brand-navy font-heading block uppercase tracking-wider text-[11px]">
                Call To Action (CTA) Buttons
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-brand-text block mb-0.5">Primary Button Text</label>
                  <input
                    type="text"
                    value={heroConfig.primaryBtnText}
                    onChange={(e) =>
                      setHeroConfig({ ...heroConfig, primaryBtnText: e.target.value })
                    }
                    className="w-full p-2 rounded-[4px] border border-brand-border bg-white text-brand-navy"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-brand-text block mb-0.5">Primary Button Link</label>
                  <input
                    type="text"
                    value={heroConfig.primaryBtnHref}
                    onChange={(e) =>
                      setHeroConfig({ ...heroConfig, primaryBtnHref: e.target.value })
                    }
                    className="w-full p-2 rounded-[4px] border border-brand-border bg-white text-brand-navy font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-brand-text block mb-0.5">Secondary Button Text</label>
                  <input
                    type="text"
                    value={heroConfig.secondaryBtnText}
                    onChange={(e) =>
                      setHeroConfig({ ...heroConfig, secondaryBtnText: e.target.value })
                    }
                    className="w-full p-2 rounded-[4px] border border-brand-border bg-white text-brand-navy"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-brand-text block mb-0.5">Secondary Button Link</label>
                  <input
                    type="text"
                    value={heroConfig.secondaryBtnHref}
                    onChange={(e) =>
                      setHeroConfig({ ...heroConfig, secondaryBtnHref: e.target.value })
                    }
                    className="w-full p-2 rounded-[4px] border border-brand-border bg-white text-brand-navy font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>

            {/* Hero Image & ImageKit */}
            <div>
              <label className="font-bold text-brand-navy font-heading block mb-1">
                Right-Side Hero Image (With Gradient Mask)
              </label>

              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <input
                  type="text"
                  value={heroConfig.image}
                  onChange={(e) => setHeroConfig({ ...heroConfig, image: e.target.value })}
                  placeholder="/images/sub_images/Students_hero.png"
                  className="flex-1 w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy font-mono text-[11px]"
                />

                <label className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-[5px] bg-brand-blue hover:bg-brand-navy text-white font-bold font-heading text-xs transition-colors cursor-pointer flex-shrink-0">
                  {isUploadingImage ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload to ImageKit</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isUploadingImage}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setHeroConfig({
                      ...heroConfig,
                      image: "/images/sub_images/Students_hero.png",
                    })
                  }
                  className="px-3 py-2.5 rounded-[5px] border border-brand-border bg-white text-brand-text hover:text-brand-navy text-xs font-medium cursor-pointer flex-shrink-0"
                >
                  Reset Default
                </button>
              </div>
              <p className="text-[11px] text-brand-text/70 mt-1">
                Supports local paths (`/images/...`) or direct ImageKit CDN hosted URLs (`https://ik.imagekit.io/...`).
              </p>
            </div>

            {/* Key Highlight Badges (3 items) */}
            <div className="p-3.5 rounded-[5px] bg-[#F8FBFE] border border-brand-border space-y-2.5">
              <span className="font-bold text-brand-navy font-heading block uppercase tracking-wider text-[11px]">
                Three Key Highlights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <span className="text-[11px] text-brand-text block mb-0.5">Feature Badge 1</span>
                  <input
                    type="text"
                    value={heroConfig.feature1}
                    onChange={(e) =>
                      setHeroConfig({ ...heroConfig, feature1: e.target.value })
                    }
                    className="w-full p-2 rounded-[4px] border border-brand-border bg-white text-brand-navy"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-brand-text block mb-0.5">Feature Badge 2</span>
                  <input
                    type="text"
                    value={heroConfig.feature2}
                    onChange={(e) =>
                      setHeroConfig({ ...heroConfig, feature2: e.target.value })
                    }
                    className="w-full p-2 rounded-[4px] border border-brand-border bg-white text-brand-navy"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-brand-text block mb-0.5">Feature Badge 3</span>
                  <input
                    type="text"
                    value={heroConfig.feature3}
                    onChange={(e) =>
                      setHeroConfig({ ...heroConfig, feature3: e.target.value })
                    }
                    className="w-full p-2 rounded-[4px] border border-brand-border bg-white text-brand-navy"
                  />
                </div>
              </div>
            </div>

            {/* Floating Card Badges */}
            <div className="p-3.5 rounded-[5px] bg-[#F8FBFE] border border-brand-border space-y-2.5">
              <span className="font-bold text-brand-navy font-heading block uppercase tracking-wider text-[11px]">
                Right Image Floating Card Labels (3 Pillars)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <span className="text-[11px] text-brand-text block mb-0.5">Card Pillar 1</span>
                  <input
                    type="text"
                    value={heroConfig.card1}
                    onChange={(e) => setHeroConfig({ ...heroConfig, card1: e.target.value })}
                    className="w-full p-2 rounded-[4px] border border-brand-border bg-white text-brand-navy"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-brand-text block mb-0.5">Card Pillar 2</span>
                  <input
                    type="text"
                    value={heroConfig.card2}
                    onChange={(e) => setHeroConfig({ ...heroConfig, card2: e.target.value })}
                    className="w-full p-2 rounded-[4px] border border-brand-border bg-white text-brand-navy"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-brand-text block mb-0.5">Card Pillar 3</span>
                  <input
                    type="text"
                    value={heroConfig.card3}
                    onChange={(e) => setHeroConfig({ ...heroConfig, card3: e.target.value })}
                    className="w-full p-2 rounded-[4px] border border-brand-border bg-white text-brand-navy"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-brand-border flex items-center justify-between">
              <span className="text-xs text-brand-text">
                All changes reflect across the live Home Page upon saving.
              </span>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-brand-blue hover:bg-brand-navy text-white text-xs font-bold font-heading shadow-xs transition-colors cursor-pointer"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save &amp; Publish Hero</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Miniature Preview */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-[5px] border border-brand-border p-4 shadow-xs lg:sticky lg:top-20">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-brand-border">
              <div className="text-xs font-bold text-brand-navy font-heading flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                <span>Live Hero Preview</span>
              </div>
              <span className="text-[10px] text-brand-text/70 uppercase">Desktop Mini</span>
            </div>

            {/* Mini Preview Box */}
            <div className="rounded-[4px] border border-[#e2edf7] bg-gradient-to-b from-[#f3f9ff] to-white p-3 space-y-2 overflow-hidden shadow-2xs">
              <div className="text-[9px] font-bold text-brand-blue font-heading tracking-wider uppercase">
                {heroConfig.kicker}
              </div>

              <div className="font-extrabold text-brand-navy font-heading text-[13px] leading-tight">
                {heroConfig.headingLine1} {heroConfig.headingLine2} {heroConfig.headingLine3}
              </div>

              <div className="text-[10px] text-brand-text line-clamp-2 leading-relaxed">
                {heroConfig.description}
              </div>

              <div className="flex gap-1.5 pt-1">
                <span className="px-2 py-1 rounded-[3px] bg-brand-blue text-white text-[9px] font-bold">
                  {heroConfig.primaryBtnText}
                </span>
                <span className="px-2 py-1 rounded-[3px] border border-brand-border bg-white text-brand-navy text-[9px] font-bold">
                  {heroConfig.secondaryBtnText}
                </span>
              </div>

              {/* Image & floating card preview */}
              <div className="relative w-full h-28 rounded-[3px] overflow-hidden mt-2 bg-gray-100">
                <Image
                  src={heroConfig.image || "/images/sub_images/Students_hero.png"}
                  alt="Preview"
                  fill
                  className="object-cover hero-img-mask"
                />
                <div className="absolute inset-x-1 bottom-1 bg-white/95 rounded-[3px] p-1 flex justify-around text-[8px] font-bold text-brand-navy text-center border border-[#e2edf7]">
                  <span className="truncate">{heroConfig.card1}</span>
                  <span>•</span>
                  <span className="truncate">{heroConfig.card2}</span>
                  <span>•</span>
                  <span className="truncate">{heroConfig.card3}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 text-[11px] text-brand-text flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-brand-blue" />
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-brand-blue font-bold font-heading"
                >
                  View on Home Page →
                </a>
              </div>
              <span className="text-[10px] text-[#2F9E5C] font-bold">Live Synced</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

