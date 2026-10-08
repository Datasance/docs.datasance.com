/**
 * Doc ids concatenated into llms-full.txt at build time.
 * Walks current authored guides. Skips generated CLI pages.
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', '..', 'docs');

/** Directory groups, in corpus order. Paths are sorted inside each group. */
const DIR_GROUPS_BEFORE_REFERENCE_ROOTS = ['get-started', 'learn', 'tutorials'];

const DIR_GROUPS_AFTER_REFERENCE_ROOTS = [
  'reference/yaml',
  'reference/controller',
  'release-notes',
];

const REFERENCE_ROOT_IDS = [
  'reference/overview',
  'reference/documentation-archive',
];

const LEGACY_AGENT_ID = 'home/legacy-agent-v3-7';

/**
 * @param {string} relDir path relative to docs/
 * @returns {string[]}
 */
function collectMdxIds(relDir) {
  const root = path.join(DOCS_DIR, relDir);
  if (!fs.existsSync(root)) {
    throw new Error(`Missing docs directory for llms-full: ${relDir} (${root})`);
  }

  /** @type {string[]} */
  const ids = [];

  /** @param {string} dir */
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      // Raw CLI markdown sources live in a path segment named md.
      if (entry.name === 'md') {
        continue;
      }
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }
      if (!entry.isFile() || !entry.name.endsWith('.mdx')) {
        continue;
      }
      const rel = path.relative(DOCS_DIR, fullPath).split(path.sep).join('/');
      const docId = rel.slice(0, -'.mdx'.length);
      if (docId.split('/').includes('md')) {
        continue;
      }
      if (docId === 'reference/controller/cli-usage') {
        continue;
      }
      ids.push(docId);
    }
  }

  walk(root);
  ids.sort();
  return ids;
}

/** @returns {string[]} sorted doc ids, grouped in corpus order */
function listLlmsFullDocIds() {
  return [
    ...DIR_GROUPS_BEFORE_REFERENCE_ROOTS.flatMap((relDir) => collectMdxIds(relDir)),
    ...REFERENCE_ROOT_IDS,
    ...DIR_GROUPS_AFTER_REFERENCE_ROOTS.flatMap((relDir) => collectMdxIds(relDir)),
    LEGACY_AGENT_ID,
  ];
}

module.exports = {
  listLlmsFullDocIds,
};
