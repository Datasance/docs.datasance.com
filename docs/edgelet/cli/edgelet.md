---
title: edgelet
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

* [edgelet auth](/edgelet/cli/edgelet_auth)	 - Authentication operations
* [edgelet cgroup-preflight](/edgelet/cli/edgelet_cgroup-preflight)	 - Validate cgroup mounts and delegation before start
* [edgelet completion](/edgelet/cli/edgelet_completion)	 - Generate shell completion scripts
* [edgelet config](/edgelet/cli/edgelet_config)	 - Update agent configuration
* [edgelet controlplane](/edgelet/cli/edgelet_controlplane)	 - Control plane controller operations
* [edgelet deploy](/edgelet/cli/edgelet_deploy)	 - Deploy a local manifest
* [edgelet deprovision](/edgelet/cli/edgelet_deprovision)	 - Deprovision the agent
* [edgelet image](/edgelet/cli/edgelet_image)	 - Image operations
* [edgelet init-config](/edgelet/cli/edgelet_init-config)	 - Write default config if missing
* [edgelet ms](/edgelet/cli/edgelet_ms)	 - Microservice operations
* [edgelet provision](/edgelet/cli/edgelet_provision)	 - Provision the agent
* [edgelet registry](/edgelet/cli/edgelet_registry)	 - Registry operations
* [edgelet runtimeclass](/edgelet/cli/edgelet_runtimeclass)	 - Runtime class operations
* [edgelet shutdown](/edgelet/cli/edgelet_shutdown)	 - Control-plane stop for init systems
* [edgelet system](/edgelet/cli/edgelet_system)	 - System operations
* [edgelet version](/edgelet/cli/edgelet_version)	 - Print edgelet version


