<template>
  <div v-if="component">
    <PageHeader wash :title="component.name" :subtitle="component.summary">
      <template #breadcrumb>
        <BreadcrumbTrail
          :items="[
            { label: $t('nav.products'), to: localePath('/products') },
            { label: 'Numori UI', to: overviewPath },
            { label: $t('ui.index.title'), to: indexPath },
            { label: component.name },
          ]"
        />
      </template>

      <template #mark>
        <ProductMark :icon="component.icon" accent="primary" size="lg" />
      </template>

      <div class="mt-6 flex flex-wrap items-center gap-3">
        <UiBadge color="gray" size="sm">{{ categoryTitle }}</UiBadge>
        <ExternalButton :href="sourceUrl" variant="text" color="gray" size="sm">
          <Icon name="mdi:github" class="mr-1.5 size-4" aria-hidden="true" />
          {{ $t('common.viewSource') }}
        </ExternalButton>
      </div>
    </PageHeader>

    <UiDocsShell>
      <article class="max-w-3xl">
        <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {{ component.description }}
        </p>

        <!-- ─── Examples ──────────────────────────────────────────── -->
        <section :aria-labelledby="ids.examples" class="mt-12 scroll-mt-32">
          <h2 :id="ids.examples" class="text-2xl font-bold">{{ $t('ui.component.examples') }}</h2>
          <div class="mt-6 flex flex-col gap-10">
            <div v-for="example in component.examples" :key="example.title">
              <h3 class="text-base font-semibold">{{ example.title }}</h3>
              <p
                v-if="example.description"
                class="mb-4 mt-1 text-sm text-gray-600 dark:text-gray-400"
              >
                {{ example.description }}
              </p>
              <CodePreview :code="example.code" />
            </div>
          </div>
        </section>

        <!-- ─── Props ─────────────────────────────────────────────── -->
        <section :aria-labelledby="ids.props" class="mt-14 scroll-mt-32">
          <h2 :id="ids.props" class="text-2xl font-bold">{{ $t('ui.component.props') }}</h2>

          <p v-if="!component.props.length" class="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {{ $t('ui.component.noProps') }}
          </p>

          <div
            v-else
            class="mt-5 overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700"
          >
            <table class="w-full min-w-[40rem] border-collapse text-left text-sm">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                  <th scope="col" class="px-4 py-3 font-semibold">{{ $t('ui.component.name') }}</th>
                  <th scope="col" class="px-4 py-3 font-semibold">{{ $t('ui.component.type') }}</th>
                  <th scope="col" class="px-4 py-3 font-semibold">
                    {{ $t('ui.component.default') }}
                  </th>
                  <th scope="col" class="px-4 py-3 font-semibold">
                    {{ $t('ui.component.description') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="prop in component.props"
                  :key="prop.name"
                  class="border-b border-gray-100 align-top last:border-0 dark:border-gray-800"
                >
                  <td class="px-4 py-3">
                    <span class="font-mono font-medium text-primary-700 dark:text-primary-300">{{
                      prop.name
                    }}</span>
                    <span
                      v-if="prop.required"
                      class="ml-1.5 align-middle text-[10px] font-semibold uppercase tracking-wide text-error-600 dark:text-error-400"
                    >
                      {{ $t('ui.component.required') }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <code class="text-xs text-gray-600 dark:text-gray-400">{{ prop.type }}</code>
                  </td>
                  <td class="px-4 py-3">
                    <code class="text-xs text-gray-500 dark:text-gray-500">{{
                      prop.default
                    }}</code>
                  </td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {{ prop.description }}
                    <span v-if="prop.values" class="mt-1.5 flex flex-wrap gap-1">
                      <code
                        v-for="value in prop.values"
                        :key="value"
                        class="rounded bg-gray-100 px-1.5 py-0.5 text-[11px] text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        >{{ value }}</code
                      >
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ─── Events ────────────────────────────────────────────── -->
        <section v-if="component.events.length" :aria-labelledby="ids.events" class="mt-14 scroll-mt-32">
          <h2 :id="ids.events" class="text-2xl font-bold">{{ $t('ui.component.events') }}</h2>
          <div class="mt-5 overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
            <table class="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                  <th scope="col" class="px-4 py-3 font-semibold">{{ $t('ui.component.event') }}</th>
                  <th scope="col" class="px-4 py-3 font-semibold">
                    {{ $t('ui.component.payload') }}
                  </th>
                  <th scope="col" class="px-4 py-3 font-semibold">
                    {{ $t('ui.component.description') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="event in component.events"
                  :key="event.name"
                  class="border-b border-gray-100 align-top last:border-0 dark:border-gray-800"
                >
                  <td class="px-4 py-3">
                    <code class="font-mono font-medium text-primary-700 dark:text-primary-300">{{
                      event.name
                    }}</code>
                  </td>
                  <td class="px-4 py-3">
                    <code class="text-xs text-gray-600 dark:text-gray-400">{{ event.payload }}</code>
                  </td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-300">{{ event.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ─── Slots ─────────────────────────────────────────────── -->
        <section v-if="component.slots.length" :aria-labelledby="ids.slots" class="mt-14 scroll-mt-32">
          <h2 :id="ids.slots" class="text-2xl font-bold">{{ $t('ui.component.slots') }}</h2>
          <div class="mt-5 overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
            <table class="w-full min-w-[28rem] border-collapse text-left text-sm">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                  <th scope="col" class="px-4 py-3 font-semibold">{{ $t('ui.component.slot') }}</th>
                  <th scope="col" class="px-4 py-3 font-semibold">
                    {{ $t('ui.component.description') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="slot in component.slots"
                  :key="slot.name"
                  class="border-b border-gray-100 align-top last:border-0 dark:border-gray-800"
                >
                  <td class="px-4 py-3">
                    <code class="font-mono font-medium text-primary-700 dark:text-primary-300">{{
                      slot.name
                    }}</code>
                  </td>
                  <td class="px-4 py-3 text-gray-600 dark:text-gray-300">{{ slot.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ─── Prev / next ───────────────────────────────────────── -->
        <nav
          class="mt-16 flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:justify-between dark:border-gray-800"
          :aria-label="$t('ui.component.pager')"
        >
          <NuxtLink
            v-if="pager.prev"
            :to="pager.prev.to"
            class="group flex flex-col rounded-xl border border-gray-200 p-4 transition-colors hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 sm:w-64"
          >
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ $t('ui.component.prev') }}</span>
            <span class="mt-1 flex items-center gap-1 font-mono font-semibold">
              <Icon name="mdi:arrow-left" class="size-4" aria-hidden="true" />
              {{ pager.prev.name }}
            </span>
          </NuxtLink>
          <span v-else />

          <NuxtLink
            v-if="pager.next"
            :to="pager.next.to"
            class="group flex flex-col rounded-xl border border-gray-200 p-4 text-right transition-colors hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 sm:w-64"
          >
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ $t('ui.component.next') }}</span>
            <span class="mt-1 flex items-center justify-end gap-1 font-mono font-semibold">
              {{ pager.next.name }}
              <Icon name="mdi:arrow-right" class="size-4" aria-hidden="true" />
            </span>
          </NuxtLink>
        </nav>
      </article>
    </UiDocsShell>
  </div>
</template>

<script setup>
/**
 * A single component's reference page: description, live examples, and the full
 * props / events / slots tables — all read from the catalogue in
 * `app/data/ui-components.js`, so adding a component needs no new page.
 *
 * The examples are rendered live by `CodePreview`, which compiles the very
 * string it displays, so the demo can never fall out of step with the snippet.
 */
import {
  UI_COMPONENT_CATEGORIES,
  UI_REPO,
  findUiComponent,
} from '~/data/ui-components'
import { GITHUB_ORG } from '~/data/products'

// No page fade between component pages: with a persistent sidebar the fade
// reads as the whole view flashing. Instant content swap feels like docs.
definePageMeta({ pageTransition: false, layoutTransition: false })

const route = useRoute()
const localePath = useLocalePath()
const { overviewPath, indexPath, neighbours } = useUiDocs()

const slug = computed(() => String(route.params.component))
const component = computed(() => findUiComponent(slug.value))

// Prerendering must fail loudly on an unknown component rather than emit a blank
// page, matching how the product detail page handles an unknown slug.
if (!component.value) {
  throw createError({ statusCode: 404, statusMessage: 'Unknown component', fatal: true })
}

const categoryTitle = computed(
  () =>
    UI_COMPONENT_CATEGORIES.find((category) => category.key === component.value.category)?.title ??
    component.value.category,
)

/** The component's source file on GitHub. The icon lives outside components/. */
const sourceUrl = computed(() => {
  const path =
    component.value.base === 'Icon'
      ? 'src/icons/Icon.vue'
      : `src/components/${component.value.base}.vue`
  return `${GITHUB_ORG}/${UI_REPO}/blob/main/${path}`
})

const pager = computed(() => neighbours(slug.value))

const ids = {
  examples: useId(),
  props: useId(),
  events: useId(),
  slots: useId(),
}

usePageSeo(() => ({
  title: `${component.value.name} — Numori UI`,
  description: component.value.summary,
}))

// Title already carries the brand, so skip the global "— Numori" suffix.
useHead({ titleTemplate: '%s' })
</script>
