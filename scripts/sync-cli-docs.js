#!/usr/bin/env node
/**
 * Copy pre-generated CLI markdown from the potctl repo into this docs repo.
 * Source: potctl/docs/potctl_md and potctl/docs/iofogctl_md (no cobra docgen).
 */

const fs = require('fs');
const path = require('path');

const POTCTL_REPO = path.join(__dirname, '../../potctl');
const DOCS_ROOT = path.join(__dirname, '..');

const SOURCES = [
  { src: 'docs/potctl_md', dest: 'docs/potctl/md' },
  { src: 'docs/iofogctl_md', dest: 'docs/iofogctl/md' },
];

function syncDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.error(`Source not found: ${srcDir}`);
    process.exit(1);
  }

  fs.mkdirSync(destDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.md'));
  const destNames = new Set(files);

  for (const file of files) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    console.log(`  ${file}`);
  }

  for (const existing of fs.readdirSync(destDir)) {
    if (existing.endsWith('.md') && !destNames.has(existing)) {
      fs.unlinkSync(path.join(destDir, existing));
      console.log(`  removed stale ${existing}`);
    }
  }

  return files.length;
}

console.log('Syncing CLI docs from potctl repo...\n');

for (const { src, dest } of SOURCES) {
  const srcDir = path.join(POTCTL_REPO, src);
  const destDir = path.join(DOCS_ROOT, dest);
  console.log(`${src} -> ${dest}`);
  const count = syncDir(srcDir, destDir);
  console.log(`  ${count} files\n`);
}

console.log('Done!');
