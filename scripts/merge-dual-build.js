#!/usr/bin/env node
/**
 * Merge ioFog flavor build (staging) into Datasance root build at build/iofog/.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATASANCE_BUILD = path.join(ROOT, 'build');
const IOFOG_STAGING = path.join(ROOT, '.build-iofog');
const IOFOG_DEST = path.join(DATASANCE_BUILD, 'iofog');

function main() {
  if (!fs.existsSync(DATASANCE_BUILD)) {
    throw new Error(`Missing ${DATASANCE_BUILD}. Run build:datasance first.`);
  }
  if (!fs.existsSync(IOFOG_STAGING)) {
    throw new Error(`Missing ${IOFOG_STAGING}. Run build:iofog:staging first.`);
  }

  if (fs.existsSync(IOFOG_DEST)) {
    fs.rmSync(IOFOG_DEST, { recursive: true, force: true });
  }

  fs.cpSync(IOFOG_STAGING, IOFOG_DEST, { recursive: true });
  fs.rmSync(IOFOG_STAGING, { recursive: true, force: true });

  console.log(`merge-dual-build: copied ioFog artifact to ${IOFOG_DEST}`);
}

main();
