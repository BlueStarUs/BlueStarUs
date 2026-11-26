/**
 * Keyword search (BM25 via MiniSearch) over the chatbot knowledge pages.
 * No embeddings: paraphrases are handled with stemming, fuzzy matching,
 * per-page aliases and a small synonym map.
 */

import MiniSearch, { type SearchResult } from "minisearch";
import { stemmer } from "stemmer";
import type { KnowledgePage, KnowledgeType } from "./knowledge";

export interface KnowledgeChunk {
  id: string;
  pageId: string;
  type: KnowledgeType;
  title: string;
  resource: string;
  heading: string;
  text: string;
  keywords: string;
}

export interface SearchHit {
  chunk: KnowledgeChunk;
  score: number;
}

export interface RetrievedContext {
  hits: SearchHit[];
  /** Best-matching page, for the "Learn more" link under the answer. */
  best: { title: string; resource: string } | null;
  topScore: number;
  /** Chunks formatted for the LLM prompt, within the character budget. */
  contextText: string;
}

/** ~4 characters per token, so 1,500 chars is roughly 375 tokens per chunk. */
const MAX_CHUNK_CHARS = 1500;

/** Pages that answer business questions directly rank above long-form blog content. */
const TYPE_BOOST: Partial<Record<KnowledgeType, number>> = {
  Policy: 1.6,
  Contact: 1.5,
  Process: 1.4,
  Service: 1.4,
  Company: 1.3,
  FAQ: 1.3,
  "Team Member": 1.3,
  Results: 1.2,
  Event: 1.0,
  Guide: 0.9,
  Testimonials: 0.9,
  "Success Story": 0.8,
  Video: 0.7,
  "Blog Post": 0.6,
};

const STOPWORDS = new Set(
  (
    "a an the and or but if then so of to in on at by for with from into about over under as is are was were be been " +
    "being am do does did doing have has had having i me my we our you your he she it its they them their this that " +
    "these those what which who whom whose when where why how can could would should will shall may might must " +
    "there here not no yes very just also any some all more most other such only own same than too s t " +
    "please tell know want need like get give help much hi hello hey thanks thank blue stars bluestars"
  ).split(" "),
);

/**
 * Words people type, grouped by meaning. If a query contains any member of a
 * group, the other members are searched too (at reduced weight).
 */
const SYNONYM_GROUPS: string[][] = [
  ["price", "pricing", "cost", "costs", "fee", "fees", "how much", "charge", "charges", "rates", "expensive", "afford", "affordable", "payment", "package price"],
  ["essay", "essays", "personal statement", "writing", "supplement", "supplements", "piq", "personal insight"],
  ["early decision", "ed", "binding"],
  ["early action", "ea"],
  ["counselor", "counsellor", "consultant", "advisor", "adviser", "mentor", "coach"],
  ["consultation", "appointment", "meeting", "book", "booking", "schedule"],
  ["research", "lab", "internship", "internships", "publication"],
  ["art", "portfolio", "design", "risd", "fine arts"],
  ["acceptance", "acceptances", "accepted", "admit", "admits", "admitted", "got in", "results", "track record", "success rate"],
  ["contact", "email", "phone", "reach", "call"],
  ["founder", "dr m", "owner", "started"],
  ["webinar", "webinars", "event", "events", "workshop", "seminar"],
  ["uc", "university of california", "piq"],
  ["ivy", "ivy league", "t20", "elite"],
  ["financial aid", "scholarship", "scholarships", "merit aid"],
  ["sat", "act", "test scores", "standardized testing", "test optional"],
  ["extracurricular", "extracurriculars", "activities", "leadership"],
  ["interview", "interviews", "mock interview"],
  ["international", "abroad", "overseas", "uk", "canada"],
];

function processTerm(term: string): string | null {
  const t = term.toLowerCase().replace(/'s$/, "").replace(/[^a-z0-9]/g, "");
  if (!t || STOPWORDS.has(t)) return null;
  return stemmer(t);
}

function expandQuery(query: string): string {
  const q = ` ${query.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ")} `;
  const extra = new Set<string>();
  for (const group of SYNONYM_GROUPS) {
    if (group.some((w) => q.includes(` ${w} `))) group.forEach((w) => extra.add(w));
  }
  return [...extra].join(" ");
}

function splitLongText(text: string): string[] {
  if (text.length <= MAX_CHUNK_CHARS) return [text];
  const parts: string[] = [];
  let current = "";
  for (const para of text.split(/\n+/)) {
    if (current && current.length + para.length + 1 > MAX_CHUNK_CHARS) {
      parts.push(current);
      current = "";
    }
    // A single paragraph longer than the limit is cut at sentence boundaries.
    if (para.length > MAX_CHUNK_CHARS) {
      for (const sentence of para.split(/(?<=[.!?])\s+/)) {
        if (current && current.length + sentence.length + 1 > MAX_CHUNK_CHARS) {
          parts.push(current);
          current = "";
        }
        current = current ? `${current} ${sentence}` : sentence;
      }
    } else {
      current = current ? `${current}\n${para}` : para;
    }
  }
  if (current) parts.push(current);
  return parts;
}

export function chunkPages(pages: KnowledgePage[]): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];
  for (const page of pages) {
    const keywords = [...page.tags, ...page.aliases].join(" ; ");
    page.sections.forEach((section, si) => {
      splitLongText(section.text).forEach((text, pi) => {
        chunks.push({
          id: `${page.id}#${si}.${pi}`,
          pageId: page.id,
          type: page.type,
          title: page.title,
          resource: page.resource,
          heading: section.heading,
          text,
          keywords,
        });
      });
    });
  }
  return chunks;
}

export class KnowledgeSearch {
  private index: MiniSearch<KnowledgeChunk>;
  private chunks = new Map<string, KnowledgeChunk>();

  constructor(pages: KnowledgePage[]) {
    this.index = new MiniSearch<KnowledgeChunk>({
      fields: ["title", "keywords", "heading", "text"],
      storeFields: ["type"],
      processTerm,
      searchOptions: {
        boost: { title: 3, keywords: 3, heading: 2, text: 1 },
        prefix: (term) => term.length > 4,
        fuzzy: (term) => (term.length > 3 ? 0.25 : false),
        combineWith: "OR",
        boostDocument: (_id, _term, stored) => TYPE_BOOST[(stored?.type as KnowledgeType) ?? "Blog Post"] ?? 1,
      },
    });
    const chunks = chunkPages(pages);
    for (const c of chunks) this.chunks.set(c.id, c);
    this.index.addAll(chunks);
  }

  get size(): number {
    return this.chunks.size;
  }

  search(query: string, limit = 8): SearchHit[] {
    const scores = new Map<string, number>();
    const add = (results: SearchResult[], weight: number) => {
      for (const r of results) scores.set(r.id as string, (scores.get(r.id as string) ?? 0) + r.score * weight);
    };
    add(this.index.search(query), 1);
    const expansion = expandQuery(query);
    if (expansion) add(this.index.search(expansion), 0.5);

    return [...scores.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id, score]) => ({ chunk: this.chunks.get(id)!, score }));
  }

  /**
   * Top chunks for the prompt: at most `maxChunks`, at most 2 per page, and
   * within `maxChars` (~4 chars per token) so free-tier token limits hold.
   */
  retrieve(query: string, { maxChunks = 5, maxChars = 6000 } = {}): RetrievedContext {
    const hits = this.search(query, 20);
    const picked: SearchHit[] = [];
    const perPage = new Map<string, number>();
    let used = 0;
    for (const hit of hits) {
      if (picked.length >= maxChunks) break;
      const count = perPage.get(hit.chunk.pageId) ?? 0;
      if (count >= 2) continue;
      const cost = hit.chunk.text.length + hit.chunk.title.length + hit.chunk.heading.length + 40;
      if (used + cost > maxChars) continue;
      picked.push(hit);
      perPage.set(hit.chunk.pageId, count + 1);
      used += cost;
    }

    const contextText = picked
      .map((h, i) => {
        const c = h.chunk;
        const heading = c.heading && c.heading !== c.title ? ` > ${c.heading}` : "";
        return `[${i + 1}] ${c.title}${heading} (${c.resource})\n${c.text}`;
      })
      .join("\n\n");

    const top = picked[0];
    return {
      hits: picked,
      best: top ? { title: top.chunk.title, resource: top.chunk.resource } : null,
      topScore: top?.score ?? 0,
      contextText,
    };
  }
}
