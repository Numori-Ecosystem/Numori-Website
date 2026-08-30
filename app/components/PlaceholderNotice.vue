<template>
  <UiAlert color="amber" icon="mdi:progress-wrench" bordered size="md" role="note">
    <p class="font-semibold">{{ title }}</p>
    <p class="mt-1 text-sm opacity-90">{{ body }}</p>
  </UiAlert>
</template>

<script setup>
/**
 * PlaceholderNotice — flags a page whose content describes intent rather than
 * shipped software.
 *
 * Most of the ecosystem is unfinished, and quietly writing marketing copy in the
 * present tense for software that does not exist yet is the thing this whole
 * project is arguing against. So unfinished pages say so, prominently.
 *
 * `role="note"` marks it as a parenthetical aside rather than an alert: nothing
 * has gone wrong and there is nothing to act on, so it should not interrupt.
 *
 * @example
 * <PlaceholderNotice
 *   :title="$t('products.page.placeholderTitle')"
 *   :body="$t('products.page.placeholderBody', { name: product.name })"
 * />
 */
defineProps({
  /**
   * Short heading for the notice.
   * @type {string}
   */
  title: { type: String, required: true },

  /**
   * Explanation of what is and is not real yet.
   * @type {string}
   */
  body: { type: String, required: true },
})
</script>
