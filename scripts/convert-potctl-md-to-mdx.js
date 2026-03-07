#!/usr/bin/env node
/**
 * Converts potctl MD files to MDX format with:
 * - Frontmatter (title)
 * - Updated SEE ALSO links for Docusaurus
 */

const fs = require('fs');
const path = require('path');

const MD_DIR = path.join(__dirname, '../docs/potctl/md');
const CLI_DIR = path.join(__dirname, '../docs/potctl/cli');

// Convert filename to doc path: potctl_create_namespace.md -> potctl-create-namespace
function mdFileToDocId(filename) {
  const base = filename.replace(/\.md$/, '');
  // potctl_attach_edge-resource -> potctl-attach-edge-resource (underscores to hyphens)
  return base.replace(/_/g, '-');
}

// Convert link target to doc path: potctl_describe.md -> /potctl/cli/potctl_describe
// Keep underscores to match actual filenames (potctl_describe.mdx)
function linkTargetToPath(target) {
  const base = target.replace(/\.md$/, '');
  return `/potctl/cli/${base}`;
}

function convertSeeAlso(content) {
  // Match: * [text](potctl_xxx.md)	 - description
  let result = content.replace(/\* \[([^\]]+)\]\((potctl[^)]+\.md)\)\s*\t?\s*-\s*([^\n]*)/g, (match, text, target, desc) => {
    const docPath = linkTargetToPath(target);
    return `* [${text}](${docPath}) - ${desc.trim()}`;
  });
  // Match: * [text](potctl.md) or [text](potctl_xxx.md) without description
  result = result.replace(/\* \[([^\]]+)\]\((potctl[^)]*\.md)\)/g, (match, text, target) => {
    const docPath = linkTargetToPath(target);
    return `* [${text}](${docPath})`;
  });
  return result;
}

function extractTitle(content) {
  const match = content.match(/^## (.+)$/m);
  return match ? match[1].trim() : 'potctl';
}

// Fix MDX: content that breaks JSX parsing
function fixMdxContent(content) {
  return content
    // Angle brackets in process substitution cause JSX parse errors
    .replace(/\tsource <\(potctl completion bash\)/g, '```bash\nsource <(potctl completion bash)\n```')
    .replace(/\tsource <\(potctl completion zsh\)/g, '```zsh\nsource <(potctl completion zsh)\n```')
    // ${} and $() are interpreted as JSX expressions - wrap in code blocks
    .replace(/\tpotctl completion zsh > "\$\{fpath\[1\]\}\/_potctl"/g, '```bash\npotctl completion zsh > "${fpath[1]}/_potctl"\n```')
    .replace(/\tpotctl completion zsh > \$\(brew --prefix\)\/share\/zsh\/site-functions\/_potctl/g, '```bash\npotctl completion zsh > $(brew --prefix)/share/zsh/site-functions/_potctl\n```')
    .replace(/\techo "autoload -U compinit; compinit" >> ~\/\.zshrc/g, '```zsh\necho "autoload -U compinit; compinit" >> ~/.zshrc\n```');
}

function convertToMdx(content) {
  const title = extractTitle(content);
  let body = content;

  // Fix content that breaks MDX parsing
  body = fixMdxContent(body);

  // Update SEE ALSO links
  body = convertSeeAlso(body);

  const frontmatter = `---
title: ${title}
---

`;
  return frontmatter + body;
}

// Ensure CLI directory exists
if (!fs.existsSync(CLI_DIR)) {
  fs.mkdirSync(CLI_DIR, { recursive: true });
}

const files = fs.readdirSync(MD_DIR).filter(f => f.endsWith('.md'));
console.log(`Converting ${files.length} files...`);

for (const file of files) {
  const srcPath = path.join(MD_DIR, file);
  const content = fs.readFileSync(srcPath, 'utf8');
  const mdxContent = convertToMdx(content);
  const mdxFilename = file.replace(/\.md$/, '.mdx');
  const destPath = path.join(CLI_DIR, mdxFilename);
  fs.writeFileSync(destPath, mdxContent);
  console.log(`  ${file} -> cli/${mdxFilename}`);
}

console.log('Done!');
