/**
 * Ways to donate.
 *
 * Ported from the "Support the Project" panel in Numori Notes
 * (`components/AboutModal.vue`) so the two stay in step — if you add a platform
 * here, add it there too.
 *
 * Several options rather than one because donation platforms are unevenly
 * available and unevenly trusted: GitHub Sponsors is easiest for developers,
 * Liberapay is the option that takes no cut, PayPal is the one everyone's parents
 * already have. Fees differ, so the order below is roughly "best value to us
 * first" without making a fuss about it on the page.
 *
 * Deliberately no donor tiers, badges or rewards. A donation given in exchange
 * for something is a sale, which drags it inside the scope of VAT and turns a gift
 * into a transaction. Keeping it unrequited keeps it simple, and keeps it honest.
 */

/**
 * @typedef {object} DonationMethod
 * @property {string} key Stable key; also the translation key for its note.
 * @property {string} label Platform name. Not translated.
 * @property {string} icon MDI icon name.
 * @property {string} url Destination.
 * @property {string} colour Tailwind text colour for the icon, written in full so
 *   Tailwind can see it.
 * @property {boolean} recurring Whether it supports a monthly commitment.
 */

/** @type {DonationMethod[]} */
export const DONATION_METHODS = [
  {
    key: 'githubSponsors',
    label: 'GitHub Sponsors',
    icon: 'mdi:github',
    url: 'https://github.com/sponsors/numori',
    colour: 'text-primary-500',
    recurring: true,
  },
  {
    key: 'liberapay',
    label: 'Liberapay',
    icon: 'mdi:currency-eur',
    url: 'https://liberapay.com/numori',
    colour: 'text-warning-500',
    recurring: true,
  },
  {
    key: 'kofi',
    label: 'Ko-fi',
    icon: 'mdi:coffee-outline',
    url: 'https://ko-fi.com/numori',
    colour: 'text-sky-500',
    recurring: true,
  },
  {
    key: 'patreon',
    label: 'Patreon',
    icon: 'mdi:patreon',
    url: 'https://patreon.com/numori',
    colour: 'text-orange-500',
    recurring: true,
  },
  {
    key: 'donorbox',
    label: 'Donorbox',
    icon: 'mdi:gift-outline',
    url: 'https://donorbox.org/numori',
    colour: 'text-teal-500',
    recurring: true,
  },
  {
    key: 'paypal',
    label: 'PayPal',
    icon: 'mdi:hand-coin-outline',
    url: 'https://paypal.me/numori',
    colour: 'text-blue-600',
    recurring: false,
  },
]
