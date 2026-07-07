import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Redocusaurus from 'redocusaurus';
import path from 'path';
import { FLAVOR, PRODUCT_NAME } from './src/config/distribution';
import { applySitemapPriorities, SITEMAP_IGNORE_PATTERNS } from './scripts/seo/sitemap-utils';

const config: Config = {
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  title: `${PRODUCT_NAME} Documentation`,
  tagline: 'Securely deploy, manage, and scale containerized workloads across thousands of heterogeneous far-edge and IoT environments.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.datasance.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Datasance', // Usually your GitHub org/user name.
  projectName: 'docs.datasance.com', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-KGPCD08K90',
        anonymizeIP: false,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          { from: '/ECN-Viewer/', to: '/edgeops-console/introduction' },
          { from: '/edgeops-console', to: '/edgeops-console/introduction' },
          { from: '/agent-management', to: '/edgelet-management/introduction' },
          { from: '/agent-management/introduction', to: '/edgelet-management/introduction' },
          {
            from: '/agent-management/agent-configuration',
            to: '/edgelet-management/configuration-updates',
          },
          { from: '/agent-management/attach-detach', to: '/edgelet-management/attach-detach' },
          {
            from: '/agent-management/docker-image-pruning',
            to: '/edgelet-management/image-pruning',
          },
          {
            from: '/agent-management/edge-resources',
            to: '/v3.7.3/agent-management/edge-resources',
          },
          {
            from: '/agent-management/upgrade-rollback',
            to: '/edgelet-management/upgrade-rollback',
          },
          { from: '/agent-management/volumes', to: '/edgelet-management/volume-distribution' },
          { from: '/reference-agent', to: '/edgelet/introduction' },
          { from: '/reference-agent/overview', to: '/edgelet/introduction' },
          { from: '/reference-agent/cli-usage', to: '/v3.7.3/reference-agent/cli-usage' },
          {
            from: '/reference-agent/configuration',
            to: '/v3.7.3/reference-agent/configuration',
          },
          { from: '/reference-agent/local-api', to: '/v3.7.3/reference-agent/local-api' },
          { from: '/reference-agent/agent-logs', to: '/v3.7.3/reference-agent/agent-logs' },
          {
            from: '/platform-deployment/prepare-realm',
            to: '/v3.7.3/platform-deployment/prepare-realm',
          },
          {
            from: '/platform-deployment/keycloak-deployment',
            to: '/v3.7.3/platform-deployment/keycloak-deployment',
          },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          lastVersion: 'current',
          versions: {
            current: {
              label: 'v3.8.0',
            },
          },
          exclude: [
            '**/potctl/md/**',
            '**/iofogctl/md/**',
            ...(FLAVOR === 'iofog' ? ['**/potctl/cli/**'] : ['**/iofogctl/cli/**']),
          ],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: null,
          priority: null,
          ignorePatterns: SITEMAP_IGNORE_PATTERNS,
          filename: 'sitemap.xml',
          createSitemapItems: async ({ siteConfig, routes, defaultCreateSitemapItems }) => {
            const items = await defaultCreateSitemapItems({ siteConfig, routes });
            return applySitemapPriorities(items, siteConfig.url);
          },
        },
      } satisfies Preset.Options,
    ],
    // Redocusaurus config
    [
      'redocusaurus',
      {
        config: path.join(__dirname, 'redocly.yaml'),
        openapi: {
          path: 'openapi',
          routeBasePath: '/api',
        },
        // Plugin Options for loading OpenAPI files
        specs: [
          // Pass it a path to a local OpenAPI YAML file
          {
            // Redocusaurus will automatically bundle your spec into a single file during the build
            spec: 'openapi/controller-api.yaml',
            route: '/api/controller',
          },
          {
            spec: 'openapi/edgelet-api.yaml',
            route: '/api/edgelet',
          },
        ],
        // Theme Options for modifying how redoc renders them
        theme: {
          // Change with your site colors
          primaryColor: '#1890ff',
        },
      },
    ] satisfies Redocusaurus.PresetEntry,
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/datasance-logo.png',
    // SEO Metadata
    metadata: [
      {name: 'keywords', content: 'edge computing, edgeops, distributed edge computing, datasance pot, pot, fog computing, kubernetes edge, iofog, iot platform, edge orchestration'},
      {name: 'description', content: 'Datasance PoT is an Enterprise Open Source Fog and Distributed Edge Computing Platform. Learn how to deploy, manage, and scale your edge applications.'},
      {name: 'og:title', content: 'Datasance PoT Documentation'},
      {name: 'og:description', content: 'Comprehensive documentation for Datasance PoT - The Enterprise Edge Computing Platform.'},
      {name: 'og:type', content: 'website'},
    ],
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: 'TELSEYYP4A',

      // Public API key: it is safe to commit it
      apiKey: 'defb41f96bd809c802a7f3533eeb91ef',

      indexName: 'datasance',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: '//', // or as RegExp: /\/docs\//
        to: '/',
      },

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,

      //... other Algolia params
    },
    navbar: {
      title: '',
      logo: {
        alt: PRODUCT_NAME,
        src: 'img/logo.svg',
        srcDark: 'img/logo-white.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documents',
        },
        {
          type: 'doc',
          docId: 'tutorials/acme-smart-plant/overview',
          label: 'Tutorials',
          position: 'left',
        },
        {
          label: 'API',
          position: 'left',
          items: [
            {
              label: 'Controller API (v3.8.0)',
              to: '/api/controller',
            },
            {
              label: 'Edgelet API (v1.0.0)',
              to: '/api/edgelet',
            },
          ],
        },
        {
          type: "docsVersionDropdown",
          position: 'right',
        },
        {
          href: 'https://github.com/Datasance',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/company/datasance',
          label: 'LinkedIn',
          position: 'right',
        },
        {
          href: 'https://www.datasance.com/trial',
          label: 'Trial Request',
          position: 'right',
          class: 'button button--primary button--small'
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Eclipse ioFog Community',
              href: 'https://iofog.org/community.html/',
            },
            {
              label: 'Visit the ioFog Discussion Forum',
              href: 'https://discuss.iofog.org/',
            },
            {
              label: 'Eclipse ioFog Slack',
              href: 'https://iofog.slack.com/join/shared_invite/enQtNTQxMDczNjE0Mjc5LTRhMTE2YjgwNmRhOTg5ZmI3MGQ5OGM0N2E1MDg0OTJmMWYxZTgxZjE2MjA3NzY2MTFlZmEyYzc3OGQ5NmM4ZjI',
            },
          ],
        },
        {
          title: 'Documentation',
          items: [
            {
              label: 'EdgeOps Console',
              to: '/edgeops-console/introduction',
            },
            {
              label: 'Acme Smart Plant Tutorial',
              to: '/tutorials/acme-smart-plant',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Datasance',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/datasance',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://www.datasance.com">Datasance</a> Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
