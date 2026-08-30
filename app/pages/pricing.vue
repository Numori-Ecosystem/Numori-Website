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

      <!-- ─── The storage ladder ────────────────────────────────── -->
      <ul class="reveal-stagger mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="plan in tiers" :key="plan.key">
          <PricingCard
            :name="plan.name"
            :storage="plan.storage"
            :storage-note="$t('pricing.storageShared')"
            :tagline="plan.tagline"
            :price="plan.price"
            :period="$t('pricing.perMonth')"
            :price-note="plan.priceNote"
            :price-key="billing"
            :features="plan.features"
            :badge="plan.badge"
            :highlighted="plan.highlighted"
          >
            <template #action>
              <ButtonLink
                :to="localePath('/products')"
                block
                :variant="plan.highlighted ? 'solid' : 'outline'"
                :color="plan.highlighted ? 'primary' : 'gray'"
              >
                {{ plan.cta }}
              </ButtonLink>
            </template>
          </PricingCard>
        </li>
      </ul>

      <!-- ─── Family and self-hosted ────────────────────────────── -->
      <ul class="reveal-stagger mt-6 grid items-stretch gap-6 lg:grid-cols-2">
        <li>
          <PricingCard
            :name="family.name"
            :storage="family.storage"
            :storage-note="$t('pricing.storageShared')"
            :people="$t('pricing.forPeople', { count: FAMILY_PLAN.people })"
            :tagline="family.tagline"
            :price="family.price"
            :period="$t('pricing.perMonth')"
            :price-note="family.priceNote"
            :price-key="billing"
            :features="family.features"
          >
            <template #action>
              <ButtonLink :to="localePath('/products')" block variant="outline" color="gray">
                {{ family.cta }}
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

    <!-- ─── One shared quota ──────────────────────────────────── -->
    <section
      :aria-labelledby="ids.shared"
      class="border-y border-gray-200 bg-gray-50 py-section dark:border-gray-800 dark:bg-gray-950"
    >
      <div class="container-page">
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
            class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900"
          >
            <h3 class="text-base font-semibold">{{ point.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {{ point.body }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- ─── What needs paying for, and what does not ──────────── -->
    <section :aria-labelledby="ids.free" class="container-page py-section">
      <SectionHeading
        :id="ids.free"
        class="reveal"
        :title="$t('pricing.noSubscription.title', { free: freeCount, total: appCount })"
        :subtitle="$t('pricing.noSubscription.body')"
      />

      <ul class="reveal-stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="product in freeProducts" :key="product.slug">
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

      <p class="mt-6 max-w-3xl text-sm text-gray-600 dark:text-gray-400">
        {{ $t('pricing.noSubscription.planAdds') }}
      </p>

      <!-- The other side of the honest version. -->
      <div class="reveal mt-14">
        <h3 class="text-xl font-bold">
          {{ $t('pricing.noSubscription.needsPlanTitle', { count: paidCount }) }}
        </h3>

        <p class="mt-3 max-w-3xl leading-relaxed text-gray-600 dark:text-gray-400">
          {{ $t('pricing.noSubscription.needsPlanBody') }}
        </p>

        <ul class="reveal-stagger mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="product in paidProducts" :key="product.slug">
            <NuxtLink
              :to="product.to"
              class="card-interactive group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3.5 hover:border-primary-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-400/40"
            >
              <ProductMark :icon="product.icon" :accent="product.accent" size="sm" />
              <span class="min-w-0">
                <span class="block truncate text-sm font-semibold">{{ product.name }}</span>
                <span class="block text-xs text-gray-500 dark:text-gray-400">
                  {{ $t('access.subscriptionShort') }}
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
    </section>

    <!-- ─── FAQ ───────────────────────────────────────────────── -->
    <section
      :aria-labelledby="ids.faq"
      class="border-t border-gray-200 bg-gray-50 py-section dark:border-gray-800 dark:bg-gray-950"
    >
      <div class="container-reading">
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

            <p
              class="animate-rise-sm pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
            >
              {{ entry.a }}
            </p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * Pricing page.
 *
 * The model has exactly one variable — storage — and every paid plan unlocks
 * every app, so the page is arranged to make that obvious rather than to present
 * a feature matrix. The second half is the honest counterpart: which apps never
 * need a plan at all, and which genuinely do and why.
 *
 * Plan structure (storage, seats) comes from `app/data/plans.js`; prices come
 * from the locale files, because pounds and euros are different amounts rather
 * than translations of one another.
 */
import { FAMILY_PLAN, PLANS, SELF_HOSTED_PLAN } from '~/data/plans'
import { freeApps, paidApps, products as catalogue } from '~/data/products'

const { t } = useI18n()
const localePath = useLocalePath()
const { public: runtime } = useRuntimeConfig()
const { decorate } = useProducts()

usePageSeo({
  title: t('pricing.meta.title'),
  description: t('pricing.meta.description'),
})

const ids = {
  shared: useId(),
  free: useId(),
  faq: useId(),
}

/** 'monthly' | 'yearly'. Yearly bills ten months instead of twelve. */
const billing = ref('monthly')

/** Feature lists use numbered keys, so the count is declared rather than discovered. */
const featureList = (planKey, count) =>
  Array.from({ length: count }, (_, index) => t(`pricing.${planKey}.features.${index + 1}`))

/**
 * Resolves the price shown for a plan under the active billing period.
 *
 * Yearly shows the *monthly equivalent* with the annual total underneath, rather
 * than a large annual figure. Comparing £3.33 with £4 is the comparison someone
 * is actually trying to make; comparing £40 with £4 is not.
 */
const priceFor = (key) => {
  const yearly = billing.value === 'yearly'
  const base = `pricing.tiers.${key}`

  return {
    price: yearly ? t(`${base}.yearlyMonthly`) : t(`${base}.monthly`),
    priceNote: yearly ? t('pricing.billedYearly', { total: t(`${base}.yearlyTotal`) }) : '',
  }
}

const tiers = computed(() =>
  PLANS.map((plan) => {
    const base = `pricing.tiers.${plan.key}`

    return {
      key: plan.key,
      storage: plan.storage,
      highlighted: plan.highlighted,
      name: t(`${base}.name`),
      tagline: t(`${base}.tagline`),
      cta: t(`${base}.cta`),
      // Only the recommended tier defines a badge; the rest would render the key.
      badge: plan.highlighted ? t(`${base}.badge`) : '',
      features: featureList(`tiers.${plan.key}`, plan.features),
      ...priceFor(plan.key),
    }
  }),
)

const family = computed(() => {
  const yearly = billing.value === 'yearly'

  return {
    storage: FAMILY_PLAN.storage,
    name: t('pricing.family.name'),
    tagline: t('pricing.family.tagline'),
    cta: t('pricing.family.cta'),
    price: yearly ? t('pricing.family.yearlyMonthly') : t('pricing.family.monthly'),
    priceNote: yearly
      ? t('pricing.billedYearly', { total: t('pricing.family.yearlyTotal') })
      : '',
    features: featureList('family', FAMILY_PLAN.features),
  }
})

const selfHosted = computed(() => ({
  name: t('pricing.selfHosted.name'),
  tagline: t('pricing.selfHosted.tagline'),
  price: t('pricing.selfHosted.price'),
  priceNote: t('pricing.selfHosted.priceNote'),
  cta: t('pricing.selfHosted.cta'),
  features: featureList('selfHosted', SELF_HOSTED_PLAN.features),
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
const freeProducts = computed(() => freeApps().map(decorate))
const paidProducts = computed(() => paidApps().map(decorate))
const freeCount = computed(() => freeProducts.value.length)
const paidCount = computed(() => paidProducts.value.length)
const appCount = computed(() => catalogue.filter((product) => product.category === 'apps').length)

const FAQ_COUNT = 7

const faq = computed(() =>
  Array.from({ length: FAQ_COUNT }, (_, index) => ({
    key: index + 1,
    q: t(`pricing.faq.${index + 1}.q`),
    a: t(`pricing.faq.${index + 1}.a`),
  })),
)
</script>
