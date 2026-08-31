# Changelog

Notable changes to the Numori website. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/). This is a continuously
deployed site, so changes land under **Unreleased** rather than versioned tags.

## [Unreleased]

### Fixed

- **UI manual code samples are now syntax-highlighted.** `CodePreview` rendered
  its source as plain text; it now highlights with Shiki (a dual light/dark theme
  switched under the `.dark` class). Highlighting runs once at prerender time and
  is serialised into the page payload, so the highlighter and its wasm engine are
  dead-code-eliminated from the client build and never ship to the browser.
- **Overlays in the UI manual previews are no longer clipped.** The preview card
  used `overflow-hidden`, which cut off `UiTooltip` and `UiDropdown` (both
  position absolutely rather than teleporting). The clip is now scoped to the
  source pane, so overlays escape the demo area in full.
- **Missing icons in the UI manual previews.** The live previews mount on the
  client, so their icons must be in the client bundle, but they live as strings
  in `app/data/ui-components.js`, which @nuxt/icon's scanner does not read — so
  only a handful were bundled and the rest 404'd on the static deploy. The build
  now extracts every icon the catalogue references and adds them to the client
  bundle, keeping the list in step with the examples.

### Changed

- **Upgraded to Numori UI 0.4.0 and migrated its breaking changes** (dependency
  now `"numori-ui": "^0.4.0"`). 0.4.0 is a consolidation release that folds two
  components into more capable ones:
  - `UiComparisonTable` was removed in favour of the general `UiTable`. The home
    page's comparison now configures `UiTable` — a row-header label column, one
    `highlight` column, and per-column tick/dash `icon`s — reproducing the old
    look, with the caption kept for assistive technology via `hide-caption`.
  - `UiButtonsGroup` was removed; its role is covered by `UiSegmented`, whose new
    `variant` (`solid` / `outline` / `ghost`), `square` shape, `block` mode and
    per-option `title` / `disabled` cover the former toolbar and tab layouts.
  - `UiButton` shapes were trimmed to `round` / `pill` / `square`. The pricing
    planner's stepper buttons moved from the removed `shape="circle"` to
    `shape="pill"` with `icon-only`, which is now the circular icon-button recipe.
- The UI manual catalogue (`app/data/ui-components.js`) tracks the 0.4.0 API:
  the `UiButtonsGroup` and `UiComparisonTable` entries were removed, a `UiTable`
  entry was added (data-table and comparison examples, `#cell` slot), and the
  `UiSegmented` and `UiButton` entries were updated for the new props and shapes.
  The component count updates automatically.
- **Upgraded to Numori UI 0.3.0 and adopted its new components.** Three local
  components graduated into the design system and were removed here in favour of
  the shared versions (behaviour and appearance preserved):
  - `ThemeSwitcher` → `UiThemeToggle`. The shared component is stateless, so the
    header now owns the `@nuxtjs/color-mode` wiring and keeps the `<ClientOnly>`
    guard against a hydration mismatch.
  - `CodeBlock` → `UiCodeBlock` (copy-button labels passed through from the
    `ui.copy` / `ui.copied` locale keys) across the UI manual.
  - `ComparisonTable` → `UiComparisonTable` on the home page; the comparison rows
    now map to the component's `primary` / `secondary` shape.
- The UI manual catalogue (`app/data/ui-components.js`) documents the six new
  Numori UI components: `UiToast`, `UiBanner`, `UiSpinner`, `UiThemeToggle`,
  `UiCodeBlock` and `UiComparisonTable`. The component count updates automatically.
- **Consume Numori UI from the npm registry.** The dependency moved from a local
  `file:../numori-ui` link to `"numori-ui": "^0.3.0"`, so a plain `npm install`
  pulls the published package — no sibling checkout required. A local checkout can
  still be linked for design-system work (see the README).
- **Tailwind `@source` now points at `node_modules/numori-ui/src`** instead of a
  sibling directory, so the library's component utilities are generated from the
  installed package.
- **Adopted Numori UI's new primitives across the site's components**, replacing
  hand-rolled markup with shared components (behaviour and appearance preserved):
  - `ProductCard`, `BlogCard`, `PrincipleCard`, `PricingCard`, `DonateOptions` and
    `UiComponentGallery` now build on `UiCard`.
  - `SectionHeading` and `CtaBand` build on `UiSectionHeading`.
  - `BreadcrumbTrail` wraps `UiBreadcrumb` (links routed through `NuxtLink`).
  - `BillingToggle` wraps `UiSegmented`.
  - `ProductMark` wraps `UiIconTile`, keeping the per-product accent.
- The UI manual catalogue (`app/data/ui-components.js`) documents the five new
  Numori UI components: `UiCard`, `UiSectionHeading`, `UiBreadcrumb`,
  `UiSegmented` and `UiIconTile`.

### Notes

- `LocaleSwitcher` (real anchor links for SEO and no-JS) and `PageHeader` (a
  page-level composition) remain bespoke by design.
