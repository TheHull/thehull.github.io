import { getCollection, type CollectionEntry } from "astro:content";
import { contentDate } from "./dates";

export type Event = CollectionEntry<"events">;
export function eventDate(event: Event): string {
  return contentDate(event.id);
}
/** Events move to the archive the following day in Europe/Rome, at build time. */
export async function getEvents(now = new Date()) {
  const all = await getCollection("events");
  for (const event of all) eventDate(event);
  const today = new Intl.DateTimeFormat("en-CA", {
    year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Europe/Rome",
  }).format(now);
  const upcoming = all.filter((entry) => entry.id >= today).sort((a, b) => a.id.localeCompare(b.id));
  const past = all.filter((entry) => entry.id < today).sort((a, b) => b.id.localeCompare(a.id));
  return { upcoming, past };
}
