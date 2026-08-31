<template>
  <div class="flex flex-col gap-10">
    <div v-for="group in groups" :key="group.key">
      <h3
        class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
      >
        {{ group.title }}
      </h3>
      <ul class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="component in group.components" :key="component.slug">
          <NuxtLink
            :to="component.to"
            class="card-interactive group flex h-full items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
          >
            <span
              class="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700 dark:bg-primary-400/15 dark:text-primary-300"
            >
              <Icon :name="component.icon" class="size-5" aria-hidden="true" />
            </span>
            <span class="min-w-0">
              <span class="block font-mono text-sm font-semibold">{{ component.name }}</span>
              <span class="mt-0.5 block text-xs leading-snug text-gray-500 dark:text-gray-400">
                {{ component.summary }}
              </span>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
/**
 * UiComponentGallery — the grouped grid of component cards, shared by the manual
 * overview and the components index so both present the catalogue identically.
 */
defineProps({
  /** Component groups from `useUiDocs().componentGroups`. */
  groups: { type: Array, required: true },
})
</script>
