const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, '..', '..', 'docs');
const SITE_URL = 'https://docs.datasance.com';

const FLAVOR =
  process.env.DOCUSAURUS_DISTRIBUTION === 'iofog' ? 'iofog' : 'datasance';

const DOCS_BASE_PATH = FLAVOR === 'iofog' ? '/iofog' : '';
const CLI_NAME = FLAVOR === 'datasance' ? 'potctl' : 'iofogctl';
const PRODUCT_NAME = FLAVOR === 'datasance' ? 'Datasance PoT' : 'Eclipse ioFog';
const REGISTRY = `ghcr.io/${FLAVOR === 'datasance' ? 'datasance' : 'eclipse-iofog'}`;
const API_VERSION = FLAVOR === 'datasance' ? 'datasance.com/v3' : 'iofog.org/v3';
/** Keep in step with src/config/distribution.ts. Current docs only; snapshots stay literal. */
const PLATFORM_TRAIN = '3.9.2';
const EDGELET_VERSION = '1.1.2';
const GITHUB_ORG_URL =
  FLAVOR === 'datasance'
    ? 'https://github.com/Datasance'
    : 'https://github.com/eclipse-iofog';
const HELM_REPO_URL =
  FLAVOR === 'datasance'
    ? 'https://datasance.github.io/iofog-operator'
    : 'https://eclipse-iofog.github.io/iofog-operator';
const OPERATOR_CHART_README_URL = `${GITHUB_ORG_URL}/iofog-operator/blob/develop/charts/iofog-operator/README.md`;
const OPERATOR_CHART_VALUES_SCHEMA_URL = OPERATOR_CHART_README_URL.replace(
  '/README.md',
  '/values.schema.json',
);
const CONTROLPLANE_CRD_RESOURCE =
  FLAVOR === 'datasance' ? 'controlplanes.datasance.com' : 'controlplanes.iofog.org';
const CLI_REPO_EDGELET_ASSETS_URL = `${GITHUB_ORG_URL}/${CLI_NAME}/tree/develop/assets/edgelet`;
/** Download page export. Matches the current platform train. */
const CLI_VERSION = PLATFORM_TRAIN;

/** @param {string} docId */
function docFilePath(docId) {
  return path.join(DOCS_DIR, `${docId}.mdx`);
}

/**
 * @param {string} docId
 * @returns {{ title: string, description: string, slug: string, filePath: string }}
 */
function loadDocMeta(docId) {
  const filePath = docFilePath(docId);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing doc for llms config: ${docId} (${filePath})`);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(raw);
  const slug =
    typeof data.slug === 'string'
      ? data.slug
      : `/${docId.replace(/\/README$/, '').replace(/\/index$/, '')}`;

  return {
    title: typeof data.title === 'string' ? data.title : docId,
    description: typeof data.description === 'string' ? data.description : '',
    slug: slug.endsWith('/') && slug.length > 1 ? slug.slice(0, -1) : slug,
    filePath,
  };
}

/** @param {string} slug */
function slugToUrl(slug) {
  if (slug === '/') {
    return DOCS_BASE_PATH ? `${SITE_URL}${DOCS_BASE_PATH}/` : `${SITE_URL}/`;
  }
  const pathPart = slug.startsWith('/') ? slug : `/${slug}`;
  return `${SITE_URL}${DOCS_BASE_PATH}${pathPart}`;
}

/**
 * @param {string} docId
 * @returns {{ title: string, url: string, description: string }}
 */
function docLink(docId, titleOverride) {
  const meta = loadDocMeta(docId);
  return {
    title: titleOverride ?? meta.title,
    url: slugToUrl(meta.slug),
    description: meta.description,
  };
}

/** @param {string} raw */
function mdxToPlainMarkdown(raw) {
  const { content } = matter(raw);

  return (
    content
      // Drop MDX imports/exports and JSX component tags we cannot render offline.
      .replace(/^import .+$/gm, '')
      .replace(/^export .+$/gm, '')
      .replace(/<\/?[A-Z][A-Za-z0-9]*[^>]*>/g, '')
      .replace(/\{\{CLI_NAME\}\}/g, CLI_NAME)
      .replace(/\{CLI_NAME\}/g, CLI_NAME)
      .replace(/\{PRODUCT_NAME\}/g, PRODUCT_NAME)
      .replace(/\{\{REGISTRY\}\}/g, REGISTRY)
      .replace(/\{REGISTRY\}/g, REGISTRY)
      .replace(/\{\{API_VERSION\}\}/g, API_VERSION)
      .replace(/\{API_VERSION\}/g, API_VERSION)
      .replace(/\{\{PLATFORM_TRAIN\}\}/g, PLATFORM_TRAIN)
      .replace(/\{PLATFORM_TRAIN\}/g, PLATFORM_TRAIN)
      .replace(/\{\{EDGELET_VERSION\}\}/g, EDGELET_VERSION)
      .replace(/\{EDGELET_VERSION\}/g, EDGELET_VERSION)
      .replace(/\{OPERATOR_CHART_VERSION\}/g, PLATFORM_TRAIN)
      .replace(/\{HELM_REPO_URL\}/g, HELM_REPO_URL)
      .replace(/\{OPERATOR_CHART_README_URL\}/g, OPERATOR_CHART_README_URL)
      .replace(/\{OPERATOR_CHART_VALUES_SCHEMA_URL\}/g, OPERATOR_CHART_VALUES_SCHEMA_URL)
      .replace(/\{CONTROLPLANE_CRD_RESOURCE\}/g, CONTROLPLANE_CRD_RESOURCE)
      .replace(/\{CLI_REPO_EDGELET_ASSETS_URL\}/g, CLI_REPO_EDGELET_ASSETS_URL)
      .replace(/\{GITHUB_ORG_URL\}/g, GITHUB_ORG_URL)
      .replace(/\{CLI_VERSION\}/g, CLI_VERSION)
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

/**
 * @param {string} docId
 * @returns {{ title: string, url: string, body: string }}
 */
function loadDocContent(docId) {
  const meta = loadDocMeta(docId);
  const raw = fs.readFileSync(meta.filePath, 'utf8');
  return {
    title: meta.title,
    url: slugToUrl(meta.slug),
    body: mdxToPlainMarkdown(raw),
  };
}

module.exports = {
  SITE_URL,
  DOCS_BASE_PATH,
  CLI_NAME,
  PRODUCT_NAME,
  FLAVOR,
  docLink,
  loadDocContent,
  slugToUrl,
};
