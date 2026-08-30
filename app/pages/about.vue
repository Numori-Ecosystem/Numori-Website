<template>
  <div>
    <PageHeader wash :title="$t('about.title')" :subtitle="$t('about.subtitle')" />

    <div class="container-reading py-12 sm:py-16">
      <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        {{ $t('about.intro') }}
      </p>

      <!-- ─── Manifesto ─────────────────────────────────────────── -->
      <section :aria-labelledby="ids.manifesto" class="mt-14">
        <h2 :id="ids.manifesto" class="text-2xl font-bold sm:text-3xl">
          {{ $t('about.manifesto.title') }}
        </h2>

        <ol class="mt-8 flex flex-col gap-10">
          <li v-for="entry in manifesto" :key="entry.key" class="flex gap-5">
            <span
              class="grid size-8 shrink-0 place-items-center rounded-lg bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-400/15 dark:text-primary-300"
              aria-hidden="true"
            >
              {{ entry.key }}
            </span>

            <div class="min-w-0">
              <h3 class="text-lg font-semibold">{{ entry.title }}</h3>
              <p class="mt-2 leading-relaxed text-gray-600 dark:text-gray-400">{{ entry.body }}</p>
            </div>
          </li>
        </ol>
      </section>

      <!-- ─── Who ───────────────────────────────────────────────── -->
      <section
        :aria-labelledby="ids.who"
        class="mt-14 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900"
      >
        <h2 :id="ids.who" class="text-lg font-semibold">{{ $t('about.who.title') }}</h2>

        <p class="mt-2 leading-relaxed text-gray-600 dark:text-gray-400">
          {{ $t('about.who.body') }}
        </p>

        <div class="mt-5">
          <ExternalButton :href="runtime.githubOrg" variant="outline" color="gray">
            <Icon name="mdi:github" class="mr-2 size-4" aria-hidden="true" />
            {{ $t('about.who.cta') }}
          </ExternalButton>
        </div>
      </section>
    </div>

    <CtaBand :title="$t('about.cta.title')" :body="$t('about.cta.body')">
      <ExternalButton :href="runtime.githubOrg" size="lg">
        <Icon name="mdi:github" class="mr-2 size-5" aria-hidden="true" />
        {{ $t('about.cta.primary') }}
      </ExternalButton>

      <ButtonLink :to="localePath('/products')" variant="outline" color="gray" size="lg">
        {{ $t('about.cta.secondary') }}
      </ButtonLink>
    </CtaBand>
  </div>
</template>

<script setup>
/**
 * About and manifesto.
 *
 * The manifesto is a numbered `<ol>` because the items are a deliberate sequence
 * (privacy and openness first, since the rest follows from them) rather than an
 * unordered set. The numerals themselves are decorative — the list markup already
 * conveys order.
 */
const { t } = useI18n()
const localePath = useLocalePath()
const { public: runtime } = useRuntimeConfig()

usePageSeo({
  title: t('about.meta.title'),
  description: t('about.meta.description'),
})

const ids = {
  manifesto: useId(),
  who: useId(),
}

const MANIFESTO_COUNT = 7

const manifesto = computed(() =>
  Array.from({ length: MANIFESTO_COUNT }, (_, index) => ({
    key: index + 1,
    title: t(`about.manifesto.${index + 1}.title`),
    body: t(`about.manifesto.${index + 1}.body`),
  })),
)
</script>
