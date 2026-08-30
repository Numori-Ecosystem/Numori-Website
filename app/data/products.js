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
 * What it takes to use a product.
 *
 * - `local` — fully functional on-device with no account and no subscription.
 *   This is the default for anything whose data lives on your machine.
 *
 *   Note that `local` is about *payment*, not about accounts. Most local apps
 *   have key features that need a free Numori account — chiefly cross-device
 *   sync — and that is recorded separately in the `account` flag below. Conflating
 *   the two made the copy claim that paying is what adds sync, which is wrong:
 *   there are three levels, and only the third costs anything.
 * - `subscription` — needs infrastructure we have to run continuously, so it
 *   needs a paid plan or your own server. A mailbox has to receive mail while
 *   your laptop is shut; a form has to answer a public URL. There is no honest
 *   way to give those away.
 * - `infrastructure` — always free: shared services and open-source libraries
 *   that are not sold to anyone.
 */
export const ACCESS_LEVELS = ['local', 'subscription', 'infrastructure']

/**
 * @typedef {object} Product
 * @property {string} slug Stable URL segment and translation key.
 * @property {string} name Brand name. Deliberately not translated.
 * @property {string} repo Repository name within the GitHub organisation.
 * @property {string} icon MDI icon name, rendered through @nuxt/icon.
 * @property {string} accent Accent palette key; see ACCENTS in app/utils/accents.js.
 * @property {'apps'|'platform'|'developer'} category
 * @property {'beta'|'development'|'planned'} status
 * @property {'local'|'subscription'|'infrastructure'} access
 * @property {boolean} [account] Whether a free Numori account unlocks key
 *   features — almost always cross-device sync. Independent of `access`: an app
 *   can be free, need no account to be useful, and still be markedly better with
 *   one. When true, `products.<slug>.account` must exist in every locale.
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
    access: 'local',
    account: true,
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
    access: 'local',
    account: true,
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
    // A mail *client*, not a mail service: it talks to whatever mailbox you
    // already have over IMAP/SMTP, so it needs nothing from us. A Numori-hosted
    // mailbox is a separate product with its own pricing, and when it exists it
    // will be its own catalogue entry rather than a paid tier of this one.
    access: 'local',
    account: true,
    featured: true,
    // Deliberately no 'web': a browser cannot speak IMAP, so a webmail version
    // would need our server to proxy it, which would make it a hosted service.
    platforms: ['android', 'ios', 'macos', 'windows', 'linux'],
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
    // Drive is the storage quota, so it cannot exist without one.
    access: 'subscription',
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
    access: 'local',
    account: true,
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
    access: 'local',
    account: true,
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
    // Messages have to be held for a recipient who is not online.
    access: 'subscription',
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
    access: 'local',
    account: true,
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
    access: 'local',
    account: true,
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
    // A form is a public URL that has to stay up and collect replies.
    access: 'subscription',
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
    access: 'local',
    account: true,
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
    access: 'local',
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
    access: 'infrastructure',
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
    access: 'infrastructure',
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
    // Categorised as an app rather than platform: it is a monitoring service
    // subscribers use on their own sites, not only our internal health check. It
    // happens to run our status page too, which is the honest way to demonstrate
    // that a monitoring tool works.
    category: 'apps',
    status: 'planned',
    // Checks have to run while your machine is off, so it needs a server.
    access: 'subscription',
    featured: false,
    platforms: ['web', 'service', 'selfHosted'],
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
    access: 'infrastructure',
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
    access: 'infrastructure',
    featured: false,
    platforms: ['library'],
    url: null,
    perks: 4,
  },
  {
    slug: 'updater',
    name: 'Numori Updater',
    repo: 'Numori-Updater',
    icon: 'mdi:cloud-download-outline',
    accent: 'gray',
    // A developer tool, not internal plumbing: it is a ready-to-run
    // over-the-air update dashboard, where the alternatives are a paid hosted
    // service or building the dashboard yourself.
    category: 'developer',
    status: 'planned',
    // Distributing updates needs a server that is always reachable. Self-hosting
    // is a first-class option, which is why 'selfHosted' is listed.
    access: 'subscription',
    featured: false,
    platforms: ['service', 'selfHosted'],
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

/** Products with a given access level, preserving catalogue order. */
export const productsByAccess = (access) => products.filter((product) => product.access === access)

/**
 * Apps that never require a subscription. Used on the pricing page, where the
 * count is quoted in prose — deriving it here means the sentence cannot drift
 * out of step with the catalogue.
 */
export const freeApps = () =>
  products.filter((product) => product.category === 'apps' && product.access === 'local')

/**
 * Everything that needs a paid plan or self-hosting, across all categories.
 *
 * Not restricted to `category === 'apps'`, because Numori Updater is a developer
 * tool that still needs a server — filtering by category would have quietly left
 * a paid product off the pricing page.
 */
export const paidProducts = () => products.filter((product) => product.access === 'subscription')
