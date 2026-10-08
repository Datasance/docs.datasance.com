#!/usr/bin/env node
/**
 * Learn URL redirects from .cursor/pot-docs/docs/url-migration-map.yaml
 * Used by docusaurus.config.ts (plugin-client-redirects) and check-url-migration-redirects.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const MAP_PATH = path.join(
  __dirname,
  '../.cursor/pot-docs/docs/url-migration-map.yaml',
);

/** @typedef {{ from: string, to: string }} RedirectEntry */

/**
 * @param {string} p
 * @returns {string}
 */
function normalizePath(p) {
  if (!p || p === '/') {
    return '/';
  }
  const withSlash = p.startsWith('/') ? p : `/${p}`;
  return withSlash.replace(/\/+$/, '') || '/';
}

/**
 * @param {string} p
 * @returns {string}
 */
function withIoFogPrefix(p) {
  const normalized = normalizePath(p);
  if (normalized === '/') {
    return '/iofog/';
  }
  return `/iofog${normalized}`;
}

/**
 * @param {string} legacyPath
 * @param {string} canonicalPath
 * @returns {RedirectEntry[]}
 */
function pairToRedirects(legacyPath, canonicalPath) {
  const from = normalizePath(legacyPath);
  const to = normalizePath(canonicalPath);
  return [{ from, to }];
}

/**
 * @returns {import('js-yaml').LoadReturnValue}
 */
function loadMigrationMap() {
  if (!fs.existsSync(MAP_PATH)) {
    throw new Error(`Missing migration map: ${MAP_PATH}`);
  }
  const raw = fs.readFileSync(MAP_PATH, 'utf8');
  return yaml.load(raw);
}

/**
 * Datasance build only serves `/learn/*` at the site root. ioFog URLs under `/iofog/*`
 * come from the merged ioFog artifact (same redirect pairs, baseUrl `/iofog/`).
 *
 * @param {{ distribution?: 'datasance' | 'iofog' }} [options]
 * @returns {RedirectEntry[]}
 */
function getLearnMigrationRedirects(options = {}) {
  const doc = loadMigrationMap();
  const rows = Array.isArray(doc?.redirects) ? doc.redirects : [];

  /** @type {RedirectEntry[]} */
  const out = [];
  const seen = new Set();

  const push = (entry) => {
    const key = `${entry.from}\0${entry.to}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    out.push(entry);
  };

  for (const row of rows) {
    if (row?.phase !== 'migrate') {
      continue;
    }
    if (!row.legacy_path || !row.canonical_path) {
      continue;
    }
    for (const entry of pairToRedirects(row.legacy_path, row.canonical_path)) {
      push(entry);
    }
  }

  return out;
}

/**
 * Migrate rows from the map (one per legacy_path).
 * @returns {{ legacy_path: string, canonical_path: string }[]}
 */
function getMigrateLegacyPaths() {
  const doc = loadMigrationMap();
  const rows = Array.isArray(doc?.redirects) ? doc.redirects : [];
  return rows
    .filter((row) => row?.phase === 'migrate' && row.legacy_path && row.canonical_path)
    .map((row) => ({
      legacy_path: normalizePath(row.legacy_path),
      canonical_path: normalizePath(row.canonical_path),
    }));
}

/**
 * Keys used by the CI check (from path without trailing slash).
 * @param {RedirectEntry[]} redirects
 * @returns {Set<string>}
 */
function redirectFromKeys(redirects) {
  const keys = new Set();
  for (const { from } of redirects) {
    keys.add(normalizePath(from));
  }
  return keys;
}

module.exports = {
  MAP_PATH,
  getLearnMigrationRedirects,
  getMigrateLegacyPaths,
  normalizePath,
  redirectFromKeys,
  withIoFogPrefix,
};
