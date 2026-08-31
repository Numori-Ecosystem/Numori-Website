# syntax=docker/dockerfile:1

##
# numori-website — fully prerendered static site, served by nginx.
#
# numori-ui is consumed from the npm registry (package.json declares
# "numori-ui": "^0.2.0"), so the build is a plain `npm ci` + `nuxt generate`
# with no sibling repository to vendor. A hand-written Dockerfile is kept rather
# than a zero-config buildpack for two reasons that survive that change:
# @nuxt/content is configured to use Node's built-in node:sqlite (Node >= 22.5)
# so installing never compiles better-sqlite3, and the prerendered output is
# served by nginx with no Node process at runtime.
#
# The site is prerendered (`nuxt generate`), so the runtime image contains no
# Node process at all — just static files behind nginx.
##


# ---------------------------------------------------------------------------
# Stage 1 — generate the site.
#
# Debian rather than Alpine: package-lock.json was resolved on macOS, and
# rollup/esbuild ship their Linux binaries as per-platform optional
# dependencies; glibc is the better-supported target and avoids `npm ci` missing
# a *-linux-x64-musl package. This stage is discarded, so its size is free.
#
# Node 22 is not arbitrary: @nuxt/content is configured with
# `experimental.sqliteConnector: 'native'` so that installing never needs to
# compile better-sqlite3, and the built-in node:sqlite module it uses instead
# requires Node >= 22.5 (matching `engines` in package.json).
# ---------------------------------------------------------------------------
FROM node:22-slim AS build

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
# Stage 2 — serve.
# ---------------------------------------------------------------------------
FROM nginx:1.29-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.output/public /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1
