# Modernize animation demos and add a GitHub Pages playground

The 14 demos had copied tool configurations, separate npm lockfiles, and runtime CSS-in-JS for mostly static effects. This change moves them into a pnpm workspace and replaces styled-components, Emotion, MUI, and mui-image with CSS Modules and semantic HTML.

## Changes

- Update React, Vite, TypeScript, pnpm, and supporting dependencies. Replace ESLint and Prettier with Oxlint and Oxfmt. Keep shared configuration at the workspace root. Defer Nx because the build graph does not justify it.
- Preserve the key animation sequences and fix missing gradient text, random selection, canvas pointer capture and resize loss, Houdini support detection, broken placeholders, and reduced-motion behavior.
- Add autoplay pause and restart controls, keyboard and touch access to image effects, and a README for every demo with behavior, implementation notes, and source credits.
- Add a minimal sidebar playground. Load only the selected demo in an isolated iframe, with direct links, history, preview width controls, reload, and standalone viewing. Generate descriptions from the READMEs and link source files to the built commit.
- Build one static site artifact. Run checks on pushes and pull requests. Deploy the shared GitHub Pages site after successful default-branch checks or a manual run. Pull requests do not deploy.

## Validation

- Frozen-lockfile install, lint, formatting, strict type checks, and all 15 app production builds passed.
- 83 Chromium desktop/mobile tests passed, with three intentional device-specific skips. This includes all six playground tests.
- The migration also passed 39 Firefox tests. Baseline screenshots and computed measurements caught and corrected typography and layout regressions.
- Final pstack, Matt Pocock standards/spec, and Emil design reviews completed. The final review found and fixed source links for branch previews.

## Review and setup notes

GitHub Pages must use GitHub Actions as its source in repository settings. A manual deployment replaces the shared site and must satisfy the github-pages environment branch rules. Hosted deployment remains unverified until the workflow runs.

WebKit requires additional WSL system libraries. No physical-device performance or pixel-equivalence claim is made. See [verification](docs/verification.md), [fidelity notes](docs/fidelity.md), [asset sources](docs/asset-sources.md), and [playground setup](docs/playground.md) for the evidence and limits.
