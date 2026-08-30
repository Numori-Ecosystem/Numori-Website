<template>
  <div>
    <PageHeader wash :title="$t('pricing.title')" :subtitle="$t('pricing.subtitle')">
      <p
        class="mt-6 inline-flex animate-rise-sm items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-300"
      >
        <Icon
          name="mdi:check-decagram-outline"
          class="size-4 text-primary-500"
          aria-hidden="true"
        />
        {{ $t('pricing.everythingIncluded') }}
      </p>
    </PageHeader>

    <div class="container-page py-12 sm:py-16">
      <!-- Prices are provisional and saying so is the honest thing to do. -->
      <div class="mx-auto mb-12 max-w-3xl">
        <PlaceholderNotice
          :title="$t('pricing.draftNotice.title')"
          :body="$t('pricing.draftNotice.body')"
        />
      </div>

      <BillingToggle v-model="billing" />

      <!-- ─── The calculator ────────────────────────────────────── -->
      <div class="mt-10">
        <StoragePlanner v-model:step="step" v-model:people="people" :billing="billing">
          <template #action>
            <ButtonLink :to="localePath('/products')" block size="lg">
              {{ $t('pricing.planner.cta') }}
            </ButtonLink>
            <p class="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
              {{ $t('pricing.planner.ctaNote') }}
            </p>
          </template>
        </StoragePlanner>
      </div>

      <!-- ─── Free and self-hosted ──────────────────────────────── -->
      <ul class="reveal-stagger mt-6 grid items-stretch gap-6 lg:grid-cols-2">
        <li>
          <PricingCard
            :name="free.name"
            :storage="FREE_STORAGE"
            :storage-note="$t('pricing.storageShared')"
            :tagline="free.tagline"
            :price="free.price"
            :period="$t('pricing.perMonth')"
            :features="free.features"
          >
            <template #action>
              <ButtonLink :to="localePath('/products')" block variant="outline" color="gray">
                {{ free.cta }}
              </ButtonLink>
            </template>
          </PricingCard>
        </li>

        <li>
          <PricingCard
            :name="selfHosted.name"
            :tagline="selfHosted.tagline"
            :price="selfHosted.price"
            :period="selfHosted.priceNote"
            :features="selfHosted.features"
          >
            <template #action>
              <ExternalButton :href="runtime.githubOrg" block variant="outline" color="gray">
                <Icon name="mdi:book-open-variant-outline" class="mr-2 size-4" aria-hidden="true" />
                {{ selfHosted.cta }}
              </ExternalButton>
            </template>
          </PricingCard>
        </li>
      </ul>
    </div>

    <!-- ─── The three levels ──────────────────────────────────── -->
    <section :aria-labelledby="ids.levels" class="container-page py-section">
      <SectionHeading
        :id="ids.levels"
        class="reveal"
        :title="$t('pricing.levels.title')"
        :subtitle="$t('pricing.levels.subtitle')"
      />

      <!--
        An ordered list, because the levels are cumulative rather than a set of
        alternatives: each one is the previous plus something.
      -->
      <ol class="reveal-stagger grid gap-5 sm:grid-cols-3">
        <li
          v-for="level in levels"
          :key="level.key"
          class="card-interactive relative rounded-2xl border border-gray-200 bg-white p-6 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
        >
          <span
            class="grid size-8 place-items-center rounded-lg bg-gray-100 text-sm font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            aria-hidden="true"
          >
            {{ level.key }}
          </span>

          <h3 class="mt-4 flex items-center gap-2 text-base font-semibold">
            <Icon :name="level.icon" class="size-5 text-primary-500" aria-hidden="true" />
            {{ level.label }}
          </h3>

          <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {{ level.body }}
          </p>
        </li>
      </ol>
    </section>

    <!-- ─── Everything included ───────────────────────────────── -->
    <section
      :aria-labelledby="ids.included"
      class="border-y border-gray-200 bg-gray-50 py-section dark:border-gray-800 dark:bg-gray-950"
    >
      <div class="container-page">
        <SectionHeading
          :id="ids.included"
          class="reveal"
          :title="$t('pricing.included.title')"
          :subtitle="$t('pricing.included.subtitle')"
        />

        <ul class="reveal-stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="feature in included"
            :key="feature"
            class="flex items-start gap-2.5 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
          >
            <Icon
              name="mdi:check-circle"
              class="mt-0.5 size-5 shrink-0 text-success-600 dark:text-success-400"
              aria-hidden="true"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">{{ feature }}</span>
          </li>
        </ul>

        <div
          class="reveal mt-10 rounded-2xl border border-primary-200 bg-primary-50 p-6 dark:border-primary-400/30 dark:bg-primary-400/5"
        >
          <h3 class="text-lg font-semibold">{{ $t('pricing.noFeatureTiers.title') }}</h3>
          <p class="mt-2 max-w-3xl leading-relaxed text-gray-700 dark:text-gray-300">
            {{ $t('pricing.noFeatureTiers.body') }}
          </p>
        </div>
      </div>
    </section>

    <!-- ─── Support ───────────────────────────────────────────── -->
    <section :aria-labelledby="ids.support" class="container-page py-section">
      <SectionHeading
        :id="ids.support"
        class="reveal"
        :title="$t('pricing.support.title')"
        :subtitle="$t('pricing.support.body')"
      />

      <!--
        Two columns, not a tick/cross comparison table. The free column is a real
        offer (documentation, forum, open issue tracker), not an absence, and
        rendering it as a row of crosses would misrepresent it.
      -->
      <div class="reveal-stagger grid gap-5 sm:grid-cols-2">
        <div
          class="rounded-2xl border border-primary-200 bg-primary-50 p-6 dark:border-primary-400/30 dark:bg-primary-400/5"
        >
          <p class="flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-primary-300">
            <Icon name="mdi:email-fast-outline" class="size-5" aria-hidden="true" />
            {{ $t('pricing.support.paidLabel') }}
          </p>
          <p class="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">
            {{ $t('pricing.support.paidBody') }}
          </p>
        </div>

        <div
          class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
        >
          <p class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Icon name="mdi:book-open-variant-outline" class="size-5" aria-hidden="true" />
            {{ $t('pricing.support.freeLabel') }}
          </p>
          <p class="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
            {{ $t('pricing.support.freeBody') }}
          </p>
        </div>
      </div>
    </section>

    <!-- ─── One shared quota ──────────────────────────────────── -->
    <section :aria-labelledby="ids.shared" class="container-page py-section">
      <SectionHeading
        :id="ids.shared"
        class="reveal"
        :title="$t('pricing.shared.title')"
        :subtitle="$t('pricing.shared.body')"
      />

      <ul class="reveal-stagger grid gap-5 sm:grid-cols-3">
        <li
          v-for="point in sharedPoints"
          :key="point.key"
          class="card-interactive rounded-2xl border border-gray-200 bg-white p-5 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
        >
          <h3 class="text-base font-semibold">{{ point.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {{ point.body }}
          </p>
        </li>
      </ul>
    </section>

    <!-- ─── What needs paying for, and what does not ──────────── -->
    <section
      :aria-labelledby="ids.free"
      class="border-t border-gray-200 bg-gray-50 py-section dark:border-gray-800 dark:bg-gray-950"
    >
      <div class="container-page">
        <SectionHeading
          :id="ids.free"
          class="reveal"
          :title="$t('pricing.noSubscription.title', { total: appCount })"
          :subtitle="$t('pricing.noSubscription.body')"
        />

        <h3 class="reveal text-lg font-semibold">
          {{ $t('pricing.noSubscription.noAccountTitle', { count: noAccountCount }) }}
        </h3>
        <p class="reveal mb-6 mt-2 max-w-3xl text-sm text-gray-600 dark:text-gray-400">
          {{ $t('pricing.noSubscription.noAccountBody') }}
        </p>

        <ul class="reveal-stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="product in noAccountProducts" :key="product.slug">
            <NuxtLink
              :to="product.to"
              class="card-interactive group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3.5 hover:border-success-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-success-400/40"
            >
              <ProductMark :icon="product.icon" :accent="product.accent" size="sm" />
              <span class="min-w-0">
                <span class="block truncate text-sm font-semibold">{{ product.name }}</span>
                <span class="block text-xs text-success-700 dark:text-success-400">
                  {{ $t('access.localShort') }}
                </span>
              </span>
              <Icon
                name="mdi:chevron-right"
                class="ml-auto size-4 shrink-0 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </NuxtLink>
          </li>
        </ul>

        <!--
          The second group is "needs a free account", not "needs paying". Styled in
          the accent colour rather than a warning colour, because needing an account
          is not a downgrade.
        -->
        <div class="reveal mt-12">
          <h3 class="text-lg font-semibold">
            {{ $t('pricing.noSubscription.accountTitle', { count: accountCount }) }}
          </h3>

          <p class="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {{ $t('pricing.noSubscription.accountBody') }}
          </p>

          <ul class="reveal-stagger mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <li v-for="product in accountProducts" :key="product.slug">
              <NuxtLink
                :to="product.to"
                class="card-interactive group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3.5 hover:border-primary-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-400/40"
              >
                <ProductMark :icon="product.icon" :accent="product.accent" size="sm" />
                <span class="min-w-0">
                  <span class="block truncate text-sm font-semibold">{{ product.name }}</span>
                  <span class="block text-xs text-primary-700 dark:text-primary-400">
                    {{ $t('access.accountShort') }}
                  </span>
                </span>
                <Icon
                  name="mdi:chevron-right"
                  class="ml-auto size-4 shrink-0 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </NuxtLink>
            </li>
          </ul>
        </div>


        <div
          class="reveal mt-12 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
        >
          <p class="max-w-3xl leading-relaxed text-gray-700 dark:text-gray-300">
            {{ $t('pricing.noSubscription.planAdds') }}
          </p>

          <p class="mt-4">
            <ButtonLink :to="localePath('/donate')" variant="text">
              {{ $t('pricing.noSubscription.donateCta') }}
              <Icon name="mdi:heart-outline" class="ml-1 size-4" aria-hidden="true" />
            </ButtonLink>
          </p>
        </div>
      </div>
    </section>

    <!-- ─── FAQ ───────────────────────────────────────────────── -->
    <section :aria-labelledby="ids.faq" class="container-reading py-section">
      <h2 :id="ids.faq" class="reveal text-2xl font-bold sm:text-3xl">
        {{ $t('pricing.faq.title') }}
      </h2>

      <!--
        Native <details> rather than a scripted accordion: keyboard support,
        screen-reader announcement of expanded state and find-in-page all come
        from the browser, and it works before JavaScript loads.
      -->
      <div class="reveal-stagger mt-8 flex flex-col gap-3">
        <details
          v-for="entry in faq"
          :key="entry.key"
          class="group rounded-xl border border-gray-200 bg-white px-5 transition-colors duration-200 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
        >
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium marker:content-none"
          >
            {{ entry.q }}
            <Icon
              name="mdi:chevron-down"
              class="size-5 shrink-0 text-gray-400 transition-transform duration-300 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>

          <p class="animate-rise-sm pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {{ entry.a }}
          </p>
        </details>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * Pricing page.
 *
 * There is one variable — storage — so the page is a calculator rather than a set
 * of tiers. Every account gets every app, every feature and every platform, which
 * means tier cards would have had to repeat one identical feature list under
 * different numbers, and the previous version of this page drifted into inventing
 * differences (domain counts, version-history retention, "priority" support) to
 * make the cards look distinct. The slider removes the temptation.
 *
 * Free and self-hosted are shown as separate cards because £0 is not a point on
 * the paid curve.
 */
import { DEFAULT_STEP_INDEX, FREE_STORAGE } from '~/data/plans'
import {
  accountProducts as accountProductList,
  noAccountApps,
  products as catalogue,
} from '~/data/products'
import { formatMoney } from '~/utils/site'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { public: runtime } = useRuntimeConfig()
const { decorate } = useProducts()

usePageSeo({
  title: t('pricing.meta.title'),
  description: t('pricing.meta.description'),
})

const ids = {
  levels: useId(),
  included: useId(),
  support: useId(),
  shared: useId(),
  free: useId(),
  faq: useId(),
}

/** 'monthly' | 'yearly'. Yearly bills ten months instead of twelve. */
const billing = ref('monthly')
const step = ref(DEFAULT_STEP_INDEX)
const people = ref(1)

/** Numbered feature keys, so the count is declared rather than discovered. */
const numbered = (base, count) =>
  Array.from({ length: count }, (_, index) => t(`${base}.${index + 1}`))

/** The three access levels, cumulative: no account, free account, paying. */
const LEVEL_ICONS = ['mdi:cellphone', 'mdi:cloud-sync-outline', 'mdi:heart-outline']

/**
 * "Drive, Chat, Forms, Pulse and Updater", built from the catalogue and joined
 * with Intl.ListFormat so Spanish gets "y" rather than "and".
 *
 * Previously this was written into the copy as "the three services … Drive, Chat
 * and Forms", which silently became wrong the moment Pulse and Updater started
 * needing a plan. Deriving it means the sentence cannot drift again.
 */
const paidServiceNames = computed(() => {
  const names = accountProductList().map((product) => product.name.replace(/^Numori\s+/, ''))
  return new Intl.ListFormat(locale.value, { style: 'long', type: 'conjunction' }).format(names)
})

const levels = computed(() =>
  LEVEL_ICONS.map((icon, index) => ({
    key: index + 1,
    icon,
    label: t(`pricing.levels.${index + 1}.label`),
    body: t(`pricing.levels.${index + 1}.body`, { services: paidServiceNames.value }),
  })),
)

const INCLUDED_COUNT = 9
const included = computed(() => numbered('pricing.included', INCLUDED_COUNT))

const free = computed(() => ({
  name: t('pricing.free.name'),
  tagline: t('pricing.free.tagline'),
  // Formatted from the same helper as the planner so the currency cannot diverge.
  price: formatMoney(0, locale.value),
  cta: t('pricing.free.cta'),
  features: numbered('pricing.free.features', 6),
}))

const selfHosted = computed(() => ({
  name: t('pricing.selfHosted.name'),
  tagline: t('pricing.selfHosted.tagline'),
  price: formatMoney(0, locale.value),
  priceNote: t('pricing.selfHosted.priceNote'),
  cta: t('pricing.selfHosted.cta'),
  features: numbered('pricing.selfHosted.features', 4),
}))

const SHARED_POINTS = 3

const sharedPoints = computed(() =>
  Array.from({ length: SHARED_POINTS }, (_, index) => ({
    key: index + 1,
    title: t(`pricing.shared.${index + 1}.title`),
    body: t(`pricing.shared.${index + 1}.body`),
  })),
)

// Counts are derived from the catalogue so the prose ("8 of the 12 apps…")
// cannot drift out of step with the product list.
const noAccountProducts = computed(() => noAccountApps().map(decorate))
const accountProducts = computed(() => accountProductList().map(decorate))
const noAccountCount = computed(() => noAccountProducts.value.length)
const accountCount = computed(() => accountProducts.value.length)
const appCount = computed(() => catalogue.filter((product) => product.category === 'apps').length)

const FAQ_COUNT = 11

const faq = computed(() =>
  Array.from({ length: FAQ_COUNT }, (_, index) => ({
    key: index + 1,
    q: t(`pricing.faq.${index + 1}.q`),
    a: t(`pricing.faq.${index + 1}.a`),
  })),
)
</script>
