<template>
  <div class="container-page py-10 sm:py-12">
    <div class="lg:grid lg:grid-cols-[15rem_1fr] lg:gap-12">
      <!-- ─── Sidebar ─────────────────────────────────────────────
        A <details> on small screens so the long component list does not push
        the content off the fold; a plain sticky column from lg up.
      -->
      <details ref="disclosure" class="group mb-6 lg:mb-0 lg:hidden">
        <summary
          class="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold dark:border-gray-700 dark:bg-gray-900"
        >
          {{ $t('ui.nav.title') }}
          <Icon
            name="mdi:chevron-down"
            class="size-5 text-gray-400 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div class="mt-3 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
          <UiDocsNav :groups="componentGroups" :getting-started="gettingStarted" />
        </div>
      </details>

      <aside class="hidden lg:block">
        <nav
          :aria-label="$t('ui.nav.title')"
          class="sticky top-28 max-h-[calc(100dvh-8rem)] overflow-y-auto pb-8 pr-2"
        >
          <UiDocsNav :groups="componentGroups" :getting-started="gettingStarted" />
        </nav>
      </aside>

      <!-- ─── Content ─────────────────────────────────────────────── -->
      <div class="min-w-0">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * UiDocsShell — the two-column frame every Numori UI manual page sits in: a
 * navigation rail on the left, page content on the right.
 *
 * The rail is shared with the mobile disclosure through the small `UiDocsNav`
 * child, so there is one source of links rather than two markup copies to keep
 * in sync. The shell sits *below* a page's `PageHeader`, inside the normal site
 * layout, so the global header, footer and breadcrumb all still apply.
 *
 * @slot default — The page body shown in the content column.
 */
const { gettingStarted, componentGroups } = useUiDocs()
const route = useRoute()

// Collapse the mobile disclosure after navigating, so tapping a link does not
// leave the whole list open on top of the page you asked for.
const disclosure = ref(null)
watch(
  () => route.path,
  () => {
    if (disclosure.value) disclosure.value.open = false
  },
)
</script>
