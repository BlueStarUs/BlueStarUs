import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Quote,
  Lightbulb,
  Tag,
  BookOpen,
  ArrowLeft,
  User,
  Compass,
  FileText,
} from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { BlogShareButtons } from "@/components/ui/BlogShareButtons";
import { BlogImageWithFallback } from "@/components/ui/BlogImageWithFallback";
import { BrandStar } from "@/components/ui/Icons";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import {
  getBlogPostBySlug,
  getRelatedPosts,
  getDefaultBlogImage,
  BLOG_POSTS,
} from "@/lib/blogs-data";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const canonicalUrl = `https://bluestars.us/blogs/${post.slug}`;
  const ogImage = post.coverImage || "/images/blogs/blogs1.png";
  const publishedIso = post.dateIso || new Date(post.publishedAt).toISOString();

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: publishedIso,
      modifiedTime: publishedIso,
      authors: [post.author?.name || "Dr. Amy Morgenstern"],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

interface TocItem {
  id: string;
  title: string;
}

function extractHeadingsFromHtml(html?: string): TocItem[] {
  if (!html) return [];
  const matches = [...html.matchAll(/<(h[23])[^>]*>(.*?)<\/\1>/gi)];
  return matches
    .map((m, idx) => {
      const cleanTitle = m[2].replace(/<[^>]*>/g, "").trim();
      return {
        id: `heading-${idx + 1}`,
        title: cleanTitle,
      };
    })
    .filter((h) => h.title.length > 3 && h.title.length < 120);
}

function injectHeadingIdsIntoHtml(html?: string): string {
  if (!html) return "";
  let idx = 0;
  return html.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, content) => {
    idx++;
    return `<${tag} id="heading-${idx}" class="scroll-mt-28" ${attrs}>${content}</${tag}>`;
  });
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);
  const headings: TocItem[] = post.sections && post.sections.length > 0
    ? post.sections.map((s, idx) => ({ id: `section-${idx + 1}`, title: s.heading }))
    : extractHeadingsFromHtml(post.contentHtml);

  const processedContentHtml = post.contentHtml
    ? injectHeadingIdsIntoHtml(post.contentHtml)
    : undefined;

  const fallbackImage = getDefaultBlogImage(post.category, post.title);
  const effectiveCoverImage = post.coverImage || fallbackImage;

  const breadcrumbsList = [
    { name: "Home", url: "/" },
    { name: "Blogs", url: "/blogs" },
    { name: post.category, url: `/blogs?category=${encodeURIComponent(post.category)}` },
    { name: post.title, url: `/blogs/${post.slug}` },
  ];

  return (
    <article className="w-full bg-white">
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={`https://bluestars.us/blogs/${post.slug}`}
        imageUrl={effectiveCoverImage}
        datePublished={post.dateIso || post.publishedAt}
        dateModified={post.dateIso || post.publishedAt}
        authorName={post.author?.name}
        authorRole={post.author?.role}
        category={post.category}
        wordCount={post.wordCount}
      />
      <BreadcrumbJsonLd items={breadcrumbsList} />

      {/* Main Article Content Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-9">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Main Article Body (8 cols) */}
          <div className="lg:col-span-8 min-w-0">
            {/* 1. Breadcrumbs Trail */}
            <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-brand-text mb-2.5 flex-wrap">
              <Link href="/" className="hover:text-brand-blue transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-brand-text/50 flex-shrink-0" />
              <Link href="/blogs" className="hover:text-brand-blue transition-colors">
                Blogs
              </Link>
              <ChevronRight className="w-3 h-3 text-brand-text/50 flex-shrink-0" />
              <Link
                href={`/blogs?category=${encodeURIComponent(post.category)}`}
                className="text-brand-blue font-semibold hover:underline truncate max-w-[220px] sm:max-w-none"
              >
                {post.category}
              </Link>
            </nav>

            {/* 2. Category Badge */}
            <div className="mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-[5px] text-[11px] font-bold uppercase tracking-wider font-heading bg-brand-sky text-brand-blue border border-brand-blue/20">
                {post.category}
              </span>
            </div>

            {/* 3. Article Title (Heading) */}
            <h1 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-extrabold text-brand-navy font-heading tracking-tight leading-tight sm:leading-[1.22] mb-3">
              {post.title}
            </h1>

            {/* 4. Article Subtitle / Excerpt (Clean, compact, no excessive space) */}
            {post.excerpt && (
              <p className="text-[15px] sm:text-base md:text-[17px] text-brand-text font-sans leading-relaxed mb-4 sm:mb-5">
                {post.excerpt}
              </p>
            )}

            {/* 5. Responsive Meta Bar: Author, Role, Date, Read Time & Social Share */}
            <div className="p-3.5 sm:p-4 rounded-[5px] bg-[#f8fbfe] border border-brand-border/80 mb-5 sm:mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                {/* Author Info + Date & Read Time */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-brand-sky text-brand-blue border border-brand-blue/30 flex items-center justify-center flex-shrink-0 shadow-xs">
                    {post.author?.avatar ? (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-heading font-bold text-sm sm:text-base text-brand-navy leading-tight truncate">
                      {post.author?.name || "Dr. Amy Morgenstern"}
                    </div>
                    <div className="text-xs text-brand-text font-sans truncate mb-0.5">
                      {post.author?.role || "Admissions Strategist"}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs text-brand-text/90 font-sans">
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3 text-brand-blue flex-shrink-0" />
                        {post.publishedAt}
                      </span>
                      <span className="text-brand-border">•</span>
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-brand-blue flex-shrink-0" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Share Group */}
                <div className="pt-2.5 md:pt-0 border-t md:border-t-0 border-brand-border/60 flex items-center justify-between md:justify-end gap-2 flex-wrap">
                  <BlogShareButtons title={post.title} />
                </div>
              </div>
            </div>

            {/* 6. Featured Hero Image (with fallback) */}
            {effectiveCoverImage && (
              <div className="relative w-full h-[220px] sm:h-[320px] md:h-[380px] rounded-[5px] overflow-hidden shadow-card border border-brand-border mb-6 bg-brand-sky">
                <BlogImageWithFallback
                  src={effectiveCoverImage}
                  fallbackSrc={fallbackImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 860px"
                  className="object-cover"
                />
              </div>
            )}

            {/* 7. Key Strategic Takeaways Box (if present) */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="bg-gradient-to-r from-brand-sky/70 via-brand-bg/90 to-brand-sky/40 border border-brand-blue/30 rounded-[5px] p-4 sm:p-5 mb-6 shadow-xs">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-6 h-6 rounded-[5px] bg-brand-blue text-white grid place-items-center flex-shrink-0 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="text-sm sm:text-base font-bold font-heading text-brand-navy tracking-tight">
                    Key Strategic Takeaways
                  </h2>
                </div>

                <ul className="space-y-2 font-sans">
                  {post.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span className="text-[13px] sm:text-[14px] text-brand-navy/90 font-medium leading-relaxed">
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 8. Rich Article Body Content (Clean, tight spacing) */}
            {processedContentHtml ? (
              <div
                className="blog-content prose max-w-none text-brand-text font-sans text-[15px] sm:text-[16px] leading-[1.7] sm:leading-[1.75]
                  prose-headings:font-heading prose-headings:text-brand-navy prose-headings:font-extrabold prose-headings:tracking-tight
                  prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-2.5 prose-h2:border-b prose-h2:border-brand-border/70 prose-h2:pb-2
                  prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-5 prose-h3:mb-2 prose-h3:text-brand-navy
                  prose-h4:text-base sm:prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-1.5
                  prose-p:mt-0 prose-p:mb-3.5
                  prose-strong:text-brand-navy prose-strong:font-bold
                  prose-b:text-brand-navy prose-b:font-bold
                  prose-a:text-brand-blue prose-a:font-semibold hover:prose-a:underline
                  prose-ul:my-2.5 prose-ul:space-y-1.5 prose-ul:list-disc prose-ul:pl-5
                  prose-ol:my-2.5 prose-ol:space-y-1.5 prose-ol:list-decimal prose-ol:pl-5
                  prose-li:text-brand-text prose-li:my-0.5
                  prose-blockquote:my-4 prose-blockquote:border-l-4 prose-blockquote:border-brand-blue prose-blockquote:bg-brand-sky/40 prose-blockquote:py-2.5 prose-blockquote:px-4 prose-blockquote:rounded-r-[5px] prose-blockquote:italic prose-blockquote:text-brand-navy
                  prose-img:rounded-[5px] prose-img:shadow-sm prose-img:my-4 prose-img:w-full prose-img:h-auto
                  [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-[5px] [&_iframe]:my-4 [&_iframe]:shadow-sm"
                dangerouslySetInnerHTML={{ __html: processedContentHtml }}
              />
            ) : (
              <div>
                {/* Fallback Intro Paragraphs */}
                {post.intro && (
                  <div className="space-y-3.5 mb-6">
                    {post.intro.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-[15px] sm:text-[16px] leading-[26px] sm:leading-[28px] text-brand-navy/90 font-sans"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {/* Structured Sections Fallback */}
                {post.sections && (
                  <div className="space-y-6">
                    {post.sections.map((section, idx) => {
                      const sectionId = `section-${idx + 1}`;

                      return (
                        <section key={idx} id={sectionId} className="scroll-mt-28">
                          <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight leading-snug mb-3 pb-1.5 border-b border-brand-border/70 flex items-center gap-2.5">
                            <span className="w-2 h-5 bg-brand-blue rounded-full flex-shrink-0" />
                            <span>{section.heading}</span>
                          </h2>

                          <div className="space-y-3 mb-3">
                            {section.paragraphs.map((p, pIdx) => (
                              <p
                                key={pIdx}
                                className="text-[15px] sm:text-[16px] leading-[26px] sm:leading-[28px] text-brand-text font-sans"
                              >
                                {p}
                              </p>
                            ))}
                          </div>

                          {section.bullets && section.bullets.length > 0 && (
                            <ul className="my-3 space-y-1.5 bg-brand-bg/60 p-4 rounded-[5px] border border-brand-border/60">
                              {section.bullets.map((bullet, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2.5">
                                  <span className="w-2 h-2 rounded-full bg-brand-blue mt-2 flex-shrink-0" />
                                  <span className="text-sm leading-relaxed text-brand-navy/90 font-medium font-sans">
                                    {bullet}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {section.callout && (
                            <div className="my-4 p-4 rounded-[5px] bg-gradient-to-r from-brand-sky/60 via-brand-bg to-brand-sky/30 border-l-4 border-brand-blue shadow-xs">
                              <div className="flex items-start gap-3">
                                {section.callout.type === "quote" ? (
                                  <Quote className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                                ) : (
                                  <Lightbulb className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                                )}
                                <div>
                                  {section.callout.title && (
                                    <div className="font-heading font-bold text-xs sm:text-sm text-brand-navy mb-1 uppercase tracking-wider">
                                      {section.callout.title}
                                    </div>
                                  )}
                                  <p className="text-xs sm:text-sm leading-relaxed text-brand-navy/90 font-sans italic">
                                    {section.callout.text}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </section>
                      );
                    })}
                  </div>
                )}

                {/* Conclusion Fallback */}
                {post.conclusion && (
                  <div className="mt-8 pt-5 border-t border-brand-border">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight mb-2.5">
                      Conclusion &amp; Strategic Next Steps
                    </h2>
                    <div className="space-y-2.5 mb-5">
                      {post.conclusion.map((c, idx) => (
                        <p
                          key={idx}
                          className="text-[15px] sm:text-[16px] leading-[26px] sm:leading-[28px] text-brand-text font-sans"
                        >
                          {c}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tags & Bottom Social Share */}
            <div className="mt-8 pt-5 border-t border-brand-border">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mb-5">
                  <span className="text-xs font-bold text-brand-navy/70 uppercase tracking-wider font-heading mr-1 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-brand-blue" />
                    Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold text-brand-navy bg-brand-bg hover:bg-brand-sky px-2.5 py-1 rounded-[5px] border border-brand-border/80 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Bottom Social Share Bar */}
              <div className="pt-3 border-t border-brand-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-brand-navy font-heading uppercase tracking-wider">
                  Enjoyed this article? Share it with family &amp; friends:
                </span>
                <BlogShareButtons title={post.title} />
              </div>
            </div>

            {/* Author Attribution Card */}
            <div className="mt-8 p-4 sm:p-5 rounded-[5px] bg-[#f8fbfe] border border-brand-border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative w-12 h-12 rounded-[5px] overflow-hidden bg-brand-sky text-brand-blue border border-brand-blue/30 flex items-center justify-center flex-shrink-0 shadow-xs">
                  {post.author?.avatar ? (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-brand-blue font-heading mb-0.5">
                    WRITTEN BY
                  </div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-brand-navy leading-tight">
                    {post.author?.name || "Dr. Amy Morgenstern"}
                  </h3>
                  <div className="text-xs sm:text-[13px] font-medium text-brand-text font-sans">
                    {post.author?.role || "Founder & Principal Consultant"}
                  </div>
                </div>
              </div>

              <Link
                href="/about#team"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[5px] bg-white hover:bg-brand-sky text-brand-blue hover:text-brand-navy text-xs sm:text-sm font-bold font-heading transition-colors border border-brand-border flex-shrink-0 group self-start sm:self-auto"
              >
                <span>Meet Our Team</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Back to Blog Listing button */}
            <div className="mt-6 flex items-center justify-between">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[5px] bg-brand-bg hover:bg-brand-sky text-brand-navy hover:text-brand-blue font-bold text-xs sm:text-sm font-heading border border-brand-border transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to All Blogs</span>
              </Link>
            </div>
          </div>

          {/* Sticky Right Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Table of Contents Card (if headings exist) */}
            {headings.length > 0 && (
              <div className="p-5 sm:p-6 rounded-[5px] bg-white border border-brand-border shadow-xs">
                <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-brand-border">
                  <BookOpen className="w-4 h-4 text-brand-blue" />
                  <h3 className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-brand-navy">
                    Table of Contents
                  </h3>
                </div>

                <nav className="space-y-1.5 font-sans" aria-label="Table of contents">
                  {headings.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-xs sm:text-[13.5px] text-brand-text hover:text-brand-blue hover:translate-x-0.5 transition-all py-1 leading-snug line-clamp-1"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Free Consultation Booking Card (Direct HubSpot Meeting) */}
            <div className="p-6 rounded-[5px] bg-gradient-to-br from-[#073d63] via-[#094c79] to-[#0c5989] text-white shadow-card relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-9 h-9 rounded-[5px] bg-white/10 backdrop-blur-md border border-white/20 grid place-items-center mb-3.5">
                  <BrandStar className="w-4.5 h-4.5 text-white fill-white" />
                </div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-white mb-2 leading-tight">
                  Ready to Plan Your Student&apos;s Admissions Journey?
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-[#cbe5fb] font-sans mb-4">
                  Schedule a complimentary 30-minute discovery consultation with Dr. Amy Morgenstern and our senior counseling team.
                </p>
                <a
                  href="https://meetings.hubspot.com/dr-amy-morgenstern/discovery-session"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[5px] bg-white hover:bg-[#f0f7fe] text-brand-navy font-bold text-xs sm:text-sm font-heading shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-navy" />
                </a>
              </div>
            </div>

            {/* Free Workbook Lead Magnet Card */}
            <div className="p-5 sm:p-6 rounded-[5px] bg-white border border-brand-border shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-brand-blue font-bold text-xs uppercase tracking-wider font-heading">
                <FileText className="w-4 h-4" />
                <span>Free Downloadable Toolkit</span>
              </div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-brand-navy mb-2 leading-snug">
                College Planning Foundations Workbook (PDF)
              </h4>
              <p className="text-xs text-brand-text font-sans leading-relaxed mb-4">
                Essential self-reflection exercises, 4-year high school milestones, and extracurricular spike planner.
              </p>
              <Link
                href="/free-workbook"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[5px] bg-brand-sky hover:bg-brand-blue text-brand-blue hover:text-white font-bold text-xs font-heading transition-colors"
              >
                <span>Download Free Workbook</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Article Overview */}
            <div className="p-5 rounded-[5px] bg-[#f8fbfe] border border-brand-border/70 space-y-2.5 text-xs text-brand-text font-sans">
              <div className="flex justify-between py-1 border-b border-brand-border/40">
                <span className="font-semibold text-brand-navy">Category:</span>
                <span className="font-medium text-brand-blue">{post.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-border/40">
                <span className="font-semibold text-brand-navy">Published:</span>
                <span>{post.publishedAt}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-border/40">
                <span className="font-semibold text-brand-navy">Reading Time:</span>
                <span>{post.readTime}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-brand-navy">Author:</span>
                <span className="text-right truncate max-w-[140px]">{post.author?.name}</span>
              </div>
            </div>
          </aside>
        </div>

        {/* 3. Bottom Related Articles Grid */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-brand-border">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-[2px] bg-brand-blue rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue font-heading">
                    EXPLORE MORE
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
                  Related Admissions Insights
                </h2>
              </div>

              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-blue hover:text-brand-navy font-heading group"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => {
                const relatedFallback = getDefaultBlogImage(related.category, related.title);
                const relatedCover = related.coverImage || relatedFallback;

                return (
                  <article
                    key={related.slug}
                    className="bg-white rounded-[5px] overflow-hidden shadow-xs hover:shadow-card border border-brand-border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
                  >
                    <div>
                      <Link
                        href={`/blogs/${related.slug}`}
                        className="relative block w-full h-[170px] overflow-hidden bg-brand-sky"
                      >
                        <BlogImageWithFallback
                          src={relatedCover}
                          fallbackSrc={relatedFallback}
                          alt={related.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2 py-0.5 rounded-[5px] text-[10px] font-bold uppercase tracking-wider font-heading bg-brand-sky text-brand-blue shadow-xs">
                            {related.category}
                          </span>
                        </div>
                      </Link>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[11px] text-brand-text mb-2 font-sans">
                        <span>{related.publishedAt}</span>
                        <span>•</span>
                        <span>{related.readTime}</span>
                      </div>

                      <h3 className="font-heading font-bold text-[16px] text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug mb-2">
                        <Link href={`/blogs/${related.slug}`}>{related.title}</Link>
                      </h3>

                      <p className="text-xs text-brand-text font-sans line-clamp-2 leading-relaxed">
                        {related.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={`/blogs/${related.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue group-hover:text-brand-navy font-heading"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Consultation CTA */}
      <CTA />
    </article>
  );
}
