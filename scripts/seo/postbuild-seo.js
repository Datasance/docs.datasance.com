#!/usr/bin/env node
/**
 * Post-build SEO: split sitemap (current vs legacy), generate llms.txt and llms-full.txt.
 */

const fs = require('fs');
const path = require('path');
const {
  SITE_URL,
  CLI_NAME,
  PRODUCT_NAME,
  docLink,
  loadDocContent,
} = require('./doc-utils');
const { LLMS_FULL_DOC_IDS } = require('./llms-config');
const {
  isLegacyDocPath,
  isUtilityPath,
  parseSitemapXml,
  sitemapItemsToXml,
  sitemapIndexXml,
  sitemapPriorityForUrl,
} = require('./sitemap-utils');

const BUILD_DIR = path.join(__dirname, '..', '..', 'build');
const SITEMAP_PATH = path.join(BUILD_DIR, 'sitemap.xml');

/** @returns {Array<{ heading: string, entries: Array<{ docId: string, title?: string, note?: string, url?: string }> }>} */
function getLlmsSections() {
  const cli = CLI_NAME;
  return [
    {
      heading: 'Home and getting started',
      entries: [
        { docId: 'home/welcome', title: 'Welcome' },
        { docId: 'home/whats-new', title: "What's New" },
        { docId: 'home/migrating-to-v3-8', title: 'Migrating to v3.8.0' },
        { docId: 'getting-started/core-concepts', title: 'Core Concepts' },
        { docId: 'getting-started/architecture', title: 'Architecture' },
        {
          docId: 'getting-started/quick-start-local',
          title: 'Quick Start With Local Deployment',
        },
      ],
    },
    {
      heading: 'Platform deployment',
      entries: [
        { docId: 'platform-deployment/introduction' },
        { docId: 'platform-deployment/embedded-oidc', title: 'Embedded OIDC Authentication' },
        { docId: 'platform-deployment/external-oidc', title: 'External OIDC Authentication' },
        { docId: 'platform-deployment/setup-your-agents', title: 'Setup Edgelet Nodes' },
        { docId: 'platform-deployment/airgap-deployment', title: 'Airgap Deployment' },
      ],
    },
    {
      heading: 'Edgelet node management',
      entries: [
        { docId: 'edgelet-management/introduction' },
        { docId: 'edgelet-management/configuration-updates' },
        { docId: 'edgelet-management/attach-detach' },
        { docId: 'edgelet-management/upgrade-rollback' },
      ],
    },
    {
      heading: 'Edgelet',
      entries: [
        { docId: 'edgelet/introduction' },
        { docId: 'edgelet/installation' },
        { docId: 'edgelet/configuration' },
        { docId: 'edgelet/troubleshooting' },
        { docId: 'edgelet/cli/index', title: 'Edgelet CLI Reference' },
      ],
    },
    {
      heading: 'EdgeOps Console',
      entries: [
        { docId: 'edgeops-console/introduction' },
        { docId: 'edgeops-console/features' },
        { docId: 'edgeops-console/configuration' },
      ],
    },
    {
      heading: 'Controller',
      entries: [
        { docId: 'reference-controller/overview' },
        { docId: 'reference-controller/configuration' },
        { docId: 'reference-controller/rest-api' },
      ],
    },
    {
      heading: 'YAML references',
      entries: [
        { docId: 'yaml-references/reference-kinds', title: 'YAML Kinds' },
        { docId: 'yaml-references/reference-control-plane' },
        { docId: 'yaml-references/reference-agent', title: 'Agent (Edgelet node)' },
        { docId: 'yaml-references/reference-application' },
        { docId: 'yaml-references/reference-nats-account-rule' },
        { docId: 'yaml-references/reference-nats-user-rule' },
      ],
    },
    {
      heading: 'Platform components',
      entries: [
        { docId: 'platform-components/README', title: 'Platform Components' },
        { docId: 'platform-components/operator' },
        { docId: 'platform-components/router' },
        { docId: 'platform-components/nats-server' },
        { docId: 'platform-components/sdk/overview', title: 'ioFog Go SDK' },
      ],
    },
    {
      heading: 'Applications',
      entries: [
        { docId: 'applications/introduction' },
        { docId: 'applications/application-templates' },
        { docId: 'applications/microservice-lifecycle-management' },
      ],
    },
    {
      heading: 'Security',
      entries: [
        { docId: 'security/introduction', title: 'Securing Cluster' },
        { docId: 'security/roles' },
        { docId: 'security/nats-user-rule' },
        { docId: 'security/nats-jwt-authentication' },
      ],
    },
    {
      heading: 'Tutorials',
      entries: [
        { docId: 'tutorials/acme-smart-plant/overview', title: 'Acme Smart Plant' },
        { docId: 'tutorials/acme-smart-plant/runbook', title: 'Acme Smart Plant Runbook' },
      ],
    },
    {
      heading: 'CLI and microservices',
      entries: [
        { docId: `${cli}/introduction` },
        { docId: `${cli}/download` },
        { docId: `${cli}/cli/${cli}`, title: `${cli} CLI Reference` },
        { docId: 'developing-microservices/overview' },
      ],
    },
    {
      heading: 'API',
      entries: [
        {
          docId: '__url__',
          title: 'Controller REST API (OpenAPI)',
          note: 'Interactive Controller API docs (v3.8.0).',
          url: `${SITE_URL}/api/controller`,
        },
        {
          docId: '__url__',
          title: 'Edgelet API (OpenAPI)',
          note: 'Interactive Edgelet API docs (v1.0.0).',
          url: `${SITE_URL}/api/edgelet`,
        },
      ],
    },
    {
      heading: 'Legacy documentation snapshot',
      entries: [
        {
          docId: '__url__',
          title: 'v3.7.3 docs snapshot',
          note: 'Frozen legacy docs (Java Agent, ECN Viewer, Keycloak-first deployment). Not current for v3.8.0.',
          url: `${SITE_URL}/v3.7.3/`,
        },
      ],
    },
  ];
}

function splitSitemap() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    throw new Error(`Missing ${SITEMAP_PATH}. Run docusaurus build first.`);
  }

  const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const items = parseSitemapXml(xml);

  const current = [];
  const legacy = [];

  for (const item of items) {
    const pathname = item.url.replace(SITE_URL, '').replace(/\/$/, '') || '/';
    if (isUtilityPath(pathname)) {
      continue;
    }
    const priority = sitemapPriorityForUrl(item.url, SITE_URL);
    const normalized = {
      ...item,
      priority: priority ?? item.priority ?? 0.5,
      changefreq: null,
    };
    if (isLegacyDocPath(pathname)) {
      legacy.push({ ...normalized, priority: 0.2 });
    } else {
      current.push(normalized);
    }
  }

  fs.writeFileSync(
    path.join(BUILD_DIR, 'sitemap-current.xml'),
    sitemapItemsToXml(current),
  );
  fs.writeFileSync(
    path.join(BUILD_DIR, 'sitemap-legacy.xml'),
    sitemapItemsToXml(legacy),
  );
  fs.writeFileSync(
    SITEMAP_PATH,
    sitemapIndexXml(SITE_URL, ['/sitemap-current.xml', '/sitemap-legacy.xml']),
  );

  console.log(
    `postbuild-seo: sitemap split — current=${current.length}, legacy=${legacy.length}`,
  );
}

/** @param {{ docId: string, title?: string, note?: string, url?: string }} entry */
function resolveLlmsEntry(entry) {
  if (entry.docId === '__url__') {
    return {
      title: entry.title ?? entry.url ?? 'Link',
      url: entry.url ?? SITE_URL,
      description: entry.note ?? '',
    };
  }
  const link = docLink(entry.docId, entry.title);
  if (entry.note) {
    link.description = entry.note;
  }
  return link;
}

function generateLlmsTxt() {
  const lines = [
    `# ${PRODUCT_NAME} Documentation`,
    '',
    '> Official docs for PoT platform train v3.8.0. Greenfield release: Edgelet nodes, EdgeOps Console, Controller with embedded OIDC, and containerized edge workloads.',
    '',
    `${PRODUCT_NAME} (Platform of Things) is an enterprise open-source fog and distributed edge computing platform. You deploy a Control Plane on Kubernetes or remote hosts, connect **Edgelet nodes** at the edge, and run containerized microservices across heterogeneous hardware.`,
    '',
    '**v3.8.0 is a greenfield release.** There is no in-place upgrade from v3.7 field deployments. You need a new Controller database, **Edgelet v1.0.0+** on every node, and **' +
      `${CLI_NAME} v3.8.0**. Legacy Java iofog-agent and v3.7 field agents are not supported on Controller v3.8.`,
    '',
    'The v3.8 web UI is **EdgeOps Console** (embedded in the Controller image). Authentication defaults to **embedded OIDC** in the Control Plane.',
    '',
    'Full inline corpus: [llms-full.txt](' + `${SITE_URL}/llms-full.txt` + ').',
    '',
  ];

  for (const section of getLlmsSections()) {
    lines.push(`## ${section.heading}`, '');
    for (const entry of section.entries) {
      const link = resolveLlmsEntry(entry);
      const suffix = link.description ? `: ${link.description}` : '';
      lines.push(`- [${link.title}](${link.url})${suffix}`);
    }
    lines.push('');
  }

  const output = lines.join('\n').trimEnd() + '\n';
  fs.writeFileSync(path.join(BUILD_DIR, 'llms.txt'), output);
  console.log(`postbuild-seo: wrote llms.txt (${output.length} bytes)`);
}

function generateLlmsFullTxt() {
  const blocks = [
    `# ${PRODUCT_NAME} Documentation (full corpus excerpt)`,
    '',
    `> Priority v3.8.0 pages from ${SITE_URL}. Generated at build time.`,
    '',
  ];

  const cliIntroId = `${CLI_NAME}/introduction`;
  const docIds = LLMS_FULL_DOC_IDS.includes('potctl/introduction')
    ? LLMS_FULL_DOC_IDS.map((id) => (id === 'potctl/introduction' ? cliIntroId : id))
    : LLMS_FULL_DOC_IDS;

  for (const docId of docIds) {
    const page = loadDocContent(docId);
    blocks.push(
      '---',
      '',
      `# ${page.title}`,
      '',
      `Source: ${page.url}`,
      '',
      page.body,
      '',
    );
  }

  const output = blocks.join('\n').trimEnd() + '\n';
  fs.writeFileSync(path.join(BUILD_DIR, 'llms-full.txt'), output);
  console.log(`postbuild-seo: wrote llms-full.txt (${output.length} bytes)`);
}

function main() {
  splitSitemap();
  generateLlmsTxt();
  generateLlmsFullTxt();
}

main();
