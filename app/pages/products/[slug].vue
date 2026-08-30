<template>
  <div v-if="product">
    <PageHeader wash :title="product.name" :subtitle="product.tagline">
      <template #breadcrumb>
        <BreadcrumbTrail
          :items="[
            { label: $t('nav.products'), to: localePath('/products') },
            { label: product.name },
          ]"
        />
      </template>

      <template #mark>
        <ProductMark :icon="product.icon" :accent="product.accent" size="lg" />
      </template>

      <div class="mt-6 flex flex-wrap items-center gap-2">
        <StatusBadge :status="product.status" size="sm" />
        <AccessBadge :access="product.access" size="sm" />
        <UiBadge color="gray" size="sm">{{ product.categoryLabel }}</UiBadge>
      </div>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <ExternalButton v-if="product.url" :href="product.url" size="lg">
          {{ $t('common.openApp') }}
        </ExternalButton>

        <ExternalButton
          :href="product.repoUrl"
          :variant="product.url ? 'outline' : 'solid'"
          :color="product.url ? 'gray' : 'primary'"
          size="lg"
        >
          <Icon name="mdi:github" class="mr-2 size-5" aria-hidden="true" />
          {{ $t('common.viewOnGithub') }}
        </ExternalButton>
      </div>
    </PageHeader>

    <div class="container-page py-12 sm:py-16">
      <div class="grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <div class="min-w-0">
          <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {{ product.summary }}
          </p>

          <!-- Honesty banner: never describe unshipped software as if it exists. -->
          <div class="mt-8">
            <PlaceholderNotice
              v-if="product.status !== 'beta'"
              :title="$t('products.page.placeholderTitle')"
              :body="$t('products.page.placeholderBody', { name: product.name })"
            />

            <UiAlert v-else color="green" icon="mdi:flask-outline" bordered size="md" role="note">
              {{ $t('status.betaHint') }}
            </UiAlert>
          </div>

          <!-- ─── Perks ───────────────────────────────────────────── -->
          <section :aria-labelledby="ids.perks" class="mt-14">
            <h2 :id="ids.perks" class="reveal text-2xl font-bold">
              {{ $t('products.page.perks') }}
            </h2>

            <ul class="reveal-stagger mt-6 grid gap-5 sm:grid-cols-2">
              <li
                v-for="perk in perks"
                :key="perk.title"
                class="card-interactive rounded-2xl border border-gray-200 bg-white p-5 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
              >
                <h3 class="text-base font-semibold">{{ perk.title }}</h3>
                <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {{ perk.body }}
                </p>
              </li>
            </ul>
          </section>

          <!-- ─── Source ──────────────────────────────────────────── -->
          <section
            :aria-labelledby="ids.source"
            class="mt-14 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900"
          >
            <h2 :id="ids.source" class="text-lg font-semibold">
              {{ $t('products.page.sourceTitle') }}
            </h2>

            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {{ $t('products.page.sourceBody', { name: product.name }) }}
            </p>

            <div class="mt-5">
              <ExternalButton :href="product.repoUrl" variant="outline" color="gray">
                <Icon name="mdi:github" class="mr-2 size-4" aria-hidden="true" />
                {{ product.repo }}
              </ExternalButton>
            </div>
          </section>
        </div>

        <!-- ─── Sidebar ───────────────────────────────────────────── -->
        <aside class="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          <section :aria-labelledby="ids.status">
            <h2
              :id="ids.status"
              class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
            >
              {{ $t('status.label') }}
            </h2>

            <p class="mt-3 flex items-center gap-2">
              <StatusBadge :status="product.status" size="sm" />
            </p>

            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {{ $t(`status.${product.status}Hint`) }}
            </p>
          </section>

          <section :aria-labelledby="ids.access">
            <h2
              :id="ids.access"
              class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
            >
              {{ $t('access.label') }}
            </h2>

            <p class="mt-3">
              <AccessBadge :access="product.access" size="sm" />
            </p>

            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {{ $t(`access.${product.access}Hint`) }}
            </p>

            <p v-if="product.access !== 'infrastructure'" class="mt-3">
              <ButtonLink :to="localePath('/pricing')" variant="text" size="sm">
                {{ $t('nav.pricing') }}
                <Icon name="mdi:arrow-right" class="ml-1 size-4" aria-hidden="true" />
              </ButtonLink>
            </p>
          </section>

          <!--
            What a free account adds, for the apps that work without one. This is a
            separate question from whether the product costs money: most of these
            are free either way, but markedly more useful signed in.
          -->
          <section v-if="product.syncsWithAccount" :aria-labelledby="ids.account">
            <h2
              :id="ids.account"
              class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
            >
              {{ $t('access.accountLabel') }}
            </h2>

            <p class="mt-2 flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Icon
                name="mdi:cloud-sync-outline"
                class="mt-0.5 size-4 shrink-0 text-sky-600 dark:text-sky-400"
                aria-hidden="true"
              />
              {{ $t(`products.${product.slug}.account`) }}
            </p>
          </section>

          <section :aria-labelledby="ids.platforms">
            <h2
              :id="ids.platforms"
              class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
            >
              {{ $t('platforms.label') }}
            </h2>

            <ul class="mt-3 flex flex-wrap gap-1.5">
              <li v-for="platform in product.platforms" :key="platform">
                <UiBadge color="gray" size="sm">{{ $t(`platforms.${platform}`) }}</UiBadge>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>

    <!-- ─── Related ─────────────────────────────────────────────── -->
    <section
      :aria-labelledby="ids.related"
      class="border-t border-gray-200 bg-gray-50 py-section dark:border-gray-800 dark:bg-gray-950"
    >
      <div class="container-page">
        <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 :id="ids.related" class="text-xl font-bold">{{ $t('products.page.related') }}</h2>

          <ButtonLink :to="localePath('/products')" variant="text">
            {{ $t('common.seeAllProducts') }}
            <Icon name="mdi:arrow-right" class="ml-1 size-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="item in relatedProducts" :key="item.slug">
            <ProductCard :product="item" compact />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * Product detail page.
 *
 * Everything on this page comes from the catalogue plus the locale files, so a
 * new product needs no new component. Pages for unfinished products carry a
 * prominent notice: writing present-tense marketing copy for software that does
 * not exist is precisely what this project argues against.
 */
const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()
const { find, perksOf, related } = useProducts()
const { public: runtime } = useRuntimeConfig()

const slug = computed(() => String(route.params.slug))
const product = computed(() => find(slug.value))

// Prerendering must fail loudly for an unknown slug rather than emit a blank
// page, so this throws instead of rendering a "not found" state inline.
if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('products.page.notFound'),
    fatal: true,
  })
}

const perks = computed(() => perksOf(product.value))
const relatedProducts = computed(() => related(slug.value))

const ids = {
  perks: useId(),
  source: useId(),
  status: useId(),
  access: useId(),
  account: useId(),
  platforms: useId(),
}

usePageSeo(() => ({
  title: `${product.value.name} — ${product.value.tagline}`,
  description: product.value.summary,
}))

// Product names already begin with "Numori", so the global "— Numori" suffix
// would read as "Numori Notes — … — Numori". Opt this page out of the template.
useHead({ titleTemplate: '%s' })

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: product.value.name,
          description: product.value.summary,
          applicationCategory: 'BusinessApplication',
          operatingSystem: product.value.platforms.join(', '),
          license: 'https://www.gnu.org/licenses/agpl-3.0.html',
          codeRepository: product.value.repo,
          isAccessibleForFree: true,
          publisher: { '@type': 'Organization', name: t('site.name'), url: runtime.siteUrl },
        }),
      ),
    },
  ],
})
</script>
