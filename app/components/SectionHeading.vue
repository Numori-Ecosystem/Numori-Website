<template>
  <UiSectionHeading
    :id="id"
    :eyebrow="eyebrow"
    :title="title"
    :subtitle="subtitle"
    :level="level"
    :align="centred ? 'center' : 'left'"
    :class="[centred ? 'mx-auto max-w-2xl' : 'max-w-2xl', 'mb-10 sm:mb-12']"
  >
    <slot />
  </UiSectionHeading>
</template>

<script setup>
/**
 * SectionHeading — eyebrow, heading and standfirst for a page section.
 *
 * A thin wrapper over the design system's `UiSectionHeading` that adds the
 * marketing sections' measure (`max-w-2xl`) and vertical rhythm (`mb-10
 * sm:mb-12`). `UiSectionHeading` owns the eyebrow/heading/standfirst structure
 * and keeps `level` independent of the visual size, so a section nested inside
 * another can drop to `h3` without shrinking.
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
