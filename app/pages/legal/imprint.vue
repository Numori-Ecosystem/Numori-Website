<template>
  <div>
    <PageHeader :title="$t('legal.imprint.title')" :subtitle="$t('legal.imprint.subtitle')" />

    <div class="container-reading py-12">
      <PlaceholderNotice
        :title="$t('legal.imprint.title')"
        :body="$t('legal.imprint.placeholder')"
      />

      <p class="mt-10 text-sm text-gray-500 dark:text-gray-400">
        {{ $t('legal.lastUpdated', { date: formatDate(LAST_UPDATED) }) }}
      </p>
    </div>
  </div>
</template>

<script setup>
/**
 * Imprint / legal notice. Placeholder pending company details, and `noindex`
 * until it says something true and complete.
 */
const { t } = useI18n()
const formatDate = useDateFormat()

const LAST_UPDATED = '2026-08-30'

usePageSeo({
  title: t('legal.imprint.title'),
  description: t('legal.imprint.subtitle'),
  noindex: true,
})
</script>
