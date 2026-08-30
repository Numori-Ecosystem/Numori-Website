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
- `numori-ui` checked out as a sibling directory. It is consumed as
  `file:../numori-ui`, which npm links as a symlink, so local edits to the design
  system show up here immediately.

```
Work/numori/
├── numori-ui/        ← the design system (required)
└── numori-website/   ← this repository
```

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
(`primary`, `gray`, `success`, `warning`, `error`), the `dark` custom variant, and
the `@source` declarations pointing at the library's own components — Tailwind
skips `node_modules` otherwise, and every `Ui*` component would render unstyled.

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
  status: 'planned',              // beta | development | planned
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

Anything with a status other than `beta` automatically shows a "this page is a
placeholder" notice. Please leave that in until the software actually exists.

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
