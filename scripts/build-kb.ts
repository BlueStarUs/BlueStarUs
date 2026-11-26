/**
 * Writes the chatbot knowledge as an OKF (Open Knowledge Format v0.3) bundle
 * into `kb/`, so people can read exactly what the bot knows.
 *
 *   npm run kb:build
 *
 * The bot itself does not read these files: at runtime the same pages are
 * built in memory from the site data. `kb/` is generated and git-ignored.
 */

import fs from "node:fs";
import path from "node:path";
import { BLOG_POSTS } from "@/lib/blogs-data";
import { SUCCESS_STORIES } from "@/lib/stories-data";
import { buildKnowledgePages, toOkfMarkdown, type KnowledgePage } from "@/lib/chatbot/knowledge";
import { chunkPages } from "@/lib/chatbot/search";

const OUT_DIR = path.resolve(process.cwd(), "kb");

function main() {
  const generatedAt = new Date().toISOString();
  const pages = buildKnowledgePages({ blogs: BLOG_POSTS, stories: SUCCESS_STORIES });

  fs.rmSync(OUT_DIR, { recursive: true, force: true });

  const byFolder = new Map<string, KnowledgePage[]>();
  for (const page of pages) {
    const file = path.join(OUT_DIR, `${page.id}.md`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, toOkfMarkdown(page, generatedAt), "utf8");
    const folder = page.id.split("/")[0];
    byFolder.set(folder, [...(byFolder.get(folder) ?? []), page]);
  }

  // Bundle-root index (the only index.md allowed to carry frontmatter).
  const rootIndex = [
    "---",
    'okf_version: "0.3"',
    'title: "Blue Stars chatbot knowledge"',
    'description: "Generated from the website data by scripts/build-kb.ts. Do not edit by hand: changes are overwritten on the next build."',
    "---",
    "",
    ...[...byFolder.keys()].sort().map((f) => `* [${f}](${f}/index.md) - ${byFolder.get(f)!.length} pages`),
    "",
  ].join("\n");
  fs.writeFileSync(path.join(OUT_DIR, "index.md"), rootIndex, "utf8");

  for (const [folder, folderPages] of byFolder) {
    const body = folderPages
      .map((p) => `* [${p.title.replace(/[[\]]/g, "")}](${p.id.split("/").slice(1).join("/")}.md) - ${p.type}`)
      .join("\n");
    fs.writeFileSync(path.join(OUT_DIR, folder, "index.md"), `${body}\n`, "utf8");
  }

  const chunks = chunkPages(pages);
  const chars = chunks.reduce((n, c) => n + c.text.length, 0);
  console.log(`Wrote ${pages.length} pages to kb/ (${chunks.length} search chunks, ~${Math.round(chars / 4 / 1000)}K tokens of text).`);
  for (const [folder, folderPages] of [...byFolder.entries()].sort()) console.log(`  ${folder.padEnd(10)} ${folderPages.length}`);
}

main();
