<template>
  <div>
    <PageHeader
      wash
      :title="$t('donate.title')"
      :subtitle="$t('donate.subtitle', { free: freeCount, total: appCount })"
    />

    <div class="container-reading py-12 sm:py-16">
      <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        {{ $t('donate.intro') }}
      </p>

      <!-- ─── Where the money goes ──────────────────────────────── -->
      <section :aria-labelledby="ids.where" class="reveal mt-12">
        <h2 :id="ids.where" class="text-2xl font-bold">{{ $t('donate.where.title') }}</h2>
        <p class="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
          {{ $t('donate.where.body') }}
        </p>

        <ul class="reveal-stagger mt-6 flex flex-col gap-3">
          <li
            v-for="item in where"
            :key="item.key"
            class="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
          >
            <Icon
              :name="item.icon"
              class="mt-0.5 size-5 shrink-0 text-primary-500"
              aria-hidden="true"
            />
            <span>
              <span class="block text-sm font-semibold">{{ item.title }}</span>
              <span class="mt-1 block text-sm text-gray-600 dark:text-gray-400">
                {{ item.body }}
              </span>
            </span>
          </li>
        </ul>
      </section>

      <!-- ─── The options ───────────────────────────────────────── -->
      <section :aria-labelledby="ids.how" class="mt-14">
        <h2 :id="ids.how" class="reveal text-2xl font-bold">{{ $t('donate.how.title') }}</h2>
        <p class="reveal mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
          {{ $t('donate.how.body') }}
        </p>

        <div class="mt-6">
          <DonateOptions />
        </div>

        <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {{ $t('donate.how.note') }}
        </p>
      </section>

      <!-- ─── What you do not get ───────────────────────────────── -->
      <section
        :aria-labelledby="ids.noPerks"
        class="reveal mt-14 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900"
      >
        <h2 :id="ids.noPerks" class="text-lg font-semibold">
          {{ $t('donate.noPerks.title') }}
        </h2>
        <p class="mt-2 leading-relaxed text-gray-600 dark:text-gray-400">
          {{ $t('donate.noPerks.body') }}
        </p>
      </section>

      <!-- ─── Other ways to help ────────────────────────────────── -->
      <section :aria-labelledby="ids.other" class="reveal mt-14">
        <h2 :id="ids.other" class="text-2xl font-bold">{{ $t('donate.other.title') }}</h2>
        <p class="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
          {{ $t('donate.other.body') }}
        </p>

        <ul class="mt-6 flex flex-col gap-2">
          <li
            v-for="item in other"
            :key="item"
            class="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
          >
            <Icon
              name="mdi:check-circle-outline"
              class="mt-0.5 size-4 shrink-0 text-success-600 dark:text-success-400"
              aria-hidden="true"
            />
            {{ item }}
          </li>
        </ul>

        <div class="mt-8 flex flex-wrap gap-3">
          <ExternalButton :href="runtime.githubOrg" variant="outline" color="gray">
            <Icon name="mdi:github" class="mr-2 size-4" aria-hidden="true" />
            {{ $t('common.viewOnGithub') }}
          </ExternalButton>

          <ButtonLink :to="localePath('/pricing')" variant="text">
            {{ $t('donate.other.cta') }}
            <Icon name="mdi:arrow-right" class="ml-1 size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
/**
 * Donations page.
 *
 * Exists because no app needs a subscription, which leaves a lot of people using
 * Numori with no way to contribute at all. Subscriptions pay the
 * people; donations are earmarked for the infrastructure, and the page says so
 * rather than gesturing at "supporting the project".
 *
 * There are deliberately no donor tiers, perks or badges — see
 * `app/data/donations.js` for why that matters beyond taste.
 */
import { noAccountApps, products as catalogue } from '~/data/products'

const { t } = useI18n()
const localePath = useLocalePath()
const { public: runtime } = useRuntimeConfig()

// Derived from the catalogue so the headline cannot drift when a product's
// access level changes — which has now happened twice.
const freeCount = computed(() => noAccountApps().length)
const appCount = computed(() => catalogue.filter((product) => product.category === 'apps').length)

usePageSeo({
  title: t('donate.meta.title'),
  description: t('donate.meta.description'),
})

const ids = {
  where: useId(),
  how: useId(),
  noPerks: useId(),
  other: useId(),
}

const WHERE_ITEMS = [
  { key: 1, icon: 'mdi:server-outline' },
  { key: 2, icon: 'mdi:translate' },
  { key: 3, icon: 'mdi:human-cane' },
]

const where = computed(() =>
  WHERE_ITEMS.map((item) => ({
    ...item,
    title: t(`donate.where.${item.key}.title`),
    body: t(`donate.where.${item.key}.body`),
  })),
)

const OTHER_COUNT = 5

const other = computed(() =>
  Array.from({ length: OTHER_COUNT }, (_, index) => t(`donate.other.${index + 1}`)),
)
</script>
