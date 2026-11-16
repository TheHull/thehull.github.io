import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const homepage = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/homepage" }),
});

const image = z.object({ src: z.string().min(1), alt: z.string() }).optional();

const events = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    type: z.string(),
    image,
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    image,
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    upcoming: z.string().optional(),
    past: z.string().optional(),
    all: z.string().optional(),
    empty: z.string().optional(),
    back: z.string().optional(),
  }),
});

export const collections = { homepage, pages, events, news };
