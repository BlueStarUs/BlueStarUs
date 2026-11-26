import { getAdminBlogs, getAdminStories } from "@/lib/admin-store";
import { buildKnowledgePages } from "./knowledge";
import { KnowledgeSearch } from "./search";

/** Rebuild at most every 5 minutes so admin edits to blogs/stories reach the bot without a redeploy. */
const TTL_MS = 5 * 60 * 1000;

let cached: { search: KnowledgeSearch; builtAt: number } | null = null;
let building: Promise<KnowledgeSearch> | null = null;

async function build(): Promise<KnowledgeSearch> {
  const [blogs, stories] = await Promise.all([getAdminBlogs(), getAdminStories()]);
  const search = new KnowledgeSearch(buildKnowledgePages({ blogs, stories }));
  cached = { search, builtAt: Date.now() };
  return search;
}

export async function getKnowledgeSearch(): Promise<KnowledgeSearch> {
  if (cached && Date.now() - cached.builtAt < TTL_MS) return cached.search;
  if (!building) {
    building = build().finally(() => {
      building = null;
    });
  }
  // Serve the stale index while a rebuild runs; only the very first request waits.
  return cached ? cached.search : building;
}
