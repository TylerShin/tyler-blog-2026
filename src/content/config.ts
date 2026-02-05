import { defineCollection, z } from "astro:content"

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
})

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    // i18n support
    lang: z.enum(["ko", "en"]).default("ko"),
    translationKey: z.string().optional(), // shared key to link translated posts
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
  }),
})

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
  }),
})

const legal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
})

const picks = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(["book", "video", "article", "general"]),
    description: z.string().optional(),
    url: z.string().optional(),
    lang: z.enum(["ko", "en"]).default("ko"),
    translationKey: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
})

const gear = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    rating: z.union([z.number(), z.string()]).optional(),
    lang: z.enum(["ko", "en"]).default("ko"),
    translationKey: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
})

export const collections = { work, blog, projects, legal, picks, gear }
