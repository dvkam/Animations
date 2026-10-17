# Verification

## Environment

WSL Ubuntu 24.04, Node 24.21.0, pnpm 12.14.0. Baseline commit `99ecb5f95276fd4643eaa0bc95544e5bbaeb7479`. Work remains on local branch `modernize-animation-workspace`.

## Checks

| Check                                          | Result                                                                                                                                                  |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frozen pnpm install                            | Passed. No lockfile changes.                                                                                                                            |
| Oxfmt                                          | Passed.                                                                                                                                                 |
| Oxlint and app import boundaries               | Passed with zero warnings and errors.                                                                                                                   |
| Strict TypeScript                              | Passed for all 14 apps, shared runtime, tests, and root configuration.                                                                                  |
| Production builds                              | All 14 passed on Vite 8.3.4.                                                                                                                            |
| Chromium desktop and touch-sized browser suite | 77 passed, 3 device-specific skips.                                                                                                                     |
| Firefox desktop suite                          | Final clean run: 39 passed, 1 desktop-inapplicable touch test skipped. Pointer coordinate tolerance accounts for browser rounding within one CSS pixel. |
| Dependency updates                             | `pnpm outdated -r` returned no outdated direct dependencies.                                                                                            |
| Dependency audit                               | `pnpm audit --audit-level high` reported no known vulnerabilities.                                                                                      |
| Diff whitespace                                | `git diff --check` passed.                                                                                                                              |

The three Chromium skips are intentional. Desktop runs the mouse capture test. Mobile runs the touch canvas test. The fine-pointer glow test runs on desktop only.

Browser checks cover all pages, nested asset paths, image loading, horizontal overflow, autoplay pause and restart, reduced motion, complete accessible text, hover reversal, keyboard and touch activation, scroll entry and exit, the 75-percent observer threshold, pointer glow movement, canvas outside release, touch drawing, clearing, and resize preservation.

The image controls and pointer glow use real browser input. The tests inspect production builds. No app implementation is mocked.

## Visual comparison

All 14 original demos ran from an isolated archive with their original React 18 and Vite 5 dependencies. The comparison produced 84 screenshots and computed geometry and timing records. It found typography and layout regressions, which were corrected before final validation. Read `fidelity.md` for measured matches, deliberate differences, and limits.

The comparison does not assert pixel identity. Infinite sequences and random colors were not synchronized frame by frame. The original 3D active-state selector was unreliable. Its source transforms and rest geometry were checked, and the migrated hover behavior passed browser tests.

## Limits

WebKit downloaded but could not run because this WSL installation lacks its required system libraries. No WebKit pass is claimed. Touch emulation is not a physical phone. No GPU frame-time recording on a mid-range phone was available. Performance conclusions are limited to code mechanisms and dependency removal.

CI has not run on GitHub because no branch was pushed. The workflow runs the same local checks on a clean Linux runner.

To run optional browser projects, install their dependencies with `pnpm exec playwright install --with-deps firefox webkit`. Then run `CROSS_BROWSER=1 pnpm exec playwright test --project=firefox --project=webkit` in WSL.

## Final review

The final standards review found no actionable code-standard defect. The separate spec review found no blocking requirement gap. The Emil motion review approved the changes for local commit. These are review conclusions within the tested scope, not a guarantee that no defect exists.
