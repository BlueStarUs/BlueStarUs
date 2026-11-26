/**
 * Minimal HTML -> plain text helpers for building chatbot knowledge.
 * Blog posts are stored as HTML; the bot only needs clean readable text.
 */

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "-",
  mdash: "-",
  hellip: "...",
  rsquo: "'",
  lsquo: "'",
  rdquo: '"',
  ldquo: '"',
  copy: "(c)",
  reg: "(R)",
  trade: "(TM)",
  bull: "-",
  middot: "-",
};

export function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === "#") {
      const num = code[1] === "x" || code[1] === "X" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(num) ? String.fromCodePoint(num) : match;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}

/** Normalise typographic characters so search and TTS see plain text. */
export function normaliseText(text: string): string {
  return text
    .replace(/[‘’‛]/g, "'")
    .replace(/[“”‟]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/ /g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Converts an HTML fragment to plain text, keeping paragraph and list breaks. */
export function htmlToText(html: string): string {
  const text = html
    .replace(/<(script|style|noscript|iframe|svg)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/(p|div|li|ul|ol|h[1-6]|blockquote|tr|table|figure|section)>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
  return normaliseText(decodeEntities(text));
}

export interface HtmlSection {
  heading: string;
  text: string;
}

/**
 * Splits an HTML document into sections at <h2>/<h3> headings.
 * Content before the first heading becomes a section with an empty heading.
 */
export function splitHtmlSections(html: string): HtmlSection[] {
  const sections: HtmlSection[] = [];
  const headingRe = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let lastIndex = 0;
  let currentHeading = "";
  let match: RegExpExecArray | null;

  while ((match = headingRe.exec(html)) !== null) {
    const body = htmlToText(html.slice(lastIndex, match.index));
    if (body) sections.push({ heading: currentHeading, text: body });
    currentHeading = htmlToText(match[2]);
    lastIndex = match.index + match[0].length;
  }
  const tail = htmlToText(html.slice(lastIndex));
  if (tail) sections.push({ heading: currentHeading, text: tail });
  return sections;
}
