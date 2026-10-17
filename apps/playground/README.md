# Animation playground

Browse every demo from one sidebar. Each selection loads a single iframe, so page styles, scroll observers, and animation state stay within the demo. Switching demos unloads the previous frame.

Run `pnpm playground` from the repository root. Open http://127.0.0.1:4173. This command builds a production preview. Use a demo's own `dev` command for live editing, then rebuild to update the playground.

Select Fit or 390px to change the preview width. The narrow setting does not emulate touch or a mobile browser. Open demo gives the selected demo its full browser viewport. Reload preview resets its state. The demo's own pause and restart controls remain available.

The sidebar supports keyboard navigation and hash links. The preview inherits the system reduced motion preference. On small screens, Choose a demo expands the navigation.

Descriptions, technical notes, instructions, and accessibility notes come from each demo README. Run `pnpm catalog` after editing them. CI checks that the generated catalog is current.

See [Pages deployment](../../docs/playground.md) for hosting instructions.
