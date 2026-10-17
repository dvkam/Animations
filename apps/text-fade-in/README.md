# Letter fade

Letters move into place and become visible in sequence.

## How it works

Each letter moves from a translated, tilted position and fades into view over one second. Inline animation delays stagger characters by six milliseconds. Word wrappers keep normal word boundaries.

## Interaction

Open the page to play the sequence. Select Restart demo to replay it.

## Accessibility

Reduced motion shows every letter in its final position. A separate visually hidden copy exposes the complete phrase to assistive technology.

## Development command

Run this command from the repository root after installation.

```sh
pnpm --filter @animations/text-fade-in dev
```

## Credits

These links preserve the references in the original README.

- [Original source 1](https://codepen.io/kazed972/pen/bQOQGR) The review could not fetch this page.
- [Original source 2](https://codesandbox.io/s/smooth-fade-in-text-animation-doesnt-work-react-typescript-2vt6e2?file=/src/App.tsx) The review could not fetch this page.
