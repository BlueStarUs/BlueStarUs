"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Tag,
  ChevronRight,
  X,
  User,
} from "lucide-react";
import { BlogPost } from "@/types";
import { BLOG_CATEGORIES } from "@/lib/blogs-data";
import { cn } from "@/lib/utils";

interface BlogListingProps {
  initialPosts: BlogPost[];
}

export function BlogListing({ initialPosts }: BlogListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  // Featured article (first marked featured or first post in list)
  const featuredPost = useMemo(() => {
    if (selectedCategory !== "All" || searchQuery) return null;
    return initialPosts.find((p) => p.featured) || initialPosts[0];
  }, [initialPosts, selectedCategory, searchQuery]);

  // Remaining posts when featured is visible
  const gridPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  return (
    <section className="relative w-full py-12 sm:py-10 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] overflow-hidden">
      {/* Decorative Background Elements */}
      <div
        className="absolute top-0 right-0 w-[450px] h-[350px] bg-gradient-to-bl from-brand-sky/60 via-[#edf6fd]/30 to-transparent rounded-bl-[260px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-0 w-[400px] h-[320px] bg-gradient-to-tr from-brand-green/40 via-[#edf8f1]/20 to-transparent rounded-tr-[240px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Controls Bar: Search & Category Pills */}
        <div className="mb-10 sm:mb-14 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input Box */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by keyword, topic, or school..."
                className="w-full pl-11 pr-10 py-3 rounded-[5px] bg-white border border-brand-border text-sm text-brand-navy placeholder:text-brand-text/60 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue shadow-xs transition-all font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-brand-bg text-brand-text hover:text-brand-navy grid place-items-center transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Post Count Pill */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-brand-navy/70 font-heading self-start md:self-auto">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              <span>
                Showing {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {BLOG_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 sm:px-5 py-2 sm:py-2.5 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading whitespace-nowrap transition-all duration-200 shadow-xs",
                    isSelected
                      ? "bg-brand-blue text-white shadow-md scale-[1.02]"
                      : "bg-white text-brand-navy hover:text-brand-blue hover:bg-brand-sky/60 border border-brand-border/80"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Post Card (Hero Banner) */}
        {featuredPost && (
          <div className="mb-12 sm:mb-16">
            <div className="group relative rounded-[5px] bg-white border border-brand-border overflow-hidden shadow-[0_12px_40px_rgba(10,61,107,0.08)] hover:shadow-[0_22px_54px_rgba(10,61,107,0.13)] transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Image side */}
                <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-heading bg-white/95 text-brand-blue shadow-md backdrop-blur-sm border border-brand-border">
                      <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                      <span>Featured Guide</span>
                    </span>
                  </div>
                </div>

                {/* Content side */}
                <div className="lg:col-span-6 p-7 sm:p-9 lg:p-11 flex flex-col justify-between bg-gradient-to-br from-white via-[#fcfdfe] to-[#f4f9fd]">
                  <div>
                    {/* Category & Metadata */}
                    <div className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold text-brand-text mb-3">
                      <span className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-heading bg-brand-sky text-brand-blue text-[10.5px]">
                        {featuredPost.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                        {featuredPost.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-blue" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-brand-navy font-heading leading-tight tracking-tight mb-4 group-hover:text-brand-blue transition-colors">
                      <Link href={`/blogs/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-base sm:text-[16.5px] leading-relaxed text-brand-text font-sans mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {featuredPost.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-navy/70 bg-brand-bg px-2.5 py-1 rounded-md border border-brand-border/60"
                        >
                          <Tag className="w-2.5 h-2.5 text-brand-blue/60" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author Card & CTA */}
                  <div className="pt-6 border-t border-brand-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-sky text-brand-blue border border-brand-blue/30 flex items-center justify-center flex-shrink-0 shadow-xs">
                        <User className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-xs sm:text-sm text-brand-navy leading-tight">
                          {featuredPost.author.name}
                        </div>
                        <div className="text-[11px] sm:text-xs text-brand-text font-sans">
                          {featuredPost.author.role}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/blogs/${featuredPost.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[5px] bg-brand-blue hover:bg-brand-navy text-white font-bold text-xs sm:text-[13.5px] font-heading shadow-md hover:shadow-lg transition-all duration-200 group/btn"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {gridPosts.map((article) => {
              const isBlue = article.accent === "blue";

              return (
                <article
                  key={article.slug}
                  className="relative bg-white rounded-[5px] overflow-hidden shadow-[0_8px_28px_rgba(10,61,107,0.07)] border border-brand-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_38px_rgba(10,61,107,0.12)] flex flex-col group"
                >
                  {/* Top Image Container */}
                  <Link
                    href={`/blogs/${article.slug}`}
                    className="relative block w-full h-[200px] sm:h-[215px] overflow-hidden bg-brand-sky"
                  >
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Floating Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider font-heading shadow-sm",
                          isBlue
                            ? "bg-brand-sky text-brand-blue"
                            : "bg-brand-green text-brand-greenDark"
                        )}
                      >
                        {article.category}
                      </span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Date & Read time */}
                      <div className="flex items-center gap-2 text-xs text-brand-text mb-3">
                        <span className="flex items-center gap-1 font-sans">
                          <Calendar className="w-3 h-3 text-brand-blue" />
                          {article.publishedAt}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-sans">
                          <Clock className="w-3 h-3 text-brand-blue" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-[19px] sm:text-[20px] font-bold text-brand-navy font-heading leading-[1.3] mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">
                        <Link href={`/blogs/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>

                      {/* Description */}
                      <p className="text-[14px] sm:text-[14.5px] leading-relaxed text-brand-text font-sans mb-5 line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Footer Row */}
                    <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-brand-sky text-brand-blue border border-brand-blue/30 flex items-center justify-center flex-shrink-0">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-semibold text-brand-navy font-heading truncate max-w-[130px]">
                          {article.author.name}
                        </span>
                      </div>

                      <Link
                        href={`/blogs/${article.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[5px] bg-brand-blue hover:bg-brand-navy text-white text-xs sm:text-[13px] hover:shadow-lg transition-all duration-200 group/btn"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-brand-border">
            <BookOpen className="w-12 h-12 text-brand-blue/40 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-brand-navy font-heading mb-2">
              No matching articles found
            </h3>
            <p className="text-sm text-brand-text max-w-md mx-auto mb-6">
              We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo;. Try another search keyword or reset the category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-5 py-2.5 rounded-full bg-brand-blue text-white font-bold text-xs sm:text-sm font-heading hover:bg-brand-navy transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

