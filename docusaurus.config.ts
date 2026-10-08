import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Redocusaurus from 'redocusaurus';
import path from 'path';
import { createRequire } from 'node:module';
import {
  BASE_PATH,
  FOOTER_COPYRIGHT,
  FAVICON,
  GITHUB_ORG_URL,
  SITE_KEYWORDS,
  LINKEDIN_URL,
  NAVBAR_LOGO,
  PRODUCT_NAME,
  SHOW_LINKEDIN,
  SHOW_TRIAL_CTA,
  SITE_TAGLINE,
  SOCIAL_CARD_IMAGE,
  TRIAL_URL,
  getSiteCustomFields,
} from './src/config/distribution';
import { applySitemapPriorities, SITEMAP_IGNORE_PATTERNS } from './scripts/seo/sitemap-utils';
import flavorEnvPlugin from './src/plugins/flavorEnvPlugin';
import flavorYamlMdxPlugin from './src/plugins/flavorYamlMdxPlugin';
import remarkFlavorPlaceholders from './src/remark/remarkFlavorPlaceholders';
import remarkMovedDocLinks from './src/remark/remarkMovedDocLinks';

const require = createRequire(import.meta.url);
const { getLearnMigrationRedirects } = require('./scripts/url-migration-redirects.js');
const { toClientRedirects, createReferenceRedirects } = require('./scripts/reference-moved-redirects.js');

const distribution = (process.env.DOCUSAURUS_DISTRIBUTION as 'datasance' | 'iofog') ?? 'datasance';

const legacyManualRedirects = [
  { from: '/ECN-Viewer/', to: '/get-started/edgeops-console' },
  { from: '/edgeops-console', to: '/get-started/edgeops-console' },
  { from: '/agent-management', to: '/get-started/edgelet-nodes/introduction' },
  { from: '/agent-management/introduction', to: '/get-started/edgelet-nodes/introduction' },
  {
    from: '/agent-management/agent-configuration',
    to: '/get-started/edgelet-nodes/configuration-updates',
  },
  { from: '/agent-management/attach-detach', to: '/get-started/edgelet-nodes/attach-detach' },
  {
    from: '/agent-management/docker-image-pruning',
    to: '/get-started/edgelet-nodes/image-pruning',
  },
  {
    from: '/agent-management/edge-resources',
    to: '/v3.7.3/agent-management/edge-resources',
  },
  {
    from: '/agent-management/upgrade-rollback',
    to: '/get-started/edgelet-nodes/upgrade-rollback',
  },
  { from: '/agent-management/volumes', to: '/get-started/edgelet-nodes/volume-distribution' },
  { from: '/reference-agent', to: '/learn/edgelet' },
  { from: '/reference-agent/overview', to: '/learn/edgelet' },
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
] as const;

const v39SectionRedirects = [
  { from: '/getting-started/welcome', to: '/get-started/welcome' },
  { from: '/getting-started/core-concepts', to: '/get-started/core-concepts' },
  { from: '/getting-started/architecture', to: '/get-started/architecture' },
  { from: '/getting-started/quick-start-local', to: '/get-started/quick-start-local' },
  { from: '/potctl/introduction', to: '/get-started/cli/introduction' },
  { from: '/potctl/download', to: '/get-started/cli/download' },
  { from: '/potctl/getting-familiar', to: '/get-started/cli/getting-familiar' },
  { from: '/potctl/resource-management', to: '/get-started/cli/resource-management' },
  { from: '/potctl/connect-disconnect', to: '/get-started/cli/connect-disconnect' },
  { from: '/platform-deployment', to: '/get-started/deploy' },
  { from: '/platform-deployment/introduction', to: '/get-started/deploy/introduction' },
  { from: '/platform-deployment/embedded-oidc', to: '/get-started/deploy/embedded-oidc' },
  { from: '/platform-deployment/external-oidc', to: '/get-started/deploy/external-oidc' },
  {
    from: '/platform-deployment/external-oidc-providers',
    to: '/get-started/deploy/external-oidc-providers',
  },
  { from: '/platform-deployment/prepare-your-network', to: '/get-started/deploy/prepare-your-network' },
  {
    from: '/platform-deployment/prepare-your-remote-hosts',
    to: '/get-started/deploy/prepare-your-remote-hosts',
  },
  { from: '/platform-deployment/remote-control-plane', to: '/get-started/deploy/remote-control-plane' },
  {
    from: '/platform-deployment/kubernetes-prepare-cluster',
    to: '/get-started/deploy/kubernetes-prepare-cluster',
  },
  { from: '/platform-deployment/database', to: '/get-started/deploy/database' },
  { from: '/platform-deployment/kubernetes-potctl', to: '/get-started/deploy/kubernetes-cli' },
  { from: '/platform-deployment/kubernetes-helm', to: '/get-started/deploy/kubernetes-helm' },
  { from: '/platform-deployment/setup-your-agents', to: '/get-started/deploy/setup-edgelet-nodes' },
  { from: '/platform-deployment/airgap-deployment', to: '/get-started/deploy/airgap-deployment' },
  { from: '/edgelet-management/introduction', to: '/get-started/edgelet-nodes/introduction' },
  {
    from: '/edgelet-management/configuration-updates',
    to: '/get-started/edgelet-nodes/configuration-updates',
  },
  { from: '/edgelet-management/edgeguard', to: '/get-started/edgelet-nodes/edgeguard' },
  { from: '/edgelet-management/attach-detach', to: '/get-started/edgelet-nodes/attach-detach' },
  {
    from: '/edgelet-management/volume-distribution',
    to: '/get-started/edgelet-nodes/volume-distribution',
  },
  { from: '/edgelet-management/image-pruning', to: '/get-started/edgelet-nodes/image-pruning' },
  { from: '/edgelet-management/upgrade-rollback', to: '/get-started/edgelet-nodes/upgrade-rollback' },
  { from: '/edgelet-management/reconcile', to: '/get-started/edgelet-nodes/reconcile' },
  { from: '/edgelet-management/debugging', to: '/get-started/edgelet-nodes/debugging' },
  { from: '/applications', to: '/get-started/workloads' },
  { from: '/applications/introduction', to: '/get-started/workloads' },
  { from: '/applications/application-templates', to: '/get-started/workloads/templates' },
  {
    from: '/applications/microservice-lifecycle-management',
    to: '/get-started/workloads/applications',
  },
  { from: '/applications/microservice-logs', to: '/get-started/workloads/applications' },
  { from: '/applications/microservice-move-rename', to: '/get-started/workloads/applications' },
  {
    from: '/applications/microservice-registry-catalog',
    to: '/get-started/workloads/registries',
  },
  { from: '/edgeops-console/introduction', to: '/get-started/edgeops-console' },
  { from: '/edgeops-console/features', to: '/get-started/edgeops-console' },
  { from: '/edgeops-console/configuration', to: '/get-started/edgeops-console/hosting' },
  { from: '/home/whats-new', to: '/release-notes/whats-new' },
  { from: '/upgrading-to-v3-9', to: '/release-notes/upgrading-to-v3-9' },
  { from: '/migrating-to-v3-8', to: '/release-notes/migrating-to-v3-8' },
  { from: '/learn/platform/control-plane', to: '/learn/control-plane' },
  { from: '/learn/platform/control-plane-kubernetes-guide', to: '/learn/control-plane/kubernetes' },
  { from: '/learn/platform/control-plane-kubernetes-schema', to: '/reference/yaml/kubernetes-control-plane' },
  { from: '/learn/platform/control-plane-crd', to: '/learn/control-plane/kubernetes-crd' },
  { from: '/learn/platform/control-plane-remote-guide', to: '/learn/control-plane/remote' },
  { from: '/learn/platform/control-plane-remote-schema', to: '/reference/yaml/remote-control-plane' },
  { from: '/learn/platform/control-plane-remote-ha', to: '/learn/control-plane/remote-ha' },
  {
    from: '/learn/platform/control-plane-controller-add-on',
    to: '/learn/control-plane/controller-add-on',
  },
  { from: '/learn/platform/control-plane-local-guide', to: '/learn/control-plane/local' },
  { from: '/learn/platform/control-plane-local-schema', to: '/reference/yaml/local-control-plane' },
  { from: '/learn/operate/control-plane', to: '/learn/control-plane' },
  { from: '/learn/nodes/edgelet-nodes', to: '/learn/edgelet-nodes' },
  { from: '/learn/operate/nodes', to: '/learn/edgelet-nodes' },
  { from: '/edgelet/introduction', to: '/learn/edgelet' },
  { from: '/edgelet/architecture', to: '/learn/edgelet/architecture' },
  { from: '/edgelet/installation', to: '/learn/edgelet/installation' },
  { from: '/edgelet/deployment', to: '/learn/edgelet/deployment' },
  { from: '/edgelet/configuration', to: '/learn/edgelet/configuration' },
  { from: '/edgelet/configuration-reference', to: '/learn/edgelet/configuration' },
  { from: '/edgelet/troubleshooting', to: '/learn/edgelet/troubleshooting' },
  { from: '/edgelet/deploy-manifests', to: '/learn/edgelet/manifests' },
  { from: '/edgelet/container-engines', to: '/learn/edgelet/container-engines' },
  { from: '/edgelet/wasm-runtime', to: '/learn/edgelet/container-engines' },
  { from: '/edgelet/dns', to: '/learn/edgelet/dns' },
  { from: '/edgelet/volumes', to: '/learn/edgelet/volumes' },
  { from: '/edgelet/workload-continuity', to: '/learn/edgelet/workload-continuity' },
  { from: '/edgelet/control-plane', to: '/learn/edgelet/control-plane' },
  { from: '/edgelet/control-plane-microservice', to: '/learn/edgelet/control-plane' },
  { from: '/edgelet/exec-sessions', to: '/learn/edgelet/exec-sessions' },
  { from: '/edgelet/persistence', to: '/learn/edgelet/persistence' },
  { from: '/edgelet/logging', to: '/learn/edgelet/logging' },
  { from: '/edgelet/edgelet-api', to: '/learn/edgelet/api' },
  { from: '/learn/workloads/overview', to: '/learn/workloads' },
  { from: '/learn/operate/workloads', to: '/learn/workloads' },
  { from: '/learn/config/application-templates', to: '/learn/workloads/application-templates' },
  { from: '/learn/config/microservice-templates', to: '/learn/workloads/microservice-templates' },
  { from: '/learn/operate/config', to: '/learn/config' },
  { from: '/learn/operate/network', to: '/learn/network' },
  { from: '/learn/message-bus/overview', to: '/learn/message-bus' },
  { from: '/learn/operate/message-bus', to: '/learn/message-bus' },
  { from: '/learn/access-control/nats-account-rules', to: '/learn/message-bus/account-rules' },
  { from: '/learn/access-control/nats-user-rules', to: '/learn/message-bus/user-rules' },
  { from: '/learn/operate/access-control', to: '/learn/access-control' },
  { from: '/platform-components', to: '/learn/platform-components' },
  { from: '/platform-components/operator', to: '/learn/platform-components/operator' },
  { from: '/platform-components/router', to: '/learn/platform-components/router' },
  { from: '/platform-components/nats-server', to: '/learn/platform-components/nats-server' },
  { from: '/platform-components/sdk', to: '/learn/platform-components/sdk' },
  { from: '/platform-components/sdk/client', to: '/learn/platform-components/sdk/client' },
  { from: '/platform-components/sdk/microservices', to: '/learn/platform-components/sdk/microservices' },
  { from: '/platform-components/sdk/apps', to: '/learn/platform-components/sdk/apps' },
] as const;

const tutorialRedirects = [
  { from: '/tutorials/acme-smart-plant/runbook', to: '/tutorials/acme-smart-plant' },
  { from: '/tutorials/acme-smart-plant/step-01-nats-user-rules', to: '/tutorials/acme-smart-plant/plant-user-rules' },
  { from: '/tutorials/acme-smart-plant/step-02-nats-account-export', to: '/tutorials/acme-smart-plant/account-export' },
  {
    from: '/tutorials/acme-smart-plant/step-03-application-production-monitoring',
    to: '/tutorials/acme-smart-plant/production-monitoring',
  },
  { from: '/tutorials/acme-smart-plant/step-04-copy-account-key', to: '/tutorials/acme-smart-plant/account-public-key' },
  { from: '/tutorials/acme-smart-plant/step-05-nats-account-import', to: '/tutorials/acme-smart-plant/account-import' },
  { from: '/tutorials/acme-smart-plant/step-06-service-diagnostic', to: '/tutorials/acme-smart-plant/diagnostic-service' },
  {
    from: '/tutorials/acme-smart-plant/step-07-note-bridge-port',
    to: '/tutorials/acme-smart-plant/diagnostic-bridge-port',
  },
  {
    from: '/tutorials/acme-smart-plant/step-08-application-operations-center',
    to: '/tutorials/acme-smart-plant/operations-center',
  },
  {
    from: '/tutorials/acme-smart-plant/step-09-service-alert-dashboard',
    to: '/tutorials/acme-smart-plant/alert-dashboard-service',
  },
  {
    from: '/tutorials/acme-smart-plant/step-11-nats-user-rules-vision',
    to: '/tutorials/edge-ai-wafer-defect/vision-user-rules',
  },
  {
    from: '/tutorials/acme-smart-plant/step-12-nats-account-vision',
    to: '/tutorials/edge-ai-wafer-defect/vision-account',
  },
  {
    from: '/tutorials/acme-smart-plant/step-13-application-vision-inspection',
    to: '/tutorials/edge-ai-wafer-defect/vision-inspection',
  },
  { from: '/tutorials/acme-smart-plant/step-14-service-snapshot', to: '/tutorials/edge-ai-wafer-defect/snapshot-service' },
  { from: '/tutorials/acme-smart-plant/step-15-snapshot-verify', to: '/tutorials/acme-smart-plant/fab-gallery-link' },
  { from: '/tutorials/edge-ai-wafer-defect/step-01-oci-registry', to: '/tutorials/edge-ai-wafer-defect/oci-registry' },
  {
    from: '/tutorials/edge-ai-wafer-defect/step-02-fleet-model-wafer-defect',
    to: '/tutorials/edge-ai-wafer-defect/wafer-defect-model',
  },
  {
    from: '/tutorials/edge-ai-wafer-defect/step-03-attach-model-edge-c',
    to: '/tutorials/edge-ai-wafer-defect/vision-inspection',
  },
  {
    from: '/tutorials/edge-ai-wafer-defect/step-04-vision-models-bind',
    to: '/tutorials/edge-ai-wafer-defect/vision-inspection',
  },
] as const;

const learnMigrationRedirects = getLearnMigrationRedirects({ distribution });
const learnMigrationFrom = new Set(learnMigrationRedirects.map((entry) => entry.from));
const referenceMovedRedirects = toClientRedirects().filter((entry) => !learnMigrationFrom.has(entry.from));

const config: Config = {
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  title: `${PRODUCT_NAME} Documentation`,
  tagline: SITE_TAGLINE,
  favicon: FAVICON,
  customFields: getSiteCustomFields(),

  // Set the production url of your site here
  url: 'https://docs.datasance.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: BASE_PATH,

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
    flavorEnvPlugin,
    flavorYamlMdxPlugin,
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
          ...legacyManualRedirects,
          ...v39SectionRedirects,
          ...tutorialRedirects,
          ...learnMigrationRedirects,
          ...referenceMovedRedirects,
        ],
        createRedirects(existingPath) {
          return createReferenceRedirects(existingPath);
        },
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
          beforeDefaultRemarkPlugins: [remarkMovedDocLinks],
          remarkPlugins: [remarkFlavorPlaceholders],
          lastVersion: 'current',
          versions: {
            current: {
              label: 'v3.9.0',
            },
            'v3.8.0': {
              label: 'v3.8.0',
            },
          },
          exclude: [
            '**/reference/cli/*/md/**',
            '**/potctl/md/**',
            '**/iofogctl/md/**',
            ...(distribution === 'datasance'
              ? ['**/reference/cli/iofogctl/**', '**/iofogctl/cli/**']
              : ['**/reference/cli/potctl/**', '**/potctl/cli/**']),
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
          {
            spec: 'openapi/controller-api.yaml',
            route: '/api/v3.9.0/controller',
          },
          {
            spec: 'openapi/controller-api.yaml',
            route: '/api/controller',
          },
          {
            spec: 'openapi/controller-api-v3.8.0.yaml',
            route: '/api/v3.8.0/controller',
          },
          {
            spec: 'openapi/edgelet-api.yaml',
            route: '/api/v1.1.0/edgelet',
          },
          {
            spec: 'openapi/edgelet-api.yaml',
            route: '/api/edgelet',
          },
          {
            spec: 'openapi/edgelet-api-v1.0.0.yaml',
            route: '/api/v1.0.0/edgelet',
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
    image: SOCIAL_CARD_IMAGE,
    // SEO Metadata
    metadata: [
      {name: 'keywords', content: SITE_KEYWORDS},
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
        src: NAVBAR_LOGO.src,
        srcDark: NAVBAR_LOGO.srcDark,
        href: BASE_PATH,
        width: 120,
        height: 32,
      },
      items: [
        {
          type: 'custom-docSidebar',
          sidebarId: 'getStartedSidebar',
          position: 'left',
          label: 'Get Started',
          href: '/get-started/welcome',
        },
        {
          type: 'custom-docSidebar',
          sidebarId: 'learnSidebar',
          position: 'left',
          label: 'Learn',
          href: '/learn',
        },
        {
          type: 'custom-docSidebar',
          sidebarId: 'tutorialsSidebar',
          position: 'left',
          label: 'Tutorials',
          href: '/tutorials',
        },
        {
          type: 'custom-docSidebar',
          sidebarId: 'referenceSidebar',
          position: 'left',
          label: 'Reference',
          href: '/reference',
        },
        {
          type: 'custom-docSidebar',
          sidebarId: 'releaseNotesSidebar',
          position: 'left',
          label: 'Release Notes',
          href: '/release-notes',
        },
        {
          type: 'custom-apiDropdown',
          position: 'left',
          label: 'API',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          versions: ['current', 'v3.8.0'],
        },
        {
          href: GITHUB_ORG_URL,
          label: 'GitHub',
          position: 'right',
        },
        ...(SHOW_LINKEDIN
          ? [
              {
                href: LINKEDIN_URL,
                label: 'LinkedIn',
                position: 'right' as const,
              },
            ]
          : []),
        ...(SHOW_TRIAL_CTA
          ? [
              {
                href: TRIAL_URL,
                label: 'Trial Request',
                position: 'right' as const,
                class: 'button button--primary button--small',
              },
            ]
          : []),
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Get Started', to: '/get-started/welcome' },
            { label: 'Learn', to: '/learn' },
            { label: 'Tutorials', to: '/tutorials' },
            { label: 'Reference', to: '/reference' },
            { label: 'Release Notes', to: '/release-notes' },
            { label: 'Controller API', to: '/api/v3.9.0/controller' },
            { label: 'Edgelet API', to: '/api/v1.1.0/edgelet' },
          ],
        },
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
              href: GITHUB_ORG_URL,
            },
            ...(SHOW_LINKEDIN
              ? [
                  {
                    label: 'LinkedIn',
                    href: LINKEDIN_URL,
                  },
                ]
              : []),
            ...(SHOW_TRIAL_CTA
              ? [
                  {
                    label: 'Trial request',
                    href: TRIAL_URL,
                  },
                ]
              : []),
          ],
        },
      ],
      copyright: FOOTER_COPYRIGHT,
    },
    prism: {
      additionalLanguages: ['yaml'],
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
