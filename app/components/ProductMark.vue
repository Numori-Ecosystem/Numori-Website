<template>
  <UiIconTile :icon="icon" :size="size" :class="styles.tile" />
</template>

<script setup>
/**
 * ProductMark — the accent-coloured tile that stands in for a product logo.
 *
 * A thin wrapper over the design system's `UiIconTile`: it only adds the
 * per-product accent, whose colour classes are written out in full in
 * `app/utils/accents.js` so Tailwind can see them. Those classes override
 * `UiIconTile`'s default tint via `tailwind-merge`.
 *
 * Purely decorative: the tile hides its icon from assistive technology because
 * the product name always appears next to it in text.
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
   * MDI icon name.
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
</script>
