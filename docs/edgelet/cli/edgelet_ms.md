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

* [edgelet](/edgelet/cli/edgelet)	 - Local CLI for the Edgelet daemon
* [edgelet ms exec](/edgelet/cli/edgelet_ms_exec)	 - Execute a command in a microservice
* [edgelet ms inspect](/edgelet/cli/edgelet_ms_inspect)	 - Inspect a microservice
* [edgelet ms kill](/edgelet/cli/edgelet_ms_kill)	 - Kill a microservice
* [edgelet ms logs](/edgelet/cli/edgelet_ms_logs)	 - Stream microservice logs
* [edgelet ms ls](/edgelet/cli/edgelet_ms_ls)	 - List microservices
* [edgelet ms restart](/edgelet/cli/edgelet_ms_restart)	 - Restart a microservice
* [edgelet ms rm](/edgelet/cli/edgelet_ms_rm)	 - Remove a microservice
* [edgelet ms start](/edgelet/cli/edgelet_ms_start)	 - Start a microservice
* [edgelet ms stop](/edgelet/cli/edgelet_ms_stop)	 - Stop a microservice


