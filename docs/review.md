# Code and design review

## Review scope

The baseline is `99ecb5f95276fd4643eaa0bc95544e5bbaeb7479`. The review covered all 14 apps, their source files, manifests, styles, README files, and Git history. The history records separate demo additions. It does not establish a shared product or published library contract.

The review used local pstack architecture, TypeScript, unslop, and technical-writing skills. Matt Pocock codebase-design guided ownership decisions. Separate standards and spec reviewers checked the result. Emil's design and animation skills guided motion review. The configured Claude and Grok runners were unavailable, so independent reviews used the available inherited model.

## How the code works

Each original folder was a standalone Vite root. Its HTML loaded `src/main.tsx`, which mounted one React tree. Most effects used MUI, Emotion, or styled-components to produce ordinary styles. Several manifests copied the wrong package name. Runtime styling libraries appeared in development dependencies, and each app had its own npm lockfile.

The migrated flow remains HTML, React root, then a demo-owned implementation. Shared mounting adds StrictMode, root validation, autoplay controls, and restart. CSS Modules produce static CSS during the Vite build. Inline styles only carry changing values such as delays or pointer transforms. No style registry or CSS-in-JS runtime remains.

The two scroll effects use one observer hook. Its boolean becomes true when the target intersects at least 75 percent. Cleanup disconnects the observer. The image stack observes its card footprint rather than a full-screen section, so a small screen can reach the threshold.

Canvas owns its strokes and active pointer in refs. Pointer capture keeps a stroke connected outside the element. Release, cancellation, or lost capture ends the stroke. A resize observer rebuilds the backing bitmap at device pixel ratio and redraws stored logical coordinates. Each move paints only the newest segment. The Clear button clears both the bitmap and stored strokes.

The gradient button writes a transform directly to its glow position span. A nested span controls glow expansion. React no longer renders on each pointer move. The gradient underline uses the original palette bundled as CSS gradient strings. A mount selects one entry for both highlights. The final palette entry is now reachable. Text is present before any interaction and requires no fetch.

## Findings and fixes

| Before                                                | After                                           | Why                                                                 |
| ----------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------- |
| Fourteen copied manifests and npm lockfiles           | One pnpm workspace, catalog, and lockfile       | Tool versions have one owner.                                       |
| Runtime style generation for static keyframes         | CSS Modules and native CSS                      | Removes styling runtime dependencies without replacing the effects. |
| `transition: all`                                     | Explicit transform or stroke transitions        | Future style changes cannot animate unrelated properties.           |
| Gradient pointer state updated on every move          | A ref updates the glow transform                | Avoids per-pointer React renders and width/height animation.        |
| A missing remote gradient removed words               | Bundled original palette and unconditional text | Offline failures cannot delete sentence content.                    |
| Random index used `length - 1`                        | Selection uses the full palette length          | The final gradient can be selected.                                 |
| Mouse-only canvas with no outside release             | Pointer capture and cancellation handling       | Mouse, pen, and touch have a defined stroke lifecycle.              |
| Canvas resize erased artwork                          | Stored strokes redraw at the new pixel ratio    | Resizing preserves drawings and supports dense displays.            |
| Houdini properties gated on Paint API support         | Top-level registered properties                 | Property interpolation does not require paint worklets.             |
| Absolute image stack without a sized containing block | Positioned stage with explicit dimensions       | Cards have a stable layout and input target.                        |
| No effective reduced-motion rules                     | Complete static text and image states           | Disabling motion does not hide content.                             |
| Hidden letter spans without accessible full text      | One complete phrase for assistive technology    | Screen readers do not need to assemble visual characters.           |
| Empty link and inaccessible image effects             | Named buttons with keyboard and tap toggles     | The effects work without a hover-capable pointer.                   |
| Invalid perspective declaration                       | Removed without adding perspective              | Fixing syntax must not silently change the original trajectory.     |
| Broken placeholder URLs                               | Local SVG placeholders                          | Demos no longer depend on the placeholder service.                  |

## Motion decisions

The effects are demonstrations. Their purpose is to show movement. Generic interface timing limits do not justify shortening every sequence. Preserve the Apple sequence, 6ms character stagger, 100ms word stagger, 2s wave, 3s typewriter, and original image fan timing.

SVG dash offset, blur, conic gradients, multiline background size, and the centered typewriter width still require paint or layout work. These are explicit fidelity choices. Removing CSS-in-JS does not prove a frame-rate gain. No physical phone GPU recording was available.

Pause autoplay pauses CSS keyframes and pseudo-elements. Interactive hover, scroll, pointer, and canvas input remains active. Reduced motion follows the operating system preference and reveals complete content. Restart remounts the demo and resets its local state, including drawings and gradient selection.

## Architecture decision

Keep independent apps in `apps/*`, with a small shared runtime and root configuration. A Vite multipage app could also isolate documents and would remove package manifests. The workspace retains independent commands and output folders, which fits the existing examples and the requested monorepo direction.

Do not add Nx yet. There is no measured build bottleneck or complex dependency graph. A source-boundary check rejects app-to-app imports. It is a small text-based repository check, not a general TypeScript parser.

React's newer server, action, and concurrency APIs do not solve a current problem in these demos. The upgrade retains StrictMode and current ref typing. Adding a compiler or new state layer would need a measured benefit.

## Source review limits

All original README links remain in the demo documentation. The web.dev border article and several CodePen sources were readable. Several CodeSandbox and CodePen pages failed retrieval. Those failures are marked in the demo READMEs. Local source and Git history remain the implementation baseline.

Official references checked during migration include [Vite's guide](https://vite.dev/guide/), [React's documentation](https://react.dev/reference/react), [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html). The [border animation article](https://web.dev/articles/css-border-animations) supports retaining the real border-image approach and its rectangular corners.

## Validation record

The final validation results and remaining limitations are recorded in `verification.md`. Screenshots require visual review; saving them alone does not prove parity. The baseline comparison records deliberate layout and accessibility changes separately from preserved effect timing.
