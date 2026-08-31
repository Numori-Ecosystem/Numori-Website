<template>
  <UiCard
    tag="article"
    interactive
    focus-ring
    class="group flex h-full flex-col gap-4"
    :class="styles.ring"
  >
    <div class="flex items-start justify-between gap-3">
      <ProductMark
        :icon="product.icon"
        :accent="product.accent"
        :size="compact ? 'sm' : 'md'"
        class="transition-transform duration-300 group-hover:scale-105"
      />
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

    <p v-if="!compact" class="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
      {{ product.summary }}
    </p>

    <div class="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
      <AccessBadge :access="product.access" />

      <p
        class="flex items-center gap-1 text-sm font-medium"
        :class="styles.text"
        aria-hidden="true"
      >
        {{ $t('common.learnMore') }}
        <Icon
          name="mdi:arrow-right"
          class="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </p>
    </div>
  </UiCard>
</template>

<script setup>
/**
 * ProductCard — one product in a grid, linking to its detail page.
 *
 * Built on the design system's `UiCard` (interactive surface with `focus-ring`).
 * The heading's link is stretched over the whole card with an `::after` overlay,
 * so the entire surface is clickable while remaining a single link and a single
 * tab stop. Nothing else in the card is interactive, which is what makes that
 * pattern safe here. The accent hover border comes from the product's palette
 * (`styles.ring`).
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
