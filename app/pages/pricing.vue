<template>
  <div>
    <PageHeader wash :title="$t('pricing.title')" :subtitle="$t('pricing.subtitle')" />

    <div class="container-page py-12 sm:py-16">
      <!-- Prices are provisional and saying so is the honest thing to do. -->
      <div class="mx-auto mb-12 max-w-3xl">
        <PlaceholderNotice
          :title="$t('pricing.draftNotice.title')"
          :body="$t('pricing.draftNotice.body')"
        />
      </div>

      <ul class="grid items-start gap-6 lg:grid-cols-3">
        <li v-for="plan in plans" :key="plan.key">
          <PricingCard
            :name="plan.name"
            :tagline="plan.tagline"
            :price="plan.price"
            :period="plan.period"
            :features="plan.features"
            :badge="plan.badge"
            :highlighted="plan.highlighted"
          >
            <template #action>
              <ExternalButton
                v-if="plan.href"
                :href="plan.href"
                block
                :variant="plan.highlighted ? 'solid' : 'outline'"
                :color="plan.highlighted ? 'primary' : 'gray'"
              >
                {{ plan.cta }}
              </ExternalButton>

              <ButtonLink
                v-else
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
    </div>

    <!-- ─── FAQ ─────────────────────────────────────────────────── -->
    <section
      :aria-labelledby="faqId"
      class="border-t border-gray-200 bg-gray-50 py-section dark:border-gray-800 dark:bg-gray-950"
    >
      <div class="container-reading">
        <h2 :id="faqId" class="text-2xl font-bold sm:text-3xl">{{ $t('pricing.faq.title') }}</h2>

        <!--
          Native <details> rather than a scripted accordion: keyboard support,
          screen-reader announcement of expanded state and find-in-page all come
          from the browser, and it works before JavaScript loads.
        -->
        <div class="mt-8 flex flex-col gap-3">
          <details
            v-for="entry in faq"
            :key="entry.key"
            class="group rounded-xl border border-gray-200 bg-white px-5 dark:border-gray-700 dark:bg-gray-900"
          >
            <summary
              class="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium marker:content-none"
            >
              {{ entry.q }}
              <Icon
                name="mdi:chevron-down"
                class="size-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>

            <p class="pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
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
 * The plans are described entirely in the locale files, including the prices, so
 * the Spanish page can quote euros rather than a converted pound figure.
 */
const { t } = useI18n()
const localePath = useLocalePath()
const { public: runtime } = useRuntimeConfig()

usePageSeo({
  title: t('pricing.meta.title'),
  description: t('pricing.meta.description'),
})

const faqId = useId()

/** Feature lists are numbered keys, so the count is declared rather than discovered. */
const featureList = (plan, count) =>
  Array.from({ length: count }, (_, index) => t(`pricing.${plan}.features.${index + 1}`))

const plans = computed(() => [
  {
    key: 'free',
    name: t('pricing.free.name'),
    tagline: t('pricing.free.tagline'),
    price: t('pricing.free.price'),
    period: t('pricing.perMonth'),
    cta: t('pricing.free.cta'),
    features: featureList('free', 5),
    badge: '',
    highlighted: false,
    href: null,
  },
  {
    key: 'complete',
    name: t('pricing.complete.name'),
    tagline: t('pricing.complete.tagline'),
    price: t('pricing.complete.price'),
    period: t('pricing.perMonth'),
    cta: t('pricing.complete.cta'),
    features: featureList('complete', 5),
    badge: t('pricing.complete.badge'),
    highlighted: true,
    href: null,
  },
  {
    key: 'selfHosted',
    name: t('pricing.selfHosted.name'),
    tagline: t('pricing.selfHosted.tagline'),
    price: t('pricing.selfHosted.price'),
    period: t('pricing.perMonth'),
    cta: t('pricing.selfHosted.cta'),
    features: featureList('selfHosted', 5),
    badge: '',
    highlighted: false,
    href: runtime.githubOrg,
  },
])

const FAQ_COUNT = 5

const faq = computed(() =>
  Array.from({ length: FAQ_COUNT }, (_, index) => ({
    key: index + 1,
    q: t(`pricing.faq.${index + 1}.q`),
    a: t(`pricing.faq.${index + 1}.a`),
  })),
)
</script>
