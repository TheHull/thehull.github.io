import { getEntry } from "astro:content";

export async function getPage(id: string) {
  const page = await getEntry("pages", id);
  if (!page) throw new Error("Missing src/content/pages/" + id + ".md");
  return page;
}
