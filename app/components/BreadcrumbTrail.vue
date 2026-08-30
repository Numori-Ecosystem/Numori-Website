<template>
  <nav :aria-label="$t('nav.breadcrumb')" class="mb-6">
    <ol class="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
      <li v-for="(item, index) in items" :key="item.label" class="flex items-center gap-1.5">
        <Icon
          v-if="index > 0"
          name="mdi:chevron-right"
          class="size-4 text-gray-400 dark:text-gray-600"
          aria-hidden="true"
        />

        <NuxtLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="rounded transition-colors hover:text-gray-900 dark:hover:text-gray-100"
        >
          {{ item.label }}
        </NuxtLink>

        <span v-else aria-current="page" class="font-medium text-gray-900 dark:text-gray-200">
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
/**
 * BreadcrumbTrail — the trail from the home page to the current page.
 *
 * The last item is always rendered as text with `aria-current="page"` rather
 * than as a link, since linking to the page you are already on is noise for
 * keyboard and screen-reader users. Separators are decorative.
 *
 * @example
 * <BreadcrumbTrail
 *   :items="[
 *     { label: $t('nav.products'), to: localePath('/products') },
 *     { label: product.name },
 *   ]"
 * />
 */
defineProps({
  /**
   * Trail entries, ordered from the top down. Each is `{ label, to? }`; the
   * final entry's `to` is ignored.
   * @type {object[]}
   */
  items: { type: Array, required: true },
})
</script>
