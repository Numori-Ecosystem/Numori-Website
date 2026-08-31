<template>
  <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
    <!-- ─── Live render ───────────────────────────────────────────
      The example's template string is compiled at runtime (see nuxt.config
      `vue.runtimeCompiler`) so the demo and the source below can never drift:
      they are literally the same string. Interactive examples bind to the
      reactive `state` object provided here, since the string carries no
      <script> of its own.

      This region is deliberately not clipped: overlays such as UiTooltip and
      UiDropdown position themselves absolutely relative to their trigger, so a
      clipped card would cut them off. Letting it overflow lets them show in full.
    -->
    <div
      class="flex min-h-28 flex-wrap items-center gap-4 rounded-t-2xl bg-gray-50 p-6 dark:bg-gray-950/40"
      :class="center ? 'justify-center' : ''"
    >
      <p v-if="failed" class="text-sm text-gray-400 dark:text-gray-500">
        {{ $t('ui.previewUnavailable') }}
      </p>
      <component :is="demo" v-else />
    </div>

    <!-- ─── Source ────────────────────────────────────────────────── -->
    <div
      class="code-source relative overflow-hidden rounded-b-2xl border-t border-gray-200 dark:border-gray-800"
    >
      <button
        type="button"
        class="absolute right-2 top-2 z-10 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white/80 px-2.5 py-1.5 text-xs font-medium text-gray-600 backdrop-blur transition-colors hover:bg-white hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
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

      <!-- Highlighted markup, produced by Shiki at prerender time. The plain
           <pre> is the fallback when highlighting is unavailable. The v-html is
           Shiki output from our own static catalogue strings, never user input. -->
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="highlighted" v-html="highlighted" />
      <pre
        v-else
        class="overflow-x-auto p-4 pr-24 text-[13px] leading-relaxed text-gray-800 dark:text-gray-200"
      ><code>{{ code }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { computed, onErrorCaptured, ref } from 'vue'
import { components as baseComponents } from 'numori-ui/src/components/index.js'

/**
 * CodePreview — a live component demo paired with its exact, syntax-highlighted
 * source.
 *
 * The `code` prop is a template-only string from the Numori UI catalogue
 * (`app/data/ui-components.js`). It is compiled on the fly and rendered above
 * the source, so the running example is guaranteed to match the snippet a reader
 * copies. Every `Ui*` tag in it resolves to a component registered on the demo
 * below, and any state it needs lives on the reactive `state` object created per
 * demo.
 *
 * @example
 * <CodePreview :code="example.code" />
 */

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
 * exist for it — without this, every `<Ui…>` tag would resolve to nothing.
 */
const UI_COMPONENTS = Object.fromEntries(
  Object.entries(baseComponents).map(([base, component]) => [`Ui${base}`, component]),
)

const props = defineProps({
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
})

const copied = ref(false)
const failed = ref(false)

/**
 * The demo component, defined per instance from the `code` prop. `data()` gives
 * each preview its own reactive `state` bag; reading an unset key returns
 * undefined (fine in a template), and writing through v-model defines it.
 */
const demo = computed(() => ({
  components: UI_COMPONENTS,
  data() {
    return { state: {} }
  },
  template: props.code,
}))

// Contain a bad example to its own card rather than letting a compile or render
// error blank the whole page.
onErrorCaptured(() => {
  failed.value = true
  return false
})

/**
 * Syntax-highlight the source with Shiki. This runs once on the server during
 * prerender; the result is serialised into the page payload, so the highlighter
 * never loads on the client and the hydrated markup matches the server's. A dual
 * light/dark theme with `defaultColor: false` emits both palettes as CSS
 * variables, and `assets/css/main.css` switches to the dark one under `.dark`.
 */
const { data: highlighted } = await useAsyncData(
  `code-preview-${hashCode(props.code)}`,
  async () => {
    // Guarded so Vite dead-code-eliminates the Shiki import from the client
    // build: the branch is unreachable there, so the highlighter (and its wasm
    // engine) never ships to the browser. On the client the extracted payload
    // supplies the already-highlighted markup, so this handler never runs anyway.
    if (import.meta.server) {
      const { codeToHtml } = await import('shiki')
      return codeToHtml(props.code, {
        lang: 'vue-html',
        themes: { light: 'github-light', dark: 'github-dark' },
        defaultColor: false,
      })
    }
    return null
  },
)

/** Small stable hash so the async-data key stays short and per-snippet. */
function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0
  }
  return (hash >>> 0).toString(36)
}

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1600)
  } catch {
    // Clipboard can be unavailable (insecure context, denied permission).
    // Silently no-op rather than throwing in a docs preview.
  }
}
</script>
