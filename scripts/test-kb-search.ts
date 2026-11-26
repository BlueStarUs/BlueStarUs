/**
 * Retrieval check: does keyword search find the right page for real-world
 * questions, including paraphrases and typos?
 *
 *   npm run kb:test            summary + misses
 *   npm run kb:test -- -v      also print the top 3 hits for every question
 *
 * `expect` lists acceptable resources (prefix match). A case passes "@1" when
 * the first hit matches, and "@3" when any of the top 3 does.
 */

import { BLOG_POSTS } from "@/lib/blogs-data";
import { SUCCESS_STORIES } from "@/lib/stories-data";
import { HUBSPOT_CONSULTATION_URL } from "@/lib/constants";
import { buildKnowledgePages } from "@/lib/chatbot/knowledge";
import { KnowledgeSearch } from "@/lib/chatbot/search";

const BOOK = HUBSPOT_CONSULTATION_URL;

const CASES: { q: string; expect: string[] }[] = [
  // Suggested questions / direct
  { q: "What services do you offer?", expect: ["/services/", "/about"] },
  { q: "How does the consultation process work?", expect: [BOOK] },
  { q: "How do I book a free consultation?", expect: [BOOK, "/contact"] },
  { q: "Do you help with college essays?", expect: ["/services/essay-guidance"] },
  { q: "Do you help students find research opportunities?", expect: ["/services/research-internships"] },
  { q: "Do you help with art school portfolios?", expect: ["/services/art-admissions-consulting"] },
  { q: "What results have your students achieved?", expect: ["/successes"] },
  { q: "What is your email address?", expect: ["/contact"] },
  { q: "What is your phone number?", expect: ["/contact"] },
  { q: "Who founded Blue Stars?", expect: ["/about"] },
  { q: "Who is Dr. Amy Morgenstern?", expect: ["/about"] },
  { q: "Who is Helen Ingerson?", expect: ["/about"] },
  // Pricing
  { q: "How much do your services cost?", expect: [BOOK] },
  { q: "what are your fees", expect: [BOOK] },
  { q: "is it expensive? what is the price of the package", expect: [BOOK] },
  // Paraphrases in the family's own words
  { q: "my kid needs writing help for his application", expect: ["/services/essay-guidance"] },
  { q: "can someone review my personal statement", expect: ["/services/essay-guidance"] },
  { q: "help with UC personal insight questions", expect: ["/services/essay-guidance", "/blogs/", "/resources/guides"] },
  { q: "my daughter is in 9th grade, is it too early to start?", expect: ["/services/college-planning", "/resources/faq", BOOK] },
  { q: "when should we start planning for college", expect: ["/services/college-planning", "/resources/faq", BOOK] },
  { q: "how many colleges should my son apply to", expect: ["/resources/faq", "/services/application-strategy"] },
  { q: "difference between early decision and early action", expect: ["/resources/faq", "/services/application-strategy"] },
  { q: "is ED binding?", expect: ["/resources/faq", "/services/application-strategy"] },
  { q: "do you get kids into ivy league schools", expect: ["/successes", "/services/college-admissions-consulting", "/stories/"] },
  { q: "did any of your students get into Stanford", expect: ["/successes", "/stories/"] },
  { q: "which colleges did students get into in 2025", expect: ["/successes"] },
  { q: "lab internship for high school student interested in biology", expect: ["/services/research-internships"] },
  { q: "can you help my son publish a research paper", expect: ["/services/research-internships"] },
  { q: "my child wants to go to RISD", expect: ["/services/art-admissions-consulting", "/stories/"] },
  { q: "who will be my child's counselor", expect: ["/about"] },
  { q: "are your counselors experienced", expect: ["/about"] },
  { q: "what do parents say about you", expect: ["/testimonials", "/stories/"] },
  { q: "where is your office located", expect: ["/contact"] },
  { q: "do you have any upcoming webinars", expect: ["/events/"] },
  { q: "do you have free guides I can download", expect: ["/resources/guides"] },
  { q: "do you help with international applications", expect: [BOOK, "/resources/faq", "/services/"] },
  { q: "do you help with scholarships and financial aid", expect: ["/resources/faq", "/services/", "/blogs/"] },
  { q: "is the SAT required, test optional?", expect: ["/resources/faq", "/blogs/"] },
  { q: "do you do mock interviews", expect: ["/services/"] },
  // Typos
  { q: "essy help", expect: ["/services/essay-guidance"] },
  { q: "reserch opportunites", expect: ["/services/research-internships"] },
  { q: "portfollio review for art scool", expect: ["/services/art-admissions-consulting"] },
  { q: "consultaton booking", expect: [BOOK] },
];

const verbose = process.argv.includes("-v");

const t0 = performance.now();
const search = new KnowledgeSearch(buildKnowledgePages({ blogs: BLOG_POSTS, stories: SUCCESS_STORIES }));
const buildMs = Math.round(performance.now() - t0);

let at1 = 0;
let at3 = 0;
const misses: string[] = [];
const t1 = performance.now();

for (const { q, expect } of CASES) {
  const { hits, topScore, contextText } = search.retrieve(q);
  const matches = (r: string) => expect.some((e) => r.startsWith(e));
  const ok1 = hits[0] && matches(hits[0].chunk.resource);
  const ok3 = hits.slice(0, 3).some((h) => matches(h.chunk.resource));
  if (ok1) at1++;
  if (ok3) at3++;
  const fmt = (i: number) => (hits[i] ? `${hits[i].chunk.resource} | ${hits[i].chunk.title} > ${hits[i].chunk.heading}` : "-");
  if (!ok3) misses.push(`  MISS "${q}"\n     want ${expect.join(" or ")}\n     got  ${fmt(0)}\n          ${fmt(1)}\n          ${fmt(2)}`);
  if (verbose) {
    console.log(`${ok1 ? "OK1" : ok3 ? "OK3" : "MISS"} [${topScore.toFixed(1)}] ${q}  (~${Math.round(contextText.length / 4)} tokens)`);
    for (let i = 0; i < 3; i++) console.log(`     ${fmt(i)}`);
  }
}
const queryMs = (performance.now() - t1) / CASES.length;

// Off-topic questions should score low, so the bot links to booking instead of a random page.
const OFF_TOPIC = ["what is the weather today", "who won the cricket match", "write me a python script", "tell me a joke", "hi", "ok thanks"];
const offScores = OFF_TOPIC.map((q) => ({ q, score: search.retrieve(q).topScore }));
const onScores = CASES.map((c) => search.retrieve(c.q).topScore).sort((a, b) => a - b);
console.log(`\nOff-topic top scores: ${offScores.map((o) => `"${o.q}" ${o.score.toFixed(0)}`).join(", ")}`);
console.log(`On-topic lowest scores: ${onScores.slice(0, 5).map((s) => s.toFixed(0)).join(", ")}`);

console.log(`\nIndex: ${search.size} chunks, built in ${buildMs} ms; avg query ${queryMs.toFixed(1)} ms`);
console.log(`Top-1 correct: ${at1}/${CASES.length} (${Math.round((at1 / CASES.length) * 100)}%)`);
console.log(`Top-3 correct: ${at3}/${CASES.length} (${Math.round((at3 / CASES.length) * 100)}%)`);
if (misses.length) console.log(`\nMisses:\n${misses.join("\n")}`);
