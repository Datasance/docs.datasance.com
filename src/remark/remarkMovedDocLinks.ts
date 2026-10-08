import type {Root} from 'mdast';
import type {Plugin} from 'unified';
import {visit} from 'unist-util-visit';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const {referenceExact, rewriteCliPrefix} = require('../../scripts/reference-moved-redirects.js') as {
  referenceExact: Record<string, string>;
  rewriteCliPrefix: (normalized: string) => string | undefined;
};

/**
 * Rewrite links that still use previous Get started, release-notes, and application paths.
 * Version snapshots keep those hrefs on disk. This runs at compile time so
 * absolute links follow the current pages, and the snapshot files stay unchanged.
 */

const EXACT: Record<string, string> = {
  '/potctl/introduction': '/get-started/cli/introduction',
  '/potctl/download': '/get-started/cli/download',
  '/potctl/getting-familiar': '/get-started/cli/getting-familiar',
  '/potctl/resource-management': '/get-started/cli/resource-management',
  '/potctl/connect-disconnect': '/get-started/cli/connect-disconnect',
  '/getting-started/welcome': '/get-started/welcome',
  '/getting-started/core-concepts': '/get-started/core-concepts',
  '/getting-started/architecture': '/get-started/architecture',
  '/getting-started/quick-start-local': '/get-started/quick-start-local',
  '/home/whats-new': '/release-notes/whats-new',
  '/upgrading-to-v3-9': '/release-notes/upgrading-to-v3-9',
  '/migrating-to-v3-8': '/release-notes/migrating-to-v3-8',
  '/applications': '/get-started/workloads',
  '/applications/introduction': '/get-started/workloads',
  '/applications/applications': '/get-started/workloads/applications',
  '/applications/application-templates': '/get-started/workloads/templates',
  '/applications/microservice-lifecycle-management': '/get-started/workloads/applications',
  '/applications/microservice-logs': '/get-started/workloads/applications',
  '/applications/microservice-move-rename': '/get-started/workloads/applications',
  '/applications/microservice-registry-catalog': '/get-started/workloads/registries',
  '/edgeops-console': '/get-started/edgeops-console',
  '/edgeops-console/introduction': '/get-started/edgeops-console',
  '/edgeops-console/configuration': '/get-started/edgeops-console/hosting',
  '/edgeops-console/features': '/get-started/edgeops-console',
  '/learn/platform/control-plane': '/learn/control-plane',
  '/learn/platform/control-plane-kubernetes-guide': '/learn/control-plane/kubernetes',
  '/learn/platform/control-plane-kubernetes-schema': '/reference/yaml/kubernetes-control-plane',
  '/learn/platform/control-plane-crd': '/learn/control-plane/kubernetes-crd',
  '/learn/platform/control-plane-remote-guide': '/learn/control-plane/remote',
  '/learn/platform/control-plane-remote-schema': '/reference/yaml/remote-control-plane',
  '/learn/platform/control-plane-remote-ha': '/learn/control-plane/remote-ha',
  '/learn/platform/control-plane-controller-add-on': '/learn/control-plane/controller-add-on',
  '/learn/platform/control-plane-local-guide': '/learn/control-plane/local',
  '/learn/platform/control-plane-local-schema': '/reference/yaml/local-control-plane',
  '/learn/operate/control-plane': '/learn/control-plane',
  '/learn/nodes/edgelet-nodes': '/learn/edgelet-nodes',
  '/learn/operate/nodes': '/learn/edgelet-nodes',
  '/edgelet/introduction': '/learn/edgelet',
  '/edgelet/architecture': '/learn/edgelet/architecture',
  '/edgelet/installation': '/learn/edgelet/installation',
  '/edgelet/deployment': '/learn/edgelet/deployment',
  '/edgelet/configuration': '/learn/edgelet/configuration',
  '/edgelet/configuration-reference': '/learn/edgelet/configuration',
  '/edgelet/troubleshooting': '/learn/edgelet/troubleshooting',
  '/edgelet/deploy-manifests': '/learn/edgelet/manifests',
  '/edgelet/container-engines': '/learn/edgelet/container-engines',
  '/edgelet/wasm-runtime': '/learn/edgelet/container-engines',
  '/edgelet/dns': '/learn/edgelet/dns',
  '/edgelet/volumes': '/learn/edgelet/volumes',
  '/edgelet/workload-continuity': '/learn/edgelet/workload-continuity',
  '/edgelet/control-plane': '/learn/edgelet/control-plane',
  '/edgelet/control-plane-microservice': '/learn/edgelet/control-plane',
  '/edgelet/exec-sessions': '/learn/edgelet/exec-sessions',
  '/edgelet/persistence': '/learn/edgelet/persistence',
  '/edgelet/logging': '/learn/edgelet/logging',
  '/edgelet/edgelet-api': '/learn/edgelet/api',
  '/learn/workloads/overview': '/learn/workloads',
  '/learn/operate/workloads': '/learn/workloads',
  '/learn/config/application-templates': '/learn/workloads/application-templates',
  '/learn/config/microservice-templates': '/learn/workloads/microservice-templates',
  '/learn/operate/config': '/learn/config',
  '/learn/operate/network': '/learn/network',
  '/learn/message-bus/overview': '/learn/message-bus',
  '/learn/operate/message-bus': '/learn/message-bus',
  '/learn/access-control/nats-account-rules': '/learn/message-bus/account-rules',
  '/learn/access-control/nats-user-rules': '/learn/message-bus/user-rules',
  '/learn/operate/access-control': '/learn/access-control',
  '/platform-components': '/learn/platform-components',
  '/platform-components/operator': '/learn/platform-components/operator',
  '/platform-components/router': '/learn/platform-components/router',
  '/platform-components/nats-server': '/learn/platform-components/nats-server',
  '/platform-components/sdk': '/learn/platform-components/sdk',
  '/platform-components/sdk/client': '/learn/platform-components/sdk/client',
  '/platform-components/sdk/microservices': '/learn/platform-components/sdk/microservices',
  '/platform-components/sdk/apps': '/learn/platform-components/sdk/apps',
  '/tutorials/acme-smart-plant/runbook': '/tutorials/acme-smart-plant',
  '/tutorials/acme-smart-plant/step-01-nats-user-rules': '/tutorials/acme-smart-plant/plant-user-rules',
  '/tutorials/acme-smart-plant/step-02-nats-account-export': '/tutorials/acme-smart-plant/account-export',
  '/tutorials/acme-smart-plant/step-03-application-production-monitoring':
    '/tutorials/acme-smart-plant/production-monitoring',
  '/tutorials/acme-smart-plant/step-04-copy-account-key': '/tutorials/acme-smart-plant/account-public-key',
  '/tutorials/acme-smart-plant/step-05-nats-account-import': '/tutorials/acme-smart-plant/account-import',
  '/tutorials/acme-smart-plant/step-06-service-diagnostic': '/tutorials/acme-smart-plant/diagnostic-service',
  '/tutorials/acme-smart-plant/step-07-note-bridge-port': '/tutorials/acme-smart-plant/diagnostic-bridge-port',
  '/tutorials/acme-smart-plant/step-08-application-operations-center': '/tutorials/acme-smart-plant/operations-center',
  '/tutorials/acme-smart-plant/step-09-service-alert-dashboard': '/tutorials/acme-smart-plant/alert-dashboard-service',
  '/tutorials/acme-smart-plant/step-11-nats-user-rules-vision': '/tutorials/edge-ai-wafer-defect/vision-user-rules',
  '/tutorials/acme-smart-plant/step-12-nats-account-vision': '/tutorials/edge-ai-wafer-defect/vision-account',
  '/tutorials/acme-smart-plant/step-13-application-vision-inspection': '/tutorials/edge-ai-wafer-defect/vision-inspection',
  '/tutorials/acme-smart-plant/step-14-service-snapshot': '/tutorials/edge-ai-wafer-defect/snapshot-service',
  '/tutorials/acme-smart-plant/step-15-snapshot-verify': '/tutorials/acme-smart-plant/fab-gallery-link',
  '/tutorials/edge-ai-wafer-defect/step-01-oci-registry': '/tutorials/edge-ai-wafer-defect/oci-registry',
  '/tutorials/edge-ai-wafer-defect/step-02-fleet-model-wafer-defect': '/tutorials/edge-ai-wafer-defect/wafer-defect-model',
  '/tutorials/edge-ai-wafer-defect/step-03-attach-model-edge-c': '/tutorials/edge-ai-wafer-defect/vision-inspection',
  '/tutorials/edge-ai-wafer-defect/step-04-vision-models-bind': '/tutorials/edge-ai-wafer-defect/vision-inspection',
};

/** Legacy console paths. Hashes are kept only when the destination page has that heading. */
const EDGEOPS_LEGACY = new Set([
  '/edgeops-console',
  '/edgeops-console/introduction',
  '/edgeops-console/configuration',
  '/edgeops-console/features',
]);

const DESTINATION_HEADINGS: Record<string, ReadonlySet<string>> = {
  '/get-started/edgeops-console': new Set([
    'sidebar',
    'workbench-tabs',
    'banners',
    'lists',
    'opening-a-detail-panel',
    'detail-panel',
    'header-icons',
    'bottom-drawer',
    'feedback',
  ]),
  '/get-started/edgeops-console/hosting': new Set([
    'public-url-and-listen-port',
    'runtime-controller-configjs',
    'fields-the-console-reads',
    'authentication',
    'tls-and-reverse-proxies',
  ]),
};

function keptHash(nextPath: string, hash: string, legacyPath: string): string {
  if (!EDGEOPS_LEGACY.has(legacyPath)) {
    return hash;
  }
  const id = hash.startsWith('#') ? hash.slice(1) : '';
  if (id && DESTINATION_HEADINGS[nextPath]?.has(id)) {
    return hash;
  }
  return '';
}

function embeddedLegacyPath(pathname: string): string | undefined {
  if (pathname.startsWith('/') || pathname.startsWith('#') || /^[a-z]+:/i.test(pathname)) {
    return undefined;
  }
  const match = pathname.match(
    /(?:^|\/)(yaml-references(?:\/[^?#]*)?|reference-controller(?:\/[^?#]*)?|reference-microservices-catalog(?:\/[^?#]*)?)/,
  );
  if (!match) {
    return undefined;
  }
  return `/${match[1].replace(/\/$/, '')}`;
}

function isIofogBuild(): boolean {
  return process.env.DOCUSAURUS_DISTRIBUTION === 'iofog';
}

/** Map a potctl CLI reference path onto the iofogctl pages included in an ioFog build. */
function flavorCliPath(pathname: string): string {
  if (!isIofogBuild()) {
    return pathname;
  }
  if (pathname !== '/reference/cli/potctl' && !pathname.startsWith('/reference/cli/potctl/')) {
    return pathname;
  }
  return pathname
    .replace('/reference/cli/potctl', '/reference/cli/iofogctl')
    .replace(/\/potctl(?=_|$)/g, '/iofogctl');
}

function rewritePathname(pathname: string): string {
  if (pathname.includes('../../platform-deployment/')) {
    return rewritePathname(pathname.replace('../../platform-deployment/', '/get-started/deploy/'));
  }
  if (pathname.includes('../../applications/')) {
    return rewritePathname(pathname.replace('../../applications/', '/applications/'));
  }

  if (isIofogBuild()) {
    const lifted = pathname.replace(/^(?:\.\.\/)+potctl\/cli(?=\/|$)/, '/potctl/cli');
    if (lifted !== pathname) {
      return rewritePathname(lifted);
    }
  }

  if (!pathname.startsWith('/') || /^\/v\d+\.\d+/.test(pathname)) {
    const embedded = embeddedLegacyPath(pathname);
    if (embedded) {
      const next = rewritePathname(embedded);
      if (next !== embedded) {
        return next;
      }
    }
    return pathname;
  }

  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;

  const cliPrefix = rewriteCliPrefix(normalized);
  if (cliPrefix) {
    return flavorCliPath(cliPrefix);
  }

  const flavored = flavorCliPath(normalized);
  if (flavored !== normalized) {
    return flavored;
  }

  if (referenceExact[normalized]) {
    return referenceExact[normalized];
  }

  if (
    normalized === '/platform-deployment/kubernetes-potctl' ||
    normalized.startsWith('/platform-deployment/kubernetes-potctl/')
  ) {
    return `/get-started/deploy/kubernetes-cli${normalized.slice('/platform-deployment/kubernetes-potctl'.length)}`;
  }
  if (
    normalized === '/platform-deployment/setup-your-agents' ||
    normalized.startsWith('/platform-deployment/setup-your-agents/')
  ) {
    return `/get-started/deploy/setup-edgelet-nodes${normalized.slice('/platform-deployment/setup-your-agents'.length)}`;
  }
  if (normalized === '/platform-deployment' || normalized.startsWith('/platform-deployment/')) {
    return `/get-started/deploy${normalized.slice('/platform-deployment'.length)}`;
  }
  if (normalized === '/edgelet-management' || normalized.startsWith('/edgelet-management/')) {
    return `/get-started/edgelet-nodes${normalized.slice('/edgelet-management'.length)}`;
  }

  return EXACT[normalized] ?? pathname;
}

export function rewriteMovedDocHref(url: string): string {
  if (!url || url.startsWith('#') || /^[a-z]+:/i.test(url)) {
    return url;
  }

  const hashAt = url.indexOf('#');
  const hash = hashAt >= 0 ? url.slice(hashAt) : '';
  const beforeHash = hashAt >= 0 ? url.slice(0, hashAt) : url;
  const queryAt = beforeHash.indexOf('?');
  const query = queryAt >= 0 ? beforeHash.slice(queryAt) : '';
  const pathname = queryAt >= 0 ? beforeHash.slice(0, queryAt) : beforeHash;
  const next = rewritePathname(pathname);
  if (next === pathname) {
    return url;
  }
  const legacyPath = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  return `${next}${query}${keptHash(next, hash, legacyPath)}`;
}

function rewriteHtmlHrefs(value: string): string {
  return value.replace(/href=(["'])([^"']+)\1/g, (full, quote, href) => {
    const next = rewriteMovedDocHref(href);
    return next === href ? full : `href=${quote}${next}${quote}`;
  });
}

const remarkMovedDocLinks: Plugin<[], Root> = () => (tree) => {
  visit(tree, (node) => {
    if ((node.type === 'link' || node.type === 'definition') && 'url' in node && typeof node.url === 'string') {
      node.url = rewriteMovedDocHref(node.url);
      return;
    }
    if (node.type === 'html' && 'value' in node && typeof node.value === 'string') {
      node.value = rewriteHtmlHrefs(node.value);
      return;
    }
    if (node.type !== 'mdxJsxFlowElement' && node.type !== 'mdxJsxTextElement') {
      return;
    }
    const attributes = 'attributes' in node && Array.isArray(node.attributes) ? node.attributes : [];
    for (const attr of attributes) {
      if (!attr || attr.type !== 'mdxJsxAttribute' || attr.name !== 'href') {
        continue;
      }
      if (typeof attr.value === 'string') {
        attr.value = rewriteMovedDocHref(attr.value);
      }
    }
  });
};

export default remarkMovedDocLinks;
