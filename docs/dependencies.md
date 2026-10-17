# Dependency decisions

The npm registry was queried during the migration on 18 October 2026. Direct dependencies are pinned to the latest stable releases returned by the registry.

| Package                   | Version |
| ------------------------- | ------- |
| React and React DOM       | 19.3.1  |
| Vite                      | 8.3.4   |
| TypeScript                | 7.0.2   |
| pnpm                      | 12.14.0 |
| Oxlint                    | 1.88.0  |
| Oxfmt                     | 0.73.0  |
| Vite React plugin         | 6.1.2   |
| Playwright                | 1.64.1  |
| React and React DOM types | 19.3.0  |
| Node types                | 26.6.5  |

Node 24.21.0 is the installed development runtime and the pinned CI runtime. It satisfies the toolchain requirements. Node types describe newer APIs, so scripts must still run on the pinned runtime. No Node 26-only APIs are used.

Styled-components, Emotion, MUI, mui-image, ESLint, their plugins, and the old SWC plugin are removed. Oxfmt replaces the formatting role. The baseline did not contain a Prettier configuration or dependency to migrate.

Each app declares React, React DOM, and the shared runtime. Root development tools serve the workspace. The pnpm catalog keeps runtime versions consistent. The lockfile pins transitive dependencies. Run `pnpm outdated -r` to check direct versions again.

CI uses checkout 7.0.1, setup-node 7.1.0, and pnpm action-setup 6.1.0, checked against their latest release pages. CI has read-only repository permission. It installs from the frozen lockfile and runs the same checks as local development.
