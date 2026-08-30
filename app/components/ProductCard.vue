<template>
  <article
    class="group relative flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-card transition duration-200 hover:shadow-card-hover dark:border-gray-700 dark:bg-gray-900"
    :class="[
      styles.ring,
      // The whole card is one link, so lift the focus ring from the anchor text
      // up to the card. The anchor drops its own ring to avoid drawing two.
      'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary-500 dark:focus-within:outline-primary-400',
    ]"
  >
    <div class="flex items-start justify-between gap-3">
      <ProductMark :icon="product.icon" :accent="product.accent" :size="compact ? 'sm' : 'md'" />
      <StatusBadge :status="product.status" />
    </div>

    <div>
      <h3 :class="compact ? 'text-sm' : 'text-base'" class="font-semibold">
        <NuxtLink
          :to="product.to"
          class="rounded-2xl after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {{ product.name }}
        </NuxtLink>
      </h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ product.tagline }}</p>
    </div>

    <p v-if="!compact" class="mt-auto line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
      {{ product.summary }}
    </p>

    <p
      class="flex items-center gap-1 text-sm font-medium transition-transform duration-200 group-hover:translate-x-0.5"
      :class="styles.text"
      aria-hidden="true"
    >
      {{ $t('common.learnMore') }}
      <Icon name="mdi:arrow-right" class="size-4" />
    </p>
  </article>
</template>

<script setup>
/**
 * ProductCard — one product in a grid, linking to its detail page.
 *
 * The heading's link is stretched over the whole card with an `::after` overlay,
 * so the entire surface is clickable while remaining a single link and a single
 * tab stop. Nothing else in the card is interactive, which is what makes that
 * pattern safe here.
 *
 * The "Learn more" line is decorative and hidden from assistive technology: the
 * heading link already says where it goes.
 *
 * @example
 * <ProductCard :product="product" />
 *
 * @example Denser variant used in the "rest of the ecosystem" grid
 * <ProductCard :product="product" compact />
 */
import { accentStyles } from '~/utils/accents'

const props = defineProps({
  /**
   * A product decorated by `useProducts().decorate()` — it needs `to`,
   * `tagline` and `summary` in addition to the raw catalogue fields.
   * @type {object}
   */
  product: { type: Object, required: true },

  /**
   * Drops the summary and shrinks the mark, for secondary grids.
   * @type {boolean}
   * @default false
   */
  compact: { type: Boolean, default: false },
})

const styles = computed(() => accentStyles(props.product.accent))
</script>
