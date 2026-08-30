<template>
  <div
    class="card-interactive group flex h-full flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6 hover:border-primary-200 hover:shadow-card dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-400/30"
  >
    <span
      class="grid size-10 place-items-center rounded-xl bg-primary-100 text-primary-700 transition-transform duration-300 group-hover:scale-110 dark:bg-primary-400/15 dark:text-primary-300"
    >
      <Icon :name="icon" class="size-5" aria-hidden="true" />
    </span>

    <h3 class="text-base font-semibold">{{ title }}</h3>

    <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{{ body }}</p>
  </div>
</template>

<script setup>
/**
 * PrincipleCard — one of the commitments listed on the home page.
 *
 * Not a link, so it is a plain `<div>` rather than an `<article>`: it is a
 * fragment of a list, not a self-contained piece of content.
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
