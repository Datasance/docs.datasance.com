#!/usr/bin/env node
/**
 * Regenerate versioned_sidebars/version-v3.8.0-sidebars.json from sidebarsShared.ts.
 * Run: npm run sync:version-sidebar
 */

const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'versioned_sidebars', 'version-v3.8.0-sidebars.json');

const runner = path.join(ROOT, 'scripts', 'sync-version-v380-sidebars.run.ts');

const tsSource = `import {writeFileSync} from 'node:fs';
import {buildVersion380Sidebars} from '../sidebarsShared';

const sidebars = buildVersion380Sidebars('potctl', 'potctl');
writeFileSync(
  ${JSON.stringify(OUT)},
  \`\${JSON.stringify(sidebars, null, 2)}\\n\`,
);
console.log('sync-version-v380-sidebars: wrote', ${JSON.stringify(OUT)});
`;

fs.writeFileSync(runner, tsSource);

try {
  execFileSync('npx', ['--yes', 'tsx', runner], {cwd: ROOT, stdio: 'inherit', env: process.env});
} finally {
  fs.rmSync(runner, {force: true});
}
