<template>
  <UiBadge :color="style.colour" :size="size" :icon="style.icon">
    <span class="sr-only">{{ $t('access.label') }}: </span>
    {{ $t(`access.${access}`) }}
  </UiBadge>
</template>

<script setup>
/**
 * AccessBadge — states what it takes to use a product: nothing, a plan, or
 * neither because it is shared infrastructure.
 *
 * This is the single most useful thing to put on a product card, given the
 * pricing model: most of the apps need no subscription at all, and that is worth
 * saying on the app's own page rather than only on the pricing page.
 *
 * A screen-reader-only prefix names what the value refers to, since "No
 * subscription needed" next to a status pill is ambiguous out of context.
 *
 * @example
 * <AccessBadge access="local" />
 *
 * @example Larger, for a product page header
 * <AccessBadge :access="product.access" size="sm" />
 */
const props = defineProps({
  /**
   * Access level. Must match a key in `access.*` in the locale files.
   * @type {string}
   * @values 'local' | 'subscription' | 'infrastructure'
   */
  access: { type: String, required: true },

  /**
   * Badge size, passed straight through to UiBadge.
   * @type {string}
   * @default 'xs'
   * @values 'xs' | 'sm' | 'md'
   */
  size: { type: String, default: 'xs' },
})

/** UiBadge accepts 'primary' | 'gray' | 'red' | 'green' | 'amber'. */
const STYLES = {
  local: { colour: 'green', icon: 'mdi:cellphone-check' },
  subscription: { colour: 'primary', icon: 'mdi:cloud-outline' },
  infrastructure: { colour: 'gray', icon: 'mdi:code-braces' },
}

const style = computed(() => STYLES[props.access] ?? STYLES.infrastructure)
</script>
