<template>
  <UiButton v-bind="$attrs" tag="a" :href="href" target="_blank" rel="noopener noreferrer">
    <slot />
    <span class="sr-only"> ({{ $t('common.opensInNewTab') }})</span>
  </UiButton>
</template>

<script setup>
/**
 * ExternalButton — a UiButton linking off-site.
 *
 * Always opens in a new tab, always sets `rel="noopener noreferrer"`, and always
 * appends a screen-reader-only note that the link opens a new tab. Announcing a
 * change of context is the part that is usually forgotten, and it is the part
 * that matters to someone who cannot see a new tab appear.
 *
 * @example
 * <ExternalButton :href="product.repo" variant="outline" color="gray">
 *   {{ $t('common.viewOnGithub') }}
 * </ExternalButton>
 *
 * @slot default — Button label.
 */
defineOptions({ inheritAttrs: false })

defineProps({
  /**
   * Absolute URL to open.
   * @type {string}
   */
  href: { type: String, required: true },
})
</script>
