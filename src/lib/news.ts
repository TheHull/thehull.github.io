import { getCollection } from "astro:content";
import { contentDate } from "./dates";
export async function getNews() {
  const news = await getCollection("news");
  for (const entry of news) contentDate(entry.id);
  return news.sort((a, b) => b.id.localeCompare(a.id));
}
