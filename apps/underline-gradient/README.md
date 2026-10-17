# Gradient underline

A gradient underline follows text across one or more lines.

## How it works

CSS paints a gradient from the bundled original palette beneath inline text. On interaction, its height grows from 0.2em to 88% over 0.25 seconds. Cloned background decoration keeps the effect on wrapped lines.

## Interaction

Hover over the underlined words or focus them with Tab. Tap, Enter, or Space toggles the highlight. Resize the window to inspect wrapped text.

## Accessibility

Keyboard focus shows the highlight without motion. Reduced motion removes the transition. The text remains available without a network request.

## Development command

Run this command from the repository root after installation.

```sh
pnpm --filter @animations/underline-gradient dev
```

## Credits

These links preserve the references in the original README.

- [Original source 1](https://codesandbox.io/s/customized-underline-with-gradient-api-in-react-pmr1sf?file=/src/App.tsx) The review could not fetch this page.

The original palette is bundled locally. Each mount selects one entry, including the last entry. Both highlights use the same selection. Restart demo selects again without a network request.

Palette source: https://gist.githubusercontent.com/wking-io/3e116c0e5675c8bcad8b5a6dc6ca5344/raw/4e783ce3ad0bcd98811c6531e40256b8feeb8fc8/gradient.json
