<template>
  <nav :aria-label="$t('locale.label')">
    <ul
      class="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 p-0.5 dark:border-gray-700 dark:bg-gray-900"
    >
      <li v-for="entry in available" :key="entry.code">
        <NuxtLink
          :to="entry.to"
          :hreflang="entry.language"
          :lang="entry.language"
          :aria-current="entry.current ? 'true' : undefined"
          class="block rounded-md px-2 py-1 text-xs font-semibold uppercase transition-colors"
          :class="
            entry.current
              ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-50'
              : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
          "
        >
          {{ entry.short }}
          <span class="sr-only"> — {{ entry.name }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
/**
 * LocaleSwitcher — a segmented control of real links, one per language.
 *
 * Deliberately not a dropdown. With two locales a menu adds a click, a popup to
 * manage and a set of ARIA states to get wrong, and it hides from crawlers the
 * fact that a translated URL exists. Plain links carry `hreflang` and `lang`,
 * work without JavaScript, and mark the active language with `aria-current`.
 *
 * The visible label is the two-letter subtag, so the full language name is added
 * as screen-reader-only text — "EN" on its own is not a useful accessible name.
 *
 * @example
 * <LocaleSwitcher />
 */
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const available = computed(() =>
  locales.value.map((entry) => ({
    code: entry.code,
    name: entry.name ?? entry.code,
    language: entry.language ?? entry.code,
    short: String(entry.code).split('-')[0].toUpperCase(),
    current: entry.code === locale.value,
    // switchLocalePath returns an empty string if a route has no equivalent in
    // the target locale; the home page is a safe destination in that case.
    to: switchLocalePath(entry.code) || '/',
  })),
)
</script>
