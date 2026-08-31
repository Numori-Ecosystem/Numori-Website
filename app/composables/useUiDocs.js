import { UI_REPO, uiComponentsByCategory, uiComponentNeighbours } from '~/data/ui-components'
import { GITHUB_ORG } from '~/data/products'

/**
 * Navigation model for the Numori UI manual, shared by the sidebar, the
 * overview gallery and the component pages so they cannot describe different
 * structures.
 *
 * Component facts come from `app/data/ui-components.js` (language-independent);
 * only the section chrome is translated, via the `ui.*` locale keys. This
 * mirrors how `useProducts` joins `products.js` to the locale files.
 */
export const useUiDocs = () => {
  const { t } = useI18n()
  const localePath = useLocalePath()

  /** The manual's landing page — getting started plus the gallery. */
  const overviewPath = computed(() => localePath('/products/ui'))

  /** The flat components index. */
  const indexPath = computed(() => localePath('/products/ui/components'))

  /** Route for a single component's reference page. */
  const componentPath = (slug) => localePath(`/products/ui/components/${slug}`)

  /** Source repository for the library. */
  const repoUrl = `${GITHUB_ORG}/${UI_REPO}`

  /**
   * Getting-started entries. The sub-sections point at anchors on the overview
   * page, so they work as in-page jumps there and as cross-page links from a
   * component page.
   */
  const gettingStarted = computed(() => [
    { key: 'overview', label: t('ui.nav.overview'), to: overviewPath.value, exact: true },
    { key: 'install', label: t('ui.nav.install'), to: `${overviewPath.value}#install` },
    { key: 'styling', label: t('ui.nav.styling'), to: `${overviewPath.value}#styling` },
    { key: 'icons', label: t('ui.nav.icons'), to: `${overviewPath.value}#icons` },
    {
      key: 'treeShaking',
      label: t('ui.nav.treeShaking'),
      to: `${overviewPath.value}#tree-shaking`,
    },
  ])

  /**
   * Components grouped by category, each decorated with its route. Category
   * titles come from the catalogue (short, technical, shared with the README),
   * so they are intentionally not translated.
   */
  const componentGroups = computed(() =>
    uiComponentsByCategory().map((group) => ({
      key: group.key,
      title: group.title,
      description: group.description,
      components: group.components.map((component) => ({
        slug: component.slug,
        base: component.base,
        name: component.name,
        icon: component.icon,
        summary: component.summary,
        to: componentPath(component.slug),
      })),
    })),
  )

  /** Previous/next component for footer navigation on a component page. */
  const neighbours = (slug) => {
    const { prev, next } = uiComponentNeighbours(slug)
    const decorate = (component) =>
      component ? { ...component, to: componentPath(component.slug) } : null
    return { prev: decorate(prev), next: decorate(next) }
  }

  return {
    overviewPath,
    indexPath,
    componentPath,
    repoUrl,
    gettingStarted,
    componentGroups,
    neighbours,
  }
}
