---
title: edgelet image
---

## edgelet image

Image operations

### Synopsis

Local image operations via the agent container engine.

Subcommands: ls, pull, load, prune, rm.

### Examples

```
edgelet image ls -o json
  edgelet image pull docker.io/library/alpine:3.19
  edgelet image pull my.registry/app:1.0 -r 2 -p linux/amd64
  edgelet image load -f /path/to/image.tar
  edgelet image prune
```

### Options

```
  -h, --help   help for image
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
* [edgelet image load](/edgelet/cli/edgelet_image_load)	 - Load an image archive
* [edgelet image ls](/edgelet/cli/edgelet_image_ls)	 - List images
* [edgelet image prune](/edgelet/cli/edgelet_image_prune)	 - Prune dangling images
* [edgelet image pull](/edgelet/cli/edgelet_image_pull)	 - Pull an image
* [edgelet image rm](/edgelet/cli/edgelet_image_rm)	 - Remove an image


