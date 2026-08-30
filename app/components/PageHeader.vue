<template>
  <header :class="wash && 'hero-wash'" class="border-b border-gray-200 dark:border-gray-800">
    <div class="container-page py-12 sm:py-16">
      <slot name="breadcrumb" />

      <p
        v-if="eyebrow"
        class="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400"
      >
        {{ eyebrow }}
      </p>

      <div class="flex flex-wrap items-start gap-x-5 gap-y-3">
        <slot name="mark" />

        <div class="min-w-0 flex-1">
          <h1 class="text-3xl font-bold sm:text-4xl">{{ title }}</h1>
          <p v-if="subtitle" class="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            {{ subtitle }}
          </p>
        </div>
      </div>

      <slot />
    </div>
  </header>
</template>

<script setup>
/**
 * PageHeader — the `<h1>` band at the top of an inner page.
 *
 * Every page renders exactly one of these, which is how the site keeps a single
 * top-level heading per document.
 *
 * @example
 * <PageHeader :title="$t('blog.title')" :subtitle="$t('blog.subtitle')" />
 *
 * @example With a product mark and a breadcrumb
 * <PageHeader :title="product.name" :subtitle="product.tagline" wash>
 *   <template #breadcrumb><BreadcrumbTrail :items="trail" /></template>
 *   <template #mark><ProductMark :icon="product.icon" size="lg" /></template>
 * </PageHeader>
 *
 * @slot breadcrumb — Navigation shown above the heading.
 * @slot mark — Icon or logo placed beside the heading.
 * @slot default — Content below the heading, such as badges or actions.
 */
defineProps({
  /**
   * The page's single `<h1>`.
   * @type {string}
   */
  title: { type: String, required: true },

  /**
   * Standfirst below the heading.
   * @type {string}
   * @default ''
   */
  subtitle: { type: String, default: '' },

  /**
   * Small label above the heading.
   * @type {string}
   * @default ''
   */
  eyebrow: { type: String, default: '' },

  /**
   * Applies the decorative gradient wash behind the header.
   * @type {boolean}
   * @default false
   */
  wash: { type: Boolean, default: false },
})
</script>
