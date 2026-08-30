<template>
  <section
    :aria-labelledby="headingId"
    class="hero-wash border-y border-gray-200 dark:border-gray-800"
  >
    <div class="container-page py-16 text-center sm:py-20">
      <h2 :id="headingId" class="text-2xl font-bold sm:text-3xl">{{ title }}</h2>

      <p class="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg dark:text-gray-400">
        {{ body }}
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * CtaBand — the closing call-to-action band on a page.
 *
 * Uses `aria-labelledby` pointing at its own heading so the section has an
 * accessible name and shows up as a meaningful landmark rather than an anonymous
 * region.
 *
 * @example
 * <CtaBand :title="$t('home.cta.title')" :body="$t('home.cta.body')">
 *   <UiButton size="lg">{{ $t('home.cta.primary') }}</UiButton>
 * </CtaBand>
 *
 * @slot default — The action buttons or links.
 */
defineProps({
  /**
   * Band heading.
   * @type {string}
   */
  title: { type: String, required: true },

  /**
   * Supporting paragraph.
   * @type {string}
   */
  body: { type: String, required: true },
})

const headingId = useId()
</script>
