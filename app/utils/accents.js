/**
 * Per-product accent styles.
 *
 * Every class is written out in full rather than composed from a colour name at
 * runtime. Tailwind resolves utilities by scanning source text, so
 * `bg-${accent}-100` would produce a class that exists in the markup but not in
 * the stylesheet. Keeping the literals here means Tailwind can see them and the
 * palette stays in one auditable place.
 *
 * `primary`, `success`, `warning` and `error` come from the numori-ui theme.
 * The rest are Tailwind's own scales, which the theme leaves untouched.
 */
export const ACCENTS = {
  primary: {
    tile: 'bg-primary-100 text-primary-700 dark:bg-primary-400/15 dark:text-primary-300',
    text: 'text-primary-600 dark:text-primary-400',
    ring: 'group-hover:border-primary-300 dark:group-hover:border-primary-400/40',
    glow: 'from-primary-400/20',
  },
  success: {
    tile: 'bg-success-100 text-success-700 dark:bg-success-400/15 dark:text-success-300',
    text: 'text-success-700 dark:text-success-300',
    ring: 'group-hover:border-success-300 dark:group-hover:border-success-400/40',
    glow: 'from-success-400/20',
  },
  amber: {
    tile: 'bg-warning-100 text-warning-700 dark:bg-warning-400/15 dark:text-warning-300',
    text: 'text-warning-700 dark:text-warning-300',
    ring: 'group-hover:border-warning-300 dark:group-hover:border-warning-400/40',
    glow: 'from-warning-400/20',
  },
  error: {
    tile: 'bg-error-100 text-error-700 dark:bg-error-400/15 dark:text-error-300',
    text: 'text-error-600 dark:text-error-300',
    ring: 'group-hover:border-error-300 dark:group-hover:border-error-400/40',
    glow: 'from-error-400/20',
  },
  sky: {
    tile: 'bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300',
    text: 'text-sky-700 dark:text-sky-300',
    ring: 'group-hover:border-sky-300 dark:group-hover:border-sky-400/40',
    glow: 'from-sky-400/20',
  },
  teal: {
    tile: 'bg-teal-100 text-teal-700 dark:bg-teal-400/15 dark:text-teal-300',
    text: 'text-teal-700 dark:text-teal-300',
    ring: 'group-hover:border-teal-300 dark:group-hover:border-teal-400/40',
    glow: 'from-teal-400/20',
  },
  violet: {
    tile: 'bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300',
    text: 'text-violet-700 dark:text-violet-300',
    ring: 'group-hover:border-violet-300 dark:group-hover:border-violet-400/40',
    glow: 'from-violet-400/20',
  },
  indigo: {
    tile: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-300',
    text: 'text-indigo-700 dark:text-indigo-300',
    ring: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-400/40',
    glow: 'from-indigo-400/20',
  },
  rose: {
    tile: 'bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300',
    text: 'text-rose-700 dark:text-rose-300',
    ring: 'group-hover:border-rose-300 dark:group-hover:border-rose-400/40',
    glow: 'from-rose-400/20',
  },
  orange: {
    tile: 'bg-orange-100 text-orange-700 dark:bg-orange-400/15 dark:text-orange-300',
    text: 'text-orange-700 dark:text-orange-300',
    ring: 'group-hover:border-orange-300 dark:group-hover:border-orange-400/40',
    glow: 'from-orange-400/20',
  },
  gray: {
    tile: 'bg-gray-100 text-gray-700 dark:bg-gray-700/60 dark:text-gray-200',
    text: 'text-gray-700 dark:text-gray-300',
    ring: 'group-hover:border-gray-300 dark:group-hover:border-gray-500',
    glow: 'from-gray-400/20',
  },
}

/**
 * Accent styles for a key, falling back to gray so an unknown accent renders
 * plainly instead of unstyled.
 *
 * @param {string} accent Key from ACCENTS.
 */
export const accentStyles = (accent) => ACCENTS[accent] ?? ACCENTS.gray

/**
 * Maps a product lifecycle status onto a UiBadge colour.
 * UiBadge accepts 'primary' | 'gray' | 'red' | 'green' | 'amber'.
 *
 * Nothing is green, because nothing is stable. The ramp runs gray (not usable) →
 * red (pre-alpha, expect it to break) → amber (alpha, rough but works). Red is
 * uncomfortable next to a product name, which is the point: pre-alpha software
 * genuinely should not be relied on, and a reassuring colour would be a lie.
 */
export const STATUS_BADGE_COLOUR = {
  alpha: 'amber',
  preAlpha: 'red',
  development: 'gray',
}
