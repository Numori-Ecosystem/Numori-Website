<template>
  <div>
    <PageHeader :title="$t('legal.terms.title')" :subtitle="$t('legal.terms.subtitle')" />

    <div class="container-reading py-12">
      <PlaceholderNotice
        :title="$t('legal.terms.title')"
        :body="$t('legal.terms.placeholder')"
      />

      <p class="mt-10 text-sm text-gray-500 dark:text-gray-400">
        {{ $t('legal.lastUpdated', { date: formatDate(LAST_UPDATED) }) }}
      </p>
    </div>
  </div>
</template>

<script setup>
/**
 * Terms of service. A placeholder until there is a service to have terms for,
 * and `noindex` in the meantime.
 */
const { t } = useI18n()
const formatDate = useDateFormat()

const LAST_UPDATED = '2026-08-30'

usePageSeo({
  title: t('legal.terms.title'),
  description: t('legal.terms.subtitle'),
  noindex: true,
})
</script>
