<template>
  <div
    class="card-interactive relative flex h-full flex-col rounded-2xl border bg-white p-6 dark:bg-gray-900"
    :class="
      highlighted
        ? 'border-primary-400 shadow-glow dark:border-primary-400/60'
        : 'border-gray-200 shadow-card hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
    "
  >
    <p
      v-if="badge"
      class="absolute -top-3 left-6 animate-scale-in rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white shadow-sm"
    >
      {{ badge }}
    </p>

    <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
      {{ name }}
    </h3>

    <!-- Storage is the headline, because it is the only thing the tiers differ by. -->
    <p v-if="storage" class="mt-3">
      <span
        class="text-3xl font-bold tracking-tight"
        :class="highlighted && 'text-primary-600 dark:text-primary-400'"
      >
        {{ storage }}
      </span>
      <span class="mt-1 block text-xs text-gray-500 dark:text-gray-400">{{ storageNote }}</span>
    </p>

    <p v-if="people" class="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400">
      {{ people }}
    </p>

    <p class="mt-5 text-sm text-gray-600 dark:text-gray-400">{{ tagline }}</p>

    <!--
      `relative` is load-bearing: the swap transition takes the outgoing price out
      of flow so the incoming one does not shunt the card's height as they cross.
    -->
    <div class="relative mt-5 min-h-14">
      <Transition name="swap" mode="out-in">
        <div :key="priceKey">
          <p class="flex items-baseline gap-1">
            <span class="text-3xl font-bold tracking-tight">{{ price }}</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ period }}</span>
          </p>
          <p v-if="priceNote" class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {{ priceNote }}
          </p>
        </div>
      </Transition>
    </div>

    <ul class="mt-6 flex flex-1 flex-col gap-3 text-sm">
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
 * The plans differ only by storage, so storage is the visual headline and the
 * price sits below it. The feature list exists to say "and everything else is
 * included", not to draw distinctions.
 *
 * The tick icons are decorative and the feature text carries the content, so the
 * list still reads correctly with images off or through a screen reader.
 *
 * The call to action is a slot rather than a prop pair, because plans link to
 * different kinds of destination (an internal page, an external guide, a waiting
 * list) and each needs different link semantics.
 *
 * @example
 * <PricingCard
 *   :name="$t('pricing.tiers.plus.name')"
 *   storage="1 TB"
 *   :storage-note="$t('pricing.storageShared')"
 *   :tagline="$t('pricing.tiers.plus.tagline')"
 *   price="£4"
 *   :period="$t('pricing.perMonth')"
 *   :price-key="billing"
 *   :features="features"
 *   highlighted
 * >
 *   <template #action><ButtonLink :to="…" block>Choose</ButtonLink></template>
 * </PricingCard>
 *
 * @slot action — The plan's call to action.
 */
defineProps({
  /**
   * Plan name, rendered as a small label above the storage figure.
   * @type {string}
   */
  name: { type: String, required: true },

  /**
   * Shared storage quota, e.g. '1 TB'. Omitted for the self-hosted plan, whose
   * quota is whatever disks you own.
   * @type {string}
   * @default ''
   */
  storage: { type: String, default: '' },

  /**
   * Caption under the storage figure, e.g. 'shared across every app'.
   * @type {string}
   * @default ''
   */
  storageNote: { type: String, default: '' },

  /**
   * Seat count line, e.g. 'for up to 6 people'. Omitted for single-user plans.
   * @type {string}
   * @default ''
   */
  people: { type: String, default: '' },

  /**
   * One-line description of who the plan is for.
   * @type {string}
   */
  tagline: { type: String, required: true },

  /**
   * Formatted price including the currency symbol.
   * @type {string}
   */
  price: { type: String, required: true },

  /**
   * Billing period shown next to the price, e.g. '/month'.
   * @type {string}
   */
  period: { type: String, required: true },

  /**
   * Small line below the price, e.g. '£40 billed yearly'.
   * @type {string}
   * @default ''
   */
  priceNote: { type: String, default: '' },

  /**
   * Changes whenever the price does, to re-trigger the swap transition. Pass the
   * billing period; a static card can leave it alone.
   * @type {string}
   * @default 'static'
   */
  priceKey: { type: String, default: 'static' },

  /**
   * Included features, as plain strings.
   * @type {string[]}
   */
  features: { type: Array, required: true },

  /**
   * Optional ribbon label, e.g. 'Most people want this'.
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
