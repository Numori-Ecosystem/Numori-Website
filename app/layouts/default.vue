<template>
  <div class="flex min-h-dvh flex-col">
    <!--
      First focusable element in the document, so a keyboard user can jump past the
      banner and the header on the very first Tab instead of walking the whole
      navigation.
    -->
    <a href="#main" class="skip-link">{{ $t('nav.skipToContent') }}</a>

    <!--
      Banner and header are pinned together as one block. The stickiness lives here
      rather than on TheHeader so the two cannot fight over `top-0` — separately
      sticky siblings would overlap, with the header sliding under the banner.
    -->
    <div class="sticky top-0 z-50">
      <TheStatusBanner />
      <TheHeader />
    </div>

    <main id="main" class="flex-1">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
/**
 * The only layout: skip link, work-in-progress banner, header, main landmark, footer.
 *
 * `#main` is a plain `<main>` without `tabindex="-1"`. Modern browsers move focus to
 * the fragment target on activation, and adding a negative tabindex would put a
 * non-interactive element into the focus order for everyone else.
 */
</script>
