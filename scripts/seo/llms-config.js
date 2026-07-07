/** Doc IDs concatenated into llms-full.txt at build time. */
const LLMS_FULL_DOC_IDS = [
  'home/welcome',
  'home/migrating-to-v3-8',
  'getting-started/core-concepts',
  'getting-started/architecture',
  'getting-started/quick-start-local',
  'platform-deployment/introduction',
  'platform-deployment/embedded-oidc',
  'edgelet-management/introduction',
  'edgelet/introduction',
  'edgelet/installation',
  'edgeops-console/introduction',
  'reference-controller/overview',
  'reference-controller/rest-api',
  'yaml-references/reference-kinds',
  'yaml-references/reference-control-plane',
  'yaml-references/reference-agent',
  'platform-components/README',
  'tutorials/acme-smart-plant/overview',
  'security/introduction',
  'potctl/introduction',
];

module.exports = {
  LLMS_FULL_DOC_IDS,
};
