"use client";

import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Tag,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  FilterX,
} from "lucide-react";
import { BlogPost } from "@/types";
import { BLOG_CATEGORIES, getDefaultBlogImage } from "@/lib/blogs-data";
import { BlogImageWithFallback } from "@/components/ui/BlogImageWithFallback";
import { trackBlogSearch, trackSearchResultClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface BlogListingProps {
  initialPosts: BlogPost[];
}

const POSTS_PER_PAGE = 12;

export function BlogListing({ initialPosts }: BlogListingProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read initial values from URL query parameters
  const categoryParam = searchParams.get("category");
  const queryParam = searchParams.get("q") || searchParams.get("search") || "";

  // Normalize initial category against known list (case-insensitive)
  const initialCategory = useMemo(() => {
    if (!categoryParam) return "All";
    const found = BLOG_CATEGORIES.find(
      (c) => c.toLowerCase() === categoryParam.toLowerCase().trim()
    );
    return found || "All";
  }, [categoryParam]);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchInput, setSearchInput] = useState<string>(queryParam);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(queryParam);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync state if URL query params change (e.g. back/forward navigation)
  useEffect(() => {
    if (categoryParam) {
      const match = BLOG_CATEGORIES.find(
        (c) => c.toLowerCase() === categoryParam.toLowerCase().trim()
      );
      if (match && match !== selectedCategory) {
        setSelectedCategory(match);
      }
    } else if (selectedCategory !== "All" && !categoryParam) {
      setSelectedCategory("All");
    }

    const currentUrlQ = searchParams.get("q") || searchParams.get("search") || "";
    if (currentUrlQ !== searchInput) {
      setSearchInput(currentUrlQ);
      setDebouncedQuery(currentUrlQ);
    }
  }, [categoryParam, searchParams]);

  // Debounce search input (250ms) to ensure smooth performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Update URL search parameters without triggering a full page reload or scrolling
  const updateUrlParams = useCallback(
    (newCategory: string, newQuery: string) => {
      if (typeof window === "undefined") return;

      const params = new URLSearchParams(window.location.search);

      if (newCategory && newCategory !== "All") {
        params.set("category", newCategory);
      } else {
        params.delete("category");
      }

      if (newQuery && newQuery.trim()) {
        params.set("q", newQuery.trim());
      } else {
        params.delete("q");
        params.delete("search");
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      window.history.replaceState(null, "", newUrl);
    },
    [pathname]
  );

  // Reset to page 1 whenever category or search query changes
  useEffect(() => {
    setCurrentPage(1);
    updateUrlParams(selectedCategory, debouncedQuery);
  }, [selectedCategory, debouncedQuery, updateUrlParams]);

  // Comprehensive multi-field filtering
  const filteredPosts = useMemo(() => {
    const query = debouncedQuery.toLowerCase().trim();
    const queryTokens = query.split(/\s+/).filter(Boolean);

    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      if (!matchesCategory) return false;
      if (queryTokens.length === 0) return true;

      // Extract text content pool for deep keyword matching
      const titleLower = post.title.toLowerCase();
      const excerptLower = post.excerpt ? post.excerpt.toLowerCase() : "";
      const categoryLower = post.category ? post.category.toLowerCase() : "";
      const authorLower = post.author?.name ? post.author.name.toLowerCase() : "";
      const tagsJoined = post.tags ? post.tags.join(" ").toLowerCase() : "";
      const takeawaysJoined = post.keyTakeaways ? post.keyTakeaways.join(" ").toLowerCase() : "";
      const introJoined = post.intro ? post.intro.join(" ").toLowerCase() : "";

      const searchableText = `${titleLower} ${excerptLower} ${categoryLower} ${authorLower} ${tagsJoined} ${takeawaysJoined} ${introJoined}`;

      // All keyword tokens must be present somewhere in the article
      return queryTokens.every((token) => searchableText.includes(token));
    });
  }, [initialPosts, selectedCategory, debouncedQuery]);

  // Track search analytics when debounced query is active
  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      trackBlogSearch(debouncedQuery.trim(), filteredPosts.length);
    }
  }, [debouncedQuery, filteredPosts.length]);

  // Featured article on page 1 of All category without active search
  const isDefaultView = selectedCategory === "All" && !debouncedQuery;
  const featuredPost = useMemo(() => {
    if (!isDefaultView || currentPage !== 1) return null;
    return initialPosts.find((p) => p.featured) || initialPosts[0] || null;
  }, [initialPosts, isDefaultView, currentPage]);

  // Remaining posts for the grid
  const availableGridPosts = useMemo(() => {
    if (featuredPost && isDefaultView && currentPage === 1) {
      return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost, isDefaultView, currentPage]);

  // Pagination calculation
  const totalPages = Math.ceil(availableGridPosts.length / POSTS_PER_PAGE) || 1;
  const currentGridPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return availableGridPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [availableGridPosts, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const element = document.getElementById("blog-grid-top");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setDebouncedQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleResetAll = () => {
    setSearchInput("");
    setDebouncedQuery("");
    setSelectedCategory("All");
    setCurrentPage(1);
    updateUrlParams("All", "");
  };

  // Pagination numbers generator with ellipses
  const pageNumbers = useMemo(() => {
    const delta = 1;
    const range: (number | string)[] = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  }, [currentPage, totalPages]);

  return (
    <section className="relative w-full py-10 sm:py-14 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] overflow-hidden">
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
        <div className="mb-8 sm:mb-12 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input Box */}
            <div className="relative w-full md:max-w-md" role="search">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text/60" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    handleClearSearch();
                  }
                }}
                placeholder="Search articles by keyword, topic, or school..."
                aria-label="Search articles by keyword, topic, or school"
                className="w-full pl-11 pr-10 py-3 rounded-[5px] bg-white border border-brand-border text-sm text-brand-navy placeholder:text-brand-text/60 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue shadow-xs transition-all font-sans"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-brand-bg text-brand-text hover:text-brand-navy grid place-items-center transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Post Count Pill with aria-live */}
            <div
              className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-brand-navy/70 font-heading self-start md:self-auto"
              aria-live="polite"
            >
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" aria-hidden="true" />
              <span>
                Showing {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
                {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
              </span>
            </div>
          </div>

          {/* Category Tabs with horizontal scroll on mobile */}
          <div
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none"
            role="tablist"
            aria-label="Filter articles by category"
          >
            {BLOG_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-3.5 sm:px-4 py-2 rounded-[5px] text-xs sm:text-[13px] font-bold font-heading whitespace-nowrap transition-all duration-200 shadow-xs flex-shrink-0",
                    isSelected
                      ? "bg-brand-blue text-white shadow-sm scale-[1.02]"
                      : "bg-white text-brand-navy hover:text-brand-blue hover:bg-brand-sky/60 border border-brand-border/80"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Anchor for smooth scroll on pagination */}
        <div id="blog-grid-top" className="scroll-mt-24" />

        {/* Featured Post Card (Hero Banner on Page 1 Default) */}
        {featuredPost && (
          <div className="mb-10 sm:mb-14">
            <div className="group relative rounded-[5px] bg-white border border-brand-border overflow-hidden shadow-[0_12px_40px_rgba(10,61,107,0.08)] hover:shadow-[0_22px_54px_rgba(10,61,107,0.13)] transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Image side */}
                <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[340px] lg:min-h-[400px] overflow-hidden bg-brand-sky">
                  <BlogImageWithFallback
                    src={featuredPost.coverImage || getDefaultBlogImage(featuredPost.category, featuredPost.title)}
                    fallbackSrc={getDefaultBlogImage(featuredPost.category, featuredPost.title)}
                    alt={featuredPost.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-bold uppercase tracking-wider font-heading bg-white/95 text-brand-blue shadow-md backdrop-blur-sm border border-brand-border">
                      <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                      <span>Featured Post</span>
                    </span>
                  </div>
                </div>

                {/* Content side */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-[#fcfdfe] to-[#f4f9fd]">
                  <div>
                    {/* Category & Metadata */}
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold text-brand-text mb-3 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-[5px] font-bold uppercase tracking-wider font-heading bg-brand-sky text-brand-blue text-[10.5px]">
                        {featuredPost.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-sans">
                        <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                        {featuredPost.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-sans">
                        <Clock className="w-3.5 h-3.5 text-brand-blue" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl md:text-[28px] font-extrabold text-brand-navy font-heading leading-tight tracking-tight mb-3 group-hover:text-brand-blue transition-colors">
                      <Link
                        href={`/blogs/${featuredPost.slug}`}
                        onClick={() => {
                          if (debouncedQuery) {
                            trackSearchResultClick(featuredPost.slug, featuredPost.title, debouncedQuery);
                          }
                        }}
                      >
                        {featuredPost.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-brand-text font-sans mb-5 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    {/* Tags */}
                    {featuredPost.tags && featuredPost.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {featuredPost.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[5px] bg-white border border-brand-border text-[11px] font-medium text-brand-text"
                          >
                            <Tag className="w-2.5 h-2.5 text-brand-blue" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Author & Read More Button */}
                  <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-brand-sky border border-brand-blue/30 flex items-center justify-center">
                        {featuredPost.author?.avatar ? (
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        ) : (
                          <User className="w-4 h-4 text-brand-blue" />
                        )}
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-brand-navy font-heading leading-none">
                          {featuredPost.author?.name || "Dr. Amy Morgenstern"}
                        </span>
                        <span className="block text-[10.5px] text-brand-text/75 font-sans mt-0.5">
                          {featuredPost.author?.role || "Admissions Consultant"}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/blogs/${featuredPost.slug}`}
                      onClick={() => {
                        if (debouncedQuery) {
                          trackSearchResultClick(featuredPost.slug, featuredPost.title, debouncedQuery);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-[5px] bg-brand-blue text-white text-xs font-bold font-heading group-hover:bg-brand-navy transition-all duration-200 shadow-xs"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid or Empty State */}
        {availableGridPosts.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
              {currentGridPosts.map((post) => {
                const coverImage =
                  post.coverImage || getDefaultBlogImage(post.category, post.title);
                const fallbackImage = getDefaultBlogImage(post.category, post.title);

                return (
                  <article
                    key={post.slug}
                    className="group bg-white rounded-[5px] border border-brand-border hover:border-brand-blue/40 shadow-xs hover:shadow-[0_12px_32px_rgba(10,61,107,0.10)] transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    {/* Post Cover Image */}
                    <Link
                      href={`/blogs/${post.slug}`}
                      onClick={() => {
                        if (debouncedQuery) {
                          trackSearchResultClick(post.slug, post.title, debouncedQuery);
                        }
                      }}
                      className="relative block aspect-[16/10] overflow-hidden bg-brand-sky flex-shrink-0"
                    >
                      <BlogImageWithFallback
                        src={coverImage}
                        fallbackSrc={fallbackImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-0.5 rounded-[5px] text-[10px] font-bold uppercase tracking-wider font-heading bg-brand-sky text-brand-blue shadow-xs">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Meta: Date & Read Time */}
                        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-brand-text mb-2.5 font-sans">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-brand-blue" />
                            {post.publishedAt}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-brand-blue" />
                            {post.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading font-extrabold text-[17px] sm:text-[18px] text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug mb-2.5">
                          <Link
                            href={`/blogs/${post.slug}`}
                            onClick={() => {
                              if (debouncedQuery) {
                                trackSearchResultClick(post.slug, post.title, debouncedQuery);
                              }
                            }}
                          >
                            {post.title}
                          </Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-brand-text font-sans line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Author & Link footer */}
                      <div className="pt-3.5 border-t border-brand-border/70 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="relative w-6 h-6 rounded-full overflow-hidden bg-brand-sky flex-shrink-0 flex items-center justify-center">
                            {post.author?.avatar ? (
                              <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                fill
                                sizes="24px"
                                className="object-cover"
                              />
                            ) : (
                              <User className="w-3 h-3 text-brand-blue" />
                            )}
                          </div>
                          <span className="text-xs font-semibold text-brand-navy truncate">
                            {post.author?.name || "Dr. Amy Morgenstern"}
                          </span>
                        </div>

                        <Link
                          href={`/blogs/${post.slug}`}
                          onClick={() => {
                            if (debouncedQuery) {
                              trackSearchResultClick(post.slug, post.title, debouncedQuery);
                            }
                          }}
                          className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue group-hover:text-brand-navy font-heading flex-shrink-0"
                          aria-label={`Read article: ${post.title}`}
                        >
                          <span>Read</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-brand-border">
                <div className="text-xs sm:text-sm text-brand-text font-sans">
                  Showing{" "}
                  <span className="font-bold text-brand-navy">
                    {(currentPage - 1) * POSTS_PER_PAGE + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold text-brand-navy">
                    {Math.min(currentPage * POSTS_PER_PAGE, availableGridPosts.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-brand-navy">
                    {availableGridPosts.length}
                  </span>{" "}
                  articles
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-[5px] border border-brand-border bg-white text-xs sm:text-sm font-bold font-heading text-brand-navy hover:bg-brand-sky hover:text-brand-blue disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  {pageNumbers.map((page, idx) => {
                    if (page === "...") {
                      return (
                        <span
                          key={`ellipsis-${idx}`}
                          className="px-2 py-1 text-xs text-brand-text select-none"
                        >
                          …
                        </span>
                      );
                    }

                    const pageNum = page as number;
                    const isActive = pageNum === currentPage;

                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={cn(
                          "w-8 h-8 sm:w-9 sm:h-9 rounded-[5px] text-xs sm:text-sm font-bold font-heading transition-all",
                          isActive
                            ? "bg-brand-blue text-white shadow-sm"
                            : "bg-white text-brand-navy border border-brand-border hover:bg-brand-sky hover:text-brand-blue"
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-[5px] border border-brand-border bg-white text-xs sm:text-sm font-bold font-heading text-brand-navy hover:bg-brand-sky hover:text-brand-blue disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Responsive Empty Search & Filter State */
          <div className="text-center py-16 px-4 bg-white rounded-[5px] border border-brand-border shadow-xs max-w-2xl mx-auto my-6">
            <div className="w-14 h-14 rounded-full bg-brand-sky/80 text-brand-blue grid place-items-center mx-auto mb-4 border border-brand-blue/20">
              <FilterX className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-navy font-heading mb-2">
              No matching articles found
            </h3>
            <p className="text-sm text-brand-text max-w-md mx-auto mb-6 leading-relaxed">
              We couldn&apos;t find any articles
              {debouncedQuery ? (
                <> matching &ldquo;<span className="font-semibold text-brand-navy">{debouncedQuery}</span>&rdquo;</>
              ) : null}
              {selectedCategory !== "All" ? (
                <> in category &ldquo;<span className="font-semibold text-brand-navy">{selectedCategory}</span>&rdquo;</>
              ) : null}
              . Try checking your spelling, using more general search terms, or resetting your filters.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {debouncedQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="px-4 py-2 rounded-[5px] border border-brand-border bg-white text-brand-navy font-bold text-xs sm:text-sm font-heading hover:bg-brand-sky hover:text-brand-blue transition-all"
                >
                  Clear Search Query
                </button>
              )}
              <button
                type="button"
                onClick={handleResetAll}
                className="px-5 py-2.5 rounded-[5px] bg-brand-blue text-white font-bold text-xs sm:text-sm font-heading hover:bg-brand-navy transition-all shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
