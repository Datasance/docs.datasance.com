#!/usr/bin/env node
/**
 * Sync control plane operator docs from potctl and iofog-operator into docs/learn/.
 * Run after upstream changes: npm run sync:controlplane-docs
 *
 * Sources (sibling repos, same layout as sync-cli-docs.js):
 *   ../../potctl/docs/operators/controlplane/
 *   ../../iofog-operator/docs/controlplane/
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DOCS_ROOT = path.join(__dirname, '..');
const POTCTL_ROOT = path.join(__dirname, '../../potctl');
const OPERATOR_ROOT = path.join(__dirname, '../../iofog-operator');

const SYNC_MARKER = '<!-- synced from upstream; run npm run sync:controlplane-docs -->\n';

/**
 * Hand-written Learn security pages. A later sync must not overwrite them.
 * `securing-cluster.mdx` is not a sync source. The other four used to be.
 */
const SKIP_DESTINATIONS = new Set([
  'docs/learn/security/securing-cluster.mdx',
  'docs/learn/security/control-plane-kubernetes-cli.mdx',
  'docs/learn/security/control-plane-kubernetes-operator.mdx',
  'docs/learn/security/control-plane-remote.mdx',
  'docs/learn/security/control-plane-local.mdx',
  'docs/learn/control-plane/kubernetes-fields.mdx',
  'docs/learn/control-plane/remote-fields.mdx',
  'docs/learn/control-plane/local-fields.mdx',
]);

/** @type {{ src: string; repo: 'potctl' | 'operator'; dest: string; title: string; description: string; keywords?: string[]; linkKind?: 'kubernetes' | 'remote' | 'local' }[]} */
const FILES = [
  {
    repo: 'potctl',
    src: 'docs/operators/controlplane/kubernetes/README.md',
    dest: 'docs/learn/control-plane/kubernetes.mdx',
    title: 'Kubernetes control plane (deploy guide)',
    description: 'KubernetesControlPlane deploy flow, CLI vs operator CR, and prerequisites on platform train v3.9.0.',
    keywords: ['kubernetes control plane', 'kubernetescontrolplane', 'operator', 'v3.9'],
    linkKind: 'kubernetes',
  },
  {
    repo: 'potctl',
    src: 'docs/operators/controlplane/kubernetes/schema.md',
    dest: 'docs/learn/control-plane/kubernetes-fields.mdx',
    title: 'KubernetesControlPlane schema',
    description: 'Field reference for KubernetesControlPlane deploy YAML (v3.9.x).',
    keywords: ['kubernetescontrolplane', 'yaml', 'schema', 'v3.9'],
    linkKind: 'kubernetes',
  },
  {
    repo: 'potctl',
    src: 'docs/operators/controlplane/remote/README.md',
    dest: 'docs/learn/control-plane/remote.mdx',
    title: 'Remote control plane (deploy guide)',
    description: 'Remote ControlPlane SSH deploy orchestration and global vs per-host spec (v3.9.x).',
    keywords: ['remote control plane', 'ssh', 'controlplane', 'v3.9'],
    linkKind: 'remote',
  },
  {
    repo: 'potctl',
    src: 'docs/operators/controlplane/remote/schema.md',
    dest: 'docs/learn/control-plane/remote-fields.mdx',
    title: 'Remote ControlPlane schema',
    description: 'Field reference for remote kind ControlPlane deploy YAML (v3.9.x).',
    keywords: ['remote control plane', 'yaml', 'schema', 'v3.9'],
    linkKind: 'remote',
  },
  {
    repo: 'potctl',
    src: 'docs/operators/controlplane/remote/multi-controller-ha.md',
    dest: 'docs/learn/control-plane/remote-ha.mdx',
    title: 'Remote multi-controller HA',
    description: 'Multi-host remote control plane, database requirements, and system agent ordering (v3.9.x).',
    keywords: ['high availability', 'remote control plane', 'database', 'v3.9'],
    linkKind: 'remote',
  },
  {
    repo: 'potctl',
    src: 'docs/operators/controlplane/remote/controller-add-on.md',
    dest: 'docs/learn/control-plane/controller-add-on.mdx',
    title: 'Controller add-on (remote)',
    description: 'Add a Controller host to an existing remote ControlPlane with kind Controller (v3.9.x).',
    keywords: ['controller add-on', 'remote control plane', 'v3.9'],
    linkKind: 'remote',
  },
  {
    repo: 'potctl',
    src: 'docs/operators/controlplane/local/README.md',
    dest: 'docs/learn/control-plane/local.mdx',
    title: 'Local control plane (deploy guide)',
    description: 'LocalControlPlane Edgelet deploy flow for dev and quick start (v3.9.x).',
    keywords: ['local control plane', 'localcontrolplane', 'edgelet', 'v3.9'],
    linkKind: 'local',
  },
  {
    repo: 'potctl',
    src: 'docs/operators/controlplane/local/schema.md',
    dest: 'docs/learn/control-plane/local-fields.mdx',
    title: 'LocalControlPlane schema',
    description: 'Field reference for LocalControlPlane deploy YAML (v3.9.x).',
    keywords: ['localcontrolplane', 'yaml', 'schema', 'v3.9'],
    linkKind: 'local',
  },
  {
    repo: 'operator',
    src: 'docs/controlplane/controlplane-crd.md',
    dest: 'docs/learn/control-plane/kubernetes-crd.mdx',
    title: 'ControlPlane CRD reference',
    description: 'Operator ControlPlane custom resource spec, status, and reconcile lifecycle (v3.9.x).',
    keywords: ['controlplane crd', 'operator', 'kubernetes', 'v3.9'],
  },
];

const EXAMPLE_FILES = [
  {
    src: 'docs/operators/controlplane/kubernetes/examples/minimal.yaml',
    dest: 'static/examples/controlplane/kubernetes/minimal.yaml',
  },
  {
    src: 'docs/operators/controlplane/kubernetes/examples/ingress.yaml',
    dest: 'static/examples/controlplane/kubernetes/ingress.yaml',
  },
  {
    src: 'docs/operators/controlplane/kubernetes/examples/controller-ingress.yaml',
    dest: 'static/examples/controlplane/kubernetes/controller-ingress.yaml',
  },
  {
    src: 'docs/operators/controlplane/local/examples/minimal.yaml',
    dest: 'static/examples/controlplane/local/minimal.yaml',
  },
  {
    src: 'docs/operators/controlplane/remote/examples/single-controller.yaml',
    dest: 'static/examples/controlplane/remote/single-controller.yaml',
  },
  {
    src: 'docs/operators/controlplane/remote/examples/multi-controller.yaml',
    dest: 'static/examples/controlplane/remote/multi-controller.yaml',
  },
  {
    src: 'docs/operators/controlplane/remote/examples/with-global-cas.yaml',
    dest: 'static/examples/controlplane/remote/with-global-cas.yaml',
  },
  {
    src: 'docs/operators/controlplane/remote/examples/controller-add-on.yaml',
    dest: 'static/examples/controlplane/remote/controller-add-on.yaml',
  },
];

const INTERNAL_LINKS = [
  {
    pattern: /https:\/\/github\.com\/eclipse-iofog\/iofog-operator\/blob\/main\/docs\/controlplane\/securing-cluster\.md/g,
    replace: '/learn/security/control-plane-kubernetes-operator',
  },
  {
    pattern: /https:\/\/github\.com\/eclipse-iofog\/iofog-operator\/blob\/main\/docs\/controlplane\/controlplane-crd\.md/g,
    replace: '/learn/control-plane/kubernetes-crd',
  },
  {
    pattern: /\]\(\.\/controlplane-crd\.md\)/g,
    replace: '](/learn/control-plane/kubernetes-crd)',
  },
  {
    pattern: /\]\(multi-controller-ha\.md\)/g,
    replace: '](/learn/control-plane/remote-ha)',
  },
  {
    pattern: /\]\(controller-add-on\.md\)/g,
    replace: '](/learn/control-plane/controller-add-on)',
  },
  {
    pattern: /\[iofog-operator securing guide\]\([^)]+\)/g,
    replace: '[Securing Kubernetes cluster (operator)](/learn/security/control-plane-kubernetes-operator)',
  },
  {
    pattern: /\[operator ControlPlane reference\]\([^)]+\)/g,
    replace: '[ControlPlane CRD reference](/learn/control-plane/kubernetes-crd)',
  },
  {
    pattern: /\[operator securing-cluster\]\([^)]+\)/g,
    replace: '[Securing Kubernetes cluster (operator)](/learn/security/control-plane-kubernetes-operator)',
  },
];

function repoRoot(repo) {
  return repo === 'potctl' ? POTCTL_ROOT : OPERATOR_ROOT;
}

const SCHEMA_BY_KIND = {
  kubernetes: '/reference/yaml/kubernetes-control-plane',
  remote: '/reference/yaml/remote-control-plane',
  local: '/reference/yaml/local-control-plane',
};

const SECURING_BY_KIND = {
  kubernetes: '/learn/security/control-plane-kubernetes-cli',
  remote: '/learn/security/control-plane-remote',
  local: '/learn/security/control-plane-local',
};

function transformBody(body, dest, linkKind) {
  let out = body;

  out = out.replace(/^# .+\n\n/, ''); // drop duplicate H1; frontmatter title is canonical

  out = out.replace(/apiVersion:\s*datasance\.com\/v3/g, 'apiVersion: {{API_VERSION}}');
  out = out.replace(/apiVersion:\s*iofog\.org\/v3/g, 'apiVersion: {{API_VERSION}}');
  out = out.replace(/ghcr\.io\/datasance\//g, '{{REGISTRY}}/');
  out = out.replace(/ghcr\.io\/eclipse-iofog\//g, '{{REGISTRY}}/');

  for (const {pattern, replace} of INTERNAL_LINKS) {
    out = out.replace(pattern, replace);
  }

  out = out.replace(/\]\(\.\/controlplane-crd\.md([^)]*)\)/g, '](/learn/control-plane/kubernetes-crd$1)');
  out = out.replace(/\]\(controlplane-crd\.md([^)]*)\)/g, '](/learn/control-plane/kubernetes-crd$1)');
  out = out.replace(/\]\(\.\/securing-cluster\.md([^)]*)\)/g, '](/learn/security/control-plane-kubernetes-operator$1)');
  out = out.replace(/\]\(securing-cluster\.md([^)]*)\)/g, (match, hash) => {
    if (dest.includes('control-plane-kubernetes-operator') || dest.includes('control-plane-crd')) {
      return `](/learn/security/control-plane-kubernetes-operator${hash})`;
    }
    if (linkKind && SECURING_BY_KIND[linkKind]) {
      return `](${SECURING_BY_KIND[linkKind]}${hash})`;
    }
    return `](/learn/security/control-plane-kubernetes-operator${hash})`;
  });
  out = out.replace(/\]\(schema\.md([^)]*)\)/g, (match, hash) => {
    if (linkKind && SCHEMA_BY_KIND[linkKind]) {
      return `](${SCHEMA_BY_KIND[linkKind]}${hash})`;
    }
    return match;
  });
  out = out.replace(/\]\(multi-controller-ha\.md([^)]*)\)/g, '](/learn/control-plane/remote-ha$1)');
  out = out.replace(/\]\(controller-add-on\.md([^)]*)\)/g, '](/learn/control-plane/controller-add-on$1)');
  out = out.replace(/\]\(examples\/\)/g, '](/examples/controlplane/)');
  out = out.replace(/\]\(examples\/([^)]+)\)/g, (match, file) => {
    if (linkKind === 'kubernetes') {
      return `](/examples/controlplane/kubernetes/${file})`;
    }
    if (linkKind === 'remote') {
      return `](/examples/controlplane/remote/${file})`;
    }
    if (linkKind === 'local') {
      return `](/examples/controlplane/local/${file})`;
    }
    return `](/examples/controlplane/${file})`;
  });
  out = out.replace(/\]\(\/learn\/platform\/control-plane-remote-ha\)/g, '](/learn/control-plane/remote-ha)');
  out = out.replace(/\]\(\/learn\/platform\/control-plane-controller-add-on\)/g, '](/learn/control-plane/controller-add-on)');

  out = out.replace(/\bpotctl \/ iofogctl\b/gi, '{CLI_NAME}');
  out = out.replace(/\biofogctl \/ potctl\b/gi, '{CLI_NAME}');
  out = out.replace(/\bpotctl\b/g, '{CLI_NAME}');
  out = out.replace(/\biofogctl\b/g, '{CLI_NAME}');
  out = out.replace(/\*\*{CLI_NAME} \/ {CLI_NAME}\*\*/g, '**{CLI_NAME}**');
  out = out.replace(/\{CLI_NAME} \/ {CLI_NAME}/g, '{CLI_NAME}');

  out = out.replace(/```mermaid[\s\S]*?```/g, (block) => block.replace(/\{CLI_NAME\}/g, 'CLI'));

  out = out.replace(/\/learn\/security\/control-plane\/kubernetes-operator/g, '/learn/security/control-plane-kubernetes-operator');
  out = out.replace(/\/learn\/security\/control-plane\/kubernetes-cli/g, '/learn/security/control-plane-kubernetes-cli');
  out = out.replace(/\/learn\/platform\/control-plane\/kubernetes-schema/g, '/reference/yaml/kubernetes-control-plane');
  out = out.replace(/\/learn\/platform\/control-plane\/remote-schema/g, '/reference/yaml/remote-control-plane');
  out = out.replace(/\/learn\/platform\/control-plane\/local-schema/g, '/reference/yaml/local-control-plane');

  out = out.replace(/\]\(\/examples\/controlplane\/\)/g, () => {
    if (linkKind === 'kubernetes') {
      return '](/examples/controlplane/kubernetes/minimal.yaml)';
    }
    if (linkKind === 'remote') {
      return '](/examples/controlplane/remote/single-controller.yaml)';
    }
    if (linkKind === 'local') {
      return '](/examples/controlplane/local/minimal.yaml)';
    }
    return '](/examples/controlplane/kubernetes/minimal.yaml)';
  });

  return out.trim() + '\n';
}

const MDX_IMPORT =
  "import {CLI_NAME, REGISTRY} from '@site/src/config/distribution';\nimport EditPageAdmonition from '@site/src/components/EditPageAdmonition';\n\n";

function buildFrontmatter(entry) {
  const lines = ['---'];
  lines.push(`title: ${entry.title}`);
  lines.push(`description: ${entry.description}`);
  if (entry.keywords?.length) {
    lines.push(`keywords: [${entry.keywords.map((k) => JSON.stringify(k)).join(', ')}]`);
  }
  lines.push('---');
  lines.push('');
  return lines.join('\n');
}

function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

function main() {
  const manifest = {};
  let count = 0;

  for (const entry of FILES) {
    if (SKIP_DESTINATIONS.has(entry.dest)) {
      console.log(`  skip ${entry.dest}`);
      continue;
    }

    const srcPath = path.join(repoRoot(entry.repo), entry.src);
    const destPath = path.join(DOCS_ROOT, entry.dest);

    if (!fs.existsSync(srcPath)) {
      console.error(`Missing source: ${srcPath}`);
      process.exit(1);
    }

    const raw = fs.readFileSync(srcPath, 'utf8');
    const body = transformBody(raw, entry.dest, entry.linkKind);
    const content =
      buildFrontmatter(entry) + MDX_IMPORT + SYNC_MARKER + body + '\n<EditPageAdmonition />\n';

    fs.mkdirSync(path.dirname(destPath), {recursive: true});
    fs.writeFileSync(destPath, content, 'utf8');
    manifest[entry.dest] = sha256(raw);
    console.log(`  ${entry.dest}`);
    count += 1;
  }

  const manifestPath = path.join(DOCS_ROOT, 'docs/learn/.controlplane-sync-manifest.json');
  fs.writeFileSync(
    manifestPath,
    JSON.stringify({generatedAt: new Date().toISOString(), sources: manifest}, null, 2) + '\n',
    'utf8',
  );

  let exampleCount = 0;
  for (const ex of EXAMPLE_FILES) {
    const srcPath = path.join(POTCTL_ROOT, ex.src);
    const destPath = path.join(DOCS_ROOT, ex.dest);
    if (!fs.existsSync(srcPath)) {
      console.error(`Missing example: ${srcPath}`);
      process.exit(1);
    }
    let yaml = fs.readFileSync(srcPath, 'utf8');
    yaml = yaml.replace(/apiVersion:\s*datasance\.com\/v3/g, 'apiVersion: {{API_VERSION}}');
    yaml = yaml.replace(/ghcr\.io\/datasance\//g, '{{REGISTRY}}/');
    fs.mkdirSync(path.dirname(destPath), {recursive: true});
    fs.writeFileSync(destPath, yaml, 'utf8');
    exampleCount += 1;
  }

  console.log(
    `\nsync-controlplane-docs: ${count} docs, ${exampleCount} examples, manifest ${manifestPath}`,
  );
}

main();
