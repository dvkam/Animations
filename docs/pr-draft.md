# Modernize the animation workspace and remove runtime styling

The 14 demos had copied tool configurations, separate npm lockfiles, and runtime CSS-in-JS for mostly static effects. This change moves them into a pnpm workspace, pins current React, Vite, TypeScript, Oxlint, and Oxfmt, and replaces styled-components, Emotion, MUI, and mui-image with CSS Modules and semantic HTML.

The demos keep their key motion sequences. The migration fixes missing gradient text, random selection, canvas pointer capture and resize loss, Houdini support detection, broken placeholders, and reduced-motion behavior. Each demo now has an explanation and source credits. A shared autoplay control pauses keyframes, and keyboard and touch controls expose image effects.

Validation includes strict types, lint, format, all 14 production builds, 77 applicable Chromium desktop/mobile tests, and 39 Firefox tests. Baseline screenshots and computed measurements caught and corrected typography and layout regressions. Firefox checks and detailed limits are in [verification](verification.md). [Fidelity notes](fidelity.md) identify deliberate changes. WebKit needs additional WSL system libraries. No physical-device performance claim is made.

Nx is deferred because the current build graph does not justify it. The original third-party image sources remain credited in [asset sources](asset-sources.md).

This is a local draft. No branch or PR has been pushed or published.
