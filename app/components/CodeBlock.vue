<template>
  <div class="group relative">
    <div
      v-if="label"
      class="flex items-center justify-between rounded-t-xl border border-b-0 border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400"
    >
      <span>{{ label }}</span>
    </div>

    <button
      type="button"
      class="absolute right-2 top-2 z-10 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white/80 px-2.5 py-1.5 text-xs font-medium text-gray-600 opacity-0 backdrop-blur transition-all hover:bg-white hover:text-gray-900 focus-visible:opacity-100 group-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
      :class="label ? 'top-11' : 'top-2'"
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
      class="overflow-x-auto border border-gray-200 bg-gray-950 p-4 text-[13px] leading-relaxed text-gray-100 dark:border-gray-700"
      :class="label ? 'rounded-b-xl' : 'rounded-xl'"
    ><code>{{ code }}</code></pre>
  </div>
</template>

<script>
/**
 * CodeBlock — a static, copyable snippet.
 *
 * For code that documents itself rather than running: install commands, config
 * files, import statements. Live component demos use `CodePreview` instead. The
 * copy affordance appears on hover or keyboard focus so it stays out of the way
 * while reading.
 */
export default {
  props: {
    /** The snippet text. */
    code: { type: String, required: true },
    /** Optional filename/language caption shown above the block. */
    label: { type: String, default: '' },
  },
  data() {
    return { copied: false }
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
        // Clipboard unavailable; ignore rather than throw in a docs page.
      }
    },
  },
}
</script>
