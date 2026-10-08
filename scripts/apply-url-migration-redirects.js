#!/usr/bin/env node
/**
 * Overwrite built legacy doc HTML with client redirect pages.
 * Needed while yaml-references MDX still exists (Plan 14-7); plugin-client-redirects skips those paths.
 */

const fs = require('fs');
const path = require('path');
const { normalizeUrl } = require('@docusaurus/utils');
const createRedirectPageContent =
  require('@docusaurus/plugin-client-redirects/lib/createRedirectPageContent').default;
const {
  getMigrateLegacyPaths,
  normalizePath,
} = require('./url-migration-redirects.js');

const ROOT = path.join(__dirname, '..');
const BUILD_DIR = path.resolve(
  ROOT,
  process.env.DOCUSAURUS_BUILD_DIR ?? 'build',
);

const FLAVOR =
  process.env.DOCUSAURUS_DISTRIBUTION === 'iofog' ? 'iofog' : 'datasance';
const BASE_URL = FLAVOR === 'iofog' ? '/iofog/' : '/';

/**
 * @param {string} outDir
 * @param {string} legacyPath
 * @returns {string}
 */
function legacyPathToBuildFile(outDir, legacyPath) {
  const route = normalizePath(legacyPath);
  const relative = route.replace(/^\//, '');
  if (relative.endsWith('/README')) {
    return path.join(outDir, relative.replace(/\/README$/, ''), 'index.html');
  }
  return path.join(outDir, relative, 'index.html');
}

/**
 * @param {string} toPath
 * @returns {string}
 */
function redirectTargetUrl(toPath) {
  return normalizeUrl([BASE_URL, normalizePath(toPath)]);
}

function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    throw new Error(`Missing build dir: ${BUILD_DIR}`);
  }

  const rows = getMigrateLegacyPaths();
  let applied = 0;
  let skipped = 0;

  for (const { legacy_path, canonical_path } of rows) {
    const filePath = legacyPathToBuildFile(BUILD_DIR, legacy_path);
    if (!fs.existsSync(filePath)) {
      skipped += 1;
      continue;
    }
    const toUrl = redirectTargetUrl(canonical_path);
    const content = createRedirectPageContent({ toUrl });
    fs.writeFileSync(filePath, content, 'utf8');
    applied += 1;
  }

  console.log(
    `apply-url-migration-redirects: ${applied} pages (${FLAVOR}, ${BUILD_DIR}), ${skipped} skipped (no built file)`,
  );
}

main();
