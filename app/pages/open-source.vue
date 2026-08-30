<template>
  <div>
    <PageHeader wash :title="$t('openSource.title')" :subtitle="$t('openSource.subtitle', { count: repoCount })" />

    <div class="container-page py-12 sm:py-16">
      <div class="reveal-stagger grid gap-6 lg:grid-cols-2">
        <section
          :aria-labelledby="ids.licence"
          class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
        >
          <h2 :id="ids.licence" class="text-lg font-semibold">
            {{ $t('openSource.licence.title') }}
          </h2>
          <p class="mt-2 leading-relaxed text-gray-600 dark:text-gray-400">
            {{ $t('openSource.licence.body') }}
          </p>
        </section>

        <section
          :aria-labelledby="ids.contribute"
          class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
        >
          <h2 :id="ids.contribute" class="text-lg font-semibold">
            {{ $t('openSource.contribute.title') }}
          </h2>
          <p class="mt-2 leading-relaxed text-gray-600 dark:text-gray-400">
            {{ $t('openSource.contribute.body') }}
          </p>
          <div class="mt-5">
            <ExternalButton :href="runtime.githubOrg" variant="outline" color="gray">
              <Icon name="mdi:github" class="mr-2 size-4" aria-hidden="true" />
              {{ $t('openSource.contribute.cta') }}
            </ExternalButton>
          </div>
        </section>
      </div>

      <!-- ─── Repository table ──────────────────────────────────── -->
      <section :aria-labelledby="ids.table" class="reveal mt-14">
        <h2 :id="ids.table" class="text-xl font-bold">{{ $t('openSource.table.caption') }}</h2>

        <div class="mt-6 overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
          <table class="w-full min-w-3xl border-collapse text-left text-sm">
            <caption class="sr-only">{{ $t('openSource.table.caption') }}</caption>

            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th scope="col" class="px-5 py-3.5 font-semibold">
                  {{ $t('openSource.table.name') }}
                </th>
                <th scope="col" class="px-5 py-3.5 font-semibold">
                  {{ $t('openSource.table.what') }}
                </th>
                <th scope="col" class="px-5 py-3.5 font-semibold">
                  {{ $t('openSource.table.status') }}
                </th>
                <th scope="col" class="px-5 py-3.5 font-semibold">
                  {{ $t('openSource.table.link') }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="product in all"
                :key="product.slug"
                class="border-b border-gray-100 last:border-0 dark:border-gray-800"
              >
                <th scope="row" class="whitespace-nowrap px-5 py-3.5 font-medium">
                  <NuxtLink
                    :to="product.to"
                    class="rounded transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {{ product.name }}
                  </NuxtLink>
                </th>

                <td class="px-5 py-3.5 text-gray-600 dark:text-gray-400">{{ product.tagline }}</td>

                <td class="px-5 py-3.5">
                  <StatusBadge :status="product.status" />
                </td>

                <td class="px-5 py-3.5">
                  <a
                    :href="product.repoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 rounded text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    <Icon name="mdi:github" class="size-4" aria-hidden="true" />
                    {{ product.repo }}
                    <span class="sr-only"> ({{ $t('common.opensInNewTab') }})</span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ─── This website ──────────────────────────────────────── -->
      <section
        :aria-labelledby="ids.website"
        class="mt-14 rounded-2xl border border-primary-200 bg-primary-50 p-6 dark:border-primary-400/30 dark:bg-primary-400/5"
      >
        <h2 :id="ids.website" class="text-lg font-semibold">
          {{ $t('openSource.website.title') }}
        </h2>

        <p class="mt-2 max-w-2xl leading-relaxed text-gray-700 dark:text-gray-300">
          {{ $t('openSource.website.body') }}
        </p>

        <div class="mt-5">
          <ExternalButton :href="`${runtime.githubOrg}/Numori-Website`" variant="outline" color="gray">
            <Icon name="mdi:github" class="mr-2 size-4" aria-hidden="true" />
            {{ $t('openSource.website.cta') }}
          </ExternalButton>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
/**
 * Open source page: the licence rationale, how to contribute, and a table of
 * every repository with its current status.
 *
 * The table is the point of the page — it is the list a sceptical reader can
 * check the site's claims against — so it is real tabular markup with a caption
 * and row headers rather than a grid of cards.
 */
const { t } = useI18n()
const { all } = useProducts()

/**
 * Every product repository plus this website's own. Derived rather than written
 * out, because "Nineteen repositories" was prose that no test could keep honest.
 */
const repoCount = computed(() => all.value.length + 1)
const { public: runtime } = useRuntimeConfig()

usePageSeo({
  title: t('openSource.meta.title'),
  description: t('openSource.meta.description'),
})

const ids = {
  licence: useId(),
  contribute: useId(),
  table: useId(),
  website: useId(),
}
</script>
