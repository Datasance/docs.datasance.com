#!/usr/bin/env node
/**
 * Replace markdown inline-code backticks wrapping {CLI_NAME} or {REGISTRY}
 * with JSX <code> elements so MDX evaluates flavor variables.
 */

const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');

function fixContent(text) {
  // **`{REGISTRY}/path`** -> **<code>{REGISTRY}/path</code>**
  text = text.replace(
    /\*\*`(\{REGISTRY\}[^`]*)`\*\*/g,
    '**<code>$1</code>**',
  );

  // `{CLI_NAME}...` -> <code>{CLI_NAME}...</code>
  text = text.replace(/`(\{CLI_NAME\}[^`]*)`/g, '<code>$1</code>');

  // `{REGISTRY}/...` -> <code>{REGISTRY}/...</code> (single brace only, not {{REGISTRY}})
  text = text.replace(/(?<!\{)`(\{REGISTRY\}[^`]*)`/g, '<code>$1</code>');

  return text;
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith('.mdx')) {
      const original = fs.readFileSync(full, 'utf8');
      const fixed = fixContent(original);
      if (fixed !== original) {
        fs.writeFileSync(full, fixed);
        console.log(full);
      }
    }
  }
}

walk(docsDir);
