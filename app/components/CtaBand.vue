<template>
  <section
    :aria-labelledby="headingId"
    class="hero-wash border-y border-gray-200 dark:border-gray-800"
  >
    <div class="reveal container-page py-16 sm:py-20">
      <UiSectionHeading
        :id="headingId"
        align="center"
        :title="title"
        :subtitle="body"
        class="mx-auto max-w-2xl"
      >
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <slot />
        </div>
      </UiSectionHeading>
    </div>
  </section>
</template>

<script setup>
/**
 * CtaBand — the closing call-to-action band on a page.
 *
 * Uses the design system's `UiSectionHeading` (centred) for the heading and
 * standfirst, and points `aria-labelledby` at that heading so the section has an
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
