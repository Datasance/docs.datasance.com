---
title: edgelet system
---

## edgelet system

System operations

### Synopsis

Agent runtime and daemon operations.

Subcommands: status, info, version, reload, stop, logs, prune.

### Options

```
  -h, --help   help for system
```

### Options inherited from parent commands

```
      --debug            Debug logging
      --no-color         Disable color and interactive UX
  -o, --output string    Output format: human, json, yaml (default "human")
      --quiet            Suppress interactive progress output
      --socket string    Edgelet API unix socket path
      --timeout string   Request timeout
      --verbose          Verbose logging
```

### SEE ALSO

* [edgelet](/edgelet/cli/edgelet)	 - Local CLI for the Edgelet daemon
* [edgelet system info](/edgelet/cli/edgelet_system_info)	 - Show agent configuration info
* [edgelet system logs](/edgelet/cli/edgelet_system_logs)	 - Stream daemon logs
* [edgelet system prune](/edgelet/cli/edgelet_system_prune)	 - Prune unused resources
* [edgelet system reload](/edgelet/cli/edgelet_system_reload)	 - Reload daemon configuration
* [edgelet system status](/edgelet/cli/edgelet_system_status)	 - Show agent runtime status
* [edgelet system stop](/edgelet/cli/edgelet_system_stop)	 - Gracefully stop the daemon
* [edgelet system version](/edgelet/cli/edgelet_system_version)	 - Show combined CLI and daemon version


