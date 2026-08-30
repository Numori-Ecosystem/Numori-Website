<template>
  <div>
    <PageHeader wash :title="$t('blog.title')" :subtitle="$t('blog.subtitle')" />

    <div class="container-page py-12">
      <template v-if="posts?.length">
        <!-- ─── Tag filter ────────────────────────────────────────── -->
        <div v-if="tags?.length" class="flex flex-wrap items-center gap-3">
          <h2 :id="filterId" class="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {{ $t('blog.allTags') }}
          </h2>

          <div role="group" :aria-labelledby="filterId" class="flex flex-wrap gap-2">
            <button
              v-for="option in tagOptions"
              :key="option.tag ?? 'all'"
              type="button"
              :aria-pressed="activeTag === option.tag ? 'true' : 'false'"
              class="rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95"
              :class="
                activeTag === option.tag
                  ? 'border-primary-500 bg-primary-500 text-white shadow-sm'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-800'
              "
              @click="activeTag = option.tag"
            >
              {{ option.label }}
              <span class="opacity-70">({{ option.count }})</span>
            </button>
          </div>
        </div>

        <p aria-live="polite" class="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {{ $t('blog.postsCount', visible.length, { count: visible.length }) }}
        </p>

        <ul class="reveal-stagger mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="post in visible" :key="post.path">
            <BlogCard :post="post" />
          </li>
        </ul>
      </template>

      <!-- ─── Empty state ─────────────────────────────────────────── -->
      <div v-else class="max-w-xl py-8">
        <h2 class="text-xl font-semibold">{{ $t('blog.empty.title') }}</h2>
        <p class="mt-3 text-gray-600 dark:text-gray-400">{{ $t('blog.empty.body') }}</p>

        <div class="mt-6">
          <ButtonLink :to="localePath('/products')" variant="outline" color="gray">
            {{ $t('common.seeAllProducts') }}
          </ButtonLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Blog index for the active locale, with a client-side tag filter.
 *
 * Filtering happens in the browser rather than through per-tag routes: with this
 * few posts, separate indexable tag pages would be thin content, and the filter
 * is a refinement of one list rather than a different page.
 */
const { t } = useI18n()
const localePath = useLocalePath()

usePageSeo({
  title: t('blog.meta.title'),
  description: t('blog.meta.description'),
})

const { data: posts } = await usePostList()
const { data: tags } = await usePostTags()

const filterId = useId()

/** `null` means "all tags". */
const activeTag = ref(null)

const tagOptions = computed(() => [
  { tag: null, label: t('blog.allTags'), count: posts.value?.length ?? 0 },
  ...(tags.value ?? []).map((entry) => ({
    tag: entry.tag,
    label: entry.tag,
    count: entry.count,
  })),
])

const visible = computed(() => {
  const list = posts.value ?? []
  return activeTag.value ? list.filter((post) => post.tags?.includes(activeTag.value)) : list
})
</script>
