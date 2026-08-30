<template>
  <!--
    Fully opaque in both themes, deliberately: solid background, solid border. The
    banner is sticky and has no backdrop blur, so any alpha at all lets page content
    scroll visibly through the warning.

    Do not write an alpha-modified colour anywhere in this file, comments included —
    Tailwind scans raw file text, so even a mention compiles a real (dead) rule.
  -->
  <div
    class="border-b border-warning-400 bg-warning-300 text-gray-900 dark:border-warning-800 dark:bg-warning-900 dark:text-warning-100"
  >
    <p
      class="container-page flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 text-center text-sm"
    >
      <Icon name="mdi:progress-wrench" class="size-4 shrink-0" aria-hidden="true" />

      <strong class="font-semibold">{{ $t('banner.label') }}</strong>

      <span>{{ $t('banner.text') }}</span>

      <NuxtLink
        :to="localePath('/products')"
        class="rounded font-semibold underline decoration-2 underline-offset-2 transition-opacity hover:opacity-75"
      >
        {{ $t('banner.cta') }}
      </NuxtLink>
    </p>
  </div>
</template>

<script setup>
/**
 * TheStatusBanner — permanent notice that the ecosystem is unfinished.
 *
 * Deliberately not dismissible. Every product except two is unbuilt and nothing is
 * for sale, so this is the single most important thing a first-time visitor needs
 * to know — and "dismiss" would mean remembering the dismissal, which means writing
 * to storage, which would cost the site its "no cookies at all" claim.
 *
 * No ARIA role: it is static content at the top of the document, not an alert.
 * `role="status"` would mark it as a live region that never changes, and
 * `role="alert"` would interrupt on every page load. Being early in the DOM — after
 * the skip link, before the header — is what makes it discoverable to screen
 * readers, and the skip link still comes first so keyboard users can jump past both
 * this and the navigation on their first Tab.
 *
 * @example
 * <TheStatusBanner />
 */
const localePath = useLocalePath()
</script>
