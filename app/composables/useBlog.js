import { DEFAULT_LOCALE, blogCollection, formatDate } from '~/utils/site'

/**
 * Blog data access, with per-locale collections and a fallback to English.
 *
 * Every `useAsyncData` key below includes the locale. This is not cosmetic: the
 * keys are the identity of the cached payload, and a key of `blog-post-<slug>`
 * is shared by `/blog/x` and `/es-ES/blog/x`. Prerendering both wrote one
 * payload for both, and the English pages ended up serving Spanish content.
 *
 * Drafts are filtered in JavaScript rather than in the query: the content
 * database stores booleans as integers, so `.where('draft', '=', false)` is easy
 * to get subtly wrong, and the post count here is small enough not to matter.
 */

/** Strips drafts and sorts newest first. */
const publishedFirst = (posts) =>
  (posts ?? []).filter((post) => !post.draft).sort((a, b) => new Date(b.date) - new Date(a.date))

/**
 * Reactive list of published posts for the active locale.
 *
 * @param {object} [options]
 * @param {number} [options.limit] Maximum number of posts to return.
 * @param {string} [options.tag] Only return posts carrying this tag.
 * @example
 * const { data: posts } = await usePostList({ limit: 3 })
 */
export const usePostList = (options = {}) => {
  const { locale } = useI18n()
  const { limit, tag } = options

  return useAsyncData(
    `blog-list-${locale.value}-${limit ?? 'all'}-${tag ?? 'any'}`,
    async () => {
      const posts = publishedFirst(await queryCollection(blogCollection(locale.value)).all())
      const filtered = tag ? posts.filter((post) => post.tags?.includes(tag)) : posts
      return limit ? filtered.slice(0, limit) : filtered
    },
    { watch: [locale], default: () => [] },
  )
}

/**
 * A single post by slug, falling back to the English original when the active
 * locale has no translation. `translated` tells the page which it got, so it can
 * show a notice rather than silently switching language on the reader.
 *
 * @param {import('vue').Ref<string>|string} slug
 */
export const usePost = (slug) => {
  const { locale } = useI18n()
  const path = computed(() => `/blog/${unref(slug)}`)

  return useAsyncData(
    `blog-post-${locale.value}-${unref(slug)}`,
    async () => {
      const inLocale = await queryCollection(blogCollection(locale.value)).path(path.value).first()

      if (inLocale) return { post: inLocale, translated: true }

      if (locale.value === DEFAULT_LOCALE) return { post: null, translated: true }

      const fallback = await queryCollection(blogCollection(DEFAULT_LOCALE))
        .path(path.value)
        .first()

      return { post: fallback, translated: false }
    },
    { watch: [locale] },
  )
}

/**
 * Every tag used by published posts in the active locale, with counts, ordered
 * by how often they appear.
 */
export const usePostTags = () => {
  const { locale } = useI18n()

  return useAsyncData(
    `blog-tags-${locale.value}`,
    async () => {
      const posts = publishedFirst(await queryCollection(blogCollection(locale.value)).all())
      const counts = new Map()

      for (const post of posts) {
        for (const tag of post.tags ?? []) {
          counts.set(tag, (counts.get(tag) ?? 0) + 1)
        }
      }

      return [...counts.entries()]
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    },
    { watch: [locale], default: () => [] },
  )
}

/** Locale-aware date formatter bound to the active locale. */
export const useDateFormat = () => {
  const { locale } = useI18n()
  return (value) => formatDate(value, locale.value)
}
