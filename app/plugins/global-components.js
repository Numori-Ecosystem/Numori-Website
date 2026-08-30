import { NuxtLink } from '#components'

/**
 * Registers NuxtLink as an app-level global component.
 *
 * numori-ui's UiButton renders `<component :is="tag">` and declares `tag` as a
 * `String`, so the only way to make it render a NuxtLink without a prop type
 * warning is to pass the name and have Vue resolve it at runtime.
 *
 * That resolution needs a *global* registration. Nuxt's own `<NuxtLink>` support
 * is a compile-time auto-import applied per file, so it is invisible to
 * `resolveDynamicComponent` inside a library component — the string falls through
 * and Vue renders a literal `<NuxtLink>` element with no `href`, silently, with no
 * warning. Registering it here is what makes `tag="NuxtLink"` actually work.
 *
 * This is the same mechanism numori-ui already relies on for icons: its Nuxt
 * module provides the icon component as a bare name and expects the host app to
 * have registered it globally, which is exactly what @nuxt/icon does.
 *
 * Global registration is a fallback — the compiled auto-import still wins wherever
 * a template writes `<NuxtLink>` directly, so nothing else changes.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('NuxtLink', NuxtLink)
})
