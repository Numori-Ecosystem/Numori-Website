<template>
  <footer class="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
    <div class="container-page py-12 sm:py-16">
      <div class="grid gap-10 lg:grid-cols-[2fr_3fr]">
        <div>
          <NuxtLink
            :to="localePath('/')"
            class="inline-block rounded-lg"
            :aria-label="`${$t('site.name')} — ${$t('nav.home')}`"
          >
            <BrandWordmark />
          </NuxtLink>

          <p class="mt-4 max-w-sm text-sm text-gray-600 dark:text-gray-400">
            {{ $t('footer.tagline') }}
          </p>

          <p class="mt-4 max-w-sm text-xs text-gray-500 dark:text-gray-500">
            {{ $t('footer.noTracking') }}
          </p>
        </div>

        <nav :aria-label="$t('nav.footer')">
          <div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div v-for="group in footer" :key="group.key">
              <h2 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {{ group.title }}
              </h2>

              <ul class="mt-3 flex flex-col gap-2">
                <li v-for="link in group.links" :key="link.label">
                  <NuxtLink
                    v-if="link.to"
                    :to="link.to"
                    class="rounded text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {{ link.label }}
                  </NuxtLink>

                  <a
                    v-else
                    :href="link.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group inline-flex items-center gap-1 rounded text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {{ link.label }}
                    <Icon
                      name="mdi:open-in-new"
                      class="size-3.5 text-gray-400 dark:text-gray-500"
                      aria-hidden="true"
                    />
                    <span class="sr-only">({{ $t('common.opensInNewTab') }})</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div
        class="mt-12 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800"
      >
        <p class="text-xs text-gray-500 dark:text-gray-500">
          {{ $t('footer.rights', { year }) }}
        </p>

        <a
          :href="`${runtime.githubOrg}/Numori-Website`"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded text-xs text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200"
        >
          <Icon name="mdi:github" class="size-4" aria-hidden="true" />
          {{ $t('footer.builtWith') }}
          <span class="sr-only">({{ $t('common.opensInNewTab') }})</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
/**
 * TheFooter — site footer with grouped links, licence notice and a link to this
 * website's own repository.
 *
 * External links carry `rel="noopener noreferrer"` and a screen-reader-only
 * "opens in a new tab" note, so the change of context is announced rather than
 * only implied by an icon.
 *
 * @example
 * <TheFooter />
 */
const localePath = useLocalePath()
const { footer } = useNavigation()
const { public: runtime } = useRuntimeConfig()

/**
 * Computed once per render rather than at module load, so a long-lived server
 * process does not keep serving last year's notice.
 */
const year = computed(() => new Date().getFullYear())
</script>
