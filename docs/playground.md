# Playground and GitHub Pages

## Architecture

The playground is a separate React app in `apps/playground`. It imports no demo code. One iframe loads the selected demo and is replaced on selection or reload. This preserves each demo's full-page styles, scroll viewport, and cleanup behavior. It also stops hidden demos from running.

The sidebar uses hash links, so refresh, bookmarks, and browser history work without a routing service. The README files supply the catalog. `pnpm catalog` updates its generated JSON; lint rejects stale content. The production build copies the playground and all 14 demos into `dist/`. Relative asset and frame URLs work at both a domain root and a GitHub Pages project path.

## Local use

Run `pnpm playground`, then open http://127.0.0.1:4173. Stop the server with Ctrl+C. This serves built files. To edit a demo with live updates, use its documented dev command. Rebuild the playground after changes.

## Hosting

After the local commits are pushed, set Repository settings > Pages > Build and deployment > Source to GitHub Actions. The workflow builds and tests every push and pull request. It uploads the static site artifact with a seven-day retention period.

A successful push to the repository's default branch deploys the shared playground. Run the workflow manually to deploy a selected branch after its checks pass. The github-pages environment must permit that branch; GitHub may require an environment approval. A manual deployment replaces the shared site. It does not create a separate pull request URL. The next successful default-branch deployment replaces it again.

The workflow deployment reports the actual URL. Without a custom domain, the expected project URL is https://dvkam.github.io/Animations/. This URL is not live until Pages is enabled and the workflow succeeds. No repository settings or hosted deployments were changed during local development.

Pull requests never run the deploy job. They produce a downloadable artifact, not a hosted temporary preview. The seven-day limit applies to the artifact only. The shared Pages site remains available until replaced or disabled.

Deployment uses GitHub's Pages artifact and OIDC actions. Only the deploy job receives pages:write and id-token:write. It waits for all checks and serializes deployments through the github-pages concurrency group.

## Checks

Browser tests visit every demo through the sidebar under `/Animations/`, check desktop and mobile navigation, deep links, history, reload, narrow width, and inherited reduced motion. The existing standalone animation tests also run against the assembled site.

## Review record

The pstack and Matt Pocock code reviews found a skip-link routing conflict. The Emil review also found hidden keyboard focus after mobile selection. Both are fixed and covered by browser tests. The final code, design, and specification reviews found no remaining blockers.

Desktop and mobile screenshots were inspected. A frozen-lockfile install, lint, formatting, strict type checks, all builds, and browser tests passed. The browser suite completed with 83 passing tests and three intentional device-specific skips. The six new playground cases passed on desktop and mobile Chromium. Hosting itself is not verified because this work remains local and has not been pushed.

The Pages actions were checked against their latest GitHub releases: configure-pages 6.0.0, upload-pages-artifact 5.0.0, and deploy-pages 5.0.1.
