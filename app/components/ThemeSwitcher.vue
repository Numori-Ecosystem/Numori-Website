<template>
  <ClientOnly>
    <UiButton
      variant="ghost"
      color="gray"
      icon-only
      :title="label"
      :aria-label="label"
      class="group"
      @click="toggle"
    >
      <!--
        The two icons cross-fade and rotate rather than swapping instantly, so the
        change of state reads as one control turning over.
      -->
      <span class="grid size-5 place-items-center">
        <Icon
          name="mdi:weather-sunny"
          class="col-start-1 row-start-1 size-5 transition-all duration-300"
          :class="isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'"
        />
        <Icon
          name="mdi:weather-night"
          class="col-start-1 row-start-1 size-5 transition-all duration-300"
          :class="isDark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'"
        />
      </span>
    </UiButton>

    <template #fallback>
      <!--
        The rendered theme is only known once the client has read the stored
        preference, so the server cannot pick an icon without risking a
        hydration mismatch. This placeholder reserves the same space.
      -->
      <div class="size-9" aria-hidden="true" />
    </template>
  </ClientOnly>
</template>

<script setup>
/**
 * ThemeSwitcher — toggles between the light and dark themes.
 *
 * Writes to `colorMode.preference`, which @nuxtjs/color-mode persists and
 * reflects as a `dark` class on `<html>` — the class the numori-ui theme's dark
 * variant is keyed to.
 *
 * The button is icon-only, so it carries both `title` and `aria-label`: the
 * first for pointer users, the second because an icon has no accessible name.
 *
 * @example
 * <ThemeSwitcher />
 */
const colorMode = useColorMode()
const { t } = useI18n()

const isDark = computed(() => colorMode.value === 'dark')
const label = computed(() => (isDark.value ? t('theme.toLight') : t('theme.toDark')))

const toggle = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>
