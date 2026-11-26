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
import { HUBSPOT_CONSULTATION_URL } from "@/lib/constants";
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

function processBlogContentHtml(html?: string): string {
  if (!html) return "";

  let cleaned = html;

  // 1. Clean nested double <p><p> and empty paragraphs that create huge gaps
  cleaned = cleaned.replace(/<p>\s*<p>/gi, "<p>");
  cleaned = cleaned.replace(/<\/p>\s*<\/p>/gi, "</p>");
  cleaned = cleaned.replace(/<p>\s*(?:&nbsp;|<br\s*\/?>)?\s*<\/p>/gi, "");

  // 2. Clean and repair <img> tags: strip dummy transparent SVGs and link real/local images
  cleaned = cleaned.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
    const getAttr = (name: string) => {
      const m = attrs.match(new RegExp(`${name}=["']([^"']*)["']`, "i"));
      return m ? m[1] : null;
    };

    let src = getAttr("src");
    const dataOrigSrc = getAttr("data-orig-src");
    const dataSrc = getAttr("data-src");
    const dataSrcset = getAttr("data-srcset");
    const alt = getAttr("alt") || "";
    const width = getAttr("width");
    const height = getAttr("height");
    const id = getAttr("id");
    const ariaDescribedby = getAttr("aria-describedby");

    // If src is a transparent data SVG or empty, recover the real image URL
    if (!src || src.startsWith("data:image/svg+xml") || src.startsWith("data:")) {
      if (dataOrigSrc && !dataOrigSrc.startsWith("data:")) {
        src = dataOrigSrc;
      } else if (dataSrc && !dataSrc.startsWith("data:")) {
        src = dataSrc;
      } else if (dataSrcset && !dataSrcset.startsWith("data:")) {
        const first = dataSrcset.split(",")[0].trim().split(" ")[0];
        if (first && !first.startsWith("data:")) src = first;
      }
    }

    // Map known team member images to sharp local assets
    if (src) {
      if (src.includes("Helen-Ingerson")) {
        src = "/images/teams/Helen-Ingerson-Upscaled.png";
      } else if (src.includes("Dr-M-Upscaled") || src.includes("Dr-Amy-Morgenstern")) {
        src = "/images/teams/Dr_Amy_Morgenstern.png";
      } else if (src.includes("Samuel-Ori") || src.includes("Samuel-Ortiz")) {
        src = "/images/teams/Samuel-Ortiz.png";
      } else if (src.includes("Wai-Cheng")) {
        src = "/images/teams/Wai-Cheng-Headshot.webp";
      }
    }

    const existingClass = getAttr("class");
    let imgClass = "blog-inline-img rounded-[5px] mx-auto my-3 object-contain max-h-[460px] shadow-xs";
    if (existingClass) {
      if (existingClass.includes("rounded-full")) {
        imgClass = existingClass;
      } else if (existingClass.includes("w-full") || existingClass.includes("object-cover")) {
        imgClass = existingClass;
      }
    }

    let newImg = `<img src="${src || "/images/blogs/blogs1.png"}" alt="${alt.replace(/"/g, "&quot;")}" loading="lazy" decoding="async"`;
    if (width) newImg += ` width="${width}"`;
    if (height) newImg += ` height="${height}"`;
    if (id) newImg += ` id="${id}"`;
    if (ariaDescribedby) newImg += ` aria-describedby="${ariaDescribedby}"`;
    newImg += ` class="${imgClass}"`;
    newImg += ` onerror="this.onerror=null; this.src='/images/blogs/blogs1.png';"`;
    newImg += ` />`;

    return newImg;
  });

  // 3. Format side figures with matching captions: float neatly to the side
  cleaned = cleaned.replace(
    /(<img\b[^>]*aria-describedby="([^"]+)"[^>]*>)\s*(<p\b[^>]*id="\2"[^>]*>([\s\S]*?)<\/p>)/gi,
    (match, imgTag, captionId, pTag, captionText) => {
      const srcMatch = imgTag.match(/src="([^"]+)"/i);
      const altMatch = imgTag.match(/alt="([^"]+)"/i);
      const src = srcMatch ? srcMatch[1] : "/images/blogs/blogs1.png";
      const alt = altMatch ? altMatch[1] : "";

      return `<figure class="blog-side-figure float-none sm:float-right sm:ml-5 mb-3.5 max-w-[175px] sm:max-w-[210px] mx-auto text-center clear-right">
  <img src="${src}" alt="${alt}" class="w-full h-auto rounded-[6px] shadow-xs object-cover border border-brand-border/70" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='/images/blogs/blogs1.png';" />
  <figcaption class="text-xs sm:text-[13px] text-brand-text/75 italic mt-1.5 leading-snug">${captionText}</figcaption>
</figure>`;
    }
  );

  // 4. Format interview & Q&A turns: colored line on the left (in 1 line), small avatar on side, responsive text
  cleaned = cleaned.replace(
    /(<img\b[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>)\s*(<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>)/gi,
    (match, imgTag, src, alt, bqTag, bqContent) => {
      const lowerAlt = alt.toLowerCase();
      const lowerContent = bqContent.toLowerCase();

      let borderColor = "border-brand-ink";
      let bgColor = "bg-brand-sky/25";
      let imgBorder = "border-brand-blue/30";
      let speakerHighlight = "text-brand-blue";

      if (lowerAlt.includes("amy") || lowerAlt.includes("morgenstern") || lowerContent.includes("drm:") || lowerContent.includes("dr. m:")) {
        borderColor = "border-brand-ink";
        bgColor = "bg-brand-sky/25";
        imgBorder = "border-brand-blue/30";
        speakerHighlight = "text-brand-blue";
      } else if (lowerAlt.includes("helen") || lowerContent.includes("helen:")) {
        borderColor = "border-emerald-500";
        bgColor = "bg-emerald-50/30";
        imgBorder = "border-emerald-500/30";
        speakerHighlight = "text-emerald-700";
      } else if (lowerAlt.includes("samuel") || lowerContent.includes("samuel:")) {
        borderColor = "border-indigo-500";
        bgColor = "bg-indigo-50/30";
        imgBorder = "border-indigo-500/30";
        speakerHighlight = "text-indigo-700";
      } else if (lowerAlt.includes("wai") || lowerContent.includes("wai:")) {
        borderColor = "border-amber-500";
        bgColor = "bg-amber-50/30";
        imgBorder = "border-amber-500/30";
        speakerHighlight = "text-amber-700";
      } else {
        borderColor = "border-slate-300";
        bgColor = "bg-slate-50/50";
        imgBorder = "border-slate-300";
        speakerHighlight = "text-brand-navy";
      }

      let cleanedText = bqContent.trim();
      cleanedText = cleanedText.replace(/<strong>\s*(Dr\.?\s*M:?|DrM:?)\s*<\/strong>/gi, `<strong class="${speakerHighlight} font-bold">DrM: </strong>`);
      cleanedText = cleanedText.replace(/<strong>\s*(Helen:?)\s*<\/strong>/gi, `<strong class="${speakerHighlight} font-bold">Helen: </strong>`);
      cleanedText = cleanedText.replace(/<strong>\s*(Samuel:?)\s*<\/strong>/gi, `<strong class="${speakerHighlight} font-bold">Samuel: </strong>`);
      cleanedText = cleanedText.replace(/<strong>\s*(Wai:?)\s*<\/strong>/gi, `<strong class="${speakerHighlight} font-bold">Wai: </strong>`);

      return `<div class="blog-speaker-row border-l-4 ${borderColor} ${bgColor} rounded-r-lg p-2.5 sm:p-3.5 my-3 sm:my-3.5 clear-both">
  <div class="flex items-start gap-2.5 sm:gap-3">
    <img src="${src}" alt="${alt.replace(/"/g, '&quot;')}" class="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shrink-0 border ${imgBorder} shadow-2xs mt-0.5" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='/images/blogs/blogs1.png';" />
    <div class="flex-1 min-w-0 blog-speaker-text text-[15px] sm:text-[16px] text-brand-navy leading-relaxed">
      ${cleanedText}
    </div>
  </div>
</div>`;
    }
  );

  // 4b. Also normalize any existing legacy speaker row structures into the new unified format
  cleaned = cleaned.replace(
    /<div class="blog-speaker-row flex items-start[^"]*">([\s\S]*?)<\/blockquote>\s*<\/div>\s*<\/div>/gi,
    (match, inner) => {
      const imgMatch = inner.match(/<img\b([^>]*)>/i);
      const bqMatch = inner.match(/<blockquote\b[^>]*>([\s\S]*?)$/i);
      const imgAttrs = imgMatch ? imgMatch[1] : "";
      let bqContent = bqMatch ? bqMatch[1] : "";

      const srcMatch = imgAttrs.match(/src="([^"]*)"/i);
      const altMatch = imgAttrs.match(/alt="([^"]*)"/i);
      const src = srcMatch ? srcMatch[1] : "/images/blogs/blogs1.png";
      const alt = altMatch ? altMatch[1] : "";

      const lowerAlt = alt.toLowerCase();
      const lowerContent = bqContent.toLowerCase();

      let borderColor = "border-brand-ink";
      let bgColor = "bg-brand-sky/25";
      let imgBorder = "border-brand-blue/30";
      let speakerHighlight = "text-brand-blue";

      if (lowerAlt.includes("amy") || lowerAlt.includes("morgenstern") || lowerContent.includes("drm:") || lowerContent.includes("dr. m:")) {
        borderColor = "border-brand-ink";
        bgColor = "bg-brand-sky/25";
        imgBorder = "border-brand-blue/30";
        speakerHighlight = "text-brand-blue";
      } else if (lowerAlt.includes("helen") || lowerContent.includes("helen:")) {
        borderColor = "border-emerald-500";
        bgColor = "bg-emerald-50/30";
        imgBorder = "border-emerald-500/30";
        speakerHighlight = "text-emerald-700";
      } else if (lowerAlt.includes("samuel") || lowerContent.includes("samuel:")) {
        borderColor = "border-indigo-500";
        bgColor = "bg-indigo-50/30";
        imgBorder = "border-indigo-500/30";
        speakerHighlight = "text-indigo-700";
      } else if (lowerAlt.includes("wai") || lowerContent.includes("wai:")) {
        borderColor = "border-amber-500";
        bgColor = "bg-amber-50/30";
        imgBorder = "border-amber-500/30";
        speakerHighlight = "text-amber-700";
      } else {
        borderColor = "border-slate-300";
        bgColor = "bg-slate-50/50";
        imgBorder = "border-slate-300";
        speakerHighlight = "text-brand-navy";
      }

      let cleanedText = bqContent.trim();
      cleanedText = cleanedText.replace(/<strong>\s*(Dr\.?\s*M:?|DrM:?)\s*<\/strong>/gi, `<strong class="${speakerHighlight} font-bold">DrM: </strong>`);
      cleanedText = cleanedText.replace(/<strong>\s*(Helen:?)\s*<\/strong>/gi, `<strong class="${speakerHighlight} font-bold">Helen: </strong>`);
      cleanedText = cleanedText.replace(/<strong>\s*(Samuel:?)\s*<\/strong>/gi, `<strong class="${speakerHighlight} font-bold">Samuel: </strong>`);
      cleanedText = cleanedText.replace(/<strong>\s*(Wai:?)\s*<\/strong>/gi, `<strong class="${speakerHighlight} font-bold">Wai: </strong>`);

      return `<div class="blog-speaker-row border-l-4 ${borderColor} ${bgColor} rounded-r-lg p-2.5 sm:p-3.5 my-3 sm:my-3.5 clear-both">
  <div class="flex items-start gap-2.5 sm:gap-3">
    <img src="${src}" alt="${alt.replace(/"/g, '&quot;')}" class="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shrink-0 border ${imgBorder} shadow-2xs mt-0.5" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='/images/blogs/blogs1.png';" />
    <div class="flex-1 min-w-0 blog-speaker-text text-[15px] sm:text-[16px] text-brand-navy leading-relaxed">
      ${cleanedText}
    </div>
  </div>
</div>`;
    }
  );

  // 4c. Convert legacy accordion WordPress markups (h2 followed by 512px plus SVG) into accessible <details class="blog-accordion"> cards
  if (cleaned.includes("Capa_1") || cleaned.includes("512 512") || cleaned.includes('viewBox="0 0 512 512"')) {
    const headerRegex = /<h2\b[^>]*>([\s\S]*?)<\/h2>\s*<svg[\s\S]*?<\/svg>/gi;
    const matches = [...cleaned.matchAll(headerRegex)];

    if (matches.length > 0) {
      let result = cleaned;
      interface AccordionSlice {
        start: number;
        end: number;
        replacement: string;
      }
      const slices: AccordionSlice[] = [];

      for (let i = 0; i < matches.length; i++) {
        const curMatch = matches[i];
        const headingText = curMatch[1].trim();
        const startIndex = curMatch.index;
        const headerEndIndex = startIndex + curMatch[0].length;

        let endIndex: number;
        if (i < matches.length - 1) {
          endIndex = matches[i + 1].index;
        } else {
          const remainder = cleaned.substring(headerEndIndex);
          const nextSectionMatch = remainder.match(/<(h[34]|footer)\b/i);
          if (nextSectionMatch && nextSectionMatch.index !== undefined) {
            endIndex = headerEndIndex + nextSectionMatch.index;
          } else {
            endIndex = cleaned.length;
          }
        }

        const bodyContent = cleaned.substring(headerEndIndex, endIndex).trim();
        const isOpen = i === 0 ? " open" : "";

        const accordionHtml = `<details class="blog-accordion group my-4 rounded-xl border border-brand-border bg-white shadow-2xs overflow-hidden transition-all duration-200"${isOpen}>
  <summary class="flex items-center justify-between gap-4 p-4 sm:p-5 cursor-pointer select-none bg-brand-sky/25 hover:bg-brand-sky/45 transition-colors list-none">
    <h3 class="font-heading font-bold text-[16px] sm:text-[18px] text-brand-navy group-hover:text-brand-blue transition-colors flex-1 pr-2 m-0!">
      ${headingText}
    </h3>
    <span class="shrink-0 w-8 h-8 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-blue shadow-2xs transition-transform duration-300 group-open:rotate-45">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
    </span>
  </summary>
  <div class="blog-accordion-body p-4 sm:p-6 border-t border-brand-border/60 text-brand-text leading-relaxed font-sans space-y-3 sm:space-y-4">
    ${bodyContent}
  </div>
</details>`;

        slices.push({
          start: startIndex,
          end: endIndex,
          replacement: accordionHtml,
        });
      }

      for (let i = slices.length - 1; i >= 0; i--) {
        const s = slices[i];
        result = result.substring(0, s.start) + s.replacement + result.substring(s.end);
      }
      cleaned = result;
    }
  }

  // 5. Inject heading IDs for the TOC
  let idx = 0;
  cleaned = cleaned.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, content) => {
    idx++;
    return `<${tag} id="heading-${idx}" class="scroll-mt-28" ${attrs}>${content}</${tag}>`;
  });

  return cleaned;
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const processedContentHtml = post.contentHtml
    ? processBlogContentHtml(post.contentHtml)
    : undefined;

  const relatedPosts = getRelatedPosts(post.slug, 3);
  const headings: TocItem[] = post.sections && post.sections.length > 0
    ? post.sections.map((s, idx) => ({ id: `section-${idx + 1}`, title: s.heading }))
    : extractHeadingsFromHtml(processedContentHtml || post.contentHtml);

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
            <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs sm:text-sm text-brand-text mb-3 flex-wrap">
              <Link href="/" className="hover:text-brand-blue transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-brand-text/50 flex-shrink-0" />
              <Link href="/blogs" className="hover:text-brand-blue transition-colors">
                Blogs
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-brand-text/50 flex-shrink-0" />
              <Link
                href={`/blogs?category=${encodeURIComponent(post.category)}`}
                className="text-brand-blue font-semibold hover:underline truncate max-w-[240px] sm:max-w-none"
              >
                {post.category}
              </Link>
            </nav>

            {/* 2. Category Badge */}
            <div className="mb-2.5">
              <span className="inline-flex items-center px-3 py-1 rounded-[5px] text-xs sm:text-[13px] font-bold uppercase tracking-wider font-heading bg-brand-sky text-brand-blue border border-brand-blue/20 shadow-2xs">
                {post.category}
              </span>
            </div>

            {/* 3. Article Title (Heading) */}
            <h1 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-extrabold text-brand-navy font-heading tracking-tight leading-tight sm:leading-[1.22] mb-3.5">
              {post.title}
            </h1>

            {/* 4. Article Subtitle / Excerpt (Clean, compact, readable typography) */}
            {post.excerpt && (
              <p className="text-base sm:text-[17px] md:text-lg text-brand-navy/85 font-sans leading-relaxed mb-5">
                {post.excerpt}
              </p>
            )}

            {/* 5. Responsive Meta Bar: Author, Role, Date, Read Time & Social Share */}
            <div className="p-3.5 sm:p-4 rounded-[5px] bg-[#f5f1ea] border border-brand-border/80 mb-5 sm:mb-6 shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                {/* Author Info + Date & Read Time */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-brand-sky text-brand-blue border border-brand-blue/30 flex items-center justify-center flex-shrink-0 shadow-xs">
                    {post.author?.avatar ? (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        sizes="48px"
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
                    <div className="text-xs sm:text-sm text-brand-text font-sans truncate mb-0.5">
                      {post.author?.role || "Admissions Strategist"}
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-brand-text/90 font-sans">
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                        {post.publishedAt}
                      </span>
                      <span className="text-brand-border">•</span>
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
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
              <div className="relative w-full h-[220px] sm:h-[320px] md:h-[380px] lg:h-[420px] rounded-[5px] overflow-hidden shadow-card border border-brand-border mb-6 bg-brand-sky">
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
                  <div className="w-6 h-6 rounded-[5px] bg-brand-ink text-white grid place-items-center flex-shrink-0 shadow-xs">
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
                      <span className="text-sm sm:text-base text-brand-navy/90 font-medium leading-relaxed">
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 8. Rich Article Body Content (Optimized typography, tight spacing, contained images) */}
            {processedContentHtml ? (
              <div
                className="blog-content prose max-w-none text-brand-text font-sans text-[16px] sm:text-[17px] leading-[1.75] sm:leading-[1.8]
                  prose-headings:font-heading prose-headings:text-brand-blue prose-headings:font-extrabold prose-headings:tracking-tight
                  prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-[26px] prose-h2:mt-7 sm:prose-h2:mt-9 prose-h2:mb-3 prose-h2:border-b prose-h2:border-brand-border/70 prose-h2:pb-2 prose-h2:text-brand-blue
                  prose-h3:text-lg sm:prose-h3:text-xl md:prose-h3:text-[22px] prose-h3:mt-6 sm:prose-h3:mt-7 prose-h3:mb-2.5 prose-h3:text-brand-blue
                  prose-h4:text-base sm:prose-h4:text-lg md:prose-h4:text-[19px] prose-h4:mt-4 sm:prose-h4:mt-5 prose-h4:mb-2 prose-h4:text-brand-blue
                  prose-p:mt-0 prose-p:mb-3.5 sm:prose-p:mb-4
                  prose-strong:text-brand-navy prose-strong:font-bold
                  prose-b:text-brand-navy prose-b:font-bold
                  prose-a:text-brand-blue prose-a:font-semibold hover:prose-a:underline
                  prose-ul:my-2.5 prose-ul:space-y-1.5 prose-ul:list-disc prose-ul:pl-5
                  prose-ol:my-2.5 prose-ol:space-y-1.5 prose-ol:list-decimal prose-ol:pl-5
                  prose-li:text-brand-text prose-li:my-0.5 prose-li:text-[15px] sm:prose-li:text-[16px]
                  prose-blockquote:my-4 prose-blockquote:border-l-4 prose-blockquote:border-brand-ink prose-blockquote:bg-brand-sky/40 prose-blockquote:py-3 prose-blockquote:px-4 sm:prose-blockquote:px-5 prose-blockquote:rounded-r-[5px] prose-blockquote:italic prose-blockquote:text-brand-navy
                  prose-img:rounded-[5px] prose-img:shadow-xs prose-img:my-3 sm:prose-img:my-4 prose-img:mx-auto prose-img:max-w-full prose-img:w-auto prose-img:h-auto prose-img:max-h-[460px] prose-img:object-contain prose-img:block
                  [&_p[id^='caption']]:text-center [&_p[id^='caption']]:text-xs sm:[&_p[id^='caption']]:text-sm [&_p[id^='caption']]:text-brand-text/80 [&_p[id^='caption']]:italic [&_p[id^='caption']]:-mt-1.5 [&_p[id^='caption']]:mb-4
                  [&_figcaption]:text-center [&_figcaption]:text-xs sm:[&_figcaption]:text-sm [&_figcaption]:text-brand-text/80 [&_figcaption]:italic [&_figcaption]:mt-1.5 [&_figcaption]:mb-4
                  [&_blockquote_p]:my-0 [&_blockquote_p]:text-[15px] sm:[&_blockquote_p]:text-[16.5px] [&_blockquote_p]:leading-relaxed
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
                        className="text-[16px] sm:text-[17px] leading-[28px] sm:leading-[30px] text-brand-navy/90 font-sans"
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
                            <span className="w-2 h-5 bg-brand-ink rounded-full flex-shrink-0" />
                            <span>{section.heading}</span>
                          </h2>

                          <div className="space-y-3 mb-3">
                            {section.paragraphs.map((p, pIdx) => (
                              <p
                                key={pIdx}
                                className="text-[16px] sm:text-[17px] leading-[28px] sm:leading-[30px] text-brand-text font-sans"
                              >
                                {p}
                              </p>
                            ))}
                          </div>

                          {section.bullets && section.bullets.length > 0 && (
                            <ul className="my-3 space-y-1.5 bg-brand-bg/60 p-4 rounded-[5px] border border-brand-border/60">
                              {section.bullets.map((bullet, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2.5">
                                  <span className="w-2 h-2 rounded-full bg-brand-ink mt-2 flex-shrink-0" />
                                  <span className="text-sm sm:text-base leading-relaxed text-brand-navy/90 font-medium font-sans">
                                    {bullet}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {section.callout && (
                            <div className="my-4 p-4 rounded-[5px] bg-gradient-to-r from-brand-sky/60 via-brand-bg to-brand-sky/30 border-l-4 border-brand-ink shadow-xs">
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
                                  <p className="text-sm sm:text-base leading-relaxed text-brand-navy/90 font-sans italic">
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
                          className="text-[16px] sm:text-[17px] leading-[28px] sm:leading-[30px] text-brand-text font-sans"
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
                  <span className="text-xs sm:text-sm font-bold text-brand-navy/80 uppercase tracking-wider font-heading mr-1 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-brand-blue" />
                    Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs sm:text-sm font-semibold text-brand-navy bg-brand-bg hover:bg-brand-sky px-2.5 py-1 rounded-[5px] border border-brand-border/80 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Bottom Social Share Bar */}
              <div className="pt-3 border-t border-brand-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs sm:text-sm font-bold text-brand-navy font-heading uppercase tracking-wider">
                  Enjoyed this article? Share it with family &amp; friends:
                </span>
                <BlogShareButtons title={post.title} />
              </div>
            </div>

            {/* Author Attribution Card */}
            <div className="mt-8 p-4 sm:p-5 rounded-[5px] bg-[#f5f1ea] border border-brand-border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-blue font-heading mb-0.5">
                    WRITTEN BY
                  </div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-brand-navy leading-tight">
                    {post.author?.name || "Dr. Amy Morgenstern"}
                  </h3>
                  <div className="text-xs sm:text-sm font-medium text-brand-text font-sans">
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
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-navy">
                    Table of Contents
                  </h3>
                </div>

                <nav className="space-y-1.5 font-sans" aria-label="Table of contents">
                  {headings.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-xs sm:text-sm text-brand-text hover:text-brand-blue hover:translate-x-0.5 transition-all py-1.5 leading-snug line-clamp-1"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Consultation Booking Card (Direct HubSpot Meeting) */}
            <div className="p-6 rounded-[5px] bg-brand-ink text-white shadow-card relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-9 h-9 rounded-[5px] bg-white/10 backdrop-blur-md border border-white/20 grid place-items-center mb-3.5">
                  <BrandStar className="w-4.5 h-4.5 text-white fill-white" />
                </div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-white mb-2 leading-tight">
                  Ready to Plan Your Student&apos;s Admissions Journey?
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#f3eee5] font-sans mb-4">
                  Schedule an initial consultation with Dr. Amy Morgenstern and our senior counseling team.
                </p>
                <a
                  href={HUBSPOT_CONSULTATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[5px] bg-white hover:bg-[#f3eee5] text-brand-navy font-bold text-xs sm:text-sm font-heading shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Book Your Initial Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-navy" />
                </a>
              </div>
            </div>

            {/* Free Workbook Lead Magnet Card */}
            <div className="p-5 sm:p-6 rounded-[5px] bg-white border border-brand-border shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-brand-blue font-bold text-xs sm:text-[13px] uppercase tracking-wider font-heading">
                <FileText className="w-4 h-4" />
                <span>Free Downloadable Toolkit</span>
              </div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-brand-navy mb-2 leading-snug">
                College Planning Foundations Workbook (PDF)
              </h4>
              <p className="text-xs sm:text-sm text-brand-text font-sans leading-relaxed mb-4">
                Essential self-reflection exercises, 4-year high school milestones, and extracurricular spike planner.
              </p>
              <Link
                href="/free-workbook"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[5px] bg-brand-sky hover:bg-brand-ink text-brand-blue hover:text-white font-bold text-xs font-heading transition-colors"
              >
                <span>Download Free Workbook</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Article Overview */}
            <div className="p-5 rounded-[5px] bg-[#f5f1ea] border border-brand-border/70 space-y-2.5 text-xs text-brand-text font-sans">
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
                  <span className="w-5 h-[2px] bg-brand-ink rounded-full" />
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
