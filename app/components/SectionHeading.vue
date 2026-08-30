<template>
  <div :class="[centred ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl', 'mb-10 sm:mb-12']">
    <p
      v-if="eyebrow"
      class="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400"
    >
      {{ eyebrow }}
    </p>

    <component :is="level" :id="id" class="text-2xl font-bold sm:text-3xl">
      {{ title }}
    </component>

    <p v-if="subtitle" class="mt-4 text-base text-gray-600 sm:text-lg dark:text-gray-400">
      {{ subtitle }}
    </p>

    <slot />
  </div>
</template>

<script setup>
/**
 * SectionHeading — eyebrow, heading and standfirst for a page section.
 *
 * `level` exists so the document keeps one logical heading order: a section
 * inside another section should drop to `h3` rather than repeating `h2` for
 * visual reasons. Size is controlled by classes, not by the tag.
 *
 * @example
 * <SectionHeading :title="$t('home.principles.title')" :subtitle="$t('home.principles.subtitle')" />
 *
 * @example Centred, with an eyebrow and a nested heading level
 * <SectionHeading centred level="h3" eyebrow="Pricing" title="One price" />
 *
 * @slot default — Extra content below the standfirst, such as a call to action.
 */
defineProps({
  /**
   * Small label above the heading.
   * @type {string}
   * @default ''
   */
  eyebrow: { type: String, default: '' },

  /**
   * The heading text.
   * @type {string}
   */
  title: { type: String, required: true },

  /**
   * Supporting paragraph below the heading.
   * @type {string}
   * @default ''
   */
  subtitle: { type: String, default: '' },

  /**
   * Heading tag to render. Choose it to match the document outline.
   * @type {string}
   * @default 'h2'
   * @values 'h2' | 'h3' | 'h4'
   */
  level: { type: String, default: 'h2' },

  /**
   * Optional id, so the heading can be linked to and used by aria-labelledby.
   * @type {string}
   * @default undefined
   */
  id: { type: String, default: undefined },

  /**
   * Centres the block and constrains its width.
   * @type {boolean}
   * @default false
   */
  centred: { type: Boolean, default: false },
})
</script>
