<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <h2 :id="groupId" class="sr-only">{{ $t('pricing.billing.label') }}</h2>

    <div
      role="group"
      :aria-labelledby="groupId"
      class="relative inline-flex rounded-full border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-900"
    >
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        :aria-pressed="modelValue === option.value ? 'true' : 'false'"
        class="relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200"
        :class="
          modelValue === option.value
            ? 'text-white'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
        "
        @click="emit('update:modelValue', option.value)"
      >
        <!--
          The moving pill is a sibling behind the labels rather than a background
          on the active button, so it can slide between them. `layout` is shared
          across both buttons, which is what makes Vue reuse the element and
          animate it instead of swapping two different ones.
        -->
        <span
          v-if="modelValue === option.value"
          class="absolute inset-0 -z-10 rounded-full bg-primary-500 transition-all duration-300"
          style="view-transition-name: billing-pill"
          aria-hidden="true"
        />
        {{ option.label }}
      </button>
    </div>

    <Transition name="swap">
      <span
        v-if="modelValue === 'yearly'"
        class="inline-flex items-center gap-1 rounded-full bg-success-100 px-2.5 py-1 text-xs font-semibold text-success-800 dark:bg-success-400/15 dark:text-success-300"
      >
        <Icon name="mdi:tag-outline" class="size-3.5" aria-hidden="true" />
        {{ $t('pricing.billing.save') }}
      </span>
    </Transition>
  </div>
</template>

<script setup>
/**
 * BillingToggle — switches the pricing page between monthly and yearly prices.
 *
 * Two `aria-pressed` buttons in a labelled group rather than a switch: this is a
 * choice between two named options, not an on/off state, and "Yearly is off" is
 * not a sensible thing for a screen reader to say.
 *
 * The saving badge only appears on the yearly option, and it animates in so the
 * page does not reflow abruptly underneath the pointer.
 *
 * @example
 * <BillingToggle v-model="billing" />
 *
 * @emits {string} update:modelValue — 'monthly' or 'yearly'
 */
defineProps({
  /**
   * Active billing period (v-model).
   * @type {string}
   * @default 'monthly'
   * @values 'monthly' | 'yearly'
   */
  modelValue: { type: String, default: 'monthly' },
})

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()
const groupId = useId()

const options = computed(() => [
  { value: 'monthly', label: t('pricing.billing.monthly') },
  { value: 'yearly', label: t('pricing.billing.yearly') },
])
</script>
