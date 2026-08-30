<template>
  <article v-if="post">
    <PageHeader :title="post.title">
      <template #breadcrumb>
        <BreadcrumbTrail
          :items="[{ label: $t('nav.blog'), to: localePath('/blog') }, { label: post.title }]"
        />
      </template>

      <!--
        Each item reads as a full phrase ("Published 18 August 2026", "By Erik
        Bjerke") rather than a bare value, so the byline makes sense when read
        out of visual context.
      -->
      <p class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
        <time :datetime="post.date">
          {{ $t('common.publishedOn', { date: formatDate(post.date) }) }}
        </time>
        <span>{{ $t('common.by', { author: post.author }) }}</span>
        <span>{{ $t('common.readingTime', { minutes: post.minutes }) }}</span>
      </p>

      <ul v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-1.5">
        <li v-for="tag in post.tags" :key="tag">
          <UiBadge color="gray" size="sm">{{ tag }}</UiBadge>
        </li>
      </ul>
    </PageHeader>

    <div class="container-reading py-12">
      <!--
        The reader asked for this page in their language and is getting another
        one. Saying so is the minimum; silently swapping language is disorienting,
        especially for a screen-reader user who has a voice set per language.
      -->
      <div v-if="!translated" class="mb-10">
        <UiAlert color="blue" icon="mdi:translate" bordered size="md" role="note">
          <p class="font-semibold">{{ $t('blog.missingTranslation.title') }}</p>
          <p class="mt-1 text-sm opacity-90">{{ $t('blog.missingTranslation.body') }}</p>
        </UiAlert>
      </div>

      <!-- `lang` is set explicitly so assistive tech switches voice when we fell back. -->
      <div class="prose-numori" :lang="contentLang">
        <ContentRenderer :value="post" />
      </div>

      <div class="mt-14 border-t border-gray-200 pt-8 dark:border-gray-800">
        <ButtonLink :to="localePath('/blog')" variant="outline" color="gray">
          <Icon name="mdi:arrow-left" class="mr-2 size-4" aria-hidden="true" />
          {{ $t('common.backToBlog') }}
        </ButtonLink>
      </div>
    </div>
  </article>
</template>

<script setup>
/**
 * A single blog post.
 *
 * Falls back to the English original when the active locale has no translation,
 * and says so rather than switching language silently. The prose wrapper carries
 * an explicit `lang` in that case so screen readers pronounce the text with the
 * right voice.
 */
import { DEFAULT_LOCALE } from '~/utils/site'

const route = useRoute()
const localePath = useLocalePath()
const { t, locale } = useI18n()
const formatDate = useDateFormat()

const slug = computed(() => String(route.params.slug))
const { data } = await usePost(slug)

const post = computed(() => data.value?.post ?? null)
const translated = computed(() => data.value?.translated !== false)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('blog.notFound'),
    fatal: true,
  })
}

/** The language the body is actually written in, which may not be the UI language. */
const contentLang = computed(() => (translated.value ? locale.value : DEFAULT_LOCALE))

usePageSeo(() => ({
  title: post.value.title,
  description: post.value.description,
  type: 'article',
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.value.title,
          description: post.value.description,
          datePublished: post.value.date,
          inLanguage: contentLang.value,
          author: { '@type': 'Person', name: post.value.author },
          publisher: { '@type': 'Organization', name: t('site.name') },
        }),
      ),
    },
  ],
})
</script>
