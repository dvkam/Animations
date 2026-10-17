# Pointer gradient button

A radial highlight follows the pointer inside a button.

## How it works

A DOM ref updates the position of a nested span without a React render for each pointer move. A second span draws the 200px radial gradient and scales it into view over 0.2 seconds.

## Interaction

Move the pointer over the button. Use Tab to see a centered highlight and focus outline.

## Accessibility

Reduced motion keeps the highlight centered and removes its transition. Pointer tracking remains active when autoplay is paused.

## Development command

Run this command from the repository root after installation.

```sh
pnpm --filter @animations/gradient-button dev
```

## Credits

These links preserve the references in the original README.

- [Original source 1](https://codesandbox.io/s/zealous-danny-3g3fuh?file=/src/App.tsx) The review could not fetch this page.
