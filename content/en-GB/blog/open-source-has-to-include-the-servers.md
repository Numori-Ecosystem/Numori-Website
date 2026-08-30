---
title: Open source has to include the servers
description: >-
  Publishing a client while the server stays closed proves almost nothing. Here
  is what an open client actually tells you, and what it does not.
date: 2026-08-04
author: Erik Bjerke
tags:
  - principles
  - open-source
minutes: 5
---

A lot of privacy-focused companies describe themselves as open source. Usually
what that means is the apps are public and the backend is not. That is better
than nothing, and it is much less than it sounds.

## What an open client proves

Quite a lot, actually. If the client is open and reproducibly built, you can
verify that it encrypts before sending, that the keys are derived where the
documentation says, and that it does not contain a third-party analytics SDK. For
end-to-end encrypted content, this is most of the story: if the ciphertext leaves
your device correctly, the server's honesty matters much less.

## What it does not prove

Everything about the parts that are not end-to-end encrypted, which is always
more than the marketing implies.

Metadata is the obvious one. Who you email, when, how often, from which IP, and
how large the message was. None of that is in the client's threat model, and all
of it is retained or not retained by code you cannot see. "We do not log IP
addresses" is a sentence about a config file you are not allowed to read.

Then there is everything operational: retention windows, backup lifetimes,
whether deletion is real, which third parties the service calls, and what happens
to an account flagged for abuse. All decided in a repository you have no access
to.

## The uncomfortable version

The reason server code stays closed is rarely that it contains secrets. Secrets
belong in a vault, not in source. It stays closed because it is where the
compromises live: the analytics that were supposed to be temporary, the vendor
that needed plaintext, the retention window that is longer than the policy page
implies.

I am not accusing anyone in particular. I am saying that "trust us, the server is
fine" is the one claim in a privacy pitch that cannot be checked, and it is
consistently the claim that is left uncheckable.

## What we are doing about it

Every Numori server is public under the AGPL-3.0. `Numori-CRDT` is the sync
relay, `Numori-Auth` is the identity service, and both are readable today. The
AGPL matters here rather than a permissive licence: it means anyone can run
Numori as a service, but they have to publish their modifications too. If we are
ever acquired and someone decides the sync relay should start keeping a little
more, the licence makes that visible.

This does not make us trustworthy. It makes us checkable, which is a more useful
property, because it does not depend on our intentions staying good.

## The catch, stated plainly

Publishing the server does not prove that the code we published is the code we
are running. That gap is real and I am not going to pretend otherwise. Closing it
properly needs reproducible builds and attestation, which is on the roadmap for
`Numori-Updater` and is genuinely hard.

What publishing does give you is a specification precise enough to hold us to, an
independent implementation you can run yourself, and the ability to leave for
your own server without losing anything. That is a much better position than
taking a policy page at face value.
