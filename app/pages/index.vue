<template>
  <div>
    <!-- ─── Hero ──────────────────────────────────────────────── -->
    <section class="hero-wash border-b border-gray-200 dark:border-gray-800">
      <!--
        The hero animates on load rather than on scroll: it is already in view, so
        a scroll-linked reveal would never fire. Staggered delays let it assemble
        top-down instead of arriving all at once.
      -->
      <div class="container-page py-20 text-center sm:py-28">
        <p
          class="mb-5 inline-flex animate-rise-sm items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 dark:border-primary-400/30 dark:bg-primary-400/10 dark:text-primary-300"
        >
          <Icon name="mdi:code-braces" class="size-4" aria-hidden="true" />
          {{ $t('home.hero.eyebrow') }}
        </p>

        <h1
          class="mx-auto max-w-3xl animate-rise text-4xl font-bold tracking-tight [animation-delay:60ms] sm:text-6xl"
        >
          {{ $t('home.hero.title') }}
        </h1>

        <p
          class="mx-auto mt-6 max-w-2xl animate-rise text-lg text-gray-600 [animation-delay:140ms] sm:text-xl dark:text-gray-400"
        >
          {{ $t('home.hero.subtitle') }}
        </p>

        <p
          class="mt-5 animate-rise text-sm font-semibold text-gray-700 [animation-delay:220ms] dark:text-gray-300"
        >
          {{ $t('home.hero.note') }}
        </p>

        <div
          class="mt-10 flex animate-rise flex-wrap items-center justify-center gap-3 [animation-delay:300ms]"
        >
          <ButtonLink :to="localePath('/products')" size="lg">
            {{ $t('home.hero.ctaPrimary') }}
          </ButtonLink>

          <ButtonLink :to="localePath('/about')" variant="outline" color="gray" size="lg">
            {{ $t('home.hero.ctaSecondary') }}
          </ButtonLink>
        </div>
      </div>
    </section>

    <!-- ─── Principles ────────────────────────────────────────── -->
    <section :aria-labelledby="ids.principles" class="container-page py-section">
      <SectionHeading
        :id="ids.principles"
        centred
        class="reveal"
        :title="$t('home.principles.title')"
        :subtitle="$t('home.principles.subtitle')"
      />

      <ul class="reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="principle in principles" :key="principle.key">
          <PrincipleCard
            :icon="principle.icon"
            :title="$t(`home.principles.${principle.key}.title`)"
            :body="$t(`home.principles.${principle.key}.body`)"
          />
        </li>
      </ul>
    </section>

    <!-- ─── Featured products ─────────────────────────────────── -->
    <section
      :aria-labelledby="ids.products"
      class="border-y border-gray-200 bg-gray-50 py-section dark:border-gray-800 dark:bg-gray-950"
    >
      <div class="container-page">
        <SectionHeading
          :id="ids.products"
          class="reveal"
          :title="$t('home.products.title')"
          :subtitle="$t('home.products.subtitle')"
        />

        <ul class="reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="product in featured" :key="product.slug">
            <ProductCard :product="product" />
          </li>
        </ul>

        <div class="mt-10 text-center">
          <ButtonLink :to="localePath('/products')" variant="outline" color="gray">
            {{ $t('home.products.cta', { count: total }) }}
          </ButtonLink>
        </div>
      </div>
    </section>

    <!-- ─── Comparison ────────────────────────────────────────── -->
    <section :aria-labelledby="ids.comparison" class="container-page py-section">
      <SectionHeading
        :id="ids.comparison"
        class="reveal"
        :title="$t('home.comparison.title')"
        :subtitle="$t('home.comparison.subtitle')"
      />

      <UiTable
        class="reveal"
        :caption="$t('home.comparison.caption')"
        hide-caption
        :columns="comparisonColumns"
        :rows="comparisonRows"
      />
    </section>

    <!-- ─── Latest posts ──────────────────────────────────────── -->
    <section
      v-if="posts?.length"
      :aria-labelledby="ids.blog"
      class="border-t border-gray-200 py-section dark:border-gray-800"
    >
      <div class="container-page">
        <SectionHeading
          :id="ids.blog"
          class="reveal"
          :title="$t('home.blog.title')"
          :subtitle="$t('home.blog.subtitle')"
        />

        <ul class="reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="post in posts" :key="post.path">
            <BlogCard :post="post" />
          </li>
        </ul>

        <div class="mt-10">
          <ButtonLink :to="localePath('/blog')" variant="text">
            {{ $t('common.seeAllPosts') }}
            <Icon name="mdi:arrow-right" class="ml-1 size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>

    <!-- ─── Closing call to action ────────────────────────────── -->
    <CtaBand :title="$t('home.cta.title')" :body="$t('home.cta.body')">
      <ExternalButton :href="runtime.githubOrg" size="lg">
        <Icon name="mdi:github" class="mr-2 size-5" aria-hidden="true" />
        {{ $t('home.cta.primary') }}
      </ExternalButton>

      <ButtonLink :to="localePath('/products')" variant="outline" color="gray" size="lg">
        {{ $t('home.cta.secondary') }}
      </ButtonLink>
    </CtaBand>

    <!-- ─── Donations ─────────────────────────────────────────── -->
    <!--
      Most visitors will never pay us: no app requires a subscription and nine of
      the thirteen need no account. So the home page asks once, plainly, and
      explains what the money is actually for.
    -->
    <section :aria-labelledby="ids.donate" class="container-page py-section">
      <div
        class="reveal flex flex-col items-start gap-6 rounded-2xl border border-primary-200 bg-primary-50 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between dark:border-primary-400/30 dark:bg-primary-400/5"
      >
        <div class="max-w-2xl">
          <h2 :id="ids.donate" class="flex items-center gap-2 text-xl font-bold sm:text-2xl">
            <Icon name="mdi:heart-outline" class="size-6 text-primary-500" aria-hidden="true" />
            {{ $t('home.donate.title') }}
          </h2>
          <p class="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">
            {{ $t('home.donate.body') }}
          </p>
        </div>

        <ButtonLink :to="localePath('/donate')" size="lg" class="shrink-0">
          {{ $t('home.donate.cta') }}
          <Icon name="mdi:arrow-right" class="ml-2 size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * Home page: the pitch, the six commitments, the products we are furthest along
 * with, an honest comparison, and the latest writing.
 */
const { t } = useI18n()
const localePath = useLocalePath()
const { public: runtime } = useRuntimeConfig()
const { featured, total } = useProducts()

usePageSeo({
  title: t('home.meta.title'),
  description: t('home.meta.description'),
})

/**
 * Section heading ids, generated so `aria-labelledby` stays unique even if a
 * section is ever rendered twice.
 */
const ids = {
  principles: useId(),
  donate: useId(),
  products: useId(),
  comparison: useId(),
  blog: useId(),
}

/** Order matters: privacy and openness first, since they carry the argument. */
const principles = [
  { key: 'private', icon: 'mdi:shield-lock-outline' },
  { key: 'open', icon: 'mdi:code-braces' },
  { key: 'noAi', icon: 'mdi:robot-off-outline' },
  { key: 'priced', icon: 'mdi:tag-outline' },
  { key: 'craft', icon: 'mdi:hammer-wrench' },
  { key: 'portable', icon: 'mdi:export-variant' },
]

const COMPARISON_KEYS = ['source', 'ai', 'tracking', 'pricing', 'selfHosting', 'export']

const comparisonColumns = computed(() => [
  { key: 'feature', header: true },
  {
    key: 'primary',
    label: t('home.comparison.columnNumori'),
    highlight: true,
    icon: 'mdi:check-circle',
  },
  {
    key: 'secondary',
    label: t('home.comparison.columnTypical'),
    icon: 'mdi:minus-circle-outline',
  },
])

const comparisonRows = computed(() =>
  COMPARISON_KEYS.map((key) => ({
    key,
    feature: t(`home.comparison.rows.${key}.feature`),
    primary: t(`home.comparison.rows.${key}.numori`),
    secondary: t(`home.comparison.rows.${key}.typical`),
  })),
)

const { data: posts } = await usePostList({ limit: 3 })
</script>
