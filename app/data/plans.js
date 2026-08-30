/**
 * Storage pricing.
 *
 * There are no plans, because there is nothing to put in them. Paying buys three
 * things and no others: storage (one pool shared across every app), extra accounts
 * to share it with, and direct support. Every feature, every app and every platform
 * is the same at every price, so the pricing page is a slider rather than tiers.
 *
 * Be careful with the copy here. The defensible claim is "never for features", not
 * "storage is the only variable" — seats change the price too, and an earlier
 * version of the site promised "no per-seat arithmetic" on the home page while
 * charging per seat on the pricing page.
 *
 * That is a deliberate constraint, not a simplification. The moment features are
 * split across price points there is always a next thing to sell — more domains,
 * longer version history, "priority" support — and the roadmap starts being
 * shaped by what can be withheld rather than what should exist.
 *
 * Note the shape of the support rule: it is a free/paid boundary, *not* a paid
 * gradient. Support is identical whether someone pays £1.50 or £20. A "priority"
 * level above it would be the same mistake in a new coat.
 *
 * Prices are plain numbers, formatted per locale by `formatMoney()`. Pounds and
 * euros are priced at numeral parity (£2 and 2 €) rather than converted, so a
 * single number serves both.
 */

/**
 * @typedef {object} StorageStep
 * @property {number} gb Quota in gigabytes; 1 TB is 1024.
 * @property {string} label Display label. Identical in every language we ship.
 * @property {number} price Monthly price, before VAT is subtracted and before
 *   the yearly discount is applied.
 */

/**
 * The slider's stops, ascending. The first is the free tier and is not on the
 * paid curve.
 *
 * The prices are hand-set rather than generated from a formula, because a formula
 * that produces nice round numbers at every stop does not exist. What is checked
 * is the *marginal* rate: each step up must charge more per additional TB than
 * that TB costs to run. Hetzner SX capacity is roughly £2.00–2.60 per TB per
 * month once erasure coding and backups are counted, and the tightest steps here
 * (1 TB → 2 TB and 2 TB → 4 TB) both charge about £3.23 per additional TB net of
 * VAT and card fees. If you change a price, re-check the step above and below it:
 * average revenue per TB can look healthy while a single step is sold at a loss.
 *
 * @type {StorageStep[]}
 */
export const STORAGE_STEPS = [
  // The free quota is deliberately small. Free accounts average a few hundred
  // megabytes — notes, tasks, a calendar and bookmarks are text — so the number
  // here is about what the free tier signals rather than what it costs: dropping
  // it from 5 GB to 2 GB saves roughly £18 a month at 130,000 accounts.
  { gb: 2, label: '2 GB', price: 0 },
  { gb: 50, label: '50 GB', price: 1.5 },
  { gb: 100, label: '100 GB', price: 2 },
  { gb: 250, label: '250 GB', price: 3 },
  { gb: 500, label: '500 GB', price: 5 },
  { gb: 1024, label: '1 TB', price: 8 },
  { gb: 2048, label: '2 TB', price: 12 },
  { gb: 3072, label: '3 TB', price: 16 },
  { gb: 4096, label: '4 TB', price: 20 },
]

/** Index the slider starts on. 500 GB — enough to be realistic, not the cheapest. */
export const DEFAULT_STEP_INDEX = 4

/** Index of the free step, which is excluded from the paid slider. */
export const FREE_STEP_INDEX = 0

/** The free quota, quoted in prose on the pricing and product pages. */
export const FREE_STORAGE = STORAGE_STEPS[FREE_STEP_INDEX].label

/**
 * Extra accounts. Each person gets their own private account; the storage quota
 * and the bill are shared.
 *
 * Priced as a small flat amount rather than by storage, because an extra account
 * costs almost nothing to run in itself — a row in the auth database and a little
 * more sync traffic. What it mostly covers is the support that a second person
 * generates, now that support is a paid benefit.
 */
export const PRICE_PER_EXTRA_PERSON = 1

/**
 * The floor of storage each person should have before adding another is silly.
 *
 * This is what ties seats to storage: splitting 50 GB twenty ways gives everyone
 * 2.5 GB, which is the free tier, so there would be no point paying. 25 GB is
 * enough for a mail archive and documents without being a photo library.
 */
export const MIN_STORAGE_PER_PERSON_GB = 25

/**
 * Absolute ceiling, regardless of how much storage is bought.
 *
 * Not a technical limit — 4 TB would allow 163 seats at the ratio above. It is a
 * product boundary. Past roughly this size a customer is an organisation, and
 * organisations want data processing agreements, single sign-on, audit logs and an
 * answer about support response times. Those are a different product, not a bigger
 * number on this slider, and pretending otherwise would sell 160 people a
 * consumer support promise.
 */
export const MAX_PEOPLE_CEILING = 50

/**
 * How many accounts a given quota may be split between.
 *
 * Always at least 1, so the free tier (below the per-person floor) still works.
 *
 * @param {number} gb Storage quota in gigabytes.
 * @returns {number}
 */
export const maxPeopleFor = (gb) =>
  Math.min(MAX_PEOPLE_CEILING, Math.max(1, Math.floor(gb / MIN_STORAGE_PER_PERSON_GB)))

/** Paying yearly costs ten months instead of twelve. */
export const YEARLY_MONTHS_CHARGED = 10

/** Months in a year, for turning a yearly total back into a monthly equivalent. */
export const MONTHS_PER_YEAR = 12

/**
 * Works out what a configuration costs.
 *
 * @param {object} options
 * @param {number} options.stepIndex Index into STORAGE_STEPS.
 * @param {number} [options.people=1] Total accounts, including the first.
 * @param {'monthly'|'yearly'} [options.billing='monthly']
 * @returns {{ storage: string, gb: number, monthly: number, yearlyTotal: number, isFree: boolean }}
 *   `monthly` is what is displayed: the true monthly price, or the monthly
 *   equivalent of the yearly price. `yearlyTotal` is the annual charge.
 */
export const quote = ({ stepIndex, people = 1, billing = 'monthly' }) => {
  const step = STORAGE_STEPS[stepIndex] ?? STORAGE_STEPS[DEFAULT_STEP_INDEX]

  // Clamped here rather than trusted from the caller, so a stale seat count left
  // over from a larger quota can never be quoted or charged for.
  const maxPeople = maxPeopleFor(step.gb)
  const clampedPeople = Math.min(maxPeople, Math.max(1, Math.floor(people) || 1))

  const extraPeople = clampedPeople - 1
  const baseMonthly = step.price + extraPeople * PRICE_PER_EXTRA_PERSON
  const yearlyTotal = baseMonthly * YEARLY_MONTHS_CHARGED

  return {
    storage: step.label,
    gb: step.gb,
    isFree: step.price === 0,
    people: clampedPeople,
    maxPeople,
    monthly: billing === 'yearly' ? yearlyTotal / MONTHS_PER_YEAR : baseMonthly,
    yearlyTotal,
  }
}
