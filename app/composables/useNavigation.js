/**
 * The site's navigation model, shared by the header and the footer so the two
 * cannot drift apart.
 */
export const useNavigation = () => {
  const { t } = useI18n()
  const localePath = useLocalePath()
  const route = useRoute()
  const { public: runtime } = useRuntimeConfig()

  /** Raw definitions: path plus the translation key for the label. */
  const items = [
    { key: 'products', path: '/products' },
    { key: 'pricing', path: '/pricing' },
    { key: 'blog', path: '/blog' },
    { key: 'about', path: '/about' },
    { key: 'openSource', path: '/open-source' },
  ]

  /**
   * Donate is deliberately not in `primary`.
   *
   * It is an action, not a section of the site, so the header renders it as an
   * accent-styled button rather than a sixth identical link — which is both more
   * prominent and keeps the navigation list to the five content pages. Nine of the
   * thirteen apps need no account and none needs payment, so for most people this
   * is the only way to contribute anything.
   */
  const donate = computed(() => ({
    key: 'donate',
    label: t('nav.donate'),
    to: localePath('/donate'),
    current: isCurrent('/donate'),
  }))

  /**
   * Marks an item as current when the route is the item's page *or* anything
   * below it, so `/products/notes` still highlights "Products". NuxtLink's own
   * `aria-current` only fires on an exact match, which would leave every detail
   * page with no highlighted section.
   */
  const isCurrent = (path) => {
    const target = localePath(path)
    return route.path === target || route.path.startsWith(`${target}/`)
  }

  const primary = computed(() =>
    items.map((item) => ({
      key: item.key,
      label: t(`nav.${item.key}`),
      to: localePath(item.path),
      current: isCurrent(item.path),
    })),
  )

  /** Footer link groups. Mirrors the primary nav plus legal and external links. */
  const footer = computed(() => [
    {
      key: 'products',
      title: t('footer.products'),
      links: [
        { label: t('nav.products'), to: localePath('/products') },
        { label: t('nav.pricing'), to: localePath('/pricing') },
      ],
    },
    {
      key: 'company',
      title: t('footer.company'),
      links: [
        { label: t('nav.about'), to: localePath('/about') },
        { label: t('nav.blog'), to: localePath('/blog') },
        { label: t('nav.openSource'), to: localePath('/open-source') },
        { label: t('nav.donate'), to: localePath('/donate') },
      ],
    },
    {
      key: 'ecosystem',
      title: t('footer.ecosystem'),
      links: [
        { label: t('common.viewOnGithub'), href: runtime.githubOrg },
        { label: t('footer.status'), href: runtime.statusUrl },
      ],
    },
    {
      key: 'legal',
      title: t('footer.legal'),
      links: [
        { label: t('legal.privacy.title'), to: localePath('/legal/privacy') },
        { label: t('legal.terms.title'), to: localePath('/legal/terms') },
        { label: t('legal.imprint.title'), to: localePath('/legal/imprint') },
      ],
    },
  ])

  return { primary, donate, footer, isCurrent }
}
