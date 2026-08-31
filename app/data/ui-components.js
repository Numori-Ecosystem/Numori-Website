/**
 * Numori UI documentation catalogue.
 *
 * Language-independent facts about every component the library ships: its API
 * surface (props, events, slots) and worked examples, extracted from the JSDoc
 * that lives at the top of each component's source in ../../numori-ui. This is
 * the sibling of app/data/products.js — data, not copy — and it drives the
 * component reference pages under /products/ui.
 *
 * Each example's `code` is a TEMPLATE-ONLY string. The manual compiles it live
 * with Vue's runtime compiler and also shows it verbatim as the source, so the
 * demo and the documented snippet can never drift. Two rules keep that working:
 * every tag is a globally registered `Ui*` component, and any interactive state
 * lives on a reactive `state` object supplied by the preview (e.g.
 * `v-model="state.value"`), never a local `ref` — the string carries no script.
 */

/** Prefix every registered tag uses on this site (matches nuxt.config `numoriUi.prefix`). */
export const UI_PREFIX = 'Ui'

/** Repository name within the Numori GitHub organisation. */
export const UI_REPO = 'Numori-UI'

/**
 * Component groupings, in display order. Mirrors the sections in the library's
 * own README so the manual and the source tell the same story.
 */
export const UI_COMPONENT_CATEGORIES = [
  { key: 'actions', title: 'Actions', description: 'Triggers and command surfaces.' },
  { key: 'forms', title: 'Forms', description: 'Inputs and controls for collecting data.' },
  { key: 'overlays', title: 'Overlays', description: 'Layers that sit above the page.' },
  { key: 'feedback', title: 'Feedback', description: 'Status, messaging and progress.' },
  {
    key: 'display',
    title: 'Layout & display',
    description: 'Structure and presentational primitives.',
  },
]

/**
 * @typedef {object} UiProp
 * @property {string} name
 * @property {string} type
 * @property {string} default Display string, e.g. "'solid'" or 'false'.
 * @property {boolean} [required]
 * @property {string[]|null} values Allowed values, or null when unconstrained.
 * @property {string} description
 *
 * @typedef {object} UiEvent
 * @property {string} name
 * @property {string} payload
 * @property {string} description
 *
 * @typedef {object} UiSlot
 * @property {string} name
 * @property {string} description
 *
 * @typedef {object} UiExample
 * @property {string} title
 * @property {string} description
 * @property {string} code Template-only markup; see the file header.
 *
 * @typedef {object} UiComponent
 * @property {string} slug Stable URL segment.
 * @property {string} base PascalCase base name (matches the .vue file).
 * @property {string} name Registered tag, `Ui` + base.
 * @property {string} category Key from UI_COMPONENT_CATEGORIES.
 * @property {string} icon MDI icon representing the component.
 * @property {string} summary One-line description.
 * @property {string} description A sentence or two of prose.
 * @property {UiProp[]} props
 * @property {UiEvent[]} events
 * @property {UiSlot[]} slots
 * @property {UiExample[]} examples
 */

/** @type {UiComponent[]} */
export const uiComponents = [
  // ── Actions ─────────────────────────────────────────────────────
  {
    slug: 'button',
    base: 'Button',
    name: 'UiButton',
    category: 'actions',
    icon: 'mdi:gesture-tap-button',
    summary: 'Versatile button with variants, colours, sizes and shapes.',
    description:
      'Renders as any element (button, anchor, div) with eight visual variants, six colour themes, five sizes and three shapes. Includes a loading state, icon-only mode and full accessibility attributes. External Tailwind classes are merged with tailwind-merge so they override the internals.',
    props: [
      {
        name: 'tag',
        type: 'string',
        default: "'button'",
        values: ['button', 'a', 'div', 'any valid tag'],
        description: 'HTML element (or component) to render as.',
      },
      {
        name: 'nativeType',
        type: 'string',
        default: "'button'",
        values: ['button', 'submit', 'reset'],
        description: "Native `type`, only applied when the tag is 'button'.",
      },
      {
        name: 'variant',
        type: 'string',
        default: "'solid'",
        values: ['solid', 'outline', 'ghost', 'dashed', 'text', 'link', 'menu-item', 'list-item'],
        description: 'Visual style controlling background, border and hover.',
      },
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        values: ['primary', 'gray', 'red', 'green', 'amber', 'white'],
        description: 'Colour theme.',
      },
      {
        name: 'size',
        type: 'string',
        default: "'md'",
        values: ['xs', 'sm', 'md', 'lg', 'xl'],
        description: 'Padding, font size and gap.',
      },
      {
        name: 'shape',
        type: 'string',
        default: "'round'",
        values: ['round', 'pill', 'square'],
        description: 'Border-radius shape. For a circular icon button, use pill with icon-only.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Dims the button and blocks interaction.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Shows a spinner and disables the button.',
      },
      {
        name: 'loadingStyle',
        type: 'string',
        default: "'spinner'",
        values: ['spinner', 'icon'],
        description:
          "'spinner' replaces content; 'icon' keeps it and exposes a `spinning` slot prop.",
      },
      {
        name: 'spinner',
        type: 'string',
        default: "'mdi:loading'",
        values: null,
        description: 'MDI icon used for the spinner.',
      },
      {
        name: 'block',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Full-width layout.',
      },
      {
        name: 'iconOnly',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Equal padding for a square or circular icon button.',
      },
      {
        name: 'href',
        type: 'string',
        default: 'undefined',
        values: null,
        description: "URL, only applied when the tag is 'a'.",
      },
      {
        name: 'title',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Native `title` tooltip.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Accessible label for screen readers.',
      },
      {
        name: 'ariaChecked',
        type: 'string | boolean',
        default: 'undefined',
        values: null,
        description: 'ARIA checked state for toggle-style buttons.',
      },
      {
        name: 'role',
        type: 'string',
        default: 'undefined',
        values: null,
        description: "ARIA role override (e.g. 'switch', 'tab').",
      },
      {
        name: 'tabindex',
        type: 'string | number',
        default: 'undefined',
        values: null,
        description: 'Keyboard navigation order.',
      },
    ],
    events: [],
    slots: [
      { name: 'default', description: 'Button content: label text, icons, or any children.' },
    ],
    examples: [
      {
        title: 'Variants',
        description: 'Eight visual styles, from filled to inline link.',
        code: `<div class="flex flex-wrap items-center gap-3">
  <UiButton>Solid</UiButton>
  <UiButton variant="outline">Outline</UiButton>
  <UiButton variant="ghost">Ghost</UiButton>
  <UiButton variant="dashed">Dashed</UiButton>
  <UiButton variant="text">Text</UiButton>
  <UiButton variant="link">Link</UiButton>
</div>`,
      },
      {
        title: 'Colours',
        description: 'Each variant carries the full colour set.',
        code: `<div class="flex flex-wrap items-center gap-3">
  <UiButton color="primary">Primary</UiButton>
  <UiButton color="gray">Gray</UiButton>
  <UiButton color="red">Red</UiButton>
  <UiButton color="green">Green</UiButton>
  <UiButton color="amber">Amber</UiButton>
</div>`,
      },
      {
        title: 'Sizes',
        description: 'Five sizes from xs to xl.',
        code: `<div class="flex flex-wrap items-center gap-3">
  <UiButton size="xs">Extra small</UiButton>
  <UiButton size="sm">Small</UiButton>
  <UiButton size="md">Medium</UiButton>
  <UiButton size="lg">Large</UiButton>
  <UiButton size="xl">Extra large</UiButton>
</div>`,
      },
      {
        title: 'Icons and loading',
        description: 'Compose an icon in the default slot; toggle the loading state by clicking.',
        code: `<div class="flex flex-wrap items-center gap-3">
  <UiButton>
    <UiIcon name="mdi:content-save" class="w-4 h-4" /> Save
  </UiButton>
  <UiButton variant="ghost" color="gray" icon-only aria-label="Settings">
    <UiIcon name="mdi:cog-outline" class="w-5 h-5" />
  </UiButton>
  <UiButton variant="outline" color="red" :loading="state.busy" @click="state.busy = !state.busy">
    Delete
  </UiButton>
</div>`,
      },
      {
        title: 'Shapes',
        description:
          'Three shapes: round, pill and square. For a circular icon button, pair pill with icon-only.',
        code: `<div class="flex flex-wrap items-center gap-3">
  <UiButton shape="round">Round</UiButton>
  <UiButton shape="pill">Pill</UiButton>
  <UiButton shape="square">Square</UiButton>
  <UiButton shape="pill" icon-only aria-label="Add">
    <UiIcon name="mdi:plus" class="w-5 h-5" />
  </UiButton>
</div>`,
      },
      {
        title: 'Block',
        description: 'block stretches the button to the full width of its container.',
        code: `<div class="max-w-sm">
  <UiButton block>Full-width action</UiButton>
</div>`,
      },
      {
        title: 'Menu and list rows',
        description:
          'The menu-item and list-item variants are full-width, left-aligned rows for dropdowns and settings lists.',
        code: `<div class="w-60 rounded-xl border border-gray-200 p-1 dark:border-gray-700">
  <UiButton variant="menu-item"><UiIcon name="mdi:pencil" class="w-4 h-4" /> Edit</UiButton>
  <UiButton variant="menu-item"><UiIcon name="mdi:content-copy" class="w-4 h-4" /> Duplicate</UiButton>
  <UiButton variant="menu-item" color="red"><UiIcon name="mdi:trash-can-outline" class="w-4 h-4" /> Delete</UiButton>
</div>`,
      },
    ],
  },
  // ── Forms ───────────────────────────────────────────────────────
  {
    slug: 'input',
    base: 'Input',
    name: 'UiInput',
    category: 'forms',
    icon: 'mdi:form-textbox',
    summary: 'Text, number, password, email, phone and textarea input.',
    description:
      'A single control covering text, number (with steppers), password (with a visibility toggle), email, phone and textarea, plus optional leading/trailing icons, a clear button and built-in validation.',
    props: [
      {
        name: 'modelValue',
        type: 'string | number',
        default: "''",
        values: null,
        description: 'The field value (v-model).',
      },
      {
        name: 'type',
        type: 'string',
        default: "'text'",
        values: ['text', 'number', 'password', 'email', 'phone', 'textarea'],
        description: 'Input kind.',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "''",
        values: null,
        description: 'Placeholder text.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Marks the field required for validation.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Disables the field.',
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Makes the field read-only.',
      },
      {
        name: 'autocomplete',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Native autocomplete hint.',
      },
      {
        name: 'minlength',
        type: 'number',
        default: 'undefined',
        values: null,
        description: 'Minimum length.',
      },
      {
        name: 'maxlength',
        type: 'number',
        default: 'undefined',
        values: null,
        description: 'Maximum length.',
      },
      { name: 'rows', type: 'number', default: '3', values: null, description: 'Textarea rows.' },
      {
        name: 'resize',
        type: 'string',
        default: "'none'",
        values: ['none', 'vertical', 'horizontal', 'both'],
        description: 'Textarea resize behaviour.',
      },
      {
        name: 'minHeight',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Minimum height (textarea).',
      },
      {
        name: 'maxHeight',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Maximum height (textarea).',
      },
      {
        name: 'minWidth',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Minimum width.',
      },
      {
        name: 'maxWidth',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Maximum width.',
      },
      {
        name: 'pattern',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Native validation pattern.',
      },
      {
        name: 'showToggle',
        type: 'boolean',
        default: 'true',
        values: null,
        description: 'Show the password visibility toggle.',
      },
      {
        name: 'min',
        type: 'number',
        default: 'undefined',
        values: null,
        description: 'Minimum value (number).',
      },
      {
        name: 'max',
        type: 'number',
        default: 'undefined',
        values: null,
        description: 'Maximum value (number).',
      },
      {
        name: 'step',
        type: 'number',
        default: '1',
        values: null,
        description: 'Step increment (number).',
      },
      {
        name: 'stepperLayout',
        type: 'string',
        default: "'both-sides'",
        values: ['stacked-left', 'stacked-right', 'both-sides', 'none'],
        description: 'Where the number steppers sit.',
      },
      {
        name: 'clearable',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Show a clear button when there is a value.',
      },
      {
        name: 'iconLeft',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Leading MDI icon.',
      },
      {
        name: 'iconRight',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Trailing MDI icon.',
      },
      {
        name: 'validate',
        type: 'boolean',
        default: 'true',
        values: null,
        description: 'Enable built-in validation.',
      },
      {
        name: 'validationPattern',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Custom validation pattern.',
      },
      {
        name: 'validationMessage',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Message shown when validation fails.',
      },
    ],
    events: [
      {
        name: 'update:modelValue',
        payload: 'string | number',
        description: 'Emitted on input; numbers are coerced for number type.',
      },
      {
        name: 'validation',
        payload: '{ valid: boolean, error: string }',
        description: 'Emitted when the validation state changes.',
      },
    ],
    slots: [
      { name: 'left', description: 'Custom content in the left slot (overrides iconLeft).' },
      { name: 'right', description: 'Custom content in the right slot (overrides iconRight).' },
    ],
    examples: [
      {
        title: 'Types',
        description: 'Text, email and phone in one control. Email and phone validate on blur.',
        code: `<div class="flex max-w-sm flex-col gap-3">
  <UiInput v-model="state.name" placeholder="Your name" />
  <UiInput v-model="state.email" type="email" icon-left="mdi:email-outline" placeholder="you@example.com" />
  <UiInput v-model="state.phone" type="phone" icon-left="mdi:phone-outline" placeholder="+44 20 7946 0000" />
</div>`,
      },
      {
        title: 'Password and clearable',
        description:
          'Password mode adds a visibility toggle; clearable adds a clear button while there is a value.',
        code: `<div class="flex max-w-sm flex-col gap-3">
  <UiInput v-model="state.pw" type="password" placeholder="Password" />
  <UiInput v-model="state.q" clearable placeholder="Type, then clear" />
</div>`,
      },
      {
        title: 'Number stepper layouts',
        description:
          'Number mode places the +/- controls four ways via stepper-layout: both-sides, stacked-left, stacked-right or none.',
        code: `<div class="grid max-w-md gap-4 sm:grid-cols-2">
  <label class="text-sm text-gray-500">both-sides
    <UiInput v-model="state.n1" type="number" :min="0" :max="10" stepper-layout="both-sides" class="mt-1" />
  </label>
  <label class="text-sm text-gray-500">stacked-left
    <UiInput v-model="state.n2" type="number" :min="0" :max="10" stepper-layout="stacked-left" class="mt-1" />
  </label>
  <label class="text-sm text-gray-500">stacked-right
    <UiInput v-model="state.n3" type="number" :min="0" :max="10" stepper-layout="stacked-right" class="mt-1" />
  </label>
  <label class="text-sm text-gray-500">none
    <UiInput v-model="state.n4" type="number" :min="0" :max="10" stepper-layout="none" class="mt-1" />
  </label>
</div>`,
      },
      {
        title: 'Icons',
        description: 'A leading icon via icon-left and a trailing icon via icon-right.',
        code: `<div class="flex max-w-sm flex-col gap-3">
  <UiInput v-model="state.search" icon-left="mdi:magnify" placeholder="Search" />
  <UiInput v-model="state.amount" icon-right="mdi:currency-eur" placeholder="Amount" />
</div>`,
      },
      {
        title: 'Textarea',
        description: 'Multi-line input; resize can be none, vertical, horizontal or both.',
        code: `<UiInput v-model="state.note" type="textarea" :rows="3" resize="vertical" placeholder="Drag the corner to resize" class="max-w-sm" />`,
      },
      {
        title: 'Validation',
        description:
          'Built-in validation for email/phone/number, or a custom validation-pattern with a message. Errors appear below the field after blur.',
        code: `<div class="flex max-w-sm flex-col gap-3">
  <UiInput v-model="state.em" type="email" placeholder="Enter an email, then click away" />
  <UiInput v-model="state.code" validation-pattern="^[A-Z]{3}$" validation-message="Exactly three uppercase letters." placeholder="ABC" />
</div>`,
      },
    ],
  },
  {
    slug: 'select',
    base: 'Select',
    name: 'UiSelect',
    category: 'forms',
    icon: 'mdi:form-dropdown',
    summary: 'Custom select with search, grouping, icons and loading.',
    description:
      'A dropdown select with an optional search box, grouped or flat options, per-option icons and a loading state. Options may be primitives or `{ value, label, icon?, group? }` objects. The panel is teleported so it escapes overflow clipping.',
    props: [
      {
        name: 'modelValue',
        type: 'string | number | boolean | null',
        default: "''",
        values: null,
        description: 'The selected value (v-model).',
      },
      {
        name: 'options',
        type: 'array',
        default: '() => []',
        values: null,
        description:
          'Primitives, or `{ value, label, icon?, subtitle?, group? }` objects. A `group` key switches the panel to grouped sections.',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "''",
        values: null,
        description: 'Shown when nothing is selected.',
      },
      {
        name: 'searchable',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Show a search box inside the panel.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Disables the control.',
      },
      {
        name: 'size',
        type: 'string',
        default: "'md'",
        values: ['xs', 'sm', 'md'],
        description: 'Control size.',
      },
      { name: 'block', type: 'boolean', default: 'true', values: null, description: 'Full width.' },
      {
        name: 'ariaLabel',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Accessible label.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Show a spinner instead of the value.',
      },
      {
        name: 'loadingText',
        type: 'string',
        default: "'Loading...'",
        values: null,
        description: 'Text shown while loading.',
      },
      {
        name: 'spinner',
        type: 'string',
        default: "'mdi:loading'",
        values: null,
        description: 'MDI icon for the loading spinner.',
      },
    ],
    events: [
      {
        name: 'update:modelValue',
        payload: 'string | number | boolean',
        description: 'Emitted when an option is chosen.',
      },
    ],
    slots: [],
    examples: [
      {
        title: 'Searchable, grouped',
        description: 'Options grouped into sections with per-option icons.',
        code: `<UiSelect
  v-model="state.tool"
  searchable
  placeholder="Pick a tool"
  :options="[
    { value: 'pen', label: 'Pen', icon: 'mdi:pen', group: 'Drawing' },
    { value: 'eraser', label: 'Eraser', icon: 'mdi:eraser', group: 'Drawing' },
    { value: 'text', label: 'Text', icon: 'mdi:format-text', group: 'Insert' },
  ]"
  class="max-w-xs"
/>`,
      },
      {
        title: 'Plain values',
        description: 'A flat list built from primitive strings.',
        code: `<UiSelect
  v-model="state.lang"
  placeholder="Language"
  :options="['English', 'Español', 'Français']"
  class="max-w-xs"
/>`,
      },
      {
        title: 'Subtitles and icons',
        description: 'Each option can carry an icon and a secondary subtitle line.',
        code: `<UiSelect
  v-model="state.member"
  placeholder="Assign to"
  :options="[
    { value: 'ada', label: 'Ada Lovelace', subtitle: 'Owner', icon: 'mdi:account' },
    { value: 'alan', label: 'Alan Turing', subtitle: 'Editor', icon: 'mdi:account' },
  ]"
  class="max-w-xs"
/>`,
      },
      {
        title: 'Sizes',
        description: 'Three trigger sizes: xs, sm and md.',
        code: `<div class="flex flex-wrap items-start gap-3">
  <UiSelect v-model="state.x" size="xs" :block="false" placeholder="Extra small" :options="['One', 'Two']" />
  <UiSelect v-model="state.y" size="sm" :block="false" placeholder="Small" :options="['One', 'Two']" />
  <UiSelect v-model="state.z" size="md" :block="false" placeholder="Medium" :options="['One', 'Two']" />
</div>`,
      },
      {
        title: 'Loading and disabled',
        description: 'A spinner with custom text while options load, and a disabled trigger.',
        code: `<div class="flex max-w-xs flex-col gap-3">
  <UiSelect v-model="state.a" :options="[]" loading loading-text="Fetching…" />
  <UiSelect v-model="state.b" :options="['Locked']" disabled placeholder="Disabled" />
</div>`,
      },
    ],
  },
  {
    slug: 'checkbox',
    base: 'Checkbox',
    name: 'UiCheckbox',
    category: 'forms',
    icon: 'mdi:checkbox-marked-outline',
    summary: 'A single checkbox control.',
    description:
      'A checkbox with three sizes. It renders the control only, so pair it with your own label text (wrap both in a `<label>`) or use it inside UiFormField.',
    props: [
      {
        name: 'modelValue',
        type: 'boolean',
        default: 'undefined',
        values: null,
        description: 'Checked state (v-model).',
      },
      {
        name: 'checked',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Uncontrolled initial checked state.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Disables the control.',
      },
      {
        name: 'size',
        type: 'string',
        default: "'md'",
        values: ['sm', 'md', 'lg'],
        description: 'Control size.',
      },
    ],
    events: [
      {
        name: 'update:modelValue',
        payload: 'boolean',
        description: 'Emitted with the new checked state.',
      },
      { name: 'change', payload: 'Event', description: 'Emitted with the native change event.' },
    ],
    slots: [],
    examples: [
      {
        title: 'Basic',
        description: 'Wrap the control and its label in a `<label>`.',
        code: `<div class="flex flex-col gap-2">
  <label class="flex items-center gap-2">
    <UiCheckbox v-model="state.terms" /> Accept the terms
  </label>
  <label class="flex items-center gap-2 opacity-70">
    <UiCheckbox :checked="true" disabled /> Pre-checked, disabled
  </label>
</div>`,
      },
      {
        title: 'Sizes',
        description: 'Three sizes: sm, md and lg.',
        code: `<div class="flex items-center gap-6">
  <label class="flex items-center gap-2"><UiCheckbox v-model="state.s" size="sm" /> Small</label>
  <label class="flex items-center gap-2"><UiCheckbox v-model="state.m" size="md" /> Medium</label>
  <label class="flex items-center gap-2"><UiCheckbox v-model="state.l" size="lg" /> Large</label>
</div>`,
      },
    ],
  },
  {
    slug: 'radio',
    base: 'Radio',
    name: 'UiRadio',
    category: 'forms',
    icon: 'mdi:radiobox-marked',
    summary: 'A single radio button for a mutually exclusive group.',
    description:
      'One radio option. Give every option in a group the same v-model and a distinct `value`. Like the checkbox, it renders the control only, so supply your own label.',
    props: [
      {
        name: 'modelValue',
        type: 'string | number | boolean',
        default: 'null',
        values: null,
        description: 'The selected value shared across the group (v-model).',
      },
      {
        name: 'value',
        type: 'string | number | boolean',
        default: '—',
        required: true,
        values: null,
        description: "This option's value.",
      },
      {
        name: 'name',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Native group name.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Disables the option.',
      },
      {
        name: 'size',
        type: 'string',
        default: "'md'",
        values: ['sm', 'md', 'lg'],
        description: 'Control size (shares the checkbox scale).',
      },
    ],
    events: [
      {
        name: 'update:modelValue',
        payload: 'string | number | boolean',
        description: "Emitted with this option's value when selected.",
      },
    ],
    slots: [],
    examples: [
      {
        title: 'Group',
        description: 'Options share one v-model and each carries its own value.',
        code: `<div class="flex flex-col gap-2">
  <label class="flex items-center gap-2">
    <UiRadio v-model="state.plan" value="free" /> Free
  </label>
  <label class="flex items-center gap-2">
    <UiRadio v-model="state.plan" value="pro" /> Pro
  </label>
  <label class="flex items-center gap-2">
    <UiRadio v-model="state.plan" value="team" /> Team
  </label>
  <label class="flex items-center gap-2 opacity-70">
    <UiRadio v-model="state.plan" value="enterprise" disabled /> Enterprise (disabled)
  </label>
</div>`,
      },
      {
        title: 'Sizes',
        description: 'Three sizes: sm, md and lg, matching UiCheckbox.',
        code: `<div class="flex items-center gap-6">
  <label class="flex items-center gap-2"><UiRadio v-model="state.s" value="a" size="sm" /> Small</label>
  <label class="flex items-center gap-2"><UiRadio v-model="state.s" value="b" size="md" /> Medium</label>
  <label class="flex items-center gap-2"><UiRadio v-model="state.s" value="c" size="lg" /> Large</label>
</div>`,
      },
    ],
  },
  {
    slug: 'toggle',
    base: 'Toggle',
    name: 'UiToggle',
    category: 'forms',
    icon: 'mdi:toggle-switch-outline',
    summary: 'An on/off switch.',
    description:
      'A switch for boolean settings, in two sizes and three colours, with a read-only mode.',
    props: [
      {
        name: 'modelValue',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'On/off state (v-model).',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Disables the switch.',
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Prevents changes but keeps normal styling.',
      },
      {
        name: 'size',
        type: 'string',
        default: "'md'",
        values: ['sm', 'md'],
        description: 'Switch size.',
      },
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        values: ['primary', 'green', 'red'],
        description: 'Active colour.',
      },
    ],
    events: [
      { name: 'update:modelValue', payload: 'boolean', description: 'Emitted with the new state.' },
    ],
    slots: [],
    examples: [
      {
        title: 'Colours',
        description: 'Three active colours: primary, green and red.',
        code: `<div class="flex items-center gap-6">
  <label class="flex items-center gap-2">
    <UiToggle v-model="state.on" /> Notifications
  </label>
  <UiToggle v-model="state.a" color="green" />
  <UiToggle v-model="state.b" color="red" />
</div>`,
      },
      {
        title: 'Sizes and states',
        description:
          'Two sizes (sm, md), plus disabled and read-only. Read-only keeps normal styling but ignores taps; disabled dims it.',
        code: `<div class="flex flex-wrap items-center gap-6">
  <label class="flex items-center gap-2 text-sm"><UiToggle v-model="state.sm" size="sm" /> Small</label>
  <label class="flex items-center gap-2 text-sm"><UiToggle v-model="state.md" size="md" /> Medium</label>
  <label class="flex items-center gap-2 text-sm text-gray-400"><UiToggle v-model="state.d" disabled /> Disabled</label>
  <label class="flex items-center gap-2 text-sm"><UiToggle :model-value="true" readonly /> Read-only</label>
</div>`,
      },
    ],
  },
  {
    slug: 'slider',
    base: 'Slider',
    name: 'UiSlider',
    category: 'forms',
    icon: 'mdi:tune-variant',
    summary: 'A native range slider with the Numori accent.',
    description: 'A styled HTML range input. Set min, max and step; bind the value with v-model.',
    props: [
      {
        name: 'modelValue',
        type: 'number',
        default: '0',
        values: null,
        description: 'Current value (v-model).',
      },
      {
        name: 'min',
        type: 'number | string',
        default: '0',
        values: null,
        description: 'Minimum value.',
      },
      {
        name: 'max',
        type: 'number | string',
        default: '100',
        values: null,
        description: 'Maximum value.',
      },
      {
        name: 'step',
        type: 'number | string',
        default: '1',
        values: null,
        description: 'Step increment.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Disables the slider.',
      },
      {
        name: 'width',
        type: 'string',
        default: "'full'",
        values: ['full', 'flex'],
        description: 'Layout width.',
      },
    ],
    events: [
      {
        name: 'update:modelValue',
        payload: 'number',
        description: 'Emitted with the new numeric value.',
      },
      { name: 'input', payload: 'Event', description: 'Emitted with the native input event.' },
    ],
    slots: [],
    examples: [
      {
        title: 'Basic',
        description: 'A 0–100 slider showing its live value.',
        code: `<div class="max-w-sm">
  <UiSlider v-model="state.vol" :min="0" :max="100" />
  <p class="mt-2 text-sm text-gray-500">Value: {{ state.vol ?? 0 }}</p>
</div>`,
      },
      {
        title: 'Fractional step',
        description:
          'A step of 0.01 over a 0–1 range gives fine, fractional control. Drag to watch the value update.',
        code: `<div class="max-w-sm">
  <div class="mb-1 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
    <span>Opacity</span>
    <span class="font-mono">{{ (state.opacity ?? 0).toFixed(2) }}</span>
  </div>
  <UiSlider v-model="state.opacity" :min="0" :max="1" :step="0.01" />
  <div class="mt-4 h-12 rounded-lg bg-primary-500" :style="{ opacity: state.opacity ?? 0 }" />
</div>`,
      },
      {
        title: 'Disabled',
        description: 'A disabled slider holds its value and ignores interaction.',
        code: `<div class="max-w-sm">
  <div class="mb-1 flex items-center justify-between text-sm text-gray-400 dark:text-gray-500">
    <span>Locked</span>
    <span class="font-mono">40</span>
  </div>
  <UiSlider :model-value="40" :min="0" :max="100" disabled />
</div>`,
      },
    ],
  },
  {
    slug: 'file-input',
    base: 'FileInput',
    name: 'UiFileInput',
    category: 'forms',
    icon: 'mdi:file-upload-outline',
    summary: 'A file picker wrapping any trigger content.',
    description:
      'Wraps a trigger (a button, an icon) and opens the native file picker on click. Enforces an optional maximum file size, emitting an error event when a file is too large.',
    props: [
      {
        name: 'accept',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Accepted file types (native `accept`).',
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Allow selecting several files.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Disables the picker.',
      },
      {
        name: 'maxSize',
        type: 'number',
        default: '0',
        values: null,
        description: 'Maximum size in bytes; 0 disables the check.',
      },
    ],
    events: [
      { name: 'select', payload: 'File | File[]', description: 'Emitted with the chosen file(s).' },
      {
        name: 'error',
        payload: '{ type, file, message }',
        description: 'Emitted when a file exceeds maxSize.',
      },
    ],
    slots: [{ name: 'default', description: 'Trigger content that opens the picker.' }],
    examples: [
      {
        title: 'Basic',
        description:
          'The default slot is the visible trigger; the chosen file name is shown alongside. Note the trigger renders as a span (tag="span") — a real <button> nested in the label would swallow the click and never open the picker.',
        code: `<div class="flex items-center gap-3">
  <UiFileInput accept="image/*" @select="state.file = $event">
    <UiButton tag="span" variant="outline">
      <UiIcon name="mdi:upload" class="w-4 h-4" /> Choose file
    </UiButton>
  </UiFileInput>
  <span class="text-sm text-gray-500">{{ state.file ? state.file.name : 'No file selected' }}</span>
</div>`,
      },
      {
        title: 'Multiple, with a size limit',
        description:
          'Accept several files and reject any over max-size (2 MB here) through the error event.',
        code: `<div class="flex flex-col gap-2">
  <UiFileInput
    multiple
    :max-size="2 * 1024 * 1024"
    @select="state.count = Array.isArray($event) ? $event.length : 1"
    @error="state.err = $event.message"
  >
    <UiButton tag="span" variant="outline" color="gray">
      <UiIcon name="mdi:paperclip" class="w-4 h-4" /> Attach files
    </UiButton>
  </UiFileInput>
  <span v-if="state.count" class="text-sm text-gray-500">{{ state.count }} file(s) selected</span>
  <span v-if="state.err" class="text-sm text-error-600 dark:text-error-400">{{ state.err }}</span>
</div>`,
      },
    ],
  },
  {
    slug: 'form-field',
    base: 'FormField',
    name: 'UiFormField',
    category: 'forms',
    icon: 'mdi:form-select',
    summary: 'Label, hint and error wrapper for a control.',
    description:
      'Wraps a form control with a label, an optional hint and an error message, and marks the field optional when asked. Place any input in its default slot.',
    props: [
      { name: 'label', type: 'string', default: "''", values: null, description: 'Field label.' },
      {
        name: 'optional',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Show an "optional" marker.',
      },
      {
        name: 'hint',
        type: 'string',
        default: "''",
        values: null,
        description: 'Helper text below the control.',
      },
      {
        name: 'error',
        type: 'string',
        default: "''",
        values: null,
        description: 'Error message; replaces the hint when set.',
      },
      {
        name: 'inline',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Lay the label beside the control.',
      },
    ],
    events: [],
    slots: [{ name: 'default', description: 'The form control (UiInput, UiSelect, UiToggle, …).' }],
    examples: [
      {
        title: 'With hint',
        description: 'A labelled input with helper text.',
        code: `<UiFormField label="Email" hint="We never share it." class="max-w-sm">
  <UiInput v-model="state.email" type="email" placeholder="you@example.com" />
</UiFormField>`,
      },
      {
        title: 'With error',
        description: 'An error message replaces the hint.',
        code: `<UiFormField label="Username" error="That name is taken." class="max-w-sm">
  <UiInput v-model="state.user" placeholder="Pick a username" />
</UiFormField>`,
      },
      {
        title: 'Optional marker',
        description: 'optional appends an “(optional)” note to the label.',
        code: `<UiFormField label="Nickname" optional hint="Shown instead of your full name." class="max-w-sm">
  <UiInput v-model="state.nick" placeholder="Optional" />
</UiFormField>`,
      },
      {
        title: 'Inline, for toggle rows',
        description: 'inline drops the label’s bottom margin, suiting a label beside a control.',
        code: `<UiFormField label="Enable ligatures" inline class="flex max-w-sm items-center justify-between gap-4">
  <UiToggle v-model="state.lig" />
</UiFormField>`,
      },
    ],
  },
  {
    slug: 'numpad',
    base: 'Numpad',
    name: 'UiNumpad',
    category: 'forms',
    icon: 'mdi:dialpad',
    summary: 'A numeric keypad for PIN entry.',
    description:
      'A 0–9 keypad with a delete key, for PIN and passcode entry. It emits a digit or a delete event; you hold the value. Can optionally capture physical keyboard input.',
    props: [
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Disables all keys.',
      },
      {
        name: 'canDelete',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Enables the delete key.',
      },
      {
        name: 'captureKeyboard',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Also handle physical keyboard input.',
      },
    ],
    events: [
      { name: 'digit', payload: 'string', description: 'Emitted with the pressed digit.' },
      { name: 'delete', payload: 'void', description: 'Emitted when the delete key is pressed.' },
    ],
    slots: [
      {
        name: 'bottom-left',
        description: 'Content for the otherwise-empty bottom-left cell (e.g. a biometrics button).',
      },
    ],
    examples: [
      {
        title: 'PIN entry',
        description:
          'You hold the value; the numpad emits digit and delete. can-delete enables the backspace key, and capture-keyboard lets the physical number keys and Backspace drive it too — try typing.',
        code: `<div class="mx-auto w-72">
  <p class="mb-3 text-center font-mono text-2xl tracking-[0.4em]">{{ state.pin || '····' }}</p>
  <UiNumpad
    capture-keyboard
    :can-delete="!!state.pin"
    @digit="state.pin = (state.pin || '') + $event"
    @delete="state.pin = (state.pin || '').slice(0, -1)"
  />
</div>`,
      },
      {
        title: 'Bottom-left slot',
        description:
          'Fill the empty cell beside 0 with your own control, such as a biometric unlock.',
        code: `<div class="mx-auto w-72">
  <UiNumpad
    :can-delete="!!state.pin2"
    @digit="state.pin2 = (state.pin2 || '') + $event"
    @delete="state.pin2 = (state.pin2 || '').slice(0, -1)"
  >
    <template #bottom-left>
      <button type="button" class="flex h-16 w-full items-center justify-center rounded-2xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
        <UiIcon name="mdi:fingerprint" class="h-6 w-6" />
      </button>
    </template>
  </UiNumpad>
</div>`,
      },
    ],
  },
  {
    slug: 'stepper',
    base: 'Stepper',
    name: 'UiStepper',
    category: 'forms',
    icon: 'mdi:dots-horizontal',
    summary: 'A dotted step indicator.',
    description:
      'A row of dots marking progress through a fixed number of steps. Clicking a dot selects that step.',
    props: [
      {
        name: 'modelValue',
        type: 'number',
        default: '1',
        values: null,
        description: 'The active step (v-model).',
      },
      {
        name: 'steps',
        type: 'number',
        default: '—',
        required: true,
        values: null,
        description: 'Total number of steps.',
      },
    ],
    events: [
      {
        name: 'update:modelValue',
        payload: 'number',
        description: 'Emitted with the clicked step index.',
      },
    ],
    slots: [],
    examples: [
      {
        title: 'Basic',
        description: 'Four steps with buttons to move between them.',
        code: `<div class="flex flex-col items-center gap-4">
  <UiStepper v-model="state.step" :steps="4" />
  <div class="flex gap-2">
    <UiButton size="sm" variant="outline" @click="state.step = Math.max(1, (state.step || 1) - 1)">Back</UiButton>
    <UiButton size="sm" @click="state.step = Math.min(4, (state.step || 1) + 1)">Next</UiButton>
  </div>
</div>`,
      },
    ],
  },

  // ── Overlays ────────────────────────────────────────────────────
  {
    slug: 'modal',
    base: 'Modal',
    name: 'UiModal',
    category: 'overlays',
    icon: 'mdi:dock-window',
    summary: 'A teleported, mobile-aware dialog.',
    description:
      'A centred dialog that teleports to the body, goes fullscreen on mobile by default and respects safe-area insets. Control visibility with the `show` prop and listen for `close`.',
    props: [
      {
        name: 'show',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Whether the modal is open.',
      },
      {
        name: 'maxWidth',
        type: 'string',
        default: "'sm'",
        values: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'full'],
        description: 'Maximum panel width.',
      },
      {
        name: 'fullscreenMobile',
        type: 'boolean',
        default: 'true',
        values: null,
        description: 'Fill the screen on small viewports.',
      },
      {
        name: 'persistent',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Ignore backdrop clicks and back gestures.',
      },
      {
        name: 'panelClass',
        type: 'string',
        default: "''",
        values: null,
        description: 'Extra classes for the panel.',
      },
      {
        name: 'z',
        type: 'string',
        default: "'z-50'",
        values: null,
        description: 'Stacking (z-index) class.',
      },
      {
        name: 'padding',
        type: 'string',
        default: "'md:p-4'",
        values: null,
        description: 'Backdrop padding classes.',
      },
    ],
    events: [
      {
        name: 'close',
        payload: 'void',
        description: 'Emitted on backdrop click or back gesture (unless persistent).',
      },
    ],
    slots: [{ name: 'default', description: 'Modal content.' }],
    examples: [
      {
        title: 'Open on click',
        description: 'Toggle the show prop and close on the emitted event.',
        code: `<div>
  <UiButton @click="state.open = true">Open modal</UiButton>
  <UiModal :show="state.open" max-width="md" @close="state.open = false">
    <div class="p-6">
      <h3 class="text-lg font-semibold">Delete project?</h3>
      <p class="mt-2 text-sm text-gray-500">This cannot be undone.</p>
      <div class="mt-6 flex justify-end gap-2">
        <UiButton variant="ghost" color="gray" @click="state.open = false">Cancel</UiButton>
        <UiButton color="red" @click="state.open = false">Delete</UiButton>
      </div>
    </div>
  </UiModal>
</div>`,
      },
      {
        title: 'Widths',
        description: 'Ten max-width presets from xs to 5xl, plus full-screen.',
        code: `<div class="flex flex-wrap gap-3">
  <UiButton variant="outline" @click="state.size = 'xs'">xs</UiButton>
  <UiButton variant="outline" @click="state.size = 'lg'">lg</UiButton>
  <UiButton variant="outline" @click="state.size = '3xl'">3xl</UiButton>
  <UiModal :show="!!state.size" :max-width="state.size || 'sm'" @close="state.size = null">
    <div class="p-6">
      <h3 class="text-lg font-semibold">max-width: {{ state.size }}</h3>
      <p class="mt-2 text-sm text-gray-500">The panel widens to the chosen preset.</p>
      <div class="mt-6 flex justify-end"><UiButton @click="state.size = null">Close</UiButton></div>
    </div>
  </UiModal>
</div>`,
      },
      {
        title: 'Persistent, centred on mobile',
        description:
          'persistent ignores backdrop clicks; fullscreen-mobile false keeps it a centred dialog on small screens instead of filling them.',
        code: `<div>
  <UiButton variant="outline" @click="state.p = true">Open persistent</UiButton>
  <UiModal :show="state.p" persistent :fullscreen-mobile="false" @close="state.p = false">
    <div class="p-6">
      <h3 class="text-lg font-semibold">Persistent</h3>
      <p class="mt-2 text-sm text-gray-500">Clicking the backdrop does nothing — close it with the button.</p>
      <div class="mt-6 flex justify-end"><UiButton @click="state.p = false">Got it</UiButton></div>
    </div>
  </UiModal>
</div>`,
      },
    ],
  },
  {
    slug: 'prompt',
    base: 'Prompt',
    name: 'UiPrompt',
    category: 'overlays',
    icon: 'mdi:comment-question-outline',
    summary: 'A confirm/cancel dialog.',
    description:
      'A ready-made confirmation dialog built on the modal, with a title, body, icon and confirm/cancel buttons. Emits confirm or close, and shows a loading state on the confirm button.',
    props: [
      {
        name: 'show',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Whether the prompt is open.',
      },
      {
        name: 'title',
        type: 'string',
        default: "'Confirm'",
        values: null,
        description: 'Heading text.',
      },
      {
        name: 'icon',
        type: 'string',
        default: 'null',
        values: null,
        description: 'Optional MDI icon.',
      },
      { name: 'body', type: 'string', default: 'null', values: null, description: 'Body text.' },
      {
        name: 'confirmLabel',
        type: 'string',
        default: "'Confirm'",
        values: null,
        description: 'Confirm button label.',
      },
      {
        name: 'cancelLabel',
        type: 'string',
        default: "'Cancel'",
        values: null,
        description: 'Cancel button label.',
      },
      {
        name: 'confirmColor',
        type: 'string',
        default: "'primary'",
        values: ['primary', 'gray', 'red', 'green', 'amber'],
        description: 'Colour of the confirm button (and the header icon).',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Show a spinner on confirm and block closing.',
      },
      {
        name: 'confirmOnEnter',
        type: 'boolean',
        default: 'true',
        values: null,
        description: 'Confirm when Enter is pressed.',
      },
      {
        name: 'fullscreenMobile',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Fill the screen on mobile.',
      },
      {
        name: 'panelClass',
        type: 'string',
        default: "''",
        values: null,
        description: 'Extra classes for the panel.',
      },
    ],
    events: [
      {
        name: 'confirm',
        payload: 'void',
        description: 'Emitted when the confirm button is pressed.',
      },
      { name: 'close', payload: 'void', description: 'Emitted when cancelled or dismissed.' },
    ],
    slots: [
      { name: 'default', description: 'Rich body content, replacing the plain-text body prop.' },
      {
        name: 'actions',
        description: 'Custom action buttons, replacing the default cancel/confirm pair.',
      },
    ],
    examples: [
      {
        title: 'Confirm an action',
        description: 'A destructive confirmation with a red confirm button.',
        code: `<div>
  <UiButton variant="outline" color="red" @click="state.open = true">Delete account</UiButton>
  <UiPrompt
    :show="state.open"
    icon="mdi:alert-outline"
    title="Delete account?"
    body="Your data will be permanently removed."
    confirm-label="Delete"
    confirm-color="red"
    @confirm="state.open = false"
    @close="state.open = false"
  />
</div>`,
      },
      {
        title: 'Rich body',
        description: 'Put markup in the default slot instead of the plain-text body prop.',
        code: `<div>
  <UiButton variant="outline" @click="state.rb = true">Show details</UiButton>
  <UiPrompt :show="state.rb" title="Heads up" @close="state.rb = false" @confirm="state.rb = false">
    <p>This affects <strong>12</strong> items. Continue?</p>
  </UiPrompt>
</div>`,
      },
      {
        title: 'Custom actions',
        description: 'Override the #actions slot for a bespoke set of buttons.',
        code: `<div>
  <UiButton variant="outline" @click="state.ca = true">Export</UiButton>
  <UiPrompt :show="state.ca" title="Export options" @close="state.ca = false">
    Include results in the export?
    <template #actions>
      <UiButton variant="ghost" color="gray" @click="state.ca = false">Without</UiButton>
      <UiButton @click="state.ca = false">With results</UiButton>
    </template>
  </UiPrompt>
</div>`,
      },
    ],
  },
  {
    slug: 'dropdown',
    base: 'Dropdown',
    name: 'UiDropdown',
    category: 'overlays',
    icon: 'mdi:menu-down',
    summary: 'A trigger-and-panel menu.',
    description:
      'A menu that opens from a trigger you provide and closes on outside click. The trigger slot receives `{ open, toggle }` and the default slot receives `{ close }`. Fill it with UiDropdownItem rows.',
    props: [
      {
        name: 'width',
        type: 'string',
        default: "'w-56'",
        values: null,
        description: 'Panel width class.',
      },
      {
        name: 'align',
        type: 'string',
        default: "'left'",
        values: ['left', 'right'],
        description: 'Horizontal alignment to the trigger.',
      },
      {
        name: 'drop',
        type: 'string',
        default: "'down'",
        values: ['down', 'up'],
        description: 'Open upwards or downwards.',
      },
      {
        name: 'panelClass',
        type: 'string',
        default: "''",
        values: null,
        description: 'Extra classes for the panel.',
      },
    ],
    events: [
      { name: 'open', payload: 'void', description: 'Emitted when the menu opens.' },
      { name: 'close', payload: 'void', description: 'Emitted when the menu closes.' },
    ],
    slots: [
      { name: 'trigger', description: 'The opener. Receives { open: boolean, toggle: Function }.' },
      { name: 'default', description: 'Menu content. Receives { close: Function }.' },
    ],
    examples: [
      {
        title: 'Action menu',
        description: 'A button trigger with a set of items.',
        code: `<UiDropdown>
  <template #trigger="{ toggle }">
    <UiButton variant="outline" color="gray" @click="toggle">
      Actions <UiIcon name="mdi:menu-down" class="w-4 h-4" />
    </UiButton>
  </template>
  <UiDropdownItem icon="mdi:pencil" label="Edit" />
  <UiDropdownItem icon="mdi:content-copy" label="Duplicate" shortcut="⌘D" />
  <UiDropdownItem icon="mdi:trash-can-outline" label="Delete" color="red" />
</UiDropdown>`,
      },
      {
        title: 'Right-aligned, drop-up',
        description:
          'align and drop position the panel; here it aligns to the trigger’s right edge and opens upward.',
        code: `<div class="flex justify-end">
  <UiDropdown align="right" drop="up" width="w-48">
    <template #trigger="{ toggle }">
      <UiButton variant="ghost" color="gray" icon-only aria-label="More" @click="toggle">
        <UiIcon name="mdi:dots-vertical" class="w-5 h-5" />
      </UiButton>
    </template>
    <UiDropdownItem icon="mdi:pencil" label="Rename" />
    <UiDropdownItem icon="mdi:archive-outline" label="Archive" />
  </UiDropdown>
</div>`,
      },
    ],
  },
  {
    slug: 'dropdown-item',
    base: 'DropdownItem',
    name: 'UiDropdownItem',
    category: 'overlays',
    icon: 'mdi:menu-right',
    summary: 'A single row inside a dropdown.',
    description:
      'A menu row with an icon, a label, an optional keyboard shortcut and a colour for destructive actions.',
    props: [
      {
        name: 'icon',
        type: 'string',
        default: '—',
        required: true,
        values: null,
        description: 'Leading MDI icon.',
      },
      {
        name: 'label',
        type: 'string',
        default: '—',
        required: true,
        values: null,
        description: 'Row label.',
      },
      {
        name: 'shortcut',
        type: 'string',
        default: "''",
        values: null,
        description: 'Keyboard shortcut hint shown on the right.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Disables the row.',
      },
      {
        name: 'color',
        type: 'string',
        default: "'gray'",
        values: ['gray', 'red', 'green', 'amber'],
        description: 'Row colour.',
      },
    ],
    events: [
      {
        name: 'click',
        payload: 'void',
        description: 'Emitted when the row is activated (unless disabled).',
      },
    ],
    slots: [],
    examples: [
      {
        title: 'Rows',
        description: 'Items shown inside a menu-style panel.',
        code: `<div class="w-56 rounded-xl border border-gray-200 bg-white p-1 shadow-card dark:border-gray-700 dark:bg-gray-900">
  <UiDropdownItem icon="mdi:pencil" label="Edit" />
  <UiDropdownItem icon="mdi:content-copy" label="Duplicate" shortcut="⌘D" />
  <UiDropdownItem icon="mdi:trash-can-outline" label="Delete" color="red" />
</div>`,
      },
    ],
  },
  {
    slug: 'dropdown-row',
    base: 'DropdownRow',
    name: 'UiDropdownRow',
    category: 'overlays',
    icon: 'mdi:table-row',
    summary: 'A horizontal row of dropdown actions.',
    description:
      'Lays out several action buttons (and optional dividers) side by side within a dropdown panel.',
    props: [],
    events: [],
    slots: [
      {
        name: 'default',
        description: 'Action buttons (and optional dividers) to lay out horizontally.',
      },
    ],
    examples: [
      {
        title: 'Icon actions',
        description: 'A row of ghost icon buttons inside a panel.',
        code: `<div class="w-56 rounded-xl border border-gray-200 bg-white p-1 shadow-card dark:border-gray-700 dark:bg-gray-900">
  <UiDropdownRow>
    <UiButton variant="ghost" color="gray" icon-only aria-label="Bold"><UiIcon name="mdi:format-bold" class="w-5 h-5" /></UiButton>
    <UiButton variant="ghost" color="gray" icon-only aria-label="Italic"><UiIcon name="mdi:format-italic" class="w-5 h-5" /></UiButton>
    <UiButton variant="ghost" color="gray" icon-only aria-label="Link"><UiIcon name="mdi:link-variant" class="w-5 h-5" /></UiButton>
  </UiDropdownRow>
</div>`,
      },
    ],
  },
  {
    slug: 'dropdown-submenu',
    base: 'DropdownSubmenu',
    name: 'UiDropdownSubmenu',
    category: 'overlays',
    icon: 'mdi:menu-open',
    summary: 'A nested submenu within a dropdown.',
    description:
      'A row that reveals a nested set of items on hover or focus. Give it an icon and label; put UiDropdownItem rows in its default slot.',
    props: [
      {
        name: 'icon',
        type: 'string',
        default: '—',
        required: true,
        values: null,
        description: 'Leading MDI icon.',
      },
      {
        name: 'label',
        type: 'string',
        default: '—',
        required: true,
        values: null,
        description: 'Row label.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Disables the submenu.',
      },
      {
        name: 'alignLeft',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Open the submenu to the left.',
      },
    ],
    events: [],
    slots: [
      { name: 'default', description: 'Submenu items (typically UiDropdownItem components).' },
    ],
    examples: [
      {
        title: 'Nested menu',
        description: 'A submenu opened from a dropdown.',
        code: `<UiDropdown>
  <template #trigger="{ toggle }">
    <UiButton variant="outline" color="gray" @click="toggle">
      More <UiIcon name="mdi:menu-down" class="w-4 h-4" />
    </UiButton>
  </template>
  <UiDropdownItem icon="mdi:share-variant" label="Share" />
  <UiDropdownSubmenu icon="mdi:export" label="Export as">
    <UiDropdownItem icon="mdi:file-pdf-box" label="PDF" />
    <UiDropdownItem icon="mdi:file-image" label="PNG" />
  </UiDropdownSubmenu>
</UiDropdown>`,
      },
    ],
  },
  {
    slug: 'popup',
    base: 'Popup',
    name: 'UiPopup',
    category: 'overlays',
    icon: 'mdi:tooltip-outline',
    summary: 'A panel anchored to coordinates.',
    description:
      'A floating panel positioned at explicit x/y coordinates, with an invisible backdrop that dismisses it on outside click. Useful for context menus at a pointer position.',
    props: [
      {
        name: 'show',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Whether the popup is visible.',
      },
      {
        name: 'x',
        type: 'number',
        default: '0',
        values: null,
        description: 'Left coordinate in pixels.',
      },
      {
        name: 'y',
        type: 'number',
        default: '0',
        values: null,
        description: 'Top coordinate in pixels.',
      },
      {
        name: 'offsetY',
        type: 'number',
        default: '0',
        values: null,
        description: 'Extra vertical offset.',
      },
      {
        name: 'width',
        type: 'string',
        default: "'w-56'",
        values: null,
        description: 'Panel width class.',
      },
      {
        name: 'panelZ',
        type: 'string',
        default: "'z-50'",
        values: null,
        description: 'Panel stacking class.',
      },
      {
        name: 'backdropZ',
        type: 'string',
        default: "'z-40'",
        values: null,
        description: 'Backdrop stacking class.',
      },
    ],
    events: [
      { name: 'close', payload: 'void', description: 'Emitted when the backdrop is clicked.' },
    ],
    slots: [{ name: 'default', description: 'Popup content.' }],
    examples: [
      {
        title: 'Anchored menu',
        description:
          'x/y are measured from the nearest positioned ancestor, so a relative wrapper anchors the panel to a trigger. Here y = 40 drops it just below the button; click outside to dismiss.',
        code: `<div class="relative inline-block">
  <UiButton variant="outline" @click="state.open = !state.open">
    Actions <UiIcon name="mdi:menu-down" class="w-4 h-4" />
  </UiButton>
  <UiPopup :show="state.open" :x="0" :y="40" @close="state.open = false">
    <UiDropdownItem icon="mdi:content-copy" label="Copy" />
    <UiDropdownItem icon="mdi:share-variant" label="Share" />
    <UiDropdownItem icon="mdi:trash-can-outline" label="Delete" color="red" />
  </UiPopup>
</div>`,
      },
    ],
  },
  {
    slug: 'tooltip',
    base: 'Tooltip',
    name: 'UiTooltip',
    category: 'overlays',
    icon: 'mdi:tooltip-text-outline',
    summary: 'A hover/focus tooltip wrapping a trigger.',
    description:
      'Shows a small label on hover or focus of whatever it wraps, in four positions, with an optional arrow. Use the content slot for rich content instead of the text prop.',
    props: [
      { name: 'text', type: 'string', default: "''", values: null, description: 'Tooltip label.' },
      {
        name: 'position',
        type: 'string',
        default: "'top'",
        values: ['top', 'bottom', 'left', 'right'],
        description: 'Where the tooltip appears.',
      },
      {
        name: 'width',
        type: 'string',
        default: "'w-56'",
        values: null,
        description: 'Tooltip width class.',
      },
      {
        name: 'arrow',
        type: 'boolean',
        default: 'true',
        values: null,
        description: 'Show the pointer arrow.',
      },
      {
        name: 'inline',
        type: 'boolean',
        default: 'true',
        values: null,
        description: 'Render the wrapper inline.',
      },
    ],
    events: [],
    slots: [
      { name: 'default', description: 'The trigger element the tooltip wraps.' },
      { name: 'content', description: 'Rich tooltip content (alternative to the text prop).' },
    ],
    examples: [
      {
        title: 'Positions',
        description: 'Hover the buttons to see tooltips on each side.',
        code: `<div class="flex flex-wrap items-center gap-3">
  <UiTooltip text="Top tooltip" position="top">
    <UiButton variant="outline" color="gray">Top</UiButton>
  </UiTooltip>
  <UiTooltip text="Bottom tooltip" position="bottom">
    <UiButton variant="outline" color="gray">Bottom</UiButton>
  </UiTooltip>
  <UiTooltip text="Right tooltip" position="right">
    <UiButton variant="ghost" color="gray" icon-only aria-label="Info"><UiIcon name="mdi:information-outline" class="w-5 h-5" /></UiButton>
  </UiTooltip>
</div>`,
      },
      {
        title: 'No arrow, and rich content',
        description:
          'Hide the pointer with arrow false, or supply markup through the #content slot instead of the text prop.',
        code: `<div class="flex flex-wrap items-center gap-6">
  <UiTooltip text="No arrow here" :arrow="false">
    <UiButton variant="outline" color="gray">Plain</UiButton>
  </UiTooltip>
  <UiTooltip position="right" width="w-64">
    <UiButton variant="outline" color="gray">Rich</UiButton>
    <template #content>
      <strong>Keyboard shortcut</strong>
      <p class="mt-1 opacity-80">Press Cmd-K to open the command palette.</p>
    </template>
  </UiTooltip>
</div>`,
      },
    ],
  },

  // ── Feedback ────────────────────────────────────────────────────
  {
    slug: 'alert',
    base: 'Alert',
    name: 'UiAlert',
    category: 'feedback',
    icon: 'mdi:alert-circle-outline',
    summary: 'An inline message banner.',
    description:
      'A coloured message block with an optional icon and border, in three sizes. Put the message in the default slot.',
    props: [
      {
        name: 'color',
        type: 'string',
        default: "'red'",
        values: ['red', 'amber', 'green', 'blue', 'gray'],
        description: 'Semantic colour.',
      },
      {
        name: 'icon',
        type: 'string',
        default: "''",
        values: null,
        description: 'Leading MDI icon.',
      },
      {
        name: 'bordered',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Add a border.',
      },
      {
        name: 'size',
        type: 'string',
        default: "'sm'",
        values: ['xs', 'sm', 'md'],
        description: 'Padding and text size.',
      },
    ],
    events: [],
    slots: [
      { name: 'default', description: 'Alert content.' },
      { name: 'icon', description: 'Custom icon element (replaces the icon prop).' },
    ],
    examples: [
      {
        title: 'Colours',
        description:
          'Five colours: red, amber, green, blue and gray, each with an icon and border.',
        code: `<div class="flex flex-col gap-3">
  <UiAlert color="green" icon="mdi:check-circle-outline" bordered>Saved successfully.</UiAlert>
  <UiAlert color="amber" icon="mdi:alert-outline" bordered>Your trial ends soon.</UiAlert>
  <UiAlert color="red" icon="mdi:close-circle-outline" bordered>Something went wrong.</UiAlert>
  <UiAlert color="blue" icon="mdi:information-outline" bordered>A neutral note.</UiAlert>
  <UiAlert color="gray" icon="mdi:information-outline" bordered>Just so you know.</UiAlert>
</div>`,
      },
      {
        title: 'Sizes and structured content',
        description:
          'Three sizes (xs, sm, md); the default slot accepts multi-line, structured content.',
        code: `<div class="flex flex-col gap-3">
  <UiAlert color="amber" icon="mdi:alert-outline" bordered size="md">
    <p class="font-semibold">This action cannot be undone</p>
    <p>Deleting the project removes every file it contains.</p>
  </UiAlert>
  <UiAlert color="red" size="xs">Compact xs alert</UiAlert>
</div>`,
      },
    ],
  },
  {
    slug: 'badge',
    base: 'Badge',
    name: 'UiBadge',
    category: 'feedback',
    icon: 'mdi:label-outline',
    summary: 'A small status pill.',
    description:
      'A compact label for statuses and counts, in five colours and three sizes, with an optional leading icon.',
    props: [
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        values: ['primary', 'gray', 'red', 'green', 'amber'],
        description: 'Badge colour.',
      },
      {
        name: 'size',
        type: 'string',
        default: "'xs'",
        values: ['xs', 'sm', 'md'],
        description: 'Badge size.',
      },
      {
        name: 'icon',
        type: 'string',
        default: "''",
        values: null,
        description: 'Leading MDI icon.',
      },
    ],
    events: [],
    slots: [{ name: 'default', description: 'Badge text or content.' }],
    examples: [
      {
        title: 'Colours',
        description: 'Five colours, with and without a leading icon.',
        code: `<div class="flex flex-wrap items-center gap-2">
  <UiBadge color="primary">New</UiBadge>
  <UiBadge color="green" icon="mdi:check">Active</UiBadge>
  <UiBadge color="amber">Beta</UiBadge>
  <UiBadge color="red">Error</UiBadge>
  <UiBadge color="gray">Draft</UiBadge>
</div>`,
      },
      {
        title: 'Sizes',
        description: 'Three sizes: xs (default), sm and md.',
        code: `<div class="flex flex-wrap items-center gap-2">
  <UiBadge size="xs">Extra small</UiBadge>
  <UiBadge size="sm">Small</UiBadge>
  <UiBadge size="md">Medium</UiBadge>
</div>`,
      },
    ],
  },
  {
    slug: 'progress-bar',
    base: 'ProgressBar',
    name: 'UiProgressBar',
    category: 'feedback',
    icon: 'mdi:progress-helper',
    summary: 'A horizontal progress bar.',
    description:
      'Shows progress from current out of total, with an optional label and value readout, four colours and three heights.',
    props: [
      {
        name: 'current',
        type: 'number',
        default: '0',
        values: null,
        description: 'Current value.',
      },
      {
        name: 'total',
        type: 'number',
        default: '100',
        values: null,
        description: 'Value representing 100%.',
      },
      {
        name: 'label',
        type: 'string',
        default: "''",
        values: null,
        description: 'Label above the bar.',
      },
      {
        name: 'showValue',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Show the numeric value.',
      },
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        values: ['primary', 'green', 'red', 'amber'],
        description: 'Bar colour.',
      },
      {
        name: 'height',
        type: 'string',
        default: "'sm'",
        values: ['xs', 'sm', 'md'],
        description: 'Bar thickness.',
      },
    ],
    events: [],
    slots: [],
    examples: [
      {
        title: 'With label',
        description: 'A labelled bar showing its value out of the total.',
        code: `<UiProgressBar :current="64" :total="100" label="Storage used" show-value class="max-w-md" />`,
      },
      {
        title: 'Colours and heights',
        description: 'Four colours (primary, green, red, amber) and three heights (xs, sm, md).',
        code: `<div class="flex max-w-md flex-col gap-4">
  <UiProgressBar :current="25" :total="100" color="primary" height="xs" />
  <UiProgressBar :current="50" :total="100" color="green" height="sm" />
  <UiProgressBar :current="75" :total="100" color="amber" height="md" />
  <UiProgressBar :current="90" :total="100" color="red" height="md" />
</div>`,
      },
    ],
  },

  // ── Layout & display ────────────────────────────────────────────
  {
    slug: 'list-menu',
    base: 'ListMenu',
    name: 'UiListMenu',
    category: 'display',
    icon: 'mdi:format-list-bulleted',
    summary: 'A grouped list container.',
    description:
      'A container that groups UiListMenuItem rows under an optional label, with rounding and a settings preset.',
    props: [
      { name: 'label', type: 'string', default: "''", values: null, description: 'Group heading.' },
      {
        name: 'danger',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Style the group as destructive.',
      },
      {
        name: 'rounded',
        type: 'string',
        default: "'xl'",
        values: ['xl', 'lg', 'none'],
        description: 'Corner rounding.',
      },
      {
        name: 'preset',
        type: 'string',
        default: "'default'",
        values: ['default', 'settings'],
        description: 'Visual preset.',
      },
    ],
    events: [],
    slots: [{ name: 'default', description: 'List items (typically UiListMenuItem components).' }],
    examples: [
      {
        title: 'Settings list',
        description: 'A grouped list of rows with icons.',
        code: `<UiListMenu label="Account" class="max-w-sm">
  <UiListMenuItem icon="mdi:account-outline" clickable>Profile</UiListMenuItem>
  <UiListMenuItem icon="mdi:bell-outline" clickable>Notifications</UiListMenuItem>
  <UiListMenuItem icon="mdi:lock-outline" clickable>Privacy</UiListMenuItem>
</UiListMenu>`,
      },
    ],
  },
  {
    slug: 'list-menu-item',
    base: 'ListMenuItem',
    name: 'UiListMenuItem',
    category: 'display',
    icon: 'mdi:format-list-text',
    summary: 'A row inside a list menu.',
    description:
      'A list row with an icon, a label, an optional hint and a trailing area. It can behave as a link (with a chevron), a toggle row, or a select row, and supports a destructive style.',
    props: [
      {
        name: 'icon',
        type: 'string',
        default: "''",
        values: null,
        description: 'Leading MDI icon.',
      },
      {
        name: 'iconClass',
        type: 'string',
        default: "''",
        values: null,
        description: 'Class for the icon.',
      },
      {
        name: 'clickable',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Make the row activate on click.',
      },
      {
        name: 'toggle',
        type: 'boolean',
        default: 'undefined',
        values: null,
        description: 'Render a toggle row bound to this value.',
      },
      {
        name: 'selectRef',
        type: 'object',
        default: 'undefined',
        values: null,
        description: 'A UiSelect ref to open when the row is tapped.',
      },
      {
        name: 'chevron',
        type: 'boolean',
        default: 'true',
        values: null,
        description: 'Show the trailing chevron.',
      },
      {
        name: 'danger',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Destructive styling.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Disables the row.',
      },
      { name: 'hint', type: 'string', default: "''", values: null, description: 'Secondary text.' },
      {
        name: 'size',
        type: 'string',
        default: "'md'",
        values: ['md', 'sm'],
        description: 'Row size.',
      },
    ],
    events: [
      { name: 'click', payload: 'void', description: 'Emitted when a clickable row is activated.' },
      {
        name: 'update:toggle',
        payload: 'boolean',
        description: 'Emitted with the new value when a toggle row is tapped.',
      },
    ],
    slots: [
      { name: 'default', description: 'Label text.' },
      { name: 'suffix', description: 'Trailing content (toggle, select, badge, …).' },
    ],
    examples: [
      {
        title: 'Row types',
        description:
          'A clickable row (with chevron), a toggle row (tapping anywhere toggles), a row with a hint, and a destructive row.',
        code: `<UiListMenu class="max-w-sm">
  <UiListMenuItem icon="mdi:account-outline" clickable>Profile</UiListMenuItem>
  <UiListMenuItem icon="mdi:bell-outline" :toggle="state.notify" @update:toggle="state.notify = $event">
    Notifications
    <template #suffix><UiToggle :model-value="state.notify" readonly /></template>
  </UiListMenuItem>
  <UiListMenuItem icon="mdi:information-outline" hint="Version 1.2.0">About</UiListMenuItem>
  <UiListMenuItem icon="mdi:logout" danger clickable :chevron="false">Sign out</UiListMenuItem>
</UiListMenu>`,
      },
      {
        title: 'Suffix content',
        description: 'The #suffix slot holds any trailing control — a badge, a value, a select.',
        code: `<UiListMenu class="max-w-sm">
  <UiListMenuItem icon="mdi:cloud-outline" clickable>
    Storage
    <template #suffix><UiBadge color="amber" size="xs">80% full</UiBadge></template>
  </UiListMenuItem>
  <UiListMenuItem icon="mdi:palette-outline" clickable>
    Theme
    <template #suffix><span class="text-xs text-gray-400">System</span></template>
  </UiListMenuItem>
</UiListMenu>`,
      },
    ],
  },
  {
    slug: 'divider',
    base: 'Divider',
    name: 'UiDivider',
    category: 'display',
    icon: 'mdi:minus',
    summary: 'A separator line.',
    description:
      'A horizontal or vertical rule for separating menus, toolbars and content, in three weights.',
    props: [
      {
        name: 'direction',
        type: 'string',
        default: "'horizontal'",
        values: ['horizontal', 'vertical'],
        description: 'Orientation.',
      },
      {
        name: 'color',
        type: 'string',
        default: "'light'",
        values: ['light', 'medium', 'dark'],
        description: 'Line weight/colour.',
      },
    ],
    events: [],
    slots: [],
    examples: [
      {
        title: 'Orientations',
        description: 'A horizontal rule and a vertical rule between items.',
        code: `<div class="flex flex-col gap-4">
  <div>
    <p class="text-sm text-gray-500">Above</p>
    <UiDivider />
    <p class="text-sm text-gray-500">Below</p>
  </div>
  <div class="flex h-6 items-center gap-3 text-sm text-gray-500">
    <span>Edit</span>
    <UiDivider direction="vertical" />
    <span>View</span>
    <UiDivider direction="vertical" />
    <span>Share</span>
  </div>
</div>`,
      },
      {
        title: 'Weights',
        description: 'Three colour weights: light, medium and dark.',
        code: `<div class="flex flex-col gap-1">
  <p class="text-sm text-gray-500">light</p>
  <UiDivider color="light" />
  <p class="text-sm text-gray-500">medium</p>
  <UiDivider color="medium" />
  <p class="text-sm text-gray-500">dark</p>
  <UiDivider color="dark" />
</div>`,
      },
    ],
  },
  {
    slug: 'avatar',
    base: 'Avatar',
    name: 'UiAvatar',
    category: 'display',
    icon: 'mdi:account-circle-outline',
    summary: 'A circular avatar with an icon fallback.',
    description:
      'Shows an image, or a fallback icon when there is none, in five sizes with two colours and an optional ring.',
    props: [
      { name: 'src', type: 'string', default: "''", values: null, description: 'Image URL.' },
      {
        name: 'alt',
        type: 'string',
        default: "'Avatar'",
        values: null,
        description: 'Alt text for the image.',
      },
      {
        name: 'size',
        type: 'string',
        default: "'md'",
        values: ['xs', 'sm', 'md', 'lg', 'xl'],
        description: 'Avatar size.',
      },
      {
        name: 'fallbackIcon',
        type: 'string',
        default: "'mdi:account'",
        values: null,
        description: 'Icon shown when there is no image.',
      },
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        values: ['primary', 'gray'],
        description: 'Fallback background colour.',
      },
      {
        name: 'ring',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Add a ring around the avatar.',
      },
    ],
    events: [],
    slots: [],
    examples: [
      {
        title: 'Sizes and fallback',
        description:
          'Five sizes from xs to xl. With no src the fallback icon shows; add a ring for emphasis or a gray theme. Pass src for a photo.',
        code: `<div class="flex flex-wrap items-center gap-3">
  <UiAvatar size="xs" />
  <UiAvatar size="sm" />
  <UiAvatar size="md" />
  <UiAvatar size="lg" ring />
  <UiAvatar size="xl" color="gray" fallback-icon="mdi:robot-outline" />
</div>`,
      },
    ],
  },
  {
    slug: 'kbd',
    base: 'Kbd',
    name: 'UiKbd',
    category: 'display',
    icon: 'mdi:keyboard-outline',
    summary: 'A keyboard-key badge.',
    description:
      'Renders a key or key combination as a small badge, for documenting shortcuts. Put the key text in the default slot.',
    props: [],
    events: [],
    slots: [{ name: 'default', description: 'Key text or combination to display.' }],
    examples: [
      {
        title: 'Shortcuts',
        description: 'Combine several to show a chord.',
        code: `<p class="flex items-center gap-1 text-sm text-gray-500">
  Save with <UiKbd>⌘</UiKbd> <UiKbd>S</UiKbd>
</p>`,
      },
    ],
  },
  {
    slug: 'icon',
    base: 'Icon',
    name: 'UiIcon',
    category: 'display',
    icon: 'mdi:emoticon-outline',
    summary: 'Renders an icon by name.',
    description:
      'Draws an icon from the bundled Material Design Icons subset, or delegates to a host icon component when one is provided (on this site it renders through @nuxt/icon, so any mdi: name works). Colour inherits from text via currentColor; size comes from classes.',
    props: [
      {
        name: 'name',
        type: 'string',
        default: "''",
        values: null,
        description: "Icon name, e.g. 'mdi:check'. A bare name is treated as MDI.",
      },
    ],
    events: [],
    slots: [],
    examples: [
      {
        title: 'Names and colour',
        description: 'Icons inherit the current text colour and are sized with classes.',
        code: `<div class="flex items-center gap-4">
  <UiIcon name="mdi:heart" class="w-6 h-6 text-primary-500" />
  <UiIcon name="mdi:star" class="w-6 h-6 text-amber-500" />
  <UiIcon name="mdi:check-circle" class="w-6 h-6 text-success-600" />
  <UiIcon name="mdi:github" class="w-6 h-6" />
</div>`,
      },
    ],
  },
  {
    slug: 'segmented',
    base: 'Segmented',
    name: 'UiSegmented',
    category: 'actions',
    icon: 'mdi:toggle-switch-off-outline',
    summary: 'Segmented single-select control with an animated sliding indicator.',
    description:
      'Pick one of a few named options from a row of segments, with an indicator that slides to the active choice. It is a group of aria-pressed toggle buttons, not a switch, because the choice is between named options rather than on/off. Its variant prop mirrors UiButton — solid, outline and ghost — so the two read as one family, and it covers both tab-style and icon-toolbar layouts (the role formerly held by the separate buttons group). Bind the selection with v-model; label it with aria-label or aria-labelledby.',
    props: [
      {
        name: 'modelValue',
        type: 'string | number',
        default: 'undefined',
        values: null,
        description: 'The selected option value (v-model).',
      },
      {
        name: 'options',
        type: 'array',
        default: '—',
        required: true,
        values: null,
        description:
          'Options as `{ value, label?, icon?, disabled?, title? }`. Provide label for text segments, icon for icon-only segments, or both; title sets the native tooltip.',
      },
      {
        name: 'variant',
        type: 'string',
        default: "'solid'",
        values: ['solid', 'outline', 'ghost'],
        description:
          'Active-segment appearance, matching UiButton: solid fills the indicator (white label), outline and ghost tint it (accent label).',
      },
      {
        name: 'size',
        type: 'string',
        default: "'md'",
        values: ['sm', 'md'],
        description: 'Control size.',
      },
      {
        name: 'shape',
        type: 'string',
        default: "'pill'",
        values: ['pill', 'round', 'square'],
        description: 'Corner shape of the track, indicator and segments (matches UiButton).',
      },
      {
        name: 'block',
        type: 'boolean',
        default: 'false',
        values: null,
        description:
          'Full-width mode; the control fills its container and segments share the width equally.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Accessible name for the group (omit if labelled by aria-labelledby).',
      },
    ],
    events: [
      {
        name: 'update:modelValue',
        payload: 'string | number',
        description: "Emitted with the chosen option's value.",
      },
    ],
    slots: [],
    examples: [
      {
        title: 'Billing period',
        description: 'Two named options; the indicator slides to the active one.',
        code: `<UiSegmented
  v-model="state.billing"
  aria-label="Billing period"
  :options="[
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ]"
/>`,
      },
      {
        title: 'Variants',
        description: 'solid, outline and ghost mirror the equivalent UiButton variants.',
        code: `<div class="flex flex-col items-start gap-3">
  <UiSegmented v-model="state.v1" aria-label="Solid" :options="[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]" />
  <UiSegmented v-model="state.v2" variant="outline" aria-label="Outline" :options="[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]" />
  <UiSegmented v-model="state.v3" variant="ghost" aria-label="Ghost" :options="[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]" />
</div>`,
      },
      {
        title: 'Icon toolbar',
        description:
          'Icon-only segments with a title on each; square corners suit a toolbar. Options can carry an icon and no label.',
        code: `<UiSegmented
  v-model="state.tool"
  variant="outline"
  shape="square"
  aria-label="Format"
  :options="[
    { value: 'bold', icon: 'mdi:format-bold', title: 'Bold' },
    { value: 'italic', icon: 'mdi:format-italic', title: 'Italic' },
    { value: 'underline', icon: 'mdi:format-underline', title: 'Underline' },
  ]"
/>`,
      },
      {
        title: 'Sizes, shapes and a disabled option',
        description:
          'Two sizes (sm, md), three shapes (pill, round, square), and per-option disabled.',
        code: `<div class="flex flex-col items-start gap-3">
  <UiSegmented v-model="state.a" size="sm" shape="round" aria-label="Small" :options="[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]" />
  <UiSegmented v-model="state.b" aria-label="Disabled option" :options="[{ value: 'on', label: 'On' }, { value: 'off', label: 'Off' }, { value: 'auto', label: 'Auto', disabled: true }]" />
</div>`,
      },
      {
        title: 'Full width',
        description: 'block stretches the control to fill its container.',
        code: `<div class="max-w-sm">
  <UiSegmented v-model="state.tab" block variant="ghost" aria-label="Filter" :options="[{ value: 'all', label: 'All' }, { value: 'active', label: 'Active' }, { value: 'done', label: 'Done' }]" />
</div>`,
      },
    ],
  },
  {
    slug: 'card',
    base: 'Card',
    name: 'UiCard',
    category: 'display',
    icon: 'mdi:card-outline',
    summary: 'The surface primitive: a bordered, rounded, elevated container.',
    description:
      'The shell shared by product, blog, pricing and link cards. It lays out optional header, default and footer slots but takes no view over their contents. Renders as any element via tag (so a whole card can be a link), with interactive (hover lift), highlighted (accent border) and focus-ring (for the stretched-link pattern) states. External classes merge via tailwind-merge, so a caller can override the tint.',
    props: [
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        values: ['div', 'article', 'section', 'a', 'li', 'any valid tag'],
        description: 'Element (or globally registered component) to render as.',
      },
      {
        name: 'padding',
        type: 'string',
        default: "'md'",
        values: ['none', 'xs', 'sm', 'md', 'lg'],
        description: 'Inner padding.',
      },
      {
        name: 'radius',
        type: 'string',
        default: "'2xl'",
        values: ['lg', 'xl', '2xl'],
        description: 'Corner radius.',
      },
      {
        name: 'shadow',
        type: 'string',
        default: "'card'",
        values: ['none', 'card', 'card-hover'],
        description: 'Base drop shadow.',
      },
      {
        name: 'bordered',
        type: 'boolean',
        default: 'true',
        values: null,
        description: 'Draw the surface border.',
      },
      {
        name: 'interactive',
        type: 'boolean',
        default: 'false',
        values: null,
        description:
          'Hover lift and stronger shadow; add a hover:border-* class to tint the border.',
      },
      {
        name: 'highlighted',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Accent border and a raised shadow, for the featured card in a group.',
      },
      {
        name: 'focusRing',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Lift the focus ring to the card for the stretched-link pattern.',
      },
    ],
    events: [],
    slots: [
      { name: 'default', description: 'Card body.' },
      { name: 'header', description: 'Optional header, drawn above the body with a divider.' },
      { name: 'footer', description: 'Optional footer, drawn below the body with a divider.' },
    ],
    examples: [
      {
        title: 'Basic',
        description: 'A padded, bordered surface.',
        code: `<UiCard class="max-w-sm">
  <h3 class="font-semibold">Encrypted by default</h3>
  <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Your notes are yours alone.</p>
</UiCard>`,
      },
      {
        title: 'Interactive and highlighted',
        description: 'Hover to lift; the highlighted card carries the accent border.',
        code: `<div class="grid gap-4 sm:grid-cols-2">
  <UiCard interactive class="hover:border-primary-300">
    <h3 class="font-semibold">Standard</h3>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">A regular tier.</p>
  </UiCard>
  <UiCard highlighted>
    <h3 class="font-semibold">Recommended</h3>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">The one most people pick.</p>
  </UiCard>
</div>`,
      },
      {
        title: 'Header and footer',
        description: 'The header and footer slots add dividers around the body.',
        code: `<UiCard class="flex max-w-sm flex-col" padding="lg">
  <template #header>
    <h3 class="font-semibold">Plan</h3>
  </template>
  <p class="text-sm text-gray-600 dark:text-gray-400">Everything included, one price.</p>
  <template #footer>
    <UiButton block>Choose plan</UiButton>
  </template>
</UiCard>`,
      },
    ],
  },
  {
    slug: 'icon-tile',
    base: 'IconTile',
    name: 'UiIconTile',
    category: 'display',
    icon: 'mdi:square-rounded',
    summary: 'A rounded, tinted tile holding a single icon.',
    description:
      'The motif that stands in for a product logo or marks a feature next to a heading. Decorative by default (the icon is hidden from assistive technology). The tint uses the semantic palette; pass bg-*/text-* classes to override it with any colour via tailwind-merge.',
    props: [
      {
        name: 'icon',
        type: 'string',
        default: '—',
        required: true,
        values: null,
        description: 'MDI icon name.',
      },
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        values: ['primary', 'gray', 'success', 'warning', 'error', 'blue'],
        description: 'Tint colour from the semantic palette.',
      },
      {
        name: 'size',
        type: 'string',
        default: "'md'",
        values: ['sm', 'md', 'lg', 'xl'],
        description: 'Tile size; the radius scales with it.',
      },
    ],
    events: [],
    slots: [],
    examples: [
      {
        title: 'Colours',
        description: 'The semantic tints.',
        code: `<div class="flex items-center gap-3">
  <UiIconTile icon="mdi:shield-lock-outline" />
  <UiIconTile icon="mdi:check" color="success" />
  <UiIconTile icon="mdi:alert-outline" color="warning" />
  <UiIconTile icon="mdi:close" color="error" />
  <UiIconTile icon="mdi:information-outline" color="blue" />
  <UiIconTile icon="mdi:cog-outline" color="gray" />
</div>`,
      },
      {
        title: 'Sizes',
        description: 'Four sizes from sm to xl.',
        code: `<div class="flex items-center gap-3">
  <UiIconTile icon="mdi:note-text-outline" size="sm" />
  <UiIconTile icon="mdi:note-text-outline" size="md" />
  <UiIconTile icon="mdi:note-text-outline" size="lg" />
  <UiIconTile icon="mdi:note-text-outline" size="xl" />
</div>`,
      },
      {
        title: 'Custom colour',
        description: 'Pass bg-*/text-* classes to use a colour outside the semantic set.',
        code: `<div class="flex items-center gap-3">
  <UiIconTile icon="mdi:palette-outline" class="bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300" />
  <UiIconTile icon="mdi:palette-outline" class="bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300" />
</div>`,
      },
    ],
  },
  {
    slug: 'section-heading',
    base: 'SectionHeading',
    name: 'UiSectionHeading',
    category: 'display',
    icon: 'mdi:format-header-pound',
    summary: 'Eyebrow, heading and standfirst for a page or section.',
    description:
      'The eyebrow / heading / standfirst trio used at the top of a page or the start of a section. The heading tag (level) follows the document outline while the visual size is set separately, so neither is sacrificed for the other. Layout-neutral: the caller controls spacing and measure.',
    props: [
      {
        name: 'eyebrow',
        type: 'string',
        default: "''",
        values: null,
        description: 'Small uppercase label above the heading.',
      },
      {
        name: 'title',
        type: 'string',
        default: "''",
        values: null,
        description: 'Heading text (omit if using the title slot).',
      },
      {
        name: 'subtitle',
        type: 'string',
        default: "''",
        values: null,
        description: 'Supporting paragraph below the heading.',
      },
      {
        name: 'level',
        type: 'string',
        default: "'h2'",
        values: ['h1', 'h2', 'h3', 'h4'],
        description: 'Heading tag, chosen to match the document outline.',
      },
      {
        name: 'size',
        type: 'string',
        default: "'md'",
        values: ['sm', 'md', 'lg'],
        description: 'Visual size of the heading, independent of level.',
      },
      {
        name: 'align',
        type: 'string',
        default: "'left'",
        values: ['left', 'center'],
        description: 'Horizontal alignment.',
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        values: null,
        description: 'Optional id on the heading, for aria-labelledby.',
      },
    ],
    events: [],
    slots: [
      { name: 'title', description: 'Overrides the title prop for rich heading content.' },
      { name: 'subtitle', description: 'Overrides the subtitle prop.' },
      {
        name: 'default',
        description: 'Extra content below the standfirst, e.g. a call to action.',
      },
    ],
    examples: [
      {
        title: 'Section heading',
        description: 'Eyebrow, heading and standfirst, left-aligned.',
        code: `<UiSectionHeading
  eyebrow="Pricing"
  title="One price, everything included"
  subtitle="No tiers, no add-ons — every app, one storage quota."
/>`,
      },
      {
        title: 'Centred hero',
        description: 'A larger, centred heading with a nested level.',
        code: `<UiSectionHeading
  align="center"
  size="lg"
  level="h1"
  title="Own your notes"
  subtitle="A calm, private place to think."
/>`,
      },
    ],
  },
  {
    slug: 'breadcrumb',
    base: 'Breadcrumb',
    name: 'UiBreadcrumb',
    category: 'display',
    icon: 'mdi:chevron-right',
    summary: 'The trail from the site root to the current page.',
    description:
      'A navigation trail whose final item always renders as aria-current="page" text rather than a link. Separators are decorative icons. Links render with linkTag, so a router link component can replace the plain anchor; the item scoped slot allows full control of each entry.',
    props: [
      {
        name: 'items',
        type: 'array',
        default: '—',
        required: true,
        values: null,
        description: 'Entries `{ label, to?, href? }`, root first; the last renders as text.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: "'Breadcrumb'",
        values: null,
        description: 'Accessible name for the surrounding nav.',
      },
      {
        name: 'linkTag',
        type: 'string',
        default: "'a'",
        values: null,
        description: 'Element or component used for linked entries (e.g. NuxtLink).',
      },
      {
        name: 'separatorIcon',
        type: 'string',
        default: "'mdi:chevron-right'",
        values: null,
        description: 'MDI icon drawn between entries.',
      },
    ],
    events: [],
    slots: [
      { name: 'item', description: 'Override a single entry. Scope: `{ item, index, isLast }`.' },
    ],
    examples: [
      {
        title: 'Anchor links',
        description: 'The final entry is plain text; earlier ones link.',
        code: `<UiBreadcrumb
  :items="[
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Notes' },
  ]"
/>`,
      },
      {
        title: 'Custom separator',
        description: 'Any MDI icon can separate the entries.',
        code: `<UiBreadcrumb
  separator-icon="mdi:slash-forward"
  :items="[
    { label: 'Docs', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Breadcrumb' },
  ]"
/>`,
      },
    ],
  },

  // ── Added in 0.3.0 ──────────────────────────────────────────────
  {
    slug: 'theme-toggle',
    base: 'ThemeToggle',
    name: 'UiThemeToggle',
    category: 'actions',
    icon: 'mdi:theme-light-dark',
    summary: 'A stateless light/dark toggle button.',
    description:
      'An icon button that flips between light and dark. Deliberately stateless: it shows the state you pass as isDark and emits toggle, leaving persistence to the host (@nuxtjs/color-mode, VueUse, or two hand-written lines). The sun and moon share a cell and cross-fade with a quarter turn. Because dark mode depends on a client-only preference, wrap it in <ClientOnly> when server-rendering to avoid a hydration mismatch.',
    props: [
      {
        name: 'isDark',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Whether the dark theme is active; chooses which glyph shows.',
      },
      {
        name: 'label',
        type: 'string',
        default: "'Toggle theme'",
        values: null,
        description:
          'Accessible name and tooltip; describe the action, e.g. "Switch to dark mode".',
      },
    ],
    events: [
      {
        name: 'toggle',
        payload: 'none',
        description: 'Emitted when the button is pressed; the parent flips the theme.',
      },
    ],
    slots: [],
    examples: [
      {
        title: 'Light / dark',
        description: 'It renders the state you give it and emits toggle for you to flip.',
        code: `<UiThemeToggle
  :is-dark="state.dark"
  :label="state.dark ? 'Switch to light mode' : 'Switch to dark mode'"
  @toggle="state.dark = !state.dark"
/>`,
      },
    ],
  },
  {
    slug: 'spinner',
    base: 'Spinner',
    name: 'UiSpinner',
    category: 'feedback',
    icon: 'mdi:loading',
    summary: 'A spinning icon for loading states.',
    description:
      'The loading glyph UiButton uses, as a standalone primitive. Colour is inherited via text-*, like any icon. Decorative by default and hidden from assistive technology; give it a label and it becomes a live status region that announces on its own.',
    props: [
      {
        name: 'size',
        type: 'string',
        default: "'md'",
        values: ['xs', 'sm', 'md', 'lg', 'xl'],
        description: 'Diameter of the spinner.',
      },
      {
        name: 'label',
        type: 'string',
        default: "''",
        values: null,
        description:
          'Accessible label; when set, the spinner is announced as a live status region.',
      },
      {
        name: 'icon',
        type: 'string',
        default: "'mdi:loading'",
        values: null,
        description: 'MDI glyph to spin; pass another (e.g. mdi:sync) for a different look.',
      },
    ],
    events: [],
    slots: [],
    examples: [
      {
        title: 'Sizes',
        description: 'Five sizes from xs to xl; colour is inherited from the text colour.',
        code: `<div class="flex items-center gap-4 text-primary-600 dark:text-primary-400">
  <UiSpinner size="xs" />
  <UiSpinner size="sm" />
  <UiSpinner size="md" />
  <UiSpinner size="lg" />
  <UiSpinner size="xl" />
</div>`,
      },
      {
        title: 'Labelled',
        description: 'A label turns it into a live status region for when it stands alone.',
        code: `<UiSpinner size="lg" label="Syncing" class="text-primary-600 dark:text-primary-400" />`,
      },
    ],
  },
  {
    slug: 'toast',
    base: 'Toast',
    name: 'UiToast',
    category: 'feedback',
    icon: 'mdi:message-badge-outline',
    summary: 'A stack of transient, self-dismissing messages.',
    description:
      'Renders and animates a list of messages, teleported to the top of the screen so it floats above everything. Presentational only: the host owns the list and its timing and mutates a reactive array. Each entry is { id, message, type?, icon? }; type picks the colour, defaulting to a neutral pill. The container ignores pointer events so it never blocks the UI, and each pill is a polite status region.',
    props: [
      {
        name: 'toasts',
        type: 'array',
        default: '[]',
        values: null,
        description:
          'Messages to show, each `{ id, message, type?, icon? }` with a stable, unique id.',
      },
      {
        name: 'position',
        type: 'string',
        default: "'top'",
        values: ['top', 'bottom'],
        description: 'Where the stack anchors on screen.',
      },
    ],
    events: [],
    slots: [],
    examples: [
      {
        title: 'Message types',
        description:
          'The stack teleports to the top of the screen. Toggle a set of the four types on and off.',
        code: `<div>
  <UiButton
    @click="state.toasts = state.toasts?.length ? [] : [
      { id: 1, message: 'Saved', type: 'success', icon: 'mdi:check' },
      { id: 2, message: 'Heads up', type: 'warning' },
      { id: 3, message: 'Something went wrong', type: 'error' },
      { id: 4, message: 'Just so you know', type: 'info' },
    ]"
  >
    Toggle toasts
  </UiButton>
  <UiToast :toasts="state.toasts || []" />
</div>`,
      },
    ],
  },
  {
    slug: 'banner',
    base: 'Banner',
    name: 'UiBanner',
    category: 'feedback',
    icon: 'mdi:alert-box-outline',
    summary: 'A full-width status strip that slides in above the content.',
    description:
      'The shape shared by the offline notice, the email-verification prompt and the update prompt: a thin, edge-to-edge bar that expands into view, states one thing with an optional icon, and collapses away when the condition clears. Driven by show, with a semantic colour, an optional message slot, top safe-area padding by default, and optional clickable / dismissible affordances that emit click and dismiss.',
    props: [
      {
        name: 'show',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Whether the banner is shown; toggling it runs the slide-in / collapse-out.',
      },
      {
        name: 'color',
        type: 'string',
        default: "'info'",
        values: ['info', 'success', 'warning', 'error', 'neutral'],
        description: 'Colour of the bar.',
      },
      {
        name: 'icon',
        type: 'string',
        default: "''",
        values: null,
        description: 'Optional MDI icon shown before the message.',
      },
      {
        name: 'message',
        type: 'string',
        default: "''",
        values: null,
        description: 'Message text; ignored when the default slot is used.',
      },
      {
        name: 'clickable',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Makes the whole bar a button that emits click.',
      },
      {
        name: 'dismissible',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Adds a close control that emits dismiss.',
      },
      {
        name: 'dismissLabel',
        type: 'string',
        default: "'Dismiss'",
        values: null,
        description: 'Accessible label for the dismiss control.',
      },
      {
        name: 'safeArea',
        type: 'boolean',
        default: 'true',
        values: null,
        description:
          'Pads for the top safe-area inset, for a banner pinned to the top of the screen.',
      },
    ],
    events: [
      {
        name: 'click',
        payload: 'none',
        description: 'Emitted when a clickable banner is pressed.',
      },
      {
        name: 'dismiss',
        payload: 'none',
        description: 'Emitted when the close control of a dismissible banner is pressed.',
      },
    ],
    slots: [{ name: 'default', description: 'Banner content, in place of the message prop.' }],
    examples: [
      {
        title: 'Colours',
        description: 'Full-width strips in the semantic colours.',
        code: `<div class="flex flex-col gap-2">
  <UiBanner show :safe-area="false" color="info" icon="mdi:information-outline" message="A new version is available" />
  <UiBanner show :safe-area="false" color="success" icon="mdi:check-circle" message="Everything is up to date" />
  <UiBanner show :safe-area="false" color="warning" icon="mdi:wifi-off" message="You're offline — changes will sync when you reconnect" />
  <UiBanner show :safe-area="false" color="error" icon="mdi:alert-circle" message="Sync failed — retrying" />
</div>`,
      },
      {
        title: 'Clickable and dismissible',
        description: 'Emits click when pressed and dismiss from the close control.',
        code: `<div>
  <UiButton class="mb-2" size="sm" @click="state.gone = false">Reset</UiButton>
  <UiBanner
    :show="!state.gone"
    :safe-area="false"
    color="info"
    icon="mdi:email-alert-outline"
    message="Your email is not verified — tap here to verify"
    clickable
    dismissible
    @dismiss="state.gone = true"
  />
</div>`,
      },
    ],
  },
  {
    slug: 'code-block',
    base: 'CodeBlock',
    name: 'UiCodeBlock',
    category: 'display',
    icon: 'mdi:code-tags',
    summary: 'A static, copyable code snippet.',
    description:
      'For code that documents itself rather than runs: install commands, config, imports. A copy button fades in on hover or keyboard focus and confirms with a tick. An optional label renders a filename or language caption across the top. The copy uses the async Clipboard API and fails silently where it is unavailable; the button labels are props, so no language is baked in.',
    props: [
      {
        name: 'code',
        type: 'string',
        default: '—',
        required: true,
        values: null,
        description: 'The snippet text.',
      },
      {
        name: 'label',
        type: 'string',
        default: "''",
        values: null,
        description: 'Optional filename/language caption shown above the block.',
      },
      {
        name: 'copyLabel',
        type: 'string',
        default: "'Copy'",
        values: null,
        description: 'Label for the copy button at rest.',
      },
      {
        name: 'copiedLabel',
        type: 'string',
        default: "'Copied'",
        values: null,
        description: 'Label shown briefly after a successful copy.',
      },
    ],
    events: [],
    slots: [],
    examples: [
      {
        title: 'With a caption',
        description: 'An optional label names the file or language.',
        code: `<UiCodeBlock label="Terminal" code="npm install numori-ui" />`,
      },
      {
        title: 'Bare',
        description: 'Without a label, just the snippet and a copy button on hover.',
        code: `<UiCodeBlock code="import { UiButton } from 'numori-ui'" />`,
      },
    ],
  },
  {
    slug: 'table',
    base: 'Table',
    name: 'UiTable',
    category: 'display',
    icon: 'mdi:table',
    summary: 'A data table with a built-in comparison mode.',
    description:
      'A general, accessible data table driven by columns and rows: each column names a key, and each row is an object keyed by those keys. It renders a real <table> (caption, scope headers) that scrolls horizontally on narrow screens rather than crushing its columns. Comparison is a configuration rather than a separate component — mark the label column header, give the featured column highlight, and hand each value column an icon — which reproduces the old comparison table. The #cell scoped slot takes over any cell.',
    props: [
      {
        name: 'columns',
        type: 'array',
        default: '—',
        required: true,
        values: null,
        description:
          'Column definitions, left to right, each `{ key, label?, align?, header?, highlight?, icon?, width? }`. header renders the column as row headers (`<th scope="row">`); highlight accent-tints it; icon shows a leading MDI icon before each value; align is left/center/right.',
      },
      {
        name: 'rows',
        type: 'array',
        default: '—',
        required: true,
        values: null,
        description: 'Row objects, each keyed by the column `key`s.',
      },
      {
        name: 'caption',
        type: 'string',
        default: "''",
        values: null,
        description: 'Table caption, rendered as a real `<caption>`. Visible by default.',
      },
      {
        name: 'hideCaption',
        type: 'boolean',
        default: 'false',
        values: null,
        description: 'Keep the caption for assistive technology but hide it visually.',
      },
      {
        name: 'rowKey',
        type: 'string',
        default: "'key'",
        values: null,
        description: 'Row field used as the v-for key; falls back to the row index.',
      },
    ],
    events: [],
    slots: [
      { name: 'caption', description: 'Rich caption content (overrides the caption prop).' },
      { name: 'cell', description: 'Custom cell content. Scope: `{ row, column, value }`.' },
    ],
    examples: [
      {
        title: 'Data table',
        description:
          'Columns name a key; rows are objects keyed by those keys. Align a column right.',
        code: `<UiTable
  caption="Team"
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'commits', label: 'Commits', align: 'right' },
  ]"
  :rows="[
    { key: 'ada', name: 'Ada Lovelace', role: 'Engineer', commits: 128 },
    { key: 'grace', name: 'Grace Hopper', role: 'Lead', commits: 342 },
  ]"
/>`,
      },
      {
        title: 'Comparison mode',
        description:
          'Mark the label column header, the featured column highlight, and give each value column an icon — the old comparison table as a configuration.',
        code: `<UiTable
  caption="How Numori compares"
  hide-caption
  :columns="[
    { key: 'feature', label: 'Feature', header: true },
    { key: 'numori', label: 'Numori', highlight: true, icon: 'mdi:check-circle' },
    { key: 'usual', label: 'The usual suite', icon: 'mdi:minus-circle-outline' },
  ]"
  :rows="[
    { key: 'oss', feature: 'Open source', numori: 'The whole ecosystem', usual: 'The client, sometimes' },
    { key: 'sync', feature: 'Sync', numori: 'End-to-end encrypted', usual: 'Readable on the server' },
    { key: 'ai', feature: 'AI training', numori: 'Never', usual: 'On by default' },
  ]"
/>`,
      },
      {
        title: 'Custom cells',
        description: 'The #cell scoped slot renders any cell — here a badge for a status column.',
        code: `<UiTable
  caption="Services"
  :columns="[
    { key: 'name', label: 'Service' },
    { key: 'status', label: 'Status' },
  ]"
  :rows="[
    { key: 'sync', name: 'Sync', status: 'active' },
    { key: 'backup', name: 'Backup', status: 'paused' },
  ]"
>
  <template #cell="{ column, value }">
    <UiBadge v-if="column.key === 'status'" :color="value === 'active' ? 'green' : 'gray'">
      {{ value }}
    </UiBadge>
    <template v-else>{{ value }}</template>
  </template>
</UiTable>`,
      },
    ],
  },
]

/** Look up a component doc by its URL slug. Returns undefined when unknown. */
export const findUiComponent = (slug) => uiComponents.find((component) => component.slug === slug)

/** All component slugs, for prerendering the dynamic routes. */
export const uiComponentSlugs = () => uiComponents.map((component) => component.slug)

/** Categories paired with their components, preserving catalogue order; empty groups dropped. */
export const uiComponentsByCategory = () =>
  UI_COMPONENT_CATEGORIES.map((category) => ({
    ...category,
    components: uiComponents.filter((component) => component.category === category.key),
  })).filter((group) => group.components.length > 0)

/** Adjacent components in catalogue order, for prev/next navigation. */
export const uiComponentNeighbours = (slug) => {
  const index = uiComponents.findIndex((component) => component.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? uiComponents[index - 1] : null,
    next: index < uiComponents.length - 1 ? uiComponents[index + 1] : null,
  }
}
