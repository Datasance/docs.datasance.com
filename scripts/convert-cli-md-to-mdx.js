#!/usr/bin/env node
/**
 * Converts CLI markdown (cobra output) to MDX for Docusaurus.
 * Usage: node scripts/convert-cli-md-to-mdx.js potctl|iofogctl
 */

const fs = require('fs');
const path = require('path');

const CLI = process.argv[2];
if (!CLI || !['potctl', 'iofogctl'].includes(CLI)) {
  console.error('Usage: node scripts/convert-cli-md-to-mdx.js <potctl|iofogctl>');
  process.exit(1);
}

const MD_DIR = path.join(__dirname, `../docs/${CLI}/md`);
const CLI_DIR = path.join(__dirname, `../docs/${CLI}/cli`);
const LINK_PREFIX = `/${CLI}/cli`;

function linkTargetToPath(target) {
  const base = target.replace(/\.md$/, '');
  return `${LINK_PREFIX}/${base}`;
}

function convertSeeAlso(content) {
  const linkRe = new RegExp(
    `\\* \\[([^\\]]+)\\]\\((${CLI}[^)]*\\.md)\\)\\s*\\t?\\s*-\\s*([^\\n]*)`,
    'g',
  );
  let result = content.replace(linkRe, (match, text, target, desc) => {
    const docPath = linkTargetToPath(target);
    return `* [${text}](${docPath}) - ${desc.trim()}`;
  });

  const bareLinkRe = new RegExp(`\\* \\[([^\\]]+)\\]\\((${CLI}[^)]*\\.md)\\)`, 'g');
  result = result.replace(bareLinkRe, (match, text, target) => {
    const docPath = linkTargetToPath(target);
    return `* [${text}](${docPath})`;
  });

  return result;
}

function extractTitle(content) {
  const match = content.match(/^## (.+)$/m);
  return match ? match[1].trim() : CLI;
}

/** Escape `{name}` in prose so MDX does not treat it as a JS expression. */
function escapeMdxExpressionsInProse(content) {
  const parts = content.split(/(```[\s\S]*?```)/g);
  return parts
    .map((part) => {
      if (part.startsWith('```')) {
        return part;
      }
      return part.replace(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g, '\\{$1\\}');
    })
    .join('');
}

function fixMdxContent(content) {
  const esc = CLI.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return escapeMdxExpressionsInProse(content)
    .replace(
      new RegExp(`\\tsource <\\(${esc} completion bash\\)`, 'g'),
      '```bash\nsource <(' + CLI + ' completion bash)\n```',
    )
    .replace(
      new RegExp(`\\tsource <\\(${esc} completion zsh\\)`, 'g'),
      '```zsh\nsource <(' + CLI + ' completion zsh)\n```',
    )
    .replace(
      new RegExp(`\\t${esc} completion zsh > "\\$\\{fpath\\[1\\]\\}\\/_${esc}"`, 'g'),
      '```bash\n' + CLI + ' completion zsh > "${fpath[1]}/_' + CLI + '"\n```',
    )
    .replace(
      new RegExp(
        `\\t${esc} completion zsh > \\$\\(brew --prefix\\)\\/share\\/zsh\\/site-functions\\/_${esc}`,
        'g',
      ),
      '```bash\n' + CLI + ' completion zsh > $(brew --prefix)/share/zsh/site-functions/_' + CLI + '\n```',
    )
    .replace(
      /\techo "autoload -U compinit; compinit" >> ~\/\.zshrc/g,
      '```zsh\necho "autoload -U compinit; compinit" >> ~/.zshrc\n```',
    );
}

function convertToMdx(content) {
  const title = extractTitle(content);
  let body = fixMdxContent(content);
  body = convertSeeAlso(body);

  return `---
title: ${title}
---

${body}`;
}

if (!fs.existsSync(MD_DIR)) {
  console.error(`MD source not found: ${MD_DIR}. Run npm run sync:cli first.`);
  process.exit(1);
}

fs.mkdirSync(CLI_DIR, { recursive: true });

const files = fs.readdirSync(MD_DIR).filter((f) => f.endsWith('.md'));
const expectedMdx = new Set(files.map((f) => f.replace(/\.md$/, '.mdx')));

console.log(`Converting ${files.length} ${CLI} files...`);

for (const file of files) {
  const content = fs.readFileSync(path.join(MD_DIR, file), 'utf8');
  const mdxFilename = file.replace(/\.md$/, '.mdx');
  fs.writeFileSync(path.join(CLI_DIR, mdxFilename), convertToMdx(content));
  console.log(`  ${file} -> cli/${mdxFilename}`);
}

for (const existing of fs.readdirSync(CLI_DIR)) {
  if (existing.endsWith('.mdx') && !expectedMdx.has(existing)) {
    fs.unlinkSync(path.join(CLI_DIR, existing));
    console.log(`  removed stale cli/${existing}`);
  }
}

console.log('Done!');
