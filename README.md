# Numori Website

The showcase site for the Numori ecosystem: a family of open-source, privacy-first
apps and services with no AI features, at a fair price.

Built with Nuxt 4, Tailwind 4 and [Numori UI](https://github.com/Numori-Ecosystem/Numori-UI).
Served in British English and Spanish (Spain). No analytics, no trackers, no
cookie banner.

## Requirements

- **Node.js >= 22.5.0.** Nuxt Content is configured to use Node's built-in
  `node:sqlite` rather than `better-sqlite3`, so `npm install` needs no native
  build step. See [Content database](#content-database) if you would rather use
  the default driver.
- [`numori-ui`](https://www.npmjs.com/package/numori-ui) — the design system. It
  is consumed from the npm registry (`"numori-ui": "^0.4.0"`), so a plain
  `npm install` pulls it in; no sibling checkout is required.

To work on the design system and this site together, link a local checkout:

```bash
# in ../numori-ui
npm link
# in this repository
npm link numori-ui
```

`npm link` restores the published dependency. When linked, note that Tailwind
scans `node_modules/numori-ui/src` (see [Styling](#styling)); that path resolves
through the symlink to your local checkout, so component edits show up here.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script                  | What it does                                     |
| ----------------------- | ------------------------------------------------ |
| `npm run dev`           | Dev server on `0.0.0.0:3000`                     |
| `npm run build`         | Server build (`.output/server`)                  |
| `npm run generate`      | Fully prerendered static site (`.output/public`) |
| `npm run preview`       | Preview the production build                     |
| `npm run lint`          | ESLint, zero warnings tolerated                  |
| `npm run lint:fix`      | ESLint with `--fix`                              |
| `npm run format`        | Prettier over everything except `.vue`           |
| `npm run check:locales` | Assert every locale defines the same keys        |
| `npm run test`          | prepare + locale check + lint + format check     |

`npm run generate` is the deployment target: the whole site prerenders to static
files, and `nitro.prerender.failOnError` is on, so a broken internal link fails
the build rather than shipping a 404.

`npm run test` runs `nuxt prepare` first, because `eslint.config.mjs` extends the
config `@nuxt/eslint` generates into `.nuxt/`. Skip it on a freshly cleaned
checkout and ESLint dies with `Cannot find module './.nuxt/eslint.config.mjs'`.

## Project layout

```
app/
├── app.vue                  Root: route announcer + organisation JSON-LD
├── error.vue                404 / 500, inside the normal layout
├── layouts/default.vue      Skip link, header, <main>, footer
├── assets/css/main.css      The only stylesheet (see Styling)
├── components/              Site components, auto-imported
├── composables/             useProducts, useBlog, usePageSeo, useNavigation
├── data/products.js         The product catalogue (language-independent facts)
├── pages/                   File-based routes
└── utils/                   site.js (locale helpers), accents.js (palette)

content/
├── en-GB/blog/*.md          English posts
└── es-ES/blog/*.md          Spanish posts (same filenames)

i18n/locales/
├── en-GB.json               British English — the reference locale
└── es-ES.json               Spanish (Spain)
```

This project uses the Nuxt 4 `app/` directory. Note that `numori-notes` and
`numori-clips` predate it and keep `components/`, `pages/` and friends at the
repository root; new projects should follow the layout here.

### Components and the design system

The site's UI is built on [Numori UI](https://www.npmjs.com/package/numori-ui),
registered by its Nuxt module (`numori-ui/nuxt`) with the `Ui` prefix, so every
`Ui*` tag auto-resolves with no import. Most components under `app/components/`
compose those primitives rather than hand-rolling markup:

- **Cards** (`ProductCard`, `BlogCard`, `PrincipleCard`, `PricingCard`,
  `DonateOptions`, `UiComponentGallery`) build on `UiCard`.
- **Headings** (`SectionHeading`, `CtaBand`) build on `UiSectionHeading`.
- `BreadcrumbTrail` wraps `UiBreadcrumb` (routing its links through `NuxtLink`).
- `BillingToggle` wraps `UiSegmented`.
- `ProductMark` wraps `UiIconTile`, adding the per-product accent.
- `UiThemeToggle`, `UiCodeBlock` and `UiTable` are used directly. The first two
  began life here as `ThemeSwitcher` and `CodeBlock`; once they had earned their
  place they graduated into the design system, and the local copies were removed.
  The home page's comparison uses `UiTable` in its comparison configuration (a
  row-header label column, one highlighted column, per-column tick/dash icons),
  which replaced the former `UiComparisonTable` in Numori UI 0.4.0. The header
  wires `UiThemeToggle` (stateless) to
  `@nuxtjs/color-mode` and wraps it in `<ClientOnly>` to avoid a hydration mismatch.

What stays bespoke is deliberate: `LocaleSwitcher` is real anchor links (for SEO
and no-JS), not a button group, and `PageHeader` is a page-level composition. When
a pattern recurs across the site, prefer adding or extending a `numori-ui`
component over duplicating markup here.

Icons render through `@nuxt/icon` (MDI, bundled at build time); `numori-ui` is
told to delegate its own icon rendering to that same `Icon` component via
`numoriUi.icons.component` in `nuxt.config.ts`, so the whole site has one icon
pipeline.

## Styling

Tailwind 4 is wired as a **Vite plugin**, not through `@nuxtjs/tailwindcss`:

```ts
// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  vite: { plugins: [tailwindcss()] },
  css: ['~/assets/css/main.css'],
})
```

`app/assets/css/main.css` is the single entry point and imports, in order:

```css
@import 'tailwindcss';
@import 'numori-ui/css'; /* design tokens + the class-based `dark` variant */
@plugin '@tailwindcss/typography';
```

The `numori-ui/css` import is not optional. It carries the colour tokens
(`primary`, `gray`, `success`, `warning`, `error`) and the `dark` custom variant.
`main.css` then adds two explicit `@source` lines pointing at
`node_modules/numori-ui/src`, so Tailwind scans the library's own components and
generates the utilities they use — Tailwind excludes `node_modules` from
automatic detection, so without them every `Ui*` component would render unstyled.

There is no `tailwind.config.js`. Project-specific tokens live in an `@theme`
block in `main.css`, alongside a handful of helper classes: `.container-page`,
`.container-reading`, `.hero-wash`, `.prose-numori` and `.skip-link`.

Dark mode is class-based, driven by `@nuxtjs/color-mode` with `classSuffix: ''`,
which is what puts a bare `dark` class on `<html>`.

## Adding a product

Two steps, and the page builds itself.

**1. Add the facts** to `app/data/products.js`:

```js
{
  slug: 'photos',                 // URL segment and translation key
  name: 'Numori Photos',
  repo: 'Numori-Photos',          // repository name within the GitHub org
  icon: 'mdi:image-outline',      // any MDI icon; @nuxt/icon bundles it
  accent: 'violet',               // key from app/utils/accents.js
  category: 'apps',               // apps | platform | developer
  status: 'development',          // alpha | preAlpha | development
  access: 'local',                // local | account | infrastructure
  syncsWithAccount: true,         // does a free account add sync?
  featured: false,                // show on the home page?
  platforms: ['web', 'android'],  // keys under `platforms.*` in the locales
  url: null,                      // live URL, or null when unshipped
  perks: 4,                       // how many perk entries you wrote
}
```

**2. Add the words** to _every_ file in `i18n/locales/`:

```json
"photos": {
  "tagline": "…",
  "summary": "…",
  "perks": {
    "1": { "title": "…", "body": "…" },
    "2": { "title": "…", "body": "…" },
    "3": { "title": "…", "body": "…" },
    "4": { "title": "…", "body": "…" }
  }
}
```

`/products/photos` and `/es-ES/products/photos` now exist, and the product appears
in the index, the open-source table and the related-products grids.

The `perks` count is declared in the data rather than discovered from the
messages on purpose: vue-i18n resolves a missing key to the key path itself, so
looping blindly would print `products.photos.perks.5.title` on the page. Run
`npm run check:locales` and it will tell you exactly which keys you missed.

Statuses run `alpha` → `preAlpha` → `development`, most advanced first. That order
drives the products-index filter and the ranking in `related()`, so it matters.
There is deliberately no `beta` or `stable` yet — adding one is a claim about
quality, to be made when it is true rather than kept warm in an enum.

`USABLE_STATUSES` (`alpha`, `preAlpha`) decides which notice a product page shows:
an amber "installable, not dependable" alert, or the "this page is a placeholder"
one. Please leave whichever applies in place until the software actually exists.

`access` decides more than a badge — the pricing page counts these to build the
sentence "8 of the 12 apps never need a subscription", so setting it wrongly
changes a public claim:

- **`local`** — runs entirely on the device. Free in full, no account. A plan only
  adds hosted sync and shared storage. Default for anything whose data lives on
  your machine.
- **`account`** — needs a Numori account, and a **free** one is enough. Runs on a
  server that stays awake while the user's devices do not, so it has to know whose
  data is whose. Draws on the same free quota as everything else.
- **`infrastructure`** — always free: shared services and open-source libraries
  that are not sold to anyone.

**No product requires payment.** `access` answers "does it need an account", not
"does it cost money". An earlier version had a `subscription` value where `account`
now sits, and the pricing page announced that five services "genuinely need" a plan.
They never did — that was the most misleading thing on the site.

`accountProducts()` deliberately ignores `category` and matches on
`access === 'account'` alone, because Numori Updater is a developer tool that also
runs on a server; filtering by category would leave it out.

Set `syncsWithAccount: true` when a free Numori account adds key features — almost always
cross-device sync — and add a matching `products.<slug>.account` sentence to every
locale describing what signing in gains you _and_ what still works without it. It
renders in the product page sidebar. Numori PDF is the one local app without it:
processing happens on your machine and there is nothing worth syncing.

## Pricing model

There are **three levels, and only the third costs anything**:

1. **No account** — the app, complete, offline, nothing to register for.
2. **Free account** — adds cross-device sync **and the five server-backed apps**
   (Drive, Chat, Forms, Pulse, Updater), 2 GB of shared storage, docs and forum.
3. **Paying** — adds storage, direct support and **extra seats**. Multi-seat is the
   only capability genuinely reserved for paid accounts; no app or feature is.

Paying buys three things: **storage**, **extra accounts** and **support**. Every
app and every feature is identical at every price, and no platform sits behind a
higher price, so the pricing page is a **slider**, not a set of tiers.

Note "every platform it supports", not "every platform" — Forms and Pulse are
web-only, Clips and Mail have no web build, Marks has no desktop, Sheets and PDF
have no mobile. The promise is that platforms are never paywalled, which is true;
that every app runs everywhere is not.

The claim to protect is "never for features", _not_ "storage is the only variable".
An earlier version said the latter, and the home page went as far as promising "no
per-seat arithmetic" while the pricing page charged £1 per extra person.

Absolute claims are the recurring failure mode in this repo. Counts derived from
data are self-correcting; a sentence containing "only" or "nothing else" is
invisible to every check here. Before shipping a pricing or product change, grep the
locale files **and** `content/` for: `Nothing else`, `only thing`, `per-seat`,
`every platform`, `cookie`, and any written-out number.

## Cookies and browser storage

**This site sets no cookies.** `i18n.detectBrowserLanguage` is disabled specifically
to keep that true — with `useCookie` on, @nuxtjs/i18n writes `i18n_redirected` on the
_first_ page load, because `loadAndSetLocale` skips its early-return while
`ctx.initial` is true. That made the site's own privacy copy false and put a
non-consented preference cookie on a site whose entire pitch is privacy.

Two localStorage entries remain, both functional and never transmitted:
`nuxt-color-mode` (theme) and `content_*` (Nuxt Content's page cache). The privacy
page and the open-source page describe exactly those two. If you add anything that
writes to cookies or storage, update `legal.privacy.summary.*`,
`openSource.website.body` and `footer.noTracking` in both locales.

Re-enabling language detection means rewriting those three claims, and probably
needing a consent mechanism.

Keep all three levels distinct in copy, and keep `access` and `syncsWithAccount`
distinct from each other: `access: 'account'` means the app cannot run without one,
while `syncsWithAccount` means it runs fine without one but syncs with one. Both
have been conflated with payment at some point, each time understating the free tier.

Note the shape of the support rule — it is a free/paid boundary, not a paid
gradient. Support is the same whether someone pays £1.50 or £20; a "priority"
level above it would be the same feature-tiering mistake in a new coat. Free
accounts get documentation, a community forum and an open issue tracker, which is
a real offer rather than an absence, and bug reports are accepted from anyone.

The free quota is 2 GB. That number is about signalling rather than cost: free
accounts average a few hundred megabytes, so trimming the quota from 5 GB saved
roughly £18 a month at 130,000 accounts. Removing free email support is the
change that actually mattered — around 350 tickets a month is close to half a
full-time person.

That is deliberate. Tier cards had nothing to differentiate by — they could only
repeat one identical feature list under four different numbers — and an earlier
version of this page drifted into inventing differences (domain counts,
version-history retention, "priority" support) to make the cards look distinct.
That is precisely the feature-tiering the model exists to reject. A slider states
the actual model and leaves nowhere to smuggle a feature difference back in.

`app/data/plans.js` owns the numbers:

- `STORAGE_STEPS` — the slider's stops, each `{ gb, label, price }`
- `PRICE_PER_EXTRA_PERSON` — flat add-on for additional accounts
- `MIN_STORAGE_PER_PERSON_GB` / `MAX_PEOPLE_CEILING` / `maxPeopleFor()` — how many
  accounts a quota may be split between
- `YEARLY_MONTHS_CHARGED` — 10, so paying yearly costs ten months
- `quote({ stepIndex, people, billing })` — the single pricing function

Prices are plain numbers formatted by `formatMoney()` in `app/utils/site.js`, which
picks the currency from `CURRENCIES` per locale. Pounds and euros are priced at
numeral parity (£2 and 2 €) rather than converted, so one number serves both
languages and prices cannot drift between locale files. Storage labels live in the
data too, since "100 GB" is written identically in every language we ship.

Yearly shows the _monthly equivalent_ with the annual total underneath — comparing
£4.17 against £5 is the comparison someone is actually making; comparing £50
against £5 is not.

### Seats

Seats are derived from storage, not fixed: `maxPeopleFor(gb)` allows one account
per `MIN_STORAGE_PER_PERSON_GB` (25 GB), capped at `MAX_PEOPLE_CEILING` (50). So
100 GB splits four ways, 500 GB twenty ways, 1 TB forty ways.

The 25 GB floor exists because splitting a small quota many ways just recreates the
free tier — twenty people on 50 GB get 2.5 GB each and have no reason to pay. The
50-seat ceiling is a _product_ boundary rather than a technical one (4 TB would
stretch to 163): past roughly that size a customer wants a data processing
agreement, SSO and a committed support response time, which is a different product.

`quote()` clamps the seat count itself rather than trusting its caller, so a stale
number left over from a larger quota can never be quoted or charged for. The
planner also pushes the clamped value back up to the page when storage is reduced.

### Changing a price

Prices are hand-set, because no formula produces round numbers at every stop. What
must be re-checked is the **marginal** rate. Hetzner SX capacity costs roughly
£2.00–2.60 per TB per month once erasure coding and backups are counted, so every
step up has to charge more per _additional_ TB than that TB costs to run:

| Storage | Price | Net/TB | Marginal/TB |
| ------- | ----- | ------ | ----------- |
| 50 GB   | £1.50 | £20.74 | —           |
| 100 GB  | £2    | £14.51 | £8.28       |
| 250 GB  | £3    | £9.11  | £5.52       |
| 500 GB  | £5    | £7.87  | £6.62       |
| 1 TB    | £8    | £6.27  | £4.74       |
| 2 TB    | £12   | £4.75  | £3.23       |
| 3 TB    | £16   | £4.24  | £3.23       |
| 4 TB    | £20   | £3.99  | £3.23       |

Net figures are after 20% VAT and card fees of 2.5% + 20p. Average revenue per TB
can look healthy while a single step is sold at a loss, so check the steps either
side of anything you change — an earlier 4 TB tier netted £1.77/TB, below cost.

### Copy that must not drift

`pricing.included.*` is the list of what every _paying_ account gets. It must stay
free of anything that varies with price. If you find yourself adding a number to
it, that number belongs on the slider instead — and if you find yourself adding a
second support level, stop.

`pricing.support.*` states the free/paid support boundary. Keep the free side
described as what it includes (documentation, forum, issue tracker) rather than
what it lacks.

## The work-in-progress banner

`TheStatusBanner` is a permanent notice above the header, on every page. Two
deliberate choices:

**Not dismissible.** Remembering a dismissal means writing to storage, which would
cost the site its "no cookies at all" claim for the sake of hiding the most
important thing a first-time visitor needs to know.

**No ARIA role.** It is static content, not an alert. `role="status"` would declare
a live region that never changes; `role="alert"` would interrupt on every page load.
Being early in the DOM is what makes it discoverable — after the skip link, before
the header, so keyboard users can still jump past both on their first Tab.

The stickiness lives on a wrapper in `app/layouts/default.vue`, not on the banner or
`TheHeader`. Two separately-sticky siblings both claiming `top-0` overlap, with the
header sliding underneath. If you change the height of either, update
`scroll-margin-top` in `main.css` — in-page anchors need to clear the whole block,
currently about 6.5rem.

`200.html` and `404.html` are Nuxt's SPA fallback shells and contain no
server-rendered banner; it appears on hydration. Every real page has it in the HTML.

## Donations

Most people will never pay: no app needs a subscription and nine of the thirteen
need no account, so donations are the only way most users can contribute. The page
is `/donate`, and it is linked from four places — the header (an accent button in
the actions group, not a nav link), the mobile menu, a dedicated band on the home
page, and the footer.

`nav.donate` is deliberately kept out of `useNavigation().primary`. It is an action
rather than a section, so it renders as a button; adding it to the list would have
made it the least prominent of six equal links.

Methods live in `app/data/donations.js`, ported from the "Support the Project" panel
in Numori Notes (`components/AboutModal.vue`) — if you add a platform, add it there
too.

**No donor tiers, badges or perks, deliberately.** A donation given in return for
something is a sale, which changes its VAT treatment and turns a gift into a
transaction. It is also a second pricing ladder built out of goodwill, and one
honest price list is enough.

## Motion

Animation is opt-in per element and all of it is decorative, so the
`prefers-reduced-motion: reduce` block at the bottom of `main.css` can safely
neutralise the lot. That block collapses durations to `0.01ms` rather than setting
`animation: none` — `none` would strip the final frame of any `both`-filled
animation and leave elements that animate opacity permanently invisible.

Scroll reveals are CSS-only, via `animation-timeline: view()`:

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .reveal {
      animation: rise 1s linear both;
      animation-timeline: view();
    }
  }
}
```

No JavaScript, no IntersectionObserver, and — the point of wrapping it in
`@supports` — a browser without scroll-driven animation support renders the
content plainly and visibly. The conventional observer version starts at
`opacity: 0` and needs JavaScript to reveal anything, which hides the whole page
if the observer never fires.

The vocabulary:

| Class / token       | Use                                                   |
| ------------------- | ----------------------------------------------------- |
| `.reveal`           | Fade and rise once as the element scrolls into view   |
| `.reveal-stagger`   | Same, on a container: children follow one another     |
| `.card-interactive` | Hover lift, for cards                                 |
| `animate-rise`      | On-load entrance, for above-the-fold content          |
| `animate-rise-sm`   | Smaller on-load entrance                              |
| `animate-scale-in`  | Pop-in, used by the pricing ribbon                    |
| `page` transition   | Route change; see `app.pageTransition` in nuxt.config |
| `swap` transition   | Replacing a value in place, e.g. a price changing     |
| `disclosure`        | The mobile menu opening                               |

Hero content uses `animate-*` with staggered `[animation-delay:*]` rather than
`.reveal`, because it is already in view on load and a scroll-linked reveal would
never fire.

## Adding a blog post

Create the file under the locale you are writing in:

```
content/en-GB/blog/my-post.md
```

```yaml
---
title: My post
description: One or two sentences, used on cards and in social previews.
date: 2026-09-01
author: Erik Bjerke
tags: [engineering]
draft: false
minutes: 5
---
```

To translate it, create `content/es-ES/blog/my-post.md` with **the same
filename** — the slug is what pairs the two, so the language switcher keeps the
reader on the same article.

If a translation is missing, the post falls back to the English original and shows
a notice saying so, with `lang` set correctly on the body so screen readers switch
voice. Set `draft: true` to keep a post out of listings and the sitemap.

## Internationalisation

`@nuxtjs/i18n` with `strategy: 'prefix_except_default'`:

- `en-GB` is the default and lives at the root (`/products`)
- `es-ES` is prefixed (`/es-ES/products`)

Each locale therefore has its own indexable URL, which is why this project uses
prefixed routes where `numori-notes` uses `no_prefix` — an app shell has nothing
to index, a marketing site does.

`i18n.experimental.strictSeo` is enabled, which means **@nuxtjs/i18n owns the
locale-related head tags**: `<html lang>` and `dir`, `rel="canonical"`, the
`hreflang` alternates (including `x-default`) and `og:locale`. Do not call
`useLocaleHead()` — in this mode it throws — and do not set those tags by hand or
you will emit duplicates.

Everything else goes through `usePageSeo()` in the page:

```js
const { t } = useI18n()

usePageSeo({
  title: t('pricing.meta.title'),
  description: t('pricing.meta.description'),
})
```

Pass a function instead of an object when the values depend on fetched data, as
`app/pages/products/[slug].vue` does.

### Adding a language

1. Add the locale to `i18n.locales` in `nuxt.config.ts` (`code`, `language`,
   `name`, `dir`, `file`).
2. Copy `i18n/locales/en-GB.json` to the new filename and translate it.
3. Optionally add `content/<code>/blog/` posts. The collection name is derived
   from the language subtag, so `pt-BR` reads from a `blog_pt` collection —
   register it in `content.config.ts`.
4. `npm run check:locales` to confirm no keys were dropped.

Please translate rather than machine-translate. It is a stated commitment on the
site's own about page.

## Accessibility

Treated as part of "finished", not a later pass:

- A skip link is the first focusable element on every page.
- One `<h1>` per page, via `PageHeader`; `SectionHeading` takes a `level` prop so
  visual size never dictates heading order.
- `:focus-visible` rings are global and never removed. Card components lift the
  ring to the card so the whole target is outlined.
- Cards use a stretched-link pattern: the heading is the only link and its
  `::after` covers the card, keeping one tab stop per card.
- The language switcher is real links with `hreflang`, `lang` and `aria-current`,
  not a JavaScript dropdown.
- The mobile menu is a disclosure with `aria-expanded` / `aria-controls`; Escape
  closes it and returns focus to the toggle.
- Filters are `aria-pressed` toggle buttons with the result count in a polite live
  region, so filtering is announced.
- The FAQ uses native `<details>`, so keyboard support and find-in-page come from
  the browser.
- Comparison and repository tables are real tables with `<caption>`,
  `scope="col"` and `scope="row"`.
- Icons are `aria-hidden` and never the sole carrier of meaning. External links
  get `rel="noopener noreferrer"` and a screen-reader-only "opens in a new tab".
- `prefers-reduced-motion: reduce` disables transitions, animations and smooth
  scrolling.

`@nuxt/a11y` is installed and reports into Nuxt DevTools during development.
Automated checks catch a fraction of real problems, so please also tab through a
page and try it with a screen reader before shipping a change.

Known gap inherited from the design system: `UiModal` does not yet trap focus, set
`role="dialog"` / `aria-modal`, or close on Escape. This site avoids `UiModal`
until that is fixed upstream.

## Content database

Nuxt Content stores parsed content in SQLite. This project sets:

```ts
content: {
  experimental: { sqliteConnector: 'native' },
}
```

`native` uses Node's built-in `node:sqlite`, so `npm install` requires no
compilation. The trade-off: on a **cold** build (no `.data/` directory) Content
logs several `database is locked` and `no such table: _content_info`
unhandled rejections. These come from Content calling `insertDevelopmentCache`
without `await`, so its build-time cache writes race — the synchronous
`better-sqlite3` driver cannot hit it. The generated site is unaffected and
verified correct, and subsequent builds reuse the cache and are silent.

To use the default driver instead, allow its build script, remove the
`sqliteConnector` line, and add the dependency back:

```bash
npm install better-sqlite3
npm install-scripts approve better-sqlite3   # runs node-gyp
```

`nitro.prerender.concurrency` is pinned to `1` for the same reason.

## Social cards

`public/og/default.svg` holds the card artwork, but `OG_IMAGE` in
`app/composables/usePageSeo.js` is `null`, so no `og:image` is emitted and cards
render as `summary`. Almost no platform rasterises SVG, and pointing `og:image` at
a file that silently fails to load is worse than omitting the tag.

To turn it on: export that SVG to a 1200×630 PNG at `public/og/default.png` and
set `OG_IMAGE = '/og/default.png'`. The card upgrades to `summary_large_image`
automatically, and any page can override it by passing `image` to `usePageSeo()`.

## Code conventions

Shared with the rest of the ecosystem — see `numori-notes` for the original.

- **JavaScript, not TypeScript.** The only `.ts` files are `nuxt.config.ts` and
  `content.config.ts`. Components are plain `<script setup>`; props are typed with
  JSDoc (`@type`, `@default`, `@values`) and each component opens with a block
  describing it, plus `@example`, `@emits` and `@slot`.
- **Prettier does not touch `.vue` files** (see `.prettierignore`). ESLint's
  `--fix` formats those; Prettier handles JS, JSON, CSS and Markdown.
- `npm run lint` runs with `--max-warnings 0`, so a stray `console.log` blocks a
  commit.
- Husky: `pre-commit` runs lint-staged, `pre-push` runs the full lint plus the
  locale check. Both need a git repository — `npm install` warns harmlessly until
  this directory is one.
- British English in `en-GB` copy, comments and identifiers.

## Deployment

```bash
npm run generate    # → .output/public, deploy anywhere static
```

Set the canonical origin if it is not `https://numori.app`:

```bash
NUXT_PUBLIC_SITE_URL=https://staging.numori.app npm run generate
```

`sitemap.xml` and `robots.txt` are generated by `@nuxtjs/sitemap` and
`@nuxtjs/robots`, so do not add static copies to `public/` — the robots module
renames any `robots.txt` it finds there to `_robots.txt` and merges the contents,
which just produces a duplicate `User-agent` block.

Legal placeholder pages are `noindex` on purpose. Remove that flag from
`app/pages/legal/*.vue` once the real text is in place.

## Licence

[AGPL-3.0](./LICENSE), like everything else in the ecosystem — this website
included. Which is rather the point.
