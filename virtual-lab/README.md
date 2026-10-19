# Virtual Laboratory

The Games page embeds the live laboratory from official iGEM Pages:

https://virtual-lab-208fd4.igem.wiki/

Its deployment source and CI are in the official software repository:
https://gitlab.igem.org/2026/software/jlu-fbh/virtual-lab

This directory retains the complete application source, course player code,
configuration and pinned lockfile in the team Wiki repository. It matches the
software deployment at commit `4b161de7d4bd9490d2b46e8b5438e7e3b2005b2b`.
Images and fonts are loaded from the official `static.igem.wiki` CDN.

## Build the laboratory from this Wiki checkout

```sh
cd virtual-lab
npm ci
npm run build
npm run preview
```

The laboratory builds into its own ignored `virtual-lab/dist/` directory.
Its dependencies are separate from the Wiki dependencies. The Wiki root build
produces only the Wiki, and embeds the official Pages deployment at runtime.
No compiled laboratory output is committed or copied into the Wiki artifact.

`public/` contains the existing course player HTML, CSS and JavaScript.
The build compacts experiment 9 metadata using the same transformation as the
software repository. UI source remains in `src/`; the Wiki iframe container is
`../src/components/VirtualLaboratory/index.tsx`.

## Hosting and integration

The official [Wiki requirements](https://teams.igem.org/go/deliverables/wiki/requirements)
allow iframes only for content hosted on iGEM infrastructure and require the
team Wiki repository to retain HTML and source code. Both repositories build
from source with a committed dependency lockfile. The root Wiki license is
unchanged; this software subtree retains the official software LICENSE.

The parent iframe accepts close messages only from the configured Pages origin
and its own content window. The laboratory sends Escape close messages to
`https://2026.igem.wiki`. When changing the deployment URL, update the parent
origin check as well, then verify opening, interaction, closing and focus return.
Keep the existing iframe autoplay and fullscreen permissions.
