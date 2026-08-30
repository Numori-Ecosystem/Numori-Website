<template>
  <span :class="[sizeClasses, styles.tile]" class="inline-flex items-center justify-center rounded-xl">
    <Icon :name="icon" :class="iconSize" aria-hidden="true" />
  </span>
</template>

<script setup>
/**
 * ProductMark — the accent-coloured tile that stands in for a product logo.
 *
 * Purely decorative: the icon is hidden from assistive technology because the
 * product name always appears next to it in text.
 *
 * @example
 * <ProductMark icon="mdi:note-text-outline" accent="primary" />
 *
 * @example Large, for a product page header
 * <ProductMark :icon="product.icon" :accent="product.accent" size="lg" />
 */
import { accentStyles } from '~/utils/accents'

const props = defineProps({
  /**
   * MDI icon name, rendered through @nuxt/icon.
   * @type {string}
   */
  icon: { type: String, required: true },

  /**
   * Accent palette key; see ACCENTS in app/utils/accents.js.
   * @type {string}
   * @default 'primary'
   */
  accent: { type: String, default: 'primary' },

  /**
   * Tile size.
   * @type {string}
   * @default 'md'
   * @values 'sm' | 'md' | 'lg'
   */
  size: { type: String, default: 'md' },
})

const styles = computed(() => accentStyles(props.accent))

const sizeClasses = computed(
  () =>
    ({
      sm: 'size-9',
      md: 'size-11',
      lg: 'size-14 rounded-2xl',
    })[props.size] ?? 'size-11',
)

const iconSize = computed(
  () =>
    ({
      sm: 'size-5',
      md: 'size-6',
      lg: 'size-8',
    })[props.size] ?? 'size-6',
)
</script>
