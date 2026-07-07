#!/usr/bin/env node
/**
 * Fail CI if {CLI_NAME} or {REGISTRY} appear inside markdown fenced code blocks
 * or markdown inline-code backticks. Prose and component template strings use
 * {{CLI_NAME}} / {{REGISTRY}} or JSX <code>{CLI_NAME}</code> instead.
 */

const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const fenceRe = /^(`{3,})(\w*)\n([\s\S]*?)^\1\s*$/gm;
const blockedLangs = new Set(['bash', 'shell', 'sh', 'yaml', '']);
const inlineCodeRe = /(?<!\{)`(\{(?:CLI_NAME|REGISTRY)\}[^`]*)`/g;
let failed = false;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith('.mdx')) {
      checkFile(full);
    }
  }
}

function checkFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  let match;
  fenceRe.lastIndex = 0;
  while ((match = fenceRe.exec(text)) !== null) {
    const lang = match[2];
    const body = match[3];
    if (!blockedLangs.has(lang)) {
      continue;
    }
    if (/(?<!\{)\{CLI_NAME\}(?!\})/.test(body) || /(?<!\{)\{REGISTRY\}(?!\})/.test(body)) {
      console.error(`${filePath}: fenced \`${lang}\` block contains literal flavor variable`);
      failed = true;
    }
  }

  inlineCodeRe.lastIndex = 0;
  while ((match = inlineCodeRe.exec(text)) !== null) {
    console.error(`${filePath}: inline code \`${match[1]}\` must use <code>{...}</code> JSX instead`);
    failed = true;
  }
}

walk(docsDir);

if (failed) {
  process.exit(1);
}

console.log('check-cli-name-fences: OK');
