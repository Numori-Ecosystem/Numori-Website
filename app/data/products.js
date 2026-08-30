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
 * Lifecycle stages, ordered most advanced first. That order drives the filter on
 * the products index and the ranking in `useProducts().related()`, so it is
 * load-bearing rather than cosmetic.
 *
 * - `alpha`       — usable, and rough. Bugs and breaking changes expected.
 * - `preAlpha`    — runs, but incomplete and changing without warning.
 * - `development` — being built, not usable yet. The code is public regardless.
 *
 * There is deliberately no `beta` or `stable` yet. Adding one is a claim about
 * quality, and it should be made when it is true rather than kept warm in an enum.
 */
export const STATUSES = ['alpha', 'preAlpha', 'development']

/**
 * Statuses a visitor can actually install and use today. Drives whether a product
 * page shows a "try it, but" note or a "this is a placeholder" one.
 */
export const USABLE_STATUSES = ['alpha', 'preAlpha']

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
 * **No product requires a paid subscription.** Paying adds storage, direct
 * support and extra seats — never access to an app. So this axis is about
 * *accounts*, not payment.
 *
 * - `local` — works in full with no account at all. The default for anything whose
 *   data lives on your machine. Many are better signed in, because a free account
 *   adds sync; that is the separate `syncsWithAccount` flag below.
 * - `account` — needs a Numori account, and a **free** one is enough. These run on
 *   a server that stays awake while your devices do not, so it has to know whose
 *   data is whose. They draw on the same free quota as everything else.
 * - `infrastructure` — not sold to anyone: shared services and open-source
 *   libraries.
 *
 * This axis previously had a `subscription` value where `account` now sits, which
 * produced a pricing page announcing that five services "genuinely need" a plan.
 * They never did.
 */
export const ACCESS_LEVELS = ['local', 'account', 'infrastructure']

/**
 * @typedef {object} Product
 * @property {string} slug Stable URL segment and translation key.
 * @property {string} name Brand name. Deliberately not translated.
 * @property {string} repo Repository name within the GitHub organisation.
 * @property {string} icon MDI icon name, rendered through @nuxt/icon.
 * @property {string} accent Accent palette key; see ACCENTS in app/utils/accents.js.
 * @property {'apps'|'platform'|'developer'} category
 * @property {'alpha'|'preAlpha'|'development'} status
 * @property {'local'|'account'|'infrastructure'} access
 * @property {boolean} [syncsWithAccount] Whether a free Numori account adds key
 *   features — almost always cross-device sync. Distinct from `access: 'account'`,
 *   which means the app cannot run without one at all. When true,
 *   `products.<slug>.account` must exist in every locale.
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
    status: 'alpha',
    access: 'local',
    syncsWithAccount: true,
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
    status: 'preAlpha',
    access: 'local',
    syncsWithAccount: true,
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
    status: 'development',
    // A mail *client*, not a mail service: it talks to whatever mailbox you
    // already have over IMAP/SMTP, so it needs nothing from us. A Numori-hosted
    // mailbox is a separate product with its own pricing, and when it exists it
    // will be its own catalogue entry rather than a paid tier of this one.
    access: 'local',
    syncsWithAccount: true,
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
    status: 'development',
    // Drive is the storage quota itself, so it needs an account to attach it to.
    access: 'account',
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
    status: 'development',
    access: 'local',
    syncsWithAccount: true,
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
    status: 'development',
    access: 'local',
    syncsWithAccount: true,
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
    status: 'development',
    // Messages have to be held for a recipient who is offline, so a server is
    // involved and it needs to know whose messages these are.
    access: 'account',
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
    status: 'development',
    access: 'local',
    syncsWithAccount: true,
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
    status: 'development',
    access: 'local',
    syncsWithAccount: true,
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
    status: 'development',
    // A form is a public URL that has to stay up and collect replies for someone.
    access: 'account',
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
    status: 'development',
    access: 'local',
    syncsWithAccount: true,
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
    status: 'development',
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
    status: 'development',
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
    status: 'development',
    // Checks run while your machine is off, so a server does the work on your behalf.
    access: 'account',
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
    status: 'development',
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
    status: 'development',
    // Distributing updates needs a server that is always reachable. Self-hosting
    // is a first-class option, which is why 'selfHosted' is listed.
    // A free account is enough to use the hosted one.
    access: 'account',
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
 * Apps usable with no account whatsoever. The pricing page quotes this count in
 * prose, so deriving it keeps the sentence honest.
 */
export const noAccountApps = () =>
  products.filter((product) => product.category === 'apps' && product.access === 'local')

/**
 * Everything that needs an account — a free one — across all categories.
 *
 * Not restricted to `category === 'apps'`, because Numori Updater is a developer
 * tool that also runs on a server; filtering by category would leave it out.
 */
export const accountProducts = () => products.filter((product) => product.access === 'account')
