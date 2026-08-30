# syntax=docker/dockerfile:1

##
# numori-website — fully prerendered static site, served by nginx.
#
# Why a Dockerfile rather than Coolify's Railpack or Nixpacks build pack:
# package.json declares `"numori-ui": "file:../numori-ui"`, a sibling repository
# that lives outside this one. Coolify clones a single repository, so any
# autodetecting builder reaches `npm ci`, cannot resolve `../numori-ui`, and
# fails. This file fetches and builds that package explicitly, which no
# zero-config builder can do for us.
#
# The site is prerendered (`nuxt generate`, ~136 routes), so the runtime image
# contains no Node process at all — just static files behind nginx.
##


# ---------------------------------------------------------------------------
# Stage 1 — build the design system.
#
# numori-ui gitignores its own `dist/`, yet its package.json `main` and
# `exports` point there, so cloning alone is not enough: the build is mandatory.
# ---------------------------------------------------------------------------
# Debian rather than Alpine for the build stages. package-lock.json was resolved
# on macOS, and rollup/esbuild ship their Linux binaries as per-platform optional
# dependencies; glibc is the better-supported target and avoids `npm ci` missing
# a *-linux-x64-musl package. These stages are discarded, so their size is free.
FROM node:22-slim AS ui

RUN apt-get update \
  && apt-get install -y --no-install-recommends git ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Pinned to a commit, not a branch, and that is not fussiness: this repo's
# package-lock.json inlines numori-ui's dependency tree under the `../numori-ui`
# key, so if the checked-out ref declares different dependencies than the lock
# recorded, `npm ci` in stage 2 aborts on the integrity check. A moving branch
# turns that into an intermittent deploy failure.
#
# Bump in step with package-lock.json: update the dependency locally, commit the
# refreshed lockfile, then set this to the matching numori-ui commit. Note the
# default branch there is `master`, not `main`.
ARG NUMORI_UI_REF=b93a63eabb390953e59a303218da836dafeb1056

RUN git clone --filter=blob:none https://github.com/Numori-Ecosystem/Numori-UI.git /numori-ui \
  && git -C /numori-ui checkout --detach "${NUMORI_UI_REF}"

WORKDIR /numori-ui
RUN npm ci
RUN npm run build


# ---------------------------------------------------------------------------
# Stage 2 — generate the site.
#
# Node 22 is not arbitrary: @nuxt/content is configured with
# `experimental.sqliteConnector: 'native'` so that installing never needs to
# compile better-sqlite3, and the built-in node:sqlite module it uses instead
# requires Node >= 22.5 (matching `engines` in package.json).
# ---------------------------------------------------------------------------
FROM node:22-slim AS build

# `file:../numori-ui` is resolved relative to /app, so the package has to sit at
# /app/../numori-ui — that is, /numori-ui.
#
# node_modules is copied along with it, deliberately. numori-ui/dist/nuxt.mjs
# imports @nuxt/kit, and Node resolves that from the file's own location —
# /numori-ui/node_modules — never from /app/node_modules. Copying only the
# published surface (dist, src, package.json) fails `nuxt prepare` with
# "Cannot find module '@nuxt/kit'". Nothing from this stage reaches the runtime
# image, so the extra weight costs nothing at rest.
COPY --from=ui /numori-ui /numori-ui

# HUSKY=0 because `prepare` runs `husky`, and .dockerignore keeps .git out of
# the build context — there is no repository here to install hooks into.
ENV HUSKY=0 \
    NUXT_TELEMETRY_DISABLED=1 \
    CI=true

WORKDIR /app

# The full source is copied before installing, deliberately. The usual
# manifest-first trick does not work here: `postinstall` runs `nuxt prepare`,
# which reads nuxt.config.ts, app/ and content/. The cost is that a source-only
# change reinstalls dependencies; BuildKit's npm cache below absorbs most of it.
COPY . .

RUN --mount=type=cache,target=/root/.npm npm ci

# Canonical URLs, hreflang alternates and the sitemap are all absolute, so the
# public origin has to be correct at build time, not at request time. Override
# in Coolify via a build variable when deploying a preview to another hostname.
ARG NUXT_PUBLIC_SITE_URL=https://numori.app
ENV NUXT_PUBLIC_SITE_URL=${NUXT_PUBLIC_SITE_URL}

# `nitro.prerender.failOnError` is on, so a broken internal link fails the build
# here rather than shipping a 404.
RUN npm run generate


# ---------------------------------------------------------------------------
# Stage 3 — serve.
# ---------------------------------------------------------------------------
FROM nginx:1.29-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.output/public /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1
