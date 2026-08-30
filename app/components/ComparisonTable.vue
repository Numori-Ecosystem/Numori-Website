<template>
  <div class="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
    <table class="w-full min-w-2xl border-collapse text-left text-sm">
      <caption class="sr-only">{{ caption }}</caption>

      <thead>
        <tr class="border-b border-gray-200 dark:border-gray-700">
          <th scope="col" class="px-5 py-4 font-semibold text-gray-500 dark:text-gray-400">
            <span class="sr-only">{{ featureColumnLabel }}</span>
          </th>
          <th
            scope="col"
            class="w-2/5 bg-primary-50 px-5 py-4 font-semibold text-primary-800 dark:bg-primary-400/10 dark:text-primary-200"
          >
            {{ numoriColumnLabel }}
          </th>
          <th scope="col" class="w-2/5 px-5 py-4 font-semibold text-gray-600 dark:text-gray-300">
            {{ typicalColumnLabel }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="row in rows"
          :key="row.key"
          class="border-b border-gray-100 last:border-0 dark:border-gray-800"
        >
          <th scope="row" class="px-5 py-4 font-medium text-gray-900 dark:text-gray-100">
            {{ row.feature }}
          </th>

          <td
            class="bg-primary-50/50 px-5 py-4 text-gray-700 dark:bg-primary-400/5 dark:text-gray-200"
          >
            <span class="flex items-start gap-2">
              <Icon
                name="mdi:check-circle"
                class="mt-0.5 size-4 shrink-0 text-success-600 dark:text-success-400"
                aria-hidden="true"
              />
              {{ row.numori }}
            </span>
          </td>

          <td class="px-5 py-4 text-gray-600 dark:text-gray-400">
            <span class="flex items-start gap-2">
              <Icon
                name="mdi:minus-circle-outline"
                class="mt-0.5 size-4 shrink-0 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
              />
              {{ row.typical }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
/**
 * ComparisonTable — Numori against the way a large privacy suite is usually put
 * together.
 *
 * A real `<table>` rather than a grid of divs, because it is tabular data: the
 * `<caption>`, `scope="col"` headers and `scope="row"` feature cells are what let
 * a screen reader announce "Open source, Numori, entire ecosystem" instead of
 * reading three disconnected columns.
 *
 * The tick and dash icons are decorative; the cell text carries the meaning, so
 * nothing is conveyed by icon alone.
 *
 * @example
 * <ComparisonTable
 *   :caption="$t('home.comparison.caption')"
 *   :rows="rows"
 *   :numori-column-label="$t('home.comparison.columnNumori')"
 *   :typical-column-label="$t('home.comparison.columnTypical')"
 *   feature-column-label="Feature"
 * />
 */
defineProps({
  /**
   * Table summary for assistive technology. Rendered visually hidden.
   * @type {string}
   */
  caption: { type: String, required: true },

  /**
   * Rows to render, each `{ key, feature, numori, typical }`.
   * @type {object[]}
   */
  rows: { type: Array, required: true },

  /**
   * Accessible name for the unlabelled first column.
   * @type {string}
   */
  featureColumnLabel: { type: String, required: true },

  /**
   * Heading for the Numori column.
   * @type {string}
   */
  numoriColumnLabel: { type: String, required: true },

  /**
   * Heading for the comparison column.
   * @type {string}
   */
  typicalColumnLabel: { type: String, required: true },
})
</script>
