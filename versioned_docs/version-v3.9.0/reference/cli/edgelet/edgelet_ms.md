---
title: edgelet ms
---

## edgelet ms

Microservice operations

### Synopsis

Microservice lifecycle and observability on this agent.

Subcommands: ls, inspect, logs, exec, start, stop, restart, kill, rm.

### Examples

```
edgelet ms ls -o json
  edgelet ms ls --source local
  edgelet ms inspect <uuid>
  edgelet ms logs <uuid> --follow
  edgelet ms exec <uuid> -- /bin/sh
```

### Options

```
  -h, --help   help for ms
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

* [edgelet](/reference/cli/edgelet/edgelet)	 - Local CLI for the Edgelet daemon
* [edgelet ms exec](/reference/cli/edgelet/edgelet_ms_exec)	 - Execute a command in a microservice
* [edgelet ms inspect](/reference/cli/edgelet/edgelet_ms_inspect)	 - Inspect a microservice
* [edgelet ms kill](/reference/cli/edgelet/edgelet_ms_kill)	 - Kill a microservice
* [edgelet ms logs](/reference/cli/edgelet/edgelet_ms_logs)	 - Stream microservice logs
* [edgelet ms ls](/reference/cli/edgelet/edgelet_ms_ls)	 - List microservices
* [edgelet ms restart](/reference/cli/edgelet/edgelet_ms_restart)	 - Restart a microservice
* [edgelet ms rm](/reference/cli/edgelet/edgelet_ms_rm)	 - Remove a microservice
* [edgelet ms start](/reference/cli/edgelet/edgelet_ms_start)	 - Start a microservice
* [edgelet ms stop](/reference/cli/edgelet/edgelet_ms_stop)	 - Stop a microservice


