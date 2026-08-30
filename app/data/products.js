/**
 * The Numori product catalogue.
 *
 * This file holds only the facts that do not change between languages: slugs,
 * repository names, icons, status, platforms and links. Every human-readable
 * string (tagline, summary, perks) lives in `i18n/locales/<locale>.json` under
 * `products.<slug>`, so adding a language never means touching this file.
 *
 * To add a product: append an entry here, then add the matching
 * `products.<slug>` block to every locale file. `npm run lint` will not catch a
 * missing translation, but the product page will fall back to the raw key, which
 * is obvious on sight.
 */

/** GitHub organisation that hosts every repository. */
export const GITHUB_ORG = 'https://github.com/Numori-Ecosystem'

/**
 * Lifecycle stages, in the order they should be displayed.
 * - `beta`        — usable today, still changing.
 * - `development` — code exists and is public, not yet usable.
 * - `planned`     — designed and committed to, no code yet.
 */
export const STATUSES = ['beta', 'development', 'planned']

/**
 * Product groupings, in display order.
 * - `apps`      — what you actually use day to day.
 * - `platform`  — the shared services the apps run on.
 * - `developer` — the building blocks we use to make the rest.
 */
export const CATEGORIES = ['apps', 'platform', 'developer']

/**
 * @typedef {object} Product
 * @property {string} slug Stable URL segment and translation key.
 * @property {string} name Brand name. Deliberately not translated.
 * @property {string} repo Repository name within the GitHub organisation.
 * @property {string} icon MDI icon name, rendered through @nuxt/icon.
 * @property {string} accent Accent palette key; see ACCENTS in ProductIcon.vue.
 * @property {'apps'|'platform'|'developer'} category
 * @property {'beta'|'development'|'planned'} status
 * @property {boolean} featured Whether it appears on the home page.
 * @property {string[]} platforms Platform keys, translated via `platforms.<key>`.
 * @property {string|null} url Live product URL, or null when not yet shipped.
 * @property {number} perks How many perk strings exist for this product.
 */

/** @type {Product[]} */
export const products = [
  // ── Apps ────────────────────────────────────────────────────────
  {
    slug: 'notes',
    name: 'Numori Notes',
    repo: 'Numori-Notes',
    icon: 'mdi:note-text-outline',
    accent: 'primary',
    category: 'apps',
    status: 'beta',
    featured: true,
    platforms: ['web', 'android', 'ios', 'macos', 'windows', 'linux'],
    url: 'https://notes.numori.app',
    perks: 4,
  },
  {
    slug: 'clips',
    name: 'Numori Clips',
    repo: 'Numori-Clips',
    icon: 'mdi:clipboard-text-multiple-outline',
    accent: 'amber',
    category: 'apps',
    status: 'beta',
    featured: true,
    platforms: ['android', 'ios', 'macos', 'windows', 'linux'],
    url: null,
    perks: 4,
  },
  {
    slug: 'mail',
    name: 'Numori Mail',
    repo: 'Numori-Mail',
    icon: 'mdi:email-outline',
    accent: 'sky',
    category: 'apps',
    status: 'planned',
    featured: true,
    platforms: ['web', 'android', 'ios', 'macos', 'windows', 'linux'],
    url: null,
    perks: 4,
  },
  {
    slug: 'drive',
    name: 'Numori Drive',
    repo: 'Numori-Drive',
    icon: 'mdi:cloud-lock-outline',
    accent: 'teal',
    category: 'apps',
    status: 'planned',
    featured: true,
    platforms: ['web', 'android', 'ios', 'macos', 'windows', 'linux'],
    url: null,
    perks: 4,
  },
  {
    slug: 'calendar',
    name: 'Numori Calendar',
    repo: 'Numori-Calendar',
    icon: 'mdi:calendar-outline',
    accent: 'rose',
    category: 'apps',
    status: 'planned',
    featured: true,
    platforms: ['web', 'android', 'ios', 'macos', 'windows', 'linux'],
    url: null,
    perks: 4,
  },
  {
    slug: 'tasks',
    name: 'Numori Tasks',
    repo: 'Numori-Tasks',
    icon: 'mdi:format-list-checks',
    accent: 'success',
    category: 'apps',
    status: 'planned',
    featured: true,
    platforms: ['web', 'android', 'ios', 'macos', 'windows', 'linux'],
    url: null,
    perks: 4,
  },
  {
    slug: 'chat',
    name: 'Numori Chat',
    repo: 'Numori-Chat',
    icon: 'mdi:chat-outline',
    accent: 'violet',
    category: 'apps',
    status: 'planned',
    featured: false,
    platforms: ['web', 'android', 'ios', 'macos', 'windows', 'linux'],
    url: null,
    perks: 4,
  },
  {
    slug: 'marks',
    name: 'Numori Marks',
    repo: 'Numori-Marks',
    icon: 'mdi:bookmark-outline',
    accent: 'orange',
    category: 'apps',
    status: 'planned',
    featured: false,
    platforms: ['web', 'android', 'ios', 'browser'],
    url: null,
    perks: 4,
  },
  {
    slug: 'sheets',
    name: 'Numori Sheets',
    repo: 'Numori-Sheets',
    icon: 'mdi:table-large',
    accent: 'success',
    category: 'apps',
    status: 'planned',
    featured: false,
    platforms: ['web', 'macos', 'windows', 'linux'],
    url: null,
    perks: 4,
  },
  {
    slug: 'forms',
    name: 'Numori Forms',
    repo: 'Numori-Forms',
    icon: 'mdi:form-select',
    accent: 'indigo',
    category: 'apps',
    status: 'planned',
    featured: false,
    platforms: ['web'],
    url: null,
    perks: 4,
  },
  {
    slug: 'finance',
    name: 'Numori Finance',
    repo: 'Numori-Finance',
    icon: 'mdi:wallet-outline',
    accent: 'teal',
    category: 'apps',
    status: 'planned',
    featured: false,
    platforms: ['web', 'android', 'ios', 'macos', 'windows', 'linux'],
    url: null,
    perks: 4,
  },
  {
    slug: 'pdf',
    name: 'Numori PDF',
    repo: 'Numori-PDF',
    icon: 'mdi:file-pdf-box',
    accent: 'error',
    category: 'apps',
    status: 'planned',
    featured: false,
    platforms: ['web', 'macos', 'windows', 'linux'],
    url: null,
    perks: 4,
  },

  // ── Platform ────────────────────────────────────────────────────
  {
    slug: 'auth',
    name: 'Numori Auth',
    repo: 'Numori-Auth',
    icon: 'mdi:shield-key-outline',
    accent: 'sky',
    category: 'platform',
    status: 'planned',
    featured: false,
    platforms: ['service'],
    url: null,
    perks: 4,
  },
  {
    slug: 'crdt',
    name: 'Numori CRDT',
    repo: 'Numori-CRDT',
    icon: 'mdi:sync',
    accent: 'violet',
    category: 'platform',
    status: 'development',
    featured: false,
    platforms: ['service', 'selfHosted'],
    url: null,
    perks: 4,
  },
  {
    slug: 'pulse',
    name: 'Numori Pulse',
    repo: 'Numori-Pulse',
    icon: 'mdi:pulse',
    accent: 'success',
    category: 'platform',
    status: 'planned',
    featured: false,
    platforms: ['web', 'service'],
    url: null,
    perks: 4,
  },
  {
    slug: 'updater',
    name: 'Numori Updater',
    repo: 'Numori-Updater',
    icon: 'mdi:cloud-download-outline',
    accent: 'gray',
    category: 'platform',
    status: 'planned',
    featured: false,
    platforms: ['service'],
    url: null,
    perks: 4,
  },

  // ── Developer ───────────────────────────────────────────────────
  {
    slug: 'ui',
    name: 'Numori UI',
    repo: 'Numori-UI',
    icon: 'mdi:palette-swatch-outline',
    accent: 'primary',
    category: 'developer',
    status: 'development',
    featured: false,
    platforms: ['library'],
    url: null,
    perks: 4,
  },
  {
    slug: 'template',
    name: 'Numori Template',
    repo: 'Numori-Template',
    icon: 'mdi:package-variant-closed',
    accent: 'gray',
    category: 'developer',
    status: 'planned',
    featured: false,
    platforms: ['library'],
    url: null,
    perks: 4,
  },
]

/** Repository URL for a product. */
export const repoUrl = (product) => `${GITHUB_ORG}/${product.repo}`

/** Look a product up by slug. Returns `undefined` when unknown. */
export const findProduct = (slug) => products.find((product) => product.slug === slug)

/** Products in a category, preserving catalogue order. */
export const productsByCategory = (category) =>
  products.filter((product) => product.category === category)
