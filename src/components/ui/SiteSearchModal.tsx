"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Compass,
  BookOpen,
  Newspaper,
  Award,
  Users,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { NAV_SERVICES, NAV_RESOURCES, HUBSPOT_CONSULTATION_URL } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blogs-data";

interface SearchItem {
  id: string;
  title: string;
  category: "Service" | "Resource" | "Blog" | "Page";
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function SiteSearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search handled by caller
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Build searchable index
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // Core Pages
    items.push(
      {
        id: "home",
        title: "Home",
        category: "Page",
        href: "/",
        description: "Personalized admissions consulting to help high school students reach dream colleges.",
        icon: Sparkles,
      },
      {
        id: "about",
        title: "About Us & Why Blue Stars",
        category: "Page",
        href: "/about",
        description: "Founded by Dr. Amy Morgenstern. Discover our 16+ years of admissions track record and whole-student philosophy.",
        icon: Users,
      },
      {
        id: "why-us",
        title: "Why Choose Blue Stars Admissions Consulting?",
        category: "Page",
        href: "/about#why-us",
        description: "Our 3 core pillars: expert strategic planning, balanced school lists, and standout essay development.",
        icon: Award,
      },
      {
        id: "successes",
        title: "Admissions Successes & Outcomes",
        category: "Page",
        href: "/successes",
        description: "Stanford, Harvard, MIT, Ivy League, UC Berkeley, and merit scholarship admissions track record.",
        icon: Award,
      },
      {
        id: "testimonials",
        title: "Client Testimonials & Stories",
        category: "Page",
        href: "/stories",
        description: "Explore 55 authentic reviews and personal transformations from parents and students.",
        icon: Award,
      },
      {
        id: "free-consultation",
        title: "Book a Free 30-Min Consultation",
        category: "Page",
        href: HUBSPOT_CONSULTATION_URL,
        description: "Schedule a 1-on-1 discovery session with Dr. Amy Morgenstern and our senior counseling team.",
        icon: Calendar,
      },
      {
        id: "contact",
        title: "Contact Us",
        category: "Page",
        href: "/contact",
        description: "Get in touch with Blue Stars headquarters in San Francisco, CA. Phone: 415-426-9444.",
        icon: Users,
      }
    );

    // Services
    NAV_SERVICES.forEach((s) => {
      items.push({
        id: s.id,
        title: s.title,
        category: "Service",
        href: s.href,
        description: s.shortDescription,
        icon: Compass,
      });
    });

    // Resources
    NAV_RESOURCES.forEach((r) => {
      items.push({
        id: r.id,
        title: r.title,
        category: "Resource",
        href: r.href,
        description: r.shortDescription,
        icon: BookOpen,
      });
    });

    // Blogs
    BLOG_POSTS.forEach((b) => {
      items.push({
        id: b.slug,
        title: b.title,
        category: "Blog",
        href: `/blogs/${b.slug}`,
        description: b.excerpt,
        icon: Newspaper,
      });
    });

    return items;
  }, []);

  // Filtered results
  const results = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 8); // Top suggested items
    }
    const q = query.toLowerCase().trim();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  if (!isOpen) return null;

  const handleSelect = (href: string) => {
    onClose();
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Site Search"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-[6px] shadow-[0_24px_64px_rgba(10,61,107,0.25)] border border-[#dce8f5] overflow-hidden flex flex-col mt-4 sm:mt-10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#e2eef9] bg-gradient-to-r from-[#f8fbfe] to-white">
          <Search className="w-5 h-5 text-brand-blue flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs, articles, workbook, guides..."
            className="flex-1 bg-transparent text-brand-navy placeholder:text-brand-text/60 text-base sm:text-[17px] font-sans outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-brand-text/60 hover:text-brand-navy hover:bg-[#e2eef9] transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="hidden sm:inline-block text-[11px] font-bold text-brand-text/60 bg-[#edf5fc] px-2 py-0.5 rounded-[4px] border border-[#d2e5f5] font-heading">
              ESC to close
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-brand-text hover:text-brand-navy"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 sm:p-4 space-y-1.5 divide-y divide-[#f0f6fc]">
          <div className="px-3 py-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-brand-blue font-heading">
            <span>{query.trim() ? `Search Results (${results.length})` : "Quick Suggestions"}</span>
            <span className="text-brand-text/70 lowercase font-sans">{results.length} matches</span>
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center">
              <Search className="w-8 h-8 text-brand-blue/40 mx-auto mb-2" />
              <p className="text-brand-navy font-bold font-heading text-base">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-brand-text text-xs sm:text-[13px] font-sans mt-1">
                Try searching for &ldquo;consulting&rdquo;, &ldquo;workbook&rdquo;, &ldquo;essays&rdquo;, or &ldquo;webinars&rdquo;.
              </p>
            </div>
          ) : (
            results.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.href)}
                  className="w-full text-left p-3 rounded-[5px] hover:bg-[#f0f7fe] transition-colors flex items-start gap-3.5 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-[4px] bg-[#E3F1FC] text-brand-blue grid place-items-center flex-shrink-0 mt-0.5 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-heading font-extrabold text-brand-navy text-[14.5px] sm:text-[15.5px] group-hover:text-brand-blue transition-colors truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-[3px] bg-[#eef6fc] text-brand-blue border border-[#d6e7f7] font-heading flex-shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-brand-text font-sans line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity self-center flex-shrink-0" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-[#f8fbfe] border-t border-[#e2eef9] flex items-center justify-between text-xs text-brand-text font-sans">
          <span>Need direct assistance? Call <a href="tel:4154269444" className="font-bold text-brand-blue hover:underline">415-426-9444</a></span>
          <Link
            href={HUBSPOT_CONSULTATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="font-bold text-brand-blue hover:text-brand-navy font-heading"
          >
            Book Free Consultation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

