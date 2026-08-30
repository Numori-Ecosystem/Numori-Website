---
title: Why there will never be AI in Numori
description: >-
  Refusing to add AI features is not nostalgia or a marketing angle. It is the
  only position consistent with the other promises we have made.
date: 2026-08-18
author: Erik Bjerke
tags:
  - principles
  - privacy
minutes: 6
---

Every few weeks someone asks when Numori Notes will get a summarise button. The
answer is never, and it is worth explaining why, because "no AI" sounds like a
stylistic preference and it is not one.

## The three costs nobody puts on the feature list

A generative feature inside a note-taking app carries three costs that are
usually left out of the announcement post.

**Your data has to go somewhere it can be processed.** Numori Notes stores your
notes locally and syncs them through a relay that holds no keys. A model cannot
summarise something it cannot read. Adding a summarise button means either
shipping your notes to a server that can decrypt them, or shipping a model large
enough to be useful onto your laptop. The first breaks the architecture. The
second is a 4 GB download to save you reading your own shopping list.

**Someone has to pay for the inference.** Inference is not free and it does not
get cheaper per user as you grow — it scales with usage, unlike storage, which
gets cheaper per gigabyte every year. A company that adds AI features to a £3
subscription has three options: raise the price, cap the feature so tightly it is
useless, or find another way to make money from the people using it. All three
are worse than not having the feature.

**It changes what the product is for.** Once a feature is expensive, it has to be
promoted. It gets a place in the toolbar, then a prompt, then a tooltip
suggesting you try it. Software that has to justify a running cost stops being a
tool and starts being a funnel.

## "But it is opt-in"

Opt-in is a real distinction and I do not want to dismiss it. But it decays. The
feature that shipped behind a toggle in version 1 is on by default in version 4,
because the metrics said adoption was low and adoption was the thing being
measured.

More importantly, opt-in does not undo the architectural change. If the server
can decrypt your notes when you press the button, it can decrypt your notes. The
capability is what matters, not the current policy about when it is used. This is
the same argument we make about privacy policies generally: I would rather be
unable to read your data than promise not to.

## What we do instead

The calculator in Numori Notes is a reasonable illustration of the alternative.
It parses `48 GBP in EUR` and `12% of 340` and gives you an answer. It is a
parser and a unit graph. It runs in a fraction of a millisecond, entirely on your
device, it gives the same answer every time, and when it does not understand
something it says so rather than inventing a plausible number.

That last property is the one worth dwelling on. A calculator that is wrong 2% of
the time is not a calculator. A great deal of what gets shipped as an AI feature
is a function that used to be exact and is now approximate, with a friendlier
tone of voice.

## The commitment

No assistants, no summarisation, no generation, no classification of your content,
no "smart" reordering, and no embedding models running over your files to build an
index we can query.

It is an easy promise to verify, which is the point of publishing everything:
`Numori-Notes` has no inference dependency in its lock file, and it never will.
If that changes, you will see it in a pull request before you see it in a
release, and you are welcome to say so loudly.
