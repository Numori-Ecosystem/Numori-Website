<template>
  <div>
    <PageHeader
      wash
      :title="$t('ui.index.title')"
      :subtitle="$t('ui.index.subtitle', { count: total })"
    >
      <template #breadcrumb>
        <BreadcrumbTrail
          :items="[
            { label: $t('nav.products'), to: localePath('/products') },
            { label: 'Numori UI', to: overviewPath },
            { label: $t('ui.index.title') },
          ]"
        />
      </template>
    </PageHeader>

    <UiDocsShell>
      <UiComponentGallery :groups="componentGroups" />
    </UiDocsShell>
  </div>
</template>

<script setup>
/**
 * The flat components index: every component in the catalogue, grouped by
 * category, each a link to its reference page. Shares the gallery with the
 * manual overview so the two never disagree on what ships.
 */
import { uiComponents } from '~/data/ui-components'

definePageMeta({ pageTransition: false, layoutTransition: false })

const localePath = useLocalePath()
const { t } = useI18n()
const { overviewPath, componentGroups } = useUiDocs()

const total = uiComponents.length

usePageSeo({
  title: t('ui.meta.indexTitle'),
  description: t('ui.meta.indexDescription'),
})
</script>
