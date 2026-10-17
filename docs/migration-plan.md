# Animation workspace migration

## Scope and sequence

- [x] Ground all 14 demos, original READMEs, and Git history at 99ecb5f.
- [x] Compare independent workspace apps with one gallery or multipage app.
- [x] Review the chosen shape against the user request and skill rules.
- [x] Replace runtime styling and fix behavior in each demo.
- [x] Verify types, lint, format, builds, and browser behavior.
- [x] Review standards and scope independently, fix findings, and commit locally.
- [x] Prepare the draft PR description. Do not push.

## Problem and usage

Fourteen Vite projects repeat their dependencies, lockfiles, and configuration. Several package names are wrong. Each app mounts one animation directly. CSS-in-JS handles mostly static styles. There is no test suite or shared accessibility policy.

Run `pnpm --filter @animations/text-wave dev` to work on one demo. Run `pnpm check` to check the workspace. Each app still owns its effect, text, timing, and layout.

## Module contract

The shared runtime exports `mountDemo(content: ReactNode): void` and `useInView<T extends HTMLElement>(threshold?: number)`. The hook returns a ref and a boolean. It owns observer setup, threshold checks, and cleanup. The mount function owns root validation, StrictMode, pause controls, and the shared reduced-motion stylesheet. Apps own CSS Modules and any effect-specific state.

No app imports another app. Shared configuration lives at the root. pnpm owns dependency versions and the lockfile. No parallel legacy styling system remains after migration.

## Alternatives and synthesis

The base design keeps independent apps in a pnpm workspace. It preserves existing deployment and learning units while centralizing tool updates. A single gallery or multipage build hides more build configuration but changes navigation and deployment. It also risks coupling full-page CSS and canvas sizing. A future gallery can link to these demos without owning their internals.

Nx would add caching and affected-project orchestration. Current history shows independent demo additions, not a complex package graph. Defer Nx until measured build costs justify its configuration and dependencies.

## Preservation constraints

Keep all 14 effects and source credits. Preserve keyframes, geometry, colors, and deliberate demo timing unless a recorded defect requires change. SVG dash drawing, animated gradient backgrounds, and the Houdini border require paint work. Do not replace them with a different effect to claim GPU-only motion. Canvas and pointer tracking still need JavaScript.

Use CSS Modules for static styles, typed inline values for dynamic delays, and DOM refs for pointer motion. Fix invalid CSS, missing text on fetch failure, observer thresholds, pointer cancellation, and reduced motion. Add keyboard and touch access to hover demos. Keep content visible when motion is disabled.

React upgrades do not require speculative features. These apps have no server mutations, expensive data transitions, or hidden page trees. Retain StrictMode and use current ref types. Add newer APIs only where they remove an actual problem.

## Writing and review

Apply pstack architect, TypeScript discipline, unslop, and technical-writing rules. Apply Matt Pocock codebase-design and separate standards/spec reviews. Apply Emil motion and design reviews. Use short active sentences for most documentation, following the available STE rules. No separate ASD-STE100 skill was found. Do not claim certified compliance.

The requested skill runners name models unavailable here. Use independent reviewers on the available inherited model and disclose that limitation. The user request is the spec. The baseline commit is the fixed review point.
