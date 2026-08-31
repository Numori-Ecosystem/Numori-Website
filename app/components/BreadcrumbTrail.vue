<template>
  <UiBreadcrumb :items="items" :aria-label="$t('nav.breadcrumb')" link-tag="NuxtLink" class="mb-6" />
</template>

<script setup>
/**
 * BreadcrumbTrail — the trail from the home page to the current page.
 *
 * A thin wrapper over the design system's `UiBreadcrumb`, supplying the
 * translated navigation label and routing its links through `NuxtLink` (so they
 * are client-routed and crawlable). `UiBreadcrumb` handles the rest: the last
 * item renders as `aria-current="page"` text rather than a link, and the
 * chevron separators are decorative.
 *
 * @example
 * <BreadcrumbTrail
 *   :items="[
 *     { label: $t('nav.products'), to: localePath('/products') },
 *     { label: product.name },
 *   ]"
 * />
 */
defineProps({
  /**
   * Trail entries, ordered from the top down. Each is `{ label, to? }`; the
   * final entry's `to` is ignored.
   * @type {object[]}
   */
  items: { type: Array, required: true },
})
</script>
