<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <h2 :id="groupId" class="sr-only">{{ $t('pricing.billing.label') }}</h2>

    <UiSegmented
      :model-value="modelValue"
      :options="options"
      :aria-labelledby="groupId"
      @update:model-value="emit('update:modelValue', $event)"
    />

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
 * Built on the design system's `UiSegmented`: a set of `aria-pressed` buttons in
 * a labelled group rather than a switch, because this is a choice between two
 * named options, not an on/off state, and "Yearly is off" is not a sensible
 * thing for a screen reader to say. The group is named by the visually hidden
 * heading via `aria-labelledby`.
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
