/**
 * Exact and prefix redirects for the reference section.
 * Used by docusaurus.config.ts and src/remark/remarkMovedDocLinks.ts.
 */

/** @type {[string, string][]} */
const FIELD_MOVES = [
  ['/learn/control-plane/kubernetes-fields', '/reference/yaml/kubernetes-control-plane'],
  ['/learn/control-plane/remote-fields', '/reference/yaml/remote-control-plane'],
  ['/learn/control-plane/local-fields', '/reference/yaml/local-control-plane'],
  ['/learn/edgelet-nodes/remote-fields', '/reference/yaml/agent'],
  ['/learn/edgelet-nodes/local-fields', '/reference/yaml/local-agent'],
  ['/learn/edgelet-nodes/agent-config-fields', '/reference/yaml/agent-config'],
  ['/learn/workloads/application-fields', '/reference/yaml/application'],
  ['/learn/workloads/microservice-fields', '/reference/yaml/microservice'],
  ['/learn/workloads/application-template-fields', '/reference/yaml/application-template'],
  ['/learn/workloads/microservice-template-fields', '/reference/yaml/microservice-template'],
  ['/learn/config/registry-fields', '/reference/yaml/registry'],
  ['/learn/config/catalog-fields', '/reference/yaml/catalog-item'],
  ['/learn/config/model-fields', '/reference/yaml/model'],
  ['/learn/config/knowledge-fields', '/reference/yaml/knowledge'],
  ['/learn/config/runtime-class-fields', '/reference/yaml/runtime-class'],
  ['/learn/config/config-map-fields', '/reference/yaml/config-map'],
  ['/learn/config/secret-fields', '/reference/yaml/secret'],
  ['/learn/config/certificate-authority-fields', '/reference/yaml/certificate-authority'],
  ['/learn/config/certificate-fields', '/reference/yaml/certificate'],
  ['/learn/config/volume-fields', '/reference/yaml/volume'],
  ['/learn/config/volume-mount-fields', '/reference/yaml/volume-mount'],
  ['/learn/config/offline-image-fields', '/reference/yaml/offline-image'],
  ['/learn/network/service-fields', '/reference/yaml/service'],
  ['/learn/message-bus/account-rule-fields', '/reference/yaml/nats-account-rule'],
  ['/learn/message-bus/user-rule-fields', '/reference/yaml/nats-user-rule'],
  ['/learn/access-control/role-fields', '/reference/yaml/role'],
  ['/learn/access-control/role-binding-fields', '/reference/yaml/role-binding'],
  ['/learn/access-control/service-account-fields', '/reference/yaml/service-account'],
];

/** @type {[string, string][]} */
const EXACT_PAIRS = [
  ['/reference/cluster-resources', '/reference'],
  ['/yaml-references', '/reference'],
  ['/yaml-references/reference-kinds', '/reference'],
  ['/yaml-references/reference-control-plane', '/reference'],
  ['/yaml-references/reference-agent', '/reference/yaml/agent'],
  ['/yaml-references/reference-application', '/reference/yaml/application'],
  ['/yaml-references/reference-application-template', '/reference/yaml/application-template'],
  ['/yaml-references/reference-registry', '/reference/yaml/registry'],
  ['/yaml-references/reference-catalog', '/reference/yaml/catalog-item'],
  ['/yaml-references/reference-offlineimage', '/reference/yaml/offline-image'],
  ['/yaml-references/reference-secret', '/reference/yaml/secret'],
  ['/yaml-references/reference-certificate', '/reference/yaml/certificate'],
  ['/yaml-references/reference-configmap', '/reference/yaml/config-map'],
  ['/yaml-references/reference-volumemount', '/reference/yaml/volume-mount'],
  ['/yaml-references/reference-service', '/reference/yaml/service'],
  ['/yaml-references/reference-roles', '/reference/yaml/role'],
  ['/yaml-references/reference-role-binding', '/reference/yaml/role-binding'],
  ['/yaml-references/reference-nats-account-rule', '/reference/yaml/nats-account-rule'],
  ['/yaml-references/reference-nats-user-rule', '/reference/yaml/nats-user-rule'],
  ['/yaml-references/reference-template-engine', '/reference/yaml/application-template'],
  ['/reference/yaml/template-engine', '/reference/yaml/application-template'],
  ['/yaml-references/reference-edge-resources', '/reference/documentation-archive'],
  ['/reference-controller', '/reference/controller/controller-config'],
  ['/reference-controller/overview', '/reference/controller/controller-config'],
  ['/reference-controller/configuration', '/reference/controller/controller-config'],
  ['/reference-controller/rest-api', '/api/v3.9.0/controller'],
  ['/reference-controller/cli-usage', '/get-started/cli/introduction'],
  ['/reference/controller', '/reference/controller/controller-config'],
  ['/reference/controller/overview', '/reference/controller/controller-config'],
  ['/reference/controller/configuration', '/reference/controller/controller-config'],
  ['/reference/controller/rest-api', '/api/v3.9.0/controller'],
  ['/reference/controller/cli-usage', '/get-started/cli/introduction'],
  ['/reference-microservices-catalog', '/reference'],
  ['/reference-microservices-catalog/hal', '/reference'],
  ['/reference-microservices-catalog/rest-blue', '/reference'],
  ['/reference-microservices-catalog/diagnostics', '/reference'],
  ['/reference-microservices-catalog/jsonrestapi', '/reference'],
  ['/reference-microservices-catalog/Proxus-IIoT', '/reference'],
  ['/reference/catalog', '/reference'],
  ['/reference/catalog/hal', '/reference'],
  ['/reference/catalog/rest-blue', '/reference'],
  ['/reference/catalog/diagnostics', '/reference'],
  ['/reference/catalog/jsonrestapi', '/reference'],
  ['/reference/catalog/Proxus-IIoT', '/reference'],
  ...FIELD_MOVES,
];

/** Old prefix, new prefix. Match the CLI trees only. */
const CLI_PREFIXES = [
  ['/potctl/cli', '/reference/cli/potctl'],
  ['/iofogctl/cli', '/reference/cli/iofogctl'],
  ['/edgelet/cli', '/reference/cli/edgelet'],
];

/** @type {Record<string, string>} */
const referenceExact = Object.fromEntries(EXACT_PAIRS);

/**
 * @param {string} normalized path without trailing slash
 * @returns {string | undefined}
 */
function rewriteCliPrefix(normalized) {
  for (const [from, to] of CLI_PREFIXES) {
    if (normalized === from || normalized.startsWith(`${from}/`)) {
      return to + normalized.slice(from.length);
    }
  }
  return undefined;
}

/**
 * createRedirects: existingPath is the new route. Return the old route.
 * @param {string} existingPath
 * @returns {string[] | undefined}
 */
function createReferenceRedirects(existingPath) {
  if (existingPath.length > 1 && existingPath.endsWith('/')) {
    return undefined;
  }
  const path = existingPath;
  for (const [from, to] of CLI_PREFIXES) {
    if (path === to || path.startsWith(`${to}/`)) {
      return [from + path.slice(to.length)];
    }
  }
  return undefined;
}

function toClientRedirects() {
  return EXACT_PAIRS.map(([from, to]) => ({from, to}));
}

module.exports = {
  FIELD_MOVES,
  EXACT_PAIRS,
  CLI_PREFIXES,
  referenceExact,
  rewriteCliPrefix,
  createReferenceRedirects,
  toClientRedirects,
};
