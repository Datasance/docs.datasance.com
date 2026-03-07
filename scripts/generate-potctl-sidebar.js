#!/usr/bin/env node
/**
 * Generates sidebar items for potctl CLI reference from the cli/*.mdx files.
 * Outputs a structure organized by command hierarchy.
 */

const fs = require('fs');
const path = require('path');

const CLI_DIR = path.join(__dirname, '../docs/potctl/cli');
const files = fs.readdirSync(CLI_DIR).filter(f => f.endsWith('.mdx'));

// Parse filename to get command path: potctl_create_namespace -> ['create', 'namespace']
function parseCommand(filename) {
  const base = filename.replace(/\.mdx$/, '');
  if (base === 'potctl') return ['potctl'];
  const parts = base.replace('potctl_', '').split('_');
  return parts;
}

// Create human-readable label: ['create', 'namespace'] -> 'create namespace'
function toLabel(parts) {
  return parts.join(' ');
}

// Build hierarchy: group by command prefix
const byPrefix = {};
for (const file of files) {
  const docId = `potctl/cli/${file.replace(/\.mdx$/, '')}`;
  const parts = parseCommand(file);
  const prefix = parts[0];
  if (!byPrefix[prefix]) byPrefix[prefix] = [];
  byPrefix[prefix].push({ file, docId, parts });
}

// Sort items within each group (parent command first, then subcommands alphabetically)
for (const key of Object.keys(byPrefix)) {
  byPrefix[key].sort((a, b) => {
    if (a.parts.length !== b.parts.length) return a.parts.length - b.parts.length;
    return a.file.localeCompare(b.file);
  });
}

// Main command order (from potctl --help)
const mainOrder = [
  'potctl', 'attach', 'completion', 'configure', 'connect', 'create', 'delete',
  'deploy', 'describe', 'detach', 'disconnect', 'exec', 'get', 'legacy', 'logs',
  'move', 'nats', 'prune', 'rebuild', 'rename', 'rollback', 'start', 'stop',
  'upgrade', 'version', 'view'
];

const cliItems = [];
for (const cmd of mainOrder) {
  const items = byPrefix[cmd];
  if (!items) continue;
  if (items.length === 1) {
    cliItems.push({
      type: 'doc',
      label: toLabel(items[0].parts),
      id: items[0].docId
    });
  } else {
    cliItems.push({
      type: 'category',
      label: cmd.charAt(0).toUpperCase() + cmd.slice(1),
      items: items.map(i => ({
        type: 'doc',
        label: toLabel(i.parts),
        id: i.docId
      }))
    });
  }
}

console.log(JSON.stringify(cliItems, null, 2));
