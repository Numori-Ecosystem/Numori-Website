<template>
  <div>
    <PageHeader :title="$t('legal.privacy.title')" :subtitle="$t('legal.privacy.subtitle')" />

    <div class="container-reading py-12">
      <PlaceholderNotice
        :title="$t('legal.privacy.title')"
        :body="$t('legal.privacy.placeholder')"
      />

      <section :aria-labelledby="summaryId" class="mt-10">
        <h2 :id="summaryId" class="text-xl font-bold">{{ $t('legal.privacy.summary.title') }}</h2>

        <ul class="mt-5 flex flex-col gap-3">
          <li v-for="point in points" :key="point" class="flex items-start gap-2.5">
            <Icon
              name="mdi:check-circle-outline"
              class="mt-0.5 size-5 shrink-0 text-success-600 dark:text-success-400"
              aria-hidden="true"
            />
            <span class="text-gray-700 dark:text-gray-300">{{ point }}</span>
          </li>
        </ul>
      </section>

      <p class="mt-10 text-sm text-gray-500 dark:text-gray-400">
        {{ $t('legal.lastUpdated', { date: formatDate(LAST_UPDATED) }) }}
      </p>
    </div>
  </div>
</template>

<script setup>
/**
 * Privacy policy.
 *
 * Deliberately marked `noindex` while it is a placeholder: an incomplete privacy
 * policy is the last thing that should rank, and the summary below is the only
 * part that is actually binding today.
 */
const { t } = useI18n()
const formatDate = useDateFormat()

/** Bump this whenever the text changes. */
const LAST_UPDATED = '2026-08-30'

usePageSeo({
  title: t('legal.privacy.title'),
  description: t('legal.privacy.subtitle'),
  noindex: true,
})

const summaryId = useId()

const points = computed(() =>
  Array.from({ length: 4 }, (_, index) => t(`legal.privacy.summary.${index + 1}`)),
)
</script>
