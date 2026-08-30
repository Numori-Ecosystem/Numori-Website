---
title: Building eighteen apps with one design system
description: >-
  Numori UI started as a components folder inside the notes app. Extracting it
  taught us more about accessibility than about component APIs.
date: 2026-07-21
author: Erik Bjerke
tags:
  - engineering
  - design-system
  - accessibility
minutes: 7
---

An ecosystem of eighteen applications built by a very small team only works if
almost none of the interface is written twice. `Numori-UI` is how we get there: a
Tailwind 4 and Vue 3 component library that every Numori interface, including this
website, is assembled from.

It did not start as a library. It started as `components/ui/` inside Numori Notes,
and it stayed there for a year before we pulled it out.

## Extracting it was mostly deleting things

The notes app had twenty-eight components in that folder. Roughly a third of them
had a prop that existed for exactly one call site. A `Modal` with a
`hideCloseButtonOnMobileWhenScrolled` boolean is not a design system, it is a
changelog.

The rule we settled on: a prop earns its place if two unrelated screens need it,
or if leaving it out forces a consumer to reimplement the component. Everything
else became a slot. `Modal` went from eleven props to six plus a slot, and the
call sites got shorter rather than longer.

## Accessibility is the reason to extract, not a bonus

This was the genuinely useful outcome and it was not the one we set out for.

When keyboard handling lives in each screen, it is done well in the screens
someone was thinking about it in and forgotten everywhere else. Our notes app had
a modal that trapped focus and a settings dialog that did not, because they were
written four months apart.

Moving that behaviour into the component makes it structural. `Toggle` renders a
real `<button role="switch">` with `aria-checked`, so keyboard activation comes
free from the platform rather than from a `@keydown.space` handler somebody
remembered. `Button` takes `ariaLabel`, `ariaChecked`, `role` and `tabindex` as
first-class props, because the alternative — dropping to a raw `<button>` when you
need an ARIA attribute — is exactly how a design system gets bypassed.

The honest part: it is not finished. `Modal` does not yet trap focus or set
`role="dialog"` and `aria-modal`, and it does not close on Escape. Those are real
gaps, they are written down, and this website deliberately does not use `UiModal`
for anything that matters until they are closed.

## Tree-shaking, because a marketing site should not ship a form library

The library ships no precompiled CSS and no barrel file that drags everything in.
Import `UiKbd` and you get 0.4 kB. Import `UiButton` and you get 16 kB, about 7 kB
of which is the icon path table.

That last number is why this site delegates icons to `@nuxt/icon` instead. The
library bundles the thirty-six MDI glyphs its own components need; a website needs
`mdi:github` and `mdi:robot-off-outline` and thirty others that no component uses.
So `Numori-UI`'s Nuxt module takes an `icons.component` option and hands icon
rendering to whatever the host app already has:

```js
numoriUi: {
  prefix: 'Ui',
  icons: { component: 'Icon' },
}
```

Design systems usually get this backwards and insist on owning the icon layer.

## What it cost

Two weeks, and one genuinely annoying class of bug. Because components are
consumed as raw single-file components rather than as a prebuilt bundle, Vite has
to be told not to pre-bundle or externalise the package. That is three lines in a
Vite plugin now, and it was an afternoon of confusion first.

Worth it. The next application starts with a working, accessible, translated
interface on day one, and an accessibility fix lands in eighteen apps at once
instead of in the one somebody filed a bug against.
