import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import { CLI_NAME, FLAVOR } from './src/config/distribution';

const cliSection = FLAVOR === 'datasance' ? 'potctl' : 'iofogctl';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Home',
      items: [
        { type: 'doc', label: 'Welcome', id: 'home/welcome' },
        { type: 'doc', label: "What's New", id: 'home/whats-new' },
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        { type: 'doc', label: 'Core Concepts', id: 'getting-started/core-concepts' },
        { type: 'doc', label: 'Architecture', id: 'getting-started/architecture' },
        {
          type: 'doc',
          label: 'Quick Start With Local Deployment',
          id: 'getting-started/quick-start-local',
        },
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        {
          type: 'category',
          label: 'Acme Smart Plant',
          link: {
            type: 'doc',
            id: 'tutorials/acme-smart-plant/overview',
          },
          items: [
            {
              type: 'doc',
              label: 'Operating the demo',
              id: 'tutorials/acme-smart-plant/runbook',
            },
            {
              type: 'doc',
              label: 'Step 1 - NATS user rules',
              id: 'tutorials/acme-smart-plant/step-01-nats-user-rules',
            },
            {
              type: 'doc',
              label: 'Step 2 - NATS account export',
              id: 'tutorials/acme-smart-plant/step-02-nats-account-export',
            },
            {
              type: 'doc',
              label: 'Step 3 - Production monitoring',
              id: 'tutorials/acme-smart-plant/step-03-application-production-monitoring',
            },
            {
              type: 'doc',
              label: 'Step 4 - Copy account key',
              id: 'tutorials/acme-smart-plant/step-04-copy-account-key',
            },
            {
              type: 'doc',
              label: 'Step 5 - NATS account import',
              id: 'tutorials/acme-smart-plant/step-05-nats-account-import',
            },
            {
              type: 'doc',
              label: 'Step 6 - Diagnostic Service',
              id: 'tutorials/acme-smart-plant/step-06-service-diagnostic',
            },
            {
              type: 'doc',
              label: 'Step 7 - Note bridge port',
              id: 'tutorials/acme-smart-plant/step-07-note-bridge-port',
            },
            {
              type: 'doc',
              label: 'Step 8 - Operations center',
              id: 'tutorials/acme-smart-plant/step-08-application-operations-center',
            },
            {
              type: 'doc',
              label: 'Step 9 - Alert dashboard Service',
              id: 'tutorials/acme-smart-plant/step-09-service-alert-dashboard',
            },
            {
              type: 'doc',
              label: 'Step 11 - Vision NATS user rules',
              id: 'tutorials/acme-smart-plant/step-11-nats-user-rules-vision',
            },
            {
              type: 'doc',
              label: 'Step 12 - Vision NATS account rule',
              id: 'tutorials/acme-smart-plant/step-12-nats-account-vision',
            },
            {
              type: 'doc',
              label: 'Step 13 - Vision inspection',
              id: 'tutorials/acme-smart-plant/step-13-application-vision-inspection',
            },
            {
              type: 'doc',
              label: 'Step 14 - Snapshot Service',
              id: 'tutorials/acme-smart-plant/step-14-service-snapshot',
            },
            {
              type: 'doc',
              label: 'Step 15 - Set SNAPSHOT_URL',
              id: 'tutorials/acme-smart-plant/step-15-snapshot-verify',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Platform Deployment',
      items: [
        { type: 'doc', label: 'Introduction', id: 'platform-deployment/introduction' },
        {
          type: 'doc',
          label: 'Embedded OIDC Authentication',
          id: 'platform-deployment/embedded-oidc',
        },
        {
          type: 'doc',
          label: 'External OIDC Authentication',
          id: 'platform-deployment/external-oidc',
        },
        {
          type: 'doc',
          label: 'Prepare Your Network',
          id: 'platform-deployment/prepare-your-network',
        },
        {
          type: 'doc',
          label: 'Prepare Your Remote Hosts',
          id: 'platform-deployment/prepare-your-remote-hosts',
        },
        {
          type: 'doc',
          label: 'Remote Control Plane',
          id: 'platform-deployment/remote-control-plane',
        },
        {
          type: 'doc',
          label: 'Kubernetes Prepare Cluster',
          id: 'platform-deployment/kubernetes-prepare-cluster',
        },
        {
          type: 'doc',
          label: 'External Database Deployment',
          id: 'platform-deployment/database',
        },
        {
          type: 'doc',
          label: `Kubernetes ${CLI_NAME}`,
          id: 'platform-deployment/kubernetes-potctl',
        },
        {
          type: 'doc',
          label: 'Kubernetes Helm',
          id: 'platform-deployment/kubernetes-helm',
        },
        {
          type: 'doc',
          label: 'Setup Edgelet Nodes',
          id: 'platform-deployment/setup-your-agents',
        },
        {
          type: 'doc',
          label: 'Airgap Deployment',
          id: 'platform-deployment/airgap-deployment',
        },
      ],
    },
    {
      type: 'category',
      label: 'Edgelet node management',
      link: {
        type: 'doc',
        id: 'edgelet-management/introduction',
      },
      items: [
        { type: 'doc', label: 'Introduction', id: 'edgelet-management/introduction' },
        {
          type: 'doc',
          label: 'Configuration updates',
          id: 'edgelet-management/configuration-updates',
        },
        { type: 'doc', label: 'Attach and detach', id: 'edgelet-management/attach-detach' },
        {
          type: 'doc',
          label: 'Volume distribution',
          id: 'edgelet-management/volume-distribution',
        },
        {
          type: 'doc',
          label: 'Image and disk pruning',
          id: 'edgelet-management/image-pruning',
        },
        {
          type: 'doc',
          label: 'Upgrade and rollback',
          id: 'edgelet-management/upgrade-rollback',
        },
        { type: 'doc', label: 'Reconcile platform', id: 'edgelet-management/reconcile' },
      ],
    },
    {
      type: 'category',
      label: 'Edgelet',
      items: [
        { type: 'doc', label: 'Introduction', id: 'edgelet/introduction' },
        { type: 'doc', label: 'Architecture', id: 'edgelet/architecture' },
        {
          type: 'category',
          label: 'Install & operate',
          collapsed: false,
          items: [
            { type: 'doc', label: 'Installation', id: 'edgelet/installation' },
            { type: 'doc', label: 'Configuration', id: 'edgelet/configuration' },
            {
              type: 'doc',
              label: 'Configuration reference',
              id: 'edgelet/configuration-reference',
            },
            { type: 'doc', label: 'Deployment', id: 'edgelet/deployment' },
            { type: 'doc', label: 'Troubleshooting', id: 'edgelet/troubleshooting' },
          ],
        },
        {
          type: 'category',
          label: 'Workloads',
          collapsed: false,
          items: [
            { type: 'doc', label: 'Deploy manifests', id: 'edgelet/deploy-manifests' },
            { type: 'doc', label: 'Container engines', id: 'edgelet/container-engines' },
            { type: 'doc', label: 'Wasm runtime', id: 'edgelet/wasm-runtime' },
            { type: 'doc', label: 'DNS & discovery', id: 'edgelet/dns' },
            { type: 'doc', label: 'Volumes', id: 'edgelet/volumes' },
            {
              type: 'doc',
              label: 'Workload continuity',
              id: 'edgelet/workload-continuity',
            },
          ],
        },
        {
          type: 'category',
          label: 'Local Controller',
          collapsed: false,
          items: [
            { type: 'doc', label: 'Control plane', id: 'edgelet/control-plane' },
            {
              type: 'doc',
              label: 'Control plane microservice',
              id: 'edgelet/control-plane-microservice',
            },
            { type: 'doc', label: 'Exec sessions', id: 'edgelet/exec-sessions' },
          ],
        },
        {
          type: 'category',
          label: 'Data & logs',
          collapsed: false,
          items: [
            { type: 'doc', label: 'Persistence', id: 'edgelet/persistence' },
            { type: 'doc', label: 'Logging', id: 'edgelet/logging' },
          ],
        },
        { type: 'doc', label: 'Edgelet API', id: 'edgelet/edgelet-api' },
        {
          type: 'category',
          label: 'CLI Reference',
          link: {
            type: 'doc',
            id: 'edgelet/cli/index',
          },
          items: [{ type: 'autogenerated', dirName: 'edgelet/cli' }],
        },
      ],
    },
    {
      type: 'category',
      label: 'EdgeOps Console',
      link: {
        type: 'doc',
        id: 'edgeops-console/introduction',
      },
      items: [
        { type: 'doc', label: 'Introduction', id: 'edgeops-console/introduction' },
        { type: 'doc', label: 'Configuration', id: 'edgeops-console/configuration' },
        { type: 'doc', label: 'Features', id: 'edgeops-console/features' },
      ],
    },
    {
      type: 'category',
      label: CLI_NAME,
      items: [
        { type: 'doc', label: 'Introduction', id: 'potctl/introduction' },
        { type: 'doc', label: 'Download', id: 'potctl/download' },
        { type: 'doc', label: 'Getting Familiar', id: 'potctl/getting-familiar' },
        { type: 'doc', label: 'Resource Management', id: 'potctl/resource-management' },
        { type: 'doc', label: 'Connect/Disconnect', id: 'potctl/connect-disconnect' },
        {
          type: 'category',
          label: 'CLI Reference',
          link: {
            type: 'doc',
            id: `${cliSection}/cli/${CLI_NAME}`,
          },
          items: [{ type: 'autogenerated', dirName: `${cliSection}/cli` }],
        },
      ],
    },
    {
      type: 'category',
      label: 'Application Management',
      items: [
        { type: 'doc', label: 'Introduction', id: 'applications/introduction' },
        { type: 'doc', label: 'Application Templates', id: 'applications/application-templates' },
        {
          type: 'doc',
          label: 'Microservice Lifecycle Management',
          id: 'applications/microservice-lifecycle-management',
        },
        { type: 'doc', label: 'Microservice Logs', id: 'applications/microservice-logs' },
        {
          type: 'doc',
          label: 'Microservice Move/Rename',
          id: 'applications/microservice-move-rename',
        },
        {
          type: 'doc',
          label: 'Microservice Registry Catalog',
          id: 'applications/microservice-registry-catalog',
        },
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: [
        { type: 'doc', label: 'Securing Cluster', id: 'security/introduction' },
        { type: 'doc', label: 'Roles', id: 'security/roles' },
        { type: 'doc', label: 'Role Bindings', id: 'security/role-bindings' },
        { type: 'doc', label: 'Certificates Manager', id: 'security/certificates-manager' },
        { type: 'doc', label: 'NATs Account Rule', id: 'security/nats-account-rule' },
        { type: 'doc', label: 'NATs User Rule', id: 'security/nats-user-rule' },
        { type: 'doc', label: 'NATs JWT Authentication', id: 'security/nats-jwt-authentication' },
      ],
    },
    {
      type: 'category',
      label: 'YAML References',
      items: [
        { type: 'doc', label: 'YAML Kinds', id: 'yaml-references/reference-kinds' },
        { type: 'doc', label: 'Control Plane', id: 'yaml-references/reference-control-plane' },
        { type: 'doc', label: 'Agent', id: 'yaml-references/reference-agent' },
        { type: 'doc', label: 'Application', id: 'yaml-references/reference-application' },
        {
          type: 'doc',
          label: 'Application Template',
          id: 'yaml-references/reference-application-template',
        },
        { type: 'doc', label: 'Registry', id: 'yaml-references/reference-registry' },
        { type: 'doc', label: 'Catalog', id: 'yaml-references/reference-catalog' },
        { type: 'doc', label: 'OfflineImage', id: 'yaml-references/reference-offlineimage' },
        { type: 'doc', label: 'Secret', id: 'yaml-references/reference-secret' },
        { type: 'doc', label: 'Certificate', id: 'yaml-references/reference-certificate' },
        { type: 'doc', label: 'ConfigMap', id: 'yaml-references/reference-configmap' },
        { type: 'doc', label: 'VolumeMount', id: 'yaml-references/reference-volumemount' },
        { type: 'doc', label: 'Service', id: 'yaml-references/reference-service' },
        { type: 'doc', label: 'Role', id: 'yaml-references/reference-roles' },
        { type: 'doc', label: 'RoleBinding', id: 'yaml-references/reference-role-binding' },
        {
          type: 'doc',
          label: 'NatsAccountRule',
          id: 'yaml-references/reference-nats-account-rule',
        },
        { type: 'doc', label: 'NatsUserRule', id: 'yaml-references/reference-nats-user-rule' },
      ],
    },
    {
      type: 'category',
      label: 'Controller',
      items: [
        { type: 'doc', label: 'Overview', id: 'reference-controller/overview' },
        { type: 'doc', label: 'Configuration', id: 'reference-controller/configuration' },
        { type: 'doc', label: 'REST API', id: 'reference-controller/rest-api' },
      ],
    },
    {
      type: 'category',
      label: 'Platform Components',
      link: {
        type: 'doc',
        id: 'platform-components/README',
      },
      items: [
        { type: 'doc', label: 'Operator', id: 'platform-components/operator' },
        { type: 'doc', label: 'Router', id: 'platform-components/router' },
        { type: 'doc', label: 'NATS Server', id: 'platform-components/nats-server' },
        {
          type: 'category',
          label: 'ioFog Go SDK',
          link: {
            type: 'doc',
            id: 'platform-components/sdk/overview',
          },
          items: [
            { type: 'doc', label: 'Client', id: 'platform-components/sdk/client' },
            { type: 'doc', label: 'Microservices', id: 'platform-components/sdk/microservices' },
            { type: 'doc', label: 'Apps', id: 'platform-components/sdk/apps' },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Catalog Microservices',
      items: [
        { type: 'doc', label: 'HAL', id: 'reference-microservices-catalog/hal' },
        { type: 'doc', label: 'REST Blue', id: 'reference-microservices-catalog/rest-blue' },
      ],
    },
  ],
};

export default sidebars;
