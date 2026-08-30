<template>
  <article
    class="card-interactive group relative flex h-full flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-card hover:border-primary-300 hover:shadow-card-hover focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-400/40 dark:focus-within:outline-primary-400"
  >
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
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
  </article>
</template>

<script setup>
/**
 * BlogCard — a blog post summary in a listing grid.
 *
 * Uses the same stretched-link pattern as ProductCard: the heading is the only
 * link and its `::after` covers the card. The tags are presentational badges
 * rather than links, which is what keeps that pattern valid.
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
