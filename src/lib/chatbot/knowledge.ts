/**
 * Builds the chatbot knowledge pages from the site's own data, so the bot's
 * knowledge never drifts from what the website says.
 *
 * Each page follows the Open Knowledge Format (OKF v0.3) shape: a `type`, a
 * `title`, a `resource` (the site URL the page describes), `tags`, and our own
 * `x-bluestars-aliases` extension. `scripts/build-kb.ts` writes these pages to
 * `kb/` as an OKF bundle for review; at runtime the same objects feed search.
 */

import type { BlogPost, SuccessStory } from "@/types";
import { SERVICES_CATALOG, type ServiceDetail } from "@/lib/services-data";
import { FAQ_CATEGORIES, RESOURCE_GUIDES, WEBINARS_DATA, VIDEO_RESOURCES } from "@/lib/resources-data";
import { TEAM_MEMBERS } from "@/lib/team-data";
import { SUCCESS_CYCLES } from "@/lib/successes-data";
import { UNIVERSITY_ACCEPTANCES } from "@/lib/stories-data";
import {
  SITE_CONFIG,
  DEFAULT_HERO_CONFIG,
  PROCESS_STEPS,
  WHY_CHOOSE_BENEFITS,
  TESTIMONIALS,
  FAQS,
  HUBSPOT_CONSULTATION_URL,
} from "@/lib/constants";
import { htmlToText, normaliseText, splitHtmlSections } from "./html";

export type KnowledgeType =
  | "Company"
  | "Contact"
  | "Policy"
  | "Process"
  | "Service"
  | "FAQ"
  | "Team Member"
  | "Results"
  | "Success Story"
  | "Testimonials"
  | "Guide"
  | "Event"
  | "Video"
  | "Blog Post";

export interface KnowledgeSection {
  heading: string;
  text: string;
}

export interface KnowledgePage {
  /** Path inside the OKF bundle, without extension, e.g. "services/essay-guidance". */
  id: string;
  type: KnowledgeType;
  title: string;
  description?: string;
  /** Site URL the page describes (internal path or external link). */
  resource: string;
  tags: string[];
  /** Extra phrases people use for this topic (OKF extension `x-bluestars-aliases`). */
  aliases: string[];
  sections: KnowledgeSection[];
}

export interface KnowledgeInput {
  blogs: BlogPost[];
  stories: SuccessStory[];
}

/** Search hints: words families actually type, which the page text may not contain. */
const SERVICE_ALIASES: Record<string, string[]> = {
  "college-planning": [
    "college planning", "4 year plan", "four year roadmap", "high school planning", "8th grade",
    "9th grade", "freshman", "sophomore", "course selection", "extracurricular planning", "start early",
  ],
  "application-strategy": [
    "application strategy", "college list", "early decision", "early action", "ED", "EA",
    "which colleges to apply", "application timeline", "common app", "application review",
  ],
  "essay-guidance": [
    "essay help", "essay editing", "writing help", "writing coaching", "personal statement",
    "supplemental essays", "supplements", "common app essay", "UC PIQ", "personal insight questions",
    "college essay", "SOP", "statement of purpose",
  ],
  "research-internships": [
    "research", "internship", "research academy", "lab", "research paper", "publication",
    "summer research", "STEM research", "science fair", "professor mentor",
  ],
  "college-admissions-consulting": [
    "admissions consulting", "college counselor", "college counseling", "full service",
    "comprehensive package", "one on one counselor", "admission help", "ivy league help",
  ],
  "art-admissions-consulting": [
    "art school", "portfolio", "art portfolio", "RISD", "design school", "MFA", "fine arts",
    "architecture portfolio", "film school", "art admissions",
  ],
};

const lines = (items: (string | undefined | null)[] | undefined, bullet = "- ") =>
  (items ?? []).filter(Boolean).map((i) => `${bullet}${normaliseText(String(i))}`).join("\n");

const clean = (text: string | undefined | null) => normaliseText(text ?? "");

function section(heading: string, ...parts: (string | undefined | null)[]): KnowledgeSection {
  return { heading, text: parts.map(clean).filter(Boolean).join("\n\n") };
}

function nonEmpty(sections: KnowledgeSection[]): KnowledgeSection[] {
  return sections.filter((s) => s.text.trim().length > 0);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// ---------------------------------------------------------------------------
// Company, contact, process, pricing policy
// ---------------------------------------------------------------------------

function companyPages(): KnowledgePage[] {
  const contact = SITE_CONFIG.contact;
  return [
    {
      id: "company/about-blue-stars",
      type: "Company",
      title: `About ${SITE_CONFIG.name}`,
      description: SITE_CONFIG.description,
      resource: "/about",
      tags: ["about", "company", "boutique", "founder"],
      aliases: ["who are you", "what is blue stars", "about us", "company background", "since 2010", "how long in business"],
      sections: nonEmpty([
        section("Overview", SITE_CONFIG.description, DEFAULT_HERO_CONFIG.kicker, DEFAULT_HERO_CONFIG.description),
        section("Why families choose Blue Stars", lines(WHY_CHOOSE_BENEFITS)),
      ]),
    },
    {
      id: "company/services-overview",
      type: "Company",
      title: "Services Blue Stars offers",
      resource: "/services",
      tags: ["services", "programs", "offerings"],
      aliases: ["what services", "what do you offer", "what do you do", "programs", "offerings", "how can you help", "options"],
      sections: [
        section(
          "Services",
          lines(Object.values(SERVICES_CATALOG).map((s) => `${s.title} (/services/${s.slug}): ${s.shortDescription}`)),
        ),
      ],
    },
    {
      id: "company/contact",
      type: "Contact",
      title: "Contact Blue Stars",
      resource: "/contact",
      tags: ["contact", "email", "phone", "location"],
      aliases: ["phone number", "email address", "call", "reach you", "office", "where are you located", "address", "talk to someone"],
      sections: [
        section(
          "Contact details",
          [
            `Email: ${contact.email}`,
            `Phone: ${contact.phone}`,
            `Location: ${contact.address}`,
            `Book an Initial Consultation: ${HUBSPOT_CONSULTATION_URL}`,
            "Contact form: /contact",
          ].join("\n"),
        ),
      ],
    },
    {
      id: "company/consultation-process",
      type: "Process",
      title: "How the consultation process works",
      resource: HUBSPOT_CONSULTATION_URL,
      tags: ["consultation", "process", "getting started", "booking"],
      aliases: [
        "book a call", "schedule", "free consultation", "initial consultation", "strategy consultation",
        "how to start", "next steps", "sign up", "get started", "appointment", "meeting",
      ],
      sections: nonEmpty([
        section("Our process", lines(PROCESS_STEPS.map((s) => `${s.stepNumber}. ${s.title}: ${s.description}`), "")),
        ...FAQS.map((f) => section(f.question, f.answer)),
      ]),
    },
    {
      // No prices are published anywhere on the site, so the bot must never quote one.
      id: "company/pricing",
      type: "Policy",
      title: "Pricing and fees",
      resource: HUBSPOT_CONSULTATION_URL,
      tags: ["pricing", "fees", "cost", "packages"],
      aliases: ["how much", "price", "cost", "fee", "rates", "charges", "affordable", "payment", "package price"],
      sections: [
        section(
          "Pricing",
          "Blue Stars does not publish prices or package fees on its website. Questions about fees and packages are answered during the Initial Consultation.",
          `Book the Initial Consultation: ${HUBSPOT_CONSULTATION_URL}`,
        ),
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

function servicePage(s: ServiceDetail): KnowledgePage {
  const o = s.overview;
  return {
    id: `services/${s.slug}`,
    type: "Service",
    title: s.title,
    description: s.shortDescription,
    resource: `/services/${s.slug}`,
    tags: [s.badge, ...(s.specializedService?.tags ?? [])].filter(Boolean),
    aliases: SERVICE_ALIASES[s.slug] ?? [],
    sections: nonEmpty([
      section("Overview", s.subtitle, s.heroTagline, o.heading, o.intro, o.paragraph2),
      section("Who it is for", lines(o.targetAudience)),
      section("Key facts", lines(o.keyStats.map((k) => `${k.label}: ${k.value}`))),
      ...s.pillars.map((p) => section(p.title, p.description, lines(p.highlights))),
      section("How it works", lines(s.methodology.map((m) => `${m.stepNumber}. ${m.title}: ${m.description}`), "")),
      section("What is included", lines(s.deliverables)),
      ...s.faqs.map((f) => section(f.question, f.answer)),
      ...(s.specializedService
        ? [section(s.specializedService.title, s.specializedService.description, lines(s.specializedService.bullets))]
        : []),
      ...(s.stories ?? []).map((st) => section(st.title, ...st.paragraphs, lines(st.bullets))),
      ...(s.consultationBanner
        ? [section(s.consultationBanner.heading, s.consultationBanner.description, lines(s.consultationBanner.bullets))]
        : []),
      ...(s.testimonials?.length
        ? [section("What families say", lines(s.testimonials.map((t) => `"${t.quote}" - ${t.author}, ${t.role}`)))]
        : []),
    ]),
  };
}

// ---------------------------------------------------------------------------
// FAQ, team, results, stories, testimonials
// ---------------------------------------------------------------------------

function faqPages(): KnowledgePage[] {
  return FAQ_CATEGORIES.map((cat) => ({
    id: `faq/${slugify(cat.category)}`,
    type: "FAQ" as const,
    title: `FAQ: ${cat.category}`,
    description: cat.description,
    resource: "/resources/faq",
    tags: ["faq", cat.category],
    aliases: [],
    sections: nonEmpty(cat.faqs.map((f) => section(f.question, f.answer))),
  }));
}

function teamPages(): KnowledgePage[] {
  const overview: KnowledgePage = {
    id: "team/index-of-counselors",
    type: "Team Member",
    title: "The Blue Stars team",
    resource: "/about#team",
    tags: ["team", "counselors", "staff"],
    aliases: ["who are the counselors", "consultants", "your team", "who will work with my child", "experts", "staff"],
    sections: [section("Team members", lines(TEAM_MEMBERS.map((m) => `${m.name}: ${m.role} (${m.credentials})`)))],
  };
  const members = TEAM_MEMBERS.map((m) => ({
    id: `team/${slugify(m.name)}`,
    type: "Team Member" as const,
    title: `${m.name}, ${m.role}`,
    resource: "/about#team",
    tags: ["team", m.role],
    aliases: m.name.includes("Morgenstern") ? ["Dr. M", "Dr M", "founder", "owner", "who started blue stars"] : [],
    sections: nonEmpty([
      section("Role and credentials", `${m.name} is ${m.role}.`, m.credentials),
      section("Biography", m.bio),
      ...(m.affiliations?.length ? [section("Affiliations", m.affiliations.map((a) => a.name).join(", "))] : []),
    ]),
  }));
  return [overview, ...members];
}

function resultsPages(): KnowledgePage[] {
  const cycles = SUCCESS_CYCLES.map((cycle) => {
    const admissions = cycle.admissions.map((a) => {
      const extras = [a.count && a.count > 1 ? `${a.count} admits` : "", a.highlight ?? ""].filter(Boolean).join(", ");
      return `${a.institution}${extras ? ` (${extras})` : ""}`;
    });
    const programs = (cycle.summerPrograms ?? []).map((p) => {
      const extras = [p.count && p.count > 1 ? `${p.count} students` : "", p.highlight ?? ""].filter(Boolean).join(", ");
      return `${p.name}${extras ? ` (${extras})` : ""}`;
    });
    return {
      id: `results/${cycle.year}`,
      type: "Results" as const,
      title: `${cycle.year} college acceptances and summer programs`,
      resource: "/successes",
      tags: ["results", "acceptances", cycle.year],
      aliases: ["admits", "admitted", "accepted", "track record", "success rate", "where did students get in", `class of ${cycle.year}`],
      sections: nonEmpty([
        section(`${cycle.year} college acceptances`, cycle.headline, lines(admissions)),
        section(`${cycle.year} summer programs`, lines(programs)),
      ]),
    };
  });

  const overview: KnowledgePage = {
    id: "results/overview",
    type: "Results",
    title: "Where Blue Stars students have been admitted",
    resource: "/successes",
    tags: ["results", "acceptances", "ivy league"],
    aliases: ["track record", "success rate", "results", "top schools", "ivy league admits", "do your students get in"],
    sections: [
      section(
        "Selected universities Blue Stars students have been admitted to",
        UNIVERSITY_ACCEPTANCES.join(", "),
        `Year-by-year lists are available for: ${SUCCESS_CYCLES.map((c) => c.year).join(", ")}.`,
      ),
    ],
  };
  return [overview, ...cycles];
}

function storyPages(stories: SuccessStory[]): KnowledgePage[] {
  return stories.map((s) => ({
    id: `stories/${s.id}`,
    type: "Success Story" as const,
    title: s.title ? `${s.title} (${s.name})` : `${s.name}'s story`,
    resource: `/stories/${s.id}`,
    tags: [...(s.tags ?? []), s.category].filter((t): t is string => Boolean(t)),
    aliases: [],
    sections: nonEmpty([
      section(
        "Story",
        [s.authorRole, s.location, s.admittedTo ? `Admitted to: ${s.admittedTo}` : "", s.major ? `Major: ${s.major}` : "", s.keyOutcome]
          .filter(Boolean)
          .join("\n"),
        ...(s.fullStory?.length ? s.fullStory : [s.quote]),
      ),
    ]),
  }));
}

function testimonialsPage(): KnowledgePage {
  return {
    id: "company/testimonials",
    type: "Testimonials",
    title: "Testimonials from Blue Stars families",
    resource: "/testimonials",
    tags: ["testimonials", "reviews"],
    aliases: ["reviews", "what parents say", "feedback from families", "is blue stars good", "ratings"],
    sections: nonEmpty(
      TESTIMONIALS.map((t) =>
        section(
          [t.name, t.authorRole ?? t.schoolOrRole, t.admittedTo ? `admitted to ${t.admittedTo}` : ""].filter(Boolean).join(", "),
          t.quote,
        ),
      ),
    ),
  };
}

// ---------------------------------------------------------------------------
// Resources: guides, events/webinars, videos
// ---------------------------------------------------------------------------

function resourcePages(): KnowledgePage[] {
  const guides = RESOURCE_GUIDES.map((g) => ({
    id: `guides/${g.slug}`,
    type: "Guide" as const,
    title: g.title,
    description: g.subtitle,
    resource: "/resources/guides",
    tags: ["guide", g.category],
    aliases: ["free guide", "download", "ebook", "pdf"],
    sections: nonEmpty([
      section("About this guide", g.subtitle, g.description, `For: ${g.targetAudience}`, `${g.pages} pages, ${g.readTime}.`),
      section("Highlights", lines(g.highlights)),
      section("Contents", lines(g.tableOfContents)),
    ]),
  }));

  const events = WEBINARS_DATA.map((w) => ({
    id: `events/${w.slug}`,
    type: "Event" as const,
    title: w.title,
    description: w.subtitle,
    resource: `/events/${w.slug}`,
    tags: ["event", "webinar", w.category, w.status],
    aliases: w.status === "upcoming" ? ["upcoming webinar", "upcoming event", "workshop", "register"] : ["past webinar", "recording"],
    sections: nonEmpty([
      section(
        "Event details",
        `${w.status === "upcoming" ? "Upcoming" : "Past"} event on ${w.date} at ${w.time} (${w.duration}).`,
        `Speaker: ${w.speaker.name}, ${w.speaker.role}.`,
        w.subtitle,
        w.description,
      ),
      section("Topics", lines(w.topics)),
      section("Takeaways", lines(w.takeaways)),
    ]),
  }));

  const videos = VIDEO_RESOURCES.map((v) => ({
    id: `videos/${v.slug}`,
    type: "Video" as const,
    title: v.title,
    resource: "/resources/videos",
    tags: ["video", v.category],
    aliases: v.category === "College Tours" ? ["campus tour", "college tour video"] : [],
    sections: nonEmpty([section("Video", `${v.category}, ${v.duration}, with ${v.speaker}.`, v.description, lines(v.keyTopics))]),
  }));

  return [...guides, ...events, ...videos];
}

// ---------------------------------------------------------------------------
// Blogs
// ---------------------------------------------------------------------------

function blogPage(b: BlogPost): KnowledgePage {
  const body: KnowledgeSection[] = [];
  if (b.contentHtml) {
    body.push(...splitHtmlSections(b.contentHtml));
  } else {
    body.push(section("", ...(b.intro ?? [])));
    for (const s of b.sections ?? []) body.push(section(s.heading, ...s.paragraphs, lines(s.bullets)));
    body.push(section("Conclusion", ...(b.conclusion ?? [])));
  }
  return {
    id: `blogs/${b.slug}`,
    type: "Blog Post",
    title: clean(b.title),
    description: htmlToText(b.excerpt ?? ""),
    resource: `/blogs/${b.slug}`,
    tags: [b.category, ...(b.tags ?? [])].filter(Boolean),
    aliases: [],
    sections: nonEmpty([
      section("Key takeaways", lines(b.keyTakeaways)),
      ...body.map((s) => ({ heading: s.heading || "Introduction", text: s.text })),
    ]),
  };
}

// ---------------------------------------------------------------------------

export function buildKnowledgePages(input: KnowledgeInput): KnowledgePage[] {
  const pages = [
    ...companyPages(),
    ...Object.values(SERVICES_CATALOG).map(servicePage),
    ...faqPages(),
    ...teamPages(),
    ...resultsPages(),
    testimonialsPage(),
    ...storyPages(input.stories),
    ...resourcePages(),
    ...input.blogs.map(blogPage),
  ];

  // Some source data repeats a slug (e.g. the same video listed twice); keep ids unique.
  const seen = new Map<string, number>();
  return pages.map((page) => {
    const n = (seen.get(page.id) ?? 0) + 1;
    seen.set(page.id, n);
    return n === 1 ? page : { ...page, id: `${page.id}-${n}` };
  });
}

// ---------------------------------------------------------------------------
// OKF serialisation (used by scripts/build-kb.ts)
// ---------------------------------------------------------------------------

/** YAML double-quoted scalar; safe for any text (colons, quotes, unicode). */
function yamlString(value: string): string {
  return JSON.stringify(value);
}

function yamlList(values: string[]): string {
  return `[${values.map(yamlString).join(", ")}]`;
}

export function toOkfMarkdown(page: KnowledgePage, generatedAt: string): string {
  const fm = [
    "---",
    `type: ${yamlString(page.type)}`,
    `title: ${yamlString(page.title)}`,
    ...(page.description ? [`description: ${yamlString(page.description)}`] : []),
    `resource: ${yamlString(page.resource)}`,
    `tags: ${yamlList(page.tags)}`,
    ...(page.aliases.length ? [`x-bluestars-aliases: ${yamlList(page.aliases)}`] : []),
    "generated:",
    `  by: ${yamlString("scripts/build-kb.ts")}`,
    `  at: ${yamlString(generatedAt)}`,
    "---",
    "",
  ].join("\n");
  const body = page.sections.map((s) => (s.heading ? `# ${s.heading}\n\n${s.text}` : s.text)).join("\n\n");
  return `${fm}${body}\n`;
}
