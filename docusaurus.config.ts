import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Redocusaurus from 'redocusaurus';
import path from 'path';

const config: Config = {
  title: 'Datasance Documentation',
  tagline: 'Datasance Documentation',
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
              label: 'v1.3.6',
              // path: 'v1.3.6',
            },
          },

        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
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
            spec: 'openapi/datasance-api.yaml',
            route: '/api/',
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
        alt: 'Datasance',
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
          label: 'API',
          position: 'left',
          items: [
            {
              label: 'Datasance PoT Controller REST-API v3.4.9',
              to: '/api',
            }
          ]
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
