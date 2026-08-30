<template>
  <UiButton v-bind="$attrs" tag="NuxtLink" :to="to">
    <slot />
  </UiButton>
</template>

<script setup>
/**
 * ButtonLink — a UiButton that is really a NuxtLink.
 *
 * UiButton renders `<component :is="tag">`, so handing it `'NuxtLink'` keeps the
 * design system's styling while producing a genuine `<a>` that routes on the
 * client and is crawlable. Using `tag="a"` with an `href` would look identical but
 * force a full page load on every internal navigation.
 *
 * The tag is passed as a **string**, not as the imported component. `<component
 * :is>` accepts either, but UiButton declares `tag` as `String`, so passing the
 * component object triggers a prop type warning on every instance. Resolving from
 * a string is also the pattern the library already uses for icons — its Nuxt
 * module provides the icon component as a bare name so `<component :is="'Icon'">`
 * picks up whatever the host app registered globally. `NuxtLink` is registered
 * globally by Nuxt, and Vue warns loudly in development if a string tag fails to
 * resolve, so this is not a silent failure mode.
 *
 * All other attributes and props (variant, color, size, block, …) pass straight
 * through to UiButton.
 *
 * @example
 * <ButtonLink :to="localePath('/products')" size="lg">
 *   {{ $t('home.hero.ctaPrimary') }}
 * </ButtonLink>
 *
 * @example Secondary style
 * <ButtonLink :to="localePath('/about')" variant="outline" color="gray">
 *   {{ $t('nav.about') }}
 * </ButtonLink>
 *
 * @slot default — Button label.
 */
defineOptions({ inheritAttrs: false })

defineProps({
  /**
   * Route location, usually the result of `localePath()`.
   * @type {string|object}
   */
  to: { type: [String, Object], required: true },
})
</script>
