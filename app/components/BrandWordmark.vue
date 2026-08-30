<template>
  <span class="inline-flex items-center gap-2.5">
    <span
      class="grid shrink-0 place-items-center rounded-lg bg-primary-500 font-bold leading-none text-white"
      :class="markSize"
      aria-hidden="true"
    >
      n
    </span>
    <span v-if="showName" class="font-bold tracking-tight" :class="nameSize">
      {{ $t('site.name') }}
    </span>
  </span>
</template>

<script setup>
/**
 * BrandWordmark — the Numori mark, optionally with the name beside it.
 *
 * The mark itself is `aria-hidden`: it is a stylised letter, not content. When
 * `showName` is false the parent must supply an accessible name (for example an
 * `aria-label` on the surrounding link), or the link will be unlabelled.
 *
 * @example In the header, inside a link home
 * <NuxtLink :to="localePath('/')" :aria-label="$t('site.name')">
 *   <BrandWordmark />
 * </NuxtLink>
 *
 * @example Mark only
 * <BrandWordmark :show-name="false" size="sm" />
 */
const props = defineProps({
  /**
   * Whether to render the wordmark text next to the mark.
   * @type {boolean}
   * @default true
   */
  showName: { type: Boolean, default: true },

  /**
   * Overall size.
   * @type {string}
   * @default 'md'
   * @values 'sm' | 'md' | 'lg'
   */
  size: { type: String, default: 'md' },
})

const markSize = computed(
  () =>
    ({
      sm: 'size-7 text-sm',
      md: 'size-8 text-base',
      lg: 'size-10 text-lg',
    })[props.size] ?? 'size-8 text-base',
)

const nameSize = computed(
  () =>
    ({
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl',
    })[props.size] ?? 'text-lg',
)
</script>
