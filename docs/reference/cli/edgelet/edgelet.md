---
title: edgelet
slug: /reference/cli/edgelet/edgelet
---

## edgelet

Local CLI for the Edgelet daemon

### Synopsis

Local CLI for the Edgelet daemon.

Use "edgelet &lt;command&gt; --help" for command-specific usage.

```
edgelet [flags]
```

### Options

```
      --debug            Debug logging
  -h, --help             help for edgelet
      --no-color         Disable color and interactive UX
  -o, --output string    Output format: human, json, yaml (default "human")
      --quiet            Suppress interactive progress output
      --socket string    Edgelet API unix socket path
      --timeout string   Request timeout
      --verbose          Verbose logging
      --version          Print CLI and daemon version
```

### SEE ALSO

* [edgelet auth](/reference/cli/edgelet/edgelet_auth)	 - Authentication operations
* [edgelet cgroup-preflight](/reference/cli/edgelet/edgelet_cgroup-preflight)	 - Validate cgroup mounts and delegation before start
* [edgelet completion](/reference/cli/edgelet/edgelet_completion)	 - Generate shell completion scripts
* [edgelet config](/reference/cli/edgelet/edgelet_config)	 - Update agent configuration
* [edgelet controlplane](/reference/cli/edgelet/edgelet_controlplane)	 - Control plane controller operations
* [edgelet deploy](/reference/cli/edgelet/edgelet_deploy)	 - Deploy a local manifest
* [edgelet deprovision](/reference/cli/edgelet/edgelet_deprovision)	 - Deprovision the agent
* [edgelet image](/reference/cli/edgelet/edgelet_image)	 - Image operations
* [edgelet init-config](/reference/cli/edgelet/edgelet_init-config)	 - Write default config if missing
* [edgelet ms](/reference/cli/edgelet/edgelet_ms)	 - Microservice operations
* [edgelet provision](/reference/cli/edgelet/edgelet_provision)	 - Provision the agent
* [edgelet registry](/reference/cli/edgelet/edgelet_registry)	 - Registry operations
* [edgelet runtimeclass](/reference/cli/edgelet/edgelet_runtimeclass)	 - Runtime class operations
* [edgelet shutdown](/reference/cli/edgelet/edgelet_shutdown)	 - Control-plane stop for init systems
* [edgelet system](/reference/cli/edgelet/edgelet_system)	 - System operations
* [edgelet version](/reference/cli/edgelet/edgelet_version)	 - Print edgelet version


