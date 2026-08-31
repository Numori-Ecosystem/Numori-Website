<template>
  <div class="flex flex-col gap-7 text-sm">
    <!-- ─── Getting started ─────────────────────────────────────── -->
    <div>
      <h2
        class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
      >
        {{ $t('ui.nav.gettingStarted') }}
      </h2>
      <ul class="flex flex-col gap-0.5">
        <li v-for="item in gettingStarted" :key="item.key">
          <NuxtLink
            :to="item.to"
            class="block rounded-lg px-3 py-1.5 transition-colors"
            :class="linkClass(isActive(item))"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- ─── Components, grouped ─────────────────────────────────── -->
    <div v-for="group in groups" :key="group.key">
      <h2
        class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
      >
        {{ group.title }}
      </h2>
      <ul class="flex flex-col gap-0.5">
        <li v-for="component in group.components" :key="component.slug">
          <NuxtLink
            :to="component.to"
            class="flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors"
            :class="linkClass(current === component.to)"
            :aria-current="current === component.to ? 'page' : undefined"
          >
            <Icon :name="component.icon" class="size-4 shrink-0 opacity-70" aria-hidden="true" />
            {{ component.base }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
/**
 * UiDocsNav — the link list for the manual's navigation rail.
 *
 * Split out from `UiDocsShell` so the desktop sidebar and the mobile
 * disclosure render the exact same links. Active state is derived from the
 * current path: an exact match for a component page, and for the getting-started
 * links, the overview entry lights up whenever you are on the overview page.
 */
defineProps({
  /** Component groups from `useUiDocs().componentGroups`. */
  groups: { type: Array, required: true },
  /** Getting-started entries from `useUiDocs().gettingStarted`. */
  gettingStarted: { type: Array, required: true },
})

const route = useRoute()
const current = computed(() => route.path)

/** Getting-started items carry anchors; match on the path before the hash. */
const isActive = (item) => {
  if (item.exact) return current.value === item.to
  return false
}

const linkClass = (active) =>
  active
    ? 'bg-primary-50 font-medium text-primary-700 dark:bg-primary-400/10 dark:text-primary-300'
    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
</script>
