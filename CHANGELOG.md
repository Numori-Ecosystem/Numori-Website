# Changelog

Notable changes to the Numori website. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/). This is a continuously
deployed site, so changes land under **Unreleased** rather than versioned tags.

## [Unreleased]

### Changed

- **Consume Numori UI from the npm registry.** The dependency moved from a local
  `file:../numori-ui` link to `"numori-ui": "^0.2.0"`, so a plain `npm install`
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
