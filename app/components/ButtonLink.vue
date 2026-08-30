<template>
  <UiButton v-bind="$attrs" :tag="NuxtLink" :to="to">
    <slot />
  </UiButton>
</template>

<script setup>
/**
 * ButtonLink — a UiButton that is really a NuxtLink.
 *
 * UiButton renders `<component :is="tag">`, so handing it the NuxtLink component
 * keeps the design system's styling while producing a genuine `<a>` that routes
 * on the client and is crawlable. Using `tag="a"` with an `href` would also look
 * right but would force a full page load on every internal navigation.
 *
 * NuxtLink is imported from `#components` rather than resolved from a string, so
 * a failure to resolve is a build error instead of an `<NuxtLink>` element that
 * silently renders as an unstyled unknown tag.
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
import { NuxtLink } from '#components'

defineOptions({ inheritAttrs: false })

defineProps({
  /**
   * Route location, usually the result of `localePath()`.
   * @type {string|object}
   */
  to: { type: [String, Object], required: true },
})
</script>
