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
} from "lucide-react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { CTA } from "@/components/sections/CTA";
import { BlogShareButtons } from "@/components/ui/BlogShareButtons";
import { BrandStar } from "@/components/ui/Icons";
import { getBlogPostBySlug, getRelatedPosts, BLOG_POSTS } from "@/lib/blogs-data";
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

  return {
    title: `${post.title} | Blue Stars Admissions Consulting`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Blue Stars Admissions Consulting`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);
  const isBlue = post.accent === "blue";

  return (
    <article className="w-full bg-white">
      {/* 1. Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[
          { label: "Blogs", href: "/blogs" },
          { label: post.category, href: "/blogs" },
          { label: post.title },
        ]}
        badge={post.category.toUpperCase()}
        title={post.title}
        description={post.excerpt}
      />

      {/* 2. Main Article Content Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Article Body (8 cols) */}
          <div className="lg:col-span-8">
            {/* Meta Row: Author, Date, Read Time & Social Share */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-brand-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand-sky text-brand-blue border border-brand-blue/30 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-bold text-sm sm:text-base text-brand-navy leading-tight">
                    {post.author.name}
                  </div>
                  <div className="text-xs text-brand-text font-sans">
                    {post.author.role}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-3 text-xs sm:text-[13px] text-brand-text">
                  <span className="flex items-center gap-1 font-sans">
                    <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                    {post.publishedAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-sans">
                    <Clock className="w-3.5 h-3.5 text-brand-blue" />
                    {post.readTime}
                  </span>
                </div>

                <BlogShareButtons title={post.title} />
              </div>
            </div>

            {/* Featured Hero Image */}
            <div className="relative w-full h-[280px] sm:h-[400px] md:h-[460px] rounded-[5px] overflow-hidden shadow-card border border-brand-border mb-10 bg-brand-sky">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 860px"
                className="object-cover"
              />
            </div>

            {/* Key Strategic Takeaways Box */}
            <div className="bg-gradient-to-r from-brand-sky/70 via-brand-bg/90 to-brand-sky/40 border border-brand-blue/30 rounded-[5px] p-6 sm:p-8 mb-10 shadow-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-[5px] bg-brand-blue text-white grid place-items-center flex-shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-heading text-brand-navy tracking-tight">
                  Key Strategic Takeaways
                </h2>
              </div>

              <ul className="space-y-3 font-sans">
                {post.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-[15px] text-brand-navy/90 font-medium leading-relaxed">
                      {takeaway}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Intro Lead Paragraphs */}
            <div className="space-y-5 mb-10">
              {post.intro.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base sm:text-[17px] leading-[28px] sm:leading-[30px] text-brand-navy/90 font-sans"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Article Main Sections */}
            <div className="space-y-12">
              {post.sections.map((section, idx) => {
                const sectionId = `section-${idx + 1}`;

                return (
                  <section key={idx} id={sectionId} className="scroll-mt-28">
                    {/* Section Heading matching services hierarchy */}
                    <h2 className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-brand-navy font-heading tracking-tight leading-snug mb-5 pb-3 border-b border-brand-border/70 flex items-center gap-3">
                      <span className="w-2 h-6 bg-brand-blue rounded-full flex-shrink-0" />
                      <span>{section.heading}</span>
                    </h2>

                    {/* Section Paragraphs */}
                    <div className="space-y-4 mb-5">
                      {section.paragraphs.map((p, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-[15.5px] sm:text-[16.5px] leading-[27px] sm:leading-[29px] text-brand-text font-sans"
                        >
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Section Bullets */}
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="my-5 space-y-2.5 bg-brand-bg/60 p-5 sm:p-6 rounded-xl border border-brand-border/60">
                        {section.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-brand-blue mt-2 flex-shrink-0" />
                            <span className="text-sm sm:text-[15px] leading-relaxed text-brand-navy/90 font-medium font-sans">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Section Callout Card */}
                    {section.callout && (
                      <div className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-brand-sky/60 via-brand-bg to-brand-sky/30 border-l-4 border-brand-blue shadow-xs">
                        <div className="flex items-start gap-3">
                          {section.callout.type === "quote" ? (
                            <Quote className="w-6 h-6 text-brand-blue flex-shrink-0 mt-1" />
                          ) : (
                            <Lightbulb className="w-6 h-6 text-brand-blue flex-shrink-0 mt-1" />
                          )}
                          <div>
                            {section.callout.title && (
                              <div className="font-heading font-bold text-sm sm:text-[15px] text-brand-navy mb-1.5 uppercase tracking-wider">
                                {section.callout.title}
                              </div>
                            )}
                            <p className="text-sm sm:text-[15px] leading-relaxed text-brand-navy/90 font-sans italic">
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

            {/* Conclusion & Actionable Steps */}
            <div className="mt-12 pt-8 border-t border-brand-border">
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight mb-4">
                Conclusion &amp; Strategic Next Steps
              </h2>
              <div className="space-y-4 mb-8">
                {post.conclusion.map((c, idx) => (
                  <p
                    key={idx}
                    className="text-[15.5px] sm:text-[16.5px] leading-[27px] sm:leading-[29px] text-brand-text font-sans"
                  >
                    {c}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-brand-border/60">
                <span className="text-xs font-bold text-brand-navy/70 uppercase tracking-wider font-heading mr-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-brand-blue" />
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold text-brand-navy bg-brand-bg hover:bg-brand-sky px-3 py-1 rounded-[5px] border border-brand-border/80 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom Social Share Bar */}
              <div className="pt-5 mt-4 border-t border-brand-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-brand-navy font-heading uppercase tracking-wider">
                  Enjoyed this article? Share it with family &amp; friends:
                </span>
                <BlogShareButtons title={post.title} />
              </div>
            </div>

            {/* Author Attribution Card */}
            <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-white border border-brand-border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12.5 h-12.5  rounded-[5px] bg-brand-sky text-brand-blue border-2 border-brand-blue/30 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <User className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-blue font-heading mb-0.5">
                    WRITTEN BY
                  </div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-brand-navy leading-tight">
                    {post.author.name}
                  </h3>
                  <div className="text-xs sm:text-[13px] font-medium text-brand-text font-sans">
                    {post.author.role}
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[5px] bg-brand-bg hover:bg-brand-sky text-brand-blue hover:text-brand-navy text-[14px] sm:text-[14.5px] font-bold font-heading transition-colors border border-brand-border flex-shrink-0 group self-start sm:self-auto"
              >
                <span>Learn more about our advisory team</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Back to Blog Listing button */}
            <div className="mt-10 flex items-center justify-between">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-brand-bg hover:bg-brand-sky text-brand-navy hover:text-brand-blue font-bold text-[14px] sm:text-[14.5px] font-heading border border-brand-border transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to All Blogs</span>
              </Link>
            </div>
          </div>

          {/* Sticky Right Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Table of Contents Card */}
            <div className="p-6 rounded-[5px] bg-white border border-brand-border shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-brand-border">
                <BookOpen className="w-4 h-4 text-brand-blue" />
                <h3 className="font-heading font-bold text-sm sm:text-[15px] uppercase tracking-wider text-brand-navy">
                  Table of Contents
                </h3>
              </div>

              <nav className="space-y-2 font-sans" aria-label="Table of contents">
                {post.sections.map((section, idx) => (
                  <a
                    key={idx}
                    href={`#section-${idx + 1}`}
                    className="block text-[14px] sm:text-[14.5px] text-brand-text hover:text-brand-blue hover:translate-x-1 transition-all py-1 leading-snug"
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>
            </div>

            {/* Free Consultation Card */}
            <div className="p-6 sm:p-7 rounded-[5px] bg-gradient-to-br from-[#073d63] via-[#094c79] to-[#0c5989] text-white shadow-card relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 grid place-items-center mb-4">
                  <BrandStar className="w-5 h-5 text-white fill-white" />
                </div>
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white mb-2 leading-tight">
                  Personalized Admissions Mentorship
                </h3>
                <p className="text-[14px] sm:text-[14.5px] text-[#d0e6f7] leading-relaxed mb-5 font-sans">
                  Ready to turn these insights into a tailored admissions strategy? Book your complimentary 30-minute consultation with Dr. Amy Morgenstern.
                </p>
                <Link
                  href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[5px] bg-white text-brand-navy hover:bg-brand-sky font-bold text-xs sm:text-[13.5px] font-heading shadow-md hover:shadow-lg transition-all"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Ambient Watermark */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 pointer-events-none select-none">
                <BrandStar className="w-full h-full fill-current" />
              </div>
            </div>

            {/* Related Articles Mini List */}
            {relatedPosts.length > 0 && (
              <div className="p-6 rounded-[5px] bg-white border border-brand-border shadow-xs">
                <h3 className="font-heading font-bold text-sm sm:text-[15px] uppercase tracking-wider text-brand-navy mb-4 pb-3 border-b border-brand-border">
                  Related Guides
                </h3>

                <div className="space-y-7">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blogs/${related.slug}`}
                      className="group/item flex items-start gap-3 transition-colors"
                    >
                      <div className="relative w-14 h-14 rounded-[5px] overflow-hidden flex-shrink-0 bg-brand-sky border border-brand-border/60">
                        <Image
                          src={related.coverImage}
                          alt={related.title}
                          fill
                          className="object-cover group-hover/item:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-bold text-brand-blue uppercase tracking-wider font-heading mb-0.5">
                          {related.category}
                        </div>
                        <h4 className="font-heading font-[550] text-base sm:text-[17px] text-brand-navy group-hover/item:text-brand-blue transition-colors line-clamp-2 leading-snug">
                          {related.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* 3. Related Articles Bottom Grid */}
      <section className="py-12 sm:py-16 bg-[#f8fbfe] border-t border-brand-border">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-blue font-heading mb-1">
                CONTINUE READING
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-heading tracking-tight">
                Related Admissions Articles
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {relatedPosts.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-xs border border-brand-border hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                <Link
                  href={`/blogs/${article.slug}`}
                  className="relative block w-full h-[180px] overflow-hidden bg-brand-sky"
                >
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-heading bg-brand-sky text-brand-blue">
                      {article.category}
                    </span>
                  </div>
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-brand-text mb-2 flex items-center gap-2">
                      <span>{article.publishedAt}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-heading font-bold text-[16px] text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug mb-2">
                      <Link href={`/blogs/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="text-xs text-brand-text line-clamp-2 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/blogs/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue group-hover:text-brand-navy transition-colors font-heading"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Consultation CTA */}
      <CTA />
    </article>
  );
}
