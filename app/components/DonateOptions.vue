<template>
  <ul :class="compact ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3'" class="grid gap-3">
    <li v-for="method in DONATION_METHODS" :key="method.key">
      <a
        :href="method.url"
        target="_blank"
        rel="noopener noreferrer"
        class="card-interactive group flex h-full items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:border-primary-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-400/40"
      >
        <Icon
          :name="method.icon"
          class="size-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
          :class="method.colour"
          aria-hidden="true"
        />

        <span class="min-w-0 flex-1">
          <span class="block text-sm font-semibold">{{ method.label }}</span>
          <span v-if="!compact" class="block text-xs text-gray-500 dark:text-gray-400">
            {{
              method.recurring ? $t('donate.methods.recurring') : $t('donate.methods.oneOff')
            }}
          </span>
        </span>

        <Icon
          name="mdi:open-in-new"
          class="size-4 shrink-0 text-gray-400 dark:text-gray-500"
          aria-hidden="true"
        />
        <span class="sr-only">({{ $t('common.opensInNewTab') }})</span>
      </a>
    </li>
  </ul>
</template>

<script setup>
/**
 * DonateOptions — the grid of donation platforms.
 *
 * Every link is external, so each carries `rel="noopener noreferrer"` and a
 * screen-reader-only note that it opens a new tab. The platform names are not
 * translated; only the "monthly or one-off" caption is.
 *
 * No amounts are shown and no donor tiers exist. A donation given in return for
 * something is a sale rather than a gift, which changes its VAT treatment — see
 * `app/data/donations.js`.
 *
 * @example
 * <DonateOptions />
 *
 * @example Denser, for the sidebar of another page
 * <DonateOptions compact />
 */
import { DONATION_METHODS } from '~/data/donations'

defineProps({
  /**
   * Drops the per-method caption and tightens the grid, for use inside another
   * page's section rather than as the main content.
   * @type {boolean}
   * @default false
   */
  compact: { type: Boolean, default: false },
})
</script>
