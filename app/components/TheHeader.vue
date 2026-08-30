<template>
  <header
    class="sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-300 dark:bg-gray-925/85"
    :class="
      scrolled
        ? 'border-gray-200 shadow-sm dark:border-gray-800'
        : 'border-transparent shadow-none dark:border-transparent'
    "
  >
    <div class="container-page flex h-16 items-center gap-4">
      <NuxtLink
        :to="localePath('/')"
        class="group rounded-lg"
        :aria-label="`${$t('site.name')} — ${$t('nav.home')}`"
      >
        <BrandWordmark
          class="transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-100"
        />
      </NuxtLink>

      <!-- Desktop navigation -->
      <nav :aria-label="$t('nav.primary')" class="ml-auto hidden lg:block">
        <ul class="flex items-center gap-1">
          <li v-for="item in primary" :key="item.key">
            <NuxtLink
              :to="item.to"
              :aria-current="item.current ? 'page' : undefined"
              class="block rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              :class="
                item.current
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              "
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="ml-auto flex items-center gap-2 lg:ml-0">
        <!--
          Donate sits with the actions rather than in the nav list: it is something
          to do, not somewhere to go, and an accent button is far more visible than
          a sixth link would be.
        -->
        <ButtonLink
          :to="donate.to"
          class="hidden lg:inline-flex"
          variant="outline"
          size="sm"
          :aria-current="donate.current ? 'page' : undefined"
        >
          <Icon name="mdi:heart-outline" class="mr-1.5 size-4" aria-hidden="true" />
          {{ donate.label }}
        </ButtonLink>

        <LocaleSwitcher class="hidden sm:block" />
        <ThemeSwitcher />

        <UiButton
          ref="toggleRef"
          class="lg:hidden"
          variant="ghost"
          color="gray"
          icon-only
          :aria-label="open ? $t('nav.closeMenu') : $t('nav.openMenu')"
          :aria-expanded="String(open)"
          aria-controls="mobile-menu"
          @click="open = !open"
        >
          <Icon :name="open ? 'mdi:close' : 'mdi:menu'" class="size-5" />
        </UiButton>
      </div>
    </div>

    <!--
      Mobile menu. Rendered as a disclosure rather than a modal dialog: it is a
      list of links inside the page flow, so it needs aria-expanded and
      aria-controls, not a focus trap.

      Wrapped in Transition with v-show rather than v-if so the panel stays in the
      DOM and `aria-controls` always points at a real element.
    -->
    <Transition name="disclosure">
      <div
        v-show="open"
        id="mobile-menu"
        class="border-t border-gray-200 bg-white lg:hidden dark:border-gray-800 dark:bg-gray-925"
      >
        <nav :aria-label="$t('nav.primary')" class="container-page py-4">
          <ul class="flex flex-col gap-1">
            <li v-for="item in primary" :key="item.key">
              <NuxtLink
                :to="item.to"
                :aria-current="item.current ? 'page' : undefined"
                class="block rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-200"
                :class="
                  item.current
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                "
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>

          <div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-800">
            <ButtonLink
              :to="donate.to"
              block
              variant="outline"
              :aria-current="donate.current ? 'page' : undefined"
            >
              <Icon name="mdi:heart-outline" class="mr-1.5 size-4" aria-hidden="true" />
              {{ donate.label }}
            </ButtonLink>
          </div>

          <div class="mt-4 sm:hidden">
            <LocaleSwitcher />
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
/**
 * TheHeader — sticky site header with the primary navigation.
 *
 * The mobile menu is a disclosure: the toggle owns `aria-expanded` and
 * `aria-controls`, and the panel is a plain region of links. Escape closes it and
 * returns focus to the toggle, because a keyboard user who dismisses a panel
 * should not be dropped at the top of the document.
 *
 * `v-show` rather than `v-if` keeps the panel in the DOM so `aria-controls`
 * always points at a real element.
 *
 * @example
 * <TheHeader />
 */
const localePath = useLocalePath()
const route = useRoute()
const { primary, donate } = useNavigation()

const open = ref(false)
const toggleRef = ref(null)

/**
 * The header starts flush with the hero and grows a border and shadow once the
 * page moves, so it reads as part of the hero at rest and as a bar over content
 * once you scroll.
 */
const scrolled = ref(false)

if (import.meta.client) {
  useEventListener(
    window,
    'scroll',
    () => {
      scrolled.value = window.scrollY > 8
    },
    { passive: true },
  )
}

/** Close on navigation — the panel stays mounted, so it will not close itself. */
watch(() => route.fullPath, () => {
  open.value = false
})

const closeAndRestoreFocus = () => {
  if (!open.value) return
  open.value = false
  // UiButton is a component, so reach through to its root element.
  toggleRef.value?.$el?.focus?.()
}

// Registered during setup (not in onMounted) so the listener is bound to this
// component's effect scope and torn down with it. Guarded because `document`
// does not exist while rendering on the server.
if (import.meta.client) {
  useEventListener(document, 'keydown', (event) => {
    if (event.key === 'Escape') closeAndRestoreFocus()
  })
}
</script>
