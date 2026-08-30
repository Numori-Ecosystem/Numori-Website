<template>
  <UiBadge :color="style.colour" :size="size" :icon="style.icon">
    <span class="sr-only">{{ $t('access.label') }}: </span>
    {{ $t(`access.${access}`) }}
  </UiBadge>
</template>

<script setup>
/**
 * AccessBadge — states what it takes to use a product: nothing at all, a free
 * account, or neither because it is shared infrastructure.
 *
 * Note that none of the values mean "paid". No Numori app requires a
 * subscription; paying adds storage, seats and support. So this badge answers
 * "do I need an account?", not "do I need to pay?" — an earlier version conflated
 * the two and told visitors that five services needed a plan.
 *
 * A screen-reader-only prefix names what the value refers to, since "Free account"
 * next to a status pill is ambiguous out of context.
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
   * @values 'local' | 'account' | 'infrastructure'
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

/**
 * UiBadge accepts 'primary' | 'gray' | 'red' | 'green' | 'amber'.
 * Green for "needs nothing", primary for "needs a free account" — deliberately
 * not a warning colour, because needing an account is not a downgrade.
 */
const STYLES = {
  local: { colour: 'green', icon: 'mdi:cellphone-check' },
  account: { colour: 'primary', icon: 'mdi:account-outline' },
  infrastructure: { colour: 'gray', icon: 'mdi:code-braces' },
}

const style = computed(() => STYLES[props.access] ?? STYLES.infrastructure)
</script>
