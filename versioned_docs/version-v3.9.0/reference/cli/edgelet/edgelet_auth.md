---
title: edgelet auth
---

## edgelet auth

Authentication operations

### Synopsis

Inspect and manage EdgeletAPI authentication tokens.

Subcommands: whoami, tokens, revoke.

### Examples

```
edgelet auth whoami -o json
  edgelet auth tokens -o json
  edgelet auth revoke <jti>
```

### Options

```
  -h, --help   help for auth
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
* [edgelet auth revoke](/reference/cli/edgelet/edgelet_auth_revoke)	 - Revoke an auth token
* [edgelet auth tokens](/reference/cli/edgelet/edgelet_auth_tokens)	 - List auth tokens
* [edgelet auth whoami](/reference/cli/edgelet/edgelet_auth_whoami)	 - Show current auth identity


