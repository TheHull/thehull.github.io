import { parse, ELEMENT_NODE, TEXT_NODE, type Node } from "ultrahtml";
import { decodeHTML, escapeAttribute, escapeText } from "entities";

const ignored = new Set(["script", "style", "pre", "img", "svg", "h1", "h2", "h3", "h4", "h5", "h6"]);
const blocks = new Set(["p", "li", "div", "blockquote", "br"]);

interface Segment { text: string; href?: string; }
interface Entry { rendered?: { html: string }; }
interface PreviewOptions { limit?: number; base?: string; permalink?: string; }

function segments(entry: Entry): Segment[] {
  const result: Segment[] = [];
  let whitespace = true;

  function append(value: string, href?: string) {
    let text = value.replace(/\s+/g, " ");
    if (whitespace) text = text.replace(/^ /, "");
    if (!text) return;
    result.push({ text, href });
    whitespace = text.endsWith(" ");
  }

  function visit(node: Node, href?: string) {
    if (node.type === TEXT_NODE) {
      append(decodeHTML(node.value), href);
      return;
    }
    if (node.type === ELEMENT_NODE && ignored.has(node.name)) return;
    if (node.type === ELEMENT_NODE && node.name === "a") {
      href = node.attributes.href ? decodeHTML(node.attributes.href).trim() : undefined;
    }
    if ("children" in node) node.children.forEach((child: Node) => visit(child, href));
    if (node.type === ELEMENT_NODE && blocks.has(node.name)) append(" ");
  }

  visit(parse(entry.rendered?.html ?? ""));
  return result;
}

function shorten(text: string, limit: number): string {
  if (text.length <= limit) return text;
  const prefix = text.slice(0, limit);
  return (prefix.replace(/\s+\S*$/, "") || prefix).trimEnd();
}

function linkHref(href: string, base: string, permalink: string): string | undefined {
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
  if (/^[a-z][a-z0-9+.-]*:|^\/\//i.test(href)) return undefined;
  const target = href.startsWith("/") ? base.replace(/\/$/, "") + href : href;
  const url = new URL(target, new URL(permalink, "https://preview.invalid"));
  return url.pathname + url.search + url.hash;
}

/** Plain text for page metadata. */
export function excerpt(entry: Entry, limit = 240): string {
  const text = segments(entry).map((part) => part.text).join("").trimEnd();
  const preview = shorten(text, limit);
  return preview + (preview.length < text.length ? "…" : "");
}

/** Keep links in visible previews; emit only escaped text and safe anchors. */
export function excerptHtml(entry: Entry, { limit = 240, base = "/", permalink = base }: PreviewOptions = {}): string {
  const parts = segments(entry);
  const text = parts.map((part) => part.text).join("").trimEnd();
  const preview = shorten(text, limit);
  let remaining = preview.length;
  let html = "";

  for (const part of parts) {
    if (remaining === 0) break;
    const value = part.text.slice(0, remaining);
    const href = part.href ? linkHref(part.href, base, permalink) : undefined;
    html += href ? '<a href="' + escapeAttribute(href) + '">' + escapeText(value) + "</a>" : escapeText(value);
    remaining -= value.length;
  }
  return html + (preview.length < text.length ? "…" : "");
}
