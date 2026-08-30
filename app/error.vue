<template>
  <NuxtLayout>
    <div class="container-reading flex min-h-[60vh] flex-col justify-center py-20 text-center">
      <p class="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
        {{ $t('error.code', { code: error?.statusCode ?? 500 }) }}
      </p>

      <h1 class="mt-4 text-3xl font-bold sm:text-4xl">{{ title }}</h1>

      <p class="mx-auto mt-4 max-w-lg text-gray-600 dark:text-gray-400">{{ body }}</p>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink :to="localePath('/')" size="lg">
          {{ $t('common.backHome') }}
        </ButtonLink>

        <ButtonLink :to="localePath('/products')" variant="outline" color="gray" size="lg">
          {{ $t('common.seeAllProducts') }}
        </ButtonLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
/**
 * Error page for 404s and server errors.
 *
 * Wrapped in NuxtLayout so a visitor who lands on a broken URL still gets the
 * header, footer and skip link — an error page with no way out is a dead end,
 * particularly for someone navigating by keyboard.
 *
 * Nuxt renders this outside the normal page pipeline, so the head metadata is set
 * here rather than through `usePageSeo`, and the page is marked `noindex`.
 */
const props = defineProps({
  /**
   * The Nuxt error object. Provided by Nuxt, not by a parent component.
   * @type {object}
   */
  error: { type: Object, default: () => ({}) },
})

const { t } = useI18n()
const localePath = useLocalePath()

/** 404 and 500 get tailored copy; anything else falls back to a generic message. */
const key = computed(() => {
  const code = props.error?.statusCode
  return code === 404 || code === 500 ? String(code) : 'generic'
})

const title = computed(() => t(`error.${key.value}.title`))
const body = computed(() => t(`error.${key.value}.body`))

useHead({
  title: () => title.value,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>
