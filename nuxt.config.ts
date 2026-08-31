import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  // Server-rendered and fully prerenderable. Unlike the Numori apps (which are
  // client-only SPAs), this is a content site: crawlers must see real HTML.
  ssr: true,

  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'numori-ui/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  // Tailwind 4 is wired as a Vite plugin (not the Nuxt Tailwind module), so
  // numori-ui's own `tailwind` option stays off and we own the CSS entry.
  vite: {
    plugins: [tailwindcss()],
  },

  // The Numori UI manual renders live component previews by compiling the exact
  // template string it also shows as source, so a single catalogue entry is both
  // the demo and the documented code. That needs Vue's runtime template
  // compiler, which the default runtime-only build omits. It ships the compiler
  // to both the client and the prerenderer; the cost is a larger vendor chunk,
  // paid only because the docs genuinely compile templates at runtime.
  vue: {
    runtimeCompiler: true,
  },

  numoriUi: {
    prefix: 'Ui',
    // Delegate icon rendering to @nuxt/icon: the design system only bundles the
    // ~36 MDI glyphs its own components need, and a marketing site needs far more.
    icons: {
      component: 'Icon',
    },
  },

  site: {
    url: 'https://numori.app',
    name: 'Numori',
  },

  app: {
    // Short, opacity-led route transition. `out-in` avoids the two pages
    // overlapping, which would otherwise double the page height mid-navigation.
    pageTransition: { name: 'page', mode: 'out-in' },

    head: {
      titleTemplate: '%s %separator %siteName',
      templateParams: {
        separator: '—',
        siteName: 'Numori',
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'application-name', content: 'Numori' },
        { name: 'theme-color', content: '#ff6188' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // No apple-touch-icon yet: it has to be a PNG, and referencing a file
        // that does not exist is worse than omitting the tag.
      ],
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  fonts: {
    families: [{ name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] }],
  },

  icon: {
    // Bundle every icon at build time. No runtime requests to a third-party
    // icon API — that would leak visitor IPs, which defeats the point of the site.
    provider: 'server',
    serverBundle: 'local',
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
      // The scanner only sees this app's own source, not node_modules, so the
      // glyphs that live *inside* numori-ui components (their loading spinner,
      // copy button, comparison ticks, theme toggle) are listed explicitly.
      // Without this they render server-side but would be missing from the
      // live component previews, which mount on the client.
      icons: [
        'mdi:loading',
        'mdi:content-copy',
        'mdi:check',
        'mdi:check-circle',
        'mdi:minus-circle-outline',
        'mdi:weather-sunny',
        'mdi:weather-night',
        'mdi:close',
      ],
    },
  },

  i18n: {
    defaultLocale: 'en-GB',
    // Distinct URLs per language, so each locale is independently indexable.
    strategy: 'prefix_except_default',
    baseUrl: 'https://numori.app',

    /*
     * Browser-language detection is off, which means this site sets no cookies at
     * all.
     *
     * With `detectBrowserLanguage.useCookie` enabled, @nuxtjs/i18n writes
     * `i18n_redirected` on the *first* page load: `loadAndSetLocale` skips its
     * early-return while `ctx.initial` is true, so `setCookieLocale` runs before
     * the visitor has chosen anything. That made the site's own privacy copy
     * false, and a preference cookie set without the user expressing a preference
     * is not comfortably "strictly necessary" under PECR either.
     *
     * Turning detection off costs an automatic redirect that Google discourages
     * anyway, and loses nothing else: the locale is in the URL under
     * `prefix_except_default`, hreflang points search engines at the right
     * version, and the header switcher is plain links. A Spanish visitor landing
     * on `/` sees English until they click ES — one click, in exchange for an
     * unqualified "no cookies" claim.
     */
    detectBrowserLanguage: false,
    experimental: {
      // Let @nuxtjs/i18n own the locale-related head tags (html lang/dir,
      // canonical, hreflang alternates, og:locale). In this mode `useLocaleHead`
      // must not be called — the module patches the head itself.
      strictSeo: true,
    },
    locales: [
      {
        code: 'en-GB',
        language: 'en-GB',
        name: 'English (UK)',
        dir: 'ltr',
        file: 'en-GB.json',
      },
      {
        code: 'es-ES',
        language: 'es-ES',
        name: 'Español (ES)',
        dir: 'ltr',
        file: 'es-ES.json',
      },
    ],
  },

  robots: {
    // Everything is indexable; individual pages opt out via `noindex` in
    // usePageSeo (the legal placeholders do). The sitemap reference is added by
    // @nuxtjs/sitemap itself — declaring it here as well duplicated the entry.
    groups: [{ userAgent: ['*'], allow: ['/'] }],
  },

  sitemap: {
    autoLastmod: true,
    exclude: ['/**/legal/**'],
  },

  content: {
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
      },
    },
    experimental: {
      // Use Node's built-in SQLite rather than better-sqlite3, which needs a
      // native compile step. Keeps `npm install` free of build scripts and
      // requires Node >= 22.5 (see engines in package.json).
      sqliteConnector: 'native',
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/es-ES', '/sitemap.xml'],
      // Fail the build on a broken internal link rather than shipping a 404.
      failOnError: true,
      // Node's SQLite driver serialises writes and throws SQLITE_BUSY when
      // several prerender workers hit the content database at once. One worker
      // costs a couple of seconds on a site this size and removes the race.
      concurrency: 1,
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://numori.app',
      githubOrg: 'https://github.com/Numori-Ecosystem',
      statusUrl: 'https://status.numori.app',
      // Baked at build time so a deploy can be verified as actually rebuilt.
      buildTime: new Date().toISOString(),
    },
  },
})
