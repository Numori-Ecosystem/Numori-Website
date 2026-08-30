<template>
  <div
    class="rounded-2xl border border-primary-200 bg-white p-6 shadow-glow sm:p-8 dark:border-primary-400/30 dark:bg-gray-900"
  >
    <div class="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-14">
      <!-- ─── Controls ──────────────────────────────────────────── -->
      <div class="min-w-0">
        <label :id="storageLabelId" :for="sliderId" class="block text-base font-semibold">
          {{ $t('pricing.planner.storageLabel') }}
        </label>
        <p :id="storageHintId" class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {{ $t('pricing.planner.storageHint') }}
        </p>

        <p class="mt-6 flex items-baseline gap-2">
          <span
            class="text-4xl font-bold tracking-tight text-primary-600 tabular-nums dark:text-primary-400"
          >
            {{ current.storage }}
          </span>
        </p>

        <!--
          The slider's value is a step index, so `aria-valuetext` is essential:
          without it a screen reader announces "4 of 7" instead of "500 GB".
          UiSlider does not set inheritAttrs:false, so these land on the input.
        -->
        <UiSlider
          :id="sliderId"
          v-model="stepIndex"
          class="mt-4"
          :min="minIndex"
          :max="maxIndex"
          :step="1"
          :aria-labelledby="storageLabelId"
          :aria-describedby="storageHintId"
          :aria-valuetext="current.storage"
        />

        <!-- Visible stops, so the scale is legible without dragging the handle. -->
        <ul
          class="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-500"
          aria-hidden="true"
        >
          <li v-for="stop in stops" :key="stop.label" class="tabular-nums">
            {{ stop.label }}
          </li>
        </ul>

        <!-- ─── People ─────────────────────────────────────────── -->
        <div class="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800">
          <label :for="peopleId" class="block text-base font-semibold">
            {{ $t('pricing.planner.peopleLabel') }}
          </label>
          <p :id="peopleHintId" class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {{ $t('pricing.planner.peopleHint') }}
          </p>

          <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
            <div
              class="inline-flex items-center rounded-full border border-gray-200 p-1 dark:border-gray-700"
            >
              <UiButton
                variant="ghost"
                color="gray"
                size="sm"
                shape="circle"
                icon-only
                :disabled="effectivePeople <= 1"
                :aria-label="$t('pricing.planner.removePerson')"
                @click="setPeople(effectivePeople - 1)"
              >
                <Icon name="mdi:minus" class="size-4" />
              </UiButton>

              <!--
                A native number input rather than UiInput: UiInput's root is a
                wrapper div, so an `id` passed to it lands there instead of on the
                inner input and `<label for>` silently stops working. Its stepper
                buttons also carry hardcoded English aria-labels, which will not do
                on a bilingual site.

                `@change` rather than `@input` so typing a two-digit number is not
                clamped after the first keystroke.
              -->
              <input
                :id="peopleId"
                type="number"
                inputmode="numeric"
                :value="effectivePeople"
                min="1"
                :max="current.maxPeople"
                step="1"
                :aria-describedby="peopleHintId"
                class="w-14 rounded-md border-0 bg-transparent text-center text-base font-semibold tabular-nums"
                @change="setPeople($event.target.value)"
              >

              <UiButton
                variant="ghost"
                color="gray"
                size="sm"
                shape="circle"
                icon-only
                :disabled="effectivePeople >= current.maxPeople"
                :aria-label="$t('pricing.planner.addPerson')"
                @click="setPeople(effectivePeople + 1)"
              >
                <Icon name="mdi:plus" class="size-4" />
              </UiButton>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{
                $t('pricing.planner.peopleMax', {
                  count: current.maxPeople,
                  storage: current.storage,
                })
              }}
            </p>
          </div>

          <p v-if="effectivePeople > 1" class="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {{ $t('pricing.planner.perPerson', { price: perPersonPrice }) }}
          </p>
        </div>
      </div>

      <!-- ─── Price ─────────────────────────────────────────────── -->
      <div
        class="rounded-xl border border-gray-200 bg-gray-50 p-6 lg:w-72 dark:border-gray-700 dark:bg-gray-950"
      >
        <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {{ $t('pricing.planner.priceLabel') }}
        </p>

        <!-- `relative` keeps the outgoing price out of flow so the box does not jump. -->
        <div class="relative mt-3 min-h-20">
          <Transition name="swap" mode="out-in">
            <div :key="`${current.monthly}-${billing}`">
              <p class="flex items-baseline gap-1.5">
                <span class="text-4xl font-bold tracking-tight tabular-nums">
                  {{ formatMoney(current.monthly) }}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ $t('pricing.perMonth') }}
                </span>
              </p>

              <p
                v-if="billing === 'yearly'"
                class="mt-1 text-xs text-gray-500 dark:text-gray-400"
              >
                {{ $t('pricing.billedYearly', { total: formatMoney(current.yearlyTotal) }) }}
              </p>
            </div>
          </Transition>
        </div>

        <!--
          One polite live region for the whole configuration. Announcing the
          slider and the price separately would talk over the value the range
          input already reports as you drag it.
        -->
        <p aria-live="polite" class="sr-only">{{ spokenSummary }}</p>

        <dl class="mt-4 flex flex-col gap-2 border-t border-gray-200 pt-4 text-sm dark:border-gray-700">
          <div class="flex items-baseline justify-between gap-3">
            <dt class="text-gray-600 dark:text-gray-400">
              {{ $t('pricing.planner.storageRow') }}
            </dt>
            <dd class="font-semibold tabular-nums">{{ current.storage }}</dd>
          </div>
          <div class="flex items-baseline justify-between gap-3">
            <dt class="text-gray-600 dark:text-gray-400">
              {{ $t('pricing.planner.peopleRow') }}
            </dt>
            <dd class="font-semibold tabular-nums">{{ effectivePeople }}</dd>
          </div>
          <div class="flex items-baseline justify-between gap-3">
            <dt class="text-gray-600 dark:text-gray-400">
              {{ $t('pricing.planner.appsRow') }}
            </dt>
            <dd class="font-semibold">{{ $t('pricing.planner.appsValue') }}</dd>
          </div>
        </dl>

        <div class="mt-6">
          <slot name="action" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * StoragePlanner — the pricing page's calculator.
 *
 * Replaces the old tier cards. There was nothing to differentiate tiers *by*:
 * every account gets every app and every feature, so a set of cards could only
 * repeat the same feature list four times with a different number at the top,
 * and the earlier attempt drifted into inventing differences (domain counts,
 * version-history retention, "priority" support) to fill the space. A slider
 * states the actual model — one axis, storage — and leaves no room to smuggle a
 * feature difference back in.
 *
 * Accessibility notes, since a slider is easy to get wrong:
 * - The range input's value is a step *index*, so `aria-valuetext` carries the
 *   real quota. Without it the announcement is "4 of 7".
 * - The label is a real `<label for>`, and the hint is wired up with
 *   `aria-describedby`.
 * - The visible stop scale is `aria-hidden`: it duplicates what the slider
 *   already reports, and reading eight numbers aloud is noise.
 * - One polite live region describes the whole configuration rather than one per
 *   control, so dragging does not produce overlapping announcements.
 *
 * @example
 * <StoragePlanner v-model:step="step" v-model:people="people" billing="yearly">
 *   <template #action><ButtonLink :to="…" block>Join</ButtonLink></template>
 * </StoragePlanner>
 *
 * @emits {number} update:step — Selected index into STORAGE_STEPS.
 * @emits {number} update:people — Selected number of accounts.
 *
 * @slot action — The call to action, shown under the price.
 */
import { FREE_STEP_INDEX, PRICE_PER_EXTRA_PERSON, STORAGE_STEPS, quote } from '~/data/plans'
import { formatMoney as format } from '~/utils/site'

const props = defineProps({
  /**
   * Selected index into STORAGE_STEPS (v-model:step).
   * @type {number}
   */
  step: { type: Number, required: true },

  /**
   * Number of accounts, including the first (v-model:people).
   * @type {number}
   * @default 1
   */
  people: { type: Number, default: 1 },

  /**
   * Billing period, which decides whether the displayed price is the true
   * monthly one or the monthly equivalent of the yearly total.
   * @type {string}
   * @default 'monthly'
   * @values 'monthly' | 'yearly'
   */
  billing: { type: String, default: 'monthly' },
})

const emit = defineEmits(['update:step', 'update:people'])

const { t, locale } = useI18n()

const sliderId = useId()
const storageLabelId = useId()
const storageHintId = useId()
const peopleId = useId()
const peopleHintId = useId()

/** The free step is not on the paid curve, so the slider starts above it. */
const minIndex = FREE_STEP_INDEX + 1
const maxIndex = STORAGE_STEPS.length - 1

const stepIndex = computed({
  get: () => props.step,
  set: (value) => emit('update:step', value),
})

const stops = computed(() => STORAGE_STEPS.slice(minIndex))

const current = computed(() =>
  quote({ stepIndex: props.step, people: props.people, billing: props.billing }),
)

/**
 * The seat count actually in force. `quote()` clamps to what the chosen quota
 * allows, so this can differ from the `people` prop for a tick after the storage
 * slider moves down. Rendering the clamped value means the field never briefly
 * displays a number that is not on offer.
 */
const effectivePeople = computed(() => current.value.people)

/** Clamps, floors and emits. Tolerates the raw string from the number input. */
const setPeople = (value) => {
  const parsed = Math.floor(Number(value))
  const next = Math.min(current.value.maxPeople, Math.max(1, Number.isFinite(parsed) ? parsed : 1))
  if (next !== props.people) emit('update:people', next)
}

/**
 * Reducing storage can put the seat count above the new maximum. Push the clamped
 * value back to the parent so its state matches what is being quoted, rather than
 * leaving a stale number that reappears if storage goes back up.
 */
watch(
  () => current.value.maxPeople,
  (max) => {
    if (props.people > max) emit('update:people', max)
  },
)

const formatMoney = (amount) => format(amount, locale.value)

const perPersonPrice = computed(() => formatMoney(PRICE_PER_EXTRA_PERSON))

/**
 * "1 person" / "2 people", pluralised. Interpolating the bare number into the
 * summary produced "500 GB for 1 people", and the plural form has to be chosen
 * by vue-i18n rather than assembled here so Spanish gets its own rule.
 */
const spokenPeople = computed(() =>
  t('pricing.planner.peopleCount', effectivePeople.value, { count: effectivePeople.value }),
)

const spokenSummary = computed(() =>
  t('pricing.planner.summary', {
    storage: current.value.storage,
    people: spokenPeople.value,
    price: formatMoney(current.value.monthly),
  }),
)
</script>
