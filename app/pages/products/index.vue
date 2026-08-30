<template>
  <div>
    <PageHeader
      wash
      :title="$t('products.index.title')"
      :subtitle="$t('products.index.subtitle')"
    >
      <UiAlert color="gray" icon="mdi:information-outline" size="sm" class="mt-8 max-w-2xl">
        {{ $t('status.honestNote') }}
      </UiAlert>
    </PageHeader>

    <div class="container-page py-12">
      <!-- ─── Status filter ─────────────────────────────────────── -->
      <div class="flex flex-wrap items-center gap-3">
        <h2 :id="filterId" class="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {{ $t('products.index.filterLabel') }}
        </h2>

        <div role="group" :aria-labelledby="filterId" class="flex flex-wrap gap-2">
          <button
            v-for="option in filters"
            :key="option.value ?? 'all'"
            type="button"
            :aria-pressed="active === option.value ? 'true' : 'false'"
            class="rounded-full border px-3 py-1.5 text-sm font-medium transition-colors"
            :class="
              active === option.value
                ? 'border-primary-500 bg-primary-500 text-white'
                : 'border-gray-300 text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500'
            "
            @click="active = option.value"
          >
            {{ option.label }}
            <span class="opacity-70">({{ option.count }})</span>
          </button>
        </div>
      </div>

      <!--
        Announces the result count after a filter change. Without it, pressing a
        filter visibly changes the grid and says nothing to a screen-reader user.
      -->
      <p aria-live="polite" class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {{ countLabel }}
      </p>

      <!-- ─── Grouped results ───────────────────────────────────── -->
      <div v-if="visibleGroups.length" class="mt-10 flex flex-col gap-14">
        <section v-for="group in visibleGroups" :key="group.key" :aria-labelledby="`group-${group.key}`">
          <div class="mb-6">
            <h2 :id="`group-${group.key}`" class="text-xl font-bold">{{ group.title }}</h2>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{{ group.description }}</p>
          </div>

          <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="product in group.products" :key="product.slug">
              <ProductCard :product="product" />
            </li>
          </ul>
        </section>
      </div>

      <p v-else class="mt-10 text-gray-600 dark:text-gray-400">
        {{ $t('products.index.empty') }}
      </p>
    </div>
  </div>
</template>

<script setup>
/**
 * Products index: every product and service, grouped by category, with a
 * client-side status filter.
 *
 * The filter is a group of toggle buttons carrying `aria-pressed` rather than a
 * set of links, because it narrows the current view instead of navigating. The
 * result count sits in a polite live region so the change is announced.
 */
const { t } = useI18n()
const { grouped, statusOptions, total } = useProducts()

usePageSeo({
  title: t('products.meta.title'),
  description: t('products.meta.description'),
})

const filterId = useId()

/** `null` means "no filter". */
const active = ref(null)

const filters = computed(() => [
  { value: null, label: t('products.index.filterAll'), count: total },
  ...statusOptions.value,
])

const visibleGroups = computed(() =>
  grouped.value
    .map((group) => ({
      ...group,
      products: active.value
        ? group.products.filter((product) => product.status === active.value)
        : group.products,
    }))
    .filter((group) => group.products.length > 0),
)

const visibleCount = computed(() =>
  visibleGroups.value.reduce((sum, group) => sum + group.products.length, 0),
)

const countLabel = computed(() =>
  active.value
    ? t('products.index.countFiltered', { count: visibleCount.value, total })
    : t('products.index.countAll', { count: total }),
)
</script>
