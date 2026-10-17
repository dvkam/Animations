# Typewriter

A line appears one character at a time beside a blinking caret.

## How it works

A three-second stepped animation expands the text width to 27 monospace characters. It reaches full width at 75% of the cycle, then resets. A separate one-second animation blinks the caret. Width animation preserves the original centered typing effect.

## Interaction

Open the page to start typing. Pause autoplay stops both the text sequence and the caret. Restart demo starts a new cycle.

## Accessibility

Reduced motion shows the complete line and a steady caret. A separate visually hidden copy exposes the complete phrase to assistive technology.

## Development command

Run this command from the repository root after installation.

```sh
pnpm --filter @animations/typewriter dev
```

## Credits

These links preserve the references in the original README.

- [Original source 1](https://codesandbox.io/s/automatic-typewriter-effect-stackoverflow-y546o7?file=/src/Typewriter.tsx) The review could not fetch this page.
