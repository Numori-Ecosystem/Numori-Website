/**
 * Social card image, relative to the site root.
 *
 * Set to `null` deliberately. The artwork exists at `public/og/default.svg`, but
 * essentially no social platform will render an SVG as a card image, and pointing
 * `og:image` at a file that fails to load is worse than having no image tag: the
 * card silently degrades and you have no way of knowing. Export that SVG to a
 * 1200×630 PNG at `public/og/default.png`, set this to `/og/default.png`, and the
 * summary card upgrades to a large image automatically.
 */
const OG_IMAGE = null

/**
 * Per-page SEO metadata, with the locale-aware bits filled in automatically.
 *
 * `useLocaleHead()` (called once in app.vue) already handles `<html lang>`,
 * canonical and hreflang alternates. This composable covers what is left: the
 * title, the description and the social cards. `useSeoMeta` is used rather than a
 * hand-written meta array because it emits OpenGraph tags with the `property`
 * attribute the spec asks for, which the other Numori projects get wrong.
 *
 * Pass a function instead of an object when the values depend on data fetched in
 * the same setup, so the tags update once it resolves.
 *
 * @example
 * usePageSeo({ title: t('home.meta.title'), description: t('home.meta.description') })
 *
 * @example Reactive, on a dynamic route
 * usePageSeo(() => ({ title: product.value.name, description: product.value.summary }))
 */
export const usePageSeo = (options) => {
  const { t } = useI18n()
  const { public: runtime } = useRuntimeConfig()

  const resolved = computed(() => ({
    type: 'website',
    image: OG_IMAGE,
    noindex: false,
    ...(typeof options === 'function' ? options() : options),
  }))

  const absolute = (path) => new URL(path, runtime.siteUrl).toString()

  useSeoMeta({
    title: () => resolved.value.title,
    description: () => resolved.value.description,

    ogSiteName: t('site.name'),
    ogType: () => resolved.value.type,
    ogTitle: () => resolved.value.title,
    ogDescription: () => resolved.value.description,

    // `og:url` and `og:locale` are deliberately absent: @nuxtjs/i18n emits them
    // in strictSeo mode, and duplicating them here produced two of each tag.

    // `useSeoMeta` omits a tag entirely when its value is null, so these three
    // disappear rather than emitting empty attributes while OG_IMAGE is unset.
    ogImage: () => (resolved.value.image ? absolute(resolved.value.image) : null),
    ogImageAlt: () => (resolved.value.image ? resolved.value.title : null),
    twitterImage: () => (resolved.value.image ? absolute(resolved.value.image) : null),

    twitterCard: () => (resolved.value.image ? 'summary_large_image' : 'summary'),
    twitterTitle: () => resolved.value.title,
    twitterDescription: () => resolved.value.description,

    // Used on placeholder legal pages and anything else not worth indexing yet.
    robots: () => (resolved.value.noindex ? 'noindex, follow' : 'index, follow'),
  })
}
