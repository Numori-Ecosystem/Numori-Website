/**
 * Verifies that every locale file parses and that all locales define exactly the
 * same set of keys. Run with `npm run check:locales`.
 *
 * A missing key does not fail the Nuxt build — vue-i18n just renders the raw key
 * path — so this check is the only thing standing between a typo and shipping
 * "products.notes.perks.3.title" as visible copy.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const LOCALES_DIR = new URL('../i18n/locales/', import.meta.url).pathname
const REFERENCE = 'en-GB.json'

/** Flattens nested message objects into dotted key paths. */
const flatten = (value, prefix = '') =>
  Object.entries(value).flatMap(([key, child]) =>
    child && typeof child === 'object' && !Array.isArray(child)
      ? flatten(child, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  )

const files = readdirSync(LOCALES_DIR).filter((name) => name.endsWith('.json'))
const parsed = new Map()

for (const file of files) {
  try {
    parsed.set(file, JSON.parse(readFileSync(join(LOCALES_DIR, file), 'utf8')))
  } catch (error) {
    console.error(`✗ ${file} is not valid JSON: ${error.message}`)
    process.exit(1)
  }
}

const reference = flatten(parsed.get(REFERENCE))
let failed = false

for (const [file, messages] of parsed) {
  const keys = flatten(messages)
  const missing = reference.filter((key) => !keys.includes(key))
  const extra = keys.filter((key) => !reference.includes(key))

  if (missing.length || extra.length) {
    failed = true
    console.error(`✗ ${file}`)
    if (missing.length) console.error(`  missing ${missing.length}: ${missing.join(', ')}`)
    if (extra.length) console.error(`  unknown ${extra.length}: ${extra.join(', ')}`)
  } else {
    console.warn(`✓ ${file} — ${keys.length} keys`)
  }
}

if (failed) process.exit(1)
console.warn(`\nAll ${parsed.size} locales agree on ${reference.length} keys.`)
