const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, '..', '..', 'docs');
const SITE_URL = 'https://docs.datasance.com';

const FLAVOR =
  (process.env.DOCUSAURUS_DISTRIBUTION === 'iofog' ? 'iofog' : 'datasance');
const CLI_NAME = FLAVOR === 'datasance' ? 'potctl' : 'iofogctl';
const PRODUCT_NAME = FLAVOR === 'datasance' ? 'Datasance PoT' : 'Eclipse ioFog';

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
    return `${SITE_URL}/`;
  }
  return `${SITE_URL}${slug.startsWith('/') ? slug : `/${slug}`}`;
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
      .replace(/\{CLI_NAME\}/g, CLI_NAME)
      .replace(/\{PRODUCT_NAME\}/g, PRODUCT_NAME)
      .replace(/\{REGISTRY\}/g, `ghcr.io/${FLAVOR === 'datasance' ? 'datasance' : 'eclipse-iofog'}`)
      .replace(/\{API_VERSION\}/g, FLAVOR === 'datasance' ? 'datasance.com/v3' : 'iofog.org/v3')
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
  CLI_NAME,
  PRODUCT_NAME,
  FLAVOR,
  docLink,
  loadDocContent,
  slugToUrl,
};
