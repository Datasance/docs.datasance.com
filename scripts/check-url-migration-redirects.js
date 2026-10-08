#!/usr/bin/env node
/**
 * CI: every legacy_path with phase migrate must appear in generated redirects.
 */

const {
  getLearnMigrationRedirects,
  getMigrateLegacyPaths,
  redirectFromKeys,
} = require('./url-migration-redirects.js');

function main() {
  const migrateRows = getMigrateLegacyPaths();
  const redirects = getLearnMigrationRedirects();
  const fromKeys = redirectFromKeys(redirects);

  /** @type {string[]} */
  const errors = [];

  for (const { legacy_path, canonical_path } of migrateRows) {
    if (!fromKeys.has(legacy_path)) {
      errors.push(`missing redirect from ${legacy_path} (expected → ${canonical_path})`);
    }
  }

  if (errors.length > 0) {
    console.error('check-url-migration-redirects: failed\n');
    for (const line of errors) {
      console.error(`  - ${line}`);
    }
    process.exit(1);
  }

  console.log(
    `check-url-migration-redirects: OK (${migrateRows.length} migrate rows, ${redirects.length} redirect entries; ioFog /iofog/* via merged flavor build)`,
  );
}

main();
