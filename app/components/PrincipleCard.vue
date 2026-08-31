<template>
  <UiCard
    interactive
    shadow="none"
    padding="lg"
    class="group flex h-full flex-col gap-3 hover:border-primary-200 hover:shadow-card dark:hover:border-primary-400/30"
  >
    <UiIconTile
      :icon="icon"
      class="transition-transform duration-300 group-hover:scale-110"
    />

    <h3 class="text-base font-semibold">{{ title }}</h3>

    <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{{ body }}</p>
  </UiCard>
</template>

<script setup>
/**
 * PrincipleCard — one of the commitments listed on the home page.
 *
 * Built on the design system's `UiCard` (interactive surface) and `UiIconTile`
 * (the primary-tinted icon tile). It keeps the accent hover border by overriding
 * the card's neutral hover tint via `tailwind-merge`.
 *
 * Not a link, so nothing inside is interactive — it is a fragment of a list, not
 * a self-contained piece of content.
 *
 * @example
 * <PrincipleCard
 *   icon="mdi:shield-lock-outline"
 *   :title="$t('home.principles.private.title')"
 *   :body="$t('home.principles.private.body')"
 * />
 */
defineProps({
  /**
   * MDI icon name.
   * @type {string}
   */
  icon: { type: String, required: true },

  /**
   * Commitment heading.
   * @type {string}
   */
  title: { type: String, required: true },

  /**
   * Explanatory paragraph.
   * @type {string}
   */
  body: { type: String, required: true },
})
</script>
