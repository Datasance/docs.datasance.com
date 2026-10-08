# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```bash
npm install
```

### Local Development

The site ships two documentation flavors (Datasance and Eclipse ioFog). A single dev server uses one `baseUrl` at a time. Production serves both from one origin after a merged build.

| Command | Use when |
|---------|----------|
| `npm run start` | Datasance docs at [http://localhost:3000/](http://localhost:3000/) (hot reload). |
| `npm run start:iofog` | ioFog docs at [http://localhost:3000/iofog/](http://localhost:3000/iofog/) (hot reload). |
| `npm run serve:merged` | Full dual-flavor build, then static serve on one origin (both `/` and `/iofog/`). Matches production layout; no hot reload. |

```bash
npm run start
```

Most edits reload in the browser without restarting the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory (Datasance at the root, ioFog under `build/iofog/`) and can be served using any static contents hosting service.

To build and preview both flavors locally:

```bash
npm run serve:merged
```

### Upstream control plane docs

When **potctl** or **iofog-operator** update `docs/operators/controlplane` or `docs/controlplane`, re-sync Learn pages and examples:

```bash
npm run sync:controlplane-docs
```

Requires sibling clones at `../potctl` and `../iofog-operator` (same layout as `sync:cli`).

### Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
