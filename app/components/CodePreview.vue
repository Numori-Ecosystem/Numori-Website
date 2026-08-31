<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
  >
    <!-- ─── Live render ───────────────────────────────────────────
      The example's template string is compiled at runtime (see nuxt.config
      `vue.runtimeCompiler`) so the demo and the source below can never drift:
      they are literally the same string. Interactive examples bind to the
      reactive `state` object provided here, since the string carries no
      <script> of its own.
    -->
    <div
      class="flex min-h-28 flex-wrap items-center gap-4 bg-gray-50 p-6 dark:bg-gray-950/40"
      :class="center ? 'justify-center' : ''"
    >
      <p v-if="failed" class="text-sm text-gray-400 dark:text-gray-500">
        {{ $t('ui.previewUnavailable') }}
      </p>
      <component :is="demo" v-else />
    </div>

    <!-- ─── Source ────────────────────────────────────────────────── -->
    <div class="relative border-t border-gray-200 dark:border-gray-800">
      <button
        type="button"
        class="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white/80 px-2.5 py-1.5 text-xs font-medium text-gray-600 backdrop-blur transition-colors hover:bg-white hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        @click="copy"
      >
        <Icon
          :name="copied ? 'mdi:check' : 'mdi:content-copy'"
          class="size-3.5"
          :class="copied ? 'text-success-600 dark:text-success-400' : ''"
          aria-hidden="true"
        />
        {{ copied ? $t('ui.copied') : $t('ui.copy') }}
      </button>

      <pre
        class="overflow-x-auto p-4 pr-24 text-[13px] leading-relaxed text-gray-800 dark:text-gray-200"
      ><code>{{ code }}</code></pre>
    </div>
  </div>
</template>

<script>
import { components as baseComponents } from 'numori-ui/src/components/index.js'

/**
 * Every Numori UI component, keyed by its prefixed tag name (`UiButton`, …).
 *
 * Imported from the library's own source barrel — the exact modules the Nuxt
 * module auto-imports — rather than the `numori-ui` dist entry. That identity
 * matters: `UiIcon` reads its host icon component from an injection key, and the
 * module provides that key from source, so importing the source components lets
 * the icons in a demo delegate to `@nuxt/icon` just as they do everywhere else.
 *
 * These are handed to each compiled demo as its local `components`, because the
 * demo template is compiled at runtime and Nuxt's build-time auto-imports do not
 * exist for it — without this, every `<Ui…>` tag would resolve to nothing, and
 * the preview would render as if the library were not installed at all.
 */
const UI_COMPONENTS = Object.fromEntries(
  Object.entries(baseComponents).map(([base, component]) => [`Ui${base}`, component]),
)

/**
 * CodePreview — a live component demo paired with its exact source.
 *
 * The `code` prop is a template-only string from the Numori UI catalogue
 * (`app/data/ui-components.js`). It is compiled on the fly and rendered above
 * the source, so the running example is guaranteed to match the snippet a
 * reader copies. Every `Ui*` tag in it resolves to the component registered on
 * the demo below, and any state it needs lives on the reactive `state` object
 * created per demo.
 *
 * Written in the Options API rather than `<script setup>` because the demo is a
 * component defined per instance from a prop: `data()` gives each preview its
 * own reactive `state` bag without a hoisted module-scope ref.
 *
 * @example
 * <CodePreview :code="example.code" />
 */
export default {
  props: {
    /**
     * Template markup to compile and display. Tags must be globally registered
     * components; interactive bindings use the provided reactive `state`.
     * @type {string}
     */
    code: { type: String, required: true },

    /**
     * Centre the rendered demo horizontally.
     * @type {boolean}
     */
    center: { type: Boolean, default: false },
  },
  data() {
    return { copied: false, failed: false }
  },
  computed: {
    demo() {
      return {
        // The library components, registered locally so the runtime-compiled
        // template can resolve every <Ui…> tag.
        components: UI_COMPONENTS,
        // A fresh reactive scratchpad per demo. Reading an unset key returns
        // undefined (fine in a template); writing through v-model defines it.
        data() {
          return { state: {} }
        },
        template: this.code,
      }
    },
  },
  // Contain a bad example to its own card rather than letting a compile or
  // render error blank the whole page.
  errorCaptured() {
    this.failed = true
    return false
  },
  methods: {
    async copy() {
      try {
        await navigator.clipboard.writeText(this.code)
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 1600)
      } catch {
        // Clipboard can be unavailable (insecure context, denied permission).
        // Silently no-op rather than throwing in a docs preview.
      }
    },
  },
}
</script>
