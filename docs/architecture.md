# Animation workspace architecture

## Why the apps stay independent

The repository contains fourteen small animation demos. Each demo owns a full page. Several effects depend on page scrolling or viewport dimensions. The user proposed a monorepo. The existing folders establish independent demo entry points.

The pnpm workspace keeps these demos as separate apps. One root toolchain replaces the repeated dependency versions and lockfiles. Each app can start, build, and preview by package name.

## Ownership

`apps/*` contains the demo pages, React code, CSS Modules, and source credits. An app does not import another app. Each app retains its original folder name.

`packages/demo-runtime` owns shared page setup and motion behavior. Its interface has two exports. `mountDemo(content: ReactNode): void` owns root validation, StrictMode, pause controls, and the shared motion stylesheet. `useInView<T extends HTMLElement>(threshold?: number)` owns the observer, threshold check, and cleanup. It returns a ref and an active flag.

Pause autoplay controls CSS keyframes and their pseudo-elements. It does not pause hover transitions, scroll triggers, pointer tracking, or canvas input. Restart demo remounts the app and resets its local state.

The runtime hides repeated behavior behind a small interface. It does not own individual keyframes, text, colors, timing, or image geometry. Those details remain beside the demo that uses them.

The root `vite.config.ts` owns Vite configuration. `tsconfig.base.json` owns common TypeScript settings. The root package owns tool versions and workspace commands. `pnpm-workspace.yaml` owns the React version catalog and package locations.

## CSS and JavaScript

CSS Modules replace styled-components, Emotion, and MUI styling. They scope class names to each module. The migration must copy the computed typography and layout that MUI supplied before its removal.

CSS keyframes handle the fixed motion sequences. Inline animation delays set each letter or word's start time. Pointer handlers can update coordinates through DOM refs without a React render for each move.

Canvas drawing requires JavaScript. Scroll triggers use IntersectionObserver. These effects do not need a general animation engine. SVG strokes, blur, and animated gradients can require paint work. Replacing runtime styling does not make every effect run only on the compositor.

## Alternatives

A single Vite multipage app could also keep independent documents and isolate page styles. It would remove the small package manifests. It remains a valid option if the demos later share one deployment and one development entry.

The workspace keeps independent app commands and build outputs. This matches the chosen use of the repository. The decision does not depend on a claim that multipage builds cannot isolate CSS.

A gallery SPA would add navigation and shared document state. Full-page scroll effects and the canvas would need new layout rules. That work is outside this migration.

Nx could cache tasks and select affected projects. The present package graph does not justify another orchestration tool. Add it only after measured build costs or package relationships create a need.

## Verification design

Tests should use the same visible behavior as a reader of each demo. Test page load, text visibility, interaction triggers, and reduced motion. Test scroll activation above and below the declared threshold. Test pointer cancellation and resize for the canvas. Inspect animation timing and geometry against the baseline.

Shared runtime tests should cover setup and cleanup through its public interface. App tests should cover the effect that each app owns. A type check or production build cannot prove visual parity. The source preserves each demo's intended effect and timing. Pixel equivalence remains unverified until a visual baseline review.

The migration plan tracks execution. This document makes no claim that the checks have passed.

The autoplay control pauses CSS keyframes, including text reveals and loops. Direct hover, scroll, pointer, and drawing input stays interactive. It does not replace the operating system reduced-motion preference.
