<template>
  <UiCard
    tag="article"
    interactive
    focus-ring
    class="group flex h-full flex-col gap-3 hover:border-primary-300 dark:hover:border-primary-400/40"
  >
    <div
      class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400"
    >
      <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      <span aria-hidden="true">·</span>
      <span>{{ $t('common.readingTime', { minutes: post.minutes }) }}</span>
    </div>

    <h3 class="text-lg font-semibold">
      <NuxtLink
        :to="localePath(post.path)"
        class="rounded-2xl transition-colors duration-200 after:absolute after:inset-0 after:content-[''] group-hover:text-primary-700 focus-visible:outline-none dark:group-hover:text-primary-300"
      >
        {{ post.title }}
      </NuxtLink>
    </h3>

    <p class="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
      {{ post.description }}
    </p>

    <ul v-if="post.tags?.length" class="mt-auto flex flex-wrap gap-1.5 pt-1">
      <li v-for="tag in post.tags" :key="tag">
        <UiBadge color="gray" size="xs">{{ tag }}</UiBadge>
      </li>
    </ul>
  </UiCard>
</template>

<script setup>
/**
 * BlogCard — a blog post summary in a listing grid.
 *
 * Built on the design system's `UiCard` (interactive surface with `focus-ring`
 * for the stretched-link pattern). The heading is the only link and its
 * `::after` covers the card; the tags are presentational badges rather than
 * links, which is what keeps that pattern valid.
 *
 * @example
 * <BlogCard v-for="post in posts" :key="post.path" :post="post" />
 */
defineProps({
  /**
   * A post record from a Nuxt Content blog collection. Needs `path`, `title`,
   * `description`, `date`, `minutes` and optionally `tags`.
   * @type {object}
   */
  post: { type: Object, required: true },
})

const localePath = useLocalePath()
const formatDate = useDateFormat()
</script>
