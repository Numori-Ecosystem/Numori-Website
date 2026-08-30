<template>
  <UiBadge :color="colour" :size="size">
    <span class="sr-only">{{ $t('status.label') }}: </span>
    {{ $t(`status.${status}`) }}
  </UiBadge>
</template>

<script setup>
/**
 * StatusBadge — lifecycle status of a product, as a coloured pill.
 *
 * The visible text alone ("Alpha") is ambiguous out of context, so a
 * screen-reader-only prefix names what the value refers to.
 *
 * @example
 * <StatusBadge status="alpha" />
 *
 * @example Larger, for a product page header
 * <StatusBadge status="development" size="sm" />
 */
import { STATUS_BADGE_COLOUR } from '~/utils/accents'

const props = defineProps({
  /**
   * Lifecycle stage. Must match a key in `status.*` in the locale files.
   * @type {string}
   * @values 'alpha' | 'preAlpha' | 'development'
   */
  status: { type: String, required: true },

  /**
   * Badge size, passed straight through to UiBadge.
   * @type {string}
   * @default 'xs'
   * @values 'xs' | 'sm' | 'md'
   */
  size: { type: String, default: 'xs' },
})

const colour = computed(() => STATUS_BADGE_COLOUR[props.status] ?? 'gray')
</script>
