/**
 * Shared sitemap helpers for docusaurus.config.ts and postbuild-seo.js.
 */

const LEGACY_VERSION_PREFIX = /^\/v3\.\d+/;

const SITEMAP_IGNORE_PATTERNS = ['/tags/**', '/search', '/markdown-page'];

/** @param {string} path */
function isLegacyDocPath(path) {
  return LEGACY_VERSION_PREFIX.test(path);
}

/** @param {string} path */
function isUtilityPath(path) {
  return path === '/search' || path === '/markdown-page';
}

/**
 * Exact path or a child path. Avoids prefix collisions such as
 * `/reference` matching `/reference-controller`.
 * @param {string} path
 * @param {string} prefix
 */
function isPathOrChild(path, prefix) {
  return path === prefix || path.startsWith(`${prefix}/`);
}

/**
 * @param {string} url
 * @param {string} siteUrl
 * @returns {number | null}
 */
function sitemapPriorityForUrl(url, siteUrl) {
  const path = url.replace(siteUrl, '').replace(/\/$/, '') || '/';

  if (isUtilityPath(path)) {
    return null;
  }
  if (path === '/' || path === '') {
    return 1.0;
  }
  if (isPathOrChild(path, '/get-started') || isPathOrChild(path, '/release-notes')) {
    return 0.9;
  }
  if (isPathOrChild(path, '/learn')) {
    return 0.88;
  }
  if (isPathOrChild(path, '/reference')) {
    return 0.86;
  }
  if (isPathOrChild(path, '/tutorials')) {
    return 0.85;
  }
  if (isPathOrChild(path, '/api')) {
    return 0.8;
  }
  if (isLegacyDocPath(path)) {
    return 0.2;
  }
  return 0.5;
}

/**
 * @param {import('@docusaurus/plugin-sitemap').SitemapItem[]} items
 * @param {string} siteUrl
 */
function applySitemapPriorities(items, siteUrl) {
  return items
    .map((item) => {
      const priority = sitemapPriorityForUrl(item.url, siteUrl);
      if (priority === null) {
        return null;
      }
      return { ...item, priority, changefreq: null };
    })
    .filter(Boolean);
}

/**
 * @param {Array<{url: string, lastmod?: string | null, priority?: number | null, changefreq?: string | null}>} items
 */
function sitemapItemsToXml(items) {
  const body = items
    .map((item) => {
      const parts = [`<loc>${escapeXml(item.url)}</loc>`];
      if (item.lastmod) {
        parts.push(`<lastmod>${escapeXml(item.lastmod)}</lastmod>`);
      }
      if (item.priority != null) {
        parts.push(`<priority>${item.priority}</priority>`);
      }
      return `<url>${parts.join('')}</url>`;
    })
    .join('');

  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    body +
    '</urlset>'
  );
}

/** @param {string} value */
function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * @param {string} xml
 * @returns {Array<{url: string, lastmod?: string, priority?: string}>}
 */
function parseSitemapXml(xml) {
  const items = [];
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  for (const block of urlBlocks) {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
    if (!loc) {
      continue;
    }
    const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
    const priority = block.match(/<priority>(.*?)<\/priority>/)?.[1];
    items.push({
      url: loc,
      ...(lastmod ? { lastmod } : {}),
      ...(priority ? { priority: Number(priority) } : {}),
    });
  }
  return items;
}

/**
 * @param {string} siteUrl
 * @param {string[]} sitemapPaths
 */
function sitemapIndexXml(siteUrl, sitemapPaths) {
  const body = sitemapPaths
    .map(
      (path) =>
        `<sitemap><loc>${escapeXml(`${siteUrl}${path}`)}</loc></sitemap>`,
    )
    .join('');
  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    body +
    '</sitemapindex>'
  );
}

module.exports = {
  SITEMAP_IGNORE_PATTERNS,
  LEGACY_VERSION_PREFIX,
  isLegacyDocPath,
  isUtilityPath,
  sitemapPriorityForUrl,
  applySitemapPriorities,
  sitemapItemsToXml,
  parseSitemapXml,
  sitemapIndexXml,
};
