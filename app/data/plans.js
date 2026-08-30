/**
 * Subscription plans.
 *
 * The pricing model has one variable: how much storage you get. Every paid plan
 * unlocks every app on every platform — there is no feature matrix, no "Mail
 * Plus" versus "Drive Plus", and nothing to work out before you can buy.
 *
 * Storage is a single pool shared by every app, so a plan is a quota rather than
 * a bundle of per-app allowances.
 *
 * Storage sizes live here rather than in the locale files because "100 GB" is
 * written identically in every language we ship, and duplicating the numbers per
 * locale is how tiers quietly stop matching each other. Prices *are* per locale
 * (pounds and euros are different amounts, not translations of each other) and
 * live under `pricing.tiers.<key>` in `i18n/locales/`.
 */

/**
 * @typedef {object} Plan
 * @property {string} key Translation key under `pricing.tiers`.
 * @property {string} storage Human-readable quota, shared across all apps.
 * @property {number} people How many accounts the plan covers.
 * @property {boolean} highlighted Draws the accent border as the default choice.
 * @property {number} features How many feature strings exist for this plan.
 */

/**
 * The main ladder, in ascending order of storage. @type {Plan[]}
 *
 * Quotas are set so that every tier still clears its storage cost even if a
 * subscriber fills the quota completely. Hetzner SX capacity works out at roughly
 * £2.00–2.60 per TB per month once erasure coding and backups are accounted for,
 * so a tier needs to net more than that per TB after VAT and card fees. The
 * previous 4 TB and 8 TB tiers netted £1.77 and £1.49 per TB — below cost — and
 * heavy users self-select into exactly those tiers.
 */
export const PLANS = [
  { key: 'free', storage: '5 GB', people: 1, highlighted: false, features: 5 },
  { key: 'core', storage: '100 GB', people: 1, highlighted: false, features: 5 },
  { key: 'plus', storage: '500 GB', people: 1, highlighted: true, features: 5 },
  { key: 'max', storage: '2 TB', people: 1, highlighted: false, features: 5 },
]

/** Shown separately: same deal, split across several people. @type {Plan} */
export const FAMILY_PLAN = {
  key: 'family',
  storage: '3 TB',
  people: 6,
  highlighted: false,
  features: 4,
}

/**
 * Not really a plan — your hardware, your quota. Listed alongside the others
 * because it is a genuine option here rather than an enterprise footnote.
 */
export const SELF_HOSTED_PLAN = {
  key: 'selfHosted',
  storage: null,
  people: null,
  highlighted: false,
  features: 4,
}

/** Paying yearly costs ten months instead of twelve. */
export const YEARLY_MONTHS_CHARGED = 10
