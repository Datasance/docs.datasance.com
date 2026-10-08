/**
 * Sidebar blocks.
 * buildVersion380Sidebars and the helpers it calls keep the v3.8.0 doc ids.
 * The V39 builders are the current tree.
 */

export type SidebarItem = Record<string, unknown>;

export function buildGetToKnowEdgeletItems(): SidebarItem[] {
  return [
    {type: 'doc', label: 'Introduction', id: 'edgelet/introduction'},
    {type: 'doc', label: 'Architecture', id: 'edgelet/architecture'},
    {
      type: 'category',
      label: 'Install & operate',
      collapsed: false,
      items: [
        {type: 'doc', label: 'Installation', id: 'edgelet/installation'},
        {type: 'doc', label: 'Configuration', id: 'edgelet/configuration'},
        {type: 'doc', label: 'Configuration reference', id: 'edgelet/configuration-reference'},
        {type: 'doc', label: 'Deployment', id: 'edgelet/deployment'},
        {type: 'doc', label: 'Troubleshooting', id: 'edgelet/troubleshooting'},
      ],
    },
    {
      type: 'category',
      label: 'Workloads',
      collapsed: false,
      items: [
        {type: 'doc', label: 'Deploy manifests', id: 'edgelet/deploy-manifests'},
        {type: 'doc', label: 'Container engines', id: 'edgelet/container-engines'},
        {type: 'doc', label: 'Wasm runtime', id: 'edgelet/wasm-runtime'},
        {type: 'doc', label: 'DNS & discovery', id: 'edgelet/dns'},
        {type: 'doc', label: 'Volumes', id: 'edgelet/volumes'},
        {type: 'doc', label: 'Workload continuity', id: 'edgelet/workload-continuity'},
      ],
    },
    {
      type: 'category',
      label: 'Local Controller',
      collapsed: false,
      items: [
        {type: 'doc', label: 'Control plane', id: 'edgelet/control-plane'},
        {type: 'doc', label: 'Control plane microservice', id: 'edgelet/control-plane-microservice'},
        {type: 'doc', label: 'Exec sessions', id: 'edgelet/exec-sessions'},
      ],
    },
    {
      type: 'category',
      label: 'Data & logs',
      collapsed: false,
      items: [
        {type: 'doc', label: 'Persistence', id: 'edgelet/persistence'},
        {type: 'doc', label: 'Logging', id: 'edgelet/logging'},
      ],
    },
    {type: 'doc', label: 'Edgelet API', id: 'edgelet/edgelet-api'},
  ];
}

export function buildGetToKnowEdgeletCategory(): SidebarItem {
  return {
    type: 'category',
    label: 'Get to know Edgelet',
    link: {type: 'doc', id: 'edgelet/introduction'},
    items: buildGetToKnowEdgeletItems(),
  };
}

export function buildGetToKnowEdgeletCategoryV39(): SidebarItem {
  return {
    type: 'category',
    label: 'Get to know Edgelet',
    link: {type: 'doc', id: 'learn/edgelet/overview'},
    items: [
      {type: 'doc', label: 'Architecture', id: 'learn/edgelet/architecture'},
      {
        type: 'category',
        label: 'Install and operate',
        collapsed: false,
        items: [
          {type: 'doc', label: 'Installation', id: 'learn/edgelet/installation'},
          {type: 'doc', label: 'Deployment', id: 'learn/edgelet/deployment'},
          {type: 'doc', label: 'Configuration', id: 'learn/edgelet/configuration'},
          {type: 'doc', label: 'Init systems', id: 'learn/edgelet/init-systems'},
          {type: 'doc', label: 'Troubleshooting', id: 'learn/edgelet/troubleshooting'},
        ],
      },
      {
        type: 'category',
        label: 'Engines',
        collapsed: true,
        items: [
          {type: 'doc', label: 'Container engines', id: 'learn/edgelet/container-engines'},
          {type: 'doc', label: 'Engine lifecycle', id: 'learn/edgelet/engine-lifecycle'},
          {type: 'doc', label: 'cgroups', id: 'learn/edgelet/cgroups'},
          {type: 'doc', label: 'DNS', id: 'learn/edgelet/dns'},
        ],
      },
      {
        type: 'category',
        label: 'Workloads on the engine',
        collapsed: true,
        items: [
          {type: 'doc', label: 'Manifests', id: 'learn/edgelet/manifests'},
          {type: 'doc', label: 'Models', id: 'learn/edgelet/models'},
          {type: 'doc', label: 'Knowledge', id: 'learn/edgelet/knowledge'},
          {type: 'doc', label: 'OCI artifacts', id: 'learn/edgelet/oci-artifacts'},
          {type: 'doc', label: 'Volumes', id: 'learn/edgelet/volumes'},
          {type: 'doc', label: 'Workload continuity', id: 'learn/edgelet/workload-continuity'},
          {type: 'doc', label: 'Workload metadata', id: 'learn/edgelet/workload-metadata'},
        ],
      },
      {
        type: 'category',
        label: 'On the node',
        collapsed: true,
        items: [
          {type: 'doc', label: 'Local control plane', id: 'learn/edgelet/control-plane'},
          {type: 'doc', label: 'Exec sessions', id: 'learn/edgelet/exec-sessions'},
          {type: 'doc', label: 'EdgeGuard', id: 'learn/edgelet/edgeguard'},
          {type: 'doc', label: 'Logging', id: 'learn/edgelet/logging'},
          {type: 'doc', label: 'Persistence', id: 'learn/edgelet/persistence'},
        ],
      },
      {type: 'doc', label: 'Edgelet API', id: 'learn/edgelet/api'},
      {type: 'doc', label: 'API RBAC', id: 'learn/edgelet/api-rbac'},
      {
        type: 'category',
        label: 'Modules',
        collapsed: true,
        items: [
          {type: 'doc', label: 'Overview', id: 'learn/edgelet/modules/overview'},
          {type: 'doc', label: 'Supervisor', id: 'learn/edgelet/modules/supervisor'},
          {type: 'doc', label: 'Store', id: 'learn/edgelet/modules/store'},
          {type: 'doc', label: 'Engines', id: 'learn/edgelet/modules/engines'},
          {type: 'doc', label: 'Process manager', id: 'learn/edgelet/modules/processmanager'},
          {type: 'doc', label: 'Network', id: 'learn/edgelet/modules/network'},
          {type: 'doc', label: 'DNS resolver', id: 'learn/edgelet/modules/dnsresolver'},
          {type: 'doc', label: 'Volume mount', id: 'learn/edgelet/modules/volumemount'},
          {type: 'doc', label: 'Edgelet API', id: 'learn/edgelet/modules/edgeletapi'},
          {type: 'doc', label: 'Auth', id: 'learn/edgelet/modules/auth'},
          {type: 'doc', label: 'Control plane', id: 'learn/edgelet/modules/controlplane'},
          {type: 'doc', label: 'EdgeGuard', id: 'learn/edgelet/modules/edgeguard'},
          {type: 'doc', label: 'Pruning', id: 'learn/edgelet/modules/pruning'},
          {type: 'doc', label: 'Resource manager', id: 'learn/edgelet/modules/resourcemanager'},
          {type: 'doc', label: 'Resource consumption', id: 'learn/edgelet/modules/resourceconsumption'},
          {type: 'doc', label: 'Status reporter', id: 'learn/edgelet/modules/statusreporter'},
          {type: 'doc', label: 'Field agent', id: 'learn/edgelet/modules/fieldagent'},
          {type: 'doc', label: 'Health check', id: 'learn/edgelet/modules/healthcheck'},
          {type: 'doc', label: 'GPS', id: 'learn/edgelet/modules/gps'},
          {type: 'doc', label: 'Proxy', id: 'learn/edgelet/modules/proxy'},
          {type: 'doc', label: 'Runtime API', id: 'learn/edgelet/modules/runtimeapi'},
          {type: 'doc', label: 'Service account', id: 'learn/edgelet/modules/serviceaccount'},
        ],
      },
    ],
  };
}

export function buildApplicationManagementCategory(): SidebarItem {
  return {
    type: 'category',
    label: 'Application Management',
    items: [
      {type: 'doc', label: 'Introduction', id: 'applications/introduction'},
      {type: 'doc', label: 'Application Templates', id: 'applications/application-templates'},
      {
        type: 'doc',
        label: 'Microservice Lifecycle Management',
        id: 'applications/microservice-lifecycle-management',
      },
      {type: 'doc', label: 'Microservice Logs', id: 'applications/microservice-logs'},
      {type: 'doc', label: 'Microservice Move/Rename', id: 'applications/microservice-move-rename'},
      {
        type: 'doc',
        label: 'Microservice Registry Catalog',
        id: 'applications/microservice-registry-catalog',
      },
    ],
  };
}

export function buildCliGuidesCategory(cliName: string): SidebarItem {
  return {
    type: 'category',
    label: cliName,
    items: [
      {type: 'doc', label: 'Introduction', id: 'potctl/introduction'},
      {type: 'doc', label: 'Download', id: 'potctl/download'},
      {type: 'doc', label: 'Getting Familiar', id: 'potctl/getting-familiar'},
      {type: 'doc', label: 'Resource Management', id: 'potctl/resource-management'},
      {type: 'doc', label: 'Connect/Disconnect', id: 'potctl/connect-disconnect'},
    ],
  };
}

export function buildPlatformDeploymentCategory(cliName: string): SidebarItem {
  return {
    type: 'category',
    label: 'Platform Deployment',
    // link: {type: 'doc', id: 'platform-deployment/introduction'},
    items: [
      {type: 'doc', label: 'Introduction', id: 'platform-deployment/introduction'},
      {type: 'doc', label: 'Embedded OIDC Authentication', id: 'platform-deployment/embedded-oidc'},
      {type: 'doc', label: 'External OIDC Authentication', id: 'platform-deployment/external-oidc'},
      {type: 'doc', label: 'External OIDC Providers', id: 'platform-deployment/external-oidc-providers'},
      {type: 'doc', label: 'Prepare Your Network', id: 'platform-deployment/prepare-your-network'},
      {type: 'doc', label: 'Prepare Your Remote Hosts', id: 'platform-deployment/prepare-your-remote-hosts'},
      {type: 'doc', label: 'Remote Control Plane', id: 'platform-deployment/remote-control-plane'},
      {type: 'doc', label: 'Kubernetes Prepare Cluster', id: 'platform-deployment/kubernetes-prepare-cluster'},
      {type: 'doc', label: 'External Database Deployment', id: 'platform-deployment/database'},
      {type: 'doc', label: `Kubernetes ${cliName}`, id: 'platform-deployment/kubernetes-potctl'},
      {type: 'doc', label: 'Kubernetes Helm', id: 'platform-deployment/kubernetes-helm'},
      {type: 'doc', label: 'Setup Edgelet Nodes', id: 'platform-deployment/setup-your-agents'},
      {type: 'doc', label: 'Airgap Deployment', id: 'platform-deployment/airgap-deployment'},
    ],
  };
}

export function buildEdgeletManagementCategory(): SidebarItem {
  return {
    type: 'category',
    label: 'Edgelet node management',
    // link: {type: 'doc', id: 'edgelet-management/introduction'},
    items: [
      {type: 'doc', label: 'Introduction', id: 'edgelet-management/introduction'},
      {type: 'doc', label: 'Configuration updates', id: 'edgelet-management/configuration-updates'},
      {type: 'doc', label: 'EdgeGuard', id: 'edgelet-management/edgeguard'},
      {type: 'doc', label: 'Attach and detach', id: 'edgelet-management/attach-detach'},
      {type: 'doc', label: 'Volume distribution', id: 'edgelet-management/volume-distribution'},
      {type: 'doc', label: 'Image and disk pruning', id: 'edgelet-management/image-pruning'},
      {type: 'doc', label: 'Upgrade and rollback', id: 'edgelet-management/upgrade-rollback'},
      {type: 'doc', label: 'Reconcile platform', id: 'edgelet-management/reconcile'},
      {type: 'doc', label: 'Debugging', id: 'edgelet-management/debugging'},
    ],
  };
}

export function buildEdgeOpsConsoleCategory(): SidebarItem {
  return {
    type: 'category',
    label: 'EdgeOps Console',
    link: {type: 'doc', id: 'edgeops-console/introduction'},
    items: [
      {type: 'doc', label: 'Introduction', id: 'edgeops-console/introduction'},
      {type: 'doc', label: 'Configuration', id: 'edgeops-console/configuration'},
      {type: 'doc', label: 'Features', id: 'edgeops-console/features'},
    ],
  };
}

export function buildEdgeOpsConsoleCategoryV39(): SidebarItem {
  return {
    type: 'category',
    label: 'EdgeOps Console',
    link: {type: 'doc', id: 'get-started/edgeops-console/shell'},
    items: [
      // {type: 'doc', label: 'Reach the console', id: 'get-started/edgeops-console/hosting'},
      {type: 'doc', label: 'Overview', id: 'get-started/edgeops-console/overview'},
      {type: 'doc', label: 'Nodes', id: 'get-started/edgeops-console/nodes'},
      {type: 'doc', label: 'Workloads', id: 'get-started/edgeops-console/workloads'},
      {
        type: 'doc',
        label: 'Catalog and templates',
        id: 'get-started/edgeops-console/catalog-and-templates',
      },
      {type: 'doc', label: 'Configuration', id: 'get-started/edgeops-console/configuration'},
      {type: 'doc', label: 'Network', id: 'get-started/edgeops-console/network'},
      {type: 'doc', label: 'Message bus', id: 'get-started/edgeops-console/message-bus'},
      {type: 'doc', label: 'Access control', id: 'get-started/edgeops-console/access-control'},
      {type: 'doc', label: 'Identity and sign-in', id: 'get-started/edgeops-console/identity'},
      {type: 'doc', label: 'Events and API', id: 'get-started/edgeops-console/events'},
      {type: 'doc', label: 'YAML uploader', id: 'get-started/edgeops-console/yaml-uploader'},
    ],
  };
}

export function buildLearnPlatformComponentsCategory(): SidebarItem {
  return {
    type: 'category',
    label: 'Platform components',
    link: {type: 'doc', id: 'learn/platform-components/overview'},
    items: [
      {
        type: 'category',
        label: 'Operator',
        link: {type: 'doc', id: 'learn/platform-components/operator'},
        items: [
          {type: 'doc', label: 'How the operator works', id: 'learn/platform-components/operator/how-it-works'},
          {type: 'doc', label: 'ControlPlane CRD', id: 'learn/platform-components/operator/controlplane-crd'},
          {type: 'doc', label: 'Router and NATS', id: 'learn/platform-components/operator/router-and-nats'},
          {
            type: 'doc',
            label: 'Securing the cluster',
            id: 'learn/security/control-plane-kubernetes-operator',
          },
        ],
      },
      {type: 'doc', label: 'Router', id: 'learn/platform-components/router'},
      {type: 'doc', label: 'NATS Server', id: 'learn/platform-components/nats-server'},
      {
        type: 'category',
        label: 'Go SDK',
        link: {type: 'doc', id: 'learn/platform-components/sdk/overview'},
        items: [
          {type: 'doc', label: 'Getting started', id: 'learn/platform-components/sdk/getting-started'},
          {type: 'doc', label: 'Packages', id: 'learn/platform-components/sdk/packages'},
          {type: 'doc', label: 'Security model', id: 'learn/platform-components/sdk/security'},
          {type: 'doc', label: 'Messaging', id: 'learn/platform-components/sdk/messaging'},
          {type: 'doc', label: 'Controller client', id: 'learn/platform-components/sdk/controller-client'},
          {type: 'doc', label: 'Deploy YAML', id: 'learn/platform-components/sdk/deploy-yaml'},
          {type: 'doc', label: 'Edge microservice', id: 'learn/platform-components/sdk/edge-microservice'},
          {type: 'doc', label: 'Exec and logs', id: 'learn/platform-components/sdk/exec-and-logs'},
          {type: 'doc', label: 'Fleet resources', id: 'learn/platform-components/sdk/fleet-resources'},
          {type: 'doc', label: 'Client', id: 'learn/platform-components/sdk/client'},
          {type: 'doc', label: 'Microservices', id: 'learn/platform-components/sdk/microservices'},
          {type: 'doc', label: 'Apps', id: 'learn/platform-components/sdk/apps'},
          {type: 'doc', label: 'NATS', id: 'learn/platform-components/sdk/nats'},
          {type: 'doc', label: 'Kubernetes helpers', id: 'learn/platform-components/sdk/kubernetes'},
          {type: 'doc', label: 'Architecture codes', id: 'learn/platform-components/sdk/codes'},
          {type: 'doc', label: 'Errors', id: 'learn/platform-components/sdk/errors'},
        ],
      },
    ],
  };
}

export function buildLearnSecurityCategory(): SidebarItem {
  return {
    type: 'category',
    label: 'Security',
    link: {type: 'doc', id: 'learn/security/securing-cluster'},
    items: [
      {
        type: 'category',
        label: 'Control plane TLS',
        collapsed: true,
        items: [
          {type: 'doc', label: 'Kubernetes (CLI YAML)', id: 'learn/security/control-plane-kubernetes-cli'},
          {type: 'doc', label: 'Kubernetes (operator)', id: 'learn/security/control-plane-kubernetes-operator'},
          {type: 'doc', label: 'Remote', id: 'learn/security/control-plane-remote'},
          {type: 'doc', label: 'Local', id: 'learn/security/control-plane-local'},
        ],
      },
    ],
  };
}

export function buildLearnConfigureOperateItems(includeV39Only: boolean): SidebarItem[] {
  const configItems: SidebarItem[] = [
    {type: 'doc', label: 'Registries', id: 'learn/config/registries'},
    {type: 'doc', label: 'Catalog microservices', id: 'learn/config/catalog-microservices'},
  ];
  if (includeV39Only) {
    configItems.push(
      {type: 'doc', label: 'AI Model Catalog', id: 'learn/config/ai-model-catalog'},
      {type: 'doc', label: 'AI Knowledge Catalog', id: 'learn/config/ai-knowledge-catalog'},
      {type: 'doc', label: 'Runtime classes', id: 'learn/config/runtime-classes'},
    );
  }
  configItems.push(
    {type: 'doc', label: 'Config maps', id: 'learn/config/config-maps'},
    {type: 'doc', label: 'Secrets', id: 'learn/config/secrets'},
    {type: 'doc', label: 'Certificate authorities', id: 'learn/config/certificate-authorities'},
    {type: 'doc', label: 'Certificates', id: 'learn/config/certificates'},
    {type: 'doc', label: 'Volumes', id: 'learn/config/volumes'},
    {type: 'doc', label: 'Volume mounts', id: 'learn/config/volume-mounts'},
    {type: 'doc', label: 'Offline images', id: 'learn/config/offline-images'},
  );

  return [
    {
      type: 'category',
      label: 'Configure',
      items: [
        {
          type: 'category',
          label: 'Control plane',
          link: {type: 'doc', id: 'learn/control-plane/overview'},
          items: [
            {type: 'doc', label: 'Kubernetes', id: 'learn/control-plane/kubernetes'},
            {type: 'doc', label: 'ControlPlane CRD', id: 'learn/control-plane/kubernetes-crd'},
            {type: 'doc', label: 'Remote', id: 'learn/control-plane/remote'},
            {type: 'doc', label: 'Multi-controller HA', id: 'learn/control-plane/remote-ha'},
            {type: 'doc', label: 'Controller add-on', id: 'learn/control-plane/controller-add-on'},
            {type: 'doc', label: 'Local', id: 'learn/control-plane/local'},
          ],
        },
        {
          type: 'category',
          label: 'Edgelet nodes',
          link: {type: 'doc', id: 'learn/edgelet-nodes/overview'},
          items: [
            {type: 'doc', label: 'Remote node', id: 'learn/edgelet-nodes/remote'},
            {type: 'doc', label: 'Local node', id: 'learn/edgelet-nodes/local'},
            {type: 'doc', label: 'AgentConfig', id: 'learn/edgelet-nodes/agent-config'},
            {type: 'doc', label: 'Bootstrap', id: 'learn/edgelet-nodes/bootstrap'},
            {type: 'doc', label: 'Lifecycle', id: 'learn/edgelet-nodes/lifecycle'},
            {type: 'doc', label: 'Networking', id: 'learn/edgelet-nodes/networking'},
            {type: 'doc', label: 'Router fabric', id: 'learn/edgelet-nodes/router-fabric'},
            {type: 'doc', label: 'NATS fabric', id: 'learn/edgelet-nodes/nats-fabric'},
          ],
        },
        {
          type: 'category',
          label: 'Workloads',
          link: {type: 'doc', id: 'learn/workloads/overview'},
          items: [
            {type: 'doc', label: 'Applications', id: 'learn/workloads/applications'},
            {type: 'doc', label: 'Microservices', id: 'learn/workloads/microservices'},
            {type: 'doc', label: 'Application templates', id: 'learn/workloads/application-templates'},
            {type: 'doc', label: 'Microservice templates', id: 'learn/workloads/microservice-templates'},
            {type: 'doc', label: 'NATS access', id: 'learn/workloads/nats-access'},
            {type: 'doc', label: 'NATS runtime', id: 'learn/workloads/nats-access-runtime'},
            {type: 'doc', label: 'NATS lifecycle', id: 'learn/workloads/nats-access-lifecycle'},
            {type: 'doc', label: 'Logs and exec', id: 'learn/workloads/debugging'},
          ],
        },
        {
          type: 'category',
          label: 'Configuration',
          link: {type: 'doc', id: 'learn/config/overview'},
          items: configItems,
        },
        {
          type: 'category',
          label: 'Network',
          link: {type: 'doc', id: 'learn/network/overview'},
          items: [
            {type: 'doc', label: 'Services', id: 'learn/network/services'},
            {type: 'doc', label: 'Distribution tags', id: 'learn/network/distribution'},
            {type: 'doc', label: 'TCP bridge', id: 'learn/network/interconnection'},
            {type: 'doc', label: 'Router topology', id: 'learn/network/router-topology'},
          ],
        },
        {
          type: 'category',
          label: 'Message bus',
          link: {type: 'doc', id: 'learn/message-bus/overview'},
          items: [
            {type: 'doc', label: 'Topology', id: 'learn/message-bus/topology'},
            {type: 'doc', label: 'Account rules', id: 'learn/message-bus/account-rules'},
            {type: 'doc', label: 'User rules', id: 'learn/message-bus/user-rules'},
          ],
        },
        {
          type: 'category',
          label: 'Access control',
          link: {type: 'doc', id: 'learn/access-control/overview'},
          items: [
            {type: 'doc', label: 'Roles', id: 'learn/access-control/roles'},
            {type: 'doc', label: 'Role bindings', id: 'learn/access-control/role-bindings'},
            {type: 'doc', label: 'Service accounts', id: 'learn/access-control/service-accounts'},
          ],
        },
      ],
    },
    buildLearnSecurityCategory(),
    buildLearnPlatformComponentsCategory(),
    {
      type: 'category',
      label: 'Operate',
      link: {type: 'doc', id: 'learn/operate/overview'},
      items: [
        {type: 'doc', label: 'Observe and troubleshoot', id: 'learn/operate/observe-troubleshoot'},
        {type: 'doc', label: 'Node logs and exec', id: 'learn/operate/node-debugging'},
      ],
    },
  ];
}

export function buildLearnCategory(options: {includeConfigureOperate: boolean; includeV39Only: boolean}): SidebarItem {
  const items: SidebarItem[] = [];
  if (options.includeConfigureOperate) {
    const blocks = buildLearnConfigureOperateItems(options.includeV39Only);
    const configure = blocks[0] as {items?: SidebarItem[]};
    const configureItems = configure.items ?? [];
    const edgeletNodesAt = configureItems.findIndex(
      (item) => (item as {label?: string}).label === 'Edgelet nodes',
    );
    if (edgeletNodesAt >= 0) {
      configureItems.splice(edgeletNodesAt + 1, 0, buildGetToKnowEdgeletCategoryV39());
    } else {
      items.push(buildGetToKnowEdgeletCategoryV39());
    }
    items.push(...blocks);
  } else {
    items.push(buildGetToKnowEdgeletCategory());
  }
  return {
    type: 'category',
    label: 'Learn',
    link: options.includeConfigureOperate
      ? {type: 'doc', id: 'learn/overview'}
      : {type: 'doc', id: 'edgelet/introduction'},
    items,
  };
}

/** Current Learn sidebar. Flat sections. v3.8 still uses buildLearnCategory. */
export function buildLearnSidebarV39(): SidebarItem[] {
  const blocks = buildLearnConfigureOperateItems(true);
  const configure = blocks[0] as {items?: SidebarItem[]};
  const configureItems = configure.items ?? [];
  const edgeletNodesAt = configureItems.findIndex(
    (item) => (item as {label?: string}).label === 'Edgelet nodes',
  );
  if (edgeletNodesAt >= 0) {
    configureItems.splice(edgeletNodesAt + 1, 0, buildGetToKnowEdgeletCategoryV39());
  }
  return [
    {type: 'doc', label: 'Overview', id: 'learn/overview'},
    ...configureItems,
    ...blocks.slice(1),
  ];
}

export function buildAcmeSmartPlantCategory(): SidebarItem {
  return {
    type: 'category',
    label: 'Acme Smart Plant',
    link: {type: 'doc', id: 'tutorials/acme-smart-plant/overview'},
    items: [
      {type: 'doc', label: 'Operating the demo', id: 'tutorials/acme-smart-plant/runbook'},
      {type: 'doc', label: 'Step 1 - NATS user rules', id: 'tutorials/acme-smart-plant/step-01-nats-user-rules'},
      {type: 'doc', label: 'Step 2 - NATS account export', id: 'tutorials/acme-smart-plant/step-02-nats-account-export'},
      {
        type: 'doc',
        label: 'Step 3 - Production monitoring',
        id: 'tutorials/acme-smart-plant/step-03-application-production-monitoring',
      },
      {type: 'doc', label: 'Step 4 - Copy account key', id: 'tutorials/acme-smart-plant/step-04-copy-account-key'},
      {
        type: 'doc',
        label: 'Step 5 - NATS account import',
        id: 'tutorials/acme-smart-plant/step-05-nats-account-import',
      },
      {type: 'doc', label: 'Step 6 - Diagnostic Service', id: 'tutorials/acme-smart-plant/step-06-service-diagnostic'},
      {type: 'doc', label: 'Step 7 - Note bridge port', id: 'tutorials/acme-smart-plant/step-07-note-bridge-port'},
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
      {type: 'doc', label: 'Step 14 - Snapshot Service', id: 'tutorials/acme-smart-plant/step-14-service-snapshot'},
      {type: 'doc', label: 'Step 15 - Set SNAPSHOT_URL', id: 'tutorials/acme-smart-plant/step-15-snapshot-verify'},
    ],
  };
}

export function buildEdgeAiWaferDefectCategory(): SidebarItem {
  return {
    type: 'category',
    label: 'Edge AI wafer defect',
    link: {type: 'doc', id: 'tutorials/edge-ai-wafer-defect/overview'},
    items: [
      {type: 'doc', label: 'Step 1 - OCI registry', id: 'tutorials/edge-ai-wafer-defect/step-01-oci-registry'},
      {
        type: 'doc',
        label: 'Step 2 - Fleet Model',
        id: 'tutorials/edge-ai-wafer-defect/step-02-fleet-model-wafer-defect',
      },
      {
        type: 'doc',
        label: 'Step 3 - Attach model',
        id: 'tutorials/edge-ai-wafer-defect/step-03-attach-model-edge-c',
      },
      {type: 'doc', label: 'Step 4 - Vision bind', id: 'tutorials/edge-ai-wafer-defect/step-04-vision-models-bind'},
    ],
  };
}

export function buildTutorialsCategory(options: {includeOverview: boolean; includeEdgeAi: boolean}): SidebarItem {
  const tutorialItems: SidebarItem[] = [buildAcmeSmartPlantCategory()];
  if (options.includeEdgeAi) {
    tutorialItems.push(buildEdgeAiWaferDefectCategory());
  }
  const category: SidebarItem = {
    type: 'category',
    label: 'Tutorials',
    items: tutorialItems,
  };
  if (options.includeOverview) {
    category.link = {type: 'doc', id: 'tutorials/overview'};
  }
  return category;
}

/** Current tutorials sidebar. Flat list. v3.8 still uses buildTutorialsCategory. */
export function buildTutorialsSidebarV39(): SidebarItem[] {
  return [
    {type: 'doc', label: 'Overview', id: 'tutorials/overview'},
    {
      type: 'category',
      label: 'Edge AI wafer defect',
      link: {type: 'doc', id: 'tutorials/edge-ai-wafer-defect/overview'},
      items: [
        {type: 'doc', label: 'OCI registry', id: 'tutorials/edge-ai-wafer-defect/oci-registry'},
        {type: 'doc', label: 'Wafer-defect model', id: 'tutorials/edge-ai-wafer-defect/wafer-defect-model'},
        {type: 'doc', label: 'Vision user rules', id: 'tutorials/edge-ai-wafer-defect/vision-user-rules'},
        {type: 'doc', label: 'Vision account', id: 'tutorials/edge-ai-wafer-defect/vision-account'},
        {type: 'doc', label: 'Vision inspection', id: 'tutorials/edge-ai-wafer-defect/vision-inspection'},
        {type: 'doc', label: 'Snapshot service', id: 'tutorials/edge-ai-wafer-defect/snapshot-service'},
        {type: 'doc', label: 'Verify', id: 'tutorials/edge-ai-wafer-defect/verify'},
      ],
    },
    {
      type: 'category',
      label: 'Acme Smart Plant',
      link: {type: 'doc', id: 'tutorials/acme-smart-plant/overview'},
      items: [
        {type: 'doc', label: 'Plant user rules', id: 'tutorials/acme-smart-plant/plant-user-rules'},
        {type: 'doc', label: 'Account export', id: 'tutorials/acme-smart-plant/account-export'},
        {type: 'doc', label: 'Production monitoring', id: 'tutorials/acme-smart-plant/production-monitoring'},
        {type: 'doc', label: 'Account public key', id: 'tutorials/acme-smart-plant/account-public-key'},
        {type: 'doc', label: 'Account import', id: 'tutorials/acme-smart-plant/account-import'},
        {type: 'doc', label: 'Diagnostic service', id: 'tutorials/acme-smart-plant/diagnostic-service'},
        {type: 'doc', label: 'Diagnostic bridge port', id: 'tutorials/acme-smart-plant/diagnostic-bridge-port'},
        {type: 'doc', label: 'Operations center', id: 'tutorials/acme-smart-plant/operations-center'},
        {type: 'doc', label: 'Alert dashboard service', id: 'tutorials/acme-smart-plant/alert-dashboard-service'},
        {type: 'doc', label: 'Fab gallery link', id: 'tutorials/acme-smart-plant/fab-gallery-link'},
      ],
    },
  ];
}

export function buildReleaseNotesSidebar(options: {includeV39Upgrade: boolean}): SidebarItem[] {
  const items: SidebarItem[] = [];
  if (options.includeV39Upgrade) {
    items.push({type: 'doc', id: 'release-notes/index', label: 'Overview'});
  }
  items.push({type: 'doc', label: "What's New", id: 'home/whats-new'});
  if (options.includeV39Upgrade) {
    items.push({type: 'doc', label: 'Upgrading to v3.9.0', id: 'home/upgrading-to-v3-9'});
  }
  items.push({type: 'doc', label: 'Migrating to v3.8.0', id: 'home/migrating-to-v3-8'});
  if (!options.includeV39Upgrade) {
    items.push({type: 'doc', label: 'Legacy Agent (v3.7)', id: 'home/legacy-agent-v3-7'});
  }
  return items;
}

export function buildReferenceYamlAndBelow(cliName: string, cliSection: string): SidebarItem[] {
  return [
    {
      type: 'category',
      label: 'YAML References',
      items: [
        {type: 'doc', label: 'YAML Kinds', id: 'yaml-references/reference-kinds'},
        {type: 'doc', label: 'Control Plane', id: 'yaml-references/reference-control-plane'},
        {type: 'doc', label: 'Agent', id: 'yaml-references/reference-agent'},
        {type: 'doc', label: 'Application', id: 'yaml-references/reference-application'},
        {type: 'doc', label: 'Application Template', id: 'yaml-references/reference-application-template'},
        {type: 'doc', label: 'Registry', id: 'yaml-references/reference-registry'},
        {type: 'doc', label: 'Catalog', id: 'yaml-references/reference-catalog'},
        {type: 'doc', label: 'OfflineImage', id: 'yaml-references/reference-offlineimage'},
        {type: 'doc', label: 'Secret', id: 'yaml-references/reference-secret'},
        {type: 'doc', label: 'Certificate', id: 'yaml-references/reference-certificate'},
        {type: 'doc', label: 'ConfigMap', id: 'yaml-references/reference-configmap'},
        {type: 'doc', label: 'VolumeMount', id: 'yaml-references/reference-volumemount'},
        {type: 'doc', label: 'Service', id: 'yaml-references/reference-service'},
        {type: 'doc', label: 'Role', id: 'yaml-references/reference-roles'},
        {type: 'doc', label: 'RoleBinding', id: 'yaml-references/reference-role-binding'},
        {type: 'doc', label: 'NatsAccountRule', id: 'yaml-references/reference-nats-account-rule'},
        {type: 'doc', label: 'NatsUserRule', id: 'yaml-references/reference-nats-user-rule'},
      ],
    },
    {
      type: 'category',
      label: 'Controller',
      items: [
        {type: 'doc', label: 'Overview', id: 'reference-controller/overview'},
        {type: 'doc', label: 'Configuration', id: 'reference-controller/configuration'},
        {type: 'doc', label: 'REST API', id: 'reference-controller/rest-api'},
      ],
    },
    {
      type: 'category',
      label: `${cliName} CLI Reference`,
      link: {type: 'doc', id: `${cliSection}/cli/${cliName}`},
      items: [{type: 'autogenerated', dirName: `${cliSection}/cli`}],
    },
    {
      type: 'category',
      label: 'Edgelet CLI Reference',
      link: {type: 'doc', id: 'edgelet/cli/index'},
      items: [{type: 'autogenerated', dirName: 'edgelet/cli'}],
    },
    {
      type: 'category',
      label: 'Catalog Microservices',
      items: [
        {type: 'doc', label: 'HAL', id: 'reference-microservices-catalog/hal'},
        {type: 'doc', label: 'REST Blue', id: 'reference-microservices-catalog/rest-blue'},
      ],
    },
  ];
}

export function buildReferenceSidebar(
  cliName: string,
  cliSection: string,
  options: {includeClusterResourcesHub: boolean},
): SidebarItem[] {
  const items: SidebarItem[] = [];
  if (options.includeClusterResourcesHub) {
    items.push(
      {
        type: 'category',
        label: 'Reference',
        link: {type: 'doc', id: 'reference/cluster-resources'},
        items: [
          {type: 'doc', label: 'Cluster resources', id: 'reference/cluster-resources'},
          {type: 'doc', label: 'Documentation archive', id: 'reference/documentation-archive'},
        ],
      },
    );
  } else {
    items.push({
      type: 'category',
      label: 'Reference',
      link: {type: 'doc', id: 'yaml-references/README'},
      items: [{type: 'doc', label: 'YAML overview', id: 'yaml-references/README'}],
    });
  }
  items.push(...buildReferenceYamlAndBelow(cliName, cliSection));
  return items;
}

export function buildGetStartedSidebar(cliName: string): SidebarItem[] {
  return [
    {type: 'doc', label: 'Welcome', id: 'home/welcome'},
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        {type: 'doc', label: 'Core Concepts', id: 'getting-started/core-concepts'},
        {type: 'doc', label: 'Architecture', id: 'getting-started/architecture'},
        {type: 'doc', label: 'Quick Start With Local Deployment', id: 'getting-started/quick-start-local'},
      ],
    },
    buildCliGuidesCategory(cliName),
    buildPlatformDeploymentCategory(cliName),
    buildEdgeletManagementCategory(),
    buildApplicationManagementCategory(),
    buildEdgeOpsConsoleCategory(),
  ];
}

export function buildCliGuidesCategoryV39(cliName: string): SidebarItem {
  return {
    type: 'category',
    label: cliName,
    items: [
      {type: 'doc', label: 'Introduction', id: 'get-started/cli/introduction'},
      {type: 'doc', label: 'Download', id: 'get-started/cli/download'},
      {type: 'doc', label: 'Getting Familiar', id: 'get-started/cli/getting-familiar'},
      {type: 'doc', label: 'Resource Management', id: 'get-started/cli/resource-management'},
      {type: 'doc', label: 'Connect/Disconnect', id: 'get-started/cli/connect-disconnect'},
    ],
  };
}

export function buildPlatformDeploymentCategoryV39(cliName: string): SidebarItem {
  return {
    type: 'category',
    label: 'Platform Deployment',
    items: [
      {type: 'doc', label: 'Introduction', id: 'get-started/deploy/introduction'},
      {type: 'doc', label: 'Embedded OIDC Authentication', id: 'get-started/deploy/embedded-oidc'},
      {type: 'doc', label: 'External OIDC Authentication', id: 'get-started/deploy/external-oidc'},
      {type: 'doc', label: 'External OIDC Providers', id: 'get-started/deploy/external-oidc-providers'},
      {type: 'doc', label: 'Prepare Your Network', id: 'get-started/deploy/prepare-your-network'},
      {type: 'doc', label: 'Prepare Your Remote Hosts', id: 'get-started/deploy/prepare-your-remote-hosts'},
      {type: 'doc', label: 'Remote Control Plane', id: 'get-started/deploy/remote-control-plane'},
      {type: 'doc', label: 'Kubernetes Prepare Cluster', id: 'get-started/deploy/kubernetes-prepare-cluster'},
      {type: 'doc', label: 'External Database Deployment', id: 'get-started/deploy/database'},
      {type: 'doc', label: `Kubernetes ${cliName}`, id: 'get-started/deploy/kubernetes-cli'},
      {type: 'doc', label: 'Kubernetes Helm', id: 'get-started/deploy/kubernetes-helm'},
      {type: 'doc', label: 'Setup Edgelet Nodes', id: 'get-started/deploy/setup-edgelet-nodes'},
      {type: 'doc', label: 'Airgap Deployment', id: 'get-started/deploy/airgap-deployment'},
    ],
  };
}

export function buildEdgeletNodeManagementCategoryV39(): SidebarItem {
  return {
    type: 'category',
    label: 'Edgelet node management',
    items: [
      {type: 'doc', label: 'Introduction', id: 'get-started/edgelet-nodes/introduction'},
      {type: 'doc', label: 'Configuration updates', id: 'get-started/edgelet-nodes/configuration-updates'},
      {type: 'doc', label: 'EdgeGuard', id: 'get-started/edgelet-nodes/edgeguard'},
      {type: 'doc', label: 'Attach and detach', id: 'get-started/edgelet-nodes/attach-detach'},
      {type: 'doc', label: 'Volume distribution', id: 'get-started/edgelet-nodes/volume-distribution'},
      {type: 'doc', label: 'Image and disk pruning', id: 'get-started/edgelet-nodes/image-pruning'},
      {type: 'doc', label: 'Upgrade and rollback', id: 'get-started/edgelet-nodes/upgrade-rollback'},
      {type: 'doc', label: 'Reconcile platform', id: 'get-started/edgelet-nodes/reconcile'},
      {type: 'doc', label: 'Debugging', id: 'get-started/edgelet-nodes/debugging'},
    ],
  };
}

export function buildReleaseNotesSidebarV39(): SidebarItem[] {
  return [
    {type: 'doc', id: 'release-notes/index', label: 'Overview'},
    {type: 'doc', label: "What's New", id: 'release-notes/whats-new'},
    {type: 'doc', label: 'Upgrading to v3.9.0', id: 'release-notes/upgrading-to-v3-9'},
    {type: 'doc', label: 'Migrating to v3.8.0', id: 'release-notes/migrating-to-v3-8'},
  ];
}

export function buildWorkloadOrchestrationCategoryV39(): SidebarItem {
  return {
    type: 'category',
    label: 'Workload orchestration',
    items: [
      {type: 'doc', label: 'Overview', id: 'get-started/workloads/overview'},
      {
        type: 'doc',
        label: 'Applications and microservices',
        id: 'get-started/workloads/applications',
      },
      {type: 'doc', label: 'Templates', id: 'get-started/workloads/templates'},
      {type: 'doc', label: 'Registries and catalog', id: 'get-started/workloads/registries'},
      {
        type: 'doc',
        label: 'Models and knowledge',
        id: 'get-started/workloads/models-and-knowledge',
      },
      {type: 'doc', label: 'Config, secrets, and volumes', id: 'get-started/workloads/config'},
    ],
  };
}

export function buildGetStartedSidebarV39(cliName: string): SidebarItem[] {
  return [
    {type: 'doc', label: 'Welcome', id: 'get-started/welcome'},
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        {type: 'doc', label: 'Core Concepts', id: 'get-started/core-concepts'},
        {type: 'doc', label: 'Architecture', id: 'get-started/architecture'},
        {type: 'doc', label: 'Quick Start With Local Deployment', id: 'get-started/quick-start-local'},
      ],
    },
    buildCliGuidesCategoryV39(cliName),
    buildPlatformDeploymentCategoryV39(cliName),
    buildEdgeletNodeManagementCategoryV39(),
    buildWorkloadOrchestrationCategoryV39(),
    buildEdgeOpsConsoleCategoryV39(),
  ];
}

/** Current reference sidebar. No wrapping Reference category. */
export function buildReferenceSidebarV39(cliName: string, cliSection: string): SidebarItem[] {
  return [
    {type: 'doc', id: 'reference/overview', label: 'Overview'},
    {
      type: 'category',
      label: 'YAML',
      items: [
        {
          type: 'category',
          label: 'Control plane',
          items: [
            {type: 'doc', label: 'Kubernetes', id: 'reference/yaml/kubernetes-control-plane'},
            {type: 'doc', label: 'Remote', id: 'reference/yaml/remote-control-plane'},
            {type: 'doc', label: 'Local', id: 'reference/yaml/local-control-plane'},
          ],
        },
        {
          type: 'category',
          label: 'Edgelet nodes',
          items: [
            {type: 'doc', label: 'Agent', id: 'reference/yaml/agent'},
            {type: 'doc', label: 'LocalAgent', id: 'reference/yaml/local-agent'},
            {type: 'doc', label: 'AgentConfig', id: 'reference/yaml/agent-config'},
          ],
        },
        {
          type: 'category',
          label: 'Workloads',
          items: [
            {type: 'doc', label: 'Application', id: 'reference/yaml/application'},
            {type: 'doc', label: 'Microservice', id: 'reference/yaml/microservice'},
            {type: 'doc', label: 'Application template', id: 'reference/yaml/application-template'},
            {type: 'doc', label: 'Microservice template', id: 'reference/yaml/microservice-template'},
          ],
        },
        {
          type: 'category',
          label: 'Configuration',
          items: [
            {type: 'doc', label: 'Registry', id: 'reference/yaml/registry'},
            {type: 'doc', label: 'Catalog item', id: 'reference/yaml/catalog-item'},
            {type: 'doc', label: 'Model', id: 'reference/yaml/model'},
            {type: 'doc', label: 'Knowledge', id: 'reference/yaml/knowledge'},
            {type: 'doc', label: 'RuntimeClass', id: 'reference/yaml/runtime-class'},
            {type: 'doc', label: 'ConfigMap', id: 'reference/yaml/config-map'},
            {type: 'doc', label: 'Secret', id: 'reference/yaml/secret'},
            {type: 'doc', label: 'CertificateAuthority', id: 'reference/yaml/certificate-authority'},
            {type: 'doc', label: 'Certificate', id: 'reference/yaml/certificate'},
            {type: 'doc', label: 'Volume', id: 'reference/yaml/volume'},
            {type: 'doc', label: 'VolumeMount', id: 'reference/yaml/volume-mount'},
            {type: 'doc', label: 'OfflineImage', id: 'reference/yaml/offline-image'},
          ],
        },
        {
          type: 'category',
          label: 'Network',
          items: [{type: 'doc', label: 'Service', id: 'reference/yaml/service'}],
        },
        {
          type: 'category',
          label: 'Message bus',
          items: [
            {type: 'doc', label: 'NatsAccountRule', id: 'reference/yaml/nats-account-rule'},
            {type: 'doc', label: 'NatsUserRule', id: 'reference/yaml/nats-user-rule'},
          ],
        },
        {
          type: 'category',
          label: 'Access control',
          items: [
            {type: 'doc', label: 'Role', id: 'reference/yaml/role'},
            {type: 'doc', label: 'RoleBinding', id: 'reference/yaml/role-binding'},
            {type: 'doc', label: 'ServiceAccount', id: 'reference/yaml/service-account'},
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Controller',
      items: [
        {type: 'doc', label: 'Configuration', id: 'reference/controller/controller-config'},
        {type: 'doc', label: 'OIDC', id: 'reference/controller/oidc-configuration'},
        {type: 'doc', label: 'External OIDC providers', id: 'reference/controller/external-oidc-providers'},
        {type: 'doc', label: 'External OIDC client', id: 'reference/controller/external-oidc-client-setup'},
        {type: 'doc', label: 'RBAC', id: 'reference/controller/rbac-reference'},
        {type: 'doc', label: 'Control plane networking', id: 'reference/controller/networking-topology-controlplane'},
        {type: 'doc', label: 'Messaging fabric', id: 'reference/controller/networking-topology-messaging-fabric'},
        {type: 'doc', label: 'Service interconnection topology', id: 'reference/controller/networking-topology-service-interconnection'},
        {type: 'doc', label: 'Service interconnection', id: 'reference/controller/service-interconnection'},
        {type: 'doc', label: 'NATS access', id: 'reference/controller/nats-access'},
        {type: 'doc', label: 'NATS rules', id: 'reference/controller/nats-rules'},
      ],
    },
    {
      type: 'category',
      label: cliName,
      items: [{type: 'autogenerated', dirName: `reference/cli/${cliSection}`}],
    },
    {
      type: 'category',
      label: 'Edgelet CLI',
      items: [{type: 'autogenerated', dirName: 'reference/cli/edgelet'}],
    },
  ];
}

/** v3.8.0 versioned sidebar JSON (Datasance doc ids; ioFog patch script rewrites CLI paths). */
export function buildVersion380Sidebars(cliName: string, cliSection: string): Record<string, SidebarItem[]> {
  return {
    getStartedSidebar: buildGetStartedSidebar(cliName),
    learnSidebar: [buildLearnCategory({includeConfigureOperate: false, includeV39Only: false})],
    releaseNotesSidebar: buildReleaseNotesSidebar({includeV39Upgrade: false}),
    tutorialsSidebar: [buildTutorialsCategory({includeOverview: false, includeEdgeAi: false})],
    referenceSidebar: buildReferenceSidebar(cliName, cliSection, {includeClusterResourcesHub: false}),
  };
}
