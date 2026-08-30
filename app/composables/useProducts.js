import { CATEGORIES, STATUSES, products as catalogue, findProduct, repoUrl } from '~/data/products'

/**
 * Joins the language-independent product catalogue to the active locale's copy.
 *
 * `app/data/products.js` holds the facts; `i18n/locales/*.json` holds the words.
 * This composable is the only place the two are stitched together, so a page
 * never has to know the shape of a translation key.
 *
 * @example
 * const { featured, decorate, perksOf } = useProducts()
 */
export const useProducts = () => {
  const { t } = useI18n()
  const localePath = useLocalePath()

  /**
   * Adds the translated strings and resolved links to a raw catalogue entry.
   *
   * @param {object} product Entry from the product catalogue.
   * @returns {object} The entry plus `tagline`, `summary`, `to`, `repo` and `statusLabel`.
   */
  const decorate = (product) => ({
    ...product,
    tagline: t(`products.${product.slug}.tagline`),
    summary: t(`products.${product.slug}.summary`),
    statusLabel: t(`status.${product.status}`),
    accessLabel: t(`access.${product.access}`),
    categoryLabel: t(`categories.${product.category}.short`),
    to: localePath(`/products/${product.slug}`),
    // `repo` stays the repository *name* (e.g. 'Numori-Notes'); the full URL is
    // a separate field so both are available without one shadowing the other.
    repoUrl: repoUrl(product),
  })

  /**
   * The perk list for a product, resolved from `products.<slug>.perks.<n>`.
   *
   * The count lives on the catalogue entry rather than being discovered from the
   * messages, because vue-i18n resolves a missing key to the key itself instead
   * of throwing — iterating blindly would render key paths as copy.
   *
   * @param {object} product Entry from the product catalogue.
   * @returns {{ title: string, body: string }[]}
   */
  const perksOf = (product) =>
    Array.from({ length: product.perks }, (_, index) => {
      const base = `products.${product.slug}.perks.${index + 1}`
      return { title: t(`${base}.title`), body: t(`${base}.body`) }
    })

  /** Every product, in catalogue order, with translations applied. */
  const all = computed(() => catalogue.map(decorate))

  /** The subset shown on the home page. */
  const featured = computed(() => all.value.filter((product) => product.featured))

  /** Categories paired with their products, skipping any that are empty. */
  const grouped = computed(() =>
    CATEGORIES.map((category) => ({
      key: category,
      title: t(`categories.${category}.title`),
      description: t(`categories.${category}.description`),
      products: all.value.filter((product) => product.category === category),
    })).filter((group) => group.products.length > 0),
  )

  /** Status keys with a translated label and a count, for the index filters. */
  const statusOptions = computed(() =>
    STATUSES.map((status) => ({
      value: status,
      label: t(`status.${status}`),
      count: catalogue.filter((product) => product.status === status).length,
    })),
  )

  /**
   * Look a product up by slug and decorate it.
   *
   * @param {string} slug
   * @returns {object|null} The decorated product, or null when the slug is unknown.
   */
  const find = (slug) => {
    const product = findProduct(slug)
    return product ? decorate(product) : null
  }

  /**
   * Other products worth showing alongside `slug`: same category first, then
   * whatever else is furthest along, capped at `limit`.
   *
   * @param {string} slug Product to exclude.
   * @param {number} [limit=3]
   */
  const related = (slug) => {
    const current = findProduct(slug)
    if (!current) return []

    const rank = (product) => STATUSES.indexOf(product.status)
    const others = catalogue.filter((product) => product.slug !== slug)
    const sameCategory = others.filter((product) => product.category === current.category)
    const rest = others.filter((product) => product.category !== current.category)

    return [
      ...sameCategory.sort((a, b) => rank(a) - rank(b)),
      ...rest.sort((a, b) => rank(a) - rank(b)),
    ]
      .slice(0, 3)
      .map(decorate)
  }

  return {
    all,
    featured,
    grouped,
    statusOptions,
    total: catalogue.length,
    decorate,
    perksOf,
    find,
    related,
  }
}
