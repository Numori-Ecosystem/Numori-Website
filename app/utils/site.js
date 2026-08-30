/** The locale used when a translation or a piece of content is missing. */
export const DEFAULT_LOCALE = 'en-GB'

/**
 * Nuxt Content has no locale awareness, so each language gets its own
 * collection (see content.config.ts). The collection name is derived from the
 * language subtag of the locale code, so `es-ES` reads from `blog_es`.
 *
 * @param {string} localeCode e.g. 'es-ES'
 * @returns {string} e.g. 'blog_es'
 */
export const blogCollection = (localeCode) => `blog_${String(localeCode).split('-')[0]}`

/**
 * Formats an ISO date for display in the given locale. Falls back to the raw
 * string if the date cannot be parsed, which is better than rendering
 * "Invalid Date" on a published page.
 *
 * @param {string} value ISO 8601 date.
 * @param {string} localeCode BCP 47 locale tag.
 * @returns {string}
 */
export const formatDate = (value, localeCode = DEFAULT_LOCALE) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value ?? '')

  return new Intl.DateTimeFormat(localeCode, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
