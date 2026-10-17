# Animations

Fourteen independent React demos show text, image, border, pointer, and canvas effects. The pnpm workspace shares build tools and motion support. Each app owns its effect and page layout.

## Demos

| Demo                                                      | Effect                                                                        |
| --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [3D image hover](apps/3D-image-hover/README.md)           | An image tilts in depth when you point at it.                                 |
| [Animated underline](apps/animated-underline/README.md)   | A curved underline draws beneath text as the section enters view.             |
| [Apple text reveal](apps/apple-animation/README.md)       | Two text blocks slide into view on opposite sides of a horizontal rule.       |
| [Canvas drawing](apps/canvas/README.md)                   | A canvas records a freehand stroke as you drag across it.                     |
| [Word fade](apps/fade-in-text/README.md)                  | Words become visible in sequence as their blur clears.                        |
| [Pointer gradient button](apps/gradient-button/README.md) | A radial highlight follows the pointer inside a button.                       |
| [Animated gradient border](apps/houdini-border/README.md) | A colored border rotates around a panel while its background changes opacity. |
| [Overlapping images](apps/img-overlap/README.md)          | Three overlapping images grow and tilt as their section enters view.          |
| [Image rotation](apps/img-rotate/README.md)               | An image grows and rotates inside a clipped frame.                            |
| [Letter fade](apps/text-fade-in/README.md)                | Letters move into place and become visible in sequence.                       |
| [Text wave](apps/text-wave/README.md)                     | Letters rise in sequence and return to the baseline.                          |
| [Triple image hover](apps/tripple-img-hover/README.md)    | Three stacked images fan out at different angles.                             |
| [Typewriter](apps/typewriter/README.md)                   | A line appears one character at a time beside a blinking caret.               |
| [Gradient underline](apps/underline-gradient/README.md)   | A gradient underline follows text across one or more lines.                   |

The folder `tripple-img-hover` keeps its original spelling. Each demo README explains the mechanism and retains the source credits.

## Development

Use Node.js 24.21.0 or later and pnpm 12.14.0. The root package declares the supported versions.

Install the workspace dependencies from the repository root.

```sh
pnpm install
```

Start one demo with its package name.

```sh
pnpm --filter @animations/text-wave dev
```

`pnpm dev` starts `apple-animation` by default. Vite prints the local URL. Each app builds into its own `dist` directory.

## Commands

| Command                                       | Purpose                                                 |
| --------------------------------------------- | ------------------------------------------------------- |
| `pnpm build`                                  | Build all apps.                                         |
| `pnpm typecheck`                              | Check TypeScript types.                                 |
| `pnpm lint`                                   | Run Oxlint.                                             |
| `pnpm format`                                 | Format files with Oxfmt.                                |
| `pnpm format:check`                           | Check file formatting.                                  |
| `pnpm test`                                   | Run Playwright browser tests.                           |
| `pnpm check`                                  | Run lint, formatting, types, builds, and browser tests. |
| `pnpm --filter @animations/text-wave preview` | Preview a built demo.                                   |

Install the Playwright browsers before the first browser test run.

```sh
pnpm exec playwright install chromium
```

## Code and motion

CSS Modules own static styles and keyframes. Inline animation delays set each word or letter's start time. DOM refs update pointer transforms. Canvas drawing still uses JavaScript.

The migration preserves each demo's intended effect and timing. This does not establish pixel equivalence with the baseline. A visual baseline review is required for that claim. Reduced motion must keep text and images visible. Hover demos need keyboard and touch access. No performance claim follows from dependency removal alone. Browser checks must confirm the result.

Pause autoplay stops CSS keyframe sequences, including repeating effects and the typewriter caret. Hover, scroll, pointer tracking, and canvas input remain active. Restart demo resets the app and starts its sequences again.

Read the [architecture explanation](docs/architecture.md) for ownership and alternatives. The [migration plan](docs/migration-plan.md) records scope and verification work.

## Source review

The demo READMEs preserve every original source link. The review could read the Scroll Animation Handbook, the web.dev border article, and several CodePen pages. Some CodePen and CodeSandbox pages could not be fetched. Their links remain credited, but their contents were not verified. The [original source record](docs/original-sources.json) retains the previous README text.

## Review records

Read the [code and design review](docs/review.md), [dependency decisions](docs/dependencies.md), [verification results](docs/verification.md), and [baseline comparison](docs/fidelity.md). The [PR description](docs/pr-draft.md) is a local draft.
