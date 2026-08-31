<template>
  <div class="flex flex-col gap-10">
    <div v-for="group in groups" :key="group.key">
      <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {{ group.title }}
      </h3>
      <ul class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="component in group.components" :key="component.slug">
          <UiCard
            tag="NuxtLink"
            interactive
            shadow="none"
            radius="xl"
            padding="sm"
            :to="component.to"
            class="group flex h-full items-start gap-3 hover:border-gray-300 dark:hover:border-gray-600"
          >
            <UiIconTile :icon="component.icon" size="sm" />
            <span class="min-w-0">
              <span class="block font-mono text-sm font-semibold">{{ component.name }}</span>
              <span class="mt-0.5 block text-xs leading-snug text-gray-500 dark:text-gray-400">
                {{ component.summary }}
              </span>
            </span>
          </UiCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
/**
 * UiComponentGallery — the grouped grid of component cards, shared by the manual
 * overview and the components index so both present the catalogue identically.
 *
 * Each entry is a `UiCard` rendered as a `NuxtLink` with a `UiIconTile` mark —
 * the same design system primitives the manual documents.
 */
defineProps({
  /** Component groups from `useUiDocs().componentGroups`. */
  groups: { type: Array, required: true },
})
</script>
