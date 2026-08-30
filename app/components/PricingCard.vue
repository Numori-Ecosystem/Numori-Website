<template>
  <div
    class="relative flex flex-col rounded-2xl border bg-white p-6 dark:bg-gray-900"
    :class="
      highlighted
        ? 'border-primary-400 shadow-glow dark:border-primary-400/60'
        : 'border-gray-200 shadow-card dark:border-gray-700'
    "
  >
    <p
      v-if="badge"
      class="absolute -top-3 left-6 rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white"
    >
      {{ badge }}
    </p>

    <h3 class="text-lg font-semibold">{{ name }}</h3>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{{ tagline }}</p>

    <p class="mt-5 flex items-baseline gap-1.5">
      <span class="text-4xl font-bold tracking-tight">{{ price }}</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">{{ period }}</span>
    </p>

    <ul class="mt-6 flex flex-col gap-3 text-sm">
      <li v-for="feature in features" :key="feature" class="flex items-start gap-2.5">
        <Icon
          name="mdi:check"
          class="mt-0.5 size-4 shrink-0 text-success-600 dark:text-success-400"
          aria-hidden="true"
        />
        <span class="text-gray-700 dark:text-gray-300">{{ feature }}</span>
      </li>
    </ul>

    <div class="mt-8 pt-2">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup>
/**
 * PricingCard — one plan on the pricing page.
 *
 * The tick icons are decorative and the feature text is the content, so the list
 * still reads correctly with images off or through a screen reader.
 *
 * The call to action is a slot rather than a prop pair, because plans link to
 * different kinds of destination (an internal page, an external guide, a
 * waiting list) and each needs different link semantics.
 *
 * @example
 * <PricingCard
 *   :name="$t('pricing.free.name')"
 *   :tagline="$t('pricing.free.tagline')"
 *   :price="$t('pricing.free.price')"
 *   :period="$t('pricing.perMonth')"
 *   :features="features"
 * >
 *   <template #action>
 *     <UiButton block>{{ $t('pricing.free.cta') }}</UiButton>
 *   </template>
 * </PricingCard>
 *
 * @slot action — The plan's call to action.
 */
defineProps({
  /**
   * Plan name.
   * @type {string}
   */
  name: { type: String, required: true },

  /**
   * One-line description of who the plan is for.
   * @type {string}
   */
  tagline: { type: String, required: true },

  /**
   * Formatted price, including the currency symbol.
   * @type {string}
   */
  price: { type: String, required: true },

  /**
   * Billing period shown next to the price.
   * @type {string}
   */
  period: { type: String, required: true },

  /**
   * Included features, as plain strings.
   * @type {string[]}
   */
  features: { type: Array, required: true },

  /**
   * Optional ribbon label, e.g. "Most people want this".
   * @type {string}
   * @default ''
   */
  badge: { type: String, default: '' },

  /**
   * Draws the accent border and glow to mark the recommended plan.
   * @type {boolean}
   * @default false
   */
  highlighted: { type: Boolean, default: false },
})
</script>
