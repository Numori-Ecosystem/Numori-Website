<template>
  <div>
    <!--
      Announces the new page title to screen readers after a client-side
      navigation. Without it, routing changes the view but says nothing, because
      the document is never reloaded.
    -->
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
/**
 * Application root.
 *
 * The locale-related head tags — `<html lang>` and `dir`, the canonical link, the
 * hreflang alternates and `og:locale` — are emitted by @nuxtjs/i18n itself,
 * because `i18n.experimental.strictSeo` is enabled in nuxt.config. That mode
 * explicitly forbids calling `useLocaleHead()`, so none of it is wired up here.
 *
 * What is left for this component is the site-wide organisation structured data.
 * Per-page titles and social cards are set by `usePageSeo()` in each page.
 */
const { t } = useI18n()
const { public: runtime } = useRuntimeConfig()

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: t('site.name'),
          url: runtime.siteUrl,
          description: t('site.description'),
          sameAs: [runtime.githubOrg],
        }),
      ),
    },
  ],
})
</script>
