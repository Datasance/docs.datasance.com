#!/usr/bin/env node
/**
 * Post-build SEO: split sitemap (current vs legacy), generate llms.txt and llms-full.txt.
 */

const fs = require('fs');
const path = require('path');
const {
  SITE_URL,
  DOCS_BASE_PATH,
  CLI_NAME,
  PRODUCT_NAME,
  docLink,
  loadDocContent,
} = require('./doc-utils');

function sitePath(pathname) {
  const base = DOCS_BASE_PATH.replace(/\/$/, '');
  const pathPart = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_URL}${base}${pathPart}`;
}
const { listLlmsFullDocIds } = require('./llms-config');
const {
  isLegacyDocPath,
  isUtilityPath,
  parseSitemapXml,
  sitemapItemsToXml,
  sitemapIndexXml,
  sitemapPriorityForUrl,
} = require('./sitemap-utils');

const BUILD_DIR = path.resolve(
  __dirname,
  '..',
  '..',
  process.env.DOCUSAURUS_BUILD_DIR ?? 'build',
);
const SITEMAP_PATH = path.join(BUILD_DIR, 'sitemap.xml');

/** @returns {Array<{ heading: string, entries: Array<{ docId: string, title?: string, note?: string, url?: string }> }>} */
function getLlmsSections() {
  return [
    {
      heading: 'Get started',
      entries: [
        { docId: 'get-started/welcome' },
        { docId: 'get-started/core-concepts' },
        { docId: 'get-started/architecture' },
        { docId: 'get-started/quick-start-local' },
        { docId: 'get-started/deploy/introduction' },
        { docId: 'get-started/deploy/embedded-oidc' },
        { docId: 'get-started/deploy/external-oidc' },
        { docId: 'get-started/edgelet-nodes/introduction' },
        { docId: 'get-started/workloads/overview' },
        { docId: 'get-started/cli/introduction' },
        { docId: 'get-started/edgeops-console/shell' },
        { docId: 'get-started/edgeops-console/hosting' },
      ],
    },
    {
      heading: 'Learn',
      entries: [
        { docId: 'learn/overview' },
        { docId: 'learn/control-plane/overview' },
        { docId: 'learn/edgelet-nodes/overview' },
        { docId: 'learn/edgelet/overview', title: 'Get to know Edgelet' },
        { docId: 'learn/workloads/overview' },
        { docId: 'learn/config/overview' },
        { docId: 'learn/network/overview' },
        { docId: 'learn/message-bus/overview' },
        { docId: 'learn/access-control/overview' },
        { docId: 'learn/security/securing-cluster' },
        { docId: 'learn/platform-components/overview' },
        { docId: 'learn/operate/overview' },
        { docId: 'learn/operate/node-debugging', title: 'Node logs and exec' },
      ],
    },
    {
      heading: 'Tutorials',
      entries: [
        { docId: 'tutorials/overview', title: 'Learn by example' },
        { docId: 'tutorials/edge-ai-wafer-defect/overview', title: 'Edge AI wafer defect' },
        { docId: 'tutorials/acme-smart-plant/overview', title: 'Acme Smart Plant' },
      ],
    },
    {
      heading: 'Reference',
      entries: [
        { docId: 'reference/overview' },
        { docId: 'reference/documentation-archive' },
        { docId: 'reference/controller/controller-config' },
        { docId: 'reference/cli/edgelet/index', title: 'Edgelet CLI' },
        {
          docId: `reference/cli/${CLI_NAME}/${CLI_NAME}`,
          title: `${CLI_NAME} CLI`,
        },
      ],
    },
    {
      heading: 'Release notes',
      entries: [
        { docId: 'release-notes/index', title: 'Release notes' },
        { docId: 'release-notes/whats-new' },
        { docId: 'release-notes/upgrading-to-v3-9' },
        {
          docId: 'release-notes/migrating-to-v3-8',
          note: 'Greenfield move from v3.7.',
        },
      ],
    },
    {
      heading: 'API',
      entries: [
        {
          docId: '__url__',
          title: 'Controller API',
          note: 'Interactive Controller API docs (v3.9.0).',
          url: sitePath('/api/v3.9.0/controller'),
        },
        {
          docId: '__url__',
          title: 'Edgelet API',
          note: 'Interactive Edgelet API docs (v1.1.0).',
          url: sitePath('/api/v1.1.0/edgelet'),
        },
      ],
    },
    {
      heading: 'Older docs',
      entries: [
        {
          docId: '__url__',
          title: 'v3.8.0 docs snapshot',
          note: 'Previous supported train.',
          url: sitePath('/v3.8.0/'),
        },
        {
          docId: '__url__',
          title: 'v3.7.3 docs snapshot',
          note: 'Frozen (Java Agent, ECN Viewer, Keycloak-first). Not the current train.',
          url: sitePath('/v3.7.3/'),
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
    const pathname =
      item.url
        .replace(SITE_URL, '')
        .replace(new RegExp(`^${DOCS_BASE_PATH.replace(/\/$/, '')}(?=\\/|$)`), '')
        .replace(/\/$/, '') || '/';
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
  const sitemapPrefix = DOCS_BASE_PATH.replace(/\/$/, '') || '';
  fs.writeFileSync(
    SITEMAP_PATH,
    sitemapIndexXml(SITE_URL, [
      `${sitemapPrefix}/sitemap-current.xml`,
      `${sitemapPrefix}/sitemap-legacy.xml`,
    ]),
  );

  console.log(
    `postbuild-seo: sitemap split - current=${current.length}, legacy=${legacy.length}`,
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
    '> Official docs for platform train v3.9.0. In-place upgrade from v3.8.0. A move from v3.7 field deployments is greenfield.',
    '',
    'Deploy a Control Plane on Kubernetes or remote hosts, connect Edgelet nodes, and run containerized microservices.',
    '',
    `v3.9.0 upgrades in place from v3.8.0. A move from v3.7 needs a new Controller database, Edgelet v1.1.0 on every node, and ${CLI_NAME} v3.9.0. Legacy Java iofog-agent and v3.7 field agents are not supported on this Controller.`,
    '',
    'The web UI is EdgeOps Console, embedded in the Controller image. Authentication defaults to embedded OIDC.',
    '',
    `Full corpus: [llms-full.txt](${sitePath('/llms-full.txt')}).`,
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
    `# ${PRODUCT_NAME} Documentation (full corpus)`,
    '',
    '> Full text of the current v3.9.0 guides. Generated at build time. CLI command pages and OpenAPI specs are linked from llms.txt.',
    '',
  ];

  const docIds = listLlmsFullDocIds();

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

if (require.main === module) {
  main();
}

module.exports = {
  getLlmsSections,
};
