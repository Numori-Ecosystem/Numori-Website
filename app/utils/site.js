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
 * Billing currency per locale.
 *
 * These are prices, not conversions: we charge £2 in the UK and 2 € in Spain
 * rather than converting one into the other, so the same number in
 * `app/data/plans.js` serves both. Add a locale here when you add one to
 * `nuxt.config.ts`, or its prices will be quoted in pounds.
 */
export const CURRENCIES = {
  'en-GB': 'GBP',
  'es-ES': 'EUR',
}

/**
 * Formats a price for display in the given locale.
 *
 * Whole amounts drop the decimals (£2, not £2.00) while fractional ones keep two
 * (£1.50, £4.17), which is how prices are normally written and avoids a slider
 * that reads "£2.00" at one stop and "£1.50" at the next.
 *
 * @param {number} amount
 * @param {string} localeCode BCP 47 locale tag.
 * @returns {string}
 */
export const formatMoney = (amount, localeCode = DEFAULT_LOCALE) => {
  const value = Number(amount) || 0
  const decimals = Number.isInteger(value) ? 0 : 2

  return new Intl.NumberFormat(localeCode, {
    style: 'currency',
    currency: CURRENCIES[localeCode] ?? CURRENCIES[DEFAULT_LOCALE],
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

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
