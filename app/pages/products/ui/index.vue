<template>
  <div v-if="product">
    <PageHeader wash :title="product.name" :subtitle="product.tagline">
      <template #breadcrumb>
        <BreadcrumbTrail
          :items="[
            { label: $t('nav.products'), to: localePath('/products') },
            { label: product.name },
          ]"
        />
      </template>

      <template #mark>
        <ProductMark :icon="product.icon" :accent="product.accent" size="lg" />
      </template>

      <div class="mt-6 flex flex-wrap items-center gap-2">
        <StatusBadge :status="product.status" size="sm" />
        <AccessBadge :access="product.access" size="sm" />
        <UiBadge color="gray" size="sm">{{ $t('platforms.library') }}</UiBadge>
      </div>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <ButtonLink :to="indexPath" size="lg">
          {{ $t('ui.overview.browseAll') }}
          <Icon name="mdi:arrow-right" class="ml-2 size-5" aria-hidden="true" />
        </ButtonLink>

        <ExternalButton :href="repoUrl" variant="outline" color="gray" size="lg">
          <Icon name="mdi:github" class="mr-2 size-5" aria-hidden="true" />
          {{ $t('common.viewOnGithub') }}
        </ExternalButton>
      </div>
    </PageHeader>

    <UiDocsShell>
      <div class="max-w-3xl">
        <!-- ─── Intro ─────────────────────────────────────────────── -->
        <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {{ product.summary }}
        </p>

        <UiAlert color="amber" icon="mdi:flask-outline" bordered size="md" class="mt-6" role="note">
          {{ $t(`status.${product.status}Hint`) }}
        </UiAlert>

        <!-- ─── Install ───────────────────────────────────────────── -->
        <section aria-labelledby="install" class="mt-14 scroll-mt-32">
          <h2 id="install" class="text-2xl font-bold">{{ $t('ui.nav.install') }}</h2>
          <p class="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
            {{ $t('ui.overview.installIntro') }}
          </p>

          <h3 class="mt-8 text-lg font-semibold">Nuxt</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {{ $t('ui.overview.installNuxt') }}
          </p>
          <div class="mt-4 flex flex-col gap-4">
            <CodeBlock :code="snippets.installNuxtDeps" label="Terminal" />
            <CodeBlock :code="snippets.nuxtConfig" label="nuxt.config.ts" />
            <CodeBlock :code="snippets.cssImport" label="assets/css/main.css" />
          </div>
          <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {{ $t('ui.overview.installNuxtDone') }}
          </p>

          <h3 class="mt-10 text-lg font-semibold">Vite + Vue</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {{ $t('ui.overview.installVite') }}
          </p>
          <div class="mt-4">
            <CodeBlock :code="snippets.viteConfig" label="vite.config.js" />
          </div>

          <h3 class="mt-10 text-lg font-semibold">{{ $t('ui.overview.anyVue') }}</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {{ $t('ui.overview.installPlain') }}
          </p>
          <div class="mt-4">
            <CodeBlock :code="snippets.plainVue" label="main.js" />
          </div>
        </section>

        <!-- ─── Styling ───────────────────────────────────────────── -->
        <section aria-labelledby="styling" class="mt-14 scroll-mt-32">
          <h2 id="styling" class="text-2xl font-bold">{{ $t('ui.nav.styling') }}</h2>
          <p class="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
            {{ $t('ui.overview.stylingIntro') }}
          </p>
          <ul class="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm text-gray-600 dark:text-gray-400">
            <li>{{ $t('ui.overview.stylingTokens') }}</li>
            <li>{{ $t('ui.overview.stylingDark') }}</li>
            <li>{{ $t('ui.overview.stylingOverride') }}</li>
          </ul>
          <div class="mt-4">
            <CodeBlock :code="snippets.override" label="assets/css/main.css" />
          </div>
        </section>

        <!-- ─── Icons ─────────────────────────────────────────────── -->
        <section aria-labelledby="icons" class="mt-14 scroll-mt-32">
          <h2 id="icons" class="text-2xl font-bold">{{ $t('ui.nav.icons') }}</h2>
          <p class="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
            {{ $t('ui.overview.iconsIntro') }}
          </p>
          <div class="mt-4">
            <CodeBlock :code="snippets.icons" label="nuxt.config.ts" />
          </div>
        </section>

        <!-- ─── Tree-shaking ──────────────────────────────────────── -->
        <section aria-labelledby="tree-shaking" class="mt-14 scroll-mt-32">
          <h2 id="tree-shaking" class="text-2xl font-bold">{{ $t('ui.nav.treeShaking') }}</h2>
          <p class="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
            {{ $t('ui.overview.treeShakingIntro') }}
          </p>
        </section>
      </div>

      <!-- ─── Component gallery ───────────────────────────────────── -->
      <section aria-labelledby="components" class="mt-16 scroll-mt-32">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="components" class="text-2xl font-bold">
              {{ $t('ui.overview.componentsTitle') }}
            </h2>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              {{ $t('ui.overview.componentsSubtitle', { count: total }) }}
            </p>
          </div>
          <ButtonLink :to="indexPath" variant="text">
            {{ $t('ui.overview.browseAll') }}
            <Icon name="mdi:arrow-right" class="ml-1 size-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <UiComponentGallery :groups="componentGroups" class="mt-8" />
      </section>
    </UiDocsShell>
  </div>
</template>

<script setup>
/**
 * Numori UI — the manual's landing page.
 *
 * Unlike every other product, Numori UI is a component library, so its product
 * page is a full documentation home: the catalogue facts and honesty banner
 * from a normal product page, followed by getting-started guidance and a gallery
 * of every component. It lives at `/products/ui`, taking precedence over the
 * generic `products/[slug].vue` for this one slug.
 *
 * Getting-started prose is intentionally in English — it is developer
 * documentation quoting code and config — while the section chrome is
 * translated through the `ui.*` keys, matching the rest of the site.
 */
const localePath = useLocalePath()
const { find, total } = useProducts()
const { indexPath, repoUrl, componentGroups } = useUiDocs()

// Docs pages swap content beneath a persistent sidebar, so the site-wide
// page fade is more distracting than helpful here — navigating between
// components should feel instant, not flash the whole view.
definePageMeta({ pageTransition: false, layoutTransition: false })

const product = computed(() => find('ui'))

// The catalogue guarantees this slug exists; fail loudly during prerender if a
// refactor ever removes it, rather than emitting a blank page.
if (!product.value) {
  throw createError({ statusCode: 500, statusMessage: 'Missing "ui" product', fatal: true })
}

const snippets = {
  installNuxtDeps: `npm install numori-ui
npm install -D tailwindcss @tailwindcss/vite`,
  nuxtConfig: `import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['numori-ui/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
})`,
  cssImport: `@import 'tailwindcss';
@import 'numori-ui/css';`,
  viteConfig: `import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import numoriUI from 'numori-ui/vite'

export default {
  plugins: [vue(), tailwindcss(), numoriUI()],
}`,
  plainVue: `import { createApp } from 'vue'
import { createNumoriUI, UiButton, UiModal } from 'numori-ui'
import './style.css'

createApp(App).use(createNumoriUI({ UiButton, UiModal })).mount('#app')`,
  override: `@import 'tailwindcss';
@import 'numori-ui/css';

@theme {
  --color-primary-400: #7c5cff; /* rebrand the accent */
  --font-sans: 'Geist', system-ui, sans-serif;
}`,
  icons: `export default defineNuxtConfig({
  modules: ['@nuxt/icon', 'numori-ui/nuxt'],
  numoriUi: { icons: { component: 'Icon' } },
})`,
}

usePageSeo(() => ({
  title: `${product.value.name} — ${product.value.tagline}`,
  description: product.value.summary,
}))

// The name already starts with "Numori", so skip the global "— Numori" suffix.
useHead({ titleTemplate: '%s' })
</script>
