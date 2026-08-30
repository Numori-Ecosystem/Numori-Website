import { defineContentConfig, defineCollection, z } from '@nuxt/content'

/**
 * One blog collection per locale. Nuxt Content has no built-in locale
 * awareness, so the convention is a collection per language and a lookup keyed
 * by the active locale (see app/composables/useBlog.js).
 *
 * Content lives at `content/<locale>/blog/<slug>.md` and is served at
 * `/blog/<slug>` (or `/es-ES/blog/<slug>` once i18n adds the route prefix).
 */
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  author: z.string().default('Numori'),
  tags: z.array(z.string()).default([]),
  /** Marks a post as unpublished: filtered out of listings and of the sitemap. */
  draft: z.boolean().default(false),
  /** Rough reading time in minutes, shown on cards. */
  minutes: z.number().default(5),
})

export default defineContentConfig({
  collections: {
    blog_en: defineCollection({
      type: 'page',
      source: {
        include: 'en-GB/blog/**/*.md',
        prefix: '/blog',
      },
      schema: blogSchema,
    }),
    blog_es: defineCollection({
      type: 'page',
      source: {
        include: 'es-ES/blog/**/*.md',
        prefix: '/blog',
      },
      schema: blogSchema,
    }),
  },
})
